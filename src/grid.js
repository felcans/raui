import globalRegister from './globalRegister';
import { sized } from './watch-size';

let el;
function sizer() {
  if (!el) {
    el = document.createElement('div');
    document.body.appendChild(el);
  }
  return el;
}

const defaults = {
  tiny: {
    units: [ 2, 3, 4, 5, 6, 8 ],
    max: '0',
    value: 0
  },
  xsmall: {
    units: [ 2, 3, 4, 5, 6, 8, 10, 12 ],
    max: '20em',
    prefix: 'xs',
    value: 10
  },
  small: {
    units: [ 2, 3, 4, 5, 6, 8, 10, 12 ],
    max: '36em',
    value: 20
  },
  medium: {
    units: [ 2, 3, 4, 5, 6, 8, 10, 12 ],
    max: '48em',
    value: 30
  },
  large: {
    units: [ 2, 3, 4, 5, 6, 8, 10, 12, 20, 24 ],
    max: '64em',
    value: 40
  },
  xlarge: {
    units: [ 2, 3, 4, 5, 6, 8, 10, 12, 20, 24, 32 ],
    max: '100em',
    value: 50
  },
  ginormous: {
    units: [ 2, 3, 4, 5, 6, 8, 10, 12, 20, 24, 32, 64 ],
    max: '150em',
    value: 60
  }
}

const regexps = { 'grid grid-root': /\bgrid grid-root\b/g };
const spaces = /\s+/g;
export function grid(node, options) {
  const ctx = this.getContext(node);
  const owner = this;
  let points;
  let opts = options || {};
  let breaks;

  function resize(size) {
    if (!opts.type || opts.type === 'class') {
      let match, max = -1;
      for (const k in points) {
        if (points[k] <= size) {
          regexps[k].lastIndex = -1;
          if (points[k] > max) {
            match = k;
            max = points[k];
          }
        }
        node.className = node.className.replace(regexps[k], '').trim();
      }

      if (!match) return;

      if (!regexps[match].test(node.className)) node.className += ` ${match}`;

      if (opts.value) ctx.set(opts.value, breaks[match].value);
      if (opts.name) ctx.set(opts.name, match);

      node.className = node.className.replace(spaces, ' ');
    }
  }

  function settings() {
    const s = sizer();
    breaks = owner.get('@style.break') || defaults;
    points = {};
    for (const k in breaks) {
      s.style.width = breaks[k].max;
      points[k] = s.clientWidth;
      if (!regexps[k]) regexps[k] = new RegExp(`\\b${k}\\b`, 'g');
    }
    s.style.width = 0;
    resize(node.clientWidth);
  }

  const observer = this.observe('@style.break', settings, { init: false });
  const listener = ctx.observe('@local.width', resize, { init: false });
  const watcher = sized.call(this, node, { clientWidth: '@local.width' });

  node.className += ' grid grid-root';
  if (opts.immediate) settings();
  else requestAnimationFrame(settings);

  return {
    update(options) {
      // TODO: if type changes, undo whatever the original did first
      opts = options || {};
      requestAnimationFrame(() => resize(node.clientWidth));
    },
    teardown() {
      node.className = node.className.replace(regexps['grid grid-root'], '').trim();
      listener.cancel();
      observer.cancel();
      watcher.teardown();
    }
  };
}

export function style(data, optDefaults) {
  const defs = data('raui.grid.break') || optDefaults || defaults;
  const wrappers = (data('raui.grid.wrappers') || ['.row-wrap > ', '.row-wrap > .row-wrap > ']).slice();
  wrappers.unshift('');

  let out = `.row > * { position: relative; width: 100%; transition-duration: 0.2s; transition-timing-function: ease-in-out; transition-property: padding, margin; box-sizing: border-box; }
.grid { display: block; }
.grid .row { display: flex; flex-wrap: wrap; min-height: fit-content; width: 100%; }
.grid .row.row-pad > * { padding: ${data('raui.grid.padding') || '0.5em'}; }
.grid .row > .pad { display: flex; flex-direction: column; padding: ${data('raui.grid.padding') || '0.5em'}; box-sizing: border-box; }`;

  let str;

  const points = Object.keys(defs).map(k => (defs[k].key = k) && defs[k]);
  points.sort((l, r) => l.value > r.value ? 1 : l.value < r.value ? -1 : 0);
  const greater = {};


  points.reverse().reduce((a, c) => {
    a.push(c.key);
    greater[c.key] = a.slice();
    return a;
  }, []);

  let rows = '', cols = '';
  points.reverse().forEach(size => {
    const name = size.prefix || size.key[0];

    size.units.forEach(u => {
      cols += `
${greater[size.key].map(s => wrappers.map(w => `.${s} > ${w}.${name}1, .${s} > ${w}.row > .${name}1, .${s} .${name}-n1, .${s} .row-${name}-n1 > *`).join(', ')).join(', ')} { display: ${data('raui.grid.display') || 'inline-block'}; width: 100%; flex-grow: 0; flex-shrink: 0; }
${greater[size.key].map(s => wrappers.map(w => `.${s} > ${w}.${name}0, .${s} > ${w}.row > .${name}0, .${s} .${name}-n0, .${s} .row-${name}-n0 > *`).join(', ')).join(', ')} { display: none; flex-grow: 0; flex-shrink: 0; }`;
      rows += `
${greater[size.key].map(s => `.${s} .row-${name}-n1 > *`).join(', ')} { display: ${data('raui.grid.display') || 'inline-block'}; width: 100%; }
${greater[size.key].map(s => `.${s} .row-${name}-n0 > *`).join(', ')} { display: none; }`;

      for (let i = 1; i < u; i++) {
        str = '' + ((i / u) * 100);
        str = str.substr(0, str.indexOf('.') + 3);
        rows += `\n${greater[size.key].map(s => wrappers.map(w => `.${s} > ${w}.row-${name}${i}-${u} > *, .${s} .row-${name}-n${i}-${u} > *, .${s} .row > .${name}-n${i}-${u}`).join(', ')).join(', ')} { display: ${data('raui.grid.display') || 'inline-block'}; width: ${str}%; }`;
        cols += `\n${greater[size.key].map(s => wrappers.map(w => `.${s} > ${w}.${name}${i}-${u}, .${s} > ${w}.row > .${name}${i}-${u}, .${s} .${name}-n${i}-${u}, .${s} .row-${name}-n${i}-${u} > *`).join(', ')).join(', ')} { display: ${data('raui.grid.display') || 'inline-block'}; width: ${str}%; flex-grow: 0; flex-shrink: 0; }`;
      }
    });

    greater[size.key].forEach(s => cols += `${wrappers.map(w => `.${s} > ${w}.row > .${name}-fill`).join(', ')}, .${s} .${name}-nfill { width: auto; flex-grow: 2; flex-shink: 2; }\n${wrappers.map(w => `.${s} > ${w}.row > .${name}-auto`).join(', ')}, .${s} .${name}-nauto { width: auto; flex-shrink: 2; }`);
  });

  out += rows + cols;

  return out;
}

grid.style = style;

export function plugin(opts = {}) {
  return function({ Ractive, instance }) {
    // if an extension, offer to include style
    if (!Ractive.isInstance(instance)) {
      if (opts.includeStyle) {
        if (instance === Ractive) {
          Ractive.addCSS('grid-decorator', style);
        } else {
          const css = instance.css;
          instance.css = function(data) {
            const res = typeof css !== "function" ? css || "" : css(data);
            return res + style(data, opts.defaults);
          };
        }
      }
    }

    instance.decorators[opts.name || 'grid'] = grid;
  }
}

globalRegister('grid', 'decorators', grid);

export default plugin;