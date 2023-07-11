import "../../css/body.css";
import Panel from "../../components/panel/Panel";
import { coordinatesGeocoder } from "./SearchBox";
import mapboxgl from "mapbox-gl";
import { useState, useRef, useEffect, useCallback } from "react";
import Icon from "../../components/svg";
import { useDispatch, useSelector } from "react-redux";
import Tools from "../../components/Tools";
import Popup from "./Popup";
import { useTour } from "@reactour/tour";
mapboxgl.accessToken = import.meta.env.VITE_MAP_API_KEY;

export default function Body() {
  const dispatch = useDispatch();

  const mapContainer = useRef(null);
  const map = useRef(null);
  const start = {
    center: [-105, 15],
    zoom: 0,
  };

  const [animationEnd, setAnimationEnd] = useState([]);
  const { setIsOpen } = useTour();
  const gridId = useSelector((state) => state.cart.items);
  const [layerLoad, setLayerLoad] = useState(false);
  const [showModal, setShowModal] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const handleShowPopup = (bool) => {
    setShowPopup(bool);
  };
  const [showSetting, setShowSetting] = useState(false);
  const handleShowSetting = () => {
    setShowSetting(true);
  };
  const [showPanel, setShowPanel] = useState(false);
  const handleShowPanel = (bool) => {
    setShowPanel(bool);
  };

  useEffect(() => {
    if (map.current) return;
    // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/jemm/clghvg19o004v01ped9ri5tzd",
      projection: "globe",
      center: start.center,
      zoom: start.zoom,
    });

    map.current.on("load", () => {
      function spinGlobe() {
        const zoom = map.current.getZoom();
        const secondsPerRevolution = 120;
        const slowSpinZoom = 1;
        const maxSpinZoom = 2.5;

        let distancePerSecond = 360 / secondsPerRevolution;
        if (zoom > slowSpinZoom) {
          // Slow spinning at higher zooms
          const zoomDif = (maxSpinZoom - zoom) / (maxSpinZoom - slowSpinZoom);
          distancePerSecond *= zoomDif;
        }
        const center = [78, 22];
        center.lng -= distancePerSecond;
        // Smoothly animate the map over one second.
        // When this animation is complete, it calls a 'moveend' event.
        map.current.easeTo({
          center,
          zoom: 3.5,
          duration: 14000,
          easing: (t) => t,
        });
      }
      spinGlobe();

      map.current.on("moveend", () => {
        setAnimationEnd((prevState) => [...prevState, true]);
      });

      // adding search control to the map
      map.current.addControl(
        new MapboxGeocoder({
          accessToken: mapboxgl.accessToken,
          localGeocoder: coordinatesGeocoder,
          zoom: 4,
          placeholder: "Try '40,70' or 'roorkee'",
          mapboxgl: mapboxgl,
          reverseGeocode: true,
        })
      );
    });
  }, []);

  const showMoreInfo = useCallback(() => {
    let zoom = map.current.getZoom();
    if (zoom >= 6) {
      handleShowPopup(true);
      map.current.off("zoom", showMoreInfo);
    }
  }, [map.current]);

  useEffect(() => {
    map.current.on("zoom", showMoreInfo);
    return () => {
      map.current.off("zoom", showMoreInfo);
    };
  }, [map.current, showMoreInfo]);

  useEffect(() => {
    if (animationEnd && animationEnd.length === 1) {
      function getLocation() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(showPosition);
        } else {
          console.log("Geolocation is not supported by this browser.");
        }
      }
      function showPosition(position) {
        map.current.easeTo({
          center: [position.coords.longitude, position.coords.latitude],
          zoom: 9,
          duration: 14000,
          easing: (t) => t,
        });
      }
      getLocation();
    }
    // once the length becomes 2, start tutorial
    if (animationEnd && animationEnd.length === 2) {
      setIsOpen(true);
    }

  }, [animationEnd]);

  return (
    <>
      <div className="main-content">
        {showPopup && (
          <Popup
            handleShowPanel={handleShowPanel}
            showPopup={showPopup}
            handleShowPopup={handleShowPopup}
            handleShowSetting={handleShowSetting}
            map={map.current}
          ></Popup>
        )}
        <div className="left-panel">
          <Panel map={map.current}></Panel>
        </div>
        <div ref={mapContainer} className="map"></div>
        {layerLoad && (
          <div className="progress-spinner">
            <Icon fill="#ffffff" stroke="#ffffff"></Icon>
          </div>
        )}
      </div>

      <div className="tools">
        <Tools
          map={map.current}
          setLayerLoad={setLayerLoad}
          setShowModal={setShowModal}
          showPanel={showPanel}
          showSetting={showSetting}
          handleShowPopup={handleShowPopup}
        ></Tools>
      </div>
    </>
  );
}
