import React from "react";
import styled from 'styled-components';
import { useSelector } from 'react-redux';

const Container = styled.div`
    margin: 1rem 5rem;
    border: 1px solid #d4d2d2;
    border-radius: 8px;
    box-shadow: 0 8px 6px -6px #f0f0f0;

`;
const SectionContainer = styled.div`
    display: flex;
    align-items: flex-start;
    padding:1rem;
    justify-content: space-between; 

`;
const Subsection = styled.div`
    flex: 1;
    font-size: 12px;
    

`;
const HeadingText = styled.p`
    font-size: 12px;
    font-weight: 400;
    color: grey
`;
const Description = styled.span`
    font-size: 14px;
    font-weight: bold;
    color: grey
`;
const DescriptionStatus = styled.span`
    font-size: 14px;
    font-weight: bold;
    color:${(props) =>
        props?.order_status?.includes('Approved')
          ? 'green'
          : 'grey'}
`;

const VerticalLine = styled.div`
    height: 100%;
    width: 1px;
    background-color: #ccc;
    margin-left: 16px; /* Adjust the margin as needed */
`;

const OrderStatus = (props) => {
    const { orderId } = props;
    const order = useSelector((state) => state.orders.orders.find((o) => o.orderId === orderId));
    const calculateTotalPrice = (order) => {
        const totalPrice = order.product.reduce((total, product) => total + product.price, 0);
        const totalQuantity = order.product.reduce((total, product) => total + product.quantity, 0)
        return { totalPrice, totalQuantity };
      };
    const {totalPrice, totalQuantity} = calculateTotalPrice(order);
    const { supplier, shippingDate, department, order_status } = order;
    return(
        <Container>
            <SectionContainer>
                <div>
                    <Subsection>
                        <HeadingText>Supplier</HeadingText>
                        <Description>{supplier}</Description>
                    </Subsection>
                </div>
                <VerticalLine/>
                <div>
                    <Subsection>
                        <HeadingText>Shipping date</HeadingText>
                        <Description>{shippingDate}</Description>
                    </Subsection>
                </div>
                <VerticalLine/>
                <div>
                    <Subsection>
                        <HeadingText>Total</HeadingText>
                        <Description>{(totalPrice * totalQuantity).toLocaleString('en-US', {
                            style: 'currency',
                            currency: 'USD',
                            }
                        )}</Description>
                    </Subsection>
                </div>
                <VerticalLine/>
                <div>
                    <Subsection>
                        <HeadingText>Category</HeadingText>
                        <Description>xxxx</Description>
                    </Subsection>
                </div>
                <VerticalLine/>
                <div>
                    <Subsection>
                        <HeadingText>Department</HeadingText>
                        <Description>{department}</Description>
                    </Subsection>
                </div>
                <VerticalLine/>
                <div>
                    <Subsection>
                        <HeadingText>Status</HeadingText>
                        <DescriptionStatus order_status={order_status} >{order_status}</DescriptionStatus>
                    </Subsection>
                </div>
            </SectionContainer>
        </Container>
    )
}
export default OrderStatus;