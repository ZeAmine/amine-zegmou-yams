import React from 'react';
import Product from './Product';
import { nanoid } from 'nanoid';

function ProductsList({ products }) {

  return (
    <div className="products-container">
      {products.map((product, index) => (
        <Product key={index} product={product}>
          <form onSubmit={onSubmit(product)}>
            Quantity :{' '}
            <input name="quantity" type="number" min="1" step="1" defaultValue="1" required style={{ width: '30px' }} />
            <br />
            <button type="submit">Add to basket</button>
          </form>
        </Product>
      ))}
    </div>
  );

  function onSubmit(product) {
    return (event) => {
      event.preventDefault();
      const quantity = Number(event.target.querySelector('[name=quantity]')?.value) || 1;

      const newItem = {
        id: nanoid(),
        product,
        quantity,
      };

      console.log('Adding new item', newItem)
      // ...
    };
  }
}

export default ProductsList;
