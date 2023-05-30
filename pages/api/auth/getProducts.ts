import { getDownloadURL, ref } from "firebase/storage";
import db, { storage } from "../../../firebase";

export async function getProducts() {
  const dbProdotti = await db
    .collection("prodotti")
    .orderBy("nome", "asc")
    .get();

  const prodotti = await Promise.all(
    dbProdotti.docs.map(async (prodotti) => {
      const myarray = Object.entries(prodotti.data());

      const myObject: any = await myarray.reduce(
        async (objPromise, [key, value]) => {
          const obj = await objPromise;
          if (key === "immagine") {
            const downloadURL = await getDownloadURL(
              ref(storage, `immagini/${value}`)
            );
            return { ...obj, [key]: downloadURL };
          } else {
            return { ...obj, [key]: value };
          }
        },
        Promise.resolve({})
      );
      myObject.id = prodotti.id;
      return myObject;
    })
  );
  prodotti.sort((a, b) => a.nome.localeCompare(b.nome));
  return prodotti;
}

export async function getProduct(id: any) {
  const prodotto = await db.collection("prodotti").doc(id).get();
  const data = prodotto.data();

  if (data) {
    const myarray = Object.entries(data);

    const myObject: any = await myarray.reduce(
      async (objPromise, [key, value]) => {
        const obj = await objPromise;
        if (key === "immagine") {
          const downloadURL = await getDownloadURL(
            ref(storage, `immagini/${value}`)
          );
          return { ...obj, [key]: value, immagineUrl: downloadURL };
        } else {
          return { ...obj, [key]: value };
        }
      },
      Promise.resolve({})
    );

    return myObject;
  } else {
    return null;
  }
}
