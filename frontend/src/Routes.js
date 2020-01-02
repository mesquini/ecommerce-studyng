import React from "react";
import { BrowserRouter, Route, useParams } from "react-router-dom";

import Dashboard from "./Pages/Dashboard/Index";

export default function Routes() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Dashboard} />
      <Route path="/product-search" exact component={Dashboard} />
      <Route path="/products/:page_product" component={SearchProduct} />
      <Route path="/product-search/:search_product/:page_product" component={SearchProduct} />
    </BrowserRouter>
  );
}

function SearchProduct() {
  let { search_product, page_product } = useParams();
    
  return Dashboard({ search_product, page_product });
}
