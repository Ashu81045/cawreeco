import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background-color: #fff;
  border-radius: 8px;
  padding: 16px;
`;

const Title = styled.h2`
  font-size: 18px;
  margin: 0 0 8px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const BodyText = styled.p`
  font-size: 14px;
  margin: 0 0 16px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Button = styled.button`
  margin-left: 8px;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const EllipsisCard = ({ title, bodyText, handleYes, handleNo ,productId}) => {
    return (
        <Container>
        <Title>{title}</Title>
        <BodyText>{bodyText}</BodyText>
        <ButtonsContainer>
            <Button onClick={()=>handleYes(productId)} primary>Yes</Button>
            <Button onClick={()=>handleNo(productId)}>No</Button>
        </ButtonsContainer>
        </Container>
    );
};

export default EllipsisCard;
