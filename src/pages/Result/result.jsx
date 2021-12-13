import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams, useHistory} from "react-router-dom";
import Button from "../../components/forms/Button/button";
import Product from "../../components/ProductResults/Product/product";
import { firestore } from "../../firebase/utils";
import './result.scss';

const Result = () => {
  const { searchType } = useParams();
  const [books, setBooks] = useState([]);
  const history = useHistory();
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
            doc.data().productAuthor.toUpperCase()
            .includes(searchType.toUpperCase()) ||
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

  console.log(searchType);

  return (
    <div className="products">
      {books.length ? (
      <h3>{books.length} resultado(s) encontrado(s) para "{searchType}"</h3>
      ):(
        <h3></h3>
      )}
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
          <div className="products-notfound">
            <h2 style={{ marginLeft: "50px" , textAlign: "center"}}>
            No hay resultados para "{searchType}"
          </h2>
          <img src="https://peru21.pe/resizer/EaTHMikWM1IDeQen9Dy1sEPoC4g=/580x330/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/HYAA7S354JAYBBCB73HJZSGZIY.gif" alt="" />
         
          </div>
          
          
        )}
      </div>
      <Button onClick={() => history.goBack()}>Volver</Button>
    </div>
  );
};

export default Result;
