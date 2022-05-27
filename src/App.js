import { useEffect, useImperativeHandle, useState } from "react";
import "./styles.css";

export default function App() {
  const [resourceType, setResourceType] = useState("posts");
  const [items, setItems] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [product, setProduct] = useState("products");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/${product}`)
      .then((res) => res.json())
      .then((json) => setProducts(json));
  }, [product]);

  useEffect(() => {
    console.log("useEffects created");
    fetch(`https://jsonplaceholder.typicode.com/${resourceType}`)
      .then((response) => response.json())
      .then((json) => setItems(json));
  }, [resourceType]);

  const handle = () => {
    //above is an Arrow function
    setWindowWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", handle);
    // Below is a useEffect clean up function
    return () => {
      window.removeEventListener("resize", handle);
    };
  }, [windowWidth]);

  return (
    <>
      <div className="App">
        <h1>Blog</h1>
        <button onClick={() => setResourceType("posts")}>Posts</button>
        <button onClick={() => setResourceType("users")}>Users</button>
        <button onClick={() => setResourceType("comments")}>Comments</button>
        <h2>{resourceType}</h2>
        {items.map((item) => {
          return <pre key={item.id}>{JSON.stringify(item)} </pre>;
        })}
        <h1>{windowWidth}</h1>
      </div>

      <div className="App">
        <h1>FAKE Store API</h1>
        <button onClick={() => setProduct("products")}>Products</button>
        <button onClick={() => setProduct("carts")}>Cart</button>
        <button onClick={() => setProduct("users")}>Users</button>
        <button onClick={() => setProduct("login")}>Login</button>
        <h2>{product.product}</h2>
        {products.map((product) => {
          return (
            <pre key={product.id}>
              <pre>{JSON.stringify(product)}</pre>
              <h1>{product.category}</h1>
              <img src={product.image} alt="" className="img" />
              <h4>{product.title}</h4>
              <h4>Username: {product.username}</h4>

              {/* <h4>{product.name["firstname"]}</h4>
              <h4>{product.name["lasttname"]}</h4> 
              <h4>{product.address["city"]}</h4> 
              */}

              <h4>Email: {product.email}</h4>
              <h4>Phone: {product.phone}</h4>

              <h4>Password :{product.password}</h4>

              <p>{product.description}</p>
              <span>Price: ${product.price}</span>
            </pre>
          );
        })}
      </div>
    </>
  );
}
