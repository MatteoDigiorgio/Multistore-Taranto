"use client";
import React from "react";
import styles from "./Gestisci.module.css";
import Image from "next/image";
import data from "../../../../prodotti.json";
import Link from "next/link";
import AddIcon from "@mui/icons-material/Add";

data.sort((a, b) => a.nome.localeCompare(b.nome));

function Gestisci() {
  return (
    <div className="relative mx-auto h-screen flex flex-col justify-around">
      <div className="mb-2">
        <input
          type="text"
          placeholder="Cerca prodotto..."
          className="bg-gray-200 py-2 px-4 drop-shadow-lg w-full rounded-lg ring-2 ring-green-300 ring-offset-4 ring-offset-slate-50 focus:ring-0 focus:outline-green-500 placeholder:italic"
        ></input>
      </div>

      <div className={styles.card}>
        {data.map((product) => (
          <>
            <Link
              href="/auth/admin/"
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
                <p className="mx-2 line-clamp-2 justify-center">
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
        <button className="flex mx-auto p-4 items-center drop-shadow-lg text-white bg-green-400 rounded-full ring-2 ring-green-500 shadow-lg hover:ring-2 hover:ring-green-700 hover:bg-green-500">
          <AddIcon />
        </button>
        <p className="font-light">Aggiungi prodotto</p>
      </div>
    </div>
  );
}

export default Gestisci;
