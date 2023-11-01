import React from 'react';
import { Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { selectProductList } from '../features/product/productSlice';


function ProductListItem(props) {
  const { product: { imagePath, title, price } } = props;

  return (
    <Col md={4}>
      <img src={imagePath} width="80%" />
      <h4>{title}</h4>
      <p>{price}</p>
   </Col>
  );
}

export default ProductListItem;