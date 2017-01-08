/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _preact = __webpack_require__(1);

	var _Layout = __webpack_require__(2);

	var _Layout2 = _interopRequireDefault(_Layout);

	__webpack_require__(27);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	(0, _preact.render)((0, _preact.h)(_Layout2.default, null), document.body);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	!function(global, factory) {
	     true ? factory(exports) : 'function' == typeof define && define.amd ? define([ 'exports' ], factory) : factory(global.preact = global.preact || {});
	}(this, function(exports) {
	    function VNode(nodeName, attributes, children) {
	        this.nodeName = nodeName;
	        this.attributes = attributes;
	        this.children = children;
	        this.key = attributes && attributes.key;
	    }
	    function h(nodeName, attributes) {
	        var lastSimple, child, simple, i, children = [];
	        for (i = arguments.length; i-- > 2; ) stack.push(arguments[i]);
	        if (attributes && attributes.children) {
	            if (!stack.length) stack.push(attributes.children);
	            delete attributes.children;
	        }
	        while (stack.length) if ((child = stack.pop()) instanceof Array) for (i = child.length; i--; ) stack.push(child[i]); else if (null != child && child !== !1) {
	            if ('number' == typeof child || child === !0) child = String(child);
	            simple = 'string' == typeof child;
	            if (simple && lastSimple) children[children.length - 1] += child; else {
	                children.push(child);
	                lastSimple = simple;
	            }
	        }
	        var p = new VNode(nodeName, attributes || void 0, children);
	        if (options.vnode) options.vnode(p);
	        return p;
	    }
	    function extend(obj, props) {
	        if (props) for (var i in props) obj[i] = props[i];
	        return obj;
	    }
	    function clone(obj) {
	        return extend({}, obj);
	    }
	    function delve(obj, key) {
	        for (var p = key.split('.'), i = 0; i < p.length && obj; i++) obj = obj[p[i]];
	        return obj;
	    }
	    function isFunction(obj) {
	        return 'function' == typeof obj;
	    }
	    function isString(obj) {
	        return 'string' == typeof obj;
	    }
	    function hashToClassName(c) {
	        var str = '';
	        for (var prop in c) if (c[prop]) {
	            if (str) str += ' ';
	            str += prop;
	        }
	        return str;
	    }
	    function cloneElement(vnode, props) {
	        return h(vnode.nodeName, extend(clone(vnode.attributes), props), arguments.length > 2 ? [].slice.call(arguments, 2) : vnode.children);
	    }
	    function createLinkedState(component, key, eventPath) {
	        var path = key.split('.');
	        return function(e) {
	            var t = e && e.target || this, state = {}, obj = state, v = isString(eventPath) ? delve(e, eventPath) : t.nodeName ? t.type.match(/^che|rad/) ? t.checked : t.value : e, i = 0;
	            for (;i < path.length - 1; i++) obj = obj[path[i]] || (obj[path[i]] = !i && component.state[path[i]] || {});
	            obj[path[i]] = v;
	            component.setState(state);
	        };
	    }
	    function enqueueRender(component) {
	        if (!component._dirty && (component._dirty = !0) && 1 == items.push(component)) (options.debounceRendering || defer)(rerender);
	    }
	    function rerender() {
	        var p, list = items;
	        items = [];
	        while (p = list.pop()) if (p._dirty) renderComponent(p);
	    }
	    function isFunctionalComponent(vnode) {
	        var nodeName = vnode && vnode.nodeName;
	        return nodeName && isFunction(nodeName) && !(nodeName.prototype && nodeName.prototype.render);
	    }
	    function buildFunctionalComponent(vnode, context) {
	        return vnode.nodeName(getNodeProps(vnode), context || EMPTY);
	    }
	    function isSameNodeType(node, vnode) {
	        if (isString(vnode)) return node instanceof Text;
	        if (isString(vnode.nodeName)) return !node._componentConstructor && isNamedNode(node, vnode.nodeName);
	        if (isFunction(vnode.nodeName)) return (node._componentConstructor ? node._componentConstructor === vnode.nodeName : !0) || isFunctionalComponent(vnode); else ;
	    }
	    function isNamedNode(node, nodeName) {
	        return node.normalizedNodeName === nodeName || toLowerCase(node.nodeName) === toLowerCase(nodeName);
	    }
	    function getNodeProps(vnode) {
	        var props = clone(vnode.attributes);
	        props.children = vnode.children;
	        var defaultProps = vnode.nodeName.defaultProps;
	        if (defaultProps) for (var i in defaultProps) if (void 0 === props[i]) props[i] = defaultProps[i];
	        return props;
	    }
	    function removeNode(node) {
	        var p = node.parentNode;
	        if (p) p.removeChild(node);
	    }
	    function setAccessor(node, name, old, value, isSvg) {
	        if ('className' === name) name = 'class';
	        if ('class' === name && value && 'object' == typeof value) value = hashToClassName(value);
	        if ('key' === name) ; else if ('class' === name && !isSvg) node.className = value || ''; else if ('style' === name) {
	            if (!value || isString(value) || isString(old)) node.style.cssText = value || '';
	            if (value && 'object' == typeof value) {
	                if (!isString(old)) for (var i in old) if (!(i in value)) node.style[i] = '';
	                for (var i in value) node.style[i] = 'number' == typeof value[i] && !NON_DIMENSION_PROPS[i] ? value[i] + 'px' : value[i];
	            }
	        } else if ('dangerouslySetInnerHTML' === name) node.innerHTML = value && value.__html || ''; else if ('o' == name[0] && 'n' == name[1]) {
	            var l = node._listeners || (node._listeners = {});
	            name = toLowerCase(name.substring(2));
	            if (value) {
	                if (!l[name]) node.addEventListener(name, eventProxy, !!NON_BUBBLING_EVENTS[name]);
	            } else if (l[name]) node.removeEventListener(name, eventProxy, !!NON_BUBBLING_EVENTS[name]);
	            l[name] = value;
	        } else if ('list' !== name && 'type' !== name && !isSvg && name in node) {
	            setProperty(node, name, null == value ? '' : value);
	            if (null == value || value === !1) node.removeAttribute(name);
	        } else {
	            var ns = isSvg && name.match(/^xlink\:?(.+)/);
	            if (null == value || value === !1) if (ns) node.removeAttributeNS('http://www.w3.org/1999/xlink', toLowerCase(ns[1])); else node.removeAttribute(name); else if ('object' != typeof value && !isFunction(value)) if (ns) node.setAttributeNS('http://www.w3.org/1999/xlink', toLowerCase(ns[1]), value); else node.setAttribute(name, value);
	        }
	    }
	    function setProperty(node, name, value) {
	        try {
	            node[name] = value;
	        } catch (e) {}
	    }
	    function eventProxy(e) {
	        return this._listeners[e.type](options.event && options.event(e) || e);
	    }
	    function collectNode(node) {
	        removeNode(node);
	        if (node instanceof Element) {
	            node._component = node._componentConstructor = null;
	            var _name = node.normalizedNodeName || toLowerCase(node.nodeName);
	            (nodes[_name] || (nodes[_name] = [])).push(node);
	        }
	    }
	    function createNode(nodeName, isSvg) {
	        var name = toLowerCase(nodeName), node = nodes[name] && nodes[name].pop() || (isSvg ? document.createElementNS('http://www.w3.org/2000/svg', nodeName) : document.createElement(nodeName));
	        node.normalizedNodeName = name;
	        return node;
	    }
	    function flushMounts() {
	        var c;
	        while (c = mounts.pop()) {
	            if (options.afterMount) options.afterMount(c);
	            if (c.componentDidMount) c.componentDidMount();
	        }
	    }
	    function diff(dom, vnode, context, mountAll, parent, componentRoot) {
	        if (!diffLevel++) {
	            isSvgMode = parent instanceof SVGElement;
	            hydrating = dom && !(ATTR_KEY in dom);
	        }
	        var ret = idiff(dom, vnode, context, mountAll);
	        if (parent && ret.parentNode !== parent) parent.appendChild(ret);
	        if (!--diffLevel) {
	            hydrating = !1;
	            if (!componentRoot) flushMounts();
	        }
	        return ret;
	    }
	    function idiff(dom, vnode, context, mountAll) {
	        var originalAttributes = vnode && vnode.attributes;
	        while (isFunctionalComponent(vnode)) vnode = buildFunctionalComponent(vnode, context);
	        if (null == vnode) vnode = '';
	        if (isString(vnode)) {
	            if (dom && dom instanceof Text) {
	                if (dom.nodeValue != vnode) dom.nodeValue = vnode;
	            } else {
	                if (dom) recollectNodeTree(dom);
	                dom = document.createTextNode(vnode);
	            }
	            dom[ATTR_KEY] = !0;
	            return dom;
	        }
	        if (isFunction(vnode.nodeName)) return buildComponentFromVNode(dom, vnode, context, mountAll);
	        var out = dom, nodeName = String(vnode.nodeName), prevSvgMode = isSvgMode, vchildren = vnode.children;
	        isSvgMode = 'svg' === nodeName ? !0 : 'foreignObject' === nodeName ? !1 : isSvgMode;
	        if (!dom) out = createNode(nodeName, isSvgMode); else if (!isNamedNode(dom, nodeName)) {
	            out = createNode(nodeName, isSvgMode);
	            while (dom.firstChild) out.appendChild(dom.firstChild);
	            if (dom.parentNode) dom.parentNode.replaceChild(out, dom);
	            recollectNodeTree(dom);
	        }
	        var fc = out.firstChild, props = out[ATTR_KEY];
	        if (!props) {
	            out[ATTR_KEY] = props = {};
	            for (var a = out.attributes, i = a.length; i--; ) props[a[i].name] = a[i].value;
	        }
	        diffAttributes(out, vnode.attributes, props);
	        if (!hydrating && vchildren && 1 === vchildren.length && 'string' == typeof vchildren[0] && fc && fc instanceof Text && !fc.nextSibling) {
	            if (fc.nodeValue != vchildren[0]) fc.nodeValue = vchildren[0];
	        } else if (vchildren && vchildren.length || fc) innerDiffNode(out, vchildren, context, mountAll);
	        if (originalAttributes && 'function' == typeof originalAttributes.ref) (props.ref = originalAttributes.ref)(out);
	        isSvgMode = prevSvgMode;
	        return out;
	    }
	    function innerDiffNode(dom, vchildren, context, mountAll) {
	        var j, c, vchild, child, originalChildren = dom.childNodes, children = [], keyed = {}, keyedLen = 0, min = 0, len = originalChildren.length, childrenLen = 0, vlen = vchildren && vchildren.length;
	        if (len) for (var i = 0; i < len; i++) {
	            var _child = originalChildren[i], props = _child[ATTR_KEY], key = vlen ? (c = _child._component) ? c.__key : props ? props.key : null : null;
	            if (null != key) {
	                keyedLen++;
	                keyed[key] = _child;
	            } else if (hydrating || props) children[childrenLen++] = _child;
	        }
	        if (vlen) for (var i = 0; i < vlen; i++) {
	            vchild = vchildren[i];
	            child = null;
	            var key = vchild.key;
	            if (null != key) {
	                if (keyedLen && key in keyed) {
	                    child = keyed[key];
	                    keyed[key] = void 0;
	                    keyedLen--;
	                }
	            } else if (!child && min < childrenLen) for (j = min; j < childrenLen; j++) {
	                c = children[j];
	                if (c && isSameNodeType(c, vchild)) {
	                    child = c;
	                    children[j] = void 0;
	                    if (j === childrenLen - 1) childrenLen--;
	                    if (j === min) min++;
	                    break;
	                }
	            }
	            child = idiff(child, vchild, context, mountAll);
	            if (child && child !== dom) if (i >= len) dom.appendChild(child); else if (child !== originalChildren[i]) {
	                if (child === originalChildren[i + 1]) removeNode(originalChildren[i]);
	                dom.insertBefore(child, originalChildren[i] || null);
	            }
	        }
	        if (keyedLen) for (var i in keyed) if (keyed[i]) recollectNodeTree(keyed[i]);
	        while (min <= childrenLen) {
	            child = children[childrenLen--];
	            if (child) recollectNodeTree(child);
	        }
	    }
	    function recollectNodeTree(node, unmountOnly) {
	        var component = node._component;
	        if (component) unmountComponent(component, !unmountOnly); else {
	            if (node[ATTR_KEY] && node[ATTR_KEY].ref) node[ATTR_KEY].ref(null);
	            if (!unmountOnly) collectNode(node);
	            var c;
	            while (c = node.lastChild) recollectNodeTree(c, unmountOnly);
	        }
	    }
	    function diffAttributes(dom, attrs, old) {
	        for (var _name in old) if (!(attrs && _name in attrs) && null != old[_name]) setAccessor(dom, _name, old[_name], old[_name] = void 0, isSvgMode);
	        if (attrs) for (var _name2 in attrs) if (!('children' === _name2 || 'innerHTML' === _name2 || _name2 in old && attrs[_name2] === ('value' === _name2 || 'checked' === _name2 ? dom[_name2] : old[_name2]))) setAccessor(dom, _name2, old[_name2], old[_name2] = attrs[_name2], isSvgMode);
	    }
	    function collectComponent(component) {
	        var name = component.constructor.name, list = components[name];
	        if (list) list.push(component); else components[name] = [ component ];
	    }
	    function createComponent(Ctor, props, context) {
	        var inst = new Ctor(props, context), list = components[Ctor.name];
	        Component.call(inst, props, context);
	        if (list) for (var i = list.length; i--; ) if (list[i].constructor === Ctor) {
	            inst.nextBase = list[i].nextBase;
	            list.splice(i, 1);
	            break;
	        }
	        return inst;
	    }
	    function setComponentProps(component, props, opts, context, mountAll) {
	        if (!component._disable) {
	            component._disable = !0;
	            if (component.__ref = props.ref) delete props.ref;
	            if (component.__key = props.key) delete props.key;
	            if (!component.base || mountAll) {
	                if (component.componentWillMount) component.componentWillMount();
	            } else if (component.componentWillReceiveProps) component.componentWillReceiveProps(props, context);
	            if (context && context !== component.context) {
	                if (!component.prevContext) component.prevContext = component.context;
	                component.context = context;
	            }
	            if (!component.prevProps) component.prevProps = component.props;
	            component.props = props;
	            component._disable = !1;
	            if (0 !== opts) if (1 === opts || options.syncComponentUpdates !== !1 || !component.base) renderComponent(component, 1, mountAll); else enqueueRender(component);
	            if (component.__ref) component.__ref(component);
	        }
	    }
	    function renderComponent(component, opts, mountAll, isChild) {
	        if (!component._disable) {
	            var skip, rendered, inst, cbase, props = component.props, state = component.state, context = component.context, previousProps = component.prevProps || props, previousState = component.prevState || state, previousContext = component.prevContext || context, isUpdate = component.base, nextBase = component.nextBase, initialBase = isUpdate || nextBase, initialChildComponent = component._component;
	            if (isUpdate) {
	                component.props = previousProps;
	                component.state = previousState;
	                component.context = previousContext;
	                if (2 !== opts && component.shouldComponentUpdate && component.shouldComponentUpdate(props, state, context) === !1) skip = !0; else if (component.componentWillUpdate) component.componentWillUpdate(props, state, context);
	                component.props = props;
	                component.state = state;
	                component.context = context;
	            }
	            component.prevProps = component.prevState = component.prevContext = component.nextBase = null;
	            component._dirty = !1;
	            if (!skip) {
	                if (component.render) rendered = component.render(props, state, context);
	                if (component.getChildContext) context = extend(clone(context), component.getChildContext());
	                while (isFunctionalComponent(rendered)) rendered = buildFunctionalComponent(rendered, context);
	                var toUnmount, base, childComponent = rendered && rendered.nodeName;
	                if (isFunction(childComponent)) {
	                    var childProps = getNodeProps(rendered);
	                    inst = initialChildComponent;
	                    if (inst && inst.constructor === childComponent && childProps.key == inst.__key) setComponentProps(inst, childProps, 1, context); else {
	                        toUnmount = inst;
	                        inst = createComponent(childComponent, childProps, context);
	                        inst.nextBase = inst.nextBase || nextBase;
	                        inst._parentComponent = component;
	                        component._component = inst;
	                        setComponentProps(inst, childProps, 0, context);
	                        renderComponent(inst, 1, mountAll, !0);
	                    }
	                    base = inst.base;
	                } else {
	                    cbase = initialBase;
	                    toUnmount = initialChildComponent;
	                    if (toUnmount) cbase = component._component = null;
	                    if (initialBase || 1 === opts) {
	                        if (cbase) cbase._component = null;
	                        base = diff(cbase, rendered, context, mountAll || !isUpdate, initialBase && initialBase.parentNode, !0);
	                    }
	                }
	                if (initialBase && base !== initialBase && inst !== initialChildComponent) {
	                    var baseParent = initialBase.parentNode;
	                    if (baseParent && base !== baseParent) {
	                        baseParent.replaceChild(base, initialBase);
	                        if (!toUnmount) {
	                            initialBase._component = null;
	                            recollectNodeTree(initialBase);
	                        }
	                    }
	                }
	                if (toUnmount) unmountComponent(toUnmount, base !== initialBase);
	                component.base = base;
	                if (base && !isChild) {
	                    var componentRef = component, t = component;
	                    while (t = t._parentComponent) (componentRef = t).base = base;
	                    base._component = componentRef;
	                    base._componentConstructor = componentRef.constructor;
	                }
	            }
	            if (!isUpdate || mountAll) mounts.unshift(component); else if (!skip) {
	                if (component.componentDidUpdate) component.componentDidUpdate(previousProps, previousState, previousContext);
	                if (options.afterUpdate) options.afterUpdate(component);
	            }
	            var fn, cb = component._renderCallbacks;
	            if (cb) while (fn = cb.pop()) fn.call(component);
	            if (!diffLevel && !isChild) flushMounts();
	        }
	    }
	    function buildComponentFromVNode(dom, vnode, context, mountAll) {
	        var c = dom && dom._component, oldDom = dom, isDirectOwner = c && dom._componentConstructor === vnode.nodeName, isOwner = isDirectOwner, props = getNodeProps(vnode);
	        while (c && !isOwner && (c = c._parentComponent)) isOwner = c.constructor === vnode.nodeName;
	        if (c && isOwner && (!mountAll || c._component)) {
	            setComponentProps(c, props, 3, context, mountAll);
	            dom = c.base;
	        } else {
	            if (c && !isDirectOwner) {
	                unmountComponent(c, !0);
	                dom = oldDom = null;
	            }
	            c = createComponent(vnode.nodeName, props, context);
	            if (dom && !c.nextBase) {
	                c.nextBase = dom;
	                oldDom = null;
	            }
	            setComponentProps(c, props, 1, context, mountAll);
	            dom = c.base;
	            if (oldDom && dom !== oldDom) {
	                oldDom._component = null;
	                recollectNodeTree(oldDom);
	            }
	        }
	        return dom;
	    }
	    function unmountComponent(component, remove) {
	        if (options.beforeUnmount) options.beforeUnmount(component);
	        var base = component.base;
	        component._disable = !0;
	        if (component.componentWillUnmount) component.componentWillUnmount();
	        component.base = null;
	        var inner = component._component;
	        if (inner) unmountComponent(inner, remove); else if (base) {
	            if (base[ATTR_KEY] && base[ATTR_KEY].ref) base[ATTR_KEY].ref(null);
	            component.nextBase = base;
	            if (remove) {
	                removeNode(base);
	                collectComponent(component);
	            }
	            var c;
	            while (c = base.lastChild) recollectNodeTree(c, !remove);
	        }
	        if (component.__ref) component.__ref(null);
	        if (component.componentDidUnmount) component.componentDidUnmount();
	    }
	    function Component(props, context) {
	        this._dirty = !0;
	        this.context = context;
	        this.props = props;
	        if (!this.state) this.state = {};
	    }
	    function render(vnode, parent, merge) {
	        return diff(merge, vnode, {}, !1, parent);
	    }
	    var options = {};
	    var stack = [];
	    var lcCache = {};
	    var toLowerCase = function(s) {
	        return lcCache[s] || (lcCache[s] = s.toLowerCase());
	    };
	    var resolved = 'undefined' != typeof Promise && Promise.resolve();
	    var defer = resolved ? function(f) {
	        resolved.then(f);
	    } : setTimeout;
	    var EMPTY = {};
	    var ATTR_KEY = 'undefined' != typeof Symbol ? Symbol.for('preactattr') : '__preactattr_';
	    var NON_DIMENSION_PROPS = {
	        boxFlex: 1,
	        boxFlexGroup: 1,
	        columnCount: 1,
	        fillOpacity: 1,
	        flex: 1,
	        flexGrow: 1,
	        flexPositive: 1,
	        flexShrink: 1,
	        flexNegative: 1,
	        fontWeight: 1,
	        lineClamp: 1,
	        lineHeight: 1,
	        opacity: 1,
	        order: 1,
	        orphans: 1,
	        strokeOpacity: 1,
	        widows: 1,
	        zIndex: 1,
	        zoom: 1
	    };
	    var NON_BUBBLING_EVENTS = {
	        blur: 1,
	        error: 1,
	        focus: 1,
	        load: 1,
	        resize: 1,
	        scroll: 1
	    };
	    var items = [];
	    var nodes = {};
	    var mounts = [];
	    var diffLevel = 0;
	    var isSvgMode = !1;
	    var hydrating = !1;
	    var components = {};
	    extend(Component.prototype, {
	        linkState: function(key, eventPath) {
	            var c = this._linkedStates || (this._linkedStates = {});
	            return c[key + eventPath] || (c[key + eventPath] = createLinkedState(this, key, eventPath));
	        },
	        setState: function(state, callback) {
	            var s = this.state;
	            if (!this.prevState) this.prevState = clone(s);
	            extend(s, isFunction(state) ? state(s, this.props) : state);
	            if (callback) (this._renderCallbacks = this._renderCallbacks || []).push(callback);
	            enqueueRender(this);
	        },
	        forceUpdate: function() {
	            renderComponent(this, 2);
	        },
	        render: function() {}
	    });
	    exports.h = h;
	    exports.cloneElement = cloneElement;
	    exports.Component = Component;
	    exports.render = render;
	    exports.rerender = rerender;
	    exports.options = options;
	});
	//# sourceMappingURL=preact.js.map

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _preact = __webpack_require__(1);

	var _Header = __webpack_require__(3);

	var _Header2 = _interopRequireDefault(_Header);

	var _Canvas = __webpack_require__(10);

	var _Canvas2 = _interopRequireDefault(_Canvas);

	var _LayoutTop = __webpack_require__(20);

	var _LayoutTop2 = _interopRequireDefault(_LayoutTop);

	var _LayoutLeft = __webpack_require__(21);

	var _LayoutLeft2 = _interopRequireDefault(_LayoutLeft);

	var _LayoutRight = __webpack_require__(22);

	var _LayoutRight2 = _interopRequireDefault(_LayoutRight);

	var _LayoutCenter = __webpack_require__(25);

	var _LayoutCenter2 = _interopRequireDefault(_LayoutCenter);

	var _LayoutMain = __webpack_require__(26);

	var _LayoutMain2 = _interopRequireDefault(_LayoutMain);

	var _LayoutStore = __webpack_require__(9);

	var _LayoutStore2 = _interopRequireDefault(_LayoutStore);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Layout = function (_Component) {
	  _inherits(Layout, _Component);

	  function Layout() {
	    var _ref;

	    var _temp, _this, _ret;

	    _classCallCheck(this, Layout);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Layout.__proto__ || Object.getPrototypeOf(Layout)).call.apply(_ref, [this].concat(args))), _this), _this.style = {
	      top: 0,
	      right: 0,
	      bottom: 0,
	      left: 0
	    }, _this._onChange = function () {
	      _this.setState(_LayoutStore2.default.getStore());
	    }, _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(Layout, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      _LayoutStore2.default.addChangeListener(this._onChange);
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      _LayoutStore2.default.removeChangeListener(this._onChange);
	    }
	  }, {
	    key: 'render',
	    value: function render(props, _ref2) {
	      var _ref2$style = _ref2.style,
	          style = _ref2$style === undefined ? _LayoutStore2.default.getStore() : _ref2$style;

	      return (0, _preact.h)(
	        'div',
	        { className: 'uk-view', style: _extends({}, this.style, { minHeight: style.minHeight }) },
	        (0, _preact.h)(
	          _LayoutTop2.default,
	          { style: { height: style.top } },
	          (0, _preact.h)(_Header2.default, null)
	        ),
	        (0, _preact.h)(
	          _LayoutLeft2.default,
	          { style: { width: style.left, top: style.top } },
	          (0, _preact.h)(
	            'div',
	            null,
	            'left'
	          )
	        ),
	        (0, _preact.h)(
	          _LayoutCenter2.default,
	          { style: { left: style.left, top: style.top, right: style.right } },
	          (0, _preact.h)(
	            _LayoutMain2.default,
	            null,
	            (0, _preact.h)(_Canvas2.default, null)
	          )
	        ),
	        (0, _preact.h)(_LayoutRight2.default, { style: { width: style.right, top: style.top } })
	      );
	    }
	  }]);

	  return Layout;
	}(_preact.Component);

	exports.default = Layout;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _preact = __webpack_require__(1);

	var _CanvasActions = __webpack_require__(4);

	var _CanvasActions2 = _interopRequireDefault(_CanvasActions);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Header = function (_Component) {
	  _inherits(Header, _Component);

	  function Header() {
	    _classCallCheck(this, Header);

	    return _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).apply(this, arguments));
	  }

	  _createClass(Header, [{
	    key: 'render',
	    value: function render(props, state) {
	      return (0, _preact.h)(
	        'div',
	        { style: props.style, className: props.className },
	        (0, _preact.h)(
	          'svg',
	          { width: '100%', height: '100%' },
	          (0, _preact.h)('rect', { height: '25', width: '25', fill: '#242424', x: '104', y: '13', stroke: '#fff', 'stroke-width': '2', onClick: _CanvasActions2.default.add }),
	          (0, _preact.h)('circle', { fill: '#242424', 'stroke-width': '2', cx: '200', cy: '26', r: '14', stroke: '#ffffff' })
	        )
	      );
	    }
	  }]);

	  return Header;
	}(_preact.Component);

	exports.default = Header;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _CanvasStore = __webpack_require__(5);

	var _CanvasStore2 = _interopRequireDefault(_CanvasStore);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var CanvasActions = {
	  add: function add(canvasObj) {
	    _CanvasStore2.default.addCanvas(canvasObj);
	  }
	};

	exports.default = CanvasActions;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _UXUtil = __webpack_require__(6);

	var _events = __webpack_require__(7);

	var _RootStore2 = __webpack_require__(8);

	var _RootStore3 = _interopRequireDefault(_RootStore2);

	var _LayoutStore = __webpack_require__(9);

	var _LayoutStore2 = _interopRequireDefault(_LayoutStore);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var CHANGE_EVENT = 'changeCanvas';
	var _canvas = [];

	var CanvasStore = function (_RootStore) {
	  _inherits(CanvasStore, _RootStore);

	  function CanvasStore() {
	    var _ref;

	    var _temp, _this, _ret;

	    _classCallCheck(this, CanvasStore);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = CanvasStore.__proto__ || Object.getPrototypeOf(CanvasStore)).call.apply(_ref, [this].concat(args))), _this), _this.addCanvas = function (canvasObj) {
	      var w = 150,
	          h = 150,
	          id = (0, _UXUtil.uuid)();
	      _canvas[id] = _extends({
	        key: id,
	        type: canvasObj.type,
	        x: parseInt(_LayoutStore2.default.getStore().canvasWidth) / 2 - parseInt(canvasObj.width || w) / 2,
	        y: parseInt(_LayoutStore2.default.getStore().canvasHeight) / 2 - parseInt(canvasObj.height || h) / 2,
	        width: w + 'px',
	        height: w + 'px'
	      }, canvasObj);
	      _events.EventEmitter.prototype.emit(CHANGE_EVENT);
	    }, _this.getStore = function () {
	      return _canvas;
	    }, _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  return CanvasStore;
	}(_RootStore3.default);

	exports.default = new CanvasStore(CHANGE_EVENT);

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.uuid = uuid;
	function uuid() {
	  var uuid = '';
	  for (var i = 0; i < 32; i++) {
	    var random = Math.random() * 16 | 0;
	    if (i === 8 || i === 12 || i === 16 || i === 20) {
	      uuid += '-';
	    }
	    uuid += (i === 12 ? 4 : i === 16 ? random & 3 | 8 : random).toString(16);
	  }
	  return uuid;
	}

/***/ },
/* 7 */
/***/ function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	function EventEmitter() {
	  this._events = this._events || {};
	  this._maxListeners = this._maxListeners || undefined;
	}
	module.exports = EventEmitter;

	// Backwards-compat with node 0.10.x
	EventEmitter.EventEmitter = EventEmitter;

	EventEmitter.prototype._events = undefined;
	EventEmitter.prototype._maxListeners = undefined;

	// By default EventEmitters will print a warning if more than 10 listeners are
	// added to it. This is a useful default which helps finding memory leaks.
	EventEmitter.defaultMaxListeners = 10;

	// Obviously not all Emitters should be limited to 10. This function allows
	// that to be increased. Set to zero for unlimited.
	EventEmitter.prototype.setMaxListeners = function(n) {
	  if (!isNumber(n) || n < 0 || isNaN(n))
	    throw TypeError('n must be a positive number');
	  this._maxListeners = n;
	  return this;
	};

	EventEmitter.prototype.emit = function(type) {
	  var er, handler, len, args, i, listeners;

	  if (!this._events)
	    this._events = {};

	  // If there is no 'error' event listener then throw.
	  if (type === 'error') {
	    if (!this._events.error ||
	        (isObject(this._events.error) && !this._events.error.length)) {
	      er = arguments[1];
	      if (er instanceof Error) {
	        throw er; // Unhandled 'error' event
	      } else {
	        // At least give some kind of context to the user
	        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
	        err.context = er;
	        throw err;
	      }
	    }
	  }

	  handler = this._events[type];

	  if (isUndefined(handler))
	    return false;

	  if (isFunction(handler)) {
	    switch (arguments.length) {
	      // fast cases
	      case 1:
	        handler.call(this);
	        break;
	      case 2:
	        handler.call(this, arguments[1]);
	        break;
	      case 3:
	        handler.call(this, arguments[1], arguments[2]);
	        break;
	      // slower
	      default:
	        args = Array.prototype.slice.call(arguments, 1);
	        handler.apply(this, args);
	    }
	  } else if (isObject(handler)) {
	    args = Array.prototype.slice.call(arguments, 1);
	    listeners = handler.slice();
	    len = listeners.length;
	    for (i = 0; i < len; i++)
	      listeners[i].apply(this, args);
	  }

	  return true;
	};

	EventEmitter.prototype.addListener = function(type, listener) {
	  var m;

	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  if (!this._events)
	    this._events = {};

	  // To avoid recursion in the case that type === "newListener"! Before
	  // adding it to the listeners, first emit "newListener".
	  if (this._events.newListener)
	    this.emit('newListener', type,
	              isFunction(listener.listener) ?
	              listener.listener : listener);

	  if (!this._events[type])
	    // Optimize the case of one listener. Don't need the extra array object.
	    this._events[type] = listener;
	  else if (isObject(this._events[type]))
	    // If we've already got an array, just append.
	    this._events[type].push(listener);
	  else
	    // Adding the second element, need to change to array.
	    this._events[type] = [this._events[type], listener];

	  // Check for listener leak
	  if (isObject(this._events[type]) && !this._events[type].warned) {
	    if (!isUndefined(this._maxListeners)) {
	      m = this._maxListeners;
	    } else {
	      m = EventEmitter.defaultMaxListeners;
	    }

	    if (m && m > 0 && this._events[type].length > m) {
	      this._events[type].warned = true;
	      console.error('(node) warning: possible EventEmitter memory ' +
	                    'leak detected. %d listeners added. ' +
	                    'Use emitter.setMaxListeners() to increase limit.',
	                    this._events[type].length);
	      if (typeof console.trace === 'function') {
	        // not supported in IE 10
	        console.trace();
	      }
	    }
	  }

	  return this;
	};

	EventEmitter.prototype.on = EventEmitter.prototype.addListener;

	EventEmitter.prototype.once = function(type, listener) {
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  var fired = false;

	  function g() {
	    this.removeListener(type, g);

	    if (!fired) {
	      fired = true;
	      listener.apply(this, arguments);
	    }
	  }

	  g.listener = listener;
	  this.on(type, g);

	  return this;
	};

	// emits a 'removeListener' event iff the listener was removed
	EventEmitter.prototype.removeListener = function(type, listener) {
	  var list, position, length, i;

	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  if (!this._events || !this._events[type])
	    return this;

	  list = this._events[type];
	  length = list.length;
	  position = -1;

	  if (list === listener ||
	      (isFunction(list.listener) && list.listener === listener)) {
	    delete this._events[type];
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);

	  } else if (isObject(list)) {
	    for (i = length; i-- > 0;) {
	      if (list[i] === listener ||
	          (list[i].listener && list[i].listener === listener)) {
	        position = i;
	        break;
	      }
	    }

	    if (position < 0)
	      return this;

	    if (list.length === 1) {
	      list.length = 0;
	      delete this._events[type];
	    } else {
	      list.splice(position, 1);
	    }

	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	  }

	  return this;
	};

	EventEmitter.prototype.removeAllListeners = function(type) {
	  var key, listeners;

	  if (!this._events)
	    return this;

	  // not listening for removeListener, no need to emit
	  if (!this._events.removeListener) {
	    if (arguments.length === 0)
	      this._events = {};
	    else if (this._events[type])
	      delete this._events[type];
	    return this;
	  }

	  // emit removeListener for all listeners on all events
	  if (arguments.length === 0) {
	    for (key in this._events) {
	      if (key === 'removeListener') continue;
	      this.removeAllListeners(key);
	    }
	    this.removeAllListeners('removeListener');
	    this._events = {};
	    return this;
	  }

	  listeners = this._events[type];

	  if (isFunction(listeners)) {
	    this.removeListener(type, listeners);
	  } else if (listeners) {
	    // LIFO order
	    while (listeners.length)
	      this.removeListener(type, listeners[listeners.length - 1]);
	  }
	  delete this._events[type];

	  return this;
	};

	EventEmitter.prototype.listeners = function(type) {
	  var ret;
	  if (!this._events || !this._events[type])
	    ret = [];
	  else if (isFunction(this._events[type]))
	    ret = [this._events[type]];
	  else
	    ret = this._events[type].slice();
	  return ret;
	};

	EventEmitter.prototype.listenerCount = function(type) {
	  if (this._events) {
	    var evlistener = this._events[type];

	    if (isFunction(evlistener))
	      return 1;
	    else if (evlistener)
	      return evlistener.length;
	  }
	  return 0;
	};

	EventEmitter.listenerCount = function(emitter, type) {
	  return emitter.listenerCount(type);
	};

	function isFunction(arg) {
	  return typeof arg === 'function';
	}

	function isNumber(arg) {
	  return typeof arg === 'number';
	}

	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}

	function isUndefined(arg) {
	  return arg === void 0;
	}


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _events = __webpack_require__(7);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Store = function Store(eventType) {
	  _classCallCheck(this, Store);

	  this.addChangeListener = function (callback) {
	    _events.EventEmitter.prototype.on(this.eventType, callback);
	  };

	  this.removeChangeListener = function (callback) {
	    _events.EventEmitter.prototype.off(this.eventType, callback);
	  };

	  this.eventType = eventType;
	};

	exports.default = Store;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _events = __webpack_require__(7);

	var _RootStore2 = __webpack_require__(8);

	var _RootStore3 = _interopRequireDefault(_RootStore2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var CHANGE_EVENT = 'changeLayout';
	var defaultLayout = {
	  top: '60px',
	  left: '200px',
	  right: '270px',
	  minHeight: '650px',
	  mixWidth: '1000px',
	  canvasWidth: '768px',
	  canvasHeight: '576px'
	};

	var _layout = defaultLayout;

	var LayoutStore = function (_RootStore) {
	  _inherits(LayoutStore, _RootStore);

	  function LayoutStore() {
	    var _ref;

	    var _temp, _this, _ret;

	    _classCallCheck(this, LayoutStore);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = LayoutStore.__proto__ || Object.getPrototypeOf(LayoutStore)).call.apply(_ref, [this].concat(args))), _this), _this.getStore = function () {
	      return _layout;
	    }, _this.setLayout = function (config) {
	      for (var key in config) {
	        _layout[key] = config[key];
	      }
	      _events.EventEmitter.prototype.emit(CHANGE_EVENT);
	    }, _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  return LayoutStore;
	}(_RootStore3.default);

	exports.default = new LayoutStore(CHANGE_EVENT);

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _preact = __webpack_require__(1);

	var _uxkit = __webpack_require__(11);

	var _CanvasStore = __webpack_require__(5);

	var _CanvasStore2 = _interopRequireDefault(_CanvasStore);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Canvas = function (_Component) {
	  _inherits(Canvas, _Component);

	  function Canvas() {
	    var _ref;

	    var _temp, _this, _ret;

	    _classCallCheck(this, Canvas);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Canvas.__proto__ || Object.getPrototypeOf(Canvas)).call.apply(_ref, [this].concat(args))), _this), _this._onChange = function () {
	      _this.setState(_CanvasStore2.default.getStore());
	    }, _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(Canvas, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      _CanvasStore2.default.addChangeListener(this._onChange);
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      _CanvasStore2.default.removeChangeListener(this._onChange);
	    }
	  }, {
	    key: 'render',
	    value: function render(props, _ref2) {
	      var _ref2$canvas = _ref2.canvas,
	          canvas = _ref2$canvas === undefined ? _CanvasStore2.default.getStore() : _ref2$canvas;

	      return (0, _preact.h)(
	        'div',
	        null,
	        Object.keys(canvas).map(function (item) {
	          return (0, _preact.h)(_uxkit.UXNew, canvas[item]);
	        })
	      );
	    }
	  }]);

	  return Canvas;
	}(_preact.Component);

	exports.default = Canvas;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.UXNew = exports.UXResize = exports.UXDrag = exports.UXEvent = exports.UXDom = undefined;

	var _UXDom = __webpack_require__(12);

	var _UXDom2 = _interopRequireDefault(_UXDom);

	var _UXEvent = __webpack_require__(13);

	var _UXEvent2 = _interopRequireDefault(_UXEvent);

	var _UXDrag = __webpack_require__(14);

	var _UXDrag2 = _interopRequireDefault(_UXDrag);

	var _UXResize = __webpack_require__(15);

	var _UXResize2 = _interopRequireDefault(_UXResize);

	var _UXNew = __webpack_require__(16);

	var _UXNew2 = _interopRequireDefault(_UXNew);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.UXDom = _UXDom2.default;
	exports.UXEvent = _UXEvent2.default;
	exports.UXDrag = _UXDrag2.default;
	exports.UXResize = _UXResize2.default;
	exports.UXNew = _UXNew2.default;

/***/ },
/* 12 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.addEvent = addEvent;
	exports.removeEvent = removeEvent;
	exports.prefixCssProp = prefixCssProp;
	exports.prefixCssVal = prefixCssVal;
	function addEvent(el, event, handler) {
	  if (!el) {
	    return;
	  };
	  el.addEventListener(event, handler, false);
	}

	function removeEvent(el, event, handler) {
	  if (!el) {
	    return;
	  };
	  el.removeEventListener(event, handler, false);
	}

	function prefixCssProp(prop) {
	  var prefixes = ['moz', 'webkit', 'o', 'ms'];
	  var styles = document.createElement('div').style;
	  if (prop in styles) return prop;
	  for (var i = 0; i < prefixes.length; i++) {
	    var nowProp = prefixes[i] + prop.charAt(0).toUpperCase() + prop.slice(1);
	    if (nowProp in styles) {
	      return nowProp;
	    }
	  }
	}

	function prefixCssVal() {
	  var prefixes = ['Moz', 'Webkit', 'O', 'ms'];
	}

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _preact = __webpack_require__(1);

	var _UXDom = __webpack_require__(12);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var UXEvent = function (_Component) {
	  _inherits(UXEvent, _Component);

	  function UXEvent() {
	    var _ref;

	    var _temp, _this, _ret;

	    _classCallCheck(this, UXEvent);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = UXEvent.__proto__ || Object.getPrototypeOf(UXEvent)).call.apply(_ref, [this].concat(args))), _this), _this.x = 0, _this.y = 0, _this.mx = 0, _this.my = 0, _this.dx = 0, _this.dy = 0, _this.darging = false, _this.handleDragStart = function (e) {
	      var ownerDocument = document;

	      _this.x = e.pageX - _this.mx;
	      _this.y = e.pageY - _this.my;

	      (0, _UXDom.addEvent)(ownerDocument, 'mousemove', _this.handleDrag);
	      (0, _UXDom.addEvent)(ownerDocument, 'mouseup', _this.handleDragStop);
	    }, _this.handleDragStop = function (e) {
	      var ownerDocument = document;

	      typeof _this.props.onDragStop == 'function' && _this.props.onDragStop({
	        x: e.pageX,
	        y: e.pageY,
	        mx: _this.mx,
	        my: _this.my,
	        dx: _this.dx,
	        dy: _this.dy,
	        event: e,
	        node: _this.base
	      });

	      (0, _UXDom.removeEvent)(ownerDocument, 'mousemove', _this.handleDrag);
	      (0, _UXDom.removeEvent)(ownerDocument, 'mouseup', _this.handleDragStop);
	    }, _this.handleDrag = function (e) {
	      _this.dx = _this.mx;
	      _this.dy = _this.my;
	      _this.mx = e.pageX - _this.x;
	      _this.my = e.pageY - _this.y;
	      _this.dx = _this.mx - _this.dx;
	      _this.dy = _this.my - _this.dy;
	      _this.props.onDrag({
	        x: e.pageX,
	        y: e.pageY,
	        mx: _this.mx,
	        my: _this.my,
	        dx: _this.dx,
	        dy: _this.dy,
	        event: e,
	        node: _this.base
	      });
	    }, _this.onMouseDown = function (e) {
	      typeof _this.props.onMouseDown == 'function' && _this.props.onMouseDown(e);
	      e.which == 1 && typeof _this.props.onDrag == 'function' && _this.handleDragStart(e);
	    }, _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(UXEvent, [{
	    key: 'render',
	    value: function render(props, state) {
	      var childrenStyle = _typeof(props.children[0].attributes) == 'object' ? props.children[0].attributes.style : {};
	      return (0, _preact.cloneElement)(props.children[0], {
	        onClick: this.props.onClick,
	        onMouseDown: this.onMouseDown,
	        onMouseMove: this.props.onMouseMove,
	        onMouseUp: this.props.onMouseUp,
	        style: childrenStyle
	      });
	    }
	  }]);

	  return UXEvent;
	}(_preact.Component);

	exports.default = UXEvent;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _preact = __webpack_require__(1);

	var _UXDom = __webpack_require__(12);

	var _UXEvent = __webpack_require__(13);

	var _UXEvent2 = _interopRequireDefault(_UXEvent);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var UXDrag = function (_Component) {
	  _inherits(UXDrag, _Component);

	  function UXDrag() {
	    var _ref;

	    var _temp, _this, _ret;

	    _classCallCheck(this, UXDrag);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = UXDrag.__proto__ || Object.getPrototypeOf(UXDrag)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
	      x: _this.props.x || 0,
	      y: _this.props.y || 0,

	      isSVGElement: false
	    }, _this.handleDrag = function (data) {
	      _this.setState({
	        x: data.mx,
	        y: data.my
	      });
	    }, _this.onDrag = function (data) {
	      _this.handleDrag(data);
	      typeof _this.props.onDrag == 'function' && _this.props.onDrag(data);
	    }, _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(UXDrag, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.setState({
	        isSVGElement: this.base instanceof SVGElement && !!this.base.ownerSVGElement
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render(props, state) {
	      var style = {},
	          svgTransform = null;
	      var childrenStyle = _typeof(props.children[0].attributes) == 'object' ? props.children[0].attributes.style : {};

	      if (state.isSVGElement) {
	        svgTransform = 'translate(' + state.x + ' ' + state.y + ')';
	      } else {
	        style[(0, _UXDom.prefixCssProp)('transform')] = 'translate(' + state.x + 'px, ' + state.y + 'px)';
	      }

	      return (0, _preact.h)(
	        _UXEvent2.default,
	        { onDrag: this.onDrag },
	        (0, _preact.cloneElement)(props.children[0], {
	          style: _extends({}, childrenStyle, style),
	          transform: svgTransform
	        })
	      );
	    }
	  }]);

	  return UXDrag;
	}(_preact.Component);

	exports.default = UXDrag;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _preact = __webpack_require__(1);

	var _UXEvent = __webpack_require__(13);

	var _UXEvent2 = _interopRequireDefault(_UXEvent);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var UXResize = function (_Component) {
	  _inherits(UXResize, _Component);

	  function UXResize() {
	    var _ref;

	    var _temp, _this, _ret;

	    _classCallCheck(this, UXResize);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = UXResize.__proto__ || Object.getPrototypeOf(UXResize)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
	      width: _this.props.width,
	      height: _this.props.height,
	      left: _this.props.x,
	      right: 0,
	      botton: 0,
	      top: _this.props.y,
	      cursor: 'default'
	    }, _this.resizeStyle = {
	      position: 'absolute',
	      width: _this.state.width,
	      height: _this.state.height,
	      border: '1px solid #95B6FF'
	    }, _this.resizeHandleStyle = {
	      width: '9px',
	      height: '9px',
	      border: '1px solid #FEFEFF',
	      backgroundColor: '#0079FF',
	      borderRadius: '5px',
	      position: 'absolute'
	    }, _this.onTopLeft = function (data) {
	      _this.handleTop(data);
	      _this.handleLeft(data);
	      _this.handleResize(data);
	    }, _this.onTopCenter = function (data) {
	      _this.handleTop(data);
	      _this.handleResize(data);
	    }, _this.onTopRight = function (data) {
	      _this.handleTop(data);
	      _this.handleRight(data);
	      _this.handleResize(data);
	    }, _this.onCenterRight = function (data) {
	      _this.handleRight(data);
	      _this.handleResize(data);
	    }, _this.onCenterLeft = function (data) {
	      _this.handleLeft(data);
	      _this.handleResize(data);
	    }, _this.onBottomLeft = function (data) {
	      _this.handleBottom(data);
	      _this.handleLeft(data);
	      _this.handleResize(data);
	    }, _this.onBottomCenter = function (data) {
	      _this.handleBottom(data);
	      _this.handleResize(data);
	    }, _this.onBottomRight = function (data) {
	      _this.handleBottom(data);
	      _this.handleRight(data);
	      _this.handleResize(data);
	    }, _this.onMove = function (data) {
	      _this.handleMove(data);
	      typeof _this.props.onMove == 'function' && _this.props.onMove(data);
	    }, _this.handleTop = function (data) {
	      _this.setState({
	        height: parseInt(_this.state.height) - data.dy,
	        top: parseInt(_this.state.top) + data.dy
	      });
	    }, _this.handleRight = function (data) {
	      _this.setState({
	        width: parseInt(_this.state.width) + data.dx
	      });
	    }, _this.handleBottom = function (data) {
	      _this.setState({
	        height: parseInt(_this.state.height) + data.dy
	      });
	    }, _this.handleLeft = function (data) {
	      _this.setState({
	        width: parseInt(_this.state.width) - data.dx,
	        left: parseInt(_this.state.left) + data.dx
	      });
	    }, _this.handleMove = function (data) {
	      _this.setState({
	        left: parseInt(_this.state.left) + data.dx,
	        top: parseInt(_this.state.top) + data.dy
	      });
	    }, _this.handleResize = function (data) {
	      typeof _this.props.onResize == 'function' && _this.props.onResize(_extends({}, data, { w: _this.state.width, h: _this.state.height }));
	    }, _this.handleResizeStop = function (data) {
	      typeof _this.props.onResizeStop == 'function' && _this.props.onResizeStop(_extends({}, data, { w: _this.state.width, h: _this.state.height }));
	    }, _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  // Top Right Bottom Left Move handle


	  _createClass(UXResize, [{
	    key: 'render',
	    value: function render(props, state) {
	      return (0, _preact.h)(
	        'div',
	        { style: _extends({}, this.resizeStyle, { width: state.width, height: state.height, left: state.left, top: state.top }) },
	        (0, _preact.h)(
	          _UXEvent2.default,
	          { onDrag: this.onTopLeft, onDragStop: this.handleResizeStop },
	          (0, _preact.h)('div', { style: _extends({}, this.resizeHandleStyle, { cursor: 'nwse-resize', top: '-6px', left: '-6px' }) })
	        ),
	        (0, _preact.h)(
	          _UXEvent2.default,
	          { onDrag: this.onTopCenter },
	          (0, _preact.h)('div', { style: _extends({}, this.resizeHandleStyle, { cursor: 'ns-resize', top: '-6px', left: '50%', marginLeft: '-6px' }) })
	        ),
	        (0, _preact.h)(
	          _UXEvent2.default,
	          { onDrag: this.onTopRight },
	          (0, _preact.h)('div', { style: _extends({}, this.resizeHandleStyle, { cursor: 'nesw-resize', top: '-6px', right: '-6px' }) })
	        ),
	        (0, _preact.h)(
	          _UXEvent2.default,
	          { onDrag: this.onCenterLeft },
	          (0, _preact.h)('div', { style: _extends({}, this.resizeHandleStyle, { cursor: 'ew-resize', top: '50%', marginTop: '-6px', left: '-6px' }) })
	        ),
	        (0, _preact.h)(
	          _UXEvent2.default,
	          { onDrag: this.onCenterRight },
	          (0, _preact.h)('div', { style: _extends({}, this.resizeHandleStyle, { cursor: 'ew-resize', top: '50%', marginTop: '-6px', right: '-6px' }) })
	        ),
	        (0, _preact.h)(
	          _UXEvent2.default,
	          { onDrag: this.onBottomLeft },
	          (0, _preact.h)('div', { style: _extends({}, this.resizeHandleStyle, { cursor: 'nesw-resize', bottom: '-6px', left: '-6px' }) })
	        ),
	        (0, _preact.h)(
	          _UXEvent2.default,
	          { onDrag: this.onBottomCenter },
	          (0, _preact.h)('div', { style: _extends({}, this.resizeHandleStyle, { cursor: 'ns-resize', bottom: '-6px', left: '50%', marginLeft: '-6px' }) })
	        ),
	        (0, _preact.h)(
	          _UXEvent2.default,
	          { onDrag: this.onBottomRight, onDragStop: props.onResizeStop },
	          (0, _preact.h)('div', { style: _extends({}, this.resizeHandleStyle, { cursor: 'nwse-resize', bottom: '-6px', right: '-6px' }) })
	        ),
	        (0, _preact.h)(
	          _UXEvent2.default,
	          { onDrag: this.onMove },
	          props.children
	        )
	      );
	    }
	  }]);

	  return UXResize;
	}(_preact.Component);

	exports.default = UXResize;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _preact = __webpack_require__(1);

	var _UXCircle = __webpack_require__(17);

	var _UXCircle2 = _interopRequireDefault(_UXCircle);

	var _UXRect = __webpack_require__(18);

	var _UXRect2 = _interopRequireDefault(_UXRect);

	var _UXTriangle = __webpack_require__(19);

	var _UXTriangle2 = _interopRequireDefault(_UXTriangle);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	var UXNew = function UXNew(_ref) {
	  var children = _ref.children,
	      props = _objectWithoutProperties(_ref, ['children']);

	  switch (props.type) {
	    case 'UXRect':
	    case 'rect':
	      return (0, _preact.h)(_UXRect2.default, props);
	    case 'UXCircle':
	    case 'circle':
	      return (0, _preact.h)(_UXCircle2.default, props);
	    case 'UXTriangle':
	    case 'triangle':
	      return (0, _preact.h)(_UXTriangle2.default, props);
	    default:
	      return (0, _preact.h)(
	        'a',
	        props,
	        children
	      );
	  }
	};

	exports.default = UXNew;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _preact = __webpack_require__(1);

	var _UXResize = __webpack_require__(15);

	var _UXResize2 = _interopRequireDefault(_UXResize);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	var UXCircle = function UXCircle(_ref) {
	  var children = _ref.children,
	      props = _objectWithoutProperties(_ref, ['children']);

	  return (0, _preact.h)(
	    _UXResize2.default,
	    props,
	    (0, _preact.h)(
	      'svg',
	      { width: '100%', height: '100%' },
	      (0, _preact.h)('ellipse', { cx: '50%', cy: '50%', rx: '50%', ry: '50%' })
	    )
	  );
	};

	exports.default = UXCircle;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _preact = __webpack_require__(1);

	var _UXResize = __webpack_require__(15);

	var _UXResize2 = _interopRequireDefault(_UXResize);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	var UXCircle = function UXCircle(_ref) {
	  var children = _ref.children,
	      props = _objectWithoutProperties(_ref, ['children']);

	  return (0, _preact.h)(
	    _UXResize2.default,
	    props,
	    (0, _preact.h)(
	      'svg',
	      { width: '100%', height: '100%' },
	      (0, _preact.h)('rect', { width: '100%', height: '100%', fill: props.fill })
	    )
	  );
	};

	exports.default = UXCircle;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _preact = __webpack_require__(1);

	var _UXResize = __webpack_require__(15);

	var _UXResize2 = _interopRequireDefault(_UXResize);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var UXTriangle = function (_Component) {
	  _inherits(UXTriangle, _Component);

	  function UXTriangle() {
	    var _ref;

	    var _temp, _this, _ret;

	    _classCallCheck(this, UXTriangle);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = UXTriangle.__proto__ || Object.getPrototypeOf(UXTriangle)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
	      w: parseInt(_this.props.width),
	      h: parseInt(_this.props.height)
	    }, _this.onResize = function (data) {
	      _this.setState({
	        w: parseInt(data.w),
	        h: parseInt(data.h)
	      });
	    }, _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(UXTriangle, [{
	    key: 'render',
	    value: function render(props, state) {
	      var points = state.w / 2 + ',0 ' + state.w + ',' + state.h + ' 0,' + state.h;
	      return (0, _preact.h)(
	        _UXResize2.default,
	        _extends({}, props, { onResize: this.onResize, onResizeStop: function onResizeStop() {
	            console.log(32);
	          } }),
	        (0, _preact.h)(
	          'svg',
	          { width: '100%', height: '100%' },
	          (0, _preact.h)('polygon', {
	            points: points
	          })
	        )
	      );
	    }
	  }]);

	  return UXTriangle;
	}(_preact.Component);

	exports.default = UXTriangle;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _preact = __webpack_require__(1);

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	var LayoutTop = function LayoutTop(_ref) {
	  var children = _ref.children,
	      props = _objectWithoutProperties(_ref, ['children']);

	  var style = {
	    top: 0,
	    right: 0,
	    bottom: 0,
	    left: 0,
	    background: '#242424'
	  };

	  return (0, _preact.cloneElement)(children[0], {
	    className: 'uk-view',
	    style: _extends({}, style, props.style)
	  });
	};

	exports.default = LayoutTop;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _preact = __webpack_require__(1);

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	var LayoutLeft = function LayoutLeft(_ref) {
	  var children = _ref.children,
	      props = _objectWithoutProperties(_ref, ['children']);

	  var style = {
	    bottom: 0,
	    left: 0,
	    background: '#aaacb9'
	  };

	  return (0, _preact.cloneElement)(children[0], {
	    className: 'uk-view',
	    style: _extends({}, style, props.style)
	  });
	};

	exports.default = LayoutLeft;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _preact = __webpack_require__(1);

	var _Inspector = __webpack_require__(23);

	var _Inspector2 = _interopRequireDefault(_Inspector);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	var LayoutRight = function LayoutRight(_ref) {
	  var children = _ref.children,
	      props = _objectWithoutProperties(_ref, ['children']);

	  var style = {
	    top: '60px',
	    right: 0,
	    bottom: 0,
	    background: '#F6F6F6'
	  };

	  return (0, _preact.h)(
	    'div',
	    { className: 'uk-view', style: _extends({}, style, props.style) },
	    (0, _preact.h)(_Inspector2.default, null)
	  );
	};

	exports.default = LayoutRight;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _preact = __webpack_require__(1);

	var _CanvasActions = __webpack_require__(4);

	var _CanvasActions2 = _interopRequireDefault(_CanvasActions);

	var _LayoutActions = __webpack_require__(24);

	var _LayoutActions2 = _interopRequireDefault(_LayoutActions);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Inspector = function (_Component) {
	  _inherits(Inspector, _Component);

	  function Inspector() {
	    var _ref;

	    var _temp, _this, _ret;

	    _classCallCheck(this, Inspector);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Inspector.__proto__ || Object.getPrototypeOf(Inspector)).call.apply(_ref, [this].concat(args))), _this), _this.add = function (canvasObj) {
	      _CanvasActions2.default.add(canvasObj);
	    }, _this.addNum = function (num) {
	      var x = 0,
	          y = 0,
	          split = 768 / num;
	      for (var i = 0; i < num; i++) {
	        x = split * i;
	        _CanvasActions2.default.add({ type: 'rect', width: split - 4 + 'px', height: split - 4 + 'px', x: x, y: y });
	        _CanvasActions2.default.add({ type: 'circle', width: split - 4 + 'px', height: split - 4 + 'px', x: x, y: y + 100 });
	        _CanvasActions2.default.add({ type: 'triangle', width: split - 4 + 'px', height: split - 4 + 'px', x: x, y: y + 200 });
	        _CanvasActions2.default.add({ type: 'rect', width: split - 4 + 'px', height: split - 4 + 'px', x: x, y: y + 300 });
	        _CanvasActions2.default.add({ type: 'circle', width: split - 4 + 'px', height: split - 4 + 'px', x: x, y: y + 400 });
	        _CanvasActions2.default.add({ type: 'triangle', width: split - 4 + 'px', height: split - 4 + 'px', x: x, y: y + 500 });
	      }
	    }, _this.onLayout = function (direction, num) {
	      _LayoutActions2.default.setLayout(_defineProperty({}, direction, _LayoutActions2.default.getLayout()[direction] == 0 ? num : 0));
	    }, _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(Inspector, [{
	    key: 'render',
	    value: function render(props, state) {
	      var _this2 = this;

	      return (0, _preact.h)(
	        'div',
	        null,
	        (0, _preact.h)('br', null),
	        (0, _preact.h)(
	          'button',
	          { onClick: function onClick() {
	              _this2.add({ type: 'rect', width: '300px', height: '100px' });
	            } },
	          'rect'
	        ),
	        (0, _preact.h)(
	          'button',
	          { onClick: function onClick() {
	              _this2.add({ type: 'circle' });
	            } },
	          'circle'
	        ),
	        (0, _preact.h)(
	          'button',
	          { onClick: function onClick() {
	              _this2.add({ type: 'triangle' });
	            } },
	          'triangle'
	        ),
	        (0, _preact.h)(
	          'button',
	          { onClick: this.add },
	          'random'
	        ),
	        (0, _preact.h)(
	          'button',
	          { onClick: function onClick() {
	              _this2.addNum(10);
	            } },
	          '60'
	        ),
	        (0, _preact.h)('br', null),
	        (0, _preact.h)(
	          'button',
	          { onClick: this.add },
	          '\u5220\u9664'
	        ),
	        (0, _preact.h)('br', null),
	        (0, _preact.h)(
	          'button',
	          { onClick: function onClick() {
	              _this2.onLayout('left', '200px');
	            } },
	          'layout-left'
	        ),
	        (0, _preact.h)(
	          'button',
	          { onClick: function onClick() {
	              _this2.onLayout('top', '60px');
	            } },
	          'layout-top'
	        ),
	        (0, _preact.h)(
	          'div',
	          { style: { fontSize: '12px' } },
	          (0, _preact.h)(
	            'pre',
	            null,
	            JSON.stringify({}).replace(/,/g, ',\n')
	          )
	        )
	      );
	    }
	  }]);

	  return Inspector;
	}(_preact.Component);

	exports.default = Inspector;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _LayoutStore = __webpack_require__(9);

	var _LayoutStore2 = _interopRequireDefault(_LayoutStore);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var LayoutActions = {
	  getLayout: _LayoutStore2.default.getStore,
	  setLayout: function setLayout(config) {
	    _LayoutStore2.default.setLayout(config);
	  }
	};

	exports.default = LayoutActions;

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _preact = __webpack_require__(1);

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	var LayoutCenter = function LayoutCenter(_ref) {
	  var children = _ref.children,
	      props = _objectWithoutProperties(_ref, ['children']);

	  var style = {
	    top: '60px',
	    right: '270px',
	    bottom: 0,
	    left: '200px',
	    background: '#57585D'
	  };

	  return (0, _preact.h)(
	    'div',
	    { className: 'uk-view', style: _extends({}, style, props.style) },
	    children
	  );
	};

	exports.default = LayoutCenter;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _preact = __webpack_require__(1);

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	var LayoutMain = function LayoutMain(_ref) {
	  var children = _ref.children,
	      props = _objectWithoutProperties(_ref, ['children']);

	  var style = {
	    width: '768px',
	    height: '576px',
	    top: '50%',
	    left: '50%',
	    overflow: 'visible',
	    background: '#fff',
	    marginTop: '-288px',
	    marginLeft: '-383.5px'
	  };

	  return (0, _preact.h)(
	    'div',
	    { className: 'uk-view', style: _extends({}, style, props.style) },
	    children
	  );
	};

	exports.default = LayoutMain;

/***/ },
/* 27 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }
/******/ ]);