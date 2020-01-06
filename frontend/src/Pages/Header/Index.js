import React, { useState, useEffect, useRef } from "react";
import api from "../../Services/api";
import { useHistory, Link } from "react-router-dom";
import "./index.css";
import search from "../../Assets/search.png";
import logo from "../../Assets/logo.png";
import cart from "../../Assets/cart.png";
import avatar from "../../Assets/user.png";

export default function Header({ search_product, page_product }) {
  const [user, setUser] = useState({});
  const [searchInput, setSearch] = useState("");
  const [hoverRef, isHovered] = useHover();
  const history = useHistory();

  useEffect(() => {
    async function loadUser() {
      var token = localStorage.getItem("@token-user");
      if (!token) return setUser("");

      const { data } = await api.get(`/verify-token/${token}`);
      setUser(data);
      window.location.reload();
    }
    loadUser();
  }, []);

  async function handleSearch(e) {
    e.preventDefault();
    if (searchInput) {
      const { data } = await api.get(
        `/product-search/${searchInput}?paginate=${2}&page=${page_product}`
      );

      localStorage.setItem("@ecommerce/product-search", JSON.stringify(data));
      history.push(`/product-search/${searchInput}/${page_product}`);
    } else {
      localStorage.removeItem("@ecommerce/product-search");
      history.push("/");
    }
  }

  return (
    <div className="header">
      <Link to='/'>
        <img className="logo" src={logo} alt="logo" />
      </Link>
      <form onSubmit={handleSearch}>
        <input
          className="busca"
          type="text"
          autoComplete="off"
          value={searchInput.toLowerCase()}
          onChange={e => setSearch(e.target.value)}
          placeholder="tem tuudo, pode procurar!"
        />
        <button className="search" type="submit">
          <img style={{ height: 20 }} src={search} alt="pesquisar" />
        </button>
      </form>
      {user.length > 0 ? (
        <strong className="user-name">Bem vindo {user.name}</strong>
      ) : (
        <button className="avatarB" ref={hoverRef}>
          <img className="avatar" src={avatar} alt="avatar" />
        </button>
      )}
      <button style={{ width: 10, marginLeft: 130 }}>
        <img className="cart" src={cart} alt="cart" />
      </button>
      {isHovered && (
        <div className="login-register">
          <button>Entrar</button>
          <button>Cadastrar</button>
        </div>
      )}
    </div>
  );
}

// Hook
function useHover() {
  const [value, setValue] = useState(false);

  const ref = useRef(null);

  const handleMouseOver = () => setValue(true);
  const handleMouseOut = () => setValue(false);

  useEffect(
    () => {
      const node = ref.current;
      if (node) {
        node.addEventListener("mouseover", handleMouseOver);
        //node.addEventListener("mouseout", handleMouseOut);
        node.addEventListener("click", handleMouseOut);

        return () => {
          node.removeEventListener("mouseover", handleMouseOver);
          //node.removeEventListener("mouseout", handleMouseOut);
          node.removeEventListener("click", handleMouseOut);
        };
      }
    },
    [ref.current] // Recall only if ref changes
  );

  return [ref, value];
}
