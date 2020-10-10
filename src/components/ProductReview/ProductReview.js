import React from "react";
import { useParams } from "react-router-dom";

import Product from "../Product/Product";
import { useState } from "react";
import { useEffect } from "react";

const ProductReview = () => {
  let { productkey } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(
      "https://ema-john-backend-server.herokuapp.com/products/" + productkey
    )
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
      });
  }, [productkey]);

  return (
    <div>
      <h1>Your Product Details</h1>
      {product && <Product showAddToCart={false} product={product}></Product>}
    </div>
  );
};

export default ProductReview;
