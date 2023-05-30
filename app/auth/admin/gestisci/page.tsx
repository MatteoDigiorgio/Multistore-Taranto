"use client";
import React, { useEffect, useState } from "react";
import styles from "./Gestisci.module.css";
import Link from "next/link";
import AddIcon from "@mui/icons-material/Add";
import { getProducts } from "@/pages/api/auth/getProducts";
import { Prodotto } from "@/types";
import Prodotti from "./(prodotti)/prodotti";

function Gestisci() {
  const [prodotti, setProdotti] = useState<Prodotto[]>();

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
        <Prodotti prodotti={prodotti} />
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
