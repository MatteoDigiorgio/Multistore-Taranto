"use client";
import React, { useEffect, useState } from "react";
import styles from "./Gestisci.module.css";
import Image from "next/image";
import Link from "next/link";
import AddIcon from "@mui/icons-material/Add";
import { getProducts } from "@/pages/api/auth/getProducts";
import { Prodotto } from "@/types";

function Gestisci() {
  const [prodotti, setProdotti] = useState<Prodotto[]>([
    {
      id: "",
      nome: "",
      immagine: "",
      descrizione: "",
      prezzo: "",
    },
  ]);

  useEffect(() => {
    async function fetchData() {
      const prodottiData = await getProducts();
      setProdotti(prodottiData);
    }
    fetchData();
  }, []);
  return (
    <div className="relative m-auto flex flex-col gap-4">
      <div className="mb-2">
        <input
          type="text"
          placeholder="Cerca prodotto..."
          className="bg-gray-200 py-2 px-4 drop-shadow-lg w-full rounded-lg ring-2 ring-green-300 ring-offset-4 ring-offset-slate-50 focus:ring-0 focus:outline-green-500 placeholder:italic"
        ></input>
      </div>

      <div className={styles.card}>
        {prodotti.map((product) => (
          <>
            <Link
              href={`/auth/admin/gestisci/${product.id}`}
              className="flex flex-row items-center h-16 justify-between mx-8 my-4 hover:bg-gray-300 hover:rounded-lg hover:cursor-pointer"
            >
              <img
                src={product.immagine}
                alt="Prodotto"
                className="h-16 w-16 rounded-full mb-1 shadow-lg shrink-0"
                width={64}
                height={64}
              />
              <div className="items-center">
                <p className="mx-2 line-clamp-2 justify-center text-center">
                  {product.nome}
                </p>
              </div>
              <p className="shrink-0 italic font-bold text-xs">
                {product.prezzo} €
              </p>
            </Link>
          </>
        ))}
      </div>

      <div className="flex flex-col items-center gap-2">
        <Link
          href="/auth/admin/gestisci/aggiungi"
          className="flex mx-auto p-4 items-center drop-shadow-lg text-white bg-green-400 rounded-full ring-2 ring-green-500 shadow-lg hover:ring-2 hover:ring-green-700 hover:bg-green-500"
        >
          <AddIcon />
        </Link>
        <p className="font-light">Aggiungi prodotto</p>
      </div>
    </div>
  );
}

export default Gestisci;
