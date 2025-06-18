//src/App.tsx
import React, { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import MovieStreaming from "./components/MovieStreaming";
import ErrorBoundary from "./components/ErrorBoundary";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Suspense
          fallback={
            <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white text-xl">
              Loading...
            </div>
          }
        >
          <MovieStreaming />
        </Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default App;
