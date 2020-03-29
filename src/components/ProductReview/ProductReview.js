import React from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import Product from '../Product/Product';

const ProductReview = () => {
    let {productkey} = useParams();
    const product = fakeData.find(pd => pd.key === productkey);
    return (
        <div>
            <h1>Your Product Details</h1>
            <Product showAddToCart ={false} product ={product}></Product>
        </div>
    );
};

export default ProductReview;