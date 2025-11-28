import { AuraFarmerListCard } from "./aura-farmer-list-card/AuraFarmerListCard";
import { Spinner } from "@/components/ui/spinner";
import { useAuraFarmerList } from "./aura-farmer-list-card/useAuraFarmerList";

export type TAuraFarmer = {
  auraFarmerId?: number;
  name: string;
  from: string;
  origin: string;
  characterAvatar: string;
  description: string;
  votes: number;
  rank: number;
  wikiLink: string;
};

export const AuraFarmerList = () => {
  const { error, loading, lastClicked, userVote, optimisticCards, handleAuraFarmerUpvote, isPending } = useAuraFarmerList();
  
  return (
    <div className="container mt-3">
      <h2 className="font-bold mb-3">All Aura Farmers</h2>

      {loading && (
        <div className="flex justify-center items-center py-10">
          <Spinner className="size-12 text-green-500" />
        </div>
      )}

      {typeof error === "string" && <div>{error}</div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {optimisticCards.map((farmer) => (
          <AuraFarmerListCard
            key={farmer.auraFarmerId}
            {...farmer}
            isSelected={userVote === farmer.auraFarmerId}
            isVoting={isPending && lastClicked === farmer.auraFarmerId}
            handleAuraFarmerUpvote={() => {
              handleAuraFarmerUpvote(farmer.auraFarmerId!);
            }}
          />
        ))}
      </div>
    </div>
  );
};
