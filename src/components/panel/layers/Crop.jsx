import { useState } from "react";

export default function Crop({ item, map }) {
  const [isActive, setIsActive] = useState(false);
  const handleCropClick = (layer) => {
    setIsActive(!isActive);

    switch (layer) {
      case "Rice in Uttar Pradesh":
        if (!isActive) {
          map.setStyle("mapbox://styles/jemm/clfy1iirn000k01o3a41wlzt5");
        }
        if (isActive) {
          map.setStyle("mapbox://styles/jemm/cle5ppqxd003y01qmqn05pwpf");
        }
        break;

      case "India wide built up":
        if (!isActive) {
          map.setStyle("mapbox://styles/jemm/clf2e7e07007101qocb6hpjl4");
        }
        if (isActive) {
          map.setStyle("mapbox://styles/jemm/cle5ppqxd003y01qmqn05pwpf");
        }
        break;
      case "India Wide Vegetation":
        if (!isActive) {
          map.setStyle("mapbox://styles/jemm/clg13bg3c001z01pnhlgd3ln7");
        }
        if (isActive) {
          map.setStyle("mapbox://styles/jemm/cle5ppqxd003y01qmqn05pwpf");
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
