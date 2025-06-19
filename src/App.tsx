import React from "react";
import { BrowserRouter } from "react-router-dom";
import MovieStreaming from "./components/MovieStreaming";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <MovieStreaming />
    </BrowserRouter>
  );
};

export default App;
