import React, {useState, useMemo, useEffect} from "react";
import ProductCardList from './ProductCardList';
import FavoriteCard from './FavoriteCard';
import { ProductsContext } from "../context/ProductsContext";

import {
    useQuery,
    gql
} from "@apollo/client";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
export default function App() {

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

      const { data,error, isLoading, isError } = useQuery(gql `
      {
          products {
              id
              title
              price
              currency
              shippmentState
              isFavorite
              imgName
            }
      }
    `);

    const productList = data?.products;

    useEffect(() => {
       if(productList) {
        setProducts(productList);
       }
    },[productList])

    if (isLoading) {
        return ( 
            <Loader
                type="Puff"
                color="#00BFFF"
                height={100}
                width={100}
                timeout={3000} //3 secs
            />
        );
    }

    if (isError) {
        return ( 
            <div className = "product-card-list" >
                <h2 > İlginizi Çekebilecek Ürünler </h2> 
                Error: {error.message}
            </div>
        );
    }

    return (
      <ProductsContext.Provider value={productsList}>
        <div className="main">
          {
            productsList && <>
              <FavoriteCard />
              <ProductCardList />
            </>
          }
        </div>
      </ProductsContext.Provider>
    );
}