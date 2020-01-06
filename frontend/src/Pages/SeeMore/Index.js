import React, { useState, useEffect } from "react";
import api from "../../Services/api";
import { useHistory } from "react-router-dom";
import "./index.css";
import Header from "../Header/Index";

export default function SeeMore({ id_product }) {
  const [product, setProduct] = useState({});
  const [photos, setPhotos] = useState([]);
  const history = useHistory();

  useEffect(() => {
    async function load() {
      const { data } = await api.get(`/product/${id_product}`);
      setProduct(data);
      setPhotos(data.photos);
    }
    load();
  }, [id_product]);

  return (
    <>
      <Header />
      <div className="seemore">
        <strong>{product.name}</strong>
        <p>Quantidade: {product.quantity}</p>
        <p>Preço: R${product.price}</p>
        {photos.map(p => (
          <img className="image" key={p.id} src={p.url} />
        ))}
      </div>
    </>
  );
}
