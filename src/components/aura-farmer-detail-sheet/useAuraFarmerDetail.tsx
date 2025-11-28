import { useEffect, useState } from "react";
import { getAuraFarmShowcase } from "@/service/aura-farmer.service";

export type TAuraFarmShowcase = {
    auraFarmerId: number;
    urls: string[];
}

type AuraFarmerDetailProps = {
    auraFarmerId: number;
}

export const useAuraFarmerDetail = ({ auraFarmerId }: AuraFarmerDetailProps) => {
    const [auraFarmShowcase, setAuraFarmShowcase] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<unknown>(null);

    useEffect(() => {
        getAuraFarmShowcase(auraFarmerId)
            .then((data) => {
                setAuraFarmShowcase(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    }, []);

    return {
        auraFarmShowcase,
        loading,
        error
    }
}