import React, {useContext} from "react";
import { ProductsContext } from "../context/ProductsContext";

export default function ProductCard({product}) {
    const {products, setProducts} = useContext(ProductsContext);

    const changeFavourite = (e,item) => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        const productIndex = products.findIndex(el => el.id === item.id);
        const updatedObj = Object.assign({}, products[productIndex],{isFavorite: !products[productIndex].isFavorite});
        const newProducts = [
            ...products.slice(0,productIndex),
            updatedObj,
            ...products.slice(productIndex + 1)
        ]
        setProducts(newProducts);
    }

    const handleClick = () => {
        window.open("https://www.gittigidiyor.com/apple-iphone-12-pro_spp_849453?id=674936495",'_target');
    }

    return (
        <div className="product-card" onClick={(e) => handleClick(e, product)}>
            <div className="like-icon">
                {
                    product.isFavorite ===  true 
                    ? <i className='bx bxs-heart bx-border-circle' style={{"color":"red"}} onClick={(e) => {changeFavourite(e,product)}}></i>
                    : <i className='bx bxs-heart bx-border-circle' onClick={(e) => {changeFavourite(e,product)}}></i>
                }
            </div>
            <div className="product-image">
                <img className="active" src={`http://localhost:3000//img/${product.imgName}.jpg`} alt="blue" />
            </div>
            <div className="product-details">
                <div className="product-title">
                    <h4 className="product-name">{product.title}</h4>
                </div>
                <div className="product-price">
                        <span className="price">{product.price} {product.currency}</span>
                </div>
                <div className="shipment-details">
                    { product.shippmentState !== "Ücretli Kargo" 
                        ? <i className="bx bxs-truck"></i>
                        : null
                    }
                        <span>{product.shippmentState}</span>
                </div>
            </div>
        </div>
    );
}