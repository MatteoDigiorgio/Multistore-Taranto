"use client";
import React, { Suspense, useEffect, useState } from "react";
import Products from "./(products)/Products";
import { Prodotto } from "@/types";
import { getProducts } from "@/pages/api/auth/getProducts";
import styles from "./Loading.module.css";

function Landing() {
  const [products, setProducts] = useState<Prodotto[]>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const productsData = await getProducts();
      setTimeout(() => {
        setProducts(productsData);
        setIsLoading(false);
      }, 1000);
    }
    fetchData();
  }, []);

  return (
    <>
      <div className={`${isLoading ? "flex" : "hidden"}`}>
        <div className={styles.loader}></div>
        <div className={styles.loader}></div>
        <div className={styles.loader}></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 my-10">
        <Products products={products} />
      </div>
    </>
  );
}

export default Landing;
