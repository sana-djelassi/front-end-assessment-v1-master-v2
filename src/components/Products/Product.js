import React ,{ useEffect,useState }from 'react';
import PropTypes from 'prop-types';
import {Card, CardText, CardBody, CardTitle, ListGroup, ListGroupItem, Button} from 'reactstrap';
import moment from 'moment'
import {Link} from "react-router-dom";

import { useSelector } from 'react-redux';

const shortDateFormat = 'MM/DD/YYYY';
const longDateFormat = 'MM/DD/YYYY hh:mm a';

const Product = ({ product, onDelete}) => {



  const receiptDate =  product.content.receiptDate ? moment(product.receiptDate).format(shortDateFormat) : '-';
  const expirationDate =  product.content.expirationDate ? moment(product.expirationDate).format(shortDateFormat) : '-';
  const createdAt = product.content.createdAt ? moment(product.content.createdAt).format(longDateFormat) : '-';

  
  return (
    <Card>
      <CardBody>
        <CardTitle>
          <Link to={`/edit/${product.id}`}>{product.content.name}</Link>
          <Button close onClick={() => onDelete(product.id)} />
        </CardTitle>
        <CardText tag="div">
          <ListGroup>
            <ListGroupItem>Brand: {product.content.brand}</ListGroupItem>
            <ListGroupItem>Rating: {product.content.rating}</ListGroupItem>
            <ListGroupItem>Featured: {product.content.featured ? 'Yes' : 'No'}</ListGroupItem>
            <ListGroupItem>Items In Stock: {product.content.itemsInStock}</ListGroupItem>
            <ListGroupItem>
              Categories:
              <ul>
                {product.categories.map(category => (
                 // console.log("====>category",category)
                    <li key={category.id}>{category.name}</li>
                ))}
              </ul>
            </ListGroupItem>
            <ListGroupItem>Receipt Date: {receiptDate}</ListGroupItem>
            <ListGroupItem>Expiration Date: {expirationDate}</ListGroupItem>
            <ListGroupItem>Created At: {createdAt}</ListGroupItem>
          </ListGroup>
        </CardText>
      </CardBody>
    </Card>
  );
}

Product.propTypes = {
  product: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Product;
