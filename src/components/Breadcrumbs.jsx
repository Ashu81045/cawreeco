import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { updateOrderStatus } from '../redux/dataSlice';
import { useDispatch, useSelector } from 'react-redux';


const BreadcrumbsContainer = styled.div`
  align-items: center;
  gap: 0.5rem;  
  background-color: #fff;
  box-shadow: 0 8px 6px -6px #f0f0f0;
`;

const BreadcrumbItem = styled(Link)`
  color: #333;
  text-decoration: none;
  font-size: 10px;

  &:hover {
    text-decoration: underline;
  }

  &:nth-last-child(2) {
    text-decoration: underline;
  }

`;
const SectionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LeftSection = styled.div`
  flex: 1;
  font-size: 16px;
  font-weight: 700;
`;

const RightSection = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
`;

const Separator = styled.span`
  color: #888;
  font-size:10px
`;
const EllipticalButtonHollow = styled.button`
    width: 70px;
    height: 30px;
    background-color: transparent;
    color: #295329;
    font-weight: bold;
    cursor: pointer;
    border: 1px solid #295329;
    border-radius: 42px;
    font-size: 12px;
    font-weight:500
`;
const EllipticalButtonFilled = styled.button`
    background-color: ${(props) =>
      props.orderStatus
        ? 'grey'
        : 'green'};
    color: white;
    font-weight: bold;
    cursor: pointer;
    border: 1px solid #f0f0f0;
    border-radius: 26px;
    font-size: 12px;
    font-weight:500;
    color: ${(props) =>
      props.orderStatus
        ? 'white'
        : 'white'};
`;


const Breadcrumbs = ({ paths, orderId, showButton }) => {
  const [disabled, setDisabled] = useState(false);
  const dispatch = useDispatch();
  const orderArray = useSelector((state) => state.orders.orders.find((o) => o.orderId === orderId));

  useEffect(() => {
    if(showButton){
      if(orderArray.order_status === "Approved"){
        setDisabled(true);
      }
  }

  },[orderArray?.order_status])

  const handleOrderApprove = () => {
    dispatch(updateOrderStatus({
      orderId:orderId,
      order_status:"Approved"
    }));
  }
  return (
    <BreadcrumbsContainer>
      {paths.map((path, index) => (
        <React.Fragment key={path.to}>
          <BreadcrumbItem to={path.to}>{path.label}</BreadcrumbItem>
          {index < paths.length - 1 && <Separator>{` > `}</Separator>}
        </React.Fragment>
      ))}

      <SectionContainer>
      <LeftSection>
        <p>Orders</p>
      </LeftSection>
      {showButton && <RightSection>
        <BreadcrumbItem to="/orders" >Back</BreadcrumbItem>
        <EllipticalButtonFilled disabled={disabled} orderStatus={disabled} onClick={handleOrderApprove}>{disabled ?'Approved':'Approve order'}</EllipticalButtonFilled>
      </RightSection>}
    </SectionContainer>
    </BreadcrumbsContainer>
  );
};

export default Breadcrumbs;
