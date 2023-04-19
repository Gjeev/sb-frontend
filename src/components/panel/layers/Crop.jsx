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

      case "Built Up":
        if (!isActive) {
          map.setStyle("mapbox://styles/jemm/clf2e7e07007101qocb6hpjl4");
        }
        if (isActive) {
          map.setStyle("mapbox://styles/jemm/clghvg19o004v01ped9ri5tzd");
        }
        break;
      case "Vegetation":
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
      default:
        break;
    }

    const crops = document.querySelectorAll("#crop");
    crops.forEach((crop) => {
      if (crop.dataset.id !== item.id.toString()) {
        crop.classList.remove("menu-item-selected");
        crop.classList.add("menu-item");
      }
    });
  };
  return (
    <div
      className={isActive ? "menu-item-selected" : "menu-item"}
      id="crop"
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
