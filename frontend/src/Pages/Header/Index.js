import React, { useState, useEffect } from "react";
import api from "../../Services/api";

import "./index.css";
import search from "../../Assets/search.png";
import logo from "../../Assets/logo.png";
import cart from "../../Assets/cart.png";

export default function Header() {
  const [user, setUser] = useState({});

  useEffect(() => {
    async function loadUser() {
      localStorage.setItem(
        "@token-user",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTc2NTE1ODMwfQ.qorTbKGW3n2S5cdv2ajoCilI3HkTN1zxmENTlyRfRQ0"
      );
      var token = localStorage.getItem("@token-user");
      if (!token) return;

      const { data } = await api.get(`/verify-token/${token}`);
      setUser(data);
      //window.location.reload();
    }
    loadUser();
  }, []);

  return (
    <div className="header">
      <img className="logo" src={logo} alt="logo" />
      <input
        className="busca"
        type="text"
        autoComplete="off"
        placeholder="tem tuudo, pode procurar!"
      />
      <button style={{ width: 20, marginLeft: 130, paddingBottom: 10 }}>
        <img style={{ height: 20 }} src={search} alt="pesquisar" />
      </button>
      {user ? (
        <strong style={{ marginTop: 10 }}>Bem vindo {user.name}</strong>
      ) : (
        <button>
          <img src="" alt="avatar" />
        </button>
      )}
      <button style={{ width: 10, marginLeft: 130 }}>
        <img className="cart" src={cart} alt="cart" />
      </button>
    </div>
  );
}
