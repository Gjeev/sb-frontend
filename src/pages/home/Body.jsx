import "../../css/body.css";
import Panel from "../../components/panel/Panel";
import { coordinatesGeocoder } from "./SearchBox";
import mapboxgl from "mapbox-gl";
import { useState, useRef, useEffect } from "react";
import Icon from "../../components/svg";
import Grid from "../../components/Grid";
import { useDispatch, useSelector } from "react-redux";
import Tools from "../../components/Tools";
mapboxgl.accessToken = import.meta.env.VITE_MAP_API_KEY;

export default function Body() {
  const dispatch = useDispatch();

  const mapContainer = useRef(null);
  const map = useRef(null);
  const start = {
    center: [-105, 15],
    zoom: 0,
  };

  const [animationEnd, setAnimationEnd] = useState(false);
  const gridId = useSelector((state) => state.cart.items);
  const [layerLoad, setLayerLoad] = useState(false);
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    if (map.current) return;
    // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/jemm/cle5ppqxd003y01qmqn05pwpf",
      projection: "globe",
      center: start.center,
      zoom: start.zoom,
    });

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
    // spinGlobe();

    map.current.on("moveend", () => {
      setAnimationEnd(true);
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
  }, []);
  useEffect(() => {
    if (animationEnd) {
      function getLocation() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(showPosition);
        } else {
          console.log("Geolocation is not supported by this browser.");
        }
      }
      function showPosition(position) {
        map.current.flyTo({
          center: [position.coords.longitude, position.coords.latitude],
          zoom: 9,
          duration: 14000,
          essential: true,
        });
      }
      getLocation();
    }
  }, [animationEnd]);

  return (
    <>
      <div className="main-content">
        <Panel map={map.current}></Panel>
        <div ref={mapContainer} className="map"></div>
        {/* <div className="information">
          Latitude: {lat} | Longitude: {lng}
        </div> */}
        {/* <div className="grid-modal">
          <Grid
            map={map.current}
            layerLoad={layerLoad}
            setLayerLoad={setLayerLoad}
            showModal={showModal}
            setShowModal={setShowModal}
          ></Grid>
        </div> */}
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
        ></Tools>
      </div>
    </>
  );
}
