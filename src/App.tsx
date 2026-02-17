import { BrowserRouter, Routes, Route } from "react-router-dom";
import InitPage from "./pages/InitPage/InitPage";
import Layout from "./components/Layout/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<InitPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
