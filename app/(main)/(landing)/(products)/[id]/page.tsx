"use client";
import MyLoading from "@/app/(main)/MyLoading";
import { getProduct } from "@/pages/api/auth/getProducts";
import { Prodotto } from "@/types";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Disclosure, Transition } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import {
  ClipboardDocumentListIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";

function Product({ params }: any) {
  interface Product {
    [key: string]: string | boolean;
  }
  const [product, setProduct] = useState<Product>();
  const [immagineUrl, setImmagineUrl] = useState();

  const excludeKeys = [
    "nome",
    "marca",
    "categoria",
    "descrizione",
    "immagine",
    "prezzo",
  ];

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
      console.log(prodottiData.immagineUrl);

      setTimeout(() => {
        prodottiData ? setImmagineUrl(prodottiData.immagineUrl) : null;
        delete prodottiData.immagineUrl;
        prodottiData ? setProduct(prodottiData) : null;
        setIsLoading(0);
      }, 200);
    }
    fetchData(params);
  }, []);

  console.log(product);
  return (
    <>
      {product ? (
        <div className="bg-white flex items-center z-0 mb-10 mt-32 md:mt-6">
          <div className="w-full">
            <div className="flex flex-col md:flex-row justify-center md:justify-end md:mt-20">
              <div className="p-5 md:pr-10 md:justify-center md:flex md:flex-col md:w-1/2">
                {/* Head */}
                <span className="flex items-center gap-1">
                  <p className="text-gray-500 text-xs">{product.categoria}</p>•
                  <p className="text-gray-500 text-xs">{product.marca}</p>
                </span>
                {/* Name */}
                <p
                  className="font-bold text-2xl leading-normal md:text-md"
                  title={
                    typeof product.nome === "string" ? product.nome : "Prodotto"
                  }
                >
                  {product.nome}
                </p>
                {/* Summary */}
                <span className="hidden md:flex md:flex-wrap items-center gap-1 py-4">
                  {product.colore && (
                    <>
                      <p className="text-gray-500 text-sm">Colore:</p>
                      <p className="text-black font-medium text-sm">
                        {product.colore}
                      </p>
                    </>
                  )}

                  {product.colore && (
                    <>
                      •<p className="text-gray-500 text-sm">Tipo di display:</p>
                      <p className="text-black font-medium text-sm">
                        {product.display}
                      </p>
                    </>
                  )}

                  {product.memoria && (
                    <>
                      •
                      <p className="text-gray-500 text-sm">
                        Capacità memoria interna:
                      </p>
                      <p className="text-black font-medium text-sm">
                        {product.memoria}
                      </p>
                    </>
                  )}
                </span>
                {/* Price */}
                <div className="hidden md:inline font-medium text-2xl justify-center items-center p-5 md:px-0 w-full">
                  € {product.prezzo}
                  <div className="hidden">
                    <svg viewBox="0 0 20 20">
                      <path d="M17.72,5.011H8.026c-0.271,0-0.49,0.219-0.49,0.489c0,0.271,0.219,0.489,0.49,0.489h8.962l-1.979,4.773H6.763L4.935,5.343C4.926,5.316,4.897,5.309,4.884,5.286c-0.011-0.024,0-0.051-0.017-0.074C4.833,5.166,4.025,4.081,2.33,3.908C2.068,3.883,1.822,4.075,1.795,4.344C1.767,4.612,1.962,4.853,2.231,4.88c1.143,0.118,1.703,0.738,1.808,0.866l1.91,5.661c0.066,0.199,0.252,0.333,0.463,0.333h8.924c0.116,0,0.22-0.053,0.308-0.128c0.027-0.023,0.042-0.048,0.063-0.076c0.026-0.034,0.063-0.058,0.08-0.099l2.384-5.75c0.062-0.151,0.046-0.323-0.045-0.458C18.036,5.092,17.883,5.011,17.72,5.011z"></path>
                      <path d="M8.251,12.386c-1.023,0-1.856,0.834-1.856,1.856s0.833,1.853,1.856,1.853c1.021,0,1.853-0.83,1.853-1.853S9.273,12.386,8.251,12.386z M8.251,15.116c-0.484,0-0.877-0.393-0.877-0.874c0-0.484,0.394-0.878,0.877-0.878c0.482,0,0.875,0.394,0.875,0.878C9.126,14.724,8.733,15.116,8.251,15.116z"></path>
                      <path d="M13.972,12.386c-1.022,0-1.855,0.834-1.855,1.856s0.833,1.853,1.855,1.853s1.854-0.83,1.854-1.853S14.994,12.386,13.972,12.386z M13.972,15.116c-0.484,0-0.878-0.393-0.878-0.874c0-0.484,0.394-0.878,0.878-0.878c0.482,0,0.875,0.394,0.875,0.878C14.847,14.724,14.454,15.116,13.972,15.116z"></path>
                    </svg>
                  </div>
                </div>
              </div>
              {/* Image */}
              <div className="flex justify-center p-5 md:pl-10 md:w-1/2 md:fixed md:left-0 md:top-20">
                <Image
                  src={typeof immagineUrl === "string" ? immagineUrl : ""}
                  alt=""
                  className={`rounded-xl shadow-xl md:shadow-none aspect-auto object-contain h-64 md:h-96 w-auto p-2`}
                  width={128}
                  height={80}
                  unoptimized={true}
                />
              </div>
            </div>
            {/* Price (Mobile View) */}
            <div className="flex md:hidden font-medium text-2xl justify-center items-center p-5 w-full">
              € {product.prezzo}
              <div className="hidden">
                <svg viewBox="0 0 20 20">
                  <path d="M17.72,5.011H8.026c-0.271,0-0.49,0.219-0.49,0.489c0,0.271,0.219,0.489,0.49,0.489h8.962l-1.979,4.773H6.763L4.935,5.343C4.926,5.316,4.897,5.309,4.884,5.286c-0.011-0.024,0-0.051-0.017-0.074C4.833,5.166,4.025,4.081,2.33,3.908C2.068,3.883,1.822,4.075,1.795,4.344C1.767,4.612,1.962,4.853,2.231,4.88c1.143,0.118,1.703,0.738,1.808,0.866l1.91,5.661c0.066,0.199,0.252,0.333,0.463,0.333h8.924c0.116,0,0.22-0.053,0.308-0.128c0.027-0.023,0.042-0.048,0.063-0.076c0.026-0.034,0.063-0.058,0.08-0.099l2.384-5.75c0.062-0.151,0.046-0.323-0.045-0.458C18.036,5.092,17.883,5.011,17.72,5.011z"></path>
                  <path d="M8.251,12.386c-1.023,0-1.856,0.834-1.856,1.856s0.833,1.853,1.856,1.853c1.021,0,1.853-0.83,1.853-1.853S9.273,12.386,8.251,12.386z M8.251,15.116c-0.484,0-0.877-0.393-0.877-0.874c0-0.484,0.394-0.878,0.877-0.878c0.482,0,0.875,0.394,0.875,0.878C9.126,14.724,8.733,15.116,8.251,15.116z"></path>
                  <path d="M13.972,12.386c-1.022,0-1.855,0.834-1.855,1.856s0.833,1.853,1.855,1.853s1.854-0.83,1.854-1.853S14.994,12.386,13.972,12.386z M13.972,15.116c-0.484,0-0.878-0.393-0.878-0.874c0-0.484,0.394-0.878,0.878-0.878c0.482,0,0.875,0.394,0.875,0.878C14.847,14.724,14.454,15.116,13.972,15.116z"></path>
                </svg>
              </div>
            </div>

            <div className="md:flex md:justify-end">
              <div className="flex flex-col items-start w-full md:w-1/2 ">
                <div className="border-t-[1px] w-full px-5 py-2 text-lg">
                  <Disclosure
                    defaultOpen={window.innerWidth > 768 ? true : false}
                  >
                    {({ open }) => (
                      <>
                        <Disclosure.Button className="flex flex-row justify-between w-full py-2">
                          <div className="flex flex-row gap-2 items-center">
                            <ClipboardDocumentListIcon className="h-6 w-6" />
                            <p>Descrizione</p>
                          </div>
                          <ChevronUpIcon
                            className={`${
                              open ? "rotate-180 transform" : ""
                            } h-5 w-5 text-gray-500`}
                          />
                        </Disclosure.Button>
                        <Transition
                          enter="transition duration-100 ease-out"
                          enterFrom="transform scale-95 opacity-0"
                          enterTo="transform scale-100 opacity-100"
                          leave="transition duration-75 ease-out"
                          leaveFrom="transform scale-100 opacity-100"
                          leaveTo="transform scale-95 opacity-0"
                        >
                          <Disclosure.Panel className="text-gray-500 pt-4">
                            {product.descrizione}
                          </Disclosure.Panel>
                        </Transition>
                      </>
                    )}
                  </Disclosure>
                </div>

                <div className="border-t-[1px] w-full px-5 py-2 text-lg">
                  <Disclosure
                    defaultOpen={window.innerWidth > 768 ? true : false}
                  >
                    {({ open }) => (
                      <>
                        <Disclosure.Button className="flex flex-row justify-between w-full py-2">
                          <div className="flex flex-row gap-2 items-center">
                            <Cog6ToothIcon className="h-6 w-6" />
                            <p>Specifiche</p>
                          </div>
                          <ChevronUpIcon
                            className={`${
                              open ? "rotate-180 transform" : ""
                            } h-5 w-5 text-gray-500`}
                          />
                        </Disclosure.Button>
                        <Transition
                          enter="transition duration-100 ease-out"
                          enterFrom="transform scale-95 opacity-0"
                          enterTo="transform scale-100 opacity-100"
                          leave="transition duration-75 ease-out"
                          leaveFrom="transform scale-100 opacity-100"
                          leaveTo="transform scale-95 opacity-0"
                        >
                          <div className="pt-4 divide-y">
                            {Object.entries(product).map(([key, value], i) => (
                              <>
                                {!excludeKeys.includes(key) ? (
                                  typeof value === "string" ? (
                                    <Disclosure.Panel className="grid grid-cols-2 text-sm py-2">
                                      <span className="font-medium capitalize">
                                        {key}
                                      </span>
                                      <span className="text-gray-500 text-sm">
                                        {value}
                                      </span>
                                    </Disclosure.Panel>
                                  ) : (
                                    <Disclosure.Panel className="grid grid-cols-2 text-sm py-2">
                                      <span className="font-medium capitalize">
                                        {key}
                                      </span>
                                      <span className="text-gray-500 text-sm">
                                        {value ? "Si" : "No"}
                                      </span>
                                    </Disclosure.Panel>
                                  )
                                ) : null}
                              </>
                            ))}
                          </div>
                        </Transition>
                      </>
                    )}
                  </Disclosure>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="bg-white flex justify-center items-center flex-grow z-0">
            <MyLoading isLoading={isLoading} />
          </div>
        </>
      )}
    </>
  );
}

export default Product;
