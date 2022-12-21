import { COLORS } from "./Colors";
import { FONT_SIZE } from "./FontSize";

export const fontStyle = (bgColor, size, spacing) => {
  return {
    backgroundColor: bgColor || COLORS.blue_azure,
    textTransform: "capitalize",
    fontSize: size || FONT_SIZE.medium,
    letterSpacing: spacing || 0.3,
    "&:hover": { backgroundColor: bgColor || COLORS.blue_azure },
  };
};
