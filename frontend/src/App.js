import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Product from "./pages/Product";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";

function App() {
  const user = true;
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:id" element={<Product />} />

        <Route path="/cart" element={<Cart />} />
        
        <Route 
          path="/login"
          render={ () => user && <Navigate replace to="/" /> }
          element={<Login />}
        />
        
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
