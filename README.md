# ZeroCSS

A CSS Utility Classes Generator.

[![Build Status](https://travis-ci.org/verekia/zerocss.svg?branch=master)](https://travis-ci.org/verekia/zerocss)

ZeroCSS is a tool to **generate your own CSS utility classes**. For instance it lets you generate classes like `class="c(primary)"` that you can use everywhere in your code to apply `color: [your primary color]` to elements. It is basically [Atomic CSS](http://acss.io/), with *less features*, but *more flexible class names*.

When to use ZeroCSS:
- To build a prototype very fast
- For a non-critical project like your blog or a personal project
- If you don't like Atomic CSS' class names, but really want to only use utility classes instead of writing CSS

I do not recommend using ZeroCSS for professional projects, since support is not guaranteed, and you will likely run into quirks that might be difficult to solve.

## What it looks like

```html
<div class="bgc(ddd) p(20) fl(r)[md-up] w(100%)[sm-down]">
  I'm a gray box with 20px padding, floating to the right on desktop, and full-width on mobile.
</div>
```

## Setup

Here is an [example](https://github.com/verekia/zerocss/tree/master/src/example) of setup to generate utility classes using ZeroCSS.

As you can see, the ZeroCSS API lets you create utility classes like this:
```javascript
{
  config: { name: 'fl', property: 'float', isResponsive: true },
  entries: { 0: 'none', l: 'left', r: 'right' },
},
```

Which will generate the following extract of code (double backslash removed for readability):

```css
[...]

@media (min-width: 992px) {
  .fl(r)[lg-up] {
    float: right !important;
  }
}

[...]
```

## Reusable Components

If you find yourself using some particular utility classes together often, you could combine them
on the back-end using a config file that you pass from your controller to your templating engine:

```
# components.yaml:
island: 'bgc(lightgray) brad(small) p(20)'

# Your controller:
// Read the YAML and pass its content to the rendering context as `component`

# sidebar.mustache:
<div class="{{ component.island }}">
```

## File Size

Atomic CSS has a tool called Atomizer that scans your project for the class names you actually use. Since ZeroCSS doesn't have such feature, all the generated class names end up in the CSS output file. This file can be quite big, particularly if you need a lot of responsive spacing utils. I built a whole website using ZeroCSS only, and the utils file was roughly 60kb (with no other CSS file needed), which is still quite reasonable to me.

If you want to trim down some unused CSS from your generated file, process it with [PurifyCSS](https://github.com/purifycss/purifycss).
