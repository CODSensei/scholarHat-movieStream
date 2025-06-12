import React from "react";
import MovieStreaming from "./components/MovieStreaming";
import { BrowserRouter } from "react-router-dom";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <MovieStreaming />
    </BrowserRouter>
  );
};

export default App;
