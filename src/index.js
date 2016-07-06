import fs from 'fs-extra';
import path from 'path';
import ZeroCSS from './zerocss';

/* Public interface to the ZeroCSS library */

export default class {
  constructor(breakpoints) {
    this.zerocss = new ZeroCSS(breakpoints);
  }

  addSimpleUtil(name, parensContent, property, value, isResponsive = true, pseudo) {
    this.zerocss.addSimpleUtil({ name, parensContent, isResponsive, property, value, pseudo });
  }

  addLoopUtils(config, entries) {
    this.zerocss.addLoopUtils({ config, entries });
  }

  addSpacingHelperUtils(spacingValues, isResponsive = false) {
    for (const s of spacingValues) {
      for (const type of [{ long: 'margin', short: 'm' }, { long: 'padding', short: 'p' }]) {
        this.addSimpleUtil(type.short, `t\,${s}`, `${type.long}-top`, `${s}px`, isResponsive);
        this.addSimpleUtil(type.short, `b\,${s}`, `${type.long}-bottom`, `${s}px`, isResponsive);
        this.addSimpleUtil(type.short, `l\,${s}`, `${type.long}-left`, `${s}px`, isResponsive);
        this.addSimpleUtil(type.short, `r\,${s}`, `${type.long}-right`, `${s}px`, isResponsive);

        this.addSimpleUtil(type.short, `t\,${s}\%`, `${type.long}-top`, `${s}%`, isResponsive);
        this.addSimpleUtil(type.short, `b\,${s}\%`, `${type.long}-bottom`, `${s}%`, isResponsive);
        this.addSimpleUtil(type.short, `l\,${s}\%`, `${type.long}-left`, `${s}%`, isResponsive);
        this.addSimpleUtil(type.short, `r\,${s}\%`, `${type.long}-right`, `${s}%`, isResponsive);

        this.addSimpleUtil(type.short, `v\,${s}`, `${type.long}-top`, `${s}px`, isResponsive);
        this.addSimpleUtil(type.short, `v\,${s}`, `${type.long}-bottom`, `${s}px`, isResponsive);
        this.addSimpleUtil(type.short, `h\,${s}`, `${type.long}-left`, `${s}px`, isResponsive);
        this.addSimpleUtil(type.short, `h\,${s}`, `${type.long}-right`, `${s}px`, isResponsive);

        this.addSimpleUtil(type.short, `v\,${s}\%`, `${type.long}-top`, `${s}%`, isResponsive);
        this.addSimpleUtil(type.short, `v\,${s}\%`, `${type.long}-bottom`, `${s}%`, isResponsive);
        this.addSimpleUtil(type.short, `h\,${s}\%`, `${type.long}-left`, `${s}%`, isResponsive);
        this.addSimpleUtil(type.short, `h\,${s}\%`, `${type.long}-right`, `${s}%`, isResponsive);

        this.addSimpleUtil(type.short, `${s}`, `${type.long}`, `${s}px`, isResponsive);
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
