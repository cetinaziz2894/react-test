import React from "react";
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { ProductsContext }  from "../context/ProductsContext";
import FavoriteCard from "./FavoriteCard";
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

  const dummyProductsWithIsFavouriteFalse =     [{
    "id":1,
    "title": "Apple Iphone 12 Pro Max 128GB Mavi DEMO (Apple Türkiye Garantili)",
    "price": "8.345,00",
    "currency": "TL",
    "shippmentState": "Ücretsiz Kargo",
    "isFavorite": false,
    "imgName":"apple_iPhone_12_mini_cep_telefonu"
  },{
    "id":2,
    "title": "Apple iPhone 12 Pro Cep Telefonu",
    "price": "13.875,00",
    "currency": "TL",
    "shippmentState": "Ücretsiz – Aynı Gün Kargo",
    "isFavorite": false,
    "imgName":"apple_iPhone_12_pro_cep_telefonu"
  }];
  
describe('FavouriteCard', () => {
    test('favourite card renders correctly', () => {
      const { container } = render(
        <ProductsContext.Provider value={{products:dummyData}}>
          <FavoriteCard/>
        </ProductsContext.Provider>
        );
      expect(container.firstChild.classList.contains('favourite-products')).toBe(true)
    });

    test('favourite card favourite count renders correctly', () => {
        const component = render(
          <ProductsContext.Provider value={{products:dummyData}}>
            <FavoriteCard/>
          </ProductsContext.Provider>
          );
        const icon = component.getByTestId("icon_heart");
        expect(icon.style.color).toBe('red');
      });

      test('favourite card favourite count renders correctly', () => {
        const component = render(
          <ProductsContext.Provider value={{products:dummyProductsWithIsFavouriteFalse}}>
            <FavoriteCard/>
          </ProductsContext.Provider>
          );
        const icon = component.getByTestId("icon_heart");
        expect(icon.style.color).toBe('gray');
      });

      test('favourite card favourite count 0 calculate correctly', () => {
        const component = render(
          <ProductsContext.Provider value={{products:dummyProductsWithIsFavouriteFalse}}>
            <FavoriteCard/>
          </ProductsContext.Provider>
          );
        const favouriteCountDiv = component.getByTestId("favourite_count");
        expect(favouriteCountDiv).toHaveTextContent(/0 ürün/i);
      });

      test('favourite card favourite count 1 calculate correctly', () => {
        const component = render(
          <ProductsContext.Provider value={{products:dummyData}}>
            <FavoriteCard />
          </ProductsContext.Provider>
          );
        const favouriteCountDiv = component.getByTestId("favourite_count");
        expect(favouriteCountDiv).toHaveTextContent(/1 ürün/i);
      });

      test('favourite card favourite count bigger than 0 calculate correctly', () => {
        const component = render(
          <ProductsContext.Provider value={{products:dummyData, showFavourite:true}}>
            <FavoriteCard />
          </ProductsContext.Provider>
          );
        const favourites = component.getByTestId("favourites");
        expect(favourites).toBeTruthy();
      });

      test('favourite card favourites div click correctly', () => {
        const testFunc = () => {
            return false
        }
        const component = render(
          <ProductsContext.Provider value={{products:dummyData, showFavourite:true, setShowFavourite:testFunc}}>
            <FavoriteCard />
            <ProductCardList />
          </ProductsContext.Provider>
          );
        const favourites = component.getByTestId("favourites");
        fireEvent.click(favourites);
        expect(component.getByTestId('list')).toBeTruthy();
      });


});
