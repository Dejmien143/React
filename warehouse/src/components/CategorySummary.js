import React from 'react';
import Table from 'react-bootstrap/Table';
const CategorySummary = ({ categoryId, categoryName, products }) => {

  const unitOfMeasureSummary = {};
  let totalPrice = 0;

  products.forEach((product) => {
    if (product.category === categoryId) {
      const { measure, quantity, price } = product;
      const value = quantity * price;
      totalPrice += value;
      if (!unitOfMeasureSummary[measure]) {

        unitOfMeasureSummary[measure] = {
          units: quantity,
          value: value,
        };
      } else {

        unitOfMeasureSummary[measure].units += quantity;
        unitOfMeasureSummary[measure].value += value;
      }
    }
  });


  return (
    <div className="category-summary">
      <h3 className="category-title">Category: {categoryName}</h3>
      <h4 className="category-price">Total Price: {totalPrice}</h4>
      <Table striped bordered hover responsive className="category-table">
        <thead>
          <tr>
            <th>Unit of Measure</th>
            <th>Total Units</th>
            <th>Total Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(unitOfMeasureSummary).map(([measure, summary]) => (
            <tr key={measure} className="category-row">
              <td>{measure}</td>
              <td>{summary.units}</td>
              <td>{summary.value}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );

};

export default CategorySummary;
