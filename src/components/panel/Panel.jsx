import "../../css/panel.css";
import List4 from "./layer-li";
import List3 from "./remove-li";
import List2 from "./selected-li";
import List1 from "./cart-li";
export default function Panel({ map, gridId, onGridIdChange, layerLoad, setLayerLoad}) {

  return (
    <div className="left-panel">
      <ul>
        <List4 map={map} gridId={gridId} onGridIdChange={onGridIdChange} layerLoad={layerLoad} setLayerLoad={setLayerLoad}/>
        <List3 map={map} />
        <List2 map={map} gridId={gridId} onGridIdChange={onGridIdChange} />
        <List1 />
      </ul>
    </div>
  );
}
