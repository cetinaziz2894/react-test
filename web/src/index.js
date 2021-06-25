import React, {useState, useMemo} from "react";
import { render } from "react-dom";
import ProductCardList from './components/ProductCardList';
import FavoriteCard from './components/FavoriteCard';
import {ProductsContext} from "./context/ProductsContext";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider
} from "@apollo/client";
import './assets/styles/main.css';

const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache()
});

function App() {

  const [products, setProducts] = useState(null);
  const [showFavourite, setShowFavourite] = useState(false);

  const productsList = useMemo(() => (
    {
    products, 
    setProducts,
    showFavourite, 
    setShowFavourite
    }), 
    [
      products,
      setProducts,
      showFavourite, 
      setShowFavourite
    ])
  return (
    <ProductsContext.Provider value={productsList}>
      <div className="main">
        {
          productsList ? <>
            <FavoriteCard />
            <ProductCardList />
          </> :
          <>
            {
              <p>Yükleniyor...</p>
            }
          </>
        }
      </div>
    </ProductsContext.Provider>
  );
}

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
