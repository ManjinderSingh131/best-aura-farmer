import { AuraFarmerListCard } from "./aura-farmer-list-card/AuraFarmerListCard";

const list = [
  {
    id: 1,
    name: "Piccolo",
    totalAura: 2500,
    imgUrl: "https://example.com/piccolo.png",
  },
  {
    id: 2,
    name: "Goku",
    totalAura: 3000,
    imgUrl: "https://example.com/goku.png",
  },
  {
    id: 3,
    name: "Vegeta",
    totalAura: 2800,
    imgUrl: "https://example.com/vegeta.png",
  },
  {
    id: 4,
    name: "Gohan",
    totalAura: 2200,
    imgUrl: "https://example.com/gohan.png",
  },
];

export const AuraFarmerList = () => {
  return (
    <div className="container mt-3">
      <h2 className="font-bold mb-3">All Aura Farmers</h2>
      <ul className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {list.map((farmer) => (
          <AuraFarmerListCard
            key={farmer.id}
            name={farmer.name}
            totalAura={farmer.totalAura}
          />
        ))}
      </ul>
    </div>
  );
};
