/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState } from 'react';
import './App.scss';

import cn from 'classnames';
import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';
import Table from './api/components/Table';

const products = productsFromServer.map((product) => {
  const category = categoriesFromServer.find(categoryId => (
    categoryId.id === product.categoryId
  ));
  const userInfo = usersFromServer.find(user => user.id === category.ownerId);

  return {
    ...product,
    categoryInfo: category,
    user: userInfo,
  };
});

function preparedQuery(query) {
  return query
    .trim()
    .toLowerCase();
}

function filterProducts(productsArr, { targetUser, query }) {
  let currentProducts = [...productsArr];

  if (targetUser !== '') {
    currentProducts = currentProducts.filter(currentProduct => (
      currentProduct.user.name === targetUser
    ));
  }

  if (query) {
    currentProducts = currentProducts.filter(currentProduct => (
      currentProduct.name.toLowerCase().includes(preparedQuery(query))
    ));
  }

  return currentProducts;
}

export const App = () => {
  const [targetUser, setTargetUser] = useState('');
  const [query, setQuery] = useState('');
  const visibleProducts = filterProducts(products, { targetUser, query });

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
                onClick={() => setTargetUser('')}
                className={cn({
                  'is-active': targetUser === '',
                })}
              >
                All
              </a>

              {usersFromServer.map(user => (
                <a
                  data-cy="FilterUser"
                  href="#/"
                  onClick={() => setTargetUser(user.name)}
                  className={cn({
                    'is-active': targetUser === user.name,
                  })}
                >
                  {user.name}
                </a>
              ))}
            </p>

            <div className="panel-block">
              <p className="control has-icons-left has-icons-right">
                <input
                  data-cy="SearchField"
                  type="text"
                  className="input"
                  placeholder="Search"
                  value={query}
                  onChange={event => setQuery(event.target.value)}
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
                    onClick={() => setQuery('')}
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
                onClick={() => {
                  setTargetUser('');
                  setQuery('');
                }}
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

          <Table products={visibleProducts} />
        </div>
      </div>
    </div>
  );
};
