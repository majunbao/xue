
SL("editor.blocks").Base = Class.extend({
    init: function(e, t) {
        this.type = e,
        this.pairings = [],
        this.plugins = [],
        this.options = $.extend({
            contentElementType: "div",
            aspectRatio: 0,
            minWidth: 30,
            minHeight: 30,
            horizontalResizing: !0,
            verticalResizing: !0,
            rotation: !0,
            keyboardConsumer: !1,
            introDelay: 1
        }, t),
        this.options.element && (this.domElement = $(this.options.element),
        this.contentElement = this.domElement.find(".sl-block-content")),
        this.setup(),
        this.validateProperties(),
        this.render(),
        this.bind(),
        this.format(),
        this.paint(),
        this.transform = new SL.editor.blocks.behavior.Transform(this)
    },
    setup: function() {
        this.watchlist = {},
        this.removed = new signals.Signal,
        this.dragStarted = new signals.Signal,
        this.dragUpdated = new signals.Signal,
        this.dragEnded = new signals.Signal,
        this.propertyChanged = new signals.Signal,
        this.focused = !1,
        this.moved = !1,
        this.mouseDownCursor = {
            x: 0,
            y: 0
        },
        this.mouseDownMeasurements = null,
        this.properties = {
            style: {
                opacity: {
                    type: "number",
                    unit: "%",
                    minValue: 0,
                    maxValue: 100,
                    defaultValue: 100,
                    serialize: function(e) {
                        return parseInt(e, 10) / 100
                    },
                    deserialize: function(e) {
                        return 100 * parseFloat(e)
                    },
                    setter: this.setOpacity.bind(this),
                    getter: this.getOpacity.bind(this)
                },
                padding: {
                    type: "number",
                    unit: "px",
                    decimals: 0,
                    minValue: 0,
                    maxValue: 100,
                    defaultValue: 0
                },
                color: {
                    computed: !0
                },
                "background-color": {
                    computed: !0
                },
                "border-color": {
                    computed: !0,
                    getter: this.getBorderColor.bind(this)
                },
                "border-style": {
                    defaultValue: "none",
                    options: [{
                        value: "solid",
                        title: "Solid"
                    }, {
                        value: "dashed",
                        title: "Dashed"
                    }, {
                        value: "dotted",
                        title: "Dotted"
                    }]
                },
                "border-width": {
                    type: "number",
                    unit: "px",
                    decimals: 0,
                    minValue: 0,
                    maxValue: 200,
                    defaultValue: 0
                },
                "border-radius": {
                    type: "number",
                    unit: "px",
                    decimals: 0,
                    minValue: 0,
                    maxValue: 200,
                    defaultValue: 0
                },
                "text-align": {
                    options: [{
                        value: "left",
                        icon: "alignleft"
                    }, {
                        value: "center",
                        icon: "aligncenter"
                    }, {
                        value: "right",
                        icon: "alignright"
                    }, {
                        value: "justify",
                        icon: "alignjustify"
                    }]
                },
                "font-size": {
                    type: "number",
                    unit: "%",
                    minValue: 1,
                    maxValue: 500,
                    defaultValue: 100
                },
                "line-height": {
                    type: "number",
                    unit: "%",
                    minValue: 0,
                    maxValue: 300,
                    defaultValue: 100,
                    serialize: function(e) {
                        return parseInt(e, 10) / 100 * 1.3
                    },
                    deserialize: function(e) {
                        return parseFloat(e) / 1.3 * 100
                    }
                },
                "letter-spacing": {
                    type: "number",
                    unit: "%",
                    minValue: 0,
                    maxValue: 300,
                    defaultValue: 100,
                    serialize: function(e) {
                        return parseInt(e, 10) / 100 - 1 + "em"
                    },
                    deserialize: function(e) {
                        return 100 * (parseFloat(e) + 1)
                    }
                },
                "z-index": {
                    type: "number",
                    minValue: 0,
                    maxValue: 1e3,
                    setter: this.setZ.bind(this),
                    getter: this.getZ.bind(this)
                },
                "transition-duration": {
                    type: "number",
                    unit: "s",
                    decimals: 1,
                    minValue: 0,
                    maxValue: 10,
                    stepSize: .1,
                    defaultValue: 0
                },
                "transition-delay": {
                    type: "number",
                    unit: "s",
                    decimals: 1,
                    minValue: 0,
                    maxValue: 100,
                    stepSize: .1,
                    defaultValue: 0
                }
            },
            transform: {
                rotate: {
                    type: "number",
                    unit: "deg",
                    decimals: 0,
                    minValue: 0,
                    maxValue: 360,
                    defaultValue: 0,
                    setter: this.setRotation.bind(this),
                    getter: this.getRotation.bind(this)
                }
            },
            attribute: {
                "class": {
                    type: "string",
                    setter: this.setClassName.bind(this),
                    getter: this.getClassName.bind(this)
                },
                "data-animation-type": {
                    options: [{
                        value: "fade-in",
                        title: "Fade in"
                    }, {
                        value: "fade-out",
                        title: "Fade out"
                    }, {
                        value: "slide-up",
                        title: "Slide up"
                    }, {
                        value: "slide-down",
                        title: "Slide down"
                    }, {
                        value: "slide-right",
                        title: "Slide right"
                    }, {
                        value: "slide-left",
                        title: "Slide left"
                    }, {
                        value: "scale-up",
                        title: "Scale up"
                    }, {
                        value: "scale-down",
                        title: "Scale down"
                    }]
                }
            }
        }
    },
    validateProperties: function() {
        for (var e in this.properties) {
            var t = this.properties[e];
            for (var i in this.properties[e]) {
                var n = t[i]
                  , r = [];
                "number" === n.type && ("number" != typeof n.minValue && r.push("must have minValue"),
                "number" != typeof n.maxValue && r.push("must have maxValue"),
                "number" != typeof n.decimals && (n.decimals = 0),
                "string" != typeof n.unit && (n.unit = "")),
                r.length && console.warn('Malformed property "' + e + "." + i + '"', r)
            }
        }
    },
    render: function() {
        this.domElement || (this.domElement = $("<div>"),
        this.domElement.addClass("sl-block"),
        this.contentElement = $("<" + this.options.contentElementType + ">").appendTo(this.domElement),
        this.contentElement.addClass("sl-block-content")),
        this.domElement.attr("data-block-type", this.type),
        this.domElement.data("block-instance", this)
    },
    bind: function() {
        this.onClick = this.onClick.bind(this),
        this.onMouseDown = this.onMouseDown.bind(this),
        this.onMouseMove = this.onMouseMove.bind(this),
        this.onMouseUp = this.onMouseUp.bind(this),
        this.onKeyDown = this.onKeyDown.bind(this),
        this.onKeyUp = this.onKeyUp.bind(this),
        this.onDoubleClick = this.onDoubleClick.bind(this),
        this.syncTransformVisibility = this.syncTransformVisibility.bind(this),
        this.domElement.on("vclick", this.onClick),
        this.domElement.on("vmousedown", this.onMouseDown),
        SL.editor.controllers.Blocks.focusChanged.add(this.syncTransformVisibility)
    },
    format: function() {
        this.options.horizontalResizing === !1 && this.domElement.css("width", "auto"),
        this.options.verticalResizing === !1 && this.domElement.css("height", "auto")
    },
    setDefaults: function() {
        this.domElement.css({
            "min-width": this.options.minWidth,
            "min-height": this.options.minHeight
        })
    },
    setID: function(e) {
        this.domElement.attr("data-block-id", e)
    },
    getID: function() {
        return this.domElement.attr("data-block-id")
    },
    hasID: function() {
        return !!this.getID()
    },
    getType: function() {
        return this.type
    },
    appendTo: function(e) {
        this.domElement.appendTo(e)
    },
    detach: function() {
        this.domElement.detach()
    },
    focus: function() {
        this.focused || (this.focused = !0,
        this.domElement.addClass("is-focused"),
        this.syncTransformVisibility(),
        $(document).on("keydown", this.onKeyDown),
        $(document).on("keyup", this.onKeyUp))
    },
    blur: function() {
        this.focused && (this.focused = !1,
        this.domElement.removeClass("is-focused"),
        this.syncTransformVisibility(),
        this.hidePaddingHint(),
        $(document).off("keydown", this.onKeyDown),
        $(document).off("keyup", this.onKeyUp))
    },
    plug: function(e) {
        this.hasPlugin(e) ? console.log("Plugin is already plugged.") : this.plugins.push(new e(this))
    },
    unplug: function(e) {
        for (var t = 0; t < this.plugins.length; t++) {
            var i = this.plugins[t];
            i instanceof e && (i.destroy(),
            this.plugins.splice(t, 1))
        }
    },
    hasPlugin: function(e) {
        return this.plugins.some(function(t) {
            return t instanceof e
        })
    },
    isFocused: function() {
        return this.focused
    },
    showPaddingHint: function(e) {
        var t = this.get("style.padding");
        if (t > 0) {
            var i = this.domElement.find(".sl-block-padding-hint");
            0 === i.length && (i = $('<div class="editing-ui sl-block-overlay sl-block-padding-hint">'),
            i.appendTo(this.contentElement));
            var n = this.measure(!0)
              , r = n.height
              , o = n.width
              , s = Math.round(o / 2)
              , a = Math.round(r / 2)
              , l = Math.round(t)
              , c = Math.round(o - t)
              , h = Math.round(r - t)
              , d = Math.round(t)
              , u = i.find("canvas");
            0 === u.length && (u = $("<canvas>").appendTo(i)),
            u.attr({
                width: o,
                height: r
            });
            var p = u.get(0).getContext("2d");
            p.clearRect(0, 0, o, r),
            p.fillStyle = "rgba(17, 188, 231, 0.1)",
            p.fillRect(0, 0, o, r),
            p.clearRect(d, l, o - 2 * t, r - 2 * t),
            p.fillStyle = "rgba(17, 188, 231, 0.6)",
            p.fillRect(d, l, o - 2 * t, 1),
            p.fillRect(c, l, 1, r - 2 * t),
            p.fillRect(d, h, o - 2 * t, 1),
            p.fillRect(d, l, 1, r - 2 * t),
            p.fillRect(s - 1, 0, 1, t),
            p.fillRect(s - 1, h, 1, t),
            p.fillRect(0, a - 1, t, 1),
            p.fillRect(c, a - 1, t, 1),
            this.syncZ(),
            clearTimeout(this.hintPaddingTimeout),
            "number" == typeof e && (this.hintPaddingTimeout = setTimeout(this.hidePaddingHint.bind(this), e))
        } else
            this.hidePaddingHint()
    },
    hidePaddingHint: function() {
        clearTimeout(this.hintPaddingTimeout),
        this.domElement.find(".sl-block-padding-hint").remove()
    },
    watch: function(e, t) {
        this.watchlist[e] || (this.watchlist[e] = new signals.Signal),
        this.watchlist[e].add(t)
    },
    unwatch: function(e, t) {
        this.watchlist[e] && this.watchlist[e].remove(t)
    },
    set: function(e, t) {
        if ("string" == typeof e) {
            var i = e;
            e = {},
            e[i] = t
        }
        var n = [];
        for (var r in e)
            if (e.hasOwnProperty(r)) {
                var o = this.getPropertySettings(r);
                if (o) {
                    var s = r.split(".")
                      , a = e[r]
                      , l = a
                      , c = "function" == typeof o.targetElement ? o.targetElement() : this.contentElement;
                    "number" == typeof a && 0 === o.decimals && (a = Math.round(a)),
                    o.unit && (a += o.unit),
                    o.serialize && (a = o.serialize(a)),
                    o.setter ? o.setter.call(null, a) : "style" === s[0] ? "undefined" != typeof o.defaultValue && o.defaultValue === l ? c.css(s[1], "") : c.css(s[1], a) : "attribute" === s[0] && c.attr(s[1], a),
                    n.push(r),
                    this.watchlist[r] && this.watchlist[r].dispatch()
                } else
                    console.log("Property not found:", r)
            }
        n.length && this.propertyChanged.dispatch(n)
    },
    get: function(e) {
        var t = this.getPropertySettings(e);
        if (t) {
            var i, n = e.split("."), r = "function" == typeof t.targetElement ? t.targetElement() : this.contentElement;
            if (r && r.length)
                if (t.getter)
                    i = t.getter.call(this);
                else if ("style" === n[0]) {
                    var o = n[1].replace(/-(\w)/g, function(e, t) {
                        return t.toUpperCase()
                    });
                    i = t.computed ? r.css(o) : r.get(0).style[o]
                } else if ("attribute" === n[0] && (i = r.attr(n[1]),
                "string" == typeof i)) {
                    if ("null" === i)
                        return null;
                    if ("true" === i)
                        return !0;
                    if ("false" === i)
                        return !1;
                    if (i.match(/^\d+$/))
                        return parseFloat(i)
                }
            return "number" === t.type && (i = parseFloat(i)),
            t.deserialize && (i = t.deserialize(i)),
            "undefined" !== t.defaultValue && ("number" === t.type ? isNaN(i) && (i = t.defaultValue) : i || (i = t.defaultValue)),
            i
        }
        return void console.log("Property not found:", e)
    },
    unset: function(e) {
        "string" == typeof e && (e = [e]);
        var t = [];
        e.forEach(function(e) {
            var i = this.getPropertySettings(e);
            if (i) {
                var n = e.split(".")
                  , r = "function" == typeof i.targetElement ? i.targetElement() : this.contentElement;
                "style" === n[0] ? r.css(n[1], "") : "attribute" === n[0] && r.removeAttr(n[1]),
                t.push(e)
            }
        }
        .bind(this)),
        t.length && this.propertyChanged.dispatch(t)
    },
    isset: function(e) {
        var t = this.getPropertySettings(e);
        if (t) {
            if (t.checker)
                return t.call();
            var i = this.get(e);
            if ("undefined" != typeof i && i !== t.defaultValue)
                return !0
        }
        return !1
    },
    getPropertySettings: function(e) {
        if ("string" == typeof e) {
            e = e.split(".");
            var t = e[0]
              , i = e[1]
              , n = this.properties[t] ? this.properties[t][i] : null;
            if (n)
                return n;
            console.log("Property not found:", e)
        }
        return null
    },
    getPropertyDefault: function(e) {
        var t = this.getPropertySettings(e);
        return t ? t.defaultValue : null
    },
    setOpacity: function(e) {
        this.contentElement.css("opacity", ""),
        1 === e ? (this.domElement.find(".sl-block-style").css("opacity", ""),
        this.removeStyleWrapper()) : this.createStyleWrapper().css("opacity", e)
    },
    getOpacity: function() {
        var e, t = this.domElement.find(".sl-block-style");
        return e = t.length ? t.get(0).style.opacity : this.contentElement.get(0).style.opacity,
        e = parseFloat(e),
        ("undefined" == typeof e || isNaN(e)) && (e = 1),
        e
    },
    setRotation: function(e) {
        e && "0deg" !== e ? this.createStyleWrapper().css("transform", "rotate(" + e + ")") : (this.domElement.find(".sl-block-style").css("transform", ""),
        this.removeStyleWrapper()),
        this.transform.sync()
    },
    getRotation: function() {
        var e = this.domElement.find(".sl-block-style");
        return e.length ? SL.util.parseCSSTransform(e.get(0).style.transform).rotate || 0 : 0
    },
    getCSSTransform: function() {
        return this.domElement.find(".sl-block-style").css("transform") || ""
    },
    hasTransform: function() {
        return this.isRotated()
    },
    isRotated: function() {
        return 0 !== this.get("transform.rotate")
    },
    setZ: function(e) {
        this.contentElement.css("z-index", e),
        this.domElement.find(".sl-block-overlay, .sl-block-style").css("z-index", e)
    },
    getZ: function() {
        var e = parseInt(this.contentElement.css("z-index"), 10);
        return isNaN(e) ? 0 : e
    },
    syncZ: function() {
        this.domElement.find(".sl-block-overlay, .sl-block-style").css("z-index", this.getZ())
    },
    setClassName: function(e) {
        e = e.replace(/\s{2,}/g, " "),
        e = e.replace(/[^a-zA-Z0-9-_\s]*/gi, ""),
        e = e.trim(),
        this.contentElement.attr("class", "sl-block-content" + (e ? " " + e : ""))
    },
    getClassName: function() {
        var e = this.contentElement.attr("class");
        return e = e.split(" ").map(function(e) {
            return e = e.trim(),
            (/^(sl\-|cke\_)/gi.test(e) || "visible" === e) && (e = ""),
            e
        }).join(" "),
        e = e.replace(/\s{2,}/g, " "),
        e = e.trim()
    },
    getBorderColor: function() {
        return this.contentElement.css("border-top-color")
    },
    getAspectRatio: function() {
        return this.options.aspectRatio
    },
    hasAspectRatio: function() {
        return this.getAspectRatio() > 0
    },
    syncAspectRatio: function() {
        if (this.hasAspectRatio()) {
            var e = this.measure(!0);
            this.resize({
                width: e.width,
                height: e.height,
                center: !0
            })
        }
    },
    syncTransformVisibility: function() {
        this.isFocused() ? this.transform.show() : this.transform.hide()
    },
    showPlaceholder: function() {
        0 === this.contentElement.find(".sl-block-placeholder").length && this.contentElement.append('<div class="editing-ui sl-block-overlay sl-block-placeholder">')
    },
    hidePlaceholder: function() {
        this.contentElement.find(".sl-block-placeholder").remove()
    },
    createStyleWrapper: function() {
        var e = this.domElement.find(".sl-block-style");
        return 0 === e.length && (e = $('<div class="sl-block-style"></div>'),
        this.contentElement.wrap(e),
        this.syncZ()),
        e
    },
    removeStyleWrapper: function() {
        !this.hasTransform() && 1 !== this.getOpacity() && this.contentElement.parent(".sl-block-style").length && this.contentElement.unwrap()
    },
    paint: function() {
        this.isEmpty() ? this.showPlaceholder() : this.hidePlaceholder(),
        this.syncZ()
    },
    isEmpty: function() {
        return !1
    },
    isEditingText: function() {
        return !1
    },
    isFragment: function() {
        return this.contentElement.hasClass("fragment")
    },
    removeFragment: function() {
        this.contentElement.removeClass("fragment").removeAttr("data-fragment-index")
    },
    getToolbarOptions: function() {
        return SL.editor.controllers.Blocks.getCurrentBlocks().length > 1 ? [SL.editor.components.toolbars.options.Divider, SL.editor.components.toolbars.options.BlockDepth, SL.editor.components.toolbars.options.BlockActions] : [SL.editor.components.toolbars.options.Divider, SL.editor.components.toolbars.options.BlockActions]
    },
    changeContentElementType: function(e) {
        this.contentElement.changeElementType(e),
        this.contentElement = this.domElement.find(".sl-block-content")
    },
    move: function(e, t, i) {
        if (i && i.isOffset)
            this.domElement.css({
                left: "+=" + e,
                top: "+=" + t
            });
        else {
            var n = 0
              , r = 0;
            if (this.hasTransform()) {
                var o = this.measure(!0)
                  , s = this.measure();
                n = o.x - s.x,
                r = o.y - s.y
            }
            var a = {};
            "number" == typeof e && (a.left = Math.round(e + n)),
            "number" == typeof t && (a.top = Math.round(t + r)),
            this.domElement.css(a)
        }
    },
    moveToCenter: function() {
        var e = this.measure()
          , t = SL.view.getSlideSize();
        this.move((t.width - e.width) / 2, (t.height - e.height) / 2)
    },
    resize: function(e) {
        e = e || {};
        var t, i;
        this.transform.isResizing() ? (i = this.transform.getState().originalAnchorPositions,
        t = this.transform.getState().originalMeasurements) : t = this.measure(),
        "number" == typeof e.top && (e.height = t.bottom - e.top,
        e.direction = "n"),
        "number" == typeof e.left && (e.width = t.right - e.left,
        e.direction = "w"),
        "number" == typeof e.right && (e.width = e.right - t.x),
        "number" == typeof e.bottom && (e.height = e.bottom - t.y);
        var n = Math.max(e.width, this.options.minWidth)
          , r = Math.max(e.height, this.options.minHeight);
        if (this.transform.isResizingProportionally()) {
            var o = t.width / t.height;
            /s|n/.test(e.direction) ? n = r * o : r = n / o
        }
        if (this.hasAspectRatio()) {
            var s = this.getAspectRatio();
            e.direction ? /s|n/.test(e.direction) ? n = r * s : r = n / s : this.getAspectRatio() < 1 ? n = r * s : r = n / s
        }
        if (this.domElement.css({
            width: this.options.horizontalResizing ? Math.round(n) : "auto",
            height: this.options.verticalResizing ? Math.round(r) : "auto"
        }),
        this.transform.isResizingCentered() || e.center) {
            var a = this.measure(!0);
            this.domElement.css({
                left: t.x + (t.width - a.width) / 2,
                top: t.y + (t.height - a.height) / 2
            })
        } else if (this.transform.isResizing()) {
            var l = SL.editor.blocks.behavior.Transform.OPPOSITE_ANCHOR_IDS[this.transform.getState().direction]
              , c = i ? i[l] : {
                x: 0,
                y: 0
            }
              , h = this.getAnchorPositions()[l];
            if (c && h) {
                var d = t.x - (h.x - c.x)
                  , u = t.y - (h.y - c.y);
                this.domElement.css({
                    left: Math.round(d),
                    top: Math.round(u)
                })
            }
        } else
            e.direction && (/n/.test(e.direction) && this.domElement.css("top", t.bottom - r),
            /w/.test(e.direction) && this.domElement.css("left", t.right - n),
            1 === e.direction.length && (/n|s/.test(e.direction) ? this.domElement.css("left", t.x + (t.width - n) / 2) : /e|w/.test(e.direction) && this.domElement.css("top", t.y + (t.height - r) / 2)))
    },
    measure: function(e) {
        var t = this.domElement.get(0)
          , i = {
            x: t.offsetLeft,
            y: t.offsetTop,
            width: this.domElement.outerWidth(),
            height: this.domElement.outerHeight()
        };
        i.right = i.x + i.width,
        i.bottom = i.y + i.height;
        var n = this.get("transform.rotate");
        if (0 !== n && !e) {
            var r = i.x + i.width / 2
              , o = i.y + i.height / 2
              , s = SL.util.trig.rotateAround(i.x, i.y, r, o, n)
              , a = SL.util.trig.rotateAround(i.right, i.y, r, o, n)
              , l = SL.util.trig.rotateAround(i.right, i.bottom, r, o, n)
              , c = SL.util.trig.rotateAround(i.x, i.bottom, r, o, n);
            i.x = Math.round(Math.min(s.x, a.x, l.x, c.x)),
            i.y = Math.round(Math.min(s.y, a.y, l.y, c.y)),
            i.right = Math.round(Math.max(s.x, a.x, l.x, c.x)),
            i.bottom = Math.round(Math.max(s.y, a.y, l.y, c.y)),
            i.width = Math.round(i.right - i.x),
            i.height = Math.round(i.bottom - i.y)
        }
        return i
    },
    getAnchorPositions: function() {
        var e = this.measure(!0)
          , t = this.get("transform.rotate")
          , i = e.width / 2
          , n = e.height / 2;
        return {
            n: SL.util.trig.rotateAround(0 + e.width / 2, 0, i, n, t),
            e: SL.util.trig.rotateAround(e.width, 0 + e.height / 2, i, n, t),
            s: SL.util.trig.rotateAround(0 + e.width / 2, e.height, i, n, t),
            w: SL.util.trig.rotateAround(0, 0 + e.height / 2, i, n, t),
            nw: SL.util.trig.rotateAround(0, 0, i, n, t),
            ne: SL.util.trig.rotateAround(e.width, 0, i, n, t),
            se: SL.util.trig.rotateAround(e.width, e.height, i, n, t),
            sw: SL.util.trig.rotateAround(0, e.height, i, n, t),
            measurements: e
        }
    },
    hitTest: function(e) {
        if (this.isRotated()) {
            var t = this.getAnchorPositions()
              , i = t.measurements
              , n = i.x > e.x && i.right < e.x + e.width && i.y > e.y && i.bottom < e.y + e.height;
            if (n)
                return !0;
            var r = [[{
                x: i.x + t.nw.x,
                y: i.y + t.nw.y
            }, {
                x: i.x + t.ne.x,
                y: i.y + t.ne.y
            }], [{
                x: i.x + t.ne.x,
                y: i.y + t.ne.y
            }, {
                x: i.x + t.se.x,
                y: i.y + t.se.y
            }], [{
                x: i.x + t.sw.x,
                y: i.y + t.sw.y
            }, {
                x: i.x + t.se.x,
                y: i.y + t.se.y
            }], [{
                x: i.x + t.nw.x,
                y: i.y + t.nw.y
            }, {
                x: i.x + t.sw.x,
                y: i.y + t.sw.y
            }]]
              , o = [[{
                x: e.x,
                y: e.y
            }, {
                x: e.x + e.width,
                y: e.y
            }], [{
                x: e.x + e.width,
                y: e.y
            }, {
                x: e.x + e.width,
                y: e.y + e.height
            }], [{
                x: e.x,
                y: e.y + e.height
            }, {
                x: e.x + e.width,
                y: e.y + e.height
            }], [{
                x: e.x,
                y: e.y
            }, {
                x: e.x,
                y: e.y + e.height
            }]];
            return o.some(function(e) {
                return r.some(function(t) {
                    return !!SL.util.trig.findLineIntersection(t[0], t[1], e[0], e[1])
                })
            })
        }
        return SL.util.trig.intersects(this.measure(), e)
    },
    runIntro: function() {
        this.domElement.addClass("intro-start"),
        setTimeout(function() {
            this.domElement.removeClass("intro-start").addClass("intro-end"),
            setTimeout(function() {
                this.domElement.removeClass("intro-end")
            }
            .bind(this), 500)
        }
        .bind(this), this.options.introDelay || 1)
    },
    pair: function(e, t) {
        this.pairings.push({
            block: e,
            direction: t
        })
    },
    unpair: function() {
        this.pairings.length = 0
    },
    syncPairs: function() {
        this.pairings.forEach(function(e) {
            e.block.syncPairs()
        })
    },
    destroy: function() {
        this.destroyed = !0,
        SL.editor.controllers.Blocks.focusChanged.remove(this.syncTransformVisibility);
        for (var e in this.watchlist)
            this.watchlist[e].dispose(),
            delete this.watchlist[e];
        this.removed.dispatch(),
        this.removed.dispose(),
        this.dragStarted.dispose(),
        this.dragUpdated.dispose(),
        this.dragEnded.dispose(),
        this.propertyChanged.dispose(),
        this.transform.destroy(),
        this.domElement.off("vclick", this.onClick),
        this.domElement.off("vmousedown", this.onMouseDown),
        this.domElement.data("block-instance", null),
        this.domElement.remove()
    },
    onClick: function(e) {
        SL.view.isEditing() && this.hasPlugin(SL.editor.blocks.plugin.Link) && this.isLinked() && e.preventDefault()
    },
    onMouseDown: function(e) {
        return !SL.view.isEditing() || $(e.target).closest(".sl-block-transform .anchor").length > 0 || $(e.target).closest(".sl-table-column-resizer").length > 0 ? !0 : void (this.isEditingText() || (e.preventDefault(),
        SL.editor.controllers.Blocks.focus(this, e.shiftKey),
        $("input:focus, textarea:focus").blur(),
        $(document).on("vmousemove", this.onMouseMove),
        $(document).on("vmouseup", this.onMouseUp),
        this.moved = !1,
        this.mouseDownCursor.x = e.clientX,
        this.mouseDownCursor.y = e.clientY,
        this.dragTargets = SL.editor.controllers.Blocks.getFocusedBlocks().map(function(e) {
            return {
                block: e,
                origin: e.measure()
            }
        })))
    },
    onMouseMove: function(e) {
        var t = this.moved || Math.abs(this.mouseDownCursor.x - e.clientX) > 1 || Math.abs(this.mouseDownCursor.y - e.clientY) > 1;
        t && (e.preventDefault(),
        this.dragTargets.forEach(function(t) {
            t.block.move(t.origin.x + (e.clientX - this.mouseDownCursor.x), t.origin.y + (e.clientY - this.mouseDownCursor.y))
        }
        .bind(this)),
        this.moved === !1 && SL.editor.controllers.Guides.start(SL.editor.controllers.Blocks.getFocusedBlocks()),
        SL.editor.controllers.Guides.sync(),
        this.moved = !0)
    },
    onMouseUp: function(e) {
        if (e.preventDefault(),
        $(document).off("vmousemove", this.onMouseMove),
        $(document).off("vmouseup", this.onMouseUp),
        SL.editor.controllers.Guides.stop(),
        !this.moved) {
            "number" != typeof this.lastMouseUpTime && (this.lastMouseUpTime = 0,
            this.lastDoubleClickTime = 0);
            var t = Date.now()
              , i = 400;
            t - this.lastMouseUpTime < i && (t - this.lastDoubleClickTime > i && this.onDoubleClick(e),
            this.lastDoubleClickTime = t),
            this.lastMouseUpTime = t
        }
    },
    onDoubleClick: function() {},
    onKeyDown: function() {},
    onKeyUp: function() {}
}),
SL("editor.blocks.behavior").TransformLine = Class.extend({
    ANCHOR_SIZE: 16,
    init: function(e) {
        this.block = e,
        this.state = {
            direction: null,
            originalCursorPosition: {
                x: 0,
                y: 0
            },
            originalPoint: {
                x: 0,
                y: 0
            }
        },
        this.render(),
        this.bind(),
        this.layout()
    },
    render: function() {
        this.domElement = $('<div class="sl-block-transform editing-ui">'),
        this.anchors = {},
        this.anchors.p1 = $('<div class="anchor" data-direction="p1">').appendTo(this.domElement),
        this.anchors.p2 = $('<div class="anchor" data-direction="p2">').appendTo(this.domElement),
        this.domElement.find(".anchor").html('<div class="anchor-point"></div>')
    },
    bind: function() {
        this.onMouseDown = this.onMouseDown.bind(this),
        this.onMouseMove = this.onMouseMove.bind(this),
        this.onMouseUp = this.onMouseUp.bind(this),
        this.transformStarted = new signals.Signal,
        this.transformEnded = new signals.Signal;
        for (var e in this.anchors)
            this.anchors[e].on("vmousedown", this.onMouseDown)
    },
    layout: function() {
        var e = this.block.getViewBox();
        this.anchors.p1.css({
            left: this.block.get("attribute.data-line-x1") - e.x - 1,
            top: this.block.get("attribute.data-line-y1") - e.y - 1
        }),
        this.anchors.p2.css({
            left: this.block.get("attribute.data-line-x2") - e.x - 1,
            top: this.block.get("attribute.data-line-y2") - e.y - 1
        })
    },
    show: function() {
        0 === this.domElement.parent().length && (this.domElement.appendTo(this.block.domElement),
        this.domElement.addClass("visible"))
    },
    hide: function() {
        this.domElement.detach(),
        this.domElement.removeClass("visible")
    },
    destroy: function() {
        $(document).off("vmousemove", this.onMouseMove),
        $(document).off("vmouseup", this.onMouseUp),
        this.transformStarted.dispose(),
        this.transformEnded.dispose(),
        this.domElement.remove()
    },
    isResizing: function() {
        return !!this.state.direction
    },
    isResizingCentered: function() {
        return this.isResizing() && this.state.centered
    },
    isResizingProportionally: function() {
        return this.isResizing() && this.state.proportional
    },
    getState: function() {
        return this.state
    },
    onMouseDown: function(e) {
        e.preventDefault(),
        this.state.direction = $(e.currentTarget).attr("data-direction"),
        this.state.direction && ($(document).on("vmousemove", this.onMouseMove),
        $(document).on("vmouseup", this.onMouseUp),
        this.moved = !1,
        this.state.originalCursorPosition.x = e.clientX,
        this.state.originalCursorPosition.y = e.clientY,
        this.state.direction === SL.editor.blocks.Line.POINT_1 ? (this.state.originalPoint.x = this.block.get("attribute.data-line-x1"),
        this.state.originalPoint.y = this.block.get("attribute.data-line-y1")) : (this.state.originalPoint.x = this.block.get("attribute.data-line-x2"),
        this.state.originalPoint.y = this.block.get("attribute.data-line-y2")))
    },
    onMouseMove: function(e) {
        e.preventDefault(),
        this.moved || (this.transformStarted.dispatch(this),
        SL.editor.controllers.Guides.start([this.block], {
            action: "line-anchor",
            direction: this.state.direction
        })),
        this.moved = !0;
        var t = e.clientX - this.state.originalCursorPosition.x
          , i = e.clientY - this.state.originalCursorPosition.y
          , n = this.state.originalPoint.x + t
          , r = this.state.originalPoint.y + i;
        this.block.set(this.state.direction === SL.editor.blocks.Line.POINT_1 ? {
            "attribute.data-line-x1": n,
            "attribute.data-line-y1": r
        } : {
            "attribute.data-line-x2": n,
            "attribute.data-line-y2": r
        }),
        SL.editor.controllers.Guides.sync()
    },
    onMouseUp: function(e) {
        e.preventDefault(),
        $(document).off("vmousemove", this.onMouseMove),
        $(document).off("vmouseup", this.onMouseUp),
        SL.editor.controllers.Guides.stop(),
        this.moved && this.transformEnded.dispatch(this),
        this.state.direction = null
    }
}),
SL("editor.blocks.behavior").Transform = Class.extend({
    ANCHOR_SIZE: 16,
    init: function(e) {
        this.block = e,
        this.state = {
            direction: null,
            centered: !1,
            proportional: !1,
            originalMeasurements: null,
            originalCenter: {
                x: 0,
                y: 0
            },
            originalCursorPosition: {
                x: 0,
                y: 0
            }
        },
        this.render(),
        this.bind(),
        this.sync()
    },
    render: function() {
        this.domElement = $('<div class="sl-block-transform editing-ui">'),
        this.anchors = {},
        this.anchors.n = $('<div class="anchor" data-direction="n">').appendTo(this.domElement),
        this.anchors.e = $('<div class="anchor" data-direction="e">').appendTo(this.domElement),
        this.anchors.s = $('<div class="anchor" data-direction="s">').appendTo(this.domElement),
        this.anchors.w = $('<div class="anchor" data-direction="w">').appendTo(this.domElement),
        this.anchors.nw = $('<div class="anchor" data-direction="nw">').appendTo(this.domElement),
        this.anchors.ne = $('<div class="anchor" data-direction="ne">').appendTo(this.domElement),
        this.anchors.se = $('<div class="anchor" data-direction="se">').appendTo(this.domElement),
        this.anchors.sw = $('<div class="anchor" data-direction="sw">').appendTo(this.domElement);
        var e = '<div class="anchor-point"></div>';
        this.block.options.horizontalResizing && this.block.options.verticalResizing ? this.domElement.find(".anchor").html(e) : this.block.options.horizontalResizing ? this.anchors.e.add(this.anchors.w).append(e) : this.block.options.verticalResizing && this.anchors.n.add(this.anchors.s).append(e),
        this.block.options.rotation && this.domElement.find(".anchor").append('<div class="anchor-rotation"></div>')
    },
    bind: function() {
        this.onAnchorMouseDown = this.onAnchorMouseDown.bind(this),
        this.onResizeMouseMove = this.onResizeMouseMove.bind(this),
        this.onResizeMouseUp = this.onResizeMouseUp.bind(this),
        this.onRotateMouseMove = this.onRotateMouseMove.bind(this),
        this.onRotateMouseUp = this.onRotateMouseUp.bind(this),
        this.transformStarted = new signals.Signal,
        this.transformEnded = new signals.Signal;
        for (var e in this.anchors)
            this.anchors[e].on("vmousedown", this.onAnchorMouseDown)
    },
    sync: function() {
        if (this.block.hasTransform() === !1)
            this.domElement.css("transform", ""),
            this.domElement.find(".anchor[data-cursor-direction]").removeAttr("data-cursor-direction");
        else {
            this.domElement.css("transform", this.block.getCSSTransform());
            for (var e = SL.editor.blocks.behavior.Transform.ANCHOR_IDS, t = e.concat(), i = this.block.get("transform.rotate"), n = Math.round(i / 360 * e.length); 0 > n; )
                t.unshift(t.pop()),
                n++;
            for (; n > 0; )
                t.push(t.shift()),
                n--;
            this.domElement.find(".anchor").each(function() {
                var i = this.getAttribute("data-direction")
                  , n = t[e.indexOf(i)];
                this.setAttribute("data-cursor-direction", n)
            })
        }
    },
    show: function() {
        0 === this.domElement.parent().length && (this.domElement.appendTo(this.block.domElement),
        this.domElement.addClass("visible"))
    },
    hide: function() {
        this.domElement.detach(),
        this.domElement.removeClass("visible")
    },
    destroy: function() {
        $(document).off("vmousemove", this.onResizeMouseMove),
        $(document).off("vmouseup", this.onResizeMouseUp),
        $(document).off("vmousemove", this.onRotateMouseMove),
        $(document).off("vmouseup", this.onRotateMouseUp),
        this.domElement.remove()
    },
    isResizing: function() {
        return !!this.state.direction
    },
    isResizingCentered: function() {
        return this.isResizing() && this.state.centered
    },
    isResizingProportionally: function() {
        return this.isResizing() && this.state.proportional
    },
    canUseGuides: function() {
        return !this.block.isRotated()
    },
    getState: function() {
        return this.state
    },
    onAnchorMouseDown: function(e) {
        if (e.preventDefault(),
        this.moved = !1,
        $(e.target).hasClass("anchor-rotation")) {
            $(document).on("vmousemove", this.onRotateMouseMove),
            $(document).on("vmouseup", this.onRotateMouseUp),
            this.state.slideBounds = SL.util.getRevealSlidesBounds(),
            this.state.originalRotation = this.block.get("transform.rotate"),
            this.state.originalMeasurements = this.block.measure(),
            this.state.originalCenter.x = this.state.originalMeasurements.x + this.state.originalMeasurements.width / 2,
            this.state.originalCenter.y = this.state.originalMeasurements.y + this.state.originalMeasurements.height / 2;
            var t = e.clientX - this.state.slideBounds.x
              , i = e.clientY - this.state.slideBounds.y;
            this.state.originalCursorAngle = 180 * (Math.atan2(i - this.state.originalCenter.y, t - this.state.originalCenter.x) + Math.PI / 2) / Math.PI
        } else
            this.state.direction = $(e.currentTarget).attr("data-direction"),
            this.state.direction && ($(document).on("vmousemove", this.onResizeMouseMove),
            $(document).on("vmouseup", this.onResizeMouseUp),
            this.state.originalCursorPosition.x = e.clientX,
            this.state.originalCursorPosition.y = e.clientY,
            this.state.originalMeasurements = this.block.measure(!0),
            this.state.originalAnchorPositions = this.block.getAnchorPositions())
    },
    onResizeMouseMove: function(e) {
        e.preventDefault(),
        this.moved || (this.transformStarted.dispatch(this),
        SL.editor.controllers.Guides.start([this.block], {
            action: "resize",
            direction: this.state.direction
        })),
        this.moved = !0;
        var t = e.clientX
          , i = e.clientY
          , n = t - this.state.originalCursorPosition.x
          , r = i - this.state.originalCursorPosition.y
          , o = this.block.get("transform.rotate");
        if (o) {
            var s = SL.util.trig.rotateAround(n, r, 0, 0, -o);
            n = s.x,
            r = s.y
        }
        e.altKey && (n *= 2,
        r *= 2);
        var a = ""
          , l = "";
        switch (this.state.direction) {
        case "e":
            a = Math.max(this.state.originalMeasurements.width + n, 1);
            break;
        case "w":
            a = Math.max(this.state.originalMeasurements.width - n, 1);
            break;
        case "s":
            l = Math.max(this.state.originalMeasurements.height + r, 1);
            break;
        case "n":
            l = Math.max(this.state.originalMeasurements.height - r, 1);
            break;
        case "nw":
            a = Math.max(this.state.originalMeasurements.width - n, 1),
            l = Math.max(this.state.originalMeasurements.height - r, 1);
            break;
        case "ne":
            a = Math.max(this.state.originalMeasurements.width + n, 1),
            l = Math.max(this.state.originalMeasurements.height - r, 1);
            break;
        case "se":
            a = Math.max(this.state.originalMeasurements.width + n, 1),
            l = Math.max(this.state.originalMeasurements.height + r, 1);
            break;
        case "sw":
            a = Math.max(this.state.originalMeasurements.width - n, 1),
            l = Math.max(this.state.originalMeasurements.height + r, 1)
        }
        this.block.hasAspectRatio() ? ("" === a && (a = this.state.originalMeasurements.width * (l / this.state.originalMeasurements.height)),
        "" === l && (l = this.state.originalMeasurements.height * (a / this.state.originalMeasurements.width))) : ("" === a && (a = this.state.originalMeasurements.width),
        "" === l && (l = this.state.originalMeasurements.height)),
        this.state.centered = e.altKey,
        this.state.proportional = e.shiftKey,
        this.block.resize({
            width: a,
            height: l,
            direction: this.state.direction
        }),
        this.canUseGuides() && SL.editor.controllers.Guides.sync()
    },
    onResizeMouseUp: function(e) {
        e.preventDefault(),
        $(document).off("vmousemove", this.onResizeMouseMove),
        $(document).off("vmouseup", this.onResizeMouseUp),
        SL.editor.controllers.Guides.stop(),
        this.moved && this.transformEnded.dispatch(this),
        this.state.direction = null,
        this.state.centered = null,
        this.state.proportional = null
    },
    onRotateMouseMove: function(e) {
        e.preventDefault(),
        this.moved || this.transformStarted.dispatch(this),
        this.moved = !0;
        var t = (this.state.originalMeasurements.x + this.state.originalMeasurements.width / 2,
        this.state.originalMeasurements.y + this.state.originalMeasurements.height / 2,
        e.clientX - this.state.slideBounds.x)
          , i = e.clientY - this.state.slideBounds.y
          , n = Math.atan2(i - this.state.originalCenter.y, t - this.state.originalCenter.x) + Math.PI / 2;
        if (n = 180 * n / Math.PI,
        n = this.state.originalRotation + (n - this.state.originalCursorAngle),
        0 > n && (n = 360 + n % 360),
        n > 0 && (n %= 360),
        SL.current_user.settings.get("editor_snap"))
            for (var r = 0; r < SL.editor.blocks.behavior.Transform.ROTATION_SNAP_ANGLES.length; r++) {
                var o = SL.editor.blocks.behavior.Transform.ROTATION_SNAP_ANGLES[r];
                if (Math.abs(n - o) < SL.editor.blocks.behavior.Transform.ROTATION_SNAP_RANGE) {
                    n = o;
                    break
                }
            }
        this.block.set("transform.rotate", n)
    },
    onRotateMouseUp: function(e) {
        e.preventDefault(),
        $(document).off("vmousemove", this.onRotateMouseMove),
        $(document).off("vmouseup", this.onRotateMouseUp),
        this.moved && this.transformEnded.dispatch(this),
        this.state.originalCursorAngle = null,
        this.state.originalRotation = null
    }
}),
SL.editor.blocks.behavior.Transform.ROTATION_SNAP_RANGE = 3,
SL.editor.blocks.behavior.Transform.ROTATION_SNAP_ANGLES = [0, 45, 90, 135, 180, 225, 270, 315, 360],
SL.editor.blocks.behavior.Transform.ANCHOR_IDS = ["n", "ne", "e", "se", "s", "sw", "w", "nw"],
SL.editor.blocks.behavior.Transform.OPPOSITE_ANCHOR_IDS = {
    n: "s",
    ne: "sw",
    e: "w",
    se: "nw",
    s: "n",
    sw: "ne",
    w: "e",
    nw: "se"
},
SL("editor.blocks").Code = SL.editor.blocks.Base.extend({
    init: function(e) {
        this._super("code", e),
        this.editingRequested = new signals.Signal
    },
    setup: function() {
        this._super(),
        this.properties.code = {
            value: {
                setter: this.setCode.bind(this),
                getter: this.getCode.bind(this)
            },
            language: {
                defaultValue: "none",
                setter: this.setCodeLanguage.bind(this),
                getter: this.getCodeLanguage.bind(this),
                options: [{
                    value: "none",
                    title: "Automatic"
                }, {
                    value: "1c",
                    title: "1C"
                }, {
                    value: "actionscript",
                    title: "ActionScript"
                }, {
                    value: "apache",
                    title: "Apache"
                }, {
                    value: "applescript",
                    title: "AppleScript"
                }, {
                    value: "asciidoc",
                    title: "AsciiDoc"
                }, {
                    value: "bash",
                    title: "Bash"
                }, {
                    value: "clojure",
                    title: "Clojure"
                }, {
                    value: "cmake",
                    title: "CMake"
                }, {
                    value: "coffeescript",
                    title: "CoffeeScript"
                }, {
                    value: "cpp",
                    title: "C++"
                }, {
                    value: "cs",
                    title: "C#"
                }, {
                    value: "css",
                    title: "CSS"
                }, {
                    value: "d",
                    title: "D"
                }, {
                    value: "delphi",
                    title: "Delphi"
                }, {
                    value: "diff",
                    title: "Diff"
                }, {
                    value: "django",
                    title: "Django "
                }, {
                    value: "dos",
                    title: "DOS"
                }, {
                    value: "elixir",
                    title: "Elixir"
                }, {
                    value: "elm",
                    title: "Elm"
                }, {
                    value: "erlang",
                    title: "Erlang"
                }, {
                    value: "fix",
                    title: "FIX"
                }, {
                    value: "fsharp",
                    title: "F#"
                }, {
                    value: "gherkin",
                    title: "gherkin"
                }, {
                    value: "glsl",
                    title: "GLSL"
                }, {
                    value: "go",
                    title: "Go"
                }, {
                    value: "haml",
                    title: "Haml"
                }, {
                    value: "handlebars",
                    title: "Handlebars"
                }, {
                    value: "haskell",
                    title: "Haskell"
                }, {
                    value: "xml",
                    title: "HTML"
                }, {
                    value: "http",
                    title: "HTTP"
                }, {
                    value: "ini",
                    title: "Ini file"
                }, {
                    value: "java",
                    title: "Java"
                }, {
                    value: "javascript",
                    title: "JavaScript"
                }, {
                    value: "json",
                    title: "JSON"
                }, {
                    value: "lasso",
                    title: "Lasso"
                }, {
                    value: "less",
                    title: "LESS"
                }, {
                    value: "lisp",
                    title: "Lisp"
                }, {
                    value: "livecodeserver",
                    title: "LiveCode Server"
                }, {
                    value: "lua",
                    title: "Lua"
                }, {
                    value: "makefile",
                    title: "Makefile"
                }, {
                    value: "markdown",
                    title: "Markdown"
                }, {
                    value: "mathematica",
                    title: "Mathematica"
                }, {
                    value: "matlab",
                    title: "Matlab"
                }, {
                    value: "nginx",
                    title: "nginx"
                }, {
                    value: "objectivec",
                    title: "Objective C"
                }, {
                    value: "perl",
                    title: "Perl"
                }, {
                    value: "php",
                    title: "PHP"
                }, {
                    value: "python",
                    title: "Python"
                }, {
                    value: "r",
                    title: "R"
                }, {
                    value: "ruby",
                    title: "Ruby"
                }, {
                    value: "ruleslanguage",
                    title: "Oracle Rules Language"
                }, {
                    value: "rust",
                    title: "Rust"
                }, {
                    value: "scala",
                    title: "Scala"
                }, {
                    value: "scss",
                    title: "SCSS"
                }, {
                    value: "smalltalk",
                    title: "SmallTalk"
                }, {
                    value: "sql",
                    title: "SQL"
                }, {
                    value: "stylus",
                    title: "Stylus"
                }, {
                    value: "swift",
                    title: "Swift"
                }, {
                    value: "tex",
                    title: "TeX"
                }, {
                    value: "vbnet",
                    title: "VB.NET"
                }, {
                    value: "vbscript",
                    title: "VBScript"
                }, {
                    value: "vim",
                    title: "vim"
                }, {
                    value: "xml",
                    title: "XML"
                }, {
                    value: "yaml",
                    title: "YAML"
                }]
            },
            theme: {
                defaultValue: "zenburn",
                setter: this.setCodeTheme.bind(this),
                getter: this.getCodeTheme.bind(this),
                options: [{
                    value: "zenburn",
                    title: "Zenburn"
                }, {
                    value: "ascetic",
                    title: "Ascetic"
                }, {
                    value: "far",
                    title: "Far"
                }, {
                    value: "github-gist",
                    title: "GitHub Gist"
                }, {
                    value: "ir-black",
                    title: "Ir Black"
                }, {
                    value: "monokai",
                    title: "Monokai"
                }, {
                    value: "obsidian",
                    title: "Obsidian"
                }, {
                    value: "solarized-dark",
                    title: "Solarized Dark"
                }, {
                    value: "solarized-light",
                    title: "Solarized Light"
                }, {
                    value: "tomorrow",
                    title: "Tomorrow"
                }, {
                    value: "xcode",
                    title: "Xcode"
                }]
            }
        }
    },
    paint: function() {
        if (this.domElement.find(".sl-block-placeholder, .sl-block-content-preview").remove(),
        this.isEmpty())
            this.showPlaceholder();
        else {
            var e = $('<div class="editing-ui sl-block-content-preview visible-in-preview">').appendTo(this.contentElement)
              , t = this.getPreElement().clone().appendTo(e);
            hljs.highlightBlock(t.get(0))
        }
        this.syncZ()
    },
    setDefaults: function() {
        this._super(),
        this.resize({
            width: 500,
            height: 300
        });
        var e = this.getDefaultCodeLanguage();
        e && this.setCodeLanguage(e);
        var t = this.getDefaultCodeTheme();
        t && this.setCodeTheme(t)
    },
    setCode: function(e) {
        this.getCodeElement().html(SL.util.escapeHTMLEntities(e)),
        this.paint()
    },
    getCode: function() {
        return SL.util.unescapeHTMLEntities(this.getCodeElement().html())
    },
    setCodeLanguage: function(e) {
        this.getPreElement().attr("class", e),
        this.paint(),
        SL.editor.blocks.Code.defaultLanguage = e
    },
    getCodeLanguage: function() {
        return this.getCodeLanguageFromPre(this.getPreElement())
    },
    getCodeLanguageFromPre: function(e) {
        var t = e.attr("class") || "";
        return t = t.replace(/hljs/gi, ""),
        t = t.trim()
    },
    getDefaultCodeLanguage: function() {
        if ("string" == typeof SL.editor.blocks.Code.defaultLanguage)
            return SL.editor.blocks.Code.defaultLanguage;
        for (var e = $('.reveal .sl-block[data-block-type="code"] pre[class!="none"]').get(), t = 0; t < e.length; t++) {
            var i = this.getCodeLanguageFromPre($(e[t]));
            if (i)
                return i
        }
        return null
    },
    setCodeTheme: function(e) {
        this.contentElement.attr("data-highlight-theme", e),
        SL.editor.blocks.Code.defaultTheme = e
    },
    getCodeTheme: function() {
        return this.contentElement.attr("data-highlight-theme")
    },
    getDefaultCodeTheme: function() {
        return "string" == typeof SL.editor.blocks.Code.defaultTheme ? SL.editor.blocks.Code.defaultTheme : $('.reveal .sl-block[data-block-type="code"] .sl-block-content[data-highlight-theme]').first().attr("data-highlight-theme")
    },
    getToolbarOptions: function() {
        return [SL.editor.components.toolbars.options.Code, SL.editor.components.toolbars.options.CodeLanguage, SL.editor.components.toolbars.options.CodeTheme, SL.editor.components.toolbars.options.TextSize, SL.editor.components.toolbars.options.Divider, SL.editor.components.toolbars.options.Opacity, SL.editor.components.toolbars.options.Rotation, SL.editor.components.toolbars.options.Divider, SL.editor.components.toolbars.groups.BorderCSS, SL.editor.components.toolbars.groups.Animation].concat(this._super())
    },
    getPreElement: function() {
        var e = this.contentElement.find(">pre");
        return 0 === e.length && (e = $("<pre><code></code></pre>").appendTo(this.contentElement)),
        e
    },
    getCodeElement: function() {
        var e = this.getPreElement()
          , t = e.find(">code");
        return 0 === t.length && (t = $("<code>").appendTo(e)),
        t
    },
    isEmpty: function() {
        return !this.isset("code.value")
    },
    onDoubleClick: function(e) {
        this._super(e),
        this.editingRequested.dispatch()
    },
    onKeyDown: function(e) {
        this._super(e),
        13 !== e.keyCode || SL.util.isTypingEvent(e) || (this.editingRequested.dispatch(),
        e.preventDefault())
    }
}),
SL("editor.blocks").Iframe = SL.editor.blocks.Base.extend({
    init: function(e) {
        this._super("iframe", e),
        this.editingRequested = new signals.Signal,
        this.iframeSourceChanged = new signals.Signal,
        this.paint()
    },
    setup: function() {
        this._super(),
        this.setIframeURL = this.setIframeURL.bind(this),
        this.getIframeURL = this.getIframeURL.bind(this),
        this.setIframeAutoplay = this.setIframeAutoplay.bind(this),
        this.getIframeAutoplay = this.getIframeAutoplay.bind(this),
        this.setIframeURL = $.debounce(this.setIframeURL, 400),
        this.properties.iframe = {
            src: {
                setter: this.setIframeURL,
                getter: this.getIframeURL
            },
            autoplay: {
                defaultValue: !1,
                setter: this.setIframeAutoplay,
                getter: this.getIframeAutoplay
            }
        }
    },
    paint: function() {
        this._super.apply(this, arguments);
        var e = this.getIframeURL()
          , t = window.location.protocol;
        "https:" === t && e && /^http:/gi.test(e) ? 0 === this.domElement.find(".sl-block-overlay-message").length && this.contentElement.append(['<div class="editing-ui sl-block-overlay sl-block-overlay-message below-content">', '<div class="overlay-content">Cannot display non-HTTPS iframe while in the editor.</div>', "</div>"].join("")) : this.domElement.find(".sl-block-overlay-message").remove()
    },
    setDefaults: function() {
        this._super(),
        this.resize({
            width: 360,
            height: 300
        })
    },
    getIframeURL: function() {
        return this.getIframeElement().attr("src") || this.getIframeElement().attr("data-src")
    },
    setIframeURL: function(e) {
        e !== this.get("iframe.src") && (this.getIframeElement().attr({
            src: e,
            "data-src": e
        }),
        this.iframeSourceChanged.dispatch(e)),
        this.paint()
    },
    getIframeAutoplay: function() {
        return this.getIframeElement().get(0).hasAttribute("data-autoplay")
    },
    setIframeAutoplay: function(e) {
        e === !0 ? this.getIframeElement().attr("data-autoplay", "") : this.getIframeElement().removeAttr("data-autoplay")
    },
    getToolbarOptions: function() {
        return [SL.editor.components.toolbars.options.IframeSRC, SL.editor.components.toolbars.options.IframeAutoplay, SL.editor.components.toolbars.options.Divider, SL.editor.components.toolbars.options.Opacity, SL.editor.components.toolbars.options.Padding, SL.editor.components.toolbars.options.Rotation, SL.editor.components.toolbars.options.Divider, SL.editor.components.toolbars.groups.BorderCSS, SL.editor.components.toolbars.groups.Animation].concat(this._super())
    },
    getIframeElement: function() {
        var e = this.contentElement.find("iframe");
        return 0 === e.length && (e = $("<iframe>").appendTo(this.contentElement)),
        e.attr({
            webkitallowfullscreen: "",
            mozallowfullscreen: "",
            allowfullscreen: "",
            sandbox: "allow-forms allow-scripts allow-popups allow-same-origin allow-pointer-lock"
        }),
        e
    },
    isEmpty: function() {
        return !this.isset("iframe.src")
    },
    destroy: function() {
        this.iframeSourceChanged.dispose(),
        this._super()
    },
    onDoubleClick: function(e) {
        this._super(e),
        this.editingRequested.dispatch()
    },
    onKeyDown: function(e) {
        this._super(e),
        13 !== e.keyCode || SL.util.isTypingEvent(e) || (this.editingRequested.dispatch(),
        e.preventDefault())
    }
}),
SL("editor.blocks").Image = SL.editor.blocks.Base.extend({
    init: function(e) {
        this._super("image", e),
        this.plug(SL.editor.blocks.plugin.Link),
        this.imageURLChanged = new signals.Signal,
        this.imageStateChanged = new signals.Signal,
        this.contentElement.find("img").on("error", function() {
            this.loadingFailed = !0,
            this.paint()
        }
        .bind(this))
    },
    setup: function() {
        this._super(),
        this.properties.image = {
            src: {
                setter: this.setImageURL.bind(this),
                getter: this.getImageURL.bind(this)
            }
        },
        this.properties.attribute["data-inline-svg"] = {
            defaultValue: !1
        }
    },
    bind: function() {
        this._super(),
        this.onUploadCompleted = this.onUploadCompleted.bind(this),
        this.onUploadFailed = this.onUploadFailed.bind(this),
        this.propertyChanged.add(this.onPropertyChanged.bind(this))
    },
    setDefaults: function() {
        this._super(),
        this.resize({
            width: 360,
            height: 300
        }),
        this.options.insertedFromToolbar && (this.options.introDelay = 300,
        this.browse())
    },
    getToolbarOptions: function() {
        return [SL.editor.components.toolbars.options.Image, SL.editor.components.toolbars.options.ImageInlineSVG, SL.editor.components.toolbars.options.Divider, SL.editor.components.toolbars.options.Opacity, SL.editor.components.toolbars.options.Rotation, SL.editor.components.toolbars.options.Divider, SL.editor.components.toolbars.groups.BorderCSS, SL.editor.components.toolbars.groups.Link, SL.editor.components.toolbars.groups.Animation].concat(this._super())
    },
    setImageURL: function(e) {
        var t = this.contentElement.find("img")
          , i = this.hasLoadingFailed();
        1 === t.length && t.prop("complete") === !0 && 0 === t.prop("naturalWidth") && (i = !0),
        (e !== this.getImageURL() || i) && (this.loading = !0,
        this.loadingFailed = !1,
        this.paint(),
        this.imageStateChanged.dispatch(),
        0 === t.length ? (t = $('<img src="' + e + '">'),
        t.css("visibility", "hidden"),
        t.appendTo(this.contentElement)) : t.attr("src", e),
        t.off("load").on("load", function() {
            t.css("visibility", ""),
            this.loading = !1,
            this.syncAspectRatio(),
            this.paint(),
            this.imageStateChanged.dispatch(),
            this.paintInlineSVG()
        }
        .bind(this)),
        t.off("error").on("error", function() {
            SL.notify("Failed to load image", "negative"),
            this.loading = !1,
            this.loadingFailed = !0,
            this.paint(),
            this.imageStateChanged.dispatch()
        }
        .bind(this)),
        this.imageURLChanged.dispatch(e))
    },
    getImageURL: function() {
        return this.contentElement.find("img").attr("src")
    },
    setImageModel: function(e) {
        e.isSVG() && this.set("attribute.data-inline-svg", e.get("inline")),
        this.intermediateModel = e,
        this.intermediateModel.isUploaded() ? this.onUploadCompleted() : (this.paint(),
        this.imageStateChanged.dispatch(),
        this.intermediateModel.uploadCompleted.add(this.onUploadCompleted),
        this.intermediateModel.uploadFailed.add(this.onUploadFailed))
    },
    isLoading: function() {
        return !!this.loading || !!this.loadingSVG
    },
    isUploading: function() {
        return !(!this.intermediateModel || !this.intermediateModel.isWaitingToUpload() && !this.intermediateModel.isUploading())
    },
    hasImage: function() {
        var e = this.get("image.src");
        return !!("string" == typeof e && e.length > 0)
    },
    hasLoadingFailed: function() {
        return this.loadingFailed
    },
    isLoaded: function() {
        var e = this.getNaturalSize(!0);
        return e && e.width > 0 && e.height > 0
    },
    isSVG: function() {
        return this.hasImage() && /^svg/i.test(this.get("image.src").split(".").pop())
    },
    getNaturalSize: function(e) {
        var t = this.contentElement.find("img");
        if (t.length) {
            var i = {};
            if (!e && (i.width = parseInt(t.attr("data-natural-width"), 10),
            i.height = parseInt(t.attr("data-natural-height"), 10),
            i.width && i.height))
                return i;
            if (i.width = t.get(0).naturalWidth,
            i.height = t.get(0).naturalHeight,
            i.width && i.height)
                return t.attr({
                    "data-natural-width": i.width,
                    "data-natural-height": i.height
                }),
                i
        }
        return null
    },
    getAspectRatio: function(e) {
        var t = this.getNaturalSize(e);
        return t ? t.width / t.height : this._super()
    },
    syncAspectRatio: function(e) {
        "undefined" == typeof e && (e = !0);
        var t = this.getNaturalSize(e);
        if (t) {
            var i = this.measure(!0);
            this.resize({
                width: i.width,
                height: i.height,
                center: !0
            })
        }
    },
    paint: function() {
        this.domElement.find(".sl-block-placeholder, .sl-block-overlay-warning, .image-progress").remove(),
        this.isLoading() || this.isUploading() ? (this.contentElement.append(['<div class="editing-ui sl-block-overlay image-progress">', '<span class="spinner centered"></span>', "</div>"].join("")),
        SL.util.html.generateSpinners()) : this.hasLoadingFailed() ? (this.contentElement.append(['<div class="editing-ui sl-block-overlay sl-block-overlay-warning">', '<div class="overlay-content">Failed to load image.<br><button class="button white image-retry-button" style="margin-top: 10px;">Retry</button></div>', "</div>"].join("")),
        this.domElement.find(".image-retry-button").on("click", function() {
            this.setImageURL(this.getImageURL())
        }
        .bind(this))) : this.hasImage() || this.showPlaceholder();
        var e = this.contentElement.find("img");
        1 === e.length && "none" === e.css("display") && e.css("display", ""),
        this.syncZ()
    },
    paintInlineSVG: function() {
        this.isSVG() && this.get("attribute.data-inline-svg") ? (this.loadingSVG = !0,
        this.paint(),
        $.ajax({
            url: this.getImageURL() + "?t=" + Date.now(),
            type: "GET",
            dataType: "xml",
            context: this
        }).done(function(e) {
            var t = $(e).find("svg").first().get(0);
            if (t) {
                if (t.setAttribute("preserveAspectRatio", "xMidYMid meet"),
                !t.hasAttribute("viewBox")) {
                    var i = this.getNaturalSize();
                    i && t.setAttribute("viewBox", "0 0 " + i.width + " " + i.height)
                }
                $(t).find("style").remove(),
                this.contentElement.find("img").css("display", "none"),
                this.contentElement.find("svg").remove(),
                this.contentElement.append(t)
            }
        }).always(function() {
            this.loadingSVG = !1,
            this.paint(),
            this.imageStateChanged.dispatch()
        })) : (this.contentElement.find("img").css("display", ""),
        this.contentElement.find("svg").remove())
    },
    clear: function() {
        this.contentElement.find("img").remove(),
        this.paint(),
        this.imageStateChanged.dispatch()
    },
    browse: function() {
        var e = SL.popup.open(SL.components.medialibrary.MediaLibrary, {
            select: SL.models.Media.IMAGE
        });
        e.selected.addOnce(this.setImageModel.bind(this))
    },
    destroy: function() {
        this.intermediateModel && (this.intermediateModel.uploadCompleted.remove(this.onUploadCompleted),
        this.intermediateModel.uploadFailed.remove(this.onUploadFailed),
        this.intermediateModel = null),
        this.imageStateChanged.dispose(),
        this.imageStateChanged = null,
        this.imageURLChanged.dispose(),
        this.imageURLChanged = null,
        this._super()
    },
    onUploadCompleted: function() {
        var e = this.intermediateModel.get("url");
        this.intermediateModel = null,
        this.set("image.src", e),
        this.imageStateChanged.dispatch()
    },
    onUploadFailed: function() {
        this.intermediateModel = null,
        this.paint(),
        this.imageStateChanged.dispatch()
    },
    onDoubleClick: function() {
        this.browse()
    },
    onPropertyChanged: function(e) {
        "attribute.data-inline-svg" === e[0] && this.paintInlineSVG()
    }
}),
SL("editor.blocks").Line = SL.editor.blocks.Base.extend({
    init: function(e) {
        this._super("line", $.extend({
            minWidth: 1,
            minHeight: 1,
            horizontalResizing: !1,
            verticalResizing: !1
        }, e)),
        this.transform.destroy(),
        this.transform = new SL.editor.blocks.behavior.TransformLine(this),
        this.transform.transformStarted.add(this.onTransformStarted.bind(this)),
        this.transform.transformEnded.add(this.onTransformEnded.bind(this)),
        this.plug(SL.editor.blocks.plugin.Link)
    },
    setup: function() {
        this._super(),
        this.properties.attribute["data-line-style"] = {
            defaultValue: "solid",
            options: [{
                value: "solid"
            }, {
                value: "dotted"
            }, {
                value: "dashed"
            }]
        },
        this.properties.attribute["data-line-start-type"] = {
            defaultValue: "none",
            options: [{
                value: "none"
            }, {
                value: "line-arrow"
            }, {
                value: "arrow"
            }, {
                value: "circle"
            }, {
                value: "square"
            }]
        },
        this.properties.attribute["data-line-end-type"] = {
            defaultValue: "none",
            options: [{
                value: "none"
            }, {
                value: "line-arrow"
            }, {
                value: "arrow"
            }, {
                value: "circle"
            }, {
                value: "square"
            }]
        },
        this.properties.attribute["data-line-width"] = {
            unit: "px",
            type: "number",
            minValue: 1,
            maxValue: 50,
            defaultValue: SL.editor.blocks.Line.DEFAULT_LINE_WIDTH
        },
        this.properties.attribute["data-line-color"] = {
            defaultValue: SL.editor.blocks.Line.DEFAULT_COLOR
        },
        this.properties.attribute["data-line-x1"] = {
            type: "number",
            minValue: 0,
            maxValue: Number.MAX_VALUE,
            defaultValue: 0
        },
        this.properties.attribute["data-line-y1"] = {
            type: "number",
            minValue: 0,
            maxValue: Number.MAX_VALUE,
            defaultValue: 0
        },
        this.properties.attribute["data-line-x2"] = {
            type: "number",
            minValue: 0,
            maxValue: Number.MAX_VALUE,
            defaultValue: 0
        },
        this.properties.attribute["data-line-y2"] = {
            type: "number",
            minValue: 0,
            maxValue: Number.MAX_VALUE,
            defaultValue: 0
        }
    },
    bind: function() {
        this._super(),
        this.propertyChanged.add(this.onPropertyChanged.bind(this))
    },
    setDefaults: function() {
        this._super(),
        this.set({
            "attribute.data-line-x1": 0,
            "attribute.data-line-y1": 200,
            "attribute.data-line-x2": 200,
            "attribute.data-line-y2": 0,
            "attribute.data-line-color": this.getPropertyDefault("attribute.data-line-color"),
            "attribute.data-line-start-type": this.getPropertyDefault("attribute.data-line-start-type"),
            "attribute.data-line-end-type": this.getPropertyDefault("attribute.data-line-end-type")
        })
    },
    paint: function() {
        var e = this.getSVGElement();
        e.setAttribute("preserveAspectRatio", "xMidYMid"),
        e.innerHTML = "",
        SL.editor.blocks.Line.generate(e, {
            startType: this.get("attribute.data-line-start-type"),
            endType: this.get("attribute.data-line-end-type"),
            style: this.get("attribute.data-line-style"),
            color: this.get("attribute.data-line-color"),
            width: this.get("attribute.data-line-width"),
            x1: this.get("attribute.data-line-x1"),
            y1: this.get("attribute.data-line-y1"),
            x2: this.get("attribute.data-line-x2"),
            y2: this.get("attribute.data-line-y2")
        });
        var t = this.getViewBox();
        if (e.setAttribute("width", t.width),
        e.setAttribute("height", t.height),
        e.setAttribute("viewBox", [t.x, t.y, t.width, t.height].join(" ")),
        this.measurementsBeforeTransform) {
            var i = t.x - this.viewBoxBeforeTransform.x
              , n = t.y - this.viewBoxBeforeTransform.y;
            this.move(this.measurementsBeforeTransform.x + i, this.measurementsBeforeTransform.y + n)
        }
        this.transform && this.transform.layout()
    },
    resize: function() {
        this._super.apply(this, arguments),
        this.paint()
    },
    hitTest: function(e) {
        var t = this.getGlobalLinePoint(SL.editor.blocks.Line.POINT_1)
          , i = this.getGlobalLinePoint(SL.editor.blocks.Line.POINT_2)
          , n = SL.util.trig.isPointWithinRect(t.x, t.y, e) && SL.util.trig.isPointWithinRect(i.x, i.y, e);
        if (n)
            return !0;
        var r = [[{
            x: e.x,
            y: e.y
        }, {
            x: e.x + e.width,
            y: e.y
        }], [{
            x: e.x + e.width,
            y: e.y
        }, {
            x: e.x + e.width,
            y: e.y + e.height
        }], [{
            x: e.x,
            y: e.y + e.height
        }, {
            x: e.x + e.width,
            y: e.y + e.height
        }], [{
            x: e.x,
            y: e.y
        }, {
            x: e.x,
            y: e.y + e.height
        }]];
        return r.some(function(e) {
            return !!SL.util.trig.findLineIntersection(t, i, e[0], e[1])
        })
    },
    setGlobalLinePoint: function(e, t, i) {
        var n = this.getViewBox()
          , r = this.measure();
        e === SL.editor.blocks.Line.POINT_1 ? ("number" == typeof t && this.set("attribute.data-line-x1", t - (r.x - n.x)),
        "number" == typeof i && this.set("attribute.data-line-y1", i - (r.y - n.y))) : e === SL.editor.blocks.Line.POINT_2 && ("number" == typeof t && this.set("attribute.data-line-x2", t - (r.x - n.x)),
        "number" == typeof i && this.set("attribute.data-line-y2", i - (r.y - n.y)))
    },
    getGlobalLinePoint: function(e) {
        var t = this.getViewBox()
          , i = this.measure();
        return e === SL.editor.blocks.Line.POINT_1 ? {
            x: i.x - t.x + this.get("attribute.data-line-x1"),
            y: i.y - t.y + this.get("attribute.data-line-y1")
        } : e === SL.editor.blocks.Line.POINT_2 ? {
            x: i.x - t.x + this.get("attribute.data-line-x2"),
            y: i.y - t.y + this.get("attribute.data-line-y2")
        } : void 0
    },
    getOppositePointID: function(e) {
        return e === SL.editor.blocks.Line.POINT_1 ? SL.editor.blocks.Line.POINT_2 : SL.editor.blocks.Line.POINT_1
    },
    getViewBox: function() {
        var e = this.get("attribute.data-line-x1")
          , t = this.get("attribute.data-line-y1")
          , i = this.get("attribute.data-line-x2")
          , n = this.get("attribute.data-line-y2")
          , r = {
            x: Math.round(Math.min(e, i)),
            y: Math.round(Math.min(t, n))
        };
        return r.width = Math.max(Math.round(Math.max(e, i) - r.x), 1),
        r.height = Math.max(Math.round(Math.max(t, n) - r.y), 1),
        r
    },
    getSVGElement: function() {
        var e = this.contentElement.find("svg").get(0);
        return e || (e = document.createElementNS(SL.util.svg.NAMESPACE, "svg"),
        e.setAttribute("xmlns", SL.util.svg.NAMESPACE),
        e.setAttribute("version", "1.1"),
        this.contentElement.append(e)),
        e
    },
    getLineElement: function() {
        var e = this.getSVGElement()
          , t = e.querySelector("line");
        return t || (t = document.createElementNS(SL.util.svg.NAMESPACE, "line"),
        e.appendChild(t)),
        t
    },
    getToolbarOptions: function() {
        return [SL.editor.components.toolbars.groups.LineType, SL.editor.components.toolbars.options.LineStyle, SL.editor.components.toolbars.options.LineWidth, SL.editor.components.toolbars.options.LineColor, SL.editor.components.toolbars.options.Divider, SL.editor.components.toolbars.options.Opacity, SL.editor.components.toolbars.options.Divider, SL.editor.components.toolbars.groups.Link, SL.editor.components.toolbars.groups.Animation].concat(this._super())
    },
    onPropertyChanged: function() {
        this.paint()
    },
    onTransformStarted: function() {
        this.measurementsBeforeTransform = this.measure(),
        this.viewBoxBeforeTransform = this.getViewBox()
    },
    onTransformEnded: function() {
        this.measurementsBeforeTransform = null,
        this.viewBoxBeforeTransform = null
    }
}),
SL.editor.blocks.Line.DEFAULT_COLOR = "#000000",
SL.editor.blocks.Line.DEFAULT_LINE_WIDTH = 2,
SL.editor.blocks.Line.POINT_1 = "p1",
SL.editor.blocks.Line.POINT_2 = "p2",
SL.editor.blocks.Line.roundPoints = function() {
    for (var e = 0; e < arguments.length; e++)
        arguments[e].x = Math.round(arguments[e].x),
        arguments[e].y = Math.round(arguments[e].y)
}
,
SL.editor.blocks.Line.generate = function(e, t) {
    t = $.extend({
        color: SL.editor.blocks.Line.DEFAULT_COLOR,
        width: SL.editor.blocks.Line.DEFAULT_LINE_WIDTH,
        interactive: !0,
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 0
    }, t);
    var i;
    t.interactive && t.width < 15 && (i = document.createElementNS(SL.util.svg.NAMESPACE, "line"),
    i.setAttribute("stroke", "rgba(0,0,0,0)"),
    i.setAttribute("stroke-width", 15),
    e.appendChild(i));
    var n = {
        x: t.x1,
        y: t.y1
    }
      , r = {
        x: t.x2,
        y: t.y2
    }
      , o = Math.max(SL.util.trig.distanceBetween(n, r), 1)
      , s = 180 * (Math.atan2(r.y - n.y, r.x - n.x) + Math.PI / 2) / Math.PI;
    s = SL.util.math.limitDecimals(s, 3);
    var a = document.createElementNS(SL.util.svg.NAMESPACE, "line");
    if (a.setAttribute("stroke", t.color),
    a.setAttribute("stroke-width", t.width),
    e.appendChild(a),
    "dotted" === t.style) {
        var l = 2 * t.width;
        if (o > 2 * l) {
            var c = o / l;
            l *= c / Math.ceil(c)
        }
        a.setAttribute("stroke-dasharray", "0 " + l),
        a.setAttribute("stroke-linecap", "round")
    } else if ("dashed" === t.style) {
        var h = 3 * t.width
          , d = 3 * t.width;
        if (o > 2 * (h + d)) {
            var u = (o - d) / (h + d)
              , p = u / Math.ceil(u);
            h *= p,
            d *= p
        }
        a.setAttribute("stroke-dasharray", h + " " + d),
        a.removeAttribute("stroke-linecap")
    } else
        a.removeAttribute("stroke-dasharray"),
        a.removeAttribute("stroke-linecap");
    var g, m, f = 3 * t.width, b = f / 2, v = Math.max(f, 8), w = v / 2;
    "line-arrow" === t.startType && (n.x += (r.x - n.x) * (.25 * v / o),
    n.y += (r.y - n.y) * (.25 * v / o),
    SL.editor.blocks.Line.roundPoints(n, r),
    g = document.createElementNS(SL.util.svg.NAMESPACE, "path"),
    g.setAttribute("style", "fill: rgba(0,0,0,0);"),
    g.setAttribute("stroke", t.color),
    g.setAttribute("stroke-width", t.width),
    g.setAttribute("transform", "translate(" + n.x + "," + n.y + ") rotate(" + s + ")"),
    g.setAttribute("d", ["M", .75 * -v, .75 * -v, "L", 0, 0, "L", .75 * v, .75 * -v].join(" ")),
    e.appendChild(g)),
    "line-arrow" === t.endType && (r.x += (n.x - r.x) * (.25 * v / o),
    r.y += (n.y - r.y) * (.25 * v / o),
    SL.editor.blocks.Line.roundPoints(n, r),
    m = document.createElementNS(SL.util.svg.NAMESPACE, "path"),
    m.setAttribute("style", "fill: rgba(0,0,0,0);"),
    m.setAttribute("stroke", t.color),
    m.setAttribute("stroke-width", t.width),
    m.setAttribute("transform", "translate(" + r.x + "," + r.y + ") rotate(" + s + ")"),
    m.setAttribute("d", ["M", .75 * v, .75 * v, "L", 0, 0, "L", .75 * -v, .75 * v].join(" ")),
    e.appendChild(m)),
    "arrow" === t.startType && (n.x += (r.x - n.x) * (w / o),
    n.y += (r.y - n.y) * (w / o),
    SL.editor.blocks.Line.roundPoints(n, r),
    g = document.createElementNS(SL.util.svg.NAMESPACE, "polygon"),
    g.setAttribute("fill", t.color),
    g.setAttribute("transform", "translate(" + n.x + "," + n.y + ") rotate(" + s + ")"),
    g.setAttribute("points", SL.util.svg.pointsToPolygon([0, w, w, -w, -w, -w])),
    e.appendChild(g)),
    "arrow" === t.endType && (r.x += (n.x - r.x) * (w / o),
    r.y += (n.y - r.y) * (w / o),
    SL.editor.blocks.Line.roundPoints(n, r),
    m = document.createElementNS(SL.util.svg.NAMESPACE, "polygon"),
    m.setAttribute("fill", t.color),
    m.setAttribute("transform", "translate(" + r.x + "," + r.y + ") rotate(" + s + ")"),
    m.setAttribute("points", SL.util.svg.pointsToPolygon([0, -w, w, w, -w, w])),
    e.appendChild(m)),
    "circle" === t.startType && (n.x += (r.x - n.x) * (b / o),
    n.y += (r.y - n.y) * (b / o),
    SL.editor.blocks.Line.roundPoints(n, r),
    g = SL.util.svg.ellipse(f, f),
    g.setAttribute("cx", n.x),
    g.setAttribute("cy", n.y),
    g.setAttribute("fill", t.color),
    e.appendChild(g)),
    "circle" === t.endType && (r.x += (n.x - r.x) * (b / o),
    r.y += (n.y - r.y) * (b / o),
    SL.editor.blocks.Line.roundPoints(n, r),
    m = SL.util.svg.ellipse(f, f),
    m.setAttribute("cx", r.x),
    m.setAttribute("cy", r.y),
    m.setAttribute("fill", t.color),
    e.appendChild(m)),
    "square" === t.startType && (n.x += (r.x - n.x) * (b / o),
    n.y += (r.y - n.y) * (b / o),
    SL.editor.blocks.Line.roundPoints(n, r),
    g = SL.util.svg.rect(f, f),
    g.setAttribute("fill", t.color),
    g.setAttribute("x", -b),
    g.setAttribute("y", -b),
    g.setAttribute("transform", "translate(" + n.x + "," + n.y + ") rotate(" + s + ")"),
    e.appendChild(g)),
    "square" === t.endType && (r.x += (n.x - r.x) * (b / o),
    r.y += (n.y - r.y) * (b / o),
    SL.editor.blocks.Line.roundPoints(n, r),
    m = SL.util.svg.rect(f, f),
    m.setAttribute("fill", t.color),
    m.setAttribute("x", -b),
    m.setAttribute("y", -b),
    m.setAttribute("transform", "translate(" + r.x + "," + r.y + ") rotate(" + s + ")"),
    e.appendChild(m)),
    SL.editor.blocks.Line.roundPoints(n, r),
    t.width % 2 === 1 && (n.x += .5,
    n.y += .5,
    r.x += .5,
    r.y += .5),
    a.setAttribute("x1", n.x),
    a.setAttribute("y1", n.y),
    a.setAttribute("x2", r.x),
    a.setAttribute("y2", r.y),
    i && (i.setAttribute("x1", n.x),
    i.setAttribute("y1", n.y),
    i.setAttribute("x2", r.x),
    i.setAttribute("y2", r.y))
}
,
SL("editor.blocks").Math = SL.editor.blocks.Base.extend({
    init: function(e) {
        this._super("math", $.extend(e, {
            horizontalResizing: !1,
            verticalResizing: !1
        })),
        this.editingRequested = new signals.Signal
    },
    setup: function() {
        this._super(),
        this.properties.math = {
            value: {
                setter: this.setValue.bind(this),
                getter: this.getValue.bind(this)
            }
        }
    },
    paint: function() {
        if (this.domElement.find(".sl-block-placeholder, .sl-block-content-preview, .sl-block-overlay-warning").remove(),
        this.isEmpty())
            this.domElement.addClass("is-empty"),
            this.showPlaceholder(),
            this.getMathOutputElement().empty();
        else
            try {
                this.domElement.removeClass("is-empty"),
                katex.render(this.getMathInputElement().text(), this.getMathOutputElement().get(0))
            } catch (e) {
                this.domElement.addClass("is-empty"),
                this.contentElement.append(['<div class="editing-ui sl-block-overlay sl-block-overlay-warning">', '<div class="overlay-content">', '<span class="icon i-info" data-tooltip="' + e.message + '" data-tooltip-maxwidth="500"></span>', "An error occurred while parsing your equation.", "</div>", "</div>"].join(""))
            }
        this.syncZ()
    },
    setDefaults: function() {
        this._super()
    },
    setValue: function(e) {
        this.getMathInputElement().html(e),
        this.paint()
    },
    getValue: function() {
        return this.getMathInputElement().text()
    },
    getMathInputElement: function() {
        var e = this.contentElement.find(".math-input");
        return 0 === e.length && (e = $('<div class="math-input"></div>').appendTo(this.contentElement)),
        e
    },
    getMathOutputElement: function() {
        this.contentElement.find(".math-output:gt(0)").remove();
        var e = this.contentElement.find(".math-output");
        return 0 === e.length && (e = $('<div class="math-output"></div>').appendTo(this.contentElement)),
        e
    },
    getToolbarOptions: function() {
        return [SL.editor.components.toolbars.options.MathInput, SL.editor.components.toolbars.options.MathSize, SL.editor.components.toolbars.options.Divider, SL.editor.components.toolbars.options.MathColor, SL.editor.components.toolbars.options.BackgroundColor, SL.editor.components.toolbars.options.Opacity, SL.editor.components.toolbars.options.Padding, SL.editor.components.toolbars.options.Rotation, SL.editor.components.toolbars.options.Divider, SL.editor.components.toolbars.groups.BorderCSS, SL.editor.components.toolbars.groups.Animation].concat(this._super())
    },
    isEmpty: function() {
        return !this.isset("math.value")
    },
    onDoubleClick: function(e) {
        this._super(e),
        this.editingRequested.dispatch()
    },
    onKeyDown: function(e) {
        this._super(e),
        13 !== e.keyCode || SL.util.isTypingEvent(e) || (this.editingRequested.dispatch(),
        e.preventDefault())
    }
}),
SL("editor.blocks.plugin").HTML = Class.extend({
    init: function(e) {
        this.block = e,
        this.block.editHTML = function() {
            var e = SL.popup.open(SL.components.popup.EditHTML, {
                html: this.contentElement.html()
            });
            e.saved.add(function(e) {
                this.setCustomHTML(e)
            }
            .bind(this))
        }
        .bind(e),
        this.block.setCustomHTML = function(e) {
            this.contentElement.attr("data-has-custom-html", ""),
            this.contentElement.html(e)
        }
        .bind(e),
        this.block.setHTML = function(e) {
            this.contentElement.html(e)
        }
        .bind(e),
        this.block.hasCustomHTML = function() {
            return this.contentElement.get(0).hasAttribute("data-has-custom-html")
        }
        .bind(e)
    },
    destroy: function() {
        delete this.block.editHTML,
        delete this.block.setCustomHTML,
        delete this.block.hasCustomHTML
    }
}),
SL("editor.blocks.plugin").Link = Class.extend({
    init: function(e) {
        this.block = e,
        this.block.setLinkURL = function(e) {
            "string" == typeof e ? (this.isLinked() === !1 && this.changeContentElementType("a"),
            this.contentElement.attr("href", e),
            this.contentElement.attr("target", "_blank"),
            /^#\/\d/.test(e) && this.contentElement.removeAttr("target")) : (this.contentElement.removeAttr("target"),
            this.changeContentElementType(this.options.contentElementType))
        }
        .bind(e),
        this.block.getLinkURL = function() {
            return this.contentElement.attr("href")
        }
        .bind(e),
        this.block.isLinked = function() {
            return this.contentElement.is("a")
        }
        .bind(e),
        this.block.properties.link = {
            href: {
                setter: this.block.setLinkURL,
                getter: this.block.getLinkURL,
                checker: this.block.isLinked
            }
        }
    },
    destroy: function() {
        delete this.block.properties.link,
        delete this.block.setLinkURL,
        delete this.block.getLinkURL,
        delete this.block.isLinked
    }
}),
SL("editor.blocks").Shape = SL.editor.blocks.Base.extend({
    init: function(e) {
        this._super("shape", $.extend({
            minWidth: 4,
            minHeight: 4
        }, e)),
        this.plug(SL.editor.blocks.plugin.Link)
    },
    setup: function() {
        this._super(),
        this.properties.attribute["data-shape-type"] = {
            defaultValue: "rect",
            options: [{
                value: "rect"
            }, {
                value: "circle"
            }, {
                value: "diamond"
            }, {
                value: "octagon"
            }, {
                value: "triangle-up"
            }, {
                value: "triangle-down"
            }, {
                value: "triangle-left"
            }, {
                value: "triangle-right"
            }, {
                value: "arrow-up"
            }, {
                value: "arrow-down"
            }, {
                value: "arrow-left"
            }, {
                value: "arrow-right"
            }]
        };
        for (var e in SL.util.svg.SYMBOLS)
            this.properties.attribute["data-shape-type"].options.push({
                value: "symbol-" + e
            });
        this.properties.attribute["data-shape-stretch"] = {
            defaultValue: !0
        },
        this.properties.attribute["data-shape-fill-color"] = {
            defaultValue: "#000000"
        },
        this.properties.attribute["data-shape-stroke-color"] = {},
        this.properties.attribute["data-shape-stroke-width"] = {
            type: "number",
            decimals: 0,
            minValue: 1,
            maxValue: 50,
            defaultValue: 0
        }
    },
    bind: function() {
        this._super(),
        this.propertyChanged.add(this.onPropertyChanged.bind(this))
    },
    setDefaults: function() {
        this._super(),
        this.resize({
            width: 300,
            height: 300
        }),
        this.set("attribute.data-shape-type", this.getPropertyDefault("attribute.data-shape-type")),
        this.set("attribute.data-shape-fill-color", this.getPropertyDefault("attribute.data-shape-fill-color")),
        this.set("attribute.data-shape-stretch", this.getPropertyDefault("attribute.data-shape-stretch"))
    },
    paint: function() {
        var e = this.get("attribute.data-shape-type")
          , t = this.get("attribute.data-shape-fill-color")
          , i = this.get("attribute.data-shape-stroke-color")
          , n = this.get("attribute.data-shape-stroke-width")
          , r = this.get("attribute.data-shape-stretch")
          , o = this.domElement.width()
          , s = this.domElement.height();
        r || (o = s = Math.min(o, s));
        var a = SL.editor.blocks.Shape.shapeFromType(e, o, s);
        if (a) {
            var l = this.hasStroke()
              , c = this.supportsStroke(a)
              , h = this.getSVGElement();
            if (h.setAttribute("width", "100%"),
            h.setAttribute("height", "100%"),
            h.setAttribute("preserveAspectRatio", r ? "none" : "xMidYMid"),
            h.innerHTML = "",
            c && l) {
                var d = SL.util.string.uniqueID("shape-mask-")
                  , u = document.createElementNS(SL.util.svg.NAMESPACE, "defs")
                  , p = document.createElementNS(SL.util.svg.NAMESPACE, "clipPath");
                p.setAttribute("id", d),
                p.appendChild($(a).clone().get(0)),
                u.appendChild(p),
                h.appendChild(u),
                a.setAttribute("clip-path", "url(#" + d + ")")
            }
            a.setAttribute("class", "shape-element"),
            t && a.setAttribute("fill", t),
            c && i && a.setAttribute("stroke", i),
            c && n && a.setAttribute("stroke-width", 2 * n),
            h.appendChild(a);
            var g = SL.util.svg.boundingBox(a);
            h.setAttribute("viewBox", [Math.round(g.x) || 0, Math.round(g.y) || 0, Math.round(g.width) || 32, Math.round(g.height) || 32].join(" "))
        }
    },
    resize: function() {
        this._super.apply(this, arguments),
        this.paint()
    },
    toggleStroke: function() {
        this.hasStroke() ? this.unset(["attribute.data-shape-stroke-color", "attribute.data-shape-stroke-width"]) : this.set({
            "attribute.data-shape-stroke-color": "#000000",
            "attribute.data-shape-stroke-width": 1
        }),
        this.paint()
    },
    hasStroke: function() {
        return this.isset("attribute.data-shape-stroke-color") || this.isset("attribute.data-shape-stroke-width")
    },
    supportsStroke: function(e) {
        return $(e || this.getSVGShapeElement()).is("rect, circle, ellipse, polygon")
    },
    getSVGElement: function() {
        var e = this.contentElement.find("svg").get(0);
        return e || (e = document.createElementNS(SL.util.svg.NAMESPACE, "svg"),
        e.setAttribute("xmlns", SL.util.svg.NAMESPACE),
        e.setAttribute("version", "1.1"),
        this.contentElement.append(e)),
        e
    },
    getSVGShapeElement: function() {
        return $(this.getSVGElement().querySelector(".shape-element"))
    },
    getToolbarOptions: function() {
        return [SL.editor.components.toolbars.options.ShapeType, SL.editor.components.toolbars.options.ShapeStretch, SL.editor.components.toolbars.options.ShapeFillColor, SL.editor.components.toolbars.options.Divider, SL.editor.components.toolbars.options.Opacity, SL.editor.components.toolbars.options.Rotation, SL.editor.components.toolbars.options.Divider, SL.editor.components.toolbars.groups.BorderSVG, SL.editor.components.toolbars.groups.Link, SL.editor.components.toolbars.groups.Animation].concat(this._super())
    },
    onPropertyChanged: function() {
        this.paint()
    }
}),
SL.editor.blocks.Shape.shapeFromType = function(e, t, i) {
    return t = t || 32,
    i = i || 32,
    /^symbol\-/.test(e) ? SL.util.svg.symbol(e.replace(/^symbol\-/, "")) : "rect" === e ? SL.util.svg.rect(t, i) : "circle" === e ? SL.util.svg.ellipse(t, i) : "diamond" === e ? SL.util.svg.polygon(t, i, 4) : "octagon" === e ? SL.util.svg.polygon(t, i, 8) : "triangle-up" === e ? SL.util.svg.triangleUp(t, i) : "triangle-down" === e ? SL.util.svg.triangleDown(t, i) : "triangle-left" === e ? SL.util.svg.triangleLeft(t, i) : "triangle-right" === e ? SL.util.svg.triangleRight(t, i) : "arrow-up" === e ? SL.util.svg.arrowUp(t, i) : "arrow-down" === e ? SL.util.svg.arrowDown(t, i) : "arrow-left" === e ? SL.util.svg.arrowLeft(t, i) : "arrow-right" === e ? SL.util.svg.arrowRight(t, i) : void 0
}
,
SL("editor.blocks").Snippet = SL.editor.blocks.Base.extend({
    init: function(e) {
        this._super("snippet", $.extend({}, e)),
        this.plug(SL.editor.blocks.plugin.HTML)
    },
    bind: function() {
        this._super(),
        this.onEditingKeyUp = this.onEditingKeyUp.bind(this),
        this.onEditingKeyDown = this.onEditingKeyDown.bind(this),
        this.onEditingInput = this.onEditingInput.bind(this),
        this.propertyChanged.add(this.onPropertyChanged.bind(this))
    },
    blur: function() {
        this._super(),
        this.disableEditing()
    },
    setDefaults: function() {
        this._super(),
        this.resize({
            width: SL.editor.blocks.Snippet.DEFAULT_WIDTH,
            height: SL.editor.blocks.Snippet.DEFAULT_HEIGHT
        })
    },
    resizeToFitContent: function() {
        this.domElement.css("width", "auto");
        var e = Math.min(this.domElement.outerWidth(), SL.view.getSlideSize().width);
        (0 === e || isNaN(e)) && (e = SL.editor.blocks.Snippet.DEFAULT_WIDTH),
        this.domElement.css("width", e),
        this.domElement.css("height", "auto");
        var t = Math.min(this.domElement.outerHeight(), SL.view.getSlideSize().height);
        (0 === t || isNaN(t)) && (t = SL.editor.blocks.Snippet.DEFAULT_HEIGHT),
        this.domElement.css("height", t)
    },
    getToolbarOptions: function() {
        return [SL.editor.components.toolbars.options.TextAlign, SL.editor.components.toolbars.options.TextSize, SL.editor.components.toolbars.options.LineHeight, SL.editor.components.toolbars.options.LetterSpacing, SL.editor.components.toolbars.options.Divider, SL.editor.components.toolbars.options.TextColor, SL.editor.components.toolbars.options.BackgroundColor, SL.editor.components.toolbars.options.Opacity, SL.editor.components.toolbars.options.Padding, SL.editor.components.toolbars.options.Rotation, SL.editor.components.toolbars.options.Divider, SL.editor.components.toolbars.groups.BorderCSS, SL.editor.components.toolbars.groups.Animation].concat(this._super())
    },
    enableEditing: function() {
        this.isEditingText() || (this.contentElement.attr("contenteditable", ""),
        this.domElement.addClass("is-editing"),
        this.contentElement.on("keyup", this.onEditingKeyUp),
        this.contentElement.on("keydown", this.onEditingKeyDown),
        this.contentElement.on("input", this.onEditingInput),
        this.editor = CKEDITOR.inline(this.contentElement.get(0), {
            allowedContent: !0
        }),
        this.editor.on("instanceReady", function() {
            this.editor.focus();
            var e = this.editor.createRange();
            e.moveToElementEditEnd(this.editor.editable()),
            e.select()
        }
        .bind(this)))
    },
    disableEditing: function() {
        this.contentElement.removeAttr("contenteditable").blur(),
        this.domElement.removeClass("is-editing"),
        this.contentElement.off("keyup", this.onEditingKeyUp),
        this.contentElement.off("keydown", this.onEditingKeyDown),
        this.contentElement.off("input", this.onEditingInput),
        this.editor && (this.editor.destroy(),
        this.editor = null),
        SL.editor.controllers.Blocks.afterBlockTextSaved(this.contentElement)
    },
    isEditingText: function() {
        return this.domElement.hasClass("is-editing")
    },
    toggleAttributeWhen: function(e, t) {
        t ? this.contentElement.attr(e, "") : this.contentElement.removeAttr(e)
    },
    onDoubleClick: function(e) {
        this._super(e),
        SL.view.isEditing() && this.enableEditing()
    },
    onKeyDown: function(e) {
        this._super(e),
        13 === e.keyCode ? this.isEditingText() || SL.util.isTypingEvent(e) ? e.metaKey && this.disableEditing() : (e.preventDefault(),
        this.enableEditing()) : 27 === e.keyCode && (e.preventDefault(),
        this.disableEditing())
    },
    onEditingKeyUp: function() {
        SL.editor.controllers.Blocks.afterBlockTextInput()
    },
    onEditingKeyDown: function() {
        SL.editor.controllers.Blocks.afterBlockTextInput()
    },
    onEditingInput: function() {
        setTimeout(function() {
            SL.editor.controllers.Blocks.afterBlockTextInput()
        }, 1)
    },
    onPropertyChanged: function(e) {
        -1 !== e.indexOf("style.letter-spacing") && this.toggleAttributeWhen("data-has-letter-spacing", this.isset("style.letter-spacing")),
        -1 !== e.indexOf("style.line-height") && this.toggleAttributeWhen("data-has-line-height", this.isset("style.line-height"))
    }
}),
SL.editor.blocks.Snippet.DEFAULT_WIDTH = 300,
SL.editor.blocks.Snippet.DEFAULT_HEIGHT = 300,
SL("editor.blocks").Table = SL.editor.blocks.Base.extend({
    init: function(e) {
        this._super("table", $.extend({
            minWidth: 100,
            verticalResizing: !1
        }, e)),
        e && e.rows && this.setRows(e.rows),
        this.setupContextMenu()
    },
    setup: function() {
        this._super(),
        this.tableSizeChanged = new signals.Signal,
        this.tableHeaderChanged = new signals.Signal,
        this.properties.attribute["data-table-cols"] = {
            type: "number",
            decimals: 0,
            minValue: 1,
            maxValue: 10,
            defaultValue: 3
        },
        this.properties.attribute["data-table-rows"] = {
            type: "number",
            decimals: 0,
            minValue: 1,
            maxValue: 18,
            defaultValue: 3
        },
        this.properties.attribute["data-table-padding"] = {
            type: "number",
            unit: "px",
            decimals: 0,
            minValue: 0,
            maxValue: 30,
            defaultValue: 5
        },
        this.properties.attribute["data-table-has-header"] = {
            defaultValue: !0
        },
        this.properties.attribute["data-table-border-width"] = {
            type: "number",
            unit: "px",
            decimals: 0,
            minValue: 0,
            maxValue: 20,
            defaultValue: 1
        },
        this.properties.attribute["data-table-border-color"] = {},
        this.repaintProperties = ["attribute.data-table-cols", "attribute.data-table-rows", "attribute.data-table-padding", "attribute.data-table-has-header", "attribute.data-table-border-width", "attribute.data-table-border-color"]
    },
    setupContextMenu: function() {
        this.contextMenu = new SL.components.ContextMenu({
            anchor: this.contentElement,
            options: [{
                label: "Insert row above",
                callback: this.onInsertRowAbove.bind(this),
                filter: function() {
                    return this.getTableRowCount() < this.getPropertySettings("attribute.data-table-rows").maxValue
                }
                .bind(this)
            }, {
                label: "Insert row below",
                callback: this.onInsertRowBelow.bind(this),
                filter: function() {
                    return this.getTableRowCount() < this.getPropertySettings("attribute.data-table-rows").maxValue
                }
                .bind(this)
            }, {
                label: "Insert column left",
                callback: this.onInsertColLeft.bind(this),
                filter: function() {
                    return this.getTableColCount() < this.getPropertySettings("attribute.data-table-cols").maxValue
                }
                .bind(this)
            }, {
                label: "Insert column right",
                callback: this.onInsertColRight.bind(this),
                filter: function() {
                    return this.getTableColCount() < this.getPropertySettings("attribute.data-table-cols").maxValue
                }
                .bind(this)
            }, {
                type: "divider"
            }, {
                label: "Delete row",
                callback: this.onDeleteRow.bind(this),
                filter: function() {
                    return this.getTableRowCount() > this.getPropertySettings("attribute.data-table-rows").minValue
                }
                .bind(this)
            }, {
                label: "Delete column",
                callback: this.onDeleteCol.bind(this),
                filter: function() {
                    return this.getTableColCount() > this.getPropertySettings("attribute.data-table-cols").minValue
                }
                .bind(this)
            }]
        }),
        this.contextMenu.shown.add(this.onContextMenuShown.bind(this)),
        this.contextMenu.hidden.add(this.onContextMenuHidden.bind(this)),
        this.contextMenu.destroyed.add(this.onContextMenuHidden.bind(this))
    },
    bind: function() {
        this._super(),
        this.onEditingKeyUp = this.onEditingKeyUp.bind(this),
        this.onEditingKeyDown = this.onEditingKeyDown.bind(this),
        this.onEditingInput = this.onEditingInput.bind(this),
        this.onCellFocused = this.onCellFocused.bind(this),
        this.onCellMouseOver = this.onCellMouseOver.bind(this),
        this.propertyChanged.add(this.onPropertyChanged.bind(this))
    },
    blur: function() {
        this._super(),
        this.isEditingText() && this.disableEditing()
    },
    setDefaults: function() {
        this._super(),
        this.resize({
            width: SL.editor.blocks.Table.DEFAULT_WIDTH,
            height: SL.editor.blocks.Table.DEFAULT_HEIGHT
        })
    },
    getToolbarOptions: function() {
        return [SL.editor.components.toolbars.groups.TableSize, SL.editor.components.toolbars.options.TableHasHeader, SL.editor.components.toolbars.options.Divider, SL.editor.components.toolbars.options.TablePadding, SL.editor.components.toolbars.options.TableBorderWidth, SL.editor.components.toolbars.options.TableBorderColor, SL.editor.components.toolbars.options.Divider, SL.editor.components.toolbars.options.TextAlign, SL.editor.components.toolbars.options.TextSize, SL.editor.components.toolbars.options.TextColor, SL.editor.components.toolbars.options.Divider, SL.editor.components.toolbars.options.BackgroundColor, SL.editor.components.toolbars.options.Opacity, SL.editor.components.toolbars.options.Rotation, SL.editor.components.toolbars.options.Divider, SL.editor.components.toolbars.groups.Animation].concat(this._super())
    },
    getTableElement: function() {
        var e = this.contentElement.find("table");
        0 === e.length && (e = $("<table>").appendTo(this.contentElement));
        var t = e.find("tbody");
        return 0 === t.length && (t = $("<tbody>").appendTo(e)),
        e
    },
    getTableRowCount: function() {
        return this.getTableElement().find("tr").length
    },
    getTableColCount: function() {
        return this.getTableElement().find("tr").first().find("td, th").length
    },
    getTableBorderColor: function() {
        return this.getTableElement().find("td, th").css("border-top-color")
    },
    resize: function() {
        this._super.apply(this, arguments),
        this.paint()
    },
    paint: function() {
        this._super.apply(this, arguments);
        var e = this.getTableElement()
          , t = this.get("attribute.data-table-rows")
          , i = this.get("attribute.data-table-cols")
          , n = t - e.find("tr").length;
        if (n > 0)
            for (var r = 0; n > r; r++)
                e.append("<tr></tr>");
        else
            0 > n && e.find("tr:gt(" + (t - 1) + ")").remove();
        e.find("tr").each(function(e, t) {
            var n = $(t)
              , r = i - n.find("td, th").length;
            if (r > 0)
                for (var o = 0; r > o; o++)
                    this.backfill($("<td></td>").appendTo(n));
            else if (0 > r) {
                var s = i - 1;
                n.find("td:gt(" + s + "), th:gt(" + s + ")").remove()
            }
        }
        .bind(this)),
        this.get("attribute.data-table-has-header") ? e.find("tr").first().find("td").changeElementType("th") : e.find("tr").first().find("th").changeElementType("td"),
        e.find("td, th").css({
            padding: this.isset("attribute.data-table-padding") ? this.get("attribute.data-table-padding") : "",
            "border-width": this.isset("attribute.data-table-border-width") ? this.get("attribute.data-table-border-width") : "",
            "border-color": this.isset("attribute.data-table-border-color") ? this.get("attribute.data-table-border-color") : ""
        }),
        e.find("td:last-child, th:last-child").css("width", ""),
        this.refreshMinWidth(),
        this.paintResizeHandles()
    },
    paintResizeHandles: function() {
        var e = []
          , t = this.getTableElement()
          , i = Math.floor(this.get("attribute.data-table-border-width") / 2);
        t.find("tr").first().find("td:not(:last), th:not(:last)").each(function(t, n) {
            var r = this.contentElement.find('.sl-table-column-resizer[data-column-index="' + t + '"]');
            0 === r.length && (r = $('<div class="editing-ui sl-table-column-resizer" data-column-index="' + t + '"></div>'),
            r.on("vmousedown", this.onResizeHandleMouseDOwn.bind(this)),
            r.on("dblclick", this.onResizeHandleDoubleClick.bind(this)),
            r.appendTo(this.contentElement)),
            r.css("left", n.offsetLeft + n.offsetWidth + i),
            e.push(t)
        }
        .bind(this)),
        this.contentElement.find(".sl-table-column-resizer").each(function() {
            -1 === e.indexOf(parseInt(this.getAttribute("data-column-index"), 10)) && $(this).remove()
        })
    },
    onResizeHandleMouseDOwn: function(e) {
        e.preventDefault();
        var t = this.getTableElement()
          , i = $(e.currentTarget)
          , n = parseInt(i.attr("data-column-index"), 10)
          , r = t.find("td:eq(" + n + "), th:eq(" + n + ")").first()
          , o = this.domElement.offset().left
          , s = r.position().left
          , a = s + SL.editor.blocks.Table.MIN_COL_WIDTH
          , l = this.measure().width;
        i.addClass("is-dragging"),
        l -= this.getMinWidthFromCells(t.find("tr:first-child td:gt(" + n + "), th:gt(" + n + ")"));
        var c = function(e) {
            var i = n + 1;
            t.find("td:nth-child(" + i + "), th:nth-child(" + i + ")").css({
                width: Math.round(Math.max(Math.min(e.clientX - o, l), a) - s)
            }),
            this.paintResizeHandles()
        }
        .bind(this)
          , h = function() {
            i.removeClass("is-dragging"),
            $(document).off("vmousemove", c),
            $(document).off("vmouseup", h)
        }
        .bind(this);
        $(document).on("vmousemove", c),
        $(document).on("vmouseup", h)
    },
    onResizeHandleDoubleClick: function(e) {
        var t = parseInt($(e.currentTarget).attr("data-column-index"), 10);
        this.getTableElement().find("td:eq(" + t + "), th:eq(" + t + ")").css("width", ""),
        this.paintResizeHandles()
    },
    enableEditing: function(e) {
        if (!this.isEditingText()) {
            this.domElement.addClass("is-editing"),
            this.contentElement.on("keyup", this.onEditingKeyUp),
            this.contentElement.on("keydown", this.onEditingKeyDown),
            this.contentElement.on("input", this.onEditingInput);
            var t = this.contentElement.find("td, th");
            t.wrapInner("<div contenteditable>"),
            t.find("[contenteditable]").on("mouseover", this.onCellMouseOver).on("focus", this.onCellFocused),
            e = e || this.contentElement.find("td, th").first(),
            this.enableEditingOfCell(e, !0),
            e.find(">[contenteditable]").focus()
        }
        this.paint()
    },
    enableEditingOfCell: function(e, t) {
        if (e) {
            var i = e.find(">[contenteditable]").first()
              , n = i.data("ckeditor");
            n || (n = CKEDITOR.inline(i.get(0), this.getEditorOptions(e)),
            i.data("ckeditor", n),
            t && n.on("instanceReady", function() {
                SL.util.selection.moveCursorToEnd(i.get(0))
            }
            .bind(this)),
            SL.editor.controllers.Capabilities.isTouchEditor() && window.scrollTo(0, Math.max(e.offset().top - 100, 0)))
        }
    },
    disableEditing: function() {
        this.domElement.removeClass("is-editing"),
        this.contentElement.off("keyup", this.onEditingKeyUp),
        this.contentElement.off("keydown", this.onEditingKeyDown),
        this.contentElement.off("input", this.onEditingInput),
        this.getTableElement().find("td>[contenteditable], th>[contenteditable]").each(function(e, t) {
            var i = $(t);
            i.data("ckeditor") && (i.data("ckeditor").destroy(),
            i.data("ckeditor", "")),
            t.parentNode.innerHTML = t.innerHTML
        }),
        this.contentElement.find("td, th").off("mouseover", this.onCellMouseOver).off("focus", this.onCellFocused).blur(),
        SL.util.selection.clear(),
        this.paint(),
        SL.editor.controllers.Blocks.afterBlockTextSaved(this.contentElement)
    },
    isEditingText: function() {
        return this.domElement.hasClass("is-editing")
    },
    enableBackfill: function() {
        this.backfillData = [],
        this.getTableElement().find("tr").each(function(e, t) {
            $(t).find("td, th").each(function(t, i) {
                this.backfillData[t] = this.backfillData[t] || [],
                this.backfillData[t][e] = i.innerHTML
            }
            .bind(this))
        }
        .bind(this))
    },
    disableBackfill: function() {
        this.backfillData = null
    },
    backfill: function(e) {
        if (this.backfillData && this.backfillData.length) {
            var t = e.index()
              , i = e.parent().index();
            if (this.backfillData[t]) {
                var n = this.backfillData[t][i];
                n && e.html(n)
            }
        }
    },
    setRows: function(e) {
        var t = 0;
        e.forEach(function(e) {
            t = Math.max(e.length, t)
        }),
        this.set("attribute.data-table-rows", e.length),
        this.set("attribute.data-table-cols", t),
        this.getTableElement().find("tr").each(function(t) {
            $(this).find("th, td").each(function(i) {
                $(this).text(e[t][i] || "")
            })
        })
    },
    getCellAtPoint: function(e, t) {
        var i;
        return this.contentElement.find("td, th").each(function(n, r) {
            var o = r.getBoundingClientRect();
            e > o.left && e < o.right && t > o.top && t < o.bottom && (i = r)
        }
        .bind(this)),
        i
    },
    getRowAtPoint: function(e, t) {
        return $(this.getCellAtPoint(e, t)).parents("tr").get(0)
    },
    getEditorOptions: function(e) {
        var t = {
            enterMode: CKEDITOR.ENTER_BR,
            autoParagraph: !1,
            allowedContent: {
                "strong em u s del ins": {
                    styles: "text-align"
                }
            },
            floatSpaceDockedOffsetX: -this.get("attribute.data-table-padding"),
            floatSpaceDockedOffsetY: this.get("attribute.data-table-padding")
        };
        return t.toolbar = e.is("th") ? [["Italic", "Underline", "Strike"]] : [["Bold", "Italic", "Underline", "Strike"]],
        t
    },
    propagateDOMTableSize: function() {
        this.set({
            "attribute.data-table-rows": this.getTableElement().find("tr").length,
            "attribute.data-table-cols": this.getTableElement().find("tr").first().find("td, th").length
        }),
        this.tableSizeChanged.dispatch()
    },
    refreshMinWidth: function() {
        this.options.minWidth = this.getMinWidthFromCells(this.getTableElement().find("tr:first-child td, tr:first-child th"))
    },
    getMinWidthFromCells: function(e) {
        var t = 0;
        return e.each(function() {
            t += "string" == typeof this.style.width && this.style.width.length ? parseInt(this.style.width, 10) : SL.editor.blocks.Table.MIN_COL_WIDTH
        }),
        t
    },
    destroy: function() {
        this.isEditingText() && this.disableEditing(),
        this.contextMenu.destroy(),
        this.tableSizeChanged.dispose(),
        this.tableSizeChanged = null,
        this.tableHeaderChanged.dispose(),
        this.tableHeaderChanged = null,
        this._super()
    },
    onDoubleClick: function(e) {
        this._super(e),
        SL.view.isEditing() && this.enableEditing($(this.getCellAtPoint(e.clientX, e.clientY)))
    },
    onCellMouseOver: function(e) {
        var t = $(e.currentTarget).parent();
        t.length && this.enableEditingOfCell(t)
    },
    onCellFocused: function(e) {
        var t = $(e.currentTarget).parent();
        if (t.length) {
            var i = "number" == typeof this.lastTabTime && Date.now() - this.lastTabTime < 100;
            this.enableEditingOfCell(t, i)
        }
    },
    onKeyDown: function(e) {
        this._super(e),
        13 === e.keyCode ? this.isEditingText() || SL.util.isTypingEvent(e) ? e.metaKey && this.disableEditing() : (e.preventDefault(),
        this.enableEditing()) : 27 === e.keyCode ? (e.preventDefault(),
        this.disableEditing()) : 9 === e.keyCode && (this.lastTabTime = Date.now())
    },
    onEditingKeyUp: function() {
        SL.editor.controllers.Blocks.afterBlockTextInput()
    },
    onEditingKeyDown: function() {
        SL.editor.controllers.Blocks.afterBlockTextInput()
    },
    onEditingInput: function() {
        setTimeout(function() {
            SL.editor.controllers.Blocks.afterBlockTextInput()
        }, 1)
    },
    onPropertyChanged: function(e) {
        var t = e.some(function(e) {
            return -1 !== this.repaintProperties.indexOf(e)
        }
        .bind(this));
        if (t && this.paint(),
        -1 !== e.indexOf("style.color")) {
            var i = this.contentElement.get(0);
            i.style.display = "none",
            i.offsetHeight,
            i.style.display = ""
        }
        -1 !== e.indexOf("attribute.data-table-has-header") && this.tableHeaderChanged.dispatch()
    },
    onContextMenuShown: function(e) {
        var t = $(this.getCellAtPoint(e.clientX, e.clientY));
        t.length && (t.addClass("context-menu-is-open"),
        this.isEditingText() && this.disableEditing())
    },
    onContextMenuHidden: function() {
        this.getTableElement().find(".context-menu-is-open").removeClass("context-menu-is-open")
    },
    onInsertRowAbove: function(e) {
        var t = $(this.getRowAtPoint(e.clientX, e.clientY));
        if (t.length) {
            var i = t.clone();
            i.children().empty(),
            0 === t.index() && (t.find("th").changeElementType("td"),
            i.find("td").changeElementType("th")),
            t.before(i),
            this.propagateDOMTableSize()
        }
    },
    onInsertRowBelow: function(e) {
        var t = $(this.getRowAtPoint(e.clientX, e.clientY));
        t.length && (t.after("<tr>"),
        this.propagateDOMTableSize())
    },
    onDeleteRow: function(e) {
        var t = $(this.getRowAtPoint(e.clientX, e.clientY));
        t.length && (t.remove(),
        this.propagateDOMTableSize())
    },
    onInsertColLeft: function(e) {
        var t = $(this.getCellAtPoint(e.clientX, e.clientY));
        if (t.length) {
            var i = t.index();
            -1 !== i && (this.getTableElement().find("td:nth-child(" + (i + 1) + ")").before("<td>"),
            this.getTableElement().find("th:nth-child(" + (i + 1) + ")").before("<th>"),
            this.propagateDOMTableSize())
        }
    },
    onInsertColRight: function(e) {
        var t = $(this.getCellAtPoint(e.clientX, e.clientY));
        if (t.length) {
            var i = t.index();
            -1 !== i && (this.getTableElement().find("td:nth-child(" + (i + 1) + ")").after("<td>"),
            this.getTableElement().find("th:nth-child(" + (i + 1) + ")").after("<th>"),
            this.propagateDOMTableSize())
        }
    },
    onDeleteCol: function(e) {
        var t = $(this.getCellAtPoint(e.clientX, e.clientY));
        if (t.length) {
            var i = t.index();
            -1 !== i && (this.getTableElement().find("td:nth-child(" + (i + 1) + "), th:nth-child(" + (i + 1) + ")").remove(),
            this.propagateDOMTableSize())
        }
    }
}),
SL.editor.blocks.Table.DEFAULT_WIDTH = 800,
SL.editor.blocks.Table.DEFAULT_HEIGHT = 400,
SL.editor.blocks.Table.MIN_COL_WIDTH = 40,
SL("editor.blocks").Text = SL.editor.blocks.Base.extend({
    init: function(e) {
        this._super("text", $.extend({
            verticalResizing: !1,
            placeholderTag: "p",
            placeholderText: "Text"
        }, e)),
        this.plug(SL.editor.blocks.plugin.HTML),
        this.readDefaultContent(),
        this.injectDefaultContent()
    },
    bind: function() {
        this._super(),
        this.onEditingKeyUp = this.onEditingKeyUp.bind(this),
        this.onEditingKeyDown = this.onEditingKeyDown.bind(this),
        this.onEditingInput = this.onEditingInput.bind(this),
        this.onEditingFocusOut = this.onEditingFocusOut.bind(this),
        this.propertyChanged.add(this.onPropertyChanged.bind(this))
    },
    blur: function() {
        this._super(),
        this.isEditingText() && this.disableEditing()
    },
    setDefaults: function() {
        this._super(),
        this.resize({
            width: SL.editor.blocks.Text.DEFAULT_WIDTH
        })
    },
    readDefaultContent: function() {
        this.contentElement.attr("data-placeholder-tag") ? this.options.placeholderTag = this.contentElement.attr("data-placeholder-tag") : this.contentElement.attr("data-placeholder-tag", this.options.placeholderTag),
        this.contentElement.attr("data-placeholder-text") ? this.options.placeholderText = this.contentElement.attr("data-placeholder-text") : this.contentElement.attr("data-placeholder-text", this.options.placeholderText)
    },
    injectDefaultContent: function() {
        var e = this.getDefaultContent();
        "" === this.contentElement.text().trim() && e && (this.hasPlugin(SL.editor.blocks.plugin.HTML) && this.hasCustomHTML() || this.contentElement.html(e))
    },
    clearDefaultContent: function() {
        this.contentElement.html().trim() === this.getDefaultContent() && this.contentElement.html(this.getDefaultContent(!0))
    },
    getDefaultContent: function(e) {
        return this.options.placeholderTag && this.options.placeholderText ? e ? "<" + this.options.placeholderTag + ">&nbsp;</" + this.options.placeholderTag + ">" : "<" + this.options.placeholderTag + ">" + this.options.placeholderText + "</" + this.options.placeholderTag + ">" : ""
    },
    externalizeLinks: function() {
        SL.util.openLinksInTabs(this.contentElement)
    },
    resize: function() {
        this._super.apply(this, arguments),
        this.syncPairs(),
        this.syncOverflow()
    },
    getToolbarOptions: function() {
        return [SL.editor.components.toolbars.options.TextAlign, SL.editor.components.toolbars.options.TextSize, SL.editor.components.toolbars.options.LineHeight, SL.editor.components.toolbars.options.LetterSpacing, SL.editor.components.toolbars.options.Divider, SL.editor.components.toolbars.options.TextColor, SL.editor.components.toolbars.options.BackgroundColor, SL.editor.components.toolbars.options.Opacity, SL.editor.components.toolbars.options.Padding, SL.editor.components.toolbars.options.Rotation, SL.editor.components.toolbars.options.Divider, SL.editor.components.toolbars.groups.BorderCSS, SL.editor.components.toolbars.groups.Animation].concat(this._super())
    },
    focus: function() {
        this._super(),
        SL.editor.controllers.Blocks.discoverBlockPairs(),
        this.syncOverflow()
    },
    enableEditing: function() {
        if (!this.isEditingText()) {
            this.contentElement.attr("contenteditable", ""),
            this.domElement.addClass("is-editing"),
            this.contentElement.on("keyup", this.onEditingKeyUp),
            this.contentElement.on("keydown", this.onEditingKeyDown),
            this.contentElement.on("input", this.onEditingInput),
            this.contentElement.on("focusout", this.onEditingFocusOut),
            this.clearDefaultContent();
            var e = {};
            SL.editor.controllers.Capabilities.isTouchEditor() && (this.contentElement.focus(),
            e.toolbar = [["Format"], ["NumberedList", "BulletedList", "-", "Blockquote"]],
            window.scrollTo(0, Math.max(this.contentElement.offset().top - 60, 0))),
            this.hasPlugin(SL.editor.blocks.plugin.HTML) && this.hasCustomHTML() && (e.allowedContent = !0),
            e.contentsLangDirection = SLConfig.deck.rtl === !0 ? "rtl" : "ui";
            var t = SL.view.getCurrentTheme();
            if (t && t.hasPalette()) {
                var i = t.get("palette");
                i = i.join(","),
                i = i.replace(/#/g, ""),
                e.colorButton_colors = i
            }
            this.editor = CKEDITOR.inline(this.contentElement.get(0), e),
            this.editor.on("instanceReady", function() {
                this.contentElement.html(this.contentElement.html().trim()),
                this.editor.focus();
                var e = this.editor.createRange();
                e.moveToElementEditEnd(this.editor.editable()),
                e.select()
            }
            .bind(this))
        }
    },
    disableEditing: function() {
        this.contentElement.removeAttr("contenteditable").blur(),
        this.domElement.removeClass("is-editing"),
        this.contentElement.off("keyup", this.onEditingKeyUp),
        this.contentElement.off("keydown", this.onEditingKeyDown),
        this.contentElement.off("input", this.onEditingInput),
        this.contentElement.off("focusout", this.onEditingFocusOut),
        this.externalizeLinks(),
        this.injectDefaultContent(),
        this.editor && (this.editor.destroy(),
        this.editor = null),
        SL.editor.controllers.Blocks.afterBlockTextSaved(this.contentElement)
    },
    syncPairs: function() {
        if (!this.destroyed && !this.isRotated()) {
            var e = this.measure();
            this.pairings.forEach(function(t) {
                "bottom" === t.direction && t.block.move(null, e.bottom)
            }),
            this._super()
        }
    },
    syncOverflow: function() {
        this.domElement.toggleClass("is-text-overflowing", this.contentElement.prop("scrollHeight") > SL.view.getSlideSize().height)
    },
    isEditingText: function() {
        return this.domElement.hasClass("is-editing")
    },
    toggleAttributeWhen: function(e, t) {
        t ? this.contentElement.attr(e, "") : this.contentElement.removeAttr(e)
    },
    onDoubleClick: function(e) {
        this._super(e),
        SL.view.isEditing() && this.enableEditing()
    },
    onKeyDown: function(e) {
        this._super(e),
        13 === e.keyCode ? this.isEditingText() || SL.util.isTypingEvent(e) ? e.metaKey && this.disableEditing() : (e.preventDefault(),
        this.enableEditing()) : 27 === e.keyCode && (e.preventDefault(),
        this.disableEditing())
    },
    onEditingKeyUp: function() {
        this.syncPairs(),
        this.syncOverflow(),
        SL.editor.controllers.Blocks.afterBlockTextInput()
    },
    onEditingKeyDown: function() {
        SL.editor.controllers.Blocks.afterBlockTextInput()
    },
    onEditingInput: function() {
        setTimeout(function() {
            SL.editor.controllers.Blocks.afterBlockTextInput()
        }, 1)
    },
    onEditingFocusOut: function() {
        SL.editor.controllers.Capabilities.isTouchEditor() && setTimeout(function() {
            this.isEditingText() && 0 === $(document.activeElement).closest(".cke").length && this.disableEditing()
        }
        .bind(this), 1)
    },
    onPropertyChanged: function(e) {
        -1 !== e.indexOf("style.letter-spacing") && this.toggleAttributeWhen("data-has-letter-spacing", this.isset("style.letter-spacing")),
        -1 !== e.indexOf("style.line-height") && this.toggleAttributeWhen("data-has-line-height", this.isset("style.line-height")),
        this.syncPairs(),
        this.syncOverflow()
    }
}),
SL.editor.blocks.Text.DEFAULT_WIDTH = 600,
SL("editor.components").Colorpicker = Class.extend({
    init: function(e) {
        this.editor = e,
        this.render(),
        this.bind()
    },
    render: function() {
        this.domElement = $('<div class="sl-colorpicker">'),
        this.arrowElement = $('<div class="sl-colorpicker-arrow">').appendTo(this.domElement),
        this.apiElement = $('<div class="sl-colorpicker-api">').appendTo(this.domElement)
    },
    bind: function() {
        this.onChooseClicked = this.onChooseClicked.bind(this),
        this.onResetClicked = this.onResetClicked.bind(this),
        this.onWindowResize = this.onWindowResize.bind(this),
        this.onDocumentMouseDown = this.onDocumentMouseDown.bind(this)
    },
    renderColorpicker: function() {
        this.hasRenderedColorPicker || (this.hasRenderedColorPicker = !0,
        this.apiElement.spectrum({
            flat: !0,
            showInput: !0,
            showButtons: !1,
            showInitial: !0,
            showPalette: !0,
            showPaletteOnly: !0,
            togglePaletteOnly: !0,
            showSelectionPalette: !0,
            hideAfterPaletteSelect: !0,
            maxSelectionSize: 10,
            togglePaletteMoreText: "More options",
            togglePaletteLessText: "Fewer options",
            preferredFormat: "hex",
            localStorageKey: "sl-colors",
            className: "sl-colorpicker-spectrum",
            move: function(e) {
                this.config.changeCallback(this.config.alpha ? e.toRgbString() : e.toHexString(), !0)
            }
            .bind(this),
            change: function(e) {
                this.config.changeCallback(this.config.alpha ? e.toRgbString() : e.toHexString(), !0)
            }
            .bind(this),
            hide: function() {
                this.hide()
            }
            .bind(this)
        }),
        this.domElement.find(".sp-palette-toggle").on("mouseup", this.onMoreLessToggleClicked.bind(this))),
        this.domElement.find(".sl-colorpicker-buttons").remove(),
        this.domElement.append(['<div class="sl-colorpicker-buttons">', '<button class="sl-colorpicker-reset button s outline">' + this.config.resetText + "</button>", '<button class="sl-colorpicker-choose button s grey">' + this.config.chooseText + "</button>", "</div>"].join("")),
        this.domElement.find(".sl-colorpicker-reset").on("click", this.onResetClicked),
        this.domElement.find(".sl-colorpicker-choose").on("click", this.onChooseClicked),
        this.apiElement.spectrum("option", "palette", this.getColorPalettePresets(this.config.alpha)),
        this.apiElement.spectrum("option", "showAlpha", !!this.config.alpha),
        this.apiElement.spectrum("option", "cancelText", this.config.cancelText),
        this.apiElement.spectrum("option", "cancelClassName", this.config.cancelClassName),
        this.apiElement.spectrum("option", "chooseText", this.config.chooseText),
        this.apiElement.spectrum("option", "chooseClassName", this.config.chooseClassName),
        this.config.color && this.apiElement.spectrum("set", this.config.color),
        this.apiElement.spectrum("reflow")
    },
    layout: function() {
        var e = 10
          , t = 6
          , i = this.domElement.outerWidth()
          , n = this.domElement.outerHeight()
          , r = this.config.anchor.offset()
          , o = this.config.anchor.outerWidth()
          , s = this.config.anchor.outerHeight()
          , a = r.left + this.config.offsetX
          , l = r.top + this.config.offsetY;
        switch (this.config.alignment) {
        case "t":
            a += (o - i) / 2,
            l -= n + e;
            break;
        case "b":
            a += (o - i) / 2,
            l += s + e;
            break;
        case "l":
            a -= i + e,
            l += (s - n) / 2;
            break;
        case "r":
            a += o + e,
            l += (s - n) / 2
        }
        switch (a = Math.min(Math.max(a, e), window.innerWidth - i - e),
        l = Math.min(Math.max(l, e), window.innerHeight - n - e),
        this.config.alignment) {
        case "t":
            arrowX = r.left - a + o / 2,
            arrowY = n;
            break;
        case "b":
            arrowX = r.left - a + o / 2,
            arrowY = -t;
            break;
        case "l":
            arrowX = i,
            arrowY = r.top - l + s / 2;
            break;
        case "r":
            arrowX = -t,
            arrowY = r.top - l + s / 2
        }
        this.domElement.css({
            left: a,
            top: l
        }),
        this.arrowElement.css({
            left: arrowX,
            top: arrowY
        }),
        this.domElement.attr("data-alignment", this.config.alignment)
    },
    show: function(e) {
        if (!e.anchor)
            throw "Can not show color picker without anchor.";
        this.domElement.appendTo(document.body),
        this.config = $.extend({
            alignment: "l",
            offsetX: 0,
            offsetY: 0,
            alpha: !1,
            resetText: "Use default",
            chooseText: "Done",
            resetCallback: function() {},
            changeCallback: function() {},
            hiddenCallback: function() {}
        }, e),
        this.renderColorpicker(),
        this.layout(),
        $(window).on("resize", this.onWindowResize),
        $(document).on("mousedown", this.onDocumentMouseDown)
    },
    hide: function() {
        this.saveCurrentColorToPalette(),
        this.domElement.detach(),
        $(window).off("resize", this.onWindowResize),
        $(document).off("mousedown", this.onDocumentMouseDown)
    },
    toggle: function(e) {
        this.isVisible() ? this.hide() : this.show(e)
    },
    isVisible: function() {
        return this.domElement.parent().length > 0
    },
    setColor: function(e) {
        this.apiElement.spectrum("set", e),
        this.apiElement.spectrum("reflow")
    },
    getColor: function() {
        return this.apiElement.spectrum("get")
    },
    saveCurrentColorToPalette: function() {
        this.apiElement.spectrum("saveCurrentSelection")
    },
    getColorPalettePresets: function(e) {
        if (this.hasCustomPalette())
            return [SL.view.getCurrentTheme().get("palette")];
        var t = ["rgb(0, 0, 0)", "rgb(34, 34, 34)", "rgb(68, 68, 68)", "rgb(102, 102, 102)", "rgb(136, 136, 136)", "rgb(170, 170, 170)", "rgb(204, 204, 204)", "rgb(238, 238, 238)", "rgb(255, 255, 255)"]
          , i = ["rgb(152, 0, 0)", "rgb(255, 0, 0)", "rgb(255, 153, 0)", "rgb(255, 255, 0)", "rgb(0, 255, 0)", "rgb(0, 255, 255)", "rgb(74, 134, 232)", "rgb(0, 0, 255)", "rgb(153, 0, 255)", "rgb(168, 39, 107)"]
          , n = ["rgb(230, 184, 175)", "rgb(244, 204, 204)", "rgb(252, 229, 205)", "rgb(255, 242, 204)", "rgb(217, 234, 211)", "rgb(208, 224, 227)", "rgb(201, 218, 248)", "rgb(207, 226, 243)", "rgb(217, 210, 233)", "rgb(234, 209, 220)", "rgb(221, 126, 107)", "rgb(234, 153, 153)", "rgb(249, 203, 156)", "rgb(255, 229, 153)", "rgb(182, 215, 168)", "rgb(162, 196, 201)", "rgb(164, 194, 244)", "rgb(159, 197, 232)", "rgb(180, 167, 214)", "rgb(213, 166, 189)", "rgb(204, 65, 37)", "rgb(224, 102, 102)", "rgb(246, 178, 107)", "rgb(255, 217, 102)", "rgb(147, 196, 125)", "rgb(118, 165, 175)", "rgb(109, 158, 235)", "rgb(111, 168, 220)", "rgb(142, 124, 195)", "rgb(194, 123, 160)", "rgb(166, 28, 0)", "rgb(204, 0, 0)", "rgb(230, 145, 56)", "rgb(241, 194, 50)", "rgb(106, 168, 79)", "rgb(69, 129, 142)", "rgb(60, 120, 216)", "rgb(61, 133, 198)", "rgb(103, 78, 167)", "rgb(166, 77, 121)", "rgb(91, 15, 0)", "rgb(102, 0, 0)", "rgb(120, 63, 4)", "rgb(127, 96, 0)", "rgb(39, 78, 19)", "rgb(12, 52, 61)", "rgb(28, 69, 135)", "rgb(7, 55, 99)", "rgb(32, 18, 77)", "rgb(76, 17, 48)"];
        return e && t.push("transparent"),
        [t, i, n]
    },
    hasCustomPalette: function() {
        var e = SL.view.getCurrentTheme();
        return e && e.hasPalette()
    },
    destroy: function() {
        this.domElement.remove()
    },
    onResetClicked: function(e) {
        this.config.resetCallback(),
        this.hide(),
        e.preventDefault()
    },
    onChooseClicked: function(e) {
        this.saveCurrentColorToPalette(),
        this.hide(),
        e.preventDefault()
    },
    onMoreLessToggleClicked: function() {
        setTimeout(function() {
            this.layout()
        }
        .bind(this), 1)
    },
    onDocumentMouseDown: function(e) {
        var t = $(e.target);
        0 === t.closest(this.domElement).length && 0 === t.closest(this.config.anchor).length && this.hide()
    },
    onWindowResize: function() {
        this.layout()
    }
}),
SL("editor.components").Sidebar = Class.extend({
    init: function(e) {
        this.options = e || {},
        this.sidebarElement = $(".sidebar"),
        this.sidebarPrimary = this.sidebarElement.find(".primary"),
        this.sidebarSecondary = this.sidebarElement.find(".secondary"),
        this.sidebarHeader = this.sidebarElement.find(".global-header"),
        this.sidebarScrollShadowTop = this.sidebarElement.find(".scroll-shadow-top"),
        this.sidebarScrollShadowBottom = this.sidebarElement.find(".scroll-shadow-bottom"),
        this.panelElement = $(".sidebar-panel"),
        this.saveButton = this.sidebarElement.find(".button.save"),
        this.previewButton = this.sidebarElement.find(".button.preview"),
        this.undoButton = this.sidebarElement.find(".button.undo"),
        this.exportButton = this.sidebarElement.find(".button.export"),
        this.importButton = this.sidebarElement.find(".button.import"),
        this.publishButton = this.sidebarElement.find(".button.publish"),
        this.settingsButton = this.sidebarElement.find(".button.settings"),
        this.revisionsButton = this.sidebarElement.find(".button.revisions"),
        this.medialibraryButton = this.sidebarElement.find(".button.medialibrary"),
        this.arrangeButton = this.sidebarElement.find(".button.arrange"),
        this.styleButton = this.sidebarElement.find(".button.style"),
        this.shareButton = this.sidebarElement.find(".button.share"),
        this.presentButton = this.sidebarElement.find(".button.present"),
        this.previewButton && this.previewButton.attr("data-tooltip", "Preview (" + SL.util.getMetaKeyName() + " + F)"),
        this.undoButton && this.undoButton.attr("data-tooltip", "Undo (" + SL.util.getMetaKeyName() + " + Z)"),
        this.currentPanel = null,
        this.createSignals(),
        this.render(),
        this.bind(),
        this.layout(),
        this.updatePublishButton(),
        this.updateUndoButton(),
        this.updatePresentButton(),
        SL.editor.controllers.Capabilities.canExport() || this.exportButton.hide(),
        SL.editor.controllers.Capabilities.canPresent() || this.presentButton.hide(),
        SL.editor.controllers.Capabilities.canShareDeck() || this.shareButton.hide(),
        SL.editor.controllers.Capabilities.canChangeStyles() || this.styleButton.hide(),
        SL.editor.controllers.Capabilities.canSetVisibility() || this.publishButton.hide()
    },
    bind: function() {
        this.saveButton.on("vclick", this.onSaveClicked.bind(this)),
        this.previewButton && this.previewButton.on("vclick", this.onPreviewClicked.bind(this)),
        this.undoButton && this.undoButton.on("vclick", this.onUndoClicked.bind(this)),
        this.exportButton && this.exportButton.on("vclick", this.onExportClicked.bind(this)),
        this.importButton && this.importButton.on("vclick", this.onImportClicked.bind(this)),
        this.settingsButton.on("vclick", this.onSettingsClicked.bind(this)),
        this.revisionsButton.on("vclick", this.onRevisionsClicked.bind(this)),
        this.medialibraryButton.on("vclick", this.onMediaLibraryClicked.bind(this)),
        this.publishButton.on("vclick", this.onPublishClicked.bind(this)),
        this.arrangeButton.on("vclick", this.onArrangeClicked.bind(this)),
        this.styleButton.on("vclick", this.onStyleClicked.bind(this)),
        this.shareButton.on("vclick", this.onShareClicked.bind(this)),
        this.presentButton.on("vclick", this.onPresentClicked.bind(this)),
        this.panelElement.on("vclick", this.onPanelElementClicked.bind(this)),
        this.sidebarSecondary.on("scroll", this.layout.bind(this)),
        this.settingsPanel.onclose.add(this.close.bind(this)),
        this.exportPanel.onclose.add(this.close.bind(this)),
        this.importPanel.onclose.add(this.close.bind(this)),
        this.revisionsPanel.onclose.add(this.close.bind(this)),
        this.stylePanel.onclose.add(this.close.bind(this)),
        $(window).on("resize", this.layout.bind(this)),
        SL.editor.controllers.History.changed.add(this.updateUndoButton.bind(this)),
        SL.editor.controllers.URL.changed.add(this.updatePresentButton.bind(this))
    },
    createSignals: function() {
        this.saveClicked = new signals.Signal,
        this.previewClicked = new signals.Signal
    },
    render: function() {
        this.revisionsPanel = new SL.editor.components.sidebar.Revisions,
        this.settingsPanel = new SL.editor.components.sidebar.Settings,
        this.exportPanel = new SL.editor.components.sidebar.Export,
        this.importPanel = new SL.editor.components.sidebar.Import,
        this.stylePanel = new SL.editor.components.sidebar.Style,
        this.renderStyleOptions(),
        this.renderMoreOptions()
    },
    renderStyleOptions: function() {
        SL.editor.controllers.Capabilities.canUseCSSEditor() && !SL.editor.controllers.Capabilities.isTouchEditor() && new SL.components.Menu({
            anchor: this.styleButton,
            anchorSpacing: 10,
            mouseLeaveDelay: 50,
            alignment: "r",
            minWidth: 180,
            showOnHover: !0,
            showOnHoverCondition: function() {
                return !this.styleButton.hasClass("active")
            }
            .bind(this),
            options: [{
                label: "Style options",
                icon: "brush",
                callback: function() {
                    this.toggle("style")
                }
                .bind(this)
            }, {
                label: "CSS editor",
                icon: "file-css",
                callback: function() {
                    SL.editor.controllers.Mode.change("css")
                }
                .bind(this)
            }]
        })
    },
    renderMoreOptions: function() {
        var e = [{
            label: "Help & feedback",
            icon: "question-mark",
            url: "http://help.slides.com/knowledgebase",
            urlTarget: "_blank"
        }, {
            label: "Make a copy of this deck",
            icon: "fork",
            callback: function() {
                SL.analytics.trackEditor("Sidebar: Duplicate deck"),
                SL.editor.controllers.API.forkDeck()
            }
            .bind(this)
        }];
        SL.editor.controllers.Capabilities.canDeleteDeck() && e.push({
            label: "Delete deck",
            icon: "trash-fill",
            callback: function() {
                SL.analytics.trackEditor("Sidebar: Delete deck"),
                SL.editor.controllers.API.deleteDeck()
            }
            .bind(this)
        }),
        this.moreOptionsElement = this.sidebarElement.find(".more-options"),
        this.moreOptions = new SL.components.Menu({
            anchor: this.moreOptionsElement,
            anchorSpacing: 10,
            alignment: "r",
            mouseLeaveDelay: 50,
            showOnHover: !0,
            options: e
        })
    },
    layout: function() {
        var e = window.innerHeight - (this.sidebarPrimary.outerHeight(!0) + this.sidebarHeader.outerHeight(!0));
        this.sidebarSecondary.css("max-height", e);
        var t = this.sidebarSecondary.scrollTop()
          , i = this.sidebarSecondary.prop("scrollHeight")
          , n = this.sidebarSecondary.outerHeight()
          , r = i > n
          , o = t / (i - n);
        this.sidebarScrollShadowBottom.css({
            opacity: r ? 1 - o : 0,
            bottom: this.sidebarHeader.outerHeight()
        }),
        this.sidebarScrollShadowTop.css({
            opacity: r ? o : 0,
            top: this.sidebarSecondary.offset().top
        })
    },
    open: function(e) {
        switch (this.currentPanel && this.currentPanel.close(),
        SL.editor.controllers.Mode.clear(),
        e) {
        case "settings":
            this.currentPanel = this.settingsPanel;
            break;
        case "export":
            this.currentPanel = this.exportPanel;
            break;
        case "import":
            this.currentPanel = this.importPanel;
            break;
        case "style":
            this.currentPanel = this.stylePanel;
            break;
        case "revisions":
            this.currentPanel = this.revisionsPanel
        }
        this.setActiveButton(e),
        this.currentPanel.open(),
        this.panelElement.addClass("visible"),
        SL.analytics.trackEditor("Open panel", e)
    },
    close: function(e) {
        this.currentPanel && (e === !0 && this.currentPanel.save(),
        this.currentPanel.close()),
        this.setActiveButton(null),
        this.panelElement.removeClass("visible")
    },
    toggle: function(e) {
        this.isExpanded(e) ? this.close() : this.open(e)
    },
    setActiveButton: function(e) {
        e ? (this.sidebarElement.addClass("has-active-panel"),
        this.sidebarSecondary.find(".active").removeClass("active"),
        this.sidebarSecondary.find(".button." + e).addClass("active")) : (this.sidebarElement.removeClass("has-active-panel"),
        this.sidebarSecondary.find(".active").removeClass("active"))
    },
    isExpanded: function(e) {
        return e ? this.panelElement.find("." + e).hasClass("visible") : this.panelElement.hasClass("visible")
    },
    updateSaveButton: function(e, t) {
        this.saveButton.attr({
            "class": "button save " + (e || ""),
            "data-tooltip": t || ""
        })
    },
    updatePublishButton: function() {
        var e = this.publishButton.find(".icon");
        SL.current_deck.get("visibility") === SL.models.Deck.VISIBILITY_SELF ? e.removeClass("i-unlock-stroke").addClass("i-lock-stroke") : SL.current_deck.get("visibility") === SL.models.Deck.VISIBILITY_TEAM ? e.removeClass("i-lock-stroke").addClass("i-unlock-stroke") : SL.current_deck.get("visibility") === SL.models.Deck.VISIBILITY_ALL && e.removeClass("i-lock-stroke").addClass("i-unlock-stroke"),
        SL.current_deck.get("visibility") === SL.models.Deck.VISIBILITY_SELF || SL.current_user.privileges.privateDecks() ? this.publishButton.attr("data-tooltip", "Visibility") : this.publishButton.attr("data-tooltip", "<strong>This presentation is public.</strong><br>You need a paid account to save <br>privately. Click to learn more.")
    },
    updateArrangeButton: function(e) {
        this.setActiveButton("arranging" === e ? "arrange" : null)
    },
    updateUndoButton: function() {
        this.undoButton && this.undoButton.toggleClass("disabled", !SL.editor.controllers.History.canUndo())
    },
    updatePresentButton: function() {
        this.presentButton && SLConfig.deck.slug && this.presentButton.attr("href", SL.routes.DECK_LIVE(SLConfig.deck.user.username, SLConfig.deck.slug))
    },
    onSaveClicked: function(e) {
        e.preventDefault(),
        this.saveClicked.dispatch()
    },
    onPreviewClicked: function(e) {
        e.preventDefault(),
        this.previewClicked.dispatch()
    },
    onUndoClicked: function(e) {
        e.preventDefault(),
        SL.editor.controllers.History.undo({
            ignoreMode: !0
        }),
        SL.analytics.trackEditor("Undo clicked")
    },
    onExportClicked: function() {
        var e = $(".reveal .slides").children().map(function() {
            var e = $(this).clone();
            return e.find("section").add(e).each(function() {
                var e = $.map(this.attributes, function(e) {
                    return e.name
                })
                  , t = $(this);
                $.each(e, function(e, i) {
                    t.removeAttr(i)
                })
            }),
            e.wrap("<div>").parent().html()
        }).toArray().join("");
        return e = '<div class="slides">' + e + "</div>",
        $(".sidebar .export textarea").text(SL.util.html.indent(e)),
        this.toggle("export"),
        !1
    },
    onImportClicked: function() {
        return this.toggle("import"),
        !1
    },
    onArrangeClicked: function() {
        return this.close(),
        SL.editor.controllers.Mode.toggle("arrange"),
        !1
    },
    onSettingsClicked: function() {
        return this.toggle("settings"),
        !1
    },
    onRevisionsClicked: function() {
        return this.toggle("revisions"),
        !1
    },
    onMediaLibraryClicked: function() {
        return SL.popup.open(SL.components.medialibrary.MediaLibrary),
        !1
    },
    onStyleClicked: function() {
        return this.toggle("style"),
        !1
    },
    onShareClicked: function() {
        return SL.popup.open(SL.components.decksharer.DeckSharer, {
            deck: SL.current_deck
        }),
        !1
    },
    onPresentClicked: function() {
        SL.analytics.trackEditor("Sidebar: Present")
    },
    onPublishClicked: function(e) {
        if (e.preventDefault(),
        SL.current_user.privileges.privateDecks() || SL.current_deck.get("visibility") === SL.models.Deck.VISIBILITY_SELF) {
            var t = new SL.components.prompts.DeckVisibility(SL.current_deck,{
                anchor: $(e.currentTarget),
                alignment: "r",
                persistVisibility: !1
            });
            t.show(),
            t.visibilitySelected.add(function(e) {
                SL.current_deck.set("visibility", e),
                SL.view.saveVisibility(),
                this.updatePublishButton()
            }
            .bind(this)),
            SL.analytics.trackEditor("Visibility menu opened", SL.current_deck.get("visibility"))
        } else
            window.location = "/pricing",
            SL.analytics.trackEditor("Click upgrade link", "visibility button")
    },
    onPanelElementClicked: function(e) {
        e.target == this.panelElement.get(0) && this.close()
    }
}),
SL("editor.components.sidebar").Base = Class.extend({
    init: function() {
        this.saved = !1,
        this.onWindowResize = this.onWindowResize.bind(this),
        this.onDocumentKeyDown = this.onDocumentKeyDown.bind(this),
        this.onSaveClicked = this.onSaveClicked.bind(this),
        this.onCancelClicked = this.onCancelClicked.bind(this),
        this.onCloseClicked = this.onCloseClicked.bind(this),
        this.render(),
        this.bind(),
        this.createSignals()
    },
    render: function() {
        this.bodyElement = this.domElement.find(".panel-body"),
        this.footerElement = this.domElement.find(".panel-footer"),
        this.bodyElement.addClass("sl-scrollable"),
        this.scrollShadow = new SL.components.ScrollShadow({
            parentElement: this.domElement,
            contentElement: this.bodyElement,
            footerElement: this.footerElement,
            resizeContent: !1
        })
    },
    bind: function() {
        this.domElement.find(".save").on("click", this.onSaveClicked),
        this.domElement.find(".cancel").on("click", this.onCancelClicked),
        this.domElement.find(".close").on("click", this.onCloseClicked)
    },
    createSignals: function() {
        this.onclose = new signals.Signal
    },
    buffer: function() {
        this.config = JSON.parse(JSON.stringify(SLConfig))
    },
    open: function() {
        this.saved = !1,
        this.domElement.addClass("visible"),
        this.layout(),
        $(window).on("resize", this.onWindowResize),
        $(document).on("keydown", this.onDocumentKeyDown)
    },
    close: function() {
        this.domElement.removeClass("visible"),
        $(window).off("resize", this.onWindowResize),
        $(document).off("keydown", this.onDocumentKeyDown),
        this.saved === !1 && this.revert()
    },
    layout: function() {
        if (this.bodyElement.length && this.footerElement.length) {
            var e = this.bodyElement.get(0).scrollHeight
              , t = this.footerElement.outerHeight(!0) + parseInt(this.footerElement.css("margin-top"), 10);
            this.domElement.toggleClass("overflowing", e > window.innerHeight - t)
        }
        this.scrollShadow.sync()
    },
    revert: function() {
        this.buffer(),
        this.updateSelection(),
        this.applySelection()
    },
    save: function() {
        return this.saved = !0,
        !0
    },
    updateSelection: function() {},
    applySelection: function() {},
    onSaveClicked: function() {
        this.save() && this.onclose.dispatch()
    },
    onCancelClicked: function() {
        this.onclose.dispatch()
    },
    onCloseClicked: function() {
        this.onclose.dispatch()
    },
    onDocumentKeyDown: function() {},
    onWindowResize: function() {
        this.layout()
    }
}),
SL("editor.components.sidebar").ExportPDF = Class.extend({
    init: function(e) {
        this.domElement = e,
        this.downloadButton = this.domElement.find(".download-pdf-button"),
        this.downloadButton.on("vclick", this.onDownloadClicked.bind(this)),
        this.downloadButtonLabel = this.domElement.find(".download-pdf-button .label"),
        this.downloadButtonLoader = Ladda.create(this.downloadButton.get(0)),
        this.marginButton = this.domElement.find(".download-pdf-margin"),
        this.marginButton.on("vclick", this.onMarginClicked.bind(this)),
        this.onPoll = this.onPoll.bind(this),
        this.onPollTimeout = this.onPollTimeout.bind(this),
        this.exportID = null,
        this.pollJob = new SL.helpers.PollJob({
            interval: 1e3,
            timeout: SL.config.EXPORT_PDF_TIMEOUT
        }),
        this.pollJob.polled.add(this.onPoll),
        this.pollJob.ended.add(this.onPollTimeout),
        this.heightChanged = new signals.Signal,
        this.setIsLoading(!1),
        this.setMargin = this.setMargin.bind(this),
        this.setMargin(SL.config.DEFAULT_EXPORT_MARGIN)
    },
    startExport: function() {
        this.exportXHR && this.exportXHR.abort(),
        this.exportXHR = $.ajax({
            url: SL.config.AJAX_EXPORT_START(SLConfig.deck.id),
            type: "POST",
            context: this,
            data: {
                "export": {
                    export_type: "pdf",
                    margin: this.marginValue
                }
            }
        }).done(function(e) {
            this.exportID = e.id,
            this.exportXHR = null,
            this.pollJob.start()
        }
        .bind(this)).fail(function() {
            this.setIsLoading(!1),
            SL.notify(SL.locale.get("EXPORT_PDF_ERROR"), "negative")
        }
        .bind(this))
    },
    setIsLoading: function(e) {
        e ? (this.downloadButtonLabel.text(SL.locale.get("EXPORT_PDF_BUTTON_WORKING")),
        this.downloadButtonLoader && this.downloadButtonLoader.start()) : (this.downloadButtonLabel.text(SL.locale.get("EXPORT_PDF_BUTTON")),
        this.downloadButtonLoader && this.downloadButtonLoader.stop())
    },
    showPreviousExport: function(e) {
        if ("string" == typeof e && e.length) {
            this.previousExport && (this.previousExport.remove(),
            this.previousExport = null);
            var t = (SLConfig.deck.slug || "deck") + ".pdf";
            this.previousExport = $('<p class="recent-export">Recent: <a href="' + e + '" download="' + t + '" target="_blank">' + t + "</a></p>").appendTo(this.domElement),
            $("html").addClass("editor-exported-pdf-successfully"),
            this.heightChanged.dispatch()
        }
    },
    setMargin: function(e) {
        this.marginValue = parseFloat(e),
        ("number" != typeof this.marginValue || isNaN(this.marginValue)) && (this.marginValue = SL.config.DEFAULT_EXPORT_MARGIN);
        var t = 0 === this.marginValue ? "None" : Math.round(100 * this.marginValue) + "%";
        this.marginButton.find(".value").remove(),
        this.marginButton.append('<span class="value">' + t + "</span>")
    },
    onDownloadClicked: function() {
        this.setIsLoading(!0),
        this.startExport(),
        SL.analytics.trackEditor("Download as PDF")
    },
    onMarginClicked: function() {
        var e = [0, .05, .1, .15, .2].map(function(e) {
            return {
                value: e,
                title: 0 === e ? "None" : Math.round(100 * e) + "%",
                selected: e === this.marginValue
            }
        }, this)
          , t = SL.prompt({
            anchor: this.marginButton,
            title: "Page margin",
            subtitle: "The amount of space between your content and the page edge.",
            type: "list",
            alignment: "t",
            data: e,
            multiselect: !1,
            optional: !0,
            cancelButton: !0,
            maxWidth: 250
        });
        t.confirmed.add(this.setMargin)
    },
    onPoll: function() {
        this.pdfStatusXHR && this.pdfStatusXHR.abort(),
        this.pdfStatusXHR = $.get(SL.config.AJAX_EXPORT_STATUS(SLConfig.deck.id, this.exportID)).done(function(e) {
            if ("string" == typeof e.url && e.url.length) {
                var t = $('<iframe style="display: none;">');
                t.appendTo(document.body),
                t.attr("src", e.url),
                setTimeout(t.remove, 1e3),
                this.showPreviousExport(e.url),
                this.setIsLoading(!1),
                this.pollJob.stop()
            }
        }
        .bind(this))
    },
    onPollTimeout: function() {
        this.setIsLoading(!1),
        SL.notify(SL.locale.get("EXPORT_PDF_ERROR"), "negative")
    }
}),
SL("editor.components.sidebar").ExportPPT = Class.extend({
    init: function(e) {
        this.domElement = e,
        this.downloadButton = this.domElement.find(".download-ppt-button"),
        this.downloadButton.on("click", this.onDownloadClicked.bind(this)),
        this.downloadButtonLabel = this.domElement.find(".download-ppt-button .label"),
        this.downloadButtonLoader = Ladda.create(this.downloadButton.get(0)),
        this.onPoll = this.onPoll.bind(this),
        this.onPollTimeout = this.onPollTimeout.bind(this),
        this.exportID = null,
        this.pollJob = new SL.helpers.PollJob({
            interval: 1e3,
            timeout: SL.config.EXPORT_PPT_TIMEOUT
        }),
        this.pollJob.polled.add(this.onPoll),
        this.pollJob.ended.add(this.onPollTimeout),
        this.heightChanged = new signals.Signal,
        this.setIsLoading(!1)
    },
    startExport: function() {
        this.exportXHR && this.exportXHR.abort(),
        this.exportXHR = $.ajax({
            url: SL.config.AJAX_EXPORT_START(SLConfig.deck.id),
            type: "POST",
            context: this,
            data: {
                "export": {
                    export_type: "ppt"
                }
            }
        }).done(function(e) {
            this.exportID = e.id,
            this.exportXHR = null,
            this.pollJob.start()
        }
        .bind(this)).fail(function() {
            this.setIsLoading(!1),
            SL.notify(SL.locale.get("EXPORT_PPT_ERROR"), "negative")
        }
        .bind(this))
    },
    setIsLoading: function(e) {
        e ? (this.downloadButtonLabel.text(SL.locale.get("EXPORT_PPT_BUTTON_WORKING")),
        this.downloadButtonLoader && this.downloadButtonLoader.start()) : (this.downloadButtonLabel.text(SL.locale.get("EXPORT_PPT_BUTTON")),
        this.downloadButtonLoader && this.downloadButtonLoader.stop())
    },
    showPreviousExport: function(e) {
        if ("string" == typeof e && e.length) {
            this.previousExport && (this.previousExport.remove(),
            this.previousExport = null);
            var t = (SLConfig.deck.slug || "deck") + ".pptx";
            this.previousExport = $('<p class="recent-export">Recent: <a href="' + e + '" download="' + t + '" target="_blank">' + t + "</a></p>").appendTo(this.domElement),
            $("html").addClass("editor-exported-ppt-successfully"),
            this.heightChanged.dispatch()
        }
    },
    onDownloadClicked: function() {
        this.setIsLoading(!0),
        this.startExport(),
        SL.analytics.trackEditor("Download as PPT")
    },
    onPoll: function() {
        this.pptStatusXHR && this.pptStatusXHR.abort(),
        this.pptStatusXHR = $.get(SL.config.AJAX_EXPORT_STATUS(SLConfig.deck.id, this.exportID)).done(function(e) {
            if ("string" == typeof e.url && e.url.length && 1 == e.ppt_complete) {
                var t = $('<iframe style="display: none;">');
                t.appendTo(document.body),
                t.attr("src", e.url),
                setTimeout(t.remove, 1e3),
                this.showPreviousExport(e.url),
                this.setIsLoading(!1),
                this.pollJob.stop()
            }
        }
        .bind(this))
    },
    onPollTimeout: function() {
        this.setIsLoading(!1),
        SL.notify(SL.locale.get("EXPORT_PPT_ERROR"), "negative")
    }
}),
SL("editor.components.sidebar").ExportZIP = Class.extend({
    init: function(e) {
        this.domElement = e,
        this.downloadButton = this.domElement.find(".download-zip-button"),
        this.downloadButton.on("click", this.onDownloadClicked.bind(this)),
        this.downloadButtonLabel = this.domElement.find(".download-zip-button .label"),
        this.downloadButtonLoader = Ladda.create(this.downloadButton.get(0)),
        this.onPoll = this.onPoll.bind(this),
        this.onPollTimeout = this.onPollTimeout.bind(this),
        this.exportID = null,
        this.pollJob = new SL.helpers.PollJob({
            interval: 1e3,
            timeout: SL.config.EXPORT_ZIP_TIMEOUT
        }),
        this.pollJob.polled.add(this.onPoll),
        this.pollJob.ended.add(this.onPollTimeout),
        this.heightChanged = new signals.Signal,
        this.setIsLoading(!1)
    },
    startExport: function() {
        this.exportXHR && this.exportXHR.abort(),
        this.exportXHR = $.ajax({
            url: SL.config.AJAX_EXPORT_START(SLConfig.deck.id),
            type: "POST",
            context: this,
            data: {
                "export": {
                    export_type: "zip"
                }
            }
        }).done(function(e) {
            this.exportID = e.id,
            this.exportXHR = null,
            this.pollJob.start()
        }
        .bind(this)).fail(function() {
            this.setIsLoading(!1),
            SL.notify(SL.locale.get("EXPORT_ZIP_ERROR"), "negative")
        }
        .bind(this))
    },
    setIsLoading: function(e) {
        e ? (this.downloadButtonLabel.text(SL.locale.get("EXPORT_ZIP_BUTTON_WORKING")),
        this.downloadButtonLoader && this.downloadButtonLoader.start()) : (this.downloadButtonLabel.text(SL.locale.get("EXPORT_ZIP_BUTTON")),
        this.downloadButtonLoader && this.downloadButtonLoader.stop())
    },
    showPreviousExport: function(e) {
        if ("string" == typeof e && e.length) {
            this.previousExport && (this.previousExport.remove(),
            this.previousExport = null);
            var t = (SLConfig.deck.slug || "deck") + ".zip";
            this.previousExport = $('<p class="recent-export">Recent: <a href="' + e + '" download="' + t + '" target="_blank">' + t + "</a></p>").appendTo(this.domElement),
            $("html").addClass("editor-exported-zip-successfully"),
            this.heightChanged.dispatch()
        }
    },
    onDownloadClicked: function() {
        this.setIsLoading(!0),
        this.startExport(),
        SL.analytics.trackEditor("Download as ZIP")
    },
    onPoll: function() {
        this.zipStatusXHR && this.zipStatusXHR.abort(),
        this.zipStatusXHR = $.get(SL.config.AJAX_EXPORT_STATUS(SLConfig.deck.id, this.exportID)).done(function(e) {
            if ("string" == typeof e.url && e.url.length) {
                var t = $('<iframe style="display: none;">');
                t.appendTo(document.body),
                t.attr("src", e.url),
                setTimeout(t.remove, 1e3),
                this.showPreviousExport(e.url),
                this.setIsLoading(!1),
                this.pollJob.stop()
            }
        }
        .bind(this))
    },
    onPollTimeout: function() {
        this.setIsLoading(!1),
        SL.notify(SL.locale.get("EXPORT_ZIP_ERROR"), "negative")
    }
}),
SL("editor.components.sidebar").Export = SL.editor.components.sidebar.Base.extend({
    init: function() {
        this.domElement = $(".sidebar-panel .export"),
        this.bodyElement = this.domElement.find(".panel-body"),
        this.htmlOutputElement = this.domElement.find(".deck-html-contents"),
        this.cssOutputElement = this.domElement.find(".deck-css-contents"),
        this.downloadRevealElement = this.domElement.find(".section.download-reveal"),
        this.downloadHTMLButton = this.domElement.find(".download-html-button"),
        this.downloadPDFElement = this.domElement.find(".section.download-pdf"),
        this.downloadPPTElement = this.domElement.find(".section.download-ppt"),
        this.downloadZIPElement = this.domElement.find(".section.download-zip"),
        this.downloadPDFElement.length && (this.pdf = new SL.editor.components.sidebar.ExportPDF(this.downloadPDFElement),
        this.pdf.heightChanged.add(this.layout.bind(this))),
        this.downloadPPTElement.length && (this.ppt = new SL.editor.components.sidebar.ExportPPT(this.downloadPPTElement),
        this.ppt.heightChanged.add(this.layout.bind(this))),
        this.downloadZIPElement.length && (this.zip = new SL.editor.components.sidebar.ExportZIP(this.downloadZIPElement),
        this.zip.heightChanged.add(this.layout.bind(this))),
        this.setupDropbox(),
        this._super()
    },
    setupDropbox: function() {
        this.dropboxElement = this.domElement.find(".section.dropbox"),
        this.dropboxContents = this.dropboxElement.find(".contents"),
        this.dropboxPollGoal = null,
        this.onDropboxPoll = this.onDropboxPoll.bind(this),
        this.onDropboxPollTimeout = this.onDropboxPollTimeout.bind(this),
        this.dropboxPollJob = new SL.helpers.PollJob({
            interval: 2e3,
            timeout: 3e5
        }),
        this.dropboxPollJob.polled.add(this.onDropboxPoll),
        this.dropboxPollJob.ended.add(this.onDropboxPollTimeout)
    },
    bind: function() {
        this._super(),
        this.downloadHTMLButton && this.downloadHTMLButton.on("click", this.onDownloadHTMLClicked.bind(this)),
        this.htmlOutputElement && this.htmlOutputElement.on("click", this.onHTMLOutputClicked.bind(this)),
        this.cssOutputElement && this.cssOutputElement.on("click", this.onCSSOutputClicked.bind(this)),
        this.domElement.find(".upgrade-button").on("click", function() {
            SL.analytics.trackEditor("Click upgrade link", "export panel")
        })
    },
    open: function() {
        this._super(),
        this.syncRevealExport(),
        this.checkDropboxStatus(),
        this.checkOnlineContent()
    },
    close: function() {
        this._super(),
        this.dropboxStatusXHR && this.dropboxStatusXHR.abort(),
        this.dropboxPollJob.stop(),
        this.dropboxPollGoal = null
    },
    checkOnlineContent: function() {
        this.bodyElement.find(".section.online-content-warning").remove(),
        $('.reveal .slides [data-block-type="iframe"]').length && this.bodyElement.prepend(['<div class="section online-content-warning">', "There are iframes in this presentation. Since iframes load content from other servers they won't work without an internet connection, even if you export your deck.", "</div>"].join(""))
    },
    syncRevealExport: function() {
        if (SL.view.isDeveloperMode()) {
            if (this.downloadRevealElement.show(),
            this.htmlOutputElement.length) {
                var e = SL.view.getCurrentTheme()
                  , t = "theme-font-" + e.get("font")
                  , i = "theme-color-" + e.get("color")
                  , n = ['<div class="' + t + " " + i + '" style="width: 100%; height: 100%;">', '<div class="reveal">', '<div class="slides">', SL.editor.controllers.Serialize.getDeckAsString({
                    removeSlideIds: !0,
                    removeBlockIds: !0,
                    removeTextPlaceholders: !0
                }), "</div>", "</div>", "</div>"].join("");
                this.htmlOutputElement.val(SL.util.html.indent(n))
            }
            this.cssOutputElement.length && (this.cssOutputElement.val("Loading..."),
            $.ajax({
                url: SL.config.ASSET_URLS["offline-v2.css"],
                context: this
            }).fail(function() {
                this.cssOutputElement.val("Failed to load CSS...")
            }).done(function(e) {
                var t = $("#user-css-output").html() || ""
                  , i = $("#theme-css-output").html() || "";
                this.cssOutputElement.val(["<style>", e, i, t, "</style>"].join("\n"))
            }))
        } else
            this.downloadRevealElement.hide()
    },
    checkDropboxStatus: function() {
        0 !== this.dropboxElement.length && (this.dropboxStatusXHR && this.dropboxStatusXHR.abort(),
        this.dropboxStatusXHR = $.get(SL.config.AJAX_SERVICES_USER).done(function(e) {
            var t = "string" == typeof this.dropboxPollGoal;
            e && e.dropbox_connected ? (this.dropboxContents.html('<p>Your changes are automatically saved to Dropbox. <a href="http://help.slides.com/knowledgebase/articles/229620" target="_blank">Learn more.</a></p><button class="button negative disconnect-dropbox l">Disconnect</button>'),
            this.dropboxContents.find(".disconnect-dropbox").on("click", this.onDropboxDisconnectClicked.bind(this)),
            t && "connected" === this.dropboxPollGoal ? (this.dropboxPollJob.stop(),
            this.dropboxPollGoal = null,
            $.ajax({
                type: "POST",
                url: SL.config.AJAX_DROPBOX_SYNC_DECK(SLConfig.deck.id),
                data: {}
            })) : SL.view.hasSavedThisSession() || (this.dropboxContents.append('<button class="button outline sync-dropbox l">Sync now</button>'),
            this.dropboxContents.find(".sync-dropbox").on("click", this.onDropboxSyncClicked.bind(this))),
            this.layout()) : (this.dropboxContents.html('<p>Connect with Dropbox to automatically sync your work. Decks in your Dropbox folder can be viewed offline. <a href="http://help.slides.com/knowledgebase/articles/229620" target="_blank">Learn more.</a></p><button class="button connect-dropbox l">Connect Dropbox</button>'),
            this.dropboxContents.find("button").on("click", this.onDropboxConnectClicked.bind(this)),
            t && "disconnected" === this.dropboxPollGoal && (this.dropboxPollJob.stop(),
            this.dropboxPollGoal = null),
            this.layout()),
            this.dropboxStatusXHR = null
        }
        .bind(this)))
    },
    onDropboxConnectClicked: function() {
        this.dropboxPollGoal = "connected",
        this.dropboxPollJob.start(),
        SL.util.openPopupWindow(SL.config.AJAX_DROPBOX_CONNECT, "Sync with Dropbox", 1024, 650)
    },
    onDropboxDisconnectClicked: function() {
        this.dropboxPollGoal = "disconnected",
        this.dropboxPollJob.start(),
        window.open(SL.config.AJAX_DROPBOX_DISCONNECT)
    },
    onDropboxSyncClicked: function() {
        $.ajax({
            type: "POST",
            url: SL.config.AJAX_DROPBOX_SYNC_DECK(SLConfig.deck.id),
            data: {}
        }).done(function() {
            SL.notify("Dropbox sync started")
        }).fail(function() {
            SL.notify("Dropbox sync failed", "negative")
        })
    },
    onDropboxPoll: function() {
        this.checkDropboxStatus()
    },
    onDropboxPollTimeout: function() {},
    onDownloadHTMLClicked: function() {
        window.open(SL.config.AJAX_EXPORT_DECK(SLConfig.deck.user.username, SLConfig.deck.slug || SLConfig.deck.id)),
        SL.analytics.trackEditor("Download as HTML")
    },
    onHTMLOutputClicked: function() {
        this.htmlOutputElement.select()
    },
    onCSSOutputClicked: function() {
        this.cssOutputElement.select()
    }
}),
SL("editor.components.sidebar").ImportFile = Class.extend({
    init: function(e) {
        this.panel = e,
        this.importCompleted = new signals.Signal,
        this.render(),
        this.bind(),
        this.reset(),
        SL.helpers.StreamEditor.singleton().connect()
    },
    render: function() {
        this.domElement = $(".sidebar-panel .import .import-from-file"),
        this.browseButton = this.domElement.find(".import-browse-button")
    },
    bind: function() {
        this.onFileInputChange = this.onFileInputChange.bind(this),
        this.onSocketMessage = this.onSocketMessage.bind(this)
    },
    reset: function() {
        this.hideOverlay(),
        this.stopTimeout(),
        this.createFileInput()
    },
    createFileInput: function() {
        this.browseFileInput && (this.browseFileInput.remove(),
        this.browseFileInput.off("change", this.onFileInputChange)),
        this.browseButton.off("click"),
        this.browseButton.removeClass("disabled"),
        this.browseButton.text("Select PDF/PPT file"),
        this.browseFileInput = $('<input class="file-input" type="file">').appendTo(this.browseButton),
        this.browseFileInput.on("change", this.onFileInputChange)
    },
    onFileInputChange: function(e) {
        e.preventDefault();
        var t = this.browseFileInput.get(0).files[0];
        if (t) {
            if (!t || "" !== t.type && !t.type.match(/powerpoint|presentationml|pdf/))
                return SL.notify("Only PDF or PPT files, please"),
                void this.createFileInput();
            if ("number" == typeof t.size && t.size / 1024 > SL.config.MAX_IMPORT_UPLOAD_SIZE.maxsize)
                return SL.notify("No more than " + Math.round(MAX_IMPORT_UPLOAD_SIZE / 1e3) + "mb please", "negative"),
                void this.createFileInput();
            SL.analytics.trackEditor("Import PDF/PPT", "file selected");
            var i = t.name || "untitled";
            i = i.trim(),
            i = i.replace(/\s/g, "-").replace(/[^a-zA-Z0-9-_\.]*/g, ""),
            this.enterProcessingState(),
            $.ajax({
                type: "POST",
                url: SL.config.AJAX_PDF_IMPORT_NEW,
                data: {
                    deck_id: SLConfig.deck.id,
                    filename: i
                },
                context: this
            }).fail(function() {
                SL.notify("Failed to upload, please try again", "negative"),
                this.hideOverlay()
            }).done(function(e) {
                this.uploadFile(e.id, e.upload_url)
            })
        } else
            SL.notify("Failed to upload, please try again", "negative")
    },
    uploadFile: function(e, t) {
        var i = this.browseFileInput.get(0).files[0];
        if ("string" != typeof t || t.length < 3)
            return SL.notify("Invalid upload URL, try reopening the imports page", "negative"),
            void this.createFileInput();
        SL.analytics.trackEditor("Import PDF/PPT", "upload started");
        var n = new SL.helpers.FileUploader({
            file: i,
            method: "PUT",
            external: !0,
            formdata: !1,
            contentType: !0,
            service: t,
            timeout: 9e5
        });
        n.succeeded.add(function() {
            n.destroy(),
            this.createFileInput(),
            this.startTimeout(),
            SL.analytics.trackEditor("Import PDF/PPT", "upload complete"),
            $.ajax({
                type: "PUT",
                url: SL.config.AJAX_PDF_IMPORT_UPLOADED(e),
                data: {
                    "import": {
                        upload_complete: !0
                    }
                },
                context: this
            }).fail(function() {
                this.hideOverlay(),
                SL.notify("An error occurred while processing your file", "negative")
            }).done(function() {
                SL.analytics.trackEditor("Import PDF/PPT", "upload_complete sent")
            })
        }
        .bind(this)),
        n.progressed.add(function(e) {
            this.setProgress(25 * e)
        }
        .bind(this)),
        n.failed.add(function() {
            n.destroy(),
            this.createFileInput(),
            this.hideOverlay(),
            SL.notify("An error occurred while uploading your file", "negative")
        }
        .bind(this)),
        n.upload()
    },
    showOverlay: function(e, t) {
        this.overlay || (this.overlay = $('<div class="import-overlay">').appendTo(document.body),
        this.overlayInner = $('<div class="import-overlay-inner">').appendTo(this.overlay),
        this.overlayHeader = $('<div class="import-overlay-header">').appendTo(this.overlayInner),
        this.overlayBody = $('<div class="import-overlay-body">').appendTo(this.overlayInner),
        this.overlayFooter = $('<div class="import-overlay-footer">').appendTo(this.overlayInner),
        SL.helpers.StreamEditor.singleton().messageReceived.add(this.onSocketMessage),
        setTimeout(function() {
            this.overlay.addClass("visible")
        }
        .bind(this), 1)),
        this.overlayInner.attr("data-state", e),
        this.overlayHeader.html("<h3>" + t + "</h3>"),
        this.overlayBody.empty(),
        this.overlayFooter.empty()
    },
    hideOverlay: function() {
        this.overlay && (this.overlay.remove(),
        this.overlay = null,
        this.stopTimeout(),
        SL.helpers.StreamEditor.singleton().messageReceived.remove(this.onSocketMessage))
    },
    enterProcessingState: function() {
        this.showOverlay("processing", "Processing"),
        this.overlayBody.html(['<div class="progress">', '<div class="progress-text">Uploading</div>', '<div class="progress-spinner spinner" data-spinner-color="#333"></div>', '<div class="progress-inner">', '<div class="progress-text">Uploading</div>', "</div>", "</div>"].join("")),
        SL.util.html.generateSpinners()
    },
    enterErrorState: function(e) {
        e = e || {},
        this.showOverlay("error", "Something went wrong..."),
        this.overlayBody.html(['<div class="error">', '<p class="error-text">' + (e.message || "Sorry about that. We're looking into it.") + "</p>", "</div>"].join("")),
        this.overlayFooter.html(['<button class="button l outline cancel-button">Close</button>'].join("")),
        this.overlayFooter.find(".cancel-button").on("click", function() {
            this.hideOverlay()
        }
        .bind(this)),
        SL.util.html.generateSpinners()
    },
    enterFinishedState: function(e) {
        if (SL.analytics.trackEditor("Import PDF/PPT", "import complete"),
        this.stopTimeout(),
        e.output && e.output.length > 0) {
            this.showOverlay("finished", "Finished"),
            this.overlayBody.html(['<p>The following <strong><span class="slide-count"></span> slides</strong> will be added.</p>', '<div class="preview"></div>', '<div class="options">', '<div class="sl-checkbox outline">', '<input id="import-append-checkbox" value="" type="checkbox">', '<label for="import-append-checkbox" data-tooltip="Append the imported slides after any existing slides instead of replacing them." data-tooltip-maxwidth="300">Append slides</label>', "</div>", '<div class="sl-checkbox outline">', '<input id="import-inline-checkbox" value="" type="checkbox">', '<label for="import-inline-checkbox" data-tooltip="Turn this on if you intend to overlay new content on top of imported slides. If left off, slides will be added as background images for the largest possible visual footprint." data-tooltip-maxwidth="300">Insert inline</label>', "</div>", "</div>"].join("")),
            this.overlayFooter.html(['<button class="button l outline cancel-button">Cancel</button>', '<button class="button l positive confirm-button">Import</button>'].join(""));
            var t = this.overlayBody.find(".preview")
              , i = function() {
                this.overlayBody.find(".slide-count").text(t.find(".preview-slide").not(".excluded").length)
            }
            .bind(this);
            e.output.forEach(function(e) {
                var n = $('<div class="preview-slide">');
                n.attr({
                    "data-background-image": e,
                    "data-background-image-original": e
                }),
                n.appendTo(t),
                n.on("click", function() {
                    n.hasClass("excluded") ? n.removeClass("excluded").html("") : n.addClass("excluded").html('<div class="preview-slide-excluded-overlay"><span class="icon i-denied"></span></div>'),
                    i()
                }
                .bind(this))
            }
            .bind(this)),
            t.on("scroll", this.loadVisiblePreviewThumbs.bind(this)),
            this.loadVisiblePreviewThumbs(),
            this.checkImportResolution(e.output[0]),
            i()
        } else
            this.showOverlay("finished-error", "Unexpected Error"),
            this.overlayBody.html("No slides were returned from the server."),
            this.overlayFooter.html('<button class="button l outline cancel-button">Close</button>');
        this.overlayFooter.find(".cancel-button").on("click", function() {
            this.hideOverlay()
        }
        .bind(this)),
        this.overlayFooter.find(".confirm-button").on("click", function() {
            var e, i = this.overlayBody.find("#import-append-checkbox").is(":checked"), n = this.overlayBody.find("#import-inline-checkbox").is(":checked");
            if (n) {
                var r = SL.util.deck.getSlideSize()
                  , o = r.width
                  , s = r.height
                  , a = this.importWidth
                  , l = this.importHeight;
                if (!a || !l)
                    return void SL.notify("Unable to detect slide width/height for inline layout. Please try a new import.", "negative");
                e = t.find(".preview-slide").not(".excluded").map(function() {
                    return "<section>" + SL.data.templates.generateFullSizeImageBlock($(this).attr("data-background-image-original"), a, l, o, s) + "</section>"
                })
            } else
                e = t.find(".preview-slide").not(".excluded").map(function() {
                    return '<section data-background-image="' + $(this).attr("data-background-image-original") + '" data-background-size="contain"></section>'
                });
            SL.editor.controllers.Markup.importSlides(e, !i),
            i || (SLConfig.deck.background_transition = "none",
            Reveal.configure({
                backgroundTransition: SLConfig.deck.background_transition
            })),
            this.hideOverlay(),
            this.importCompleted.dispatch()
        }
        .bind(this))
    },
    checkImportResolution: function(e, t) {
        this.importWidth = null,
        this.importHeight = null;
        var i = new Image;
        i.addEventListener("load", function() {
            this.importWidth = i.naturalWidth,
            this.importHeight = i.naturalHeight,
            SL.util.callback(t)
        }
        .bind(this)),
        i.setAttribute("src", e)
    },
    loadVisiblePreviewThumbs: function() {
        var e = this.overlayBody.find(".preview");
        if (e.length) {
            var t = e.scrollTop()
              , i = t + e.outerHeight()
              , n = e.find(".preview-slide").first().outerHeight();
            e.find(".preview-slide").not(".loaded").each(function(e, r) {
                var o = r.offsetTop
                  , s = o + n;
                s > t && i > o && (r = $(r),
                r.css("background-image", 'url("' + r.attr("data-background-image") + '")'),
                r.addClass("loaded"))
            })
        }
    },
    setProgress: function(e) {
        this.overlayBody.find(".progress-inner").css("width", Math.round(e) + "%")
    },
    startTimeout: function() {
        clearTimeout(this.importTimeout),
        this.importTimeout = setTimeout(function() {
            SL.notify("Timed out while trying to import. Please try again.", "negative"),
            this.hideOverlay()
        }
        .bind(this), SL.config.IMPORT_SOCKET_TIMEOUT)
    },
    stopTimeout: function() {
        clearTimeout(this.importTimeout)
    },
    onSocketMessage: function(e) {
        if (e) {
            var t = e.type.split(":")[0]
              , i = e.type.split(":")[1];
            "import" === t && ("complete" === i ? this.enterFinishedState(e) : "error" === i ? this.enterErrorState(e) : (this.startTimeout(),
            this.overlayBody.find(".progress-text").text(e.message),
            this.setProgress(25 + 75 * e.progress)))
        }
    }
}),
SL("editor.components.sidebar").ImportReveal = Class.extend({
    init: function(e) {
        this.panel = e,
        this.domElement = $(".sidebar-panel .import .import-from-reveal"),
        this.importInput = this.domElement.find(".import-input"),
        this.importStatus = this.domElement.find(".import-status"),
        this.importStatusText = this.domElement.find(".import-status .text"),
        this.importStatusIcon = this.domElement.find(".import-status .icon"),
        this.importStatusProceed = this.domElement.find(".import-status .proceed"),
        this.importCompleted = new signals.Signal,
        this.bind()
    },
    bind: function() {
        this.importInput.on("input", this.onInputChange.bind(this)),
        this.importStatusProceed.on("click", this.onImportConfirmed.bind(this))
    },
    reset: function() {
        this.importInput.val(""),
        this.importStatus.removeClass("visible")
    },
    validate: function() {
        var e, t, i = $.trim(this.importInput.val());
        if (i.length > 2) {
            try {
                e = $(i)
            } catch (n) {
                t = "Failed to read HTML, make sure it's valid"
            }
            if (e && (e = e.not("meta, script, link, style"),
            e.find("meta, script, link, style").remove(),
            e.is(".slides") && (e = $("<div>").append(e)),
            0 === e.find(".slides>section").length && (t = "Couldn't find any sections inside of .slides"),
            0 === e.find(".slides").length && (t = "Couldn't find a .slides container")),
            this.importStatus.addClass("visible"),
            !t) {
                var r = e.find(".slides section").length;
                return this.importStatus.attr("data-state", "success"),
                this.importStatusText.html("Ready to import <strong>" + r + "</strong> slides."),
                this.importStatusIcon.removeClass("i-bolt").addClass("i-checkmark"),
                e.find(".slides>section")
            }
            this.importStatus.attr("data-state", "error"),
            this.importStatusText.html(t),
            this.importStatusIcon.removeClass("i-checkmark").addClass("i-bolt")
        } else
            this.importStatus.removeClass("visible");
        return null
    },
    onInputChange: function() {
        this.validate()
    },
    onImportConfirmed: function(e) {
        var t = this.validate();
        t && t.length && SL.prompt({
            anchor: $(e.currentTarget),
            title: SL.locale.get("DECK_IMPORT_HTML_CONFIRM"),
            type: "select",
            data: [{
                html: "<h3>Cancel</h3>"
            }, {
                html: "<h3>Import</h3>",
                selected: !0,
                className: "positive",
                callback: function() {
                    SL.editor.controllers.Markup.importSlides(t, !0),
                    this.reset(),
                    this.importCompleted.dispatch()
                }
                .bind(this)
            }]
        })
    }
}),
SL("editor.components.sidebar").Import = SL.editor.components.sidebar.Base.extend({
    init: function() {
        this.domElement = $(".sidebar-panel .import"),
        this._super()
    },
    setupFileImport: function() {
        this.importFile ? this.importFile.reset() : (this.importFile = new SL.editor.components.sidebar.ImportFile(this),
        this.importFile.importCompleted.add(this.onImportCompleted.bind(this)))
    },
    setupRevealImport: function() {
        this.importReveal ? this.importReveal.reset() : (this.importReveal = new SL.editor.components.sidebar.ImportReveal(this),
        this.importReveal.importCompleted.add(this.onImportCompleted.bind(this)))
    },
    open: function() {
        SL.view.isNewDeck() ? SL.view.save(function() {
            this.setupFileImport()
        }
        .bind(this)) : this.setupFileImport(),
        this.setupRevealImport(),
        this._super()
    },
    close: function() {
        this._super()
    },
    onImportCompleted: function() {
        this.close(),
        this.onclose.dispatch()
    }
}),
SL("editor.components.sidebar").Revisions = SL.editor.components.sidebar.Base.extend({
    init: function() {
        this.domElement = $(".sidebar-panel .revisions"),
        this.listElement = this.domElement.find(".version-list"),
        this.panelBody = this.domElement.find(".panel-body"),
        this._super()
    },
    bind: function() {
        this._super(),
        this.onPanelScroll = this.onPanelScroll.bind(this),
        this.onPanelScroll = $.debounce(this.onPanelScroll, 200)
    },
    reset: function() {
        this.loadedAllPages = !1,
        this.loading = !1,
        this.page = 1,
        this.listElement.empty(),
        this.domElement.attr("data-state", "loading")
    },
    open: function() {
        this.reset(),
        clearTimeout(this.loadTimeout),
        this.loadTimeout = setTimeout(this.load.bind(this), 500),
        this.panelBody.on("scroll", this.onPanelScroll),
        this._super()
    },
    close: function() {
        this._super(),
        clearTimeout(this.loadTimeout),
        this.panelBody.off("scroll", this.onPanelScroll)
    },
    load: function() {
        this.loading || this.loadedAllPages || (this.loading = !0,
        $.ajax({
            url: SL.config.AJAX_GET_DECK_VERSIONS(SLConfig.deck.id, this.page),
            data: {
                page: this.page
            },
            context: this
        }).done(function(e) {
            this.addVersions(e.results),
            this.layout(),
            0 === e.results.length && (this.loadedAllPages = !0)
        }).fail(function() {
            SL.notify(SL.locale.get("GENERIC_ERROR")),
            this.domElement.attr("data-state", "error"),
            this.layout()
        }).always(function() {
            this.loading = !1,
            this.page += 1
        }))
    },
    addVersions: function(e) {
        e.forEach(this.addVersion.bind(this)),
        SL.view.parseTimes(),
        this.listElement.find("li").length > 0 ? this.domElement.attr("data-state", "populated") : this.domElement.attr("data-state", "empty")
    },
    addVersion: function(e) {
        var t = $("<li>").appendTo(this.listElement)
          , i = $('<span class="text">').appendTo(t);
        i.append(moment(e.created_at).format("MMM DD, hh:mm a")),
        i.append(' <time class="ago de-em" datetime="' + e.created_at + '"></time>');
        var n = $('<div class="actions">').appendTo(t)
          , r = $('<button class="button outline restore" data-tooltip="Restore" data-tooltip-delay="500"><span class="icon i-undo"></button>').appendTo(n);
        r.on("click", this.onRestoreClicked.bind(this, e));
        var o = $('<a class="button outline preview" data-tooltip="Preview" data-tooltip-delay="500"><span class="icon i-eye"></span></a>').appendTo(n);
        o.attr({
            href: SL.config.AJAX_PREVIEW_DECK_VERSION(SLConfig.deck.user.username, SLConfig.deck.slug || SLConfig.deck.id, e.content_uuid),
            target: "_blank"
        }),
        o.on("click", this.onPreviewClicked.bind(this, e, o))
    },
    onPreviewClicked: function(e, t, i) {
        var n = t.attr("href")
          , r = SL.popup.open(SL.components.popup.Revision, {
            revisionURL: n,
            revisionTimeAgo: moment(e.created_at).fromNow()
        });
        r.restoreRequested.add(this.onRestoreClicked.bind(this, e)),
        r.externalRequested.add(this.onExternalClicked.bind(this, n)),
        SL.analytics.trackEditor("Revision preview"),
        i.preventDefault()
    },
    onRestoreClicked: function(e, t) {
        SL.prompt({
            anchor: $(t.currentTarget),
            title: SL.locale.get("DECK_RESTORE_CONFIRM", {
                time: moment(e.created_at).fromNow()
            }),
            type: "select",
            data: [{
                html: "<h3>Cancel</h3>"
            }, {
                html: "<h3>Restore</h3>",
                selected: !0,
                className: "negative",
                callback: this.onRestoreConfirmed.bind(this, e)
            }]
        }),
        t.preventDefault()
    },
    onRestoreConfirmed: function(e) {
        SL.analytics.trackEditor("Revision restore"),
        SL.helpers.PageLoader.show({
            message: "Restoring..."
        }),
        $.ajax({
            type: "post",
            url: SL.config.AJAX_RESTORE_DECK_VERSION(SLConfig.deck.id, e.id),
            data: e,
            context: this
        }).done(function(e) {
            e && "string" == typeof e.slug ? window.location = SL.routes.DECK_EDIT(SLConfig.deck.user.username, e.slug || SLConfig.deck.id) : window.location.reload()
        }).fail(function() {
            SL.notify(SL.locale.get("GENERIC_ERROR")),
            this.layout(),
            SL.helpers.PageLoader.hide()
        })
    },
    onExternalClicked: function(e, t) {
        window.open(e),
        t.preventDefault()
    },
    onPanelScroll: function() {
        var e = this.panelBody.scrollTop()
          , t = this.panelBody.prop("scrollHeight")
          , i = this.panelBody.outerHeight()
          , n = e / (t - i);
        n > .8 && this.load()
    }
}),
SL("editor.components.sidebar").Settings = SL.editor.components.sidebar.Base.extend({
    init: function() {
        this.domElement = $(".sidebar-panel .settings"),
        this.rtlToggle = this.domElement.find('.sl-checkbox input[value="rtl"]'),
        this.loopToggle = this.domElement.find('.sl-checkbox input[value="should_loop"]'),
        this.commentsEnabledToggle = this.domElement.find('.sl-checkbox input[value="comments_enabled"]'),
        this.forkingEnabledToggle = this.domElement.find('.sl-checkbox input[value="forking_enabled"]'),
        this.shareNotesToggle = this.domElement.find('.sl-checkbox input[value="share_notes"]'),
        this.slideNumberToggle = this.domElement.find('.sl-checkbox input[value="slide_number"]'),
        this.titleInput = this.domElement.find("#deck-input-title"),
        this.descriptionInput = this.domElement.find("#deck-input-description"),
        this.slug = this.domElement.find(".slug"),
        this.slugInput = this.domElement.find("#deck-input-slug"),
        this.slugPrefix = this.domElement.find(".slug .text-prefix"),
        this.autoSlideInput = this.domElement.find("#deck-input-autoslide"),
        this.resolutionInput = new SL.components.Resolution({
            title: "Presentation size",
            values: SL.config.SLIDE_SIZES
        }),
        this.resolutionInput.domElement.insertBefore(this.domElement.find(".unit.autoslide")),
        this.resolutionInput.changed.add(this.applySelection.bind(this));
        var e = "http://help.slides.com/knowledgebase/articles/774057-presentation-size"
          , t = "This is the size that your deck is edited at. When viewed, it will automatically scale to fit any display size while maintaing the original aspect ratio.<br><br>Click for more info.";
        this.resolutionInput.domElement.prepend('<a href="' + e + '" target="_blank" class="icon i-info info-icon" data-tooltip="' + t + '" data-tooltip-maxwidth="275"></a>'),
        this.renderAutoSlideOptions(),
        this._super()
    },
    renderAutoSlideOptions: function() {
        var e = '<option value="0">Off</option>';
        SL.config.AUTO_SLIDE_OPTIONS.forEach(function(t) {
            e += '<option value="' + 1e3 * t + '">' + t + " seconds</option>"
        }),
        this.autoSlideInput.html(e)
    },
    bind: function() {
        this._super(),
        this.domElement.find(".sl-checkbox input").on("change", this.onToggleChange.bind(this)),
        this.titleInput.on("input", this.onTitleInput.bind(this)),
        this.slugInput.on("input", this.onSlugInput.bind(this)),
        this.slugInput.on("focus", this.onSlugFocus.bind(this)),
        this.slugInput.on("blur", this.onSlugBlur.bind(this)),
        this.descriptionInput.on("keypress", this.onDescriptionKeyPress.bind(this))
    },
    open: function() {
        this._super(),
        this.buffer(),
        this.updateSelection(),
        this.titleInput.val(SL.util.unescapeHTMLEntities(this.config.deck.title || "")),
        this.slugInput.val(this.config.deck.slug),
        this.descriptionInput.val(SL.util.unescapeHTMLEntities(this.config.deck.description || "")),
        this.autoSlideInput.val(this.config.deck.auto_slide_interval || 0),
        this.slugPrefix.text(window.location.host + "/" + SLConfig.current_user.username + "/"),
        this.slugInput.css("padding-left", this.slugPrefix.position().left + this.slugPrefix.width())
    },
    close: function() {
        this._super()
    },
    save: function() {
        var e = this.titleInput.val()
          , t = this.slugInput.val()
          , i = this.descriptionInput.val();
        if (!e)
            return SL.notify(SL.locale.get("DECK_EDIT_INVALID_TITLE"), "negative"),
            !1;
        if (!t)
            return SL.notify(SL.locale.get("DECK_EDIT_INVALID_SLUG"), "negative"),
            !1;
        this._super(),
        SLConfig.deck.title = e,
        SLConfig.deck.description = i ? i.replace(/\n/g, " ") : "",
        SLConfig.deck.slug = t,
        SLConfig.deck.rtl = this.rtlToggle.is(":checked"),
        SLConfig.deck.should_loop = this.loopToggle.is(":checked"),
        SLConfig.deck.comments_enabled = this.commentsEnabledToggle.is(":checked"),
        SLConfig.deck.forking_enabled = this.forkingEnabledToggle.is(":checked"),
        SLConfig.deck.share_notes = this.shareNotesToggle.is(":checked"),
        SLConfig.deck.slide_number = this.slideNumberToggle.is(":checked"),
        SLConfig.deck.auto_slide_interval = parseInt(this.autoSlideInput.val(), 10) || 0;
        var n = this.resolutionInput.getValue();
        return SLConfig.deck.width = n.width,
        SLConfig.deck.height = n.height,
        SLConfig.deck.dirty = !0,
        SL.analytics.trackEditor("Deck.edit: Setting saved"),
        $("html").toggleClass("rtl", SLConfig.deck.rtl),
        !0
    },
    updateSelection: function() {
        this.rtlToggle.prop("checked", this.config.deck.rtl),
        this.loopToggle.prop("checked", this.config.deck.should_loop),
        this.commentsEnabledToggle.prop("checked", this.config.deck.comments_enabled),
        this.forkingEnabledToggle.prop("checked", this.config.deck.forking_enabled),
        this.shareNotesToggle.prop("checked", this.config.deck.share_notes),
        this.slideNumberToggle.prop("checked", this.config.deck.slide_number),
        this.resolutionInput.setValue(this.config.deck.width, this.config.deck.height)
    },
    applySelection: function() {
        var e = this.resolutionInput.getValue();
        Reveal.configure({
            width: e.width,
            height: e.height,
            rtl: this.rtlToggle.is(":checked"),
            loop: this.loopToggle.is(":checked"),
            slideNumber: this.slideNumberToggle.is(":checked")
        }),
        SL.editor.controllers.Grid.refresh(),
        SL.view.layout()
    },
    generateSlug: function() {
        if (this.deckIsPrivate() && this.slugIsUnchanged() || this.slugWasManuallyCleared) {
            var e = this.titleInput.val()
              , t = SL.util.string.slug(e);
            this.slugInput.val(t)
        }
    },
    deckIsPrivate: function() {
        return SLConfig.deck.visibility === SL.models.Deck.VISIBILITY_SELF
    },
    slugIsUnchanged: function() {
        return (SLConfig.deck.slug || "") === (SL.util.string.slug(SLConfig.deck.title) || "")
    },
    onToggleChange: function() {
        this.applySelection()
    },
    onTitleInput: function() {
        this.generateSlug()
    },
    onDescriptionKeyPress: function(e) {
        return 13 == e.keyCode ? !1 : void 0
    },
    onSlugInput: function() {
        this.slugWasManuallyCleared = "" === this.slugInput.val()
    },
    onSlugFocus: function() {
        this.deckIsPrivate() || SL.tooltip.show("Changing the URL of your deck will break existing links to it.", {
            anchor: this.slugInput,
            alignment: "r",
            maxwidth: 220
        })
    },
    onSlugBlur: function() {
        SL.tooltip.hide(),
        this.slugInput.val(SL.util.string.slug(this.slugInput.val()))
    }
}),
SL("editor.components.sidebar").Style = SL.editor.components.sidebar.Base.extend({
    init: function() {
        this.domElement = $(".sidebar-panel .style"),
        this._super()
    },
    bind: function() {
        this._super(),
        this.domElement.find(".edit-style").on("click", this.onAdvancedStylesCLicked.bind(this))
    },
    scroll: function() {
        this.domElement.find(".panel-body").scrollTop(0),
        $(".page-wrapper").scrollTop(0)
    },
    open: function() {
        this._super(),
        this.themeoptions ? this.themeoptions.populate(SL.models.Theme.fromDeck(SLConfig.deck)) : (this.themeoptions = new SL.components.ThemeOptions({
            center: !1,
            rollingLinks: !1,
            supportsCustomFonts: !0,
            fonts: SL.config.THEME_FONTS,
            colors: SL.config.THEME_COLORS,
            themes: SL.current_user.getThemes(),
            model: SL.models.Theme.fromDeck(SLConfig.deck),
            container: this.domElement.find(".panel-body")
        }),
        this.themeoptions.changed.add(this.onThemeOptionsChanged.bind(this))),
        this.scroll(),
        this.layout()
    },
    close: function() {
        this._super(),
        SL.view.layout(),
        SL.editor.controllers.Grid.refresh()
    },
    revert: function() {
        this._super(),
        SL.helpers.ThemeController.paint(SL.view.getCurrentTheme(), {
            center: !1,
            js: !1,
            width: SLConfig.deck.width,
            height: SLConfig.deck.height
        })
    },
    save: function() {
        var e = SL.view.getCurrentTheme()
          , t = this.themeoptions.getTheme()
          , i = e.get("id") == t.get("id")
          , n = (e.get("js") || "") == (t.get("js") || "");
        return i || n ? (this._super(),
        this.saveData(),
        !0) : (this.promptReload(),
        !1)
    },
    saveData: function() {
        var e = this.themeoptions.getTheme();
        SLConfig.deck.dirty = !0,
        SLConfig.deck.theme_id = e.get("id"),
        SLConfig.deck.width = e.get("width"),
        SLConfig.deck.height = e.get("height"),
        SLConfig.deck.theme_font = e.get("font"),
        SLConfig.deck.theme_color = e.get("color"),
        SLConfig.deck.center = e.get("center"),
        SLConfig.deck.rolling_links = e.get("rolling_links"),
        SLConfig.deck.transition = e.get("transition"),
        SLConfig.deck.background_transition = e.get("background_transition"),
        Reveal.configure({
            center: !1,
            rolling_links: SLConfig.deck.rolling_links,
            transition: SLConfig.deck.transition,
            backgroundTransition: SLConfig.deck.background_transition
        }),
        SL.editor.controllers.Thumbnail.invalidate(),
        SL.editor.controllers.Contrast.sync(),
        SL.view.onThemeChanged()
    },
    promptReload: function() {
        SL.prompt({
            anchor: this.domElement.find(".save"),
            title: "The editor needs to reload to apply your changes.",
            alignment: "t",
            type: "select",
            data: [{
                html: "<h3>Cancel</h3>"
            }, {
                html: "<h3>Continue</h3>",
                className: "positive",
                callback: this.saveAndReload.bind(this)
            }]
        })
    },
    saveAndReload: function() {
        this.saveData(),
        SL.view.save(function() {
            window.location.reload()
        }),
        SL.prompt({
            anchor: this.domElement.find(".save"),
            title: 'Saving and reloading...<div class="spinner centered-horizontally" data-spinner-color="#777"></div>',
            alignment: "t",
            optional: !1,
            options: []
        }),
        SL.util.html.generateSpinners()
    },
    onAdvancedStylesCLicked: function() {
        SL.analytics.trackEditor("Open CSS editor"),
        SL.editor.controllers.Mode.change("css")
    },
    onThemeOptionsChanged: function() {
        this.layout(),
        SL.view.layout(),
        SL.editor.controllers.Grid.refresh()
    }
}),
SL("editor.components").SlideOptions = Class.extend({
    init: function(e, t) {
        this.editor = e,
        this.options = $.extend({
            removeSlide: !0,
            backgroundColor: !0,
            backgroundImage: !0,
            customClasses: !0,
            fragment: !0,
            notes: !0,
            html: !0
        }, t),
        this.render(),
        this.bind()
    },
    render: function() {
        this.domElement = $('<div class="slide-options"></div>').appendTo($(".projector")),
        this.listElement = $("<ul></ul>").appendTo(this.domElement),
        this.renderOptions()
    },
    configure: function(e) {
        this.options = $.extend(this.options, e),
        this.renderOptions()
    },
    renderOptions: function() {
        this.removeSlideElement && this.removeSlideElement.remove(),
        this.backgroundColorElement && this.backgroundColorElement.remove(),
        this.backgroundImageElement && this.backgroundImageElement.remove(),
        this.backgroundImageMenu && this.backgroundImageMenu.remove(),
        this.customClassesElement && this.customClassesElement.remove(),
        this.fragmentElement && this.fragmentElement.remove(),
        this.notesElement && this.notesElement.remove(),
        this.htmlElement && this.htmlElement.remove(),
        this.options.removeSlide && (this.removeSlideElement = this.renderOption("remove-slide", "i-trash-stroke", "Remove current slide"),
        this.removeSlideElement.on("vclick", this.onRemoveSlideClicked.bind(this))),
        this.options.backgroundColor && (this.backgroundColorElement = this.renderOption("background", "i-droplet", "Slide background color"),
        this.backgroundColorElement.on("vclick", this.onBackgroundColorClicked.bind(this))),
        this.options.backgroundImage && (this.backgroundImageElement = this.renderOption("background-image", "i-picture", "Slide background image"),
        this.renderBackgroundImageMenu(),
        this.backgroundImageElement.on("vclick", this.onBackgroundImageClicked.bind(this)),
        this.backgroundImageMenu.find(".background-size").on("change", this.onBackgroundImageSizeChanged.bind(this)),
        this.backgroundImageMenu.find(".background-position").on("change", this.onBackgroundImagePositionChanged.bind(this)),
        this.backgroundImageMenu.find(".remove-background").on("click", this.onBackgroundImageRemoveClicked.bind(this))),
        this.options.customClasses && (this.customClassesElement = this.renderOption("custom-classes", "i-star", "Slide classes"),
        this.customClassesElement.on("vclick", this.onCustomClassesClicked.bind(this)),
        this.syncCustomClasses()),
        this.options.fragment && (this.fragmentElement = this.renderOption("fragment", "i-bolt", "Create fragments<br>(SHIFT + ALT + F)"),
        this.fragmentElement.on("vclick", this.onFragmentClicked.bind(this))),
        this.options.notes && (this.notesElement = this.renderOption("notes", "i-book-alt2", "Speaker notes<br>(SHIFT + ALT + N)"),
        this.notesElement.on("vclick", this.onNotesClicked.bind(this))),
        this.options.html && (this.htmlElement = this.renderOption("html", "i-file-xml", "Edit HTML<br>(SHIFT + ALT + H)"),
        this.htmlElement.on("vclick", this.onHTMLClicked.bind(this)))
    },
    renderOption: function(e, t, i) {
        var n = $('<li><span class="icon ' + t + '"></span></li>');
        return n.attr({
            "class": "slide-option " + e,
            "data-tooltip": i,
            "data-tooltip-alignment": "l"
        }),
        n.appendTo(this.listElement),
        n
    },
    renderBackgroundImageMenu: function() {
        this.backgroundImageMenu = $('<div class="background-image-menu">').appendTo(this.domElement),
        this.backgroundImageInner = $('<div class="inner"></div>').appendTo(this.backgroundImageMenu);
        var e = $('<div class="upload-progress"></div>').appendTo(this.backgroundImageInner);
        e.append('<span class="spinner centered"></span>'),
        e.append('<span class="label">Uploading...</span>'),
        SL.util.html.generateSpinners();
        var t = $('<div class="upload-output"></div>').appendTo(this.backgroundImageInner);
        t.append('<div class="thumbnail"></div>');
        var i = $('<div class="background-image-options"></div>').appendTo(t);
        i.append(['<select class="sl-select white background-size">', '<option value="cover">Stretch</option>', '<option value="contain">Fit</option>', '<option value="initial">Original</option>', "</select>"].join("")),
        i.append(['<select class="sl-select white background-position">', '<option value="0% 0%">Top Left</option>', '<option value="50% 0%">Top</option>', '<option value="100% 0%">Top Right</option>', '<option value="50% 50%">Center</option>', '<option value="0% 100%">Bottom Left</option>', '<option value="50% 100%">Bottom</option>', '<option value="100% 100%">Bottom Right</option>', "</select>"].join("")),
        i.append('<button class="button remove-background">Remove</button>')
    },
    bind: function() {
        this.onDocumentMouseDown = this.onDocumentMouseDown.bind(this),
        $(document).on("mousedown touchstart", this.onDocumentMouseDown),
        SL.editor.controllers.Markup.slidesChanged.add(this.syncRemoveSlide.bind(this))
    },
    collapse: function() {
        this.hideOpenPanels()
    },
    hideOpenPanels: function() {
        this.backgroundColorMenu && this.hideBackgroundColorMenu(),
        this.backgroundImageMenu && this.hideBackgroundImageMenu()
    },
    hasOpenPanel: function() {
        return this.backgroundColorMenu && this.backgroundColorMenu.hasClass("show") || this.backgroundImageMenu && this.backgroundImageMenu.hasClass("show")
    },
    showOverflowWarning: function() {
        this.overflowWarning || SL.editor.controllers.Capabilities.isTouchEditor() || (this.overflowWarning = $('<div class="overflow-warning"><span class="icon i-info"></span></div>'),
        this.overflowWarning.attr({
            "class": "overflow-warning",
            "data-tooltip": "Please keep content inside of the dotted outline. Content placed outside may not be visible on all display sizes.",
            "data-tooltip-maxwidth": 300,
            "data-tooltip-alignment": "l"
        })),
        this.overflowWarning && 0 === this.overflowWarning.parent().length && this.overflowWarning.appendTo(this.domElement)
    },
    hideOverflowWarning: function() {
        this.overflowWarning && this.overflowWarning.remove()
    },
    syncRemoveSlide: function() {
        this.removeSlideElement && this.removeSlideElement.toggleClass("disabled", $(".reveal .slides section").length < 2)
    },
    syncCustomClasses: function() {
        var e = this.editor.getCurrentTheme();
        if (e) {
            var t = SL.util.string.getCustomClassesFromLESS(e.get("less"));
            this.customClassesElement.toggleClass("disabled", 0 === t.length)
        }
    },
    syncBackgroundImageMenu: function() {
        var e = $(Reveal.getCurrentSlide())
          , t = e.attr("data-background-image")
          , i = e.attr("data-background-size")
          , n = e.attr("data-background-position")
          , r = this.backgroundImageMenu.find(".upload-output .thumbnail")
          , o = this.backgroundImageMenu.find(".upload-output .background-size")
          , s = this.backgroundImageMenu.find(".upload-output .background-position");
        "string" == typeof t && t.length ? (r.css({
            "background-image": 'url("' + t + '")',
            "background-repeat": "no-repeat",
            "background-size": "cover"
        }),
        o.val(i || "cover"),
        s.val(n || "50% 50%"),
        this.backgroundImageMenu.attr("data-state", "uploaded"),
        this.backgroundImageMenu.addClass("show")) : this.backgroundImageModel ? (r.css("background-image", "none"),
        this.backgroundImageMenu.attr("data-state", "uploading"),
        this.backgroundImageMenu.addClass("show")) : (r.css("background-image", "none"),
        this.backgroundImageMenu.attr("data-state", ""),
        this.backgroundImageMenu.removeClass("show"))
    },
    triggerNotes: function() {
        if (!this.notesPrompt) {
            SL.util.deck.afterSlidesChanged();
            var e = $(Reveal.getCurrentSlide()).attr("data-id")
              , t = ""
              , i = "http://help.slides.com/knowledgebase/articles/729753-sharing-decks-with-speaker-notes";
            t = SLConfig.deck.share_notes === !0 ? 'Your notes are <a href="' + i + '" target="_blank">publicly visible</a>.' : 'Your notes are private, learn how to <a href="' + i + '" target="_blank">share them</a>.',
            this.notesPrompt = SL.prompt({
                anchor: this.notesElement,
                alignment: this.getPopoverAlignment(),
                title: "Speaker Notes",
                subtitle: t,
                type: "input",
                confirmLabel: "Save",
                data: {
                    value: SLConfig.deck.notes[e],
                    placeholder: "Enter notes in plain text...",
                    multiline: !0,
                    maxlength: SL.config.SPEAKER_NOTES_MAXLENGTH,
                    maxlengthHidden: !0,
                    confirmBeforeDiscard: !0
                }
            }),
            this.notesPrompt.confirmed.add(function(t) {
                SLConfig.deck.notes[e] = t,
                SLConfig.deck.dirty = !0,
                SL.analytics.trackEditor("Saved notes")
            }),
            this.notesPrompt.destroyed.add(function() {
                this.notesPrompt = null
            }
            .bind(this))
        }
    },
    triggerHTML: function() {
        var e = SL.popup.open(SL.components.popup.EditSlideHTML, {
            slide: Reveal.getCurrentSlide()
        });
        e.saved.add(function(e) {
            SL.editor.controllers.Markup.writeHTMLToCurrentSlide(e),
            $(Reveal.getCurrentSlide()).find("style").each(function() {
                SL.util.prefixSelectorsInStyle(this, ".reveal ")
            }),
            Reveal.sync()
        }
        .bind(this)),
        SL.analytics.trackEditor("Edit per-slide HTML")
    },
    triggerCustomClasses: function() {
        if (!this.customClassesPrompt) {
            var e = this.editor.getCurrentTheme();
            if (e) {
                var t = SL.util.string.getCustomClassesFromLESS(e.get("less"));
                if (t.length) {
                    var i = $(Reveal.getCurrentSlide())
                      , n = t.map(function(e) {
                        return {
                            value: e,
                            selected: i.hasClass(e),
                            callback: function(e) {
                                i.toggleClass(e),
                                Reveal.sync()
                            }
                        }
                    });
                    this.customClassesPrompt = SL.prompt({
                        anchor: this.customClassesElement,
                        alignment: this.getPopoverAlignment(),
                        title: "Slide classes",
                        type: "list",
                        data: n,
                        multiselect: !0,
                        optional: !0
                    }),
                    this.customClassesPrompt.destroyed.add(function() {
                        this.customClassesPrompt = null
                    }
                    .bind(this))
                }
            }
        }
    },
    triggerBackgroundImageBrowser: function() {
        var e = Reveal.getCurrentSlide()
          , t = Reveal.getIndices(e)
          , i = SL.popup.open(SL.components.medialibrary.MediaLibrary, {
            select: SL.models.Media.IMAGE
        });
        i.selected.addOnce(function(i) {
            this.backgroundImageModel = i,
            this.syncBackgroundImageMenu(),
            i.isUploaded() ? this.onBackgroundImageUploadSuccess(e, t) : (i.uploadCompleted.add(function() {
                this.onBackgroundImageUploadSuccess(e, t)
            }
            .bind(this)),
            i.uploadFailed.add(this.onBackgroundImageUploadError.bind(this)))
        }
        .bind(this))
    },
    hideBackgroundColorMenu: function() {
        SL.view.colorpicker.hide()
    },
    hideBackgroundImageMenu: function() {
        this.backgroundImageMenu.removeClass("show")
    },
    setBackgroundColor: function(e) {
        Reveal.getCurrentSlide().setAttribute("data-background-color", e),
        Reveal.sync(),
        SL.editor.controllers.Contrast.sync()
    },
    clearBackgroundColor: function() {
        Reveal.getCurrentSlide().removeAttribute("data-background-color"),
        Reveal.sync(),
        SL.editor.controllers.Contrast.sync()
    },
    setAlignment: function(e) {
        this.alignment !== e && (this.alignment = e,
        this.domElement.attr("data-alignment", e),
        this.domElement.find(".slide-option[data-tooltip]").attr("data-tooltip-alignment", this.getPopoverAlignment()))
    },
    getPopoverAlignment: function() {
        return "l" === this.domElement.attr("data-alignment") ? "r" : "l"
    },
    getWidth: function() {
        return this.width || (this.width = this.domElement.width()),
        this.width
    },
    onRemoveSlideClicked: function(e) {
        SL.editor.controllers.Blocks.blur(),
        SL.prompt({
            anchor: $(e.currentTarget),
            title: SL.locale.get("DECK_DELETE_SLIDE_CONFIRM"),
            alignment: this.getPopoverAlignment(),
            type: "select",
            data: [{
                html: "<h3>Cancel</h3>"
            }, {
                html: "<h3>Remove</h3>",
                selected: !0,
                className: "negative",
                callback: function() {
                    SL.editor.controllers.Markup.removeCurrentSlide()
                }
                .bind(this)
            }]
        }),
        e.preventDefault()
    },
    onFragmentClicked: function(e) {
        e.preventDefault(),
        SL.editor.controllers.Mode.change("fragment")
    },
    onBackgroundColorClicked: function(e) {
        e.preventDefault(),
        this.hideBackgroundImageMenu();
        var t = {
            anchor: this.backgroundColorElement,
            alignment: this.getPopoverAlignment(),
            alpha: !1,
            changeCallback: this.setBackgroundColor.bind(this),
            resetCallback: this.clearBackgroundColor.bind(this)
        }
          , i = Reveal.getCurrentSlide();
        i.hasAttribute("data-background-color") && (t.color = i.getAttribute("data-background-color")),
        SL.view.colorpicker.toggle(t),
        SL.analytics.trackEditor("Toggle background color menu")
    },
    onBackgroundImageClicked: function(e) {
        e.preventDefault(),
        this.syncBackgroundImageMenu(),
        this.hideBackgroundColorMenu();
        var t = 144
          , i = 36;
        this.backgroundImageMenu.addClass("immediate"),
        this.backgroundImageMenu.css("top", this.backgroundImageElement.position().top - (t - i) / 2),
        setTimeout(function() {
            this.backgroundImageMenu.removeClass("immediate")
        }
        .bind(this), 1),
        "" === this.backgroundImageMenu.attr("data-state") && this.triggerBackgroundImageBrowser(),
        SL.analytics.trackEditor("Toggle background image menu")
    },
    onBackgroundImageRemoveClicked: function(e) {
        Reveal.getCurrentSlide().removeAttribute("data-background-image"),
        Reveal.sync(),
        this.syncBackgroundImageMenu(),
        SL.analytics.trackEditor("Remove background image"),
        e.preventDefault()
    },
    onBackgroundImageSizeChanged: function() {
        var e = this.backgroundImageMenu.find(".background-size");
        Reveal.getCurrentSlide().setAttribute("data-background-size", e.val()),
        Reveal.sync(),
        this.syncBackgroundImageMenu()
    },
    onBackgroundImagePositionChanged: function() {
        var e = this.backgroundImageMenu.find(".background-position");
        Reveal.getCurrentSlide().setAttribute("data-background-position", e.val()),
        Reveal.sync(),
        this.syncBackgroundImageMenu()
    },
    onBackgroundImageUploadSuccess: function(e, t) {
        var i = this.backgroundImageModel.get("url");
        e.setAttribute("data-background-image", i),
        Reveal.sync(),
        t && 0 === t.h && 0 === t.v && SL.editor.controllers.Thumbnail.generate(),
        SL.util.color.getImageColor(i).then(function(t) {
            e.hasAttribute("data-background-image") && t.a > .95 && e.setAttribute("data-background-color", "rgb(" + t.r + "," + t.g + "," + t.b + ")"),
            Reveal.sync()
        }, function() {}),
        this.backgroundImageModel = null,
        this.syncBackgroundImageMenu()
    },
    onBackgroundImageUploadError: function() {
        this.backgroundImageModel = null,
        this.syncBackgroundImageMenu()
    },
    onHTMLClicked: function(e) {
        e.preventDefault(),
        SL.editor.controllers.Blocks.blur(),
        this.triggerHTML()
    },
    onNotesClicked: function(e) {
        e.preventDefault(),
        this.triggerNotes()
    },
    onCustomClassesClicked: function(e) {
        e.preventDefault(),
        this.triggerCustomClasses()
    },
    onDocumentMouseDown: function(e) {
        var t = $(e.target);
        0 === t.parents(".slide-options, .sl-popup").length && this.collapse()
    }
}),
SL("editor.components").Toolbars = Class.extend({
    init: function(e) {
        this.editor = e,
        this.stack = [],
        this.render(),
        this.show(),
        this.push(new SL.editor.components.toolbars.Add)
    },
    render: function() {
        this.domElement = $('<div class="toolbars">').appendTo(document.body),
        this.innerElement = $('<div class="toolbars-inner">').appendTo(this.domElement),
        this.scrollerElement = $('<div class="toolbars-scroller">').appendTo(this.innerElement),
        this.footerElement = $('<div class="toolbars-footer"></div>').appendTo(this.domElement),
        SL.current_user.isPaid() ? SL.current_user.isLite() && !SL.current_user.isEnterprise() ? this.footerElement.append('<a class="pricing-link upgrade-button" data-tooltip="You\'re using Slides Lite.<br>Click to learn more about our plans." href="/pricing">Lite</a>') : SL.current_user.isPro() && !SL.current_user.isEnterprise() && this.footerElement.append('<a class="pricing-link upgrade-button" data-tooltip="You\'re using Slides Pro.<br>Click to learn more about our plans." href="/pricing">Pro</a>') : this.footerElement.append('<a class="pricing-link upgrade-button emphasize" data-tooltip="Gain access to offline presenting, private sharing, PDF exports and more.<br>Click to learn all about our plans." data-tooltip-maxwidth="270" href="/pricing">Upgrade</a>'),
        this.footerElement.find(".upgrade-button").on("click", function() {
            SL.analytics.trackEditor("Click upgrade link", "footer")
        }),
        SL.editor.controllers.Capabilities.isTouchEditor() || (this.footerElement.append('<div class="option editor-settings" data-tooltip="Editor settings"><span class="icon i-equalizer"></span></div>'),
        this.footerElement.find(".option.editor-settings").on("click", this.onSettingsClicked))
    },
    show: function() {
        this.domElement.addClass("visible")
    },
    hide: function() {
        this.domElement.removeClass("visible")
    },
    push: function(e) {
        this.stack.push(e),
        e.appendTo(this.scrollerElement),
        this.layout()
    },
    pop: function() {
        this.stack.length > 1 && this.stack.pop().destroyAfter(1e3),
        this.layout()
    },
    get: function(e) {
        return this.stack[this.stack.length - 1 + (e || 0)]
    },
    clear: function() {
        for (; this.stack.length > 1; )
            this.stack.pop().destroyAfter(1e3);
        this.layout()
    },
    sync: function() {
        this.stack.forEach(function(e) {
            e.sync()
        })
    },
    layout: function() {
        for (var e = 0, t = 0, i = this.stack.length; i > t; t++) {
            var n = this.stack[t];
            n.move(e, null),
            e += n.measure().width,
            i - 1 > t && n.collapse()
        }
        var r = this.get()
          , o = r.measure();
        this.domElement.find(".toolbar").removeClass("visible"),
        r.domElement.addClass("visible");
        var s = "translateX(" + -Math.round(o.x) + "px)";
        this.scrollerElement.css({
            "-webkit-transform": s,
            "-moz-transform": s,
            "-ms-transform": s,
            transform: s
        })
    },
    getToolbarMeasurements: function() {
        var e = this.innerElement.position()
          , t = {
            x: e.left,
            y: e.top,
            width: this.innerElement.width(),
            height: this.innerElement.height()
        };
        return t.bottom = t.y + t.height,
        t.right = t.x + t.width,
        t
    },
    hasOpenPanel: function() {
        return this.stack.some(function(e) {
            return e.hasOpenPanel()
        })
    },
    collapse: function() {
        this.stack.forEach(function(e) {
            e.collapse()
        })
    },
    onSettingsClicked: function(e) {
        this.settingsPrompt = SL.prompt({
            anchor: e.currentTarget,
            type: "custom",
            title: "Editor Settings",
            className: "editor-settings",
            html: ['<div class="editor-option sl-checkbox outline">', '<input id="editor-settings-grid" type="checkbox">', '<label for="editor-settings-grid" data-tooltip="Display a grid behind the slide to help with alignment." data-tooltip-delay="500" data-tooltip-alignment="r" data-tooltip-maxwidth="220">Grid</label>', "</div>", '<div class="editor-option sl-checkbox outline">', '<input id="editor-settings-snap" type="checkbox">', '<label for="editor-settings-snap" data-tooltip="Snap dragged blocks to the grid, slide edges and other blocks." data-tooltip-delay="500" data-tooltip-alignment="r" data-tooltip-maxwidth="220">Snap</label>', "</div>", '<div class="editor-option sl-checkbox outline">', '<input id="editor-settings-developer-mode" type="checkbox">', '<label for="editor-settings-developer-mode" data-tooltip="Turn on developer-friendly features:<br>- Per slide HTML editor.<br>- Access to full deck HTML, for exporting to reveal.js.<br>- Add class names to any focused block. Makes it easy to target content with custom CSS." data-tooltip-delay="500" data-tooltip-alignment="r" data-tooltip-maxwidth="340">Developer mode</label>', "</div>"].join("")
        });
        var t = this.settingsPrompt.getDOMElement().find("#editor-settings-grid");
        t.prop("checked", SL.current_user.settings.get("editor_grid")),
        t.on("change", function(e) {
            SL.current_user.settings.set("editor_grid", e.currentTarget.checked),
            SL.current_user.settings.save(["editor_grid"]),
            SL.editor.controllers.Grid.refresh(),
            SL.analytics.trackEditor("Toggle Grid")
        });
        var i = this.settingsPrompt.getDOMElement().find("#editor-settings-snap");
        i.prop("checked", SL.current_user.settings.get("editor_snap")),
        i.on("change", function(e) {
            SL.current_user.settings.set("editor_snap", e.currentTarget.checked),
            SL.current_user.settings.save(["editor_snap"]),
            SL.analytics.trackEditor("Toggle Snap")
        });
        var n = this.settingsPrompt.getDOMElement().find("#editor-settings-developer-mode");
        n.prop("checked", SL.current_user.settings.get("developer_mode")),
        n.on("change", function(e) {
            SL.current_user.settings.set("developer_mode", e.currentTarget.checked),
            SL.current_user.settings.save(["developer_mode"]),
            SL.view.slideOptions.configure({
                html: e.currentTarget.checked
            }),
            SL.analytics.trackEditor("Toggle Developer Mode")
        })
    }
}),
SL("editor.components.toolbars").Base = Class.extend({
    init: function() {
        this.render()
    },
    render: function() {
        this.domElement = $('<div class="toolbar">'),
        this.listElement = $('<div class="toolbar-list">').appendTo(this.domElement),
        this.scrollShadow = new SL.components.ScrollShadow({
            parentElement: this.domElement,
            contentElement: this.listElement,
            resizeContent: !1
        })
    },
    appendTo: function(e) {
        this.domElement.appendTo(e),
        this.scrollShadow.sync()
    },
    collapse: function() {
        this.getAllOptions().forEach(function(e) {
            "object" == typeof e.panel && e.panel.hide()
        })
    },
    sync: function() {
        this.getAllOptions().forEach(function(e) {
            "function" == typeof e.sync && e.sync()
        })
    },
    move: function(e, t) {
        this.domElement.css({
            left: e,
            top: t
        }),
        this.scrollShadow.sync()
    },
    measure: function() {
        var e = this.domElement.position();
        return {
            x: e.left,
            y: e.top,
            width: this.domElement.outerWidth(),
            height: this.domElement.outerHeight()
        }
    },
    hasOpenPanel: function() {
        return this.getAllOptions().some(function(e) {
            return !("object" != typeof e.panel || !e.panel.isVisible())
        })
    },
    getAllOptions: function() {
        var e = [];
        return "object" == typeof this.options && this.options.length && (e = e.concat(this.options),
        this.options.forEach(function(t) {
            "object" == typeof t.options && t.options.length && (e = e.concat(t.options))
        })),
        e
    },
    destroyAfter: function(e) {
        this.collapse(),
        clearTimeout(this.destroyTimeout),
        "number" == typeof e && (this.destroyTimeout = setTimeout(this.destroy.bind(this), e))
    },
    destroy: function() {
        this.domElement.remove(),
        this.scrollShadow.destroy()
    }
}),
SL("editor.components.toolbars").AddSnippet = SL.editor.components.toolbars.Base.extend({
    init: function() {
        this._super()
    },
    render: function() {
        this._super(),
        this.domElement.attr("data-type", "add"),
        this.sync()
    },
    sync: function() {
        this._super();
        var e = SL.view.getCurrentTheme();
        if (e) {
            var t = e.get("snippets");
            t && !t.isEmpty() && t.forEach(function(e) {
                var t = $('<div class="toolbar-add-snippet-option">');
                t.text(e.get("title")),
                t.appendTo(this.listElement),
                t.on("vclick", this.onSnippetClicked.bind(this, e))
            }
            .bind(this))
        }
    },
    insert: function(e, t) {
        SL.editor.controllers.Blocks.add({
            type: "snippet",
            slide: e,
            afterInit: function(e) {
                e.setCustomHTML(t),
                e.resizeToFitContent()
            }
        })
    },
    onSnippetClicked: function(e) {
        var t = $(Reveal.getCurrentSlide());
        if (e.templateHasVariables()) {
            var i = SL.popup.open(SL.components.popup.InsertSnippet, {
                snippet: e
            });
            i.snippetInserted.add(function(e) {
                this.insert(t, e)
            }
            .bind(this))
        } else {
            var n = e.get("template").replace(SL.models.ThemeSnippet.TEMPLATE_SELECTION_TAG, "");
            this.insert(t, n)
        }
    }
}),
SL("editor.components.toolbars").Add = SL.editor.components.toolbars.Base.extend({
    init: function() {
        this._super()
    },
    render: function() {
        this._super(),
        this.domElement.attr("data-type", "add"),
        SL.config.BLOCKS.forEach(function(e) {
            if (!e.hidden) {
                var t = $(['<div class="toolbar-add-block-option" data-block-type="' + e.type + '">', '<span class="toolbar-add-block-option-icon icon i-' + e.icon + '"></span>', '<span class="toolbar-add-block-option-label">' + e.label + "</span>", "</div>"].join(""));
                this.bindOption(t, e),
                t.appendTo(this.listElement)
            }
        }
        .bind(this)),
        this.renderSnippets()
    },
    renderSnippets: function() {
        this.snippetsOptions = $(['<div class="toolbar-add-block-option">', '<span class="toolbar-add-block-option-icon icon i-document-alt-stroke"></span>', '<span class="toolbar-add-block-option-label">Snippet</span>', "</div>"].join("")),
        this.snippetsOptions.on("vclick", function() {
            SL.view.toolbars.push(new SL.editor.components.toolbars.AddSnippet)
        }
        .bind(this))
    },
    sync: function() {
        this._super();
        var e = SL.view.getCurrentTheme();
        e && e.get("snippets") && !e.get("snippets").isEmpty() ? this.snippetsOptions.appendTo(this.listElement) : this.snippetsOptions.detach()
    },
    bindOption: function(e, t) {
        function i() {
            l || (SL.editor.controllers.Blocks.add({
                type: t.type,
                blockOptions: {
                    insertedFromToolbar: !0
                }
            }),
            SL.analytics.trackEditor("Insert block", t.type))
        }
        function n(e) {
            a = !0,
            l = !1,
            s = e.clientX,
            $(document).on("mousemove", r),
            $(document).on("mouseup", o),
            e.preventDefault()
        }
        function r(e) {
            if (a && !l && e.clientX - s > 10) {
                l = !0;
                var i = SL.editor.controllers.Blocks.add({
                    type: t.type,
                    silent: !0,
                    center: !1
                })
                  , n = $(".reveal .slides").offset()
                  , r = i.measure();
                i.move(e.clientX - n.left - r.width / 2, e.clientY - n.top - r.height / 2),
                i.onMouseDown(e),
                SL.analytics.trackEditor("Insert block via drag", t.type)
            }
            e.preventDefault()
        }
        function o() {
            $(document).off("mousemove", r),
            $(document).off("mouseup", o),
            a = !1,
            l = !1
        }
        var s = 0
          , a = !1
          , l = !1;
        e.on("vclick", i),
        SL.editor.controllers.Capabilities.isTouchEditor() || e.on("mousedown", n)
    }
}),
SL("editor.components.toolbars").EditMultiple = SL.editor.components.toolbars.Base.extend({
    init: function() {
        this.options = [],
        this._super()
    },
    render: function() {
        this._super(),
        this.domElement.attr("data-type", "edit-multiple"),
        [SL.editor.components.toolbars.options.BlockAlignHorizontal, SL.editor.components.toolbars.options.BlockAlignVertical, SL.editor.components.toolbars.options.BlockLayout, SL.editor.components.toolbars.options.BlockDepth, SL.editor.components.toolbars.options.BlockActions].forEach(this.renderOption.bind(this))
    },
    renderOption: function(e) {
        var t = new e(SL.editor.controllers.Blocks.getFocusedBlocks()[0]);
        t.appendTo(this.listElement),
        this.options.push(t)
    },
    destroy: function() {
        for (; this.options.length; )
            this.options.pop().destroy();
        this._super()
    }
}),
SL("editor.components.toolbars").Edit = SL.editor.components.toolbars.Base.extend({
    init: function(e) {
        this.block = e,
        this.options = [],
        this._super()
    },
    render: function() {
        this._super(),
        this.domElement.attr("data-type", "edit"),
        this.block.getToolbarOptions().forEach(this.renderOption.bind(this)),
        SL.editor.controllers.Capabilities.canUseCSSEditor() && SL.view.isDeveloperMode() && this.renderOption(SL.editor.components.toolbars.options.ClassName)
    },
    renderOption: function(e) {
        var t = new e(this.block);
        t.appendTo(this.listElement),
        t.changed && t.changed.add(this.sync.bind(this)),
        this.options.push(t)
    },
    appendTo: function() {
        this._super.apply(this, arguments),
        this.sync()
    },
    destroy: function() {
        for (; this.options.length; )
            this.options.pop().destroy();
        this._super()
    }
}),
SL("editor.components.toolbars.groups").Base = Class.extend({
    init: function(e, t) {
        this.block = e,
        this.config = $.extend({
            label: "Group",
            items: [],
            expandable: !0
        }, t),
        this.options = [],
        this.render(),
        this.bind()
    },
    render: function() {
        this.domElement = $('<div class="toolbar-option toolbar-group">'),
        this.config.type && this.domElement.attr("data-group-type", this.config.type),
        this.config.expandable ? (this.triggerElement = $('<div class="toolbar-group-trigger">').appendTo(this.domElement),
        this.triggerElement.append('<span class="label">' + this.config.label + "</span>"),
        this.triggerElement.append('<span class="checkbox icon i-checkmark"></span>'),
        this.optionsElement = $('<div class="toolbar-group-options">').appendTo(this.domElement),
        this.optionsInnerElement = $('<div class="toolbar-group-options-inner">').appendTo(this.optionsElement)) : this.optionsInnerElement = $('<div class="toolbar-group-inner">').appendTo(this.domElement),
        this.config.items.forEach(this.renderOption.bind(this))
    },
    renderOption: function(e) {
        var t = new e(this.block);
        t.appendTo(this.optionsInnerElement),
        this.options.push(t)
    },
    bind: function() {
        this.domElement.find(".toolbar-group-trigger").on("vclick", this.onClicked.bind(this))
    },
    appendTo: function(e) {
        this.domElement.appendTo(e)
    },
    sync: function() {
        this.expand()
    },
    trigger: function() {},
    expand: function() {
        this.config.expandable && (this.domElement.addClass("expanded"),
        this.optionsElement.height(this.optionsInnerElement.prop("scrollHeight") + 2)),
        this.options.forEach(function(e) {
            "function" == typeof e.readFromBlock && e.readFromBlock()
        })
    },
    collapse: function() {
        this.domElement.removeClass("expanded"),
        this.optionsElement.height(0)
    },
    isExpanded: function() {
        return this.domElement.hasClass("expanded")
    },
    onClicked: function(e) {
        e.preventDefault(),
        this.trigger()
    },
    destroy: function() {
        for (; this.options.length; )
            this.options.pop().destroy();
        this.domElement.remove()
    }
}),
SL("editor.components.toolbars.groups").Animation = SL.editor.components.toolbars.groups.Base.extend({
    init: function(e, t) {
        this._super(e, $.extend({
            type: "animation",
            label: "Animation",
            items: [SL.editor.components.toolbars.options.AnimationType, SL.editor.components.toolbars.options.TransitionDuration, SL.editor.components.toolbars.options.TransitionDelay, SL.editor.components.toolbars.options.AnimationPreview]
        }, t))
    },
    sync: function() {
        this.block.isset("attribute.data-animation-type") ? this.expand() : this.collapse()
    },
    trigger: function() {
        if (this.block.isset("attribute.data-animation-type"))
            this.block.unset("attribute.data-animation-type"),
            this.block.unset("style.transition-duration"),
            this.block.unset("style.transition-delay");
        else {
            this.block.set("attribute.data-animation-type", this.block.getPropertySettings("attribute.data-animation-type").options[0].value);
            var e = SL.config.DEFAULT_SLIDE_TRANSITION_DURATION / 1e3 * .75
              , t = SL.config.DEFAULT_SLIDE_TRANSITION_DURATION / 1e3 * .75;
            /^(none|fade)$/gi.test(SL.current_deck.get("transition")) && (t = 0),
            this.block.isset("style.transition-duration") || this.block.set("style.transition-duration", e),
            this.block.isset("style.transition-delay") || this.block.set("style.transition-delay", t),
            this.block.isFragment() && this.block.removeFragment(),
            SL.analytics.trackEditor("Toolbar: Add animation")
        }
        this.sync()
    }
}),
SL("editor.components.toolbars.groups").BorderCSS = SL.editor.components.toolbars.groups.Base.extend({
    init: function(e, t) {
        this._super(e, $.extend({
            type: "border-css",
            label: "Border",
            items: [SL.editor.components.toolbars.options.BorderStyle, SL.editor.components.toolbars.options.BorderWidth, SL.editor.components.toolbars.options.BorderRadius, SL.editor.components.toolbars.options.BorderColor]
        }, t))
    },
    sync: function() {
        var e = this.block.get("style.border-style");
        e && "none" !== e ? this.expand() : this.collapse()
    },
    trigger: function() {
        this.block.isset("style.border-style") ? (this.block.unset("style.border-style"),
        this.block.unset("style.border-radius")) : (this.block.set("style.border-style", "solid"),
        this.block.isset("style.border-width") || this.block.set("style.border-width", 1),
        this.block.isset("style.border-color") || this.block.set("style.border-color", "#000000")),
        this.sync()
    }
}),
SL("editor.components.toolbars.groups").BorderSVG = SL.editor.components.toolbars.groups.Base.extend({
    init: function(e, t) {
        this._super(e, $.extend({
            type: "border-svg",
            label: "Border",
            items: [SL.editor.components.toolbars.options.ShapeStrokeWidth, SL.editor.components.toolbars.options.ShapeStrokeColor]
        }, t))
    },
    sync: function() {
        this.block.supportsStroke() ? (this.domElement.show(),
        this.block.hasStroke() ? (this.expand(),
        this.options.forEach(function(e) {
            e.readFromBlock()
        })) : this.collapse()) : this.domElement.hide()
    },
    trigger: function() {
        this.block.toggleStroke(),
        this.sync()
    }
}),
SL("editor.components.toolbars.groups").LineType = SL.editor.components.toolbars.groups.Base.extend({
    init: function(e, t) {
        this._super(e, $.extend({
            type: "line-type",
            expandable: !1,
            items: [SL.editor.components.toolbars.options.LineStartType, SL.editor.components.toolbars.options.LineEndType]
        }, t))
    }
}),
SL("editor.components.toolbars.groups").Link = SL.editor.components.toolbars.groups.Base.extend({
    init: function(e, t) {
        this._super(e, $.extend({
            type: "link",
            label: "link",
            items: [SL.editor.components.toolbars.options.LinkURL]
        }, t))
    },
    sync: function() {
        this.block.isLinked() ? this.expand() : this.collapse()
    },
    trigger: function() {
        this.block.setLinkURL(this.block.isLinked() ? null : ""),
        this.sync(),
        this.isExpanded() && !SL.editor.controllers.Capabilities.isTouchEditor() && this.options && this.options[0] && "function" == typeof this.options[0].focus && setTimeout(function() {
            this.options[0].focus()
        }
        .bind(this), 200)
    }
}),
SL("editor.components.toolbars.groups").TableSize = SL.editor.components.toolbars.groups.Base.extend({
    init: function(e, t) {
        this._super(e, $.extend({
            type: "table-size",
            expandable: !1,
            items: [SL.editor.components.toolbars.options.TableCols, SL.editor.components.toolbars.options.TableRows]
        }, t)),
        this.options[0].domElement.after('<div class="cross">x</div>'),
        this.setupBackfill(),
        this.setupPreview()
    },
    sync: function() {
        this._super(),
        this.refreshPreview()
    },
    setupBackfill: function() {
        this.options.forEach(function(e) {
            e.changeStarted.add(this.refreshBackfill.bind(this)),
            e.changeEnded.add(this.refreshBackfill.bind(this))
        }
        .bind(this))
    },
    refreshBackfill: function() {
        var e = this.options.some(function(e) {
            return e.isChanging()
        }
        .bind(this));
        e ? this.block.enableBackfill() : this.block.disableBackfill()
    },
    setupPreview: function() {
        this.canvasElement = $('<canvas class="table-preview"></canvas>').appendTo(this.domElement),
        this.canvas = this.canvasElement.get(0),
        this.canvasContext = this.canvas.getContext("2d"),
        this.refreshPreview = this.refreshPreview.bind(this),
        this.block.tableSizeChanged.add(this.refreshPreview),
        this.block.tableHeaderChanged.add(this.refreshPreview),
        this.options.forEach(function(e) {
            e.changed.add(this.refreshPreview)
        }
        .bind(this))
    },
    refreshPreview: function() {
        var e = Math.round(this.domElement.width())
          , t = Math.round(.8 * e);
        this.canvas.style.width = e + "px",
        this.canvas.style.height = t + "px",
        e *= 2,
        t *= 2,
        this.canvas.width = e,
        this.canvas.height = t,
        this.canvasContext.clearRect(0, 0, e, t);
        for (var i = this.block.get("attribute.data-table-cols"), n = this.block.get("attribute.data-table-rows"), r = this.block.get("attribute.data-table-has-header"), o = 4, s = e / i, a = t / n, l = 0; i > l; l++)
            for (var c = 0; n > c; c++)
                this.canvasContext.fillStyle = r && 0 === c ? "#555" : "#444",
                this.canvasContext.fillRect(l * s + o / 2, c * a + o / 2, s - o, a - o)
    },
    destroy: function() {
        this.block.tableSizeChanged && this.block.tableSizeChanged.remove(this.refreshPreview),
        this.options.forEach(function(e) {
            e.changed.remove(this.refreshPreview)
        }
        .bind(this)),
        this._super()
    }
}),
SL("editor.components.toolbars.options").Base = Class.extend({
    init: function(e, t) {
        this.block = e,
        this.config = t || {},
        this.property = this.getPropertySettings(),
        this.render(),
        this.bind()
    },
    render: function() {
        if (this.domElement = $('<div class="toolbar-option">'),
        this.config.type && this.domElement.attr("data-option-type", this.config.type),
        this.config.tooltip && this.domElement.attr({
            "data-tooltip": this.config.tooltip,
            "data-tooltip-delay": 1e3,
            "data-tooltip-maxwidth": 200
        }),
        this.config.label && (this.domElement.append('<h4 class="toolbar-option-label">' + this.config.label + "</h4>"),
        this.config.helpTooltip)) {
            var e;
            e = $(this.config.helpTooltipLink ? '<a class="toolbar-option-help" href="' + this.config.helpTooltipLink + '" target="_blank">' : '<div class="toolbar-option-help">'),
            e.attr({
                "data-tooltip": this.config.helpTooltip,
                "data-tooltip-alignment": "r",
                "data-tooltip-maxwidth": 240
            }),
            e.html("?"),
            e.appendTo(this.domElement.find(".toolbar-option-label"))
        }
    },
    bind: function() {
        this.config.shortcut && Mousetrap.bind(this.config.shortcut, function(e) {
            e.preventDefault(),
            this.trigger()
        }
        .bind(this)),
        this.domElement.on("vclick", this.onClicked.bind(this))
    },
    appendTo: function(e) {
        this.domElement.appendTo(e)
    },
    destroy: function() {
        this.domElement.remove()
    },
    getPropertySettings: function() {
        return this.block && "string" == typeof this.config.property ? this.block.getPropertySettings(this.config.property) : null
    },
    onClicked: function(e) {
        $(e.target).is(".toolbar-option-help") || e.preventDefault()
    }
}),
SL("editor.components.toolbars.options").Value = SL.editor.components.toolbars.options.Base.extend({
    init: function(e, t) {
        this._super(e, t),
        this.changed = new signals.Signal,
        this.value = this.getDefaultValue(),
        this.config.watchBlock && this.block.watch(this.config.property, this.onPropertyChanged)
    },
    bind: function() {
        this._super(),
        this.onPropertyChanged = this.onPropertyChanged.bind(this)
    },
    appendTo: function(e) {
        this._super(e),
        this.readFromBlock()
    },
    readFromBlock: function() {
        this.setValue(this.block.get(this.config.property))
    },
    writeToBlock: function() {
        this.isWritingToBlock = !0,
        this.block.set(this.config.property, this.getValue()),
        this.isWritingToBlock = !1
    },
    setValue: function(e, t) {
        this.value = e,
        t && (this.writeToBlock(),
        this.changed.dispatch(this.value))
    },
    getValue: function() {
        return this.value
    },
    getDefaultValue: function() {
        return this.block.getPropertyDefault(this.config.property)
    },
    getUnit: function() {
        return this.property.unit ? this.property.unit : ""
    },
    onPropertyChanged: function() {
        this.isWritingToBlock || this.readFromBlock()
    },
    destroy: function() {
        this.config.watchBlock && this.block && this.block.unwatch(this.config.property, this.onPropertyChanged),
        this.changed.dispose(),
        this._super()
    }
}),
SL("editor.components.toolbars.options").Button = SL.editor.components.toolbars.options.Base.extend({
    init: function(e, t) {
        this._super(e, t)
    },
    render: function() {
        this._super(),
        this.domElement.addClass("toolbar-button"),
        (this.config.title || this.config.icon) && (this.domElement.addClass("has-title"),
        this.titleElement = $('<div class="toolbar-option-title vcenter">').appendTo(this.domElement),
        this.config.title ? this.titleElement.html('<span class="title vcenter-target">' + this.config.title + "</span>") : this.config.icon && (this.domElement.addClass("is-icon"),
        this.titleElement.html('<span class="icon i-' + this.config.icon + ' vcenter-target"></span>'),
        this.config.activeIcon && (this.domElement.addClass("has-active-state"),
        this.activeElement = $('<div class="toolbar-option-title vcenter active">').appendTo(this.domElement),
        this.activeElement.html('<span class="icon i-' + this.config.activeIcon + ' vcenter-target"></span>'))))
    }
}),
SL("editor.components.toolbars.options").Checkbox = SL.editor.components.toolbars.options.Value.extend({
    init: function(e, t) {
        this._super(e, $.extend({
            type: "checkbox"
        }, t))
    },
    render: function() {
        this._super(),
        this.domElement.addClass("toolbar-checkbox"),
        this.checkboxElement = $('<span class="checkbox icon i-checkmark">'),
        this.checkboxElement.appendTo(this.domElement)
    },
    setValue: function(e, t) {
        this.domElement.toggleClass("checked", e),
        this._super(e, t)
    },
    getValue: function() {
        return this.domElement.hasClass("checked")
    },
    onClicked: function(e) {
        this._super(e),
        this.setValue(!this.getValue(), !0)
    }
}),
SL("editor.components.toolbars.options").Color = SL.editor.components.toolbars.options.Value.extend({
    init: function(e, t) {
        this._super(e, $.extend({
            type: "color",
            alpha: !1
        }, t))
    },
    render: function() {
        this._super(),
        this.domElement.addClass("toolbar-color"),
        this.triggerElement = $('<div class="toolbar-color-trigger">'),
        this.triggerElement.appendTo(this.domElement),
        this.triggerInnerElement = $('<div class="toolbar-color-trigger-inner">'),
        this.triggerInnerElement.appendTo(this.triggerElement),
        this.resetElement = $('<div class="toolbar-color-reset icon i-undo" data-tooltip="Use default color" data-tooltip-delay="500">'),
        this.resetElement.appendTo(this.triggerElement)
    },
    bind: function() {
        this._super(),
        this.triggerInnerElement.on("vclick", this.onTriggerClicked.bind(this)),
        this.resetElement.on("vclick", this.onResetClicked.bind(this))
    },
    readFromBlock: function() {
        this._super(),
        this.syncTriggerUI()
    },
    setValue: function(e, t) {
        this._super(e, t),
        this.syncTriggerUI()
    },
    syncTriggerUI: function() {
        var e = this.getTriggerColor();
        this.triggerElement.toggleClass("transparent", tinycolor(e).getAlpha() < 1),
        this.triggerInnerElement.css("background-color", e)
    },
    getTriggerColor: function() {
        return this.value
    },
    getColorpickerConfig: function() {
        return {
            anchor: this.triggerElement,
            alignment: "r",
            alpha: this.config.alpha,
            color: this.getValue(),
            changeCallback: this.setValue.bind(this),
            resetCallback: this.onResetClicked.bind(this)
        }
    },
    onPanelShown: function() {
        this.readFromBlock(),
        this.domElement.addClass("is-active")
    },
    onPanelHidden: function() {
        this.pickerWrapper.spectrum("saveCurrentSelection"),
        this.domElement.removeClass("is-active")
    },
    onTriggerClicked: function() {
        SL.view.colorpicker.toggle(this.getColorpickerConfig())
    },
    onResetClicked: function() {
        this.setValue(this.getDefaultValue() || "", !0),
        this.readFromBlock(),
        SL.view.colorpicker.hide()
    },
    destroy: function() {
        this._super()
    }
}),
SL("editor.components.toolbars.options").Multi = SL.editor.components.toolbars.options.Base.extend({
    init: function(e, t) {
        this._super(e, $.extend({
            type: "multi",
            items: []
        }, t))
    },
    render: function() {
        this._super(),
        this.domElement.addClass("toolbar-multi"),
        this.domElement.attr("data-number-of-items", this.config.items.length),
        this.innerElement = $('<div class="toolbar-multi-inner">').appendTo(this.domElement),
        this.config.items.forEach(function(e) {
            var t = $(['<div class="toolbar-multi-item" data-value="' + e.value + '">', e.icon ? '<span class="icon i-' + e.icon + '"></span>' : e.title, "</div>"].join(""));
            e.tooltip && t.attr("data-tooltip", e.tooltip),
            t.appendTo(this.innerElement)
        }
        .bind(this))
    },
    bind: function() {
        this._super(),
        this.domElement.find(".toolbar-multi-item").on("vclick", this.onListItemClicked.bind(this))
    },
    trigger: function() {},
    onListItemClicked: function(e) {
        var t = $(e.currentTarget).attr("data-value");
        t && this.trigger(t)
    }
}),
SL("editor.components.toolbars.options").Radio = SL.editor.components.toolbars.options.Value.extend({
    init: function(e, t) {
        this._super(e, $.extend({
            type: "radio",
            items: []
        }, t))
    },
    render: function() {
        this._super(),
        this.domElement.addClass("toolbar-radio"),
        this.domElement.attr("data-number-of-items", this.config.items.length),
        this.innerElement = $('<div class="toolbar-radio-inner">').appendTo(this.domElement),
        this.config.items.forEach(function(e) {
            this.innerElement.append(['<div class="toolbar-radio-item" data-value="' + e.value + '">', e.icon ? '<span class="icon i-' + e.icon + '"></span>' : e.title, "</div>"].join(""))
        }
        .bind(this))
    },
    bind: function() {
        this._super(),
        this.domElement.find(".toolbar-radio-item").on("vclick", this.onListItemClicked.bind(this))
    },
    setValue: function(e, t) {
        this.hasValue(e) && (this.domElement.find(".toolbar-radio-item").removeClass("selected"),
        this.domElement.find('.toolbar-radio-item[data-value="' + e + '"]').first().addClass("selected"),
        this._super(e, t))
    },
    hasValue: function(e) {
        return this.config.items.some(function(t) {
            return t.value === e
        })
    },
    onListItemClicked: function(e) {
        var t = $(e.currentTarget).attr("data-value");
        t && this.setValue(t, !0)
    }
}),
SL("editor.components.toolbars.options").Range = SL.editor.components.toolbars.options.Value.extend({
    init: function(e, t) {
        this._super(e, $.extend({
            type: "range"
        }, t))
    },
    render: function() {
        this._super(),
        this.domElement.addClass("toolbar-range"),
        this.rangeElement = $('<div class="range">'),
        this.rangeElement.appendTo(this.domElement),
        this.rangeProgressElement = $('<div class="range-progress">').appendTo(this.rangeElement),
        this.rangeNumericElement = $('<div class="range-numeric">').appendTo(this.rangeElement)
    },
    bind: function() {
        this._super(),
        this.changed = new signals.Signal,
        this.onMouseDown = this.onMouseDown.bind(this),
        this.onMouseMove = this.onMouseMove.bind(this),
        this.onMouseUp = this.onMouseUp.bind(this),
        this.rangeElement.on("vmousedown", this.onMouseDown)
    },
    setValue: function(e, t) {
        e = Math.max(Math.min(e, this.property.maxValue), this.property.minValue),
        this.rangeProgressElement.css("width", this.valueToPercent(e) + "%"),
        this._super(e, t),
        this.rangeNumericElement.text(this.getValue().toFixed(this.property.decimals) + this.getUnit())
    },
    getValue: function() {
        var e = this.percentToValue(parseInt(this.rangeProgressElement.get(0).style.width, 10))
          , t = Math.pow(10, this.property.decimals);
        return Math.round(e * t) / t
    },
    valueToPercent: function(e) {
        var t = (e - this.property.minValue) / (this.property.maxValue - this.property.minValue) * 100;
        return Math.max(Math.min(t, 100), 0)
    },
    percentToValue: function(e) {
        return this.property.minValue + e / 100 * (this.property.maxValue - this.property.minValue)
    },
    onMouseDown: function(e) {
        e.preventDefault(),
        $(document).on("vmousemove", this.onMouseMove),
        $(document).on("vmouseup", this.onMouseUp),
        this.onMouseMove(e),
        this.rangeElement.addClass("is-scrubbing")
    },
    onMouseMove: function(e) {
        var t = e.clientX - this.rangeElement.offset().left;
        this.setValue(this.percentToValue(t / this.rangeElement.width() * 100), !0),
        this.writeToBlock()
    },
    onMouseUp: function() {
        $(document).off("vmousemove", this.onMouseMove),
        $(document).off("vmouseup", this.onMouseUp),
        this.rangeElement.removeClass("is-scrubbing")
    }
}),
SL("editor.components.toolbars.options").Select = SL.editor.components.toolbars.options.Value.extend({
    init: function(e, t) {
        this._super(e, $.extend({
            type: "select",
            panelType: "select",
            panelWidth: "auto",
            panelHeight: "auto",
            panelMaxHeight: 300,
            panelAlignment: "r",
            value: 0,
            items: []
        }, t)),
        this.keySearchString = "",
        this.keySearchTimeout
    },
    render: function() {
        this._super(),
        this.domElement.addClass("toolbar-select"),
        this.triggerElement = $('<div class="toolbar-select-trigger">'),
        this.triggerElement.appendTo(this.domElement)
    },
    renderPanel: function() {
        this.panel = new SL.editor.components.toolbars.util.Panel({
            type: this.config.panelType,
            anchor: this.triggerElement,
            keydown: this.onKeyDown.bind(this),
            maxHeight: this.config.panelMaxHeight,
            width: this.config.panelWidth,
            height: this.config.panelHeight,
            alignment: this.config.panelAlignment
        }),
        this.panel.shown.add(this.onPanelShown.bind(this)),
        this.config.items.forEach(this.renderItem.bind(this)),
        this.getListElements().on("vclick", this.onListItemClicked.bind(this))
    },
    renderItem: function(e) {
        this.panel.contentElement.append('<div class="toolbar-select-item" data-value="' + e.value + '">' + (e.title || e.value) + "</div>")
    },
    setValue: function(e, t) {
        this.hasValue(e) && (this._super(e, t),
        this.displaySelectedValue(),
        this.getListElements().removeClass("selected"),
        this.getListElements().filter('[data-value="' + this.value + '"]').first().addClass("selected")),
        t && this.panel && this.panel.hide()
    },
    hasValue: function(e) {
        return this.config.items.some(function(t) {
            return t.value === e
        })
    },
    displaySelectedValue: function() {
        this.triggerElement.text(this.getTitleByValue(this.value))
    },
    clearFocus: function() {
        this.getListElements().removeClass("focused")
    },
    focusDefault: function() {
        var e = this.getListElements()
          , t = e.filter(".focused")
          , i = e.filter(".selected");
        0 === t.length && (i.length ? i.addClass("focused") : e.first().addClass("focused"))
    },
    focusItem: function(e) {
        e && e.length && (this.getListElements().removeClass("focused"),
        e.addClass("focused")),
        this.scrollIntoView()
    },
    focusStep: function(e) {
        this.focusDefault();
        var t = this.getListElements().filter(".focused");
        this.focusItem(0 > e ? t.prev() : t.next()),
        this.scrollIntoView()
    },
    focusByTitle: function(e) {
        var t = this.getListElements().filter(function(t, i) {
            return 0 === i.textContent.toLowerCase().indexOf(e.toLowerCase())
        });
        t.length && this.focusItem(t.first())
    },
    scrollIntoView: function() {
        var e = this.getListElements()
          , t = e.filter(".focused")
          , i = e.filter(".selected");
        t.length ? SL.util.dom.scrollIntoViewIfNeeded(t.get(0)) : i.length && SL.util.dom.scrollIntoViewIfNeeded(i.get(0))
    },
    getTitleByValue: function(e) {
        var t = null;
        return this.config.items.forEach(function(i) {
            i.value === e && (t = i.title)
        }),
        t
    },
    getDefaultValue: function() {
        return this.config.items[0].value
    },
    getListElements: function() {
        return this.panel ? this.panel.contentElement.find(".toolbar-select-item") : $()
    },
    onListItemClicked: function(e) {
        var t = $(e.currentTarget).attr("data-value");
        t && this.setValue(t, !0)
    },
    onPanelShown: function() {
        this.getListElements().removeClass("selected"),
        this.getListElements().filter('[data-value="' + this.getValue() + '"]').first().addClass("selected"),
        this.scrollIntoView(),
        this.clearFocus()
    },
    onClicked: function(e) {
        this._super(e),
        this.panel ? this.panel.toggle() : (this.renderPanel(),
        this.panel.show())
    },
    onKeyDown: function(e) {
        if (38 === e.keyCode || 9 === e.keyCode && e.shiftKey)
            this.focusStep(-1);
        else if (40 === e.keyCode || 9 === e.keyCode)
            this.focusStep(1);
        else if (13 === e.keyCode) {
            var t = this.getListElements().filter(".focused").attr("data-value");
            t && this.setValue(t, !0)
        } else if (27 === e.keyCode)
            this.panel.hide();
        else {
            var i = String.fromCharCode(e.keyCode);
            i.match(/[A-Z0-9#\+]/i) && (clearTimeout(this.keySearchTimeout),
            this.keySearchTimeout = setTimeout(function() {
                this.keySearchString = ""
            }
            .bind(this), 500),
            this.keySearchString += i,
            this.focusByTitle(this.keySearchString))
        }
        return !1
    },
    destroy: function() {
        this.panel && (this.panel.destroy(),
        this.panel = null),
        this._super()
    }
}),
SL("editor.components.toolbars.options").SelectLineType = SL.editor.components.toolbars.options.Select.extend({
    init: function(e, t) {
        this._super(e, $.extend({
            panelWidth: 75,
            panelMaxHeight: 430,
            panelAlignment: "b"
        }, t))
    },
    renderItem: function(e) {
        var t = $('<div class="toolbar-select-item" data-value="' + e.value + '">');
        t.appendTo(this.panel.contentElement),
        this.createPreviewSVG(t, e.value, 59, 40)
    },
    displaySelectedValue: function() {
        this.triggerElement.find("svg").remove(),
        this.createPreviewSVG(this.triggerElement, this.value, 44, 40)
    },
    createPreviewSVG: function(e, t, i, n) {
        var r = document.createElementNS(SL.util.svg.NAMESPACE, "svg");
        r.setAttribute("xmlns", SL.util.svg.NAMESPACE),
        r.setAttribute("version", "1.1"),
        r.setAttribute("width", i),
        r.setAttribute("height", n),
        r.setAttribute("viewBox", "0 0 " + i + " " + n),
        r.setAttribute("preserveAspectRatio", "xMidYMid"),
        SL.editor.blocks.Line.generate(r, {
            interactive: !1,
            startType: "line-start-type" === this.config.type ? t : null,
            endType: "line-end-type" === this.config.type ? t : null,
            color: "#333333",
            width: 6,
            x1: 0,
            y1: n / 2,
            x2: i,
            y2: n / 2
        }),
        e.append(r)
    }
}),
SL("editor.components.toolbars.options").Stepper = SL.editor.components.toolbars.options.Value.extend({
    init: function(e, t) {
        this._super(e, $.extend({
            type: "stepper",
            progressbar: !0,
            loop: !1
        }, t)),
        this.valueRange = this.property.maxValue - this.property.minValue,
        this.stepSize = this.valueRange < 1 ? this.valueRange / 200 : 1,
        this.property.stepSize && (this.stepSize = this.property.stepSize),
        this.changing = !1,
        this.mouseDownValue = 0,
        this.mouseDownX = 0
    },
    render: function() {
        this._super(),
        this.domElement.addClass("toolbar-stepper"),
        this.stepperElement = $('<div class="stepper">'),
        this.stepperElement.appendTo(this.domElement),
        this.config.progressbar && (this.progressbar = $('<div class="stepper-progress">').appendTo(this.stepperElement)),
        this.numberInput = $('<input type="text" class="stepper-number">').appendTo(this.stepperElement)
    },
    bind: function() {
        this._super(),
        this.changeStarted = new signals.Signal,
        this.changeEnded = new signals.Signal,
        this.onMouseDown = this.onMouseDown.bind(this),
        this.onMouseMove = this.onMouseMove.bind(this),
        this.onMouseUp = this.onMouseUp.bind(this),
        this.stepperElement.on("vmousedown", this.onMouseDown),
        this.numberInput.on("input", this.onInput.bind(this)),
        this.numberInput.on("keydown", this.onInputKeyDown.bind(this)),
        this.numberInput.on("focus", this.onInputFocused.bind(this)),
        this.numberInput.on("blur", this.onInputBlurred.bind(this))
    },
    setValue: function(e, t, i) {
        if (isNaN(e) && (e = this.value),
        this.value = e,
        this.config.loop && (this.value < this.property.minValue && (this.value = this.property.maxValue + this.value % (this.property.maxValue - this.property.minValue)),
        this.value > this.property.minValue && (this.value = this.property.minValue + this.value % (this.property.maxValue - this.property.minValue))),
        this.value = Math.max(Math.min(this.value, this.property.maxValue), this.property.minValue),
        this.value = this.roundValue(this.value),
        !i) {
            var n = this.value;
            this.property.decimals > 0 && (n = n.toFixed(this.property.decimals)),
            this.property.unit && !this.property.unitHidden && (n += this.property.unit),
            this.numberInput.val(n)
        }
        if (this.progressbar) {
            var r = this.valueToPercent(this.value) / 100;
            this.progressbar.css("transform", "scaleX(" + r + ")")
        }
        this._super(this.value, t)
    },
    roundValue: function(e) {
        var t = Math.pow(10, this.property.decimals);
        return Math.round(e * t) / t
    },
    valueToPercent: function(e) {
        var t = (e - this.property.minValue) / (this.property.maxValue - this.property.minValue) * 100;
        return Math.max(Math.min(t, 100), 0)
    },
    isChanging: function() {
        return this.changing
    },
    onChangeStart: function() {
        this.isChanging() || (this.stepperElement.addClass("is-changing"),
        this.changing = !0,
        this.changeStarted.dispatch())
    },
    onChangeEnd: function() {
        this.isChanging() && (this.stepperElement.removeClass("is-changing"),
        this.changing = !1,
        this.changeEnded.dispatch())
    },
    onMouseDown: function(e) {
        this.numberInput.is(":focus") || e.preventDefault(),
        $(document).on("vmousemove", this.onMouseMove),
        $(document).on("vmouseup", this.onMouseUp),
        this.mouseDownX = e.clientX,
        this.mouseDownValue = this.getValue(),
        this.onChangeStart()
    },
    onMouseMove: function(e) {
        this.stepperElement.addClass("is-scrubbing");
        var t = e.clientX - this.mouseDownX;
        1 === this.stepSize && this.valueRange < 15 ? t *= .25 : 1 === this.stepSize && this.valueRange < 30 ? t *= .5 : 1 === this.stepSize && this.valueRange > 150 && (t *= 1.5),
        this.setValue(this.mouseDownValue + t * this.stepSize, !0),
        this.writeToBlock()
    },
    onMouseUp: function(e) {
        $(document).off("vmousemove", this.onMouseMove),
        $(document).off("vmouseup", this.onMouseUp),
        this.stepperElement.hasClass("is-scrubbing") === !1 ? this.onClick(e) : this.onChangeEnd(),
        this.stepperElement.removeClass("is-scrubbing")
    },
    onClick: function() {
        this.numberInput.focus()
    },
    onInput: function() {
        this.setValue(parseFloat(this.numberInput.val()), !0, !0),
        this.writeToBlock()
    },
    onInputKeyDown: function(e) {
        var t = 0;
        38 === e.keyCode ? t = this.stepSize : 40 === e.keyCode && (t = -this.stepSize),
        t && (e.shiftKey && (t *= 10),
        this.setValue(this.getValue() + t, !0),
        this.writeToBlock(),
        e.preventDefault())
    },
    onInputFocused: function() {
        this.onChangeStart()
    },
    onInputBlurred: function() {
        this.onChangeEnd(),
        this.setValue(this.getValue(), !0)
    },
    destroy: function() {
        this.changeStarted.dispose(),
        this.changeEnded.dispose(),
        this._super()
    }
}),
SL("editor.components.toolbars.options").Text = SL.editor.components.toolbars.options.Value.extend({
    init: function(e, t) {
        this._super(e, $.extend({
            type: "text",
            multiline: !1,
            expandable: !1,
            maxlength: 255,
            placeholder: ""
        }, t))
    },
    render: function() {
        this._super(),
        this.domElement.addClass("toolbar-text"),
        this.config.multiline ? (this.inputElement = $("<textarea></textarea>"),
        this.config.expandable && (this.expandElement = $('<div class="expand-button icon i-fullscreen"></div>'),
        this.expandElement.appendTo(this.domElement))) : this.inputElement = $("<input />"),
        this.inputElement.attr({
            "class": "toolbar-text-input",
            maxlength: this.config.maxlength,
            placeholder: this.config.placeholder
        }),
        this.inputElement.appendTo(this.domElement)
    },
    bind: function() {
        this._super(),
        this.inputElement.on("input", this.onInputChange.bind(this)),
        this.expandElement && this.expandElement.on("vclick", this.onExpandClicked.bind(this))
    },
    focus: function() {
        this.inputElement.focus()
    },
    expand: function() {
        this.editor || (this.editor = new SL.components.TextEditor({
            type: "code",
            value: this.getValue()
        }),
        this.editor.saved.add(function(e) {
            this.setValue(e),
            this.writeToBlock(),
            this.editor = null
        }
        .bind(this)),
        this.editor.canceled.add(function() {
            this.editor = null
        }
        .bind(this)))
    },
    destroy: function() {
        this.editor && (this.editor.destroy(),
        this.editor = null),
        this._super()
    },
    setValue: function(e) {
        this.inputElement.val(e),
        this._super(e)
    },
    getValue: function() {
        return this.inputElement.val()
    },
    onInputChange: function() {
        this.writeToBlock()
    },
    onExpandClicked: function() {
        this.expand()
    }
}),
SL("editor.components.toolbars.options").Toggle = SL.editor.components.toolbars.options.Value.extend({
    init: function(e, t) {
        this._super(e, t)
    },
    render: function() {
        this._super(),
        this.domElement.addClass("toolbar-toggle")
    },
    bind: function() {
        this._super()
    },
    setValue: function(e, t) {
        this.domElement.attr("data-value", e),
        this._super(e, t)
    },
    onClicked: function(e) {
        e.preventDefault(),
        this.setValue(!this.getValue(), !0)
    }
}),
SL("editor.components.toolbars.options").AnimationPreview = SL.editor.components.toolbars.options.Button.extend({
    init: function(e, t) {
        this._super(e, $.extend({
            title: "Preview"
        }, t))
    },
    onClicked: function(e) {
        this._super(e);
        var t = $(Reveal.getCurrentSlide());
        t.addClass("no-transition").removeClass("present"),
        SL.util.dom.calculateStyle(t),
        t.removeClass("no-transition").addClass("present")
    }
}),
SL("editor.components.toolbars.options").AnimationType = SL.editor.components.toolbars.options.Select.extend({
    init: function(e, t) {
        this._super(e, $.extend({
            type: "animation-type",
            label: "Effect",
            property: "attribute.data-animation-type",
            items: e.getPropertySettings("attribute.data-animation-type").options
        }, t))
    },
    renderPanel: function() {
        this._super.apply(this, arguments),
        this.previewElement = $('<div class="animation-preview"></div>'),
        this.previewElement.appendTo(this.panel.domElement),
        this.previewInnerElement = $('<div class="animation-preview-inner"></div>'),
        this.previewInnerElement.appendTo(this.previewElement),
        this.panel.getContentElement().on("mouseleave", this.onPanelMouseOut.bind(this)),
        this.getListElements().on("mouseenter", this.onItemMouseOver.bind(this))
    },
    onItemMouseOver: function(e) {
        var t = $(e.currentTarget).attr("data-value");
        t && (this.previewElement.addClass("visible"),
        this.previewInnerElement.attr("data-animation-type", t).css("transition-duration", "").removeClass("animate"),
        setTimeout(function() {
            this.previewInnerElement.css("transition-duration", this.block.get("style.transition-duration") + "s").addClass("animate")
        }
        .bind(this), 100))
    },
    onPanelMouseOut: function() {
        this.previewElement.removeClass("visible")
    }
}),
SL("editor.components.toolbars.options").Back = SL.editor.components.toolbars.options.Base.extend({
    init: function(e, t) {
        this._super(e, $.extend({
            type: "back",
            icon: "arrow-up",
            tooltip: "Go back"
        }, t))
    },
    onClicked: function(e) {
        this._super(e),
        SL.view.toolbars.pop()
    }
}),
SL("editor.components.toolbars.options").BackgroundColor = SL.editor.components.toolbars.options.Color.extend({
    init: function(e, t) {
        this._super(e, $.extend({
            type: "background-color",
            label: "Background Color",
            property: "style.background-color",
            alpha: !0
        }, t))
    },
    getColorpickerConfig: function() {
        var e = this._super.apply(this, arguments)
          , t = tinycolor(this.getValue()).toRgb();
        return 0 === t.r && 0 === t.g && 0 === t.b && 0 === t.a && (e.color = "#000000"),
        e
    }
}),
SL("editor.components.toolbars.options").BlockActions = SL.editor.components.toolbars.options.Multi.extend({
    init: function(e, t) {
        var i = [{
            value: "duplicate",
            icon: "new-window",
            tooltip: "Duplicate"
        }, {
            value: "delete",
            icon: "trash-fill",
            tooltip: "Delete"
        }];
        e && e.options.horizontalResizing && e.options.verticalResizing && i.unshift({
            value: "expand",
            icon: "fullscreen",
            tooltip: "Maximize"
        }),
        e && e.hasPlugin(SL.editor.blocks.plugin.HTML) && i.unshift({
            value: "html",
            icon: "file-xml",
            tooltip: "Edit HTML"
        }),
        this._super(e, $.extend({
            type: "block-actions",
            label: "Actions",
            items: i
        }, t))
    },
    trigger: function(e) {
        var t = SL.editor.controllers.Blocks.getFocusedBlocks();
        if ("html" === e)
            t[0].editHTML(),
            SL.analytics.trackEditor("Toolbar: Edit HTML");
        else if ("expand" === e) {
            var i = SL.util.deck.getSlideSize();
            t.forEach(function(e) {
                e.resize({
                    width: i.width,
                    height: i.height
                }),
                e.moveToCenter()
            }),
            SL.analytics.trackEditor("Toolbar: Expand block")
        } else
            "duplicate" === e ? (SL.editor.controllers.Blocks.copy(),
            SL.editor.controllers.Blocks.paste(),
            SL.analytics.trackEditor("Toolbar: Duplicate block")) : "delete" === e && (t.forEach(function(e) {
                e.destroy()
            }),
            SL.analytics.trackEditor("Toolbar: Delete block"))
    }
}),
SL("editor.components.toolbars.options").BlockAlignHorizontal = SL.editor.components.toolbars.options.Multi.extend({
    init: function(e, t) {
        this._super(e, $.extend({
            type: "block-align-horizontal",
            label: "Alignment",
            items: [{
                value: "left",
                icon: "alignleftedges"
            }, {
                value: "horizontal-center",
                icon: "alignhorizontalcenters"
            }, {
                value: "right",
                icon: "alignrightedges"
            }]
        }, t))
    },
    trigger: function(e) {
        this._super(e),
        SL.editor.controllers.Blocks.align(SL.editor.controllers.Blocks.getFocusedBlocks(), e)
    }
}),
SL("editor.components.toolbars.options").BlockAlignVertical = SL.editor.components.toolbars.options.Multi.extend({
    init: function(e, t) {
        this._super(e, $.extend({
            type: "block-align-vertical",
            items: [{
                value: "top",
                icon: "aligntopedges"
            }, {
                value: "vertical-center",
                icon: "alignverticalcenters"
            }, {
                value: "bottom",
                icon: "alignbottomedges"
            }]
        }, t))
    },
    trigger: function(e) {
        this._super(e),
        SL.editor.controllers.Blocks.align(SL.editor.controllers.Blocks.getFocusedBlocks(), e)
    }
}),
SL("editor.components.toolbars.options").BlockDepth = SL.editor.components.toolbars.options.Multi.extend({
    init: function(e, t) {
        this._super(e, $.extend({
            type: "block-depth",
            label: "Depth",
            items: [{
                value: "back",
                icon: "arrow-down",
                tooltip: "Move to back"
            }, {
                value: "front",
                icon: "arrow-up",
                tooltip: "Move to front"
            }]
        }, t))
    },
    trigger: function(e) {
        "front" === e ? SL.editor.controllers.Blocks.moveBlocksToDepth(SL.editor.controllers.Blocks.getFocusedBlocks(), 1e4) : "back" === e && SL.editor.controllers.Blocks.moveBlocksToDepth(SL.editor.controllers.Blocks.getFocusedBlocks(), 0)
    }
}),
SL("editor.components.toolbars.options").BlockLayout = SL.editor.components.toolbars.options.Multi.extend({
    init: function(e, t) {
        this._super(e, $.extend({
            type: "block-layout",
            label: "Layout",
            items: [{
                value: "row",
                icon: "ellipsis-h",
                tooltip: "Row"
            }, {
                value: "column",
                icon: "ellipsis-v",
                tooltip: "Column"
            }]
        }, t))
    },
    trigger: function(e) {
        var t = 0
          , i = SL.prompt({
            anchor: this.innerElement,
            alignment: "r",
            title: "Spacing between each element",
            type: "range",
            cancelLabel: "",
            confirmLabel: "Done",
            data: {
                value: t,
                minValue: 0,
                maxValue: 300,
                unit: "px",
                width: 250
            }
        });
        SL.editor.controllers.Blocks.layout(SL.editor.controllers.Blocks.getFocusedBlocksInVisualOrder(), e, t),
        i.rangeInput.changed.add(function(i) {
            i = parseFloat(i),
            ("number" != typeof i || isNaN(i)) && (i = t),
            SL.editor.controllers.Blocks.layout(SL.editor.controllers.Blocks.getFocusedBlocksInVisualOrder(), e, i)
        }
        .bind(this))
    }
}),
SL("editor.components.toolbars.options").BorderColor = SL.editor.components.toolbars.options.Color.extend({
    init: function(e, t) {
        this._super(e, $.extend({
            type: "border-color",
            label: "Color",
            property: "style.border-color"
        }, t))
    }
}),
SL("editor.components.toolbars.options").BorderRadius = SL.editor.components.toolbars.options.Stepper.extend({
    init: function(e, t) {
        this._super(e, $.extend({
            type: "border-radius",
            label: "Radius",
            property: "style.border-radius"
        }, t))
    }
}),
SL("editor.components.toolbars.options").BorderStyle = SL.editor.components.toolbars.options.Select.extend({
    init: function(e, t) {
        this._super(e, $.extend({
            type: "border-style",
            label: "Style",
            property: "style.border-style",
            items: e.getPropertySettings("style.border-style").options
        }, t))
    }
}),
SL("editor.components.toolbars.options").BorderWidth = SL.editor.components.toolbars.options.Stepper.extend({
    init: function(e, t) {
        this._super(e, $.extend({
            type: "border-width",
            label: "Width",
            property: "style.border-width"
        }, t))
    }
}),
SL("editor.components.toolbars.options").ClassName = SL.editor.components.toolbars.options.Text.extend({
    init: function(e, t) {
        this._super(e, $.extend({
            type: "class-name",
            label: "Class name",
            property: "attribute.class",
            helpTooltip: "Adds a class name to the underlying HTML element. Useful when trying to target elements with custom CSS."
        }, t))
    }
}),
SL("editor.components.toolbars.options").CodeLanguage = SL.editor.components.toolbars.options.Select.extend({
    init: function(e, t) {
        this._super(e, $.extend({
            type: "code-language",
            label: "Language",
            property: "code.language",
            items: e.getPropertySettings("code.language").options,
            panelMaxHeight: 400
        }, t))
    }
}),
SL("editor.components.toolbars.options").CodeTheme = SL.editor.components.toolbars.options.Select.extend({
    init: function(e, t) {
        this._super(e, $.extend({
            type: "code-theme",
            label: "Theme",
            property: "code.theme",
            items: e.getPropertySettings("code.theme").options,
            panelType: "code-theme",
            panelWidth: 180,
            panelMaxHeight: 500
        }, t))
    }
}),
SL("editor.components.toolbars.options").Code = SL.editor.components.toolbars.options.Text.extend({
    init: function(e, t) {
        this._super(e, $.extend({
            type: "code",
            label: "Code",
            property: "code.value",
            placeholder: "Paste code to syntax highlight...",
            multiline: !0,
            expandable: !0,
            maxlength: 1e7
        }, t))
    },
    bind: function() {
        this._super(),
        this.block && (this.onEditingRequested = this.onEditingRequested.bind(this),
        this.block.editingRequested.add(this.onEditingRequested))
    },
    destroy: function() {
        this.block && this.block.editingRequested.remove(this.onEditingRequested),
        this._super()
    },
    onEditingRequested: function() {
        this.expand()
    }
}),
SL("editor.components.toolbars.options").Divider = SL.editor.components.toolbars.options.Base.extend({
    init: function(e, t) {
        this._super(e, $.extend({
            type: "divider"
        }, t)),
        this.domElement.addClass("toolbar-divider")
    }
}),
SL("editor.components.toolbars.options").HTML = SL.editor.components.toolbars.options.Button.extend({
    init: function(e, t) {
        this._super(e, $.extend({
            title: "Edit HTML",
            property: "html.value"
        }, t))
    },
    onClicked: function(e) {
        this._super(e),
        this.block.editHTML()
    }
}),
SL("editor.components.toolbars.options").IframeAutoplay = SL.editor.components.toolbars.options.Checkbox.extend({
    init: function(e, t) {
        this._super(e, $.extend({
            type: "iframe-autoplay",
            label: "Autoplay",
            property: "iframe.autoplay"
        }, t)),
        this.updateVisibility()
    },
    bind: function() {
        this._super(),
        this.block && (this.updateVisibility = this.updateVisibility.bind(this),
        this.block.iframeSourceChanged.add(this.updateVisibility))
    },
    setValue: function(e, t) {
        this._super(e, t)
    },
    updateVisibility: function() {
        var e = this.block.get("iframe.src");
        e && (/^.*(youtube\.com\/embed\/)/.test(e) || /^.*(player\.vimeo.com\/)/.test(e)) ? this.domElement.show() : this.domElement.hide()
    },
    destroy: function() {
        this.block && !this.block.destroyed && this.block.iframeSourceChanged.remove(this.updateVisibility),
        this._super()
    }
}),
SL("editor.components.toolbars.options").IframeSRC = SL.editor.components.toolbars.options.Text.extend({
    init: function(e, t) {
        this._super(e, $.extend({
            type: "iframe-src",
            label: "Iframe Source",
            property: "iframe.src",
            placeholder: "URL or <iframe>...",
            multiline: !0,
            maxlength: 2e3
        }, t))
    },
    bind: function() {
        this._super(),
        this.block && (this.onEditingRequested = this.onEditingRequested.bind(this),
        this.block.editingRequested.add(this.onEditingRequested))
    },
    destroy: function() {
        this.block && this.block.editingRequested.remove(this.onEditingRequested),
        this._super()
    },
    writeToBlock: function() {
        var e = this.getValue().trim();
        SL.util.string.URL_REGEX.test(e) ? this.block.set(this.config.property, e) : this.block.set(this.config.property, "")
    },
    onInputChange: function() {
        var e = this.getValue();
        if (/<iframe/gi.test(e))
            try {
                this.setValue($(e).attr("src"))
            } catch (t) {}
        this.writeToBlock()
    },
    onEditingRequested: function() {
        this.focus()
    }
}),
SL("editor.components.toolbars.options").ImageInlineSVG = SL.editor.components.toolbars.options.Checkbox.extend({
    init: function(e, t) {
        this._super(e, $.extend({
            type: "image-inline-svg",
            label: "Inline SVG",
            property: "attribute.data-inline-svg"
        }, t)),
        this.sync = this.sync.bind(this),
        e.imageURLChanged.add(this.sync)
    },
    sync: function() {
        this.block.isSVG() ? this.domElement.show() : this.domElement.hide()
    },
    destroy: function() {
        this.block.imageURLChanged && this.block.imageURLChanged.remove(this.sync),
        this._super()
    }
}),
SL("editor.components.toolbars.options").Image = SL.editor.components.toolbars.options.Base.extend({
    init: function(e, t) {
        this._super(e, $.extend({
            type: "image",
            labe: "Image"
        }, t)),
        this.syncUI()
    },
    render: function() {
        this._super(),
        this.domElement.addClass("toolbar-image"),
        this.innerElement = $('<div class="toolbar-image-inner">').appendTo(this.domElement),
        this.placeholderElement = $('<div class="toolbar-image-placeholder">').appendTo(this.innerElement),
        this.labelElement = $('<div class="toolbar-image-label">Select</div>').appendTo(this.innerElement),
        this.urlElement = $('<div class="toolbar-image-url icon i-link"></div>').appendTo(this.innerElement),
        this.spinnerElement = $(['<div class="toolbar-image-progress">', '<span class="spinner centered"></span>', "</div>"].join("")).appendTo(this.innerElement)
    },
    bind: function() {
        this._super(),
        this.onMediaLibrarySelection = this.onMediaLibrarySelection.bind(this),
        this.syncUI = this.syncUI.bind(this),
        this.block.imageStateChanged.add(this.syncUI),
        this.innerElement.on("vclick", function(e) {
            if (0 === $(e.target).closest(".toolbar-image-url").length) {
                var t = SL.popup.open(SL.components.medialibrary.MediaLibrary, {
                    select: SL.models.Media.IMAGE
                });
                t.selected.addOnce(this.onMediaLibrarySelection)
            } else
                this.onEditURLClicked(e)
        }
        .bind(this))
    },
    syncUI: function() {
        if (this.block.hasImage()) {
            var e = this.block.get("image.src");
            this.innerElement.css("background-image", 'url("' + e + '")', ""),
            this.placeholderElement.hide(),
            this.urlElement.toggle(0 !== e.search(SL.config.S3_HOST))
        } else
            this.innerElement.css("background-image", ""),
            this.placeholderElement.show(),
            this.urlElement.show();
        this.block.isLoading() || this.block.isUploading() ? (this.spinnerElement.show(),
        SL.util.html.generateSpinners()) : this.spinnerElement.hide()
    },
    onEditURLClicked: function(e) {
        e.preventDefault();
        var t = SL.prompt({
            anchor: this.urlElement,
            title: "Image URL",
            type: "input",
            confirmLabel: "Save",
            alignment: "r",
            data: {
                value: this.block.get("image.src"),
                placeholder: "http://...",
                width: 400
            }
        });
        t.confirmed.add(function(e) {
            this.block.set("image.src", e),
            this.syncUI()
        }
        .bind(this))
    },
    onMediaLibrarySelection: function(e) {
        this.block.setImageModel(e),
        this.syncUI()
    },
    destroy: function() {
        this.block.imageStateChanged && this.block.imageStateChanged.remove(this.syncUI),
        this._super()
    }
}),
SL("editor.components.toolbars.options").LetterSpacing = SL.editor.components.toolbars.options.Stepper.extend({
    init: function(e, t) {
        this._super(e, $.extend({
            type: "letter-spacing",
            label: "Letter spacing",
            property: "style.letter-spacing",
            progressbar: !1
        }, t))
    }
}),
SL("editor.components.toolbars.options").LineColor = SL.editor.components.toolbars.options.Color.extend({
    init: function(e, t) {
        this._super(e, $.extend({
            type: "line-color",
            label: "Color",
            property: "attribute.data-line-color"
        }, t))
    }
}),
SL("editor.components.toolbars.options").LineEndType = SL.editor.components.toolbars.options.SelectLineType.extend({
    init: function(e, t) {
        this._super(e, $.extend({
            type: "line-end-type",
            panelType: "line-end-type",
            label: "End",
            property: "attribute.data-line-end-type",
            items: e.getPropertySettings("attribute.data-line-end-type").options
        }, t))
    }
}),
SL("editor.components.toolbars.options").LineHeight = SL.editor.components.toolbars.options.Stepper.extend({
    init: function(e, t) {
        this._super(e, $.extend({
            type: "line-height",
            label: "Line Height",
            property: "style.line-height",
            progressbar: !1
        }, t))
    }
}),
SL("editor.components.toolbars.options").LineStartType = SL.editor.components.toolbars.options.SelectLineType.extend({
    init: function(e, t) {
        this._super(e, $.extend({
            type: "line-start-type",
            panelType: "line-start-type",
            label: "Start",
            property: "attribute.data-line-start-type",
            items: e.getPropertySettings("attribute.data-line-start-type").options
        }, t))
    }
}),
SL("editor.components.toolbars.options").LineStyle = SL.editor.components.toolbars.options.Select.extend({
    init: function(e, t) {
        this._super(e, $.extend({
            type: "line-style",
            panelType: "line-style",
            panelWidth: "auto",
            panelAlignment: "b",
            label: "Style",
            property: "attribute.data-line-style",
            items: e.getPropertySettings("attribute.data-line-style").options
        }, t))
    },
    renderItem: function(e) {
        var t = $('<div class="toolbar-select-item" data-value="' + e.value + '">');
        t.appendTo(this.panel.contentElement),
        this.createPreviewSVG(t, e.value, 126, 40)
    },
    displaySelectedValue: function() {
        this.triggerElement.find("svg").remove(),
        this.createPreviewSVG(this.triggerElement, this.value, 126, 40)
    },
    createPreviewSVG: function(e, t, i, n) {
        var r = document.createElementNS(SL.util.svg.NAMESPACE, "svg");
        r.setAttribute("xmlns", SL.util.svg.NAMESPACE),
        r.setAttribute("version", "1.1"),
        r.setAttribute("width", i),
        r.setAttribute("height", n),
        r.setAttribute("viewBox", "0 0 " + i + " " + n),
        r.setAttribute("preserveAspectRatio", "xMidYMid"),
        SL.editor.blocks.Line.generate(r, {
            interactive: !1,
            startType: null,
            endType: null,
            style: t,
            color: "#333333",
            width: 6,
            x1: 0,
            y1: n / 2,
            x2: i,
            y2: n / 2
        }),
        e.append(r)
    }
}),
SL("editor.components.toolbars.options").LineWidth = SL.editor.components.toolbars.options.Stepper.extend({
    init: function(e, t) {
        this._super(e, $.extend({
            type: "line-width",
            label: "Thickness",
            property: "attribute.data-line-width"
        }, t))
    }
}),
SL("editor.components.toolbars.options").LinkURL = SL.editor.components.toolbars.options.Text.extend({
    init: function(e, t) {
        this._super(e, $.extend({
            type: "link-url",
            property: "link.href",
            placeholder: "http://"
        }, t))
    },
    writeToBlock: function() {
        var e = this.getValue().trim();
        SL.util.string.URL_REGEX.test(e) || /^#\/\d/.test(e) ? this.block.set(this.config.property, e) : this.block.set(this.config.property, "")
    }
}),
SL("editor.components.toolbars.options").MathColor = SL.editor.components.toolbars.options.Color.extend({
    init: function(e, t) {
        this._super(e, $.extend({
            type: "math-color",
            label: "Color",
            property: "style.color"
        }, t))
    }
}),
SL("editor.components.toolbars.options").MathInput = SL.editor.components.toolbars.options.Text.extend({
    init: function(e, t) {
        this._super(e, $.extend({
            type: "math",
            label: 'Math <span style="text-transform: none;">(TeX)</span>',
            property: "math.value",
            placeholder: "Paste or type TeX...",
            helpTooltip: "This block is used to display math formulae. Math is written using TeX. Click for more info.",
            helpTooltipLink: "http://help.slides.com/knowledgebase/articles/446424",
            multiline: !0,
            expandable: !0,
            maxlength: 1e7
        }, t))
    },
    bind: function() {
        this._super(),
        this.block && (this.onEditingRequested = this.onEditingRequested.bind(this),
        this.block.editingRequested.add(this.onEditingRequested))
    },
    destroy: function() {
        this.block && this.block.editingRequested.remove(this.onEditingRequested),
        this._super()
    },
    onEditingRequested: function() {
        this.expand()
    }
}),
SL("editor.components.toolbars.options").MathSize = SL.editor.components.toolbars.options.Stepper.extend({
    init: function(e, t) {
        this._super(e, $.extend({
            type: "text-size",
            label: "Scale",
            property: "style.font-size"
        }, t))
    },
    setValue: function() {
        if (this._super.apply(this, arguments),
        this.measurementsBeforeResize) {
            var e = this.block.measure()
              , t = this.measurementsBeforeResize.x + (this.measurementsBeforeResize.width - e.width) / 2
              , i = this.measurementsBeforeResize.y + (this.measurementsBeforeResize.height - e.height) / 2;
            isNaN(t) || isNaN(i) || this.block.move(t, i)
        }
    },
    onChangeStart: function() {
        this.measurementsBeforeResize = this.block.measure(),
        this._super.apply(this, arguments)
    },
    onChangeEnd: function() {
        this.measurementsBeforeResize = null,
        this._super.apply(this, arguments)
    }
}),
SL("editor.components.toolbars.options").Opacity = SL.editor.components.toolbars.options.Stepper.extend({
    init: function(e, t) {
        this._super(e, $.extend({
            type: "opacity",
            label: "Opacity",
            property: "style.opacity"
        }, t))
    }
}),
SL("editor.components.toolbars.options").Padding = SL.editor.components.toolbars.options.Stepper.extend({
    init: function(e, t) {
        this._super(e, $.extend({
            type: "padding",
            label: "Padding",
            property: "style.padding"
        }, t))
    },
    syncPaddingHint: function() {
        this.isChanging() ? this.block.showPaddingHint() : this.block.hidePaddingHint()
    },
    writeToBlock: function() {
        this._super.apply(this, arguments),
        this.syncPaddingHint()
    },
    onMouseMove: function() {
        this._super.apply(this, arguments),
        this.syncPaddingHint()
    },
    onMouseUp: function() {
        this._super.apply(this, arguments),
        this.syncPaddingHint()
    },
    onInputFocused: function() {
        this._super.apply(this, arguments),
        this.syncPaddingHint()
    },
    onInputBlurred: function() {
        this._super.apply(this, arguments),
        this.syncPaddingHint()
    }
}),
SL("editor.components.toolbars.options").Rotation = SL.editor.components.toolbars.options.Stepper.extend({
    init: function(e, t) {
        this._super(e, $.extend({
            type: "rotation",
            label: "Rotation",
            property: "transform.rotate",
            watchBlock: !0,
            loop: !0,
            progressbar: !1
        }, t)),
        this.propertyChanged
    }
}),
SL("editor.components.toolbars.options").ShapeFillColor = SL.editor.components.toolbars.options.Color.extend({
    init: function(e, t) {
        this._super(e, $.extend({
            type: "shape-fill-color",
            label: "Color",
            property: "attribute.data-shape-fill-color",
            alpha: !0
        }, t))
    }
}),
SL("editor.components.toolbars.options").ShapeStretch = SL.editor.components.toolbars.options.Checkbox.extend({
    init: function(e, t) {
        this._super(e, $.extend({
            type: "shape-stretch",
            label: "Stretch to Fill",
            property: "attribute.data-shape-stretch"
        }, t))
    }
}),
SL("editor.components.toolbars.options").ShapeStrokeColor = SL.editor.components.toolbars.options.Color.extend({
    init: function(e, t) {
        this._super(e, $.extend({
            type: "shape-stroke-color",
            label: "Color",
            property: "attribute.data-shape-stroke-color"
        }, t))
    }
}),
SL("editor.components.toolbars.options").ShapeStrokeWidth = SL.editor.components.toolbars.options.Stepper.extend({
    init: function(e, t) {
        this._super(e, $.extend({
            type: "shape-stroke-width",
            label: "Width",
            property: "attribute.data-shape-stroke-width"
        }, t))
    }
}),
SL("editor.components.toolbars.options").ShapeType = SL.editor.components.toolbars.options.Select.extend({
    init: function(e, t) {
        this._super(e, $.extend({
            type: "shape-type",
            panelType: "shape-type",
            panelWidth: 246,
            panelMaxHeight: 430,
            label: "Shape",
            property: "attribute.data-shape-type",
            items: e.getPropertySettings("attribute.data-shape-type").options
        }, t))
    },
    renderPanel: function() {
        this._super.apply(this, arguments),
        this.renderAttribution()
    },
    renderItem: function(e) {
        var t = 32
          , i = 32
          , n = document.createElementNS(SL.util.svg.NAMESPACE, "svg");
        n.setAttribute("xmlns", SL.util.svg.NAMESPACE),
        n.setAttribute("version", "1.1"),
        n.setAttribute("width", t),
        n.setAttribute("height", i),
        n.setAttribute("preserveAspectRatio", "xMidYMid");
        var r = SL.editor.blocks.Shape.shapeFromType(e.value);
        r.setAttribute("fill", "#333333"),
        n.appendChild(r);
        var o = $('<div class="toolbar-select-item" data-value="' + e.value + '">');
        o.append(n),
        o.appendTo(this.panel.contentElement);
        var s = SL.util.svg.boundingBox(r);
        n.setAttribute("viewBox", [Math.round(s.x) || 0, Math.round(s.y) || 0, Math.round(s.width) || 32, Math.round(s.height) || 32].join(" "))
    },
    renderAttribution: function() {
        var e = $('<div class="toolbar-select-attribution">');
        e.html('<a href="/about#credits" target="_blank">Icons from IcoMoon</a>'),
        e.appendTo(this.panel.contentElement)
    },
    displaySelectedValue: function() {
        var e = 32
          , t = 32
          , i = document.createElementNS(SL.util.svg.NAMESPACE, "svg");
        i.setAttribute("xmlns", SL.util.svg.NAMESPACE),
        i.setAttribute("version", "1.1"),
        i.setAttribute("width", e),
        i.setAttribute("height", t),
        i.setAttribute("preserveAspectRatio", "xMidYMid");
        var n = SL.editor.blocks.Shape.shapeFromType(this.value, e, t);
        n.setAttribute("fill", "#ffffff"),
        i.appendChild(n),
        this.triggerElement.find("svg").remove(),
        this.triggerElement.append(i);
        var r = SL.util.svg.boundingBox(n);
        i.setAttribute("viewBox", [Math.round(r.x) || 0, Math.round(r.y) || 0, Math.round(r.width) || 32, Math.round(r.height) || 32].join(" "))
    }
}),
SL("editor.components.toolbars.options").TableBorderColor = SL.editor.components.toolbars.options.Color.extend({
    init: function(e, t) {
        this._super(e, $.extend({
            type: "table-border-color",
            label: "Border color",
            property: "attribute.data-table-border-color",
            alpha: !0
        }, t))
    },
    getTriggerColor: function() {
        return this.block.getTableBorderColor()
    }
}),
SL("editor.components.toolbars.options").TableBorderWidth = SL.editor.components.toolbars.options.Stepper.extend({
    init: function(e, t) {
        this._super(e, $.extend({
            type: "table-border-width",
            label: "Border width",
            property: "attribute.data-table-border-width"
        }, t))
    }
}),
SL("editor.components.toolbars.options").TableCols = SL.editor.components.toolbars.options.Stepper.extend({
    init: function(e, t) {
        this._super(e, $.extend({
            type: "table-cols",
            label: "Columns",
            property: "attribute.data-table-cols",
            progressbar: !1
        }, t)),
        this.onTableSizeChanged = this.onTableSizeChanged.bind(this),
        e.tableSizeChanged.add(this.onTableSizeChanged)
    },
    onTableSizeChanged: function() {
        this.readFromBlock()
    },
    destroy: function() {
        this.block.tableSizeChanged && this.block.tableSizeChanged.remove(this.onTableSizeChanged),
        this._super()
    }
}),
SL("editor.components.toolbars.options").TableHasHeader = SL.editor.components.toolbars.options.Checkbox.extend({
    init: function(e, t) {
        this._super(e, $.extend({
            type: "table-has-header",
            label: "Header",
            property: "attribute.data-table-has-header",
            tooltip: "The first table row is a header."
        }, t))
    }
}),
SL("editor.components.toolbars.options").TablePadding = SL.editor.components.toolbars.options.Stepper.extend({
    init: function(e, t) {
        this._super(e, $.extend({
            type: "table-padding",
            label: "Cell padding",
            property: "attribute.data-table-padding"
        }, t))
    }
}),
SL("editor.components.toolbars.options").TableRows = SL.editor.components.toolbars.options.Stepper.extend({
    init: function(e, t) {
        this._super(e, $.extend({
            type: "table-rows",
            label: "Rows",
            property: "attribute.data-table-rows",
            progressbar: !1
        }, t)),
        this.onTableSizeChanged = this.onTableSizeChanged.bind(this),
        e.tableSizeChanged.add(this.onTableSizeChanged)
    },
    onTableSizeChanged: function() {
        this.readFromBlock()
    },
    destroy: function() {
        this.block.tableSizeChanged && this.block.tableSizeChanged.remove(this.onTableSizeChanged),
        this._super()
    }
}),
SL("editor.components.toolbars.options").TextAlign = SL.editor.components.toolbars.options.Radio.extend({
    init: function(e, t) {
        this._super(e, $.extend({
            type: "text-align",
            label: "Text Alignment",
            property: "style.text-align",
            items: e.getPropertySettings("style.text-align").options
        }, t))
    }
}),
SL("editor.components.toolbars.options").TextColor = SL.editor.components.toolbars.options.Color.extend({
    init: function(e, t) {
        this._super(e, $.extend({
            type: "text-color",
            label: "Text Color",
            property: "style.color"
        }, t))
    }
}),
SL("editor.components.toolbars.options").TextSize = SL.editor.components.toolbars.options.Stepper.extend({
    init: function(e, t) {
        this._super(e, $.extend({
            type: "text-size",
            label: "Text Scale",
            property: "style.font-size",
            progressbar: !1
        }, t))
    }
}),
SL("editor.components.toolbars.options").TransitionDelay = SL.editor.components.toolbars.options.Stepper.extend({
    init: function(e, t) {
        this._super(e, $.extend({
            type: "transition-delay",
            label: "Delay",
            property: "style.transition-delay"
        }, t))
    }
}),
SL("editor.components.toolbars.options").TransitionDuration = SL.editor.components.toolbars.options.Stepper.extend({
    init: function(e, t) {
        this._super(e, $.extend({
            type: "transition-duration",
            label: "Duration",
            property: "style.transition-duration"
        }, t))
    }
}),
SL("editor.components.toolbars.util").Panel = Class.extend({
    init: function(e) {
        this.options = $.extend({
            width: "auto",
            height: "auto",
            maxHeight: "none",
            keydown: !1,
            offsetX: 0,
            offsetY: 0,
            alignment: "r"
        }, e),
        this.render(),
        this.bind(),
        SL.editor.components.toolbars.util.Panel.INSTANCES.push(this)
    },
    render: function() {
        this.domElement = $('<div class="toolbar-panel">'),
        this.contentElement = $('<div class="toolbar-panel-content">').appendTo(this.domElement),
        this.arrowElement = $('<div class="toolbar-panel-arrow">').appendTo(this.domElement),
        this.contentElement.css({
            width: this.options.width,
            height: this.options.height,
            maxHeight: this.options.maxHeight
        }),
        this.domElement.attr("data-alignment", this.options.alignment),
        "string" == typeof this.options.type && this.domElement.attr("data-panel-type", this.options.type),
        "number" == typeof this.options.height && this.domElement.css("overflow", "auto")
    },
    bind: function() {
        this.shown = new signals.Signal,
        this.hidden = new signals.Signal,
        this.isVisible = this.isVisible.bind(this),
        this.onDocumentClick = this.onDocumentClick.bind(this)
    },
    show: function() {
        SL.editor.components.toolbars.util.Panel.INSTANCES.forEach(function(e) {
            e !== this && e.isVisible() && e.hide()
        }),
        this.domElement.appendTo(SL.view.toolbars.domElement),
        this.layout(),
        this.shown.dispatch(),
        "function" == typeof this.options.keydown && SL.keyboard.keydown(this.options.keydown),
        $(document).on("click", this.onDocumentClick)
    },
    hide: function() {
        this.domElement.detach(),
        this.hidden.dispatch(),
        SL.keyboard.release(this.options.keydown)
    },
    toggle: function() {
        this.isVisible() ? this.hide() : this.show()
    },
    isVisible: function() {
        return this.domElement.parent().length > 0
    },
    layout: function() {
        if (this.options.anchor && "auto" === this.options.width && this.domElement.width(this.options.anchor.outerWidth()),
        this.options.anchor) {
            var e = this.options.anchor.offset()
              , t = this.options.anchor.outerWidth()
              , i = this.options.anchor.outerHeight()
              , n = 6
              , r = e.left + this.options.offsetX - this.domElement.parent().offset().left
              , o = e.top + this.options.offsetY;
            "b" === this.options.alignment ? (r += t / 2 - this.domElement.outerWidth() / 2,
            o += i) : r += t,
            o = Math.max(o, n),
            o = Math.min(o, window.innerHeight - this.domElement.outerHeight() - n),
            this.domElement.css({
                left: r,
                top: o
            }),
            this.arrowElement.css("b" === this.options.alignment ? {
                left: this.domElement.outerWidth() / 2,
                top: ""
            } : {
                left: "",
                top: e.top - o + i / 2
            })
        }
    },
    getContentElement: function() {
        return this.contentElement
    },
    onDocumentClick: function(e) {
        var t = $(e.target);
        0 === t.closest(this.options.anchor).length && 0 === t.closest(this.domElement).length && this.hide()
    },
    destroy: function() {
        $(document).off("click", this.onDocumentClick);
        for (var e = 0; e < SL.editor.components.toolbars.util.Panel.INSTANCES.length; e++)
            SL.editor.components.toolbars.util.Panel.INSTANCES[e] === this && SL.editor.components.toolbars.util.Panel.INSTANCES.splice(e, 1);
        SL.keyboard.release(this.options.keydown),
        this.shown.dispose(),
        this.hidden.dispose(),
        this.domElement.remove()
    }
}),
SL.editor.components.toolbars.util.Panel.INSTANCES = [],
SL("editor.controllers").API = {
    forkDeck: function() {
        SL.helpers.PageLoader.show({
            message: "Duplicating..."
        }),
        $.ajax({
            type: "POST",
            url: SL.config.AJAX_FORK_DECK(SLConfig.deck.id),
            context: this
        }).done(function(e) {
            e && e.deck && "string" == typeof e.deck.slug ? window.location = SL.routes.DECK_EDIT(SL.current_user.get("username"), e.deck.slug) : (SL.helpers.PageLoader.hide(),
            SL.notify(SL.locale.get("GENERIC_ERROR"), "negative"))
        }).fail(function() {
            SL.helpers.PageLoader.hide(),
            SL.notify(SL.locale.get("GENERIC_ERROR"), "negative")
        })
    },
    deleteDeck: function() {
        SL.prompt({
            title: "You are deleting the full presentation.",
            subtitle: "Are you sure you want to do this?",
            type: "select",
            data: [{
                html: "<h3>Cancel</h3>"
            }, {
                html: "<h3>Delete my presentation</h3>",
                selected: !0,
                className: "negative",
                callback: function() {
                    SL.helpers.PageLoader.show({
                        message: "Deleting..."
                    }),
                    $.ajax({
                        type: "POST",
                        url: SL.config.AJAX_TRASH_DECK(SLConfig.deck.id),
                        data: {},
                        context: this
                    }).done(function() {
                        window.location = SL.current_user.getProfileURL()
                    }).fail(function() {
                        SL.notify(SL.locale.get("DECK_DELETE_ERROR"), "negative"),
                        SL.helpers.PageLoader.hide()
                    })
                }
                .bind(this)
            }]
        })
    }
},
SL("editor.controllers").Blocks = {
    init: function(e) {
        this.editor = e,
        this.clipboard = [],
        this.clipboardAction = null,
        this.focusChanged = new signals.Signal,
        this.textSaved = new signals.Signal,
        this.bind(),
        parseInt(SL.util.getQuery().debug, 10) > 1 && this.paintDebugBoundingBoxes()
    },
    bind: function() {
        this.onDocumentMouseDown = this.onDocumentMouseDown.bind(this),
        this.onDocumentMouseMove = this.onDocumentMouseMove.bind(this),
        this.onDocumentMouseUp = this.onDocumentMouseUp.bind(this),
        this.onDocumentKeyDown = this.onDocumentKeyDown.bind(this),
        this.onTextEditingTouchMove = this.onTextEditingTouchMove.bind(this),
        this.onTextEditingTouchEnd = this.onTextEditingTouchEnd.bind(this),
        this.afterBlockTextInput = $.throttle(this.afterBlockTextInput.bind(this), 250),
        $(document).on("vmousedown", this.onDocumentMouseDown),
        $(document).on("keydown", this.onDocumentKeyDown)
    },
    sync: function(e) {
        var t = [];
        return e = $(e || Reveal.getCurrentSlide()),
        e.find(".sl-block").each(function(e, i) {
            i = $(i),
            i.data("block-instance") || this.add({
                type: i.attr("data-block-type"),
                element: i
            }),
            t.push(i.data("block-instance"))
        }
        .bind(this)),
        t
    },
    syncNewSlide: function() {
        var e = this.sync.apply(this, arguments);
        this.normalizeBlockDepths(e)
    },
    add: function(e) {
        "undefined" == typeof e.slide && (e.slide = Reveal.getCurrentSlide()),
        "undefined" == typeof e.silent && (e.silent = !1),
        "undefined" == typeof e.center && (e.center = !0);
        var t = SL.config.BLOCKS.getByProperties({
            type: e.type
        });
        if (t) {
            var i;
            return e.element ? (i = new SL.editor.blocks[t.factory]({
                element: e.element
            }),
            e.element.data("block-instance", i),
            0 === e.element.parent().length && i.appendTo(e.slide)) : (i = new SL.editor.blocks[t.factory](e.blockOptions),
            i.appendTo(e.slide),
            i.setDefaults(),
            e.afterInit && "function" == typeof e.afterInit && e.afterInit(i),
            e.width && i.resize({
                width: e.width
            }),
            e.height && i.resize({
                height: e.height
            }),
            this.place(i, {
                skipIntro: e.silent,
                center: e.center
            }),
            ("number" == typeof e.x || "number" == typeof e.y) && i.move(e.x, e.y),
            e.silent || SL.editor.controllers.Blocks.focus(i)),
            i.hasID() === !1 && i.setID(this.generateID(i)),
            i.removed.add(function() {
                i.isFocused() && SL.editor.controllers.Blocks.blur()
            }),
            i
        }
    },
    generateID: function(e) {
        return this.uniqueBlockCount = this.uniqueBlockCount ? this.uniqueBlockCount + 1 : 1,
        CryptoJS.MD5("block-" + e.getType() + "-" + this.uniqueBlockCount + "-" + Date.now() + "-" + Math.round(1e9 * Math.random())).toString()
    },
    place: function(e, t) {
        t = t || {},
        SL.editor.controllers.Blocks.moveBlocksToDepth([e], Number.MAX_VALUE),
        t.center && e.moveToCenter(),
        t.skipIntro || e.runIntro()
    },
    focus: function(e, t, i) {
        "undefined" == typeof t && (t = !1),
        "undefined" == typeof i && (i = !0),
        e && e.nodeName && (e = $(e).data("block-instance")),
        e && "function" == typeof e.focus && (t ? e.isFocused() ? e.isFocused() && i && e.blur() : e.focus() : e.isFocused() || (this.blur(),
        e.focus()),
        this.afterFocusChange())
    },
    blur: function(e) {
        (e || this.getFocusedBlocks()).forEach(function(e) {
            e.blur()
        }),
        this.afterFocusChange()
    },
    blurBlocksBySlide: function(e) {
        $(e).find(".sl-block").each(function() {
            var e = $(this).data("block-instance");
            e && e.blur()
        }),
        this.afterFocusChange()
    },
    afterFocusChange: function() {
        var e = this.getFocusedBlocks();
        1 === e.length && e[0].getToolbarOptions().length ? this.editor.toolbars.get().block !== e[0] && this.editor.toolbars.push(new SL.editor.components.toolbars.Edit(e[0])) : e.length > 1 ? this.editor.toolbars.get()instanceof SL.editor.components.toolbars.EditMultiple || (this.editor.toolbars.clear(),
        this.editor.toolbars.push(new SL.editor.components.toolbars.EditMultiple)) : this.editor.toolbars.clear(),
        $("html").toggleClass("multiple-blocks-selected", e.length > 1),
        this.focusChanged.dispatch()
    },
    afterBlockTextInput: function() {
        $(".reveal-viewport").scrollLeft(0).scrollTop(0)
    },
    afterBlockTextSaved: function(e) {
        this.textSaved.dispatch(e)
    },
    copy: function() {
        this.clipboardAction = "copy";
        var e = this.getFocusedBlocks();
        e.length && (this.clipboard.length = 0,
        e.forEach(function(e) {
            this.clipboard.push({
                block: e,
                measurements: e.measure()
            })
        }
        .bind(this)),
        SL.analytics.trackEditor("Copy block"))
    },
    cut: function() {
        this.clipboardAction = "cut";
        var e = this.getFocusedBlocks();
        e.length && (this.clipboard.length = 0,
        e.forEach(function(e) {
            this.clipboard.push({
                block: e,
                measurements: e.measure()
            }),
            e.blur(),
            e.detach()
        }
        .bind(this)),
        SL.editor.controllers.Blocks.blur(),
        SL.analytics.trackEditor("Cut block"))
    },
    paste: function() {
        var e = $(Reveal.getCurrentSlide())
          , t = 15;
        if (this.clipboard.length && e.length) {
            this.blur();
            var i = [];
            this.clipboard.forEach(function(e) {
                var n = e.block.domElement.clone()
                  , r = JSON.parse(JSON.stringify(e.measurements));
                if (n.removeAttr("data-block-id"),
                n.find(">.editing-ui").remove(),
                "copy" === this.clipboardAction)
                    for (; this.getBlocksByMeasurements(r).length; )
                        r.x += t,
                        r.y += t,
                        r.right && (r.right += t),
                        r.bottom && (r.bottom += t);
                var o = this.add({
                    type: n.attr("data-block-type"),
                    element: n
                });
                o.move(r.x, r.y),
                this.focus(o, !0),
                i.push(o)
            }
            .bind(this)),
            i.sort(function(e, t) {
                return e.get("style.z-index") - t.get("style.z-index")
            }),
            i.forEach(function(e) {
                SL.editor.controllers.Blocks.moveBlocksToDepth([e], Number.MAX_VALUE)
            }),
            SL.analytics.trackEditor("Paste block"),
            Reveal.sync()
        }
    },
    getClipboard: function() {
        return this.clipboard
    },
    align: function(e, t) {
        var i = this.getCombinedBounds(e);
        "left" === t ? e.forEach(function(e) {
            e.move(i.x)
        }) : "horizontal-center" === t ? e.forEach(function(e) {
            e.move(i.x + (i.width - e.measure().width) / 2)
        }) : "right" === t ? e.forEach(function(e) {
            e.move(i.right - e.measure().width)
        }) : "top" === t ? e.forEach(function(e) {
            e.move(null, i.y)
        }) : "vertical-center" === t ? e.forEach(function(e) {
            e.move(null, i.y + (i.height - e.measure().height) / 2)
        }) : "bottom" === t && e.forEach(function(e) {
            e.move(null, i.bottom - e.measure().height)
        })
    },
    layout: function(e, t, i) {
        ("number" != typeof i || isNaN(i)) && (i = 10);
        var n = 0
          , r = 0
          , o = e.map(function(e) {
            var t = e.measure();
            return n += t.width,
            r += t.height,
            {
                block: e,
                measurements: t
            }
        });
        n += i * (e.length - 1),
        r += i * (e.length - 1);
        var s = SL.util.deck.getSlideSize();
        if ("column" === t) {
            var a = s.height / 2 - r / 2;
            o.forEach(function(e) {
                e.block.move(s.width / 2 - e.measurements.width / 2, a),
                a += e.measurements.height + i
            })
        } else if ("row" === t) {
            var l = s.width / 2 - n / 2;
            o.forEach(function(e) {
                e.block.move(l, s.height / 2 - e.measurements.height / 2),
                l += e.measurements.width + i
            })
        }
    },
    discoverBlockPairs: function() {
        var e = this.getCurrentBlocks()
          , t = SL.editor.controllers.Blocks.getAdjacentBlocks(e);
        e.forEach(function(e) {
            e.unpair()
        }),
        t.forEach(function(e) {
            "bottom" !== e.relationship || "text" !== e.blockA.type && "html" !== e.blockA.type || e.blockA.pair(e.blockB, "bottom")
        })
    },
    moveBlocksToDepth: function(e, t) {
        var i = this.getCurrentBlocks();
        t = Math.min(Math.max(t, SL.editor.controllers.Blocks.MIN_BLOCK_DEPTH), i.length + SL.editor.controllers.Blocks.MIN_BLOCK_DEPTH),
        this.normalizeBlockDepths(i, t),
        e.forEach(function(e) {
            e.set("style.z-index", t)
        })
    },
    normalizeBlockDepths: function(e, t) {
        e.sort(function(e, t) {
            return e.get("style.z-index") - t.get("style.z-index")
        });
        var i = SL.editor.controllers.Blocks.MIN_BLOCK_DEPTH;
        e.forEach(function(e) {
            i === t && (i += 1),
            e.set("style.z-index", i),
            i += 1
        })
    },
    paintDebugBoundingBoxes: function() {
        var e = $("<canvas>").appendTo(".slides");
        e.css({
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 100,
            pointerEvents: "none"
        });
        var t = e.get(0).getContext("2d")
          , i = function() {
            var n = $(".slides").width()
              , r = $(".slides").height();
            e.attr({
                width: n,
                height: r
            }),
            t.clearRect(0, 0, n, r),
            SL.editor.controllers.Blocks.getCurrentBlocks().forEach(function(e) {
                var i = e.measure(!0)
                  , n = e.measure()
                  , r = e.getAnchorPositions();
                t.fillStyle = "rgba(0,255,0,0.1)",
                t.fillRect(n.x, n.y, n.width, n.height),
                t.save(),
                t.translate(i.x, i.y),
                t.fillStyle = "rgba(255,0,0,1.0)",
                t.fillRect(r.n.x - 4, r.n.y - 4, 8, 8),
                t.fillRect(r.e.x - 4, r.e.y - 4, 8, 8),
                t.fillRect(r.s.x - 4, r.s.y - 4, 8, 8),
                t.fillRect(r.w.x - 4, r.w.y - 4, 8, 8),
                t.restore()
            }),
            requestAnimationFrame(i)
        };
        i()
    },
    getCombinedBounds: function(e) {
        var t = {
            y: Number.MAX_VALUE,
            right: 0,
            bottom: 0,
            x: Number.MAX_VALUE
        };
        return e.forEach(function(e) {
            var i = e.measure();
            t.x = Math.min(t.x, i.x),
            t.y = Math.min(t.y, i.y),
            t.right = Math.max(t.right, i.right),
            t.bottom = Math.max(t.bottom, i.bottom)
        }
        .bind(this)),
        t.width = t.right - t.x,
        t.height = t.bottom - t.y,
        t
    },
    getFocusedBlocks: function() {
        var e = [];
        return this.getCurrentBlocks().forEach(function(t) {
            t.isFocused() && e.push(t)
        }),
        e
    },
    getFocusedBlocksInVisualOrder: function() {
        var e = {
            x: 0,
            y: 0
        };
        return this.getFocusedBlocks().sort(function(t, i) {
            var n = SL.util.trig.distanceBetween(t.measure(), e)
              , r = SL.util.trig.distanceBetween(i.measure(), e);
            return n - r
        })
    },
    getCurrentBlocks: function() {
        return this.getBlocksBySlide(Reveal.getCurrentSlide())
    },
    getBlocksBySlide: function(e) {
        SL.editor.controllers.Blocks.sync(e);
        var t = [];
        return $(e).find(".sl-block").each(function() {
            var e = $(this).data("block-instance");
            e && t.push(e)
        }),
        t
    },
    getBlocksByMeasurements: function(e) {
        var t = [];
        return this.getCurrentBlocks().forEach(function(i) {
            var n = i.measure()
              , r = !0;
            for (var o in e)
                e.hasOwnProperty(o) && e[o] !== n[o] && (r = !1);
            r && t.push(i)
        }),
        t
    },
    getAdjacentBlocks: function(e) {
        var t = []
          , e = e || this.getCurrentBlocks();
        return e.forEach(function(i) {
            t = t.concat(SL.editor.controllers.Blocks.getAdjacentBlocksTo(i, e))
        }),
        t
    },
    getAdjacentBlocksTo: function(e, t) {
        var i = 4
          , n = []
          , t = t || this.getCurrentBlocks()
          , r = e.measure();
        return t.forEach(function(t) {
            var o = t.measure()
              , s = SL.util.trig.intersection(r, o);
            s.height > 0 && (Math.abs(r.x - o.right) < i ? n.push({
                relationship: "left",
                blockA: e,
                blockB: t
            }) : Math.abs(r.right - o.x) < i && n.push({
                relationship: "right",
                blockA: e,
                blockB: t
            })),
            s.width > 0 && (Math.abs(r.y - o.bottom) < i ? n.push({
                relationship: "top",
                blockA: e,
                blockB: t
            }) : Math.abs(r.bottom - o.y) < i && n.push({
                relationship: "bottom",
                blockA: e,
                blockB: t
            }))
        }),
        n
    },
    onDocumentMouseDown: function(e) {
        if (SL.view.isEditing() === !1)
            return !0;
        var t = $(e.target).closest(".reveal").length > 0;
        if (isRevealControls = $(e.target).closest(".reveal .controls").length > 0,
        isBlock = $(e.target).closest(".sl-block").length > 0,
        isToolbar = $(e.target).closest(".toolbars").length > 0,
        !t || isBlock || isRevealControls)
            isToolbar && this.getFocusedBlocks().forEach(function(e) {
                "function" == typeof e.disableEditing && e.disableEditing()
            });
        else {
            if (SL.editor.controllers.Capabilities.isTouchEditor()) {
                var i = this.getFocusedBlocks().some(function(e) {
                    return e.isEditingText()
                });
                if (i)
                    return this.touchMouseStart = {
                        x: e.clientX,
                        y: e.clientY
                    },
                    this.touchMouseMoved = !1,
                    $(document).on("vmousemove", this.onTextEditingTouchMove),
                    $(document).on("vmouseup", this.onTextEditingTouchEnd),
                    !0
            }
            e.shiftKey || (SL.editor.controllers.Blocks.blur(),
            $(document.activeElement).blur()),
            e.preventDefault(),
            SL.editor.controllers.Selection.start(e.clientX, e.clientY),
            $(document).on("vmousemove", this.onDocumentMouseMove),
            $(document).on("vmouseup", this.onDocumentMouseUp)
        }
    },
    onDocumentMouseMove: function(e) {
        SL.editor.controllers.Selection.sync(e.clientX, e.clientY)
    },
    onDocumentMouseUp: function() {
        SL.editor.controllers.Selection.stop(),
        $(document).off("vmousemove", this.onDocumentMouseMove),
        $(document).off("vmouseup", this.onDocumentMouseUp)
    },
    onTextEditingTouchMove: function(e) {
        (e.clientX !== this.touchMouseStart.x || e.clientY !== this.touchMouseStart.y) && (this.touchMouseMoved = !0)
    },
    onTextEditingTouchEnd: function() {
        this.touchMouseMoved || SL.editor.controllers.Blocks.blur(),
        $(document).off("vmousemove", this.onTextEditingTouchMove),
        $(document).off("vmouseup", this.onTextEditingTouchEnd)
    },
    onDocumentKeyDown: function(e) {
        if (SL.view.isEditing() === !1)
            return !0;
        if (SL.util.isTypingEvent(e))
            return !0;
        var t = this.editor.sidebar.isExpanded();
        if (!t) {
            var i = e.metaKey || e.ctrlKey
              , n = this.getFocusedBlocks();
            if (37 === e.keyCode || 38 === e.keyCode || 39 === e.keyCode || 40 === e.keyCode && n.length) {
                var r = e.shiftKey ? 10 : 1
                  , o = 0
                  , s = 0;
                switch (e.keyCode) {
                case 37:
                    o = -r;
                    break;
                case 39:
                    o = r;
                    break;
                case 38:
                    s = -r;
                    break;
                case 40:
                    s = r
                }
                n.forEach(function(e) {
                    e.move(o, s, {
                        isOffset: !0
                    })
                })
            } else
                8 !== e.keyCode && 46 !== e.keyCode || !n.length ? i && !e.shiftKey && 65 === e.keyCode ? (this.getCurrentBlocks().forEach(function(e) {
                    SL.editor.controllers.Blocks.focus(e, !0, !1)
                }),
                e.preventDefault()) : i && !e.shiftKey && 67 === e.keyCode && n.length ? (SL.editor.controllers.Blocks.copy(),
                e.preventDefault()) : i && !e.shiftKey && 88 === e.keyCode && n.length ? (SL.editor.controllers.Blocks.cut(),
                e.preventDefault()) : i && !e.shiftKey && 86 === e.keyCode && SL.editor.controllers.Blocks.getClipboard().length > 0 && (SL.editor.controllers.Blocks.paste(),
                e.preventDefault()) : (n.forEach(function(e) {
                    e.destroy()
                }),
                e.preventDefault())
        }
    }
},
SL.editor.controllers.Blocks.MIN_BLOCK_DEPTH = 10,
SL("editor.controllers").Capabilities = {
    TOUCH_EDITOR: !1,
    TOUCH_EDITOR_SMALL: !1,
    init: function() {
        if (!SL.util.device.supportedByEditor())
            return $(document.body).append('<div class="not-supported"><h2>Not Supported</h2><p>The Slides editor doesn\'t currently support the browser you\'re using. Please consider changing to a different browser, such as <a href="https://www.google.com/chrome">Google Chrome</a> or <a href="https://www.mozilla.org/firefox/">Firefox</a>.</p><a class="skip" href="#">Continue anyway</a></div>'),
            $(".not-supported .skip").on("click", function() {
                $(".not-supported").remove()
            }),
            !1;
        SL.editor.controllers.Capabilities.TOUCH_EDITOR = /ipad|iphone|ipod|android/gi.test(navigator.userAgent) && !!("ontouchstart"in window),
        SL.editor.controllers.Capabilities.TOUCH_EDITOR_SMALL = SL.editor.controllers.Capabilities.TOUCH_EDITOR && window.innerWidth > 0 && window.innerWidth < 1e3,
        SL.editor.controllers.Capabilities.TOUCH_EDITOR && ($("html").addClass("touch-editor"),
        SL.editor.controllers.Capabilities.TOUCH_EDITOR_SMALL && $("html").addClass("touch-editor-small"));
        var e = SL.current_user.get("id") === SL.current_deck.get("user").id;
        return this._canExport = e,
        this._canPresent = e,
        this._canShareDeck = e || SL.current_deck.isVisibilityAll(),
        this._canDeleteDeck = e,
        this._canChangeStyles = e || !SL.current_team || !SL.current_team.hasThemes() || SL.current_user.isMemberOfCurrentTeam(),
        this._canUseCSSEditor = SL.current_user.privileges.customCSS(),
        this._canSetVisibility = e,
        !0
    },
    isTouchEditor: function() {
        return SL.editor.controllers.Capabilities.TOUCH_EDITOR
    },
    isTouchEditorSmall: function() {
        return SL.editor.controllers.Capabilities.TOUCH_EDITOR_SMALL
    },
    canExport: function() {
        return this._canExport
    },
    canPresent: function() {
        return this._canPresent
    },
    canShareDeck: function() {
        return this._canShareDeck
    },
    canDeleteDeck: function() {
        return this._canDeleteDeck
    },
    canChangeStyles: function() {
        return this._canChangeStyles
    },
    canSetVisibility: function() {
        return this._canSetVisibility
    },
    canUseCSSEditor: function() {
        return this._canUseCSSEditor
    }
},
SL("editor.controllers").Contrast = {
    init: function() {
        this.contrast = -1,
        this.sync = this.sync.bind(this),
        this.bind(),
        this.sync()
    },
    bind: function() {
        this.changed = new signals.Signal,
        Reveal.addEventListener("ready", this.sync),
        Reveal.addEventListener("slidechanged", function() {
            setTimeout(this.sync, 1)
        }
        .bind(this)),
        SL.editor.controllers.Markup.slideRemoved.add(this.sync)
    },
    sync: function() {
        var e = SL.util.deck.getBackgroundContrast();
        e !== this.contrast && (this.contrast = e,
        $("html").attr("data-deck-contrast", Math.round(10 * e)),
        this.changed.dispatch(this.contrast))
    },
    get: function() {
        return -1 === this.contrast && this.sync(),
        this.contrast
    }
},
SL("editor.controllers").DeckImport = {
    TEXT_FORMATS: {
        h1: "h1",
        h2: "h2",
        h3: "h3",
        p: "p"
    },
    THEME_COLOR_MAP: {
        "white-blue": "white-blue",
        "black-blue": "black-blue"
    },
    THEME_FONT_MAP: {
        asul: "asul",
        helvetica: "helvetica",
        josefine: "josefine",
        league: "league",
        merriweather: "merriweather",
        montserrat: "montserrat",
        news: "news",
        opensans: "opensans",
        palatino: "palatino",
        quicksand: "quicksand",
        sketch: "sketch",
        overpass: "overpass2"
    },
    TRANSITION_MAP: {
        none: "none",
        fade: "fade",
        slide: "slide",
        concave: "concave",
        convex: "convex"
    },
    init: function(e) {
        this.editor = e,
        this.onImportConfirmed = this.onImportConfirmed.bind(this),
        this.onImportCanceled = this.onImportCanceled.bind(this),
        this.importing = !1,
        SL.util.getQuery().define && "object" == typeof window.SLDeckDefinition && e.isNewDeck() && (this.editor.deckSaved.add(this.onDeckSaved.bind(this)),
        this.start(SLDeckDefinition))
    },
    start: function(e) {
        this.importing || (this.importing = !0,
        this.domElement = $('<div class="sl-deck-import">'),
        this.domElement.appendTo($(".projector")),
        this.domElement.append('<p class="description">You are importing a deck. Please review the content and click below to save it to your account.</p>'),
        this.controlsButtons = $('<div class="sl-deck-import-buttons">'),
        this.controlsButtons.appendTo(this.domElement),
        this.confirmButton = $('<button class="button white l sl-deck-import-confirm">Save deck</button>'),
        this.confirmButton.on("vclick", this.onImportConfirmed),
        this.confirmButton.appendTo(this.controlsButtons),
        this.cancelButton = $('<button class="button outline white l sl-deck-import-cancel">Cancel</button>'),
        this.cancelButton.on("vclick", this.onImportCanceled),
        this.cancelButton.appendTo(this.controlsButtons),
        this.importJSON(e),
        $("html").addClass("deck-import-open"))
    },
    stop: function() {
        this.importing = !1,
        this.domElement.remove(),
        $("html").removeClass("deck-import-open")
    },
    importJSON: function(e) {
        SL.helpers.PageLoader.show({
            message: "Importing..."
        }),
        $(".reveal .slides").empty(),
        e.title && (SLConfig.deck.title = e.title),
        e.description && (SLConfig.deck.description = e.description),
        e.loop && (SLConfig.deck.should_loop = e.loop),
        e["slide-number"] && (SLConfig.deck.slide_number = e["slide-number"]),
        "number" == typeof e.width && (SLConfig.deck.width = e.width,
        Reveal.configure({
            width: SLConfig.deck.width
        })),
        "number" == typeof e.height && (SLConfig.deck.height = e.height,
        Reveal.configure({
            height: SLConfig.deck.width
        })),
        SLConfig.deck.theme_color = this.THEME_COLOR_MAP[e["theme-color"]] || SL.config.DEFAULT_THEME_COLOR,
        SLConfig.deck.theme_font = this.THEME_FONT_MAP[e["theme-font"]] || SL.config.DEFAULT_THEME_FONT,
        SLConfig.deck.transition = this.TRANSITION_MAP[e.transition] || SL.config.DEFAULT_THEME_TRANSITION,
        SLConfig.deck.background_transition = this.TRANSITION_MAP[e["background-transition"]] || SL.config.DEFAULT_THEME_BACKGROUND_TRANSITION,
        "string" == typeof e.css && SL.editor.controllers.Capabilities.canUseCSSEditor() && this.importCSS(e.css),
        e.slides.forEach(this.importSlideJSON, this),
        Reveal.sync(),
        Reveal.slide(0, 0),
        SL.editor.controllers.Blocks.sync(),
        SL.editor.controllers.Grid.refresh(),
        SL.view.slideOptions.syncRemoveSlide(),
        this.editor.setupTheme(),
        this.waitForContentToLoad().then(this.afterContentLoaded.bind(this))
    },
    importCSS: function(e) {
        var t = new less.Parser;
        t.parse(".reveal { " + e + " }", function(t, i) {
            if (t)
                SL.notify("Failed to parse imported CSS: <br>" + t.message);
            else {
                var n = SL.util.string.moveCSSImportsToBeginning(i.toCSS());
                SLConfig.deck.css_input = e,
                SLConfig.deck.css_output = n,
                $("#user-css-output").html(n)
            }
        }
        .bind(this))
    },
    importSlideJSON: function(e, t) {
        var i = $("<section>").appendTo($(".reveal .slides"));
        SL.util.deck.generateIdentifiers(i),
        e instanceof Array ? e.forEach(function(e) {
            this.importSlideJSON(e, i)
        }, this) : (e.notes && (SLConfig.deck.notes[i.attr("data-id")] = e.notes),
        e["background-color"] && i.attr("data-background-color", e["background-color"]),
        e["background-image"] && i.attr("data-background-image", e["background-image"]),
        e["background-size"] && i.attr("data-background-size", e["background-size"]),
        this.slideBlockCount = {},
        e.blocks && e.blocks.forEach(function(e) {
            this.importBlockJSON(e, i);
            var t = e.type;
            this.slideBlockCount[t] ? this.slideBlockCount[t] += 1 : this.slideBlockCount[t] = 1
        }, this),
        e.html && this.importBlockJSON({
            type: "html",
            value: e.html
        }, i),
        "object" == typeof t && i.appendTo(t))
    },
    importBlockJSON: function(e, t) {
        var i = SL.util.deck.getSlideSize()
          , n = {
            slide: t,
            silent: !0,
            width: Math.round(.8 * i.width)
        };
        switch (e.type) {
        case "html":
            n.type = "text",
            n.width = .8 * i.width,
            n.afterInit = function(t) {
                t.set("style.text-align", e.align),
                t.set("style.padding", e.padding),
                t.setCustomHTML(e.value)
            }
            ;
            break;
        case "text":
            n.type = "text",
            n.width = .8 * i.width;
            var r = this.TEXT_FORMATS[e.format] || (this.slideBlockCount.text > 0 ? "h2" : "h1");
            n.afterInit = function(t) {
                t.set("style.text-align", e.align),
                t.set("style.padding", e.padding),
                t.setHTML("<" + r + ">" + e.value + "</" + r + ">")
            }
            ;
            break;
        case "iframe":
            n.type = "iframe",
            n.width = .6 * i.width,
            n.height = .6 * i.height,
            n.afterInit = function(t) {
                t.set("iframe.src", e.value)
            }
            ;
            break;
        case "image":
            n.type = "image",
            n.width = .6 * i.width,
            n.height = .6 * i.height,
            n.afterInit = function(t) {
                t.set("image.src", e.value)
            }
            ;
            break;
        case "code":
            n.type = "code",
            n.width = .6 * i.width,
            n.height = .6 * i.height,
            n.afterInit = function(t) {
                e.value && t.set("code.value", e.value),
                e.language && t.set("code.language", e.language),
                e.theme && t.set("code.theme", e.theme)
            }
            ;
            break;
        default:
            return void console.warn('Unrecognized block type: "' + e.type + '"')
        }
        e.x && (n.x = e.x),
        e.y && (n.y = e.y),
        e.width && "number" == typeof n.width && (n.width = e.width),
        e.height && "number" == typeof n.height && (n.height = e.height),
        this.importBlockSize(n, e, n.width, n.height);
        var o = SL.editor.controllers.Blocks.add(n);
        ("number" == typeof n.x || "number" == typeof n.y) && (o._importedWithAbsolutePosition = !0)
    },
    importBlockSize: function(e, t, i, n) {
        "number" == typeof i && (e.width = Math.round("number" == typeof t.width ? t.width : i)),
        "number" == typeof n && (e.height = Math.round("number" == typeof t.height ? t.height : n))
    },
    layoutSlide: function(e) {
        e.style.display = "block";
        var t = SL.editor.controllers.Blocks.getBlocksBySlide(e).filter(function(e) {
            return !e._importedWithAbsolutePosition
        });
        SL.editor.controllers.Blocks.layout(t, "column"),
        e.style.display = ""
    },
    waitForContentToLoad: function() {
        var e = [];
        return $(".reveal .slides section").each(function(t, i) {
            i.style.display = "block",
            SL.editor.controllers.Blocks.getBlocksBySlide(i).forEach(function(t) {
                "image" === t.getType() && t.isLoading() && e.push(new Promise(function(e) {
                    t.imageStateChanged.add(function() {
                        (t.isLoaded() || !t.isLoading()) && e()
                    })
                }
                ))
            })
        }
        .bind(this)),
        e.push(new Promise(function(e) {
            var t = SL.fonts.loadDeckFont(SLConfig.deck.theme_font, {
                active: e,
                inactive: e
            });
            t || e()
        }
        )),
        Promise.all(e)
    },
    afterContentLoaded: function() {
        SL.helpers.PageLoader.hide(),
        $(".reveal .slides section").each(function(e, t) {
            this.layoutSlide(t),
            Reveal.sync()
        }
        .bind(this))
    },
    isImporting: function() {
        return this.importing
    },
    onImportCanceled: function() {
        this.stop(),
        SL.analytics.trackEditor("Deck JSON import canceled"),
        SL.helpers.PageLoader.show({
            message: "Canceling import..."
        }),
        SL.view.redirect(SL.routes.USER(SL.current_user.get("username")), !0)
    },
    onImportConfirmed: function() {
        this.stop(),
        SL.analytics.trackEditor("Deck JSON import confirmed"),
        this.editor.save(function(e) {
            e && SL.notify("This deck has been saved to your account!")
        })
    },
    onDeckSaved: function() {
        this.isImporting() && (this.domElement.remove(),
        this.importing = !1,
        SL.notify("Deck saved!"))
    }
},
SL("editor.controllers").Grid = {
    init: function() {
        this.color = "rgba(150, 150, 150, 0.2)",
        this.paint = this.paint.bind(this),
        this.bind(),
        this.render(),
        setTimeout(function() {
            SL.editor.controllers.Grid.show()
        }, 1)
    },
    render: function() {
        this.domElement = $('<div class="sl-block-grid">'),
        this.canvasElement = $('<canvas class="sl-block-grid-inner">').appendTo(this.domElement)
    },
    bind: function() {
        SL.editor.controllers.Contrast.changed.add(this.onContrastChange.bind(this))
    },
    show: function() {
        this.isEnabled() && (this.domElement.appendTo($(".projector .reveal")),
        this.setContrast(SL.editor.controllers.Contrast.get()),
        this.paint(),
        $(window).on("resize", this.paint))
    },
    hide: function() {
        this.domElement.remove(),
        $(window).off("resize", this.paint)
    },
    paint: function() {
        var e = SL.util.getRevealSlideBounds(SL.editor.controllers.Markup.getCurrentSlide(), !0)
          , t = Math.round(window.devicePixelRatio || 1)
          , i = e.width * t
          , n = e.height * t
          , r = this.getRows()
          , o = this.getCols()
          , s = Math.round(i / o)
          , a = Math.round(n / r)
          , l = SL.view.getSlideSize({
            scaled: !0
        })
          , c = (window.innerWidth - SL.view.getSidebarWidth() - l.width) / 2
          , h = (window.innerHeight - l.height) / 2;
        this.canvasElement.css({
            left: Math.max(c, SL.view.getSlideMargin()),
            top: h
        }),
        this.canvasElement.attr({
            width: i,
            height: n
        }),
        this.canvasElement.css({
            width: i / t,
            height: n / t
        });
        var d = this.canvasElement.get(0).getContext("2d");
        d.clearRect(0, 0, i, n);
        for (var u = 1; o > u; u++)
            d.fillStyle = this.color,
            d.fillRect(Math.floor(u * s), 0, 1 * t, n);
        for (var p = 1; r > p; p++)
            d.fillStyle = this.color,
            d.fillRect(0, Math.floor(p * a), i, 1 * t)
    },
    refresh: function() {
        this.isEnabled() ? this.show() : this.hide()
    },
    getRows: function() {
        return Math.round(SL.util.deck.getSlideSize().height / 70)
    },
    getCols: function() {
        return Math.round(SL.util.deck.getSlideSize().width / 80)
    },
    setContrast: function(e) {
        this.color = .15 > e ? "rgba(255, 255, 255, 0.10)" : .45 > e ? "rgba(255, 255, 255, 0.15)" : .85 > e ? "rgba(255, 255, 255, 0.20)" : "rgba(150, 150, 150, 0.20)"
    },
    isEnabled: function() {
        return SL.editor.controllers.Capabilities.isTouchEditor() ? !1 : SL.current_user.settings.get("editor_grid")
    },
    onContrastChange: function(e) {
        this.setContrast(e),
        this.isEnabled() && this.paint()
    }
},
SL("editor.controllers").Guides = {
    init: function() {
        this.guides = {
            h: [],
            v: []
        },
        this.render()
    },
    render: function() {
        this.domElement = $('<div class="sl-block-guides editing-ui">')
    },
    start: function(e, t) {
        if (this.isEnabled() !== !1) {
            if (this.options = $.extend({
                snap: !0,
                action: "move",
                threshold: 6
            }, t),
            this.slideBounds = SL.view.getSlideSize(),
            this.slideBounds.x = 0,
            this.slideBounds.y = 0,
            this.domElement.appendTo(SL.editor.controllers.Markup.getCurrentSlide()),
            this.allBlocks = SL.editor.controllers.Blocks.getCurrentBlocks(),
            this.targetBlocks = e,
            this.gridLines = [],
            SL.editor.controllers.Grid.isEnabled()) {
                for (var i = SL.editor.controllers.Grid.getCols(), n = SL.editor.controllers.Grid.getRows(), r = Math.round(this.slideBounds.width / i), o = Math.round(this.slideBounds.height / n), s = 1; i > s; s++)
                    this.gridLines.push(this.getCenterEdges({
                        x: s * r,
                        y: 0,
                        width: 0,
                        height: this.slideBounds.height
                    }, "grid-col-" + s, "horizontal"));
                for (var a = 1; n > a; a++)
                    this.gridLines.push(this.getCenterEdges({
                        x: 0,
                        y: a * o,
                        width: this.slideBounds.width,
                        height: 0
                    }, "grid-row-" + a, "vertical"))
            }
            var l = this.getTargetBounds();
            this.targetBlocks.forEach(function(e) {
                var t = e.measure();
                e._guideOffsetX = t.x - l.x,
                e._guideOffsetY = t.y - l.y
            })
        }
    },
    stop: function() {
        this.domElement.remove(),
        this.clearGuideElements(),
        this.targetBlocks = []
    },
    sync: function() {
        this.isEnabled() !== !1 && this.targetBlocks.length && (this.options.snap ? (this.findGuides(this.options.threshold),
        this.enforceGuides(),
        this.findGuides(1),
        this.renderGuides()) : (this.findGuides(this.options.threshold),
        this.renderGuides()))
    },
    findGuides: function(e) {
        this.guides.h.length = 0,
        this.guides.v.length = 0;
        var t, i = this.getTargetBounds();
        if ("line-anchor" === this.options.action) {
            t = this.getCenterEdges(i, "target-bounds");
            var n = this.targetBlocks[0];
            if ("line" === n.getType()) {
                var r = this.targetBlocks[0].getGlobalLinePoint(n.getOppositePointID(this.options.direction))
                  , o = this.getCenterEdges({
                    x: r.x,
                    y: r.y,
                    width: 0,
                    height: 0
                }, "line-anchor-opposite");
                this.compareEdges(t, o, e)
            }
        } else
            t = this.getEdges(i, "target-bounds", "resize" === this.options.action);
        this.allBlocks.forEach(function(i) {
            if (-1 === this.targetBlocks.indexOf(i)) {
                var n;
                n = "line" === i.getType() ? this.getLineEdges(i.measure(), i.getID(), i) : this.getEdges(i.measure(), i.getID()),
                this.compareEdges(t, n, e)
            }
        }
        .bind(this)),
        this.gridLines.forEach(function(i) {
            this.compareEdges(t, i, e)
        }
        .bind(this)),
        this.compareEdges(t, this.getEdges(this.slideBounds, "slide-bounds"), e),
        this.guides.h.sort(function(e, t) {
            return e.distance - t.distance
        }),
        this.guides.v.sort(function(e, t) {
            return e.distance - t.distance
        })
    },
    compareEdges: function(e, t, i) {
        var n;
        e.h.forEach(function(e) {
            t.h.forEach(function(t) {
                n = Math.abs(e.x - t.x),
                i > n && this.guides.h.push({
                    distance: n,
                    targetEdge: e,
                    compareEdge: t
                })
            }
            .bind(this))
        }
        .bind(this)),
        e.v.forEach(function(e) {
            t.v.forEach(function(t) {
                n = Math.abs(e.y - t.y),
                i > n && this.guides.v.push({
                    distance: n,
                    targetEdge: e,
                    compareEdge: t
                })
            }
            .bind(this))
        }
        .bind(this))
    },
    enforceGuides: function() {
        if ("resize" === this.options.action) {
            var e = this.targetBlocks[0];
            if (e.transform.isResizingCentered())
                return;
            var t = {
                n: 0,
                e: 0,
                s: 0,
                w: 0,
                hc: 0,
                vc: 0
            };
            this.guides.h = this.guides.h.filter(function(e) {
                return 1 === ++t[e.targetEdge.direction]
            }),
            this.guides.v = this.guides.v.filter(function(e) {
                return 1 === ++t[e.targetEdge.direction]
            }),
            this.guides.h.forEach(function(t) {
                /w|e/.test(this.options.direction) && this.options.direction.indexOf(t.targetEdge.direction) > -1 && (/w/.test(t.targetEdge.direction) ? e.resize({
                    left: t.compareEdge.x,
                    direction: t.targetEdge.direction
                }) : /e/.test(t.targetEdge.direction) && e.resize({
                    right: t.compareEdge.x,
                    direction: t.targetEdge.direction
                }))
            }
            .bind(this)),
            this.guides.v.forEach(function(t) {
                /n|s/.test(this.options.direction) && this.options.direction.indexOf(t.targetEdge.direction) > -1 && (/n/.test(t.targetEdge.direction) ? e.resize({
                    top: t.compareEdge.y,
                    direction: t.targetEdge.direction
                }) : /s/.test(t.targetEdge.direction) && e.resize({
                    bottom: t.compareEdge.y,
                    direction: t.targetEdge.direction
                }))
            }
            .bind(this))
        } else if ("move" === this.options.action)
            this.guides.h.splice(1),
            this.guides.v.splice(1),
            this.guides.h.forEach(function(e) {
                this.targetBlocks.forEach(function(t) {
                    t.move(e.compareEdge.x + e.targetEdge.offset + t._guideOffsetX)
                }
                .bind(this))
            }
            .bind(this)),
            this.guides.v.forEach(function(e) {
                this.targetBlocks.forEach(function(t) {
                    t.move(null, e.compareEdge.y + e.targetEdge.offset + t._guideOffsetY)
                }
                .bind(this))
            }
            .bind(this));
        else if ("line-anchor" === this.options.action) {
            var i = this.targetBlocks[0];
            this.guides.h.length && i.setGlobalLinePoint(this.options.direction, this.guides.h[0].compareEdge.x),
            this.guides.v.length && i.setGlobalLinePoint(this.options.direction, null, this.guides.v[0].compareEdge.y)
        }
    },
    renderGuides: function() {
        var e = []
          , t = this.getTargetBounds();
        this.guides.h.forEach(function(i) {
            e.push(this.renderGuide(i, t))
        }
        .bind(this)),
        this.guides.v.forEach(function(i) {
            e.push(this.renderGuide(i, t))
        }
        .bind(this)),
        this.clearGuideElements(e)
    },
    renderGuide: function(e, t) {
        var i = e.targetEdge
          , n = e.compareEdge
          , r = $('[data-guide-id="' + n.id + '"]');
        0 === r.length && (r = $('<div data-guide-id="' + n.id + '">').appendTo(this.domElement),
        setTimeout(function() {
            r.addClass("show")
        }, 1));
        var o = {
            top: Math.min(n.bounds.y, t.y),
            right: Math.max(n.bounds.x + n.bounds.width, t.x + t.width),
            bottom: Math.max(n.bounds.y + n.bounds.height, t.y + t.height),
            left: Math.min(n.bounds.x, t.x)
        };
        if ("number" == typeof n.y) {
            var s = "s" === i.direction ? -1 : 0;
            r.addClass("guide-h"),
            r.css({
                top: Math.floor(n.y + s),
                left: o.left,
                width: o.right - o.left
            })
        } else {
            var a = "e" === i.direction ? -1 : 0;
            r.addClass("guide-v"),
            r.css({
                left: Math.floor(n.x + a),
                top: o.top,
                height: o.bottom - o.top
            })
        }
        return n.id
    },
    getEdges: function(e, t, i) {
        var n = {
            h: [{
                id: t + "-h1",
                bounds: e,
                x: e.x,
                offset: 0,
                direction: "w"
            }, {
                id: t + "-h2",
                bounds: e,
                x: e.x + e.width / 2,
                offset: -e.width / 2,
                direction: "hc"
            }, {
                id: t + "-h3",
                bounds: e,
                x: e.x + e.width,
                offset: -e.width,
                direction: "e"
            }],
            v: [{
                id: t + "-v1",
                bounds: e,
                y: e.y,
                offset: 0,
                direction: "n"
            }, {
                id: t + "-v2",
                bounds: e,
                y: e.y + e.height / 2,
                offset: -e.height / 2,
                direction: "vc"
            }, {
                id: t + "-v3",
                bounds: e,
                y: e.y + e.height,
                offset: -e.height,
                direction: "s"
            }]
        };
        return i === !0 && (n.h.splice(1, 1),
        n.v.splice(1, 1)),
        n
    },
    getCenterEdges: function(e, t, i) {
        var n = {
            h: [],
            v: []
        }
          , r = {
            id: t + "-v2",
            bounds: e,
            y: e.y + e.height / 2,
            offset: -e.height / 2,
            direction: t
        }
          , o = {
            id: t + "-h2",
            bounds: e,
            x: e.x + e.width / 2,
            offset: -e.width / 2,
            direction: t
        };
        return i && "vertical" !== i || n.v.push(r),
        i && "horizontal" !== i || n.h.push(o),
        n
    },
    getLineEdges: function(e, t, i) {
        var n = {
            h: [],
            v: []
        }
          , r = [i.getGlobalLinePoint("p1"), i.getGlobalLinePoint("p2")];
        return r.push({
            x: e.x + (Math.max(r[0].x, r[1].x) - Math.min(r[0].x, r[1].x)) / 2,
            y: e.y + (Math.max(r[0].y, r[1].y) - Math.min(r[0].y, r[1].y)) / 2
        }),
        r.forEach(function(e, i) {
            var r = {
                x: e.x,
                y: e.y,
                width: 0,
                height: 0
            };
            n.v.push({
                id: t + "-v" + i,
                bounds: r,
                y: r.y,
                offset: 0,
                direction: t
            }),
            n.h.push({
                id: t + "-h" + i,
                bounds: r,
                x: r.x,
                offset: 0,
                direction: t
            })
        }),
        n
    },
    getTargetBounds: function() {
        if (this.options && "line-anchor" === this.options.action && this.targetBlocks.length) {
            var e = this.targetBlocks[0];
            if ("line" === e.getType()) {
                var t = this.targetBlocks[0].getGlobalLinePoint(this.options.direction);
                return {
                    x: t.x,
                    y: t.y,
                    width: 1,
                    height: 1
                }
            }
        }
        return SL.editor.controllers.Blocks.getCombinedBounds(this.targetBlocks)
    },
    clearGuideElements: function(e) {
        var t = this.domElement.find(".guide-v, .guide-h");
        e && e.length && (t = t.filter(function(t, i) {
            return -1 === e.indexOf(i.getAttribute("data-guide-id"))
        })),
        t.remove()
    },
    isEnabled: function() {
        return SL.editor.controllers.Capabilities.isTouchEditor() ? !0 : SL.current_user.settings.get("editor_snap")
    }
},
SL("editor.controllers").History = {
    MAX_SIZE: 100,
    MAX_FREQUENCY: 1500,
    MODE_RESTING: 1,
    MODE_UNDOING: 2,
    MODE_REDOING: 3,
    init: function() {
        this.past = [],
        this.future = [],
        this.mode = SL.editor.controllers.History.MODE_RESTING,
        this.lastPushTime = -1,
        this.changed = new signals.Signal,
        this.undid = new signals.Signal,
        this.redid = new signals.Signal
    },
    push: function(e, t) {
        t = t || {};
        var i = Date.now();
        if (i - this.lastPushTime > SL.editor.controllers.History.MAX_FREQUENCY || t.skipTimeLimit) {
            this.lastPushTime = Date.now();
            var n = {
                data: e,
                indices: Reveal.getIndices()
            };
            n.focusedBlocks = SL.editor.controllers.Blocks.getFocusedBlocks().map(function(e) {
                return e.getID()
            });
            var r = SL.editor.controllers.Mode.get();
            r && (n.mode = r.id);
            var o = this.past[this.past.length - 1]
              , s = this.future[this.future.length - 1];
            for (o && n.data === o.data || s && n.data === s.data || (this.future.length && this.past.push(this.future.pop()),
            this.future.length = 0,
            this.past.push(n),
            this.mode = SL.editor.controllers.History.MODE_RESTING,
            this.changed.dispatch()); this.past.length > SL.editor.controllers.History.MAX_SIZE; )
                this.past.shift()
        }
    },
    undo: function(e) {
        e = e || {};
        var t = this.past.pop();
        return t && this.mode !== SL.editor.controllers.History.MODE_UNDOING && (this.future.push(t),
        t = this.past.pop()),
        t && (this.mode = SL.editor.controllers.History.MODE_UNDOING,
        this.future.push(t),
        this.lastPushTime = Date.now(),
        e.ignoreMode && (t = JSON.parse(JSON.stringify(t)),
        t.mode = null),
        this.undid.dispatch(t),
        this.changed.dispatch()),
        t
    },
    redo: function(e) {
        e = e || {};
        var t = this.future.pop();
        return t && this.mode !== SL.editor.controllers.History.MODE_REDOING && (this.past.push(t),
        t = this.future.pop()),
        t && (this.mode = SL.editor.controllers.History.MODE_REDOING,
        this.past.push(t),
        this.lastPushTime = Date.now(),
        e.ignoreMode && (t = JSON.parse(JSON.stringify(t)),
        t.mode = null),
        this.redid.dispatch(t),
        this.changed.dispatch()),
        t
    },
    canUndo: function() {
        return this.past.length > 1 || 1 === this.past.length && this.deckHasChanged()
    },
    canRedo: function() {
        return this.future.length > 0
    },
    deckHasChanged: function() {
        return this.past[this.past.length - 1].data !== SL.editor.controllers.Serialize.getDeckAsString()
    }
},
SL("editor.controllers").Markup = {
    init: function(e) {
        this.editor = e,
        this.slidesChanged = new signals.Signal,
        this.slideRemoved = new signals.Signal
    },
    getCurrentSlide: function() {
        return $(Reveal.getCurrentSlide())
    },
    getCurrentHorizontalSlide: function() {
        var e = $(Reveal.getCurrentSlide());
        return e.parent("section.stack").length && (e = e.parent("section.stack")),
        e
    },
    getFocusedSlide: function() {
        return $(".reveal .slides .present[contenteditable]:focus")
    },
    addHorizontalSlide: function(e) {
        e = e || "<section></section>";
        var t = SLConfig.deck.rtl ? "past" : "future"
          , i = $(e);
        return i.is("section") ? (SL.editor.controllers.Blocks.blur(),
        i.addClass(t),
        i.insertAfter(this.getCurrentHorizontalSlide()),
        Reveal.slide(),
        Reveal.sync(),
        SL.editor.controllers.Blocks.syncNewSlide(i),
        SLConfig.deck.rtl ? setTimeout(Reveal.navigateLeft, 1) : setTimeout(Reveal.navigateRight, 1),
        SL.data.templates.layoutTemplate(i),
        this.afterSlidesChanged(),
        i) : void 0
    },
    addVerticalSlide: function(e) {
        e = e || "<section></section>";
        var t = this.getCurrentHorizontalSlide();
        t.hasClass("stack") || (t = t.wrap('<section class="present">').parent(),
        t.addClass("stack"));
        var i = $(e);
        if (i.is("section")) {
            var n = Reveal.getIndices();
            SL.editor.controllers.Blocks.blur(),
            i.addClass("future");
            var r = t.find("section.present");
            return r.length ? i.insertAfter(r) : t.append(i),
            Reveal.slide(n.h, n.v),
            SL.editor.controllers.Blocks.syncNewSlide(i),
            this.editor.navigateToSlide(i.get(0)),
            this.editor.navigateToSlide(i.get(0)),
            Reveal.sync(),
            SL.data.templates.layoutTemplate(i),
            this.afterSlidesChanged(),
            i
        }
    },
    replaceCurrentSlide: function(e) {
        e = e || "<section></section>";
        var t = SL.editor.controllers.Markup.getCurrentSlide()
          , i = $(e);
        return i.is("section") ? (i.addClass("present"),
        t.replaceWith(i),
        Reveal.slide(),
        Reveal.sync(),
        SL.editor.controllers.Blocks.sync(),
        SL.data.templates.layoutTemplate(i),
        SL.util.deck.afterSlidesChanged(),
        i) : void 0
    },
    mergeHorizontalSlides: function(e, t) {
        e.length && t.length && (stack = e.wrap('<section class="present">').parent(),
        stack.addClass("stack"),
        stack.append(t),
        SL.editor.controllers.Blocks.sync(),
        Reveal.sync(),
        SL.util.deck.afterSlidesChanged())
    },
    unwrapEmptyStacks: function() {
        $(".reveal .slides section.stack").each(function() {
            var e = $(this);
            1 === e.find(">section").length && e.find(">section").first().unwrap()
        })
    },
    removeCurrentSlide: function() {
        var e = Reveal.getIndices();
        $(".reveal .slides .present .present").remove().length > 0 ? 1 === $(".reveal .slides .present>section").length && $(".reveal .slides .present>section:eq(0)").unwrap() : $(".reveal .slides>section").length > 1 && $(".reveal .slides>.present").remove(),
        Reveal.slide(e.h, e.v),
        Reveal.sync(),
        this.afterSlidesChanged(),
        this.slideRemoved.dispatch(),
        SL.analytics.trackEditor("Remove slide")
    },
    writeHTMLToCurrentSlide: function(e) {
        Reveal.getCurrentSlide().innerHTML = e,
        SL.util.html.trimCode(Reveal.getCurrentSlide()),
        SL.editor.controllers.Blocks.sync(),
        SL.editor.controllers.Blocks.discoverBlockPairs()
    },
    replaceHTML: function(e) {
        SL.util.deck.replaceHTML(e),
        SL.editor.controllers.Blocks.sync(),
        this.afterSlidesChanged()
    },
    importSlides: function(e, t) {
        if (e = $(e),
        e && e.length) {
            var i = $(".reveal .slides");
            t && i.empty(),
            e.each(function(e, t) {
                this.importSlide(t, i)
            }
            .bind(this)),
            Reveal.sync(),
            Reveal.slide(0, 0),
            SL.editor.controllers.Blocks.sync(),
            this.afterSlidesChanged()
        }
    },
    importSlide: function(e, t) {
        if (e = $(e),
        t = $(t),
        t.append(e),
        e.css("display", "block"),
        e.find(">section").length)
            e.find(">section").each(function(t, i) {
                this.importSlide(i, e)
            }
            .bind(this));
        else {
            var i = []
              , n = [];
            e.children().each(function() {
                var e = $(this);
                if (e.is(".sl-block"))
                    i.push(e.remove().prop("outerHTML"));
                else if ("absolute" === e.css("position")) {
                    var t = e.position()
                      , r = {
                        width: e.outerWidth(),
                        x: t.left,
                        y: t.top
                    };
                    e.css({
                        position: "relative",
                        top: "",
                        right: "",
                        bottom: "",
                        left: ""
                    }),
                    r.html = e.prop("outerHTML"),
                    n.push(r),
                    e.remove()
                }
            }),
            n.push({
                html: e.html(),
                width: SL.util.deck.getSlideSize().width
            }),
            e.empty(),
            n.forEach(function(t) {
                if (t.html.trim().length > 0) {
                    SL.editor.controllers.Blocks.add({
                        type: "text",
                        slide: e,
                        silent: !0,
                        width: t.width,
                        x: t.x,
                        y: t.y,
                        afterInit: function(e) {
                            e.setCustomHTML(t.html)
                        }
                    })
                }
            }),
            i.forEach(function(t) {
                e.append(t)
            })
        }
        e.css("display", ""),
        SL.util.deck.generateIdentifiers(e);
        var r = e.attr("data-id")
          , o = e.find("aside.notes");
        if (o.length) {
            var s = o.text().trim().substr(0, SL.config.SPEAKER_NOTES_MAXLENGTH);
            s && s.length > 1 && (SLConfig.deck.notes[r] = s,
            o.remove())
        }
    },
    afterSlidesChanged: function() {
        SL.util.deck.afterSlidesChanged(),
        this.slidesChanged.dispatch()
    }
},
SL("editor.controllers").Media = {
    init: function() {
        this.setupDragAndDrop(),
        this.setupPasteFromClipboard()
    },
    canDragAndDrop: function() {
        return !SL.popup.isOpen(SL.components.medialibrary.MediaLibrary)
    },
    setupDragAndDrop: function() {
        var e = $(['<div class="drag-and-drop-instructions">', '<div class="inner">', "Drop to insert media", "</div>", "</div>"].join(""));
        SL.draganddrop.subscribe({
            onDragOver: function() {
                e.appendTo(document.body)
            }
            .bind(this),
            onDragOut: function() {
                e.remove()
            }
            .bind(this),
            onDrop: function(t) {
                e.remove();
                var i = t.originalEvent.dataTransfer.files[0];
                if (i) {
                    var n = new SL.models.Media(null,null,i);
                    n.upload();
                    var r = SL.editor.controllers.Blocks.add({
                        type: "image",
                        slide: $(SL.editor.controllers.Markup.getCurrentSlide())
                    });
                    r.setImageModel(n)
                }
            }
            .bind(this)
        })
    },
    setupPasteFromClipboard: function() {
        $(document).on("paste", function(e) {
            if (setTimeout(function() {
                $("img[src^=webkit-fake-url]").remove()
            }, 1),
            !SL.util.isTyping()) {
                var t = e.clipboardData.getData("text/plain");
                if ("string" == typeof t && t.length) {
                    var i = t.split("\n")
                      , n = 0;
                    i = i.map(function(e) {
                        var t = e.split(" ");
                        return n = Math.max(t.length, n),
                        t
                    }),
                    i.length > 1 && n > 1 && this.insertTableFromClipboard(i)
                }
            }
        }
        .bind(this)),
        $(document).pasteImageReader(function(e) {
            SL.util.isTyping() || e && e.file && e.dataURL && this.uploadImageBlob(e.file, "pasted-from-clipboard.png")
        }
        .bind(this))
    },
    insertTableFromClipboard: function(e) {
        var t = SL.editor.controllers.Blocks.getFocusedBlocks();
        if (1 === t.length && "table" === t[0].getType())
            t[0].setRows(e);
        else {
            SL.editor.controllers.Blocks.add({
                type: "table",
                blockOptions: {
                    rows: e
                }
            })
        }
    },
    uploadImageBlob: function(e, t) {
        if (e && t && e.type.match(/image.*/)) {
            var i = new SL.models.Media(null,null,e,t);
            i.upload();
            var n = SL.editor.controllers.Blocks.add({
                type: "image",
                slide: $(SL.editor.controllers.Markup.getCurrentSlide())
            });
            n.setImageModel(i)
        }
    }
},
SL("editor.controllers").Migration = {
    init: function() {
        this.migrateEditorSettings()
    },
    migrateEditorSettings: function() {
        var e = "editorSnap"
          , t = "editorGrid"
          , i = SL.settings.getValue(t)
          , n = SL.settings.getValue(e);
        ("boolean" == typeof i || "boolean" == typeof n) && (SL.settings.removeValue([t, e]),
        SL.current_user.settings.set("editor_grid", i),
        SL.current_user.settings.set("editor_snap", n),
        SL.current_user.settings.save(["editor_grid", "editor_snap"]))
    }
},
SL("editor.controllers").Mode = {
    init: function(e, t) {
        this.editor = e,
        this.modes = t,
        this.modeActivated = new signals.Signal,
        this.modeDeactivated = new signals.Signal;
        for (var i in this.modes)
            this.modes[i].activated.add(this.onModeActivated.bind(this, i)),
            this.modes[i].deactivated.add(this.onModeDeactivated.bind(this, i))
    },
    clear: function() {
        var e = this.get($("html").attr("data-mode"));
        e && e.isActive() && e.deactivate()
    },
    change: function(e) {
        this.clear();
        var t = this.get(e);
        t && t.activate()
    },
    toggle: function(e) {
        var t = this.get(e);
        if (t && t.isActive())
            t.deactivate();
        else if (t) {
            var i = $("html").attr("data-mode");
            i && i !== e && (currentMode = this.get(i),
            currentMode && currentMode.isActive() && currentMode.deactivate()),
            t.activate()
        }
    },
    get: function(e) {
        return e || (e = $("html").attr("data-mode")),
        this.modes[e] ? this.modes[e] : null
    },
    onModeActivated: function(e) {
        this.modeActivated.dispatch(e)
    },
    onModeDeactivated: function(e) {
        this.modeDeactivated.dispatch(e)
    }
},
SL("editor.controllers").Onboarding = {
    init: function(e) {
        this.onTutorialSkipped = this.onTutorialSkipped.bind(this),
        this.onTutorialFinished = this.onTutorialFinished.bind(this),
        SL.util.getQuery().tutorial ? this.start() : SL.current_user.get("editor_tutorial_completed") || !e.isNewDeck() || SL.util.device.IS_PHONE || SL.util.device.IS_TABLET || this.start()
    },
    start: function() {
        var e = [this.step0, this.step1, this.step2];
        this.hasTextBlock() && e.push(this.step3, this.step4),
        e.push(this.step5, this.step6, this.step7, this.step8),
        this.tutorial = new SL.components.Tutorial({
            context: this,
            steps: e
        }),
        this.tutorial.skipped.add(this.onTutorialSkipped.bind(this)),
        this.tutorial.finished.add(this.onTutorialFinished.bind(this)),
        this.tutorial.step(0),
        $("html").addClass("onboarding-open")
    },
    stop: function() {
        $.ajax({
            url: SL.config.AJAX_UPDATE_USER,
            type: "PUT",
            context: this,
            data: {
                user: {
                    editor_tutorial_completed: !0
                }
            }
        }),
        this.tutorial.destroy(),
        $("html").removeClass("onboarding-open")
    },
    getTextBlock: function() {
        return $(Reveal.getCurrentSlide()).find('.sl-block[data-block-type="text"]').first()
    },
    hasTextBlock: function() {
        return this.getTextBlock().length > 0
    },
    onTutorialSkipped: function() {
        this.stop(),
        SL.analytics.trackEditor("Onboarding skipped")
    },
    onTutorialFinished: function() {
        var e = $(".sl-templates");
        e.length && e.data("instance") && (e.css("background", ""),
        e.data("instance").hide()),
        this.stop(),
        SL.analytics.trackEditor("Onboarding finished")
    },
    step0: {
        forwards: function() {
            var e = "<h3>Meet the Slides editor</h3><p>Click <b>Next</b> to take a quick tour.</p>";
            this.tutorial.message(e, {
                anchor: $(".sl-tutorial-controls-inner"),
                alignment: "t",
                maxWidth: 450
            })
        }
    },
    step1: {
        forwards: function() {
            var e;
            e = SL.current_user.isPaid() ? "<h3>Top Level Options</h3><p>Set the <b>presentation title, privacy, theme and arrange slides</b> from here. You can also manage importing and exporting</p>" : "<h3>Top Level Options</h3><p>Set the <b>presentation title, privacy, theme and arrange slides</b> from here.</p>",
            this.tutorial.cutout($(".sidebar")),
            this.tutorial.message(e, {
                anchor: $(".sidebar"),
                alignment: "r"
            })
        },
        backwards: function() {
            this.tutorial.clearCutout(),
            this.tutorial.clearMessage()
        }
    },
    step2: {
        forwards: function() {
            this.tutorial.cutout($(".toolbars")),
            this.tutorial.message("<h3>Add New Content</h3><p>Click on any of these to add a <b>block</b> of content to the current slide.</p>", {
                anchor: $(".toolbars"),
                alignment: "r"
            })
        },
        backwards: function() {
            this.tutorial.clearCutout(),
            this.tutorial.clearMessage()
        }
    },
    step3: {
        forwards: function() {
            this.tutorial.cutout(this.getTextBlock()),
            this.tutorial.message("<h3>Example Text Block</h3><p>Single-click to focus or double-click to edit text.</p>", {
                anchor: this.getTextBlock(),
                alignment: "b"
            })
        },
        backwards: function() {
            this.tutorial.clearCutout(),
            this.tutorial.clearMessage()
        }
    },
    step4: {
        forwards: function() {
            this.tutorial.cutout($(".toolbars")),
            this.tutorial.message("<h3>Block Options</h3><p>Options for the selected block. For text blocks this includes <b>alignment, color, size</b> and more.</p>", {
                anchor: $(".toolbars"),
                alignment: "r"
            }),
            SL.editor.controllers.Blocks.focus(SL.editor.controllers.Blocks.getCurrentBlocks()[0])
        },
        backwards: function() {
            this.tutorial.clearCutout(),
            this.tutorial.clearMessage(),
            SL.editor.controllers.Blocks.blur()
        }
    },
    step5: {
        forwards: function() {
            SL.editor.controllers.Blocks.blur(),
            this.tutorial.cutout($(".slide-options"), {
                padding: 4
            }),
            this.tutorial.message("<h3>Slide Options</h3><p>Options for the current slide, such as <b>background color/image and speaker notes</b>.</p>", {
                anchor: $(".slide-options"),
                alignment: $(".slide-options").offset().left < window.innerWidth / 2 ? "r" : "l"
            })
        },
        backwards: function() {
            this.tutorial.clearCutout(),
            this.tutorial.clearMessage()
        }
    },
    step6: {
        forwards: function() {
            this.tutorial.cutout($(".add-horizontal-slide"), {
                padding: 4
            }),
            this.tutorial.message("<h3>Adding a Slide</h3><p>Click the plus button to add a new slide.</p>", {
                anchor: $(".add-horizontal-slide"),
                alignment: "l"
            })
        },
        backwards: function() {
            this.tutorial.clearCutout(),
            this.tutorial.clearMessage()
        }
    },
    step7: {
        forwards: function() {
            $(".add-horizontal-slide").click(),
            $(".sl-templates").css("background", "transparent"),
            this.tutorial.cutout($(".sl-templates-inner")),
            this.tutorial.message('<h3>Choose a Template</h3><p>When adding a new slide you get to choose from templates. You can save your own templates in the "Yours" tab.</p>', {
                anchor: $(".sl-templates-inner"),
                alignment: "l"
            })
        },
        backwards: function() {
            var e = $(".sl-templates");
            e.length && (e.css("background", ""),
            e.data("instance").hide()),
            this.tutorial.clearCutout(),
            this.tutorial.clearMessage()
        }
    },
    step8: {
        forwards: function() {
            var e = $(".sl-templates");
            e.length && (e.css("background", ""),
            e.data("instance").hide());
            var t = $(".sl-collab-menu-item:visible").first();
            this.tutorial.cutout(t, {
                padding: 4
            }),
            this.tutorial.message("<h3>Collaborate</h3><p>Invite others to edit or leave feedback on your presentation.</p>", {
                anchor: t,
                alignment: "tl"
            })
        },
        backwards: function() {
            this.tutorial.clearCutout(),
            this.tutorial.clearMessage()
        }
    }
},
SL("editor.controllers").Selection = {
    init: function() {
        this.domElement = $('<div class="sl-block-selection editing-ui">')
    },
    start: function(e, t) {
        var i = $(".projector");
        this.domElement.appendTo(i);
        var n = i.offset();
        this.offsetX = -n.left,
        this.offsetY = -n.top,
        this.startX = e + this.offsetX,
        this.startY = t + this.offsetY;
        var r = SL.editor.controllers.Markup.getCurrentSlide();
        this.slideBounds = SL.util.getRevealSlideBounds(r, !0),
        this.sync(e, t)
    },
    sync: function(e, t) {
        var i = {
            width: e + this.offsetX - this.startX,
            height: t + this.offsetY - this.startY
        };
        i.x = this.startX + Math.min(i.width, 0),
        i.y = this.startY + Math.min(i.height, 0),
        i.width = Math.abs(i.width),
        i.height = Math.abs(i.height),
        this.domElement.css({
            left: i.x,
            top: i.y,
            width: i.width,
            height: i.height
        }),
        i.x -= this.slideBounds.x,
        i.y -= this.slideBounds.y;
        var n = SL.util.getRevealCounterScale();
        i.x *= n,
        i.y *= n,
        i.width *= n,
        i.height *= n,
        SL.editor.controllers.Blocks.getCurrentBlocks().forEach(function(e) {
            e.hitTest(i) ? SL.editor.controllers.Blocks.focus(e, !0, !1) : SL.editor.controllers.Blocks.blur([e])
        }
        .bind(this))
    },
    stop: function() {
        this.domElement.remove()
    }
},
SL("editor.controllers").Serialize = {
    slideCache: {},
    init: function() {
        setInterval(function() {
            delete SL.editor.controllers.Serialize.slideCache,
            SL.editor.controllers.Serialize.slideCache = {}
        }, 18e4)
    },
    getDeckAsString: function(e) {
        var t = SL.util.html.muteSources($(".reveal .slides").html())
          , i = $("<div>");
        i.get(0).innerHTML = t,
        i.find(">.backgrounds").remove();
        var n = i.find(">section").map(function(t, i) {
            if (i = $(i),
            i.hasClass("stack")) {
                var n = i.find(">section").map(function(t, i) {
                    return this.formatSlideForSave(i, e).get(0).outerHTML
                }
                .bind(this)).toArray().join("");
                i = this.formatSlideForSave(i.empty(), e);
                var r = $.map(i.get(0).attributes, function(e) {
                    return e.name + '="' + e.value + '"'
                }).join(" ");
                return "<section " + r + ">" + n + "</section>"
            }
            return this.formatSlideForSave(i, e).get(0).outerHTML
        }
        .bind(this)).toArray().join("")
          , r = SL.util.html.unmuteSources(n);
        return r = r.trim()
    },
    getSlideAsString: function(e, t) {
        t = $.extend({
            inner: !1
        }, t),
        e = $(e),
        e.find("section").length && (e = e.find("section").first());
        var i = SL.util.html.muteSources(e.prop("outerHTML"));
        e = $(i),
        e = this.formatSlideForSave(e, t);
        var n = SL.util.html.unmuteSources(e.prop(t.inner ? "innerHTML" : "outerHTML"));
        return n
    },
    getFirstSlideAsString: function(e) {
        return this.getSlideAsString($(".reveal .slides section").first(), e)
    },
    formatSlideForSave: function(e, t) {
        t = $.extend({
            exclude: null,
            templatize: !1,
            removeSlideIds: !1,
            removeBlockIds: !1,
            removeTextPlaceholders: !1,
            lazy: !0
        }, t),
        e = $(e);
        var i = e.get(0).outerHTML + JSON.stringify(t)
          , n = SL.editor.controllers.Serialize.slideCache[i];
        if (n && n.length)
            return n;
        if ((t.templatize || t.removeSlideIds) && e.removeAttr("data-id"),
        (t.templatize || t.removeBlockIds) && e.find("[data-block-id]").removeAttr("data-block-id"),
        t.removeTextPlaceholders && (e.find("[data-placeholder-tag]").removeAttr("data-placeholder-tag"),
        e.find("[data-placeholder-text]").removeAttr("data-placeholder-text")),
        t.exclude && e.find(t.exclude).remove(),
        SL.util.html.removeAttributes(e, function(e) {
            return /(style|contenteditable|hidden|aria-hidden|data\-index\-.|data\-previous\-indexv)/gi.test(e)
        }),
        SL.util.html.trimCode(e),
        e.removeClass(SL.config.RESERVED_SLIDE_CLASSES.join(" ")),
        "" === e.attr("class") && e.get(0).removeAttribute("class"),
        e.find(".fragment").removeClass("visible"),
        t.lazy) {
            var r = SL.util.html.ATTR_SRC_SILENCED;
            e.find("iframe[" + r + "], img[" + r + "], video[" + r + "], audio[" + r + "]").each(function() {
                this.setAttribute("data-src", this.getAttribute(SL.util.html.ATTR_SRC_SILENCED)),
                this.removeAttribute(SL.util.html.ATTR_SRC_SILENCED)
            })
        }
        return e.find(".navigate-up, .navigate-right, .navigate-down, .navigate-left, .navigate-next, .navigate-prev").removeClass("enabled"),
        e.find(".editing-ui").remove(),
        e.find("grammarly-btn").remove(),
        e.find("*:not(iframe)").contents().each(function() {
            8 === this.nodeType && $(this).remove()
        }),
        e.find("a[data-cke-saved-href]").each(function() {
            this.removeAttribute("data-cke-saved-href")
        }),
        e.find(".sl-block, .sl-block-content").each(function(e, t) {
            t = $(t),
            SL.util.html.removeClasses(t, function(e) {
                return /(is\-focused|is\-editing|^visible|is\-text\-overflowing|^cke_)/gi.test(e)
            }),
            SL.util.html.removeAttributes(t, function(e) {
                return /(contenteditable|tabindex|spellcheck|role|title|aria\-.)/gi.test(e)
            })
        }),
        e.find('.sl-block[data-block-type="table"]').each(function(e, t) {
            t = $(t),
            t.find("table .context-menu-is-open").removeClass("context-menu-is-open"),
            t.find('table [class=""]').removeAttr("class"),
            t.find('table [style=""]').removeAttr("style"),
            t.find("td [contenteditable], th [contenteditable]").each(function(e, t) {
                t.parentNode.innerHTML = t.innerHTML
            })
        }),
        e.find('.sl-block[data-block-type="image"] img').css("display", ""),
        SL.editor.controllers.Serialize.slideCache[i] = e,
        e
    }
},
SL("editor.controllers").Thumbnail = {
    init: function() {
        this.invalidated = !1
    },
    generate: function() {
        $.ajax({
            type: "POST",
            url: SL.config.AJAX_THUMBNAIL_DECK(SLConfig.deck.id)
        }),
        this.invalidated = !1
    },
    invalidate: function() {
        this.invalidated = !0
    },
    isInvalidated: function() {
        return this.invalidated
    }
},
SL("editor.controllers").URL = {
    init: function() {
        this.changed = new signals.Signal,
        setTimeout(this.read.bind(this), 1)
    },
    read: function() {
        var e = SL.util.getQuery();
        "settings" === e.l ? SL.view.sidebar.open("settings") : "comments" === e.l && SL.view.collaboration && SL.view.collaboration.expand()
    },
    write: function() {
        window.history && "function" == typeof window.history.replaceState && window.history.replaceState(null, SLConfig.deck.title, SL.routes.DECK_EDIT(SLConfig.deck.user.username, SLConfig.deck.slug)),
        this.changed.dispatch()
    }
},
SL("editor").Editor = SL.views.Base.extend({
    init: function() {
        this._super(),
        SL.editor.controllers.Capabilities.init(),
        SLConfig.deck.theme_font = SLConfig.deck.theme_font || SL.config.DEFAULT_THEME_FONT,
        SLConfig.deck.theme_color = SLConfig.deck.theme_color || SL.config.DEFAULT_THEME_COLOR,
        SLConfig.deck.transition = SLConfig.deck.transition || SL.config.DEFAULT_THEME_TRANSITION,
        SLConfig.deck.background_transition = SLConfig.deck.background_transition || SL.config.DEFAULT_THEME_BACKGROUND_TRANSITION,
        SLConfig.deck.visibility = SLConfig.deck.visibility || SL.models.Deck.VISIBILITY_ALL,
        this.addHorizontalSlideButton = $(".add-horizontal-slide"),
        this.addVerticalSlideButton = $(".add-vertical-slide"),
        this.previewControlsExit = $(".preview-controls-exit"),
        this.setupPromises = [],
        this.flags = {
            editing: !0,
            saving: !1,
            unsaved: !1,
            newDeck: !SLConfig.deck.id
        },
        this.isNewDeck() && SL.current_user.hasDefaultTheme() && (SLConfig.deck.theme_id = SL.current_user.getDefaultTheme().get("id")),
        this.deckSaved = new signals.Signal,
        this.savedDeck = JSON.parse(JSON.stringify(SLConfig.deck)),
        SL.helpers.PageLoader.show();
        var e = SL.current_user.getThemes().getByProperties({
            id: SLConfig.deck.theme_id
        });
        e ? SL.current_user.isMemberOfCurrentTeam() ? e.load().always(this.setup.bind(this)) : e.load(SL.config.AJAX_DECK_THEME(SLConfig.deck.id)).always(this.setup.bind(this)) : this.setup()
    },
    setup: function() {
        SL.fonts.isReady() === !1 && this.setupPromises.push(new Promise(function(e) {
            SL.fonts.ready.add(e)
        }
        )),
        SL.keyboard.keydown(this.onDocumentKeyDown.bind(this)),
        this.setupControllers(),
        this.setupComponents(),
        this.setupReveal(),
        this.setupTheme(),
        this.setupWYSIWYG(),
        this.setupDefaultContent(),
        this.setupActivityMonitor(),
        this.preloadWYSIWYG(),
        this.changeInterval = setInterval(this.checkChanges.bind(this), SL.config.UNSAVED_CHANGES_INTERVAL),
        this.saveInterval = setInterval(this.checkAutoSave.bind(this), SL.config.AUTOSAVE_INTERVAL),
        $("html").toggleClass("is-new", this.isNewDeck()),
        $("html").toggleClass("rtl", SLConfig.deck.rtl),
        this.bind(),
        this.enableEditing(),
        this.setupCollaboration(),
        this.layout(),
        setTimeout(function() {
            SL.editor.controllers.DeckImport.init(this),
            SL.editor.controllers.Onboarding.init(this),
            SLConfig.deck.data = SL.editor.controllers.Serialize.getDeckAsString(),
            this.firstSlideData = SL.editor.controllers.Serialize.getFirstSlideAsString(),
            this.toolbars.sync()
        }
        .bind(this), 1),
        Promise.all(this.setupPromises).then(function() {
            SL.util.deck.afterSlidesChanged(),
            SL.helpers.PageLoader.hide(),
            $("html").addClass("editor-loaded-successfully")
        })
    },
    setupControllers: function() {
        SL.editor.controllers.Serialize.init(this),
        SL.editor.controllers.Blocks.init(this),
        SL.editor.controllers.Media.init(this),
        SL.editor.controllers.History.init(this),
        SL.editor.controllers.Markup.init(this),
        SL.editor.controllers.Contrast.init(this),
        SL.editor.controllers.Migration.init(this),
        SL.editor.controllers.Selection.init(this),
        SL.editor.controllers.Guides.init(this),
        SL.editor.controllers.Grid.init(this),
        SL.editor.controllers.URL.init(this),
        SL.editor.controllers.Mode.init(this, {
            css: new SL.editor.modes.CSS(this),
            arrange: new SL.editor.modes.Arrange(this),
            preview: new SL.editor.modes.Preview(this),
            fragment: new SL.editor.modes.Fragment(this)
        }),
        SL.editor.controllers.Mode.modeActivated.add(function() {
            SL.editor.controllers.Blocks.blur()
        }
        .bind(this)),
        SL.editor.controllers.Mode.modeDeactivated.add(function() {
            Reveal.configure({
                minScale: SL.editor.controllers.Capabilities.isTouchEditor() ? .4 : 1
            }),
            setTimeout(Reveal.layout, 1),
            this.layout(),
            SL.editor.controllers.Grid.refresh()
        }
        .bind(this)),
        SL.session.enforce()
    },
    setupComponents: function() {
        this.sidebar = new SL.editor.components.Sidebar,
        this.toolbars = new SL.editor.components.Toolbars(this),
        this.colorpicker = new SL.editor.components.Colorpicker,
        this.slideOptions = new SL.editor.components.SlideOptions(this,{
            html: this.isDeveloperMode(),
            fragment: !SL.editor.controllers.Capabilities.isTouchEditorSmall()
        }),
        this.slideOptions.syncRemoveSlide(),
        this.templates = new SL.components.Templates
    },
    setupCollaboration: function() {
        this.collaboration = new SL.components.collab.Collaboration({
            container: document.body,
            editor: !0,
            coverPage: !0
        }),
        SLConfig.deck.collaborative && (this.setupPromises.push(new Promise(function(e) {
            this.collaboration.loaded.add(e)
        }
        .bind(this))),
        this.collaboration.load())
    },
    setupReveal: function() {
        var e = {
            controls: !0,
            progress: !1,
            history: !1,
            center: !1,
            touch: !1,
            fragments: !1,
            help: !1,
            pause: !1,
            mouseWheel: !1,
            rollingLinks: !1,
            width: SLConfig.deck.width,
            height: SLConfig.deck.height,
            margin: .16,
            minScale: 1,
            maxScale: 1,
            keyboard: {
                27: null,
                70: null
            },
            keyboardCondition: function() {
                return SL.editor.controllers.Mode.get("preview").isActive() || 0 === SL.editor.controllers.Blocks.getFocusedBlocks().length && !this.sidebar.isExpanded()
            }
            .bind(this),
            rtl: SLConfig.deck.rtl,
            loop: SLConfig.deck.should_loop,
            slideNumber: SLConfig.deck.slide_number,
            transition: SLConfig.deck.transition,
            backgroundTransition: SLConfig.deck.background_transition
        };
        SL.editor.controllers.Capabilities.isTouchEditor() && (e.margin = .05,
        e.minScale = .4),
        SL.editor.controllers.Capabilities.isTouchEditorSmall() && (e.margin = .12),
        Reveal.initialize(e),
        Reveal.addEventListener("ready", function() {
            this.addHorizontalSlideButton.addClass("show"),
            this.addVerticalSlideButton.addClass("show"),
            SL.editor.controllers.Blocks.sync(),
            SL.editor.controllers.Blocks.discoverBlockPairs()
        }
        .bind(this)),
        Reveal.addEventListener("slidechanged", function(e) {
            e.previousSlide && SL.editor.controllers.Blocks.blurBlocksBySlide(e.previousSlide),
            SL.editor.controllers.Blocks.sync(),
            SL.editor.controllers.Blocks.discoverBlockPairs(),
            this.checkOverflow()
        }
        .bind(this))
    },
    setupTheme: function() {
        var e = SL.current_user.getThemes().getByProperties({
            id: SLConfig.deck.theme_id
        });
        e ? (SLConfig.deck.transition = e.get("transition"),
        SLConfig.deck.backgroundTransition = e.get("background_transition"),
        this.isNewDeck() && (SLConfig.deck.width = e.get("width"),
        SLConfig.deck.height = e.get("height"))) : e = SL.models.Theme.fromDeck(SLConfig.deck),
        SL.helpers.ThemeController.paint(e, {
            center: !1,
            width: SLConfig.deck.width,
            height: SLConfig.deck.height
        }),
        this.syncPageBackground()
    },
    setupWYSIWYG: function() {
        CKEDITOR.timestamp = "04112016",
        CKEDITOR.on("dialogDefinition", function(e) {
            e.data.definition.resizable = CKEDITOR.DIALOG_RESIZE_NONE
        }),
        CKEDITOR.on("instanceReady", function(e) {
            e.editor.on("paste", function(e) {
                e.data && "html" === e.data.type && (e.data.dataValue = e.data.dataValue.replace(/(font\-size|line\-height):\s?\d+(px|em|pt|%)?;/gi, "")),
                SL.view.layout(),
                setTimeout(SL.view.layout.bind(SL.view), 1)
            }, null, null, 9)
        }),
        CKEDITOR.disableAutoInline = !0,
        CKEDITOR.config.floatSpaceDockedOffsetY = 1,
        CKEDITOR.config.title = !1
    },
    preloadWYSIWYG: function() {
        var e = $("<p>").hide().appendTo(document.body)
          , t = CKEDITOR.inline(e.get(0));
        t && t.on("instanceReady", function() {
            t.destroy(),
            e.remove()
        }
        .bind(this))
    },
    setupDefaultContent: function() {
        this.isNewDeck() && SL.editor.controllers.Markup.replaceCurrentSlide(SL.data.templates.getNewDeckTemplate().get("html"))
    },
    setupActivityMonitor: function() {
        SL.activity.register(1e4, function() {
            this.isNewDeck() || this.hasShownOutdatedMessage || $.ajax({
                url: SL.config.AJAX_GET_DECK(SL.current_deck.get("id")),
                type: "GET",
                context: this
            }).done(function(e) {
                var t = SL.current_deck.get("data_updated_at")
                  , i = e.data_updated_at
                  , n = "number" == typeof t && !isNaN(t)
                  , r = "number" == typeof i && !isNaN(i);
                n && r && i > t && (SL.popup.openOne(SL.components.popup.DeckOutdated),
                this.hasShownOutdatedMessage = !0,
                SL.analytics.trackEditor("Warning: Newer deck on server"))
            }
            .bind(this))
        }
        .bind(this))
    },
    bind: function() {
        $(window).on("keyup", this.onWindowKeyUp.bind(this)),
        $(window).on("beforeunload", this.onWindowBeforeUnload.bind(this)),
        $(window).on("resize", this.onWindowResize.bind(this)),
        this.addHorizontalSlideButton.on("vclick", this.onAddHorizontalSlideClicked.bind(this)),
        this.addVerticalSlideButton.on("vclick", this.onAddVerticalSlideClicked.bind(this)),
        this.previewControlsExit.on("vclick", this.onExitPreviewClicked.bind(this)),
        this.sidebar.saveClicked.add(this.save.bind(this)),
        this.sidebar.previewClicked.add(this.onEnterPreviewClicked.bind(this)),
        this.onUndoOrRedo = this.onUndoOrRedo.bind(this),
        this.onSaveTimeout = this.onSaveTimeout.bind(this),
        SL.editor.controllers.History.undid.add(this.onUndoOrRedo),
        SL.editor.controllers.History.redid.add(this.onUndoOrRedo)
    },
    layout: function() {
        var e = this.getSlideSize({
            scaled: !0
        })
          , t = window.innerWidth - this.getSidebarWidth()
          , i = window.innerHeight
          , n = this.slideOptions.getWidth()
          , r = "r"
          , o = {
            left: (t + e.width) / 2,
            top: (i - e.height) / 2
        };
        if (this.collaboration) {
            var s = this.collaboration.getCollapsedWidth();
            o.left = Math.min(o.left, t - n - s),
            o.top = Math.max(o.top, 0),
            o.left + n < (t + e.width) / 2 && (o.left = (t - e.width) / 2 - n,
            o.left = Math.max(o.left, 10),
            r = "l")
        } else
            o.left = Math.min(o.left, t - n),
            o.top = Math.max(o.top, 0);
        o.left = Math.round(o.left),
        o.top = Math.round(o.top),
        this.slideOptions.domElement.css(o),
        this.slideOptions.setAlignment(r);
        var a = $(".reveal").get(0);
        (a && 0 !== a.scrollTop || 0 !== a.scrollLeft) && (a.scrollTop = 0,
        a.scrollLeft = 0),
        SL.editor.controllers.Capabilities.isTouchEditor() || $(document.body).css("minWidth", this.getSidebarWidth() + e.width + 2 * this.getSlideMargin())
    },
    checkChanges: function() {
        if (!this.isSaving()) {
            var e = SL.editor.controllers.Serialize.getDeckAsString();
            SL.pointer.isDown() || SL.editor.controllers.History.push(e);
            var t = e !== SLConfig.deck.data
              , i = SLConfig.deck.dirty;
            this.flags.unsaved = !(!t && !i),
            this.hasUnsavedChanges() ? this.sidebar.updateSaveButton("disabled", "Click to save") : this.sidebar.updateSaveButton("disabled is-saved", "Latest changes are saved")
        }
        this.checkOverflow()
    },
    checkAutoSave: function() {
        this.hasUnsavedChanges() && !SL.editor.controllers.DeckImport.isImporting() && this.save()
    },
    checkOverflow: function() {
        var e = 0
          , t = SL.editor.controllers.Blocks.getCombinedBounds(SL.editor.controllers.Blocks.getCurrentBlocks())
          , i = SL.util.deck.getSlideSize();
        t.y < -e || t.x < -e || t.right > i.width + e || t.bottom > i.height + e ? (SL.editor.controllers.Markup.getCurrentSlide().addClass("overflowing"),
        this.slideOptions.showOverflowWarning()) : (SL.editor.controllers.Markup.getCurrentSlide().removeClass("overflowing"),
        this.slideOptions.hideOverflowWarning())
    },
    save: function(e) {
        this.isSaving() || (this.flags.saving = !0,
        clearTimeout(this.saveTimeout),
        this.saveTimeout = setTimeout(this.onSaveTimeout, SL.config.DECK_SAVE_TIMEOUT),
        this.sidebar.updateSaveButton("disabled is-saving", "Saving changes"),
        this.isNewDeck() ? this.createDeck(e) : this.updateDeck(e))
    },
    getSaveData: function(e) {
        var t = {
            deck: {
                width: SLConfig.deck.width,
                height: SLConfig.deck.height,
                title: SL.util.unescapeHTMLEntities((SLConfig.deck.title || "").substr(0, SL.config.DECK_TITLE_MAXLENGTH)),
                description: SL.util.unescapeHTMLEntities(SLConfig.deck.description),
                data: SL.util.string.trim(e),
                css_input: SLConfig.deck.css_input,
                css_output: SLConfig.deck.css_output,
                comments_enabled: SLConfig.deck.comments_enabled,
                forking_enabled: SLConfig.deck.forking_enabled,
                auto_slide_interval: SLConfig.deck.auto_slide_interval,
                transition: SLConfig.deck.transition,
                background_transition: SLConfig.deck.background_transition,
                theme_font: SLConfig.deck.theme_font,
                theme_color: SLConfig.deck.theme_color,
                should_loop: SLConfig.deck.should_loop,
                rtl: SLConfig.deck.rtl,
                share_notes: SLConfig.deck.share_notes,
                slide_number: SLConfig.deck.slide_number,
                notes: JSON.stringify(SLConfig.deck.notes),
                rolling_links: !1,
                center: !1
            },
            version: SL.editor.Editor.VERSION
        };
        return SLConfig.deck.slug !== this.savedDeck.slug && (t.deck.custom_slug = SLConfig.deck.slug),
        SL.current_user.hasThemes() && (t.deck.theme_id = SLConfig.deck.theme_id),
        t
    },
    createDeck: function(e) {
        var t = SL.editor.controllers.Serialize.getDeckAsString()
          , i = SLConfig.deck.title;
        if (!i) {
            var n = $(Reveal.getSlide(0)).find("h1").text().trim();
            n && /^(untitled|title\stext)$/gi.test(n) === !1 && (SLConfig.deck.title = n.substr(0, SL.config.DECK_TITLE_MAXLENGTH))
        }
        var r = {
            type: "POST",
            url: SL.config.AJAX_CREATE_DECK(SLConfig.current_user.username),
            context: this,
            data: this.getSaveData(t)
        };
        $.ajax(r).done(function(i) {
            $.extend(SLConfig.deck, i),
            SLConfig.deck.data_updated_at = i.data_updated_at,
            SLConfig.deck.data = t,
            SLConfig.deck.dirty = !1,
            $("html").removeClass("is-new"),
            this.flags.newDeck = !1,
            SL.editor.controllers.URL.write(),
            SL.editor.controllers.Thumbnail.generate(),
            this.onSaveSuccess(e, i)
        }).fail(function(t) {
            this.onSaveError(e, t)
        }).always(function() {
            this.onSaveFinished(e)
        })
    },
    updateDeck: function(e) {
        var t = SL.editor.controllers.Serialize.getDeckAsString()
          , i = {
            type: "PUT",
            url: SL.config.AJAX_UPDATE_DECK(this.savedDeck ? this.savedDeck.id : SLConfig.deck.id),
            context: this,
            data: this.getSaveData(t)
        };
        $.ajax(i).done(function(i) {
            i && i.deck && (i.deck.slug && (SLConfig.deck.slug = i.deck.slug,
            SL.editor.controllers.URL.write()),
            SLConfig.deck.data_updated_at = i.deck.data_updated_at),
            SLConfig.deck.data = t,
            SLConfig.deck.dirty = !1;
            var n = SL.editor.controllers.Serialize.getFirstSlideAsString();
            (this.firstSlideData !== n || SL.editor.controllers.Thumbnail.isInvalidated()) && (this.firstSlideData = n,
            SL.editor.controllers.Thumbnail.generate()),
            this.onSaveSuccess(e, i)
        }).fail(function(t) {
            this.onSaveError(e, t)
        }).always(function() {
            this.onSaveFinished(e)
        })
    },
    onSaveSuccess: function(e, t) {
        this.savedDeck = JSON.parse(JSON.stringify(SLConfig.deck)),
        t && t.deck && t.deck.sanitize_messages && t.deck.sanitize_messages.length && SL.notify(t.deck.sanitize_messages[0], "negative"),
        this.unableToSaveWarning && this.unableToSaveWarning.hide(),
        e && e.apply(null, [!0]),
        this.deckSaved.dispatch()
    },
    onSaveError: function(e, t) {
        401 === t.status && SL.session.check(),
        this.unableToSaveWarning || (this.unableToSaveWarning = new SL.components.RetryNotification(SL.locale.get("DECK_SAVE_ERROR"),{
            type: "negative"
        }),
        this.unableToSaveWarning.destroyed.add(function() {
            this.unableToSaveWarning = null
        }
        .bind(this)),
        this.unableToSaveWarning.retryClicked.add(function() {
            this.unableToSaveWarning.destroy(),
            this.save()
        }
        .bind(this))),
        this.hasUnsavedChanges() && this.unableToSaveWarning.startCountdown(SL.config.AUTOSAVE_INTERVAL),
        e && e.apply(null, [!1])
    },
    onSaveFinished: function() {
        this.flags.saving = !1,
        clearTimeout(this.saveTimeout),
        this.checkChanges(),
        $("html").addClass("editor-saved-successfully")
    },
    onSaveTimeout: function() {
        SLConfig.deck.dirty = !0,
        this.flags.saving = !1,
        clearTimeout(this.saveTimeout)
    },
    hasSavedThisSession: function() {
        return $("html").hasClass("editor-saved-successfully")
    },
    saveVisibility: function(e) {
        if (this.isNewDeck()) {
            var t = SL.current_deck.get("visibility");
            return this.save(function() {
                SL.current_deck.set("visibility", t),
                this.saveVisibility(e)
            }
            .bind(this)),
            !1
        }
        var i = {
            type: "POST",
            url: SL.config.AJAX_PUBLISH_DECK(SL.current_deck.get("id")),
            context: this,
            data: {
                visibility: SL.current_deck.get("visibility")
            }
        };
        $.ajax(i).done(function(e) {
            $("html").attr("data-visibility", SL.current_deck.get("visibility")),
            e.deck.visibility === SL.models.Deck.VISIBILITY_SELF ? SL.notify(SL.locale.get("DECK_VISIBILITY_CHANGED_SELF")) : e.deck.visibility === SL.models.Deck.VISIBILITY_TEAM ? SL.notify(SL.locale.get("DECK_VISIBILITY_CHANGED_TEAM")) : e.deck.visibility === SL.models.Deck.VISIBILITY_ALL && SL.notify(SL.locale.get("DECK_VISIBILITY_CHANGED_ALL")),
            this.sidebar.updatePublishButton(),
            SLConfig.deck.data_updated_at = e.deck.data_updated_at
        }).fail(function() {
            this.sidebar.updatePublishButton(),
            SL.notify(SL.locale.get("DECK_VISIBILITY_CHANGED_ERROR"), "negative")
        })
    },
    navigateToSlide: function(e) {
        if (e) {
            var t = Reveal.getIndices(e);
            setTimeout(function() {
                Reveal.slide(t.h, t.v)
            }, 1)
        }
    },
    enableEditing: function() {
        this.flags.editing = !0,
        $("html").addClass("is-editing")
    },
    disableEditing: function() {
        this.flags.editing = !1,
        $("html").removeClass("is-editing")
    },
    redirect: function(e, t) {
        t === !0 && (this.flags.unsaved = !1),
        window.location = e
    },
    syncPageBackground: function() {
        $("html, body").css("background-color", SL.util.deck.getBackgroundColor())
    },
    getCurrentTheme: function() {
        var e = SL.current_user.getThemes().getByProperties({
            id: SLConfig.deck.theme_id
        });
        return e || (e = SL.models.Theme.fromDeck(SLConfig.deck)),
        e
    },
    getSlideSize: function(e) {
        var t = Reveal.getConfig()
          , i = 1;
        return e && e.scaled && (i = Reveal.getScale()),
        {
            width: t.width * i,
            height: t.height * i
        }
    },
    getSlideMargin: function() {
        return 10
    },
    getSidebarWidth: function() {
        var e = 70
          , t = 170;
        return e + t
    },
    isDeveloperMode: function() {
        return SL.current_user.settings.get("developer_mode") && !SL.editor.controllers.Capabilities.isTouchEditor()
    },
    isEditing: function() {
        return this.flags.editing
    },
    isSaving: function() {
        return this.flags.saving
    },
    isNewDeck: function() {
        return this.flags.newDeck
    },
    hasUnsavedChanges: function() {
        return this.flags.unsaved
    },
    onThemeChanged: function() {
        this.toolbars.sync(),
        this.slideOptions.syncCustomClasses(),
        this.syncPageBackground()
    },
    onUserInput: function() {
        clearInterval(this.saveInterval),
        this.saveInterval = setInterval(this.checkAutoSave.bind(this), SL.config.AUTOSAVE_INTERVAL)
    },
    onAddHorizontalSlideClicked: function(e) {
        e.preventDefault(),
        e.shiftKey ? SL.editor.controllers.Markup.addHorizontalSlide() : this.templates.show({
            anchor: this.addHorizontalSlideButton,
            alignment: SLConfig.deck.rtl ? "l" : "r",
            callback: function(e) {
                SL.editor.controllers.Markup.addHorizontalSlide(e)
            }
        })
    },
    onAddVerticalSlideClicked: function(e) {
        e.preventDefault(),
        e.shiftKey ? SL.editor.controllers.Markup.addVerticalSlide() : this.templates.show({
            anchor: this.addVerticalSlideButton,
            alignment: "b",
            callback: function(e) {
                SL.editor.controllers.Markup.addVerticalSlide(e)
            }
        })
    },
    onEnterPreviewClicked: function() {
        SL.editor.controllers.Mode.change("preview")
    },
    onExitPreviewClicked: function(e) {
        e.preventDefault(),
        SL.editor.controllers.Mode.clear()
    },
    onWindowKeyUp: function() {
        this.onUserInput()
    },
    onDocumentKeyDown: function(e) {
        if (27 === e.keyCode) {
            var t = $("input:focus, textarea:focus, [contenteditable]:focus")
              , i = $(Reveal.getCurrentSlide())
              , n = SL.editor.controllers.Mode.get();
            if (n && n.isActive() && "css" === n.getID())
                return !1;
            if (SL.popup.isOpen())
                return !1;
            t && t.length ? t.blur() : this.sidebar.isExpanded() ? this.sidebar.close() : this.colorpicker.isVisible() ? this.colorpicker.hide() : this.slideOptions.hasOpenPanel() ? this.slideOptions.collapse() : this.toolbars.hasOpenPanel() ? this.toolbars.collapse() : SL.editor.controllers.Blocks.getFocusedBlocks().length ? SL.editor.controllers.Blocks.blur() : n && n.isActive() && /(absolute|fragment|preview)/gi.test(n.getID()) ? (n.deactivate(),
            /(absolute|fragment)/gi.test(n.getID()) && i.focus()) : Reveal.toggleOverview()
        } else {
            if (SL.util.isTypingEvent(e))
                return !0;
            var r = this.sidebar.isExpanded()
              , o = e.metaKey || e.ctrlKey;
            8 === e.keyCode ? e.preventDefault() : o && 83 === e.keyCode ? (this.hasUnsavedChanges() && this.save(),
            e.preventDefault()) : !r && o && 89 === e.keyCode ? (SL.editor.controllers.History.redo(),
            e.preventDefault()) : !r && o && e.shiftKey && 90 === e.keyCode ? (SL.editor.controllers.History.redo(),
            e.preventDefault()) : !r && o && 90 === e.keyCode ? (SL.editor.controllers.History.undo(),
            e.preventDefault()) : r || !o || e.shiftKey || 70 !== e.keyCode ? !r && e.shiftKey && e.altKey && 70 === e.keyCode ? (SL.editor.controllers.Mode.toggle("fragment"),
            e.preventDefault()) : !r && e.shiftKey && e.altKey && 78 === e.keyCode ? (this.slideOptions.triggerNotes(),
            e.preventDefault()) : !r && e.shiftKey && e.altKey && 72 === e.keyCode ? (this.slideOptions.triggerHTML(),
            e.preventDefault()) : !r && e.shiftKey && e.altKey && 65 === e.keyCode && (SL.popup.openOne(SL.components.popup.AdvancedSlideOptions, {
                slide: Reveal.getCurrentSlide()
            }),
            e.preventDefault()) : (SL.editor.controllers.Mode.toggle("preview"),
            e.preventDefault())
        }
        return !0
    },
    onWindowBeforeUnload: function() {
        return this.hasUnsavedChanges() ? SL.locale.get("LEAVE_UNSAVED_DECK") : void 0
    },
    onWindowResize: function() {
        Reveal.layout(),
        this.layout()
    },
    onUndoOrRedo: function(e) {
        SL.util.skipCSSTransitions($("html"), 100),
        SL.editor.controllers.Mode.clear(),
        SL.editor.controllers.Blocks.blur(),
        $(".reveal .slides").html(e.data),
        Reveal.sync(),
        Reveal.slide(e.indices.h, e.indices.v),
        this.slideOptions.syncRemoveSlide(),
        SL.editor.controllers.Blocks.sync();
        var t = SL.editor.controllers.Mode.get(e.mode);
        t ? t.activate() : e.focusedBlocks && e.focusedBlocks.length && SL.editor.controllers.Blocks.getCurrentBlocks().forEach(function(t) {
            e.focusedBlocks.forEach(function(e) {
                t.getID() === e && SL.editor.controllers.Blocks.focus(t, !0)
            })
        })
    }
}),
SL.editor.Editor.VERSION = 2,
SL("editor.modes").Base = Class.extend({
    init: function(e, t) {
        this.id = t,
        this.editor = e,
        this.active = !1,
        this.activated = new signals.Signal,
        this.deactivated = new signals.Signal,
        this.onSlideChanged = this.onSlideChanged.bind(this),
        this.render(),
        this.bind()
    },
    bind: function() {},
    render: function() {},
    activate: function() {
        this.active = !0,
        $("html").attr("data-mode", this.id).addClass("hide-projector-overlays"),
        this.deactivateOnSlideChange && Reveal.addEventListener("slidechanged", this.onSlideChanged),
        this.activated.dispatch()
    },
    deactivate: function() {
        this.active = !1,
        $("html").removeAttr("data-mode").removeClass("hide-projector-overlays"),
        this.deactivateOnSlideChange && Reveal.removeEventListener("slidechanged", this.onSlideChanged),
        this.deactivated.dispatch()
    },
    toggle: function() {
        this.isActive() ? this.deactivate() : this.activate()
    },
    isActive: function() {
        return this.active
    },
    getID: function() {
        return this.id
    },
    onSlideChanged: function() {
        this.deactivate()
    }
}),
SL("editor.modes").Arrange = SL.editor.modes.Base.extend({
    init: function(e) {
        this._super(e, "arrange")
    },
    bind: function() {
        Reveal.addEventListener("overviewshown", this.onRevealOverviewShown.bind(this)),
        Reveal.addEventListener("overviewhidden", this.onRevealOverviewHidden.bind(this))
    },
    activate: function(e) {
        this.active = !0,
        e || Reveal.toggleOverview(!0),
        this.editor.disableEditing(),
        this.editor.sidebar.updateArrangeButton("arranging");
        var t = ['<div class="arrange-controls editing-ui">', '<div class="arrange-control move-left i-arrow-left-alt1"></div>', '<div class="arrange-control move-right i-arrow-right-alt1"></div>', '<div class="arrange-control move-up i-arrow-up-alt1"></div>', '<div class="arrange-control move-down i-arrow-down-alt1"></div>', '<div class="arrange-control merge-left i-previous" data-tooltip-delay="500"></div>', '<div class="arrange-control merge-right i-next" data-tooltip-delay="500"></div>', "</div>"].join("");
        $(".reveal .slides section:not(.stack)").append(t).addClass("disabled"),
        $(".reveal .slides section.stack").each(function(e, t) {
            0 === $(t).find(".present").length && $(t).find("section").first().addClass("present")
        }),
        $(".reveal .slides section .arrange-controls").on("click", this.onControlsClicked.bind(this)),
        $(".reveal .slides section .move-left").on("click", this.onMoveSlideLeft.bind(this)),
        $(".reveal .slides section .move-right").on("click", this.onMoveSlideRight.bind(this)),
        $(".reveal .slides section .move-up").on("click", this.onMoveSlideUp.bind(this)),
        $(".reveal .slides section .move-down").on("click", this.onMoveSlideDown.bind(this)),
        $(".reveal .slides section .merge-left").on("click", this.onMergeLeft.bind(this)),
        $(".reveal .slides section .merge-right").on("click", this.onMergeRight.bind(this)),
        SL.analytics.trackEditor("Arrange mode"),
        $(document.activeElement).blur(),
        this._super()
    },
    deactivate: function(e) {
        this.active = !1,
        e || Reveal.toggleOverview(!1),
        this.editor.enableEditing(),
        this.editor.sidebar.updateArrangeButton(),
        $(".reveal .slides section:not(.stack)").removeClass("disabled"),
        $(".reveal .slides section .arrange-controls").remove(),
        this._super()
    },
    afterSlidesChanged: function() {
        SL.editor.controllers.Markup.afterSlidesChanged()
    },
    onRevealOverviewShown: function() {
        this.isActive() || (SL.editor.controllers.Mode.clear(),
        this.activate(!0))
    },
    onRevealOverviewHidden: function() {
        this.isActive() && this.deactivate(!0)
    },
    onControlsClicked: function(e) {
        $(e.target).hasClass("arrange-controls") && $(e.target).parent("section").removeClass("disabled").trigger("click")
    },
    onMoveSlideLeft: function(e) {
        var t = $(e.target).parents("section").first();
        t.parents("section.stack").length && (t = t.parents("section.stack"));
        var i = t.prev();
        t.length && i.length && (t.after(i),
        Reveal.sync(),
        Reveal.slide(t.index()),
        this.afterSlidesChanged())
    },
    onMoveSlideRight: function(e) {
        var t = $(e.target).parents("section").first();
        t.parents("section.stack").length && (t = t.parents("section.stack"));
        var i = t.next();
        t.length && i.length && (t.before(i),
        Reveal.sync(),
        Reveal.slide(t.index()),
        this.afterSlidesChanged())
    },
    onMoveSlideUp: function(e) {
        var t = $(e.target).parents("section").first()
          , i = t.prev();
        t.length && i.length && (t.after(i),
        Reveal.sync(),
        Reveal.slide(t.parents("section.stack").index(), t.index()),
        this.afterSlidesChanged())
    },
    onMoveSlideDown: function(e) {
        var t = $(e.target).parents("section").first()
          , i = t.next();
        t.length && i.length && (t.before(i),
        Reveal.sync(),
        Reveal.slide(t.parents("section.stack").index(), t.index()),
        this.afterSlidesChanged())
    },
    onMergeLeft: function(e) {
        var t = $(e.target).parents("section").first()
          , i = t.prev();
        if (t.parents("section.stack").prev().length && (i = t.parents("section.stack").prev()),
        t.length) {
            t.parents("section.stack").length ? t.insertBefore(t.parents("section.stack")) : i.is("section.stack") ? i.prepend(t) : SL.editor.controllers.Markup.mergeHorizontalSlides(i, t),
            SL.editor.controllers.Markup.unwrapEmptyStacks();
            var n = Reveal.getIndices(t.get(0));
            Reveal.sync(),
            Reveal.slide(n.h, n.v),
            this.afterSlidesChanged()
        }
    },
    onMergeRight: function(e) {
        var t = $(e.target).parents("section").first()
          , i = t.next();
        if (t.parents("section.stack").next().length && (i = t.parents("section.stack").next()),
        t.length) {
            t.parents("section.stack").length ? t.insertAfter(t.parents("section.stack")) : i.is("section.stack") ? i.prepend(t) : SL.editor.controllers.Markup.mergeHorizontalSlides(i, t),
            SL.editor.controllers.Markup.unwrapEmptyStacks();
            var n = Reveal.getIndices(t.get(0));
            Reveal.sync(),
            Reveal.slide(n.h, n.v),
            this.afterSlidesChanged()
        }
    }
}),
SL("editor.modes").CSS = SL.editor.modes.Base.extend({
    init: function(e) {
        this.userCSSInput = $("#user-css-input"),
        this.userCSSOutput = $("#user-css-output"),
        this.parseTimeout = -1,
        this.userCSSInput.length && (SLConfig.deck.css_input = this.userCSSInput.html() || void 0),
        this.userCSSOutput.length && (SLConfig.deck.css_output = this.userCSSOutput.html() || void 0),
        this._super(e, "css")
    },
    render: function() {
        this.domElement = $('<div class="css-editor">').appendTo(document.body),
        this.headerElement = $("<header>").appendTo(this.domElement),
        this.headerElement.append("<p>Enter custom styles using LESS or plain CSS. All selectors are automatically prefixed with .reveal on save.</p>"),
        this.headerButtons = $(['<div class="header-buttons">', '<a class="button outline" href="http://help.slides.com/knowledgebase/articles/253052-css-editor-pro-" target="_blank">Learn more and see examples</a>', '<button class="button outline float-right insert-image" data-tooltip="Insert image URL"><span class="icon i-picture"></span></button>', '<button class="button outline float-right custom-fonts" data-tooltip="Load custom fonts"><span class="icon i-type"></span></button>', "</div>"].join("")).appendTo(this.headerElement),
        this.customFontsButton = this.headerElement.find(".custom-fonts"),
        this.insertImageButton = this.headerElement.find(".insert-image"),
        this.contentsElement = $('<div class="contents">').appendTo(this.domElement),
        this.contentsElement.append('<div id="ace-less" class="editor"></div>'),
        this.errorElement = $('<div class="error">').appendTo(this.contentsElement),
        this.footerElement = $("<footer>").appendTo(this.domElement),
        this.cancelButton = $('<button class="button cancel negative grey xl">Cancel</button>').appendTo(this.footerElement),
        this.saveButton = $('<button class="button save positive xl">OK</button>').appendTo(this.footerElement)
    },
    renderEditor: function() {
        if (!this.cssEditor) {
            try {
                this.cssEditor = ace.edit("ace-less"),
                SL.util.setAceEditorDefaults(this.cssEditor),
                this.cssEditor.getSession().setMode("ace/mode/less")
            } catch (e) {
                console.log("An error occurred while initializing the Ace editor.")
            }
            this.cssEditor.getSession().on("change", this.onInputChange.bind(this))
        }
    },
    bind: function() {
        this.insertImageButton.on("click", this.onInsertImageClicked.bind(this)),
        this.customFontsButton.on("click", this.onCustomFontsClicked.bind(this)),
        this.cancelButton.on("click", this.onCancelClicked.bind(this)),
        this.saveButton.on("click", this.onSaveClicked.bind(this))
    },
    activate: function() {
        this.renderEditor(),
        this.editor.disableEditing(),
        this.editor.sidebar.close(!0),
        this.domElement.addClass("visible"),
        this.savedCSSInput = SLConfig.deck.css_input,
        this.savedCSSOutput = SLConfig.deck.css_output,
        this.currentCSSInput = SLConfig.deck.css_input,
        this.errorElement.text("").removeClass("visible"),
        this.cssEditor.getSession().setValue(SLConfig.deck.css_input || ""),
        clearInterval(this.focusEditorTimeout),
        this.focusEditorTimeout = setTimeout(function() {
            this.cssEditor.focus()
        }
        .bind(this), 1e3),
        Reveal.configure({
            minScale: .4
        }),
        setTimeout(function() {
            Reveal.layout()
        }, 1),
        this._super()
    },
    deactivate: function() {
        clearInterval(this.focusEditorTimeout),
        this.editor.enableEditing(),
        this.domElement.removeClass("visible"),
        this._super()
    },
    saveAndClose: function() {
        this.compile(function(e) {
            SLConfig.deck.css_input = this.cssEditor.getSession().getValue(),
            SLConfig.deck.css_output = e,
            SLConfig.deck.dirty = !0,
            SL.editor.controllers.Thumbnail.generate(),
            this.deactivate()
        }
        .bind(this), function() {
            SL.notify("Please fix all errors before saving.", "negative")
        }
        .bind(this))
    },
    compile: function(e, t) {
        this.cssParser || (this.cssParser = new less.Parser);
        var i = this.cssEditor.getSession().getValue();
        this.cssParser.parse(".reveal { " + i + " }", function(i, n) {
            if (i)
                this.errorElement.addClass("visible"),
                this.errorElement.html(i.message),
                t && t.call(null, i),
                this.cssParser = new less.Parser;
            else {
                this.errorElement.removeClass("visible");
                var r = SL.util.string.moveCSSImportsToBeginning(n.toCSS());
                this.userCSSOutput.html(r),
                e && e.call(null, r)
            }
        }
        .bind(this)),
        this.currentCSSInput = i
    },
    discard: function() {
        SLConfig.deck.css_input = this.savedCSSInput,
        SLConfig.deck.css_output = this.savedCSSOutput,
        this.userCSSOutput.html(SLConfig.deck.css_output || "")
    },
    onInsertImageClicked: function() {
        var e = SL.popup.open(SL.components.medialibrary.MediaLibrary, {
            select: SL.models.Media.IMAGE
        });
        e.selected.addOnce(function(e) {
            e.isUploaded() ? this.cssEditor.insert(e.get("url")) : e.uploadCompleted.add(function() {
                this.cssEditor.insert(e.get("url"))
            }
            .bind(this))
        }
        .bind(this))
    },
    onCustomFontsClicked: function() {
        SL.popup.openOne(SL.components.popup.CustomFonts, {
            deck: SL.current_deck
        })
    },
    onInputChange: function() {
        clearTimeout(this.parseTimeout),
        this.parseTimeout = setTimeout(this.compile.bind(this), 500)
    },
    onCancelClicked: function(e) {
        this.currentCSSInput !== this.savedCSSInput ? SL.prompt({
            anchor: $(e.currentTarget),
            title: "You will lose all unsaved changes.",
            alignment: "t",
            type: "select",
            data: [{
                html: "<h3>Cancel</h3>"
            }, {
                html: "<h3>Continue</h3>",
                className: "negative",
                callback: function() {
                    this.discard(),
                    this.deactivate()
                }
                .bind(this)
            }]
        }) : (this.discard(),
        this.deactivate())
    },
    onSaveClicked: function() {
        this.saveAndClose()
    }
}),
SL("editor.modes").Fragment = SL.editor.modes.Base.extend({
    init: function(e) {
        this.deactivateOnSlideChange = !0,
        this._super(e, "fragment"),
        this.onFragmentMouseDown = this.onFragmentMouseDown.bind(this)
    },
    render: function() {
        this._super();
        var e = "Fragments are invisible until stepped through when you present. Preview to see them in action. The numbers that appear on top of each fragment indicate the order they will appear in.";
        this.toolbar = $('<div class="mode-toolbar mode-toolbar-fragment"><div class="inner"><p class="description">Click on elements to turn them into <u data-tooltip="' + e + '" data-tooltip-alignment="b" data-tooltip-maxwidth="355">fragments</u>.</p><button class="button grey done">Done</button></div></div>').appendTo($(".projector"))
    },
    bind: function() {
        this._super(),
        this.toolbar.find(".done").on("vclick", this.deactivate.bind(this))
    },
    activate: function() {
        if (!this.isActive()) {
            var e = SL.editor.controllers.Capabilities.isTouchEditor()
              , t = $(Reveal.getCurrentSlide());
            this.overlays = $('<div class="fragment-overlay editing-ui">').appendTo(t),
            t.find(".sl-block-content").each(function(t, i) {
                i = $(i);
                var n = i.is("img, video, iframe");
                if (!i.hasClass("editing-ui") && !(i.attr("data-animation-type") || "" === i.get(0).innerHTML && !n || 1 === i.children().length && i.children().first().is("br") && !/\w/i.test(i.text()))) {
                    var r = i.find(">ul>li, >ol>li");
                    r.length > 0 && (i = i.add(r)),
                    i.each(function(t, i) {
                        i = $(i);
                        var n = $(['<div class="editing-ui fragment-overlay-item">', '<div class="inner">', '<div class="controls-item move-down icon i-arrow-down"></div>', '<div class="controls-item index" data-tooltip="This number represents the order in which the fragment will appear relative to other fragments." data-tooltip-alignment="l" data-tooltip-delay="500" data-tooltip-maxwidth="230"></div>', '<div class="controls-item change-style icon i-ellipsis-v" data-tooltip="Select the type of animation to use for this fragment." data-tooltip-alignment="r" data-tooltip-delay="500" data-tooltip-maxwidth="230"></div>', '<div class="controls-item move-up icon i-arrow-up"></div>', "</div>", "</div>"].join(""));
                        n.data("target-element", i);
                        var r = i.closest(".sl-block").data("block-instance");
                        r && r.hasTransform() && n.css("transform", r.getCSSTransform()),
                        e && n.addClass("show-without-hover"),
                        this.overlays.append(n)
                    }
                    .bind(this))
                }
            }
            .bind(this)),
            this.overlays.find(".fragment-overlay-item").on("vmousedown", this.onFragmentMouseDown),
            this.editor.disableEditing(),
            this.editor.slideOptions.collapse(),
            this.syncOverlays(),
            SL.analytics.trackEditor("Fragment mode"),
            this._super()
        }
    },
    deactivate: function() {
        this.isActive() && (this.overlays.find(".fragment-overlay-item").off(),
        this.overlays.off().remove(),
        this.overlays = null,
        this.editor.enableEditing(),
        this._super())
    },
    syncOverlays: function() {
        this.overlays.find(".fragment-overlay-item").each(function(e, t) {
            var i = $(t)
              , n = i.data("target-element")
              , r = SL.util.getRevealElementOffset(n, !0)
              , o = n.css("z-index")
              , s = n.parents(".sl-block-content").first();
            s.length && (o = s.css("z-index")),
            i.css({
                left: r.x,
                top: r.y,
                width: n.outerWidth(!0),
                height: n.outerHeight(!0),
                zIndex: o
            }),
            i.toggleClass("is-active", n.hasClass("fragment")),
            i.toggleClass("is-hidden", n.parents(".fragment").length > 0);
            var a = i.find(".index");
            a.length && a.html(n.attr("data-fragment-index"))
        });
        var e = $(Reveal.getCurrentSlide());
        this.overlays.attr("data-fragments-total", e.find(".fragment").length)
    },
    toggleFragment: function(e) {
        e.hasClass("fragment") ? (e.removeClass("fragment").removeAttr("data-fragment-index"),
        e.removeClass(SL.config.FRAGMENT_STYLES.map(function(e) {
            return e.id
        }).join(" "))) : (e.addClass("fragment"),
        e.find(".fragment").removeClass("fragment").removeAttr("data-fragment-index"),
        e.parents(".fragment").removeClass("fragment").removeAttr("data-fragment-index")),
        Reveal.sync(),
        this.syncOverlays()
    },
    changeFragmentIndex: function(e, t) {
        var i = this.overlays.find(".fragment-overlay-item")
          , n = parseInt(e.attr("data-fragment-index"), 10);
        n = isNaN(n) ? 0 : n,
        n += t,
        n = Math.max(Math.min(n, i.length + 1), 0),
        e.attr("data-fragment-index", n),
        this.syncOverlays()
    },
    changeFragmentStyle: function(e, t) {
        if (!this.fragmentStylePrompt) {
            var i = SL.config.FRAGMENT_STYLES.map(function(t) {
                return {
                    title: t.title,
                    value: t.id,
                    selected: t.id && e.hasClass(t.id)
                }
            })
              , n = i.some(function(e) {
                return e.selected
            });
            n || (i[0].selected = !0),
            this.fragmentStylePrompt = SL.prompt({
                anchor: t,
                alignment: "r",
                title: "Fragment style",
                type: "list",
                data: i,
                optional: !0
            }),
            this.fragmentStylePrompt.confirmed.add(function(t) {
                e.removeClass(SL.config.FRAGMENT_STYLES.map(function(e) {
                    return e.id
                }).join(" ")),
                e.addClass(t)
            }
            .bind(this)),
            this.fragmentStylePrompt.destroyed.add(function() {
                this.fragmentStylePrompt = null
            }
            .bind(this))
        }
    },
    flattenFragmentIndices: function() {
        var e = this.overlays.find(".fragment-overlay-item");
        e.sort(function(e, t) {
            var i = parseInt(e.getAttribute("data-fragment-index"), 10)
              , n = parseInt(t.getAttribute("data-fragment-index"), 10);
            return i = isNaN(i) ? -1 : i,
            n = isNaN(n) ? -1 : n,
            i - n
        }),
        e.each(function(e, t) {
            $(t).data("target-element").attr("data-fragment-index", e)
        }
        .bind(this))
    },
    onFragmentMouseDown: function(e) {
        var t = $(e.currentTarget)
          , i = t.data("target-element");
        return $(e.target).closest(".move-up").length ? this.changeFragmentIndex(i, 1) : $(e.target).closest(".move-down").length ? this.changeFragmentIndex(i, -1) : $(e.target).closest(".change-style").length ? this.changeFragmentStyle(i, e.target) : i && i.length && this.toggleFragment(i),
        !1
    }
}),
SL("editor.modes").Preview = SL.editor.modes.Base.extend({
    init: function(e) {
        this._super(e, "preview"),
        SL.editor.controllers.Capabilities.canPresent() ? $(".preview-controls-external").on("click", function() {
            SL.analytics.trackEditor("Open external preview")
        }) : $(".preview-controls-external").remove()
    },
    activate: function() {
        Reveal.isOverview() && Reveal.toggleOverview(!1),
        this.editor.disableEditing(),
        this.editor.sidebar.close(),
        SL.util.openLinksInTabs($(".reveal .slides")),
        SL.analytics.trackEditor("Preview mode"),
        this._super(),
        Reveal.configure({
            progress: !0,
            overview: !1,
            touch: !0,
            fragments: !0,
            center: !1,
            autoSlide: SLConfig.deck.auto_slide_interval || 0
        });
        var e = Reveal.getIndices();
        Reveal.slide(e.h, e.v, -1),
        $(document.activeElement).blur(),
        "string" == typeof SLConfig.deck.slug && SLConfig.deck.slug.length > 0 ? $(".preview-controls-external").show().attr("href", SL.routes.DECK_LIVE(SLConfig.deck.user.username, SLConfig.deck.slug)) : $(".preview-controls-external").hide()
    },
    deactivate: function() {
        this.editor.syncPageBackground(),
        this.editor.enableEditing(),
        this._super(),
        Reveal.configure({
            progress: !1,
            overview: !0,
            touch: !1,
            center: !1,
            fragments: !1,
            autoSlide: 0
        }),
        SL.util.layoutReveal(500)
    }
}),
SL("editor").Tests = {
    run: function() {
        var e = this.testOnboarding()
          , t = this.testBlocks();
        e && t && $("html").addClass("editor-tested-successfully")
    },
    testOnboarding: function() {
        for (; SL.editor.controllers.Onboarding.tutorial.hasNextStep(); )
            SL.editor.controllers.Onboarding.tutorial.next();
        return SL.editor.controllers.Onboarding.tutorial.next(),
        !0
    },
    testBlocks: function() {
        var e = SL.editor.controllers.Blocks.add({
            type: "text"
        });
        e.destroy();
        var t = SL.editor.controllers.Blocks.add({
            type: "image"
        });
        t.destroy();
        var i = SL.editor.controllers.Blocks.add({
            type: "shape"
        });
        return i.move(100, 100),
        i.resize({
            width: 100,
            height: 100
        }),
        i.destroy(),
        !0
    }
};
