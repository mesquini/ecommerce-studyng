import React, { useState, useEffect } from "react";
import api from "../../Services/api";
import { useHistory } from "react-router-dom";
import { Carousel } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import Header from "../Header/Index";

export default function SeeMore({ id_product }) {
  const [product, setProduct] = useState({});
  const [photos, setPhotos] = useState([]);
  const history = useHistory();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(null);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
    setDirection(e.direction);
  };

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
        <Carousel
          activeIndex={index}
          direction={direction}
          onSelect={handleSelect}
        >
          {photos.map(p => (
            <Carousel.Item key={p.id}>
              <img
                className="d-block w-80"                
                src={p.url}
                alt="product"
              />
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </>
  );
}
