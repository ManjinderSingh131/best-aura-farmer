import type { TAuraFarmer } from "../aura-farmer-list/AuraFarmerList";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "../ui/sheet";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { AuraFarmerShowcase } from "./AuraFarmerShowcase";

type AuraFarmerDetailSheetProps = Partial<TAuraFarmer>;

export const AuraFarmerDetailSheet = ({ auraFarmerId, name, description, rank, origin, votes, characterAvatar, wikiLink }: AuraFarmerDetailSheetProps) => {

    const getRow = (label: string, value: string) => (
        <tr className="border-b border-gray-100 last:border-0">
            <td className="font-semibold py-2 pr-4 text-gray-700 w-24">{label}</td>
            <td className="py-2 text-gray-600">{value}</td>
        </tr>
    );

    const getDetailTab = () => {
        return <div className="flex flex-col items-start px-8 pt-4">
            <img src={characterAvatar ?? 'https://fujiframe.com/assets/images/_3000x2000_fit_center-center_85_none/10518/patagonian-fox-X-H2S-Fujifilm-Fujinon-XF70-300mmF4-5.6-R-LM-OIS-WR.webp'}
                alt={`${name} avatar`}
                className="w-auto h-48 rounded-xl bg-black object-contain mb-4"
            />
            <table className="w-full mb-4 border-collapse">
                <tbody>
                    {origin !== undefined && getRow('From', origin)}
                    {rank !== undefined && getRow('Rank', rank.toString())}
                    {votes !== undefined && getRow('Votes', votes.toString())}
                    {wikiLink !== undefined && getRow('Wiki', wikiLink)}
                </tbody>
            </table>
            <SheetDescription>
                {description}
            </SheetDescription>
        </div>
    }

    return (
        <Sheet>
            <SheetTrigger className="cursor-pointer 
                bg-transparent 
                underline 
                hover:bg-transparent 
                hover:text-blue-700 
                p-0 
                text-blue-600 
                text-lg
                font-semibold">
                {name}
            </SheetTrigger>
            <SheetContent side="right" className="min-w-full lg:min-w-[80vw]">
                <SheetHeader className="border-b border-gray-300">
                    <SheetTitle>{name}</SheetTitle>
                </SheetHeader>
                <Tabs defaultValue="details" className="px-4">
                    <TabsList>
                        <TabsTrigger value="details">Details</TabsTrigger>
                        <TabsTrigger value="gallery">Aura showcase</TabsTrigger>
                    </TabsList>
                    <TabsContent value="details">
                        {getDetailTab()}
                    </TabsContent>
                    <TabsContent value="gallery" className="overflow-auto max-h-[80vh]">
                        <AuraFarmerShowcase auraFarmerId={auraFarmerId as number} />
                    </TabsContent>
                </Tabs>
                <SheetFooter>
                    <SheetClose>Close</SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}