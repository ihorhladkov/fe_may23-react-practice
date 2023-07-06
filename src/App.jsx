/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';
import Table from './api/components/Table';

const products = productsFromServer.map((product) => {
  const category = categoriesFromServer.find(category => category.id === product.categoryId);
  const userInfo = usersFromServer.find(user => user.id === category.ownerId);

  return {
    ...product,
    categoryInfo: category,
    user: userInfo,
  };
});

console.log(products);

function filterProducts(productsArr, { filterType }) {
  const currentProducts = [...productsArr];

  if (filterType) {
    switch (filterType) {
      case ('Roma'):
        currentProducts.filter(
          currentProduct => currentProduct.user.name === 'Roma',
        );

        break;

      default:
        break;
    }
  }
}

export const App = () => {
  const [targetUser, setTargetUser] = useState('');

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>

        <div className="block">
          <nav className="panel">
            <p className="panel-heading">Filters</p>

            <p className="panel-tabs has-text-weight-bold">
              <a
                data-cy="FilterAllUsers"
                href="#/"
                onClick={() => setTargetUser('all')}
              >
                All
              </a>

              <a
                data-cy="FilterUser"
                href="#/"
              >
                Roma
              </a>

              <a
                data-cy="FilterUser"
                href="#/"
                className="is-active"
              >
                Anna
              </a>

              <a
                data-cy="FilterUser"
                href="#/"
              >
                Max
              </a>

              <a
                data-cy="FilterUser"
                href="#/"
              >
                Max
              </a>
            </p>

            <div className="panel-block">
              <p className="control has-icons-left has-icons-right">
                <input
                  data-cy="SearchField"
                  type="text"
                  className="input"
                  placeholder="Search"
                  value="qwe"
                />

                <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true" />
                </span>

                <span className="icon is-right">
                  {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                  <button
                    data-cy="ClearButton"
                    type="button"
                    className="delete"
                  />
                </span>
              </p>
            </div>

            <div className="panel-block is-flex-wrap-wrap">
              <a
                href="#/"
                data-cy="AllCategories"
                className="button is-success mr-6 is-outlined"
              >
                All
              </a>

              <a
                data-cy="Category"
                className="button mr-2 my-1 is-info"
                href="#/"
              >
                Category 1
              </a>

              <a
                data-cy="Category"
                className="button mr-2 my-1"
                href="#/"
              >
                Category 2
              </a>

              <a
                data-cy="Category"
                className="button mr-2 my-1 is-info"
                href="#/"
              >
                Category 3
              </a>
              <a
                data-cy="Category"
                className="button mr-2 my-1"
                href="#/"
              >
                Category 4
              </a>
            </div>

            <div className="panel-block">
              <a
                data-cy="ResetAllButton"
                href="#/"
                className="button is-link is-outlined is-fullwidth"
              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>

        <div className="box table-container">
          <p data-cy="NoMatchingMessage">
            No products matching selected criteria
          </p>

          <Table products={products} />
        </div>
      </div>
    </div>
  )};
