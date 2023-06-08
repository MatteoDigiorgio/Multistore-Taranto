"use client";
import React, { Suspense, useEffect, useState } from "react";
import Products from "./(products)/Products";
import { Prodotto } from "@/types";
import { getFilterProducts, getProducts } from "@/pages/api/auth/getProducts";
import MyLoading from "../MyLoading";
import { onAuthStateChanged, signInAnonymously } from "firebase/auth";
import { auth } from "@/firebase";
import { useSelector, useDispatch } from "react-redux";
import { XMarkIcon } from "@heroicons/react/20/solid";

interface RootState {
  inputValue: string;
}

function Landing() {
  const inputValue = useSelector((state: RootState) => state.inputValue);
  const dispatch = useDispatch();

  const [products, setProducts] = useState<Prodotto[]>();

  useEffect(() => {
    async function fetchData() {
      onAuthStateChanged(auth, async (user) => {
        if (!user) {
          signInAnonymously(auth);
        }
        if (user) {
          if (inputValue !== "") {
            const productsFilterData = await getFilterProducts(inputValue);
            setProducts(productsFilterData);
          } else {
            const productsData = await getProducts();
            setProducts(productsData);
          }
        }
      });
    }
    fetchData();
  }, [inputValue]);

  const clearInputValue = () => {
    dispatch({ type: "CLEAR_INPUT_VALUE" });
  };

  return (
    <>
      {products ? (
        <>
          {inputValue && (
            <div className="mt-40 md:mt-28 w-full flex justify-center">
              <h1 className="flex items-center pl-4 pr-2 p-2 gap-1 rounded-full bg-zinc-300 border border-gray-400 font-medium text-xl">
                {inputValue}
                <XMarkIcon
                  height={24}
                  className="cursor-pointer"
                  onClick={clearInputValue}
                />
              </h1>
            </div>
          )}
          <div
            className={`grid  ${
              products.length === 1 ? "grid-cols-1" : ""
            } grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-2 gap-y-4 sm:gap-x-8 sm:gap-y-6 mx-4 mb-4 ${
              inputValue ? "mt-10" : "mt-40 md:mt-28"
            }`}
          >
            <Products products={products} />
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <MyLoading />
        </div>
      )}
    </>
  );
}

export default Landing;
