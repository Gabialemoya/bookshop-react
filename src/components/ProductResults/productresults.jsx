import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchProductsStart} from '../../redux/Products/products.actions';
import Product from './Product/product';
import './productresults.scss';

const mapState = ({productsData}) => ({
    products: productsData.products
});

const ProductResults = ({}) => {
    const dispatch = useDispatch();
    const {products} = useSelector(mapState);

    useEffect(() => {
        dispatch(
            fetchProductsStart()
        )
    }, []);

    if(!Array.isArray(products)) return null;

    if(products.lenght < 1){
        return(
            <div className="products">
                <p>
                    No se encontraron resultados.
                </p>
            </div>
        )
    }

    return (
        <div className="products">

            <h1>
                Buscar Libros
            </h1>

            <div className="productResults">
                {products.map((product, pos) => {
                    const {productThumbnail, productName, productPrice}=product;
                    if(!productThumbnail || !productName || typeof productPrice === 'undefined') return null;

                    const configProduct = {
                        productThumbnail, 
                        productName, 
                        productPrice
                    };

                    return(
                        <Product {...configProduct}/>
                    );
                })}
            </div>
        </div>
    );
};

export default ProductResults;