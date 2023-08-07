import React from 'react';
import styled from 'styled-components';
import Avocado from '../assets/Avocado.jpg'
import { Link } from 'react-router-dom';

const OrderCardWrapper = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 16px;
    width: 100%;
    max-width: 300px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background: #205d20;
    margin-top: 2rem;
`;

const OrderId = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;
  color:#fff
`;

const OrderInfo = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color:#fff
`;

const Label = styled.span`
  color: #fff;
`;

const Value = styled.span`
  font-weight: bold;
`;

const SupplierStatus = styled.div`
  margin-top: 16px;
  font-size: 14px;
  color: #fff;
`;
const ProductImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
  margin: 0 auto;
  margin-top: -50px; /* Negative margin to pull the image upwards */
`;


const RectangularSection = ({ orderId, numberOfProducts, supplier, shippingDate }) => {
  return (
    <Link to={`/orders/${orderId}`}>
        <OrderCardWrapper>
            <ProductImage src={Avocado} alt="image" />
        <OrderId>Order ID: {orderId}</OrderId>
        <OrderInfo>
            <div>
            <Label>Number of Products:</Label>
            <Value>{numberOfProducts}</Value>
            </div>
            <div>
            <Label>Supplier:</Label>
            <Value>{supplier}</Value>
            </div>
        </OrderInfo>
        <SupplierStatus>shipping date: {shippingDate}</SupplierStatus>
        </OrderCardWrapper>
    </Link>
  );
};

export default RectangularSection;
