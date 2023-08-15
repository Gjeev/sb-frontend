import "../css/grid.css";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { UPDATE_CART } from "../constants";
import Tooltip from "@mui/material/Tooltip";
import GridOnIcon from "@mui/icons-material/GridOn";

export default function Grid({ map, setLayerLoad, setShowModal }) {
  const [localGridId, setLocalGridId] = useState([]);
  const [border, setBorder] = useState(false);

  useEffect(() => {
    const cartData = localStorage.getItem("persist:root");
    if (cartData) { // react throws error when we parse empty or undefined data
      const parsedCartData = JSON.parse(JSON.parse(cartData).cart);
      if (parsedCartData && parsedCartData.items) {
        setLocalGridId(parsedCartData.items);
      }
    }
  }, []);

  const dispatch = useDispatch();

  //controls adding & removing of india layer
  const handleIndiaLayerClick = () => {
    if (!border) {
      addIndiaLayer();
      setLayerLoad(true);
      setBorder(true);
    } else if (border) {
      map.removeLayer("india-layer");
      map.removeLayer("state-borders");
      map.removeSource("india");
      setShowModal(true);
      setBorder(false);
    }
  };

  function handleAdd(data) {
    setLocalGridId((prevState) => {
      if (prevState.some((feature) => feature.properties.id === data.properties.id)) {
        return prevState.filter((feature) => feature.properties.id !== data.properties.id);
      } else {
        return [...prevState, data];
      }
    });
  }

  function addIndiaLayer() {
    map.addSource("india", {
      type: "geojson",
      data: "https://gjeev.github.io/layers/india.json",
      promoteId: {
        STATE: "id",
      },
      generateId: true,
      attribution: "© OpenStreetMap contributors",
    });

    map.addLayer({
      id: "india-layer",
      type: "fill",
      source: "india",
      paint: {
        "fill-color": "#627BC1",
        "fill-opacity": [
          "case",
          ["boolean", ["feature-state", "hover"], false],
          1,
          0.5,
        ],
      },
    });
    map.addLayer({
      id: "state-borders",
      type: "line",
      source: "india",
      layout: {},
      paint: {
        "line-color": "#627BC1",
        "line-width": 2,
      },
    });
    map.on("click", "india-layer", (e) => {
      if (e.features.length > 0) {
        console.log("clicked")
        let clickedStateId = e.features[0].id;
        let clickedGridData = e.features[0];
        let hoverState = map.getFeatureState(
          { source: "india", id: clickedStateId },
          { hover: true }
        ) || { hover: false };
        map.setFeatureState(
          { source: "india", id: clickedStateId },
          { hover: !hoverState.hover }
        );
        handleAdd(clickedGridData);
      }
    });

    map.setFeatureState({ source: "india", id: "*" }, { hover: false });

    //we will check if map has finished rendering the source on the map
    //using the idle event because even if the source is loaded
    //it takes more time to render it on the map.

    map.on("idle", () => {
      if (map.getSource("india") && map.isSourceLoaded("india")) {
        setLayerLoad(false);
        setShowModal(false);
      }
    });
  }

  useEffect(() => {
    dispatch({ type: UPDATE_CART, payload: localGridId });
  }, [localGridId]);

  return (
    <Tooltip title="select grid">
      <div
        className={border ? "tool-selected" : "tool"}
        onClick={handleIndiaLayerClick}
      >
        <GridOnIcon
          sx={{
            padding: "0.15em",
          }}
        />
      </div>
    </Tooltip>
  );
}
