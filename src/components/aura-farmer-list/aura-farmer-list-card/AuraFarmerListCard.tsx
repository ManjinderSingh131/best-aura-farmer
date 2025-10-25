import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../ui/Card";

type AuraFarmerListCardProps = {
  name: string;
  totalAura: number;
};

export const AuraFarmerListCard = ({
  name,
  totalAura,
}: AuraFarmerListCardProps) => {
  return (
    <Card className=" border-dashed border-2">
      <CardHeader className="bg-green-300 rounded-lg cursor-pointer hover:bg-green-400 transition">
        <div className="flex flex-col lg:flex-row sm:justify-between">
          <CardTitle className="underline hover:text-blue-500">
            {name}
          </CardTitle>
          <CardDescription>
            <Badge>🗿 {totalAura} Aura</Badge>
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between gap-2 flex-col">
          <Button className="bg-slate-700 hover:bg-slate-800 cursor-pointer">
            🤝🏼 Dap {name} (+1 Aura)
          </Button>
          <Button className="bg-slate-700 hover:bg-slate-800 cursor-pointer">
            Add comment
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
