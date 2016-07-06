import ZeroCSS from './';

const zerocss = new ZeroCSS({ xs: 0, sm: 544, md: 768, lg: 992, xl: 1200 });

zerocss.addLoopUtils({ name: 'dis', property: 'display' }, {
  0: 'none',
  b: 'block',
  i: 'inline',
  ib: 'inline-block',
});

zerocss.addLoopUtils({ name: 'fl', property: 'float' }, {
  0: 'none',
  l: 'left',
  r: 'right',
});

zerocss.addLoopUtils({ name: 'h', property: 'height', pseudo: '' }, {
  12: '12px',
  14: '14px',
  16: '16px',
  '100%': '100%',
});

zerocss.addLoopUtils({ name: 'fs', property: 'font-size' }, {
  16: '16px',
  18: '18px',
  24: '24px',
});

const spacingValues = [1, 2, 3, 4, 5];

for (const s of spacingValues) {
  for (const type of [{ long: 'margin', short: 'm' }, { long: 'padding', short: 'p' }]) {
    for (const direction of [
      { short: 't', long: 'top' },
      { short: 'b', long: 'bottom' },
      { short: 'l', long: 'left' },
      { short: 'r', long: 'right' },
    ]) {
      zerocss.addSimpleUtil(type.short,
        `${direction.short}\,${s}`, `${type.long}-${direction.long}`, `${s}px`);
    }
  }
}

zerocss.build('../dist/zerocss.css');
zerocss.build('../dist/zerocss.min.css');
zerocss.build('../dist/_zerocss.scss');
