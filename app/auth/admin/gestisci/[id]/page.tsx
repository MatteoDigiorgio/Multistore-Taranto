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
import db, { storage } from "@/firebase";
import { doc, deleteDoc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { getDownloadURL, listAll, ref } from "firebase/storage";

const Field = ({
  productKey,
  value,
  handleChange,
}: {
  productKey: string;
  value: string;
  handleChange: any;
}) => {
  productKey = productKey.charAt(0).toUpperCase() + productKey.slice(1);

  return (
    <>
      {productKey !== "Prezzo" ? (
        <TextField
          required
          name={productKey}
          label={productKey}
          id="outlined-start-adornment"
          type="text"
          multiline
          value={value}
          sx={{ m: 1, width: "60%" }}
          size="small"
          onChange={handleChange}
        />
      ) : (
        <TextField
          required
          name={productKey}
          label={productKey}
          id="outlined-start-adornment"
          type="number"
          value={value}
          sx={{ m: 1, width: "60%" }}
          size="small"
          onChange={handleChange}
          className="mb-10"
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

  const [imgurl, setImgurl] = useState({ immagine: "" });

  const excludeKeys = [
    "nome",
    "categoria",
    "descrizione",
    "immagine",
    "prezzo",
  ];

  const router = useRouter();

  useEffect(() => {
    async function fetchData(params: any) {
      const prodottiData = await getProduct(params.id);
      prodottiData ? setProdotto(prodottiData) : null;
    }
    fetchData(params);
  }, []);

  const handleChange = (e: any) => {
    setProdotto((prevState) => ({
      ...prevState,
      [e.target.name.charAt(0).toLowerCase() + e.target.name.slice(1)]:
        e.target.value,
    }));
  };

  const handleDeleteProduct = async (e: any) => {
    console.log("delete");
    e.preventDefault();
    await deleteDoc(doc(db, "prodotti", `${params.id}`));
    router.push("/auth/admin/gestisci");
  };

  const handleEditProduct = async (e: any) => {
    console.log("edit");
    e.preventDefault();
    await setDoc(doc(db, "prodotti", `${params.id}`), prodotto);
    router.push("/auth/admin/gestisci");
  };

  return (
    <div className="relative m-auto flex flex-col">
      <form onSubmit={handleEditProduct}>
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
            src={imgurl.immagine}
            alt="Prodotto"
            className="h-16 w-16 rounded-full mb-1 mt-10 shadow-lg shrink-0"
            width={64}
            height={64}
          />

          <Field
            productKey="Nome"
            value={prodotto.nome ? prodotto.nome : ""}
            handleChange={handleChange}
          />
          <FormControl sx={{ m: 1, maxWidth: "60%" }} size="small">
            <InputLabel htmlFor="grouped-native-select">Categoria</InputLabel>
            <Select
              native
              value={prodotto.categoria ? prodotto.categoria : ""}
              multiline
              id="grouped-native-select"
              label="Categoria"
              name="Categoria"
              onChange={handleChange}
            >
              <option aria-label="None" value="" />
              <optgroup label="Elettrodomestici">
                <option value={"Frigoriferi"}>Frigoriferi</option>
                <option value={"Congelatori"}>Congelatori</option>
                <option value={"Lavatrici"}>Lavatrici</option>
                <option value={"Asciugatrici"}>Asciugatrici</option>
                <option value={"Lavastoviglie"}>Lavastoviglie</option>
                <option value={"Forni"}>Forni</option>
                <option value={"Climatizzatori"}>Climatizzatori</option>
                <option value={"Ventilatori"}>Ventilatori</option>
                <option value={"Stufe"}>Stufe</option>
                <option value={"Asciugatrici"}>Asciugatrici</option>
              </optgroup>

              <optgroup label="Telefonia">
                <option value={"Smarthphone e Cellulari"}>
                  Smarthphone e Cellulari
                </option>
                <option value={"Cordless"}>Cordless</option>
                <option value={"Accessori Telefonia"}>
                  Accessori Telefonia
                </option>
              </optgroup>
              <optgroup label="Televisori">
                <option value={"Televisori"}>Televisori</option>
                <option value={"DVD e Blu-ray"}>DVD e Blu-ray</option>
                <option value={"Accessori Televisori"}>
                  Accessori Televisori
                </option>
              </optgroup>
              <optgroup label="Informatica">
                <option value={"Notebook"}>Notebook</option>
                <option value={"Tablet"}>Tablet</option>
                <option value={"Accessori Informatica"}>
                  Accessori Informatica
                </option>
              </optgroup>
              <optgroup label="Console e Videogiochi">
                <option value={"Console"}>Console</option>
                <option value={"Videogiochi"}>Videogiochi</option>
              </optgroup>
              <optgroup label="Monopattini">
                <option value={"Monopattini"}>Monopattini</option>
              </optgroup>
            </Select>
          </FormControl>

          <Field
            productKey="Descrizione"
            value={prodotto.descrizione ? prodotto.descrizione : ""}
            handleChange={handleChange}
          />

          {Object.entries(prodotto).map(([key, value], i) => (
            <>
              {!excludeKeys.includes(key) ? (
                <Field
                  productKey={key}
                  value={value}
                  key={i}
                  handleChange={handleChange}
                />
              ) : null}
            </>
          ))}

          <Field
            productKey="Prezzo"
            value={prodotto.prezzo ? prodotto.prezzo : ""}
            handleChange={handleChange}
          />
        </div>

        <div className="flex flex-row items-center justify-center gap-2">
          <div>
            <button
              type="button"
              onClick={handleDeleteProduct}
              className="flex mx-auto p-4 items-center drop-shadow-lg text-white bg-red-400 rounded-full ring-2 ring-red-500 shadow-lg hover:ring-2 hover:ring-red-700 hover:bg-red-500"
            >
              <ClearIcon />
            </button>
            <p className="font-light w-20 text-center mt-2">
              Cancella prodotto
            </p>
          </div>
          <div>
            <button
              type="submit"
              className="flex mx-auto p-4 items-center drop-shadow-lg text-white bg-yellow-400 rounded-full ring-2 ring-yellow-500 shadow-lg hover:ring-2 hover:ring-yellow-700 hover:bg-yellow-500"
            >
              <SendIcon />
            </button>
            <p className="font-light w-20 text-center mt-2">
              Aggiorna prodotto
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Product;
