import React, {useContext, useEffect, useState} from "react";
import { ProductsContext } from "../context/ProductsContext";

export const multiply = (a,b) => {
    return a * b;
}

export default function FavoriteCard() {
    const {products, setShowFavourite,showFavourite} = useContext(ProductsContext);
    const [favouriteCount, setFavouriteCount] = useState(0)

    const getFavouriteProductsCount = (products) => {
        return products.filter(product => product.isFavorite === true).length;
    }

    useEffect(() => {
        if(products) {
            setFavouriteCount(getFavouriteProductsCount(products))
        }
      },[products])

    return (
        <div className="favouriteProducts">
            <div className="icon-div">
                { <i className='bx bxs-heart' style={{color:favouriteCount > 0 ? "red": "gray"}}></i>
                }
                <span> {favouriteCount} Ürün</span>
            </div>
            <div className="favourites" onClick={() => setShowFavourite(!showFavourite)}>
                <span>Beğendiklerim</span>
            </div>
        </div>
    );
  }