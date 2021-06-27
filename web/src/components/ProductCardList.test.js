import React from "react";
import { render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { ProductsContext }  from "../context/ProductsContext";
import ProductCardList from "./ProductCardList";

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


  describe('ProductCardList', () => {
    test('products card list renders correctly', () => {
      const { container } = render(
        <ProductsContext.Provider value={{products:dummyData, showFavourite:false}}>
          <ProductCardList />
        </ProductsContext.Provider>
        );
      expect(container.firstChild.classList.contains('product-card-list')).toBe(true)
    })
    test('products card list title renders correctly', () => {
      const component = render(
      <ProductsContext.Provider value={{products:dummyData, showFavourite:false}}>
        <ProductCardList />
      </ProductsContext.Provider>
      );
      const h2El = component.getByTestId("card_title");
      expect(h2El.textContent).toBe("İlginizi Çekebilecek Ürünler");
    })
  });