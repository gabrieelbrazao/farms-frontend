import { Card } from "antd";
import styled, { keyframes } from "styled-components";
import { fadeInDown } from "react-animations";

const bounceAnimation = keyframes`${fadeInDown}`;

export const StyledCard = styled(Card)`
  border-radius: 5px;
  animation: 1s ${bounceAnimation};
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

  transition: all 0.2s ease;
  :hover {
    transform: scale(1.05);
  }
`;
