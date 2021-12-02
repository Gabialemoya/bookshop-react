import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductStart,
  fetchProductsStart,
  deleteProductStart,
  editProductStart,
  setProduct,
} from "./../../redux/Products/products.actions";
import Modal from "./../../components/Modal/modal";
import FormInput from "./../../components/forms/FormInput/forminput";
import FormSelect from "../../components/forms/FormSelect/formselect";
import TextArea from "../../components/forms/TextArea/textarea";
import Button from "./../../components/forms/Button/button";
import LoadMore from "./../../components/LoadMore/loadmore";
import "./admin.scss";

const mapState = ({ productsData }) => ({
  products: productsData.products,
});

const Admin = () => {
  const { products } = useSelector(mapState);

  const dispatch = useDispatch();
  const [hideModal, setHideModal] = useState(true);
  const [productId, setProductId] = useState(0);
  const [productCategory, setProductCategory] = useState("");
  const [productISBN, setProductISBN] = useState("");
  const [productName, setProductName] = useState("");
  const [productAuthor, setProductAuthor] = useState("");
  const [productThumbnail, setProductThumbnail] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [errors, setErrors] = useState([]);
  const [productStock, setProductStock] = useState(true);

  const { data, queryDoc, isLastPage } = products;

  useEffect(() => {
    dispatch(fetchProductsStart());
  }, [dispatch]);

  const toggleModal = () => setHideModal(!hideModal);

  const isValidField = () => {
    let obj = {
      productISBN,
      productName,
      productAuthor,
      productThumbnail,
      productDescription,
      productPrice,
    };
    let valid = true;
    let errors = {};

    for (let key in obj) {
      if (obj[key] === "") {
        errors[key] = "Campo requerido";
        setErrors(errors);
        valid = false;
      }
    }

    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isValidField()) {
      if (productId === 0) {
        dispatch(
          addProductStart({
            productCategory,
            productISBN,
            productName,
            productAuthor,
            productThumbnail,
            productDescription,
            productPrice,
            productStock,
          })
        );
      } else {
        dispatch(
          editProductStart({
            productId,
            productCategory,
            productISBN,
            productName,
            productAuthor,
            productThumbnail,
            productDescription,
            productPrice,
            productStock,
          })
        );
      }
      handleClean();
    }
  };

  const handleLoadMore = () => {
    dispatch(
      fetchProductsStart({
        startAfterDoc: queryDoc,
        persistProducts: data,
      })
    );
  };

  const configLoadMore = {
    onLoadMoreEvt: handleLoadMore,
  };

  const editProduct = (product) => {
    toggleModal();
    const {
      documentID,
      productAuthor,
      productCategory,
      productDescription,
      productISBN,
      productName,
      productPrice,
      productThumbnail,
      productStock,
    } = product;
    setProductId(documentID);
    setProductCategory(productCategory);
    setProductISBN(productISBN);
    setProductName(productName);
    setProductAuthor(productAuthor);
    setProductThumbnail(productThumbnail);
    setProductDescription(productDescription);
    setProductPrice(productPrice);
    setProductStock(productStock);
  };

  const handleClean = () => {
    setHideModal(true);
    setProductId(0);
    setProductCategory("");
    setProductISBN("");
    setProductName("");
    setProductAuthor("");
    setProductThumbnail("");
    setProductDescription("");
    setProductPrice("");
    setProductStock(true);
    setErrors([]);
  };

  const handleClose = () => {
    //toggleModal();
    handleClean();
  };

  const configModal = {
    hideModal,
    toggleModal,
    handleClean,
  };

  return (
    <div className="admin">
      <div className="callToActions">
        <ul>
          <li>
            <Button onClick={() => toggleModal()}>Agregar libro</Button>
          </li>
        </ul>
      </div>

      <Modal {...configModal}>
        <div className="addNewProductForm">
          <form onSubmit={handleSubmit}>
            <h2>{productId === 0 ? "Agregar libro" : "Editar libro"}</h2>

            <FormSelect
              label="Genero"
              value={productCategory}
              options={[
                {
                  name: "Otros",
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
              ]}
              handleChange={(e) => {
                setProductCategory(e.target.value);
              }}
            />

            <FormInput
              label="ISBN"
              type="number"
              value={productISBN}
              handleChange={(e) => {
                setProductISBN(e.target.value);
                setErrors({ ...errors, productISBN: "" });
              }}
            />
            {errors.productISBN && (
              <p className="error-required space">{errors.productISBN}</p>
            )}

            <FormInput
              label="Titulo"
              type="text"
              value={productName}
              handleChange={(e) => {
                setProductName(e.target.value);
                setErrors({ ...errors, productName: "" });
              }}
            />
            {errors.productName && (
              <p className="error-required space">{errors.productName}</p>
            )}

            <FormInput
              label="Autor/a"
              type="text"
              value={productAuthor}
              handleChange={(e) => {
                setProductAuthor(e.target.value);
                setErrors({ ...errors, productAuthor: "" });
              }}
            />
            {errors.productAuthor && (
              <p className="error-required space">{errors.productAuthor}</p>
            )}

            <FormInput
              label="URL Portada"
              type="url"
              value={productThumbnail}
              handleChange={(e) => {
                setProductThumbnail(e.target.value);
                setErrors({ ...errors, productThumbnail: "" });
              }}
            />
            {errors.productThumbnail && (
              <p className="error-required space">{errors.productThumbnail}</p>
            )}

            <TextArea
              label="Sinopsis"
              type="text"
              value={productDescription}
              handleChange={(e) => {
                setProductDescription(e.target.value);
                setErrors({ ...errors, productDescription: "" });
              }}
            />
            {errors.productDescription && (
              <p className="error-required space" style={{ marginTop: "8px" }}>
                {errors.productDescription}
              </p>
            )}

            <FormInput
              label="Price"
              type="number"
              min="0.00"
              max="10000.00"
              value={productPrice}
              handleChange={(e) => {
                setProductPrice(e.target.value);
                setErrors({ ...errors, productPrice: "" });
              }}
            />
            {errors.productPrice && (
              <p className="error-required space">{errors.productPrice}</p>
            )}

            <FormSelect
              label="Stock"
              value={productStock}
              options={[
                {
                  name: "Si",
                  value: true,
                },
                {
                  name: "No",
                  value: false,
                },
              ]}
              handleChange={(e) => setProductStock(e.target.value)}
            />

            <Button type="submit">
              {" "}
              {productId === 0 ? "Agregar libro" : "Editar libro"}
            </Button>
          </form>
        </div>
        <Button onClick={() => handleClose()}>Cancelar</Button>
      </Modal>

      <div className="manageProducts">
        <table border="0" cellPadding="0" cellSpacing="0">
          <tbody>
            <tr>
              <th>
                <h1>Gestionar Productos</h1>
              </th>
            </tr>
            <tr>
              <td>
                <table
                  className="results"
                  border="0"
                  cellPadding="10"
                  cellSpacing="0"
                >
                  <tbody>
                    {Array.isArray(data) &&
                      data.length > 0 &&
                      data.map((product) => {
                        const {
                          productName,
                          productThumbnail,
                          productPrice,
                          documentID,
                        } = product;
                        return (
                          <tr key={documentID}>
                            <td>
                              <img src={productThumbnail} alt="Imagen Libro" />
                            </td>
                            <td>{productName}</td>
                            <td>${productPrice}</td>
                            <td>
                              <Button
                                onClick={() => {
                                  editProduct(product);
                                }}
                              >
                                Editar
                              </Button>
                              <br></br>
                              <Button
                                onClick={() =>
                                  dispatch(deleteProductStart(documentID))
                                }
                              >
                                Eliminar
                              </Button>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td></td>
            </tr>
            <tr>
              <td>
                <table border="0" cellPadding="10" cellSpacing="0">
                  <tbody>
                    <tr>
                      <td>{!isLastPage && <LoadMore {...configLoadMore} />}</td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;
