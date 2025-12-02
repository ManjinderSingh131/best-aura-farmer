import { Spinner } from "../ui/spinner";
import { useAuraFarmerDetail } from "./useAuraFarmerDetail";
import { SubmitShowcaseDialog } from "./SubmitShowcaseDialog";

type AuraFarmerShowcaseProps = {
    auraFarmerId: number;
}

function toEmbedUrl(url: string) {
    let id = "";

    if (url.includes("shorts/")) {
        id = url.split("shorts/")[1].split("?")[0];
    } else {
        id = url.split("v=")[1]?.split("&")[0]
            || url.replace("https://youtu.be/", "").split("?")[0];
    }

    return `https://www.youtube.com/embed/${id}`;
}

export const AuraFarmerShowcase = ({ auraFarmerId }: AuraFarmerShowcaseProps) => {
    const { auraFarmShowcase, loading, error } = useAuraFarmerDetail({ auraFarmerId });
    return (
        <div className="flex flex-col gap-2">
            <div className="flex justify-end items-center">
                <SubmitShowcaseDialog auraFarmerId={auraFarmerId} />
            </div>
            {
                loading && (
                    <div className="flex justify-center items-center py-10">
                        <Spinner className="size-12 text-green-500" />
                    </div>
                )
            }
            <div className="flex flex-col lg:flex-row gap-3 flex-wrap mt-4">
                {
                    typeof error === 'string' && <p>Error: {error}</p>
                }
                {
                    !loading && auraFarmShowcase.length === 0 && <h3>❌ No showcase available</h3>
                }
                {auraFarmShowcase.map((item: any, index: number) => (
                    <div className="w-full lg:w-[30%] flex flex-col gap-2" key={index}>
                        <div className="h-80 rounded-lg overflow-hidden">
                            <iframe src={toEmbedUrl(item.showcaseYoutubeUrl)}
                                height={'100%'}
                                width={'100%'}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen
                            />
                        </div>
                        <p className="text-sm text-muted-foreground text-right">
                            Added by: <span className="font-semibold">{item.addedBy}</span>
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}