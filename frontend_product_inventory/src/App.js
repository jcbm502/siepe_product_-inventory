import logo from "./logo.svg";
import "./App.css";
import { Routes, Switch, Route, BrowserRouter } from "react-router-dom";
import { MainPage } from "./components/MainPage";
import { DetailItem } from "./components/DetailItem";
import { FeatureItem } from "./components/FeatureItem";
import { DocumentationItem } from "./components/DocumentationItem";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/detail/:id" element={<DetailItem />} />
        <Route path="/feature/:id" element={<FeatureItem />} />
        <Route path="/documentation/:id" element={<DocumentationItem />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
