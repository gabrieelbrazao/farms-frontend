import { Card, Space } from "antd";
import styled, { keyframes } from "styled-components";
import { zoomIn } from "react-animations";
import { CaretRightOutlined } from "@ant-design/icons";

const bounceAnimation = keyframes`${zoomIn}`;

export const StyledCard = styled(Card)`
  border-radius: 5px;
  animation: 1s ${bounceAnimation};
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
`;

export const StyledTooltip = styled(Space)`
  padding: 12px 4px;
`;

export const StyledTooltipIcon = styled(CaretRightOutlined)`
  color: ${(props) => props.color};
`;
