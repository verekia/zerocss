const test = require('tape');
const ZeroCSS = require(`${__dirname}/../../lib`);

test('simple', (t) => {
  const zerocss = new ZeroCSS();

  const expected = '.simple\\(parenscontent\\) { property: value !important }\n';
  zerocss.addSimpleUtil('simple', 'parenscontent', 'property', 'value');

  t.equal(zerocss.build(), expected);
  t.end();
});

test('one-pseudo-hover', (t) => {
  const zerocss = new ZeroCSS();

  const expected = '.name\\(parenscontent\\)\\:h:hover { property: value !important }\n';
  zerocss.addSimpleUtil('name', 'parenscontent', 'property', 'value', null, 'h');

  t.equal(zerocss.build(), expected);
  t.end();
});

test('one-pseudo-active', (t) => {
  const zerocss = new ZeroCSS();

  const expected = '.name\\(parenscontent\\)\\:a:active { property: value !important }\n';
  zerocss.addSimpleUtil('name', 'parenscontent', 'property', 'value', null, 'a');

  t.equal(zerocss.build(), expected);
  t.end();
});

test('one-pseudo-focus', (t) => {
  const zerocss = new ZeroCSS();

  const expected = '.name\\(parenscontent\\)\\:f:focus { property: value !important }\n';
  zerocss.addSimpleUtil('name', 'parenscontent', 'property', 'value', null, 'f');

  t.equal(zerocss.build(), expected);
  t.end();
});

test('one-pseudo-badpseudo', (t) => {
  const zerocss = new ZeroCSS();
  /* eslint-disable no-useless-escape */
  const expectedRegExp = /Pseudo-selector shorthand suffix not recognized\: z/;
  /* eslint-enable no-useless-escape */
  zerocss.addSimpleUtil('name', 'parenscontent', 'property', 'value', null, 'z');

  t.throws(() => { zerocss.build(); }, expectedRegExp);
  t.end();
});

test('multi-pseudo-badpseudo', (t) => {
  const zerocss = new ZeroCSS();

  /* eslint-disable max-len */
  const expected = '.name\\(parenscontent\\)\\:hfa:hover { property: value !important }\n.name\\(parenscontent\\)\\:hfa:focus { property: value !important }\n.name\\(parenscontent\\)\\:hfa:active { property: value !important }\n';
  /* eslint-enable max-len */
  zerocss.addSimpleUtil('name', 'parenscontent', 'property', 'value', null, 'hfa');

  t.equal(zerocss.build(), expected);
  t.end();
});
