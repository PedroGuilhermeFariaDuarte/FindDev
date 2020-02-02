import styled, { keyframes } from "styled-components";
import { darken, lighten } from "polished";

const rotate = keyframes`
  from{
  transform: rotate(0deg)
  }
  to{
    transform: rotate(360deg)
  }
`;

export const Spinner = styled.span`
  svg {
    animation: ${rotate} 0.7s infinite;
  }
`;

export const TagsContainer = styled.div`
  width: auto;
  height: auto;
  margin: auto;
  transition: all 0.2s;
  ul {
    width: auto;
    min-height: 30px;
    padding: 5px;

    display: flex;
    justify-content: start;
    align-items: center;

    margin-top: 10px;
    margin-bottom: 10px;

    border-radius: 4px;
    border: 1px solid #eee;

    overflow-x: auto;
    transition: height 0.2s;

    li {
      list-style: none;
      min-width: 50px;
      height: 100%;
      overflow: hidden;

      border-radius: 4px;
      padding: 5px;
      background: #7d40e7;

      font-size: 10px;
      color: #fff;
      cursor: pointer;
      box-shadow: 0 0 14px rgba(0, 0, 0, 0.1);
      transition: background 0.2s;

      display: flex;
      justify-content: center;
      align-items: center;

      &:hover {
        transition: background 0.2s;
        background: ${lighten(0.2, "#7d40e7")};
      }
    }

    li + li {
      margin-left: 10px;
    }
  }
`;

export const ProfileContainer = styled.div`
  width: 600px;
  min-height: 300px;
  height: auto;
  background: #fff;
  border-radius: 4px;
`;

export const UserInfo = styled.div`
  width: 100%;
  height: 300px;
  background: rgba(233, 233, 233, 0.3);
  padding: 30px;
  border-bottom: 1px solid #f5f5f5;
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;

  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: #f5f5f5;
  }

  button {
    min-width: 100px;
    width: auto;
    height: 30px;
    padding: 5px 5px 5px;
    align-items: center;
    font-size: 10px;
    color: #666;
    border: 1px solid #7d40e7;
    border-radius: 50px;
    margin-top: 20px;
    transition: background 0.1s;
    background: none;
    cursor: pointer;

    &:hover {
      transition: border 0.2s;
      border: 1px solid ${darken(0.2, "#7d40e7")};
      background: ${darken(0.2, "#7d40e7")};
      color: #f5f5f5;
    }
  }
`;

export const Info = styled.div`
  width: 50%;
  height: auto;
  padding: 10px;
  margin-top: 15px;
  border-radius: 4px;
  /* border: 1px solid #ccc; */

  strong {
    display: block;
    font-size: 13px;
    font-weight: bold;
    color: #666;
    text-align: center;
  }

  strong + strong {
    font-size: 10px;
    color: #7d40e7;
    font-weight: normal;
  }
`;

export const StatesContainer = styled.div`
  width: 50%;
  height: 30px;
  border: 1px solid #dddddd;
  border-radius: 50px;
  margin: 10px auto;
  color: #666;
  padding: 15px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  strong {
    font-size: 8px;
    cursor: pointer;

    &:hover {
      color: #7d40e7;
    }
  }
`;
