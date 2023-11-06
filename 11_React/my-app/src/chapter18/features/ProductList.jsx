import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToProductList } from './productSlice';

function ProductList(props) {

  const productname = useSelector(state => state.product.productList);
  // { 위 코드 리펙터링 productSlice.js에서 state => state.product.productList를 exprot한 후 가져오기 }
  // const productname = useSelector(selectProductList);

  const dispatch = useDispatch();

  const [productes, setProductes] = useState('');

  // { button onClick 함수 선언 }
  const handleAddProduct = () => {
    dispatch(addToProductList(productes));
    setProductes(''); // { input 값 입력 후 초기화 }
  }

  return (
    <>
      <p>
        상품 추가:
        <input 
          type="text"
          value={productes}
          onChange={e => setProductes(e.target.value)}
          // { 엔터키 누르면 입력 되게 }
          onKeyUp={(e) => { 
            if (e.key === 'Enter') {
              handleAddProduct();   
            }
          }}
        />
        <button 
          type='button'
          // { button onClick 함수 적용 }
          // onClick={handleAddProduct}
          onClick={() => dispatch(addToProductList(productes))}
        >
          추가  
        </button>  
      </p> 
      <p>상품 목록</p>
      <ul>
        {productname.map((product, index) =><li key={index}>{product}</li> )}
      </ul>
    </>
  );
}

export default ProductList;