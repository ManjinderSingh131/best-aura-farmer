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
    <Card className="max-w-sm">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{totalAura} Aura</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-700">
          This aura farmer has {totalAura} total aura points.
        </p>
      </CardContent>
    </Card>
  );
};
