import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Product from "../../components/ProductResults/Product/product";
import { firestore } from "../../firebase/utils";

const Result = () => {
  const { searchType } = useParams();
  console.log(searchType.split(" "));
  const [books, setBooks] = useState([]);

  useEffect(() => {
    firestore
      .collection("products")
      .get()
      .then((querySnapshot) => {
        const documents = [];
        querySnapshot.forEach((doc) => {
          if (
            doc
              .data()
              .productName.toUpperCase()
              .includes(searchType.toUpperCase()) ||
            doc.data().productAuthor.toUpperCase() === searchType.toUpperCase() ||
            doc.data().productISBN === searchType
          ) {
            // doc.data() is never undefined for query doc snapshots
            documents.push({
              documentID: doc.id,
              ...doc.data(),
            });
          }
        });
        setBooks(documents);
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }, []);

  console.log(books);
  return (
    <div className="products">
      <div className="productResults">
        {books.length ? (
          books.map((product) => {
            const { productThumbnail, productName, productPrice } = product;
            if (
              !productThumbnail ||
              !productName ||
              typeof productPrice === "undefined"
            )
              return null;

            const configProduct = {
              ...product,
            };
            return <Product {...configProduct} />;
          })
        ) : (
          <h2 style={{ marginLeft: "50px" }}>
            No hay resultados para esta búsqueda
          </h2>
        )}
      </div>
    </div>
  );
};

export default Result;
