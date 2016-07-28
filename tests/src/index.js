import { stripIndent } from 'common-tags';
const test = require('tape');
const ZeroCSS = require(`${__dirname}/../../lib`);

test('simple', (t) => {
  const zerocss = new ZeroCSS();

  const expected = '.simple\\(parenscontent\\) { property: value !important }\n';
  zerocss.addSimpleUtil('simple', 'parenscontent', 'property', 'value', false);

  t.equal(zerocss.build(), expected);
  t.end();
});

test('get-simple', (t) => {
  const zerocss = new ZeroCSS();
  const expected = '.simple\\(parenscontent\\) { property: value !important }\n';
  t.equal(zerocss.getSimpleUtil('simple', 'parenscontent', 'property', 'value', false), expected);
  t.end();
});

test('one-pseudo', (t) => {
  const zerocss = new ZeroCSS();

  const expected = stripIndent`
  .name\\(parenscontent\\) { property: value !important }
  .name\\(parenscontent\\)\\:toto:tata { property: value !important }`;

  zerocss.addSimpleUtil('name', 'parenscontent', 'property', 'value', false,
    { '\\:toto': ['tata'] });

  t.equal(zerocss.build(), `${expected}\n`);
  t.end();
});

test('one-pseudo-no-base', (t) => {
  const zerocss = new ZeroCSS();

  const expected = stripIndent`
  .name\\(parenscontent\\)\\:toto:tata { property: value !important }`;

  zerocss.addSimpleUtil('name', 'parenscontent', 'property', 'value', false,
    { '\\:toto': ['tata'] }, false);

  t.equal(zerocss.build(), `${expected}\n`);
  t.end();
});

test('multi-pseudo', (t) => {
  const zerocss = new ZeroCSS();

  const expected = stripIndent`
  .name\\(parenscontent\\) { property: value !important }
  .name\\(parenscontent\\)\\:hfa:hover { property: value !important }
  .name\\(parenscontent\\)\\:hfa:focus { property: value !important }
  .name\\(parenscontent\\)\\:hfa:active { property: value !important }
  `;

  zerocss.addSimpleUtil('name', 'parenscontent', 'property', 'value', false,
    { '\\:hfa': ['hover', 'focus', 'active'] });

  t.equal(zerocss.build(), `${expected}\n`);
  t.end();
});

test('multi-pseudo-multi-names', (t) => {
  const zerocss = new ZeroCSS();

  const expected = stripIndent`
  .name\\(parenscontent\\) { property: value !important }
  .name\\(parenscontent\\)\\:hfa:hover { property: value !important }
  .name\\(parenscontent\\)\\:hfa:focus { property: value !important }
  .name\\(parenscontent\\)\\:toto:titi { property: value !important }
  .name\\(parenscontent\\):tutu { property: value !important }
  .name\\(parenscontent\\):tete { property: value !important }
  `;

  zerocss.addSimpleUtil('name', 'parenscontent', 'property', 'value', false,
    { '\\:hfa': ['hover', 'focus'], '\\:toto': 'titi', '': ['tutu', 'tete'] });

  t.equal(zerocss.build(), `${expected}\n`);
  t.end();
});

test('pseudo-bad-param', (t) => {
  const zerocss = new ZeroCSS();
  /* eslint-disable no-useless-escape */
  const expectedRegExp = /The given pseudo suffix parameter is not an object\: abc/;
  /* eslint-enable no-useless-escape */
  zerocss.addSimpleUtil('name', 'parenscontent', 'property', 'value', false, 'abc');

  t.throws(() => { zerocss.build(); }, expectedRegExp);
  t.end();
});

test('px-cast-simple', (t) => {
  const zerocss = new ZeroCSS();

  zerocss.addSimpleUtil('test', '0num', 'test', 0, false);
  zerocss.addSimpleUtil('test', '0str', 'test', '0', false);
  zerocss.addSimpleUtil('test', '1str', 'test', '1', false);
  zerocss.addSimpleUtil('test', '1num', 'test', 1, false);

  const expected = stripIndent`
  .test\\(0num\\) { test: 0 !important }
  .test\\(0str\\) { test: 0 !important }
  .test\\(1str\\) { test: 1 !important }
  .test\\(1num\\) { test: 1px !important }
  `;

  t.equal(zerocss.build(), `${expected}\n`);
  t.end();
});

test('px-cast-loop', (t) => {
  const zerocss = new ZeroCSS();

  zerocss.addLoopUtils({ name: 'test', property: 'test', isResponsive: false }, {
    '0num': 0, '0str': '0', '1str': '1', '1num': 1,
  });

  const expected = stripIndent`
  .test\\(0num\\) { test: 0 !important }
  .test\\(0str\\) { test: 0 !important }
  .test\\(1str\\) { test: 1 !important }
  .test\\(1num\\) { test: 1px !important }
  `;

  t.equal(zerocss.build(), `${expected}\n`);
  t.end();
});
