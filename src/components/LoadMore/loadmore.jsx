import React from 'react';
import Button from './../forms/Button/button';

const LoadMore = ({
    onLoadMoreEvt = () => {},
}) => {
    return(
        <Button onClick={() => onLoadMoreEvt()}>
            Cargar mas productos
        </Button>
    );    
};

export default LoadMore;