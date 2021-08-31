import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import {
  fetchProductsStart,
  fetchProductStart,
} from "../../redux/Products/products.actions";
import Product from "./Product/product";
//import { useState } from 'react';
import FormSelect from "../forms/FormSelect/formselect";
import FormInput from "../forms/FormInput/forminput";
import Button from "../forms/Button/button";
import LoadMore from "../LoadMore/loadmore";
//import Link from
import "./productresults.scss";

const mapState = ({ productsData }) => ({
  products: productsData.products,
});

const ProductResults = ({}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { filterType } = useParams();
  const { searchType } = useParams();
  const { products } = useSelector(mapState);
  const [searchTerm, setSearchTerm] = useState("");
  const { data, queryDoc, isLastPage } = products;

  useEffect(() => {
    dispatch(fetchProductsStart({ filterType }));
  }, [filterType]);

  useEffect(() => {
    dispatch(fetchProductStart({ searchType }));
  }, [searchType]);

  const handleFilter = (e) => {
    //filtros
    const nextFilter = e.target.value;
    history.push(`/search/${nextFilter}`);
  };

  const handleSearch = (e) => {
    e.preventDefault();

    console.log(searchTerm);
    history.push(`/search/results/${searchTerm}`);
  };

  if (!Array.isArray(data)) return null;

  const configSearch = {
    defaultValue: searchType,
    handleChange: handleSearch,
  };

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
        value: "accion",
        name: "Accion",
      },
      {
        value: "romance",
        name: "Romance",
      },
      {
        value: "fantasia",
        name: "Fantasia",
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
      <div>
        <p>No se encontraron resultados.</p>
        <Button onClick={() => history.goBack()}>Seguir comprando</Button>
      </div>
    );
  }

  return (
    <div className="products">
      <h1>Buscar Libros</h1>
      <div className="filtros">
        Categorias
        <FormSelect {...configFilters} />
      </div>

      <div className="SearchBar">
        <form onSubmit={handleSearch}>
          <FormInput
            type="text"
            name="search"
            value={searchTerm}
            placeholder="Ingrese el titulo del libro, autor/a o ISBN"
            handleChange={(e) => setSearchTerm(e.target.value)}

            //value={this.target.value}
          />

          <Link to={`/search/results/${searchTerm}`}>BUSCAR</Link>
          {/* <Button type="submit" >
                        Buscar
                    </Button> */}
        </form>
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
