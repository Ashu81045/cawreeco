import React, { useState }from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrint, faCheck, faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';
import Avocado from "../assets/Avocado.jpg";
import CustomModal from './CustomModal';
import EllipsisCard from './EllipsisCard';
import { updateProductStatus, updateQuantityAndPriceWithReason } from '../redux/dataSlice';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from './ProductCard';
import AddItem from './AddItem';


const TableContainer = styled.div`
    padding: 2rem;
    border: 1px solid #dadada;
    margin: 0 5rem;
    border-radius: 8px;
`;

const TopSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const SearchBar = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 40px;
  width: 40%;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
`;

const Button = styled.button`
  margin-right: 1rem;
  padding: 0.5rem 1rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  text-align: left;
  padding: 0.5rem;
  border-bottom: 1px solid #ccc;
  font-size: 14px;
  font-weight:400;
`;

const TableRow = styled.tr`
    border-bottom: 1px solid #ccc9c9;
    &:nth-child(even) {
        background-color: #fff;
    }
`;

const TableCell = styled.td`
  padding: 0.5rem;
  width: 10%;
  font-size: 12px;
`;

const ProductCell = styled.td`
  padding: 0.5rem;
  width: 30%;
  word-break: break-word; /* Enable text wrapping */
  font-size: 12px;
`;

const ProductImage = styled.img`
  width: 40px;
  height: 40px;
  object-fit: cover;
  margin-right: 0.5rem;
`;

const StatusCell = styled.td`
  padding: 0.5rem;
  float: left;
  font-size: 12px;

  /* Apply the color based on the status value */
  color: ${(props) =>
    props?.status?.includes('Missing - Urgent')
      ? 'red'
      : props?.status?.includes('Missing')
      ? 'orange'
      : 'green'};
`;
const EllipticalButtonHollow = styled.button`
    width: 102px;
    height: 30px;
    background-color: transparent;
    color: #295329;
    font-weight: bold;
    cursor: pointer;
    border: 1px solid #295329;
    border-radius: 42px;
    font-size: 12px;
    font-weight: 500;
    margin-right: 1rem;
`;
const StatusInnerCell = styled.div`
    display: flex;
    align-items: center;
    width: 200px;
    justify-content: space-between;

`
const Width60Div = styled.div`
  width:60%
`

const StatusChip = styled.div`
  padding: 4px 8px;
  border-radius: 16px;
  font-size: 10px;
  color: #fff;
  text-align: center;
  font-weight: 300;
  width: fit-content;

  /* Set background color based on the status value */
  background-color: ${(props) =>
    props?.status?.includes('Missing - Urgent')
      ? 'red'
      : props?.status?.includes('Missing')
      ? 'orange'
      :props?.status?.length?'green'
      : 'transparent'};
`;

const TableBody = (props) => {
    const { orderId } = props;
    const { productId,description, brand, price, quantity, status } = props.product;
    const [modalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState('');
    const dispatch = useDispatch();
    const handleOpenModal = () => {
        setModalOpen(true);
    };
    const handleYesStatus = (product_id) => {
        dispatch(updateProductStatus({
            orderId:orderId,
            productId: product_id, 
            status: "Missing - Urgent"
        }));
        setModalOpen(false);
    }
    const handleNoStatus = (product_id) => {
        dispatch(updateProductStatus(   {
            orderId:orderId,
            productId: product_id, 
            status: "Missing"
        }));
        setModalOpen(false);
    }

    const handleCloseModal = () => {
        setModalOpen(false);
        setModalType('');
    };
    const handleApprove = (product_id) =>{
        dispatch( updateProductStatus({
            orderId:orderId,
            productId: product_id, 
            status: "Approve"
        }))
    }
    const handleUpdateQuantityAndPrice = (quantity, price, status, product_id) => {
        dispatch(updateQuantityAndPriceWithReason({
            orderId:orderId,
            productId:product_id,
            price:price,
            quantity:quantity,
            status:status
        }));
        handleCloseModal()

    }
    const handleEdit = (type) => {
        setModalType(type);
        handleOpenModal();
    }
   
    return(
        <TableRow>
            <TableCell>
                <ProductImage src={Avocado} alt="Product 1" />
            </TableCell>
            <ProductCell>
              {description}
            </ProductCell>
            <TableCell>{brand}</TableCell>
            <TableCell>${price}</TableCell>
            <TableCell>{quantity}</TableCell>
            <TableCell>${price * quantity}</TableCell>
            <StatusCell>
                <StatusInnerCell>
                    <Width60Div>
                        <StatusChip status={status}>
                            <span>{status}</span>
                        </StatusChip>
                    </Width60Div>
                    <div >
                        <FontAwesomeIcon icon={faCheck} color="green" onClick={() => handleApprove(productId)} />
                        <FontAwesomeIcon icon={faTimes} color="red" onClick={handleOpenModal} />
                        <FontAwesomeIcon icon={faEdit} onClick={()=>handleEdit('edit')}  />
                    </div>
                </StatusInnerCell>
            </StatusCell>
            <CustomModal open={modalOpen} onClose={handleCloseModal}>
                {modalType !== 'edit'?(<EllipsisCard
                    title="Missing product"
                    bodyText={`Is ${description?.substring(0,25)}... urgent?`}
                    productId={productId}
                    handleYes={handleYesStatus}
                    handleNo = {handleNoStatus}
                    {...props}
                />):(
                    <ProductCard {...props} orderId = { orderId } productId={productId} handler={handleUpdateQuantityAndPrice} />)
                }
            </CustomModal>
          </TableRow>
    )
}


const TableWithSearch = (props) => {
    const [modalOpen, setModalOpen] = useState(false);
    const { orderId } = props;
    const productsArray = useSelector((state) => state.orders.orders.find((o) => o.orderId === orderId));
    const handleCloseModal = () => {
        setModalOpen(false)
    }
    const handleOpenModal = () => {
        setModalOpen(true);
    };
    
  return (
    <TableContainer>
      <TopSection>
        <SearchBar type="text" placeholder="Search..." />
        <RightSection>
        <EllipticalButtonHollow onClick={handleOpenModal}>Add item</EllipticalButtonHollow>
          <FontAwesomeIcon icon={faPrint} size="lg" />
        </RightSection>
      </TopSection>
      <Table>
        <thead>
          <tr>
            <TableHeader></TableHeader>
            <TableHeader>Product Name</TableHeader>
            <TableHeader>Brand</TableHeader>
            <TableHeader>Price</TableHeader>
            <TableHeader>Quantity</TableHeader>
            <TableHeader>Total</TableHeader>
            <TableHeader>Status</TableHeader>
          </tr>
        </thead>
        <tbody>
        {productsArray?.product?.map((prod)=>(
            <TableBody
                product={prod}
                orderId={orderId}
            />
        ))}
         
        </tbody>
      </Table>
      <CustomModal open={modalOpen} onClose={handleCloseModal}>
        <AddItem orderId={orderId} onClose={handleCloseModal} />
      </CustomModal>
    </TableContainer>
  );
};

export default TableWithSearch;
