webpackJsonp([2,0],[function(t,e,a){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}var n=a(47),s=i(n),o=a(110),l=i(o);new s.default({el:"app",components:{App:l.default}})},,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=[{sample:"Cycle Time",target:"N° of Stories",wip:"Limit"},{sample:"Cycle Time",target:"N° of Days",wip:"Limit"},{sample:"Throughput - N° Stories/Sprint",target:"N° of Stories",wip:""},{sample:"Velocity - N° Story Points/Sprint",target:"N° of Story Points",wip:""}];e.default=a},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=[{type:"Kanban - N° of Days to Delivery given a Cycle Time Sample",unit:"N° of Days to Delivery"},{type:"Kanban - N° of Stories Done given a Cycle Time Sample",unit:"N° of Stories Done"},{type:"SCRUM - N° Sprints to Delivery",unit:"N° Sprints to Delivery"}];e.default=a},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a={disableFirstRun:function(t){var e=t.commit;t.dispatch,t.state;e("FIRST_RUN_DISABLE")},setType:function(t,e){var a=t.commit;t.dispatch,t.state;console.log("set type value: "+e),a("TYPE_SET",e)},setValidated:function(t,e){var a=t.commit;t.dispatch,t.state;a("VALIDATED_SET",e)},addLeg:function(t){var e=t.commit,a=(t.dispatch,t.state),i=void 0;i=a.firstRun?{sample:"",runsdim:"",wip:1,td_low_bound:0,td_high_bound:0}:{sample:"",runsdim:"",wip:1,td_low_bound:0,td_high_bound:0},e("LEG_ADD",i)},updateLeg:function(t,e){var a=t.commit,i=(t.dispatch,t.state,e.leg),n=e.index;a("LEG_UPDATE",{index:n,leg:i})},removeLeg:function(t,e){var a=t.commit;t.dispatch,t.state;a("LEG_REMOVE",e)},updateSample:function(t,e){var a=t.commit,i=(t.dispatch,t.state,e.event),n=e.index;console.log(i);var s=i.target.value;a("LEG_SAMPLE",{index:n,value:s})},updateTarget:function(t,e){var a=t.commit,i=(t.dispatch,t.state,e.event),n=e.index,s=Number(i.target.value);a("LEG_TARGET",{index:n,value:s})},updateWip:function(t,e){var a=t.commit,i=(t.dispatch,t.state,e.event),n=e.index,s=Number(i.target.value);a("LEG_WIP",{index:n,value:s})},updateWipAll:function(t,e){var a=t.commit;t.dispatch,t.state;a("LEG_WIP_ALL",e)},updateTDLowBound:function(t,e){var a=t.commit,i=(t.dispatch,t.state,e.index),n=e.value;n=Number(n),a("LEG_TD_LOW",{index:i,value:n})},updateTDHighBound:function(t,e){var a=t.commit,i=(t.dispatch,t.state,e.index),n=e.value;n=Number(n),a("LEG_TD_HIGH",{index:i,value:n})},addTicket:function(t,e){var a=t.commit;t.dispatch,t.state;a("TICKET_ADD",e)},removeTicket:function(t,e){var a=t.commit;t.dispatch,t.state;a("TICKET_REMOVE",e)}};e.default=a},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a={isFirstRun:function(t){return t.firstRun},isValidated:function(t){return t.validated},getType:function(t){return t.type},getLegs:function(t){return t.legs},getTickets:function(t){return t.tickets.reverse()}};e.default=a},function(t,e,a){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var n=a(25),s=i(n),o={FIRST_RUN_DISABLE:function(t){t.firstRun=!1},TYPE_SET:function(t,e){t.type=e},VALIDATED_SET:function(t,e){t.validated=e},LEG_ADD:function(t,e){t.legs.push(e)},LEG_UPDATE:function(t,e){var a=e.index,i=e.leg;t.legs[a]=i},LEG_REMOVE:function(t,e){t.legs.splice(e,1)},LEG_SAMPLE:function(t,e){var a=e.index,i=e.value;t.legs[a].sample=i},LEG_SAMPLE_VALIDATION:function(t,e){var a=e.index,i=e.value;t.legs[a].sampleValidation=i},LEG_TARGET:function(t,e){var a=e.index,i=e.value;t.legs[a].runsdim=i},LEG_TARGET_VALIDATION:function(t,e){var a=e.index,i=e.value;t.legs[a].runsdimValidation=i},LEG_WIP:function(t,e){var a=e.index,i=e.value;t.legs[a].wip=i},LEG_WIP_ALL:function(t,e){var a=!0,i=!1,n=void 0;try{for(var o,l=(0,s.default)(t.legs);!(a=(o=l.next()).done);a=!0){var r=o.value;r.wip=e}}catch(t){i=!0,n=t}finally{try{!a&&l.return&&l.return()}finally{if(i)throw n}}},LEG_WIP_VALIDATION:function(t,e){var a=e.index,i=e.value;t.legs[a].wipValidation=i},LEG_TD_LOW:function(t,e){var a=e.index,i=e.value;t.legs[a].td_low_bound=i},LEG_TD_HIGH:function(t,e){var a=e.index,i=e.value;t.legs[a].td_high_bound=i},TICKET_ADD:function(t,e){t.tickets.push(e)},TICKET_REMOVE:function(t,e){t.tickets.splice(e,1)}};e.default=o},function(t,e,a){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var n=a(47),s=i(n),o=a(6),l=i(o),r=a(51),u=i(r),d=a(50),c=i(d),p=a(52),v=i(p);s.default.use(l.default);var f={firstRun:!0,validated:!1,type:0,legs:[],tickets:[]};e.default=new l.default.Store({state:f,mutations:v.default,getters:u.default,actions:c.default})},function(t,e,a){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var n=a(111),s=i(n),o=a(115),l=i(o),r=a(53),u=i(r);e.default={components:{Inserter:s.default,Tickets:l.default},store:u.default}},function(t,e,a){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var n=a(25),s=i(n),o=a(7),l=i(o),r=a(6),u=a(112),d=i(u);e.default={components:{Leg:d.default},mounted:function(){this.wrapAddLeg()},computed:(0,l.default)({singleLeg:function(){return 1!==this.getLegs.length}},(0,r.mapGetters)(["isFirstRun","getType","getLegs"])),data:function(){return{insValidated:[]}},methods:(0,l.default)({wrapAddLeg:function(){console.log(""),this.addLeg(),this.insValidated.push(!1),this.setValidated(!1)},updateValidation:function(t,e){console.log("I am validating"),console.log(t),console.log(e),this.insValidated[t]=e,console.log(this.insValidated);var a=!0,i=!0,n=!1,o=void 0;try{for(var l,r=(0,s.default)(this.insValidated);!(i=(l=r.next()).done);i=!0){var u=l.value;a=a&&u}}catch(t){n=!0,o=t}finally{try{!i&&r.return&&r.return()}finally{if(n)throw o}}a?this.setValidated(!0):this.setValidated(!1)},setSimulationType:function(t){console.log("changing simulation");var e=t.target.value;if(this.setType(e),"2"===this.getType){this.updateWipAll(1);for(var a=0;a<this.getLegs.length;a++)this.validateWip("1",a)}return this.getType}},(0,r.mapActions)(["disableFirsrRun","setValidated","setType","addLeg","removeLeg"]))}},function(t,e,a){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var n=a(7),s=i(n),o=a(6),l=a(113),r=i(l),u=a(114),d=i(u),c=a(48),p=i(c),v=function(t,e,a){var i=10*t;"0.0"!==t&&(i+=1),e.selectedIndex=i;for(var n=0;n<a.length;n++)n<i?a[n].disabled=!0:a[n].disabled=!1};e.default={components:{Loader:r.default,Saver:d.default},props:{leg:{type:Object,required:!0},index:{type:Number,required:!0}},data:function(){return{sampleValidation:!1,wipValidation:!0,runsdimValidation:!1}},computed:(0,s.default)({legLabels:function(){return p.default[this.getType]},legValidated:function(){var t=this.sampleValidation,e=this.wipValidation,a=this.runsdimValidation,i=t&&e&&a;return this.$emit("changeValidation",this.index,i),i}},(0,o.mapGetters)(["isFirstRun","getType"])),methods:(0,s.default)({loadSample:function(t){var e={};e.target={},e.target.value=t;var a=this.index;this.updateSample({event:e,index:a}),this.validateSample(e)},validateSample:function(t){this.disableFirstRun(),""!==t.target.value&&null==t.target.value.match(/^[0-9]+(,[0-9]+)*$/)?this.sampleValidation=!1:this.sampleValidation=!0;var e=this.index;this.updateSample({event:t,index:e}),this.legValidated},validateTarget:function(t){this.disableFirstRun(),t.target.value<=0?this.runsdimValidation=!1:this.runsdimValidation=!0;var e=this.index;this.updateTarget({event:t,index:e}),this.legValidated},validateWip:function(t){this.disableFirstRun(),t.target.value<=0?this.wipValidation=!1:this.wipValidation=!0;var e=this.index;this.updateWip({event:t,index:e}),this.legValidated},setTechDebtLow:function(t){var e=this.index,a="techDebtMax"+e,i=document.getElementById(a),n=i.options,s=t.target.value;v(s,i,n),this.updateTDLowBound({index:e,value:s});var o=Math.round(10*(Number(s)+.1))/10;this.updateTDHighBound({index:e,value:o})},setTechDebtHigh:function(t){var e=this.index,a=t.target.value;this.updateTDHighBound({index:e,value:a})}},(0,o.mapActions)(["disableFirstRun","updateWipAll","updateSample","updateTarget","updateWip","updateTDLowBound","updateTDHighBound"]))}},function(t,e,a){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var n=a(7),s=i(n),o=a(45),l=i(o),r=a(6);e.default={data:function(){return{loadables:{},showPopup:!1}},computed:(0,s.default)({},(0,r.mapGetters)(["isFirstRun","getType"])),methods:(0,s.default)({loadSample:function(t,e){this.$emit("sampleLoaded",e),this.showPopup=!1},openPopup:function(){this.loadables=(0,l.default)(),this.showPopup=!0}},(0,r.mapActions)(["disableFirstRun","updateWipAll","updateSample","updateTarget","updateWip","updateTDLowBound","updateTDHighBound"]))}},function(t,e,a){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var n=a(7),s=i(n),o=a(45),l=i(o),r=a(6);e.default={data:function(){return{showPopup:!1,enableSave:!1,name:""}},props:{sample:{type:String,required:!0}},computed:(0,s.default)({},(0,r.mapGetters)(["isFirstRun","getType"])),methods:(0,s.default)({validateName:function(t){t.target.value.length>0?this.enableSave=!0:this.enableSave=!1},saveSample:function(t){(0,l.default)(t,this.sample),this.showPopup=!1},openPopup:function(){this.name="",this.showPopup=!0}},(0,r.mapActions)(["disableFirstRun","updateWipAll","updateSample","updateTarget","updateWip","updateTDLowBound","updateTDHighBound"]))}},function(t,e,a){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var n=a(7),s=i(n),o=a(61),l=i(o),r=a(106),u=i(r),d=a(6),c=a(49),p=i(c),v=function(t,e){return{chunks:t,fun:e,predstot:1e3,runstot:2e4}},f=function(t,e){return new l.default(function(a,i){u.default.post(t).type("application/json").send(e).end(function(t,e){t?i(t):a(e)})})};e.default={computed:(0,s.default)({},(0,d.mapGetters)(["isFirstRun","isValidated","getType","getLegs","getTickets"])),methods:(0,s.default)({runSimulation:function(t,e){if(this.allValidated===!1)throw new Error("Data are not validated");if(this.getTickets[0]&&this.getTickets[0].loading)throw new Error("Simulation running.");console.log(e);var a=this.getLegs;console.log(this.getType);var i="/api",n=v(a,this.getType);console.log(i),console.log(n),this.addTicket({loading:!0});var s=f(i,n);s.then(function(t){this.removeTicket(e),this.addTicket(t.body)}.bind(this))},getLabels:function(t){return p.default[this.getTickets[t].fun]}},(0,d.mapActions)(["addTicket","removeTicket"]))}},,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},,,,,,,function(t,e,a){var i,n;a(99),i=a(54);var s=a(117);n=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(n=i=i.default),"function"==typeof n&&(n=n.options),n.render=s.render,n.staticRenderFns=s.staticRenderFns,t.exports=i},function(t,e,a){var i,n;a(103),i=a(55);var s=a(121);n=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(n=i=i.default),"function"==typeof n&&(n=n.options),n.render=s.render,n.staticRenderFns=s.staticRenderFns,t.exports=i},function(t,e,a){var i,n;a(98),i=a(56);var s=a(116);n=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(n=i=i.default),"function"==typeof n&&(n=n.options),n.render=s.render,n.staticRenderFns=s.staticRenderFns,t.exports=i},function(t,e,a){var i,n;a(101),i=a(57);var s=a(119);n=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(n=i=i.default),"function"==typeof n&&(n=n.options),n.render=s.render,n.staticRenderFns=s.staticRenderFns,t.exports=i},function(t,e,a){var i,n;a(100),i=a(58);var s=a(118);n=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(n=i=i.default),"function"==typeof n&&(n=n.options),n.render=s.render,n.staticRenderFns=s.staticRenderFns,t.exports=i},function(t,e,a){var i,n;a(102),i=a(59);var s=a(120);n=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(n=i=i.default),"function"==typeof n&&(n=n.options),n.render=s.render,n.staticRenderFns=s.staticRenderFns,t.exports=i},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"leginserter"},[a("div",{staticClass:"four columns",class:{"not-validated":!t.sampleValidation&&!t.isFirstRun}},[a("label",{staticClass:"label"},[t._v("Historical Sample")]),t._v(" "),a("span",{staticClass:"unit"},[t._v(t._s(t.legLabels.sample))]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.leg.sample,expression:"leg.sample"}],staticClass:"u-full-width",attrs:{id:"leg"+t.index+"_sample",placeholder:"1,2,3,4,5",type:"text"},domProps:{value:t.leg.sample},on:{input:[function(e){e.target.composing||t.$set(t.leg,"sample",e.target.value)},function(e){t.validateSample(e)}]}}),t._v(" "),a("div",{staticClass:"row internalRow"},[a("Loader",{on:{sampleLoaded:t.loadSample}}),t._v(" "),a("Saver",{directives:[{name:"show",rawName:"v-show",value:t.sampleValidation,expression:"sampleValidation"}],attrs:{sample:t.leg.sample}})],1)]),t._v(" "),a("div",{staticClass:"onehalf columns",class:{"not-validated":!t.runsdimValidation&&!t.isFirstRun,four:2==t.getType}},[a("label",{staticClass:"label"},[t._v("Target")]),t._v(" "),a("span",{staticClass:"unit"},[t._v(t._s(t.legLabels.target))]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.leg.runsdim,expression:"leg.runsdim"}],staticClass:"u-full-width",attrs:{id:"leg"+t.index+"_target",placeholder:"5",type:"number"},domProps:{value:t.leg.runsdim},on:{input:[function(e){e.target.composing||t.$set(t.leg,"runsdim",e.target.value)},function(e){t.validateTarget(e)}]}})]),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:2!=t.getType,expression:"getType!=2"}],staticClass:"onehalf columns",class:{"not-validated":!t.wipValidation&&!t.isFirstRun}},[a("label",{staticClass:"label"},[t._v("WIP")]),t._v(" "),a("span",{staticClass:"unit"},[t._v(t._s(t.legLabels.wip))]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.leg.wip,expression:"leg.wip"}],staticClass:"u-full-width",attrs:{id:"leg"+t.index+"_wip",placeholder:"5",type:"number"},domProps:{value:t.leg.wip},on:{input:[function(e){e.target.composing||t.$set(t.leg,"wip",e.target.value)},function(e){t.validateWip(e)}]}})]),t._v(" "),a("div",{staticClass:"three columns"},[a("label",{staticClass:"label"},[t._v("Tech Debt Simulation")]),t._v(" "),a("div",{staticClass:"techDebtContainer"},[a("span",{staticClass:"unit"},[t._v("Minimun")]),t._v(" "),a("select",{attrs:{id:"techDebtMin"+t.index},on:{change:function(e){t.setTechDebtLow(e)}}},[a("option",{attrs:{value:"0.0"}},[t._v("0%")]),t._v(" "),a("option",{attrs:{value:"0.1"}},[t._v("10%")]),t._v(" "),a("option",{attrs:{value:"0.2"}},[t._v("20%")]),t._v(" "),a("option",{attrs:{value:"0.3"}},[t._v("30%")]),t._v(" "),a("option",{attrs:{value:"0.4"}},[t._v("40%")])])]),t._v(" "),a("div",{staticClass:"techDebtContainer"},[a("span",{staticClass:"unit"},[t._v("Maximum")]),t._v(" "),a("select",{attrs:{id:"techDebtMax"+t.index},on:{change:function(e){t.setTechDebtHigh(e)}}},[a("option",{attrs:{value:"0.0"}},[t._v("0%")]),t._v(" "),a("option",{attrs:{value:"0.1"}},[t._v("10%")]),t._v(" "),a("option",{attrs:{value:"0.2"}},[t._v("20%")]),t._v(" "),a("option",{attrs:{value:"0.3"}},[t._v("30%")]),t._v(" "),a("option",{attrs:{value:"0.4"}},[t._v("40%")]),t._v(" "),a("option",{attrs:{value:"0.5"}},[t._v("50%")]),t._v(" "),a("option",{attrs:{value:"0.6"}},[t._v("60%")])])])])])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container"},[a("Inserter"),t._v(" "),a("Tickets")],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"two columns",attrs:{id:"saver"}},[a("a",{staticClass:"save icon-floppy",attrs:{id:"saveSample",href:"#"},on:{click:function(e){return e.preventDefault(),t.openPopup(e)}}},[t._v(" Save")]),t._v(" "),a("transition",{attrs:{name:"fade_overlay"}},[t.showPopup?a("div",{staticClass:"overlay",attrs:{id:"loaderPopup"}}):t._e()]),t._v(" "),a("transition",{attrs:{name:"fade_popup"}},[t.showPopup?a("div",{staticClass:"popupContainerSave"},[a("h4",[t._v("Insert a name for your sample:")]),t._v(" "),a("div",{staticClass:"popupContent"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.name,expression:"name"}],staticClass:"nameInput",attrs:{placeholder:"simple name",type:"text"},domProps:{value:t.name},on:{input:[function(e){e.target.composing||(t.name=e.target.value)},function(e){t.validateName(e)}]}}),t._v(" "),a("a",{staticClass:"button small",class:{disabled:!t.enableSave},attrs:{href:"#"},on:{click:function(e){e.preventDefault(),t.saveSample(t.name)}}},[t._v("Save")])]),t._v(" "),a("a",{staticClass:"cancel",attrs:{href:"#"},on:{click:function(e){e.preventDefault(),t.showPopup=!1}}},[t._v("Cancel")])]):t._e()])],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"two columns",attrs:{id:"loader"}},[a("a",{staticClass:"load icon-download",attrs:{id:"loaderSample",href:"#"},on:{click:function(e){return e.preventDefault(),t.openPopup(e)}}},[t._v(" Load")]),t._v(" "),a("transition",{attrs:{name:"fade_overlay"}},[t.showPopup?a("div",{staticClass:"overlay",attrs:{id:"loaderPopup"}}):t._e()]),t._v(" "),a("transition",{attrs:{name:"fade_popup"}},[t.showPopup?a("div",{staticClass:"popupContainer"},[a("h4",[t._v("Select sample to load:")]),t._v(" "),a("div",{staticClass:"popupContent"},t._l(t.loadables,function(e,i){return a("div",[a("div",{staticClass:"row clearfix loadLine"},[a("span",{staticClass:"key"},[t._v(t._s(i))]),t._v(" "),a("span",{staticClass:"value"},[t._v(t._s(e))]),t._v(" "),a("a",{staticClass:"button small",attrs:{href:"#"},on:{click:function(a){a.preventDefault(),t.loadSample(i,e)}}},[t._v("Load")])])])})),t._v(" "),a("a",{staticClass:"cancel",attrs:{href:"#"},on:{click:function(e){e.preventDefault(),t.showPopup=!1}}},[t._v("Cancel")])]):t._e()])],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"tickets-wrapper"}},[a("div",{attrs:{id:"cta"}},[a("button",{staticClass:"button-primary",class:{disabled:!t.isValidated||t.getTickets[0]&&t.getTickets[0].loading},attrs:{id:"cta_button"},on:{click:function(e){t.runSimulation(t.getTickets.length)}}},[t._v("Run Simulation")])]),t._v(" "),a("div",{attrs:{id:"tickets"}},t._l(t.getTickets,function(e,i){return a("div",{key:e.index,staticClass:"row ticket",attrs:{id:"ticket"+i}},[e.loading?[a("h1",[a("span",{staticClass:"icon-spin1 animate-spin"}),t._v(" Simulation "+t._s(t.getTickets.length-i)+" - Running...")])]:[a("h1",[t._v("Simulation "+t._s(t.getTickets.length-i))]),t._v(" "),a("h2",[t._v(t._s(t.getLabels(i).type))]),t._v(" "),a("table",{staticClass:"u-full-width"},[a("thead",[a("tr",[a("th",[t._v("N°")]),t._v(" "),a("th",[t._v("Sample")]),t._v(" "),a("th",[t._v("Target")]),t._v(" "),2!=e.fun?a("th",[t._v("Wip")]):t._e(),t._v(" "),a("th",{staticClass:"incatious"},[t._v("\n                  Incatious Scenario "),a("br"),t._v(" "),a("span",{staticClass:"unit"},[t._v("("+t._s(t.getLabels(i).unit)+")")])]),t._v(" "),a("th",{staticClass:"three"},[t._v("\n                  Three/Quarters Scenario "),a("br"),t._v(" "),a("span",{staticClass:"unit"},[t._v("("+t._s(t.getLabels(i).unit)+")")])]),t._v(" "),a("th",{staticClass:"safe"},[t._v("\n                  Safe Scenario "),a("br"),t._v(" "),a("span",{staticClass:"unit"},[t._v("("+t._s(t.getLabels(i).unit)+")")])]),t._v(" "),a("th",[t._v("Attributes")])])]),t._v(" "),a("tbody",t._l(e.table,function(i,n){return a("tr",{key:i.index,staticClass:"row",class:{montecarlo:!i.montecarlo},attrs:{id:"line"+n}},[a("td",{staticClass:"number"},[t._v(t._s(i.name))]),t._v(" "),a("td",[i.request?a("span",[t._v(t._s(i.request.sample))]):t._e()]),t._v(" "),a("td",[i.request?a("span",[t._v(t._s(i.request.runsdim))]):t._e()]),t._v(" "),2!=e.fun?a("td",[i.request?a("span",[t._v(t._s(i.request.wip))]):t._e()]):t._e(),t._v(" "),i.montecarlo?[a("td",{staticClass:"scenario"},[t._v(t._s(i.low))]),t._v(" "),a("td",{staticClass:"scenario"},[t._v(t._s(i.medium))]),t._v(" "),a("td",{staticClass:"scenario"},[t._v(t._s(i.high))])]:[a("td",{staticClass:"scenario center",attrs:{colspan:"3"}},[t._v("\n                    "+t._s(i.medium)+"\n                    "),a("span",{staticClass:"label no-montecarlo"},[t._v("No Montecarlo Simulation (Unvariant sample)")])])],t._v(" "),a("td",[i.longest?a("span",{staticClass:"label attribute"},[t._v("Longest")]):t._e(),t._v(" "),i.shortest?a("span",{staticClass:"label attribute"},[t._v("Shortest")]):t._e()])],2)}))])]],2)}))])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"row u-full-width",attrs:{id:"inserter-wrapper"}},[a("div",{attrs:{id:"inserter"}},[a("div",{attrs:{id:"type"}},[t._v("\n      Simulation: \n      "),a("select",{attrs:{id:"simulatioTypeSelect"},on:{change:t.setSimulationType}},[a("option",{attrs:{value:"0"}},[t._v("Kanban: I would like to forecast the N° of Days to Delivery a given number of stories")]),t._v(" "),a("option",{attrs:{value:"1"}},[t._v("Kanban: I would like to forecast the N° of Stories Done in given number of days")]),t._v(" "),a("option",{attrs:{value:"2"}},[t._v("Scrum: I would like to forecast the N° of Sprints to Delivery a given number of stories")])])]),t._v(" "),a("div",{attrs:{id:"legs"}},[a("transition-group",{attrs:{name:"fade",tag:"div"}},t._l(t.getLegs,function(e,i){return a("div",{key:e,staticClass:"row",attrs:{id:"leg"+i}},[a("div",{staticClass:"one column name"},[t._v("\n              "+t._s(i+1)+"\n            ")]),t._v(" "),a("Leg",{attrs:{leg:e,index:i},on:{changeValidation:t.updateValidation}}),t._v(" "),a("div",{staticClass:"one column remove"},[a("a",{directives:[{name:"show",rawName:"v-show",value:t.singleLeg,expression:"singleLeg"}],staticClass:"icon-minus-circled",attrs:{href:"#"},on:{click:function(e){e.preventDefault(),t.removeLeg(i)}}})])],1)})),t._v(" "),a("a",{staticClass:"add icon-plus-squared",attrs:{id:"addLeg",href:"#"},on:{click:function(e){return e.preventDefault(),t.wrapAddLeg(e)}}},[t._v(" Add Group")])],1)])])},staticRenderFns:[]}}]);
//# sourceMappingURL=app.917739f7f9e5793b3da4.js.map