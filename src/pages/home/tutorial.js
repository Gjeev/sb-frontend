let tutorialSteps = [
    {
      element: "#first",
      popover: {
        className: "first-step-popover-class",
        title: "Hello :)",
        description:
          "Welcome to our tutorial! Once you have navigated through the tutorial, you can try it on your own.",
        position: "bottom",
      },
    },
    {
      element: ".buttons-header",
      popover: {
        title: "Sign Up or Login",
        description:
          "Sign up for an account or Login to save your grids and access them later!",
        position: "bottom",
      },
    },
    {
      element: ".information",
      popover: {
        title: "Displays the coordinates of your pointer",
        description:
          "The website automatically navigates to your current location. You can also search for a location using the search box.",
        position: "top",
      },
    },
    {
      element: ".mapboxgl-ctrl-geocoder--input",
      popover: {
        title: "Enter your location in words on in coordinates",
        description:
          "Select from the dropdown list or press enter to navigate to the location!",
        position: "left",
      },
    },
    {
      element: ".layer-li",
      popover: {
        title: "Select the layer you want to view",
        description:
          "We have a selection of data-rich layers to choose from!",
        position: "right",
      },
    },
    {
      element: ".select-list",
      popover: {
        title: "Your selected grids appear here!",
        description:
          "You cannot add duplicate grids and you can delete the grids here!",
        position: "right",
      },
    },
    {
      element: ".delete-list",
      popover: {
        title: "Remove the current layer on the map",
        description:
          "You can remove the current layer on the map by clicking on the delete icon. Not deleting the layer can alter the way the next layer is displayed.",
        position: "right",
      },
    },
    {
      element: ".button-box",
      popover: {
        title: "Select a grid",
        description:
          "Click on a grid to select it. You can also remove the grid layer by clicking on the button.",
        position: "left",
      },
    },
    {
      element: ".tut-about",
      popover: {
        title: "Interested in learning more about us?",
        description:
          "Click on the about us button to learn more about us and our mission!",
        position: "bottom",
      },
    },
  ];

export { tutorialSteps };