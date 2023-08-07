import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Avocado from "../assets/Avocado.jpg";
import { useSelector } from 'react-redux';

const CardContainer = styled.div`
  background-color: #fff;
  border-radius: 8px;
  padding: 16px;
`;

const CardHeading = styled.h2`
  font-size: 18px;
  margin-bottom: 8px;
`;

const CardSubHeading = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 16px;
`;

const ColumnContainer = styled.div`
  display: flex;
`;

const ImageContainer = styled.div`
  flex: 1;
  max-width: 150px;
  margin-right: 16px;
`;

const ProductImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 4px;
`;

const InfoContainer = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Label = styled.span`
  font-size: 14px;
  color: #666;
`;

const PriceInput = styled.input`
    padding: 4px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 80px;
    margin-left: 7rem;
`;

const QuantityContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8px;
`;

const QuantityLabel = styled(Label)`
  margin-right: 8px;
`;

const QuantityInput = styled.input`
  margin-right: 8px;
  padding: 4px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 40px;
`;

const QuantityButton = styled.button`
    width: 18px;
    height: 18px;
    background-color: #2fc135;
    color: #fff;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 1rem;
    font-size: 8px;
    margin-left: 8px;
`;

const ReasonContainer = styled.div`
  margin-top: 16px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
`;

const HollowButton = styled.button`
    padding: 8px 16px;
    /* border: 2px solid #4caf50; */
    background-color: transparent;
    color: #027006;
    border-radius: 4px;
    cursor: pointer;
    font-size: 12px;
`;

const FilledButton = styled.button`
    margin-left: 8px;
    padding: 4px 16px;
    background-color: #027006;
    color: #fff;
    border: none;
    border-radius: 16px;
    cursor: pointer;
    font-size: 12px;
`;
const TotalContainer = styled.div`
  margin-top: 8px;
`;

const TotalLabel = styled(Label)`
  margin-right: 8px;
`;
const ReasonChipContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const ReasonChip = styled.div`
    color: #333;
    font-size: 12px;
    padding: 4px 8px;
    border-radius: 16px;
    margin-right: 8px;
    margin-bottom: 8px;
    cursor: pointer;
    border: 1px solid green;
`;
const ReasonLabel = styled.div`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 8px;
`;
const OptionalSpan = styled.span`
    font-size: 12px;
    font-weight: 300;
`;
const PriceContainer = styled.div`
    display:flex
`

const ProductCard = ({ products, ...props }) => {
  const { handler, productId, orderId }= props;
  const order = useSelector((state) => state.orders.orders.find((o) => o.orderId === orderId));
  const product = order.product.find((p) => p.productId === productId);
  const [price, setPrice] = useState(product.price);
  const [quantity, setQuantity] = useState(product.quantity);
  const [selectedReason, setSelectedReason] = useState('');
  

  useEffect(() => {
    reasonUpdatedRef.current = false;
  }, [quantity, price]);
  
  useEffect(() => {
    let updatedReason = "";

    if (quantity !== product.quantity) {
      updatedReason = "Quantity updated";
    }

    if (price !== product.price) {
      if (updatedReason) {
        updatedReason += ", Price updated";
      } else {
        updatedReason = "Price updated";
      }
    }

    setSelectedReason(updatedReason);
  }, [quantity, price, product]);
  

  const handleDecreaseQuantity = () => {
    setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 0));
  };

  const handleIncreaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };
  const reasonUpdatedRef = useRef(false);

  const handleSelectReason = (reason) => {
    let updatedReason = "";

    if (quantity !== product.quantity || price !== product.price) {
      updatedReason = "Price and quantity updated";
    }

    if (reason) {
      if (updatedReason) {
        updatedReason += `, ${reason}`;
      } else {
        updatedReason = reason;
      }
      reasonUpdatedRef.current = true;
    }

    setSelectedReason(updatedReason);
  };


  return (
    <CardContainer>
      <CardHeading>{product.description}</CardHeading>
      <CardSubHeading>{product.brand}</CardSubHeading>
      <ColumnContainer>
        <ImageContainer>
          <ProductImage src={Avocado} alt={product.productName} />
        </ImageContainer>
        <InfoContainer>
            <PriceContainer>
                <Label>Price($)</Label>
                <PriceInput
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
            </PriceContainer>
          <QuantityContainer>
            <QuantityLabel>Quantity</QuantityLabel>
            <div style={{marginLeft:"6rem", display:"flex"}}>
                <QuantityButton onClick={handleDecreaseQuantity}>-</QuantityButton>
                <QuantityInput
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                />
                <QuantityButton onClick={handleIncreaseQuantity}>+</QuantityButton>
            </div>
          </QuantityContainer>
          <TotalContainer>
            <TotalLabel>Total</TotalLabel>
            <span style={{marginLeft:"8rem"}}>
                ${price * quantity}
            </span>
          </TotalContainer>
          <ReasonContainer>
          <ReasonLabel>Choose Reason <OptionalSpan>(optional)</OptionalSpan></ReasonLabel>
          <ReasonChipContainer>
            <ReasonChip onClick={() => handleSelectReason('Missing product')}>Missing product</ReasonChip>
            <ReasonChip onClick={() => handleSelectReason('Quantity is not same')}>Quantity is not same</ReasonChip>
            <ReasonChip onClick={() => handleSelectReason('Price is not same')}>Price is not same</ReasonChip>
            <ReasonChip onClick={() => handleSelectReason('Others')}>Others</ReasonChip>
          </ReasonChipContainer>
        </ReasonContainer>
        </InfoContainer>
      </ColumnContainer>
      <ButtonContainer>
        <HollowButton>Cancel</HollowButton>
        <FilledButton onClick={()=>handler(quantity, price, selectedReason, productId)}>Send</FilledButton>
      </ButtonContainer>
    </CardContainer>
  );
};

export default ProductCard;
