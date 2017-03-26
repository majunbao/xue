/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

!(function(e,n){ true?n(exports):"function"==typeof define&&define.amd?define(["exports"],n):n(e.Inferno=e.Inferno||{})})(this,(function(e){"use strict";function n(e){return!c(e.prototype)&&!c(e.prototype.render)}function t(e){var n=typeof e;return"string"===n||"number"===n}function r(e){return c(e)||f(e)}function o(e){return f(e)||e===!1||d(e)||c(e)}function i(e){return"function"==typeof e}function l(e){return"o"===e[0]&&"n"===e[1]}function a(e){return"string"==typeof e}function u(e){return"number"==typeof e}function f(e){return null===e}function d(e){return e===!0}function c(e){return void 0===e}function s(e){return"object"==typeof e}function v(e){throw e||(e=mn),new Error("Inferno Error: "+e)}function p(e,n){var t,r={};if(e)for(t in e)r[t]=e[t];if(n)for(t in n)r[t]=n[t];return r}function m(){this.listeners=[]}function h(e,n){return n.key=e,n}function g(e,n){return u(e)&&(e="."+e),f(n.key)||"."===n.key[0]?h(e,n):n}function y(e,n){return n.key=e+n.key,n}function k(e,n,r,i){for(var l=e.length;r<l;r++){var a=e[r],u=i+"."+r;o(a)||(gn(a)?k(a,n,0,u):(t(a)?a=cn(a,null):(sn(a)&&a.dom||a.key&&"."===a.key[0])&&(a=un(a)),a=f(a.key)||"."===a.key[0]?h(u,a):y(i,a),n.push(a)))}}function b(e){var n;e.$?e=e.slice():e.$=!0;for(var r=0,i=e.length;r<i;r++){var l=e[r];if(o(l)||gn(l)){var a=(n||e).slice(0,r);return k(e,a,r,""),a}t(l)?(n||(n=e.slice(0,r)),n.push(g(r,cn(l,null)))):sn(l)&&l.dom||f(l.key)&&!(64&l.flags)?(n||(n=e.slice(0,r)),n.push(g(r,un(l)))):n&&n.push(g(r,un(l)))}return n||e}function C(e){return gn(e)?b(e):sn(e)&&e.dom?un(e):e}function N(e,n,t){28&e.flags||!r(t)||r(n.children)||(e.children=n.children),n.ref&&(e.ref=n.ref,delete n.ref),n.events&&(e.events=n.events),r(n.key)||(e.key=n.key,delete n.key)}function x(e,n){n.flags="svg"===e?128:"input"===e?512:"select"===e?2048:"textarea"===e?1024:"media"===e?256:2}function w(e){var n=e.props,t=e.children;if(28&e.flags){var i=e.type,l=i.defaultProps;if(!r(l))if(n)for(var u in l)c(n[u])&&(n[u]=l[u]);else n=e.props=l;a(i)&&(x(i,e),n&&n.children&&(e.children=n.children,t=n.children))}n&&N(e,n,t),o(t)||(e.children=C(t)),n&&!o(n.children)&&(n.children=C(n.children))}function _(e,n,t,r){var o=En.get(e);t?(o||(o={items:new Map,count:0,docEvent:null},o.docEvent=S(e,o),En.set(e,o)),n||(o.count++,Sn&&"onClick"===e&&U(r)),o.items.set(r,t)):o&&o.items.has(r)&&(o.count--,o.items.delete(r),0===o.count&&(document.removeEventListener(O(e),o.docEvent),En.delete(e)))}function M(e,n,t,r,o){var i=t.get(n);if((!i||(r--,o.dom=n,i.event?i.event(i.data,e):i(e),!o.stopPropagation))&&r>0){var l=n.parentNode;(l&&l.disabled!==!0||l===document.body)&&M(e,l,t,r,o)}}function O(e){return e.substr(2).toLowerCase()}function S(e,n){var t=function(e){var t={stopPropagation:!1,dom:document};Object.defineProperty(e,"currentTarget",{configurable:!0,get:function(){return t.dom}}),e.stopPropagation=function(){t.stopPropagation=!0};var r=n.count;r>0&&M(e,e.target,n.items,r,t)};return document.addEventListener(O(e),t),t}function E(){}function U(e){e.onclick=E}function V(e){return"checkbox"===e||"radio"===e}function D(e){return V(e.type)?!r(e.checked):!r(e.value)}function I(e){var n=this.vNode,t=n.events||jn,r=n.dom;if(t.onInput){var o=t.onInput;o.event?o.event(o.data,e):o(e)}else t.oninput&&t.oninput(e);L(this.vNode,r)}function T(e){var n=this.vNode,t=n.events||jn,r=t.onChange;r.event?r.event(r.data,e):r(e)}function P(e){var n=this.vNode,t=n.events||jn,r=n.dom;if(t.onClick){var o=t.onClick;o.event?o.event(o.data,e):o(e)}else t.onclick&&t.onclick(e);L(this.vNode,r)}function j(e){var n=document.querySelectorAll('input[type="radio"][name="'+e+'"]');[].forEach.call(n,(function(e){var n=Un.get(e);if(n){n.vNode.props&&(e.checked=n.vNode.props.checked)}}))}function W(e,n){var t=e.props||jn;if(L(e,n),D(t)){var r=Un.get(n);return r||(r={vNode:e},V(t.type)?(n.onclick=P.bind(r),n.onclick.wrapped=!0):(n.oninput=I.bind(r),n.oninput.wrapped=!0),t.onChange&&(n.onchange=T.bind(r),n.onchange.wrapped=!0),Un.set(n,r)),r.vNode=e,!0}return!1}function L(e,n){var t=e.props||jn,o=t.type,i=t.value,l=t.checked,a=t.multiple,u=t.defaultValue,f=!r(i);o&&o!==n.type&&(n.type=o),a&&a!==n.multiple&&(n.multiple=a),r(u)||f||(n.defaultValue=u+""),V(o)?(f&&(n.value=i),r(l)||(n.checked=l),"radio"===o&&t.name&&j(t.name)):f&&n.value!==i?n.value=i:r(l)||(n.checked=l)}function A(e){return!r(e.value)}function z(e,n){if("optgroup"===e.type){var t=e.children;if(gn(t))for(var r=0,o=t.length;r<o;r++)R(t[r],n);else sn(t)&&R(t,n)}else R(e,n)}function R(e,n){var t=e.props||jn,o=e.dom;o.value=t.value,gn(n)&&n.indexOf(t.value)!==-1||t.value===n?o.selected=!0:r(n)&&r(t.selected)||(o.selected=t.selected||!1)}function K(e){var n=this.vNode,t=n.events||jn,r=n.dom;if(t.onChange){var o=t.onChange;o.event?o.event(o.data,e):o(e)}else t.onchange&&t.onchange(e);F(this.vNode,r,!1)}function G(e,n,t){var r=e.props||jn;if(F(e,n,t),A(r)){var o=Un.get(n);return o||(o={vNode:e},n.onchange=K.bind(o),n.onchange.wrapped=!0,Un.set(n,o)),o.vNode=e,!0}return!1}function F(e,n,t){var i=e.props||jn;i.multiple!==n.multiple&&(n.multiple=i.multiple);var l=e.children;if(!o(l)){var a=i.value;if(t&&r(a)&&(a=i.defaultValue),gn(l))for(var u=0,f=l.length;u<f;u++)z(l[u],a);else sn(l)&&z(l,a)}}function B(e){return!r(e.value)}function H(e){var n=this.vNode,t=n.events||jn,r=t.onChange;r.event?r.event(r.data,e):r(e)}function $(e){var n=this.vNode,t=n.events||jn,r=n.dom;if(t.onInput){var o=t.onInput;o.event?o.event(o.data,e):o(e)}else t.oninput&&t.oninput(e);J(this.vNode,r,!1)}function q(e,n,t){var r=e.props||jn;J(e,n,t);var o=Un.get(n);return!!B(r)&&(o||(o={vNode:e},n.oninput=$.bind(o),n.oninput.wrapped=!0,r.onChange&&(n.onchange=H.bind(o),n.onchange.wrapped=!0),Un.set(n,o)),o.vNode=e,!0)}function J(e,n,t){var o=e.props||jn,i=o.value,l=n.value;if(r(i)){if(t){var a=o.defaultValue;r(a)?""!==l&&(n.value=""):a!==l&&(n.value=a)}}else l!==i&&(n.value=i)}function Y(e,n,t,r){return 512&e?W(n,t):2048&e?G(n,t,r):!!(1024&e)&&q(n,t,r)}function X(e){for(var n=e.firstChild;n;)if(8===n.nodeType)if("!"===n.data){var t=document.createTextNode("");e.replaceChild(t,n),n=n.nextSibling}else{var r=n.previousSibling;e.removeChild(n),n=r||e.firstChild}else n=n.nextSibling}function Q(e,n,t,r,o,i){var l=e.type,a=e.ref;e.dom=n;var u=e.props||jn;if(i){var f=n.namespaceURI===Cn,d=Be(e,l,u,r,f),c=d._lastInput;d._vComponent=e,d._vNode=e,re(c,n,t,d._childContext,f),Ke(e,a,d,t),yn.findDOMNodeEnabled&&Tn.set(d,n),e.children=d}else{var s=qe(e,l,u,r);re(s,n,t,r,o),e.children=s,e.dom=s.dom,Ge(a,n,t)}return n}function Z(e,n,t,r,o){var i=e.children,l=e.props,a=e.events,u=e.flags,f=e.ref;if((o||128&u)&&(o=!0),1!==n.nodeType||n.tagName.toLowerCase()!==e.type){var d=Ae(e,null,t,r,o);return e.dom=d,nn(n.parentNode,d,n),d}e.dom=n,i&&ee(i,n,t,r,o);var c=!1;if(2&u||(c=Y(u,e,n,!1)),l)for(var s in l)Ve(s,null,l[s],n,o,c);if(a)for(var v in a)Ie(v,null,a[v],n);return f&&Fe(n,f,t),n}function ee(e,n,r,o,i){X(n);var l=n.firstChild;if(gn(e))for(var a=0,u=e.length;a<u;a++){var d=e[a];!f(d)&&s(d)&&(l?(l=re(d,l,r,o,i),l=l.nextSibling):je(d,n,r,o,i))}else t(e)?(l&&3===l.nodeType?l.nodeValue!==e&&(l.nodeValue=e):e&&(n.textContent=e),l=l.nextSibling):s(e)&&(re(e,l,r,o,i),l=l.nextSibling);for(;l;){var c=l.nextSibling;n.removeChild(l),l=c}}function ne(e,n){if(3!==n.nodeType){var t=We(e,null);return e.dom=t,nn(n.parentNode,t,n),t}var r=e.children;return n.nodeValue!==r&&(n.nodeValue=r),e.dom=n,n}function te(e,n){return e.dom=n,n}function re(e,n,t,r,o){var i=e.flags;return 28&i?Q(e,n,t,r,o,4&i):3970&i?Z(e,n,t,r,o):1&i?ne(e,n):4096&i?te(e,n):void v()}function oe(e,n,t){var r=n&&n.firstChild;if(r){for(re(e,r,t,jn,!1),r=n.firstChild;r=r.nextSibling;)n.removeChild(r);return!0}return!1}function ie(e,n,t,r){var o=e.type,i=Dn.get(o);if(!c(i)){var l=e.key,a=null===l?i.nonKeyed:i.keyed.get(l);if(!c(a)){var u=a.pop();if(!c(u))return xe(u,e,null,n,t,r,!0),e.dom}}return null}function le(e){var n=e.type,t=e.key,r=Dn.get(n);if(c(r)&&(r={nonKeyed:[],keyed:new Map},Dn.set(n,r)),f(t))r.nonKeyed.push(e);else{var o=r.keyed.get(t);c(o)&&(o=[],r.keyed.set(t,o)),o.push(e)}}function ae(e,n,t,r){var o=e.type,i=Vn.get(o);if(!c(i)){var l=e.key,a=null===l?i.nonKeyed:i.keyed.get(l);if(!c(a)){var u=a.pop();if(!c(u)){if(!_e(u,e,null,n,t,r,4&e.flags,!0))return e.dom}}}return null}function ue(e){var n=e.ref;if(!n||!(n.onComponentWillMount||n.onComponentWillUnmount||n.onComponentDidMount||n.onComponentWillUpdate||n.onComponentDidUpdate)){var t=e.type,r=e.key,o=Vn.get(t);if(c(o)&&(o={nonKeyed:[],keyed:new Map},Vn.set(t,o)),f(r))o.nonKeyed.push(e);else{var i=o.keyed.get(r);c(i)&&(i=[],o.keyed.set(r,i)),i.push(e)}}}function fe(e,n,t,r,o){var i=e.flags;28&i?ce(e,n,t,r,o):3970&i?se(e,n,t,r,o):4097&i&&de(e,n)}function de(e,n){n&&tn(n,e.dom)}function ce(e,n,t,o,i){var l=e.children,a=e.flags,u=4&a,f=e.ref,d=e.dom;if(i||(u?l._unmounted||(l._ignoreSetState=!0,yn.beforeUnmount&&yn.beforeUnmount(e),l.componentWillUnmount&&l.componentWillUnmount(),f&&!i&&f(null),l._unmounted=!0,yn.findDOMNodeEnabled&&Tn.delete(l),fe(l._lastInput,null,l._lifecycle,!1,i)):(r(f)||r(f.onComponentWillUnmount)||f.onComponentWillUnmount(d),fe(l,null,t,!1,i))),n){var c=l._lastInput;r(c)&&(c=l),tn(n,d)}yn.recyclingEnabled&&!u&&(n||o)&&ue(e)}function se(e,n,t,o,i){var l=e.dom,a=e.ref,u=e.events;a&&!i&&pe(a);var d=e.children;if(r(d)||ve(d,t,i),!f(u))for(var c in u)Ie(c,u[c],null,l),u[c]=null;n&&tn(n,l),yn.recyclingEnabled&&(n||o)&&le(e)}function ve(e,n,t){if(gn(e))for(var r=0,i=e.length;r<i;r++){var l=e[r];!o(l)&&s(l)&&fe(l,null,n,!1,t)}else s(e)&&fe(e,null,n,!1,t)}function pe(e){if(i(e))e(null);else{if(o(e))return;v()}}function me(e){yn.findDOMNodeEnabled||v();var n=e&&e.nodeType?e:null;return Tn.get(e)||n}function he(e){for(var n=0,t=In.length;n<t;n++){var r=In[n];if(r.dom===e)return r}return null}function ge(e,n,t){var r={dom:e,input:n,lifecycle:t};return In.push(r),r}function ye(e){for(var n=0,t=In.length;n<t;n++)if(In[n]===e)return void In.splice(n,1)}function ke(e,n){if(Pn===n&&v(),e!==pn){var t=he(n);if(f(t)){var i=new m;o(e)||(e.dom&&(e=un(e)),oe(e,n,i)||je(e,n,i,jn,!1),t=ge(n,e,i),i.trigger())}else{var l=t.lifecycle;l.listeners=[],r(e)?(fe(t.input,n,l,!1,!1),ye(t)):(e.dom&&(e=un(e)),Ce(t.input,e,n,l,jn,!1,!1)),l.trigger(),t.input=e}if(t){var a=t.input;if(a&&28&a.flags)return a.children}}}function be(e){return function(n,t){e||(e=n),ke(t,e)}}function Ce(e,n,t,r,o,i,l){if(e!==n){var a=e.flags,u=n.flags;28&u?28&a?_e(e,n,t,r,o,i,4&u,l):$e(t,Re(n,null,r,o,i,4&u),e,r,l):3970&u?3970&a?xe(e,n,t,r,o,i,l):$e(t,Ae(n,null,r,o,i),e,r,l):1&u?1&a?Me(e,n):$e(t,We(n,null),e,r,l):4096&u?4096&a?Oe(e,n):$e(t,Le(n,null),e,r,l):He(e,n,t,r,o,i,l)}}function Ne(e,n,t,r){sn(e)?fe(e,n,t,!0,r):gn(e)?rn(n,e,t,r):n.textContent=""}function xe(e,n,t,o,i,l,a){var u=n.type;if(e.type!==u)en(e,n,t,o,i,l,a);else{var f=e.dom,d=e.props,c=n.props,s=e.children,v=n.children,p=e.flags,m=n.flags,h=n.ref,g=e.events,y=n.events;n.dom=f,(l||128&m)&&(l=!0),s!==v&&we(p,m,s,v,f,o,i,l,a);var k=!1;if(2&m||(k=Y(m,n,f,!1)),d!==c){var b=d||jn,C=c||jn;if(C!==jn)for(var N in C){var x=C[N],w=b[N];r(x)?Pe(N,x,f):Ve(N,w,x,f,l,k)}if(b!==jn)for(var _ in b)r(C[_])&&Pe(_,b[_],f)}g!==y&&De(g,y,f),h&&(e.ref!==h||a)&&Fe(f,h,o)}}function we(e,n,r,i,l,a,u,f,d){var c=!1,s=!1;64&n?c=!0:32&e&&32&n?(s=!0,c=!0):o(i)?Ne(r,l,a,d):o(r)?t(i)?Je(l,i):gn(i)?ze(i,l,a,u,f):je(i,l,a,u,f):t(i)?t(r)?Ye(l,i):(Ne(r,l,a,d),Je(l,i)):gn(i)?gn(r)?(c=!0,ln(r,i)&&(s=!0)):(Ne(r,l,a,d),ze(i,l,a,u,f)):gn(r)?(rn(l,r,a,d),je(i,l,a,u,f)):sn(i)&&(sn(r)?Ce(r,i,l,a,u,f,d):(Ne(r,l,a,d),je(i,l,a,u,f))),c&&(s?Ee(r,i,l,a,u,f,d):Se(r,i,l,a,u,f,d))}function _e(e,n,i,l,a,u,d,m){var h=e.type,g=n.type,y=e.key,k=n.key;if(h!==g||y!==k)return en(e,n,i,l,a,u,m),!1;var b=n.props||jn;if(d){var C=e.children;if(C._unmounted){if(f(i))return!0;nn(i,Re(n,null,l,a,u,4&n.flags),e.dom)}else{var N,x=C.state,w=C.state,_=C.props;c(C.getChildContext)||(N=C.getChildContext()),n.children=C,C._isSVG=u,C._syncSetState=!1,N=r(N)?a:p(a,N);var M=C._lastInput,O=C._updateComponent(x,w,_,b,a,!1,!1),S=!0;C._childContext=N,o(O)?O=dn():O===pn?(O=M,S=!1):t(O)?O=cn(O,null):gn(O)?v():s(O)&&O.dom&&(O=un(O)),28&O.flags?O.parentVNode=n:28&M.flags&&(M.parentVNode=n),C._lastInput=O,C._vNode=n,S&&(Ce(M,O,i,l,N,u,m),c(C.componentDidUpdate)||C.componentDidUpdate(_,x),yn.afterUpdate&&yn.afterUpdate(n),yn.findDOMNodeEnabled&&Tn.set(C,O.dom)),C._syncSetState=!0,n.dom=O.dom}}else{var E=!0,U=e.props,V=n.ref,D=!r(V),I=e.children,T=I;n.dom=e.dom,n.children=I,y!==k?E=!0:D&&!r(V.onComponentShouldUpdate)&&(E=V.onComponentShouldUpdate(U,b)),E!==!1&&(D&&!r(V.onComponentWillUpdate)&&V.onComponentWillUpdate(U,b),T=g(b,a),o(T)?T=dn():t(T)&&T!==pn?T=cn(T,null):gn(T)?v():s(T)&&T.dom&&(T=un(T)),T!==pn&&(Ce(I,T,i,l,a,u,m),n.children=T,D&&!r(V.onComponentDidUpdate)&&V.onComponentDidUpdate(U,b),n.dom=T.dom)),28&T.flags?T.parentVNode=n:28&I.flags&&(I.parentVNode=n)}return!1}function Me(e,n){var t=n.children,r=e.dom;n.dom=r,e.children!==t&&(r.nodeValue=t)}function Oe(e,n){n.dom=e.dom}function Se(e,n,t,r,o,i,l){for(var a=e.length,u=n.length,f=a>u?u:a,d=0;d<f;d++){var c=n[d];c.dom&&(c=n[d]=un(c)),Ce(e[d],c,t,r,o,i,l)}if(a<u)for(d=f;d<u;d++){var s=n[d];s.dom&&(s=n[d]=un(s)),Xe(t,je(s,null,r,o,i))}else if(0===u)rn(t,e,r,l);else if(a>u)for(d=f;d<a;d++)fe(e[d],t,r,!1,l)}function Ee(e,n,t,r,o,i,l){var a,u,d,s,v,p,m,h=e.length,g=n.length,y=h-1,k=g-1,b=0,C=0;if(0===h)return void(0!==g&&ze(n,t,r,o,i));if(0===g)return void rn(t,e,r,l);var N=e[b],x=n[C],w=e[y],_=n[k];x.dom&&(n[C]=x=un(x)),_.dom&&(n[k]=_=un(_));e:for(;;){for(;N.key===x.key;){if(Ce(N,x,t,r,o,i,l),b++,C++,b>y||C>k)break e;N=e[b],x=n[C],x.dom&&(n[C]=x=un(x))}for(;w.key===_.key;){if(Ce(w,_,t,r,o,i,l),y--,k--,b>y||C>k)break e;w=e[y],_=n[k],_.dom&&(n[k]=_=un(_))}if(w.key!==x.key){if(N.key!==_.key)break;Ce(N,_,t,r,o,i,l),p=k+1,v=p<n.length?n[p].dom:null,Qe(t,_.dom,v),b++,k--,N=e[b],_=n[k],_.dom&&(n[k]=_=un(_))}else Ce(w,x,t,r,o,i,l),Qe(t,x.dom,N.dom),y--,C++,w=e[y],x=n[C],x.dom&&(n[C]=x=un(x))}if(b>y){if(C<=k)for(p=k+1,v=p<n.length?n[p].dom:null;C<=k;)m=n[C],m.dom&&(n[C]=m=un(m)),C++,Qe(t,je(m,null,r,o,i),v)}else if(C>k)for(;b<=y;)fe(e[b++],t,r,!1,l);else{h=y-b+1,g=k-C+1;var M=new Array(g);for(a=0;a<g;a++)M[a]=-1;var O=!1,S=0,E=0;if(g<=4||h*g<=16){for(a=b;a<=y;a++)if(d=e[a],E<g)for(u=C;u<=k;u++)if(s=n[u],d.key===s.key){M[u-C]=a,S>u?O=!0:S=u,s.dom&&(n[u]=s=un(s)),Ce(d,s,t,r,o,i,l),E++,e[a]=null;break}}else{var U=new Map;for(a=C;a<=k;a++)U.set(n[a].key,a);for(a=b;a<=y;a++)d=e[a],E<g&&(u=U.get(d.key),c(u)||(s=n[u],M[u-C]=a,S>u?O=!0:S=u,s.dom&&(n[u]=s=un(s)),Ce(d,s,t,r,o,i,l),E++,e[a]=null))}if(h===e.length&&0===E)for(rn(t,e,r,l);C<g;)m=n[C],m.dom&&(n[C]=m=un(m)),C++,Qe(t,je(m,null,r,o,i),null);else{for(a=h-E;a>0;)d=e[b++],f(d)||(fe(d,t,r,!0,l),a--);if(O){var V=Ue(M);for(u=V.length-1,a=g-1;a>=0;a--)M[a]===-1?(S=a+C,m=n[S],m.dom&&(n[S]=m=un(m)),p=S+1,v=p<n.length?n[p].dom:null,Qe(t,je(m,t,r,o,i),v)):u<0||a!==V[u]?(S=a+C,m=n[S],p=S+1,v=p<n.length?n[p].dom:null,Qe(t,m.dom,v)):u--}else if(E!==g)for(a=g-1;a>=0;a--)M[a]===-1&&(S=a+C,m=n[S],m.dom&&(n[S]=m=un(m)),p=S+1,v=p<n.length?n[p].dom:null,Qe(t,je(m,null,r,o,i),v))}}}function Ue(e){var n,t,r,o,i,l=e.slice(0),a=[0],u=e.length;for(n=0;n<u;n++){var f=e[n];if(f!==-1)if(t=a[a.length-1],e[t]<f)l[n]=t,a.push(n);else{for(r=0,o=a.length-1;r<o;)i=(r+o)/2|0,e[a[i]]<f?r=i+1:o=i;f<e[a[r]]&&(r>0&&(l[n]=a[r-1]),a[r]=n)}}for(r=a.length,o=a[r-1];r-- >0;)a[r]=o,o=l[o];return a}function Ve(e,n,t,o,i,a){if(!(e in Mn||a&&"value"===e))if(e in xn)e="autoFocus"===e?e.toLowerCase():e,o[e]=!!t;else if(e in Nn){var u=r(t)?"":t;o[e]!==u&&(o[e]=u)}else if(n!==t)if(l(e))Ie(e,n,t,o);else if(r(t))o.removeAttribute(e);else if("className"===e)i?o.setAttribute("class",t):o.className=t;else if("style"===e)Te(n,t,o);else if("dangerouslySetInnerHTML"===e){var f=n&&n.__html,d=t&&t.__html;f!==d&&(r(d)||(o.innerHTML=d))}else{var c=!!i&&wn[e];c?o.setAttributeNS(c,e,t):o.setAttribute(e,t)}}function De(e,n,t){if(e=e||jn,(n=n||jn)!==jn)for(var o in n)Ie(o,e[o],n[o],t);if(e!==jn)for(var i in e)r(n[i])&&Ie(i,e[i],null,t)}function Ie(e,n,t,o){if(n!==t){var l=e.toLowerCase(),a=o[l];if(a&&a.wrapped)return;if(On[e])_(e,n,t,o);else if(i(t)||r(t))o[l]=t;else{var u=t.event;u&&i(u)?(o._data||(o[l]=function(e){u(e.currentTarget._data,e)}),o._data=t.data):v()}}}function Te(e,n,t){var o=t.style;if(a(n))return void(o.cssText=n);for(var i in n){var l=n[i];!u(l)||i in _n?o[i]=l:o[i]=l+"px"}if(!r(e))for(var f in e)r(n[f])&&(o[f]="")}function Pe(e,n,t){"className"===e?t.removeAttribute("class"):"value"===e?t.value="":"style"===e?t.removeAttribute("style"):l(e)?_(name,n,null,t):t.removeAttribute(e)}function je(e,n,t,r,o){var i=e.flags;return 3970&i?Ae(e,n,t,r,o):28&i?Re(e,n,t,r,o,4&i):4096&i?Le(e,n):1&i?We(e,n):void v()}function We(e,n){var t=document.createTextNode(e.children);return e.dom=t,n&&Xe(n,t),t}function Le(e,n){var t=document.createTextNode("");return e.dom=t,n&&Xe(n,t),t}function Ae(e,n,r,i,l){if(yn.recyclingEnabled){var a=ie(e,r,i,l);if(!f(a))return f(n)||Xe(n,a),a}var u=e.flags;(l||128&u)&&(l=!0);var d=Ze(e.type,l),c=e.children,s=e.props,v=e.events,p=e.ref;e.dom=d,o(c)||(t(c)?Je(d,c):gn(c)?ze(c,d,r,i,l):sn(c)&&je(c,d,r,i,l));var m=!1;if(2&u||(m=Y(u,e,d,!0)),!f(s))for(var h in s)Ve(h,null,s[h],d,l,m);if(!f(v))for(var g in v)Ie(g,null,v[g],d);return f(p)||Fe(d,p,r),f(n)||Xe(n,d),d}function ze(e,n,t,r,i){for(var l=0,a=e.length;l<a;l++){var u=e[l];o(u)||(u.dom&&(e[l]=u=un(u)),je(e[l],n,t,r,i))}}function Re(e,n,t,r,o,i){if(yn.recyclingEnabled){var l=ae(e,t,r,o);if(!f(l))return f(n)||Xe(n,l),l}var a,u=e.type,d=e.props||jn,c=e.ref;if(i){var s=Be(e,u,d,r,o),v=s._lastInput;s._vNode=e,e.dom=a=je(v,null,t,s._childContext,o),f(n)||Xe(n,a),Ke(e,c,s,t),yn.findDOMNodeEnabled&&Tn.set(s,a),e.children=s}else{var p=qe(e,u,d,r);e.dom=a=je(p,null,t,r,o),e.children=p,Ge(c,a,t),f(n)||Xe(n,a)}return a}function Ke(e,n,t,r){n&&(i(n)?n(t):v());var o=t.componentDidMount,l=yn.afterMount;c(o)&&f(l)?t._syncSetState=!0:r.addListener((function(){l&&l(e),o&&t.componentDidMount(),t._syncSetState=!0}))}function Ge(e,n,t){e&&(r(e.onComponentWillMount)||e.onComponentWillMount(),r(e.onComponentDidMount)||t.addListener((function(){return e.onComponentDidMount(n)})))}function Fe(e,n,t){if(i(n))t.addListener((function(){return n(e)}));else{if(o(n))return;v()}}function Be(e,n,i,l,a){c(l)&&(l=jn);var u=new n(i,l);u.context=l,u.props===jn&&(u.props=i),u._patch=Ce,yn.findDOMNodeEnabled&&(u._componentToDOMNodeMap=Tn),u._unmounted=!1,u._pendingSetState=!0,u._isSVG=a,c(u.componentWillMount)||u.componentWillMount();var f;c(u.getChildContext)||(f=u.getChildContext()),r(f)?u._childContext=l:u._childContext=p(l,f),yn.beforeRender&&yn.beforeRender(u);var d=u.render(i,u.state,l);return yn.afterRender&&yn.afterRender(u),gn(d)?v():o(d)?d=dn():t(d)?d=cn(d,null):(d.dom&&(d=un(d)),28&d.flags&&(d.parentVNode=e)),u._pendingSetState=!1,u._lastInput=d,u}function He(e,n,t,r,o,i,l){$e(t,je(n,null,r,o,i),e,r,l)}function $e(e,n,t,r,o){fe(t,null,r,!1,o),nn(e,n,t.dom)}function qe(e,n,r,i){var l=n(r,i);return gn(l)?v():o(l)?l=dn():t(l)?l=cn(l,null):(l.dom&&(l=un(l)),28&l.flags&&(l.parentVNode=e)),l}function Je(e,n){""!==n?e.textContent=n:e.appendChild(document.createTextNode(""))}function Ye(e,n){e.firstChild.nodeValue=n}function Xe(e,n){e.appendChild(n)}function Qe(e,n,t){r(t)?Xe(e,n):e.insertBefore(n,t)}function Ze(e,n){return n===!0?document.createElementNS(Cn,e):document.createElement(e)}function en(e,n,t,r,o,i,l){fe(e,null,r,!1,l);var a=je(n,null,r,o,i);n.dom=a,nn(t,a,e.dom)}function nn(e,n,t){e||(e=t.parentNode),e.replaceChild(n,t)}function tn(e,n){e.removeChild(n)}function rn(e,n,t,r){e.textContent="",(!yn.recyclingEnabled||yn.recyclingEnabled&&!r)&&on(null,n,t,r)}function on(e,n,t,r){for(var i=0,l=n.length;i<l;i++){var a=n[i];o(a)||fe(a,e,t,!0,r)}}function ln(e,n){return n.length&&!r(n[0])&&!r(n[0].key)&&e.length&&!r(e[0])&&!r(e[0].key)}function an(e,t,r,o,i,l,a,u){16&e&&(e=n(t)?4:8);var f={children:c(o)?null:o,dom:null,events:i||null,flags:e,key:c(l)?null:l,props:r||null,ref:a||null,type:t};return u||w(f),yn.createVNode&&yn.createVNode(f),f}function un(e){var n,r=e.flags;if(28&r){var i,l=e.props;if(l){i={};for(var a in l)i[a]=l[a]}else i=jn;n=an(r,e.type,i,null,e.events,e.key,e.ref,!0);var u=n.props;if(u){var f=u.children;if(f)if(gn(f)){var d=f.length;if(d>0){for(var c=[],s=0;s<d;s++){var v=f[s];t(v)?c.push(v):!o(v)&&sn(v)&&c.push(un(v))}u.children=c}}else sn(f)&&(u.children=un(f))}n.children=null}else if(3970&r){var p,m=e.children,h=e.props;if(h){p={};for(var g in h)p[g]=h[g]}else p=jn;n=an(r,e.type,p,m,e.events,e.key,e.ref,!m)}else 1&r&&(n=cn(e.children,e.key));return n}function fn(e,n){for(var i=[],l=arguments.length-2;l-- >0;)i[l]=arguments[l+2];var a=i,u=i.length;u>0&&!c(i[0])&&(n||(n={}),1===u&&(a=i[0]),c(a)||(n.children=a));var f;if(gn(e)){for(var d=[],s=0,v=e.length;s<v;s++)d.push(un(e[s]));f=d}else{var m=e.flags,h=e.events||n&&n.events||null,g=r(e.key)?n?n.key:null:e.key,y=e.ref||(n?n.ref:null);if(28&m){f=an(m,e.type,e.props||n?p(e.props,n):jn,null,h,g,y,!0);var k=f.props;if(k){var b=k.children;if(b)if(gn(b)){var C=b.length;if(C>0){for(var N=[],x=0;x<C;x++){var w=b[x];t(w)?N.push(w):!o(w)&&sn(w)&&N.push(un(w))}k.children=N}}else sn(b)&&(k.children=un(b))}f.children=null}else 3970&m?(a=n&&!c(n.children)?n.children:e.children,f=an(m,e.type,e.props||n?p(e.props,n):jn,a,h,g,y,!a)):1&m&&(f=cn(e.children,g))}return f}function dn(){return an(4096)}function cn(e,n){return an(1,null,null,e,null,n)}function sn(e){return!!e.flags}function vn(e,n){return{data:e,event:n}}var pn="$NO_OP",mn="a runtime error occured! Use Inferno in development environment to find the error.",hn="undefined"!=typeof window&&window.document,gn=Array.isArray;m.prototype.addListener=function(e){this.listeners.push(e)},m.prototype.trigger=function(){for(var e=this.listeners,n=0,t=e.length;n<t;n++)e[n]()};var yn={recyclingEnabled:!1,findDOMNodeEnabled:!1,roots:null,createVNode:null,beforeRender:null,afterRender:null,afterMount:null,afterUpdate:null,beforeUnmount:null},kn="http://www.w3.org/1999/xlink",bn="http://www.w3.org/XML/1998/namespace",Cn="http://www.w3.org/2000/svg",Nn=Object.create(null);Nn.volume=!0,Nn.defaultChecked=!0,Object.freeze(Nn);var xn=Object.create(null);xn.muted=!0,xn.scoped=!0,xn.loop=!0,xn.open=!0,xn.checked=!0,xn.default=!0,xn.capture=!0,xn.disabled=!0,xn.readOnly=!0,xn.required=!0,xn.autoplay=!0,xn.controls=!0,xn.seamless=!0,xn.reversed=!0,xn.allowfullscreen=!0,xn.novalidate=!0,xn.hidden=!0,xn.autoFocus=!0,Object.freeze(xn);var wn=Object.create(null);wn["xlink:href"]=kn,wn["xlink:arcrole"]=kn,wn["xlink:actuate"]=kn,wn["xlink:show"]=kn,wn["xlink:role"]=kn,wn["xlink:title"]=kn,wn["xlink:type"]=kn,wn["xml:base"]=bn,wn["xml:lang"]=bn,wn["xml:space"]=bn,Object.freeze(wn);var _n=Object.create(null);_n.animationIterationCount=!0,_n.borderImageOutset=!0,_n.borderImageSlice=!0,_n.borderImageWidth=!0,_n.boxFlex=!0,_n.boxFlexGroup=!0,_n.boxOrdinalGroup=!0,_n.columnCount=!0,_n.flex=!0,_n.flexGrow=!0,_n.flexPositive=!0,_n.flexShrink=!0,_n.flexNegative=!0,_n.flexOrder=!0,_n.gridRow=!0,_n.gridColumn=!0,_n.fontWeight=!0,_n.lineClamp=!0,_n.lineHeight=!0,_n.opacity=!0,_n.order=!0,_n.orphans=!0,_n.tabSize=!0,_n.widows=!0,_n.zIndex=!0,_n.zoom=!0,_n.fillOpacity=!0,_n.floodOpacity=!0,_n.stopOpacity=!0,_n.strokeDasharray=!0,_n.strokeDashoffset=!0,_n.strokeMiterlimit=!0,_n.strokeOpacity=!0,_n.strokeWidth=!0,Object.freeze(_n);var Mn=Object.create(null);Mn.children=!0,Mn.childrenType=!0,Mn.defaultValue=!0,Mn.ref=!0,Mn.key=!0,Mn.selected=!0,Mn.checked=!0,Mn.multiple=!0,Object.freeze(Mn);var On=Object.create(null);On.onClick=!0,On.onMouseDown=!0,On.onMouseUp=!0,On.onMouseMove=!0,On.onSubmit=!0,On.onDblClick=!0,On.onKeyDown=!0,On.onKeyUp=!0,On.onKeyPress=!0,Object.freeze(On);var Sn=hn&&!!navigator.platform&&/iPad|iPhone|iPod/.test(navigator.platform),En=new Map,Un=new Map,Vn=new Map,Dn=new Map,In=[],Tn=new Map;yn.roots=In;var Pn=hn?document.body:null,jn={},Wn={linkEvent:vn,createVNode:an,cloneVNode:fn,NO_OP:pn,EMPTY_OBJ:jn,render:ke,findDOMNode:me,createRenderer:be,options:yn,version:"1.4.0"};e.version="1.4.0",e.default=Wn,e.linkEvent=vn,e.createVNode=an,e.cloneVNode=fn,e.NO_OP=pn,e.EMPTY_OBJ=jn,e.render=ke,e.findDOMNode=me,e.createRenderer=be,e.options=yn,e.internal_isUnitlessNumber=_n,e.internal_normalize=w,Object.defineProperty(e,"__esModule",{value:!0})}));


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _inferno = __webpack_require__(0);

var _inferno2 = _interopRequireDefault(_inferno);

var _Base = __webpack_require__(15);

var _Base2 = _interopRequireDefault(_Base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MyComponent = function (_Block) {
    _inherits(MyComponent, _Block);

    function MyComponent(props) {
        _classCallCheck(this, MyComponent);

        var _this = _possibleConstructorReturn(this, (MyComponent.__proto__ || Object.getPrototypeOf(MyComponent)).call(this, props));

        _this.state = {
            counter: 0
        };
        console.log(_this.test);
        return _this;
    }

    _createClass(MyComponent, [{
        key: 'render',
        value: function render() {
            return (0, _inferno.createVNode)(2, 'div', null, [(0, _inferno.createVNode)(2, 'h1', null, 'Header!'), (0, _inferno.createVNode)(2, 'span', null, ['Counter is at: ', this.state.toString()])]);
        }
    }]);

    return MyComponent;
}(_Base2.default);

_inferno2.default.render((0, _inferno.createVNode)(16, MyComponent), document.getElementById('root'));

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(18);
module.exports.default = module.exports;



/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {
Object.defineProperty(exports, "__esModule", { value: true });
var inferno_shared_1 = __webpack_require__(2);
var options_1 = __webpack_require__(5);
var VNodes_1 = __webpack_require__(6);
var constants_1 = __webpack_require__(10);
var mounting_1 = __webpack_require__(11);
var patching_1 = __webpack_require__(7);
var rendering_1 = __webpack_require__(8);
var unmounting_1 = __webpack_require__(12);
// We need EMPTY_OBJ defined in one place.
// Its used for comparison so we cant inline it into shared
exports.EMPTY_OBJ = {};
if (process.env.NODE_ENV !== 'production') {
    Object.freeze(exports.EMPTY_OBJ);
}
function createClassComponentInstance(vNode, Component, props, context, isSVG) {
    if (inferno_shared_1.isUndefined(context)) {
        context = exports.EMPTY_OBJ; // Context should not be mutable
    }
    var instance = new Component(props, context);
    instance.context = context;
    if (instance.props === exports.EMPTY_OBJ) {
        instance.props = props;
    }
    instance._patch = patching_1.patch;
    if (options_1.default.findDOMNodeEnabled) {
        instance._componentToDOMNodeMap = rendering_1.componentToDOMNodeMap;
    }
    instance._unmounted = false;
    instance._pendingSetState = true;
    instance._isSVG = isSVG;
    if (!inferno_shared_1.isUndefined(instance.componentWillMount)) {
        instance.componentWillMount();
    }
    var childContext;
    if (!inferno_shared_1.isUndefined(instance.getChildContext)) {
        childContext = instance.getChildContext();
    }
    if (inferno_shared_1.isNullOrUndef(childContext)) {
        instance._childContext = context;
    }
    else {
        instance._childContext = inferno_shared_1.combineFrom(context, childContext);
    }
    options_1.default.beforeRender && options_1.default.beforeRender(instance);
    var input = instance.render(props, instance.state, context);
    options_1.default.afterRender && options_1.default.afterRender(instance);
    if (inferno_shared_1.isArray(input)) {
        if (process.env.NODE_ENV !== 'production') {
            inferno_shared_1.throwError('a valid Inferno VNode (or null) must be returned from a component render. You may have returned an array or an invalid object.');
        }
        inferno_shared_1.throwError();
    }
    else if (inferno_shared_1.isInvalid(input)) {
        input = VNodes_1.createVoidVNode();
    }
    else if (inferno_shared_1.isStringOrNumber(input)) {
        input = VNodes_1.createTextVNode(input, null);
    }
    else {
        if (input.dom) {
            input = VNodes_1.directClone(input);
        }
        if (input.flags & 28 /* Component */) {
            // if we have an input that is also a component, we run into a tricky situation
            // where the root vNode needs to always have the correct DOM entry
            // so we break monomorphism on our input and supply it our vNode as parentVNode
            // we can optimise this in the future, but this gets us out of a lot of issues
            input.parentVNode = vNode;
        }
    }
    instance._pendingSetState = false;
    instance._lastInput = input;
    return instance;
}
exports.createClassComponentInstance = createClassComponentInstance;
function replaceLastChildAndUnmount(lastInput, nextInput, parentDom, lifecycle, context, isSVG, isRecycling) {
    replaceVNode(parentDom, mounting_1.mount(nextInput, null, lifecycle, context, isSVG), lastInput, lifecycle, isRecycling);
}
exports.replaceLastChildAndUnmount = replaceLastChildAndUnmount;
function replaceVNode(parentDom, dom, vNode, lifecycle, isRecycling) {
    unmounting_1.unmount(vNode, null, lifecycle, false, isRecycling);
    replaceChild(parentDom, dom, vNode.dom);
}
exports.replaceVNode = replaceVNode;
function createFunctionalComponentInput(vNode, component, props, context) {
    var input = component(props, context);
    if (inferno_shared_1.isArray(input)) {
        if (process.env.NODE_ENV !== 'production') {
            inferno_shared_1.throwError('a valid Inferno VNode (or null) must be returned from a component render. You may have returned an array or an invalid object.');
        }
        inferno_shared_1.throwError();
    }
    else if (inferno_shared_1.isInvalid(input)) {
        input = VNodes_1.createVoidVNode();
    }
    else if (inferno_shared_1.isStringOrNumber(input)) {
        input = VNodes_1.createTextVNode(input, null);
    }
    else {
        if (input.dom) {
            input = VNodes_1.directClone(input);
        }
        if (input.flags & 28 /* Component */) {
            // if we have an input that is also a component, we run into a tricky situation
            // where the root vNode needs to always have the correct DOM entry
            // so we break monomorphism on our input and supply it our vNode as parentVNode
            // we can optimise this in the future, but this gets us out of a lot of issues
            input.parentVNode = vNode;
        }
    }
    return input;
}
exports.createFunctionalComponentInput = createFunctionalComponentInput;
function setTextContent(dom, text) {
    if (text !== '') {
        dom.textContent = text;
    }
    else {
        dom.appendChild(document.createTextNode(''));
    }
}
exports.setTextContent = setTextContent;
function updateTextContent(dom, text) {
    dom.firstChild.nodeValue = text;
}
exports.updateTextContent = updateTextContent;
function appendChild(parentDom, dom) {
    parentDom.appendChild(dom);
}
exports.appendChild = appendChild;
function insertOrAppend(parentDom, newNode, nextNode) {
    if (inferno_shared_1.isNullOrUndef(nextNode)) {
        appendChild(parentDom, newNode);
    }
    else {
        parentDom.insertBefore(newNode, nextNode);
    }
}
exports.insertOrAppend = insertOrAppend;
function documentCreateElement(tag, isSVG) {
    if (isSVG === true) {
        return document.createElementNS(constants_1.svgNS, tag);
    }
    else {
        return document.createElement(tag);
    }
}
exports.documentCreateElement = documentCreateElement;
function replaceWithNewNode(lastNode, nextNode, parentDom, lifecycle, context, isSVG, isRecycling) {
    unmounting_1.unmount(lastNode, null, lifecycle, false, isRecycling);
    var dom = mounting_1.mount(nextNode, null, lifecycle, context, isSVG);
    nextNode.dom = dom;
    replaceChild(parentDom, dom, lastNode.dom);
}
exports.replaceWithNewNode = replaceWithNewNode;
function replaceChild(parentDom, nextDom, lastDom) {
    if (!parentDom) {
        parentDom = lastDom.parentNode;
    }
    parentDom.replaceChild(nextDom, lastDom);
}
exports.replaceChild = replaceChild;
function removeChild(parentDom, dom) {
    parentDom.removeChild(dom);
}
exports.removeChild = removeChild;
function removeAllChildren(dom, children, lifecycle, isRecycling) {
    dom.textContent = '';
    if (!options_1.default.recyclingEnabled || (options_1.default.recyclingEnabled && !isRecycling)) {
        removeChildren(null, children, lifecycle, isRecycling);
    }
}
exports.removeAllChildren = removeAllChildren;
function removeChildren(dom, children, lifecycle, isRecycling) {
    for (var i = 0, len = children.length; i < len; i++) {
        var child = children[i];
        if (!inferno_shared_1.isInvalid(child)) {
            unmounting_1.unmount(child, dom, lifecycle, true, isRecycling);
        }
    }
}
exports.removeChildren = removeChildren;
function isKeyed(lastChildren, nextChildren) {
    return nextChildren.length && !inferno_shared_1.isNullOrUndef(nextChildren[0]) && !inferno_shared_1.isNullOrUndef(nextChildren[0].key)
        && lastChildren.length && !inferno_shared_1.isNullOrUndef(lastChildren[0]) && !inferno_shared_1.isNullOrUndef(lastChildren[0].key);
}
exports.isKeyed = isKeyed;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ }),
/* 4 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    recyclingEnabled: false,
    findDOMNodeEnabled: false,
    roots: null,
    createVNode: null,
    beforeRender: null,
    afterRender: null,
    afterMount: null,
    afterUpdate: null,
    beforeUnmount: null
};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var inferno_shared_1 = __webpack_require__(2);
var normalization_1 = __webpack_require__(14);
var options_1 = __webpack_require__(5);
var utils_1 = __webpack_require__(3);
function createVNode(flags, type, className, children, props, key, ref, noNormalise) {
    if (flags & 16 /* ComponentUnknown */) {
        flags = inferno_shared_1.isStatefulComponent(type) ? 4 /* ComponentClass */ : 8 /* ComponentFunction */;
    }
    var vNode = {
        children: inferno_shared_1.isUndefined(children) ? null : children,
        className: className,
        dom: null,
        flags: flags,
        key: inferno_shared_1.isUndefined(key) ? null : key,
        props: props || null,
        ref: ref || null,
        type: type
    };
    if (!noNormalise) {
        normalization_1.normalize(vNode);
    }
    if (options_1.default.createVNode) {
        options_1.default.createVNode(vNode);
    }
    return vNode;
}
exports.createVNode = createVNode;
function directClone(vNodeToClone) {
    var newVNode;
    var flags = vNodeToClone.flags;
    if (flags & 28 /* Component */) {
        var props = void 0;
        var propsToClone = vNodeToClone.props;
        if (!propsToClone) {
            props = utils_1.EMPTY_OBJ;
        }
        else {
            props = {};
            for (var key in propsToClone) {
                props[key] = propsToClone[key];
            }
        }
        newVNode = createVNode(flags, vNodeToClone.type, vNodeToClone.className, null, props, vNodeToClone.key, vNodeToClone.ref, true);
        var newProps = newVNode.props;
        if (newProps) {
            var newChildren = newProps.children;
            // we need to also clone component children that are in props
            // as the children may also have been hoisted
            if (newChildren) {
                if (inferno_shared_1.isArray(newChildren)) {
                    var len = newChildren.length;
                    if (len > 0) {
                        var tmpArray = [];
                        for (var i = 0; i < len; i++) {
                            var child = newChildren[i];
                            if (inferno_shared_1.isStringOrNumber(child)) {
                                tmpArray.push(child);
                            }
                            else if (!inferno_shared_1.isInvalid(child) && isVNode(child)) {
                                tmpArray.push(directClone(child));
                            }
                        }
                        newProps.children = tmpArray;
                    }
                }
                else if (isVNode(newChildren)) {
                    newProps.children = directClone(newChildren);
                }
            }
        }
        newVNode.children = null;
    }
    else if (flags & 3970 /* Element */) {
        var children = vNodeToClone.children;
        var props = void 0;
        var propsToClone = vNodeToClone.props;
        if (!propsToClone) {
            props = utils_1.EMPTY_OBJ;
        }
        else {
            props = {};
            for (var key in propsToClone) {
                props[key] = propsToClone[key];
            }
        }
        newVNode = createVNode(flags, vNodeToClone.type, vNodeToClone.className, children, props, vNodeToClone.key, vNodeToClone.ref, !children);
    }
    else if (flags & 1 /* Text */) {
        newVNode = createTextVNode(vNodeToClone.children, vNodeToClone.key);
    }
    return newVNode;
}
exports.directClone = directClone;
/*
 directClone is preferred over cloneVNode and used internally also.
 This function makes Inferno backwards compatible.
 And can be tree-shaked by modern bundlers

 Would be nice to combine this with directClone but could not do it without breaking change
 */
function cloneVNode(vNodeToClone, props) {
    var _children = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        _children[_i - 2] = arguments[_i];
    }
    var children = _children;
    var childrenLen = _children.length;
    if (childrenLen > 0 && !inferno_shared_1.isUndefined(_children[0])) {
        if (!props) {
            props = {};
        }
        if (childrenLen === 1) {
            children = _children[0];
        }
        if (!inferno_shared_1.isUndefined(children)) {
            props.children = children;
        }
    }
    var newVNode;
    if (inferno_shared_1.isArray(vNodeToClone)) {
        var tmpArray = [];
        for (var i = 0, len = vNodeToClone.length; i < len; i++) {
            tmpArray.push(directClone(vNodeToClone[i]));
        }
        newVNode = tmpArray;
    }
    else {
        var flags = vNodeToClone.flags;
        var className = vNodeToClone.className || (props && props.className) || null;
        var key = !inferno_shared_1.isNullOrUndef(vNodeToClone.key) ? vNodeToClone.key : (props ? props.key : null);
        var ref = vNodeToClone.ref || (props ? props.ref : null);
        if (flags & 28 /* Component */) {
            newVNode = createVNode(flags, vNodeToClone.type, className, null, (!vNodeToClone.props && !props) ? utils_1.EMPTY_OBJ : inferno_shared_1.combineFrom(vNodeToClone.props, props), key, ref, true);
            var newProps = newVNode.props;
            if (newProps) {
                var newChildren = newProps.children;
                // we need to also clone component children that are in props
                // as the children may also have been hoisted
                if (newChildren) {
                    if (inferno_shared_1.isArray(newChildren)) {
                        var len = newChildren.length;
                        if (len > 0) {
                            var tmpArray = [];
                            for (var i = 0; i < len; i++) {
                                var child = newChildren[i];
                                if (inferno_shared_1.isStringOrNumber(child)) {
                                    tmpArray.push(child);
                                }
                                else if (!inferno_shared_1.isInvalid(child) && isVNode(child)) {
                                    tmpArray.push(directClone(child));
                                }
                            }
                            newProps.children = tmpArray;
                        }
                    }
                    else if (isVNode(newChildren)) {
                        newProps.children = directClone(newChildren);
                    }
                }
            }
            newVNode.children = null;
        }
        else if (flags & 3970 /* Element */) {
            children = (props && !inferno_shared_1.isUndefined(props.children)) ? props.children : vNodeToClone.children;
            newVNode = createVNode(flags, vNodeToClone.type, className, children, (!vNodeToClone.props && !props) ? utils_1.EMPTY_OBJ : inferno_shared_1.combineFrom(vNodeToClone.props, props), key, ref, !children);
        }
        else if (flags & 1 /* Text */) {
            newVNode = createTextVNode(vNodeToClone.children, key);
        }
    }
    return newVNode;
}
exports.cloneVNode = cloneVNode;
function createVoidVNode() {
    return createVNode(4096 /* Void */);
}
exports.createVoidVNode = createVoidVNode;
function createTextVNode(text, key) {
    return createVNode(1 /* Text */, null, null, text, null, key);
}
exports.createTextVNode = createTextVNode;
function isVNode(o) {
    return !!o.flags;
}
exports.isVNode = isVNode;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {
Object.defineProperty(exports, "__esModule", { value: true });
var inferno_shared_1 = __webpack_require__(2);
var options_1 = __webpack_require__(5);
var VNodes_1 = __webpack_require__(6);
var constants_1 = __webpack_require__(10);
var delegation_1 = __webpack_require__(19);
var mounting_1 = __webpack_require__(11);
var utils_1 = __webpack_require__(3);
var rendering_1 = __webpack_require__(8);
var unmounting_1 = __webpack_require__(12);
var processElement_1 = __webpack_require__(9);
function patch(lastVNode, nextVNode, parentDom, lifecycle, context, isSVG, isRecycling) {
    if (lastVNode !== nextVNode) {
        var lastFlags = lastVNode.flags;
        var nextFlags = nextVNode.flags;
        if (nextFlags & 28 /* Component */) {
            if (lastFlags & 28 /* Component */) {
                patchComponent(lastVNode, nextVNode, parentDom, lifecycle, context, isSVG, nextFlags & 4 /* ComponentClass */, isRecycling);
            }
            else {
                utils_1.replaceVNode(parentDom, mounting_1.mountComponent(nextVNode, null, lifecycle, context, isSVG, nextFlags & 4 /* ComponentClass */), lastVNode, lifecycle, isRecycling);
            }
        }
        else if (nextFlags & 3970 /* Element */) {
            if (lastFlags & 3970 /* Element */) {
                patchElement(lastVNode, nextVNode, parentDom, lifecycle, context, isSVG, isRecycling);
            }
            else {
                utils_1.replaceVNode(parentDom, mounting_1.mountElement(nextVNode, null, lifecycle, context, isSVG), lastVNode, lifecycle, isRecycling);
            }
        }
        else if (nextFlags & 1 /* Text */) {
            if (lastFlags & 1 /* Text */) {
                patchText(lastVNode, nextVNode);
            }
            else {
                utils_1.replaceVNode(parentDom, mounting_1.mountText(nextVNode, null), lastVNode, lifecycle, isRecycling);
            }
        }
        else if (nextFlags & 4096 /* Void */) {
            if (lastFlags & 4096 /* Void */) {
                patchVoid(lastVNode, nextVNode);
            }
            else {
                utils_1.replaceVNode(parentDom, mounting_1.mountVoid(nextVNode, null), lastVNode, lifecycle, isRecycling);
            }
        }
        else {
            // Error case: mount new one replacing old one
            utils_1.replaceLastChildAndUnmount(lastVNode, nextVNode, parentDom, lifecycle, context, isSVG, isRecycling);
        }
    }
}
exports.patch = patch;
function unmountChildren(children, dom, lifecycle, isRecycling) {
    if (VNodes_1.isVNode(children)) {
        unmounting_1.unmount(children, dom, lifecycle, true, isRecycling);
    }
    else if (inferno_shared_1.isArray(children)) {
        utils_1.removeAllChildren(dom, children, lifecycle, isRecycling);
    }
    else {
        dom.textContent = '';
    }
}
function patchElement(lastVNode, nextVNode, parentDom, lifecycle, context, isSVG, isRecycling) {
    var nextTag = nextVNode.type;
    var lastTag = lastVNode.type;
    if (lastTag !== nextTag) {
        utils_1.replaceWithNewNode(lastVNode, nextVNode, parentDom, lifecycle, context, isSVG, isRecycling);
    }
    else {
        var dom = lastVNode.dom;
        var lastProps = lastVNode.props;
        var nextProps = nextVNode.props;
        var lastChildren = lastVNode.children;
        var nextChildren = nextVNode.children;
        var lastFlags = lastVNode.flags;
        var nextFlags = nextVNode.flags;
        var nextRef = nextVNode.ref;
        var lastClassName = lastVNode.className;
        var nextClassName = nextVNode.className;
        nextVNode.dom = dom;
        if (isSVG || (nextFlags & 128 /* SvgElement */)) {
            isSVG = true;
        }
        if (lastChildren !== nextChildren) {
            patchChildren(lastFlags, nextFlags, lastChildren, nextChildren, dom, lifecycle, context, isSVG, isRecycling);
        }
        var hasControlledValue = false;
        if (!(nextFlags & 2 /* HtmlElement */)) {
            hasControlledValue = processElement_1.default(nextFlags, nextVNode, dom, false);
        }
        // inlined patchProps  -- starts --
        if (lastProps !== nextProps) {
            var lastPropsOrEmpty = lastProps || utils_1.EMPTY_OBJ;
            var nextPropsOrEmpty = nextProps || utils_1.EMPTY_OBJ;
            if (nextPropsOrEmpty !== utils_1.EMPTY_OBJ) {
                for (var prop in nextPropsOrEmpty) {
                    // do not add a hasOwnProperty check here, it affects performance
                    var nextValue = nextPropsOrEmpty[prop];
                    var lastValue = lastPropsOrEmpty[prop];
                    patchProp(prop, lastValue, nextValue, dom, isSVG, hasControlledValue);
                }
            }
            if (lastPropsOrEmpty !== utils_1.EMPTY_OBJ) {
                for (var prop in lastPropsOrEmpty) {
                    // do not add a hasOwnProperty check here, it affects performance
                    if (inferno_shared_1.isNullOrUndef(nextPropsOrEmpty[prop])) {
                        removeProp(prop, lastPropsOrEmpty[prop], dom);
                    }
                }
            }
        }
        // inlined patchProps  -- ends --
        if (lastClassName !== nextClassName) {
            if (inferno_shared_1.isNullOrUndef(nextClassName)) {
                dom.removeAttribute('class');
            }
            else {
                if (isSVG) {
                    dom.setAttribute('class', nextClassName);
                }
                else {
                    dom.className = nextClassName;
                }
            }
        }
        if (nextRef) {
            if (lastVNode.ref !== nextRef || isRecycling) {
                mounting_1.mountRef(dom, nextRef, lifecycle);
            }
        }
    }
}
exports.patchElement = patchElement;
function patchChildren(lastFlags, nextFlags, lastChildren, nextChildren, dom, lifecycle, context, isSVG, isRecycling) {
    var patchArray = false;
    var patchKeyed = false;
    if (nextFlags & 64 /* HasNonKeyedChildren */) {
        patchArray = true;
    }
    else if ((lastFlags & 32 /* HasKeyedChildren */) && (nextFlags & 32 /* HasKeyedChildren */)) {
        patchKeyed = true;
        patchArray = true;
    }
    else if (inferno_shared_1.isInvalid(nextChildren)) {
        unmountChildren(lastChildren, dom, lifecycle, isRecycling);
    }
    else if (inferno_shared_1.isInvalid(lastChildren)) {
        if (inferno_shared_1.isStringOrNumber(nextChildren)) {
            utils_1.setTextContent(dom, nextChildren);
        }
        else {
            if (inferno_shared_1.isArray(nextChildren)) {
                mounting_1.mountArrayChildren(nextChildren, dom, lifecycle, context, isSVG);
            }
            else {
                mounting_1.mount(nextChildren, dom, lifecycle, context, isSVG);
            }
        }
    }
    else if (inferno_shared_1.isStringOrNumber(nextChildren)) {
        if (inferno_shared_1.isStringOrNumber(lastChildren)) {
            utils_1.updateTextContent(dom, nextChildren);
        }
        else {
            unmountChildren(lastChildren, dom, lifecycle, isRecycling);
            utils_1.setTextContent(dom, nextChildren);
        }
    }
    else if (inferno_shared_1.isArray(nextChildren)) {
        if (inferno_shared_1.isArray(lastChildren)) {
            patchArray = true;
            if (utils_1.isKeyed(lastChildren, nextChildren)) {
                patchKeyed = true;
            }
        }
        else {
            unmountChildren(lastChildren, dom, lifecycle, isRecycling);
            mounting_1.mountArrayChildren(nextChildren, dom, lifecycle, context, isSVG);
        }
    }
    else if (inferno_shared_1.isArray(lastChildren)) {
        utils_1.removeAllChildren(dom, lastChildren, lifecycle, isRecycling);
        mounting_1.mount(nextChildren, dom, lifecycle, context, isSVG);
    }
    else if (VNodes_1.isVNode(nextChildren)) {
        if (VNodes_1.isVNode(lastChildren)) {
            patch(lastChildren, nextChildren, dom, lifecycle, context, isSVG, isRecycling);
        }
        else {
            unmountChildren(lastChildren, dom, lifecycle, isRecycling);
            mounting_1.mount(nextChildren, dom, lifecycle, context, isSVG);
        }
    }
    if (patchArray) {
        if (patchKeyed) {
            patchKeyedChildren(lastChildren, nextChildren, dom, lifecycle, context, isSVG, isRecycling);
        }
        else {
            patchNonKeyedChildren(lastChildren, nextChildren, dom, lifecycle, context, isSVG, isRecycling);
        }
    }
}
function patchComponent(lastVNode, nextVNode, parentDom, lifecycle, context, isSVG, isClass, isRecycling) {
    var lastType = lastVNode.type;
    var nextType = nextVNode.type;
    var lastKey = lastVNode.key;
    var nextKey = nextVNode.key;
    if (lastType !== nextType || lastKey !== nextKey) {
        utils_1.replaceWithNewNode(lastVNode, nextVNode, parentDom, lifecycle, context, isSVG, isRecycling);
        return false;
    }
    else {
        var nextProps = nextVNode.props || utils_1.EMPTY_OBJ;
        if (isClass) {
            var instance = lastVNode.children;
            if (instance._unmounted) {
                if (inferno_shared_1.isNull(parentDom)) {
                    return true;
                }
                utils_1.replaceChild(parentDom, mounting_1.mountComponent(nextVNode, null, lifecycle, context, isSVG, nextVNode.flags & 4 /* ComponentClass */), lastVNode.dom);
            }
            else {
                var lastState = instance.state;
                var nextState = instance.state;
                var lastProps = instance.props;
                var childContext = void 0;
                if (!inferno_shared_1.isUndefined(instance.getChildContext)) {
                    childContext = instance.getChildContext();
                }
                nextVNode.children = instance;
                instance._isSVG = isSVG;
                if (inferno_shared_1.isNullOrUndef(childContext)) {
                    childContext = context;
                }
                else {
                    childContext = inferno_shared_1.combineFrom(context, childContext);
                }
                var lastInput = instance._lastInput;
                var nextInput = instance._updateComponent(lastState, nextState, lastProps, nextProps, context, false, false);
                var didUpdate = true;
                instance._childContext = childContext;
                if (inferno_shared_1.isInvalid(nextInput)) {
                    nextInput = VNodes_1.createVoidVNode();
                }
                else if (nextInput === inferno_shared_1.NO_OP) {
                    nextInput = lastInput;
                    didUpdate = false;
                }
                else if (inferno_shared_1.isStringOrNumber(nextInput)) {
                    nextInput = VNodes_1.createTextVNode(nextInput, null);
                }
                else if (inferno_shared_1.isArray(nextInput)) {
                    if (process.env.NODE_ENV !== 'production') {
                        inferno_shared_1.throwError('a valid Inferno VNode (or null) must be returned from a component render. You may have returned an array or an invalid object.');
                    }
                    inferno_shared_1.throwError();
                }
                else if (inferno_shared_1.isObject(nextInput) && nextInput.dom) {
                    nextInput = VNodes_1.directClone(nextInput);
                }
                if (nextInput.flags & 28 /* Component */) {
                    nextInput.parentVNode = nextVNode;
                }
                else if (lastInput.flags & 28 /* Component */) {
                    lastInput.parentVNode = nextVNode;
                }
                instance._lastInput = nextInput;
                instance._vNode = nextVNode;
                if (didUpdate) {
                    patch(lastInput, nextInput, parentDom, lifecycle, childContext, isSVG, isRecycling);
                    if (!inferno_shared_1.isUndefined(instance.componentDidUpdate)) {
                        instance.componentDidUpdate(lastProps, lastState);
                    }
                    options_1.default.afterUpdate && options_1.default.afterUpdate(nextVNode);
                    options_1.default.findDOMNodeEnabled && rendering_1.componentToDOMNodeMap.set(instance, nextInput.dom);
                }
                nextVNode.dom = nextInput.dom;
            }
        }
        else {
            var shouldUpdate = true;
            var lastProps = lastVNode.props;
            var nextHooks = nextVNode.ref;
            var nextHooksDefined = !inferno_shared_1.isNullOrUndef(nextHooks);
            var lastInput = lastVNode.children;
            var nextInput = lastInput;
            nextVNode.dom = lastVNode.dom;
            nextVNode.children = lastInput;
            if (lastKey !== nextKey) {
                shouldUpdate = true;
            }
            else {
                if (nextHooksDefined && !inferno_shared_1.isNullOrUndef(nextHooks.onComponentShouldUpdate)) {
                    shouldUpdate = nextHooks.onComponentShouldUpdate(lastProps, nextProps);
                }
            }
            if (shouldUpdate !== false) {
                if (nextHooksDefined && !inferno_shared_1.isNullOrUndef(nextHooks.onComponentWillUpdate)) {
                    nextHooks.onComponentWillUpdate(lastProps, nextProps);
                }
                nextInput = nextType(nextProps, context);
                if (inferno_shared_1.isInvalid(nextInput)) {
                    nextInput = VNodes_1.createVoidVNode();
                }
                else if (inferno_shared_1.isStringOrNumber(nextInput) && nextInput !== inferno_shared_1.NO_OP) {
                    nextInput = VNodes_1.createTextVNode(nextInput, null);
                }
                else if (inferno_shared_1.isArray(nextInput)) {
                    if (process.env.NODE_ENV !== 'production') {
                        inferno_shared_1.throwError('a valid Inferno VNode (or null) must be returned from a component render. You may have returned an array or an invalid object.');
                    }
                    inferno_shared_1.throwError();
                }
                else if (inferno_shared_1.isObject(nextInput) && nextInput.dom) {
                    nextInput = VNodes_1.directClone(nextInput);
                }
                if (nextInput !== inferno_shared_1.NO_OP) {
                    patch(lastInput, nextInput, parentDom, lifecycle, context, isSVG, isRecycling);
                    nextVNode.children = nextInput;
                    if (nextHooksDefined && !inferno_shared_1.isNullOrUndef(nextHooks.onComponentDidUpdate)) {
                        nextHooks.onComponentDidUpdate(lastProps, nextProps);
                    }
                    nextVNode.dom = nextInput.dom;
                }
            }
            if (nextInput.flags & 28 /* Component */) {
                nextInput.parentVNode = nextVNode;
            }
            else if (lastInput.flags & 28 /* Component */) {
                lastInput.parentVNode = nextVNode;
            }
        }
    }
    return false;
}
exports.patchComponent = patchComponent;
function patchText(lastVNode, nextVNode) {
    var nextText = nextVNode.children;
    var dom = lastVNode.dom;
    nextVNode.dom = dom;
    if (lastVNode.children !== nextText) {
        dom.nodeValue = nextText;
    }
}
exports.patchText = patchText;
function patchVoid(lastVNode, nextVNode) {
    nextVNode.dom = lastVNode.dom;
}
exports.patchVoid = patchVoid;
function patchNonKeyedChildren(lastChildren, nextChildren, dom, lifecycle, context, isSVG, isRecycling) {
    var lastChildrenLength = lastChildren.length;
    var nextChildrenLength = nextChildren.length;
    var commonLength = lastChildrenLength > nextChildrenLength ? nextChildrenLength : lastChildrenLength;
    var i = 0;
    for (; i < commonLength; i++) {
        var nextChild = nextChildren[i];
        if (nextChild.dom) {
            nextChild = nextChildren[i] = VNodes_1.directClone(nextChild);
        }
        patch(lastChildren[i], nextChild, dom, lifecycle, context, isSVG, isRecycling);
    }
    if (lastChildrenLength < nextChildrenLength) {
        for (i = commonLength; i < nextChildrenLength; i++) {
            var nextChild = nextChildren[i];
            if (nextChild.dom) {
                nextChild = nextChildren[i] = VNodes_1.directClone(nextChild);
            }
            utils_1.appendChild(dom, mounting_1.mount(nextChild, null, lifecycle, context, isSVG));
        }
    }
    else if (nextChildrenLength === 0) {
        utils_1.removeAllChildren(dom, lastChildren, lifecycle, isRecycling);
    }
    else if (lastChildrenLength > nextChildrenLength) {
        for (i = commonLength; i < lastChildrenLength; i++) {
            unmounting_1.unmount(lastChildren[i], dom, lifecycle, false, isRecycling);
        }
    }
}
exports.patchNonKeyedChildren = patchNonKeyedChildren;
function patchKeyedChildren(a, b, dom, lifecycle, context, isSVG, isRecycling) {
    var aLength = a.length;
    var bLength = b.length;
    var aEnd = aLength - 1;
    var bEnd = bLength - 1;
    var aStart = 0;
    var bStart = 0;
    var i;
    var j;
    var aNode;
    var bNode;
    var nextNode;
    var nextPos;
    var node;
    if (aLength === 0) {
        if (bLength !== 0) {
            mounting_1.mountArrayChildren(b, dom, lifecycle, context, isSVG);
        }
        return;
    }
    else if (bLength === 0) {
        utils_1.removeAllChildren(dom, a, lifecycle, isRecycling);
        return;
    }
    var aStartNode = a[aStart];
    var bStartNode = b[bStart];
    var aEndNode = a[aEnd];
    var bEndNode = b[bEnd];
    if (bStartNode.dom) {
        b[bStart] = bStartNode = VNodes_1.directClone(bStartNode);
    }
    if (bEndNode.dom) {
        b[bEnd] = bEndNode = VNodes_1.directClone(bEndNode);
    }
    // Step 1
    /* eslint no-constant-condition: 0 */
    outer: while (true) {
        // Sync nodes with the same key at the beginning.
        while (aStartNode.key === bStartNode.key) {
            patch(aStartNode, bStartNode, dom, lifecycle, context, isSVG, isRecycling);
            aStart++;
            bStart++;
            if (aStart > aEnd || bStart > bEnd) {
                break outer;
            }
            aStartNode = a[aStart];
            bStartNode = b[bStart];
            if (bStartNode.dom) {
                b[bStart] = bStartNode = VNodes_1.directClone(bStartNode);
            }
        }
        // Sync nodes with the same key at the end.
        while (aEndNode.key === bEndNode.key) {
            patch(aEndNode, bEndNode, dom, lifecycle, context, isSVG, isRecycling);
            aEnd--;
            bEnd--;
            if (aStart > aEnd || bStart > bEnd) {
                break outer;
            }
            aEndNode = a[aEnd];
            bEndNode = b[bEnd];
            if (bEndNode.dom) {
                b[bEnd] = bEndNode = VNodes_1.directClone(bEndNode);
            }
        }
        // Move and sync nodes from right to left.
        if (aEndNode.key === bStartNode.key) {
            patch(aEndNode, bStartNode, dom, lifecycle, context, isSVG, isRecycling);
            utils_1.insertOrAppend(dom, bStartNode.dom, aStartNode.dom);
            aEnd--;
            bStart++;
            aEndNode = a[aEnd];
            bStartNode = b[bStart];
            if (bStartNode.dom) {
                b[bStart] = bStartNode = VNodes_1.directClone(bStartNode);
            }
            continue;
        }
        // Move and sync nodes from left to right.
        if (aStartNode.key === bEndNode.key) {
            patch(aStartNode, bEndNode, dom, lifecycle, context, isSVG, isRecycling);
            nextPos = bEnd + 1;
            nextNode = nextPos < b.length ? b[nextPos].dom : null;
            utils_1.insertOrAppend(dom, bEndNode.dom, nextNode);
            aStart++;
            bEnd--;
            aStartNode = a[aStart];
            bEndNode = b[bEnd];
            if (bEndNode.dom) {
                b[bEnd] = bEndNode = VNodes_1.directClone(bEndNode);
            }
            continue;
        }
        break;
    }
    if (aStart > aEnd) {
        if (bStart <= bEnd) {
            nextPos = bEnd + 1;
            nextNode = nextPos < b.length ? b[nextPos].dom : null;
            while (bStart <= bEnd) {
                node = b[bStart];
                if (node.dom) {
                    b[bStart] = node = VNodes_1.directClone(node);
                }
                bStart++;
                utils_1.insertOrAppend(dom, mounting_1.mount(node, null, lifecycle, context, isSVG), nextNode);
            }
        }
    }
    else if (bStart > bEnd) {
        while (aStart <= aEnd) {
            unmounting_1.unmount(a[aStart++], dom, lifecycle, false, isRecycling);
        }
    }
    else {
        aLength = aEnd - aStart + 1;
        bLength = bEnd - bStart + 1;
        var sources = new Array(bLength);
        // Mark all nodes as inserted.
        for (i = 0; i < bLength; i++) {
            sources[i] = -1;
        }
        var moved = false;
        var pos = 0;
        var patched = 0;
        // When sizes are small, just loop them through
        if ((bLength <= 4) || (aLength * bLength <= 16)) {
            for (i = aStart; i <= aEnd; i++) {
                aNode = a[i];
                if (patched < bLength) {
                    for (j = bStart; j <= bEnd; j++) {
                        bNode = b[j];
                        if (aNode.key === bNode.key) {
                            sources[j - bStart] = i;
                            if (pos > j) {
                                moved = true;
                            }
                            else {
                                pos = j;
                            }
                            if (bNode.dom) {
                                b[j] = bNode = VNodes_1.directClone(bNode);
                            }
                            patch(aNode, bNode, dom, lifecycle, context, isSVG, isRecycling);
                            patched++;
                            a[i] = null;
                            break;
                        }
                    }
                }
            }
        }
        else {
            var keyIndex = new Map();
            // Map keys by their index in array
            for (i = bStart; i <= bEnd; i++) {
                keyIndex.set(b[i].key, i);
            }
            // Try to patch same keys
            for (i = aStart; i <= aEnd; i++) {
                aNode = a[i];
                if (patched < bLength) {
                    j = keyIndex.get(aNode.key);
                    if (!inferno_shared_1.isUndefined(j)) {
                        bNode = b[j];
                        sources[j - bStart] = i;
                        if (pos > j) {
                            moved = true;
                        }
                        else {
                            pos = j;
                        }
                        if (bNode.dom) {
                            b[j] = bNode = VNodes_1.directClone(bNode);
                        }
                        patch(aNode, bNode, dom, lifecycle, context, isSVG, isRecycling);
                        patched++;
                        a[i] = null;
                    }
                }
            }
        }
        // fast-path: if nothing patched remove all old and add all new
        if (aLength === a.length && patched === 0) {
            utils_1.removeAllChildren(dom, a, lifecycle, isRecycling);
            while (bStart < bLength) {
                node = b[bStart];
                if (node.dom) {
                    b[bStart] = node = VNodes_1.directClone(node);
                }
                bStart++;
                utils_1.insertOrAppend(dom, mounting_1.mount(node, null, lifecycle, context, isSVG), null);
            }
        }
        else {
            i = aLength - patched;
            while (i > 0) {
                aNode = a[aStart++];
                if (!inferno_shared_1.isNull(aNode)) {
                    unmounting_1.unmount(aNode, dom, lifecycle, true, isRecycling);
                    i--;
                }
            }
            if (moved) {
                var seq = lis_algorithm(sources);
                j = seq.length - 1;
                for (i = bLength - 1; i >= 0; i--) {
                    if (sources[i] === -1) {
                        pos = i + bStart;
                        node = b[pos];
                        if (node.dom) {
                            b[pos] = node = VNodes_1.directClone(node);
                        }
                        nextPos = pos + 1;
                        nextNode = nextPos < b.length ? b[nextPos].dom : null;
                        utils_1.insertOrAppend(dom, mounting_1.mount(node, dom, lifecycle, context, isSVG), nextNode);
                    }
                    else {
                        if (j < 0 || i !== seq[j]) {
                            pos = i + bStart;
                            node = b[pos];
                            nextPos = pos + 1;
                            nextNode = nextPos < b.length ? b[nextPos].dom : null;
                            utils_1.insertOrAppend(dom, node.dom, nextNode);
                        }
                        else {
                            j--;
                        }
                    }
                }
            }
            else if (patched !== bLength) {
                // when patched count doesn't match b length we need to insert those new ones
                // loop backwards so we can use insertBefore
                for (i = bLength - 1; i >= 0; i--) {
                    if (sources[i] === -1) {
                        pos = i + bStart;
                        node = b[pos];
                        if (node.dom) {
                            b[pos] = node = VNodes_1.directClone(node);
                        }
                        nextPos = pos + 1;
                        nextNode = nextPos < b.length ? b[nextPos].dom : null;
                        utils_1.insertOrAppend(dom, mounting_1.mount(node, null, lifecycle, context, isSVG), nextNode);
                    }
                }
            }
        }
    }
}
exports.patchKeyedChildren = patchKeyedChildren;
// // https://en.wikipedia.org/wiki/Longest_increasing_subsequence
function lis_algorithm(arr) {
    var p = arr.slice(0);
    var result = [0];
    var i;
    var j;
    var u;
    var v;
    var c;
    var len = arr.length;
    for (i = 0; i < len; i++) {
        var arrI = arr[i];
        if (arrI === -1) {
            continue;
        }
        j = result[result.length - 1];
        if (arr[j] < arrI) {
            p[i] = j;
            result.push(i);
            continue;
        }
        u = 0;
        v = result.length - 1;
        while (u < v) {
            c = ((u + v) / 2) | 0;
            if (arr[result[c]] < arrI) {
                u = c + 1;
            }
            else {
                v = c;
            }
        }
        if (arrI < arr[result[u]]) {
            if (u > 0) {
                p[i] = result[u - 1];
            }
            result[u] = i;
        }
    }
    u = result.length;
    v = result[u - 1];
    while (u-- > 0) {
        result[u] = v;
        v = p[v];
    }
    return result;
}
function isAttrAnEvent(attr) {
    return attr[0] === 'o' && attr[1] === 'n';
}
exports.isAttrAnEvent = isAttrAnEvent;
function patchProp(prop, lastValue, nextValue, dom, isSVG, hasControlledValue) {
    if (prop in constants_1.skipProps || (hasControlledValue && prop === 'value')) {
        return;
    }
    else if (prop in constants_1.booleanProps) {
        prop = prop === 'autoFocus' ? prop.toLowerCase() : prop;
        dom[prop] = !!nextValue;
    }
    else if (prop in constants_1.strictProps) {
        var value = inferno_shared_1.isNullOrUndef(nextValue) ? '' : nextValue;
        if (dom[prop] !== value) {
            dom[prop] = value;
        }
    }
    else if (lastValue !== nextValue) {
        if (isAttrAnEvent(prop)) {
            patchEvent(prop, lastValue, nextValue, dom);
        }
        else if (inferno_shared_1.isNullOrUndef(nextValue)) {
            dom.removeAttribute(prop);
        }
        else if (prop === 'style') {
            patchStyle(lastValue, nextValue, dom);
        }
        else if (prop === 'dangerouslySetInnerHTML') {
            var lastHtml = lastValue && lastValue.__html;
            var nextHtml = nextValue && nextValue.__html;
            if (lastHtml !== nextHtml) {
                if (!inferno_shared_1.isNullOrUndef(nextHtml)) {
                    dom.innerHTML = nextHtml;
                }
            }
        }
        else {
            var ns = isSVG ? constants_1.namespaces[prop] : false;
            if (ns) {
                dom.setAttributeNS(ns, prop, nextValue);
            }
            else {
                dom.setAttribute(prop, nextValue);
            }
        }
    }
}
exports.patchProp = patchProp;
function patchEvent(name, lastValue, nextValue, dom) {
    if (lastValue !== nextValue) {
        if (name in constants_1.delegatedProps) {
            delegation_1.handleEvent(name, lastValue, nextValue, dom);
        }
        else {
            var nameLowerCase = name.toLowerCase();
            var domEvent = dom[nameLowerCase];
            // if the function is wrapped, that means it's been controlled by a wrapper
            if (domEvent && domEvent.wrapped) {
                return;
            }
            if (!inferno_shared_1.isFunction(nextValue) && !inferno_shared_1.isNullOrUndef(nextValue)) {
                var linkEvent_1 = nextValue.event;
                if (linkEvent_1 && inferno_shared_1.isFunction(linkEvent_1)) {
                    if (!dom._data) {
                        dom[nameLowerCase] = function (e) {
                            linkEvent_1(e.currentTarget._data, e);
                        };
                    }
                    dom._data = nextValue.data;
                }
                else {
                    if (process.env.NODE_ENV !== 'production') {
                        inferno_shared_1.throwError("an event on a VNode \"" + name + "\". was not a function or a valid linkEvent.");
                    }
                    inferno_shared_1.throwError();
                }
            }
            else {
                dom[nameLowerCase] = nextValue;
            }
        }
    }
}
exports.patchEvent = patchEvent;
// We are assuming here that we come from patchProp routine
// -nextAttrValue cannot be null or undefined
function patchStyle(lastAttrValue, nextAttrValue, dom) {
    var domStyle = dom.style;
    if (inferno_shared_1.isString(nextAttrValue)) {
        domStyle.cssText = nextAttrValue;
        return;
    }
    for (var style in nextAttrValue) {
        // do not add a hasOwnProperty check here, it affects performance
        var value = nextAttrValue[style];
        if (!inferno_shared_1.isNumber(value) || style in constants_1.isUnitlessNumber) {
            domStyle[style] = value;
        }
        else {
            domStyle[style] = value + 'px';
        }
    }
    if (!inferno_shared_1.isNullOrUndef(lastAttrValue)) {
        for (var style in lastAttrValue) {
            if (inferno_shared_1.isNullOrUndef(nextAttrValue[style])) {
                domStyle[style] = '';
            }
        }
    }
}
exports.patchStyle = patchStyle;
function removeProp(prop, lastValue, dom) {
    if (prop === 'value') {
        dom.value = '';
    }
    else if (prop === 'style') {
        dom.removeAttribute('style');
    }
    else if (isAttrAnEvent(prop)) {
        delegation_1.handleEvent(name, lastValue, null, dom);
    }
    else {
        dom.removeAttribute(prop);
    }
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {
Object.defineProperty(exports, "__esModule", { value: true });
var inferno_shared_1 = __webpack_require__(2);
var options_1 = __webpack_require__(5);
var VNodes_1 = __webpack_require__(6);
var hydration_1 = __webpack_require__(21);
var mounting_1 = __webpack_require__(11);
var patching_1 = __webpack_require__(7);
var unmounting_1 = __webpack_require__(12);
var utils_1 = __webpack_require__(3);
// rather than use a Map, like we did before, we can use an array here
// given there shouldn't be THAT many roots on the page, the difference
// in performance is huge: https://esbench.com/bench/5802a691330ab09900a1a2da
exports.roots = [];
exports.componentToDOMNodeMap = new Map();
options_1.default.roots = exports.roots;
function findDOMNode(ref) {
    if (!options_1.default.findDOMNodeEnabled) {
        if (process.env.NODE_ENV !== 'production') {
            inferno_shared_1.throwError('findDOMNode() has been disabled, use Inferno.options.findDOMNodeEnabled = true; enabled findDOMNode(). Warning this can significantly impact performance!');
        }
        inferno_shared_1.throwError();
    }
    var dom = ref && ref.nodeType ? ref : null;
    return exports.componentToDOMNodeMap.get(ref) || dom;
}
exports.findDOMNode = findDOMNode;
function getRoot(dom) {
    for (var i = 0, len = exports.roots.length; i < len; i++) {
        var root = exports.roots[i];
        if (root.dom === dom) {
            return root;
        }
    }
    return null;
}
function setRoot(dom, input, lifecycle) {
    var root = {
        dom: dom,
        input: input,
        lifecycle: lifecycle
    };
    exports.roots.push(root);
    return root;
}
function removeRoot(root) {
    for (var i = 0, len = exports.roots.length; i < len; i++) {
        if (exports.roots[i] === root) {
            exports.roots.splice(i, 1);
            return;
        }
    }
}
if (process.env.NODE_ENV !== 'production') {
    if (inferno_shared_1.isBrowser && document.body === null) {
        inferno_shared_1.warning('Inferno warning: you cannot initialize inferno without "document.body". Wait on "DOMContentLoaded" event, add script to bottom of body, or use async/defer attributes on script tag.');
    }
}
var documentBody = inferno_shared_1.isBrowser ? document.body : null;
function render(input, parentDom) {
    if (documentBody === parentDom) {
        if (process.env.NODE_ENV !== 'production') {
            inferno_shared_1.throwError('you cannot render() to the "document.body". Use an empty element as a container instead.');
        }
        inferno_shared_1.throwError();
    }
    if (input === inferno_shared_1.NO_OP) {
        return;
    }
    var root = getRoot(parentDom);
    if (inferno_shared_1.isNull(root)) {
        var lifecycle = new inferno_shared_1.Lifecycle();
        if (!inferno_shared_1.isInvalid(input)) {
            if (input.dom) {
                input = VNodes_1.directClone(input);
            }
            if (!hydration_1.default(input, parentDom, lifecycle)) {
                mounting_1.mount(input, parentDom, lifecycle, utils_1.EMPTY_OBJ, false);
            }
            root = setRoot(parentDom, input, lifecycle);
            lifecycle.trigger();
        }
    }
    else {
        var lifecycle = root.lifecycle;
        lifecycle.listeners = [];
        if (inferno_shared_1.isNullOrUndef(input)) {
            unmounting_1.unmount(root.input, parentDom, lifecycle, false, false);
            removeRoot(root);
        }
        else {
            if (input.dom) {
                input = VNodes_1.directClone(input);
            }
            patching_1.patch(root.input, input, parentDom, lifecycle, utils_1.EMPTY_OBJ, false, false);
        }
        lifecycle.trigger();
        root.input = input;
    }
    if (root) {
        var rootInput = root.input;
        if (rootInput && (rootInput.flags & 28 /* Component */)) {
            return rootInput.children;
        }
    }
}
exports.render = render;
function createRenderer(parentDom) {
    return function renderer(lastInput, nextInput) {
        if (!parentDom) {
            parentDom = lastInput;
        }
        render(nextInput, parentDom);
    };
}
exports.createRenderer = createRenderer;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var InputWrapper_1 = __webpack_require__(22);
var SelectWrapper_1 = __webpack_require__(23);
var TextareaWrapper_1 = __webpack_require__(24);
exports.wrappers = new Map();
function processElement(flags, vNode, dom, mounting) {
    if (flags & 512 /* InputElement */) {
        return InputWrapper_1.processInput(vNode, dom);
    }
    if (flags & 2048 /* SelectElement */) {
        return SelectWrapper_1.processSelect(vNode, dom, mounting);
    }
    if (flags & 1024 /* TextareaElement */) {
        return TextareaWrapper_1.processTextarea(vNode, dom, mounting);
    }
    return false;
}
exports.default = processElement;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.xlinkNS = 'http://www.w3.org/1999/xlink';
exports.xmlNS = 'http://www.w3.org/XML/1998/namespace';
exports.svgNS = 'http://www.w3.org/2000/svg';
var TRUE = true;
exports.strictProps = Object.create(null);
exports.strictProps.volume = TRUE;
exports.strictProps.defaultChecked = TRUE;
Object.freeze(exports.strictProps);
exports.booleanProps = Object.create(null);
exports.booleanProps.muted = TRUE;
exports.booleanProps.scoped = TRUE;
exports.booleanProps.loop = TRUE;
exports.booleanProps.open = TRUE;
exports.booleanProps.checked = TRUE;
exports.booleanProps.default = TRUE;
exports.booleanProps.capture = TRUE;
exports.booleanProps.disabled = TRUE;
exports.booleanProps.readOnly = TRUE;
exports.booleanProps.required = TRUE;
exports.booleanProps.autoplay = TRUE;
exports.booleanProps.controls = TRUE;
exports.booleanProps.seamless = TRUE;
exports.booleanProps.reversed = TRUE;
exports.booleanProps.allowfullscreen = TRUE;
exports.booleanProps.novalidate = TRUE;
exports.booleanProps.hidden = TRUE;
exports.booleanProps.autoFocus = TRUE;
Object.freeze(exports.booleanProps);
exports.namespaces = Object.create(null);
exports.namespaces['xlink:href'] = exports.xlinkNS;
exports.namespaces['xlink:arcrole'] = exports.xlinkNS;
exports.namespaces['xlink:actuate'] = exports.xlinkNS;
exports.namespaces['xlink:show'] = exports.xlinkNS;
exports.namespaces['xlink:role'] = exports.xlinkNS;
exports.namespaces['xlink:title'] = exports.xlinkNS;
exports.namespaces['xlink:type'] = exports.xlinkNS;
exports.namespaces['xml:base'] = exports.xmlNS;
exports.namespaces['xml:lang'] = exports.xmlNS;
exports.namespaces['xml:space'] = exports.xmlNS;
Object.freeze(exports.namespaces);
exports.isUnitlessNumber = Object.create(null);
exports.isUnitlessNumber.animationIterationCount = TRUE;
exports.isUnitlessNumber.borderImageOutset = TRUE;
exports.isUnitlessNumber.borderImageSlice = TRUE;
exports.isUnitlessNumber.borderImageWidth = TRUE;
exports.isUnitlessNumber.boxFlex = TRUE;
exports.isUnitlessNumber.boxFlexGroup = TRUE;
exports.isUnitlessNumber.boxOrdinalGroup = TRUE;
exports.isUnitlessNumber.columnCount = TRUE;
exports.isUnitlessNumber.flex = TRUE;
exports.isUnitlessNumber.flexGrow = TRUE;
exports.isUnitlessNumber.flexPositive = TRUE;
exports.isUnitlessNumber.flexShrink = TRUE;
exports.isUnitlessNumber.flexNegative = TRUE;
exports.isUnitlessNumber.flexOrder = TRUE;
exports.isUnitlessNumber.gridRow = TRUE;
exports.isUnitlessNumber.gridColumn = TRUE;
exports.isUnitlessNumber.fontWeight = TRUE;
exports.isUnitlessNumber.lineClamp = TRUE;
exports.isUnitlessNumber.lineHeight = TRUE;
exports.isUnitlessNumber.opacity = TRUE;
exports.isUnitlessNumber.order = TRUE;
exports.isUnitlessNumber.orphans = TRUE;
exports.isUnitlessNumber.tabSize = TRUE;
exports.isUnitlessNumber.widows = TRUE;
exports.isUnitlessNumber.zIndex = TRUE;
exports.isUnitlessNumber.zoom = TRUE;
exports.isUnitlessNumber.fillOpacity = TRUE;
exports.isUnitlessNumber.floodOpacity = TRUE;
exports.isUnitlessNumber.stopOpacity = TRUE;
exports.isUnitlessNumber.strokeDasharray = TRUE;
exports.isUnitlessNumber.strokeDashoffset = TRUE;
exports.isUnitlessNumber.strokeMiterlimit = TRUE;
exports.isUnitlessNumber.strokeOpacity = TRUE;
exports.isUnitlessNumber.strokeWidth = TRUE;
Object.freeze(exports.isUnitlessNumber);
exports.skipProps = Object.create(null);
exports.skipProps.children = TRUE;
exports.skipProps.childrenType = TRUE;
exports.skipProps.defaultValue = TRUE;
exports.skipProps.ref = TRUE;
exports.skipProps.key = TRUE;
exports.skipProps.selected = TRUE;
exports.skipProps.checked = TRUE;
exports.skipProps.multiple = TRUE;
Object.freeze(exports.skipProps);
exports.delegatedProps = Object.create(null);
exports.delegatedProps.onClick = TRUE;
exports.delegatedProps.onMouseDown = TRUE;
exports.delegatedProps.onMouseUp = TRUE;
exports.delegatedProps.onMouseMove = TRUE;
exports.delegatedProps.onSubmit = TRUE;
exports.delegatedProps.onDblClick = TRUE;
exports.delegatedProps.onKeyDown = TRUE;
exports.delegatedProps.onKeyUp = TRUE;
exports.delegatedProps.onKeyPress = TRUE;
Object.freeze(exports.delegatedProps);


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {
Object.defineProperty(exports, "__esModule", { value: true });
var inferno_shared_1 = __webpack_require__(2);
var options_1 = __webpack_require__(5);
var VNodes_1 = __webpack_require__(6);
var patching_1 = __webpack_require__(7);
var recycling_1 = __webpack_require__(13);
var rendering_1 = __webpack_require__(8);
var utils_1 = __webpack_require__(3);
var processElement_1 = __webpack_require__(9);
function mount(vNode, parentDom, lifecycle, context, isSVG) {
    var flags = vNode.flags;
    if (flags & 3970 /* Element */) {
        return mountElement(vNode, parentDom, lifecycle, context, isSVG);
    }
    else if (flags & 28 /* Component */) {
        return mountComponent(vNode, parentDom, lifecycle, context, isSVG, flags & 4 /* ComponentClass */);
    }
    else if (flags & 4096 /* Void */) {
        return mountVoid(vNode, parentDom);
    }
    else if (flags & 1 /* Text */) {
        return mountText(vNode, parentDom);
    }
    else {
        if (process.env.NODE_ENV !== 'production') {
            if (typeof vNode === 'object') {
                inferno_shared_1.throwError("mount() received an object that's not a valid VNode, you should stringify it first. Object: \"" + JSON.stringify(vNode) + "\".");
            }
            else {
                inferno_shared_1.throwError("mount() expects a valid VNode, instead it received an object with the type \"" + typeof vNode + "\".");
            }
        }
        inferno_shared_1.throwError();
    }
}
exports.mount = mount;
function mountText(vNode, parentDom) {
    var dom = document.createTextNode(vNode.children);
    vNode.dom = dom;
    if (parentDom) {
        utils_1.appendChild(parentDom, dom);
    }
    return dom;
}
exports.mountText = mountText;
function mountVoid(vNode, parentDom) {
    var dom = document.createTextNode('');
    vNode.dom = dom;
    if (parentDom) {
        utils_1.appendChild(parentDom, dom);
    }
    return dom;
}
exports.mountVoid = mountVoid;
function mountElement(vNode, parentDom, lifecycle, context, isSVG) {
    if (options_1.default.recyclingEnabled) {
        var dom_1 = recycling_1.recycleElement(vNode, lifecycle, context, isSVG);
        if (!inferno_shared_1.isNull(dom_1)) {
            if (!inferno_shared_1.isNull(parentDom)) {
                utils_1.appendChild(parentDom, dom_1);
            }
            return dom_1;
        }
    }
    var flags = vNode.flags;
    if (isSVG || (flags & 128 /* SvgElement */)) {
        isSVG = true;
    }
    var dom = utils_1.documentCreateElement(vNode.type, isSVG);
    var children = vNode.children;
    var props = vNode.props;
    var className = vNode.className;
    var ref = vNode.ref;
    vNode.dom = dom;
    if (!inferno_shared_1.isInvalid(children)) {
        if (inferno_shared_1.isStringOrNumber(children)) {
            utils_1.setTextContent(dom, children);
        }
        else if (inferno_shared_1.isArray(children)) {
            mountArrayChildren(children, dom, lifecycle, context, isSVG);
        }
        else if (VNodes_1.isVNode(children)) {
            mount(children, dom, lifecycle, context, isSVG);
        }
    }
    var hasControlledValue = false;
    if (!(flags & 2 /* HtmlElement */)) {
        hasControlledValue = processElement_1.default(flags, vNode, dom, true);
    }
    if (!inferno_shared_1.isNull(props)) {
        for (var prop in props) {
            // do not add a hasOwnProperty check here, it affects performance
            patching_1.patchProp(prop, null, props[prop], dom, isSVG, hasControlledValue);
        }
    }
    if (inferno_shared_1.isNullOrUndef(className)) {
        dom.removeAttribute('class');
    }
    else {
        if (isSVG) {
            dom.setAttribute('class', className);
        }
        else {
            dom.className = className;
        }
    }
    if (!inferno_shared_1.isNull(ref)) {
        mountRef(dom, ref, lifecycle);
    }
    if (!inferno_shared_1.isNull(parentDom)) {
        utils_1.appendChild(parentDom, dom);
    }
    return dom;
}
exports.mountElement = mountElement;
function mountArrayChildren(children, dom, lifecycle, context, isSVG) {
    for (var i = 0, len = children.length; i < len; i++) {
        var child = children[i];
        // Verify can string/number be here. might cause de-opt. - Normalization takes care of it.
        if (!inferno_shared_1.isInvalid(child)) {
            if (child.dom) {
                children[i] = child = VNodes_1.directClone(child);
            }
            mount(children[i], dom, lifecycle, context, isSVG);
        }
    }
}
exports.mountArrayChildren = mountArrayChildren;
function mountComponent(vNode, parentDom, lifecycle, context, isSVG, isClass) {
    if (options_1.default.recyclingEnabled) {
        var dom_2 = recycling_1.recycleComponent(vNode, lifecycle, context, isSVG);
        if (!inferno_shared_1.isNull(dom_2)) {
            if (!inferno_shared_1.isNull(parentDom)) {
                utils_1.appendChild(parentDom, dom_2);
            }
            return dom_2;
        }
    }
    var type = vNode.type;
    var props = vNode.props || utils_1.EMPTY_OBJ;
    var ref = vNode.ref;
    var dom;
    if (isClass) {
        var instance = utils_1.createClassComponentInstance(vNode, type, props, context, isSVG);
        var input = instance._lastInput;
        instance._vNode = vNode;
        vNode.dom = dom = mount(input, null, lifecycle, instance._childContext, isSVG);
        if (!inferno_shared_1.isNull(parentDom)) {
            utils_1.appendChild(parentDom, dom);
        }
        mountClassComponentCallbacks(vNode, ref, instance, lifecycle);
        options_1.default.findDOMNodeEnabled && rendering_1.componentToDOMNodeMap.set(instance, dom);
        vNode.children = instance;
    }
    else {
        var input = utils_1.createFunctionalComponentInput(vNode, type, props, context);
        vNode.dom = dom = mount(input, null, lifecycle, context, isSVG);
        vNode.children = input;
        mountFunctionalComponentCallbacks(ref, dom, lifecycle);
        if (!inferno_shared_1.isNull(parentDom)) {
            utils_1.appendChild(parentDom, dom);
        }
    }
    return dom;
}
exports.mountComponent = mountComponent;
function mountClassComponentCallbacks(vNode, ref, instance, lifecycle) {
    if (ref) {
        if (inferno_shared_1.isFunction(ref)) {
            ref(instance);
        }
        else {
            if (process.env.NODE_ENV !== 'production') {
                if (inferno_shared_1.isStringOrNumber(ref)) {
                    inferno_shared_1.throwError('string "refs" are not supported in Inferno 1.0. Use callback "refs" instead.');
                }
                else if (inferno_shared_1.isObject(ref) && (vNode.flags & 4 /* ComponentClass */)) {
                    inferno_shared_1.throwError('functional component lifecycle events are not supported on ES2015 class components.');
                }
                else {
                    inferno_shared_1.throwError("a bad value for \"ref\" was used on component: \"" + JSON.stringify(ref) + "\"");
                }
            }
            inferno_shared_1.throwError();
        }
    }
    var cDM = instance.componentDidMount;
    var afterMount = options_1.default.afterMount;
    if (!inferno_shared_1.isUndefined(cDM) || !inferno_shared_1.isNull(afterMount)) {
        lifecycle.addListener(function () {
            afterMount && afterMount(vNode);
            cDM && instance.componentDidMount();
        });
    }
}
exports.mountClassComponentCallbacks = mountClassComponentCallbacks;
function mountFunctionalComponentCallbacks(ref, dom, lifecycle) {
    if (ref) {
        if (!inferno_shared_1.isNullOrUndef(ref.onComponentWillMount)) {
            ref.onComponentWillMount();
        }
        if (!inferno_shared_1.isNullOrUndef(ref.onComponentDidMount)) {
            lifecycle.addListener(function () { return ref.onComponentDidMount(dom); });
        }
    }
}
exports.mountFunctionalComponentCallbacks = mountFunctionalComponentCallbacks;
function mountRef(dom, value, lifecycle) {
    if (inferno_shared_1.isFunction(value)) {
        lifecycle.addListener(function () { return value(dom); });
    }
    else {
        if (inferno_shared_1.isInvalid(value)) {
            return;
        }
        if (process.env.NODE_ENV !== 'production') {
            inferno_shared_1.throwError('string "refs" are not supported in Inferno 1.0. Use callback "refs" instead.');
        }
        inferno_shared_1.throwError();
    }
}
exports.mountRef = mountRef;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {
Object.defineProperty(exports, "__esModule", { value: true });
var inferno_shared_1 = __webpack_require__(2);
var options_1 = __webpack_require__(5);
var patching_1 = __webpack_require__(7);
var recycling_1 = __webpack_require__(13);
var rendering_1 = __webpack_require__(8);
var utils_1 = __webpack_require__(3);
function unmount(vNode, parentDom, lifecycle, canRecycle, isRecycling) {
    var flags = vNode.flags;
    if (flags & 28 /* Component */) {
        unmountComponent(vNode, parentDom, lifecycle, canRecycle, isRecycling);
    }
    else if (flags & 3970 /* Element */) {
        unmountElement(vNode, parentDom, lifecycle, canRecycle, isRecycling);
    }
    else if (flags & (1 /* Text */ | 4096 /* Void */)) {
        unmountVoidOrText(vNode, parentDom);
    }
}
exports.unmount = unmount;
function unmountVoidOrText(vNode, parentDom) {
    if (parentDom) {
        utils_1.removeChild(parentDom, vNode.dom);
    }
}
function unmountComponent(vNode, parentDom, lifecycle, canRecycle, isRecycling) {
    var instance = vNode.children;
    var flags = vNode.flags;
    var isStatefulComponent = flags & 4 /* ComponentClass */;
    var ref = vNode.ref;
    var dom = vNode.dom;
    if (!isRecycling) {
        if (isStatefulComponent) {
            if (!instance._unmounted) {
                instance._ignoreSetState = true;
                options_1.default.beforeUnmount && options_1.default.beforeUnmount(vNode);
                instance.componentWillUnmount && instance.componentWillUnmount();
                if (ref && !isRecycling) {
                    ref(null);
                }
                instance._unmounted = true;
                options_1.default.findDOMNodeEnabled && rendering_1.componentToDOMNodeMap.delete(instance);
                unmount(instance._lastInput, null, instance._lifecycle, false, isRecycling);
            }
        }
        else {
            if (!inferno_shared_1.isNullOrUndef(ref)) {
                if (!inferno_shared_1.isNullOrUndef(ref.onComponentWillUnmount)) {
                    ref.onComponentWillUnmount(dom);
                }
            }
            unmount(instance, null, lifecycle, false, isRecycling);
        }
    }
    if (parentDom) {
        var lastInput = instance._lastInput;
        if (inferno_shared_1.isNullOrUndef(lastInput)) {
            lastInput = instance;
        }
        utils_1.removeChild(parentDom, dom);
    }
    if (options_1.default.recyclingEnabled && !isStatefulComponent && (parentDom || canRecycle)) {
        recycling_1.poolComponent(vNode);
    }
}
exports.unmountComponent = unmountComponent;
function unmountElement(vNode, parentDom, lifecycle, canRecycle, isRecycling) {
    var dom = vNode.dom;
    var ref = vNode.ref;
    var props = vNode.props;
    if (ref && !isRecycling) {
        unmountRef(ref);
    }
    var children = vNode.children;
    if (!inferno_shared_1.isNullOrUndef(children)) {
        unmountChildren(children, lifecycle, isRecycling);
    }
    if (!inferno_shared_1.isNull(props)) {
        for (var name_1 in props) {
            // do not add a hasOwnProperty check here, it affects performance
            if (props[name_1] !== null && patching_1.isAttrAnEvent(name_1)) {
                patching_1.patchEvent(name_1, props[name_1], null, dom);
                // We need to set this null, because same props otherwise come back if SCU returns false and we are recyling
                props[name_1] = null;
            }
        }
    }
    if (parentDom) {
        utils_1.removeChild(parentDom, dom);
    }
    if (options_1.default.recyclingEnabled && (parentDom || canRecycle)) {
        recycling_1.poolElement(vNode);
    }
}
exports.unmountElement = unmountElement;
function unmountChildren(children, lifecycle, isRecycling) {
    if (inferno_shared_1.isArray(children)) {
        for (var i = 0, len = children.length; i < len; i++) {
            var child = children[i];
            if (!inferno_shared_1.isInvalid(child) && inferno_shared_1.isObject(child)) {
                unmount(child, null, lifecycle, false, isRecycling);
            }
        }
    }
    else if (inferno_shared_1.isObject(children)) {
        unmount(children, null, lifecycle, false, isRecycling);
    }
}
function unmountRef(ref) {
    if (inferno_shared_1.isFunction(ref)) {
        ref(null);
    }
    else {
        if (inferno_shared_1.isInvalid(ref)) {
            return;
        }
        if (process.env.NODE_ENV !== 'production') {
            inferno_shared_1.throwError('string "refs" are not supported in Inferno 1.0. Use callback "refs" instead.');
        }
        inferno_shared_1.throwError();
    }
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var inferno_shared_1 = __webpack_require__(2);
var patching_1 = __webpack_require__(7);
var componentPools = new Map();
var elementPools = new Map();
function recycleElement(vNode, lifecycle, context, isSVG) {
    var tag = vNode.type;
    var pools = elementPools.get(tag);
    if (!inferno_shared_1.isUndefined(pools)) {
        var key = vNode.key;
        var pool = key === null ? pools.nonKeyed : pools.keyed.get(key);
        if (!inferno_shared_1.isUndefined(pool)) {
            var recycledVNode = pool.pop();
            if (!inferno_shared_1.isUndefined(recycledVNode)) {
                patching_1.patchElement(recycledVNode, vNode, null, lifecycle, context, isSVG, true);
                return vNode.dom;
            }
        }
    }
    return null;
}
exports.recycleElement = recycleElement;
function poolElement(vNode) {
    var tag = vNode.type;
    var key = vNode.key;
    var pools = elementPools.get(tag);
    if (inferno_shared_1.isUndefined(pools)) {
        pools = {
            nonKeyed: [],
            keyed: new Map()
        };
        elementPools.set(tag, pools);
    }
    if (inferno_shared_1.isNull(key)) {
        pools.nonKeyed.push(vNode);
    }
    else {
        var pool = pools.keyed.get(key);
        if (inferno_shared_1.isUndefined(pool)) {
            pool = [];
            pools.keyed.set(key, pool);
        }
        pool.push(vNode);
    }
}
exports.poolElement = poolElement;
function recycleComponent(vNode, lifecycle, context, isSVG) {
    var type = vNode.type;
    var pools = componentPools.get(type);
    if (!inferno_shared_1.isUndefined(pools)) {
        var key = vNode.key;
        var pool = key === null ? pools.nonKeyed : pools.keyed.get(key);
        if (!inferno_shared_1.isUndefined(pool)) {
            var recycledVNode = pool.pop();
            if (!inferno_shared_1.isUndefined(recycledVNode)) {
                var flags = vNode.flags;
                var failed = patching_1.patchComponent(recycledVNode, vNode, null, lifecycle, context, isSVG, flags & 4 /* ComponentClass */, true);
                if (!failed) {
                    return vNode.dom;
                }
            }
        }
    }
    return null;
}
exports.recycleComponent = recycleComponent;
function poolComponent(vNode) {
    var hooks = vNode.ref;
    var nonRecycleHooks = hooks && (hooks.onComponentWillMount ||
        hooks.onComponentWillUnmount ||
        hooks.onComponentDidMount ||
        hooks.onComponentWillUpdate ||
        hooks.onComponentDidUpdate);
    if (nonRecycleHooks) {
        return;
    }
    var type = vNode.type;
    var key = vNode.key;
    var pools = componentPools.get(type);
    if (inferno_shared_1.isUndefined(pools)) {
        pools = {
            nonKeyed: [],
            keyed: new Map()
        };
        componentPools.set(type, pools);
    }
    if (inferno_shared_1.isNull(key)) {
        pools.nonKeyed.push(vNode);
    }
    else {
        var pool = pools.keyed.get(key);
        if (inferno_shared_1.isUndefined(pool)) {
            pool = [];
            pools.keyed.set(key, pool);
        }
        pool.push(vNode);
    }
}
exports.poolComponent = poolComponent;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {
Object.defineProperty(exports, "__esModule", { value: true });
var inferno_shared_1 = __webpack_require__(2);
var VNodes_1 = __webpack_require__(6);
function applyKey(key, vNode) {
    vNode.key = key;
    return vNode;
}
function applyKeyIfMissing(key, vNode) {
    if (inferno_shared_1.isNumber(key)) {
        key = "." + key;
    }
    if (inferno_shared_1.isNull(vNode.key) || vNode.key[0] === '.') {
        return applyKey(key, vNode);
    }
    return vNode;
}
function applyKeyPrefix(key, vNode) {
    vNode.key = key + vNode.key;
    return vNode;
}
function _normalizeVNodes(nodes, result, index, currentKey) {
    for (var len = nodes.length; index < len; index++) {
        var n = nodes[index];
        var key = currentKey + "." + index;
        if (!inferno_shared_1.isInvalid(n)) {
            if (inferno_shared_1.isArray(n)) {
                _normalizeVNodes(n, result, 0, key);
            }
            else {
                if (inferno_shared_1.isStringOrNumber(n)) {
                    n = VNodes_1.createTextVNode(n, null);
                }
                else if (VNodes_1.isVNode(n) && n.dom || (n.key && n.key[0] === '.')) {
                    n = VNodes_1.directClone(n);
                }
                if (inferno_shared_1.isNull(n.key) || n.key[0] === '.') {
                    n = applyKey(key, n);
                }
                else {
                    n = applyKeyPrefix(currentKey, n);
                }
                result.push(n);
            }
        }
    }
}
function normalizeVNodes(nodes) {
    var newNodes;
    // we assign $ which basically means we've flagged this array for future note
    // if it comes back again, we need to clone it, as people are using it
    // in an immutable way
    // tslint:disable
    if (nodes['$']) {
        nodes = nodes.slice();
    }
    else {
        nodes['$'] = true;
    }
    // tslint:enable
    for (var i = 0, len = nodes.length; i < len; i++) {
        var n = nodes[i];
        if (inferno_shared_1.isInvalid(n) || inferno_shared_1.isArray(n)) {
            var result = (newNodes || nodes).slice(0, i);
            _normalizeVNodes(nodes, result, i, "");
            return result;
        }
        else if (inferno_shared_1.isStringOrNumber(n)) {
            if (!newNodes) {
                newNodes = nodes.slice(0, i);
            }
            newNodes.push(applyKeyIfMissing(i, VNodes_1.createTextVNode(n, null)));
        }
        else if ((VNodes_1.isVNode(n) && n.dom) || (inferno_shared_1.isNull(n.key) && !(n.flags & 64 /* HasNonKeyedChildren */))) {
            if (!newNodes) {
                newNodes = nodes.slice(0, i);
            }
            newNodes.push(applyKeyIfMissing(i, VNodes_1.directClone(n)));
        }
        else if (newNodes) {
            newNodes.push(applyKeyIfMissing(i, VNodes_1.directClone(n)));
        }
    }
    return newNodes || nodes;
}
exports.normalizeVNodes = normalizeVNodes;
function normalizeChildren(children) {
    if (inferno_shared_1.isArray(children)) {
        return normalizeVNodes(children);
    }
    else if (VNodes_1.isVNode(children) && children.dom) {
        return VNodes_1.directClone(children);
    }
    return children;
}
function normalizeProps(vNode, props, children) {
    if (!(vNode.flags & 28 /* Component */)) {
        if (inferno_shared_1.isNullOrUndef(children) && !inferno_shared_1.isNullOrUndef(props.children)) {
            vNode.children = props.children;
        }
        if (props.className) {
            vNode.className = props.className;
            delete props.className;
        }
    }
    if (props.ref) {
        vNode.ref = props.ref;
        delete props.ref;
    }
    if (!inferno_shared_1.isNullOrUndef(props.key)) {
        vNode.key = props.key;
        delete props.key;
    }
}
function normalizeElement(type, vNode) {
    if (type === 'svg') {
        vNode.flags = 128 /* SvgElement */;
    }
    else if (type === 'input') {
        vNode.flags = 512 /* InputElement */;
    }
    else if (type === 'select') {
        vNode.flags = 2048 /* SelectElement */;
    }
    else if (type === 'textarea') {
        vNode.flags = 1024 /* TextareaElement */;
    }
    else if (type === 'media') {
        vNode.flags = 256 /* MediaElement */;
    }
    else {
        vNode.flags = 2 /* HtmlElement */;
    }
}
function normalize(vNode) {
    var props = vNode.props;
    var children = vNode.children;
    // convert a wrongly created type back to element
    // Primitive node doesn't have defaultProps, only Component
    if (vNode.flags & 28 /* Component */) {
        // set default props
        var type = vNode.type;
        var defaultProps = type.defaultProps;
        if (!inferno_shared_1.isNullOrUndef(defaultProps)) {
            if (!props) {
                props = vNode.props = defaultProps; // Create new object if only defaultProps given
            }
            else {
                for (var prop in defaultProps) {
                    if (inferno_shared_1.isUndefined(props[prop])) {
                        props[prop] = defaultProps[prop];
                    }
                }
            }
        }
        if (inferno_shared_1.isString(type)) {
            normalizeElement(type, vNode);
            if (props && props.children) {
                vNode.children = props.children;
                children = props.children;
            }
        }
    }
    if (props) {
        normalizeProps(vNode, props, children);
    }
    if (!inferno_shared_1.isInvalid(children)) {
        vNode.children = normalizeChildren(children);
    }
    if (props && !inferno_shared_1.isInvalid(props.children)) {
        props.children = normalizeChildren(props.children);
    }
    if (process.env.NODE_ENV !== 'production') {
        // This code will be stripped out from production CODE
        // It will help users to track errors in their applications.
        var verifyKeys = function (vNodes) {
            var keyValues = vNodes.map(function (vnode) { return vnode.key; });
            keyValues.some(function (item, idx) {
                var hasDuplicate = keyValues.indexOf(item) !== idx;
                if (hasDuplicate) {
                    inferno_shared_1.warning('Inferno normalisation(...): Encountered two children with same key, all keys must be unique within its siblings. Duplicated key is:' + item);
                }
                return hasDuplicate;
            });
        };
        if (vNode.children && Array.isArray(vNode.children)) {
            verifyKeys(vNode.children);
        }
    }
}
exports.normalize = normalize;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _infernoComponent = __webpack_require__(17);

var _infernoComponent2 = _interopRequireDefault(_infernoComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Base = function (_Component) {
    _inherits(Base, _Component);

    function Base(props) {
        _classCallCheck(this, Base);

        var _this = _possibleConstructorReturn(this, (Base.__proto__ || Object.getPrototypeOf(Base)).call(this, props));

        _this.test = "nihao";
        return _this;
    }

    return Base;
}(_infernoComponent2.default);

exports.default = Base;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {
Object.defineProperty(exports, "__esModule", { value: true });
// Make sure u use EMPTY_OBJ from 'inferno', otherwise it'll be a different reference
var inferno_1 = __webpack_require__(26);
var inferno_shared_1 = __webpack_require__(2);
var noOp = inferno_shared_1.ERROR_MSG;
if (process.env.NODE_ENV !== 'production') {
    noOp = 'Inferno Error: Can only update a mounted or mounting component. This usually means you called setState() or forceUpdate() on an unmounted component. This is a no-op.';
}
var componentCallbackQueue = new Map();
// when a components root VNode is also a component, we can run into issues
// this will recursively look for vNode.parentNode if the VNode is a component
function updateParentComponentVNodes(vNode, dom) {
    if (vNode.flags & 28 /* Component */) {
        var parentVNode = vNode.parentVNode;
        if (parentVNode) {
            parentVNode.dom = dom;
            updateParentComponentVNodes(parentVNode, dom);
        }
    }
}
var resolvedPromise = Promise.resolve();
function addToQueue(component, force, callback) {
    // TODO this function needs to be revised and improved on
    var queue = componentCallbackQueue.get(component);
    if (!queue) {
        queue = [];
        componentCallbackQueue.set(component, queue);
        resolvedPromise.then(function () {
            componentCallbackQueue.delete(component);
            component._updating = true;
            applyState(component, force, function () {
                for (var i = 0, len = queue.length; i < len; i++) {
                    queue[i]();
                }
            });
            component._updating = false;
        });
    }
    if (callback) {
        queue.push(callback);
    }
}
function queueStateChanges(component, newState, callback, sync) {
    if (inferno_shared_1.isFunction(newState)) {
        newState = newState(component.state, component.props, component.context);
    }
    for (var stateKey in newState) {
        component._pendingState[stateKey] = newState[stateKey];
    }
    if (!component._pendingSetState && inferno_shared_1.isBrowser && !(sync && component._blockRender)) {
        if ((sync || component._blockRender) && !component._updating) {
            component._pendingSetState = true;
            component._updating = true;
            applyState(component, false, callback);
            component._updating = false;
        }
        else {
            addToQueue(component, false, callback);
        }
    }
    else {
        var pending = component._pendingState;
        var state = component.state;
        for (var key in pending) {
            state[key] = pending[key];
        }
        component._pendingState = {};
    }
}
function applyState(component, force, callback) {
    if ((!component._deferSetState || force) && !component._blockRender && !component._unmounted) {
        component._pendingSetState = false;
        var pendingState = component._pendingState;
        var prevState = component.state;
        var nextState = inferno_shared_1.combineFrom(prevState, pendingState);
        var props = component.props;
        var context_1 = component.context;
        component._pendingState = {};
        var nextInput = component._updateComponent(prevState, nextState, props, props, context_1, force, true);
        var didUpdate = true;
        if (inferno_shared_1.isInvalid(nextInput)) {
            nextInput = inferno_1.createVNode(4096 /* Void */);
        }
        else if (nextInput === inferno_shared_1.NO_OP) {
            nextInput = component._lastInput;
            didUpdate = false;
        }
        else if (inferno_shared_1.isStringOrNumber(nextInput)) {
            nextInput = inferno_1.createVNode(1 /* Text */, null, null, nextInput);
        }
        else if (inferno_shared_1.isArray(nextInput)) {
            if (process.env.NODE_ENV !== 'production') {
                inferno_shared_1.throwError('a valid Inferno VNode (or null) must be returned from a component render. You may have returned an array or an invalid object.');
            }
            inferno_shared_1.throwError();
        }
        var lastInput = component._lastInput;
        var vNode = component._vNode;
        var parentDom = (lastInput.dom && lastInput.dom.parentNode) || (lastInput.dom = vNode.dom);
        component._lastInput = nextInput;
        if (didUpdate) {
            var childContext = void 0, subLifecycle = component._lifecycle;
            if (!subLifecycle) {
                subLifecycle = new inferno_shared_1.Lifecycle();
            }
            else {
                subLifecycle.listeners = [];
            }
            component._lifecycle = subLifecycle;
            if (!inferno_shared_1.isUndefined(component.getChildContext)) {
                childContext = component.getChildContext();
            }
            if (inferno_shared_1.isNullOrUndef(childContext)) {
                childContext = component._childContext;
            }
            else {
                childContext = inferno_shared_1.combineFrom(context_1, childContext);
            }
            component._patch(lastInput, nextInput, parentDom, subLifecycle, childContext, component._isSVG, false);
            subLifecycle.trigger();
            if (!inferno_shared_1.isUndefined(component.componentDidUpdate)) {
                component.componentDidUpdate(props, prevState, context_1);
            }
            inferno_1.options.afterUpdate && inferno_1.options.afterUpdate(vNode);
        }
        var dom = vNode.dom = nextInput.dom;
        var componentToDOMNodeMap = component._componentToDOMNodeMap;
        componentToDOMNodeMap && componentToDOMNodeMap.set(component, nextInput.dom);
        updateParentComponentVNodes(vNode, dom);
        if (!inferno_shared_1.isNullOrUndef(callback)) {
            callback();
        }
    }
    else if (!inferno_shared_1.isNullOrUndef(callback)) {
        if (component._blockRender) {
            component.state = component._pendingState;
            component._pendingState = {};
        }
        callback();
    }
}
var Component = (function () {
    function Component(props, context) {
        this.state = {};
        this._blockRender = false;
        this._ignoreSetState = false;
        this._blockSetState = false;
        this._deferSetState = false;
        this._pendingSetState = false;
        this._pendingState = {};
        this._lastInput = null;
        this._vNode = null;
        this._unmounted = false;
        this._lifecycle = null;
        this._childContext = null;
        this._patch = null;
        this._isSVG = false;
        this._componentToDOMNodeMap = null;
        this._updating = false;
        /** @type {object} */
        this.props = props || inferno_1.EMPTY_OBJ;
        /** @type {object} */
        this.context = context || inferno_1.EMPTY_OBJ; // context should not be mutable
    }
    Component.prototype.render = function (nextProps, nextState, nextContext) { };
    Component.prototype.forceUpdate = function (callback) {
        if (this._unmounted) {
            return;
        }
        inferno_shared_1.isBrowser && applyState(this, true, callback);
    };
    Component.prototype.setState = function (newState, callback) {
        if (this._unmounted) {
            return;
        }
        if (!this._blockSetState) {
            if (!this._ignoreSetState) {
                queueStateChanges(this, newState, callback, false);
            }
        }
        else {
            if (process.env.NODE_ENV !== 'production') {
                inferno_shared_1.throwError('cannot update state via setState() in componentWillUpdate().');
            }
            inferno_shared_1.throwError();
        }
    };
    Component.prototype.setStateSync = function (newState) {
        if (this._unmounted) {
            return;
        }
        if (!this._blockSetState) {
            if (!this._ignoreSetState) {
                queueStateChanges(this, newState, null, true);
            }
        }
        else {
            if (process.env.NODE_ENV !== 'production') {
                inferno_shared_1.throwError('cannot update state via setState() in componentWillUpdate().');
            }
            inferno_shared_1.throwError();
        }
    };
    Component.prototype._updateComponent = function (prevState, nextState, prevProps, nextProps, context, force, fromSetState) {
        if (this._unmounted === true) {
            if (process.env.NODE_ENV !== 'production') {
                inferno_shared_1.throwError(noOp);
            }
            inferno_shared_1.throwError();
        }
        if ((prevProps !== nextProps || nextProps === inferno_1.EMPTY_OBJ) || prevState !== nextState || force) {
            if (prevProps !== nextProps || nextProps === inferno_1.EMPTY_OBJ) {
                if (!inferno_shared_1.isUndefined(this.componentWillReceiveProps) && !fromSetState) {
                    this._blockRender = true;
                    this.componentWillReceiveProps(nextProps, context);
                    this._blockRender = false;
                }
                if (this._pendingSetState) {
                    nextState = inferno_shared_1.combineFrom(nextState, this._pendingState);
                    this._pendingSetState = false;
                    this._pendingState = {};
                }
            }
            /* Update if scu is not defined, or it returns truthy value or force */
            if (inferno_shared_1.isUndefined(this.shouldComponentUpdate) || this.shouldComponentUpdate(nextProps, nextState, context) || force) {
                if (!inferno_shared_1.isUndefined(this.componentWillUpdate)) {
                    this._blockSetState = true;
                    this.componentWillUpdate(nextProps, nextState, context);
                    this._blockSetState = false;
                }
                this.props = nextProps;
                this.state = nextState;
                this.context = context;
                inferno_1.options.beforeRender && inferno_1.options.beforeRender(this);
                var render = this.render(nextProps, nextState, context);
                inferno_1.options.afterRender && inferno_1.options.afterRender(this);
                return render;
            }
            else {
                this.props = nextProps;
                this.state = nextState;
                this.context = context;
            }
        }
        return inferno_shared_1.NO_OP;
    };
    return Component;
}());
exports.default = Component;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(16).default;
module.exports.default = module.exports;



/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.NO_OP = '$NO_OP';
exports.ERROR_MSG = 'a runtime error occured! Use Inferno in development environment to find the error.';
// This should be boolean and not reference to window.document
exports.isBrowser = !!(typeof window !== 'undefined' && window.document);
function toArray(children) {
    return exports.isArray(children) ? children : (children ? [children] : children);
}
exports.toArray = toArray;
// this is MUCH faster than .constructor === Array and instanceof Array
// in Node 7 and the later versions of V8, slower in older versions though
exports.isArray = Array.isArray;
function isStatefulComponent(o) {
    return !isUndefined(o.prototype) && !isUndefined(o.prototype.render);
}
exports.isStatefulComponent = isStatefulComponent;
function isStringOrNumber(obj) {
    var type = typeof obj;
    return type === 'string' || type === 'number';
}
exports.isStringOrNumber = isStringOrNumber;
function isNullOrUndef(obj) {
    return isUndefined(obj) || isNull(obj);
}
exports.isNullOrUndef = isNullOrUndef;
function isInvalid(obj) {
    return isNull(obj) || obj === false || isTrue(obj) || isUndefined(obj);
}
exports.isInvalid = isInvalid;
function isFunction(obj) {
    return typeof obj === 'function';
}
exports.isFunction = isFunction;
function isString(obj) {
    return typeof obj === 'string';
}
exports.isString = isString;
function isNumber(obj) {
    return typeof obj === 'number';
}
exports.isNumber = isNumber;
function isNull(obj) {
    return obj === null;
}
exports.isNull = isNull;
function isTrue(obj) {
    return obj === true;
}
exports.isTrue = isTrue;
function isUndefined(obj) {
    return obj === undefined;
}
exports.isUndefined = isUndefined;
function isObject(o) {
    return typeof o === 'object';
}
exports.isObject = isObject;
function throwError(message) {
    if (!message) {
        message = exports.ERROR_MSG;
    }
    throw new Error("Inferno Error: " + message);
}
exports.throwError = throwError;
function warning(message) {
    console.warn(message);
}
exports.warning = warning;
function combineFrom(first, second) {
    var obj = {};
    var key;
    if (first) {
        for (key in first) {
            obj[key] = first[key];
        }
    }
    if (second) {
        for (key in second) {
            obj[key] = second[key];
        }
    }
    return obj;
}
exports.combineFrom = combineFrom;
function Lifecycle() {
    this.listeners = [];
}
exports.Lifecycle = Lifecycle;
Lifecycle.prototype.addListener = function addListener(callback) {
    this.listeners.push(callback);
};
Lifecycle.prototype.trigger = function trigger() {
    var listeners = this.listeners;
    for (var i = 0, len = listeners.length; i < len; i++) {
        listeners[i]();
    }
};


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var inferno_shared_1 = __webpack_require__(2);
var isiOS = inferno_shared_1.isBrowser && !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
var delegatedEvents = new Map();
function handleEvent(name, lastEvent, nextEvent, dom) {
    var delegatedRoots = delegatedEvents.get(name);
    if (nextEvent) {
        if (!delegatedRoots) {
            delegatedRoots = { items: new Map(), count: 0, docEvent: null };
            delegatedRoots.docEvent = attachEventToDocument(name, delegatedRoots);
            delegatedEvents.set(name, delegatedRoots);
        }
        if (!lastEvent) {
            delegatedRoots.count++;
            if (isiOS && name === 'onClick') {
                trapClickOnNonInteractiveElement(dom);
            }
        }
        delegatedRoots.items.set(dom, nextEvent);
    }
    else if (delegatedRoots) {
        if (delegatedRoots.items.has(dom)) {
            delegatedRoots.count--;
            delegatedRoots.items.delete(dom);
            if (delegatedRoots.count === 0) {
                document.removeEventListener(normalizeEventName(name), delegatedRoots.docEvent);
                delegatedEvents.delete(name);
            }
        }
    }
}
exports.handleEvent = handleEvent;
function dispatchEvent(event, dom, items, count, eventData) {
    var eventsToTrigger = items.get(dom);
    if (eventsToTrigger) {
        count--;
        // linkEvent object
        eventData.dom = dom;
        if (eventsToTrigger.event) {
            eventsToTrigger.event(eventsToTrigger.data, event);
        }
        else {
            eventsToTrigger(event);
        }
        if (eventData.stopPropagation) {
            return;
        }
    }
    if (count > 0) {
        var parentDom = dom.parentNode;
        // Html Nodes can be nested fe: span inside button in that scenario browser does not handle disabled attribute on parent,
        // because the event listener is on document.body
        if (parentDom && parentDom.disabled !== true || parentDom === document.body) {
            dispatchEvent(event, parentDom, items, count, eventData);
        }
    }
}
function normalizeEventName(name) {
    return name.substr(2).toLowerCase();
}
function attachEventToDocument(name, delegatedRoots) {
    var docEvent = function (event) {
        var eventData = {
            stopPropagation: false,
            dom: document
        };
        event.stopPropagation = function () {
            eventData.stopPropagation = true;
        };
        var count = delegatedRoots.count;
        if (count > 0) {
            dispatchEvent(event, event.target, delegatedRoots.items, count, eventData);
        }
    };
    document.addEventListener(normalizeEventName(name), docEvent);
    return docEvent;
}
function emptyFn() { }
function trapClickOnNonInteractiveElement(dom) {
    // Mobile Safari does not fire properly bubble click events on
    // non-interactive elements, which means delegated click listeners do not
    // fire. The workaround for this bug involves attaching an empty click
    // listener on the target node.
    // http://www.quirksmode.org/blog/archives/2010/09/click_event_del.html
    // Just set it using the onclick property so that we don't have to manage any
    // bookkeeping for it. Not sure if we need to clear it when the listener is
    // removed.
    // TODO: Only do this for the relevant Safaris maybe?
    dom.onclick = emptyFn;
}


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function linkEvent(data, event) {
    return { data: data, event: event };
}
exports.default = linkEvent;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {
Object.defineProperty(exports, "__esModule", { value: true });
var inferno_shared_1 = __webpack_require__(2);
var options_1 = __webpack_require__(5);
var constants_1 = __webpack_require__(10);
var mounting_1 = __webpack_require__(11);
var patching_1 = __webpack_require__(7);
var rendering_1 = __webpack_require__(8);
var utils_1 = __webpack_require__(3);
var processElement_1 = __webpack_require__(9);
function normalizeChildNodes(parentDom) {
    var dom = parentDom.firstChild;
    while (dom) {
        if (dom.nodeType === 8) {
            if (dom.data === '!') {
                var placeholder = document.createTextNode('');
                parentDom.replaceChild(placeholder, dom);
                dom = dom.nextSibling;
            }
            else {
                var lastDom = dom.previousSibling;
                parentDom.removeChild(dom);
                dom = lastDom || parentDom.firstChild;
            }
        }
        else {
            dom = dom.nextSibling;
        }
    }
}
exports.normalizeChildNodes = normalizeChildNodes;
function hydrateComponent(vNode, dom, lifecycle, context, isSVG, isClass) {
    var type = vNode.type;
    var ref = vNode.ref;
    vNode.dom = dom;
    var props = vNode.props || utils_1.EMPTY_OBJ;
    if (isClass) {
        var _isSVG = dom.namespaceURI === constants_1.svgNS;
        var instance = utils_1.createClassComponentInstance(vNode, type, props, context, _isSVG);
        var input = instance._lastInput;
        instance._vComponent = vNode;
        instance._vNode = vNode;
        hydrate(input, dom, lifecycle, instance._childContext, _isSVG);
        mounting_1.mountClassComponentCallbacks(vNode, ref, instance, lifecycle);
        options_1.default.findDOMNodeEnabled && rendering_1.componentToDOMNodeMap.set(instance, dom);
        vNode.children = instance;
    }
    else {
        var input = utils_1.createFunctionalComponentInput(vNode, type, props, context);
        hydrate(input, dom, lifecycle, context, isSVG);
        vNode.children = input;
        vNode.dom = input.dom;
        mounting_1.mountFunctionalComponentCallbacks(ref, dom, lifecycle);
    }
    return dom;
}
function hydrateElement(vNode, dom, lifecycle, context, isSVG) {
    var children = vNode.children;
    var props = vNode.props;
    var className = vNode.className;
    var flags = vNode.flags;
    var ref = vNode.ref;
    if (isSVG || (flags & 128 /* SvgElement */)) {
        isSVG = true;
    }
    if (dom.nodeType !== 1 || dom.tagName.toLowerCase() !== vNode.type) {
        if (process.env.NODE_ENV !== 'production') {
            inferno_shared_1.warning('Inferno hydration: Server-side markup doesn\'t match client-side markup or Initial render target is not empty');
        }
        var newDom = mounting_1.mountElement(vNode, null, lifecycle, context, isSVG);
        vNode.dom = newDom;
        utils_1.replaceChild(dom.parentNode, newDom, dom);
        return newDom;
    }
    vNode.dom = dom;
    if (children) {
        hydrateChildren(children, dom, lifecycle, context, isSVG);
    }
    var hasControlledValue = false;
    if (!(flags & 2 /* HtmlElement */)) {
        hasControlledValue = processElement_1.default(flags, vNode, dom, false);
    }
    if (props) {
        for (var prop in props) {
            patching_1.patchProp(prop, null, props[prop], dom, isSVG, hasControlledValue);
        }
    }
    if (inferno_shared_1.isNullOrUndef(className)) {
        dom.removeAttribute('class');
    }
    else {
        if (isSVG) {
            dom.setAttribute('class', className);
        }
        else {
            dom.className = className;
        }
    }
    if (ref) {
        mounting_1.mountRef(dom, ref, lifecycle);
    }
    return dom;
}
function hydrateChildren(children, parentDom, lifecycle, context, isSVG) {
    normalizeChildNodes(parentDom);
    var dom = parentDom.firstChild;
    if (inferno_shared_1.isArray(children)) {
        for (var i = 0, len = children.length; i < len; i++) {
            var child = children[i];
            if (!inferno_shared_1.isNull(child) && inferno_shared_1.isObject(child)) {
                if (dom) {
                    dom = hydrate(child, dom, lifecycle, context, isSVG);
                    dom = dom.nextSibling;
                }
                else {
                    mounting_1.mount(child, parentDom, lifecycle, context, isSVG);
                }
            }
        }
    }
    else if (inferno_shared_1.isStringOrNumber(children)) {
        if (dom && dom.nodeType === 3) {
            if (dom.nodeValue !== children) {
                dom.nodeValue = children;
            }
        }
        else if (children) {
            parentDom.textContent = children;
        }
        dom = dom.nextSibling;
    }
    else if (inferno_shared_1.isObject(children)) {
        hydrate(children, dom, lifecycle, context, isSVG);
        dom = dom.nextSibling;
    }
    // clear any other DOM nodes, there should be only a single entry for the root
    while (dom) {
        var nextSibling = dom.nextSibling;
        parentDom.removeChild(dom);
        dom = nextSibling;
    }
}
function hydrateText(vNode, dom) {
    if (dom.nodeType !== 3) {
        var newDom = mounting_1.mountText(vNode, null);
        vNode.dom = newDom;
        utils_1.replaceChild(dom.parentNode, newDom, dom);
        return newDom;
    }
    var text = vNode.children;
    if (dom.nodeValue !== text) {
        dom.nodeValue = text;
    }
    vNode.dom = dom;
    return dom;
}
function hydrateVoid(vNode, dom) {
    vNode.dom = dom;
    return dom;
}
function hydrate(vNode, dom, lifecycle, context, isSVG) {
    var flags = vNode.flags;
    if (flags & 28 /* Component */) {
        return hydrateComponent(vNode, dom, lifecycle, context, isSVG, flags & 4 /* ComponentClass */);
    }
    else if (flags & 3970 /* Element */) {
        return hydrateElement(vNode, dom, lifecycle, context, isSVG);
    }
    else if (flags & 1 /* Text */) {
        return hydrateText(vNode, dom);
    }
    else if (flags & 4096 /* Void */) {
        return hydrateVoid(vNode, dom);
    }
    else {
        if (process.env.NODE_ENV !== 'production') {
            inferno_shared_1.throwError("hydrate() expects a valid VNode, instead it received an object with the type \"" + typeof vNode + "\".");
        }
        inferno_shared_1.throwError();
    }
}
function hydrateRoot(input, parentDom, lifecycle) {
    var dom = parentDom && parentDom.firstChild;
    if (dom) {
        hydrate(input, dom, lifecycle, utils_1.EMPTY_OBJ, false);
        dom = parentDom.firstChild;
        // clear any other DOM nodes, there should be only a single entry for the root
        while (dom = dom.nextSibling) {
            parentDom.removeChild(dom);
        }
        return true;
    }
    return false;
}
exports.default = hydrateRoot;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var inferno_shared_1 = __webpack_require__(2);
var processElement_1 = __webpack_require__(9);
var utils_1 = __webpack_require__(3);
function isCheckedType(type) {
    return type === 'checkbox' || type === 'radio';
}
function isControlled(props) {
    var usesChecked = isCheckedType(props.type);
    return usesChecked ? !inferno_shared_1.isNullOrUndef(props.checked) : !inferno_shared_1.isNullOrUndef(props.value);
}
function onTextInputChange(e) {
    var vNode = this.vNode;
    var props = vNode.props || utils_1.EMPTY_OBJ;
    var dom = vNode.dom;
    var previousValue = props.value;
    var start = dom.selectionStart;
    var end = dom.selectionEnd;
    if (props.onInput) {
        var event_1 = props.onInput;
        if (event_1.event) {
            event_1.event(event_1.data, e);
        }
        else {
            event_1(e);
        }
    }
    else if (props.oninput) {
        props.oninput(e);
    }
    // the user may have updated the vNode from the above onInput events syncronously
    // so we need to get it from the context of `this` again
    var newVNode = this.vNode;
    var newProps = newVNode.props || utils_1.EMPTY_OBJ;
    // If render is going async there is no value change yet, it will come back to process input soon
    if (previousValue !== newProps.value) {
        // When this happens we need to store current cursor position and restore it, to avoid jumping
        applyValue(newVNode, dom);
        dom.setSelectionRange(start, end);
    }
}
function wrappedOnChange(e) {
    var vNode = this.vNode;
    var props = vNode.props || utils_1.EMPTY_OBJ;
    var event = props.onChange;
    if (event.event) {
        event.event(event.data, e);
    }
    else {
        event(e);
    }
}
function onCheckboxChange(e) {
    var vNode = this.vNode;
    var props = vNode.props || utils_1.EMPTY_OBJ;
    var dom = vNode.dom;
    var previousValue = props.value;
    if (props.onClick) {
        var event_2 = props.onClick;
        if (event_2.event) {
            event_2.event(event_2.data, e);
        }
        else {
            event_2(e);
        }
    }
    else if (props.onclick) {
        props.onclick(e);
    }
    // the user may have updated the vNode from the above onInput events syncronously
    // so we need to get it from the context of `this` again
    var newVNode = this.vNode;
    var newProps = newVNode.props || utils_1.EMPTY_OBJ;
    // If render is going async there is no value change yet, it will come back to process input soon
    if (previousValue !== newProps.value) {
        // When this happens we need to store current cursor position and restore it, to avoid jumping
        applyValue(newVNode, dom);
    }
}
function handleAssociatedRadioInputs(name) {
    var inputs = document.querySelectorAll("input[type=\"radio\"][name=\"" + name + "\"]");
    [].forEach.call(inputs, function (dom) {
        var inputWrapper = processElement_1.wrappers.get(dom);
        if (inputWrapper) {
            var props = inputWrapper.vNode.props;
            if (props) {
                dom.checked = inputWrapper.vNode.props.checked;
            }
        }
    });
}
function processInput(vNode, dom) {
    var props = vNode.props || utils_1.EMPTY_OBJ;
    applyValue(vNode, dom);
    if (isControlled(props)) {
        var inputWrapper = processElement_1.wrappers.get(dom);
        if (!inputWrapper) {
            inputWrapper = {
                vNode: vNode
            };
            if (isCheckedType(props.type)) {
                dom.onclick = onCheckboxChange.bind(inputWrapper);
                dom.onclick.wrapped = true;
            }
            else {
                dom.oninput = onTextInputChange.bind(inputWrapper);
                dom.oninput.wrapped = true;
            }
            if (props.onChange) {
                dom.onchange = wrappedOnChange.bind(inputWrapper);
                dom.onchange.wrapped = true;
            }
            processElement_1.wrappers.set(dom, inputWrapper);
        }
        inputWrapper.vNode = vNode;
        return true;
    }
    return false;
}
exports.processInput = processInput;
function applyValue(vNode, dom) {
    var props = vNode.props || utils_1.EMPTY_OBJ;
    var type = props.type;
    var value = props.value;
    var checked = props.checked;
    var multiple = props.multiple;
    var defaultValue = props.defaultValue;
    var hasValue = !inferno_shared_1.isNullOrUndef(value);
    if (type && type !== dom.type) {
        dom.setAttribute('type', type);
    }
    if (multiple && multiple !== dom.multiple) {
        dom.multiple = multiple;
    }
    if (!inferno_shared_1.isNullOrUndef(defaultValue) && !hasValue) {
        dom.defaultValue = defaultValue + '';
    }
    if (isCheckedType(type)) {
        if (hasValue) {
            dom.value = value;
        }
        if (!inferno_shared_1.isNullOrUndef(checked)) {
            dom.checked = checked;
        }
        if (type === 'radio' && props.name) {
            handleAssociatedRadioInputs(props.name);
        }
    }
    else {
        if (hasValue && dom.value !== value) {
            dom.value = value;
        }
        else if (!inferno_shared_1.isNullOrUndef(checked)) {
            dom.checked = checked;
        }
    }
}
exports.applyValue = applyValue;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var inferno_shared_1 = __webpack_require__(2);
var VNodes_1 = __webpack_require__(6);
var processElement_1 = __webpack_require__(9);
var utils_1 = __webpack_require__(3);
function isControlled(props) {
    return !inferno_shared_1.isNullOrUndef(props.value);
}
function updateChildOptionGroup(vNode, value) {
    var type = vNode.type;
    if (type === 'optgroup') {
        var children = vNode.children;
        if (inferno_shared_1.isArray(children)) {
            for (var i = 0, len = children.length; i < len; i++) {
                updateChildOption(children[i], value);
            }
        }
        else if (VNodes_1.isVNode(children)) {
            updateChildOption(children, value);
        }
    }
    else {
        updateChildOption(vNode, value);
    }
}
function updateChildOption(vNode, value) {
    var props = vNode.props || utils_1.EMPTY_OBJ;
    var dom = vNode.dom;
    // we do this as multiple may have changed
    dom.value = props.value;
    if ((inferno_shared_1.isArray(value) && value.indexOf(props.value) !== -1) || props.value === value) {
        dom.selected = true;
    }
    else if (!inferno_shared_1.isNullOrUndef(value) || !inferno_shared_1.isNullOrUndef(props.selected)) {
        dom.selected = props.selected || false;
    }
}
function onSelectChange(e) {
    var vNode = this.vNode;
    var props = vNode.props || utils_1.EMPTY_OBJ;
    var dom = vNode.dom;
    if (props.onChange) {
        var event_1 = props.onChange;
        if (event_1.event) {
            event_1.event(event_1.data, e);
        }
        else {
            event_1(e);
        }
    }
    else if (props.onchange) {
        props.onchange(e);
    }
    // the user may have updated the vNode from the above onChange events
    // so we need to get it from the context of `this` again
    applyValue(this.vNode, dom, false);
}
function processSelect(vNode, dom, mounting) {
    var props = vNode.props || utils_1.EMPTY_OBJ;
    applyValue(vNode, dom, mounting);
    if (isControlled(props)) {
        var selectWrapper = processElement_1.wrappers.get(dom);
        if (!selectWrapper) {
            selectWrapper = {
                vNode: vNode
            };
            dom.onchange = onSelectChange.bind(selectWrapper);
            dom.onchange.wrapped = true;
            processElement_1.wrappers.set(dom, selectWrapper);
        }
        selectWrapper.vNode = vNode;
        return true;
    }
    return false;
}
exports.processSelect = processSelect;
function applyValue(vNode, dom, mounting) {
    var props = vNode.props || utils_1.EMPTY_OBJ;
    if (props.multiple !== dom.multiple) {
        dom.multiple = props.multiple;
    }
    var children = vNode.children;
    if (!inferno_shared_1.isInvalid(children)) {
        var value = props.value;
        if (mounting && inferno_shared_1.isNullOrUndef(value)) {
            value = props.defaultValue;
        }
        if (inferno_shared_1.isArray(children)) {
            for (var i = 0, len = children.length; i < len; i++) {
                updateChildOptionGroup(children[i], value);
            }
        }
        else if (VNodes_1.isVNode(children)) {
            updateChildOptionGroup(children, value);
        }
    }
}
exports.applyValue = applyValue;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var inferno_shared_1 = __webpack_require__(2);
var processElement_1 = __webpack_require__(9);
var utils_1 = __webpack_require__(3);
function isControlled(props) {
    return !inferno_shared_1.isNullOrUndef(props.value);
}
function wrappedOnChange(e) {
    var vNode = this.vNode;
    var props = vNode.props || utils_1.EMPTY_OBJ;
    var event = props.onChange;
    if (event.event) {
        event.event(event.data, e);
    }
    else {
        event(e);
    }
}
function onTextareaInputChange(e) {
    var vNode = this.vNode;
    var props = vNode.props || utils_1.EMPTY_OBJ;
    var dom = vNode.dom;
    var previousValue = props.value;
    if (props.onInput) {
        var event_1 = props.onInput;
        if (event_1.event) {
            event_1.event(event_1.data, e);
        }
        else {
            event_1(e);
        }
    }
    else if (props.oninput) {
        props.oninput(e);
    }
    // the user may have updated the vNode from the above onInput events syncronously
    // so we need to get it from the context of `this` again
    var newVNode = this.vNode;
    var newProps = newVNode.props || utils_1.EMPTY_OBJ;
    // If render is going async there is no value change yet, it will come back to process input soon
    if (previousValue !== newProps.value) {
        // When this happens we need to store current cursor position and restore it, to avoid jumping
        applyValue(newVNode, dom, false);
    }
}
function processTextarea(vNode, dom, mounting) {
    var props = vNode.props || utils_1.EMPTY_OBJ;
    applyValue(vNode, dom, mounting);
    var textareaWrapper = processElement_1.wrappers.get(dom);
    if (isControlled(props)) {
        if (!textareaWrapper) {
            textareaWrapper = {
                vNode: vNode
            };
            dom.oninput = onTextareaInputChange.bind(textareaWrapper);
            dom.oninput.wrapped = true;
            if (props.onChange) {
                dom.onchange = wrappedOnChange.bind(textareaWrapper);
                dom.onchange.wrapped = true;
            }
            processElement_1.wrappers.set(dom, textareaWrapper);
        }
        textareaWrapper.vNode = vNode;
        return true;
    }
    return false;
}
exports.processTextarea = processTextarea;
function applyValue(vNode, dom, mounting) {
    var props = vNode.props || utils_1.EMPTY_OBJ;
    var value = props.value;
    var domValue = dom.value;
    if (inferno_shared_1.isNullOrUndef(value)) {
        if (mounting) {
            var defaultValue = props.defaultValue;
            if (!inferno_shared_1.isNullOrUndef(defaultValue)) {
                if (defaultValue !== domValue) {
                    dom.value = defaultValue;
                }
            }
            else if (domValue !== '') {
                dom.value = '';
            }
        }
    }
    else {
        /* There is value so keep it controlled */
        if (domValue !== value) {
            dom.value = value;
        }
    }
}
exports.applyValue = applyValue;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {
Object.defineProperty(exports, "__esModule", { value: true });
var inferno_shared_1 = __webpack_require__(2);
exports.NO_OP = inferno_shared_1.NO_OP;
var VNodes_1 = __webpack_require__(6);
exports.createVNode = VNodes_1.createVNode;
exports.cloneVNode = VNodes_1.cloneVNode;
var linkEvent_1 = __webpack_require__(20);
exports.linkEvent = linkEvent_1.default;
var options_1 = __webpack_require__(5);
exports.options = options_1.default;
var rendering_1 = __webpack_require__(8);
exports.render = rendering_1.render;
exports.findDOMNode = rendering_1.findDOMNode;
exports.createRenderer = rendering_1.createRenderer;
var utils_1 = __webpack_require__(3);
exports.EMPTY_OBJ = utils_1.EMPTY_OBJ;
if (process.env.NODE_ENV !== 'production') {
    var testFunc = function testFn() { };
    if ((testFunc.name || testFunc.toString()).indexOf('testFn') === -1) {
        inferno_shared_1.warning(('It looks like you\'re using a minified copy of the development build ' +
            'of Inferno. When deploying Inferno apps to production, make sure to use ' +
            'the production build which skips development warnings and is faster. ' +
            'See http://infernojs.org for more details.'));
    }
}
// This will be replaced by rollup
exports.version = 'VERSION';
// we duplicate it so it plays nicely with different module loading systems
exports.default = {
    linkEvent: linkEvent_1.default,
    // core shapes
    createVNode: VNodes_1.createVNode,
    // cloning
    cloneVNode: VNodes_1.cloneVNode,
    // used to shared common items between Inferno libs
    NO_OP: inferno_shared_1.NO_OP,
    EMPTY_OBJ: utils_1.EMPTY_OBJ,
    // DOM
    render: rendering_1.render,
    findDOMNode: rendering_1.findDOMNode,
    createRenderer: rendering_1.createRenderer,
    options: options_1.default,
    version: exports.version
};
// Internal stuff that only core inferno-* packages use
var constants_1 = __webpack_require__(10);
exports.internal_isUnitlessNumber = constants_1.isUnitlessNumber;
// Mainly for testing
var normalization_1 = __webpack_require__(14);
exports.internal_normalize = normalization_1.normalize;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(25).default;
module.exports.default = module.exports;



/***/ })
/******/ ]);