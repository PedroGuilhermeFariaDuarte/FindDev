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

export const FormContainer = styled.div`
  width: 300px;
  min-height: 400px;
  height: auto;
  border-radius: 4px;
  background: #fff;
  box-shadow: 0 0 14px rgba(0, 0, 0, 0.1);
  padding: 30px;
  display: flex;
  flex-direction: column;

  svg {
    align-self: center;
  }

  form {
    margin-top: 30px;

    label {
      color: #acacac;
      font-size: 12px;
      display: block;
    }

    input {
      width: 100%;
      height: 32px;
      font-size: 12px;
      color: #666;
      padding: 2px;
      border-bottom: 1px solid #eee;
    }

    span {
      font-size: 10px;
      color: #7d40e7;
      margin-left: 5px;
      margin-top: 5px;
      cursor: default;
    }

    input + div {
      margin-top: 20px;
    }
  }

  p {
    font-size: 9px;
    color: #acacac;
    margin-top: 20px;
    text-align: center;
    cursor: default;
  }
`;
export const Button = styled.button.attrs(props => ({
  type: "Submit",
  title: props.loading ? "Salvando..." : "Salvar",
  disabled: props.loading
}))`
  width: 100%;
  margin-top: 15px;
  background: #7d40e7;
  border-radius: 4px;
  padding: 13px 20px;
  color: #ffff;
  cursor: pointer;
  transition: background 0.2s;

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    transition: background 0.2s;
    background: ${darken(0.1, "#7d40e7")};
  }

  svg {
    animation: ${rotate} 0.7s linear infinite;
  }

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;
export const TagsContainer = styled.div`
  width: 100%;
  height: auto;

  ul {
    width: 100%;
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
export const LocationContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 30px;

  strong {
    font-size: 12px;
  }

  label {
    margin-top: 0;
  }

  div {
    width: 100%;

    input + label {
      margin-top: 0px;
    }

    input {
      width: 90%;
    }
  }
`;
