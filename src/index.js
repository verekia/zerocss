import fs from 'fs-extra';
import path from 'path';
import ZeroCSS from './zerocss';
import _ from 'lodash';

/* Public interface to the ZeroCSS library */

export default class {
  constructor(breakpoints) {
    this.zerocss = new ZeroCSS(breakpoints);
  }

  castUnitlessToPx(value) {
    /*
     * You can use JavaScript numbers for all pixels values but remmeber to quote
     * numbers different than 0 for properties like z-index or opacity.
     * 0 => 0
     * 123 => 123px
     * '0' => 0
     * '123' => 123
     */
    let strValue;
    if (typeof value === 'number') {
      if (value === 0) {
        strValue = '0';
      } else {
        strValue = `${value.toString()}px`;
      }
    } else {
      strValue = value;
    }
    return strValue;
  }

  addSimpleUtil(name, parensContent, property, value, isResponsive = true, pseudoConfig,
    pseudoBase = true) {
    this.zerocss.addSimpleUtil({ name, parensContent, isResponsive, property,
      value: this.castUnitlessToPx(value), pseudoConfig, pseudoBase });
  }

  getSimpleUtil(name, parensContent, property, value, isResponsive = true, pseudoConfig,
    pseudoBase = true) {
    return this.zerocss.getSimpleUtil({ name, parensContent, isResponsive, property,
      value: this.castUnitlessToPx(value), pseudoConfig, pseudoBase });
  }

  addLoopUtils(rawConfig, rawEntries) {
    const config = _.cloneDeep(rawConfig);
    const entries = {};
    config.isResponsive = config.isResponsive === true; // false is default
    config.pseudoBase = config.pseudoBase !== false; // true is default
    _.forOwn(rawEntries, (value, key) => {
      entries[key] = this.castUnitlessToPx(value);
    });
    this.zerocss.addLoopUtils({ config, entries });
  }

  addSpacingHelperUtils(spacingValues, isResponsive = false) {
    for (const s of spacingValues) {
      for (const type of [{ long: 'margin', short: 'm' }, { long: 'padding', short: 'p' }]) {
        this.addSimpleUtil(type.short, `t\,${s}`, `${type.long}-top`, s, isResponsive);
        this.addSimpleUtil(type.short, `b\,${s}`, `${type.long}-bottom`, s, isResponsive);
        this.addSimpleUtil(type.short, `l\,${s}`, `${type.long}-left`, s, isResponsive);
        this.addSimpleUtil(type.short, `r\,${s}`, `${type.long}-right`, s, isResponsive);

        this.addSimpleUtil(type.short, `t\,${s}\%`, `${type.long}-top`, `${s}%`, isResponsive);
        this.addSimpleUtil(type.short, `b\,${s}\%`, `${type.long}-bottom`, `${s}%`, isResponsive);
        this.addSimpleUtil(type.short, `l\,${s}\%`, `${type.long}-left`, `${s}%`, isResponsive);
        this.addSimpleUtil(type.short, `r\,${s}\%`, `${type.long}-right`, `${s}%`, isResponsive);

        this.addSimpleUtil(type.short, `v\,${s}`, `${type.long}-top`, s, isResponsive);
        this.addSimpleUtil(type.short, `v\,${s}`, `${type.long}-bottom`, s, isResponsive);
        this.addSimpleUtil(type.short, `h\,${s}`, `${type.long}-left`, s, isResponsive);
        this.addSimpleUtil(type.short, `h\,${s}`, `${type.long}-right`, s, isResponsive);

        this.addSimpleUtil(type.short, `v\,${s}\%`, `${type.long}-top`, `${s}%`, isResponsive);
        this.addSimpleUtil(type.short, `v\,${s}\%`, `${type.long}-bottom`, `${s}%`, isResponsive);
        this.addSimpleUtil(type.short, `h\,${s}\%`, `${type.long}-left`, `${s}%`, isResponsive);
        this.addSimpleUtil(type.short, `h\,${s}\%`, `${type.long}-right`, `${s}%`, isResponsive);

        this.addSimpleUtil(type.short, `${s}`, `${type.long}`, s, isResponsive);
        this.addSimpleUtil(type.short, `${s}\%`, `${type.long}`, `${s}%`, isResponsive);
      }
    }
  }

  build(writePath, isVerbose) {
    if (!this.zerocss.output) {
      this.zerocss.assembleAllRules();
    }

    if (writePath) {
      const appDir = path.dirname(require.main.filename);
      fs.outputFileSync(`${appDir}/${writePath}`, this.zerocss.output);
    }

    if (isVerbose) {
      /* eslint-disable no-console */
      console.log(`\n ${this.zerocss.output}`);
      /* eslint-enable no-console */
    }
    return this.zerocss.output;
  }
}
