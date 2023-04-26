"use client";
import React, { useEffect, useState } from "react";
import { Prodotto } from "@/types";
import SendIcon from "@mui/icons-material/Send";
import ClearIcon from "@mui/icons-material/Clear";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { getProduct } from "@/pages/api/auth/getProducts";
import styles from "./Prodotto.module.css";
import Link from "next/link";

function Product({ params }: any) {
  const [prodotto, setProdotto] = useState<Partial<Prodotto>>({
    id: "",
    nome: "",
    immagine: "",
    descrizione: "",
    prezzo: "",
  });

  useEffect(() => {
    async function fetchData(params: any) {
      const prodottiData = await getProduct(params.id);
      prodottiData ? setProdotto(prodottiData) : null;
    }
    fetchData(params);
  }, []);

  return (
    <div className="relative m-auto flex flex-col">
      <Link
        href="/auth/admin/gestisci"
        className="flex absolute left-12 top-10 p-1 items-center drop-shadow-lg rounded-full text-black hover:bg-gray-300 hover:shadow-lg "
      >
        <ArrowBackIcon />
      </Link>

      <div
        className={`${styles.card} flex flex-col items-center gap-4 mx-8 my-4`}
      >
        <img
          src={prodotto.immagine}
          alt="Prodotto"
          className="h-16 w-16 rounded-full mb-1 shadow-lg shrink-0"
          width={64}
          height={64}
        />

        <input
          value={prodotto.nome}
          className="block rounded-md border-0 py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        ></input>

        <input
          value={prodotto.descrizione}
          className="block rounded-md border-0  py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        ></input>

        <div className="relative rounded-md shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span className="text-gray-500 sm:text-sm">€</span>
          </div>
          <input
            type="text"
            name="price"
            id="price"
            className="block w-full rounded-md border-0 py-1.5 pl-7 pr-2 placeholder:text-right text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            value={prodotto.prezzo}
          />
        </div>
      </div>

      <div className="flex flex-row items-center justify-center gap-2">
        <div>
          <button className="flex mx-auto p-4 items-center drop-shadow-lg text-white bg-red-400 rounded-full ring-2 ring-red-500 shadow-lg hover:ring-2 hover:ring-red-700 hover:bg-red-500">
            <ClearIcon />
          </button>
          <p className="font-light w-20 text-center mt-2">Cancella prodotto</p>
        </div>
        <div>
          <button className="flex mx-auto p-4 items-center drop-shadow-lg text-white bg-yellow-400 rounded-full ring-2 ring-yellow-500 shadow-lg hover:ring-2 hover:ring-yellow-700 hover:bg-yellow-500">
            <SendIcon />
          </button>
          <p className="font-light w-20 text-center mt-2">Aggiorna prodotto</p>
        </div>
      </div>
    </div>
  );
}

export default Product;
