import React from 'react';
import Product from '../components/Product';
import { useProducts } from '../services/Products';

function Basket() {
  const products = useProducts()

  const onlyFourProducts = products?.slice(-4);

  return (
    <div>
      <h2>Hi John!</h2>
      <h3>There are 4 items in your basket</h3>
      <button>Clear basket</button>
      <hr />

      <div className="basket-container">
        {onlyFourProducts &&
          onlyFourProducts.map((product) => (
            <Product key={product.id} product={product}>
              <div>
                <p>Quantity : 1</p>
                <button type="button">
                  Remove
                </button>
              </div>
            </Product>
          ))}
      </div>
    </div>
  );
}

export default Basket;
