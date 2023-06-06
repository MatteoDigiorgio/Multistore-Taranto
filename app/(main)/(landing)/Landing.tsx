"use client";
import React, { Suspense, useEffect, useState } from "react";
import Products from "./(products)/Products";
import { Prodotto } from "@/types";
import { getProducts } from "@/pages/api/auth/getProducts";
import MyLoading from "../MyLoading";
import { onAuthStateChanged, signInAnonymously } from "firebase/auth";
import { auth } from "@/firebase";

function Landing() {
  const [products, setProducts] = useState<Prodotto[]>();

  useEffect(() => {
    async function fetchData() {
      onAuthStateChanged(auth, async (user) => {
        if (!user) {
          signInAnonymously(auth);
        }
        if (user) {
          const productsData = await getProducts();
          setProducts(productsData);
        }
      });
    }
    fetchData();
  }, []);

  return (
    <>
      {products ? (
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-2 gap-y-4 sm:gap-x-8 sm:gap-y-6 mx-4 mt-40 mb-4 md:mt-28">
          <Products products={products} />
        </div>
      ) : (
        <>
          <MyLoading />
        </>
      )}
    </>
  );
}

export default Landing;
