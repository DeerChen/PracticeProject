(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{14:function(e,n,t){},21:function(e,n,t){},22:function(e,n,t){"use strict";t.r(n);var a=t(0),i=t.n(a),r=t(1),u=t.n(r),o=(t(14),t(3)),l="del_item",c=(t(21),Object(o.b)((function(e){return{inputVal:e.inputVal,list:e.list}}),(function(e){return{valueChange:function(n){var t=function(e){return{type:"value_change",value:e.target.value}}(n);e(t)},submit:function(){e({type:"submit"})},delItem:function(n){var t=function(e){return{type:l,index:e}}(n);e(t)}}}))((function(e){var n=e.inputVal,t=e.valueChange,a=e.submit,r=e.list,u=e.delItem;return i.a.createElement("div",null,i.a.createElement("div",null,i.a.createElement("input",{value:n,onChange:t}),i.a.createElement("button",{onClick:a},"\u63d0\u4ea4")),i.a.createElement("ul",null,r.map((function(e,n){return i.a.createElement("li",{key:n,onClick:function(){return u(n)}},e)}))))})));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var s=t(2),v={inputVal:"",list:["\u5403\u996d","\u7761\u89c9","\u6253\u8c46\u8c46"]},f=function(e){return JSON.parse(JSON.stringify(e))},p=Object(s.b)((function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:v,n=arguments.length>1?arguments[1]:void 0;if("value_change"===n.type){var t=f(e);return t.inputVal=n.value,t}if("submit"===n.type){var a=f(e);return a.list.push(a.inputVal),a.inputVal="",a}if(n.type===l){var i=f(e);return i.list.splice(n.index,1),i}return e})),m=i.a.createElement(o.a,{store:p},i.a.createElement(c,null));u.a.render(m,document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},9:function(e,n,t){e.exports=t(22)}},[[9,1,2]]]);
//# sourceMappingURL=main.8b1f39e0.chunk.js.map