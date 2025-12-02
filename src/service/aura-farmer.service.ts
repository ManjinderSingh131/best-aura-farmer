import { apiFetch } from "@/lib/api-client";
import { env } from "@/config/env";

export const getAllAuraFarmers = async () => {
    try {
        const resonse = await apiFetch(`${env.apiUrl}/aura-farmer`);
        const data = await resonse.json();
        return data;

    } catch(error) {
        console.log(error);
        throw error;
    }
}

export const updateAuraFarmerVote = async (auraFarmerId: number) => {
    try {
        const resonse = await apiFetch(`${env.apiUrl}/aura-farmer/${auraFarmerId}/update-vote`, {
            method: 'POST',
        });
        const data = await resonse.json();
        return data;

    } catch(error) {
        console.debug(error, 'error is::::');
        throw error;
    }
}

export const unvoteAuraFarmer = async (auraFarmerId: number) => {
    try {
        const resonse = await apiFetch(`${env.apiUrl}/aura-farmer/${auraFarmerId}/unvote`, {
            method: 'POST',
        });
        const data = await resonse.json();
        return data;

    } catch(error) {
        console.log(error);
        throw error;
    }
}

export const getAuraFarmShowcase = async (auraFarmerId: number) => {
    try {
        const resonse = await apiFetch(`${env.apiUrl}/aura-farmer/${auraFarmerId}/showcase`);
        const data = await resonse.json();
        return data;

    } catch(error) {
        console.log(error);
        throw error;
    }
}