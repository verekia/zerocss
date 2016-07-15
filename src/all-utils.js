import ZeroCSS from './';

const zerocss = new ZeroCSS({ xs: 0, sm: 544, md: 768, lg: 992, xl: 1200 });

zerocss.addLoopUtils({ name: 'dis', property: 'display' }, {
  0: 'none', b: 'block', i: 'inline', ib: 'inline-block', t: 'table', tc: 'table-cell',
});

zerocss.addLoopUtils({ name: 'fl', property: 'float' }, {
  0: 'none', l: 'left', r: 'right',
});

zerocss.addLoopUtils({ name: 'pos', property: 'position' }, {
  a: 'absolute', f: 'fixed', r: 'relative', s: 'static',
});

zerocss.addSimpleUtil('top', '0', 'top', 0);
zerocss.addSimpleUtil('bottom', '0', 'bottom', 0);
zerocss.addSimpleUtil('left', '0', 'left', 0);
zerocss.addSimpleUtil('right', '0', 'right', 0);

zerocss.addLoopUtils({ name: 'valign', property: 'vertical-align' }, {
  m: 'middle', t: 'top',
});

zerocss.addLoopUtils({ name: 'z', property: 'z-index' }, {
  '-1': '-1', 0: 0, 1: '1', 2: '2', 10: '10',
});

zerocss.addSimpleUtil('lh', '0', 'line-height', '0');

zerocss.addLoopUtils({ name: 'op', property: 'opacity' }, {
  0: '0', 1: '1',
});

zerocss.addLoopUtils({ name: 'deco', property: 'text-decoration', pseudo: 'hfa' }, {
  0: 'none', u: 'underline',
});

zerocss.addSpacingHelperUtils([0, 1, 2]);

zerocss.build('../dist/zerocss.css');
zerocss.build('../dist/zerocss.min.css');
zerocss.build('../dist/_zerocss.scss');
