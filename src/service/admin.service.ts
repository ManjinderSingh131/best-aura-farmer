import { apiFetch } from "@/lib/api-client";
import { env } from "@/config/env";

export interface ShowcaseSubmission {
  auraShowcaseSubmissionId: number;
  auraFarmerId: number;
  showcaseYoutubeUrl: string;
  submittedBy: string;
  createdAt: string;
  status: string;
  farmerName?: string;
  farmerAvatar?: string;
}

export const getPendingSubmissions = async (adminSecret: string): Promise<ShowcaseSubmission[]> => {
  try {
    const response = await apiFetch(`${env.apiUrl}/aura-farmer/admin/submissions`, {
      method: 'GET',
      headers: {
        'x-admin-secret': adminSecret,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching pending submissions:', error);
    throw error;
  }
};

export const approveSubmission = async (submissionId: number, adminSecret: string) => {
  try {
    const response = await apiFetch(`${env.apiUrl}/aura-farmer/admin/approve/${submissionId}`, {
      method: 'POST',
      headers: {
        'x-admin-secret': adminSecret,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error approving submission:', error);
    throw error;
  }
};

export const deleteSubmission = async (submissionId: number, adminSecret: string) => {
  try {
    const response = await apiFetch(`${env.apiUrl}/aura-farmer/admin/delete/${submissionId}`, {
      method: 'POST',
      headers: {
        'x-admin-secret': adminSecret,
      },
    });
    return response;
  } catch (error) {
    console.error('Error deleting submission:', error);
    throw error;
  }
};
