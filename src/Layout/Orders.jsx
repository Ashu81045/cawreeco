import React, { useEffect } from 'react';
import Breadcrumbs from '../components/Breadcrumbs';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLocalData } from '../redux/dataSlice';
import OrderCard from '../components/OrderCard';

const ParentContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 16px;
  
`;
const LayoutContainer = styled.div`
    margin: 1rem 6rem;
`


const OrdersPage = () => {

    const dispatch = useDispatch();
    const { orders } = useSelector((state) => state.orders);

    useEffect(() => {
        if(orders.length === 0){
            dispatch(fetchLocalData());
        }
      }, [orders,dispatch]);

    const breadcrumbsData = [
        { label: 'Home', to: '/' },
        { label: 'Orders', to: '/orders' }, // Replace this with the actual path of your products page
    ];

  return (
    <LayoutContainer>
      <Breadcrumbs paths={breadcrumbsData} showButton={false} />
      <ParentContainer>
        {orders.map((orderData) =>(
            <OrderCard 
                orderId={orderData.orderId}
                numberOfProducts={orderData.product.length}
                supplier={orderData.supplier}
                shippingDate={orderData.shippingDate}
                key={orderData.orderId}
            />
        ))}
      </ParentContainer>
      {/* Rest of your products page content */}
    </LayoutContainer>
  );
};

export default OrdersPage;
