const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};
const typographyStyle = {
  fontWeight: "bold",
  fontSize: "1.2rem",
  color: "#19B1B1",
  fontFamily: "Inter",
  textAlign: "center",
  borderBottom: "5px solid #19B1B1",
  padding: "0 10px",
  display: "flex",
  alignItems: "center",
  gap: "5px",
};
const modalPadding = {
  display: "flex",
  flexDirection: "column",
  padding: "1em",
  alignItems: "center",
  justifyContent: "center",
  gap: "1em",
};
const buttonStyle = {
  backgroundColor: "#19B1B1",
  width: 200,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "5px",
};
const userText = {
  textAlign: "center",
  fontFamily: "Inter",
  fontSize: "0.8rem",
};
const guideBox = {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "center",
  p: 2,
  width: 200,
};
const guideText = {
  fontFamily: "Inter",
  fontSize: "13px",
};
const guideSmallText = {
  fontFamily: "Inter",
  fontSize: "10px",
  color: "#19B1B1",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "5px",
};
export {
  modalStyle,
  typographyStyle,
  modalPadding,
  buttonStyle,
  userText,
  guideBox,
  guideText,
  guideSmallText,
};
