import "./App.css";
import { HomePage } from "./containers/HomePage";
import {UserPage} from "./containers/UserPage";
import { Router, Routes, Route, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/user/:userId" element={<UserPage />} />
          <Route>404 not found</Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
