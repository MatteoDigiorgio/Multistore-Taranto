import db from "../../../firebase";

export async function getProducts() {
  const dbProdotti = await db
    .collection("prodotti")
    .orderBy("nome", "asc")
    .get();

  const prodotti = await Promise.all(
    dbProdotti.docs.map(async (prodotti) => {
      const myarray = Object.entries(prodotti.data());
      const myObject: any = myarray.reduce((obj, [key, value]) => {
        return { ...obj, [key]: value };
      }, {});
      myObject.id = prodotti.id;
      return myObject;
    })
  );
  return prodotti;
}

export async function getProduct(id: any) {
  const prodottoE = await db.collection("prodotti").doc(id).get();
  const data = prodottoE.data();
  return data;
}
