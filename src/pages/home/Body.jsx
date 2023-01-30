import "../../css/body.css";
import Panel from "../../components/Panel";
import { coordinatesGeocoder } from "./SearchBox";
import { fog } from "../../data/fog";
import mapboxgl from "mapbox-gl";
import { useState, useRef, useEffect } from "react";
mapboxgl.accessToken = import.meta.env.VITE_MAP_API_KEY;

export default function Body() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const start = {
    center: [-105, 15],
    zoom: 1,
  };

  const [lng, setLng] = useState(start.center[0]);
  const [lat, setLat] = useState(start.center[1]);
  const [zoom, setZoom] = useState(1);
  const [animationEnd, setAnimationEnd] = useState(false);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/satellite-streets-v12",
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
      const center = [80, 29];
      center.lng -= distancePerSecond;
      // Smoothly animate the map over one second.
      // When this animation is complete, it calls a 'moveend' event.
      map.current.easeTo({ center, duration: 10000, easing: (n) => n });
    }
    // spinGlobe();
    map.current.on("moveend", () => {
      setAnimationEnd(true);
    });
    // changes long, lat & zoom on map movement
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
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
  }, [map.current]);
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
        <Panel></Panel>
        <div ref={mapContainer} className="map"></div>
      </div>
    </>
  );
}
