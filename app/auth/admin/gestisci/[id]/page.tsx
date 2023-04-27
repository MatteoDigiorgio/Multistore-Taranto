"use client";
import React, { useEffect, useState } from "react";
import { Prodotto } from "@/types";
import SendIcon from "@mui/icons-material/Send";
import ClearIcon from "@mui/icons-material/Clear";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { getProduct } from "@/pages/api/auth/getProducts";
import styles from "./Prodotto.module.css";
import Link from "next/link";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

const Field = ({
  productKey,
  value,
}: {
  productKey: string;
  value: string;
}) => {
  productKey = productKey.charAt(0).toUpperCase() + productKey.slice(1);

  return (
    <>
      {productKey !== "Prezzo" ? (
        <TextField
          label={productKey}
          id="outlined-start-adornment"
          type="text"
          value={value}
          sx={{ m: 1, width: "20ch" }}
          size="small"
        />
      ) : (
        <TextField
          label={productKey}
          id="outlined-start-adornment"
          type="number"
          value={value}
          sx={{ m: 1, width: "20ch" }}
          size="small"
          InputProps={{
            startAdornment: <InputAdornment position="start">€</InputAdornment>,
          }}
        />
      )}
    </>
  );
};

function Product({ params }: any) {
  const [prodotto, setProdotto] = useState<Partial<Prodotto>>({
    id: "",
    nome: "",
    categoria: "",
    descrizione: "",
    immagine: "",
    prezzo: "",
  });

  const excludeKeys = [
    "nome",
    "categoria",
    "descrizione",
    "immagine",
    "prezzo",
  ];

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
          className="h-16 w-16 rounded-full mb-1 mt-10 shadow-lg shrink-0"
          width={64}
          height={64}
        />

        <Field productKey="Nome" value={prodotto.nome ? prodotto.nome : ""} />
        <Field
          productKey="Categoria"
          value={prodotto.categoria ? prodotto.categoria : ""}
        />
        <Field
          productKey="Descrizione"
          value={prodotto.descrizione ? prodotto.descrizione : ""}
        />

        {Object.entries(prodotto).map(([key, value], i) => (
          <>
            {!excludeKeys.includes(key) ? (
              <Field productKey={key} value={value} key={i} />
            ) : null}
          </>
        ))}

        <div className="mb-10">
          <Field
            productKey="Prezzo"
            value={prodotto.prezzo ? prodotto.prezzo : ""}
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
