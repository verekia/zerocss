import fs from 'fs-extra';

class ZeroCSS {

  constructor(breakpoints) {
    this.breakpoints = breakpoints;
    this.simpleUtils = [];
    this.loopUtils = [];
  }

  setBreakpoints(breakpoints) {
    this.breakpoints = breakpoints;
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
    for (const loopUtil of this.loopUtils) {
      const loopConfig = loopUtil.config;
      const loopEntries = loopUtil.entries;
      for (const loopEntry of loopEntries) {
        output += this.makeOneUtil({
          name: loopConfig.name,
          parensContent: loopEntry.parensContent,
          isResponsive: loopConfig.isResponsive,
          property: loopConfig.property,
          value: loopEntry.value,
          pseudo: loopConfig.pseudo,
        });
      }
    }
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
    let output = '';
    output += this.makeSimpleUtils();
    output += this.makeLoopUtils();

    if (writePath) {
      fs.outputFileSync(`${__dirname}/${writePath}`, output);
    }

    if (isVerbose) {
      /* eslint-disable no-console */
      console.log(`\n ${output}`);
      /* eslint-enable no-console */
    }

    return output;
  }
}

export default new ZeroCSS();
