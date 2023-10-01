import "./App.css";
import React from "react";
import Navigation from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import ProductDisplay from "./pages/ProductDisplay";

function App() {
  return (
    <div className="App">
      <Navigation />
      <ProductDisplay />
    </div>
  );
}

export default App;
