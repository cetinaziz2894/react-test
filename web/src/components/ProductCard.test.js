import React from "react";
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { ProductsContext }  from "../context/ProductsContext";
import ProductCard from "./ProductCard";

const dummyData = [
    {
      "id":1,
      "title": "Apple Iphone 12 Pro Max 128GB Mavi DEMO (Apple Türkiye Garantili)",
      "price": "8.345,00",
      "currency": "TL",
      "shippmentState": "Ücretsiz Kargo",
      "isFavorite": false,
      "imgName":"apple_iPhone_12_mini_cep_telefonu"
    },
    {
      "id":2,
      "title": "Apple iPhone 12 Pro Cep Telefonu",
      "price": "13.875,00",
      "currency": "TL",
      "shippmentState": "Ücretsiz – Aynı Gün Kargo",
      "isFavorite": true,
      "imgName":"apple_iPhone_12_pro_cep_telefonu"
    },
    {
      "id":3,
      "title": "Apple iPhone 12 Pro Max Cep Telefonu",
      "price": "15.671,00",
      "currency": "TL",
      "shippmentState": "Ücretli Kargo",
      "isFavorite": false,
      "imgName":"apple_iPhone_12_pro_max_cep_telefonu"
    },
    {
      "id":4,
      "title": "Apple iPhone 12 Cep Telefonu",
      "price": "10.467,00",
      "currency": "TL",
      "shippmentState": "Ücretli Kargo",
      "isFavorite": false,
      "imgName":"apple_iPhone_12_cep_telefonu"
    },
    {
      "id":5,
      "title": "Apple iPhone 12 128 GB Kırmızı Cep Telefonu (Apple Türkiye Garantili)",
      "price": "11.999,00",
      "currency": "TL",
      "shippmentState": "Ücretli Kargo",
      "isFavorite": false,
      "imgName":"apple_iPhone_12_kirmizi_cep_telefonu"
    }
  ];

const dummyProduct = {
    "id":2,
    "title": "Apple iPhone 12 Pro Cep Telefonu",
    "price": "13.875,00",
    "currency": "TL",
    "shippmentState": "Ücretsiz – Aynı Gün Kargo",
    "isFavorite": true,
    "imgName":"apple_iPhone_12_pro_cep_telefonu"
  };
  const dummyProductWithIsFavouriteFalse = {
    "id":2,
    "title": "Apple iPhone 12 Pro Cep Telefonu",
    "price": "13.875,00",
    "currency": "TL",
    "shippmentState": "Ücretsiz – Aynı Gün Kargo",
    "isFavorite": true,
    "imgName":"apple_iPhone_12_pro_cep_telefonu"
  };
  
describe('ProductCard', () => {
    test('products card renders correctly', () => {
      const { container } = render(
        <ProductsContext.Provider value={{products:dummyData}}>
          <ProductCard product={dummyProduct}/>
        </ProductsContext.Provider>
        );
      expect(container.firstChild.classList.contains('product-card')).toBe(true)
    });

    test('products card like button red renders correctly', () => {
        const  component = render(
          <ProductsContext.Provider value={{products:dummyData}}>
            <ProductCard product={dummyProduct}/>
          </ProductsContext.Provider>
          );
        const icon = component.getByTestId("red_icon");
        expect(icon.style.color).toBe('red');
    });
    test('products card like button gray renders correctly', () => {
        const  component = render(
          <ProductsContext.Provider value={{products:dummyData}}>
            <ProductCard product={dummyProductWithIsFavouriteFalse}/>
          </ProductsContext.Provider>
          );
        const icon = component.getByTestId("red_icon");
        expect(icon).not.toHaveProperty('color','red');
    });

    test('products card image renders correctly', () => {
        const  {getByAltText}  = render(
          <ProductsContext.Provider value={{products:dummyData}}>
            <ProductCard product={dummyProduct}/>
          </ProductsContext.Provider>
          );
        getByAltText(dummyProduct.imgName);
    });

    test('products card title renders correctly', () => {
        const  component  = render(
          <ProductsContext.Provider value={{products:dummyData}}>
            <ProductCard product={dummyProduct}/>
          </ProductsContext.Provider>
          );
          expect(component.getByTestId("product_title").textContent).toBe(dummyProduct.title)
    });

    test('products card price and currency renders correctly', () => {
        const  component = render(
          <ProductsContext.Provider value={{products:dummyData}}>
            <ProductCard product={dummyProduct}/>
          </ProductsContext.Provider>
          );
          const element = component.getByTestId('product_price');
          expect(element).toHaveTextContent(dummyProduct.price)
    });

    test('products card shippment state renders correctly', () => {
        const  component = render(
          <ProductsContext.Provider value={{products:dummyData}}>
            <ProductCard product={dummyProduct}/>
          </ProductsContext.Provider>
          );
          const element = component.getByTestId('product_shippmentState');
          expect(element).toHaveTextContent(dummyProduct.shippmentState)
    });

    test('products card shippment icon renders correctly', () => {
        const  component = render(
          <ProductsContext.Provider value={{products:dummyData}}>
            <ProductCard product={dummyProduct}/>
          </ProductsContext.Provider>
          );
          const icon = component.getByTestId('shipment_icon');
          const element = component.getByTestId('product_shippmentState');
          if (element.textContent === 'Ücretsiz – Aynı Gün Kargo' || element.textContent === 'Ücretsiz Kargo') {
            expect(icon).toBeTruthy();
          }
    });
  });
