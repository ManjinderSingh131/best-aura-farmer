import { useState } from "react";
import { getPendingSubmissions, approveSubmission, deleteSubmission, type ShowcaseSubmission } from "@/service/admin.service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { Badge } from "@/components/ui/badge";

export const AdminPage = () => {
    const [adminSecret, setAdminSecret] = useState("");
    const [submissions, setSubmissions] = useState<ShowcaseSubmission[]>([]);
    const [loading, setLoading] = useState(false);
    const [approvingId, setApprovingId] = useState<number | null>(null);
    const [deletingId, setDeletingId] = useState<number | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleFetchSubmissions = async () => {
        if (!adminSecret.trim()) {
            toast.error("Please enter admin secret key");
            return;
        }

        setLoading(true);
        try {
            const data = await getPendingSubmissions(adminSecret);
            setSubmissions(data);
            setIsAuthenticated(true);
            toast.success(`Loaded ${data.length} pending submission(s)`);
        } catch (error: any) {
            console.error("Failed to fetch submissions:", error);
            if (error.statusCode === 401) {
                toast.error("Invalid admin secret key");
            } else {
                toast.error("Failed to fetch submissions. Please try again.");
            }
            setIsAuthenticated(false);
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (submissionId: number) => {
        if (!adminSecret.trim()) {
            toast.error("Admin secret key is missing");
            return;
        }

        setApprovingId(submissionId);
        try {
            await approveSubmission(submissionId, adminSecret);
            toast.success("Submission approved successfully!");

            // Remove approved submission from list
            setSubmissions(prev => prev.filter(s => s.auraShowcaseSubmissionId !== submissionId));
        } catch (error: any) {
            console.error("Failed to approve submission:", error);
            if (error.statusCode === 401) {
                toast.error("Invalid admin secret key");
            } else if (error.statusCode === 404) {
                toast.error("Submission not found");
            } else if (error.statusCode === 400) {
                toast.error("Submission already processed");
            } else {
                toast.error("Failed to approve submission. Please try again.");
            }
        } finally {
            setApprovingId(null);
        }
    };

    const handleDelete = async (submissionId: number) => {
        if (!adminSecret.trim()) {
            toast.error("Admin secret key is missing");
            return;
        }

        if (!confirm("Are you sure you want to delete this submission?")) {
            return;
        }

        setDeletingId(submissionId);
        try {
            await deleteSubmission(submissionId, adminSecret);
            toast.success("Submission deleted successfully!");

            // Remove deleted submission from list
            setSubmissions(prev => prev.filter(s => s.auraShowcaseSubmissionId !== submissionId));
        } catch (error: any) {
            console.error("Failed to delete submission:", error);
            if (error.statusCode === 401) {
                toast.error("Invalid admin secret key");
            } else if (error.statusCode === 404) {
                toast.error("Submission not found");
            } else {
                toast.error("Failed to delete submission. Please try again.");
            }
        } finally {
            setDeletingId(null);
        }
    };

    return (
        <div className="container mx-auto p-6 max-w-4xl">
            <h1 className="text-3xl font-bold mb-6">Admin - Showcase Submissions</h1>

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
                            onKeyDown={(e) => e.key === 'Enter' && handleFetchSubmissions()}
                            className="flex-1"
                        />
                        <Button
                            onClick={handleFetchSubmissions}
                            disabled={loading}
                        >
                            {loading ? <Spinner className="size-5" /> : "Load Submissions"}
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {isAuthenticated && (
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold">
                        Pending Submissions ({submissions.length})
                    </h2>

                    {submissions.length === 0 ? (
                        <Card>
                            <CardContent className="py-8 text-center text-gray-500">
                                No pending submissions
                            </CardContent>
                        </Card>
                    ) : (
                        submissions.map((submission) => (
                            <Card key={submission.auraShowcaseSubmissionId}>
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="text-lg">
                                            Submission #{submission.auraShowcaseSubmissionId}
                                        </CardTitle>
                                        <Badge className="bg-blue-600">Pending</Badge>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    {submission.farmerName && (
                                        <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                                            {submission.farmerAvatar && (
                                                <img
                                                    src={submission.farmerAvatar}
                                                    alt={submission.farmerName}
                                                    className="w-12 h-12 rounded-full object-cover"
                                                />
                                            )}
                                            <div>
                                                <div className="font-semibold text-lg">{submission.farmerName}</div>
                                                <div className="text-sm text-gray-600">Aura Farmer ID: {submission.auraFarmerId}</div>
                                            </div>
                                        </div>
                                    )}
                                    <div>
                                        <span className="font-semibold">Submitted By:</span>{" "}
                                        {submission.submittedBy}
                                    </div>
                                    <div>
                                        <span className="font-semibold">YouTube URL:</span>{" "}
                                        <a
                                            href={submission.showcaseYoutubeUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-500 hover:underline break-all"
                                        >
                                            {submission.showcaseYoutubeUrl}
                                        </a>
                                    </div>
                                    <div>
                                        <span className="font-semibold">Submitted:</span>{" "}
                                        {new Date(submission.createdAt).toLocaleString()}
                                    </div>
                                    <div className="flex gap-2 pt-2">
                                        <Button
                                            onClick={() => handleApprove(submission.auraShowcaseSubmissionId)}
                                            disabled={approvingId === submission.auraShowcaseSubmissionId || deletingId === submission.auraShowcaseSubmissionId}
                                            className="flex-1 bg-green-600 hover:bg-green-700"
                                        >
                                            {approvingId === submission.auraShowcaseSubmissionId ? (
                                                <Spinner className="size-5" />
                                            ) : (
                                                "Approve"
                                            )}
                                        </Button>
                                        <Button
                                            onClick={() => handleDelete(submission.auraShowcaseSubmissionId)}
                                            disabled={approvingId === submission.auraShowcaseSubmissionId || deletingId === submission.auraShowcaseSubmissionId}
                                            className="flex-1 bg-red-600 hover:bg-red-700"
                                        >
                                            {deletingId === submission.auraShowcaseSubmissionId ? (
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
