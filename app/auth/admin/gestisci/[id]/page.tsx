"use client";
import React, { useEffect, useRef, useState } from "react";
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
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Snackbar from "@mui/material/Snackbar";
import Alert, { AlertColor } from "@mui/material/Alert";
import Image from "next/image";

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

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current !== null) {
      inputRef.current.setCustomValidity(
        value === "" && productKey !== "Sconto" && productKey !== "Percentuale"
          ? "Campo necessario!"
          : ""
      );
    }
    if (productKey === "Prezzo" || productKey === "Sconto") {
      if (inputRef.current !== null && value !== "") {
        const pattern = /^[0-9]+,[0-9]+$/;
        const inputValue = inputRef.current.value;

        inputRef.current.setCustomValidity(
          !pattern.test(inputValue) ? "Deve seguire il formato 123,45" : ""
        );
      }
    }
  }, [value, productKey]);

  return (
    <>
      {productKey !== "Prezzo" &&
      productKey !== "Sconto" &&
      productKey !== "Percentuale" ? (
        <TextField
          inputRef={inputRef}
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
          inputRef={inputRef}
          required={productKey === "Prezzo" ? true : false}
          name={productKey}
          label={
            productKey === "Prezzo"
              ? "Prezzo di listino"
              : productKey === "Sconto"
              ? "Prezzo scontato"
              : "Percentuale sconto"
          }
          helperText={
            productKey === "Sconto"
              ? "Non aggiungere il prezzo scontato se hai aggiunto la percentuale di sconto"
              : productKey === "Percentuale"
              ? "Non aggiungere la percentuale di sconto se hai aggiunto il prezzo scontato"
              : null
          }
          id="outlined-start-adornment"
          value={value}
          sx={{ m: 1, width: "60%" }}
          size="small"
          inputProps={{
            pattern: "[0-9]+(,[0-9]+)?",
            type: "text",
            inputMode: "decimal",
          }}
          onChange={handleChange}
          InputProps={
            productKey === "Percentuale"
              ? {
                  endAdornment: (
                    <InputAdornment position="end">%</InputAdornment>
                  ),
                }
              : {
                  startAdornment: (
                    <InputAdornment position="start">€</InputAdornment>
                  ),
                }
          }
        />
      )}
    </>
  );
};

function Product({ params }: any) {
  interface Product {
    [key: string]: string | boolean;
  }
  const [initialProdotto, setInitialProdotto] = useState();
  const [prodotto, setProdotto] = useState<Product>();

  const [immagineUrl, setImmagineUrl] = useState();

  const excludeKeys = [
    "nome",
    "categoria",
    "descrizione",
    "immagine",
    "prezzo",
    "sconto",
    "percentuale",
  ];

  const router = useRouter();

  useEffect(() => {
    async function fetchData(params: any) {
      const prodottiData = await getProduct(params.id);
      prodottiData ? setImmagineUrl(prodottiData.immagineUrl) : null;
      delete prodottiData.immagineUrl;
      prodottiData ? setProdotto(prodottiData) : null;
      prodottiData ? setInitialProdotto(prodottiData) : null;
    }
    fetchData(params);
  }, []);

  const handleChange = (e: any) => {
    setProdotto((prevState) => ({
      ...prevState,
      [e.target.name.charAt(0).toLowerCase() + e.target.name.slice(1)]:
        e.target.type === "checkbox"
          ? e.target.checked === true
            ? e.target.checked
            : false
          : e.target.value,
    }));
  };

  const handleDeleteProduct = async (e: any) => {
    setMessage("Prodotto eliminato.");
    setSeverity("success");
    setOpen(true);
    e.preventDefault();
    await deleteDoc(doc(db, "prodotti", `${params.id}`));
    setTimeout(() => {
      router.push("/auth/admin/gestisci");
    }, 1000);
  };

  const handleEditProduct = async (e: any) => {
    e.preventDefault();
    const hasChanged =
      JSON.stringify(prodotto) !== JSON.stringify(initialProdotto);

    if (hasChanged) {
      setMessage("Prodotto modificato");
      setSeverity("success");
      setOpen(true);
      if (prodotto) {
        let adjustedInputs = Object.fromEntries(
          Object.entries(prodotto)
            .filter(([_, value]) =>
              typeof value === "string"
                ? (value as string).trim() !== ""
                : typeof value === "boolean"
            )
            .map(([key, value]) => [
              key.startsWith("_") ? key.slice(1) : key,
              typeof value === "string" ? (value as string).trim() : value,
            ])
        );

        await setDoc(doc(db, "prodotti", `${params.id}`), adjustedInputs);
        setTimeout(() => {
          router.push("/auth/admin/gestisci");
        }, 1000);
      }
    } else {
      setMessage("Nessuna modifica");
      setSeverity("warning");
      setOpen(true);
    }
  };

  // Snackbar
  const [open, setOpen] = React.useState(false);
  const [severity, setSeverity] = useState<AlertColor>("success");
  const [message, setMessage] = useState("");

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div className="relative m-auto flex flex-col">
      <form onSubmit={handleEditProduct}>
        <Link
          key={"Back"}
          href="/auth/admin/gestisci"
          className="flex absolute left-12 top-10 p-1 items-center drop-shadow-lg rounded-full text-black hover:bg-gray-300 hover:shadow-lg "
        >
          <ArrowBackIcon />
        </Link>

        <div
          className={`${styles.card} flex flex-col items-center gap-4 mx-8 my-4`}
        >
          <Image
            key={"Image"}
            src={typeof immagineUrl === "string" ? immagineUrl : ""}
            alt="Prodotto"
            className="h-16 w-16 rounded-full mb-1 mt-10 shadow-lg shrink-0"
            width={64}
            height={64}
            unoptimized={true}
          />

          <Field
            key={"Nome"}
            productKey="Nome"
            value={typeof prodotto?.nome === "string" ? prodotto.nome : ""}
            handleChange={handleChange}
          />
          <FormControl
            key={"Categoria"}
            sx={{ m: 1, maxWidth: "60%" }}
            size="small"
          >
            <InputLabel htmlFor="grouped-native-select">Categoria</InputLabel>
            <Select
              native
              value={prodotto?.categoria ? prodotto.categoria : ""}
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
            key={"Descrizione"}
            productKey="Descrizione"
            value={
              typeof prodotto?.descrizione === "string"
                ? prodotto.descrizione
                : ""
            }
            handleChange={handleChange}
          />

          {prodotto &&
            Object.entries(prodotto).map(([key, value], i) => (
              <>
                {!excludeKeys.includes(key) ? (
                  typeof value === "string" ? (
                    <Field
                      productKey={key}
                      value={value}
                      key={i}
                      handleChange={handleChange}
                    />
                  ) : (
                    <FormControlLabel
                      control={<Checkbox />}
                      checked={value}
                      label={key
                        .replace("_", " ")
                        .split(" ")
                        .map(
                          (word) => word.charAt(0).toUpperCase() + word.slice(1)
                        )
                        .join(" ")}
                      name={key}
                      onChange={handleChange}
                    />
                  )
                ) : null}
              </>
            ))}

          <Field
            key={"Prezzo"}
            productKey="Prezzo"
            value={typeof prodotto?.prezzo === "string" ? prodotto.prezzo : ""}
            handleChange={handleChange}
          />

          <Field
            key={"Sconto"}
            productKey="Sconto"
            value={typeof prodotto?.sconto === "string" ? prodotto.sconto : ""}
            handleChange={handleChange}
          />

          <Field
            key={"Percentuale"}
            productKey="Percentuale"
            value={
              typeof prodotto?.percentuale === "string"
                ? prodotto.percentuale
                : ""
            }
            handleChange={handleChange}
          />
        </div>

        <div
          key={"Buttons"}
          className="flex flex-row items-center justify-center gap-2"
        >
          <div>
            <button
              type="button"
              onClick={handleDeleteProduct}
              className="flex mx-auto p-4 items-center drop-shadow-lg text-white bg-red-400 rounded-full ring-2 ring-red-500 shadow-lg hover:ring-2 hover:ring-red-700 hover:bg-red-500"
            >
              <ClearIcon key={"Delete"} />
            </button>
            <p className="font-light w-20 text-center mt-2">
              Cancella prodotto
            </p>
          </div>
          <div key={"Update"}>
            <button
              type="submit"
              className="flex mx-auto p-4 items-center drop-shadow-lg text-white bg-yellow-400 rounded-full ring-2 ring-yellow-500 shadow-lg hover:ring-2 hover:ring-yellow-700 hover:bg-yellow-500"
            >
              <SendIcon key={"Update"} />
            </button>
            <p className="font-light w-20 text-center mt-2">
              Aggiorna prodotto
            </p>
          </div>
        </div>
      </form>

      {/* Snackbar for delete */}
      <Snackbar
        key={"Snackbar"}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Product;
