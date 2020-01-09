import React, { useEffect, useState } from "react";
//import io from "socket.io-client";
import api from "../../Services/api";
import { useHistory } from "react-router-dom";

import buyButton from "../../Assets/botão-comprar-agora.png";
import Header from "../Header/Index";
import { Pagination } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

export default function Dashboard({ search_product, page_product = 1 }) {
  const [products, setProduct] = useState([]);
  const [page, setPages] = useState(0);
  const [count, setCount] = useState(0);
  const [total, setTotal] = useState(0);
  const searchProduct = localStorage.getItem("@ecommerce/product-search");
  const history = useHistory();
  const paginate = 2;

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
        setPages(pages);
        setTotal(total);
      }
    }
    load();
  }, [searchProduct, search_product]);

  async function loadPage(p) {
    const { data } = await api.get(`products?paginate=${paginate}&page=${p}`);
    const { docs } = data;
    setProduct(docs);
    setCount(p);
    history.push(`/products/${p}`);
  }

  async function handleBuy(idProduct) {
    console.log(idProduct);
  }
  async function handleSeeMore(idProduct) {
    history.push(`/product/${idProduct}`);
  }

  function handleBack(e) {
    e.preventDefault();
    if (page < count) return;
    else {
      let c = count - 1;
      loadPage(c);
    }
  }
  function handleProxy(e) {
    e.preventDefault();
    if (count >= page) return;
    else {
      let c = count + 1;
      c = c === 1 ? 2 : c;
      loadPage(c);
    }
  }
  let active = 2;
  let items = [];
  for (let number = 1; number <= page_product; number++) {
    items.push(
      <Pagination.Item key={number} active={number === active}>
        {number}
      </Pagination.Item>
    );
  }

  function PaginationBasic() {
    return (
      <div>
        <Pagination>{items}</Pagination>
      </div>
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
                <button
                  className="see-more"
                  onClick={() => handleSeeMore(p.id)}
                  style={{ border: 0, cursor: "pointer" }}
                  key={i.id}
                >
                  <img src={i.url} alt="product" />
                </button>
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
        <PaginationBasic />
        <div className="buttonsPages">
          <button className="backButton" onClick={e => handleBack(e)}>
            Anterior
          </button>
          <button className="nextButton" onClick={e => handleProxy(e)}>
            Proximo
          </button>
        </div>
      </div>
    </>
  );
}
