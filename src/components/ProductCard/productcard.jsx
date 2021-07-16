import React, {useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductStart, setProduct } from '../../redux/Products/products.actions';
import { addProduct } from '../../redux/Cart/cart.actions';
import Button from '../forms/Button/button';
import './productcard.scss';

const mapState = state => ({
    product: state.productsData.product
});

const ProductCard = ({}) =>{
    const dispatch = useDispatch();
    const {productID} = useParams();
    const {product} = useSelector(mapState);

    const {
        //datos a mostrar en el detalle
        productThumbnail,
        productName,
        productAuthor,
        productDescription,
        productPrice,
        productISBN
    } = product;

    useEffect(() => {
        dispatch(
            fetchProductStart(productID)
        )

        return () => {
            dispatch(
                setProduct({})
            )
        }
    }, []);

    const configAddToCartBtn = {
        type: 'button'
    }

    const handleAddToCart = (product) => {
        if(!product) return;
        dispatch(
            addProduct(product)
        )
    }

    return(
        <div className="productCard">
            <div className="hero">
                <img src={productThumbnail}/>
            </div>
            <div className="productDetails">
                <ul>
                    <li>
                        <h1>
                            {productName}
                        </h1>
                        <h5>
                            ISBN: {productISBN}
                        </h5>
                    </li>
                    <li>
                        <h3>
                            {productAuthor}
                        </h3>
                    </li>
                    <li>
                        <span>
                            ${productPrice}
                        </span>
                    </li>
                    <li>
                        <div className="addToCart">
                            <Button {...configAddToCartBtn} onClick={() => handleAddToCart(product)}>
                                Añadir al carrito
                            </Button>
                        </div>
                    </li>
                    <li>
                        <h4>
                            Sinopsis:
                        </h4>
                        <p>
                            {productDescription}
                        </p>
                    </li>
                </ul>
            </div>
            
        </div>
    );
}

export default ProductCard;