import "../../css/panel.css";
import LayerMenu from "./LayerMenu";
import DeleteMenu from "./DeleteMenu";
import CartMenu from "./CartMenu";
export default function Panel({ map, gridId }) {


  return (
    <div className="left-panel">
      <ul>
        <LayerMenu map={map} />
        <DeleteMenu map={map} />
        <CartMenu gridId={gridId} map={map}></CartMenu>
      </ul>
    </div>
  );
}
