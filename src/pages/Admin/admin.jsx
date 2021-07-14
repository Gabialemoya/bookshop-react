import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector} from 'react-redux';
import {addProductStart, fetchProductsStart, deleteProductStart} from './../../redux/Products/products.actions';
import Modal from './../../components/Modal/modal';
import FormInput from './../../components/forms/FormInput/forminput';
import FormSelect from '../../components/forms/FormSelect/formselect';
import TextArea from '../../components/forms/TextArea/textarea';
import Button from './../../components/forms/Button/button';
import LoadMore from './../../components/LoadMore/loadmore';
import './admin.scss';
//import { useState } from 'react';

const mapState = ({productsData}) => ({
    products: productsData.products
});

const Admin = props => {
    const {products} = useSelector(mapState);

    const dispatch = useDispatch();
    const [hideModal, setHideModal] = useState(true);
    const [productCategory, setProductCategory] = useState('');
    const [productISBN, setProductISBN] = useState('');
    const [productName, setProductName] = useState('');
    const [productAuthor, setProductAuthor] = useState('');
    const [productThumbnail, setProductThumbnail] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productPrice, setProductPrice] = useState(0);

    const {data, queryDoc, isLastPage} = products;

    useEffect(() => {
        dispatch(
            fetchProductsStart()
        );

    }, []);

    const toggleModal = () => setHideModal(!hideModal);

    const configModal = {
        hideModal,
        toggleModal
    };

    const resetForm = () => {
        setHideModal(true);
        setProductCategory('');
        setProductISBN('');
        setProductName('');
        setProductAuthor('');
        setProductThumbnail('');
        setProductDescription('');
        setProductPrice(0);
    }

    const handleSubmit = e => {
        e.preventDefault();

        dispatch(
            addProductStart({
                productCategory,
                productISBN,
                productName,
                productAuthor,
                productThumbnail,
                productDescription,
                productPrice

            })
        );
        resetForm();
    };

    const handleLoadMore = () =>{
        dispatch(
            fetchProductsStart({
                startAfterDoc:queryDoc, 
                persistProducts: data
            })
        );
    };

    const configLoadMore =  {
        onLoadMoreEvt: handleLoadMore,
    };

    return(
        <div className="admin">
            <div className="callToActions">
                <ul>
                    <li>
                        <Button onClick={() => toggleModal()}>
                            Añadir nuevo libro
                        </Button>
                    </li>
                </ul>
            </div>

            <Modal {...configModal}>
                <div className="addNewProductForm">
                    <form onSubmit={handleSubmit}>
                        <h2>
                            Añadir nuevo libro
                        </h2>

                        <FormSelect
                            label="Genero"
                            options={[{
                                name: 'Otros',
                                value: '',
                            },{
                                value: "terror",
                                name: "Terror"
                            },{
                                value: "accion",
                                name:"Accion"
                            }, {
                                value: "romance",
                                name: "Romance"
                            },{
                                value: "fantasia",
                                name: "Fantasia"
                            }]}
                            handleChange= {e => setProductCategory(e.target.value)}
                        />
                        <FormInput
                            label="ISBN"
                            type="text"
                            value={productISBN}
                            handleChange={e => setProductISBN(e.target.value)}
                        />

                         <FormInput
                            label="Titulo"
                            type="text"
                            value={productName}
                            handleChange={e => setProductName(e.target.value)}
                        />

                        <FormInput
                            label="Autor/a"
                            type="text"
                            value={productAuthor}
                            handleChange={e => setProductAuthor(e.target.value)}
                        />

                        <FormInput
                            label="URL Portada"
                            type="url"
                            value={productThumbnail}
                            handleChange={e => setProductThumbnail(e.target.value)}
                        />

                        <TextArea
                            label="Sinopsis"
                            type="text"
                            value={productDescription}
                            handleChange={e => setProductDescription(e.target.value)}
                        />
                        {/* <FormInput
                            label="Sinopsis"
                            type="text"
                            value={productDescription}
                            handleChange={e => setProductDescription(e.target.value)}
                        /> */}

                        <FormInput
                            label="Price"
                            type="number"
                            min="0.00"
                            max="10000.00"
                            step="0.01"
                            value={productPrice}
                            handleChange={e => setProductPrice(e.target.value)}
                        />

                        <Button type="submit">
                            Agregar Libro
                        </Button>
                    </form>
                </div>
            </Modal>

            <div className="manageProducts">
                <table border="0" cellPadding="0" cellSpacing="0">
                    <tbody>
                        <tr>
                            <th>
                                <h1>
                                    Gestionar Productos
                                </h1>
                            </th>
                        </tr>
                        <tr>
                            <td>
                                <table className="results" border="0" cellPadding="10" cellSpacing="0">
                                    <tbody>
                                        {(Array.isArray(data) && data.length > 0) && data.map((product, index) => {
                                            const {
                                                productName,
                                                productThumbnail,
                                                productPrice,
                                                documentID
                                            } = product;
                                            return(
                                                <tr>
                                                    <td>
                                                        <img src={productThumbnail} />
                                                    </td>
                                                    <td>
                                                        {productName}
                                                    </td>
                                                    <td>
                                                        ${productPrice}
                                                    </td>
                                                    <td>
                                                        <Button onClick={() => dispatch(deleteProductStart(documentID))}>
                                                            Eliminar
                                                        </Button>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td>

                            </td>
                        </tr>
                        <tr>
                            <td>
                                <table border="0" cellPadding="10" cellSpacing="0">
                                    <tbody>
                                        <tr>
                                            <td>
                                                {!isLastPage && (
                                                    <LoadMore {...configLoadMore}/>
                                                )}
                                            </td>
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
}

export default Admin;