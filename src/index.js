import fs from 'fs-extra';
import _ from 'lodash';

class ZeroCSS {
  constructor(breakpoints) {
    this.breakpoints = [];
    _.forEach(breakpoints, (width, name) => {
      this.breakpoints.push({ name, width });
    });
    this.simpleUtils = [];
    this.loopUtils = [];
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
          isResponsive: loopUtil.config.isResponsive,
          property: loopUtil.config.property,
          value,
          pseudo: loopUtil.config.pseudo,
        });
      });
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
      for (const breakpoint of this.breakpoints) {
        /* eslint-disable max-len */
        output += `@media (min-width: ${breakpoint.width}) { ${coreRuleStart}\\[${breakpoint.name}-up\\]${coreRuleEnd} }\n`;
        output += `@media (max-width: ${breakpoint.width}) { ${coreRuleStart}\\[${breakpoint.name}-down\\]${coreRuleEnd} }\n`;
        /* eslint-enable max-len */
      }
    }
    return output;
  }

  makeOneUtil(util) {
    let output = '';
    const escapedParensContent = this.cssSelectorEscape(util.parensContent);

    if (util.pseudo) {
      for (const letter of util.pseudo) {
        output += this.assembleRule(
          util.name,
          escapedParensContent,
          util.property,
          util.value,
          this.buildPseudoSuffix(util.pseudo, letter),
          util.isResponsive
        );
      }
    } else {
      output += this.assembleRule(
        util.name,
        escapedParensContent,
        util.property,
        util.value,
        '',
        util.isResponsive
      );
    }
    return output;
  }

  addSimpleUtil(name, parensContent, property, value, isResponsive, pseudo) {
    this.simpleUtils.push({
      name,
      parensContent,
      isResponsive,
      property,
      value,
      pseudo,
    });
  }

  addLoopUtils(config, entries) {
    this.loopUtils.push({ config, entries });
  }

  build(writePath, isVerbose) {
    if (!this.output) {
      this.output = '';
      this.output += this.makeSimpleUtils();
      this.output += this.makeLoopUtils();
    }

    if (writePath) {
      fs.outputFileSync(`${__dirname}/${writePath}`, this.output);
    }

    if (isVerbose) {
      /* eslint-disable no-console */
      console.log(`\n ${this.output}`);
      /* eslint-enable no-console */
    }
    return this.output;
  }
}

export default ZeroCSS;
