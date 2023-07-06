/* eslint-disable jsx-a11y/accessible-emoji */
import cn from 'classnames';
import React from 'react';

export default function Table({ products }) {
  return (
    <table
      data-cy="ProductTable"
      className="table is-striped is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              ID

              <a href="#/">
                <span className="icon">
                  <i data-cy="SortIcon" className="fas fa-sort" />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Product

              <a href="#/">
                <span className="icon">
                  <i data-cy="SortIcon" className="fas fa-sort-down" />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Category

              <a href="#/">
                <span className="icon">
                  <i data-cy="SortIcon" className="fas fa-sort-up" />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              User

              <a href="#/">
                <span className="icon">
                  <i data-cy="SortIcon" className="fas fa-sort" />
                </span>
              </a>
            </span>
          </th>
        </tr>
      </thead>

      <tbody>
        {products.map(product => (
          <tr data-cy="Product">
            <td className="has-text-weight-bold" data-cy="ProductId">
              {product.id}
            </td>

            <td data-cy="ProductName">{product.name}</td>
            <td data-cy="ProductCategory">{product.categoryInfo.title}</td>

            <td
              data-cy="ProductUser"
              className={cn({
                'has-text-link': product.user.sex === 'm',
                'has-text-danger': product.user.sex === 'f',
              })}
            >
              {product.user.name}
            </td>
          </tr>
        ))}

        {/* <tr data-cy="Product">
          <td className="has-text-weight-bold" data-cy="ProductId">
            2
          </td>

          <td data-cy="ProductName">Bread</td>
          <td data-cy="ProductCategory">🍞 - Grocery</td>

          <td
            data-cy="ProductUser"
            className="has-text-danger"
          >
            Anna
          </td>
        </tr>

        <tr data-cy="Product">
          <td className="has-text-weight-bold" data-cy="ProductId">
            3
          </td>

          <td data-cy="ProductName">iPhone</td>
          <td data-cy="ProductCategory">💻 - Electronics</td>

          <td
            data-cy="ProductUser"
            className="has-text-link"
          >
            Roma
          </td>
        </tr> */}
      </tbody>
    </table>
  );
}
