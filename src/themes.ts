import { createTheme, MantineThemeOverride } from "@mantine/core";

export const themes: MantineThemeOverride = createTheme({
  colors: {
    rasioCores: [
      "#000000", // 0 - preto puro
      "#121212", // 1
      "#1E1E1E", // 2
      "#2C2C2C", // 3
      "#4D4D4D", // 4
      "#7A7A7A", // 5
      "#B3B3B3", // 6
      "#D3D3D3", // 7
      "#E2DEDE", // 8
      "#FFFFFF", // 9 - branco puro
      "#FF0000", // 10 - vermelho 
      "#00A636", // 11 - verde
    ] as const,
  },
  components: {
    InputWrapper: {
      styles: () => ({
        label: {
          color: rasioCoresThemes.cinzaEscuro,
        },
        description: {
          color: rasioCoresThemes.cinzaEscuro,
        },
        error: {
          color: rasioCoresThemes.vermelho,
        },
      }),
    },
  },
  breakpoints: {
    xs: "30em",
    sm: "48em",
    md: "64em",
    lg: "74em",
    xl: "90em",
  },
  fontFamily: "Lexend, sans-serif",
  fontSizes: {
    p8px: "8px",
    p10px: "10px",
    p11px: "11px",
    p12px: "12px",
    p14px: "14px",
    p16px: "16px",
    p18px: "18px",
    p20px: "20px",
  },
  headings: {
    fontFamily: "Lexend, sans-serif",
    sizes: {
      h1: { fontSize: "32px" },
      h2: { fontSize: "30px" },
      h3: { fontSize: "28px" },
      h4: { fontSize: "24px" },
      h5: { fontSize: "22px" },
    },
  },
});

export const rasioCoresThemes = {
  preto: themes.colors!.rasioCores?.[0],
  cinzaQuasePreto: themes.colors!.rasioCores?.[1],
  cinzaGrafite: themes.colors!.rasioCores?.[2],
  cinzaEscuro: themes.colors!.rasioCores?.[3],
  cinzaMedio: themes.colors!.rasioCores?.[4],
  cinzaClaro: themes.colors!.rasioCores?.[5],
  cinzaMuitoClaro: themes.colors!.rasioCores?.[6],
  cinzaMuitoMaisClaro: themes.colors!.rasioCores?.[7],
  cinzaQuaseBranco: themes.colors!.rasioCores?.[8],
  branco: themes.colors!.rasioCores?.[9],
  vermelho: themes.colors!.rasioCores?.[10],
  verde: themes.colors!.rasioCores?.[11],
};

export const rasioTipografiasThemes = {
  h1: themes.headings?.sizes?.h1,
  h2: themes.headings?.sizes?.h2,
  h3: themes.headings?.sizes?.h3,
  h4: themes.headings?.sizes?.h4,
  h5: themes.headings?.sizes?.h5,
  p8: themes.fontSizes?.p8px,
  p10: themes.fontSizes?.p10px,
  p11: themes.fontSizes?.p11px,
  p12: themes.fontSizes?.p12px,
  p14: themes.fontSizes?.p14px,
  p16: themes.fontSizes?.p16px,
  p18: themes.fontSizes?.p18px,
  p20: themes.fontSizes?.p20px,
  fontFamily: themes.fontFamily,
  fontWeight: {
    regular: 400,
    medium: 500,
    bold: 700,
  },
};
