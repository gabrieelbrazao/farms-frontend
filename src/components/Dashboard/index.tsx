import { useAppSelector } from "@app/hooks";
import { Col, Grid, Row, Space } from "antd";
import { useEffect, useRef, useState } from "react";
import {
  FaTractor,
  FaMapMarkerAlt,
  FaMapMarkedAlt,
  FaLeaf,
} from "react-icons/fa";
import { OSM, Vector as VectorSource } from "ol/source";
import { fromLonLat } from "ol/proj";
import { Map, View } from "ol";
import "ol/ol.css";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import GeoJSON from "ol/format/GeoJSON";
import { Fill, Stroke, Style, Text } from "ol/style";
import { theme } from "@app/theme";
import { DataCard } from "../DataCard";
import { Chart } from "../Chart";

const { useBreakpoint } = Grid;

function getMostFrequent(arr: string[]) {
  type THashMap = {
    [key: string]: number;
  };

  const hashmap = arr.reduce<THashMap>((acc, val) => {
    acc[val] = (acc[val] || 0) + 1;
    return acc;
  }, {});

  return Object.keys(hashmap).reduce((a, b) =>
    hashmap[a] > hashmap[b] ? a : b
  );
}

export function Dashboard() {
  const { data } = useAppSelector((state) => state.farms);
  const [map, setMap] = useState<Map>();
  const mapRef = useRef(null);

  const screens = useBreakpoint();

  const currentBrakePoint =
    Object.entries(screens).find((screen) => !!screen[1])?.[0] ?? "xs";

  // #region STATES
  const dataStates: TChartData[] = [];

  data.forEach((farm) => {
    const index = dataStates.findIndex(({ item }) => item === farm.state.name);

    if (index === -1) {
      dataStates.push({
        item: farm.state.name,
        count: 1,
        percent: 0,
      });
    } else {
      dataStates[index].count += 1;
    }
  });

  dataStates.forEach((item) => {
    item.percent = Math.round((item.count / data.length) * 1e2) / 1e2;
  });
  // #endregion

  // #region AREAS
  const totalVegetationArea = data.reduce(
    (acc, val) => acc + val.vegetationArea,
    0
  );

  const totalAgriculturalArea = data.reduce(
    (acc, val) => acc + val.agriculturalArea,
    0
  );

  const sumTotalArea = data.reduce((acc, val) => acc + val.totalArea, 0);

  const dataAreas: TChartData[] =
    data.length > 0
      ? [
          {
            item: "Área de vegetação",
            count: totalVegetationArea,
            percent:
              Math.round((totalVegetationArea / sumTotalArea) * 1e2) / 1e2,
          },
          {
            item: "Área agricultável",
            count: totalAgriculturalArea,
            percent:
              Math.round((totalAgriculturalArea / sumTotalArea) * 1e2) / 1e2,
          },
        ]
      : [];
  // #endregion

  // #region CULTURES
  const dataCultures: TChartData[] = [];
  let culturesLen = 0;

  data.forEach((farm) => {
    const cultures = farm.cultures.map((culture) => culture.name);

    culturesLen += cultures.length;

    cultures.forEach((culture) => {
      const index = dataCultures.findIndex(({ item }) => item === culture);

      if (index === -1) {
        dataCultures.push({
          item: culture,
          count: 1,
          percent: 0,
        });
      } else {
        dataCultures[index].count += 1;
      }
    });
  });

  dataCultures.forEach((item) => {
    item.percent = Math.round((item.count / culturesLen) * 1e2) / 1e2;
  });
  // #endregion

  useEffect(() => {
    const initialMap = new Map({
      target: mapRef.current || undefined,
      view: new View({
        center: fromLonLat([-51.9253, -14.235]),
        zoom: 4,
      }),
      controls: [],
    });

    setMap(initialMap);
  }, []);

  useEffect(() => {
    if (!data.length || !map) return;

    map.setLayers([
      new TileLayer({
        source: new OSM({
          url: "https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        }),
      }),
      new VectorLayer({
        source: new VectorSource({
          url: "https://raw.githubusercontent.com/codeforgermany/click_that_hood/main/public/data/brazil-states.geojson",
          format: new GeoJSON(),
        }),
        style: (feature) => {
          const style = new Style({
            text: new Text({
              scale: 1.2,
            }),
            fill: new Fill({
              color: "rgba(255, 255, 255, 0.6)",
            }),
            stroke: new Stroke({
              color: theme.primaryColor,
            }),
          });

          const name = feature.get("name");

          const count = data
            .filter(({ state }) => state.name === name)
            .reduce((acc, val) => acc + val.totalArea, 0);

          if (count === 0) return new Style();

          style.getText().setText(`${count.toLocaleString()} ha`);

          return style;
        },
      }),
    ]);
  }, [data]);

  return (
    <Space
      direction="vertical"
      size={16}
      style={{
        padding: currentBrakePoint === "xs" ? "32px 12px" : 32,
      }}
    >
      <Row gutter={[currentBrakePoint !== "xs" ? 16 : 0, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <DataCard
            color="#ff7a45"
            icon={FaTractor}
            title="Total de fazendas"
            value={data.length}
          />
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <DataCard
            color="#ff4d4f"
            icon={FaMapMarkedAlt}
            title="Principal estado"
            value={
              data.length
                ? getMostFrequent(data.map((item) => item.state.name))
                : "Nenhum registro"
            }
          />
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <DataCard
            color="#73d13d"
            icon={FaLeaf}
            title="Principal cultura"
            value={
              data.length
                ? getMostFrequent(
                    data.map((item) =>
                      getMostFrequent(item.cultures.map(({ name }) => name))
                    )
                  )
                : "Nenhum registro"
            }
          />
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <DataCard
            color="#40a9ff"
            icon={FaMapMarkerAlt}
            title="Total de hectares"
            value={data.reduce((acc, val) => acc + val.totalArea, 0)}
          />
        </Col>
      </Row>

      <Row gutter={[currentBrakePoint !== "xs" ? 16 : 0, 16]}>
        <Col xs={24} lg={8}>
          <Chart
            data={dataStates}
            title="Estados"
            suffix={{
              plural: "fazendas",
              singular: "fazenda",
            }}
          />
        </Col>

        <Col xs={24} lg={8}>
          <Chart
            data={dataCultures}
            title="Culturas"
            suffix={{
              plural: "fazendas",
              singular: "fazenda",
            }}
          />
        </Col>

        <Col xs={24} lg={8}>
          <Chart data={dataAreas} title="Uso de solo" suffix="ha" />
        </Col>
      </Row>

      <div
        ref={mapRef}
        id="map-container"
        style={{ height: 500, width: "100%" }}
      />
    </Space>
  );
}
