const color = require('color');

/* eslint-disable no-unused-vars */
const colorGrayscale1 = '#111';
const colorGrayscale2 = '#222';
const colorGrayscale3 = '#333';
const colorGrayscale4 = '#444';
const colorGrayscale5 = '#555';
const colorGrayscale6 = '#666';
const colorGrayscale7 = '#777';
const colorGrayscale8 = '#888';
const colorGrayscale9 = '#999';
const colorGrayscaleA = '#aaa';
const colorGrayscaleB = '#bbb';
const colorGrayscaleC = '#ccc';
const colorGrayscaleD = '#ddd';
const colorGrayscaleE = '#eee';
const colorGrayscaleF5 = '#f5f5f5';
/* eslint-enable no-unused-vars */

const colorPrimary = color('#0075ca');
const colorPrimaryLight = colorPrimary.lighten(0.07);
const colorSecondary = color('#fb7e00');
const colorFacebook = color('#3b5998');
const colorSuccess = color('#5cb85c');

const breakpoints = { xs: 0, sm: 544, md: 768, lg: 992, xl: 1200 };

const percentageWidths = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 15, 20, 23, 25, 30, 33, 35, 40,
  45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100];

const heights = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15, 20, 25, 30, 33, 35, 40, 45, 50,
  53, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100];

const fontSizes = [12, 13, 14, 16, 18, 21, 30];

module.exports = {
  breakpoints,
  lineHeightCopy: 27,
  colorPrimary: colorPrimary.hexString(),
  colorPrimaryDarker: colorPrimary.darken(0.05).hexString(),
  colorPrimaryLight: colorPrimaryLight.hexString(),
  colorPrimaryLightDarker: colorPrimaryLight.darken(0.02).hexString(),
  colorSecondary: colorSecondary.hexString(),
  colorSecondaryDarker: colorSecondary.darken(0.05).hexString(),
  colorFacebook: colorFacebook.hexString(),
  colorFacebookDarker: colorFacebook.darken(0.05).hexString(),
  colorSuccess: colorSuccess.hexString(),
  colorSuccessDarker: colorSuccess.darken(0.05).hexString(),
  colorBlack: '#000',
  colorWhite: '#fff',
  colorGrayscaleNormal: colorGrayscale3,
  colorGrayscaleLight: colorGrayscaleD,
  colorGrayscaleMedium: colorGrayscale5,
  colorGrayscaleSubtle: colorGrayscale9,
  bgColorGrayscaleLight: colorGrayscaleF5,
  bgColorGrayscaleDark: colorGrayscale4,
  bgColorOverlay: 'rgba(0, 0, 0, 0.4)',
  bgColorOverlayDark: 'rgba(0, 0, 0, 0.8)',
  textShadowOverlay: '0 0 3px black',
  borderRadiusSmall: 5,
  borderColorGrayscaleLight: colorGrayscaleE,
  borderColorGrayscaleMedium: colorGrayscaleD,
  marginBottomSection: 30,
  percentageWidths,
  heights,
  fontSizes,
};
