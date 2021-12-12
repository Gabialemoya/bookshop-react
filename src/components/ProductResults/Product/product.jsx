import React from "react";
import { Link, useHistory } from "react-router-dom";
import Button from "../../forms/Button/button";
import { useDispatch } from "react-redux";
import { addProduct } from "../../../redux/Cart/cart.actions";

const Product = (product) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    documentID,
    productThumbnail,
    productName,
    productPrice,
    productStock,
  } = product;
  if (
    !documentID ||
    !productThumbnail ||
    !productName ||
    typeof productPrice === "undefined"
  )
    return null;

  const configAddToCartBtn = {
    tyoe: "button",
  };

  const handleAddToCart = (product) => {
    if (!product) return;
    dispatch(addProduct(product));
    history.push("/cart");
  };
  if (productStock == "true" || productStock == true) {
    return (
      <div className="product">
        <div className="thumb">
          <Link to={{ pathname: `/product/${documentID}`, product: product }}>
            <img src={productThumbnail} alt={productName} />
          </Link>
        </div>
        <div className="details">
          <ul>
            <li>
              <div
                style={{
                  width: "100%",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                }}
                className="name"
              >
                <Link to={`/product/${documentID}`}>{productName}</Link>
              </div>
            </li>
            <li>
              <span className="price">${productPrice}</span>
            </li>

            <li>
              <div className="addToCart">
                <Button
                  {...configAddToCartBtn}
                  onClick={() => handleAddToCart(product)}
                >
                  Añadir al carrito
                </Button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  } else {
    return (
      <div className="product">
        <div className="thumb">
          <Link to={{ pathname: `/product/${documentID}`, product: product }}>
            <img src={productThumbnail} alt={productName} />
          </Link>
        </div>
        <div className="details">
          <ul>
            <li>
              <div
                className="name"
                style={{
                  width: "100%",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                }}
              >
                <Link to={`/product/${documentID}`}>{productName}</Link>
              </div>
            </li>
            <li>
              <span className="price">${productPrice}</span>
            </li>

            <li>
              <div>
                <span className="noStock">SIN STOCK</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  }
};

export default Product;
