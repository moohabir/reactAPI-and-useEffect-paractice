import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [resourceType, setResourceType] = useState("posts");
  const [items, setItems] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [product, setProduct] = useState("products");
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState(["name"]);
  const [userName, setUserName] = useState("user");

  useEffect(() => {
    fetch(`https://fakestoreapi.com/${product}`)
      .then((res) => res.json())
      .then((json) => setProducts(json));
  }, [product]);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/${userName}`)
      .then((res) => res.json())
      .then((json) => setUsers(json.name));
  }, [userName]);

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
        <h1>{product}</h1>

        {products.map((product) => {
          return (
            <>
              <pre>{JSON.stringify(product)}</pre>

              <h1>{product.category}</h1>
              <img src={product.image} alt="" className="img" />
              <h4>{product.title}</h4>
              <p>{product.description}</p>
              <p>Price: ${product.price}</p>
            </>
          );
        })}
      </div>
      {users.map((user) => {
        return (
          <div>
            <h4>{user.username}</h4>
            <h4>{user.firstnam}</h4>
            <h4>{product.email}</h4>
            <h4>{product.phone}</h4>
            <h4>{product.password}</h4>
          </div>
        );
      })}
    </>
  );
}
