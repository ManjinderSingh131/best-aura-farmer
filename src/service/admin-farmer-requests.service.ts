import { apiFetch } from "@/lib/api-client";

export interface FarmerRequest {
  auraFarmerAddReqId: number;
  name: string;
  origin: string;
  description: string;
  requestCount: number;
}

export const getPendingFarmerRequests = async (adminSecret: string): Promise<FarmerRequest[]> => {
  try {
    const response = await apiFetch('http://localhost:3000/aura-farmer/admin/farmer-requests', {
      method: 'GET',
      headers: {
        'x-admin-secret': adminSecret,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching pending farmer requests:', error);
    throw error;
  }
};

export const approveFarmerRequest = async (requestId: number, characterAvatar: string, adminSecret: string) => {
  try {
    const response = await apiFetch(`http://localhost:3000/aura-farmer/admin/farmer-requests/approve/${requestId}`, {
      method: 'POST',
      headers: {
        'x-admin-secret': adminSecret,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ characterAvatar }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error approving farmer request:', error);
    throw error;
  }
};

export const deleteFarmerRequest = async (requestId: number, adminSecret: string) => {
  try {
    const response = await apiFetch(`http://localhost:3000/aura-farmer/admin/farmer-requests/delete/${requestId}`, {
      method: 'POST',
      headers: {
        'x-admin-secret': adminSecret,
      },
    });
    return response;
  } catch (error) {
    console.error('Error deleting farmer request:', error);
    throw error;
  }
};
