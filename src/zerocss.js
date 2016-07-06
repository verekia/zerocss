import _ from 'lodash';

class ZeroCSS {
  constructor(breakpoints) {
    this.breakpoints = [];
    _.forEach(breakpoints, (width, name) => {
      this.breakpoints.push({ name, width });
    });
    this.simpleUtils = [];
    this.loopUtils = [];
    this.registeredResponsiveUtils = [];
  }

  addSimpleUtil(util) {
    this.simpleUtils.push(util);
  }

  addLoopUtils(loopUtil) {
    this.loopUtils.push(loopUtil);
  }

  makeSimpleUtils() {
    let output = '';
    for (const util of this.simpleUtils) {
      output += this.makeOneUtil(util);
    }
    return output;
  }

  makeLoopUtils() {
    let output = '';
    _.forEach(this.loopUtils, (loopUtil) => {
      _.forEach(loopUtil.entries, (value, parensContent) => {
        output += this.makeOneUtil({
          name: loopUtil.config.name,
          parensContent,
          isResponsive: loopUtil.config.isResponsive || true,
          property: loopUtil.config.property,
          value,
          pseudo: loopUtil.config.pseudo,
        });
      });
    });
    return output;
  }

  makeResponsiveUtils() {
    let output = '\n';
    _.forEach(this.breakpoints, (breakpoint) => {
      output += `@media (min-width: ${breakpoint.width}) {\n`;
      _.forEach(this.registeredResponsiveUtils, (util) => {
        output += `  ${util.coreRuleStart}\\[${breakpoint.name}-up\\]${util.coreRuleEnd}\n`;
      });
      output += '}\n';
      output += `@media (max-width: ${breakpoint.width}) {\n`;
      _.forEach(this.registeredResponsiveUtils, (util) => {
        output += `  ${util.coreRuleStart}\\[${breakpoint.name}-down\\]${util.coreRuleEnd}\n`;
      });
      output += '}\n';
    });
    return output;
  }

  cssSelectorEscape(string) {
    return string.replace('%', '\\%').replace(',', '\\,');
  }

  buildPseudoSuffix(suffixShorthand, currentLetter) {
    let pseudoSuffix = '';
    let actualPseudoSelector = null;
    if (suffixShorthand) {
      if (currentLetter === 'h') {
        actualPseudoSelector = 'hover';
      } else if (currentLetter === 'f') {
        actualPseudoSelector = 'focus';
      } else if (currentLetter === 'a') {
        actualPseudoSelector = 'active';
      } else {
        throw new Error(`Pseudo-selector shorthand suffix not recognized: ${currentLetter}`);
      }
      pseudoSuffix = `\\:${suffixShorthand}:${actualPseudoSelector}`;
    }
    return pseudoSuffix;
  }

  assembleRule(name, escapedParensContent, property, value, pseudoSuffix, isResponsive) {
    let output = '';
    const coreRuleStart = `.${name}\\(${escapedParensContent}\\)${pseudoSuffix}`;
    const coreRuleEnd = ` { ${property}: ${value} !important }`;

    output += `${coreRuleStart}${coreRuleEnd}\n`;

    if (isResponsive && this.breakpoints.length === 0) {
      throw new Error('No responsive breakpoints defined. Use setRWDBreakpoints');
    }

    if (isResponsive) {
      this.registeredResponsiveUtils.push({ coreRuleStart, coreRuleEnd });
    }
    return output;
  }

  makeOneUtil(util) {
    let output = '';
    const escapedParensContent = this.cssSelectorEscape(util.parensContent);

    output += this.assembleRule(util.name, escapedParensContent, util.property,
      util.value, '', util.isResponsive);
    if (util.pseudo) {
      for (const letter of util.pseudo) {
        output += this.assembleRule(util.name, escapedParensContent, util.property,
          util.value, this.buildPseudoSuffix(util.pseudo, letter), util.isResponsive);
      }
    }
    return output;
  }

  assembleAllRules() {
    this.output = '';
    this.output += this.makeSimpleUtils();
    this.output += this.makeLoopUtils();
    if (this.registeredResponsiveUtils.length > 0) {
      this.output += this.makeResponsiveUtils();
    }
  }
}

export default ZeroCSS;
