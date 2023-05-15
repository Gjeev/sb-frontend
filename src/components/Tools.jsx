import { Box } from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";
import TimelineIcon from "@mui/icons-material/Timeline";
import Tooltip from "@mui/material/Tooltip";
import { useEffect, useState, useRef } from "react";
import Grid from "./Grid";
import { useDispatch } from "react-redux";
import Setting from "./Setting";
import { Marker, Popup } from "mapbox-gl";
//  css in body.css

export default function Tools({
  map,
  setLayerLoad,
  setShowModal,
  showPanel,
  showSetting,
  handleShowPopup,
}) {
  const dispatch = useDispatch();
  const [lng, setLng] = useState(null);
  const [lat, setLat] = useState(null);
  const [drawTools, setDrawTools] = useState(null);
  const [drawToolsVisible, setDrawToolsVisible] = useState(false);
  const [polygons, setPolygons] = useState([]);
  const [changeClass, setChangeClass] = useState(false);

  useEffect(() => {
    if (map) {
      map.on("mousemove", (e) => {
        setLng(e.lngLat.lng.toFixed(4));
        setLat(e.lngLat.lat.toFixed(4));
      });

      const drawTools = new MapboxDraw({
        displayControlsDefault: false,
        controls: {
          polygon: true,
          trash: true,
        },
      });
      setDrawTools(drawTools);
      map.on("draw.create", (event) => {
        const { features } = event;
        const polygon = features.find(
          (feature) => feature.geometry.type === "Polygon"
        );
        if (polygon) {
          setPolygons((prevPolygons) => [...prevPolygons, polygon]);
        }
      });

      map.on("draw.delete", (event) => {
        const { features } = event;
        const polygon = features.find(
          (feature) => feature.geometry.type === "Polygon"
        );
        if (polygon) {
          setPolygons((prevPolygons) =>
            prevPolygons.filter((p) => p.id !== polygon.id)
          );
        }
      });
    }
  }, [map]);

  useEffect(() => {
    dispatch({ type: "UPDATE_CART", payload: polygons });
  }, [polygons]);

  const toggleDrawTools = () => {
    if (drawToolsVisible) {
      map.removeControl(drawTools);
      setDrawToolsVisible(false);
    } else {
      map.addControl(drawTools, "bottom-right");
      setDrawToolsVisible(true);
    }
  };

  const [points, setPoints] = useState([]);
  const [toggle, setToggle] = useState(false);
  const clickListenerRef = useRef(null);
  const markersRef = useRef([]);

  const collectPoints = () => {
    const listener = (e) => {
      const { lng, lat } = e.lngLat;
      const clickedPoint = {
        geometry: {
          type: "Point",
          coordinates: [lng, lat],
        },
      } ;
      setPoints((prevPoints) => [...prevPoints, clickedPoint]);

      const marker = new Marker().setLngLat([lng, lat]).addTo(map);
      const popupContent = document.createElement("div");
      const deleteIcon = document.createElement("button");
      deleteIcon.innerHTML =
        'Delete';
      deleteIcon.className = "delete-icon";
      popupContent.className = "popup-content";
      deleteIcon.addEventListener("click", () => {
        removeMarker(marker);
      });
      const removeMarker = (marker) => {
        marker.remove();
        markersRef.current = markersRef.current.filter((refMarker) => refMarker !== marker);
        setPoints((prevPoints) => prevPoints.filter((point) => point !== clickedPoint));
      };

      const popup = new Popup()
        .setDOMContent(popupContent)
        .setLngLat([lng, lat]);

      popupContent.innerHTML += `Latitude: ${lat.toFixed(4)}<br>Longitude: ${lng.toFixed(4)}`;
      popupContent.appendChild(deleteIcon);

      marker.setPopup(popup);

      marker.getElement().addEventListener("mouseenter", () => {
        marker.getPopup().addTo(map);
      });

      markersRef.current.push(marker);
    };

    clickListenerRef.current = listener;
    map.on("click", listener);
  };

  const toggleCollectPoints = () => {
    setChangeClass((prevClass) => !prevClass);
    if (!toggle) {
      collectPoints();
      setToggle(true);
    } else {
      if (clickListenerRef.current) {
        map.off("click", clickListenerRef.current);
      }

      markersRef.current = []; // ???
      clickListenerRef.current = null;
      setToggle(false);
    }
  };
  useEffect(() => {
    dispatch({ type: "UPDATE_CART", payload: points });
  },[points]);

  return (
    <Box
      sx={{
        width: "calc(100vw - 8rem)",
        height: "2em",
        backdropFilter: "blur(7.3px)",
        WebkitBackdropFilter: "blur(7.3px)",
        background: "rgba(41, 22, 22, 0.57)",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      {lng && lat && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "0.5rem",
            fontSize: "16px",
            width: "200px",
          }}
        >
          <p>
            {lng}° | {lat}°
          </p>
        </Box>
      )}
      {showPanel && (
        <>
          <Tooltip title="select a point">
            <div className={`tool-${changeClass? "selected" : ""}`} onClick={toggleCollectPoints}>
              <PlaceIcon
                sx={{
                  fontSize: "1em",
                  padding: "0.5em",
                }}
              />
            </div>
          </Tooltip>

          <Tooltip title="draw a polygon">
            <div className="tool" onClick={toggleDrawTools}>
              <TimelineIcon
                sx={{
                  fontSize: "1em",
                  padding: "0.5em",
                }}
              />
            </div>
          </Tooltip>

          <Grid
            map={map}
            setLayerLoad={setLayerLoad}
            setShowModal={setShowModal}
          ></Grid>
        </>
      )}
      {showSetting && (
        <>
          <Tooltip title="open tools modal">
            <Setting handleShowPopup={handleShowPopup}></Setting>
          </Tooltip>
        </>
      )}
    </Box>
  );
}
