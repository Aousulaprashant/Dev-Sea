import Auth from "./components/Auth";
import Home from "./components/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AskQuation from "./components/AskQuation";
import ViewQuation from "./components/ViewQuation";
import TagsPage from "./components/tagsPage";
import MainLayout from "./components/MainLayout";
import Saved from "./components/Saved";
import DevTools from "./components/DevTools";
import { SearchProvider } from "./components/SearchContex";

const App = () => {
  return (
    <SearchProvider>
      <Router>
        <Routes>
          <Route path="/Auth" element={<Auth />} />

          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/AskQuestion" element={<AskQuation />} />
            <Route path="/ViewQuestion" element={<ViewQuation />} />
            <Route path="/Tags" element={<TagsPage />} />
            <Route path="/saved" element={<Saved />} />
            <Route path="/DevTools" element={<DevTools />} />
          </Route>
        </Routes>
      </Router>
    </SearchProvider>
  );
};

export default App;
