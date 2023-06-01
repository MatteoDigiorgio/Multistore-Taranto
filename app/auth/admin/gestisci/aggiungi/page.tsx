"use client";
import React, { useEffect, useRef, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SendIcon from "@mui/icons-material/Send";
import styles from "./Aggiungi.module.css";
import Link from "next/link";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import db from "@/firebase";
import { doc, setDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { ref, uploadBytes } from "firebase/storage";
import { useRouter } from "next/navigation";
import { storage } from "../../../../../firebase";
import { Prodotto } from "@/types";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Image from "next/image";

const Field = ({
  productKey,
  handleChange,
  inputs,
}: {
  productKey: string;
  handleChange: any;
  inputs: any;
}) => {
  let productKeyLowerCase =
    productKey.charAt(0).toLowerCase() + productKey.slice(1);
  let value = inputs[productKeyLowerCase];

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current !== null) {
      inputRef.current.setCustomValidity(
        value === "" || value === undefined || value === null
          ? productKey === "Sconto"
            ? ""
            : productKey === "Percentuale"
            ? ""
            : "Campo necessario!"
          : ""
      );
    }
    if (productKey === "Prezzo" || productKey === "Sconto") {
      if (
        inputRef.current !== null &&
        value !== "" &&
        value !== null &&
        value !== undefined
      ) {
        const pattern = /^[0-9]+,[0-9]+$/;
        const inputValue = inputRef.current.value;
        inputRef.current.setCustomValidity(
          !pattern.test(inputValue) ? "Deve seguire il formato 123,45" : ""
        );
      }
    }
  }, [value, productKey, productKeyLowerCase]);

  return (
    <>
      {productKey !== "Prezzo" &&
      productKey !== "Sconto" &&
      productKey !== "Percentuale" ? (
        productKey === "Nome" ||
        productKey === "Descrizione" ||
        productKey === "Marca" ? (
          // Required field
          <TextField
            inputRef={inputRef}
            error={inputs[productKeyLowerCase] === ""}
            helperText={
              inputs[productKeyLowerCase] === "" ? "Campo necessario!" : null
            }
            required
            name={productKey}
            label={productKey}
            id="outlined-start-adornment"
            type="text"
            multiline
            sx={{ m: 1, width: "60%" }}
            size="small"
            onChange={handleChange}
          />
        ) : (
          // Optional field
          <TextField
            name={productKey}
            label={productKey}
            id="outlined-start-adornment"
            type="text"
            multiline
            sx={{ m: 1, width: "60%" }}
            size="small"
            onChange={handleChange}
          />
        )
      ) : (
        // Price
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

function AddProduct() {
  const [inputs, setInputs] = useState({
    nome: null,
    marca: null,
    categoria: null,
    descrizione: null,
    immagine: null,
    dual_Sim: false,
    _5G: false,
    nFC: false,
    prezzo: null,
    sconto: null,
    percentuale: null,
  });
  const [image, setImage] = useState();
  const [imageUrl, setImageUrl] = useState("");
  const router = useRouter();

  let inputRefCategory = useRef<HTMLInputElement | null>(null);
  let inputRefImage = useRef<HTMLInputElement | null>(null);

  let categoria = inputs.categoria;
  let immagine = inputs.immagine;

  useEffect(() => {
    if (inputRefCategory.current !== null) {
      inputRefCategory.current.setCustomValidity(
        categoria === "" || categoria === undefined || categoria === null
          ? "Campo necessario!"
          : ""
      );
    }
  }, [categoria]);

  useEffect(() => {
    if (inputRefImage.current !== null) {
      inputRefImage.current.setCustomValidity(
        immagine === "" || immagine === undefined || immagine === null
          ? "Campo necessario!"
          : ""
      );
    }
  }, [immagine]);

  // Snackbar
  const [successOpen, setSuccessOpen] = React.useState(false);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setSuccessOpen(false);
  };

  // Inputs handler
  const handleChange = (e: any) => {
    setInputs((prevState: any) => ({
      ...prevState,
      [e.target.name.charAt(0).toLowerCase() + e.target.name.slice(1)]:
        e.target.type === "checkbox"
          ? e.target.checked === true
            ? e.target.checked
            : false
          : e.target.type === "file"
          ? e.target.files[0].name
          : e.target.value.replace(/\n/g, ""),
    }));
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      setImageUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  // Submit Handler
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setSuccessOpen(true);

    const imgref = ref(storage, `immagini/${inputs.immagine}`);

    image && (await uploadBytes(imgref, image));
    let adjustedInputs = Object.fromEntries(
      Object.entries(inputs)
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
    await setDoc(doc(db, "prodotti", `${uuidv4()}`), adjustedInputs);
    router.push("/auth/admin/gestisci");
  };

  return (
    <div className="relative m-auto flex flex-col">
      {/* Go back */}
      <Link
        href="/auth/admin/gestisci"
        className="flex absolute left-12 top-10 p-1 items-center drop-shadow-lg rounded-full text-black hover:bg-gray-300 hover:shadow-lg "
      >
        <ArrowBackIcon />
      </Link>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <div
          className={`${styles.card} flex flex-col items-center gap-1 mx-8 my-4`}
        >
          {/* Image field */}
          {!inputs.immagine ? (
            <div className="w-3/5">
              <label className={`flex flex-row ${styles.drop_container}`}>
                <span className={styles.drop_title}>Carica una foto</span>
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="label"
                >
                  <input
                    required
                    ref={inputRefImage}
                    accept="image/*"
                    type="file"
                    name="immagine"
                    onChange={handleChange}
                    style={{
                      position: "absolute",
                      clip: "rect(1px, 1px, 1px, 1px)",
                      padding: 0,
                      border: 0,
                      height: "1px",
                      width: "1px",
                      overflow: "hidden",
                    }}
                  />
                  <PhotoCamera />
                </IconButton>
              </label>
            </div>
          ) : (
            <>
              {
                <Image
                  src={imageUrl}
                  alt=""
                  className="rounded-xl mb-1 mt-10 shadow-lg shrink-0"
                  width={128}
                  height={128}
                  unoptimized={true}
                />
              }
            </>
          )}

          {/* Name field */}
          <Field
            productKey="Nome"
            handleChange={handleChange}
            inputs={inputs}
          />
          {/* Brand field */}
          <Field
            productKey="Marca"
            handleChange={handleChange}
            inputs={inputs}
          />

          {/* Category field */}
          <FormControl sx={{ m: 1, maxWidth: "60%" }} size="small">
            <InputLabel htmlFor="grouped-native-select">Categoria</InputLabel>
            <Select
              required
              inputRef={inputRefCategory}
              native
              defaultValue=""
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

          {/* Description field */}
          <Field
            productKey="Descrizione"
            handleChange={handleChange}
            inputs={inputs}
          />

          {/* Checkboxes */}
          <div className="flex flex-col justify-left">
            <FormControlLabel
              control={<Checkbox />}
              defaultChecked={false}
              label="Dual sim"
              name="dual_Sim"
              onChange={handleChange}
            />
            <FormControlLabel
              control={<Checkbox />}
              defaultChecked={false}
              label="5G"
              name="_5G"
              onChange={handleChange}
            />
            <FormControlLabel
              control={<Checkbox />}
              defaultChecked={false}
              label="NFC"
              name="nFC"
              onChange={handleChange}
            />
          </div>

          {/* Optional fields */}
          <Field
            productKey="Processore"
            handleChange={handleChange}
            inputs={inputs}
          />
          <Field
            productKey="Display"
            handleChange={handleChange}
            inputs={inputs}
          />
          <Field
            productKey="Fotocamera"
            handleChange={handleChange}
            inputs={inputs}
          />
          <Field
            productKey="Webcam"
            handleChange={handleChange}
            inputs={inputs}
          />
          <Field
            productKey="Sistema Operativo"
            handleChange={handleChange}
            inputs={inputs}
          />
          <Field productKey="RAM" handleChange={handleChange} inputs={inputs} />
          <Field productKey="ROM" handleChange={handleChange} inputs={inputs} />
          <Field
            productKey="Batteria"
            handleChange={handleChange}
            inputs={inputs}
          />
          <Field
            productKey="Memoria"
            handleChange={handleChange}
            inputs={inputs}
          />
          <Field
            productKey="Scheda Video"
            handleChange={handleChange}
            inputs={inputs}
          />
          <Field
            productKey="Colore"
            handleChange={handleChange}
            inputs={inputs}
          />
          <Field
            productKey="Peso"
            handleChange={handleChange}
            inputs={inputs}
          />
          <Field
            productKey="Dimensioni"
            handleChange={handleChange}
            inputs={inputs}
          />
          <Field
            productKey="Giri"
            handleChange={handleChange}
            inputs={inputs}
          />

          <Field
            productKey="Prezzo"
            handleChange={handleChange}
            inputs={inputs}
          />
          <Field
            productKey="Sconto"
            handleChange={handleChange}
            inputs={inputs}
          />
          <Field
            productKey="Percentuale"
            handleChange={handleChange}
            inputs={inputs}
          />
        </div>

        {/* Add product button */}
        <div className="flex flex-col items-center gap-2">
          <button
            type="submit"
            className="flex mx-auto p-4 items-center drop-shadow-lg text-white bg-green-400 rounded-full ring-2 ring-green-500 shadow-lg hover:ring-2 hover:ring-green-700 hover:bg-green-500"
          >
            <SendIcon />
          </button>
          <p className="font-light">Aggiungi prodotto</p>
        </div>
      </form>

      {/* Snackbar for success */}
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={successOpen}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Prodotto aggiunto
        </Alert>
      </Snackbar>
    </div>
  );
}

export default AddProduct;
