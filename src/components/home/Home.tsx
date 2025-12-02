import { useEffect } from "react";
import { Leaderboard } from "../leaderboard/Leaderboard";
import { CurrentWinner } from "../current-winner/CurrentWinner";
import { useAuraFarmerList } from "../aura-farmer-list/aura-farmer-list-card/useAuraFarmerList";
import { HomeCta } from "../home-cta/HomeCta";

export const Home = () => {
    const { topAuraFarmer, top10AuraFarmers, refreshAuraFarmers, isTie, loading } = useAuraFarmerList();

    useEffect(() => {
        const interval = setInterval(() => {
            refreshAuraFarmers();
        }, 5000);

        return () => clearInterval(interval);
    }, [refreshAuraFarmers]);

    return (
        <div className="max-w-3xl mx-auto">
            <HomeCta />
            <CurrentWinner topAuraFarmer={topAuraFarmer} isTie={isTie} />
            <Leaderboard top10AuraFarmers={top10AuraFarmers} isTie={isTie} loading={loading} />
        </div>
    );
};