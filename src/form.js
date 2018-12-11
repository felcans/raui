import globalRegister from './globalRegister';
import Ractive from 'ractive';

export function style(data) {
  const primary = Object.assign({}, data('raui.primary'), data('raui.form.primary'));
  const active = Object.assign({}, data('raui.primary.active'), data('raui.form.primary.active'));
  const boxy = data('raui.form.boxy');
  return `
  label.field {
    display: inline-block;
    font-size: 0.9em;
    font-weight: 500;
    color: ${primary.fg || '#222'};
    transition: 0.2s ease-in-out;
    transition-property: color;
    vertical-align: middle;
    box-sizing: border-box;
    padding: 0.5em 0.25em;
    line-height: 1.5em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-family: inherit;
  }

  label.field.textarea {
    display: block;
    border: 0.0625em solid ${primary.bc || '#ccc'};
    padding: 0.5em 0.8em 0.8em 0.8em;
    border-radius: ${primary.radius || '0.2em'};
    box-shadow: none;
    transition-property: color, border-color, box-shadow;
    margin: 0.8em 0.2em;
    min-height: auto;
    background-color: ${boxy ? primary.bg || '#fff' : 'transparent'};
  }

  label.field.focus {
    color: ${active.fg || '#07e'};
  }

  label.field.textarea.focus {
    border-color: ${active.fg || primary.fga || '#07e'};
    ${!boxy ? `box-shadow: 0.0625em 0.0625em ${active.fg || primary.fga || '#07e'},
      -0.0625em 0.0625em ${active.fg || primary.fga || '#07e'},
      0.0625em -0.0625em ${active.fg || primary.fga || '#07e'},
      -0.0625em -0.0625em ${active.fg || primary.fga || '#07e'};` : ''}
  }

  label.field input,
  label.field select,
  label.field textarea
  {
    display: block;
    border-width: ${boxy ? '0.0625em' : '0 0 0.0625em 0'};
    border-color: ${primary.bc || '#ccc'};
    border-style: solid;
    box-sizing: border-box;
    background-color: ${boxy ? primary.bg || '#fff' : 'transparent'};
    transition: 0.2s ease-in-out;
    transition-property: box-shadow, color;
    outline: none;
    ${boxy ? 'padding: 0 0.75em;' : ''}
    box-shadow: none;
    width: 100%;
    margin-bottom: 0.8em;
    font-size: 1.1em;${boxy ? `\n  border-radius: ${primary.radius || '0.2em'};` : ''}
    font-weight: 400;
    font-family: inherit;
  }
  label.field textarea {
    line-height: 1.2em;
  }
  label.field .field-wrapper {
    display: block;
  }
  label.field > select, label.field > input,
  label.field > .field-wrapper > input, label.field > .field-wrapper > select {
    height: 2.5em;
  }

  ${!boxy ? `label.field:hover > input,
  label.field:hover select,
  label.field.file:hover:after {
    box-shadow: 0 0.0625em 0 0 ${primary.bc || '#ccc'};
  }
  label.field.check:hover input:before,
  label.field.radio:hover input:before,
  label.field.textarea:hover {
    box-shadow: 0.0625em 0.0625em ${primary.bc || '#ccc'},
      -0.0625em 0.0625em ${primary.bc || '#ccc'},
      0.0625em -0.0625em ${primary.bc || '#ccc'},
      -0.0625em -0.0625em ${primary.bc || '#ccc'};
  }
  label.field.check.focus input:before,
  label.field.radio.focus input:before {
    box-shadow: 0.0625em 0.0625em ${active.fg || primary.fga || '#07e'},
      -0.0625em 0.0625em ${active.fg || primary.fga || '#07e'},
      0.0625em -0.0625em ${active.fg || primary.fga || '#07e'},
      -0.0625em -0.0625em ${active.fg || primary.fga || '#07e'};
  }
  label.field.textarea.focus:hover {
    box-shadow: 0.0625em 0.0625em ${active.fg || primary.fga || '#07e'},
      -0.0625em 0.0625em ${active.fg || primary.fga || '#07e'},
      0.0625em -0.0625em ${active.fg || primary.fga || '#07e'},
      -0.0625em -0.0625em ${active.fg || primary.fga || '#07e'};
  }
  label.field.check input:checked:before,
  label.field.radio input:checked:before {
    box-shadow: -0.0625em 0.0625em ${primary.checked || primary.fga || '#07e'};
  }
  label.field.check.focus input:checked:before,
  label.field.radio.focus input:checked:before {
    box-shadow: -0.0625em 0.0625em ${active.checked || active.fga || primary.fga || '#07e'};
  }` : ''}

  label.field.check, label.field.radio {
    vertical-align: top;
    cursor: pointer;${boxy ? `
    padding-top: 2em;
    line-height: 3.1em;` : `
    line-height: 1em;
    padding-top: 2.8em;`}
  }

  label.field.check input, label.field.radio input {
    width: 1em;
    height: 1em;
    border: none;
    ${boxy ? `margin-left: -0.5em;
    margin-right: 0.75em` : `margin-right: 0.5em;
    position: relative;
    margin-top: 0;`};
    float: left;
    box-shadow: none;
    background-color: transparent;
  }

  label.field select {
    padding-right: 2em;
  }

  label.field.select {
    cursor: pointer;
    position: relative;
  }

  label.field.select:after {
    content: ' ';
    position: absolute;
    display: block;
    width: 0.6em;
    right: 1em;
    height: 0.6em;
    top: 2.75em;
    border-bottom: 0.125em solid;
    border-right: 0.125em solid;
    transform: rotate(45deg);
    pointer-events: none;
  }

  label.field textarea {
    border: none;${boxy ? `
    padding: 0;` : ''}
  }

  label.field.check input:before,
  label.field.radio input:before {
    content: '';
    display: block;
    border: 0.0625em solid ${primary.bc || '#ccc'};
    width: 1em;
    height: 1em;
    box-sizing: border-box;
    transition: 0.2s ease-in-out;
    transition-property: transform, border-color, height, width, box-shadow, border-radius;
    ${boxy ? `margin-top: 0.5em;` :
    `margin-top: -0.25em;`}
    border-radius: 0.2em;
  }

  label.field.check.focus input:before,
  label.field.radio.focus input:before {
    border-color: ${active.fg || primary.fga || '#07e'};
  }

  label.field.check input:checked:before,
  label.field.radio input:checked:before {
    height: 0.7em;
    width: 1.3em;
    border-width: 0.125em;
    border-color: ${primary.checked || primary.fga || '#07e'};
    border-top-color: transparent;
    border-right-color: transparent;
    transform: rotate(-50deg);
    border-radius: 0;
  }

  label.field.check input,
  label.field > select {
    -moz-appearance: none;
    -webkit-appearance: none;
  }

  label.field input:focus,
  label.field select:focus,
  label.field.file.focus:after
  {
    border-color: ${active.fg || primary.fga || '#07e'};
    ${!boxy ? `box-shadow: 0 0.0625em 0 0 ${active.fg || primary.fga || '#07e'};` : ''}
  }

  label.field input[type=checkbox]:focus,
  label.field input[type=radio]:focus {
    box-shadow: none;
  }

  label.field.file.focus:after {
    color: ${active.fg || primary.fga || '#07e'};
  }
  label.field.file [type=file] {
    position: absolute;
    width: 0;
    height: 0;
    opacity: 0;
    z-index: -1;
  }
  label.field.file:after {
    position: absolute;
    content: 'Choose a file';
    box-sizing: border-box;
    width: calc(100% - 0.3em);
    height: 2.5em;
    font-size: 1.1em;
    line-height: 1.5em;
    color: ${primary.fg || '#222'};
    text-align: center;
    padding: 0.5em 1em;
    cursor: pointer;
    font-style: oblique;
    left: 0.25em;
    top: 1.75em;
    transition: 0.2s ease-in-out;
    transition-property: color, border-bolor, box-shadow;${ boxy ? `
    border-radius: ${primary.radius || '0.2em'};
    border-color: ${primary.bc || '#ccc'};
    border-style: solid;
    border-width: 0.0625em;` : `
    border-bottom-color: ${primary.bc || '#ccc'};
    border-bottom-width: 0.0625em;
    border-bottom-style: solid;
    `}
  }

  label.field.button {
    vertical-align: top;
    padding-top: 1.958em;
  }
  label.field .with-buttons button, label.field.button button {
    font-size: 1.1em;
    margin-top: ${boxy ? '0.1em' : '0'};
  }

  label.field .field-wrapper.with-buttons {
    display: flex;
  }
  label.field .with-buttons button {
    flex-shrink: 0;
    padding-left: 0.5em;
    padding-right: 0.5em;
    margin-top: 0;
    margin-right: 0;
    ${boxy ? `height: 2.5em;
    line-height: 2.7em;
    box-shadow: none;
    border-radius: 0;
    border-left: 1px solid ${primary.bg || '#fff'};
    margin-left: 0;` : 
    `height: 2.25em;
    line-height: 2.5em;`}
  }${boxy ? `
  label.field .with-buttons button:first-of-type {
    margin-left: -0.05em;
    border-left: none;
  }
  label.field .with-buttons button:last-of-type {
    border-radius: 0 ${primary.radius || '0.2em'} ${primary.radius || '0.2em'} 0;
  }
  label.field .with-buttons input {
    border-radius: ${primary.radius || '0.2em'} 0 0 ${primary.radius || '0.2em'};
  }
  ` : ''}

  label.field.plain > div {
    position: absolute;
    font-size: 1.1em;
    top: 2.4em;
  }

  /* inline fields (no labels) */
  label.field.inline {
    height: 3.3em;
  }

  label.field.check.inline {
    padding-top: ${boxy ? '0' : '1'}.5em;
  }

  label.field.button.inline {
    margin-top: 0.2em;
    padding-top: 0.${boxy ? '4' : '12'}em;
  }

  label.field.inline.select:after {
    top: 1.${boxy ? '4' : '2'}em;
  }
  `;
  // TODO: other themes
}

function noop() {}

function focused(ev) {
  if (!~this.className.indexOf('focus')) this.className += ' focus';
}

function blurred(ev) {
  this.className = this.className.replace(/\bfocus\b/g, '').trim();
}

export function field(node) {
  const ctx = this.getContext(node);

  let isField, isCheck, isRadio, isArea, isSelect, isFile, isButton, isPlain, isInput;

  function invalidate() {
    let val = setup().split(/\s+/).filter(c => !!c);

    isField = !!~val.indexOf('field');
    if (!isField) {
      val.push('field');
      isField = true;
    }

    isCheck = !!node.querySelector('input[type=checkbox]');
    if (isCheck && !~val.indexOf('check')) val.push('check');

    isRadio = !!node.querySelector('input[type=radio]');
    if (isRadio && !~val.indexOf('radio')) val.push('radio');

    isArea = !!node.querySelector('textarea');
    if (isArea && !~val.indexOf('textarea')) val.push('textarea');

    isSelect = !!node.querySelector('select');
    if (isSelect && !~val.indexOf('select')) val.push('select');

    isFile = !!node.querySelector('input[type=file]');
    if (isFile && !~val.indexOf('file')) val.push('file');

    isButton = node.querySelector('button');
    isButton = !!isButton && isButton.parentNode === node;
    if (isButton && !~val.indexOf('button')) val.push('button');

    isPlain = !!node.querySelector('div');
    if (isPlain && !~val.indexOf('plain')) val.push('plain');

    isInput = !isCheck && !isRadio && !isFile && !!node.querySelector('input');
    if (isInput && !~val.indexOf('input')) val.push('input');

    node.className = val.join(' ');
  }

  function setup() {
    let cls = node.className;

    if (!isField) cls = cls.replace(/\bfield\b/g, '').trim();
    if (!isCheck) cls = cls.replace(/\bcheck\b/g, '').trim();
    if (!isRadio) cls = cls.replace(/\bradio\b/g, '').trim();
    if (!isArea) cls = cls.replace(/\btextarea\b/g, '').trim();
    if (!isSelect) cls = cls.replace(/\bselect\b/g, '').trim();
    if (!isFile) cls = cls.replace(/\bfile\b/g, '').trim();
    if (!isButton) cls = cls.replace(/\bbutton\b/g, '').trim();
    if (!isPlain) cls = cls.replace(/\bplain\b/g, '').trim();
    if (!isInput) cls = cls.replace(/\binput\b/g, '').trim();
    cls = cls.replace(/  +/g, ' ');

    return cls;
  }

  const focus = ctx.listen('focusin', focused);
  const blur = ctx.listen('focusout', blurred);

  invalidate();

  return {
    update: noop,
    invalidate,
    teardown() {
      let cls = setup();
      cls = cls.replace(/\bfocus\b/g, '').trim();

      focus.cancel();
      blur.cancel();

      node.className = cls;
    }
  }
}

field.style = style;

function findDeep(els, el) {
  if (!els) return false;
  for (let i = 0; i < els.length; i++) {
    if (els[i].e === el) return true;
    if (els[i].f && findDeep(els[i].f, el)) return true;
  }
  return false;
}

export const macro = Ractive.macro(handle => {
  let body = [];
  const attrs = (handle.template.m || []).slice();
  const content = handle.template.f || [];

  // TODO: special field types
  const value = attrs.find(a => a.n === 'value');
  const type = attrs.find(a => a.n === 'type');

  if (type && typeof macro.types[type.f] === 'function') {
    body.push.apply(body, macro.types[type.f](attrs, content, handle));
  } else if (value) {
    const el = {
      t: 7, e: 'input', m: [value]
    };
    // watch for select
    if (findDeep(content, 'option')) {
      el.e = 'select';
      el.f = content;
    }
    if (type) {
      el.m.push(type);
      if (type.f === 'checkbox' || type.f === 'radio') {
        const target = attrs.find(a => a.n === 'target');
        if (target) el.m.push(Object.assign({}, target, { n: 'name' }));
        else el.m.splice(el.m.indexOf(value), 1, Object.assign({}, value, { n: 'checked' }));
      }
    }
    el.m = el.m.concat(attrs.filter(a => a.t === 73 || a.n === 'placeholder'));
    body.push(el);

    const btns = content.filter(e => e.e === 'button' || findDeep(e.f, 'button'));
    if (btns.length) {
      body.push.apply(body, btns);
      body = [{
        t: 7, e: 'span', m: [
          { t: 13, n: 'class', f: 'field-wrapper with-buttons', g: 1 }
        ],
        f: body
      }];
    }
  }

  const label = attrs.find(a => a.n === 'label');
  if (label) body.unshift(label.f);
  else body.unshift('\xa0');

  const outer = {
    t: 7, e: 'label', m: [{ t: 71, n: 'field' }].concat(attrs.filter(a => (a.t !== 13 && a.t !== 73) || (a.n !== 'value' && a.n !== 'type' && a.n !== 'inline' && a.n !== 'label' && a.n !== 'placeholder' && a.n !== 'target'))),
    f: body
  };

  if (attrs.find(a => a.n === 'inline')) outer.m.push({ t: 13, n: 'class', f: 'inline' });

  handle.setTemplate([outer]);
});

macro.types = {};

export function autofocus(node) {
  if (typeof node.focus === 'function') node.focus();
  return { teardown: noop };
}

export function plugin(opts = {}) {
  return function({ Ractive, instance }) {
    // if an extension, offer to include style
    if (!Ractive.isInstance(instance)) {
      if (opts.includeStyle) {
        // handle global use
        if (instance === Ractive) {
          Ractive.addCSS('form-decorator', style);
        } else {
          const css = instance.css;
          instance.css = function(data) {
            const res = typeof css !== 'function' ? (css || '') : css(data);
            return res + style(data);
          }
        }
      }
    }

    instance.partials[opts.name || 'field'] = macro;
    instance.decorators[opts.name || 'field'] = field;
    instance.decorators[opts.autofocusName || 'autofocus'] = autofocus;
  }
}

globalRegister('field', 'decorators', field);
globalRegister('field', 'partials', macro);
globalRegister('autofocus', 'decorators', autofocus);

export default plugin;