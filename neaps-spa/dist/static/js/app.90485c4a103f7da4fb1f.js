webpackJsonp([2,0],{0:function(t,e,a){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}var n=a(46),s=i(n),l=a(103),o=i(l);window.app=new s.default({el:"app",components:{App:o.default}})},47:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=[{sample:"Cycle Time",target:"N° of Stories",wip:"Limit"},{sample:"Cycle Time",target:"N° of Days",wip:"Limit"},{sample:"Throughput - N° Stories/Sprint",target:"N° of Stories",wip:""},{sample:"Velocity - N° Story Points/Sprint",target:"N° of Story Points",wip:""}];e.default=a},48:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=[{type:"Kanban - N° of Days to Delivery given a Cycle Time Sample",unit:"N° of Days to Delivery"},{type:"Kanban - N° of Stories Done given a Cycle Time Sample",unit:"N° of Stories Done"},{type:"SCRUM - N° Sprints to Delivery",unit:"N° Sprints to Delivery"}];e.default=a},49:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a={disableFirstRun:function(t){var e=t.commit;t.dispatch,t.state;e("FIRST_RUN_DISABLE")},setType:function(t,e){var a=t.commit;t.dispatch,t.state;console.log("set type value: "+e),a("TYPE_SET",e)},setValidated:function(t,e){var a=t.commit;t.dispatch,t.state;a("VALIDATED_SET",e)},addLeg:function(t){var e=t.commit,a=(t.dispatch,t.state),i=void 0;i=a.firstRun?{sample:"",runsdim:NaN,wip:NaN,td_low_bound:0,td_high_bound:0,sampleValidation:!0,runsdimValidation:!0,wipValidation:!0}:{sample:"",runsdim:NaN,wip:1,td_low_bound:0,td_high_bound:0,sampleValidation:!1,runsdimValidation:!1,wipValidation:!0},e("LEG_ADD",i)},removeLeg:function(t,e){var a=t.commit;t.dispatch,t.state;a("LEG_REMOVE",e)},updateSample:function(t,e){var a=t.commit,i=(t.dispatch,t.state,e.event),n=e.index,s=i.target.value;a("LEG_SAMPLE",{index:n,value:s})},updateSampleValidation:function(t,e){var a=t.commit,i=(t.dispatch,t.state,e.index),n=e.value;a("LEG_SAMPLE_VALIDATION",{index:i,value:n})},updateTarget:function(t,e){var a=t.commit,i=(t.dispatch,t.state,e.event),n=e.index,s=Number(i.target.value);a("LEG_TARGET",{index:n,value:s})},updateTargetValidation:function(t,e){var a=t.commit,i=(t.dispatch,t.state,e.index),n=e.value;a("LEG_TARGET_VALIDATION",{index:i,value:n})},updateWip:function(t,e){var a=t.commit,i=(t.dispatch,t.state,e.event),n=e.index,s=Number(i.target.value);a("LEG_WIP",{index:n,value:s})},updateWipAll:function(t,e){var a=t.commit;t.dispatch,t.state;a("LEG_WIP_ALL",e)},updateWipValidation:function(t,e){var a=t.commit,i=(t.dispatch,t.state,e.index),n=e.value;a("LEG_WIP_VALIDATION",{index:i,value:n})},updateTDLowBound:function(t,e){var a=t.commit,i=(t.dispatch,t.state,e.index),n=e.value;n=Number(n),a("LEG_TD_LOW",{index:i,value:n})},updateTDHighBound:function(t,e){var a=t.commit,i=(t.dispatch,t.state,e.index),n=e.value;n=Number(n),a("LEG_TD_HIGH",{index:i,value:n})},addTicket:function(t,e){var a=t.commit;t.dispatch,t.state;a("TICKET_ADD",e)},removeTicket:function(t,e){var a=t.commit;t.dispatch,t.state;a("TICKET_REMOVE",e)}};e.default=a},50:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a={isFirstRun:function(t){return t.firstRun},getType:function(t){return t.type},getLegs:function(t){return t.legs},getTickets:function(t){return t.tickets.reverse()}};e.default=a},51:function(t,e,a){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var n=a(24),s=i(n),l={FIRST_RUN_DISABLE:function(t){t.firstRun=!1},TYPE_SET:function(t,e){t.type=e},VALIDATED_SET:function(t,e){t.validated=e},LEG_ADD:function(t,e){t.legs.push(e)},LEG_REMOVE:function(t,e){t.legs.splice(e,1)},LEG_SAMPLE:function(t,e){var a=e.index,i=e.value;t.legs[a].sample=i},LEG_SAMPLE_VALIDATION:function(t,e){var a=e.index,i=e.value;t.legs[a].sampleValidation=i},LEG_TARGET:function(t,e){var a=e.index,i=e.value;t.legs[a].runsdim=i},LEG_TARGET_VALIDATION:function(t,e){var a=e.index,i=e.value;t.legs[a].runsdimValidation=i},LEG_WIP:function(t,e){var a=e.index,i=e.value;t.legs[a].wip=i},LEG_WIP_ALL:function(t,e){var a=!0,i=!1,n=void 0;try{for(var l,o=(0,s.default)(t.legs);!(a=(l=o.next()).done);a=!0){var u=l.value;u.wip=e}}catch(t){i=!0,n=t}finally{try{!a&&o.return&&o.return()}finally{if(i)throw n}}},LEG_WIP_VALIDATION:function(t,e){var a=e.index,i=e.value;t.legs[a].wipValidation=i},LEG_TD_LOW:function(t,e){var a=e.index,i=e.value;t.legs[a].td_low_bound=i},LEG_TD_HIGH:function(t,e){var a=e.index,i=e.value;t.legs[a].td_high_bound=i},TICKET_ADD:function(t,e){t.tickets.push(e)},TICKET_REMOVE:function(t,e){t.tickets.splice(e,1)}};e.default=l},52:function(t,e,a){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var n=a(46),s=i(n),l=a(23),o=i(l),u=a(50),r=i(u),d=a(49),c=i(d),v=a(51),p=i(v);s.default.use(o.default);var _={firstRun:!0,type:0,legs:[],tickets:[]};e.default=new o.default.Store({state:_,mutations:p.default,getters:r.default,actions:c.default})},53:function(t,e,a){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var n=a(104),s=i(n),l=a(105),o=i(l),u=a(52),r=i(u);e.default={components:{Inserter:s.default,Tickets:o.default},store:r.default}},54:function(t,e,a){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var n=a(25),s=i(n),l=a(23),o=a(47),u=i(o),r=function(t,e,a){var i=10*t;"0.0"!==t&&(i+=1),e.selectedIndex=i;for(var n=0;n<a.length;n++)n<i?a[n].disabled=!0:a[n].disabled=!1};e.default={mounted:function(){this.addLeg()},computed:(0,s.default)({singleLeg:function(){return 1!==this.getLegs.length},legLabels:function(){return u.default[this.getType]}},(0,l.mapGetters)(["isFirstRun","getType","getLegs"])),methods:(0,s.default)({setSimulationType:function(t){console.log("changing simulation");var e=t.target.value;if(this.setType(e),"2"===this.getType){this.updateWipAll(1);for(var a=0;a<this.getLegs.length;a++)this.validateWip("1",a)}return this.getType},startValidation:function(t,e){if(this.isFirstRun){for(var a=0;a<this.getLegs.length;a++)a===t&&0===e?(this.updateTargetValidation({index:t,value:!1}),this.updateWipValidation({index:t,value:!1})):a===t&&1===e?(this.updateSampleValidation({index:t,value:!1}),this.updateWipValidation({index:t,value:!1})):a===t&&2===e?(this.updateSampleValidation({index:t,value:!1}),this.updateTargetValidation({index:t,value:!1})):(this.updateSampleValidation({index:a,value:!1}),this.updateTargetValidation({index:a,value:!1}),this.updateWipValidation({index:a,value:!1}));this.disableFirstRun()}},validateSample:function(t,e){this.startValidation(e,0),""!==t.target.value&&null==t.target.value.match(/^[0-9]+(,[0-9]+)*$/)?this.updateSampleValidation({index:e,value:!1}):this.updateSampleValidation({index:e,value:!0})},validateTarget:function(t,e){this.startValidation(e,1),t.target.value<=0||null==t.target.value.match(/^[\d]+[\s]*$/)?this.updateTargetValidation({index:e,value:!1}):this.updateTargetValidation({index:e,value:!0})},validateWip:function(t,e){this.startValidation(e,2);var a="";a=t.target?t.target.value:t,a<=0||null==a.match(/^[\d]+[\s]*$/)?this.updateWipValidation({index:e,value:!1}):this.updateWipValidation({index:e,value:!0})},setTechDebtLow:function(t,e){var a="techDebtMax"+e,i=document.getElementById(a),n=i.options,s=t.target.value;r(s,i,n),this.updateTDLowBound({index:e,value:s});var l=Math.round(10*(Number(s)+.1))/10;this.updateTDHighBound({index:e,value:l})},setTechDebtHigh:function(t,e){var a=t.target.value;this.updateTDHighBound({index:e,value:a})}},(0,l.mapActions)(["disableFirstRun","setType","addLeg","removeLeg","updateSampleValidation","updateTargetValidation","updateWipAll","updateWipValidation","updateTDLowBound","updateTDHighBound"]))}},55:function(t,e,a){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var n=a(24),s=i(n),l=a(25),o=i(l),u=a(57),r=i(u),d=a(99),c=i(d),v=a(23),p=a(48),_=i(p),f=function(t,e){return{chunks:t,fun:e,predstot:1e3,runstot:5e4}},m=function(t,e){return new r.default(function(a,i){c.default.post(t).type("application/json").send(e).end(function(t,e){t?i(t):a(e)})})};e.default={computed:(0,o.default)({allValidated:function(){var t=!1,e=!0,a=!1,i=void 0;try{for(var n,l=(0,s.default)(this.getLegs);!(e=(n=l.next()).done);e=!0){var o=n.value;if(o.sampleValidation===!0&&o.runsdimValidation===!0&&o.wipValidation===!0&&this.isFirstRun===!0)return!1;t=o.sampleValidation===!0&&o.runsdimValidation===!0&&o.wipValidation===!0&&this.isFirstRun===!1}}catch(t){a=!0,i=t}finally{try{!e&&l.return&&l.return()}finally{if(a)throw i}}return t}},(0,v.mapGetters)(["isFirstRun","getType","getLegs","getTickets"])),methods:(0,o.default)({runSimulation:function(t,e){if(this.allValidated===!1)throw new Error("Data are not validated");if(this.getTickets[0]&&this.getTickets[0].loading)throw new Error("Simulation running.");console.log(e);var a=this.getLegs;console.log(this.getType);var i="/api",n=f(a,this.getType);if(console.log(i),console.log(n),this.addTicket({loading:!0}),window.get_data_available)window.get_data(n,function(t){console.log(t),window.app.$children[0].$refs.tickets.getTickets.shift(),window.app.$children[0].$refs.tickets.addTicket(t)}).bind(this);else{var s=m(i,n);s.then(function(t){this.removeTicket(e),this.addTicket(t.body)}.bind(this))}},getLabels:function(t){return _.default[this.getTickets[t].fun]}},(0,v.mapActions)(["addTicket","removeTicket"]))}},94:function(t,e){},95:function(t,e){},96:function(t,e){},103:function(t,e,a){var i,n;a(94),i=a(53);var s=a(106);n=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(n=i=i.default),"function"==typeof n&&(n=n.options),n.render=s.render,n.staticRenderFns=s.staticRenderFns,t.exports=i},104:function(t,e,a){var i,n;a(96),i=a(54);var s=a(108);n=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(n=i=i.default),"function"==typeof n&&(n=n.options),n.render=s.render,n.staticRenderFns=s.staticRenderFns,t.exports=i},105:function(t,e,a){var i,n;a(95),i=a(55);var s=a(107);n=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(n=i=i.default),"function"==typeof n&&(n=n.options),n.render=s.render,n.staticRenderFns=s.staticRenderFns,t.exports=i},106:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container"},[a("Inserter"),t._v(" "),a("Tickets",{ref:"tickets"})],1)},staticRenderFns:[]}},107:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"tickets-wrapper"}},[a("div",{attrs:{id:"cta"}},[a("button",{staticClass:"button-primary",class:{disabled:!t.allValidated||t.getTickets[0]&&t.getTickets[0].loading},attrs:{id:"cta_button"},on:{click:function(e){t.runSimulation(t.getTickets.length)}}},[t._v("Run Simulation")])]),t._v(" "),a("div",{attrs:{id:"tickets"}},t._l(t.getTickets,function(e,i){return a("div",{key:e.index,staticClass:"row ticket",attrs:{id:"ticket"+i}},[e.loading?[a("h1",[a("span",{staticClass:"icon-spin2 animate-spin"}),t._v(" Simulation "+t._s(t.getTickets.length-i)+" - Running...")])]:[a("h1",[t._v("Simulation "+t._s(t.getTickets.length-i))]),t._v(" "),a("h2",[t._v(t._s(t.getLabels(i).type))]),t._v(" "),a("table",{staticClass:"u-full-width"},[a("thead",[a("tr",[a("th",[t._v("N°")]),t._v(" "),a("th",[t._v("Sample")]),t._v(" "),a("th",[t._v("Target")]),t._v(" "),2!=e.fun?a("th",[t._v("Wip")]):t._e(),t._v(" "),a("th",{staticClass:"incatious"},[t._v("\n                  Incatious Scenario "),a("br"),t._v(" "),a("span",{staticClass:"unit"},[t._v("("+t._s(t.getLabels(i).unit)+")")])]),t._v(" "),a("th",{staticClass:"three"},[t._v("\n                  Three/Quarters Scenario "),a("br"),t._v(" "),a("span",{staticClass:"unit"},[t._v("("+t._s(t.getLabels(i).unit)+")")])]),t._v(" "),a("th",{staticClass:"safe"},[t._v("\n                  Safe Scenario "),a("br"),t._v(" "),a("span",{staticClass:"unit"},[t._v("("+t._s(t.getLabels(i).unit)+")")])]),t._v(" "),a("th",[t._v("Attributes")])])]),t._v(" "),a("tbody",t._l(e.table,function(i,n){return a("tr",{key:i.index,staticClass:"row",class:{montecarlo:!i.montecarlo},attrs:{id:"line"+n}},[a("td",{staticClass:"number"},[t._v(t._s(i.name))]),t._v(" "),a("td",[i.request?a("span",[t._v(t._s(i.request.sample))]):t._e()]),t._v(" "),a("td",[i.request?a("span",[t._v(t._s(i.request.runsdim))]):t._e()]),t._v(" "),2!=e.fun?a("td",[i.request?a("span",[t._v(t._s(i.request.wip))]):t._e()]):t._e(),t._v(" "),i.montecarlo?[a("td",{staticClass:"scenario"},[t._v(t._s(i.low))]),t._v(" "),a("td",{staticClass:"scenario"},[t._v(t._s(i.medium))]),t._v(" "),a("td",{staticClass:"scenario"},[t._v(t._s(i.high))])]:[a("td",{staticClass:"scenario center",attrs:{colspan:"3"}},[t._v("\n                    "+t._s(i.medium)+"\n                    "),a("span",{staticClass:"label no-montecarlo"},[t._v("No Montecarlo Simulation (Unvariant sample)")])])],t._v(" "),a("td",[i.longest?a("span",{staticClass:"label attribute"},[t._v("Longest")]):t._e(),t._v(" "),i.shortest?a("span",{staticClass:"label attribute"},[t._v("Shortest")]):t._e()])],2)}))])]],2)}))])},staticRenderFns:[]}},108:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"row u-full-width",attrs:{id:"inserter-wrapper"}},[a("div",{attrs:{id:"inserter"}},[a("div",{attrs:{id:"type"}},[t._v("\n      Simulation: \n      "),a("select",{attrs:{id:"simulatioTypeSelect"},on:{change:t.setSimulationType}},[a("option",{attrs:{value:"0"}},[t._v("Kanban: I would like to forecast the N° of Days to Delivery a given number of stories")]),t._v(" "),a("option",{attrs:{value:"1"}},[t._v("Kanban: I would like to forecast the N° of Stories Done in given number of days")]),t._v(" "),a("option",{attrs:{value:"2"}},[t._v("Scrum: I would like to forecast the N° of Sprints to Delivery a given number of stories")])])]),t._v(" "),a("div",{attrs:{id:"legs"}},[t._l(t.getLegs,function(e,i){return a("div",{key:e.index,staticClass:"row",attrs:{id:"leg"+i}},[a("div",{staticClass:"one column name"},[t._v("\n          "+t._s(i+1)+"\n        ")]),t._v(" "),a("div",{staticClass:"four columns",class:{"not-validated":!e.sampleValidation}},[a("label",{staticClass:"label"},[t._v("Historical Sample")]),t._v(" "),a("span",{staticClass:"unit"},[t._v(t._s(t.legLabels.sample))]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.sample,expression:"leg.sample"}],staticClass:"u-full-width",attrs:{id:"leg"+i+"_sample",placeholder:"1,2,3,4,5",type:"text"},domProps:{value:e.sample},on:{input:[function(a){a.target.composing||t.$set(e,"sample",a.target.value)},function(e){t.validateSample(e,i)}]}})]),t._v(" "),a("div",{staticClass:"onehalf columns",class:{"not-validated":!e.runsdimValidation,four:t.teamType}},[a("label",{staticClass:"label"},[t._v("Target")]),t._v(" "),a("span",{staticClass:"unit"},[t._v(t._s(t.legLabels.target))]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model.number",value:e.runsdim,expression:"leg.runsdim",modifiers:{number:!0}}],staticClass:"u-full-width",attrs:{id:"leg"+i+"_target",placeholder:"5",type:"number"},domProps:{value:e.runsdim},on:{input:[function(a){a.target.composing||t.$set(e,"runsdim",t._n(a.target.value))},function(e){t.validateTarget(e,i)}],blur:function(e){t.$forceUpdate()}}})]),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:2!=t.getType,expression:"getType!=2"}],staticClass:"onehalf columns",class:{"not-validated":!e.wipValidation}},[a("label",{staticClass:"label"},[t._v("WIP")]),t._v(" "),a("span",{staticClass:"unit"},[t._v(t._s(t.legLabels.wip))]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.wip,expression:"leg.wip"}],staticClass:"u-full-width",attrs:{id:"leg"+i+"_wip",placeholder:"5",type:"number"},domProps:{value:e.wip},on:{input:[function(a){a.target.composing||t.$set(e,"wip",a.target.value)},function(e){t.validateWip(e,i)}]}})]),t._v(" "),a("div",{staticClass:"three columns"},[a("label",{staticClass:"label"},[t._v("Tech Debt Simulation")]),t._v(" "),a("div",{staticClass:"techDebtContainer"},[a("span",{staticClass:"unit"},[t._v("Minimun")]),t._v(" "),a("select",{attrs:{id:"techDebtMin"+i},on:{change:function(e){t.setTechDebtLow(e,i)}}},[a("option",{attrs:{value:"0.0"}},[t._v("0%")]),t._v(" "),a("option",{attrs:{value:"0.1"}},[t._v("10%")]),t._v(" "),a("option",{attrs:{value:"0.2"}},[t._v("20%")]),t._v(" "),a("option",{attrs:{value:"0.3"}},[t._v("30%")]),t._v(" "),a("option",{attrs:{value:"0.4"}},[t._v("40%")])])]),t._v(" "),a("div",{staticClass:"techDebtContainer"},[a("span",{staticClass:"unit"},[t._v("Maximum")]),t._v(" "),a("select",{attrs:{id:"techDebtMax"+i},on:{change:function(e){t.setTechDebtHigh(e,i)}}},[a("option",{attrs:{value:"0.0"}},[t._v("0%")]),t._v(" "),a("option",{attrs:{value:"0.1"}},[t._v("10%")]),t._v(" "),a("option",{attrs:{value:"0.2"}},[t._v("20%")]),t._v(" "),a("option",{attrs:{value:"0.3"}},[t._v("30%")]),t._v(" "),a("option",{attrs:{value:"0.4"}},[t._v("40%")]),t._v(" "),a("option",{attrs:{value:"0.5"}},[t._v("50%")]),t._v(" "),a("option",{attrs:{value:"0.6"}},[t._v("60%")])])])]),t._v(" "),a("div",{staticClass:"one column remove"},[a("a",{directives:[{name:"show",rawName:"v-show",value:t.singleLeg,expression:"singleLeg"}],staticClass:"icon-minus-circled",attrs:{href:"#"},on:{click:function(e){e.preventDefault(),t.removeLeg(i)}}})])])}),t._v(" "),a("a",{staticClass:"add icon-plus-squared",attrs:{id:"addLeg",href:"#"},on:{click:function(e){e.preventDefault(),t.addLeg(e)}}},[t._v(" Add Group")])],2)])])},staticRenderFns:[]}}});
//# sourceMappingURL=app.90485c4a103f7da4fb1f.js.map