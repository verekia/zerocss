const ZeroCSS = require('./lib');

const zerocss = new ZeroCSS({ xs: 0, sm: 544, md: 768, lg: 992, xl: 1200 });

zerocss.addSimpleUtil('myutil', 'coolshadow', 'box-shadow', '1px 1px rgba(0, 0, 0, 0.2)', true);

zerocss.build('mycss.css');
