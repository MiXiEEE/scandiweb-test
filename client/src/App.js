import { Route, Routes } from "react-router-dom";
import Cart from "./components/Cart";
import Navbar from "./components/Navbar";
import Product from "./components/Product";
import ProductPage from "./components/ProductPage";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<ProductPage />} />
        <Route path="/:id" element={<ProductPage />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/product" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
}

export default App;
