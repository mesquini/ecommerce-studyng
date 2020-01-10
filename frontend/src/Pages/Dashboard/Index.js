import React, { useEffect, useState } from "react";
import api from "../../Services/api";
import { useHistory, Link } from "react-router-dom";
//import io from "socket.io-client";

import buyButton from "../../Assets/botão-comprar-agora.png";
import Header from "../Header/Index";
import { Pagination, Image } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

export default function Dashboard({ search_product, page_product = 1 }) {
  const [products, setProduct] = useState([]);
  const [page, setPages] = useState(0);
  const [count, setCount] = useState(0);
  const [total, setTotal] = useState(0);
  const searchProduct = localStorage.getItem("@ecommerce/product-search");
  const history = useHistory();
  const paginate = 3;

  useEffect(() => {
    async function load() {
      if (searchProduct) {
        let { docs, pages, total } = JSON.parse(searchProduct);
        setProduct(docs);
        setPages(pages);
        setTotal(total);
      } else {
        const { data } = await api.get(
          `products?paginate=${paginate}&page=${page_product}`
        );
        const { docs, pages, total } = data;
        setProduct(docs);
        setTotal(total);
        if (pages) setPages(pages);
      }
    }
    load();
  }, [searchProduct, search_product]);

  async function handleBuy(idProduct) {
    console.log(idProduct);
  }

  async function loadPage(p) {
    const { data } = await api.get(`products?paginate=${paginate}&page=${p}`);
    const { docs } = data;
    setProduct(docs);
    setCount(p);
    history.push(`/products/${p}`);
  }

  function countPage() {
    let active = count === 0 ? 1 : count;
    let items = [];

    for (let number = 1; number <= page; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === active}
          onClick={() => loadPage(number)}
        >
          {number}
        </Pagination.Item>
      );
    }
    return items;
  }

  function PaginationBasic() {
    return (
      <Pagination style={{ justifyContent: "center" }}>
        {countPage()}
      </Pagination>
    );
  }

  return (
    <>
      <Header search_product={search_product} page_product={page_product} />
      <div className="main">
        <strong>Total de itens {total}</strong>
        <ul>
          {products.map(p => (
            <li key={p.id}>
              {p.photos.map(i => (
                <Link to={`/product/${p.id}`}>
                  <Image src={i.url} rounded alt="product" />
                </Link>
              ))}
              <footer>
                <strong>{p.name}</strong>
                <p>Quantidade: {p.quantity}</p>
                <p>R${p.price}</p>
              </footer>
              <button
                className="buy"
                onClick={() => handleBuy(p.id)}
                style={{ border: 0 }}
              >
                <img src={buyButton} alt="buyButton" />
              </button>
            </li>
          ))}
        </ul>
      </div>
      <PaginationBasic />
    </>
  );
}
