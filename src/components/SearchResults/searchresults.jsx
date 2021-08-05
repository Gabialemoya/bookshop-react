import React, {useEffect} from 'react';
import {Link ,useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {fetchProductsStart, fetchProductStart, searchProductStart, setProduct} from '../../redux/Products/products.actions';
//import { fetchProductStart, setProduct } from '../../redux/Products/products.actions';
import { addProduct } from '../../redux/Cart/cart.actions';
import Button from '../forms/Button/button';
import './searchresults.scss';

const mapState = state => ({
    product: state.productsData.product
});

const SearchResults = ({}) =>{
    const dispatch = useDispatch();
    const history = useHistory();
    const {searchTerm} = useParams();
    const {product} = useSelector(mapState);

    const {
        //datos a mostrar en el detalle
       
        productName,
       
    } = product;

    useEffect(() => {
        dispatch(
            searchProductStart(searchTerm)
        )

        return () => {
            dispatch(
                setProduct({})
            )
        }
    }, []);

    

    return(
        <div className="productCard">
           
            <div className="productDetails">
                <ul>
                    <li>
                        <h1>
                            {searchTerm}
                        </h1>
                       
                    </li>
                   
                   
                </ul>
            </div>
            
        </div>
    );
}

export default SearchResults;