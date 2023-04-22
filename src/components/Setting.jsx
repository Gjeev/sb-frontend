import NewReleasesIcon from "@mui/icons-material/NewReleases";
import { useState, useEffect } from "react";

export default function Setting({handleShowPopup}) {
    const [mountedIcon, setMountedIcon] = useState(false);
    useEffect(() => {
        setMountedIcon(true);
    },[]);
  return (
    <div className="tool" onClick={handleShowPopup}>
      <NewReleasesIcon
      className={mountedIcon ? 'animate' : ''}
        sx={{
          fontSize: "1em",
          padding: "0.5em",
        }}
      ></NewReleasesIcon>
    </div>
  );
}
