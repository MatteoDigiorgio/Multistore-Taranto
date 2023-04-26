"use client";
import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SendIcon from "@mui/icons-material/Send";
import styles from "./Aggiungi.module.css";
import Link from "next/link";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

function AddProduct() {
  const [age, setAge] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };
  return (
    <div className="relative m-auto flex flex-col">
      <Link
        href="/auth/admin/gestisci"
        className="flex absolute left-12 top-10 p-1 items-center drop-shadow-lg rounded-full text-black hover:bg-gray-300 hover:shadow-lg "
      >
        <ArrowBackIcon />
      </Link>

      <div
        className={`${styles.card} flex flex-col items-center gap-1 mx-8 my-4`}
      >
        <div className="w-3/4 px-4">
          <label className={styles.drop_container}>
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

        <TextField
          label="Nome"
          id="outlined-start-adornment"
          type="text"
          sx={{ m: 1, width: "20ch" }}
          size="small"
        />

        <FormControl sx={{ m: 1, minWidth: "20ch" }} size="small">
          <InputLabel id="demo-select-small-label">Categoria</InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={age}
            label="Categoria"
            onChange={handleChange}
          >
            <MenuItem value="">
              <em>Altro</em>
            </MenuItem>
            <MenuItem value={10}>Telefoni</MenuItem>
            <MenuItem value={20}>Elettrodomestici</MenuItem>
            <MenuItem value={30}>Televisori</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Descrizione"
          id="outlined-start-adornment"
          type="text"
          sx={{ m: 1, width: "20ch" }}
          size="small"
        />

        <TextField
          label="Prezzo"
          id="outlined-start-adornment"
          type="number"
          sx={{ m: 1, width: "20ch" }}
          size="small"
          InputProps={{
            startAdornment: <InputAdornment position="start">€</InputAdornment>,
          }}
        />
      </div>
      <div className="flex flex-col items-center gap-2">
        <Link
          href="/auth/admin/gestisci/aggiungi"
          className="flex mx-auto p-4 items-center drop-shadow-lg text-white bg-green-400 rounded-full ring-2 ring-green-500 shadow-lg hover:ring-2 hover:ring-green-700 hover:bg-green-500"
        >
          <SendIcon />
        </Link>
        <p className="font-light">Aggiungi prodotto</p>
      </div>
    </div>
  );
}

export default AddProduct;
