import React from 'react';
import Table from 'react-bootstrap/Table';
const ProductSummary = ({ products }) => {

  const unitOfMeasureSummary = {};
  let totalPrice = 0;


  products.forEach((product) => {
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
  });


  return (
    <div className="product-summary">
      <h3 className="summary-title">Product Summary</h3>
      <h4 className="summary-price">Total Price: {totalPrice}</h4>
      <Table striped bordered hover responsive className="summary-table">
        <thead>
          <tr>
            <th>Unit of Measure</th>
            <th>Total Units</th>
            <th>Total Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(unitOfMeasureSummary).map(([measure, summary]) => (
            <tr key={measure} className="summary-row">
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

export default ProductSummary;
