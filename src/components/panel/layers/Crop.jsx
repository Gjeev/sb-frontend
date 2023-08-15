import { useState } from "react";

export default function Crop({ item, map }) {
  const [isActive, setIsActive] = useState(false);
  const handleCropClick = (layer) => {
    setIsActive(!isActive);

    switch (layer) {
      case "Rice":
        if (!isActive) {
          map.setStyle("mapbox://styles/jemm/clfy1iirn000k01o3a41wlzt5");
        }
        if (isActive) {
          map.setStyle("mapbox://styles/jemm/clghvg19o004v01ped9ri5tzd");
        }
        break;

      case "Farmlands":
        if (!isActive) {
          map.setStyle("mapbox://styles/jemm/clf465b1r001i01o961bjki7v");
        }
        if (isActive) {
          map.setStyle("mapbox://styles/jemm/clghvg19o004v01ped9ri5tzd");
        }
        break;

      case "Sugarcane":
        if (!isActive) {
          map.setStyle("mapbox://styles/jemm/clghwctsw004w01pe48gt2fb3");
        }
        if (isActive) {
          map.setStyle("mapbox://styles/jemm/clghvg19o004v01ped9ri5tzd");
        }
        break;

      case "Wheat":
        if (!isActive) {
          map.setStyle("mapbox://styles/jemm/clhg5qenk01bv01pgcci3auap");
        }
        if (isActive) {
          map.setStyle("mapbox://styles/jemm/clghvg19o004v01ped9ri5tzd");
        }
        break;

      case "Urban":
        if (!isActive) {
          map.setStyle("mapbox://styles/jemm/clhg98ttf01be01pgf3rr5k5z");
        }
        if (isActive) {
          map.setStyle("mapbox://styles/jemm/clghvg19o004v01ped9ri5tzd");
        }
        break;

      case "Coherence":
        if (isActive) {
          map.setStyle("mapbox://styles/jemm/clghvg19o004v01ped9ri5tzd");
        }
        if (!isActive) {
          map.setStyle("mapbox://styles/jemm/cljvb8ei2014201qog8s3gfpg");
        }
        break;
      }
  };
  return (
    <div
      className="menu-item"
      id={item.name}
      key={item.id}
      onClick={() => handleCropClick(item.name)}
    >
      <div>
        <img src={item.url}></img>
      </div>
      <div>
        <p>{item.name}</p>
      </div>
    </div>
  );
}
