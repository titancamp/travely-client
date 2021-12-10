import React from "react";
import { Route, Routes } from "react-router-dom";

import routes from "./routes";

/**
 * @description Manager portal routing.
 * @returns {React.ReactElement}
 */
export default function Manager() {
  return (
    <Routes>
      {routes().map(({path, element}) => (
        <Route key={path} path={path}  element={element} />
      ))}
    </Routes>
  );
}
