import "../../css/panel.css";
import Crop from "./layers/Crop";
import { CropMenuItems } from "./layers/menu-items/crop/item";
import { UrbanMenuItems } from "./layers/menu-items/urban/item";

export default function Panel({ map }) {
  return (
    <div className="left-panel">
      <div className="title">
        <h1>Crop Layers</h1>
      </div>
      <div className="menu">
        {CropMenuItems.map((item) => {
          return <Crop item={item} map={map}></Crop>;
        })}
      </div>
      <div className="title">
        <h1>Urban</h1>
      </div>
      <div className="menu">
        {UrbanMenuItems.map((item) => {
          return <Crop item={item} map={map}></Crop>;
        })}
      </div>
    </div>
  );
}
