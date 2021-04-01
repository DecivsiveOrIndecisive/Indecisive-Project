import theme, { Theme } from "@chakra-ui/theme";
import { mode, Styles } from "@chakra-ui/theme-tools";

// const styles: Styles = {
//   global: props => ({
//     fontFamily: "body",
//     color: mode("gray.800", "whiteAlpha.900")(props),
//     bg: mode("white", "gray.800")(props),
//     lineHeight: "base",
//     "*::placeholder": {
//       color: mode("gray.400", "whiteAlpha.400")(props),
//     },
//     "*, *::before, &::after": {
//       borderColor: mode("gray.200", "whiteAlpha.300")(props),
//       wordWrap: "break-word",
//     },
//     fontFeatureSettings: `"pnum"`,
//     fontVariantNumeric: "proportional-nums",
//   }),
// };

const customTheme = {
  ...theme,
  fonts: {
    ...theme.fonts,
    body: `"Source Sans Pro",${theme.fonts.body}`,
    heading: `"Source Sans Pro",${theme.fonts.heading}`,
  },
  colors: {
    ...theme.colors,
    brand: {
      50: "#EED4D4",
      100: "#E8B7BF",
      200: "#EF8F8F",
      300: "#EC4F4F",
      400: "#FF0000",
      500: "#E32222",
      600: "#B91919",
      700: "#B22B2B",
      800: "#741616",
      900: "#24272B",
    },
  },
  config: {
    ...theme.config,
    useSystemColorMode: false,
    initialColorMode: "dark",
  },
  styles: {
    ...theme.styles,
    global: props => ({
      "html, body": {
        bg: mode("brand.50", "brand.900")(props),
        color: mode("brand.900", "brand.50")(props),
      },
    }),
  },
};

export default customTheme;
