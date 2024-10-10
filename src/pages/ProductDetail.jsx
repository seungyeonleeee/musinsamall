import React, { useState, useEffect } from "react";
// 46
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Container, Row, Col, Dropdown, Button } from "react-bootstrap";

const Img = styled.img`
  width: 100%;
  border-radius: 10px;
`;
const ProductDesc = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  font-size: 22px;
  padding: 10px;
`;
const ProductTitle = styled.div`
  font-weight: 600;
`;
const ProductPrice = styled.div`
  font-size: 18px;
`;
const ProductChoice = styled.div``;

const ProductDetail = () => {
  // 50
  const [product, setProduct] = useState(null);

  // 47 파라미터 값 가져오기
  const { id } = useParams();
  // console.log(id);

  // 49
  const getProductDetail = async () => {
    const url = `http://localhost:3000/products/${id}`;
    const response = await fetch(url);
    const data = await response.json();
    // console.log(data);

    // 51
    setProduct(data);
  };

  const formattedPrice = new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "KRW",
  }).format(product?.price);

  // 48
  useEffect(() => {
    getProductDetail();
  }, []);

  return (
    // 52 product값 넣기
    <Container>
      <Row>
        <Col>
          <Img src={product && product?.img} alt={product && product?.id} />
        </Col>
        <Col>
          <ProductDesc>
            <ProductTitle>상품명 : {product && product?.title}</ProductTitle>
            <ProductPrice>{product && formattedPrice}</ProductPrice>
            <ProductChoice>
              {product && product?.choice ? "Conscious Choice" : ""}
            </ProductChoice>

            <Dropdown>
              <Dropdown.Toggle variant="outline-dark" id="dropdown-basic">
                사이즈 선택
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {product &&
                  product?.size.length > 0 &&
                  product?.size.map((item, index) => (
                    <Dropdown.Item href="#/action-1" key={index}>
                      {item}
                    </Dropdown.Item>
                  ))}
              </Dropdown.Menu>
            </Dropdown>
            <Button variant="danger">상품결제</Button>
            <Button variant="dark">장바구니</Button>
          </ProductDesc>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetail;
