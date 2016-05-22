const ZeroCSS = require('./lib');

const zerocss = new ZeroCSS([
  { name: 'xs', width: 0 },
  { name: 'sm', width: 544 },
  { name: 'md', width: 768 },
  { name: 'lg', width: 992 },
  { name: 'xl', width: 1200 },
]);

zerocss.addSimpleUtil('myutil', 'coolshadow', 'box-shadow', '1px 1px rgba(0, 0, 0, 0.2)', true);

zerocss.build(null, true);
