import "../css/grid.css";
import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { UPDATE_CART } from "../constants";

export default function Grid({
  map,
  setLayerLoad,
  showModal,
  setShowModal
}) {
  const [localGridId, setLocalGridId] = useState([]);

  useEffect(() => {
    const cartData = localStorage.getItem("persist:root");
    if (cartData) {
      const parsedCartData = JSON.parse(JSON.parse(cartData).cart);
      if (parsedCartData && parsedCartData.items) {
        setLocalGridId(parsedCartData.items);
      }
    }
  }, []);

  const dispatch = useDispatch();

  //controls adding & removing of india layer
  const handleIndiaLayerClick = () => {
    addIndiaLayer();
    setLayerLoad(true);
  };
  const handleRemoveIndiaLayer = () => {
    map.removeLayer("india-layer");
    map.removeLayer("state-borders");
    map.removeSource("india");

    setShowModal(true);
  };

  function handleAdd(id) {
    setLocalGridId((prevState) => {
      if (prevState.includes(id)) {
        return prevState.filter((item) => item !== id);
      } else {
        return [...prevState, id];
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
        let clickedStateId = e.features[0].id;
        let hoverState = map.getFeatureState(
          { source: "india", id: clickedStateId },
          { hover: true }
        ) || { hover: false };
        map.setFeatureState(
          { source: "india", id: clickedStateId },
          { hover: !hoverState.hover }
        );
        handleAdd(clickedStateId);
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
    <div className="button-box">
      {showModal && (
        <>
          Want to get detailed information reports on our layers?
          <br></br>
          Go to your desired location and click on the button.
          <button onClick={handleIndiaLayerClick}>
            Proceed to Grid selection
          </button>
        </>
      )}
      {!showModal && (
        <>
          Click inside a grid to select it. Don't want to select any grid?
          <button onClick={handleRemoveIndiaLayer}>Remove Grid layer</button>
        </>
      )}
    </div>
  );
}
