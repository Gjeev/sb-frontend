import "../css/grid.css";
import { useState, useEffect } from "react";
export default function Grid({
  map,
  setLayerLoad,
  showModal,
  setShowModal,
  onGridIdChange,
}) {
  const [localGridId, setLocalGridId] = useState([]);

  //alerts the user about the zooming in for optimised loading times
  const [zoomAlert, setZoomAlert] = useState(false);
  const handleZoomAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setZoomAlert(false);
  };

  //controls adding & removing of india layer
  const handleIndiaLayerClick = () => {
    addIndiaLayer();
    setLayerLoad(true);
  };
  const handleRemoveIndiaLayer = () => {
    map.removeLayer("india-layer");
    map.removeSource("india");
    setShowModal(true);
  };

  function addIndiaLayer() {
    if (map.getZoom() < 12) {
      setZoomAlert(true);
      map.flyTo({ zoom: 14 });
    }
    map.addSource("india", {
      type: "geojson",
      // Use a URL for the value for the `data` property.
      data: "https://gjeev.github.io/layers/india.json",
    });

    map.addLayer({
      id: "india-layer",
      type: "fill",
      source: "india",
      paint: {
        "fill-color": [
          "case",
          ["==", ["feature-state", "click"], true],
          "green",
          "black",
        ],
        "fill-opacity": 0.6,
        "fill-outline-color": "black",
      },
    });

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
  function handleAdd(id) {
    if (localGridId.includes(id)) {
      console.log("removing..");
      setLocalGridId(localGridId.filter((item) => item !== id));
    } else {
      setLocalGridId([...localGridId, id]);
    }
  }

  useEffect(() => {
    if (!map) return;
    let id = null;
    map.on("click", "india-layer", (e) => {
      map.getCanvas().style.cursor = "pointer";
      if (e.features.length > 0) {
        id = e.features[0].properties.id;
        handleAdd(id);
        let currentState = map.getFeatureState({ source: "india", id: id });
        console.log(currentState);
        map.setFeatureState(
          { source: "india", id: id },
          { click: !currentState.click }
        );
      }
    });

    return () => map.off("click", "india-layer");
  }, [map, localGridId]);
  useEffect(() => {
    onGridIdChange(localGridId);
  }, [localGridId]);

  return (
    <div className="button-box">
      {showModal && (
        <>
          Want to get detailed information reports on our layers?
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
