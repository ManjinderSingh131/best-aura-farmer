import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { TAuraFarmer } from "../aura-farmer-list/AuraFarmerList";
import { Spinner } from "../ui/spinner";

type LeaderboardProps = {
    top10AuraFarmers: TAuraFarmer[];
    isTie: boolean;
    loading: boolean;
};

export const Leaderboard = ({ top10AuraFarmers, isTie, loading }: LeaderboardProps) => {
    const maxVotes = top10AuraFarmers.length > 0 ? top10AuraFarmers[0].votes : 0;

    return (
        <div className="w-full p-4 bg-white rounded-tl-lg rounded-br-lg shadow-lg border border-dashed border-slate-300 mt-3">
            <h2 className="text-2xl mb-4 text-center italic">Live Leaderboard</h2>
            <hr />
            <div className="space-y-4 mt-2">
                {loading && (
                    <div className="flex justify-center items-center py-10">
                        <Spinner className="size-12 text-green-500" />
                    </div>
                )}
                {!loading && top10AuraFarmers.map((farmer, index) => (
                    <div key={farmer.auraFarmerId} className="relative border-b border-dashed border-slate-200 pb-2">
                        <div className="flex items-center justify-between mb-2 z-10 relative">
                            <div className="flex items-center gap-2">
                                {index === 0 && !isTie ? '🏆' : ''}
                                <span className="font-medium text-gray-700 min-w-[24px]">
                                    #{farmer.rank}
                                </span>
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src={farmer.characterAvatar} alt={farmer.name} />
                                    <AvatarFallback>{farmer.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                                </Avatar>
                                <span className="font-medium text-gray-700">
                                    {farmer.name}
                                </span>
                            </div>
                            <span className="text-sm font-bold text-gray-900">🗿 {farmer.votes} Aura</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 overflow-hidden">
                            <div
                                className="bg-yellow-500 h-2.5 rounded-full transition-all duration-500 ease-out"
                                style={{
                                    width: `${maxVotes > 0 ? (farmer.votes / maxVotes) * 100 : 0}%`,
                                }}
                            ></div>
                        </div>
                    </div>
                ))}
                {!loading && top10AuraFarmers.length === 0 && (
                    <div className="text-center text-gray-500">No data available</div>
                )}
            </div>
        </div>
    );
};