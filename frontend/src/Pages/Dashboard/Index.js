import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import api from "../../Services/api";

import buyButton from "../../Assets/botão-comprar-agora.png";
import productNotImage from "../../Assets/productNotImage.png";

import Header from "../Header/Index";

import "./index.css";

export default function Dashboard({ history }) {
  const [products, setProduct] = useState([]);
  const [pages, setPages] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    async function load() {
      var searchProduct = await localStorage.getItem(
        "@ecommerce/product-search"
      );

      if (searchProduct) {
        let { docs, pages, total } = JSON.parse(searchProduct);
        setProduct(docs);
        setPages(pages);
        setTotal(total);
      } else {
        const { data } = await api.get(`products?paginate=${5}&page=${1}`);
        const { docs, pages, total } = data;
        setProduct(docs);
        setPages(pages);
        setTotal(total);
      }
    }
    load();
  }, []);

  async function handleBuy(idProduct) {
    console.log(idProduct);
  }

  return (
    <div>
      <Header history={history} />
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
                <img src={buyButton} />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
