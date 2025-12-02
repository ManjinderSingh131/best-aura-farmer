import { useState } from "react";
import { getPendingFarmerRequests, approveFarmerRequest, deleteFarmerRequest, type FarmerRequest } from "@/service/admin-farmer-requests.service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { Badge } from "@/components/ui/badge";

export const AdminFarmerRequestsPage = () => {
    const [adminSecret, setAdminSecret] = useState("");
    const [requests, setRequests] = useState<FarmerRequest[]>([]);
    const [loading, setLoading] = useState(false);
    const [approvingId, setApprovingId] = useState<number | null>(null);
    const [deletingId, setDeletingId] = useState<number | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [avatarInputs, setAvatarInputs] = useState<Record<number, string>>({});

    const handleFetchRequests = async () => {
        if (!adminSecret.trim()) {
            toast.error("Please enter admin secret key");
            return;
        }

        setLoading(true);
        try {
            const data = await getPendingFarmerRequests(adminSecret);
            setRequests(data);
            setIsAuthenticated(true);
            toast.success(`Loaded ${data.length} farmer request(s)`);
        } catch (error: any) {
            console.error("Failed to fetch requests:", error);
            if (error.statusCode === 401) {
                toast.error("Invalid admin secret key");
            } else {
                toast.error("Failed to fetch requests. Please try again.");
            }
            setIsAuthenticated(false);
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (requestId: number) => {
        if (!adminSecret.trim()) {
            toast.error("Admin secret key is missing");
            return;
        }

        const avatarUrl = avatarInputs[requestId];
        if (!avatarUrl || !avatarUrl.trim()) {
            toast.error("Please enter avatar URL/filename");
            return;
        }

        setApprovingId(requestId);
        try {
            await approveFarmerRequest(requestId, avatarUrl, adminSecret);
            toast.success("Farmer request approved successfully!");

            // Remove approved request from list
            setRequests(prev => prev.filter(r => r.auraFarmerAddReqId !== requestId));
            // Clear avatar input
            setAvatarInputs(prev => {
                const newInputs = { ...prev };
                delete newInputs[requestId];
                return newInputs;
            });
        } catch (error: any) {
            console.error("Failed to approve request:", error);
            if (error.statusCode === 401) {
                toast.error("Invalid admin secret key");
            } else if (error.statusCode === 404) {
                toast.error("Request not found");
            } else {
                toast.error("Failed to approve request. Please try again.");
            }
        } finally {
            setApprovingId(null);
        }
    };

    const handleDelete = async (requestId: number) => {
        if (!adminSecret.trim()) {
            toast.error("Admin secret key is missing");
            return;
        }

        if (!confirm("Are you sure you want to delete this request?")) {
            return;
        }

        setDeletingId(requestId);
        try {
            await deleteFarmerRequest(requestId, adminSecret);
            toast.success("Request deleted successfully!");

            // Remove deleted request from list
            setRequests(prev => prev.filter(r => r.auraFarmerAddReqId !== requestId));
            // Clear avatar input
            setAvatarInputs(prev => {
                const newInputs = { ...prev };
                delete newInputs[requestId];
                return newInputs;
            });
        } catch (error: any) {
            console.error("Failed to delete request:", error);
            if (error.statusCode === 401) {
                toast.error("Invalid admin secret key");
            } else if (error.statusCode === 404) {
                toast.error("Request not found");
            } else {
                toast.error("Failed to delete request. Please try again.");
            }
        } finally {
            setDeletingId(null);
        }
    };

    return (
        <div className="container mx-auto p-6 max-w-4xl">
            <h1 className="text-3xl font-bold mb-6">Admin - Aura Farmer Requests</h1>

            <Card className="mb-6">
                <CardHeader>
                    <CardTitle>Authentication</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex gap-2">
                        <Input
                            type="password"
                            placeholder="Enter admin secret key"
                            value={adminSecret}
                            onChange={(e) => setAdminSecret(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleFetchRequests()}
                            className="flex-1"
                        />
                        <Button
                            onClick={handleFetchRequests}
                            disabled={loading}
                        >
                            {loading ? <Spinner className="size-5" /> : "Load Requests"}
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {isAuthenticated && (
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold">
                        Pending Requests ({requests.length})
                    </h2>

                    {requests.length === 0 ? (
                        <Card>
                            <CardContent className="py-8 text-center text-gray-500">
                                No pending requests
                            </CardContent>
                        </Card>
                    ) : (
                        requests.map((request) => (
                            <Card key={request.auraFarmerAddReqId}>
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="text-lg">
                                            {request.name}
                                        </CardTitle>
                                        <Badge className="bg-purple-600">
                                            {request.requestCount} request{request.requestCount !== 1 ? 's' : ''}
                                        </Badge>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div>
                                        <span className="font-semibold">Origin:</span>{" "}
                                        {request.origin}
                                    </div>
                                    <div>
                                        <span className="font-semibold">Description:</span>{" "}
                                        <p className="mt-1 text-gray-700">{request.description}</p>
                                    </div>
                                    <div>
                                        <span className="font-semibold">Request ID:</span>{" "}
                                        {request.auraFarmerAddReqId}
                                    </div>
                                    <div className="pt-2">
                                        <label className="block font-semibold mb-2">
                                            Avatar URL/Filename: <span className="text-red-500">*</span>
                                        </label>
                                        <Input
                                            placeholder="e.g., https://example.com/avatar.png or avatar.png"
                                            value={avatarInputs[request.auraFarmerAddReqId] || ""}
                                            onChange={(e) => setAvatarInputs(prev => ({
                                                ...prev,
                                                [request.auraFarmerAddReqId]: e.target.value
                                            }))}
                                            className="mb-2"
                                        />
                                    </div>
                                    <div className="flex gap-2 pt-2">
                                        <Button
                                            onClick={() => handleApprove(request.auraFarmerAddReqId)}
                                            disabled={
                                                approvingId === request.auraFarmerAddReqId ||
                                                deletingId === request.auraFarmerAddReqId ||
                                                !avatarInputs[request.auraFarmerAddReqId]?.trim()
                                            }
                                            className="flex-1 bg-green-600 hover:bg-green-700"
                                        >
                                            {approvingId === request.auraFarmerAddReqId ? (
                                                <Spinner className="size-5" />
                                            ) : (
                                                "Approve & Create Farmer"
                                            )}
                                        </Button>
                                        <Button
                                            onClick={() => handleDelete(request.auraFarmerAddReqId)}
                                            disabled={approvingId === request.auraFarmerAddReqId || deletingId === request.auraFarmerAddReqId}
                                            className="flex-1 bg-red-600 hover:bg-red-700"
                                        >
                                            {deletingId === request.auraFarmerAddReqId ? (
                                                <Spinner className="size-5" />
                                            ) : (
                                                "Delete"
                                            )}
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};
