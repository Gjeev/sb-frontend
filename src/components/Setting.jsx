import NewReleasesIcon from "@mui/icons-material/NewReleases";
import { useState, useEffect } from "react";

export default function Setting({handleShowPopup}) {
    const [mountedIcon, setMountedIcon] = useState(false);
    useEffect(() => {
        setMountedIcon(true);
    },[]);
  return (
    <div className="tool" onClick={handleShowPopup} data-tut="tour_setting">
      <NewReleasesIcon
      className={mountedIcon ? 'animate' : ''}
        sx={{
          padding: "0.15em",
        }}
      ></NewReleasesIcon>
    </div>
  );
}
