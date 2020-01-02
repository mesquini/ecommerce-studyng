import React, { useEffect, useState } from "react";
//import io from "socket.io-client";
import api from "../../Services/api";
import { useHistory } from "react-router-dom";

import buyButton from "../../Assets/botão-comprar-agora.png";
import productNotImage from "../../Assets/productNotImage.png";
import Header from "../Header/Index";

import "./index.css";

export default function Dashboard({ search_product, page_product = 1 }) {
  const [products, setProduct] = useState([]);
  const [page, setPages] = useState(0);
  const [total, setTotal] = useState(0);
  const searchProduct = localStorage.getItem("@ecommerce/product-search");
  var backButton = document.getElementById("backButton");
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
          `products?paginate=${paginate}&page=${1}`
        );
        const { docs, pages, total } = data;
        setProduct(docs);
        setPages(pages);
        setTotal(total);
      }
    }
    load();
  }, [searchProduct]);

  async function loadPage(p) {
    history.push(`/products/${p}`);
    const { data } = await api.get(`products?paginate=${paginate}&page=${p}`);
    const { docs } = data;
    setProduct(docs);
  }

  async function handleBuy(idProduct) {
    console.log(idProduct);
  }
  var next = 1;
  function handleBack(e) {
    e.preventDefault();
    let p = page + 1;
    if (page === p) return;
    else loadPage(p);
  }
  function handleProxy(e) {
    e.preventDefault();
    next++;
    if (page > next) return;
    else loadPage(next);
  }

  return (
    <div>
      <Header search_product={search_product} page_product={page_product} />
      <div className="main">
        <strong>Total de itens {total}</strong>
        <ul>
          {products.map(p => (
            <li key={p.id}>
              {p.photos.map(i =>
                i.url ? (
                  <img key={i.url} src={i.url} alt="product" />
                ) : (
                  <img src={productNotImage} alt="product" />
                )
              )}
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
        <div className="buttonsPages">
          <button
            className="backButton"
            id="backButton"
            onClick={e => handleBack(e)}
          >
            Anterior
          </button>
          <button className="nextButton" onClick={e => handleProxy(e)}>
            Proximo
          </button>
        </div>
      </div>
    </div>
  );
}
