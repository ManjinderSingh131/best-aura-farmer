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
import { Textarea } from "../ui/textarea"

export function AddAuraFarmerDialog() {
    const [name, setName] = useState("")
    const [origin, setOrigin] = useState("")
    const [description, setDescription] = useState("")
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
            const response = await fetch(`${apiUrl}/aura-farmer/request-add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    origin,
                    description,
                    requestCount: 1
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to request adding Aura Farmer');
            }

            setName("")
            setOrigin("")
            setDescription("")
            setSuccess("Request submitted successfully! It will be reviewed shortly.")
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
                <Button className="fixed bottom-6 right-6 rounded-full shadow-lg h-14 w-14 p-0 text-2xl z-50">
                    +
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Aura Farmer</DialogTitle>
                    <DialogDescription>
                        Request to add a new Aura Farmer to the list.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            <Input
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="col-span-3"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="origin" className="text-right">
                                Origin
                            </Label>
                            <Input
                                id="origin"
                                value={origin}
                                onChange={(e) => setOrigin(e.target.value)}
                                placeholder="Anime/Game/Series"
                                className="col-span-3"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="description" className="text-right">
                                Description
                            </Label>
                            <Textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="col-span-3"
                                required
                                rows={4}
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
