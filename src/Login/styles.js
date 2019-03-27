import styled from "styled-components";
import { Button } from "reactstrap";

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  margin: auto;
`;

const FloatRightButton = styled(Button)`
  float: right;
`;

const LoginPanel = styled.div`
  position: relative;
  padding: 4em 1em 1em;
  border: 1px solid #d8d8d8;
  margin: auto;
  width: 350px;
  ::before {
    position: absolute;
    left: -10px;
    top: -15px;
    padding: 1em;
    color: #aaa;
    font-size: x-large;
    font-weight: 500;
    content: "Login";
  }
`;

export { Wrapper, FloatRightButton, LoginPanel };
