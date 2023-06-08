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

export async function getFilterProducts(filter: any) {
  // Convert the filter string to lowercase
  const lowercaseFilter = filter.toLowerCase();

  // Construct a reference to the "prodotti" collection
  const prodottiRef = db.collection("prodotti");

  // Perform the query
  const querySnapshot = await prodottiRef.orderBy("nome").get();

  const prodotti = await Promise.all(
    querySnapshot.docs.map(async (doc) => {
      const prodotto = doc.data();
      const myObject: any = {};

      // Process each field of the product
      for (const [key, value] of Object.entries(prodotto)) {
        if (key === "immagine") {
          const downloadURL = await getDownloadURL(
            ref(storage, `immagini/${value}`)
          );
          myObject[key] = downloadURL;
        } else {
          myObject[key] = value;
        }
      }

      myObject.id = doc.id;
      return myObject;
    })
  );

  // Filter the products based on the partial match
  const filteredProdotti = prodotti.filter((prodotto) =>
    prodotto.nome.toLowerCase().includes(lowercaseFilter)
  );

  return filteredProdotti;
}
