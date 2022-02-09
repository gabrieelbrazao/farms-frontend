import { Card } from "antd";
import styled, { keyframes } from "styled-components";
import { zoomIn } from "react-animations";

const zoomInAnimation = keyframes`${zoomIn}`;

export const StyledCard = styled(Card)`
  border-radius: 5px;
  animation: 1s ${zoomInAnimation};
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  height: 100%;
  width: 100%;
`;
