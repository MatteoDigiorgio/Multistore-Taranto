import { getDownloadURL, ref } from "firebase/storage";
import db, { storage } from "../../../firebase";

export async function getProducts() {
  const dbProdotti = await db
    .collection("prodotti")
    .orderBy("nome", "asc")
    .get();

  // await getDownloadURL(
  //   ref(storage, `immagini/${}`)
  // ).then((res) => setImgurl({ immagine: res }));

  const prodotti = await Promise.all(
    dbProdotti.docs.map(async (prodotti) => {
      const myarray = Object.entries(prodotti.data());

      const myObject: any = myarray.reduce((obj, [key, value]) => {
        if (key === "immagine") {
          const downloadURLPromise = getDownloadURL(
            ref(storage, `immagini/${value}`)
          );
          downloadURLPromise.then((downloadURL) => (value = downloadURL));
          return { ...obj, [key]: value };
        } else {
          return { ...obj, [key]: value };
        }
        console.log(value);
      }, {});
      myObject.id = prodotti.id;
      return myObject;
    })
  );

  // prodotti.sort((a, b) => a.nome.localeCompare(b.nome));
  return prodotti;
}

export async function getProduct(id: any) {
  const prodottoE = await db.collection("prodotti").doc(id).get();
  const data = prodottoE.data();
  return data;
}
