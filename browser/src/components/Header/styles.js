import styled from "styled-components";

export const Container = styled.header`
  width: 100%;
  height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  z-index: 10;
  padding: 5px;
`;

export const GroupButton = styled.div`
  width: 300px;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  button {
    width: 100%;
    height: 100%;
    background: #fff;
    border-top-left-radius: 25px;
    border-bottom-left-radius: 25px;
    cursor: pointer;
    font-size: 14px;
    font-weight: bold;
    color: #acacac;
    transition: color 0.2s;

    &:hover {
      transition: color 0.2s;
      color: #666;
    }
  }

  button + button {
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;

    border-top-right-radius: 25px;
    border-bottom-right-radius: 25px;

    margin-left: 1px;
  }
`;
