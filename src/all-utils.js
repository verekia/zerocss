import ZeroCSS from './';

const zerocss = new ZeroCSS([
  { name: 'xs', width: 0 },
  { name: 'sm', width: 544 },
  { name: 'md', width: 768 },
  { name: 'lg', width: 992 },
  { name: 'xl', width: 1200 },
]);

zerocss.addLoopUtils({ name: 'dis', property: 'display', isResponsive: false }, [
  { b: 'block' },
  { i: 'inline' },
  { ib: 'inline-block' },
  { 0: 'none' },
]);

zerocss.addLoopUtils({ name: 'fl', property: 'float', isResponsive: false }, [
  { l: 'left' },
  { r: 'right' },
  { 0: 'none' },
]);

zerocss.addLoopUtils({ name: 'h', property: 'height', isResponsive: false, pseudo: '' }, [
  { 12: '12px' },
  { 14: '14px' },
  { 16: '16px' },
  { '100%': '100%' },
]);

zerocss.addLoopUtils({ name: 'fs', property: 'font-size', isResponsive: false }, [
  { 16: '16px' },
  { 18: '18px' },
  { 24: '24px' },
]);

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
        `${direction.short}\,${s}`, `${type.long}-${direction.long}`, `${s}px`, false);
    }
  }
}


zerocss.build('../dist/zerocss.css');
zerocss.build('../dist/zerocss.min.css');
zerocss.build('../dist/_zerocss.scss');
