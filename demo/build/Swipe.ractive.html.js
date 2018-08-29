System.register(['./chunk2.js', './chunk1.js'], function (exports, module) {
  'use strict';
  var Window, left, right, up, down;
  return {
    setters: [function (module) {
      Window = module.Window;
    }, function (module) {
      left = module.left;
      right = module.right;
      up = module.up;
      down = module.down;
    }],
    execute: function () {

      var Swipe_ractive = exports('default', Window.extend({
        template: {v:4,t:[{t:7,e:"tabs",m:[{t:13,n:"class",f:"alt",g:1},{n:"fill",f:0,t:13},{n:"flat",f:0,t:13},{n:"pad",f:0,t:13},{n:"height",f:"dynamic",t:13,g:1}],f:[{t:7,e:"tab",m:[{n:"title",f:"Intro",t:13,g:1}],f:[{t:7,e:"marked",f:["    Swiping is one of those complex events that seems like it should be pretty easy to handle, but then you start looking at the available DOM events and realize that there's a lot going on under the hood when tracking a swipe. raui provides this cardinal swipe event to give you up, down, left, and right swipe support.\n\n    This event also takes advantage of init args to allow you to bind the current position of a swipe to a local variable, which means you can give the user feedback about the swipe before it is complete.\n  "]}]}," ",{t:7,e:"tab",m:[{n:"title",f:"Usage",t:13,g:1}],f:[{t:7,e:"marked",f:["    ### Plugin options\n\n    All options are optional.\n\n    * `name: string = 'swipe${direction}'` - the name to use when registering the event as a plugin. If no `name` or `direction` is supplied, the name defaults to `'swipe'`. If a direction is supplied, it is appended to `'swipe'` when computing a name.\n    * `direction: string = 'right'` - the direction to watch for swipes\n    * `distance: number = 150` - the number of pixels that must be covered in order to consider the swipe to have occurred\n    * `flick: number = 200` - the extrapolated number of pixels that must be covered in order to consider the swipe to have occurred. A small fast flick on the screen that doesn't cover the required distance will still trigger a swipe event.\n    * `threshold: number = 0.2` - the overall percentange of perpendicular axis movement that is allowed during the swipe. If the swipe is currently at 100px in length, then with a 0.2 threshold, 20px of movement in the perpendicular axis is allowed before the movement is no longer considered a swipe.\n\n    ### Init arguments\n\n    `direction`, `distance`, `flick`, and `threshold` can all also be specified as init arguments and will override any options set at the plugin level.\n\n    * `maxX: number = target.clientWidth` - the largest x axis coordinate to consider when starting a swipe. If this number is less than 0, it is added to the width of the target.\n    * `minX: number = 0` - the smallest x axis coordinate to consider when starting a swipe. If this number is less than 0, it is added to the height of the target.\n    * `maxY: number = target.clientHeight` - the largest y axis coordinate to consider when starting a swipe. If this number is less than 0, it is added to the width of the target.\n    * `minY: number = 0` - the smallest y axis coordinate to consider when starting a swipe. If this number is less than 0, it is added to the height of the target.\n    * `bind: string` - a keypath to which to bind the current swipe distance as a percentage of target `distance`\n    * `bindPx: string` - a keypath to which to bind the current swipe distance in px\n  "]}]}," ",{t:7,e:"tab",m:[{n:"title",f:"Example",t:13,g:1}],f:[{t:7,e:"div",m:[{t:13,n:"style",f:"display: flex; height: 100%; flex-direction: column;",g:1}],f:[{t:7,e:"marked",f:["          ### Template:\n          ```hbs\n          <div\n            on-swipeleft({ bind: '.leftpct', bindPx: '.leftdist' })=\"@.log('swipe left')\"\n            on-swiperight({ bind: '.rightpct', bindPx: '.rightdist' })=\"@.log('swipe right')\"\n            on-swipeup({ bind: '.uppct', bindPx: '.updist' })=\"@.log('swipe up')\"\n            on-swipedown({ bind: '.downpct', bindPx: '.downdist' })=\"@.log('swipe down')\"\n          >\n            <div>\n              left: {{leftdist}}px {{Math.round(leftpct)}}%<br/>\n              right: {{rightdist}}px {{Math.round(rightpct)}}%<br/>\n              up: {{updist}}px {{Math.round(uppct)}}%<br/>\n              down: {{downdist}}px {{Math.round(downpct)}}%<br/>\n            </div>\n            {{#each ~/logs}}<div>{{.}}</div>{{else}}Swipe Here{{/each}}\n          </div>\n          ```\n          ### Result:\n        "]}," ",{t:7,e:"div",m:[{t:13,n:"style",f:"flex-grow: 1; position: relative; background-color: #eee;",g:1},{n:["swipeleft"],t:70,a:{r:[],s:"[{bind:\".leftpct\",bindPx:\".leftdist\"}]"},f:{r:["@this"],s:"[_0.log(\"swipe left\")]"}},{n:["swiperight"],t:70,a:{r:[],s:"[{bind:\".rightpct\",bindPx:\".rightdist\"}]"},f:{r:["@this"],s:"[_0.log(\"swipe right\")]"}},{n:["swipeup"],t:70,a:{r:[],s:"[{bind:\".uppct\",bindPx:\".updist\"}]"},f:{r:["@this"],s:"[_0.log(\"swipe up\")]"}},{n:["swipedown"],t:70,a:{r:[],s:"[{bind:\".downpct\",bindPx:\".downdist\"}]"},f:{r:["@this"],s:"[_0.log(\"swipe down\")]"}}],f:[{t:7,e:"div",m:[{t:13,n:"class",f:"vars",g:1}],f:["left: ",{t:2,r:"leftdist"},"px ",{t:2,x:{r:["leftpct"],s:"Math.round(_0)"}},"%",{t:7,e:"br"}," right: ",{t:2,r:"rightdist"},"px ",{t:2,x:{r:["rightpct"],s:"Math.round(_0)"}},"%",{t:7,e:"br"}," up: ",{t:2,r:"updist"},"px ",{t:2,x:{r:["uppct"],s:"Math.round(_0)"}},"%",{t:7,e:"br"}," down: ",{t:2,r:"downdist"},"px ",{t:2,x:{r:["downpct"],s:"Math.round(_0)"}},"%",{t:7,e:"br"}]}," ",{t:4,f:[{t:7,e:"div",f:[{t:2,r:"."}]}],n:52,r:"~/logs"},{t:4,f:["Swipe Here"],n:51,l:1}]}]}]}]}],e:{"[{bind:\".leftpct\",bindPx:\".leftdist\"}]":function (){return([{bind:".leftpct",bindPx:".leftdist"}]);},"[_0.log(\"swipe left\")]":function (_0){return([_0.log("swipe left")]);},"[{bind:\".rightpct\",bindPx:\".rightdist\"}]":function (){return([{bind:".rightpct",bindPx:".rightdist"}]);},"[_0.log(\"swipe right\")]":function (_0){return([_0.log("swipe right")]);},"[{bind:\".uppct\",bindPx:\".updist\"}]":function (){return([{bind:".uppct",bindPx:".updist"}]);},"[_0.log(\"swipe up\")]":function (_0){return([_0.log("swipe up")]);},"[{bind:\".downpct\",bindPx:\".downdist\"}]":function (){return([{bind:".downpct",bindPx:".downdist"}]);},"[_0.log(\"swipe down\")]":function (_0){return([_0.log("swipe down")]);},"Math.round(_0)":function (_0){return(Math.round(_0));}}},
        css: " .vars { position: absolute; right: 0; top: 0; }",
        use: [ left, right, up, down ],
        options: {
          title: 'Event :: Swipe',
          flex: true,
          width: '40em', height: '30em'
        },
        log: function log(msg) {
          this.unshift('logs', msg);
        }
      }));

    }
  };
});
