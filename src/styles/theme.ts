import { extendTheme, theme } from "@chakra-ui/react";

export default extendTheme({
  fonts: {
    ...theme.fonts,
    body: "Inter, sans-serif",
    heading: "Inter, sans-serif"
  },
  colors: {
    ...theme.colors
  },
  components: {}
});
