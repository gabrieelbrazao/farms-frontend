import { useAppSelector } from "@app/hooks";
import { theme } from "@app/theme";
import { Map, View } from "ol";
import GeoJSON from "ol/format/GeoJSON";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import { fromLonLat } from "ol/proj";
import { OSM } from "ol/source";
import VectorSource from "ol/source/Vector";
import { Style, Fill, Stroke, Text } from "ol/style";
import { useEffect, useRef, useState } from "react";
import "ol/ol.css";

export function MapWrapper() {
  const [map, setMap] = useState<Map>();
  const mapRef = useRef(null);

  const { data } = useAppSelector((state) => state.farms);

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
              color: "rgba(255, 255, 255, 0.8)",
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
  }, [data, map]);

  return (
    <div
      ref={mapRef}
      id="map-container"
      style={{
        height: "calc(100% - 32px)",
        minHeight: "400px",
        width: "100%",
      }}
    />
  );
}
