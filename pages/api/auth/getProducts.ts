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
      myObject.score = calculateSearchScore(lowercaseFilter, myObject);
      return myObject;
    })
  );

  // Find the highest score among the products
  const highestScore = Math.max(...prodotti.map((product) => product.score));

  // Define the threshold score as half of the highest score
  const thresholdScore = highestScore / 2;

  // Filter the products based on the threshold score
  const filteredProducts = prodotti.filter(
    (product) => product.score >= thresholdScore
  );

  // Exclude products with a score always below 5
  const finalProducts = filteredProducts.filter(
    (product) => product.score >= 5
  );

  // Sort the filtered products based on the score in descending order
  const sortedProducts = finalProducts.sort((a, b) => b.score - a.score);

  return sortedProducts;
}

function calculateSearchScore(filter: string, object: any): number {
  let score = 0;
  let matchedFields = 0;
  const objectValues = Object.values(object);
  const keywords = filter.split(" "); // Split the search term into keywords

  for (const value of objectValues) {
    if (
      typeof value === "string" &&
      value !== "id" &&
      value !== "immagine" &&
      value !== "prezzo" &&
      value !== "sconto" &&
      value !== "percentuale"
    ) {
      const lowercasedValue = value.toLowerCase();

      for (const keyword of keywords) {
        const distance = levenshteinDistance(keyword, lowercasedValue);

        if (lowercasedValue.includes(keyword) || distance <= 1) {
          score += 100; // Increase score if keyword is found in the value or is very close
        } else {
          score += 1 / (distance + 1); // Assign higher score for closer matches
        }
      }

      if (keywords.some((keyword) => lowercasedValue.includes(keyword))) {
        matchedFields++; // Increment the count of matched fields if any keyword is found
      }
    }
  }

  // Add the number of matched fields to the score
  score += matchedFields;

  return score;
}

function levenshteinDistance(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  const dp = [];

  for (let i = 0; i <= m; i++) {
    dp.push([i]);
  }

  for (let j = 1; j <= n; j++) {
    dp[0][j] = j;
  }

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1, // deletion
        dp[i][j - 1] + 1, // insertion
        dp[i - 1][j - 1] + cost // substitution
      );
    }
  }

  return dp[m][n];
}
