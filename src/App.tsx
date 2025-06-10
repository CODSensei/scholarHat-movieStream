import { BrowserRouter } from "react-router-dom";
import Body from "./components/Body";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Body />
      <Footer />
    </BrowserRouter>
  );
};

export default App;
