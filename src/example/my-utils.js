/* eslint-disable max-len, no-useless-escape */

// In your project, import 'zerocss' instead of '../'
const ZeroCSS = require('../');
const config = require('./my-utils-config');

const zerocss = new ZeroCSS(config.breakpoints);
const hfaPseudoConfig = { '\\:hfa': ['hover', 'focus', 'active'] };

const loopUtils = [
  {
    config: { name: 'dis', property: 'display', isResponsive: true },
    entries: { 0: 'none', b: 'block', i: 'inline', ib: 'inline-block',
      t: 'table', tc: 'table-cell' },
  },
  {
    config: { name: 'fl', property: 'float', isResponsive: true },
    entries: { 0: 'none', l: 'left', r: 'right' },
  },
  {
    config: { name: 'pos', property: 'position', isResponsive: true },
    entries: { a: 'absolute', f: 'fixed', r: 'relative', s: 'static' },
  },
  {
    config: { name: 'top', property: 'top', isResponsive: true },
    entries: { 0: '0' },
  },
  {
    config: { name: 'bottom', property: 'bottom', isResponsive: true },
    entries: { 0: '0' },
  },
  {
    config: { name: 'left', property: 'left', isResponsive: true },
    entries: { 0: '0' },
  },
  {
    config: { name: 'right', property: 'right', isResponsive: true },
    entries: { 0: '0' },
  },
  {
    config: { name: 'valign', property: 'vertical-align' },
    entries: { m: 'middle', t: 'top' },
  },
  {
    config: { name: 'z', property: 'z-index' },
    entries: { 1: '1', 2: '2' },
  },
  {
    config: { name: 'op', property: 'opacity' },
    entries: { 0: '0', 1: '1' },
  },
  {
    config: { name: 'deco', property: 'text-decoration', pseudoConfig: hfaPseudoConfig },
    entries: { 0: 'none', u: 'underline' },
  },
  {
    config: { name: 'lh', property: 'line-height' },
    entries: { 0: 0, 18: 18, 30: 30, copy: config.lineHeightCopy },
  },
  {
    config: { name: 'c', property: 'color', pseudoConfig: hfaPseudoConfig },
    entries: {
      prim: config.colorPrimary, primdark: config.colorPrimaryDarker,
      sec: config.colorSecondary, secdark: config.colorSecondaryDarker,
      fb: config.colorFacebook, fbdark: config.colorFacebookDarker,
      white: config.colorWhite, black: config.colorBlack,
      graynorm: config.colorGrayscaleNormal, graylight: config.colorGrayscaleLight,
      graymed: config.colorGrayscaleMedium, graysubtle: config.colorGrayscaleSubtle,
    },
  },
  {
    config: { name: 'bgc', property: 'background-color', pseudoConfig: hfaPseudoConfig },
    entries: {
      prim: config.colorPrimary, primdark: config.colorPrimaryDarker,
      sec: config.colorSecondary, secdark: config.colorSecondaryDarker,
      fb: config.colorFacebook, fbdark: config.colorFacebookDarker,
      success: config.colorSuccess, white: config.colorWhite,
      black: config.colorBlack, graynorm: config.colorGrayscaleNormal,
      graylight: config.bgColorGrayscaleLight, graymed: config.colorGrayscaleMedium,
      graydark: config.bgColorGrayscaleDark, overlay: config.bgColorOverlay,
      darkoverlay: config.bgColorOverlayDark,
    },
  },
  {
    config: { name: 'fw', property: 'font-weight' },
    entries: { n: 'normal', b: 'bold' },
  },
  {
    config: { name: 'talign', property: 'text-align', isResponsive: true },
    entries: { l: 'left', c: 'center', r: 'right' },
  },
  {
    config: { name: 'h', property: 'height', isResponsive: true },
    entries: { '100\%': '100%' },
  },
  {
    config: { name: 'ws', property: 'white-space' },
    entries: { nw: 'nowrap', n: 'normal' },
  },
];

loopUtils.forEach((loopUtil) => {
  zerocss.addLoopUtils(loopUtil.config, loopUtil.entries);
});


zerocss.addSimpleUtil('brad', 'small', 'border-radius', config.borderRadiusSmall, false);

zerocss.addSimpleUtil('brad', 'l\,small', 'border-top-left-radius', config.borderRadiusSmall, false);
zerocss.addSimpleUtil('brad', 'l\,small', 'border-bottom-left-radius', config.borderRadiusSmall, false);

zerocss.addSimpleUtil('brad', 'r\,small', 'border-top-right-radius', config.borderRadiusSmall, false);
zerocss.addSimpleUtil('brad', 'r\,small', 'border-bottom-right-radius', config.borderRadiusSmall, false);

zerocss.addSimpleUtil('brad', 'b\,small', 'border-bottom-left-radius', config.borderRadiusSmall, false);
zerocss.addSimpleUtil('brad', 'b\,small', 'border-bottom-right-radius', config.borderRadiusSmall, false);

zerocss.addSimpleUtil('brad', 'bl\,small', 'border-bottom-left-radius', config.borderRadiusSmall, false);

zerocss.addSimpleUtil('brad', 'br\,small', 'border-bottom-right-radius', config.borderRadiusSmall, false);


zerocss.addSimpleUtil('b', 'graylight', 'border', `1px solid ${config.borderColorGrayscaleLight}`);
zerocss.addSimpleUtil('b', 'graymedium', 'border', `1px solid ${config.borderColorGrayscaleMedium}`);

zerocss.addSimpleUtil('b', 'l\,graylight', 'border-left', `1px solid ${config.borderColorGrayscaleLight}`);
zerocss.addSimpleUtil('b', 'r\,graylight', 'border-right', `1px solid ${config.borderColorGrayscaleLight}`);
zerocss.addSimpleUtil('b', 'b\,graylight', 'border-bottom', `1px solid ${config.borderColorGrayscaleLight}`);
zerocss.addSimpleUtil('b', 't\,graylight', 'border-top', `1px solid ${config.borderColorGrayscaleLight}`);

zerocss.addSimpleUtil('b', 'h\,graylight', 'border-left', `1px solid ${config.borderColorGrayscaleLight}`);
zerocss.addSimpleUtil('b', 'h\,graylight', 'border-right', `1px solid ${config.borderColorGrayscaleLight}`);

zerocss.addSimpleUtil('b', 'h\,graymedium', 'border-left', `1px solid ${config.borderColorGrayscaleMedium}`);
zerocss.addSimpleUtil('b', 'h\,graymedium', 'border-right', `1px solid ${config.borderColorGrayscaleMedium}`);

zerocss.addSimpleUtil('b', 'l\,graymedium', 'border-left', `1px solid ${config.borderColorGrayscaleMedium}`);
zerocss.addSimpleUtil('b', 'r\,graymedium', 'border-right', `1px solid ${config.borderColorGrayscaleMedium}`);
zerocss.addSimpleUtil('b', 'b\,graymedium', 'border-bottom', `1px solid ${config.borderColorGrayscaleMedium}`);
zerocss.addSimpleUtil('b', 't\,graymedium', 'border-top', `1px solid ${config.borderColorGrayscaleMedium}`);

zerocss.addSimpleUtil('b', 't\,0', 'border-top', 'none');

zerocss.addSimpleUtil('w', 'init', 'width', 'initial', false);
zerocss.addSimpleUtil('maxw', '100\%', 'max-width', '100%', false);
zerocss.addSimpleUtil('ttrans', 'text-transform', 'u', 'uppercase', false);
zerocss.addSimpleUtil('bg', '0', 'background', 'none', false);
zerocss.addSimpleUtil('curs', 'p', 'cursor', 'pointer', false);
zerocss.addSimpleUtil('lst', '0', 'list-style-type', 'none', false);
zerocss.addSimpleUtil('ov', 'h', 'overflow', 'hidden');
zerocss.addSimpleUtil('tov', 'e', 'text-overflow', 'ellipsis', false);
zerocss.addSimpleUtil('clr', 'b', 'clear', 'both');
zerocss.addSimpleUtil('tsh', 'overlayemphasis', 'text-shadow', config.textShadowOverlay, false);

zerocss.addSimpleUtil('appear', '0', 'appearance', 'none', false);

zerocss.addSimpleUtil('m', 'h\,auto', 'margin-left', 'auto');
zerocss.addSimpleUtil('m', 'h\,auto', 'margin-right', 'auto');

zerocss.addSimpleUtil('m', 't\,-50', 'margin-top', '-50px');
zerocss.addSimpleUtil('m', 'b\,section', 'margin-bottom', config.marginBottomSection);

/* Uncommon pseudo suffixes */

zerocss.addSimpleUtil('bgc', 'graylight', 'background-color', config.bgColorGrayscaleLight,
  false, { '\\:odd': 'nth-child(odd)' });

/* Use 'is' for states that you manipulate in JS. Toggle on and off .is(hidden) for instance */
zerocss.addSimpleUtil('is', 'hidden', 'display', 'none', true);


zerocss.addSpacingHelperUtils([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 18, 20, 25,
  30, 40, 45, 50, 100], true);


/* ==========================================================================
   Utility classes based on loops
   ========================================================================== */

config.percentageWidths.forEach((percentageWidth) => {
  zerocss.addSimpleUtil('w', `${percentageWidth}\%`, 'width', `${percentageWidth}%`);
});

config.heights.forEach((height) => {
  zerocss.addSimpleUtil('h', height.toString(), 'height', height);
});

config.fontSizes.forEach((fontSize) => {
  zerocss.addSimpleUtil('fs', fontSize.toString(), 'font-size', fontSize);
});


/**
 * Reveal / Revealed
 *
 * In typical CSS, if we want to show a child when hovering a parent, we would have this:
 *
 * <div class="menu">
 *   <div class="submenu">
 *
 * .submenu { display: none }
 * .menu:hover .submenu { display: block }
 *
 * In our utility classes framework we use 'reveal' and 'revealed' to achieve the same effect:
 *
 * <div class="reveal(a,block):hfa">
 *   <div class="revealed(a)">
 *
 * The 'a' parameter of reveal is simply a name for a parent-child relationship. This way we can
 * apply this effect on multiple levels:
 *
 * <div class="reveal(a,block):hfa">
 *   <div class="revealed(a) reveal(b,block):hfa">
 *     <div class="reveal(b)">
 *
 * That's typically used for our navigation that has sub-sub-menus.
 */


let revealCode = '';

['a', 'b', 'c'].forEach((childLetter) => {
  revealCode += zerocss.getSimpleUtil('revealed', childLetter, 'display', 'none', true);

  ['block', 'inline'].forEach((displayValue) => {
    revealCode += zerocss.getSimpleUtil('reveal', `${childLetter}\,${displayValue}`, 'display', displayValue, false, { '\\:hfa': [
      `hover .revealed\\(${childLetter}\\)`,
      `focus .revealed\\(${childLetter}\\)`,
      `active .revealed\\(${childLetter}\\)`,
    ] });
  });
});


let output = zerocss.build();
output += `
${revealCode}

@media print {
  .dis\\(b\\)\\[print\\] {
    display: block !important;
  }

  .dis\\(0\\)\\[print\\] {
    display: none !important;
  }
}
`;

module.exports = { output };
