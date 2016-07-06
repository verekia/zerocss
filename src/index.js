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
