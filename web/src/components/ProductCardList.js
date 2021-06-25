import React, {
    useContext,
    useEffect,
    useState
} from "react";

import ProductCard from "./ProductCard";
import {
    useQuery,
    gql
} from "@apollo/client";

import { ProductsContext } from "../context/ProductsContext";
export default function ProductCardList() {
    const { products, setProducts, showFavourite } = useContext(ProductsContext);

    const [shownProducts, setShownProducts] = useState(null);

    const { data } = useQuery(gql `
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



  const getFavouriteProducts =() => {
    return products?.filter(product => product.isFavorite)
};

    const productList = data?.products;

    useEffect(() => {
       if(productList) {
        setProducts(productList);
       }
    },[productList])

    useEffect(() => {
        if(products){
            if (showFavourite) {
                setShownProducts(getFavouriteProducts());
            } else {
                setShownProducts(products)
            }
            console.log(products);
        }
    }, [showFavourite])
    return ( 
        <div className = "product-card-list" >
            <h2 > İlginizi Çekebilecek Ürünler </h2> 
            <div className = "list-div" >
                <div className = "list" >
                    { products  && (
                        showFavourite ? 
                        Object.keys(getFavouriteProducts()).map((item, i) => (
                            <ProductCard key={i} product={getFavouriteProducts()[item]} />
                        )) : Object.keys(products).map((item, i) => (
                            <ProductCard key={i} product={products[item]} />
                        ))
                    )
                    }
                </div> 
            </div> 
        </div>
    );
}