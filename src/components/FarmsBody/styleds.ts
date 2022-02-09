import { Space } from "antd";
import styled, { keyframes } from "styled-components";
import { fadeIn } from "react-animations";

const fadeInAnimation = keyframes`${fadeIn}`;

export const Container = styled(Space)`
  animation: 1s ${fadeInAnimation};
`;
