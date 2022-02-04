import { CaretRightOutlined } from "@ant-design/icons";
import { Typography } from "antd";
import {
  Chart as ChartComponent,
  Interval,
  Tooltip,
  Axis,
  Coordinate,
  Interaction,
} from "bizcharts";
import { StyledCard } from "./styleds";

type TProps = {
  data: TChartData[];
  title: string;
  suffix?:
    | {
        plural: string;
        singular: string;
      }
    | string;
};

const { Title } = Typography;

export function Chart({ data, title, suffix = "" }: TProps) {
  return (
    <StyledCard>
      <Title level={5}>{title}</Title>

      <ChartComponent
        autoFit
        height={300}
        data={data}
        scale={{
          percent: { formatter: (val: number) => `${val * 100}%` },
        }}
      >
        <Coordinate type="theta" radius={0.75} />
        <Tooltip>
          {(name, items) => {
            if (!items) return <div />;

            let treatedSuffix = "";

            if (typeof suffix === "string") treatedSuffix = suffix;
            else
              treatedSuffix =
                items[0].data.count > 1 ? suffix.plural : suffix.singular;

            return (
              <div style={{ padding: 4 }}>
                <CaretRightOutlined
                  style={{ color: items[0].color, marginRight: 4 }}
                />
                <span style={{ marginRight: 32 }}>{name}:</span>
                {items[0].value} ({items[0].data.count.toLocaleString()}
                {suffix ? ` ${treatedSuffix}` : ""})
              </div>
            );
          }}
        </Tooltip>
        <Axis visible={false} />
        <Interaction type="element-single-selected" />
        <Interval
          position="percent"
          adjust="stack"
          color="item"
          style={{
            lineWidth: 1,
            stroke: "#fff",
          }}
          label={[
            "count",
            {
              layout: { type: "limit-in-plot", cfg: { action: "ellipsis" } },
              content: ({ item, percent }) => `${item}: ${percent * 100}%`,
            },
          ]}
        />
      </ChartComponent>
    </StyledCard>
  );
}

Chart.defaultProps = {
  suffix: "",
};
