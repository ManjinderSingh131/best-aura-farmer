import { Route } from "react-router-dom";
import Layout from "../components/layout/Layout";
import { AuraFarmerList } from "../components/aura-farmer-list/AuraFarmerList";
import { Home } from "@/components/home/Home";


export const routes = (
  <Route path="/" element={<Layout />}>
    <Route index element={<Home />} />

    <Route path="aura-farmers">
      <Route
        index
        element={
          <div>
            <AuraFarmerList />
          </div>
        }
      />
      <Route path=":id" element={<div>Character Details Page</div>} />
      <Route path="search" element={<div>Character Search Page</div>} />
    </Route>

    <Route path="*" element={<div>404 Not Found</div>} />
  </Route>
);
