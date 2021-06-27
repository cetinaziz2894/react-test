import React, {
    useContext
} from "react";

import ProductCard from "./ProductCard";
import { ProductsContext } from "../context/ProductsContext";
export default function ProductCardList() {
    const { products, showFavourite } = useContext(ProductsContext);

    const getFavouriteProducts =(products) => {
        return products?.filter(product => product.isFavorite)
    };

    return ( 
        <div className = "product-card-list" >
            <h2 data-testid="card_title">İlginizi Çekebilecek Ürünler</h2> 
            <div className = "list-div" >
                <div className = "list" data-testid="list">
                    { products  && (
                        showFavourite ? 
                        Object.keys(getFavouriteProducts(products)).map((item, i) => (
                            <ProductCard key={i} product={getFavouriteProducts(products)[item]} />
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