import "../../css/panel.css";
import Tooltip from "@mui/material/Tooltip";
import List4 from "./layer-li";
import List3 from "./remove-li";
import List2 from "./selected-li";

export default function Panel(props) {
  const map = props.map;
  const gridId = props.gridId;
  const setGridId = props.setGridId;
  const layerLoad = props.layerLoad;
  const setLayerLoad = props.setLayerLoad;
  return (
    <div className="left-panel">
      <ul>
        <List4 map={map} gridId={gridId} setGridId={setGridId} layerLoad={layerLoad} setLayerLoad={setLayerLoad}/>
        <List3 map={map} />
        <List2 map={map} gridId={gridId} setGridId={setGridId} />
        <li className="list">
          <Tooltip placement="top" title="upload to cart">
            <img src="/images/panelicon2.png" />
          </Tooltip>
        </li>
      </ul>
    </div>
  );
}
