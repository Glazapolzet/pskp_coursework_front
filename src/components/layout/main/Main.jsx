import { Outlet } from "react-router";
import "./Main.css";

export const Main = () => {
  return (
    <main className="main">
      <Outlet />
    </main>
  );
};
