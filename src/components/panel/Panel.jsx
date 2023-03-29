import "../../css/panel.css";
import LayerMenu from "./LayerMenu";
import DeleteMenu from "./DeleteMenu";
import CartMenu from "./CartMenu";
import { useState } from "react";
export default function Panel({ map, gridId }) {
  // const [iconSelected, setIconSelected] = useState([]);
  // const handleIconClick = (layer) => {
  //   if (iconSelected.includes(layer)) {
  //     setIconSelected(iconSelected.filter((l) => l !== layer));
  //   } else {
  //     setIconSelected([...iconSelected, layer]);
  //   }
  // };
  // const iconsCrops = [
  //   {
  //     name: "rice",
  //     url: "/images/grain-rice-icon.svg",
  //   },
  //   {
  //     name: "sugarcane",
  //     url: "/images/sugar-cane-icon.svg",
  //   },
  //   {
  //     name: "vegetation",
  //     url: "/images/farm-color-icon.svg",
  //   },
  // ];

  return (
    <div className="left-panel">
      {/* <ul className="ul-parent"> */}
      <ul>
        <LayerMenu map={map} />
        <DeleteMenu map={map} />
        <CartMenu gridId={gridId} map={map}></CartMenu>
      </ul>

      {/* <li className="list-title">
          Crops
          <ul className="ul-child">
            {iconsCrops.map((icon) => {
              <>
                <li
                  className="list-items"
                  onClick={() => handleIconClick(icon.name)}
                >
                  <input
                    type="checkbox"
                    id="crops"
                    name="crops"
                    value="crops"
                  />
                  <span className="checkmark"></span>
                  <img src={`${icon.url}`}></img>
                </li>
              </>;
            })}

            <li className="list-items">
              <input type="checkbox" id="crops" name="crops" value="crops" />
              <span className="checkmark"></span>
              <img src="/images/sugar-cane-icon.svg"></img>
            </li>
            <li className="list-items">
              <input type="checkbox" id="crops" name="crops" value="crops" />
              <span className="checkmark"></span>
              <img src="/images/farm-color-icon.svg"></img>
            </li>
          </ul>
        </li>

        <li className="list-title">
          Urban
          <ul className="ul-child">
            <li className="list-items">
              <input type="checkbox" id="crops" name="crops" value="crops" />
              <img src="/images/homepage-green-icon.svg"></img>
            </li>
          </ul>
        </li>
      </ul>  */}
    </div>
  );
}
