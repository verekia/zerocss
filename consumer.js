const zerocss = require('./lib');

zerocss.setBreakpoints([
  { name: 'xs', width: 0 },
  { name: 'sm', width: 544 },
  { name: 'md', width: 768 },
  { name: 'lg', width: 992 },
  { name: 'xl', width: 1200 },
]);


// Simple Utils

zerocss.addSimpleUtil('dis', 'b', 'display', 'block');
zerocss.addSimpleUtil('dis', 'i', 'display', 'inline');
zerocss.addSimpleUtil('dis', 'ib', 'display', 'inline-block');
zerocss.addSimpleUtil('c', 'reddark', 'color', 'reddark', null, 'hfa');
zerocss.addSimpleUtil('fl', 'l', 'float', 'left', true);


// Loop Utils

zerocss.addLoopUtils({
  name: 'h',
  property: 'height',
  isResponsive: false,
  pseudo: '' }, [
    { parensContent: '12', value: '12px' },
    { parensContent: '14', value: '14px' },
    { parensContent: '16', value: '16px' },
    { parensContent: '100%', value: '100%' },
  ]
);

zerocss.addLoopUtils({
  name: 'fs',
  property: 'font-size',
  isResponsive: false,
  pseudo: 'hfa' }, [
    { parensContent: '16', value: '16px' },
    { parensContent: '18', value: '18px' },
    { parensContent: '24', value: '24px' },
  ]
);

const spacingValues = [1, 2, 3, 4, 5];

for (const s of spacingValues) {
  for (const type of [{ long: 'margin', short: 'm' }, { long: 'padding', short: 'p' }]) {
    zerocss.addSimpleUtil(type.short, `t\\,${s}`, `${type.long}-top`, `${s}px`, true);
    zerocss.addSimpleUtil(type.short, `b\\,${s}`, `${type.long}-bottom`, `${s}px`, true);
    zerocss.addSimpleUtil(type.short, `l\\,${s}`, `${type.long}-left`, `${s}px`, true);
    zerocss.addSimpleUtil(type.short, `p\\,${s}`, `${type.long}-right`, `${s}px`, true);
  }
}


zerocss.build(null, true);
