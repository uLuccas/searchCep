import { Route, Routes } from "react-router-dom";
import { SearchByAddress } from "../pages/address";
import { Home } from "../pages/home";
import { Search } from "../pages/search";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<Search />} />
      <Route path="/searchAddress" element={<SearchByAddress />} />
    </Routes>
  );
}
