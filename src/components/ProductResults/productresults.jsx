import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import { fetchProductsStart } from "../../redux/Products/products.actions";
import Product from "./Product/product";
import FormSelect from "../forms/FormSelect/formselect";
import FormInput from "../forms/FormInput/forminput";
import Button from "../forms/Button/button";
import LoadMore from "../LoadMore/loadmore";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import "./productresults.scss";

const mapState = ({ productsData }) => ({
  products: productsData.products,
});

const ProductResults = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { filterType } = useParams();
  const { products } = useSelector(mapState);
  const [searchTerm, setSearchTerm] = useState("");
  const { data, queryDoc, isLastPage } = products;

  useEffect(() => {
    dispatch(fetchProductsStart({ filterType }));
  }, [filterType]);

  const handleFilter = (e) => {
    const nextFilter = e.target.value;
    history.push(`/search/${nextFilter}`);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    history.push(`/search/results/${searchTerm}`);
  };

  if (!Array.isArray(data)) return null;

  const configFilters = {
    defaultValue: filterType,
    options: [
      {
        name: "Ver todo",
        value: "",
      },
      {
        value: "terror",
        name: "Terror",
      },
      {
        value: "informatica",
        name: "Informática",
      },
      {
        value: "romance",
        name: "Romance",
      },
      {
        value: "fantasia",
        name: "Fantasia",
      },
      {
        value: "otros",
        name: "Otros",
      },
    ],
    handleChange: handleFilter,
  };

  const handleLoadMore = () => {
    dispatch(
      fetchProductsStart({
        filterType,
        startAfterDoc: queryDoc,
        persistProducts: data,
      })
    );
  };

  const configLoadMore = {
    onLoadMoreEvt: handleLoadMore,
  };

  if (data.length < 1) {
    return (
      <div className="products-notfound">
        <h2>No se encontraron resultados.</h2>
        <img src="https://peru21.pe/resizer/EaTHMikWM1IDeQen9Dy1sEPoC4g=/580x330/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/HYAA7S354JAYBBCB73HJZSGZIY.gif" alt="" />
        <Button onClick={() => history.goBack()}>Volver</Button>
      </div>
    );
  }

  return (
    <div className="products">
      <h1>Buscar Libros</h1>
      <div className="grid-container">
        <div className="grid-item filtros">
          <FormSelect {...configFilters} />
        </div>
        <div className="grid-item SearchBar">
          <form onSubmit={handleSearch}>
            <FormInput
              className="form-input"
              type="text"
              name="search"
              value={searchTerm}
              placeholder="Ingrese el titulo del libro, autor/a o ISBN"
              handleChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>
        </div>
        <div className="grid-item">
          <Link to={`/search/results/${searchTerm}`}>
            <FontAwesomeIcon
              icon={faSearch}
              size="1x"
              style={{ color: "black", marginTop: "20px" }}
            />
          </Link>
        </div>
      </div>

      <div className="productResults">
        {data.map((product, pos) => {
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
        })}
      </div>

      {!isLastPage && <LoadMore {...configLoadMore} />}
    </div>
  );
};

export default ProductResults;
