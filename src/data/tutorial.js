const steps = [
  {
    selector: '[data-tut="tour_popup"]',
    content: "Welcome to Sensing Bharat! This tutorial will guide you through the features of this application. Click on the arrow to continue.",
    },
  {
    selector: '[data-tut="tour_insurance"]',
    content: "Click on the button to open the tools panel and click the arrow to continue.",
  },
  {
    selector : '[data-tut="tour_point"]',
    content: "You can choose multiple points on the map by clicking on this option."
  },
  {
    selector : '[data-tut="tour_polygon"]',
    content: "Would you like to choose an area instead of a point? You can draw a polygon on the map by clicking on this option."
  },
  {
    selector : '[data-tut="tour_setting"]',
    content: "You can open the Popup anytime by clicking on this option. The popup contains the information about the report you will access."
  },
  {
    selector : '[data-tut="tour_panel"]',
    content: "We have a collection of our generated layers here. You can click on any of them to view the layer on the map. Clicking on it again removes the layer.",
  },
  {
    selector : '[data-tut="tour_panelopener"]',
    content: "You can open and close the panel anytime by clicking on this option."
  },
  {
    selector: ".mapboxgl-ctrl-geocoder--input",
    content: "You can search for a location by typing in the search bar.",
  }

];
export { steps };
