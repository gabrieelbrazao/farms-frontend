import { Typography } from "antd";
import {
  Chart as ChartComponent,
  Interval,
  Tooltip,
  Axis,
  Coordinate,
  Interaction,
} from "bizcharts";
import { StyledCard, StyledTooltip, StyledTooltipIcon } from "./styleds";

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
        height={250}
        data={data}
        scale={{
          percent: { formatter: (val: number) => `${(val * 100).toFixed(0)}%` },
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
              <StyledTooltip>
                <StyledTooltipIcon color={items[0].color} />

                <b>{name}:</b>

                <span>{items[0].value}</span>

                <span>
                  ({items[0].data.count.toLocaleString()}
                  {suffix ? ` ${treatedSuffix}` : ""})
                </span>
              </StyledTooltip>
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
              content: ({ item, percent }) =>
                `${item}: ${(percent * 100).toFixed(0)}%`,
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
