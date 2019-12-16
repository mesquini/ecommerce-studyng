import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import api from "../../Services/api";

import buyButton from "../../Assets/botão-comprar-agora.png";

import "./index.css";

export default function Dashboard() {
  const [products, setProduct] = useState([]);
  const [pages, setPages] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    async function load() {
      const { data } = await api.get(`products?paginate=${5}&page=${1}`);
      const { docs, pages, total } = data;

      setProduct(docs);
      setPages(pages);
      setTotal(total);
    }
    load();
  }, []);

  return (
    <div className="main">
      <strong>Total de itens {total}</strong>
      <ul>
        {products.map(p => (
          <li key={p.id}>
            <img src={p.photos.map(i => i.url)} alt="product" />
            <footer>
              <strong>{p.name}</strong>
              <p>Quantidade: {p.quantity}</p>
              <p>R${p.price}</p>
            </footer>
            <button className="buy" style={{ border: 0 }}>
              <img src={buyButton} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
