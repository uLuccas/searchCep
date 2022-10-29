import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/home";
import { Search } from "../pages/search";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<Search />} />
    </Routes>
  );
}
