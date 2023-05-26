"use client";
import MyLoading from "@/app/(main)/MyLoading";
import { getProduct } from "@/pages/api/auth/getProducts";
import { Prodotto } from "@/types";
import React, { useEffect, useState } from "react";

function Product({ params }: any) {
  const [product, setProduct] = useState<Prodotto>();
  const [immagineUrl, setImmagineUrl] = useState();

  const getRandomNumber = () => {
    const min = 1;
    const max = 4;
    // Generate a random decimal between 0 (inclusive) and 1 (exclusive)
    const randomDecimal = Math.random();
    // Scale the random decimal to be between 0 (inclusive) and (max - min) exclusive
    const scaledDecimal = randomDecimal * (max - min);
    // Round down the scaled decimal to the nearest integer
    const randomNumber = Math.floor(scaledDecimal) + min;
    return randomNumber;
  };

  let random = getRandomNumber();
  const [isLoading, setIsLoading] = useState(random);

  useEffect(() => {
    async function fetchData(params: any) {
      const prodottiData = await getProduct(params.id);

      setTimeout(() => {
        prodottiData ? setImmagineUrl(prodottiData.immagineUrl) : null;
        delete prodottiData.immagineUrl;
        prodottiData ? setProduct(prodottiData) : null;
        setIsLoading(0);
      }, 1000);
    }
    fetchData(params);
  }, []);

  console.log(product);
  return (
    <>
      <div className="bg-white flex justify-center items-center flex-grow z-0">
        {product ? (
          product.nome
        ) : (
          <>
            <MyLoading isLoading={isLoading} />
          </>
        )}
      </div>
    </>
  );
}

export default Product;
