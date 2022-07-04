import { Navigate, Route, Routes } from "react-router-dom";
import { Details } from "./components/details/Details";
import { Home } from "./components/home/Home";

function App() {
    return (
        <div className="App">
            <div className="Main">
                <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route path="/details/:id" element={<Details />} />
                    <Route path="*" element={<Navigate to="/home" />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
