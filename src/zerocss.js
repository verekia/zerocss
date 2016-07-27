import { oneLine } from 'common-tags';
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

  getSimpleUtil(util) {
    return this.makeOneUtil(util);
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
          isResponsive: loopUtil.config.isResponsive,
          property: loopUtil.config.property,
          value,
          pseudoConfig: loopUtil.config.pseudoConfig,
        });
      });
    });
    return output;
  }

  makeResponsiveUtils() {
    let output = '\n';
    let breakpointIndex = 0;

    /*
    * [xs] case
    */

    output += `@media (max-width: ${this.breakpoints[1].width - 1}px) {\n`;
    _.forEach(this.registeredResponsiveUtils, (util) => {
      output += `  ${util.coreRuleStart}\\[${this.breakpoints[0].name}\\]${util.coreRuleEnd}\n`;
    });
    output += '}\n';

    _.forEach(this.breakpoints, (breakpoint) => {
      /*
       * [*-up] and [*-down] cases
       * @media (min-width: -px)
       * @media (max-width: -px)
       *
       * The breakpoints array gets its first item dropped because:
       * 'xs-down' => nothing, [xs] should be used instead
       * 'xs-up'   => nothing, general case should be used instead
       *
       * We also avoid the last loop entirely because:
       * 'xl-down' => nothing, general case should be used instead
       * 'xl-up'   => nothing, [xl] should be used instead
       */
      if (breakpointIndex < this.breakpoints.length - 1 && breakpointIndex > 0) {
        output += `@media (min-width: ${breakpoint.width}px) {\n`;
        _.forEach(this.registeredResponsiveUtils, (util) => {
          output += `  ${util.coreRuleStart}\\[${breakpoint.name}-up\\]${util.coreRuleEnd}\n`;
        });
        output += '}\n';
        output += `@media (max-width: ${this.breakpoints[breakpointIndex + 1].width - 1}px) {\n`;
        _.forEach(this.registeredResponsiveUtils, (util) => {
          output += `  ${util.coreRuleStart}\\[${breakpoint.name}-down\\]${util.coreRuleEnd}\n`;
        });
        output += '}\n';

        /*
        * [sm], [md], [lg] cases
        * @media (min-width: -px) and (max-width: -px)
        */

        output += oneLine`
          @media (min-width: ${breakpoint.width}px)
          and (max-width: ${this.breakpoints[breakpointIndex + 1].width - 1}px) {`;
        output += '\n';
        _.forEach(this.registeredResponsiveUtils, (util) => {
          output += `  ${util.coreRuleStart}\\[${breakpoint.name}\\]${util.coreRuleEnd}\n`;
        });
        output += '}\n';
      }
      breakpointIndex++;
    });

    /*
    * [xl] case
    */

    output += `@media (min-width: ${this.breakpoints[this.breakpoints.length - 1].width}px) {\n`;
    _.forEach(this.registeredResponsiveUtils, (util) => {
      output += `  ${util.coreRuleStart}\\[${this.breakpoints[this.breakpoints.length
        - 1].name}\\]${util.coreRuleEnd}\n`;
    });
    output += '}\n';

    return output;
  }

  cssSelectorEscape(string) {
    return string.replace('%', '\\%').replace(',', '\\,');
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
    if (util.pseudoConfig && _.isObject(util.pseudoConfig)) {
      _.forEach(util.pseudoConfig, (pseudoContent, pseudoShorthand) => {
        if (_.isArray(pseudoContent)) {
          pseudoContent.forEach((actualPseudo) => {
            output += this.assembleRule(util.name, escapedParensContent, util.property,
              util.value, `\\:${pseudoShorthand}:${actualPseudo}`, util.isResponsive);
          });
        } else {
          output += this.assembleRule(util.name, escapedParensContent, util.property,
            util.value, `\\:${pseudoShorthand}:${pseudoContent}`, util.isResponsive);
        }
      });
    } else {
      if (_.isString(util.pseudoConfig)) {
        throw new Error(`The given pseudo suffix parameter is not an object: ${util.pseudoConfig}`);
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
