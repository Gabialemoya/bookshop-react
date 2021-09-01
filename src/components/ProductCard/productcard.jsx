import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import { addProduct } from "../../redux/Cart/cart.actions";
import Button from "../forms/Button/button";
import "./productcard.scss";

const ProductCard = ({ book }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const {
    productThumbnail,
    productName,
    productAuthor,
    productDescription,
    productPrice,
    productISBN,
  } = book;

  const configAddToCartBtn = {
    type: "button",
  };

  const handleAddToCart = (product) => {
    if (!product) return;
    dispatch(addProduct(product));
    history.push("/cart");
  };

  return (
    <div className="productCard">
      <div className="hero">
        <img src={productThumbnail} />
      </div>
      <div className="productDetails">
        <ul>
          <li>
            <h1>{productName}</h1>
            <h5>ISBN: {productISBN}</h5>
          </li>
          <li>
            <h3>{productAuthor}</h3>
          </li>
          <li>
            <span>${productPrice}</span>
          </li>
          <li>
            <div className="addToCart">
              <Button
                {...configAddToCartBtn}
                onClick={() => handleAddToCart(book)}
              >
                Añadir al carrito
              </Button>
            </div>
          </li>
          <li>
            <h4>Sinopsis:</h4>
            <p>{productDescription}</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProductCard;
