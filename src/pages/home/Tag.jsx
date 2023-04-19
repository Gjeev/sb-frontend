import IconButton from "@mui/material/IconButton";
import SettingsIcon from "@mui/icons-material/Settings";
import { styled } from "@mui/material/styles";
import { useState, useEffect } from "react";
const StyledIconButton = styled(IconButton)(({ theme, animate }) => ({
  backgroundColor: theme.palette.primary.main,
  color: "#fff",
  borderRadius: "50%",
  width: "60px",
  height: "60px",
  transition: "transform 0.2s ease-in-out",
  transform: animate ? "rotate(360deg) scale(1.1)" : "none",
  "&:hover": {
    backgroundColor: theme.palette.primary.light,
  },
}));

export default function Tag({ animateTag }) {
  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    setAnimate(animateTag);
    setTimeout(() => {
      setAnimate(false);
    }, 1000);
  }, [animateTag]);

  return (
    <StyledIconButton>
      <SettingsIcon />
    </StyledIconButton>
  );
}
