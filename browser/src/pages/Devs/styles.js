import styled, { keyframes } from "styled-components";

const rotate = keyframes`
  from{
  transform: rotate(0deg)
  }
  to{
    transform: rotate(360deg)
  }
`;

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;

  svg {
    margin: 30px 0 30px;
  }
`;

export const Spinner = styled.span`
  svg {
    animation: ${rotate} 0.7s infinite;
  }
`;

export const List = styled.ul`
  width: 100%;
  height: auto;
  align-self: flex-start;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  list-style: none;
  padding: 20px;

  li {
    min-height: 200px;
    height: auto;
    background: #fff;
    box-shadow: 0 0 12 rgba(0, 0, 0, 0.2);
    border: none;
    border-radius: 4px;
    padding: 20px;
    transition: border 0.2s;

    p {
      color: #666;
      font-size: 14px;
      line-height: 20px;
      margin: 10px 0;
    }

    a {
      display: inline-block;
      color: #8e4dff;
      font-size: 14px;
      text-decoration: none;

      &:hover {
        color: #5a2ea6;
      }
    }

    a + a {
      margin-left: 10px;
      cursor: pointer;
    }

    &:hover {
      transition: border 0.2s;
      border: 1px solid #7159c1;
    }
  }
`;

export const UserInfo = styled.div`
  margin-left: 10px;

  strong {
    display: block;
    font-size: 16px;
    text-align: left;
    color: #333;
  }

  span {
    font-size: 13px;
    color: #999;
    margin-top: 2px;
  }
`;

export const Header = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;

  img {
    width: 45px;
    height: 45px;
    border-radius: 50%;
  }
`;
