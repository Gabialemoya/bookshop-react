import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory, useParams} from 'react-router-dom';
import {fetchProductsStart} from '../../redux/Products/products.actions';
import Product from './Product/product';
import FormSelect from '../forms/FormSelect/formselect';
import LoadMore from '../LoadMore/loadmore';
import './productresults.scss';

const mapState = ({productsData}) => ({
    products: productsData.products
});

const ProductResults = ({}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {filterType} = useParams();
    const {products} = useSelector(mapState);

    const {data, queryDoc, isLastPage} = products;

    useEffect(() => {
        dispatch(
            fetchProductsStart({filterType})
        )
    }, [filterType]);

    const handleFilter = (e) => {
        //filtros
        const nextFilter = e.target.value;
        history.push(`/search/${nextFilter}`);
    };

    if(!Array.isArray(data)) return null;

    if(data.length < 1){
        return(
            <div className="products">
                <p>
                    No se encontraron resultados.
                </p>
            </div>
        )
    }

    const configFilters = {
        defaultValue: filterType,
        options: [{
            name: 'Ver todo',
            value: '',
        }, {
            value: "terror",
            name: "Terror"
        },{
            value: "accion",
            name:"Accion"
        },{
            value: "romance",
            name: "Romance"
        },{
            value: "fantasia",
            name: "Fantasia"
        }],
        handleChange: handleFilter
    };

    const handleLoadMore = () => {
        dispatch(
            fetchProductsStart({
                filterType, 
                startAfterDoc:queryDoc,
                persistProducts: data
            })
        )
    };

    const configLoadMore = {
        onLoadMoreEvt: handleLoadMore,
    };

    return (
        <div className="products">

            <h1>
                Buscar Libros
            </h1>
            <div className="filtros">
                Categorias
                <FormSelect {...configFilters}/>
            </div>
            

            <div className="productResults">
                {data.map((product, pos) => {
                    const {productThumbnail, productName, productPrice}=product;
                    if(!productThumbnail || !productName || typeof productPrice === 'undefined') return null;

                    const configProduct = {
                        ...product
                    };

                    return(
                        <Product {...configProduct}/>
                    );
                })}
            </div>
            
            {!isLastPage && (
                <LoadMore {...configLoadMore}/>
            )}
        </div>
    );
};

export default ProductResults;