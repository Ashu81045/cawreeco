import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Avocado from "../assets/Avocado.jpg"
import { fetchLocalProductData } from '../redux/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../redux/dataSlice';

const Container = styled.div`
  padding: 1rem;
  width: 960px;
  overflow-y:auto
`;

const Title = styled.h2`
  font-size: 16px;
  font-weight: bold;
  border-bottom: 2px solid #ccc;
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 12px;
  color: #666;
  margin-bottom: 1rem;
`;

const SearchBar = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 50%;
  margin-bottom: 1rem;
  font-size: 12px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  text-align: left;
  padding: 0.5rem;
  border-bottom: 1px solid #ccc;
  font-size: 12px;
  font-weight: bold;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

const TableCell = styled.td`
  padding: 0.5rem;
  font-size: 12px;
`;

const ProductImage = styled.img`
  width: 38px;
  height: 22px;
  object-fit: cover;
  margin-right: 0.5rem;
`;

const EditableCell = styled(TableCell)`
  input {
    width: 100%;
    padding: 0.2rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 12px;
  }
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
const CountTotal = styled.span`
    font-size: 12px;
    color:#27006;
`

const AddItem = (props) => {
  const [searchInput, setSearchInput] = useState('');
  const { productData } = useSelector((state) => state.productData);
  const [products, setProducts] = useState(productData);
  const [searchListData, setSearchListData] = useState([]);
  const [updatedProductArr, setUpdatedProductArr] = useState([]);
  const [review, setReview] = useState(false);
  const dispatch = useDispatch();
  const { orderId, onClose } = props;

  useEffect(() => {
        dispatch(fetchLocalProductData())
  },[dispatch]);
  
  const handleSearch = (e) => {
    setSearchInput(e.target.value);
    let filteredProducts =[];
    // Perform the search and filter the products based on the search input
    if(searchInput.length > 2){
     filteredProducts = productData.filter((product) =>
      product.description.toLowerCase().includes(searchInput.toLowerCase())
    );
    }


    // Update the search list data state with the filtered products
    setSearchListData(filteredProducts);
  };
  const handlePriceChange = (id, price) => {
    // Check if the price is a valid number
    if (!isNaN(price)) {
      // Implement the logic to update the price of a product with the given id
      // For example:
      const updatedProducts = products.map((product) =>
        product?.productId === id ? { ...product, price } : product
      );
      // Update the state with the updated products
      setProducts(updatedProducts);
      // Add the updated product to the updatedProductArr
      setUpdatedProductArr((prevArr) => {
        const existingProductIndex = prevArr.findIndex((product) => product.productId === id);
        if (existingProductIndex !== -1) {
          // If the product already exists in the updatedProductArr, update its price
          prevArr[existingProductIndex].price = price;
          return [...prevArr];
        } else {
          // If the product is not already in the updatedProductArr, add it
          const updatedProduct = products.find((product) => product.productId === id);
          return [...prevArr, { ...updatedProduct, price }];
        }
      });
    }
  };

  const handleQuantityChange = (id, quantity) => {
    // Check if the quantity is a valid number
    if (!isNaN(quantity)) {
      // Implement the logic to update the quantity of a product with the given id
      // For example:
      const updatedProducts = products.map((product) => product.productId === id ? { ...product, quantity } : product
      );
      // Update the state with the updated products
      setProducts(updatedProducts);
      // Add the updated product to the updatedProductArr
      setUpdatedProductArr((prevArr) => {
        const existingProductIndex = prevArr.findIndex((product) => product.productId === id);
        if (existingProductIndex !== -1) {
          // If the product already exists in the updatedProductArr, update its quantity
          prevArr[existingProductIndex].quantity = quantity;
          return [...prevArr];
        } else {
          // If the product is not already in the updatedProductArr, add it
          const updatedProduct = products.find((product) => product.productId === id);
          return [...prevArr, { ...updatedProduct, quantity }];
        }
      });
    }
  };

  const handleAddProduct = () => {
    dispatch(addProduct({
        orderId:orderId,
        newProduct: updatedProductArr
    }));
    onClose();
  }

  return (
    <Container>
      <Title>Add Item</Title>
      <Subtitle>Search for products and update their price and quantity:</Subtitle>
      <div style={{display:"flex"}}>
      <SearchBar
        type="text"
        value={searchInput}
        onChange={handleSearch}
        placeholder="Search for products..."
      />
      </div>
      <div style={{minHeight:"200px"}}>
      {searchListData.length > 0 &&
      <Table>
        <thead>
          <tr>
            <TableHeader>Product Image</TableHeader>
            <TableHeader>Product Name</TableHeader>
            <TableHeader>Brand</TableHeader>
            <TableHeader>Packing</TableHeader>
            <TableHeader>Price</TableHeader>
            <TableHeader>Quantity</TableHeader>
          </tr>
        </thead>
        <tbody>
          {searchListData.map((product) => (
            <TableRow key={product.productId}>
              <TableCell>
                <ProductImage src={Avocado} alt={product.name} />
              </TableCell>
              <TableCell>{product.description}</TableCell>
              <TableCell>{product.brand}</TableCell>
              <TableCell>{product.packing}</TableCell>
              <EditableCell>
                <input
                  type="number"
                  value={product.price}
                  onChange={(e) => handlePriceChange(product.productId, e.target.value)}
                  disabled={review}
                />
              </EditableCell>
              <EditableCell>
                <input
                  type="number"
                  onChange={(e) => handleQuantityChange(product.productId, e.target.value)}
                  disabled={review}
                />
              </EditableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
        }
        </div>
        
        <ButtonContainer>
            {review && <HollowButton onClick={onClose}>Cancel</HollowButton>}
            {review ? 
                <FilledButton onClick={handleAddProduct}>Add</FilledButton>
                :
                <FilledButton onClick={()=>{setReview(true)}}>Review</FilledButton>
                }
      </ButtonContainer>
      <CountTotal>Total: {updatedProductArr.length}</CountTotal>
      
    </Container>
  );
};

export default AddItem;
