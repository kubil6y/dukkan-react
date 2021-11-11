import { Routes } from "./Routes";
import { Navbar } from "../navbar/Navbar";
import { useLocation } from "react-router-dom";
import { includes } from "../../helpers";
import { Footer } from "./Footer";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

// setup dayjs
dayjs.extend(relativeTime);

export const App = () => {
  const { pathname } = useLocation();
  const show = !includes(["/register", "/login"], pathname);
  return (
    <div>
      {show && <Navbar />}
      <Routes />
      {show && <Footer />}
    </div>
  );
};
