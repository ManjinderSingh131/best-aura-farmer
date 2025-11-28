import { AuraFarmerDetailSheet } from "../aura-farmer-detail-sheet/AuraFarmerDetailSheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "../ui/badge";
import type { TAuraFarmer } from "../aura-farmer-list/AuraFarmerList";

type CurrentWinnerProps = {
    topAuraFarmer: TAuraFarmer | null;
    isTie: boolean;
};

export const CurrentWinner = ({ topAuraFarmer, isTie }: CurrentWinnerProps) => {
    if (!topAuraFarmer || isTie) return null;

    return (
        <div className="w-full p-4 bg-white rounded-tl-lg rounded-br-lg shadow-lg border border-dashed border-slate-300 mt-3">
            <h2 className="text-2xl italic mb-4 text-center">Top Aura Farmer Currently</h2>
            <div className="flex items-center flex-col justify-center">
                <div className="flex items-center gap-2 flex-col relative">
                    <Avatar className="h-32 w-32">
                        <AvatarImage src={topAuraFarmer.characterAvatar} alt={topAuraFarmer.name} />
                        <AvatarFallback>{topAuraFarmer.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <AuraFarmerDetailSheet
                        name={topAuraFarmer.name}
                        description={topAuraFarmer.description}
                        rank={topAuraFarmer.rank}
                        origin={topAuraFarmer.origin}
                        votes={topAuraFarmer.votes}
                        wikiLink={topAuraFarmer.wikiLink}
                        auraFarmerId={topAuraFarmer.auraFarmerId}
                    />
                    <div className="absolute -rotate-35 text-4xl -top-0 -left-3">
                        👑
                    </div>
                </div>
                <Badge className="bg-slate-800">🗿 {topAuraFarmer?.votes} Aura</Badge>
            </div>
        </div>
    );
}