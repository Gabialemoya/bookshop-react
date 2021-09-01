import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/ProductCard/productcard";
import {
  fetchProductStart,
  setProduct,
} from "../../redux/Products/products.actions";

const mapState = (state) => ({
  product: state.productsData.product,
});

const ProductDetails = () => {
  const { product } = useSelector(mapState);

  const dispatch = useDispatch();
  const { productID } = useParams();

  useEffect(() => {
    dispatch(fetchProductStart(productID));

    return () => {
      dispatch(setProduct({}));
    };
  }, []);

  return (
    <div>
      <ProductCard book={product} />
    </div>
  );
};

export default ProductDetails;
