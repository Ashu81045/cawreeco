import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from "styled-components";
import Breadcrumbs from '../components/Breadcrumbs';
import OrderStatus from '../components/OrderStatus';
import TableWithSearch from '../components/TableWithSearch';
import {  useSelector } from 'react-redux';


const ParentContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 16px;
  margin: 1rem 6rem;
`;

const OrderDetails = () => {
    const  productId  = useParams();
    const { orders } = useSelector((state) => state.orders);
    const [orderDetails, setOrderDetails] = useState([]);
    
    const breadcrumbsData = [
        { label: 'Home', to: '/' },
        { label: 'Orders', to: '/orders' },
        { label: `Orders-${productId.orderId}`, to: '/orders/productId' }
    ];
    let orderId = productId?.orderId;
    useEffect(() => {
        let details = getOrderArrayByOrderId(orderId, orders);
        setOrderDetails(details[0]);
    },[]);

    const getOrderArrayByOrderId = (orderId, orderData) =>{
        // Use the Array.find() method to find the order with the matching orderId
        const order = orderData.find((order) => order.orderId === orderId);
        return order ? [order] : []; // Return an array containing the matching order or an empty array if not found
      }
    return(
        <div>
            <ParentContainer>
                <Breadcrumbs paths={breadcrumbsData} orderId={productId.orderId} showButton={true}/>
            </ParentContainer>
            <OrderStatus order={orderDetails} orderId={orderId}/>
            <TableWithSearch products={orderDetails} orderId={orderId}/>
        </div>
        
    )

}
export default OrderDetails;
