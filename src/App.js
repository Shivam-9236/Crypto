import {BrowserRouter as Router,Route,Routes}  from "react-router-dom"
import Header from "./components/Header";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Coins from "./components/Coins";
import Exchanges from "./components/Exchanges";
import Coindetail from "./components/Coindetail";



function App() {
  return (
    <Router>
      <Header />
      <Routes>
     
        <Route path="/" element={<Home/>} />
        <Route path="/Coins" element={<Coins/>} />
        <Route path="/exchanges" element={<Exchanges/>} />
        <Route path="/coin/:id" element={<Coindetail/>} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
