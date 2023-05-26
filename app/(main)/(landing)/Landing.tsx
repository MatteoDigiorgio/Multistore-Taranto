"use client";
import React, { Suspense, useEffect, useState } from "react";
import Products from "./(products)/Products";
import { Prodotto } from "@/types";
import { getProducts } from "@/pages/api/auth/getProducts";
import MyLoading from "../MyLoading";

function Landing() {
  const [products, setProducts] = useState<Prodotto[]>();

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
    async function fetchData() {
      const productsData = await getProducts();
      setTimeout(() => {
        setProducts(productsData);
        setIsLoading(0);
      }, 1000);
    }
    fetchData();
  }, []);

  return (
    <>
      {products ? (
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-2 gap-y-4 sm:gap-x-8 sm:gap-y-6 my-4 mx-4 sm:my-10">
          <Products products={products} />
        </div>
      ) : (
        <>
          <MyLoading isLoading={isLoading} />
        </>
      )}
    </>
  );
}

export default Landing;
