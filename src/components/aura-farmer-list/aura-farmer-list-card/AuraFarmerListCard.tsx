import { Spinner } from "@/components/ui/spinner";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../ui/Card";
import type { TAuraFarmer } from "../AuraFarmerList";
import { AuraFarmerDetailSheet } from "@/components/aura-farmer-detail-sheet/AuraFarmerDetailSheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type AuraFarmerListCardProps = TAuraFarmer & {
  handleAuraFarmerUpvote: () => void;
  isSelected: boolean;
  isVoting: boolean;
};

export const AuraFarmerListCard = ({
  name,
  votes,
  isSelected,
  description,
  isVoting,
  rank,
  origin,
  wikiLink,
  auraFarmerId,
  handleAuraFarmerUpvote,
}: AuraFarmerListCardProps) => {

  const getInitial = (name: string) => {
    return name.charAt(0).toUpperCase();
  }

  return (
    <Card
      className={`border-2 transition rounded-xl ${isSelected
          ? "border-yellow-600 shadow-[0_0_10px_rgba(255,255,0,0.6)]"
          : "border-dashed border-slate-300"
        }`}
    >
      <CardHeader
        className={`rounded-t-lg cursor-pointer transition ${isSelected
            ? "bg-yellow-400"
            : "bg-yellow-300 hover:bg-yellow-400"
          }`}
      >
        <div className="flex flex-col lg:flex-row sm:justify-between items-start lg:items-center pb-2 border-b border-yellow-500">
          <CardTitle
            className={`underline transition hover:text-blue-500 flex flex-row`}
          >
            <Avatar className="mr-2">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>{getInitial(name)}</AvatarFallback>
            </Avatar>
            <AuraFarmerDetailSheet
              name={name}
              description={description}
              rank={rank}
              origin={origin}
              votes={votes}
              wikiLink={wikiLink}
              auraFarmerId={auraFarmerId}
            />
          </CardTitle>
          <CardDescription className="flex flex-row gap-2 mt-2 lg:mt-0">
            <Badge className="bg-slate-800">
              🗿 {votes} Aura
            </Badge>
            <Badge className="bg-slate-600">
              #{rank}
            </Badge>
          </CardDescription>
        </div>
        <span>📌 {origin}</span>
      </CardHeader>

      <CardContent className="pt-3">
        <div className="flex justify-between gap-2 flex-col">
          <Button
            className={`cursor-pointer transition ${isSelected
                ? "bg-orange-700 hover:bg-orange-800"
                : "bg-green-700 hover:bg-green-800"
              }`}
            onClick={handleAuraFarmerUpvote}
            disabled={isVoting}
          >
            {isVoting ? (
              <Spinner className="size-5" />
            ) : isSelected ? (
              "↩️ Remove Aura"
            ) : (
              `🤝🏼 Dap ${name} (+1 Aura)`
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
