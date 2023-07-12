import { useState } from "react";

export default function Crop({ item, map }) {
  const [isActive, setIsActive] = useState(false);
  const handleCropClick = (layer) => {
    setIsActive(!isActive);

    // const handleSliderChange = (event) => {
    //   if (event.target.value == "2017" || event.target.value == "2022") {
    //     map.setFilter("meerut", ["==", ["get", "Year"], parseInt(event.target.value)]);
    //   }
    // };
    // const handleSliderClick = (event) => {
    //   event.stopPropagation(); // Prevent click event from bubbling to parent div
    // };

    switch (layer) {
      case "Rice":
        if (!isActive) {
          map.setStyle("mapbox://styles/jemm/clfy1iirn000k01o3a41wlzt5");
        }
        if (isActive) {
          map.setStyle("mapbox://styles/jemm/clghvg19o004v01ped9ri5tzd");
        }
        break;

      case "Farmlands":
        if (!isActive) {
          map.setStyle("mapbox://styles/jemm/clf465b1r001i01o961bjki7v");
        }
        if (isActive) {
          map.setStyle("mapbox://styles/jemm/clghvg19o004v01ped9ri5tzd");
        }
        break;

      case "Sugarcane":
        if (!isActive) {
          map.setStyle("mapbox://styles/jemm/clghwctsw004w01pe48gt2fb3");
        }
        if (isActive) {
          map.setStyle("mapbox://styles/jemm/clghvg19o004v01ped9ri5tzd");
        }
        break;

      case "Wheat":
        if (!isActive) {
          map.setStyle("mapbox://styles/jemm/clhg5qenk01bv01pgcci3auap");
        }
        if (isActive) {
          map.setStyle("mapbox://styles/jemm/clghvg19o004v01ped9ri5tzd");
        }
        break;

      case "Urban":
        if (!isActive) {
          map.setStyle("mapbox://styles/jemm/clhg98ttf01be01pgf3rr5k5z");
        }
        if (isActive) {
          map.setStyle("mapbox://styles/jemm/clghvg19o004v01ped9ri5tzd");
        }
        break;

      case "Coherence":
        if (isActive) {
          map.setStyle("mapbox://styles/jemm/clghvg19o004v01ped9ri5tzd");
        }
        if (!isActive) {
          map.setStyle("mapbox://styles/jemm/cljvb8ei2014201qog8s3gfpg");
        }
        break;
        // mapbox://styles/jemm/cljvb8ei2014201qog8s3gfpg
      // case "Meerut":
      //   const sliderDiv = document.querySelector("#Meerut");
      //   let rangeSlider = null;
      //   if (!isActive) {
      //     rangeSlider = document.createElement("input");
      //     rangeSlider.type = "range";
      //     rangeSlider.min = "2017";
      //     rangeSlider.max = "2022";
      //     rangeSlider.value = "2017";
      //     rangeSlider.className = "slider-input";
      //     rangeSlider.addEventListener("change", handleSliderChange);
      //     rangeSlider.addEventListener("click", handleSliderClick);
      //     sliderDiv.appendChild(rangeSlider);
      //     map.flyTo({
      //       center: [77.6, 29.04],
      //       zoom: 10,
      //     });
      //     map.addLayer({
      //       id: "meerut",
      //       type: "circle",
      //       source: {
      //         type: "geojson",
      //         data: "https://gjeev.github.io/layers/meerut.geojson",
      //       },
      //       paint: {
      //         "circle-radius": [
      //           "step",
      //           ["zoom"],
      //           2,
      //           13,
      //           3,
      //           14,
      //           5,
      //           15.31,
      //           9,
      //           16,
      //           10,
      //           18,
      //           12,
      //           20,
      //           15
      //         ],
      //         "circle-color": "#cd4cb5",
      //         "circle-opacity": 1,
      //       },
      //       filter: ["==", ["get", "Year"], 2017],
      //     });
      //   }
      //   if (isActive) {
      //     console.log("removeing")
      //     rangeSlider = document.querySelector(".slider-input");
      //     sliderDiv.removeChild(rangeSlider);
      //     rangeSlider = null;
      //     map.removeLayer("meerut");
      //     map.removeSource("meerut");
      //   }
      //   break;

      // default:
      //   break;
    }

    // const crops = document.querySelectorAll("#crop");
    // crops.forEach((crop) => {
    //   if (crop.dataset.id !== item.id.toString()) {
    //     crop.classList.remove("menu-item-selected");
    //     crop.classList.add("menu-item");
    //   }
    // });
  };
  return (
    <div
      className="menu-item"
      id={item.name}
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
