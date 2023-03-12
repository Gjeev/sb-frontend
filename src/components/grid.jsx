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

  //controls adding & removing of india layer
  const handleIndiaLayerClick = () => {
    addIndiaLayer();
    setLayerLoad(true);
  };
  const handleRemoveIndiaLayer = () => {
    map.removeLayer("india-layer");
    for (const id of localGridId) {
      map.removeLayer(`popUp${id}`);
    }
    map.removeSource("india");

    setShowModal(true);
  };

  function handleAdd(id) {
    if (localGridId.includes(id)) {
      setLocalGridId(localGridId.filter((item) => item !== id));
      if (map.getLayer(`popUp${id}`)) {
        map.removeLayer(`popUp${id}`);
      }
    } else {
      setLocalGridId([...localGridId, id]);
      if (!map.getLayer(`popUp${id}`)) {
        map.addLayer({
          id: `popUp${id}`,
          type: "symbol",
          source: "india",
          layout: {
            "text-field": ["get", "id"],
            "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
            "text-offset": [0, 0.6],
            "text-anchor": "top",
          },
          paint: {
            "text-color": "green",
          },
          filter: ["==", "id", id],
        });
      }
    }
  }

  function addIndiaLayer() {
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
  useEffect(() => {
    if (!map) return;
    map.on("click", "india-layer", (e) => {
      map.getCanvas().style.cursor = "pointer";
      if (e.features.length > 0) {
        let id = e.features[0].properties.id;
        handleAdd(id);
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
