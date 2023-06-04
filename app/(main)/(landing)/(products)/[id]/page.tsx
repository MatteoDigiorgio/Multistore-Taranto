import MyLoading from "@/app/(main)/MyLoading";
import { getProduct } from "@/pages/api/auth/getProducts";
import React from "react";

import Product from "./Product";
import { notFound } from "next/navigation";

async function ProductPage({ params }: any) {
  const productData = await getProduct(params.id);

  if (!productData) {
    notFound();
  }

  return (
    <>
      {productData ? (
        <Product productData={productData} />
      ) : (
        <>
          <div className="bg-white flex justify-center items-center flex-grow z-0">
            <MyLoading />
          </div>
        </>
      )}
    </>
  );
}

export default ProductPage;
