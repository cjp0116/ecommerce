import { useState, useEffect } from "react";
import styled from "styled-components";
import { popularProducts } from "../data";
import Product from "./Product";

const Container = styled.div`
  padding : 20px;
  display : flex;
  flex-wrap: wrap;
  justify-content: space-between;
`
const Products = ({ cat, filters, sort}) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
         
      } catch (error) {
        
      }
    }
  }, [])
  return (
    <Container>
      {popularProducts.map(item => (
        <Product key={item.id} item={item}/>
      ))}
    </Container>
  )
}

export default Products;