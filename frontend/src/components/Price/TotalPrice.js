import React from "react";

class TotalPrice extends React.Component {
  render() {
    const { row } = this.props;

    // Calculate total price
    const totalPrice = row.services.reduce((accumulator, service) => {
      return accumulator + parseFloat(service.price);
    }, 0);

    return <div>{totalPrice}</div>;
  }
}

export default TotalPrice;
