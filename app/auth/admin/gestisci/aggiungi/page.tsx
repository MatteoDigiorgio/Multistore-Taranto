"use client";
import React, { useState } from "react";
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
import { useRouter } from "next/navigation";

const Field = ({
  productKey,
  handleChange,
}: {
  productKey: string;
  handleChange: any;
}) => {
  productKey = productKey.charAt(0).toUpperCase() + productKey.slice(1);

  return (
    <>
      {productKey !== "Prezzo" ? (
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
      ) : (
        <TextField
          label={productKey}
          name={productKey}
          id="outlined-start-adornment"
          type="number"
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

function AddProduct() {
  const [inputs, setInputs] = useState({});
  const router = useRouter();

  const handleChange = (e: any) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name.charAt(0).toLowerCase() + e.target.name.slice(1)]:
        e.target.type === "checkbox"
          ? e.target.checked === true
            ? e.target.checked
            : null
          : e.target.value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    let adjustedInputs = Object.fromEntries(
      Object.entries(inputs)
        .filter(
          ([_, value]) =>
            typeof value === "string" && (value as string).trim() !== ""
        )
        .map(([key, value]) => [key, (value as string).trim()])
    );

    await setDoc(doc(db, "prodotti", `${uuidv4()}`), adjustedInputs);

    router.push("/auth/admin/gestisci");
  };
  return (
    <div className="relative m-auto flex flex-col">
      <Link
        href="/auth/admin/gestisci"
        className="flex absolute left-12 top-10 p-1 items-center drop-shadow-lg rounded-full text-black hover:bg-gray-300 hover:shadow-lg "
      >
        <ArrowBackIcon />
      </Link>

      <form onSubmit={handleSubmit}>
        <div
          className={`${styles.card} flex flex-col items-center gap-1 mx-8 my-4`}
        >
          <div className="w-3/5">
            <label className={`flex flex-row ${styles.drop_container}`}>
              <span className={styles.drop_title}>Carica una foto</span>
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="label"
              >
                <input hidden accept="image/*" type="file" />
                <PhotoCamera />
              </IconButton>
            </label>
          </div>

          <Field productKey="Nome" handleChange={handleChange} />
          <Field productKey="Marca" handleChange={handleChange} />

          <FormControl sx={{ m: 1, maxWidth: "60%" }} size="small">
            <InputLabel htmlFor="grouped-native-select">Categoria</InputLabel>
            <Select
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

          <Field productKey="Descrizione" handleChange={handleChange} />

          {/* Informatica */}
          <div className="flex flex-col justify-left">
            <FormControlLabel
              control={<Checkbox />}
              label="Dual sim"
              name="Dual sim"
              onChange={handleChange}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="5G"
              name="5G"
              onChange={handleChange}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="NFC"
              name="NFC"
              onChange={handleChange}
            />
          </div>
          <Field productKey="Processore" handleChange={handleChange} />
          <Field productKey="Display" handleChange={handleChange} />
          <Field productKey="Fotocamera" handleChange={handleChange} />
          <Field productKey="Webcam" handleChange={handleChange} />
          <Field productKey="Sistema Operativo" handleChange={handleChange} />
          <Field productKey="RAM" handleChange={handleChange} />
          <Field productKey="ROM" handleChange={handleChange} />
          <Field productKey="Batteria" handleChange={handleChange} />
          <Field productKey="Memoria" handleChange={handleChange} />
          <Field productKey="Scheda Video" handleChange={handleChange} />
          <Field productKey="Colore" handleChange={handleChange} />
          <Field productKey="Peso" handleChange={handleChange} />
          <Field productKey="Dimensioni" handleChange={handleChange} />
          <Field productKey="Giri" handleChange={handleChange} />

          <Field productKey="Prezzo" handleChange={handleChange} />
        </div>
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
    </div>
  );
}

export default AddProduct;

// iPhone non è in ordine
