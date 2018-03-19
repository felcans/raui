export default function init(initOpts = {}) {
  CodeMirror = initOpts.CodeMirror || window.CodeMirror;
  if (!CodeMirror) throw new Error('CodeMirror must be provided or available globally.');

  if (!CodeMirror.inputStyles.password) {
    function PasswordInput(cm) {
      CodeMirror.inputStyles.textarea.call(this, cm);
    }
    const proto = PasswordInput.prototype = Object.create(CodeMirror.inputStyles.textarea.prototype);
    proto.constructor = PasswordInput;
    proto.createField = function() {
      const div = document.createElement('div');
      div.setAttribute('style', "overflow: hidden; position: relative; width: 3px; height: 0px;");
      const input = document.createElement('input');
      input.setAttribute('type', 'password');
      input.setAttribute('style', 'position: absolute; padding: 0; width: 1000px; height: 1em; outline: none; border 1px solid black; display: inline-block;');
      div.appendChild(input);
      this.wrapper = div;
      this.textarea = input;
    }
    CodeMirror.inputStyles.password = PasswordInput;
  }

  const defaultOpts = {};
  for (const k in initOpts) {
    if (k in CodeMirror.defaults) defaultOpts[k] = initOpts[k];
  }

  function codemirror(node, options) {
    const ctx = this.getContext(node);
    if (typeof options === 'string') options = { bind: options };
    let opts = Object.assign({}, defaultOpts, options);
    let editor, observer, lock;

    const cmOpts = {};
    for (const k in opts) if (k in CodeMirror.defaults) cmOpts[k] = opts[k];

    if (node.nodeName.toLowerCase() === 'textarea') {
      editor = CodeMirror.fromTextArea(node, cmOpts);
    } else {
      editor = new CodeMirror(node, cmOpts);
    }

    editor.on('change', () => {
      if (observer && !lock) {
        lock = true;
        ctx.set(opts.bind, editor.getValue());
        lock =false;
      }
    });

    function resize() {
      editor.display.wrapper.style.height = '20px';
      editor.display.wrapper.style.height = `${editor.display.wrapper.parentNode.clientHeight}px`;
      editor && editor.refresh();
    }
    const listener = ctx.get('@.root').on('*.resize', resize);

    function bind() {
      const cur = editor.getCursor();

      if (observer) {
        observer.cancel();
        observer = null;
      }

      if (opts.bind) {
        observer = ctx.observe(opts.bind, v => {
          if (!lock) {
            lock = true;
            if (editor.getValue() !== v) {
              const cur = editor.getCursor();
              editor.setValue(v);
              editor.setCursor(cur);
            }
            lock = false;
          }
        });
      }

      // sync up the codemirror options
      for (const k in opts) {
        if (k in CodeMirror.defaults && editor.getOption(k) !== opts[k]) editor.setOption(k, opts[k]);
      }

      editor.setCursor(cur);
    }

    setTimeout(resize, 300);

    bind();

    return {
      editor,
      resize,
      teardown() {
        if (observer) observer.cancel();
        if (editor.toTextEditor) editor.toTextEditor();
        editor = null;
        listener.cancel();
      },
      update(options) {
        if (typeof options === 'string') options = { bind: options };
        opts = Object.assign({}, defaultOpts, options);
            
        bind();
      }
    };
  }

  function plugin({ instance }) {
    instance.decorators[initOpts.name || 'codemirror'] = codemirror;
  }

  return { codemirror, plugin };
}