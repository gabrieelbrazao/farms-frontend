import { Col, Row, Statistic } from "antd";
import { IconType } from "react-icons";
import { StyledCard } from "./styleds";

type TProps = {
  color: string;
  icon: IconType;
  title: string;
  value: string | number;
};

export function DataCard({ color, icon: Icon, title, value }: TProps) {
  return (
    <StyledCard>
      <Row align="middle" gutter={16}>
        <Col>
          <Icon size="4em" color={color} />
        </Col>

        <Col>
          <Statistic
            title={title}
            value={value}
            decimalSeparator=","
            groupSeparator="."
            valueStyle={{ color }}
          />
        </Col>
      </Row>
    </StyledCard>
  );
}
