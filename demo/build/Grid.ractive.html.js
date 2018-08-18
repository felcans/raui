System.register(['./chunk2.js', './chunk7.js', './chunk12.js'], function (exports, module) {
  'use strict';
  var Window, grid, split;
  return {
    setters: [function (module) {
      Window = module.Window;
    }, function (module) {
      grid = module.default;
    }, function (module) {
      split = module.default;
    }],
    execute: function () {

      var Grid = (function (Window) {
        function Grid(opts) { Window.call(this, opts); }

        if ( Window ) Grid.__proto__ = Window;
        Grid.prototype = Object.create( Window && Window.prototype );
        Grid.prototype.constructor = Grid;

        return Grid;
      }(Window));
      exports('default', Grid);
      Window.extendWith(Grid, {
        template: {v:4,t:[{t:7,e:"tabs",m:[{t:13,n:"class",f:"alt",g:1},{n:"flat",f:0,t:13},{n:"pad",f:0,t:13},{n:"fill",f:0,t:13},{n:"height",f:"dynamic",t:13,g:1}],f:[{t:7,e:"tab",m:[{n:"title",f:"Intro",t:13,g:1}],f:[{t:7,e:"marked",f:["    The grid decorator takes your usual CSS grid (no, not `display: grid`) and makes it container-aware, meaning that it will respond to its container changing sizes rather than just the window. It does so by listening to both window resize events and any Ractive resize events that happen to bubble up to its root instance.\n\n    Inside the decorated element, you can place `.row` elements, which can have sized contents. Because you can have _nested_ grids, this is a bit different than your normal CSS grid framework. Grids nested within other grids still use their own width when determining what breakpoints to apply.\n\n    You can customize the breakpoints and sizes available in the grid fairly easily, as it provides a CSS function to be included in your main instance that handles the breakpoints and their corresponding sizes. Here are the defaults:\n    \n    * `tiny` - prefixed with a `t` - matches at any width.\n    * `xsmall` - prefixed with an `xs` - matches from 20em.\n    * `small` - prefixed with an `s` - matches from 36em.\n    * `medium` - prefixed with an `m` - matches from 48em.\n    * `large` - prefixed with an `l` - matches from 64em.\n    * `xlarge` - prefixed with an `x` - matches from 100em.\n    * `ginormous` - prefixed with a `g` - matches from 150em.\n\n    Fractions, using a `-` rather than `/`, can specified for each breakpoint using the prefix for the breakpoint. For instance, `t1-2 m1-4` will be 1/4 above 48em and 1/2 below 48em. There are two special sizes, `1` and `0`, which make the element take full width and hide, respectively.\n    \n    The denominators available by default are:\n\n    * `tiny` - 2, 3, 4, 5, 6, 8\n    * `xsmall`, `small`, `medium` - 2, 3, 4, 5, 6, 8, 10, 12\n    * `large` - 2, 3, 4, 5, 6, 8, 10, 12, 20, 24\n    * `xlarge` - 2, 3, 4, 5, 6, 8, 10, 12, 20, 24, 32\n    * `ginormous` - 2, 3, 4, 5, 6, 8, 10, 12, 20, 24, 32, 64\n\n    _All_ fractions, even those not simplified, are available for each range, so if you're laying out a grid in 6ths, you can use `2-6` to keep things consistent rather than having to use `1-3`.\n  "]}]}," ",{t:7,e:"tab",m:[{n:"title",f:"Usage",t:13,g:1}],f:[{t:7,e:"marked",f:["    ### Plugin options\n\n    All options are optional.\n\n    * `name: string = 'grid'` - the name to use when registering the plugin as a decorator\n\n    ### Children\n\n    Elements decorated as a grid should have children with the `row` class applied. Children of the rows can have size classes applied e.g. `t1-2`. The rows themselves can also have default child sizes applied using row size classes, which are simply sizes with `row-` prepended e.g. `row-t1-4`.\n\n    To target elements _not_ immediately nested within a row, including further rows, you can use `-n` prefixed sizes e.g. `m-n1-5` for medium 1/5. Note though, that the outermost grid will determine sizing for the nested elements in this case, so it's probably not what you want with nested grids.\n\n    ### Arguments\n\n    All arguments are optional.\n\n    * `value: keypath` - binds the current matching breakpoint value to the given keypath\n    * `name: keypath` - binds the current matching breakpoint name to the given keypath\n\n    ### Style\n\n    Breakpoints and their sizes can be defined in `@style.break`, which should be an object with breakpoint keys.\n\n    * `[breakpointName]: string` - this is used as the class name for the breakpoint\n      * `units: number[]` - denominators for which to generate size fractions for this breakpoint. `1` and `0` are automatically provided. Setting this to `[ 7, 9 ]`, for instance`, would result in sizes from `1-7` to `7-7` and `1-9` to `9-9`.\n      * `max: string` - the size to set as the breaking point e.g. `'20em'`, `'0'`, `'1024px'`, etc.\n      * `prefix: string = breakpointName[0]` - the prefix to use for sizes. The first letter of the breakpoint name is used if none is provided.\n      * `value: number` - a numeric value to associate with this breakpoint. Since the `max` size is a string that could be in a number of different units, there's not really a way to automatically sort breakpoints based on that. In order to set the right precedence in CSS, the style function needs to know the order in which the breakpoints should appear in order from smallest to largest. Set the smallest breakpoint to 0, and each subsequent breakpoint should have a larger value.\n  "]}]}," ",{t:7,e:"tab",m:[{n:"title",f:"Example",t:13,g:1},{n:"no-pad",f:0,t:13}],f:[{t:7,e:"split",f:[{t:7,e:"div",m:[{t:13,n:"style",f:"padding: 1em;;",g:1},{n:"size",f:"20",t:13,g:1}],f:[{t:7,e:"marked",f:["          ### Template:\n\n          ```hbs\n          <div as-grid=\"{ value: '.value', name: '.name' }\" size=80>\n            <div>{{.name}} = {{.value}}</div>\n            <div class=\"row row-t1-4 row-m1-6\">\n              <div class=\"thing\">Thing 1.1</div>\n              <div class=\"thing\">Thing 1.2</div>\n              <div class=\"thing t1 m1-3\">Thing 1.3</div>\n              <div class=\"thing t1 m1-3\">Thing 1.4</div>\n              <div class=\"thing\">Thing 1.5</div>\n              <div class=\"thing\">Thing 1.6</div>\n              <div class=\"thing\">Thing 1.7</div>\n            </div>\n            <div class=\"row row-t1-2 row-m1-3\">\n              <div class=\"thing\">Thing 2.1</div>\n              <div class=\"thing\">Thing 2.2</div>\n              <div class=\"thing\">Thing 2.3</div>\n              <div class=\"thing\">Thing 2.4</div>\n              <div class=\"thing\">Thing 2.5</div>\n              <div class=\"thing\">Thing 2.6</div>\n              <div class=\"thing\">Thing 2.7</div>\n              <div class=\"thing xs1-2\" as-grid=\"{ value: '.subValue', name: '.subName' }\">\n                <div>{{.subName}} = {{.subValue}}</div>\n                <div class=\"row row-t1-4 row-xs1-5\">\n                  <div class=\"thing\">Thing 2.7.1</div>\n                  <div class=\"thing\">Thing 2.7.2</div>\n                  <div class=\"thing\">Thing 2.7.3</div>\n                  <div class=\"thing\">Thing 2.7.4</div>\n                  <div class=\"thing\">Thing 2.7.5</div>\n                </div>\n              </div>\n            </div>\n          </div>\n          ```\n\n          ### Result:\n        "]}]}," ",{t:7,e:"split",m:[{n:"vertical",f:0,t:13}],f:[{t:7,e:"div",m:[{n:"grid",t:71,f:{r:[],s:"[{value:\".value\",name:\".name\"}]"}},{n:"size",f:"80",t:13,g:1}],f:[{t:7,e:"div",f:[{t:2,r:".name"}," = ",{t:2,r:".value"}]}," ",{t:7,e:"div",m:[{t:13,n:"class",f:"row row-t1-4 row-m1-6",g:1}],f:[{t:7,e:"div",m:[{t:13,n:"class",f:"thing",g:1}],f:["Thing 1.1"]}," ",{t:7,e:"div",m:[{t:13,n:"class",f:"thing",g:1}],f:["Thing 1.2"]}," ",{t:7,e:"div",m:[{t:13,n:"class",f:"thing t1 m1-3",g:1}],f:["Thing 1.3"]}," ",{t:7,e:"div",m:[{t:13,n:"class",f:"thing t1 m1-3",g:1}],f:["Thing 1.4"]}," ",{t:7,e:"div",m:[{t:13,n:"class",f:"thing",g:1}],f:["Thing 1.5"]}," ",{t:7,e:"div",m:[{t:13,n:"class",f:"thing",g:1}],f:["Thing 1.6"]}," ",{t:7,e:"div",m:[{t:13,n:"class",f:"thing",g:1}],f:["Thing 1.7"]}]}," ",{t:7,e:"div",m:[{t:13,n:"class",f:"row row-t1-2 row-m1-3",g:1}],f:[{t:7,e:"div",m:[{t:13,n:"class",f:"thing",g:1}],f:["Thing 2.1"]}," ",{t:7,e:"div",m:[{t:13,n:"class",f:"thing",g:1}],f:["Thing 2.2"]}," ",{t:7,e:"div",m:[{t:13,n:"class",f:"thing",g:1}],f:["Thing 2.3"]}," ",{t:7,e:"div",m:[{t:13,n:"class",f:"thing",g:1}],f:["Thing 2.4"]}," ",{t:7,e:"div",m:[{t:13,n:"class",f:"thing",g:1}],f:["Thing 2.5"]}," ",{t:7,e:"div",m:[{t:13,n:"class",f:"thing",g:1}],f:["Thing 2.6"]}," ",{t:7,e:"div",m:[{t:13,n:"class",f:"thing",g:1}],f:["Thing 2.7"]}," ",{t:7,e:"div",m:[{t:13,n:"class",f:"thing xs1-2",g:1},{n:"grid",t:71,f:{r:[],s:"[{value:\".subValue\",name:\".subName\"}]"}}],f:[{t:7,e:"div",f:[{t:2,r:".subName"}," = ",{t:2,r:".subValue"}]}," ",{t:7,e:"div",m:[{t:13,n:"class",f:"row row-t1-4 row-xs1-5",g:1}],f:[{t:7,e:"div",m:[{t:13,n:"class",f:"thing",g:1}],f:["Thing 2.7.1"]}," ",{t:7,e:"div",m:[{t:13,n:"class",f:"thing",g:1}],f:["Thing 2.7.2"]}," ",{t:7,e:"div",m:[{t:13,n:"class",f:"thing",g:1}],f:["Thing 2.7.3"]}," ",{t:7,e:"div",m:[{t:13,n:"class",f:"thing",g:1}],f:["Thing 2.7.4"]}," ",{t:7,e:"div",m:[{t:13,n:"class",f:"thing",g:1}],f:["Thing 2.7.5"]}]}]}]}]}," ",{t:7,e:"div",f:["Resize Me"]}]}]}]}]}],e:{"[{value:\".value\",name:\".name\"}]":function (){return([{value:".value",name:".name"}]);},"[{value:\".subValue\",name:\".subName\"}]":function (){return([{value:".subValue",name:".subName"}]);}}}, css: " div.thing { padding: 1.5em; border: 1px solid black; }",
        use: [grid(), split()],
        options: {
          id: 'grid',
          title: 'Decorators :: Grid',
          width: '40em', height: '30em',
          flex: true,
          resizable: true
        }
      });

    }
  };
});
