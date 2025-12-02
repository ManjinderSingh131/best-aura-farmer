import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { Spinner } from "../ui/spinner"

type SubmitShowcaseDialogProps = {
    auraFarmerId: number;
}

export function SubmitShowcaseDialog({ auraFarmerId }: SubmitShowcaseDialogProps) {
    const [url, setUrl] = useState("")
    const [name, setName] = useState("")
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)
        setSuccess(null)

        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
            const response = await fetch(`${apiUrl}/aura-farmer/${auraFarmerId}/showcase-submit`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    showcaseYoutubeUrl: url,
                    submittedBy: name.trim() || 'Anonymous'
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to submit showcase');
            }

            setUrl("")
            setName("")
            setSuccess("Showcase submitted successfully! It will be reviewed shortly.")
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred')
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={(val) => {
            setOpen(val);
            if (!val) setSuccess(null);
        }}>
            <DialogTrigger asChild>
                <Button variant="outline">Submit Request</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Submit Showcase</DialogTitle>
                    <DialogDescription>
                        Submit a YouTube video URL for this Aura Farmer. It will be reviewed before appearing.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Your Name
                            </Label>
                            <Input
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Anonymous (Optional)"
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="url" className="text-right">
                                YouTube URL
                            </Label>
                            <Input
                                id="url"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                placeholder="https://youtube.com/..."
                                className="col-span-3"
                                required
                            />
                        </div>
                        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                    </div>
                    <DialogFooter className="flex-col !items-center gap-2 sm:flex-col sm:space-x-0">
                        <Button type="submit" disabled={loading} className="w-full sm:w-auto">
                            {loading && <Spinner className="mr-2 h-4 w-4 animate-spin" />}
                            Submit
                        </Button>
                        {success && <p className="text-green-500 text-sm text-center mt-2">{success}</p>}
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
