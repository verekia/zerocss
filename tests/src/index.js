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

test('one-pseudo-hover', (t) => {
  const zerocss = new ZeroCSS();

  const expected = stripIndent`
  .name\\(parenscontent\\) { property: value !important }
  .name\\(parenscontent\\)\\:h:hover { property: value !important }`;

  zerocss.addSimpleUtil('name', 'parenscontent', 'property', 'value', false, 'h');

  t.equal(zerocss.build(), `${expected}\n`);
  t.end();
});

test('one-pseudo-active', (t) => {
  const zerocss = new ZeroCSS();

  const expected = stripIndent`
  .name\\(parenscontent\\) { property: value !important }
  .name\\(parenscontent\\)\\:a:active { property: value !important }`;

  zerocss.addSimpleUtil('name', 'parenscontent', 'property', 'value', false, 'a');

  t.equal(zerocss.build(), `${expected}\n`);
  t.end();
});

test('one-pseudo-focus', (t) => {
  const zerocss = new ZeroCSS();

  const expected = stripIndent`
  .name\\(parenscontent\\) { property: value !important }
  .name\\(parenscontent\\)\\:f:focus { property: value !important }`;

  zerocss.addSimpleUtil('name', 'parenscontent', 'property', 'value', false, 'f');

  t.equal(zerocss.build(), `${expected}\n`);
  t.end();
});

test('one-pseudo-badpseudo', (t) => {
  const zerocss = new ZeroCSS();
  /* eslint-disable no-useless-escape */
  const expectedRegExp = /Pseudo-selector shorthand suffix not recognized\: z/;
  /* eslint-enable no-useless-escape */
  zerocss.addSimpleUtil('name', 'parenscontent', 'property', 'value', false, 'z');

  t.throws(() => { zerocss.build(); }, expectedRegExp);
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

  zerocss.addSimpleUtil('name', 'parenscontent', 'property', 'value', false, 'hfa');

  t.equal(zerocss.build(), `${expected}\n`);
  t.end();
});
