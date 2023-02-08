import Tooltip from "@mui/material/Tooltip";

export default function List1() {
    return (
        <li className="list">
          <Tooltip placement="top" title="upload to cart">
            <img src="/images/panelicon2.png" />
          </Tooltip>
        </li>
    );
}