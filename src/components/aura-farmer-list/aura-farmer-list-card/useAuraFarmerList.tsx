import { useEffect, useState, useTransition } from "react";
import { useOptimistic } from "react";
import type { TAuraFarmer } from "../AuraFarmerList";
import { getAllAuraFarmers, unvoteAuraFarmer, updateAuraFarmerVote } from "@/service/aura-farmer.service";
import useSound from "use-sound";
import { toast } from "sonner";

export const useAuraFarmerList = () => {
    const SOUND_URL = '/dap-sound.mp3';
    const [playDapSound] = useSound(SOUND_URL);
    const [auraFarmers, setAuraFarmers] = useState<TAuraFarmer[]>([]);
    const [error, setError] = useState<unknown>(null);
    const [loading, setLoading] = useState(true);
    const [isPending, startTransition] = useTransition();

    const [lastClicked, setLastClicked] = useState<number | null>(null);

    const [userVote, setUserVote] = useState<number | null>(() => {
        const stored = localStorage.getItem("votedAuraFarmerId");
        return stored ? parseInt(stored) : null;
    });

    const [optimisticCards, optimisticUpdate] = useOptimistic(
        auraFarmers,
        (currentState, updates: Partial<TAuraFarmer>[]) => {
            let next = [...currentState];
            updates.forEach((change) => {
                next = next.map((card) =>
                    card.auraFarmerId === change.auraFarmerId
                        ? { ...card, votes: change.votes! }
                        : card
                );
            });
            return next;
        }
    );

    useEffect(() => {
        getAllAuraFarmers()
            .then((data) => {
                const sortedData = data.sort((a: TAuraFarmer, b: TAuraFarmer) => (a.auraFarmerId || 0) - (b.auraFarmerId || 0));
                setAuraFarmers(sortedData);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    }, []);

    const refreshAuraFarmers = () => {
        getAllAuraFarmers()
            .then((data) => {
                const sortedData = data.sort((a: TAuraFarmer, b: TAuraFarmer) => (a.auraFarmerId || 0) - (b.auraFarmerId || 0));
                setAuraFarmers(sortedData);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    };

    const handleAuraFarmerUpvote = (clickedId: number) => {
        setLastClicked(clickedId);
        const previousVote = userVote;

        const oldCard = auraFarmers.find((f) => f.auraFarmerId === previousVote);
        const newCard = auraFarmers.find((f) => f.auraFarmerId === clickedId);

        if (!newCard) return;

        // unvoting as same card clicked
        if (previousVote === clickedId) {
            const oldVotes = newCard.votes;

            startTransition(() => {
                optimisticUpdate([
                    { auraFarmerId: clickedId, votes: oldVotes - 1 },
                ]);
            });

            setUserVote(null);
            localStorage.removeItem("votedAuraFarmerId");

            startTransition(async () => {
                try {
                    await unvoteAuraFarmer(clickedId);
                    refreshAuraFarmers();
                } catch (err: any) {
                    // Revert state on error
                    setUserVote(previousVote);
                    if (previousVote) {
                        localStorage.setItem("votedAuraFarmerId", previousVote.toString());
                    } else {
                        localStorage.removeItem("votedAuraFarmerId");
                    }
                    setLastClicked(null);

                    if (err.statusCode === 429) {
                        toast.error("You are doing that too much. Try again in a few minutes.");
                    } else {
                        setError(err);
                    }
                }
            });

            return;
        }

        const updates: Partial<TAuraFarmer>[] = [];

        if (oldCard) {
            updates.push({
                auraFarmerId: oldCard.auraFarmerId,
                votes: oldCard.votes - 1,
            });
        }

        updates.push({
            auraFarmerId: newCard.auraFarmerId,
            votes: newCard.votes + 1,
        });

        startTransition(() => {
            optimisticUpdate(updates);
        });

        setUserVote(clickedId);
        localStorage.setItem("votedAuraFarmerId", clickedId.toString());

        playDapSound();
        startTransition(async () => {
            try {
                await updateAuraFarmerVote(clickedId);
                if (oldCard) {
                    await unvoteAuraFarmer(oldCard.auraFarmerId!);
                }

                refreshAuraFarmers();
            } catch (err: any) {
                // Revert state on error
                setUserVote(previousVote);
                if (previousVote) {
                    localStorage.setItem("votedAuraFarmerId", previousVote.toString());
                } else {
                    localStorage.removeItem("votedAuraFarmerId");
                }
                setLastClicked(null);

                if (err.statusCode === 429) {
                    toast.error("You are doing that too much. Try again in a few minutes.");
                } else {
                    setError(err);
                }
            }
        });
    };

    const top10AuraFarmers = [...auraFarmers]
        .sort((a, b) => a.rank - b.rank)
        .slice(0, 10);

    const topAuraFarmer = top10AuraFarmers.length > 0 ? top10AuraFarmers[0] : null;

    const isTie = topAuraFarmer?.votes === top10AuraFarmers[1]?.votes;

    return {
        auraFarmers,
        error,
        loading,
        isPending,
        lastClicked,
        userVote,
        optimisticCards,
        top10AuraFarmers,
        topAuraFarmer,
        refreshAuraFarmers,
        handleAuraFarmerUpvote,
        isTie
    };
}