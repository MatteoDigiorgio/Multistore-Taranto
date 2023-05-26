"use client";
import React, { Suspense, useEffect, useState } from "react";
import Products from "./(products)/Products";
import { Prodotto } from "@/types";
import { getProducts } from "@/pages/api/auth/getProducts";
import styles from "./Loading.module.css";

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
          {/* Tech */}
          <div className={`${isLoading === 1 ? "flex" : "hidden"}`}>
            <div className={styles.loader_tech}></div>
            <div className={styles.loader_tech}></div>
            <div className={styles.loader_tech}></div>
          </div>
          {/* Washing Machine */}
          <div
            className={`${
              isLoading === 2
                ? "flex items-center justify-center drop-shadow-sm"
                : "hidden"
            }`}
          >
            <div className={styles.loader_washing}></div>
          </div>
          {/* Logo */}
          <div
            className={`${
              isLoading === 3 ? "flex items-center justify-center" : "hidden"
            }`}
          >
            <div className={styles.loader_multiLogo}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.0"
                viewBox="0 0 500 500"
                width="150"
                height="150"
                fill="currentColor"
                className={styles.logo}
              >
                <g>
                  <path d="M 134.091 489.074 L 133.809 82.1 L 38.797 150.334 L 38.909 420.787 L 134.091 489.074 Z"></path>
                  <line
                    x1="39.062"
                    y1="420.695"
                    x2="133.966"
                    y2="351.978"
                  ></line>
                </g>
                <g>
                  <path d="M 246.245 369.941 L 178.824 320.954 C 178.824 320.954 178.771 53.369 178.783 53.369 C 178.795 53.369 245.155 5.287 245.155 5.287 L 313.53 56.464 L 313.609 320.732 L 246.245 369.941 Z"></path>
                  <line x1="245.712" y1="272.955" x2="245.154" y2="5.31"></line>
                  <polyline points="178.86 320.919 245.708 272.64 313.621 320.735"></polyline>
                </g>
                <g>
                  <line
                    x1="356.169"
                    y1="353.019"
                    x2="450.792"
                    y2="420.781"
                  ></line>
                  <path d="M 356.245 488.865 L 355.984 82.16 L 451.065 150.244 L 451.06 420.977 L 356.245 488.865 Z"></path>
                </g>
              </svg>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Landing;
