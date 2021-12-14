import { Route, Routes } from "react-router-dom";
import routes from "./routes";

export default function Accommodation() {
  return (
    <Routes>
        {routes().map((item, index) => (
        <Route key={index} {...item} />
      ))}
    </Routes>
  );
}
