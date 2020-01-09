import React, { useState, useEffect, useRef } from "react";
import api from "../../Services/api";
import { useHistory, Link } from "react-router-dom";
import {
  Form,
  FormControl,
  Button,
  Navbar,
  Nav,
  NavDropdown
} from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
//import "./index.css";

import logo from "../../Assets/logo.png";
import cart from "../../Assets/cart.png";
import avatar from "../../Assets/user.png";

export default function Header({ search_product, page_product }) {
  const [user, setUser] = useState({});
  const [searchInput, setSearch] = useState("");
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
    <>
      <Navbar collapseOnSelect bg="dark" variant="dark">
        <Link to="/">
          <Navbar.Brand>
            <img
              width="300"
              height="30"
              className="d-inline-block align-top"
              src={logo}
              alt="logo"
            />
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
            <Form inline>
              <FormControl
                className="mr-sm-2"
                type="text"
                autoComplete="off"
                value={searchInput.toLowerCase()}
                onChange={e => setSearch(e.target.value)}
                placeholder="tem tuudo, pode procurar!"
                style={{width: 450}}
              />
              <Button onClick={handleSearch} variant="outline-info">
                Pesquisar
              </Button>
            </Form>
            <Link to="/create-product">
              <Button variant="outline-info">Cadastrar item</Button>
            </Link>
            {!user.length > 0 ? (
              <NavDropdown
                title={
                  <img style={{ width: 25 }} src={avatar} alt="avatar" />
                }
                id="collasible-nav-dropdown"
              >
                <NavDropdown.Item href="#">Acessar</NavDropdown.Item>
                <NavDropdown.Item href="#">Cadastrar</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <strong className="user-name">Bem vindo {user.name}</strong>
            )}
            <NavDropdown
              title={<img style={{ width: 25 }} src={cart} alt="cart" />}
              id="collasible-nav-dropdown"
            >
              <NavDropdown.Item href="#">Lista de Itens...</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}
