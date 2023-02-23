import "../../css/body.css";
import Panel from "../../components/panel/Panel";
import { coordinatesGeocoder } from "./SearchBox";
import { fog } from "../../data/fog";
import mapboxgl from "mapbox-gl";
import { useState, useRef, useEffect } from "react";
import Icon from "../../components/svg";
// https://studio.mapbox.com/styles/jemm/cle5ppqxd003y01qmqn05pwpf/edit/#2.33/26.37/81.88
mapboxgl.accessToken = import.meta.env.VITE_MAP_API_KEY;

export default function Body() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const start = {
    center: [-105, 15],
    zoom: 0,
  };

  const [lng, setLng] = useState(start.center[0]);
  const [lat, setLat] = useState(start.center[1]);
  const [animationEnd, setAnimationEnd] = useState(false);

  const [gridId, setGridId] = useState([]);
  const onGridIdChange = (changedArray) => {
    setGridId(changedArray);
  };
  const [layerLoad, setLayerLoad] = useState(false);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/jemm/cle5ppqxd003y01qmqn05pwpf",
      projection: "globe",
      center: start.center,
      zoom: start.zoom,
    });

    map.current.on("load", () => {
      map.current.setFog(fog);
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
      const center = [78, 24];
      center.lng -= distancePerSecond;
      // Smoothly animate the map over one second.
      // When this animation is complete, it calls a 'moveend' event.
      map.current.easeTo({ center, zoom: 4.5, duration: 10000, easing: (n) => n });
    }

    spinGlobe();

    map.current.on("moveend", () => {
      setAnimationEnd(true);
    });

    //displays the coordinates of the mouse pointer
    map.current.on("mousemove", (e) => {
      setLng(e.lngLat.lng.toFixed(4));
      setLat(e.lngLat.lat.toFixed(4));
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
          duration: 12000,
          essential: true,
        });
      }
      getLocation();
    }
  }, [animationEnd]);

  return (
    <>
      <div className="main-content">
        <Panel
          map={map.current}
          gridId={gridId}
          onGridIdChange={onGridIdChange}
          layerLoad={layerLoad}
          setLayerLoad={setLayerLoad}
        ></Panel>
        <div ref={mapContainer} className="map"></div>
        <div className="information">
          Latitude: {lat} | Longitude: {lng}
        </div>
        {layerLoad && (
          <div className="progress-spinner">
            <Icon fill="#ffffff" stroke="#ffffff"></Icon>
          </div>
        )}
      </div>
    </>
  );
}
