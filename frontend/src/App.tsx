import { Routes, Route } from "react-router-dom";
import Films from "./pages/Films";
import Main from "./pages/Main";
import "./style/index.css"
import Header from "./components/Header";
import MainMenu from "./pages/MainMenu";
import { useAppSelector } from "./hooks/redux";
import Predict from "./pages/Predict";
function App() {
  const user = useAppSelector(state => state.user)

  return (
    <div className="App">
      {
        user.name
      }
      <Header></Header>
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/films" element={<Films />}></Route>
        <Route path="/menu" element={<MainMenu />}></Route>
        <Route path="/predict" element={<Predict />}></Route>
      </Routes>
    </div>
  );
}

export default App;
