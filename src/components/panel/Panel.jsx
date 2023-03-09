import "../../css/panel.css";
import LayerMenu from "./layer-li";
import DeleteMenu from "./DeleteMenu";
import CartMenu from "./CartMenu";
export default function Panel({ map, gridId }) {


  return (
    <div className="left-panel">
      <ul>
        <LayerMenu map={map} />
        <DeleteMenu map={map} />
        <CartMenu gridId={gridId}></CartMenu>
      </ul>
    </div>
  );
}
