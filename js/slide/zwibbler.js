/**
   Zwibbler

   Copyright 2013 Hanov Solutions Inc. All Rights Reserved. This software is
   NOT open source. For licensing information, contact the author.

   steve.hanov@gmail.com

   @license
 */
(function() {
    "use strict";
    var n, aa = Object.prototype.hasOwnProperty;
    function ba(a, b) {
        function c() {
            this.constructor = a
        }
        for (var d in b)
            aa.call(b, d) && (a[d] = b[d]);
        c.prototype = b.prototype;
        a.prototype = new c;
        a.Fb = b.prototype
    }
    function p(a, b) {
        return function() {
            return a.apply(b, arguments)
        }
    }
    var ca = Array.prototype.slice;
    function da() {
        var a;
        if ("localStorage"in window)
            try {
                a = window.localStorage
            } catch (b) {}
        return void 0 !== a
    }
    var ea = {};
    function fa(a, b) {
        da() ? window.localStorage.setItem(a, b) : ea[a] = "" + b
    }
    function ga(a) {
        return da() ? window.localStorage.getItem(a) : ea[a]
    }
    ;var ha = null;
    "undefined" !== typeof window && (ha = window);
    var ia = {}
      , ja = [];
    function t(a, b) {
        function c(b) {
            var c = arguments
              , f = []
              , g = c[0];
            if (!ia[a]) {
                var h = g.split("%s");
                f.push(h[0]);
                for (g = 1; g < h.length; g++)
                    g - 1 >= c.length - 1 ? f.push("<too few args>") : "string" === typeof c[g] || "number" === typeof c[g] ? f.push(c[g]) : void 0 === c[g] ? f.push("(undefined)") : null === c[g] ? f.push("(null)") : c[g]instanceof Object && c[g].toString instanceof Function ? f.push(c[g].toString()) : f.push(JSON.stringify(c[g])),
                    f.push(h[g]);
                c = f.join("");
                for (g = 0; g < ja.length; g++)
                    ja[g](a, c)
            }
        }
        !1 === b && (ia[a] = !0);
        c.aa = function() {
            return 0 < ja.length && !ia[a]
        }
        ;
        return c
    }
    function ka(a) {
        ja.push(a);
        return a
    }
    "console"in ha || (ha.console = {
        log: function() {
            for (var a = [], b = 0; b < arguments.length; b++)
                try {
                    "string" === typeof arguments[b] ? a.push(arguments[b]) : a.push(JSON.stringify(arguments[b]))
                } catch (c) {
                    a.push(c.toString())
                }
            for (b = 0; b < ja.length; b++)
                ja[b]("Console", a.join(""))
        }
    },
    ha.console.error = ha.console.log);
    function la() {
        this.length = 0
    }
    var ma = t("JQUERY"), na, oa = /\s+/, pa = /^[\s\xA0]+/, sa = /[\s\xA0]+$/, ta = /[\n\t]/g, ua, va = {
        B: 1,
        BIG: 1,
        I: 1,
        SMALL: 1,
        TT: 1,
        ABBR: 1,
        ACRONYM: 1,
        CITE: 1,
        CODE: 1,
        DFN: 1,
        EM: 1,
        KBD: 1,
        STRONG: 1,
        SAMP: 1,
        VAR: 1,
        A: 1,
        BDO: 1,
        BR: 1,
        IMG: 1,
        MAP: 1,
        OBJECT: 1,
        Q: 1,
        SCRIPT: 1,
        SPAN: 1,
        SUB: 1,
        SUP: 1,
        BUTTON: 1,
        INPUT: 1,
        LABEL: 1,
        SELECT: 1,
        TEXTAREA: 1
    }, wa = [], xa = !1;
    function ya() {
        !xa && window.attachEvent && (window.attachEvent("onresize", function(a) {
            for (var b = 0; b < wa.length; b++)
                wa[b](a)
        }),
        xa = !0)
    }
    function za(a, b, c, d) {
        this.name = a;
        this.qg = b;
        this.Hd = c;
        this.Fh = d
    }
    function Aa(a, b) {
        var c = /#(.*)$/
          , d = /\.(.*)$/
          , e = /^<\s*([a-zA-Z0-9]+).*>$/
          , f = /^([A-Za-z]+)$/;
        b = b || document;
        var g = new la, h, k, l;
        try {
            l = ("object" === typeof HTMLElement ? a instanceof HTMLElement : "object" === typeof a && 1 === a.nodeType && "string" === typeof a.nodeName || 3 === a.nodeType) || a === window || a === document || a === document.body || a instanceof Element
        } catch (r) {
            l = !1
        }
        if (l)
            return g[g.length++] = a,
            g;
        if (a instanceof la)
            return a;
        l = a.split(",");
        for (var m = 0; m < l.length; m++)
            if (k = l[m],
            null !== (h = c.exec(k)))
                h = document.getElementById(h[1]),
                null !== h && (g[g.length++] = h);
            else if (null !== (h = e.exec(k)))
                h = h[1],
                g[g.length++] = document.createElement(h);
            else if (null !== (h = d.exec(k))) {
                k = g;
                h = ua(b, h[1], null);
                for (var q = 0; q < h.length; q++)
                    k[k.length++] = h[q]
            } else if (null !== (h = f.exec(k)))
                for (k = g,
                h = b.getElementsByTagName(h[1]),
                q = 0; q < h.length; q++)
                    k[k.length++] = h[q];
            else
                throw console.log(k),
                "Error: can't parse selector: " + k + " (" + k.nodeType;
        return g
    }
    la.prototype = {
        children: function() {
            for (var a = new la, b = 0; b < this.length; b++)
                for (var c = this[b].firstChild; c; )
                    a[a.length++] = c,
                    c = c.nextSibling;
            return a
        },
        sa: function() {
            for (var a = 0; a < this.length; a++) {
                var b = x(this[a]).ga("display");
                "none" !== b && (this[a].Oe = b);
                this[a].style.display = "none"
            }
            return this
        },
        show: function() {
            for (var a = 0; a < this.length; a++)
                this[a].Oe ? this[a].style.display = this[a].Oe : "none" === x(this[a]).ga("display") && (this[a].style.display = this[a].tagName in va ? "inline" : "block");
            return this
        },
        append: function(a) {
            a = Aa(a);
            if (0 < this.length)
                for (var b = 0; b < a.length; b++)
                    this[0].appendChild(a[b]);
            return this
        },
        remove: function() {
            for (var a = 0; a < this.length; a++)
                this[a].parentNode && this[a].parentNode.removeChild(this[a]);
            return this
        },
        empty: function() {
            for (var a = 0; a < this.length; a++)
                for (; null !== this[a].firstChild; )
                    this[a].removeChild(this[a].firstChild);
            return this
        },
        text: function(a) {
            if (0 === arguments.length) {
                var b = "";
                Ba(this, function(a) {
                    3 === a.nodeType && (b += a.nodeValue)
                });
                return b
            }
            for (var c = 0; c < this.length; c++) {
                for (; null !== this[c].firstChild; )
                    this[c].removeChild(this[c].firstChild);
                this[c].appendChild(document.createTextNode(a))
            }
            return this
        },
        width: function() {
            if (0 < this.length) {
                if (1 === arguments.length) {
                    for (var a = Math.max(0, arguments[0]), b = 0; b < this.length; b++)
                        this[b].style.width = "" + a + "px";
                    return this
                }
                return this[0] === window ? this[0].innerWidth || document.documentElement.clientWidth : this[0].clientWidth
            }
            return 0
        },
        height: function() {
            if (0 < this.length) {
                if (1 === arguments.length) {
                    for (var a = 0; a < this.length; a++)
                        this[a].style.height = "" + arguments[0] + "px";
                    return this
                }
                return this[0] === window ? this[0].innerHeight || document.documentElement.clientHeight : this[0].clientHeight
            }
            return 0
        },
        outerWidth: function() {
            return 0 < this.length ? this[0].offsetWidth : 0
        },
        outerHeight: function() {
            return 0 < this.length ? this[0].offsetHeight : 0
        },
        offset: function(a) {
            if (a) {
                if (0 < this.length) {
                    var b;
                    if (0 === this.length)
                        b = null;
                    else if ("fixed" === this.ga("position"))
                        b = x(document.body);
                    else {
                        for (b = this[0].parentNode; b && "static" === x(b).ga("position") && "BODY" !== b.tagName; )
                            b = b.parentNode;
                        b = x(b)
                    }
                    b = b.offset();
                    this[0].style.left = a.left - b.left + "px";
                    this[0].style.top = a.top - b.top + "px"
                }
                return this
            }
            if (0 < this.length) {
                a = this[0].getBoundingClientRect();
                var c = b = 0;
                "pageYOffset"in window ? (b = window.pageXOffset,
                c = window.pageYOffset) : (b = document.body.scrollLeft,
                c = document.body.scrollTop);
                return {
                    top: a.top + c,
                    left: a.left + b
                }
            }
            return {
                left: 0,
                top: 0
            }
        },
        clone: function() {
            return this.length ? Aa(this[0].cloneNode(!0)) : new la
        },
        find: function(a) {
            return this.length ? Aa(a, this[0]) : new la
        },
        fb: function(a, b) {
            if (2 === arguments.length) {
                for (var c = 0; c < this.length; c++)
                    this[c].setAttribute(a, b);
                return this
            }
            return 0 < this.length ? this[0].getAttribute(a) : ""
        },
        Ab: function(a) {
            for (var b = 0; b < this.length; b++)
                a(b, this[b])
        },
        focus: function() {
            0 < this.length && this[0].focus();
            return this
        },
        blur: function() {
            0 < this.length && this[0].blur();
            return this
        },
        submit: function() {
            for (var a = 0; a < this.length; a++)
                this[a].submit();
            return this
        },
        select: function() {
            for (var a = 0; a < this.length; a++)
                this[a].select();
            return this
        },
        ga: function(a, b) {
            var c = a.split("-");
            a = c[0];
            for (var d = 1; d < c.length; d++)
                a = "ms" !== c[d] ? a + (c[d].substr(0, 1).toUpperCase() + c[d].substr(1)) : a + c[d];
            if (2 === arguments.length) {
                for (d = 0; d < this.length; d++)
                    this[d].style[a] = "" + b;
                return this
            }
            return this[0].currentStyle ? this[0].currentStyle[a] : window.getComputedStyle ? window.getComputedStyle(this[0], null)[a] : this[0].style[a]
        },
        on: function(a, b) {
            function c(c) {
                d[0] === window && "resize" === c && window.attachEvent ? (wa.push(b),
                ya()) : window.addEventListener ? d.Ab(function(d, e) {
                    function k(a) {
                        a.lb = a;
                        "which"in a || (a.which = a.button);
                        return b.call(e, a)
                    }
                    e.__JqlListeners || (e.__JqlListeners = []);
                    k.ff = a;
                    b.ff = a;
                    e.addEventListener(c, k, !1);
                    e.__JqlListeners.push(new za(c,e,b,k))
                }) : d.Ab(function(a, d) {
                    d.attachEvent("on" + c, function(a) {
                        a.lb = a;
                        a.which = a.button;
                        a.pageX = a.clientX;
                        a.pageY = a.clientY;
                        a.preventDefault = function() {
                            a.returnValue = !1
                        }
                        ;
                        a.stopPropagation = function() {
                            a.cancelBubble = !0
                        }
                        ;
                        a.target = a.target || a.srcElement;
                        return b.call(d, a)
                    })
                })
            }
            var d = this;
            a = a.split(" ");
            for (var e = 0; e < a.length; e++)
                c(a[e]);
            return this
        },
        bind: function(a, b) {
            return this.on(a, b)
        },
        Tc: function(a, b) {
            window.addEventListener && this.Ab(function(c, d) {
                if (d.__JqlListeners)
                    for (var e = d.__JqlListeners, f = 0; f < e.length; f++) {
                        var g = e[f];
                        if (a === g.name && d === g.qg && b === g.Hd) {
                            d.removeEventListener(a, g.Fh, !1);
                            e.splice(f, 1);
                            break
                        }
                    }
            });
            return this
        },
        click: function(a) {
            return a ? this.on("click", a) : Ca(this, "click")
        },
        load: function(a) {
            return this.on("load", a)
        },
        resize: function(a) {
            if (a)
                this.on("resize", a);
            else
                Ca(this, "resize");
            return this
        },
        scrollLeft: function(a) {
            if (1 === arguments.length) {
                for (var b = 0; b < this.length; b++)
                    this[b].scrollLeft = a;
                return this
            }
            return this[0].scrollLeft
        },
        scrollTop: function(a) {
            if (1 === arguments.length) {
                for (var b = 0; b < this.length; b++)
                    this[b].scrollTop = a;
                return this
            }
            return this[0].scrollTop
        }
    };
    function Da(a) {
        for (var b = 0; b < a.length; b++)
            a[b].style.display = "block"
    }
    function Ea(a, b) {
        a.on("change", b)
    }
    function Fa(a, b) {
        a.on("mouseout", b)
    }
    function Ga(a, b) {
        a.on("mouseover", b)
    }
    function Ha(a, b) {
        a.on("dblclick", b)
    }
    function Ia(a, b) {
        a.on("mousemove", b)
    }
    function Ja(a) {
        x(window).on("mouseup", a)
    }
    function Ka(a, b) {
        a.on("mousedown", b)
    }
    function La(a, b) {
        a.on("keydown", b)
    }
    function Ma(a, b) {
        return void 0 !== b ? (a[0].value = b,
        a) : a[0].value
    }
    function Na(a, b) {
        if (b && "string" === typeof b)
            for (var c = (b || "").split(oa), d = 0, e = a.length; d < e; d++) {
                var f = a[d];
                if (1 === f.nodeType)
                    if (f.className) {
                        for (var g = " " + f.className + " ", h = f.className, k = 0, l = c.length; k < l; k++)
                            0 > g.indexOf(" " + c[k] + " ") && (h += " " + c[k]);
                        f.className = na.da(h)
                    } else
                        f.className = b
            }
        return a
    }
    function Oa(a, b) {
        for (var c = 0; c < a.length; c++)
            a[c].innerHTML = b
    }
    function Ca(a, b) {
        a.Ab(function(a, d) {
            var e;
            ma("Trigger " + b);
            if (document.createEventObject)
                if (e = document.createEventObject(),
                "resize" === b) {
                    ma("Calling stored window resize functions");
                    for (var f = 0; f < wa.length; f++)
                        wa[f](e)
                } else
                    d.fireEvent("on" + b, e);
            else
                e = document.createEvent("HTMLEvents"),
                e.initEvent(b, !0, !0),
                d.dispatchEvent(e)
        })
    }
    function Pa(a, b) {
        b = Aa(b);
        0 < a.length && 0 < b.length && b[0].parentNode.insertBefore(a[0], b[0])
    }
    function Qa(a, b) {
        b = Aa(b);
        0 < a.length && 0 < b.length && a[0].parentNode.insertBefore(b[0], a[0])
    }
    function Ba(a, b) {
        for (var c = [], d = a.length - 1; 0 <= d; d--)
            c.push(a[d]);
        for (; c.length; )
            for (d = c.pop(),
            b(d),
            d = d.lastChild; d; )
                c.push(d),
                d = d.previousSibling
    }
    na = function(a) {
        return Aa(a)
    }
    ;
    na.da = function(a) {
        return null === a ? "" : a.toString().replace(pa, "").replace(sa, "")
    }
    ;
    na.ba = function(a) {
        var b = a.url || ""
          , c = a.type || "GET"
          , d = a.oh || function() {}
          , e = a.error || function() {}
          , f = a.data || "";
        a = a.eg || function() {}
        ;
        var g = "", h;
        try {
            h = new XMLHttpRequest
        } catch (l) {
            try {
                h = new ActiveXObject("Msxml2.XMLHTTP")
            } catch (m) {
                try {
                    h = new ActiveXObject("Microsoft.XMLHTTP")
                } catch (q) {
                    e(null, "", null)
                }
            }
        }
        if ("object" === typeof f)
            for (var k in f)
                Object.hasOwnProperty.call(f, k) && (g.length && (g += "&"),
                g += encodeURIComponent(k),
                g += "=",
                g += encodeURIComponent(f[k]));
        "GET" === c && (b += "?" + g,
        g = "");
        a(h, h);
        h.open(c, b, !0);
        h.onreadystatechange = function() {
            if (4 === h.readyState)
                if (200 === h.status) {
                    var a = h.responseText
                      , b = h.getResponseHeader("content-type");
                    if (b && 0 === b.indexOf("application/json"))
                        try {
                            a = na.ka(a)
                        } catch (c) {}
                    d(a, "", h)
                } else
                    e(h, "", null)
        }
        ;
        "POST" === c && h.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        h.send(g)
    }
    ;
    ua = function(a, b, c) {
        var d = []
          , e = b.split(/\s+/);
        for (b = 0; b < e.length; b++) {
            var f = e[b].replace(/([\/\\\^$*+?.()|\[\]{}])/g, "\\$1");
            d.push(new RegExp("(^|\\s)" + f + "(\\s|$)"))
        }
        e = a.getElementsByTagName(c || "*");
        f = [];
        b = 0;
        for (c = e.length; b < c; b++) {
            var g = e[b]
              , h = !0;
            for (a = 0; a < d.length; a++)
                if (!d[a].test(g.className)) {
                    h = !1;
                    break
                }
            h && f.push(g)
        }
        return f
    }
    ;
    na.ka = function(a) {
        return window.JSON.parse(a)
    }
    ;
    na.aa = function(a) {
        for (var b = arguments[0], c = 1; c < arguments.length; c++) {
            var d = arguments[c], e;
            for (e in d)
                d.hasOwnProperty(e) && (b[e] = d[e])
        }
        return b
    }
    ;
    na.yc = la.prototype;
    var x = na;
    t("Cookies");
    function Sa() {
        this.aa = []
    }
    Sa.prototype = {
        log: t("DESTRUCTOR"),
        add: function(a) {
            this.aa.push(a)
        },
        bind: function(a, b, c) {
            a.bind(b, c);
            this.add(function() {
                a.Tc(b, c)
            })
        }
    };
    (function(a) {
        this.algorithm = a.algorithm || "wrap";
        this.aa = a.gravity || "down";
        this.ba = !1 !== a.resize;
        "down" === this.aa ? (this.offsetWidth = "offsetWidth",
        this.offsetHeight = "offsetHeight",
        this.width = "width",
        this.height = "height",
        this.top = "top",
        this.left = "left",
        this.clientWidth = "clientWidth",
        this.clientHeight = "clientHeight") : "up" === this.aa ? (this.offsetWidth = "offsetWidth",
        this.offsetHeight = "offsetHeight",
        this.width = "width",
        this.height = "height",
        this.top = "bottom",
        this.left = "left",
        this.clientWidth = "clientWidth",
        this.clientHeight = "clientHeight") : (this.offsetWidth = "offsetHeight",
        this.offsetHeight = "offsetWidth",
        this.width = "height",
        this.height = "width",
        this.top = "left",
        this.left = "top",
        this.clientWidth = "clientHeight",
        this.clientHeight = "clientWidth")
    }
    ).prototype = {
        log: t("Layout")
    };
    function Ta(a) {
        this.aa = "en";
        "string" === typeof a && (a = Ua(this, a, {}));
        this.data = a
    }
    Ta.prototype = {
        log: t("LANGUAGE"),
        yc: function() {
            var a = this;
            return function(b, c) {
                return Va(a, arguments)
            }
        },
        get: function(a, b) {
            return Va(this, arguments)
        }
    };
    function Va(a, b) {
        var c = b[0]
          , d = "<not translated:" + c + ">";
        a.aa in a.data && c in a.data[a.aa] && (d = a.data[a.aa][c]);
        for (c = 1; c < b.length; c++)
            d = d.replace("^" + c, b[c]);
        return d
    }
    function Ua(a, b, c) {
        b = b.split("\n");
        for (var d = /^([ \t]*)([^:]+):([^:]+):(.*)/, e = 0; e < b.length; e++) {
            var f = d.exec(b[e]);
            if (f) {
                var g = f[2]
                  , h = f[3]
                  , f = f[4];
                g in c || (c[g] = {});
                h in c[g] && a.log("Warning: Replacing %s:%s", g, h);
                c[g][h] = f
            }
        }
        return c
    }
    function Wa(a, b) {
        b = b.split(",");
        a.log("Choice of languages: %s", b);
        for (var c = 0; c < b.length; c++) {
            var d = b[c].split("-")[0];
            if (d in a.data) {
                a.log("Using language code %s", d);
                a.aa = d;
                break
            } else
                a.log("No language for code %s", d)
        }
    }
    ;function Xa(a, b, c, d, e, f) {
        this.view = a;
        this.node = b;
        this.aa = c;
        this.ba = b.ke(c);
        this.da = f;
        this.Oa(d, e)
    }
    Xa.prototype = {
        log: t("MoveEditNode"),
        Gb: function() {
            this.log("Entering MoveEditNode")
        },
        Mb: function() {
            this.log("Leaving MoveEditNode")
        },
        hb: function(a) {
            "touchmove" === a.type ? (a = a.touches[0],
            a = y(this.view, a.pageX, a.pageY),
            this.Ra(a.x, a.y)) : "touchend" === a.type && (a = a.changedTouches[0],
            a = y(this.view, a.pageX, a.pageY),
            this.Ya(a.x, a.y))
        },
        Oa: function(a, b) {
            var c = this.view.Ua(new A(a,b));
            a = c.x;
            b = c.y;
            this.log("onMouseDown(%s,%s)", a, b);
            this.Pd = a;
            this.Qd = b
        },
        Ra: function(a, b) {
            var c = this.view.Ua(new A(a,b));
            a = c.x;
            b = c.y;
            this.node.Mc(this.aa, a, b);
            this.node.format(this.view.oa, this.view.request);
            this.view.ma()
        },
        Ya: function(a, b) {
            var c = this.view.Ua(new A(a,b));
            a = c.x;
            b = c.y;
            this.log("onMouseUp(%s,%s)", a, b, this.Pd, this.Qd);
            if (a !== this.Pd || b !== this.Qd)
                this.view.za([new Ya(this.node.id,this.aa,this.ba.x,this.ba.y,a,b)]);
            else {
                var c = this.view
                  , d = this.node.id
                  , e = this.aa
                  , f = B(c.la, d, !1);
                f ? f.Le(e) ? (f !== c.Fa && (c.Fa = f),
                c.log("Select edit handle %s", e),
                c.Ka = e,
                c.aa.emit("selected-edit-handle", d, e)) : c.log("selectEditHandle: That handle is not selectable.") : c.log("selectEditHandle: nodeid %s does not exist.", d)
            }
            this.view.ma();
            C(this.view, this.da || new Za(this.view))
        }
    };
    function $a(a, b) {
        function c(a) {
            this.Pd = a.pageX;
            this.Qd = a.pageY;
            this.pageX = a.pageX;
            this.pageY = a.pageY;
            this.identifier = "identifier"in a ? a.identifier : a.pointerId
        }
        function d(a, b) {
            var d;
            for (d = 0; d < a.length; d++) {
                var e;
                a: {
                    e = a[d];
                    var f = -1
                      , g = void 0;
                    if ("identifier"in e)
                        for (g = 0; g < h.length; g++) {
                            if (e.identifier === h[g].identifier) {
                                e = g;
                                break a
                            }
                        }
                    else if ("pointerId"in e)
                        for (g = 0; g < h.length; g++) {
                            if (e.pointerId === h[g].identifier) {
                                e = g;
                                break a
                            }
                        }
                    else
                        for (var k = 0, g = 0; g < h.length; g++) {
                            var l = h[g].ng(e.pageX);
                            if (-1 === f || l < k)
                                f = g,
                                k = l
                        }
                    e = f
                }
                -1 === e ? "touchend" !== b && (h.push(new c(a[d])),
                ab("New touch %s", a[d].identifier)) : "touchend" !== b ? (h[e].pageX = a[d].pageX,
                h[e].pageY = a[d].pageY) : (ab("Remove touch %s", a[d].identifier),
                h.splice(e, 1))
            }
        }
        function e() {
            for (var a = 0, b = 0, c = 0; c < h.length; c++)
                ab("Active touch: %s,%s", h[c].pageX, h[c].pageY),
                a += h[c].pageX,
                b += h[c].pageY;
            return {
                x: a / h.length,
                y: b / h.length
            }
        }
        function f(a, b) {
            for (var c = 0, d = 0; d < h.length; d++)
                var e = h[d]
                  , c = c + Math.sqrt((e.pageX - a) * (e.pageX - a) + (e.pageY - b) * (e.pageY - b));
            return c / h.length
        }
        function g(a, b) {
            a.preventDefault = function() {
                b.preventDefault()
            }
            ;
            a.stopPropagation = function() {
                b.stopPropagation()
            }
            ;
            return a
        }
        ab = t("GESTURES");
        if (a.Xh)
            a.addEventListener("gesture", b, !1),
            ab("No emulation needed");
        else {
            c.prototype.ng = function(a) {
                return Math.sqrt((this.pageX - a.pageX) * (this.pageX - a.pageX) + (this.pageY - a.pageY) * (this.pageY - a.pageY))
            }
            ;
            var h = [], k = !1, l = 1, m = 0, q, r;
            a.addEventListener("touchstart", function(a) {
                d(a.changedTouches, a.type);
                ab("touchend; inGesture=%s active.length=%s", k, h.length);
                2 <= h.length && !k && (k = !0,
                r = e(),
                q = f(r.x, r.y),
                l = 1,
                m = 0,
                b(g({
                    type: "gesturestart",
                    pageX: r.x,
                    pageY: r.y,
                    scale: l,
                    rotation: m
                }, a)))
            });
            a.addEventListener("touchmove", function(a) {
                d(a.changedTouches, a.type);
                if (2 <= h.length) {
                    r = e();
                    l = f(r.x, r.y) / q;
                    for (var c = r.x, k = r.y, z = 0, W = 0; W < h.length; W++)
                        z += Math.atan2(h[W].pageY - k, h[W].pageX - c) - Math.atan2(h[W].Qd - k, h[W].Pd - c);
                    m = z / h.length / Math.PI * 180;
                    b(g({
                        type: "gesturechange",
                        pageX: r.x,
                        pageY: r.y,
                        scale: l,
                        rotation: m
                    }, a))
                }
            });
            a.addEventListener("touchend", function(a) {
                d(a.changedTouches, a.type);
                ab("touchend; inGesture=%s active.length=%s", k, h.length);
                k && 2 > h.length && (k = !1,
                b(g({
                    type: "gestureend",
                    pageX: r.x,
                    pageY: r.y,
                    scale: l,
                    rotation: m
                }, a)))
            })
        }
    }
    ;function bb(a, b) {
        this.view = a;
        this.state = "none";
        this.Ia = document.createElement("img");
        this.url = this.Ia.src = b
    }
    bb.prototype = {
        log: t("ImageStamp"),
        Gb: function() {
            this.log("Entering ImageStampBehaviour");
            this.view.canvas.style.cursor = "move"
        },
        Mb: function() {
            this.log("Leaving ImageStampBehaviour");
            this.view.ma()
        },
        hb: function(a) {
            var b;
            "touchstart" === a.type ? (b = a.changedTouches[0],
            b = y(this.view, b.pageX, b.pageY),
            this.Oa(b.x, b.y, a)) : "touchmove" === a.type ? (b = a.changedTouches[0],
            b = y(this.view, b.pageX, b.pageY),
            this.Ra(b.x, b.y, a)) : "touchend" === a.type && (b = a.changedTouches[0],
            b = y(this.view, b.pageX, b.pageY),
            this.Ya(b.x, b.y, a))
        },
        Ua: function(a, b) {
            this.Ia.complete && (a -= this.Ia.width / 2,
            b -= this.Ia.height / 2);
            return this.view.Ua(new A(a,b))
        },
        Oa: function(a, b, c) {
            this.log("onMouseDown type %s", c.type);
            a = this.Ua(a, b);
            this.view.za([new E("ImageNode",{
                url: this.url,
                layer: this.view.Ja,
                matrix: new F(a.x,a.y)
            })]);
            this.view.ia.get("autoPickTool") && G(this.view)
        },
        Ra: function(a, b) {
            this.Ia.complete || this.log("Don't draw; image not loaded.");
            var c = this.Ua(a, b)
              , d = this;
            this.view.ma(function(a) {
                var b = a.globalAlpha;
                a.globalAlpha = .5;
                a.drawImage(d.Ia, c.x, c.y);
                a.globalAlpha = b
            })
        },
        Ya: function() {},
        vb: function(a) {
            "cancel" === a && (G(this.view),
            this.view.sb.emit("goto-toolbar"))
        }
    };
    function cb() {
        this.aa = [];
        this.ba = []
    }
    cb.prototype = {
        log: t("SnapRules", !0),
        Ua: function(a, b, c) {
            return 0 === this.aa.length ? new A(a,b) : new A(db(this.aa, a, c),db(this.ba, b, c))
        }
    };
    function db(a, b, c) {
        for (var d = a.length, e = -1, f; 1 < d - e; )
            f = (d + e) / 2 | 0,
            a[f].value <= b ? e = f : d = f;
        -1 === e && (e = 0);
        return Math.abs(a[e].value - b) < c ? a[e].value : e + 1 < a.length && Math.abs(a[e + 1].value - b) < c ? a[e + 1].value : b
    }
    function eb(a) {
        a.aa.sort(function(a, c) {
            return a.value - c.value
        });
        a.ba.sort(function(a, c) {
            return a.value - c.value
        })
    }
    function fb(a, b, c) {
        gb(a.aa, function(a) {
            return a.id === b
        });
        gb(a.ba, function(a) {
            return a.id === b
        });
        var d;
        for (d = 0; d < c.length; d++)
            a.aa.push({
                id: b,
                value: c[d].x
            }),
            a.ba.push({
                id: b,
                value: c[d].y
            })
    }
    ;function hb(a) {
        this.ba = this.start = null;
        this.view = a;
        this.aa = !1
    }
    hb.prototype = {
        log: t("PanZoomMixin"),
        Wa: function(a) {
            this.log("onGesture(%s)", a.type);
            if ("gesturestart" === a.type)
                this.start = new A(a.pageX,a.pageY),
                this.ba = y(this.view, a.pageX, a.pageY),
                this.rect = ib(this.view),
                this.aa = !0;
            else if ("gesturechange" === a.type) {
                var b = new jb(1 / a.scale,1 / a.scale,this.ba.x,this.ba.y)
                  , b = (new F(-(a.pageX - this.start.x) / this.view.scale,-(a.pageY - this.start.y) / this.view.scale)).multiply(b);
                a = this.rect.clone();
                a.transform(b);
                this.view.ia.get("allowZoom") && kb(this.view, a)
            } else
                "gestureend" === a.type && (this.aa = !1)
        }
    };
    function lb(a) {
        this.view = a;
        this.state = "none";
        this.ba = new hb(a)
    }
    lb.prototype = {
        log: t("PanTool"),
        Gb: function() {
            this.log("Entering PanToolBehaviour");
            this.view.canvas.style.cursor = "all-scroll"
        },
        Mb: function() {
            this.log("Leaving PanToolBehaviour")
        },
        Wa: function(a) {
            this.ba.Wa(a)
        },
        hb: function(a) {
            var b;
            "touchstart" === a.type ? (b = a.changedTouches[0],
            b = y(this.view, b.pageX, b.pageY),
            this.Oa(b.x, b.y, a)) : "touchmove" === a.type ? (b = a.changedTouches[0],
            b = y(this.view, b.pageX, b.pageY),
            this.Ra(b.x, b.y, a)) : "touchend" === a.type && (b = a.changedTouches[0],
            b = y(this.view, b.pageX, b.pageY),
            this.Ya(b.x, b.y, a))
        },
        Oa: function(a, b, c) {
            this.log("onMouseDown type %s", c.type);
            this.state = "dragging";
            this.start = mb(c);
            this.aa = this.view.Na;
            this.da = this.view.La
        },
        Ra: function(a, b, c) {
            "dragging" === this.state && (a = mb(c),
            b = this.da + a.y - this.start.y,
            this.view.Na = this.aa + a.x - this.start.x,
            this.view.La = b,
            nb(this.view),
            this.view.ma())
        },
        Ya: function() {
            this.state = "none"
        },
        oe: function(a, b, c, d) {
            if (!this.view.ia.get("allowZoom"))
                return this.log("Zooming is disabled."),
                !1;
            this.log("onMouseWheel(%s, %s, %s)", a, b, c);
            c = 0 < c ? 1 / 1.1 : 1.1;
            var e = ib(this.view);
            e.transform(new jb(c,c,a,b));
            kb(this.view, e);
            d.stopPropagation();
            d.preventDefault()
        },
        vb: function(a) {
            "cancel" === a && G(this.view)
        }
    };
    function mb(a) {
        return "changedTouches"in a ? new A(a.changedTouches[0].pageX,a.changedTouches[0].pageY) : new A(a.pageX,a.pageY)
    }
    ;function ob(a) {
        this.aa = a
    }
    ob.prototype = {
        bf: function(a) {
            for (var b = 0; b < a.length; b++)
                this.Pa(a.charCodeAt(b))
        },
        Pa: function(a) {
            this.aa.Pa(a)
        },
        flush: function() {
            this.aa.flush()
        },
        $c: function() {
            return this.aa.$c()
        }
    };
    function pb() {
        this.data = ""
    }
    pb.prototype = {
        log: t("BYTESTREAM"),
        bf: function(a) {
            for (var b = 0; b < a.length; b++)
                this.Pa(a.charCodeAt(b))
        },
        $c: function() {
            return this
        },
        Pa: function(a) {
            if (255 < a || 0 > a)
                throw "Bad data written to byte buffer";
            this.data += String.fromCharCode(a)
        },
        flush: function() {},
        toString: function() {
            return this.data
        },
        Rb: function() {
            for (var a = [], b = 0; b < this.data.length; b++)
                a.push(this.data.charCodeAt(b));
            return a
        }
    };
    var qb = {};
    function rb(a) {
        var b = new pb;
        a = a.split(",");
        a.reverse();
        for (var c = 0; c < a.length; c++) {
            var d = a[c];
            d.length && (b = new qb[d](b))
        }
        return b
    }
    ;function sb(a) {
        this.aa = a;
        this.ba = []
    }
    sb.prototype = {
        Pa: function(a) {
            4 === this.ba.length && tb(this);
            this.ba.push(a)
        },
        flush: function() {
            0 < this.ba.length && tb(this);
            this.aa.bf("~>");
            this.aa.flush()
        }
    };
    function tb(a) {
        var b, c, d, e, f, g, h, k;
        b = a.ba[0];
        c = a.ba[1];
        d = a.ba[2];
        e = a.ba[3];
        f = (b << 24 | c << 16 | d << 8 | e) >>> 0;
        b = (f / 52200625 | 0) % 85 + 33;
        g = (f / 614125 | 0) % 85 + 33;
        h = (f / 7225 | 0) % 85 + 33;
        k = (f / 85 | 0) % 85 + 33;
        f = f % 85 + 33;
        (118 < b || 118 < g || 118 < h || 118 < k || 118 < f) && console.log(b, g, h, k, f);
        (33 > b || 33 > g || 33 > h || 33 > k || 33 > f) && console.log(b, g, h, k, f);
        a.aa.Pa(b);
        a.aa.Pa(g);
        isNaN(c) || (a.aa.Pa(h),
        isNaN(d) || (a.aa.Pa(k),
        isNaN(e) || a.aa.Pa(f)));
        a.ba.length = 0
    }
    sb.prototype = x.aa({}, ob.prototype, sb.prototype);
    qb.Ascii85Encoder = sb;
    function ub(a) {
        this.aa = a;
        this.ba = this.da = 0;
        this.ka = [0, 1, 3, 7, 15, 31, 63, 127, 255, 511, 1023, 2047, 4095, 8193]
    }
    ub.prototype = {
        log: t("BITWRITER"),
        Pa: function(a) {
            vb(this, a, 8)
        },
        flush: function() {
            this.ba && (this.aa.Pa(this.da << 8 - this.ba),
            this.da = this.ba = 0);
            this.aa.flush()
        }
    };
    function vb(a, b, c) {
        a.da = a.da << c | b & a.ka[c];
        for (a.ba += c; 8 <= a.ba; )
            a.aa.Pa(a.da >>> a.ba - 8 & 255),
            a.ba -= 8,
            a.da &= a.ka[a.ba]
    }
    qb.BitWriter = ub;
    ub.prototype = x.aa({}, ob.prototype, ub.prototype);
    function wb(a) {
        this.aa = new ub(a);
        this.ka = 258;
        this.ba = 0;
        this.qa = !0;
        this.na = [];
        this.Ca = [];
        this.ua = [];
        this.da = 9;
        xb(this)
    }
    wb.prototype = {
        log: t("LZWEncoder"),
        Pa: function(a) {
            var b;
            if (this.qa)
                this.ba = a,
                this.qa = !1;
            else {
                a: {
                    b = this.ba;
                    var c, d;
                    c = a << 4 ^ b;
                    for (d = 0 === c ? 1 : 18041 - c; ; ) {
                        if (void 0 === this.na[c] || this.Ca[c] === b && this.ua[c] === a) {
                            b = c;
                            break a
                        }
                        c -= d;
                        0 > c && (c += 18041)
                    }
                }
                void 0 !== this.na[b] ? this.ba = this.na[b] : (vb(this.aa, this.ba, this.da),
                this.na[b] = this.ka,
                this.Ca[b] = this.ba,
                this.ba = this.ua[b] = a,
                4095 > this.ka ? (this.ka += 1,
                this.da = Math.ceil(Math.log(this.ka) / Math.log(2))) : xb(this))
            }
        },
        flush: function() {
            this.qa || (vb(this.aa, this.ba, this.da),
            vb(this.aa, 257, this.da))
        }
    };
    function xb(a) {
        vb(a.aa, 256, a.da);
        a.ka = 258;
        a.da = 9;
        a.na.length = 0;
        a.Ca.length = 0;
        a.ua.length = 0
    }
    qb.LZWEncoder = wb;
    wb.prototype = x.aa({}, ob.prototype, wb.prototype);
    function yb(a) {
        this.aa = a;
        this.size = this.da = this.ba = 0;
        this.keys = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
    }
    yb.prototype = {
        Pa: function(a) {
            this.ba = this.ba << 8 | a;
            this.size += 8;
            for (this.da += 1; 6 <= this.size; )
                this.aa.Pa(this.keys.charCodeAt(this.ba >> this.size - 6 & 63)),
                this.size -= 6
        },
        flush: function() {
            var a = (3 - this.da % 3) % 3;
            this.size && (this.aa.Pa(this.keys.charCodeAt(this.ba >> this.size - 6 & 63)),
            this.ba = this.size = 0);
            for (; a--; )
                this.aa.Pa(61);
            this.aa.flush()
        }
    };
    yb.prototype = x.aa({}, ob.prototype, yb.prototype);
    qb.Base64Encoder = yb;
    function zb() {
        this.aa = [];
        this.next = 0;
        this.Lb = !1
    }
    zb.prototype = {
        log: t("UNDOSTACK"),
        za: function(a, b, c) {
            "object" === typeof a && "[object Array]" === Object.prototype.toString.apply(a) || (a = [a]);
            this.next < this.aa.length && (this.aa.length = this.next);
            if (!b) {
                for (var d = [], e = 2; e < arguments.length; e++)
                    d.push(arguments[e]);
                for (e = 0; e < a.length; e++)
                    a[e].Bb.apply(a[e], d)
            }
            for (d = this.top(); d; )
                if (d[d.length - 1].Ne(a[0])) {
                    if (a.shift(),
                    0 === a.length)
                        break
                } else
                    break;
            a.length && this.aa.push(a);
            this.Lb = !0;
            this.next = this.aa.length
        },
        cb: function(a) {
            this.log("Undo index %s of %s", this.next, this.aa.length);
            if (this.xc()) {
                for (var b = this.aa[--this.next], c = b.length - 1; 0 <= c; c--)
                    b[c].cb.apply(b[c], arguments);
                this.Lb = !0
            }
        },
        fc: function(a) {
            this.log("Redo index %s of %s", this.next, this.aa.length);
            if (this.wc()) {
                for (var b = this.aa[this.next++], c = 0; c < b.length; c++)
                    b[c].Bb.apply(b[c], arguments);
                this.Lb = !0
            }
        },
        xc: function() {
            return 0 < this.next
        },
        wc: function() {
            return this.next < this.aa.length
        },
        top: function() {
            return this.aa.length ? this.aa[this.aa.length - 1] : 0
        }
    };
    function Ab() {}
    Ab.prototype = {
        Bb: function() {},
        cb: function() {},
        Ne: function() {
            return !1
        }
    };
    var I = []
      , Bb = null
      , Cb = t("ImageLoader");
    function Db() {
        var a = [];
        Cb("Timeout running... %s images remaining", I.length);
        for (var b = 0; b < I.length; b++)
            I[b].complete ? I[b].yc(I[b], I[b].wd) : 5E3 > I[b].Td ? (I[b].Td += 250,
            a.push(I[b])) : I[b].yc(I[b], I[b].wd);
        I = a;
        I.length ? setTimeout(Db, 250) : (Cb("Timeout Stopped"),
        Bb = !1)
    }
    function Eb(a, b) {
        function c() {
            Cb("LoadFn called. complete=%s", d.complete);
            if (d.complete)
                for (var a = 0; a < I.length; a++) {
                    if (I[a] === d) {
                        I.splice(a, 1);
                        b(d, d.wd);
                        break
                    }
                }
            else
                Bb || (Bb = !0,
                setTimeout(Db, 250),
                d.Td = 250)
        }
        var d = document.createElement("img");
        I.push(d);
        d.yc = b;
        d.wd = a;
        d.Td = 0;
        var e = 0 <= a.indexOf("://")
          , f = "://" + window.location.host;
        0 !== a.indexOf("data:") && e && -1 === a.indexOf(f) && (Cb("Using cross origin request for img"),
        d.crossOrigin = "");
        d.addEventListener ? (d.addEventListener("load", function() {
            c()
        }, !1),
        d.addEventListener("error", function() {
            Cb("Error loading %s", a);
            b(null, d.wd)
        }, !1)) : (d.attachEvent("onload", function() {
            c()
        }),
        d.attachEvent("onerror", function() {
            Cb("Error loading %s", a);
            b(null, d.wd)
        }));
        d.src = a
    }
    ;function J() {
        this.Xa = !1;
        this.ba = {}
    }
    J.prototype = {
        log: t("EventEmitter"),
        emit: function(a, b) {
            var c, d = this;
            this.ba || (this.ba = {});
            c = Array.prototype.slice.call(arguments, 1);
            setTimeout(function() {
                var b, f, g, h, k = !1;
                if (a in d.ba)
                    for (h = d.ba[a],
                    f = 0,
                    g = h.length; f < g; f++)
                        b = h[f],
                        d.Xa || k || (d.log("Emit %s", a),
                        k = !0),
                        b.apply(null, c)
            }, 0);
            return this
        },
        Jc: function(a, b) {
            var c;
            this.ba || (this.ba = {});
            c = Array.prototype.slice.call(arguments, 1);
            var d, e, f, g, h = !1;
            if (a in this.ba)
                for (g = this.ba[a],
                e = 0,
                f = g.length; e < f; e++)
                    d = g[e],
                    this.Xa || h || (this.log("Emit %s", a),
                    h = !0),
                    d.apply(null, c);
            return this
        },
        on: function(a, b) {
            this.ba || (this.ba = {});
            this.bind(a, b);
            return this
        },
        bind: function(a, b) {
            a in this.ba ? this.ba[a].push(b) : this.ba[a] = [b];
            return b
        },
        Tc: function(a, b) {
            var c, d, e, f;
            if (a in this.ba)
                for (c = this.ba[a],
                d = e = 0,
                f = c.length - 1; e <= f; d = e += 1)
                    if (c[d] === b) {
                        c.splice(d, 1);
                        break
                    }
        }
    };
    function Fb(a, b) {
        function c() {
            a.Tc("done", c);
            b.apply(null, arguments)
        }
        a.bind("done", c)
    }
    ;function Gb() {
        var a = this;
        J.call(this);
        window.addEventListener("message", function(b) {
            Hb(a, b)
        }, !1);
        window.parent.postMessage('{"event": "ready"}', "*")
    }
    Gb.prototype = {
        log: t("Api")
    };
    function Hb(a, b) {
        function c(a) {
            "ticket"in d && (a = {
                ticket: d.ticket,
                args: a
            },
            window.parent.postMessage(window.JSON.stringify(a), "*"))
        }
        var d;
        try {
            d = window.JSON.parse(b.data)
        } catch (g) {
            a.log("Error parsing %s from %s", b.data, b.origin);
            return
        }
        a.log("Received %s", b.data);
        if (d["function"]in a.ba)
            for (var e = a.ba[d["function"]], f = 0; f < e.length; f++)
                (0,
                e[f])(d.args, c)
    }
    Gb.prototype = x.aa({}, J.prototype, Gb.prototype);
    function Ib() {
        J.apply(this, arguments);
        this.da = [];
        this.aa = !1;
        this.canvas = null
    }
    Ib.prototype = {
        log: t("FORMAT", !0),
        add: function(a, b, c, d, e) {
            var f, g, h, k;
            k = this.da;
            g = 0;
            for (h = k.length; g < h; g++)
                f = k[g],
                f.type === b && f.gd === a && (f.Od = !0);
            this.log("Request URL %s", c);
            this.da.push({
                gd: a,
                type: b,
                url: c,
                Tg: d,
                Ae: e,
                Od: !1
            });
            Jb(this)
        }
    };
    function Kb(a, b) {
        a.aa = !0;
        a.log("Processing request for item %s url=%s", b.gd, b.url);
        0 === b.type.indexOf("image") ? Eb(b.url, function(c, d) {
            null !== c ? (a.log("Image request completed for item %s url %s", b.gd, d),
            b.Ae(c, d)) : a.log("Image request failed for url %s", d);
            a.aa = !1;
            b.Od = !0;
            Jb(a)
        }) : x.ba({
            url: b.url,
            data: b.Tg,
            dataType: "json",
            success: function(c) {
                b.Od || (a.log("Request completed for item %s", b.gd.id),
                b.Ae(c),
                b.node && a.emit("reformat", b.gd),
                a.aa = !1,
                a.da.shift(),
                Jb(a))
            },
            error: function(b, d, e) {
                a.log("Error: %s %s", d, e);
                a.aa = !1;
                a.da.shift();
                Jb(a)
            }
        })
    }
    function Jb(a) {
        for (var b = 0; !a.aa && b < a.da.length; )
            a.da[b].Od ? a.da.shift() : (Kb(a, a.da[0]),
            b += 1);
        a.aa || a.emit("done")
    }
    Ib.prototype = x.aa({}, J.prototype, Ib.prototype);
    function Lb(a, b) {
        this.ja = b;
        this.nh = !0
    }
    Lb.prototype = {
        log: t("MoveSegment"),
        ma: function(a) {
            a.moveTo(this.ja.x, this.ja.y)
        },
        Bc: function() {
            return null
        },
        ac: function() {
            return {
                x: 1,
                y: 0
            }
        }
    };
    function Mb(a, b, c, d, e) {
        this.ja = b;
        this.ya = a;
        this.Lg = !0;
        this.aa = e;
        this.na = d;
        c.next();
        this.da = c.next();
        this.ka = c.next();
        this.moveTo = this.zc = null;
        this.format()
    }
    Mb.prototype = {
        log: t("LineSegment"),
        format: function() {
            var a = Nb(this.ya.ja.x, this.ya.ja.y, this.ja.x, this.ja.y);
            this.ba = this.length = a;
            var b = this.ya.ja.clone();
            if (this.ya.Lg && this.aa) {
                this.aa = Math.min(this.aa, a / 2, this.ya.length / 2);
                a = K(this.ya.ja.x, this.ya.ja.y, this.ja.x, this.ja.y);
                b.x += a.x * this.aa;
                b.y += a.y * this.aa;
                var a = this.ya
                  , c = this.aa
                  , d = K(a.ta.x, a.ta.y, a.ja.x, a.ja.y)
                  , e = a.ja.clone();
                e.x -= d.x * c;
                e.y -= d.y * c;
                a.zc = e;
                a.ba -= c;
                c = a.ba / 10 * a.na;
                10 < c && (c = 10);
                var d = a.ta.x
                  , f = a.ta.y
                  , g = e.x
                  , h = e.y
                  , d = d + c
                  , f = f + c;
                a.Ha = new A(d + a.da * (g + c - d),f + a.da * (h + c - f));
                a.log("RECALC ctrl1=%s", a.Ha);
                d = a.ta.x - c;
                g = e.x - c;
                f = a.ta.y - c;
                h = e.y - c;
                a.Ma = new A(d + a.ka * (g - d),f + a.ka * (h - f));
                this.ba -= this.aa
            }
            this.ta = b;
            null === this.zc && (this.zc = this.ja);
            a = this.ba / 10 * this.na;
            10 < a && (a = 10);
            e = b.x;
            c = b.y;
            d = this.ja.x;
            f = this.ja.y;
            e += a;
            c += a;
            this.Ha = new A(e + this.da * (d + a - e),c + this.da * (f + a - c));
            e = b.x - a;
            d = this.ja.x - a;
            c = b.y - a;
            f = this.ja.y - a;
            this.Ma = new A(e + this.ka * (d - e),c + this.ka * (f - c))
        },
        ud: function(a) {
            this.ya = a;
            this.format();
            this.ya.zc && (this.moveTo = this.ya.zc)
        },
        ma: function(a) {
            this.aa && (this.moveTo && a.moveTo(this.moveTo.x, this.moveTo.y),
            a.quadraticCurveTo(this.ya.ja.x, this.ya.ja.y, this.ta.x, this.ta.y));
            a.bezierCurveTo(this.Ha.x, this.Ha.y, this.Ma.x, this.Ma.y, this.zc.x, this.zc.y)
        },
        Bc: function() {
            return this.ya ? K(this.ya.ja.x, this.ya.ja.y, this.Ha.x, this.Ha.y) : null
        },
        ac: function() {
            return K(this.Ma.x, this.Ma.y, this.ja.x, this.ja.y)
        }
    };
    function Ob(a, b, c) {
        this.ja = b;
        this.ya = a;
        this.aa = c;
        var d = Nb(a.ja.x, a.ja.y, b.x, b.y);
        d || (d = 1);
        var e = (b.x - a.ja.x) / d
          , f = (b.y - a.ja.y) / d;
        this.Ma = new A(b.x - d * c * e,b.y - d * c * f);
        if (b = a.Ma) {
            var g = K(a.ya.ja.x, a.ya.ja.y, a.ja.x, a.ja.y)
              , h = Nb(a.ya.ja.x, a.ya.ja.y, a.ja.x, a.ja.y)
              , e = .5 * (e + g.x)
              , f = .5 * (f + g.y);
            b.x = a.ja.x - h * c * e;
            b.y = a.ja.y - h * c * f
        }
        this.Ha = new A(a.ja.x + d * c * e,a.ja.y + d * c * f);
        this.length = d
    }
    Ob.prototype = {
        ud: function(a) {
            this.ya = a;
            var b = a.Ma
              , c = (this.ja.x - a.ja.x) / this.length
              , d = (this.ja.y - a.ja.y) / this.length
              , e = this.aa;
            if (b) {
                var f = K(a.ya.ja.x, a.ya.ja.y, a.ja.x, a.ja.y)
                  , g = Nb(a.ya.ja.x, a.ya.ja.y, a.ja.x, a.ja.y)
                  , c = .5 * (c + f.x)
                  , d = .5 * (d + f.y);
                b.x = a.ja.x - g * e * c;
                b.y = a.ja.y - g * e * d
            }
            this.Ha = new A(a.ja.x + this.length * e * c,a.ja.y + this.length * e * d)
        },
        ma: function(a) {
            a.bezierCurveTo(this.Ha.x, this.Ha.y, this.Ma.x, this.Ma.y, this.ja.x, this.ja.y)
        },
        Bc: function() {
            return this.ya ? K(this.ya.ja.x, this.ya.ja.y, this.Ha.x, this.Ha.y) : null
        },
        ac: function() {
            return 0 < this.aa ? K(this.Ma.x, this.Ma.y, this.ja.x, this.ja.y) : K(this.ya.ja.x, this.ya.ja.y, this.ja.x, this.ja.y)
        }
    };
    function Pb(a, b, c) {
        this.control = b;
        this.ja = c
    }
    Pb.prototype = {
        ma: function(a) {
            a.quadraticCurveTo(this.control.x, this.control.y, this.ja.x, this.ja.y)
        },
        Bc: function() {
            return this.ya ? K(this.ya.ja.x, this.ya.ja.y, this.control.x, this.control.y) : null
        },
        ac: function() {
            return K(this.control.x, this.control.y, this.ja.x, this.ja.y)
        }
    };
    function Qb(a, b, c, d) {
        this.control = b;
        this.ja = c;
        this.Vb = d
    }
    Qb.prototype = {
        ma: function(a) {
            a.arcTo(this.control.x, this.control.y, this.ja.x, this.ja.y, this.Vb)
        }
    };
    function Rb(a, b, c, d) {
        this.Ha = b;
        this.Ma = c;
        this.ja = d;
        this.ya = a
    }
    Rb.prototype = {
        ma: function(a) {
            a.bezierCurveTo(this.Ha.x, this.Ha.y, this.Ma.x, this.Ma.y, this.ja.x, this.ja.y)
        },
        Bc: function() {
            return this.ya ? K(this.ya.ja.x, this.ya.ja.y, this.Ha.x, this.Ha.y) : null
        },
        ac: function() {
            return K(this.Ma.x, this.Ma.y, this.ja.x, this.ja.y)
        }
    };
    function Sb(a, b, c, d) {
        this.Ha = b;
        this.Ma = c;
        this.ja = d;
        this.ya = a
    }
    Sb.prototype = {
        ma: function(a) {
            if (this.ya) {
                var b = [];
                this.ya.Ma && b.push(this.ya.Ma);
                this.Ha && b.push(this.Ha);
                2 === b.length ? a.bezierCurveTo(b[0].x, b[0].y, b[1].x, b[1].y, this.ja.x, this.ja.y) : 1 === b.length && a.quadraticCurveTo(b[0].x, b[0].y, this.ja.x, this.ja.y)
            }
        },
        ud: function(a) {
            this.ya = a
        },
        Bc: function() {
            return this.ya && this.ya.Ma ? K(this.ya.ja.x, this.ya.ja.y, this.Ha.x, this.Ha.y) : null
        },
        ac: function() {
            if (!this.Ha)
                return null
        }
    };
    function Tb(a, b, c, d, e) {
        this.ya = a;
        this.aa = b;
        e = 2 * e;
        var f = 2 * d.next() - 1;
        d.next();
        d = this.ya.ac();
        if (!this.ya.nh && d) {
            var g = Nb(a.ja.x, a.ja.y, b.x, b.y);
            this.Ha = new A(a.ja.x + .5522847498 * d.x * g,a.ja.y + .5522847498 * d.y * g)
        } else
            this.Ha = new A(a.ja.x + .5522847498 * (b.x - a.ja.x),a.ja.y + .5522847498 * (b.y - a.ja.y));
        this.Ma = new A(c.x - .5522847498 * (c.x - b.x) * (1 - f * e),c.y - .5522847498 * (c.y - b.y) * (1 - f * e));
        this.ja = c
    }
    Tb.prototype = {
        log: t("SEGMENT"),
        ud: function(a) {
            this.ya = a;
            var b = this.ya.ac();
            if (b) {
                var c = Nb(a.ja.x, a.ja.y, this.aa.x, this.aa.y);
                this.Ha = new A(a.ja.x + .5522847498 * b.x * c,a.ja.y + .5522847498 * b.y * c)
            } else
                this.Ha = new A(a.ja.x + .5522847498 * (this.aa.x - this.ya.ja.x),a.ja.y + .5522847498 * (this.aa.y - this.ya.ja.y))
        },
        ma: function(a) {
            a.bezierCurveTo(this.Ha.x, this.Ha.y, this.Ma.x, this.Ma.y, this.ja.x, this.ja.y)
        },
        Bc: function() {
            return this.ya ? K(this.ya.ja.x, this.ya.ja.y, this.Ha.x, this.Ha.y) : null
        },
        ac: function() {
            return K(this.Ma.x, this.Ma.y, this.ja.x, this.ja.y)
        }
    };
    function Ub(a) {
        this.ba = a;
        this.Vb = 30;
        this.aa = []
    }
    Ub.prototype = {
        log: t("AngleAddon"),
        format: function() {
            var a = this.ba.ka
              , b = 0
              , c = []
              , d = [];
            this.aa.length = 0;
            for (var e = 0 > Vb(a); b < a.ea.length; ) {
                switch (a.ea[b]) {
                case Wb:
                    c = [new A(a.ea[b + 1],a.ea[b + 2])];
                    d = c.concat();
                    break;
                case Xb:
                    3 === c.length && c.shift();
                    c.push(new A(a.ea[b + 1],a.ea[b + 2]));
                    d.push(c[c.length - 1]);
                    3 === c.length && Yb(this, c[0], c[1], c[2], e);
                    break;
                case Zb:
                    3 <= d.length && Yb(this, d[d.length - 2], d[0], d[1], e)
                }
                b += $b[a.ea[b]]
            }
        },
        ma: function(a) {
            a.beginPath();
            var b, c;
            for (c = 0; c < this.aa.length; c++)
                b = this.aa[c],
                a.moveTo(b.x + this.Vb * Math.cos(b.Rc), b.y + this.Vb * Math.sin(b.Rc)),
                a.arc(b.x, b.y, this.Vb, b.Rc, b.Ed, !1);
            a.lineWidth = 3;
            a.strokeStyle = "red";
            a.stroke();
            a.fillStyle = "red";
            a.font = "20px Arial";
            for (c = 0; c < this.aa.length; c++) {
                b = this.aa[c];
                var d = (b.Rc + b.Ed) / 2 + Math.PI;
                0 < b.Rc && 0 > b.Ed && (d -= Math.PI);
                var e = b.Ed - b.Rc;
                0 > e && (e += 2 * Math.PI);
                a.fillText("" + Math.round(e / Math.PI * 180) + "\u00b0", b.x + this.Vb * Math.cos(d), b.y + this.Vb * Math.sin(d))
            }
        }
    };
    function Yb(a, b, c, d, e) {
        var f;
        b = K(c.x, c.y, b.x, b.y);
        f = K(c.x, c.y, d.x, d.y);
        d = Math.atan2(b.y, b.x);
        b = Math.atan2(f.y, f.x);
        e && (e = d,
        d = b,
        b = e);
        a.aa.push({
            x: c.x,
            y: c.y,
            Rc: b,
            Ed: d
        })
    }
    ;function ac(a) {
        this.ba = a;
        this.Vb = a.pa("cloudRadius");
        this.aa = [];
        this.Vg = !0
    }
    ac.prototype = {
        log: t("cloudAddon"),
        format: function() {
            var a = bc(this.ba.ka);
            this.log("Format cloud; %s points", a.length);
            var b = this.Vb, c = [], d = 5 / 6 * b * 2, e, f, g = a[a.length - 1];
            for (f = 0; f < a.length; f++) {
                e = a[f];
                var h = e.x - g.x
                  , k = e.y - g.y
                  , l = Math.sqrt(h * h + k * k)
                  , h = h / l
                  , k = k / l
                  , m = d
                  , m = l / d + .5 | 0;
                1 > m && (m = 1);
                for (var m = l / m, q = 0; q + .1 * m < l; q += m)
                    c.push({
                        x: g.x + q * h,
                        y: g.y + q * k
                    });
                g = e
            }
            g = c[c.length - 1];
            for (f = 0; f < c.length; f++)
                e = c[f],
                d = e.x - g.x,
                h = e.y - g.y,
                a = .5 * Math.sqrt(d * d + h * h) / b,
                -1 > a && (a = -1),
                1 < a && (a = 1),
                d = Math.atan2(h, d),
                a = Math.acos(a),
                a = [d - a, Math.PI + d + a],
                g.end = a[0],
                e.fg = a[1],
                g = e;
            this.aa = c
        },
        ma: function(a) {
            this.log("Drawing cloud with %s circles", this.aa.length);
            var b = 15 * Math.PI / 180
              , c = this.Vb;
            a.beginPath();
            for (var d = 0; d < this.aa.length; d++) {
                var e = this.aa[d];
                a.arc(e.x, e.y, c, e.fg, e.end + b)
            }
            a.stroke()
        }
    };
    function cc(a) {
        ec(this, a)
    }
    function ec(a, b) {
        a.ha = b || x("<div>");
        a.ha.ga("position", "absolute");
        a.ha.ga("margin", "0px");
        a.ha.ga("padding", "0px");
        x("body").append(a.ha)
    }
    n = cc.prototype;
    n.width = function(a) {
        function b(a) {
            a = parseInt(c.ha.ga(a), 10);
            return isNaN(a) ? 0 : a
        }
        var c = this;
        if (void 0 === a)
            return this.ha.outerWidth();
        a -= b("border-left-width");
        a -= b("border-right-width");
        a -= b("padding-right");
        a -= b("padding-left");
        a -= b("margin-left");
        a -= b("margin-right");
        a = Math.max(0, a);
        this.ha.ga("width", "" + a + "px")
    }
    ;
    n.height = function(a) {
        function b(a) {
            a = parseInt(c.ha.ga(a), 10);
            return isNaN(a) ? 0 : a
        }
        var c = this;
        if (void 0 === a)
            return this.ha.outerHeight();
        a -= b("border-top-width");
        a -= b("border-bottom-width");
        a -= b("padding-top");
        a -= b("padding-bottom");
        a -= b("margin-top");
        a -= b("margin-bottom");
        this.ka = a = Math.max(0, a);
        this.ha.ga("height", "" + this.ka + "px")
    }
    ;
    n.moveTo = function(a, b) {
        null !== a && this.ha.ga("left", "" + a + "px");
        null !== b && this.ha.ga("top", "" + b + "px")
    }
    ;
    n.show = function() {
        this.ha.show()
    }
    ;
    n.sa = function() {
        this.ha.sa()
    }
    ;
    function fc(a) {
        var b = x("<div>");
        ec(this, b);
        a.append(this.ha);
        this.qa = {};
        this.ba = 128;
        this.aa = 0;
        this.ha.ga("overflow-x", "auto");
        this.ha.ga("overflow-y", "auto");
        this.ua = 0;
        this.na = 1;
        this.da = [];
        this.Ca = null
    }
    fc.prototype = {
        on: function(a, b) {
            this.qa[a] = b
        },
        log: t("ListView"),
        format: function() {
            var a, b, c, d, e;
            b = null;
            e = this.da;
            c = 0;
            for (d = e.length; c < d; c++) {
                a = e[c];
                if (!a.Ke) {
                    if (null === b) {
                        b = this.ha;
                        var f = a.Ia
                          , f = Aa(f);
                        0 < b.length ? b[0].insertBefore(f[0], b[0].firstChild) : b[0].appendChild(f[0])
                    } else
                        Qa(b.Ia, a.Ia);
                    a.Ke = !0
                }
                b = a
            }
        }
    };
    function gc(a) {
        a.ha.empty();
        a.da.length = 0;
        a.na += 1
    }
    function hc(a, b, c, d) {
        var e, f;
        f = a.na;
        e = {
            Ia: null,
            index: a.ua,
            Ke: !1
        };
        a.ua += 1;
        Eb(b, function(b) {
            var h, k;
            f === a.na && (k = b.width,
            h = b.height,
            a.ba && k > a.ba && (b.width = a.ba,
            b.height = h / k * a.ba),
            a.aa && h > a.aa && (b.width = a.aa / (h / k),
            b.height = a.aa),
            b = x(b),
            b.ga("margin", "2px"),
            b.ga("border-width", "3"),
            b.ga("border-color", "white"),
            b.ga("border-style", "solid"),
            b.ga("image-rendering", "optimizeQuality"),
            Ga(b, function() {
                a.log("Mouseenter");
                return b.ga("border-color", "#888888")
            }),
            Fa(b, function() {
                return b.ga("border-color", "white")
            }),
            b.click(function() {
                if ("click"in a.qa)
                    return a.qa.click(c)
            }),
            d && b.fb("title", d),
            e.Ia = b,
            a.da.push(e),
            a.da.sort(function(a, b) {
                return a.index - b.index
            }),
            a.Ca || (a.Ca = setTimeout(function() {
                a.Ca = null;
                a.format()
            }, 500)))
        })
    }
    fc.prototype = x.aa({}, cc.prototype, fc.prototype);
    var ic, jc = {};
    for (ic = 0; 65 > ic; ic++)
        jc["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_="[ic]] = ic;
    jc["+"] = 62;
    jc["/"] = 63;
    function kc(a) {
        a = a.replace(/\+/g, " ");
        return window.decodeURIComponent ? window.decodeURIComponent(a) : unescape(a)
    }
    function lc() {
        var a;
        a = a || window.location.hash;
        0 === a.indexOf("#/") && (a = "#" + a.substr(2));
        var b = a, c, d, e, f;
        a = {};
        e = b.indexOf("#");
        0 <= e && (b = b.substr(e + 1));
        e = b.indexOf("#");
        0 <= e && (b = b.substr(0, e));
        b = b.split("&");
        e = 0;
        for (f = b.length; e < f; e++)
            c = b[e],
            d = c.split("="),
            c = kc(d[0]),
            d = 1 < d.length ? kc(d[1]) : "",
            c.length && (a[c] = d);
        return a
    }
    ;var mc, nc, oc;
    oc = document.getElementsByTagName("script");
    nc = oc[oc.length - 1];
    mc = void 0 !== nc.getAttribute.length ? nc.src : nc.getAttribute("src", -1);
    function pc(a) {
        var b, c;
        this.wa = {
            angleArcs: 0,
            allowSelectBox: "auto",
            allowResize: !0,
            allowTextInShape: !0,
            allowZoom: !0,
            autoPickTool: !0,
            autoSnap: 0,
            background: "clear",
            backgroundImage: null,
            colourPicker: "wheel",
            colourPalette: "#000000 #ffffff #000088 #008800 #008888 #880000 #880088 #884400 #888888 #444444 #0000ff #00ff00 #00ffff #ff0000 #ff00ff #ffff00".split(" "),
            debug: !1,
            defaultArrowStyle: "simple",
            defaultArrowSize: 15,
            defaultItalic: !1,
            defaultBold: !1,
            defaultBrushColour: "#000000",
            defaultBrushWidth: 10,
            defaultFillStyle: "#e0e0e0",
            defaultFont: "Arial",
            defaultFontSize: 20,
            defaultLineWidth: 2,
            defaultPaperSize: "none",
            defaultRoundRectRadius: 10,
            defaultSmoothness: "smooth",
            defaultStrokeStyle: "#000000",
            defaultText: "Lorum ipsum dolor",
            defaultTextFillStyle: "#000000",
            defaultTextStrokeStyle: "#000000",
            defaultTextLineWidth: 0,
            defaultZoom: 1,
            drawCircleStyle: "radial",
            fonts: ["Arial", "Times New Roman"],
            gridBlocks: 10,
            gridSpacing: 20,
            gridColour: "#cccccc",
            imageFolder: "$SCRIPT",
            iPadNoScrollText: !1,
            keyBringToFront: "Home",
            keyCancel: "ESC",
            keyCopy: "Ctrl+C,\u2318+C",
            keyCurveTool: "C",
            keyCut: "Ctrl+X,\u2318+X,Shift+Delete",
            keyDelete: "Delete,Backspace",
            keyDown: "Down,Ctrl+Down",
            keyDuplicate: "Ctrl+D",
            keyEnter: "Enter",
            keyGroup: "Ctrl+G",
            keyLeft: "Left,Ctrl+Left",
            keyLineTool: "L",
            keyMoveDown: "PageDown",
            keyMoveUp: "PageUp",
            keyNext: "Down,Right",
            keyNextPage: "Shift+PageDown",
            keyPaste: "Ctrl+V,\u2318+V,Shift+Insert",
            keyPrevious: "Left,Up",
            keyPreviousPage: "Shift+Pageup",
            keyRedo: "Ctrl+Shift+Z",
            keyRight: "Right,Ctrl+Right",
            keySelectNone: "ESC",
            keySelectAll: "Ctrl+A",
            keySendToBack: "End",
            keyUndo: "Ctrl+Z",
            keyUngroup: "Ctrl+Shift+G",
            keyUp: "Up,Ctrl+Up",
            keyZoomIn: "+,Shift+=",
            keyZoomNormal: "=",
            keyZoomOut: "-",
            keyZoomToPage: "F4",
            keyZoomToWidth: "Shift+F4",
            language: "en",
            multilineText: !1,
            nudge: 10,
            outsidePageColour: "#808080",
            pagePlacement: "centre",
            pageSelectorDiv: "",
            pageBorderColour: "rbga(0,0,0,0.0)",
            pageShadow: !0,
            pageView: !1,
            pasteOffset: 10,
            persistent: !1,
            preciseNudge: 1,
            readOnly: !1,
            scrollbars: !0,
            setFocus: !0,
            showArrowTool: !0,
            showBackgroundSelector: !1,
            showBrushTool: !0,
            showCircleTool: !0,
            showColourPanel: !0,
            showCopyPaste: !0,
            showCurveTool: !0,
            showDebug: !1,
            showFontNameProperty: !0,
            showFontSizeProperty: !0,
            showHints: !0,
            showImageSelector: !1,
            showImageTool: !1,
            showKeyboardHelp: !0,
            showLineTool: !0,
            showMathTool: !1,
            showMoveToFrontBack: !1,
            showPageSelector: !1,
            showPageSelectorControls: !0,
            showPickTool: !0,
            showPropertyPanel: !1,
            showRoundRectTool: !1,
            showShapeBrushTool: !1,
            showSloppinessProperty: !0,
            showSmoothnessProperty: !0,
            showSquareTool: !0,
            showTextTool: !0,
            showToolbar: !0,
            showUndoRedo: !0,
            simulateGestures: !1,
            singleStrokeBrush: !1,
            sloppy: !1,
            snap: 0,
            spotHighlightColour: "rgba(0,0,0,0.2)",
            spotHighlightZIndex: 0,
            symmetry: 0,
            textMode: "interactive",
            toolbarButtonSize: 50,
            useTouch: "auto",
            enableArrowKeysNudge: !1,
            showMenu: !1
        };
        for (c in a)
            a.hasOwnProperty(c) && (c in this.wa || alert("Zwibbler: Unknown option '" + c + "'"),
            this.wa[c] = a[c]);
        a = lc();
        for (c in a)
            a.hasOwnProperty(c) && qc(this, c, a[c]);
        "" === rc() ? (this.aa = this.wa.imageFolder.replace("$SCRIPT/", ""),
        this.aa = this.aa.replace("$SCRIPT", "")) : this.aa = this.wa.imageFolder.replace("$SCRIPT", rc());
        "" !== this.aa && "/" !== this.aa[this.aa.length - 1] && (this.aa += "/");
        "auto" === this.wa.useTouch && (c = "ontouchstart"in window || "onmsgesturechange"in window,
        this.log("Detected touch support: %s", c));
        for (b in this.wa)
            this.wa.hasOwnProperty(b) && this.log("%s=%s", b, this.wa[b])
    }
    pc.prototype = {
        log: t("CONFIG"),
        on: function(a, b) {
            b(a, this.wa[a], !0);
            return J.prototype.on.call(this, a, b)
        },
        kh: function() {
            return this.wa.showBrushTool
        },
        Ze: function() {
            return this.wa.showPropertyPanel
        },
        lh: function() {
            return this.wa.showColourPanel
        },
        mh: function() {
            return this.wa.showToolbar
        },
        get: function(a) {
            return this.wa[a]
        },
        $b: function() {
            return "auto" === this.wa.useTouch ? "ontouchstart"in window || "onmsgesturechange"in window : this.wa.useTouch
        }
    };
    function sc(a, b) {
        for (var c in a.wa)
            if (a.wa.hasOwnProperty(c) && 0 === c.indexOf("key")) {
                for (var d = "", e = 0; e < c.length; e++)
                    var f = c.charAt(e)
                      , d = f === f.toUpperCase() ? d + ("-" + f.toLowerCase()) : d + f;
                b.map(a.wa[c], d.substr(4))
            }
    }
    function tc(a) {
        a = a.get("pageSelectorDiv");
        return void 0 !== a.className ? a : "" !== a && x(a).length ? x(a)[0] : null
    }
    function L(a, b) {
        return 0 === b.indexOf("http:") || 0 === b.indexOf("https:") || 0 === b.indexOf("/") ? b : a.aa + b
    }
    function rc() {
        var a, b;
        b = mc;
        a = b.lastIndexOf("/");
        0 <= a ? b = b.substr(0, a + 1) : b = "";
        return b
    }
    function qc(a, b, c) {
        if (!(b in a.wa))
            return a.log("Error: %s is not a configuration option.", b),
            !1;
        if ("defaultZoom" === b) {
            if ("page" !== c && "width" !== c && !M(c) && (c = parseFloat(c),
            isNaN(c)))
                return a.log("Error: Config option %s must be a number or 'page' or 'width'", b),
                !1
        } else if ("allowSelectBox" !== b && "string" === typeof c)
            if ("number" === typeof a.wa[b]) {
                if (c = parseFloat(c),
                isNaN(c))
                    return a.log("Error: Config option %s expects a number", b),
                    !1
            } else
                "boolean" === typeof a.wa[b] && (c = "1" === c || "true" === c || "" === c);
        a.log("Set config %s=%s", b, c);
        a.wa[b] = c;
        a.Jc("update", b, c);
        a.Jc(b, c);
        return !0
    }
    pc.prototype = x.aa({}, J.prototype, pc.prototype);
    var uc = {}
      , wc = {};
    function xc(a, b) {
        for (var c = a.split(","), d = b, e = 0; e < c.length; e++)
            d = uc[c[e]](d);
        return d
    }
    uc.base64 = function(a) {
        for (var b = "", c, d, e, f, g, h, k = 0; k < a.length; )
            c = a.charCodeAt(k++),
            d = a.charCodeAt(k++),
            e = a.charCodeAt(k++),
            f = c >> 2,
            c = (c & 3) << 4 | d >> 4,
            g = (d & 15) << 2 | e >> 6,
            h = e & 63,
            isNaN(d) ? g = h = 64 : isNaN(e) && (h = 64),
            b = b + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(f) + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(c) + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(g) + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(h);
        return b
    }
    ;
    wc.base64 = function(a) {
        var b = "", c, d, e, f, g, h = 0, k = {
            A: 0,
            B: 1,
            C: 2,
            D: 3,
            E: 4,
            F: 5,
            G: 6,
            H: 7,
            I: 8,
            J: 9,
            K: 10,
            L: 11,
            M: 12,
            N: 13,
            O: 14,
            P: 15,
            Q: 16,
            R: 17,
            S: 18,
            T: 19,
            U: 20,
            V: 21,
            W: 22,
            X: 23,
            Y: 24,
            Z: 25,
            a: 26,
            b: 27,
            c: 28,
            d: 29,
            e: 30,
            f: 31,
            g: 32,
            h: 33,
            i: 34,
            j: 35,
            k: 36,
            l: 37,
            m: 38,
            n: 39,
            o: 40,
            p: 41,
            q: 42,
            r: 43,
            s: 44,
            t: 45,
            u: 46,
            v: 47,
            w: 48,
            x: 49,
            y: 50,
            z: 51,
            0: 52,
            1: 53,
            2: 54,
            3: 55,
            4: 56,
            5: 57,
            6: 58,
            7: 59,
            8: 60,
            9: 61,
            "+": 62,
            "/": 63,
            "=": 64
        };
        for (a = a.replace(/[^A-Za-z0-9\-_\=\+\/]/g, ""); h < a.length; )
            c = k[a.charAt(h++)],
            d = k[a.charAt(h++)],
            f = k[a.charAt(h++)],
            g = k[a.charAt(h++)],
            c = c << 2 | d >> 4,
            d = (d & 15) << 4 | f >> 2,
            e = (f & 3) << 6 | g,
            b += String.fromCharCode(c),
            64 !== f && (b += String.fromCharCode(d)),
            64 !== g && (b += String.fromCharCode(e));
        return b
    }
    ;
    uc.ascii85 = function(a) {
        for (var b = "", c, d, e, f, g, h, k, l, m = 0; m < a.length; )
            c = a.charCodeAt(m++),
            d = a.charCodeAt(m++),
            e = a.charCodeAt(m++),
            f = a.charCodeAt(m++),
            g = (c << 24 | d << 16 | e << 8 | f) >>> 0,
            c = (g / 52200625 | 0) % 85 + 33,
            h = (g / 614125 | 0) % 85 + 33,
            k = (g / 7225 | 0) % 85 + 33,
            l = (g / 85 | 0) % 85 + 33,
            g = g % 85 + 33,
            (118 < c || 118 < h || 118 < k || 118 < l || 118 < g) && console.log(c, h, k, l, g),
            (33 > c || 33 > h || 33 > k || 33 > l || 33 > g) && console.log(c, h, k, l, g),
            b += String.fromCharCode(c) + String.fromCharCode(h),
            isNaN(d) || (b += String.fromCharCode(k),
            isNaN(e) || (b += String.fromCharCode(l),
            isNaN(f) || (b += String.fromCharCode(g))));
        return b + "~>"
    }
    ;
    uc.utf8 = function(a) {
        for (var b = "", c = 0; c < a.length; c++) {
            var d = a.charCodeAt(c);
            128 > d ? b += String.fromCharCode(d) : (127 < d && 2048 > d ? b += String.fromCharCode(d >> 6 | 192) : (b += String.fromCharCode(d >> 12 | 224),
            b += String.fromCharCode(d >> 6 & 63 | 128)),
            b += String.fromCharCode(d & 63 | 128))
        }
        return b
    }
    ;
    wc.utf8 = function(a) {
        for (var b = "", c = 0; c < a.length; c++) {
            var d = a.charCodeAt(c);
            127 >= d ? b += String.fromCharCode(d) : 2047 >= a ? (b += String.fromCharCode(192 | a >> 6),
            b += String.fromCharCode(128 | a & 63)) : 65535 >= a ? (b += String.fromCharCode(224 | a >> 12),
            b += String.fromCharCode(128 | a >> 6 & 63),
            b += String.fromCharCode(128 | a & 63)) : 1114111 >= a ? (b += String.fromCharCode(240 | a >> 18),
            b += String.fromCharCode(128 | a >> 12 & 63),
            b += String.fromCharCode(128 | a >> 6 & 63),
            b += String.fromCharCode(128 | a & 63)) : b += String.fromCharCode(63)
        }
        return b
    }
    ;
    wc.utf8 = function(a) {
        for (var b = "", c = 0; c < a.length; c++) {
            var d = a.charCodeAt(c);
            128 > d ? b += String.fromCharCode(d) : (127 < d && 2048 > d ? b += String.fromCharCode(d >> 6 | 192) : (b += String.fromCharCode(d >> 12 | 224),
            b += String.fromCharCode(d >> 6 & 63 | 128)),
            b += String.fromCharCode(d & 63 | 128))
        }
        return b
    }
    ;
    uc.hex = function(a) {
        for (var b = [], c = 0; c < a.length; c++) {
            var d = a.charCodeAt(c);
            16 > d && b.push("0");
            b.push(d.toString(16))
        }
        return b.join("")
    }
    ;
    uc.sha1 = function(a) {
        var b = [1518500249, 1859775393, 2400959708, 3395469782];
        a += String.fromCharCode(128);
        for (var c = Math.ceil((a.length / 4 + 2) / 16), d = Array(c), e = 0; e < c; e++) {
            d[e] = Array(16);
            for (var f = 0; 16 > f; f++)
                d[e][f] = a.charCodeAt(64 * e + 4 * f) << 24 | a.charCodeAt(64 * e + 4 * f + 1) << 16 | a.charCodeAt(64 * e + 4 * f + 2) << 8 | a.charCodeAt(64 * e + 4 * f + 3)
        }
        d[c - 1][14] = 8 * (a.length - 1) / Math.pow(2, 32);
        d[c - 1][14] = Math.floor(d[c - 1][14]);
        d[c - 1][15] = 8 * (a.length - 1) & 4294967295;
        a = 1732584193;
        for (var f = 4023233417, g = 2562383102, h = 271733878, k = 3285377520, l = Array(80), m, q, r, u, w, e = 0; e < c; e++) {
            for (var v = 0; 16 > v; v++)
                l[v] = d[e][v];
            for (v = 16; 80 > v; v++)
                m = l[v - 3] ^ l[v - 8] ^ l[v - 14] ^ l[v - 16],
                l[v] = m << 1 | m >>> 31;
            m = a;
            q = f;
            r = g;
            u = h;
            w = k;
            for (v = 0; 80 > v; v++) {
                var z = Math.floor(v / 20), W;
                a: {
                    switch (z) {
                    case 0:
                        W = q & r ^ ~q & u;
                        break a;
                    case 1:
                        W = q ^ r ^ u;
                        break a;
                    case 2:
                        W = q & r ^ q & u ^ r & u;
                        break a;
                    case 3:
                        W = q ^ r ^ u;
                        break a
                    }
                    W = void 0
                }
                z = (m << 5 | m >>> 27) + W + w + b[z] + l[v] & 4294967295;
                w = u;
                u = r;
                r = q << 30 | q >>> 2;
                q = m;
                m = z
            }
            a = a + m & 4294967295;
            f = f + q & 4294967295;
            g = g + r & 4294967295;
            h = h + u & 4294967295;
            k = k + w & 4294967295
        }
        return String.fromCharCode(a >> 24 & 255) + String.fromCharCode(a >> 16 & 255) + String.fromCharCode(a >> 8 & 255) + String.fromCharCode(a >> 0 & 255) + String.fromCharCode(f >> 24 & 255) + String.fromCharCode(f >> 16 & 255) + String.fromCharCode(f >> 8 & 255) + String.fromCharCode(f >> 0 & 255) + String.fromCharCode(g >> 24 & 255) + String.fromCharCode(g >> 16 & 255) + String.fromCharCode(g >> 8 & 255) + String.fromCharCode(g >> 0 & 255) + String.fromCharCode(h >> 24 & 255) + String.fromCharCode(h >> 16 & 255) + String.fromCharCode(h >> 8 & 255) + String.fromCharCode(h >> 0 & 255) + String.fromCharCode(k >> 24 & 255) + String.fromCharCode(k >> 16 & 255) + String.fromCharCode(k >> 8 & 255) + String.fromCharCode(k >> 0 & 255)
    }
    ;
    function yc(a, b, c) {
        this.name = a;
        this.aa = b;
        this.children = [];
        this.text = c
    }
    yc.prototype = {
        toString: function() {
            var a = [];
            zc(this, a, "");
            return xc("utf8", a.join(""))
        }
    };
    function Ac(a, b) {
        a.children.push(b)
    }
    function zc(a, b, c) {
        var d;
        b.push(c);
        b.push("<");
        b.push(a.name);
        for (d in a.aa)
            a.aa.hasOwnProperty(d) && (b.push(" "),
            b.push(d),
            void 0 !== a.aa[d] && null !== a.aa[d] && (b.push('="'),
            b.push(a.aa[d]),
            b.push('"')));
        if (a.children.length || void 0 !== a.text) {
            b.push(">\n");
            for (d = 0; d < a.children.length; d++)
                zc(a.children[d], b, c + "  ");
            void 0 !== a.text && b.push(c + "  " + a.text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;"));
            b.push(c + "</" + a.name + ">")
        } else
            b.push("/>");
        b.push("\n")
    }
    ;function Bc() {
        this.Dc = null;
        this.files = []
    }
    Bc.prototype = {
        he: function(a, b, c) {
            Cc({
                type: "changepassword",
                oldpassword: a,
                newpassword: b
            }, function(a) {
                c(a.status)
            })
        },
        aa: function(a) {
            this.Dc = a
        }
    };
    function Dc(a, b, c) {
        Cc({
            "function": "proxy",
            url: "http://openclipart.org/search/json/?query=" + encodeURIComponent(a) + "&page=" + encodeURIComponent(b)
        }, function(a) {
            a.json ? c(a.status, a.json) : c(a.status, null)
        })
    }
    function Ec(a, b, c) {
        Cc({
            type: "gettemporaryurl",
            filetype: a,
            document: b
        }, function(a) {
            "ok" === a.status ? c(a.status, {
                url: a.json.url
            }) : c(a.status, null)
        })
    }
    function Fc(a, b) {
        Cc({
            type: "readfile",
            id: a
        }, function(a) {
            "ok" === a.status ? b(a.status, {
                id: a.json.id,
                name: a.json.name,
                data: a.json.data,
                Jb: "1" === a.json.shared
            }) : b(a.status, null)
        })
    }
    function Gc(a, b, c) {
        Cc({
            type: "deletefile",
            id: b
        }, function(d) {
            if ("ok" === d.status)
                for (var e = 0; e < a.files.length; e++)
                    if (b === a.files[e].id) {
                        a.files.splice(e, 1);
                        break
                    }
            c(d.status)
        })
    }
    function Hc(a, b, c) {
        Cc({
            type: "updatefile",
            id: b.id,
            name: b.name,
            data: b.data,
            shared: b.Jb
        }, function(d) {
            if ("ok" === d.status)
                for (var e = 0; e < a.files.length; e++)
                    b.id === a.files[e].id && (a.files[e].name = b.name,
                    a.files[e].Jb = b.Jb);
            c(d.status)
        })
    }
    function Ic(a, b, c, d) {
        var e = Math.round((new Date).getTime() / 1E3);
        Cc({
            type: "createfile",
            name: b,
            data: c
        }, function(c) {
            "ok" === c.status ? (a.files.unshift({
                id: c.json.id,
                name: b,
                creationDate: e,
                modificationDate: e,
                shared: 0
            }),
            d(c.status, c.json.id)) : d(c.status, -1)
        })
    }
    function Jc(a, b) {
        Cc({
            type: "listfiles"
        }, function(c) {
            "ok" === c.status && (a.files = c.json.files,
            a.files.sort(function(a, b) {
                return parseInt(b.modificationDate, 10) - parseInt(a.modificationDate, 10)
            }));
            b(c.status)
        })
    }
    function Kc(a, b) {
        Cc({
            type: "logout"
        }, function(c) {
            "ok" === c.status && (a.Dc = null,
            a.files = []);
            b(c.status)
        })
    }
    function Lc(a, b, c, d) {
        Cc({
            type: "createuser",
            username: b,
            password: c
        }, function(c) {
            var f = null;
            if ("ok" === c.status) {
                a.Dc = b;
                for (var f = c.json.mapping, g = 0; g < a.files.length; g++)
                    a.files[g].id in f && (a.files[g].id = f[a.files[g].id])
            }
            d(c.status, f)
        })
    }
    function Mc(a, b, c, d) {
        Cc({
            type: "login",
            username: b,
            password: c
        }, function(c) {
            var f = null;
            if ("ok" === c.status) {
                a.Dc = b;
                a.files = c.json.files;
                a.files.sort(function(a, b) {
                    return parseInt(b.modificationDate, 10) - parseInt(a.modificationDate, 10)
                });
                for (var f = c.json.mapping, g = 0; g < a.files.length; g++)
                    a.files[g].id in f && (a.files[g].id = f[a.files[g].id])
            }
            d(c.status, f)
        })
    }
    function Cc(a, b) {
        var c;
        try {
            c = new XMLHttpRequest
        } catch (g) {
            try {
                c = new ActiveXObject("Msxml2.XMLHTTP")
            } catch (h) {
                try {
                    c = new ActiveXObject("Microsoft.XMLHTTP")
                } catch (k) {
                    c = null
                }
            }
        }
        c.open("POST", "index.php", !0);
        c.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        c.onreadystatechange = function() {
            if (4 === c.readyState) {
                var a = {
                    status: "",
                    json: null
                };
                if (200 === c.status)
                    try {
                        var d = c.responseText.replace(/[\n\r]/g, "");
                        a.json = eval("(" + d + ")");
                        a.status = a.json.status
                    } catch (e) {
                        alert(e),
                        a.status = "Error in server response"
                    }
                else
                    c.message ? a.status = c.message : a.status = 0 === c.status ? "Network error. Check internet connection" : "Server returned status " + c.status;
                b(a)
            }
        }
        ;
        var d = "", e = !0, f;
        for (f in a)
            a.hasOwnProperty(f) && (e || (d += "&"),
            e = !1,
            d += f + "=" + escape(a[f]));
        c.send(d)
    }
    ;function Nc(a, b, c, d, e) {
        this.Va = a || "transparent";
        this.left = b || 0;
        this.top = c || 0;
        this.right = d || 0;
        this.bottom = e || 0;
        this.aa = 1;
        this.insertBefore = null
    }
    Nc.prototype.sa = function() {
        this.ha.remove()
    }
    ;
    Nc.prototype.show = function(a) {
        this.ha = x("<div>");
        this.ha.ga("position", "fixed");
        this.ha.ga("background", this.Va);
        this.ha.ga("opacity", "0.25");
        this.ha.ga("left", "" + this.left + "px");
        this.ha.ga("top", "" + this.top + "px");
        this.ha.ga("right", "" + this.right + "px");
        this.ha.ga("bottom", "" + this.bottom + "px");
        this.ha.ga("display", "none");
        this.ha.click(function(b) {
            a(b)
        });
        this.insertBefore ? (this.ha.ga("z-index", "" + this.aa),
        Pa(x(this.ha), this.insertBefore)) : (this.ha.ga("z-index", "" + this.aa),
        x("body").append(this.ha));
        Da(this.ha)
    }
    ;
    function N(a) {
        this.name = a;
        N.Fb.constructor.call(this);
        "string" === typeof this.name ? this.ha = x("#" + this.name) : (this.ha = Na(x("<div>"), "dialog"),
        x(document.body).append(this.ha),
        this.ha.ga("z-index", "2"));
        this.aa = null
    }
    ba(N, J);
    N.prototype.log = t("Dialog");
    N.prototype.show = function() {
        O && O.sa();
        this.log("Set Dialog.current");
        O = this;
        this.aa = new Nc("black");
        this.aa.aa = this.ha.ga("z-index") - 1;
        this.aa.show(p(function() {
            return this.sa()
        }, this));
        this.ha.show();
        this.wb();
        return this.on("cancel", p(function() {
            return this.sa()
        }, this))
    }
    ;
    N.prototype.wb = function() {
        var a, b;
        b = x(window).width();
        a = x(window).height();
        this.ha.ga("left", "" + (b / 2 - this.ha.outerWidth() / 2) + "px");
        return this.ha.ga("top", "" + (a / 2 - this.ha.outerHeight() / 2) + "px")
    }
    ;
    N.prototype.sa = function() {
        if (O === this)
            return this.aa.sa(),
            this.ha.sa(),
            O = null,
            this.log("Clear Dialog.current"),
            this.emit("hide")
    }
    ;
    var O = null;
    La(x(document), function(a) {
        if (null !== O && 27 === a.keyCode)
            return O.emit("cancel")
    });
    x(window).resize(function() {
        if (O)
            return O.wb()
    });
    function Pc(a) {
        J.call(this);
        this.ha = a;
        this.na = !1;
        a.ga("display", "none");
        this.right = !0;
        a: {
            a = (document.body || document.documentElement).style;
            for (var b = "transition", c = ["Moz", "Webkit", "Khtml", "O", "ms"], b = b.charAt(0).toUpperCase() + b.substr(1), d = 0; d < c.length; d++)
                if ("string" === typeof a[c[d] + b]) {
                    Qc = c[d];
                    a = !0;
                    break a
                }
            a = !1
        }
        this.ka = a;
        this.qa = Qc;
        this.da = null;
        this.ka && (a = this.ha.outerWidth(),
        this.ga("TransitionProperty", "transform"),
        this.ga("Transform", "translate(" + a + "px,0)"));
        this.body = x(".body")
    }
    var Qc;
    Pc.prototype = {
        log: t("SlidingPanel", !1),
        show: function(a, b) {
            var c = this;
            this.da && (clearTimeout(this.da),
            this.da = null);
            !1 !== b && (b = !0);
            this.na = !0;
            this.ha.show();
            var d = this.ha.outerWidth();
            this.ha.sa();
            "right" === a ? (this.left = !1,
            this.ha.ga("left", "" + (x(window).width() - d) + "px")) : this.left = !0;
            b && (c.aa = new Nc,
            c.aa.aa = c.ha.ga("z-index"),
            c.aa.insertBefore = c.ha,
            c.aa.show(function() {
                c.sa()
            }));
            c.ka ? (this.log("Performing transition"),
            c.ha.ga("display", "block"),
            c.left ? c.ga("Transform", "translate(-" + d + "px,0)") : c.ga("Transform", "translate(" + d + "px,0)"),
            c.ga("TransitionDuration", "200ms"),
            c.ga("TransitionDuration", "200ms", c.body),
            window.setTimeout(function() {
                c.ga("Transform", "translate(0,0)");
                c.ga("Transform", "translate(" + (c.left ? d : -d) + "px,0)", c.body);
                window.setTimeout(function() {
                    Rc(c)
                }, 200)
            }, 1)) : (this.log("No transitions allowed"),
            c.ha.ga("display", "block"),
            Rc(c))
        },
        ga: function(a, b, c) {
            c = c || this.ha;
            a = "" !== this.qa ? this.qa + a : a.charAt(0).toLowerCase() + a.substr(1);
            c[0].style[a] = b;
            this.log("%s=%s", a, b)
        },
        qb: function() {
            return this.na
        },
        sa: function() {
            var a = this;
            if (!this.da) {
                this.na = !1;
                a.aa && a.aa.sa();
                var b = this.ha.outerWidth();
                a.ka ? this.left ? a.ga("Transform", "translate(-" + b + "px,0)") : a.ga("Transform", "translate(" + b + "px,0)") : a.ha.ga("display", "none");
                a.ga("Transform", "translate(0,0)", this.body);
                a.ka ? this.da = window.setTimeout(function() {
                    a.ha.ga("display", "none");
                    a.emit("hide")
                }, 200) : a.emit("hide")
            }
        }
    };
    function Rc(a) {
        console.log("Set focus on ", a.ha.find(".focus"));
        a.ha.find(".focus").focus();
        a.emit("show")
    }
    Pc.prototype = x.aa({}, J.prototype, Pc.prototype);
    function Vc(a) {
        if ("string" === typeof a) {
            for (; 8 > a.length; )
                a += a;
            for (var b = 16777619, c = 0; c < a.length; c++)
                b = (16777619 * b ^ a.charCodeAt(c)) & 4294967295;
            a = b
        }
        this.da = a;
        this.reset()
    }
    Vc.prototype = {
        reset: function() {
            this.ba = this.aa = this.da
        },
        next: function() {
            this.ba = 36969 * (this.ba & 65535) + (this.ba >> 16);
            this.aa = 18E3 * (this.aa & 65535) + (this.aa >> 16);
            return ((this.ba << 16) + this.aa) / 4294967295 / 2 + .5
        }
    };
    function Wc(a, b) {
        for (var c in a)
            a.hasOwnProperty(c) && !b.hasOwnProperty(c) && (b[c] = a[c])
    }
    ;function Xc(a, b) {
        cc.apply(this, arguments);
        var c = this;
        this.ha.ga("background", "black");
        this.ha.ga("font-family", '"Lucida Console","Dejavu Sans Mono",Monospace,"Courier New"');
        this.ha.ga("font-size", "10px");
        this.ha.ga("line-height", "12px");
        this.ha.ga("overflow", "scroll");
        this.ha.ga("cursor", "default");
        this.qa = 0;
        this.na = {};
        this.qb = !1;
        this.ua = ka(function(a, b) {
            return Yc(c, a, b)
        });
        b.add(function() {
            for (var a = c.ua, b = 0; b < ja.length; b++)
                if (ja[b] === a) {
                    ja.splice(b, 1);
                    break
                }
        });
        this.da = null;
        this.ba = [];
        Yc(this, "DEBUG", "Debug window starting")
    }
    Xc.prototype = {
        aa: "#ffffff #008800 #008888 #880000 #880088 #884400 #888888 #444444 #0000ff #00ff00 #00ffff #ff0000 #ff00ff #ffff00".split(" "),
        show: function() {
            cc.prototype.show.call(this);
            this.qb = !0;
            Zc(this);
            this.ha[0].scrollTop = this.ha[0].scrollHeight
        },
        sa: function() {
            this.qb = !1;
            cc.prototype.sa.call(this)
        }
    };
    function Zc(a) {
        var b, c, d, e, f, g;
        g = a.ba;
        e = 0;
        for (f = g.length; e < f; e++) {
            c = g[e];
            d = c.key;
            c = c.Ng;
            b = a;
            var h = d;
            h in b.na || (b.na[h] = b.aa[b.qa],
            b.qa = (b.qa + 1) % b.aa.length);
            b = b.na[h];
            b = x("<div>").ga("color", b);
            b.ga("border-bottom", "1px solid #222");
            b.text("" + d + ": " + c);
            a.ha.append(b)
        }
        a.ha[0].scrollTop = a.ha[0].scrollHeight;
        a.da = null;
        a.ba.length = 0
    }
    function Yc(a, b, c) {
        var d, e, f;
        f = c.split("\n");
        d = 0;
        for (e = f.length; d < e; d++)
            c = f[d],
            a.ba.push({
                key: b,
                Ng: c
            });
        a.qb && null === a.da && (a.da = setTimeout(function() {
            return Zc(a)
        }, 100))
    }
    Wc(cc.prototype, Xc.prototype);
    function $c(a, b) {
        J.call(this);
        this.gc = b;
        this.ha = document.createElement("div");
        this.ha.style.width = b + "px";
        this.ha.style.height = "320px";
        this.ha.style.border = "none";
        this.ha.style.backgroundColor = "#ffffff";
        this.ha.style.MozUserSelect = "none";
        this.ha.style.WebkitUserSelect = "none";
        this.ha.style.aa = "none";
        this.ha.style.ka = "none";
        this.da = {};
        this.ka = 1;
        this.buttons = [];
        this.aa = 0
    }
    $c.prototype = {
        width: function() {
            return parseInt(this.ha.style.width, 10)
        },
        focus: function(a) {
            0 < this.buttons.length && (0 < arguments.length && (ad(this, !1),
            this.aa = a),
            ad(this, !0))
        },
        blur: function() {
            0 < this.buttons.length && ad(this, !1)
        },
        vb: function(a, b) {
            if (0 !== this.buttons.length) {
                var c = "next" === a || "previous" === a;
                c && ad(this, !1);
                switch (a) {
                case "next":
                    this.aa = Math.min(this.aa + 1, this.buttons.length - 1);
                    break;
                case "previous":
                    this.aa = Math.max(this.aa - 1, 0);
                    break;
                case "enter":
                    this.buttons[this.aa].kg(b)
                }
                c && (ad(this, !0),
                b.stopPropagation(),
                b.preventDefault())
            }
        },
        moveTo: function(a, b) {
            x(this.ha).ga("left", "" + a + "px");
            x(this.ha).ga("top", "" + b + "px")
        },
        show: function(a) {
            this.ha.style.display = a || 0 === arguments.length ? "block" : "none"
        },
        log: t("TOOLBAR"),
        Kb: function(a, b, c) {
            function d() {
                var a = e.style.background;
                e.style.background = "#e7d69f";
                f.style.background = "#e7d69f";
                var b = e.style.background;
                setTimeout(function() {
                    e.style.background === b && (e.style.background = a,
                    f.style.background = a)
                }, 200)
            }
            var e = document.createElement("div")
              , f = document.createElement("img")
              , g = this;
            e.style.display = "inline";
            e.style.cssFloat = "left";
            e.style.overflow = "hidden";
            e.style.width = this.gc + "px";
            e.style.height = this.gc + "px";
            e.style.margin = "1px";
            f.src = a;
            f.ha = e;
            f.style.cursor = "hand";
            f.setAttribute("title", b);
            f.style.maxWidth = this.gc + "px";
            f.style.maxHeight = this.gc + "px";
            f.draggable = !1;
            e.appendChild(f);
            x(f).bind("load", function() {
                g.log("Toolbar image loaded; %sx%s", f.width, f.height);
                var a = (this.gc - f.height) / 2;
                f.style.marginLeft = (this.gc - f.width) / 2 + "px";
                f.style.marginTop = a + "px"
            });
            this.ha.appendChild(e);
            var h = this.buttons.length;
            c && (x(e).bind("touchstart", function(a) {
                a.preventDefault();
                g.log("Got touchstart");
                d();
                c(a);
                g.emit("click", a)
            }),
            x(e).click(function(a) {
                g.log("Got a click");
                d();
                c(a);
                g.focus(h);
                g.emit("click", a)
            }));
            this.ka += this.gc + 1;
            this.buttons.push({
                element: e,
                kg: c
            });
            return f
        }
    };
    function bd(a, b) {
        for (var c in a.da)
            a.da.hasOwnProperty(c) && (a.da[c].ha.style.background = "#ffffff",
            a.da[c].style.background = "#ffffff");
        b in a.da ? (c = a.da[b],
        a.log("Highlight %s", b),
        c.ha.style.background = "#9fb3e7",
        c.style.background = "#9fb3e7") : a.log("Failed to highlight %s", b)
    }
    function cd(a, b, c, d, e) {
        a.da[b] = a.Kb(d, c, e)
    }
    function ad(a, b) {
        a.buttons[a.aa].element.style.outline = b ? "1px dotted gray" : "none"
    }
    Wc(J.prototype, $c.prototype);
    function dd() {
        J.call(this);
        ed(this)
    }
    dd.prototype = {
        log: t("KEYMAP"),
        map: function(a, b) {
            var c = a.toLowerCase().split(","), d;
            if ("string" === typeof b) {
                var e = b.split(",");
                for (d = 0; d < c.length; d++)
                    for (var f = 0; f < e.length; f++)
                        fd(this, c[d], e[f])
            } else
                for (d = 0; d < c.length; d++)
                    fd(this, c[d], b)
        },
        translate: function(a) {
            var b = []
              , c = "";
            a.keyCode && (c += a.keyCode);
            a.shiftKey && (c += "-shift");
            a.ctrlKey && (c += "-control");
            a.altKey && (c += "-alt");
            a.metaKey && (c += "-meta");
            a = c;
            a in this.keys && (b = this.keys[a]);
            this.log("%s", a);
            return b
        },
        Ab: function(a, b) {
            for (var c = this.translate(a), d = 0; d < c.length; d++)
                b(c[d])
        },
        detach: function(a) {
            x(a).Tc("keydown", this.Hd)
        }
    };
    function gd(a, b) {
        x(b).bind("keydown", a.Hd)
    }
    function fd(a, b, c) {
        if (0 !== b.length) {
            var d = b.match(a.aa) || [], e = !1, f = !1, g = !1, h = !1, k = [], l;
            for (l = 0; l < d.length; l++)
                switch (d[l]) {
                case "alt":
                    g = !0;
                    break;
                case "control":
                case "ctrl":
                    f = !0;
                    break;
                case "shift":
                    e = !0;
                    break;
                case "shift":
                    e = !0;
                    break;
                case "home":
                    k.push(36);
                    break;
                case "end":
                    k.push(35);
                    break;
                case "pageup":
                    k.push(33);
                    break;
                case "pagedown":
                    k.push(34);
                    break;
                case "delete":
                case "del":
                    k.push(46);
                    break;
                case "backspace":
                    k.push(8);
                    break;
                case "up":
                    k.push(38);
                    break;
                case "right":
                    k.push(39);
                    break;
                case "down":
                    k.push(40);
                    break;
                case "left":
                    k.push(37);
                    break;
                case "escape":
                case "esc":
                    k.push(27);
                    break;
                case "enter":
                    k.push(13);
                    break;
                case "ins":
                case "insert":
                    k.push(45);
                    break;
                case "f4":
                    k.push(115);
                    break;
                case "meta":
                case "command":
                case "cmd":
                case "\u2318":
                    h = !0;
                    break;
                default:
                    alert("key entry not found: " + d[l])
                }
            d = function(b) {
                e && -1 === b.indexOf("-shift") && (b += "-shift");
                f && -1 === b.indexOf("-control") && (b += "-control");
                g && -1 === b.indexOf("-alt") && (b += "-alt");
                h && -1 === b.indexOf("-meta") && (b += "-meta");
                "string" === typeof c ? a.log("Keyboard mapping: %s->%s", b, c) : a.log("Keyboard mapping: %s->%s", b, "function()");
                if (b in a.keys) {
                    for (var d = 0, k = a.keys[b], d = 0; d < k.length && k[d] !== c; d++)
                        ;
                    d === k.length && a.keys[b].push(c)
                } else
                    a.keys[b] = [c]
            }
            ;
            if (0 === k.length)
                switch (b = b.toUpperCase().charAt(b.length - 1),
                b) {
                case "=":
                    d("107-shift");
                    d("187");
                    d("61");
                    break;
                case "+":
                    d("107");
                    d("61-shift");
                    break;
                case "-":
                    d("109");
                    d("189");
                    d("173");
                    break;
                default:
                    k.push(b.charCodeAt(0))
                }
            for (l = 0; l < k.length; l++)
                d("" + k[l])
        }
    }
    function ed(a) {
        a.keys = {};
        a.Xa = !0;
        a.aa = new RegExp("alt backspace cmd command control ctrl del delete down end enter esc escape f4 home ins insert left meta pagedown pageup right shift up \u2318".split(" ").sort(function(a, c) {
            return c.length - a.length
        }).join("|"),"g");
        a.Hd = function(b) {
            for (var c = a.translate(b), d = 0; d < c.length; d++)
                if ("string" === typeof c[d])
                    a.log("action: %s", c[d]),
                    a.Jc("*", c[d], b);
                else
                    c[d](b)
        }
    }
    Wc(J.prototype, dd.prototype);
    function hd(a) {
        var b = document.createElement("input");
        x(b).fb("type", "range");
        if ("range" === b.type)
            return b.hh = function(a, c) {
                b.min = a;
                b.max = c
            }
            ,
            b.Hg = function() {
                return b.value
            }
            ,
            b.Ye = function(a) {
                b.value = a
            }
            ,
            b;
        var c = x("<div>");
        c.ga("display", "inline-block");
        c.ga("vertical-align", "top");
        c.ga("height", "1em");
        c.ga("width", "10em");
        c.ga("padding", "0.25em");
        c.ga("position", "relative");
        var d = x("<div>");
        d.ga("top", "50%");
        d.ga("height", "0");
        d.ga("border-top", "1px solid black");
        d.ga("border-bottom", "1px solid #888888");
        d.ga("position", "absolute");
        d.ga("left", "0");
        d.ga("right", "0");
        var e = x("<div>");
        e.ga("height", "1em");
        e.ga("left", "0px");
        e.ga("background", "#888888");
        e.ga("border-top", "1px solid #cccccc");
        e.ga("border-left", "1px solid #cccccc");
        e.ga("border-bottom", "1px solid #000000");
        e.ga("border-right", "1px solid #000000");
        e.ga("width", "0.5em");
        e.ga("position", "absolute");
        e.ga("cursor", "pointer");
        c.append(d);
        c.append(e);
        c[0].type = "range";
        c[0].min = 0;
        c[0].max = 100;
        c[0].value = 0;
        c[0].onchange = function() {}
        ;
        c[0].hh = function(a, b) {
            c[0].min = a;
            c[0].max = b
        }
        ;
        c[0].Ye = function(a) {
            c[0].value = a;
            var b = c.width() - e.width();
            a = a / c[0].max * b;
            a = Math.round(a);
            a = Math.max(a, 0);
            a = Math.min(a, c.width());
            e.ga("left", "" + a + "px")
        }
        ;
        c[0].Hg = function() {
            return c[0].value
        }
        ;
        var f, g, h, k = t("RANGE");
        Ka(x(e), function(a) {
            h = !0;
            f = a.pageX;
            g = parseInt(e.ga("left"), 10);
            k("Mousedown at %s, ox=%s", f, g);
            a.stopPropagation();
            a.preventDefault()
        });
        Ka(x(c), function(a) {
            var b = c.width() - e.width()
              , d = a.pageX - x(c).offset().left
              , d = Math.max(d, 0)
              , d = Math.min(d, b);
            e.ga("left", "" + d + "px");
            f = a.pageX;
            g = d;
            d = d / b * (c[0].max - c[0].min) + c[0].min;
            d = Math.round(d);
            c[0].value = d;
            c[0].onchange();
            h = !0
        });
        Ia(x(c), function(a) {
            if (h) {
                var b = c.width() - e.width();
                a = a.pageX - f + g;
                a = Math.max(a, 0);
                a = Math.min(a, b);
                e.ga("left", "" + a + "px");
                a = a / b * (c[0].max - c[0].min) + c[0].min;
                a = Math.round(a);
                c[0].value = a;
                c[0].onchange()
            }
        });
        a.bind(x(document.body), "mouseup", function() {
            h = !1
        });
        return c[0]
    }
    ;var ab = t("Graphics", !0);
    function A(a, b) {
        this.x = a;
        this.y = b
    }
    A.prototype.kb = function(a) {
        return Math.sqrt((a.x - this.x) * (a.x - this.x) + (a.y - this.y) * (a.y - this.y))
    }
    ;
    A.prototype.toString = function() {
        return "(" + this.x + ", " + this.y + ")"
    }
    ;
    A.prototype.ic = function(a) {
        return this.x === a.x && this.y === a.y
    }
    ;
    A.prototype.clone = function() {
        return new A(this.x,this.y)
    }
    ;
    function id(a, b, c) {
        var d = b.x;
        b = b.y;
        var e = a.x;
        a = a.y;
        var f = c.x - d;
        c = c.y - b;
        var g = ((e - d) * f + (a - b) * c) / (f * f + c * c);
        1 < g ? g = 1 : 0 > g && (g = 0);
        d = d + g * f - e;
        b = b + g * c - a;
        return Math.sqrt(d * d + b * b)
    }
    function jd(a, b) {
        this.width = a;
        this.height = b
    }
    function Nb(a, b, c, d) {
        return Math.sqrt((a - c) * (a - c) + (b - d) * (b - d))
    }
    function K(a, b, c, d) {
        var e = Nb(a, b, c, d);
        return 0 === e ? {
            x: 1,
            y: 0
        } : {
            x: (c - a) / e,
            y: (d - b) / e
        }
    }
    function kd(a) {
        a.x *= -1;
        a.y *= -1;
        return a
    }
    function P(a, b, c, d) {
        this.x = a;
        this.y = b;
        this.width = c;
        this.height = d;
        ld(this)
    }
    function md(a) {
        if (0 === a.length)
            return new P(0,0,0,0);
        for (var b = a[0].x, c = a[0].x, d = a[0].y, e = a[0].y, f = 1; f < a.length; f++)
            a[f].x < b && (b = a[f].x),
            a[f].x > c && (c = a[f].x),
            a[f].y < d && (d = a[f].y),
            a[f].y > e && (e = a[f].y);
        return new P(b,d,c - b,e - d)
    }
    P.prototype = {
        save: function() {
            return {
                x: this.x,
                y: this.y,
                width: this.width,
                height: this.height
            }
        },
        clone: function() {
            return new P(this.x,this.y,this.width,this.height)
        },
        ic: function(a) {
            return this.x === a.x && this.y === a.y && this.width === a.width && this.height === a.height
        },
        contains: function(a) {
            return this.x <= a.x && this.x + this.width > a.x + a.width && this.y <= a.y && this.y + this.height > a.y + a.height
        },
        Wb: function(a, b, c) {
            c = c || 0;
            return this.x - c <= a && this.x + this.width + c > a && this.y - c <= b && this.y + this.height + c > b
        },
        dc: function(a, b) {
            void 0 === b && (b = a);
            this.x -= a / 2;
            this.y -= b / 2;
            this.width += a;
            this.height += b
        },
        transform: function(a) {
            var b, c, d;
            b = a.apply(this.x, this.y);
            c = a.apply(this.x + this.width, this.y);
            d = a.apply(this.x + this.width, this.y + this.height);
            a = a.apply(this.x, this.y + this.height);
            this.x = Math.min(b.x, c.x, d.x, a.x);
            this.y = Math.min(b.y, c.y, d.y, a.y);
            this.width = Math.max(b.x, c.x, d.x, a.x) - this.x;
            this.height = Math.max(b.y, c.y, d.y, a.y) - this.y
        },
        right: function() {
            return this.x + this.width
        },
        bottom: function() {
            return this.y + this.height
        },
        toString: function() {
            return "Rectangle(" + this.x + ", " + this.y + ", " + this.width + ", " + this.height + ")"
        }
    };
    function nd(a) {
        return new A(a.x + a.width / 2,a.y + a.height / 2)
    }
    function ld(a) {
        0 > a.width && (a.x += a.width,
        a.width = -a.width);
        0 > a.height && (a.y += a.height,
        a.height = -a.height)
    }
    function od(a, b, c) {
        b < a.x ? (a.width += a.x - b,
        a.x = b) : b > a.x + a.width && (a.width = b - a.x);
        c < a.y ? (a.height += a.y - c,
        a.y = c) : c > a.y + a.height && (a.height = c - a.y)
    }
    function pd(a, b) {
        b.x < a.x && (a.width += a.x - b.x,
        a.x = b.x);
        b.y < a.y && (a.height += a.y - b.y,
        a.y = b.y);
        b.x + b.width > a.x + a.width && (a.width += b.x + b.width - a.x - a.width);
        b.y + b.height > a.y + a.height && (a.height += b.y + b.height - a.y - a.height)
    }
    function qd(a, b, c) {
        var d = Math.cos(a)
          , e = Math.sin(a);
        this.m11 = d;
        this.m12 = e;
        this.m21 = -e;
        this.m22 = d;
        this.Da = -b * d - c * e + b;
        this.Ea = b * e - c * d + c;
        this.aa = a;
        this.x = b;
        this.y = c
    }
    qd.prototype.inverse = function() {
        return new qd(-this.aa,this.x,this.y)
    }
    ;
    function F(a, b) {
        this.m11 = 1;
        this.m21 = this.m12 = 0;
        this.m22 = 1;
        this.Da = a;
        this.Ea = b
    }
    F.prototype.inverse = function() {
        return new F(-this.Da,-this.Ea)
    }
    ;
    function Q(a) {
        if (0 === arguments.length)
            this.m11 = 1,
            this.m21 = this.m12 = 0,
            this.m22 = 1,
            this.Ea = this.Da = 0;
        else if (1 === arguments.length) {
            if (6 !== arguments[0].length)
                throw "Bad array initializer for Matrix.";
            this.m11 = arguments[0][0];
            this.m12 = arguments[0][1];
            this.m21 = arguments[0][2];
            this.m22 = arguments[0][3];
            this.Da = arguments[0][4];
            this.Ea = arguments[0][5]
        } else if (6 === arguments.length)
            this.m11 = arguments[0],
            this.m12 = arguments[1],
            this.m21 = arguments[2],
            this.m22 = arguments[3],
            this.Da = arguments[4],
            this.Ea = arguments[5];
        else
            throw "Bad initializer for Matrix.";
    }
    Q.prototype = {
        log: t("MATRIX"),
        toString: function() {
            return "[ " + this.m11 + " " + this.m12 + " " + this.Da + "    " + this.m21 + " " + this.m22 + " " + this.Ea + "    0 0 1 ]"
        },
        Rb: function() {
            return [this.m11, this.m12, this.m21, this.m22, this.Da, this.Ea]
        },
        ic: function(a) {
            return this.m11 === a.m11 && this.m12 === a.m12 && this.m21 === a.m21 && this.m22 === a.m22 && this.Da === a.Da && this.Ea === a.Ea
        },
        multiply: function(a) {
            var b = new Q;
            b.m11 = this.m11 * a.m11 + this.m12 * a.m21;
            b.m21 = this.m21 * a.m11 + this.m22 * a.m21;
            b.m12 = this.m11 * a.m12 + this.m12 * a.m22;
            b.m22 = this.m21 * a.m12 + this.m22 * a.m22;
            b.Da = this.m11 * a.Da + this.m12 * a.Ea + this.Da;
            b.Ea = this.m21 * a.Da + this.m22 * a.Ea + this.Ea;
            return b
        },
        apply: function(a, b) {
            return new A(this.m11 * a + this.m12 * b + this.Da,this.m21 * a + this.m22 * b + this.Ea)
        },
        clone: function() {
            return new Q(this.m11,this.m12,this.m21,this.m22,this.Da,this.Ea)
        },
        inverse: function() {
            var a = this.m11 * this.m22 - this.m12 * this.m21;
            return new Q(this.m22 / a,-this.m12 / a,-this.m21 / a,this.m11 / a,(this.m12 * this.Ea - this.Da * this.m22) / a,(this.Da * this.m21 - this.m11 * this.Ea) / a)
        },
        translate: function(a, b) {
            return this.multiply(new F(a,b))
        },
        rotate: function(a, b, c) {
            return this.multiply(new qd(a,b,c))
        }
    };
    function rd(a) {
        var b = a.m11
          , c = a.m21
          , d = a.m12
          , e = a.m22
          , f = Math.sqrt(b * b + c * c)
          , g = Math.sqrt(d * d + e * e);
        return new Q(b / f,d / g,c / f,e / g,a.Da,a.Ea)
    }
    function sd(a, b) {
        b.transform(a.m11, a.m21, a.m12, a.m22, a.Da, a.Ea)
    }
    function td(a) {
        return 1 === a.m11 && 0 === a.m12 && 0 === a.m21 && 1 === a.m22 && 0 === a.Da && 0 === a.Ea
    }
    function jb(a, b, c, d) {
        void 0 === c ? (this.m11 = a,
        this.m21 = this.m12 = 0,
        this.m22 = b,
        this.ba = this.aa = this.Ea = this.Da = 0) : (this.m11 = a,
        this.m21 = this.m12 = 0,
        this.m22 = b,
        this.Da = c - a * c,
        this.Ea = d - b * d,
        this.aa = c,
        this.ba = d);
        this.da = a;
        this.ka = b
    }
    jb.prototype.inverse = function() {
        return new jb(1 / this.da,1 / this.ka,this.aa,this.ba)
    }
    ;
    Wc(Q.prototype, jb.prototype);
    Wc(Q.prototype, qd.prototype);
    function ud(a, b, c) {
        var d = Math.cos(2 * a)
          , e = Math.sin(2 * a);
        this.m11 = d;
        this.m21 = this.m12 = e;
        this.m22 = -d;
        this.Da = -b * d - c * e + b;
        this.Ea = -b * e + c * d + c;
        this.aa = a;
        this.x = b;
        this.y = c
    }
    ud.prototype.inverse = function() {
        return new ud(-this.aa,this.x,this.y)
    }
    ;
    Wc(Q.prototype, ud.prototype);
    Wc(Q.prototype, F.prototype);
    function vd(a, b, c, d, e, f, g, h, k, l) {
        if (!(8 < ++wd)) {
            var m = (b + d) / 2
              , q = (c + e) / 2
              , r = (d + f) / 2
              , u = (e + g) / 2
              , w = (f + h) / 2
              , v = (g + k) / 2
              , z = (m + r) / 2
              , W = (q + u) / 2
              , r = (r + w) / 2
              , u = (u + v) / 2
              , Jd = (z + r) / 2
              , Kd = (W + u) / 2
              , vc = h - b
              , Oc = k - c;
            d = Math.abs((d - h) * Oc - (e - k) * vc);
            f = Math.abs((f - h) * Oc - (g - k) * vc);
            (d + f) * (d + f) < l * (vc * vc + Oc * Oc) ? a.push(new A(Jd,Kd)) : (vd(a, b, c, m, q, z, W, Jd, Kd, l),
            vd(a, Jd, Kd, r, u, w, v, h, k, l))
        }
        --wd
    }
    var wd = 0;
    function xd(a, b, c, d, e, f, g, h) {
        if (!(8 < ++wd)) {
            var k = (b + d) / 2
              , l = (c + e) / 2
              , m = (d + f) / 2
              , q = (e + g) / 2
              , r = (k + m) / 2
              , u = (l + q) / 2
              , w = f - b
              , v = g - c;
            d = Math.abs((d - f) * v - (e - g) * w);
            d * d <= h * (w * w + v * v) ? a.push(new A(r,u)) : (xd(a, b, c, k, l, r, u, h),
            xd(a, r, u, m, q, f, g, h))
        }
        --wd
    }
    function yd(a, b, c) {
        var d, e, f, g, h, k, l, m, q = 0;
        if (3 > a.length)
            return 0;
        f = a[a.length - 1].x;
        g = a[a.length - 1].y;
        for (m = 0; m < a.length; m++)
            d = a[m].x,
            e = a[m].y,
            d > f ? (h = f,
            l = d,
            k = g,
            g = e) : (h = d,
            l = f,
            k = e),
            d < b === b <= f && (c - k) * (l - h) < (g - k) * (b - h) && (q = !q),
            f = d,
            g = e;
        return q
    }
    function zd(a, b, c, d) {
        d = d * d;
        for (var e = 1; e < a.length; e++) {
            var f = a[e - 1].x
              , g = a[e - 1].y
              , h = a[e].x - f
              , k = a[e].y - g
              , l = ((b - f) * h + (c - g) * k) / (h * h + k * k);
            1 < l ? l = 1 : 0 > l && (l = 0);
            f = f + l * h - b;
            g = g + l * k - c;
            if (f * f + g * g <= d)
                return !0
        }
        return !1
    }
    function Ad(a) {
        this.closed = !1;
        this.ea = [];
        a instanceof P && (this.moveTo(a.x, a.y),
        this.lineTo(a.x + a.width, a.y),
        this.lineTo(a.x + a.width, a.y + a.height),
        this.lineTo(a.x, a.y + a.height),
        this.lineTo(a.x, a.y),
        this.closePath())
    }
    var Wb = 0
      , Xb = 1
      , Zb = 4
      , $b = [3, 3, 7, 5, 1]
      , Bd = [1, 1, 3, 2, 0];
    Ad.prototype = {
        moveTo: function(a, b) {
            this.ea.push(Wb, a, b)
        },
        lineTo: function(a, b) {
            this.ea.push(Xb, a, b)
        },
        bezierCurveTo: function(a, b, c, d, e, f) {
            this.ea.push(2, a, b, c, d, e, f)
        },
        quadraticCurveTo: function(a, b, c, d) {
            this.ea.push(3, a, b, c, d)
        },
        closePath: function() {
            this.ea.push(Zb)
        },
        ma: function(a) {
            for (var b = 0; b < this.ea.length; ) {
                switch (this.ea[b]) {
                case Wb:
                    a.moveTo(this.ea[b + 1], this.ea[b + 2]);
                    break;
                case Xb:
                    a.lineTo(this.ea[b + 1], this.ea[b + 2]);
                    break;
                case 2:
                    a.bezierCurveTo(this.ea[b + 1], this.ea[b + 2], this.ea[b + 3], this.ea[b + 4], this.ea[b + 5], this.ea[b + 6]);
                    break;
                case 3:
                    a.quadraticCurveTo(this.ea[b + 1], this.ea[b + 2], this.ea[b + 3], this.ea[b + 4]);
                    break;
                case Zb:
                    a.closePath();
                    break;
                default:
                    alert("Error!")
                }
                b += $b[this.ea[b]]
            }
        },
        transform: function(a) {
            for (var b = 0, c, d; b < this.ea.length; ) {
                d = Bd[this.ea[b]];
                for (c = 0; c < d; c++) {
                    var e = a.apply(this.ea[b + 1 + 2 * c], this.ea[b + 1 + 2 * c + 1]);
                    this.ea[b + 1 + 2 * c] = e.x;
                    this.ea[b + 1 + 2 * c + 1] = e.y
                }
                b += $b[this.ea[b]]
            }
        },
        clone: function() {
            var a = new Ad;
            a.ea = this.ea.concat();
            return a
        },
        append: function(a) {
            this.ea = this.ea.concat(a.ea)
        }
    };
    function Vb(a) {
        function b(a, b) {
            f -= (a - d) * (b + e);
            d = a;
            e = b
        }
        for (var c = 0, d, e, f = 0; c < a.ea.length; ) {
            switch (a.ea[c]) {
            case Wb:
                d = a.ea[c + 1];
                e = a.ea[c + 2];
                break;
            case Xb:
                b(a.ea[c + 1], a.ea[c + 2]);
                break;
            case 2:
                b(a.ea[c + 5], a.ea[c + 6]);
                break;
            case 3:
                b(a.ea[c + 3], a.ea[c + 4])
            }
            c += $b[a.ea[c]]
        }
        return f / 2
    }
    function Cd(a, b, c) {
        for (var d = 0, e = 0, f = c[0], g, h = new A(0,0), k; d < a.ea.length; ) {
            switch (a.ea[d]) {
            case Wb:
                k = a.ea[d + 1];
                g = a.ea[d + 2];
                b.moveTo(k, g);
                h = new A(k,g);
                break;
            case Xb:
                k = a.ea[d + 1];
                var l = g = a.ea[d + 2]
                  , m = new A(k,l);
                g = h.kb(m);
                if (!(0 >= g)) {
                    for (; g > f; )
                        h.x += (m.x - h.x) * f / g,
                        h.y += (m.y - h.y) * f / g,
                        e & 1 ? b.moveTo(h.x, h.y) : b.lineTo(h.x, h.y),
                        g -= f,
                        e = (e + 1) % c.length,
                        f = c[e];
                    g <= f && (h = new A(k,l),
                    e & 1 ? b.moveTo(h.x, h.y) : b.lineTo(h.x, h.y),
                    f -= g)
                }
            }
            d += $b[a.ea[d]]
        }
    }
    function Dd(a, b, c, d) {
        var e = 0, f = 0, g = 0, h, k, l, m, q;
        for (d *= d; g < a.ea.length; ) {
            switch (a.ea[g]) {
            case Wb:
                e = a.ea[g + 1];
                f = a.ea[g + 2];
                break;
            case Xb:
                h = a.ea[g + 1];
                k = a.ea[g + 2];
                m = h - e;
                l = k - f;
                q = m * m + l * l;
                q = ((b - e) * m + (c - f) * l) / q;
                1 < q ? q = 1 : 0 > q && (q = 0);
                e += q * m;
                l = f + q * l;
                f = e - b;
                l = l - c;
                f = f * f + l * l;
                if (f <= d)
                    return !0;
                e = h;
                f = k
            }
            g += $b[a.ea[g]]
        }
        return !1
    }
    function Ed(a, b, c, d) {
        return yd(bc(a), b, c) || 0 < d && Dd(a, b, c, d)
    }
    function Fd(a, b) {
        for (var c = 0, d, e, f = new P(a.ea[1],a.ea[2],0,0), g; c < a.ea.length; ) {
            switch (a.ea[c]) {
            case Wb:
            case Xb:
                d = a.ea[c + 1];
                e = a.ea[c + 2];
                od(f, d, e);
                break;
            case 2:
                var h = g = []
                  , k = a.ea[c + 5]
                  , l = a.ea[c + 6];
                vd(h, d, e, a.ea[c + 1], a.ea[c + 2], a.ea[c + 3], a.ea[c + 4], k, l, b * b);
                h.push(new A(k,l));
                for (d = 0; d < g.length; d++)
                    od(f, g[d].x, g[d].y);
                d = a.ea[c + 5];
                e = a.ea[c + 6];
                break;
            case 3:
                h = g = [];
                k = a.ea[c + 3];
                l = a.ea[c + 4];
                xd(h, d, e, a.ea[c + 1], a.ea[c + 2], k, l, b * b);
                h.push(new A(k,l));
                for (d = 0; d < g.length; d++)
                    od(f, g[d].x, g[d].y);
                d = a.ea[c + 3];
                e = a.ea[c + 4]
            }
            c += $b[a.ea[c]]
        }
        return f
    }
    function bc(a) {
        for (var b = 0, c, d = []; b < a.ea.length; ) {
            var e = Bd[a.ea[b]];
            for (c = 0; c < e; c++)
                d.push(new A(a.ea[b + 1 + 2 * c],a.ea[b + 1 + 2 * c + 1]));
            b += $b[a.ea[b]]
        }
        return d
    }
    function Gd(a, b, c, d, e) {
        var f;
        if (2 >= d - c)
            e.push(a[c]);
        else {
            var g = a[c]
              , h = a[d - 1]
              , k = 0
              , l = 0;
            for (f = c + 1; f < d; f++) {
                var m = id(a[f], g, h);
                m > k && (k = m,
                l = f)
            }
            0 < l && k > b ? (Gd(a, b, c, l, e),
            Gd(a, b, l, d, e)) : e.push(g)
        }
    }
    function Hd(a, b) {
        var c = [];
        Gd(a, b, 0, a.length, c);
        0 < a.length && 0 < c.length && !a[a.length - 1].ic(c[c.length - 1]) && c.push(a[a.length - 1]);
        return c
    }
    function Id(a) {
        this.va = [];
        if (1 === arguments.length) {
            var b = arguments[0];
            if (b instanceof P)
                this.va.push(new A(b.x,b.y)),
                this.va.push(new A(b.right(),b.y)),
                this.va.push(new A(b.right(),b.bottom())),
                this.va.push(new A(b.x,b.bottom()));
            else if (b instanceof Array)
                this.va = b;
            else
                throw alert("Bad parameter passed to Polygon() constructor."),
                "Error";
        }
    }
    Id.prototype = {
        transform: function(a) {
            for (var b = 0; b < this.va.length; b++)
                this.va[b] = a.apply(this.va[b].x, this.va[b].y)
        },
        add: function(a, b) {
            this.va.push(new A(a,b))
        },
        Wb: function(a, b, c) {
            return yd(this.va, a, b) || c && zd(this.va, a, b, c)
        },
        clone: function() {
            return new Id(this.va.slice(0))
        },
        ic: function(a) {
            if (this.va.length !== a.va.length)
                return !1;
            for (var b = 0; b < this.va.length; b++) {
                var c = this.va[b]
                  , d = a.va[b];
                if (c.x !== d.x || c.y !== d.y)
                    return !1
            }
            return !0
        },
        dc: function(a) {
            for (var b = [], c = 0; c < this.va.length; c++) {
                var d = this.va[0 === c ? this.va.length - 1 : c - 1]
                  , e = this.va[c]
                  , f = this.va[c === this.va.length - 1 ? 0 : c + 1]
                  , g = Nb(d.x, d.y, e.x, e.y)
                  , h = Nb(f.x, f.y, e.x, e.y);
                b.push({
                    x: e.x + ((e.x - d.x) / g + (e.x - f.x) / h) / Math.sqrt(2) * a,
                    y: e.y + ((e.y - d.y) / g + (e.y - f.y) / h) / Math.sqrt(2) * a
                })
            }
            this.va = b
        },
        ma: function(a) {
            if (!(1 > this.va.length)) {
                a.moveTo(this.va[0].x, this.va[0].y);
                for (var b = 1; b < this.va.length; b++)
                    a.lineTo(this.va[b].x, this.va[b].y);
                a.closePath()
            }
        }
    };
    function Ld(a, b, c, d, e, f, g, h) {
        c = c - a;
        d = d - b;
        g = g - e;
        h = h - f;
        var k = -g * d + c * h;
        if (0 === k)
            return null;
        e = (g * (b - f) - h * (a - e)) / k;
        return new A(a + e * c,b + e * d)
    }
    function Md(a, b) {
        function c(a) {
            var b, c, h, k, l;
            b = [];
            c = h = 0;
            for (k = a.length; c < k; c++)
                l = a[c],
                a[h + 1] && (b[h] = d(l, a[h + 1])),
                h += 1;
            return b
        }
        function d(a, b) {
            return new A(a.x + (b.x - a.x) / 2,a.y + (b.y - a.y) / 2)
        }
        return b ? Md(c(c(function(a) {
            var b, c, h, k, l;
            a = [a[0]].concat(a).concat(a[a.length - 1]);
            l = [];
            b = c = 0;
            for (h = a.length; b < h; b++)
                k = a[b],
                l[2 * c] = k,
                a[c + 1] && (l[2 * c + 1] = d(k, a[c + 1])),
                c += 1;
            return l
        }(a))), b - 1) : a
    }
    function Nd(a, b) {
        for (var c = b.match(/[A-Z]+|-?[0-9\.E]+/gi), d = 0, e = 0, f = 0, g, h = [], f = 0; f < c.length; f++) {
            g = c[f++];
            for (h.length = 0; f < c.length; f++) {
                var k = parseFloat(c[f]);
                if (isNaN(k)) {
                    f--;
                    break
                } else
                    h.push(k)
            }
            if ("M" === g) {
                a.moveTo(h[0], h[1]);
                for (g = 2; g < h.length; g += 2)
                    a.lineTo(h[g], h[g + 1]);
                d = h[h.length - 2];
                e = h[h.length - 1]
            } else if ("m" === g)
                for (a.moveTo(h[0] + d, h[1] + e),
                d = h[0] + d,
                e = h[1] + e,
                g = 2; g < h.length; g += 2)
                    a.lineTo(h[g] + d, h[g + 1] + e),
                    d = h[g] + d,
                    e = h[g + 1] + e;
            else if ("L" === g) {
                for (g = 0; g < h.length; g += 2)
                    a.lineTo(h[g], h[g + 1]);
                d = h[h.length - 2];
                e = h[h.length - 1]
            } else if ("l" === g)
                for (g = 0; g < h.length; g += 2)
                    a.lineTo(h[g] + d, h[g + 1] + e),
                    d = h[g] + d,
                    e = h[g + 1] + e;
            else if ("C" === g)
                for (g = 0; g < h.length; g += 6)
                    a.vc(h[g], h[g + 1], h[g + 2], h[g + 3], h[g + 4], h[g + 5]),
                    d = h[g + 4],
                    e = h[g + 5];
            else if ("c" === g)
                for (g = 0; g < h.length; g += 6)
                    a.vc(h[g] + d, h[g + 1] + e, h[g + 2] + d, h[g + 3] + e, h[g + 4] + d, h[g + 5] + e),
                    d = h[g + 4] + d,
                    e = h[g + 5] + e;
            else
                "z" !== g && "Z" !== g || a.closePath()
        }
    }
    function Od() {
        this.aa = [];
        this.xa = new Q
    }
    Od.prototype = {
        toString: function() {
            return this.aa.join(" ")
        },
        moveTo: function(a, b) {
            var c = this.xa.apply(a, b);
            this.aa.push("M", c.x, c.y)
        },
        lineTo: function(a, b) {
            var c = this.xa.apply(a, b);
            this.aa.push("L", c.x, c.y)
        },
        transform: function(a, b, c, d, e, f) {
            a = new Q(a,c,b,d,e,f);
            this.xa = this.xa.multiply(a)
        },
        vc: function(a, b, c, d, e, f) {
            a = this.xa.apply(a, b);
            c = this.xa.apply(c, d);
            e = this.xa.apply(e, f);
            this.aa.push("C", a.x, a.y, c.x, c.y, e.x, e.y)
        },
        closePath: function() {
            this.aa.push("Z")
        }
    };
    function Pd(a, b, c, d) {
        if (!(2 > b.length)) {
            var e = b[0].x === b[b.length - 1].x && b[0].y === b[b.length - 1].y, f = [], g = [], h, k, l, m, q, r, u = [], w = c / 2, v, z;
            for (v = 1; v < b.length; v++)
                m = b[v - 1],
                q = b[v],
                l = K(m.x, m.y, q.x, q.y),
                r = new A(l.y,-l.x),
                "middle" === d ? (h = new A(m.x - l.x * w - r.x * w,m.y - l.y * w - r.y * w),
                k = new A(m.x - l.x * w + r.x * w,m.y - l.y * w + r.y * w)) : "outside" === d ? (h = new A(m.x - r.x * c,m.y - r.y * c),
                k = m) : "inside" === d && (h = m,
                k = new A(m.x + r.x * c,m.y + r.y * c)),
                g.length && (m = g[g.length - 1],
                z = u[u.length - 1],
                h = Ld(m.x, m.y, m.x + z.x, m.y + z.y, h.x, h.y, h.x + l.x, h.y + l.y) || h,
                m = f[f.length - 1],
                k = Ld(m.x, m.y, m.x + z.x, m.y + z.y, k.x, k.y, k.x + l.x, k.y + l.y) || k),
                g.push(h),
                f.push(k),
                u.push(l);
            e ? (m = g[0],
            z = u[0],
            h = Ld(m.x, m.y, m.x + z.x, m.y + z.y, h.x, h.y, h.x + l.x, h.y + l.y) || h,
            m = f[0],
            k = Ld(m.x, m.y, m.x + z.x, m.y + z.y, k.x, k.y, k.x + l.x, k.y + l.y) || k,
            g[0].x = h.x,
            g[0].y = h.y,
            f[0].x = k.x,
            f[0].y = k.y,
            g.push(h),
            f.push(k)) : "middle" === d ? (g.push(new A(q.x + l.x * w - r.x * w,q.y + l.y * w - r.y * w)),
            f.push(new A(q.x + l.x * w + r.x * w,q.y + l.y * w + r.y * w))) : "outside" === d ? (g.push(new A(q.x - r.x * c,q.y - r.y * c)),
            f.push(q)) : "inside" === d && (g.push(q),
            f.push(new A(q.x + r.x * c,q.y + r.y * c)));
            a.moveTo(g[0].x, g[0].y);
            for (v = 1; v < g.length; v++)
                a.lineTo(g[v].x, g[v].y);
            e && (a.closePath(),
            a.moveTo(f[f.length - 1].x, f[f.length - 1].y));
            for (v = f.length - 1; 0 <= v; v--)
                a.lineTo(f[v].x, f[v].y);
            e || a.lineTo(g[0].x, g[0].y)
        }
    }
    ;function Qd(a, b, c, d, e) {
        this.view = a;
        this.da = b;
        this.qa = c;
        this.view.Wd = this.da instanceof Rd;
        this.na = !1;
        this.Oa(d, e)
    }
    function Sd(a) {
        for (var b = [], c = 0; c < a.length; c++)
            b.push(a[c].id);
        return b
    }
    Qd.prototype = {
        log: t("TransformSelectionBehaviour"),
        hb: function(a) {
            var b;
            if (!this.na) {
                for (b = 0; b < a.touches.length; ) {
                    b = a.touches[b];
                    b = y(this.view, b.pageX, b.pageY);
                    "touchmove" === a.type && this.Ra(b.x, b.y, a);
                    break
                }
                for (b = 0; b < a.changedTouches.length; ) {
                    b = a.changedTouches[b];
                    b = y(this.view, b.pageX, b.pageY);
                    "touchend" === a.type && this.Ya(b.x, b.y, a);
                    break
                }
            }
        },
        Wa: function(a) {
            this.log("%s scale=%s rotation=%s", a.type, a.scale, a.rotation);
            this.na = !0;
            var b = this.ka.x + this.ka.width / 2
              , c = this.ka.y + this.ka.height / 2
              , d = a.scale;
            this.view.Ec || (d = 1);
            var e = -a.rotation / 180 * Math.PI;
            if (0 < this.view.ia.get("snap"))
                var f = Math.PI / 16
                  , e = Math.floor(e / f) * f;
            b = (new jb(d,d,b,c)).multiply(new qd(e,b,c));
            for (c = 0; c < this.Aa.length; c++)
                Td(this.Aa[c], b.multiply(this.ba[c])),
                this.Aa[c].format(this.view.oa, this.view.request);
            this.view.Ad = b;
            this.view.ma();
            if ("gestureend" === a.type) {
                for (c = 0; c < this.Aa.length; c++)
                    Td(this.Aa[c], this.ba[c]);
                this.view.za([new Ud(Sd(this.Aa),b)]);
                Vd(this)
            }
        },
        Oa: function(a, b) {
            this.aa = this.view.Ua(new A(a,b));
            this.log("onMouseDown(%s,%s)", this.aa.x, this.aa.y);
            var c = this.Aa = Wd(this.view);
            this.ba = [];
            for (var d = 0; d < c.length; d++)
                this.ba.push(c[d].Sa());
            this.ka = new P(this.view.Ca.x,this.view.Ca.y,this.view.Ca.width,this.view.Ca.height)
        },
        Ra: function(a, b) {
            var c = this, d;
            d = this.view.Ua(new A(a,b));
            var e, f;
            e = d.x;
            f = d.y;
            for (var g = this.da.cd(new A(d.x - this.aa.x,d.y - this.aa.y)), g = Xd(this, g, a, b), h = 0; h < this.Aa.length; h++)
                d = g.multiply(this.ba[h]),
                Td(this.Aa[h], d),
                this.Aa[h].format(this.view.oa, this.view.request);
            this.view.Ad = g;
            this.view.ma(function() {
                if (c.da instanceof Rd) {
                    var a = c.view.oa;
                    a.save();
                    a.beginPath();
                    a.strokeStyle = "#0050B7";
                    a.lineWidth = 1 / c.view.scale;
                    a.moveTo(c.da.origin.x, c.da.origin.y);
                    a.lineTo(e, f);
                    a.stroke();
                    a.restore()
                }
            })
        },
        Ya: function(a, b) {
            var c = a
              , d = b
              , e = this.view.Ua(new A(a,b));
            a = e.x;
            b = e.y;
            this.log("onMouseUp(%s,%s)", a, b);
            if (e.ic(this.aa))
                this.qa ? (c = this.view.la.$a(c, d, this.view.Ja)) && c.dd() ? (this.log("Didn't move, and has edit mode. Selecting node %s", c.id),
                this.view.ib(),
                this.view.Fa = c) : this.log("Didn't move, but node has no edit mode or failed hittest") : this.log("Didn't move, but toggleEditNode=false");
            else {
                this.log("Moved by %s,%s", a - this.aa.x, b - this.aa.y);
                e = this.da.cd(new A(e.x - this.aa.x,e.y - this.aa.y));
                e = Xd(this, e, c, d);
                for (c = 0; c < this.Aa.length; c++)
                    Td(this.Aa[c], this.ba[c]);
                this.view.za([new Ud(Sd(this.Aa),e)])
            }
            Vd(this)
        },
        mc: function() {
            this.log("onDoubleClick")
        }
    };
    function Xd(a, b, c, d) {
        if (1 < a.Aa.length)
            return b;
        var e = a.Aa[0].pa("wallAffinity");
        if (!e)
            return b;
        var f = a.view.la.$a(c, d, a.view.Ja, "WallNode");
        if (null === f)
            return b;
        var g = f.Ub(c, d, a.view.scale);
        if ("middle" !== f.kc(g))
            return b;
        b = e.split(/\s+/);
        for (var h, k = "bottom", l = "inside", m = 0, e = 0; e < b.length; e++)
            switch (h = b[e],
            h) {
            case "left":
            case "top":
            case "right":
            case "bottom":
            case "hcentre":
            case "vcentre":
                k = h;
                break;
            case "hcenter":
                k = "hcentre";
                break;
            case "vcenter":
                k = "vcentre";
                break;
            case "inside":
            case "outside":
            case "middle":
                l = h;
                break;
            default:
                (h = parseFloat(h)) && (m = h)
            }
        null !== g && g < f.nb.length ? (b = f.nb[g],
        b = Math.atan2(b.bb.ja.y - b.bb.ta.y, b.bb.ja.x - b.bb.ta.x)) : b = 0;
        e = a.ba[0];
        e = new A(Math.sqrt(e.m11 * e.m11 + e.m21 * e.m21),Math.sqrt(e.m12 * e.m12 + e.m22 * e.m22));
        a.log("Scale=%s", e);
        var q = a.Aa[0].ab.clone();
        h = new Q;
        switch (k) {
        case "left":
            h = (new qd(-Math.PI / 2,0,0)).multiply(h);
            h = (new F(q.width / 2,0)).multiply(h);
            break;
        default:
        case "top":
            h = (new F(-q.width / 2,0)).multiply(h);
            break;
        case "right":
            h = (new qd(Math.PI / 2,0,0)).multiply(h);
            h = (new F(-q.height / 2,q.width)).multiply(h);
            break;
        case "bottom":
            h = (new qd(Math.PI,0,0)).multiply(h);
            h = (new F(q.width / 2,q.height)).multiply(h);
            break;
        case "hcentre":
            h = (new F(-q.width / 2,-q.height / 2)).multiply(h);
            break;
        case "vcentre":
            h = (new F(-q.width / 2,-q.height / 2)).multiply(h),
            h = (new qd(-Math.PI / 2,0,0)).multiply(h)
        }
        "outside" === l && (h = (new qd(Math.PI,0,0)).multiply(h));
        k = l;
        if (g >= f.nb.length)
            f = new A(0,0);
        else {
            var g = f.nb[g].bb
              , l = g.ta.x
              , q = g.ta.y
              , r = g.ja.x - l
              , u = g.ja.y - q;
            c = ((c - l) * r + (d - q) * u) / (r * r + u * u);
            1 < c ? c = 1 : 0 > c && (c = 0);
            c = new A(l + c * r,q + c * u);
            d = K(g.ta.x, g.ta.y, g.ja.x, g.ja.y);
            d = new A(-d.y,d.x);
            g = f.pa("placement");
            "middle" === g ? m += f.Sd / 2 : "outside" === g && (m += f.Sd);
            "middle" === k ? m -= f.Sd / 2 : "outside" === k && (m -= f.Sd);
            c.x += d.x * m;
            c.y += d.y * m;
            f = c
        }
        h = (new qd(-b,0,0)).multiply(h);
        h = (new jb(e.x,e.y,0,0)).multiply(h);
        h = (new F(f.x,f.y)).multiply(h);
        return h.multiply(a.ba[0].inverse())
    }
    function Vd(a) {
        var b = new Q;
        a.view.Ad = b;
        a.view.Wd = !0;
        Yd(a.view);
        a.view.update(!0);
        G(a.view)
    }
    ;var Zd = t("FitCurve");
    function $d(a) {
        function b(a) {
            z.bezierCurveTo(a[1].x, a[1].y, a[2].x, a[2].y, a[3].x, a[3].y);
            Zd("Bezier: (%s,%s), (%s,%s), (%s,%s), (%s,%s)", a[0].x, a[0].y, a[1].x, a[1].y, a[2].x, a[2].y, a[3].x, a[3].y)
        }
        function c(a, b) {
            return a.x * b.x + a.y * b.y
        }
        function d(a) {
            var b = 1 - a;
            return 3 * a * b * b
        }
        function e(a) {
            return 3 * a * a * (1 - a)
        }
        function f(a, b) {
            var c = a.x - b.x
              , d = a.y - b.y;
            return Math.sqrt(c * c + d * d)
        }
        function g(a) {
            return a.x * a.x + a.y * a.y
        }
        function h(a, b) {
            var c = Math.sqrt(g(a));
            0 !== c && (a.x *= b / c,
            a.y *= b / c);
            return a
        }
        function k(a, b, c) {
            void 0 === c && Zd("Undef!");
            c.x = a.x + b.x;
            c.y = a.y + b.y
        }
        function l(a, b) {
            return {
                x: a.x + b.x,
                y: a.y + b.y
            }
        }
        function m(a, b) {
            return {
                x: a.x * b,
                y: a.y * b
            }
        }
        function q(a, b) {
            return {
                x: a.x - b.x,
                y: a.y - b.y
            }
        }
        function r(a, b, g, r, u) {
            var w, v = [], z, D = [[], []], U = [], qa, Z;
            Z = [{}, {}, {}, {}];
            z = b - 0 + 1;
            for (w = 0; w < z; w++) {
                qa = {
                    x: r.x,
                    y: r.y
                };
                var ra = {
                    x: u.x,
                    y: u.y
                };
                h(qa, d(g[w]));
                h(ra, e(g[w]));
                v[w] = [qa, ra]
            }
            D[0][0] = 0;
            D[0][1] = 0;
            D[1][0] = 0;
            D[1][1] = 0;
            U[0] = 0;
            for (w = U[1] = 0; w < z; w++)
                D[0][0] += c(v[w][0], v[w][0]),
                D[0][1] += c(v[w][0], v[w][1]),
                D[1][0] = D[0][1],
                D[1][1] += c(v[w][1], v[w][1]),
                qa = 1 - g[w],
                ra = g[w],
                qa = q(a[0 + w], l(m(a[0], qa * qa * qa), l(m(a[0], d(g[w])), l(m(a[b], e(g[w])), m(a[b], ra * ra * ra))))),
                U[0] += c(v[w][0], qa),
                U[1] += c(v[w][1], qa);
            g = D[0][0] * D[1][1] - D[1][0] * D[0][1];
            w = D[0][0] * U[1] - D[0][1] * U[0];
            U = U[0] * D[1][1] - U[1] * D[0][1];
            0 === g && (g = D[0][0] * D[1][1] * 1E-11);
            D = U / g;
            U = w / g;
            if (0 > D || 0 > U)
                return D = f(a[b], a[0]) / 3,
                Z[0] = a[0],
                Z[3] = a[b],
                k(Z[0], h(r, D), Z[1]),
                k(Z[3], h(u, D), Z[2]),
                Z;
            Z[0] = a[0];
            Z[3] = a[b];
            k(Z[0], h(r, D), Z[1]);
            k(Z[3], h(u, U), Z[2]);
            return Z
        }
        function u(a, b, c) {
            var d, e;
            e = [];
            for (d = 0; d <= a; d++)
                e[d] = {
                    x: b[d].x,
                    y: b[d].y
                };
            for (d = 1; d <= a; d++)
                for (b = 0; b <= a - d; b++)
                    e[b].x = (1 - c) * e[b].x + c * e[b + 1].x,
                    e[b].y = (1 - c) * e[b].y + c * e[b + 1].y;
            return e[0]
        }
        function w(a) {
            var b = Math.sqrt(Math.sqrt(g(a)));
            0 !== b && (a.x /= b,
            a.y /= b);
            return a
        }
        function v(a, b, c, d) {
            var e, f, h, k = (b - 0 + 1) / 2;
            f = 0;
            for (e = 1; e < b; e++)
                h = u(3, c, d[e - 0]),
                h = q(h, a[e]),
                h = g(h),
                h >= f && (f = h,
                k = e);
            return {
                Pg: f,
                Yh: k
            }
        }
        var z = new Ad;
        z.moveTo(a[0].x, a[0].y);
        (function(a, c, d) {
            var e;
            e = q(a[1], a[0]);
            e = w(e);
            var g = c - 1
              , g = q(a[g - 1], a[g])
              , g = w(g);
            a: {
                c = c - 1;
                var l, m;
                l = [{}, {}, {}, {}];
                if (2 === c - 0 + 1)
                    d = f(a[c], a[0]) / 3,
                    l[0] = a[0],
                    l[3] = a[c],
                    k(l[0], h(e, d), l[1]),
                    k(l[3], h(g, d), l[2]),
                    b(l);
                else {
                    var z = [0];
                    for (m = 1; m <= c; m++)
                        z[m - 0] = z[m - 0 - 1] + f(a[m], a[m - 1]);
                    for (m = 1; m <= c; m++)
                        z[m - 0] /= z[c - 0];
                    l = r(a, c, z, e, g);
                    m = v(a, c, l, z).Pg;
                    if (m < d)
                        b(l);
                    else
                        for (; ; ) {
                            d = a;
                            m = c;
                            for (var D = void 0, U = [], U = [], D = 0; D <= m; D++) {
                                for (var qa = U, Z = D - 0, ra = l, Sc = d[D], Tc = z[D - 0], Ra = [], Uc = [], dc = void 0, H = void 0, fe = void 0, H = void 0, dc = u(3, ra, Tc), H = 0; 2 >= H; H++)
                                    Ra[H] = {},
                                    Ra[H].x = 3 * (ra[H + 1].x - ra[H].x),
                                    Ra[H].y = 3 * (ra[H + 1].y - ra[H].y);
                                for (H = 0; 1 >= H; H++)
                                    Uc[H] = {},
                                    Uc[H].x = 2 * (Ra[H + 1].x - Ra[H].x),
                                    Uc[H].y = 2 * (Ra[H + 1].y - Ra[H].y);
                                H = u(2, Ra, Tc);
                                fe = u(1, Uc, Tc);
                                qa[Z] = Tc - ((dc.x - Sc.x) * H.x + (dc.y - Sc.y) * H.y) / (H.x * H.x + H.y * H.y + (dc.x - Sc.x) * fe.x + (dc.y - Sc.y) * fe.y)
                            }
                            d = U;
                            l = r(a, c, d, e, g);
                            v(a, c, l, d);
                            b(l);
                            break a
                        }
                }
            }
        })(a, a.length, 25);
        return z
    }
    ;function ae(a, b, c, d, e, f) {
        var g = this;
        this.view = a;
        this.nodeType = b;
        this.fa = c;
        this.width = d;
        this.height = e;
        this.da = f;
        this.state = "initial";
        this.node = this.aa = null;
        this.ka = function() {}
        ;
        "rectangle-tl" === f && (this.ka = function(a) {
            a.lineWidth = 1 / g.view.scale;
            a.strokeStyle = "#ccc";
            a.beginPath();
            a.rect(g.start.x, g.start.y, g.end.x - g.start.x, g.end.y - g.start.y);
            a.stroke()
        }
        );
        this.ba = new hb(this.view)
    }
    ae.prototype = {
        log: t("DrawShape"),
        Gb: function() {
            this.log("Entering DrawShapeBehaviour");
            this.view.canvas.style.cursor = "crosshair"
        },
        Mb: function() {
            this.log("Leaving DrawShapeBehaviour");
            this.node && (this.view.la.removeNode(this.node),
            this.view.update(),
            this.node = null)
        },
        Wa: function(a) {
            this.ba.Wa(a);
            this.node && this.ba.aa && (this.view.la.removeNode(this.node),
            this.node = null,
            this.state = "initial")
        },
        vb: function(a) {
            "cancel" === a && G(this.view)
        },
        hb: function(a) {
            var b;
            "touchstart" === a.type ? (b = a.changedTouches[0],
            b = y(this.view, b.pageX, b.pageY),
            this.Oa(b.x, b.y)) : "touchmove" === a.type ? (b = a.changedTouches[0],
            b = y(this.view, b.pageX, b.pageY),
            this.Ra(b.x, b.y, a)) : "touchend" === a.type && (b = a.changedTouches[0],
            b = y(this.view, b.pageX, b.pageY),
            this.Ya(b.x, b.y, a))
        },
        Oa: function(a, b) {
            "initial" === this.state && (this.start = this.view.Ua(new A(a,b)),
            this.state = "predraw",
            this.log("initial -> predraw"))
        },
        Ra: function(a, b, c) {
            a = this.view.Ua(new A(a,b));
            "predraw" === this.state && 10 < this.start.kb(a) && (be(this),
            this.state = "drawing",
            this.log("predraw -> drawing"));
            "drawing" === this.state && (this.transform(this.start, a, c.ctrlKey),
            this.end = a,
            this.view.update(!1, this.ka))
        },
        Ya: function(a, b, c) {
            "predraw" === this.state ? (be(this),
            this.transform(this.start, null, c.ctrlKey),
            this.za(),
            this.view.ia.get("autoPickTool") && G(this.view),
            this.state = "initial") : "drawing" === this.state && (this.transform(this.start, this.view.Ua(new A(a,b)), c.ctrlKey),
            this.za(),
            this.view.ia.get("autoPickTool") && G(this.view),
            this.state = "initial")
        },
        transform: function(a, b, c) {
            var d, e;
            if (b)
                if ("circle" === this.da)
                    d = a,
                    a = a.kb(b),
                    e = 2 * a / this.width,
                    a = 2 * a / this.height;
                else if ("rectangle-tl" === this.da)
                    a = a.clone(),
                    b = b.clone(),
                    a.x > b.x && (e = a.x,
                    a.x = b.x,
                    b.x = e),
                    a.y > b.y && (e = a.y,
                    a.y = b.y,
                    b.y = e),
                    d = a,
                    e = (b.x - a.x) / this.width,
                    a = (b.y - a.y) / this.height;
                else {
                    e = [a, b];
                    if (0 === e.length)
                        d = new A(0,0);
                    else {
                        d = e[0].x;
                        for (var f = e[0].y, g = 1; g < e.length; g++)
                            d += e[g].x,
                            f += e[g].y;
                        d = new A(d / e.length,f / e.length)
                    }
                    e = (b.x - a.x) / this.width;
                    a = (b.y - a.y) / this.height
                }
            else
                d = a,
                a = e = 1;
            c && (a = e = Math.min(e, a));
            c = new F(d.x,d.y);
            c = c.multiply(new jb(e,a));
            Td(this.node, c, c.inverse());
            ce(this.view.la, this.node.id)
        },
        za: function() {
            this.fa.matrix = this.node.Sa();
            this.view.la.removeNode(this.node);
            this.node = null;
            this.view.za([new E(this.nodeType,this.fa)])
        },
        Md: function(a) {
            this.fa.lineWidth = a
        },
        Nb: function(a) {
            Za.prototype.Nb.call(this, a);
            this.fa[a.zd ? "fillStyle" : "strokeStyle"] = a.Va
        },
        ec: function(a, b) {
            Za.prototype.ec.call(this, a, b);
            var c = b ? "fillStyle" : "strokeStyle"
              , d = de(this.fa[c]);
            this.fa[c] = d
        },
        Tb: function() {
            return this.da
        }
    };
    function be(a) {
        a.node = ee(a.nodeType, a.view.la.rb, a.view.la);
        ge(a.node, a.fa);
        he(a.view.la, a.node)
    }
    ;function ie(a, b) {
        this.view = a;
        this.da = !1;
        this.ba = this.aa = null;
        this.fa = b;
        this.na = a.ia.get("multilineText");
        this.ka = "normal";
        a.ia.get("iPadNoScrollText") && null !== navigator.userAgent.match(/iPad/i) && (this.ka = "top")
    }
    ie.prototype = {
        log: t("Text"),
        Gb: function() {
            this.log("Entering text mode");
            this.view.canvas.style.cursor = "text"
        },
        Mb: function() {
            this.da && je(this);
            this.view.canvas.style.cursor = "default";
            this.log("Leaving text mode");
            this.aa && (this.aa.parentNode.removeChild(this.aa),
            this.aa = null)
        },
        hb: function(a) {
            for (var b = 0; b < a.touches.length; b++) {
                var c = a.touches[b]
                  , c = y(this.view, c.pageX, c.pageY);
                "touchstart" === a.type && this.Oa(c.x, c.y, a)
            }
        },
        Oa: function(a, b, c) {
            this.log("onMouseDown(%s)", c.type);
            if (this.da && (this.log("Editing somewhere else on mousedown; submit that first."),
            je(this),
            this.view.ia.get("autoPickTool"))) {
                G(this.view);
                return
            }
            c = this.view.la.$a(a, b, this.view.Ja);
            ke(this, c, a, b)
        },
        cancel: function() {
            this.aa && (this.aa.parentNode.removeChild(this.aa),
            this.view.aa.emit("edit-text-hidden"));
            this.aa = null;
            this.da = !1;
            this.Fa && (this.Fa.pc(!1),
            this.view.ma())
        },
        Ra: function() {},
        vb: function(a) {
            this.log("keyboard: %s", a);
            "cancel" === a && null === this.aa && (G(this.view),
            this.view.sb.emit("goto-toolbar"))
        },
        Nb: function(a) {
            this.log("Set text colour to %s", a.Va);
            this.qa = !0;
            this.fillStyle = a.Va;
            this.aa && (this.aa.style.color = a.Va)
        },
        ec: function(a, b) {
            le(this.view, a, b)
        },
        Tb: function() {
            return "text"
        }
    };
    function je(a) {
        var b = a.aa.value;
        a.cancel();
        if (a.Fa && a.Fa.pa("text") === b && !a.qa)
            a.log("Text was not changed.");
        else if (null === a.Fa && "" === b)
            a.log("No text entered.");
        else if (a.Fa)
            a.log("Update text in node %s", a.Fa.id),
            a.view.za([new me([a.Fa.id],"text",b), new me([a.Fa.id],"textFillStyle",a.fillStyle)]);
        else {
            a.log("Create new text node.");
            var c = a.view.la.rb
              , d = ne(a, "fontSize")
              , e = new F(a.ba.x,a.ba.y + d);
            a.view.za([new E("TextNode",x.aa({
                text: b,
                fontSize: d,
                fontName: ne(a, "fontName"),
                bold: ne(a, "bold"),
                italic: ne(a, "italic"),
                textFillStyle: ne(a, "textFillStyle"),
                strokeStyle: ne(a, "textStrokeStyle"),
                lineWidth: ne(a, "textLineWidth"),
                layer: a.fa.layer || a.view.Ja,
                wrap: a.view.ia.get("multilineText")
            }, a.fa)), new Ud([c],e)])
        }
    }
    function ne(a, b) {
        return b in a.fa ? a.fa[b] : a.view.Ba[b]
    }
    function ke(a, b, c, d) {
        function e() {
            a.aa && (a.log("Set editBox height to %s", "" + a.aa.scrollHeight + "px"),
            a.aa.style.height = "" + a.aa.scrollHeight + "px",
            a.aa.style.width = "" + a.aa.scrollWidth + "px");
            m = null
        }
        var f, g, h, k, l = 0;
        a.qa = !1;
        b && "TextNode" === b.type() || b && "PathNode" === b.type() && a.view.ia.get("allowTextInShape") ? (a.Fa = b,
        "top" !== a.ka && "TextNode" === b.type() && a.Fa.pc(!0),
        a.view.ma(),
        a.ba = new A(b.rect.x,b.rect.y),
        f = b.pa("fontName"),
        g = b.pa("fontSize"),
        h = b.pa("bold"),
        k = b.pa("italic"),
        l = b.Cb().width * a.view.scale,
        l = Math.max(l, 200)) : (a.Fa = null,
        a.ba = new A(c,d),
        f = ne(a, "fontName"),
        g = ne(a, "fontSize"),
        h = ne(a, "bold"),
        k = ne(a, "italic"));
        a.aa = document.createElement("textarea");
        b = x(a.aa).height();
        l && (a.aa.style.width = "" + l + "px");
        l = oe(a.view, a.ba.x, a.ba.y);
        a.fillStyle = ne(a, "textFillStyle") || ne(a, "fillStyle");
        a.aa.style.position = "absolute";
        a.aa.style.fontFamily = f;
        a.aa.style.fontSize = "" + g * a.view.scale + "px";
        a.aa.style.overflow = "auto";
        a.aa.style.fontWeight = h ? "bold" : "normal";
        a.aa.style.fontStyle = k ? "italic" : "normal";
        a.aa.style.padding = "0";
        a.aa.style.border = "1px solid #888";
        a.aa.style.color = a.fillStyle;
        a.aa.style.zIndex = pe(a.view.canvas) + 1;
        f = x(document.body).offset();
        "top" === a.ka ? (f = x(a.view.canvas).offset(),
        g = x(a.view.canvas).width(),
        l = x(a.aa).width(),
        a.aa.style.left = "" + (f.left + g / 2 - l / 2) + "px",
        a.aa.style.top = "" + f.top + "px") : (a.aa.style.left = Math.round(l.x) + f.left + 1 + "px",
        a.aa.style.top = Math.round(l.y) + f.top + 1 + "px");
        a.aa.style.WebkitTransitionDuration = "0";
        a.aa.style.MozTransitionDuration = "0";
        a.aa.style.da = "0";
        a.aa.style.ba = "0";
        a.aa.style.transitionDuration = "0";
        document.body.appendChild(a.aa);
        qe(a.aa);
        a.da = !0;
        a.ba = new A(c,d + b);
        a.Fa && (a.aa.value = a.Fa.pa("text"));
        var m = null
          , m = setTimeout(e, 0);
        x(a.aa).bind("keydown", function(b) {
            27 === b.keyCode && a.na || 13 === b.keyCode && (b.shiftKey || !a.na) ? (a.log("Enter pressed. create text."),
            je(a),
            a.view.Ga.qb && re(a.view),
            a.view.sb.Jc("goto-canvas"),
            a.view.ia.get("autoPickTool") && G(a.view)) : 27 === b.keyCode ? (a.log("ESC pressed; cancel."),
            a.cancel(),
            G(a.view),
            a.view.sb.emit("goto-toolbar")) : 13 === b.keyCode && (m || (m = setTimeout(e, 0)))
        });
        setTimeout(function() {
            a.aa && a.aa.focus()
        }, 200);
        a.aa.focus();
        a.view.aa.emit("edit-text-shown", a.aa)
    }
    ;function se(a, b) {
        this.view = a;
        this.fa = b;
        this.ea = [];
        this.node = null
    }
    se.prototype = {
        log: t("Wall"),
        Tb: function() {
            return "wall"
        },
        vb: function(a) {
            this.log("keyboard: %s", a);
            "cancel" === a && (this.log("ESC pressed. Abort wall and go back to toolbar."),
            G(this.view),
            this.view.sb.emit("goto-toolbar"))
        },
        Gb: function() {
            this.log("Enter DrawWallBehaviour");
            this.view.canvas.style.cursor = "crosshair"
        },
        Mb: function() {
            this.log("Leaving DrawWallBehaviour");
            this.node && (te(this.view, !1),
            this.view.la.removeNode(this.node),
            this.view.update(),
            ue(this.view, null))
        },
        Oa: function(a, b, c) {
            var d = this.view.Ua(new A(a,b));
            if (!this.node) {
                var e, f;
                if ((e = this.view.la.$a(a, b, this.view.Ja)) && "WallNode" === e.type() && (f = e.Ub(d.x, d.y, this.view.scale),
                null !== f)) {
                    C(this.view, new Xa(this.view,e,f,a,b,this));
                    return
                }
            }
            if (this.node) {
                e = this.view;
                var g = ve(e)
                  , h = x(e.canvas).offset()
                  , k = we(e.ba);
                "changedTouches"in c ? (f = c.changedTouches[0].pageX - h.left - g,
                c = c.changedTouches[0].pageY - h.top - g) : (f = c.pageX - h.left - g,
                c = c.pageY - h.top - g);
                g = e.da;
                if (e.na && f > g.width - e.na.width - k && c < e.na.height) {
                    this.za(!1);
                    return
                }
                c = new A(this.ea[this.ea.length - 4],this.ea[this.ea.length - 3]);
                this.log("Last point=%s new point=%s distance=%s", c, new A(a,b), c.kb(new A(a,b)));
                if (10 < c.kb(new A(a,b))) {
                    if (10 > d.kb(new A(this.ea[1],this.ea[2]))) {
                        this.ea.push("Z");
                        this.log("Closed path!");
                        this.za(!0);
                        return
                    }
                    this.ea.push(a, b);
                    this.node.setProperty("svgpath", this.ea.join(" "));
                    ce(this.view.la, this.node.id)
                }
            } else
                this.ea = ["M", d.x, d.y, d.x, d.y],
                this.node = ee("WallNode", this.view.la.rb, this.view.la),
                ge(this.node, this.fa),
                this.node.setProperty("svgpath", this.ea.join(" ")),
                he(this.view.la, this.node),
                te(this.view, !0),
                ue(this.view, "click-to-place-another-point-or-double-click-to-end-the-line");
            this.view.update()
        },
        Ra: function(a, b) {
            var c;
            c = this.view.Ua(new A(a,b));
            if (this.node)
                this.ea[this.ea.length - 2] = c.x,
                this.ea[this.ea.length - 1] = c.y,
                this.node.setProperty("svgpath", this.ea.join(" ")),
                ce(this.view.la, this.node.id),
                this.view.update();
            else {
                var d, e;
                (d = this.view.la.$a(a, b, this.view.Ja)) && "WallNode" === d.type() && (c = d.Ub(c.x, c.y, this.view.scale),
                d = d.kc(c)) && (e = !0,
                this.view.canvas.style.cursor = "move");
                e || (this.view.canvas.style.cursor = "crosshair")
            }
        },
        mc: function() {
            this.za(!1)
        },
        za: function(a) {
            this.node && (this.view.la.removeNode(this.node),
            this.node = null,
            this.ea.length -= 2,
            3 < this.ea.length && (a && this.ea.push("Z"),
            this.fa.svgpath = this.ea.join(" "),
            this.view.za([new E("WallNode",this.fa)]),
            this.view.ib()),
            te(this.view, !1),
            ue(this.view, null))
        }
    };
    function xe(a) {
        this.view = a
    }
    xe.prototype = {
        log: t("Wall"),
        Tb: function() {
            return "split-wall"
        },
        vb: function(a) {
            this.log("keyboard: %s", a);
            "cancel" === a && (this.log("ESC pressed. Abort wall and go back to toolbar."),
            G(this.view),
            this.view.sb.emit("goto-toolbar"))
        },
        Gb: function() {
            this.log("Enter SplitWallBehaviour");
            this.view.canvas.style.cursor = "default"
        },
        Mb: function() {
            this.log("Leaving DrawWallBehaviour")
        },
        Oa: function(a, b) {
            this.Ra(a, b);
            var c = this.view.la.$a(a, b, this.view.Ja), d, e;
            c && "WallNode" === c.type() && ((d = c.Ub(a, b, this.view.scale)) && "middle" === c.kc(d) && (e = ye(c.path, a, b)) && (e.transform(c.Sa().inverse()),
            d = new Od,
            e.ma(d),
            this.view.za([new me([c.id],"svgpath",d.toString())]),
            d = c.Ub(a, b, this.view.scale)),
            d && C(this.view, new Xa(this.view,c,d,a,b,this)))
        },
        Ra: function(a, b) {
            this.view.Ua(new A(a,b));
            var c = this.view.la.$a(a, b, this.view.Ja), d, e;
            c && "WallNode" === c.type() && (e = c.Ub(a, b, this.view.scale)) && (d = !0,
            c = c.kc(e),
            this.view.canvas.style.cursor = "middle" === c ? "copy" : "move");
            d || (this.view.canvas.style.cursor = "default")
        },
        za: function() {}
    };
    function ye(a, b, c) {
        var d, e, f = 0, g = 0, h = 0, k = 0, l = null, m = null, q = new A(b,c);
        a.ma({
            moveTo: function(a, b) {
                var c = q.kb(new A(a,b));
                if (null === l || l > c)
                    l = c;
                d = a;
                e = b
            },
            lineTo: function(a, b) {
                var c = new A(a,b)
                  , r = q.kb(c);
                if (null === l || l > r)
                    l = r;
                c = id(q, new A(d,e), c);
                if (null === m || m > c)
                    f = d,
                    g = e,
                    h = a,
                    k = b,
                    m = c;
                d = a;
                e = b
            },
            closePath: function() {}
        });
        if (null !== l && (null === m || m > l))
            return null;
        var r = new Ad;
        a.ma({
            moveTo: function(a, b) {
                r.moveTo(a, b);
                d = a;
                e = b
            },
            lineTo: function(a, b) {
                d === f && e === g && a === h && b === k && r.lineTo(q.x, q.y);
                r.lineTo(a, b);
                d = a;
                e = b
            },
            closePath: function() {
                r.closePath()
            }
        });
        return r
    }
    ;function ze(a, b, c, d) {
        this.node = a;
        this.xa = b;
        this.aa = c;
        this.origin = d;
        a = this.xa.apply(c.x, c.y);
        this.x = a.x;
        this.y = a.y
    }
    ze.prototype = {
        cd: function(a) {
            var b = 1
              , c = 1
              , d = this.xa.inverse()
              , e = d.apply(this.x + a.x, this.y + a.y);
            a = new A(this.aa.x - this.origin.x,this.aa.y - this.origin.y);
            e = new A(e.x - this.origin.x,e.y - this.origin.y);
            e = (e.x * a.x + e.y * a.y) / (a.x * a.x + a.y * a.y);
            0 !== a.x && 0 !== a.y ? c = b = e : 0 !== a.x ? b = e : c = e;
            return this.xa.multiply(new jb(b,c,this.origin.x,this.origin.y)).multiply(d)
        }
    };
    function Rd(a, b, c, d, e) {
        this.node = a;
        this.xa = b;
        this.origin = this.xa.apply(d.x, d.y);
        a = this.xa.apply(c.x, c.y);
        this.x = a.x;
        this.y = a.y;
        this.ba = Math.atan2(this.y - this.origin.y, this.x - this.origin.x);
        this.aa = e
    }
    Rd.prototype = {
        log: t("RotationSelHandle"),
        cd: function(a) {
            a = Math.atan2(this.y + a.y - this.origin.y, this.x + a.x - this.origin.x) - this.ba;
            if (this.aa) {
                var b = Math.PI / 16;
                a = Math.floor(a / b) * b
            }
            return new qd(-a,this.origin.x,this.origin.y)
        }
    };
    function Ae(a, b) {
        this.node = a;
        this.xa = b;
        this.y = this.x = 0
    }
    Ae.prototype = {
        cd: function(a) {
            return new F(a.x,a.y)
        }
    };
    function Be() {}
    Be.prototype = {
        cd: function() {
            return new Q
        }
    };
    function Ce(a, b) {
        this.next = this.ob = null;
        a instanceof Ce ? (this.ob = a,
        this.ob.next = this,
        this.ta = this.ob.ja) : this.ta = a;
        this.ja = b;
        this.Rd = this.xd = this.length = 0;
        this.se = !1;
        this.text = "";
        this.Kd = !0
    }
    Ce.prototype = {
        log: t("WallSegment", !0)
    };
    function De(a, b) {
        this.bb = a;
        this.type = b
    }
    De.prototype = {
        log: t("WallEditHandle", !0),
        $a: function(a, b, c) {
            switch (this.type) {
            case "from":
                a = Nb(a, b, this.bb.ta.x, this.bb.ta.y);
                break;
            case "to":
                a = Nb(a, b, this.bb.ja.x, this.bb.ja.y);
                break;
            default:
                a = id(new A(a,b), this.bb.ta, this.bb.ja)
            }
            return a < c
        },
        moveTo: function(a, b) {
            var c, d;
            switch (this.type) {
            case "from":
                c = this.bb.ob;
                this.bb.ta.x = a;
                this.bb.ta.y = b;
                break;
            case "to":
                d = this.bb.next;
                this.bb.ja.x = a;
                this.bb.ja.y = b;
                break;
            default:
                c = this.bb.ob;
                d = this.bb.next;
                var e = this.bb
                  , f = K(e.ta.x, e.ta.y, e.ja.x, e.ja.y)
                  , g = new A(f.y,-f.x)
                  , h = g.x * (a - e.ta.x) + g.y * (b - e.ta.y)
                  , f = new A(e.ta.x + h * g.x,e.ta.y + h * g.y)
                  , g = new A(e.ja.x + h * g.x,e.ja.y + h * g.y);
                e.ob && (h = Ld(e.ob.ta.x, e.ob.ta.y, e.ob.ja.x, e.ob.ja.y, f.x, f.y, g.x, g.y)) && (f = h);
                e.next && (h = Ld(e.next.ta.x, e.next.ta.y, e.next.ja.x, e.next.ja.y, f.x, f.y, g.x, g.y)) && (g = h);
                e.ta.x = f.x;
                e.ta.y = f.y;
                e.ja.x = g.x;
                e.ja.y = g.y
            }
            c && (c.Kd = !0);
            d && (d.Kd = !0)
        }
    };
    function Ee() {
        this.text = "";
        this.font = "10px Arial";
        this.na = "Arial";
        this.fontSize = 10;
        this.aa = [];
        this.rect = new P(0,0,0,this.fontSize);
        this.da = "left";
        this.ba = "top";
        this.qa = this.ka = !1
    }
    n = Ee.prototype;
    n.log = t("TextBox");
    function Fe(a, b, c) {
        switch (b) {
        case "left":
        case "centre":
        case "right":
            a.ba = b;
            break;
        case null:
            break;
        default:
            a.log("Unknnown alignment: %s", b)
        }
        switch (c) {
        case "top":
        case "middle":
        case "bottom":
            a.da = c;
            break;
        case null:
            break;
        default:
            a.log("Unknnown alignment: %s", c)
        }
    }
    n.format = function(a, b, c) {
        this.font = "" + this.fontSize + 'px "' + this.na + '"';
        this.ka && (this.font = "bold " + this.font);
        this.qa && (this.font = "italic " + this.font);
        this.aa.length = 0;
        var d, e;
        a.font = this.font;
        var f = 0;
        this.rect.width = 0;
        if (0 === b) {
            var g = this.text.split("\n");
            for (d = 0; d < g.length; d++) {
                var h = g[d];
                e = a.measureText(h).width;
                f += this.fontSize;
                this.aa.push({
                    x: 0,
                    y: f,
                    width: e,
                    text: h
                });
                this.rect.width = Math.max(this.rect.width, e)
            }
        } else {
            var h = g = 0
              , k = !1;
            for (d = 0; d < this.text.length; d++) {
                var l = this.text.charAt(d);
                e = a.measureText(this.text.substr(g, d - g + 1)).width;
                "\n" === l ? k = !0 : e > b ? h ? (d = h,
                k = !0) : d > g && (--d,
                k = !0) : " " === l && (h = d);
                k && (e = " " === this.text.charAt(d) ? a.measureText(this.text.substr(g, d - g)).width : a.measureText(this.text.substr(g, d - g + 1)).width,
                f += this.fontSize,
                this.aa.push({
                    x: 0,
                    y: f,
                    width: e,
                    text: this.text.substr(g, d - g + 1)
                }),
                g = d + 1,
                h = 0,
                k = !1,
                this.rect.width = Math.max(this.rect.width, e))
            }
            e && (f += this.fontSize,
            this.aa.push({
                x: 0,
                y: f,
                width: e,
                text: this.text.substr(g, d - g)
            }),
            this.rect.width = Math.max(this.rect.width, e))
        }
        this.rect.x = 0;
        this.rect.y = 0;
        this.rect.height = f;
        if ("centre" === this.ba)
            for (d = 0; d < this.aa.length; d++)
                a = this.aa[d],
                a.x = this.rect.width / 2 - a.width / 2;
        else if ("right" === this.ba)
            for (d = 0; d < this.aa.length; d++)
                a = this.aa[d],
                a.x = this.rect.width - a.width;
        b && "centre" === this.ba ? this.rect.x = b / 2 - this.rect.width / 2 : b && "right" === this.ba && (this.rect.x = b - this.rect.width);
        c && "middle" === this.da ? this.rect.y = c / 2 - this.rect.height / 2 : c && "bottom" === this.da && (this.rect.y = c - this.rect.height)
    }
    ;
    n.ma = function(a, b, c) {
        this.fillText(a, b, c)
    }
    ;
    n.fillText = function(a, b, c) {
        a.textBaseline = "alphabetic";
        a.font = this.font;
        for (var d = 0; d < this.aa.length; d++) {
            var e = this.aa[d];
            a.fillText(e.text, this.rect.x + e.x + b, this.rect.y + e.y + c)
        }
    }
    ;
    n.strokeText = function(a, b, c) {
        a.textBaseline = "alphabetic";
        a.font = this.font;
        for (var d = 0; d < this.aa.length; d++) {
            var e = this.aa[d];
            a.strokeText(e.text, this.rect.x + e.x + b, this.rect.y + e.y + c)
        }
    }
    ;
    function Ge(a, b) {
        He(this, a, b, Ge)
    }
    var Ie = {
        fillStyle: "#cccccc",
        strokeStyle: "#000000",
        lineWidth: 2,
        shadow: !1
    };
    Ge.prototype = {
        log: t("BaseNode"),
        clip: function() {},
        dd: function() {
            return !1
        },
        Ub: function() {
            return null
        },
        je: function() {},
        Le: function() {
            return !1
        },
        Id: function() {
            return "text"in this.fa
        },
        clone: function(a) {
            a = new this.constructor(a(),this.la);
            ge(a, Je(this));
            return a
        },
        type: function() {
            return "BaseNode"
        },
        Sa: function() {
            return this.fa.matrix
        },
        setProperty: function(a, b) {
            if (a in this.fa || "tag" === a || "locked" === a || "lockSize" === a || "lockRotation" === a || "lockPosition" === a || "lockEditMode" === a || "rotationHandles" === a || "lockAspectRatio" === a || "zIndex" === a || "wallAffinity" === a)
                this.fa[a] = b
        },
        pa: function(a) {
            return this.fa[a]
        },
        Cb: function() {
            return this.rect
        },
        le: function() {
            return []
        },
        Ge: function() {
            return new Id(this.rect)
        },
        transform: function(a) {
            this.fa.matrix = a.multiply(this.fa.matrix)
        },
        format: function() {},
        $a: function(a, b) {
            var c = this.fa.matrix.inverse().apply(a, b);
            return this.qa || this.pa("locked") || !this.ab.Wb(c.x, c.y) ? null : this
        },
        pc: function(a) {
            this.qa = a
        },
        Sc: function() {},
        Pe: function() {},
        Re: function() {},
        ma: function(a) {
            a.save();
            var b = this.fa.matrix;
            a.transform(b.m11, b.m21, b.m12, b.m22, b.Da, b.Ea);
            "erase" === this.fa.strokeStyle ? a.Wc ? a.strokeStyle = a.Wc : (a.strokeStyle = "#000000",
            a.globalCompositeOperation = "destination-out") : a.strokeStyle = this.fa.strokeStyle;
            a.fillStyle = this.fa.fillStyle;
            a.lineWidth = this.fa.lineWidth;
            this.fa.shadow && (a.shadowOffsetX = 3,
            a.shadowOffsetY = 3,
            a.shadowBlur = 5,
            a.shadowColor = "rgba(0,0,0,0.5)");
            this.Gc(a);
            a.restore()
        },
        Gc: function() {}
    };
    function Ke(a, b, c, d) {
        a.Ca || (a.Ca = {});
        var e = a.Ca.insideFill;
        if (!e || e.af !== d) {
            e && d === e.af || (e = {
                af: d,
                value: d
            },
            a.Ca.insideFill = e);
            d = /url\(([^\)]+)\)/.exec(d);
            var f;
            d && (f = d[1]);
            f && (e.value = "rgba(0, 0, 0, 0.2)",
            c.add(a, "image", f, null, function(d) {
                a.log("Got image response.");
                e.value = b.createPattern(d, "repeat");
                c.emit("reformat", a)
            }))
        }
    }
    function Le(a) {
        return a.pa("zIndex") || 0
    }
    function Td(a, b) {
        a.fa.matrix = b
    }
    function Me(a) {
        return null !== a.parent && null !== a.parent.parent && "PageNode" !== a.parent.type()
    }
    function Ne(a) {
        return void 0 !== a.children
    }
    function Oe(a) {
        return (a = a.pa("layer")) ? "" + a : "default"
    }
    function ge(a, b) {
        for (var c in b)
            b.hasOwnProperty(c) && a.setProperty(c, b[c])
    }
    function Je(a) {
        var b = {}, c;
        for (c in a.fa)
            a.fa.hasOwnProperty(c) && (b[c] = a.pa(c));
        return b
    }
    function Pe(a, b) {
        for (var c in b)
            b.hasOwnProperty(c) && (a.fa[c] = b[c])
    }
    function He(a, b, c, d) {
        a.id = b;
        a.la = c;
        a.fa = {};
        Pe(a, Ie);
        a.rect = new P(0,0,1,1);
        a.fa.matrix = new Q;
        a.fa.layer = "default";
        a.parent = null;
        a.constructor = d;
        a.qa = !1;
        a.ab = new P(0,0,1,1)
    }
    var Qe = {};
    function Re(a, b, c) {
        var d = [{}, Ge.prototype];
        c && d.push(c.prototype);
        d.push(b.prototype);
        b.prototype = x.aa.apply(null, d);
        Qe[a] = b
    }
    function ee(a, b, c) {
        return a in Qe ? new Qe[a](b,c) : null
    }
    ;function Se(a, b) {
        He(this, a, b, Se);
        this.parent = null;
        this.children = []
    }
    n = Se.prototype;
    n.type = function() {
        return "GroupNode"
    }
    ;
    n.clone = function(a) {
        for (var b = new Se(a(),this.la), c = 0; c < this.children.length; c++) {
            var d = this.children[c].clone(a);
            d.parent = b;
            b.children.push(d)
        }
        return b
    }
    ;
    n.format = function(a, b) {
        for (var c = 0; c < this.children.length; c++)
            this.children[c].format(a, b),
            0 === c ? this.rect = this.children[c].rect.clone() : pd(this.rect, this.children[c].rect)
    }
    ;
    n.ma = function(a) {
        for (var b = 0; b < this.children.length; b++)
            this.children[b].ma(a)
    }
    ;
    n.$a = function(a, b) {
        for (var c = this.children.length - 1; 0 <= c; c--) {
            var d = this.children[c].$a(a, b);
            if (d)
                return d
        }
        return null
    }
    ;
    function Te(a, b) {
        for (var c = 0; c < a.children.length; c++)
            if (b === a.children[c])
                return c;
        return -1
    }
    Re("GroupNode", Se);
    function Ue(a, b) {
        He(this, a, b, Ue);
        this.children = []
    }
    Ue.prototype = {
        log: t("PAGE", !0),
        type: function() {
            return "PageNode"
        },
        format: function() {},
        $a: function() {
            return null
        },
        ma: function() {}
    };
    Re("PageNode", Ue, Se);
    function Ve(a, b) {
        He(this, a, b, Ve);
        this.log("New BrushNode created.");
        this.fa.points = [];
        this.fa.strokeStyle = "#ff00ff";
        this.fa.lineWidth = 10;
        this.va = [];
        this.na = [];
        this.inverse = null
    }
    Ve.prototype = {
        log: t("BRUSH", !0),
        type: function() {
            return "BrushNode"
        },
        setProperty: function(a, b) {
            "fillStyle" === a && (a = "strokeStyle");
            a in this.fa || "dashes" === a || "lineCap" === a ? this.fa[a] = b : Ge.prototype.setProperty.call(this, a, b)
        },
        pa: function(a) {
            "fillStyle" === a && (a = "strokeStyle");
            return Ge.prototype.pa.call(this, a)
        },
        format: function() {
            var a, b, c, d;
            this.va.length = 0;
            b = this.fa.points;
            a = c = 0;
            for (d = b.length - 1; c <= d; a = c += 2)
                this.va.push(new A(b[a],b[a + 1]));
            a = md(this.va);
            this.ab = a.clone();
            a.dc(this.fa.lineWidth + 3, this.fa.lineWidth + 3);
            a = new Id(a);
            a.transform(this.fa.matrix);
            this.rect = md(a.va);
            this.inverse = this.fa.matrix.inverse();
            this.na = [];
            if ("dashes"in this.fa)
                for (b = this.fa.dashes.split(","),
                a = 0; a < b.length; a++)
                    c = parseFloat(b[a]),
                    isNaN(c) || this.na.push(c)
        },
        $a: function(a, b) {
            var c;
            return this.rect.Wb(a, b) && (c = this.inverse.apply(a, b),
            zd(this.va, c.x, c.y, this.fa.lineWidth / 2)) ? this : null
        },
        Gc: function(a) {
            var b, c, d, e;
            c = this.fa.points;
            if (0 !== c.length) {
                a.save();
                a.beginPath();
                b = this.pa("lineCap") || "round";
                a.lineCap = b;
                a.lineJoin = "round" === b ? "round" : "bevel";
                if (1 < this.na.length) {
                    if (b = this.va,
                    d = this.na,
                    0 !== b.length) {
                        a.moveTo(b[0].x, b[0].y);
                        e = 0;
                        for (var f = 1, g = d[0], h = b[0].clone(), k; f < b.length; )
                            k = h.kb(b[f]),
                            0 === k ? f += 1 : k <= g ? (h = b[f].clone(),
                            e & 1 ? a.moveTo(h.x, h.y) : a.lineTo(h.x, h.y),
                            g -= k,
                            f += 1) : (h.x += (b[f].x - h.x) * g / k,
                            h.y += (b[f].y - h.y) * g / k,
                            e & 1 ? a.moveTo(h.x, h.y) : a.lineTo(h.x, h.y),
                            e = (e + 1) % d.length,
                            g = d[e])
                    }
                } else
                    for (a.moveTo(c[0], c[1]),
                    b = d = 2,
                    e = c.length - 1; d <= e; b = d += 2)
                        a.lineTo(c[b], c[b + 1]);
                sd(this.Sa().inverse(), a);
                a.stroke();
                if (We) {
                    sd(this.Sa(), a);
                    a.beginPath();
                    b = d = 0;
                    for (e = c.length - 1; d <= e; b = d += 2)
                        a.rect(c[b] - 2, c[b + 1] - 2, 4, 4);
                    a.fillStyle = "#ff0000";
                    a.fill()
                }
                a.restore()
            }
        }
    };
    var We = !1;
    Re("BrushNode", Ve);
    function Xe(a, b, c, d) {
        this.aa = c;
        this.view = a;
        this.mode = d;
        this.Qa = !1;
        this.ne = !0;
        this.da = [];
        this.ka = {};
        var e = this;
        e.wb = function() {
            Ye(e, e.aa.lineWidth / 2)
        }
        ;
        this.ba = new hb(this.view)
    }
    Xe.prototype = {
        log: t("Brush"),
        Gb: function() {
            this.view.canvas.style.cursor = "crosshair";
            Ye(this, this.aa.lineWidth / 2);
            x(window).on("resize", this.wb)
        },
        Mb: function() {
            this.view.canvas.style.cursor = "default";
            this.view.ma();
            x(window).Tc("resize", this.wb)
        },
        reset: function() {
            this.Qa = !1;
            this.da = [];
            this.ka = {}
        },
        Wa: function(a) {
            this.ba.Wa(a);
            this.Qa && this.ba.aa && this.reset()
        },
        td: function(a) {
            this.aa.strokeStyle = a
        },
        Md: function(a) {
            this.aa.lineWidth = a;
            Ye(this, a / 2)
        },
        hb: function(a) {
            var b, c, d, e, f;
            if (!this.ba.aa)
                if ("touchstart" === a.type) {
                    f = a.changedTouches;
                    d = 0;
                    for (e = f.length; d < e; d++)
                        c = f[d],
                        a = y(this.view, c.pageX, c.pageY),
                        this.da.push([a]),
                        c.identifier && (this.ka[c.identifier] = this.da[this.da.length - 1]);
                    this.Qa = !0
                } else if ("touchmove" === a.type) {
                    f = a.changedTouches;
                    d = 0;
                    for (e = f.length; d < e; d++) {
                        c = f[d];
                        a = y(this.view, c.pageX, c.pageY);
                        if (c.identifier)
                            c.identifier in this.ka ? b = this.ka[c.identifier] : (b = [a],
                            this.da.push(b),
                            this.ka[c.identifier] = b);
                        else {
                            c = a;
                            var g = b = void 0
                              , h = void 0;
                            b = null;
                            for (h = 0; h < this.da.length; h++) {
                                var k = this.da[h]
                                  , l = k[k.length - 1].kb(c);
                                if (null === b || l < g)
                                    b = k,
                                    g = l
                            }
                        }
                        b ? a.x === b[b.length - 1].x && a.y === b[b.length - 1].y || b.push(a) : this.log("WARNING: Can't find path for touch!")
                    }
                    this.view.ma()
                } else
                    "touchend" === a.type && this.Qa && 0 === a.touches.length && (this.za(),
                    this.Qa = !1)
        },
        Oa: function(a, b) {
            var c;
            c = this.view.Ua(new A(a,b));
            this.Qa = !0;
            this.da.push([c])
        },
        pe: function(a) {
            var b, c, d, e, f, g, h, k = Ze(this.view);
            "erase" === this.aa.strokeStyle ? a.Wc ? a.strokeStyle = a.Wc : (a.strokeStyle = "#000000",
            a.globalCompositeOperation = "destination-out") : a.strokeStyle = this.aa.strokeStyle;
            a.lineCap = this.aa.lineCap || "round";
            a.lineJoin = "round" === a.lineCap ? "round" : "bevel";
            a.lineWidth = this.aa.lineWidth;
            a.beginPath();
            g = this.da;
            d = 0;
            for (f = g.length; d < f; d++)
                for (c = g[d],
                a.moveTo(c[0].x, c[0].y),
                b = e = 1,
                h = c.length - 1; e <= h; b = e += 1)
                    b = c[b],
                    a.lineTo(b.x, b.y);
            a.stroke();
            a.globalCompositeOperation = "source-over";
            k && a.restore()
        },
        Ra: function(a, b) {
            var c;
            "freehand" === this.mode ? c = new A(a,b) : c = this.view.Ua(new A(a,b));
            this.Qa && (this.ta = this.da[0][this.da[0].length - 1],
            c.x !== this.ta.x || c.y !== this.ta.y) && (this.da[0].push(c),
            this.view.ma())
        },
        Ya: function(a, b) {
            this.Ra(a, b);
            this.Qa = !1;
            this.za()
        },
        za: function() {
            var a, b, c, d, e, f, g, h, k, l;
            a = [];
            k = this.da;
            var m = this.view.la.rb;
            f = 0;
            for (h = k.length; f < h; f++)
                if (e = k[f],
                "brush" === this.mode) {
                    if (c = [],
                    1 === e.length && e.push(new A(e[0].x + .1,e[0].y + .1)),
                    1 < e.length) {
                        d = b = 0;
                        for (g = e.length - 1; b <= g; d = b += 1)
                            c.push(e[d].x),
                            c.push(e[d].y);
                        a.push(new E("BrushNode",x.aa({
                            points: c,
                            layer: this.view.Ja
                        }, this.aa)))
                    }
                } else {
                    if ("shapebrush" === this.mode) {
                        e = Hd(e, 20);
                        c = e;
                        g = l = b = e = l = d = void 0;
                        if (!(3 > c.length)) {
                            e = c[0];
                            b = c[c.length - 1];
                            g = 40 > e.kb(b);
                            for (d = 0; d < c.length; d++) {
                                var q = c[d];
                                for (l = d + 1; l < c.length; l++) {
                                    var r = c[l];
                                    20 > Math.abs(q.x - r.x) ? r.x = q.x : 20 > Math.abs(q.y - r.y) && (r.y = q.y)
                                }
                            }
                            q = nd(md(c));
                            for (d = 0; d < c.length; d++)
                                l = c[d],
                                20 > Math.abs(l.x - q.x) && (l.x = q.x),
                                20 > Math.abs(l.y - q.y) && (l.y = q.y);
                            g && (e.x = b.x,
                            e.y = b.y)
                        }
                        e = c
                    } else if ("freehand" === this.mode)
                        c = e,
                        c = Hd(c, 2),
                        c = Md(c, 4),
                        e = c = Hd(c, .5);
                    else if ("quadratic" === this.mode) {
                        e = Hd(e, 10);
                        b = $d(e);
                        c = b.ea[1];
                        d = b.ea[2];
                        l = b.ea[4];
                        g = b.ea[5];
                        e = b.ea[8];
                        b = b.ea[9];
                        l = ((3 * l - c) / 2 + (3 * l - e) / 2) / 2;
                        g = ((3 * g - d) / 2 + (3 * g - b) / 2) / 2;
                        q = new Ad;
                        q.moveTo(c, d);
                        q.quadraticCurveTo(l, g, e, b);
                        e = q;
                        c = new R;
                        d = 0;
                        for (e = e.ea; d < e.length; ) {
                            switch (e[d]) {
                            case Wb:
                                c.moveTo(e[d + 1], e[d + 2]);
                                break;
                            case Xb:
                                c.lineTo(e[d + 1], e[d + 2]);
                                break;
                            case 2:
                                c.vc(e[d + 1], e[d + 2], e[d + 3], e[d + 4], e[d + 5], e[d + 6]);
                                break;
                            case 3:
                                c.ba(e[d + 1], e[d + 2], e[d + 3], e[d + 4]);
                                break;
                            case Zb:
                                c.close()
                            }
                            d += $b[e[d]]
                        }
                        c = c.ea;
                        a.push(new E("PathNode",x.aa({
                            commands: c,
                            fillStyle: this.view.jb,
                            sloppiness: 0,
                            layer: this.view.Ja
                        }, this.aa)));
                        continue
                    }
                    1 === e.length && "freehand" === this.mode && e.push(new A(e[0].x + .1,e[0].y + .1));
                    if (1 < e.length) {
                        c = new R;
                        c.moveTo(e[0].x, e[0].y);
                        b = e[0].ic(e[e.length - 1]);
                        d = g = 1;
                        for (l = e.length - 1; g <= l; d = g += 1)
                            c.lineTo(e[d].x, e[d].y);
                        b && c.close();
                        a.push(new E("PathNode",x.aa({
                            commands: c.Rb(),
                            fillStyle: this.view.jb,
                            sloppiness: 0,
                            layer: this.view.Ja
                        }, this.aa)))
                    }
                }
            this.view.za(a);
            this.view.ib();
            f = B(this.view.la, m, !1);
            a.length && "quadratic" === this.mode ? (this.view.Fa = f,
            G(this.view)) : this.view.ia.get("singleStrokeBrush") ? ($e(this.view, f),
            G(this.view)) : this.reset();
            af(this.view)
        },
        Nb: function(a) {
            this.aa.strokeStyle = a.Va;
            var b;
            a.zd ? (this.view.jb = a.Va,
            this.view.zb = a.Va,
            b = "fillStyle") : (this.view.mb = a.Va,
            b = "strokeStyle");
            this.view.setProperty(b, a.Va)
        },
        ec: function(a) {
            this.view.zb = de(this.view.zb, a);
            this.aa.strokeStyle = de(this.aa.strokeStyle, a);
            this.view.jb = this.view.zb
        },
        vb: function(a) {
            this.log("keyboard: %s", a);
            "cancel" === a && (this.log("ESC pressed. Abort brush and go back to toolbar."),
            G(this.view),
            this.view.sb.emit("goto-toolbar"))
        },
        Tb: function() {
            return "circle" === this.mode ? "ellipse" : this.mode
        }
    };
    function Ye(a, b) {
        var c = document.createElement("canvas");
        b *= window.devicePixelRatio || 1;
        b *= a.view.scale;
        var d = Math.ceil(b + 1);
        c.width = 2 * d + 2;
        c.height = 2 * d + 2;
        var e = c.getContext("2d");
        e.beginPath();
        "round" === (a.aa.lineCap || "round") ? e.arc(d + 1, d + 1, d, 0, 2 * Math.PI) : e.rect(1, 1, 2 * d - 2, 2 * d - 2);
        e.lineWidth = 2;
        e.strokeStyle = "#ffffff";
        e.stroke();
        e.lineWidth = 1;
        e.strokeStyle = "#000000";
        e.stroke();
        c = c.toDataURL();
        a.view.canvas.style.cursor = "url(" + c + ") " + (d + 1) + " " + (d + 1) + ", auto"
    }
    ;function bf(a, b) {
        He(this, a, b, bf);
        this.aa = null
    }
    bf.prototype = {
        log: t("CUSTOM"),
        type: function() {
            return "CustomNode"
        },
        setProperty: function(a, b) {
            var c;
            null === this.aa && "type" === a && (c = cf[b],
            this.aa = new c);
            this.aa && this.aa.setProperty ? this.aa.setProperty(a, b) : Ge.prototype.setProperty.call(this, a, b)
        },
        pa: function(a) {
            return this.aa && this.aa.setProperty ? this.aa.getProperty(a) : Ge.prototype.pa.call(this, a)
        },
        format: function(a) {
            "format"in this.aa ? this.aa.format(a) : alert("Error: custom item must have a format(ctx) function");
            a = this.aa.rect;
            this.rect = new P(a.x,a.y,a.width,a.height)
        },
        ma: function(a) {
            this.aa.draw(a)
        }
    };
    Re("CustomNode", bf);
    function df(a, b) {
        He(this, a, b, df);
        this.fa.data = "";
        this.fa.locked = !1;
        this.element = null;
        this.ka = void 0;
        this.da = null;
        this.aa = new Q;
        this.na = !1
    }
    df.prototype = {
        log: t("DomNode", !0),
        type: function() {
            return "DomNode"
        },
        setProperty: function(a, b) {
            if ("data" === a)
                this.element && (x(this.element).remove(),
                this.ka = this.element = null);
            else if ("border" === a || "lockSize" === a || "lockRotate" === a) {
                this.fa[a] = b;
                return
            }
            Ge.prototype.setProperty.call(this, a, b)
        },
        We: function(a) {
            this.log("Node %s receives DOM element and requests reformat", this.id);
            this.element = a;
            this.element.style.position = "absolute";
            "IFRAME" !== a.tagName && (this.element.style.pointerEvents = "none");
            this.Sc(this.na);
            this.width = this.element.offsetWidth;
            this.height = this.element.offsetHeight;
            this.element.style.top = "0px";
            this.element.style.left = "0px";
            ef(this, "transformOrigin", "top left");
            this.ba.emit("reformat", this.id)
        },
        pc: function(a) {
            Ge.prototype.pc.call(this, a);
            this.element && (this.element.style.visibility = this.qa ? "hidden" : "visible")
        },
        Sc: function(a) {
            this.na = a;
            this.element && this.ba && (a ? Qa(x(this.element), x(this.ba.canvas)) : Pa(x(this.element), x(this.ba.canvas)))
        },
        format: function(a, b) {
            null === this.element && this.ka !== this.pa("data") && b && (this.ka = this.pa("data"),
            this.ba = b,
            this.log("DomNode %s requests conversion to DOM element", this.id),
            this.ba.emit("convert-dom-request", this.ka, this.id));
            if (this.element) {
                var c = this.aa
                  , c = c.multiply(this.Sa());
                1 === c.m11 && 1 === c.m22 && 0 === c.m12 && 0 === c.m21 ? (ef(this, "transform", ""),
                this.element.style.left = "" + c.Da + "px",
                this.element.style.top = "" + c.Ea + "px") : (this.element.style.left = "0px",
                this.element.style.top = "0px",
                ef(this, "transform", "matrix(" + c.m11 + "," + c.m21 + "," + c.m12 + "," + c.m22 + "," + c.Da + "," + c.Ea + ")"));
                this.rect.x = 0;
                this.rect.y = 0;
                this.rect.width = this.width;
                this.rect.height = this.height;
                this.element.style.visibility = this.qa ? "hidden" : "visible"
            } else
                this.rect.x = 0,
                this.rect.y = 0,
                this.rect.width = 100,
                this.rect.height = 22;
            this.da = new Id(this.rect);
            this.ab = this.rect.clone();
            this.rect.transform(this.Sa());
            this.da.transform(this.Sa());
            if (c = this.fa.border)
                this.rect.dc(c),
                this.ua = this.da.clone(),
                this.ua.dc(c / 2),
                this.da.dc(c)
        },
        Gc: function(a) {
            !a.tc || a.tc.m11 === this.aa.m11 && a.tc.m21 === this.aa.m21 && a.tc.m12 === this.aa.m12 && a.tc.m22 === this.aa.m22 && a.tc.Da === this.aa.Da && a.tc.Ea === this.aa.Ea || (this.log("Moving DOM element as result of draw zooming"),
            this.aa = a.tc,
            this.format(a, null));
            if (this.element) {
                var b = this.fa.border;
                if (b) {
                    var c = this.ua;
                    a.setTransform(1, 0, 0, 1, 0, 0);
                    a.beginPath();
                    a.lineWidth = b;
                    a.strokeStyle = "#cccccc";
                    a.moveTo(c.va[0].x, c.va[0].y);
                    a.lineTo(c.va[1].x, c.va[1].y);
                    a.lineTo(c.va[2].x, c.va[2].y);
                    a.lineTo(c.va[3].x, c.va[3].y);
                    a.lineTo(c.va[0].x, c.va[0].y);
                    a.closePath();
                    a.stroke()
                }
            } else
                a.beginPath(),
                a.lineWidth = 1,
                a.fillStyle = "#888888",
                a.strokeStyle = "#CCCCCC",
                a.rect(0, 0, 100, 22),
                a.stroke(),
                a.font = "20px Arial",
                a.textBaseline = "top",
                a.fillText("DomNode", 0, 0)
        },
        $a: function(a, b) {
            return !this.fa.locked && this.rect.Wb(a, b) && this.da.Wb(a, b, 3) ? this : null
        },
        Pe: function() {
            this.element && Pa(x(this.element), x(this.ba.canvas))
        },
        Re: function() {
            this.log("Removed DOM NODE");
            this.element && x(this.element).remove()
        }
    };
    function ef(a, b, c) {
        for (var d = b.charAt(0).toUpperCase() + b.substr(1), e = ["ms", "Webkit", "O", "Moz"], f = 0; f < e.length; f++)
            a.element.style[e[f] + d] = c;
        a.element.style[b] = c
    }
    Re("DomNode", df);
    function ff(a, b) {
        He(this, a, b, ff);
        this.fa.url = "";
        this.Ia = null;
        this.width = 100;
        this.height = 20;
        this.ka = new Id;
        this.da = [];
        this.ba = new P(0,0,this.width,this.height);
        this.aa = new P(0,0,this.width,this.height)
    }
    ff.prototype = {
        log: t("IMAGE", !0),
        type: function() {
            return "ImageNode"
        },
        setProperty: function(a, b) {
            Ge.prototype.setProperty.call(this, a, b);
            if ("url" === a)
                this.Ia = null;
            else if ("allowCrop" === a || "crop" === a || "blendMode" === a || "opacity" === a)
                this.fa[a] = b
        },
        format: function(a, b) {
            function c(a, b, c) {
                l.da.push({
                    x: l.aa.x + a * l.aa.width,
                    y: l.aa.y + b * l.aa.height,
                    cc: c
                })
            }
            var d, e, f, g, h, k = this;
            null === this.Ia && "ImageSurface"in window ? (this.Ia = new ImageSurface(this.fa.url),
            this.ba = new P(0,0,this.Ia.width,this.Ia.height)) : null === this.Ia ? (this.ba = new P(0,0,this.width,this.height),
            b.add(this.id, "image", this.fa.url, null, function(a) {
                k.log("Got image response.");
                k.Ia = a;
                return b.emit("reformat", k.id)
            })) : this.ba = new P(0,0,this.Ia.width,this.Ia.height);
            this.aa = gf(this);
            this.rect = this.aa.clone();
            if (d = this.pa("boundingPolygon")) {
                f = [];
                e = g = 0;
                for (h = d.length - 1; g <= h; e = g += 2)
                    f.push(new A(d[e],d[e + 1]));
                this.ka = new Id(f)
            } else
                this.ka = new Id(this.rect);
            this.ab = this.rect.clone();
            this.ka.transform(this.fa.matrix);
            this.rect.transform(this.fa.matrix);
            this.da.length = 0;
            var l = this;
            c(.5, 0, !0);
            c(1, .5, !1);
            c(.5, 1, !0);
            c(0, .5, !1)
        },
        Ge: function() {
            return this.ka
        },
        $a: function(a, b) {
            return !this.fa.locked && this.ka.Wb(a, b, 3) ? this : null
        },
        Gc: function(a) {
            var b, c, d, e, f = !1;
            if (this.Ia)
                try {
                    var g = a.globalCompositeOperation
                      , h = a.globalAlpha
                      , k = this.pa("blendMode")
                      , l = this.pa("opacity");
                    k && (a.globalCompositeOperation = "" + k,
                    this.log("Using globalCompsiteOperation=%s (requested %s)", a.globalCompositeOperation, k));
                    void 0 !== l && (a.globalAlpha = l);
                    a.drawImage(this.Ia, this.aa.x, this.aa.y, this.aa.width, this.aa.height, this.aa.x, this.aa.y, this.aa.width, this.aa.height);
                    a.globalAlpha = h;
                    a.globalCompositeOperation = g;
                    if (hf) {
                        c = this.ka.va;
                        a.save();
                        a.setTransform(1, 0, 0, 1, 0, 0);
                        a.beginPath();
                        a.lineWidth = 2;
                        a.strokeStyle = "#000000";
                        a.moveTo(c[0].x, c[0].y);
                        b = d = 1;
                        for (e = c.length - 1; d <= e; b = d += 1)
                            a.lineTo(c[b].x, c[b].y);
                        a.closePath();
                        a.stroke();
                        a.restore()
                    }
                } catch (m) {
                    this.log("Error drawing image: %s", m.message),
                    f = m
                }
            if (null === this.Ia || f)
                a.save(),
                a.lineWidth = 1,
                a.strokeStyle = "#cccccc",
                a.strokeRect(0, 0, this.width, this.height),
                a.restore()
        },
        dd: function() {
            return !1 !== this.pa("allowCrop") && !0 !== this.pa("lockEditMode")
        },
        je: function(a, b) {
            a.save();
            a.beginPath();
            a.lineWidth = 1 * b;
            a.strokeStyle = "#0050B7";
            a.globalCompositeOperation = "xor";
            for (var c = this.Sa(), d = 0; d < this.da.length; d++) {
                var e = this.da[d], f = c.apply(e.x, e.y), g, h, k, l;
                e.cc ? (g = 20,
                k = h = 0,
                l = 3,
                e = f.x - 10,
                f = f.y - 6) : (g = 0,
                h = 20,
                k = 3,
                l = 0,
                e = f.x - 6,
                f = f.y - 10);
                for (var m = 0; 5 > m; m++)
                    a.moveTo(e, f),
                    a.lineTo(e + g * b, f + h * b),
                    e += k * b,
                    f += l * b
            }
            a.stroke();
            a.restore()
        },
        Ub: function(a, b, c) {
            var d = this.Sa();
            c = 10 * c;
            for (var e = 0; e < this.da.length; e++) {
                var f = this.da[e]
                  , f = d.apply(f.x, f.y);
                if (f.x - c <= a && a < f.x + c && f.y - c <= b && b < f.y + c)
                    return e
            }
            return null
        },
        ke: function(a) {
            a = this.da[a];
            return this.Sa().apply(a.x, a.y)
        },
        Mc: function(a, b, c) {
            var d = gf(this);
            b = this.fa.matrix.inverse().apply(b, c);
            0 === a && 0 <= b.y ? (d.height -= b.y - d.y,
            d.y = b.y) : 1 === a && b.x < this.ba.width ? d.width = b.x - d.x : 2 === a && b.y < this.ba.height ? d.height = b.y - d.y : 3 === a && 0 <= b.x && (d.width -= b.x - d.x,
            d.x = b.x);
            d.x = Math.max(d.x, 0);
            d.y = Math.max(d.y, 0);
            d.width = Math.min(d.width, this.ba.width);
            d.height = Math.min(d.height, this.ba.height);
            d.width = Math.max(1, d.width);
            d.height = Math.max(1, d.height);
            this.fa.crop = [d.x, d.y, d.width, d.height].join()
        }
    };
    function gf(a) {
        var b = a.fa.crop;
        a = new P(0,0,a.ba.width,a.ba.height);
        b && (b = b.split(","),
        a.x = parseFloat(b[0]) | 0,
        a.y = parseFloat(b[1]) | 0,
        a.width = parseFloat(b[2]) | 0,
        a.height = parseFloat(b[3]) | 0);
        return a
    }
    var hf = !1;
    Re("ImageNode", ff);
    function jf(a, b) {
        He(this, a, b, jf);
        this.ba = "UnknownNode";
        this.width = 100;
        this.height = 20;
        this.aa = new Ee;
        Fe(this.aa, "centre", "middle")
    }
    jf.prototype = {
        log: t("UNKNOWN", !0),
        type: function() {
            return this.ba
        },
        setProperty: function(a, b) {
            this.fa[a] = b
        },
        format: function(a) {
            this.log("Formatting placeholder for %s", this.ba);
            this.rect = new P(0,0,this.width,this.height);
            this.rect.transform(this.fa.matrix);
            this.aa.format(a, this.width, this.height)
        },
        Gc: function(a) {
            this.log("Drawing placeholder for for %s", this.ba);
            a.save();
            a.lineWidth = 1;
            a.fillStyle = "#888888";
            a.fillRect(0, 0, this.width, this.height);
            a.fillStyle = "#000000";
            this.aa.ma(a, 0, 0);
            a.restore()
        }
    };
    Re("UnknownNode", jf);
    function kf(a, b) {
        He(this, a, b, kf);
        this.log("New WallNode created.");
        this.fa.svgpath = "";
        this.fa.strokeStyle = "#000000";
        this.fa.lineWidth = 1;
        this.fa.pixelsPerUnit = 1;
        this.fa.units = "px";
        this.fa.fontSize = 15;
        this.fa.fontName = "Arial";
        this.fa.textFillStyle = "#000000";
        this.fa.insideFillStyle = "rgba(0,0,0,0.0)";
        this.fa.fillStyle = "rgba(0,0,0,0.0)";
        this.fa.thickness = 10;
        this.fa.placement = "middle";
        this.font = "";
        this.rect = new P(0,0,0,0);
        this.ab = new P(0,0,0,0);
        this.path = null;
        this.aa = [];
        this.nb = [];
        this.oa = null
    }
    kf.prototype = {
        log: t("WallNode", !0),
        type: function() {
            return "WallNode"
        },
        format: function(a, b) {
            this.oa = a;
            var c = new A(0,0), d = [], e = null, f = this.Sa(), g = [], h = [], k, l = this;
            this.aa = d;
            this.path = new Ad;
            this.log("Formatting svgpath=%s", this.pa("svgpath"));
            Nd({
                moveTo: function(a, b) {
                    c = f.apply(a, b);
                    g.push(new A(a,b));
                    h.push(c);
                    e = null
                },
                lineTo: function(a, b) {
                    var l = f.apply(a, b);
                    e ? e = new Ce(e,l) : k = e = new Ce(c,l);
                    g.push(new A(a,b));
                    h.push(l);
                    c = l;
                    d.push(e)
                },
                vc: function() {},
                closePath: function() {
                    l.log("close");
                    k && e !== k && (l.log("close up!"),
                    k.ob = e,
                    e.next = k,
                    e.ja = k.ta)
                }
            }, this.pa("svgpath"));
            Nd(this.path, this.pa("svgpath"));
            this.ab = md(g);
            this.rect = md(h);
            this.path.transform(this.Sa());
            var m = this.pa("lineWidth");
            this.lineWidth = m;
            this.rect.dc(m / 2, m / 2);
            this.Sd = this.pa("thickness");
            this.font = "" + this.fa.fontSize + 'px "' + this.fa.fontName + '"';
            for (m = 0; m < this.aa.length; m++)
                lf(this, a, this.aa[m]);
            var q;
            this.nb.length = 0;
            for (var r, m = 0; m < d.length; m++)
                q = d[m],
                r !== q.ta && this.nb.push(new De(q,"from")),
                this.nb.push(new De(q,"to")),
                r = q.ja;
            for (m = 0; m < d.length; m++)
                q = d[m],
                this.nb.push(new De(q,"middle"));
            r = this.pa("insideFillStyle");
            Ke(this, a, b, r)
        },
        ma: function(a) {
            var b;
            a.save();
            a.lineJoin = "square";
            a.lineCap = "square";
            a.strokeStyle = this.pa("strokeStyle");
            a.lineWidth = this.pa("lineWidth");
            a.beginPath();
            mf(this, a);
            b = this.Ca.insideFill;
            a.fillStyle = b ? b.value : "magenta";
            a.fill();
            a.beginPath();
            var c = [], d, e;
            for (b = 0; b < this.aa.length; b++)
                e = this.aa[b],
                d !== e.ta && (this.log("points: %s", JSON.stringify(c)),
                Pd(a, c, this.pa("thickness"), this.pa("placement")),
                c.length = 0,
                c.push(e.ta)),
                c.push(e.ja),
                d = e.ja;
            this.log("points: %s", JSON.stringify(c));
            Pd(a, c, this.pa("thickness"), this.pa("placement"));
            a.fillStyle = this.pa("fillStyle");
            a.strokeStyle = this.pa("strokeStyle");
            a.fill();
            a.stroke();
            a.fillStyle = a.strokeStyle;
            if (0 < this.pa("pixelsPerUnit"))
                for (a.textBaseline = "alphabetic",
                a.fillStyle = this.pa("textFillStyle"),
                a.strokeStyle = this.pa("textFillStyle"),
                a.font = this.font,
                b = 0; b < this.aa.length; b++)
                    if (d = e = this.aa[b],
                    c = a,
                    "" !== d.text && (e = Nb(d.ta.x, d.ta.y, d.ja.x, d.ja.y),
                    !(e < d.xd))) {
                        c.save();
                        var f = 2 * d.Rd
                          , g = K(d.ta.x, d.ta.y, d.ja.x, d.ja.y)
                          , h = new A(g.y,-g.x)
                          , k = Math.atan2(d.ja.y - d.ta.y, d.ja.x - d.ta.x);
                        0 > k && (k += 2 * Math.PI);
                        d.se && (f *= -1);
                        var l = (e - d.xd) / 2
                          , m = new A(d.ta.x + h.x * f,d.ta.y + h.y * f)
                          , q = new A(d.ja.x + h.x * f,d.ja.y + h.y * f);
                        c.beginPath();
                        c.moveTo(m.x - h.x * f / 2, m.y - h.y * f / 2);
                        c.lineTo(m.x + h.x * f / 2, m.y + h.y * f / 2);
                        c.moveTo(q.x - h.x * f / 2, q.y - h.y * f / 2);
                        c.lineTo(q.x + h.x * f / 2, q.y + h.y * f / 2);
                        c.moveTo(m.x, m.y);
                        c.lineTo(m.x + g.x * l, m.y + g.y * l);
                        c.moveTo(q.x, q.y);
                        c.lineTo(q.x - g.x * l, q.y - g.y * l);
                        c.stroke();
                        k > Math.PI / 2 && k < 3 * Math.PI / 2 && (k += Math.PI);
                        c.translate(m.x + g.x * e / 2, m.y + g.y * e / 2);
                        c.rotate(k);
                        c.translate(-d.xd / 2, d.Rd / 2 * .8);
                        c.fillText(d.text, 0, 0);
                        c.restore()
                    }
            a.restore()
        },
        $a: function(a, b) {
            var c = 6 + this.pa("thickness") / 2;
            return "rgba(0,0,0,0.0)" === this.pa("fillStyle") ? !this.qa && !this.pa("locked") && this.rect.Wb(a, b, c) && Dd(this.path, a, b, c) ? this : null : !this.qa && !this.pa("locked") && this.rect.Wb(a, b, c) && Ed(this.path, a, b, c) ? this : null
        },
        Ub: function(a, b, c) {
            var d = this.pa("thickness");
            c = 6 / c + d;
            for (d = 0; d < this.nb.length; d++)
                if (this.nb[d].$a(a, b, c))
                    return d;
            return null
        },
        dd: function() {
            return !1
        },
        ke: function(a) {
            if (a >= this.nb.length)
                this.log("Bad edit handle %s", a);
            else {
                a: switch (a = this.nb[a],
                a.type) {
                case "from":
                    a = a.bb.ta;
                    break a;
                case "to":
                    a = a.bb.ja;
                    break a;
                default:
                    a = a.bb.ta
                }
                return a
            }
        },
        kc: function(a) {
            return null !== a && a < this.nb.length ? this.nb[a].type : null
        },
        Mc: function(a, b, c) {
            if (a >= this.nb.length)
                this.log("Bad edit handle %s", a);
            else {
                this.nb[a].moveTo(b, c);
                for (a = 0; a < this.aa.length; a++)
                    b = this.aa[a],
                    b.Kd && lf(this, this.oa, b);
                this.log("Reconstruct path!");
                a = new Od;
                b = this.Sa().inverse();
                a.transform(b.m11, b.m21, b.m12, b.m22, b.Da, b.Ea);
                mf(this, a);
                this.setProperty("svgpath", a.toString())
            }
        }
    };
    function mf(a, b) {
        var c = null, d, e, f;
        for (e = 0; e < a.aa.length; e++)
            d = a.aa[e],
            c !== d.ta && (b.moveTo(d.ta.x, d.ta.y),
            f = d.ta),
            b.lineTo(d.ja.x, d.ja.y),
            d.ja === f && b.closePath(),
            c = d.ja
    }
    function lf(a, b, c) {
        c.Kd = !1;
        if (0 >= a.fa.pixelsPerUnit)
            c.text = "",
            c.xd = 0,
            c.Rd = 0,
            c.se = !1;
        else {
            var d = Nb(c.ta.x, c.ta.y, c.ja.x, c.ja.y) / a.fa.pixelsPerUnit;
            if ("ft-in" === a.fa.units) {
                var e = Math.floor(d)
                  , d = Math.round(12 * (d - e));
                12 === d && (d = 0,
                e += 1);
                d = d ? " " + e + "'" + d + '" ' : " " + e + "' "
            } else
                e = Math.pow(10, 1),
                d = Math.round(d * e) / e,
                d = " " + d + a.fa.units + " ";
            b.font = a.font;
            b = b.measureText(d).width;
            a = a.fa.fontSize;
            var e = Math.atan2(-(c.ja.y - c.ta.y), c.ja.x - c.ta.x)
              , f = 2 * Math.PI
              , g = 2 * Math.PI;
            c.ob && (f = e - Math.atan2(-(c.ob.ja.y - c.ob.ta.y), c.ob.ja.x - c.ob.ta.x),
            0 > f && (f += 2 * Math.PI));
            c.next && (g = Math.atan2(-(c.next.ja.y - c.next.ta.y), c.next.ja.x - c.next.ta.x) - e,
            0 > g && (g += 2 * Math.PI));
            e = g < Math.PI || f < Math.PI;
            c.text = d;
            c.xd = b;
            c.Rd = a;
            c.se = e
        }
    }
    Re("WallNode", kf);
    function nf(a, b) {
        He(this, a, b, nf);
        Pe(this, of);
        this.fa.text = "lorum ipsum dolor";
        this.aa = new Ee;
        this.Ie = 0;
        this.border = {
            lineWidth: 0
        }
    }
    nf.prototype = {
        log: t("TEXT", !0),
        type: function() {
            return "TextNode"
        },
        setProperty: function(a, b) {
            this.fa[a] = b;
            if ("fontName" === a || "text" === a)
                this.path = null;
            "textFillStyle" === a ? this.fa.fillStyle = b : "fillStyle" === a && (this.fa.textFillStyle = b)
        },
        format: function(a) {
            var b, c = this.aa;
            b = this.fa.fontSize;
            var d = this.fa.bold
              , e = this.fa.italic;
            c.na = this.fa.fontName;
            c.fontSize = b;
            c.ka = d;
            c.qa = e;
            c = this.fa.text;
            c.length && 10 === c.charCodeAt(c.length - 1) && (this.log("Lastchar=%s; remove trailing newline", c.charCodeAt(c.length - 1)),
            c = c.substr(0, c.length - 1));
            this.aa.text = c;
            b = this.fa.matrix;
            c = b.apply(0, 0);
            b = b.apply(1, 0);
            c = c.kb(b);
            b = this.pa("wrap");
            d = !1 !== this.pa("scaleFont");
            Fe(this.aa, this.fa.textAlign, "top");
            b ? (b = this.fa.baseWidth,
            void 0 === b && (this.aa.format(a, 0, 0),
            b = Math.max(this.aa.rect.width, 10),
            500 < b && (b = 500),
            this.fa.baseWidth = b,
            this.log("Formatting text for first time; baseWidth=%s", b)),
            c = Math.ceil(c * b),
            this.aa.format(a, c, 0),
            a = this.aa.rect.height,
            this.ab = new P(0,0,b,a)) : d ? (this.aa.format(a, 0, 0),
            c = this.aa.rect.width,
            a = this.aa.rect.height,
            this.ab = new P(0,-(0 + this.pa("fontSize")),c,a)) : (this.aa.format(a, 0, 0),
            c = this.aa.rect.width,
            a = this.aa.rect.height,
            this.ab = new P(0,0,c,a));
            a = new Id(this.ab);
            a.transform(this.Sa());
            this.rect = md(a.va);
            this.Ie = this.rect.height;
            this.rect.height += 1.3 * this.fa.fontSize;
            a = this.pa("lineWidth") + 0;
            this.rect.dc(a, a);
            if (this.fa.border) {
                a = {
                    lineWidth: 0,
                    Va: "#000000"
                };
                c = this.fa.border.split(" ");
                for (b = 0; b < c.length; b++)
                    if (d = parseFloat(c[b]),
                    isNaN(d)) {
                        if (d = pf(c[b], !0))
                            a.Va = d.toString()
                    } else
                        a.lineWidth = d;
                this.border = a
            } else
                this.border = {
                    lineWidth: 0
                }
        },
        Sa: function() {
            return !1 === this.pa("scaleFont") ? rd(Ge.prototype.Sa.call(this)) : Ge.prototype.Sa.call(this)
        },
        ma: function(a) {
            if (0 !== this.fa.text.length) {
                a.save();
                this.pa("wrap") ? sd(rd(this.Sa()), a) : sd(this.Sa(), a);
                var b = this.fa.background;
                if (b || this.border.lineWidth)
                    a.save(),
                    b && (a.fillStyle = b,
                    a.fillRect(this.ab.x, this.ab.y, this.ab.width, this.ab.height)),
                    this.border.lineWidth && (a.beginPath(),
                    a.strokeStyle = this.border.Va,
                    a.lineWidth = this.border.lineWidth,
                    a.rect(this.ab.x, this.ab.y, this.ab.width, this.ab.height),
                    a.stroke()),
                    a.restore();
                a.strokeStyle = this.fa.strokeStyle;
                a.fillStyle = this.fa.fillStyle;
                a.lineWidth = this.fa.lineWidth;
                b = 0;
                this.fa.wrap || !1 === this.pa("scaleFont") || (b = -(0 + this.pa("fontSize")));
                this.fa.shadow && (a.shadowOffsetX = 3,
                a.shadowOffsetY = 3,
                a.shadowBlur = 5,
                a.shadowColor = "rgba(0,0,0,0.5)");
                0 < this.fa.lineWidth && this.aa.strokeText(a, 0, b);
                this.aa.fillText(a, 0, b);
                a.restore()
            }
        }
    };
    nf.prototype = x.aa({}, Ge.prototype, nf.prototype);
    var of = {
        textFillStyle: "#000000",
        fontName: "Arial",
        fontSize: 20,
        lineWidth: 0,
        fillStyle: "#000000",
        wrap: !1,
        textAlign: "left",
        bold: !1,
        italic: !1
    };
    Re("TextNode", nf);
    function qf(a, b) {
        He(this, a, b, qf);
        Pe(this, rf);
        this.fa.closed = !1;
        this.fa.commands = [];
        this.aa = [];
        this.ua = 0;
        this.fa.seed = 0;
        this.ba = new nf(0,b);
        this.ba.setProperty("text", this.fa.text);
        this.da = [];
        this.Ka = [];
        this.eb = !1;
        this.inverse = null
    }
    var rf = {
        strokeStyle: "#000000",
        fillStyle: "#ffffff",
        textFillStyle: "#000000",
        fontName: "Arial",
        fontSize: 20,
        lineWidth: 2,
        dashes: "",
        shapeWidth: 0,
        smoothness: .3,
        sloppiness: 0,
        shadow: !1,
        closed: !1,
        arrowSize: 0,
        arrowXOffset: null,
        arrowStyle: "simple",
        doubleArrow: !1,
        text: "",
        roundRadius: 0,
        wrap: !1,
        angleArcs: 0
    }
      , sf = [2, 2, 4, 5, 6, 2, 4, 0, 6];
    n = qf.prototype;
    n.log = t("PATHNODE");
    n.moveTo = function(a, b) {
        var c = this.fa.commands;
        c.push(0);
        c.push(a);
        c.push(b)
    }
    ;
    n.vc = function(a, b, c, d, e, f) {
        var g = this.fa.commands;
        g.push(4);
        g.push(e);
        g.push(f);
        g.push(a);
        g.push(b);
        g.push(c);
        g.push(d)
    }
    ;
    n.type = function() {
        return "PathNode"
    }
    ;
    n.Id = function() {
        return !0 === this.fa.closed
    }
    ;
    n.setProperty = function(a, b) {
        Ge.prototype.setProperty.apply(this, arguments);
        "fontName" === a || "fontSize" === a || "text" === a || "wrap" === a ? this.ba.setProperty(a, b) : "textFillStyle" === a ? this.ba.setProperty("fillStyle", b) : "spotHighlight" === a ? this.fa.spotHighlight = !0 : "cloudRadius" === a && (this.fa[a] = b)
    }
    ;
    n.ke = function(a) {
        for (var b = 0, c = this.fa.commands, d = a / 3 | 0, e = 0; e < d | 0; e++)
            b += sf[c[b]] + 1;
        e = a % 3 * 2 + 1;
        d = c[b + e];
        b = c[b + e + 1];
        this.log("getEditHandle(%s) = (%s, %s)", a, d, b);
        return this.Sa().apply(d, b)
    }
    ;
    n.Mc = function(a, b, c) {
        for (var d = 0, e = this.fa.commands, f = a / 3 | 0, g = 0; g < f; g++)
            d += sf[e[d]] + 1;
        f = this.inverse.apply(b, c);
        g = a % 3 * 2 + 1;
        e[d + g] = f.x;
        e[d + g + 1] = f.y;
        if (0 === a && this.fa.closed) {
            for (a = null; d < e.length; )
                f = sf[e[d]],
                2 <= f && (a = d),
                d += f + 1;
            a && (d = a,
            f = this.inverse.apply(b, c),
            e[d + 1] = f.x,
            e[d + 2] = f.y)
        }
    }
    ;
    n.format = function(a, b) {
        this.origin = null;
        this.aa.length = 0;
        this.inverse = this.fa.matrix.inverse();
        for (var c = new A(0,0), d = this.fa.commands, e = null, f, g, h = this.fa.matrix, k = new Vc(this.fa.seed), l = this.Ka.length = 0; l < d.length; ) {
            switch (d[l++]) {
            case 0:
                c = h.apply(d[l++], d[l++]);
                this.aa.push(new Lb(0,c));
                null === this.origin && (this.origin = c);
                this.Ka.push(c);
                break;
            case 1:
                c = h.apply(d[l++], d[l++]);
                this.aa.push(new Mb(e,c,k,this.fa.sloppiness,this.fa.roundRadius));
                this.Ka.push(c);
                break;
            case 2:
                c = h.apply(d[l++], d[l++]);
                e = h.apply(d[l++], d[l++]);
                this.aa.push(new Pb(0,e,c));
                break;
            case 3:
                c = h.apply(d[l++], d[l++]);
                e = h.apply(d[l++], d[l++]);
                f = d[l++];
                this.aa.push(new Qb(0,e,c,f));
                break;
            case 4:
                c = h.apply(d[l++], d[l++]);
                f = h.apply(d[l++], d[l++]);
                g = h.apply(d[l++], d[l++]);
                this.aa.push(new Rb(e,f,g,c));
                break;
            case 8:
                c = h.apply(d[l++], d[l++]);
                f = h.apply(d[l++], d[l++]);
                g = h.apply(d[l++], d[l++]);
                this.aa.push(new Sb(e,f,g,c));
                break;
            case 5:
                c = h.apply(d[l++], d[l++]);
                this.aa.push(new Ob(e,c,this.fa.smoothness));
                break;
            case 6:
                c = h.apply(d[l++], d[l++]);
                f = h.apply(d[l++], d[l++]);
                this.aa.push(new Tb(e,f,c,k,this.fa.sloppiness));
                break;
            case 7:
                this.fa.closed = !0;
                break;
            default:
                l++
            }
            e = this.aa[this.aa.length - 1]
        }
        this.fa.closed && 3 <= this.aa.length && this.aa[1].ud && (this.aa[1].ud(e),
        e.ja = this.origin);
        this.ua = this.aa.length;
        tf(this, k);
        this.rect.x = this.origin.x;
        this.rect.y = this.origin.y;
        this.rect.width = 0;
        this.rect.height = 0;
        c = this.fa.dashes.split(",");
        this.na = [];
        for (l = 0; l < c.length; l++)
            d = parseFloat(c[l]),
            isNaN(d) || this.na.push(d);
        l = this.na.length ? 2 : 8;
        c = new Ad;
        for (d = 0; d < this.aa.length; d++)
            this.aa[d].ma(c);
        this.fa.closed && c.closePath();
        f = e = d = 0;
        for (h = new Ad; d < c.ea.length; ) {
            switch (c.ea[d]) {
            case Wb:
                e = c.ea[d + 1];
                f = c.ea[d + 2];
                h.moveTo(e, f);
                break;
            case Xb:
                e = c.ea[d + 1];
                f = c.ea[d + 2];
                h.lineTo(e, f);
                break;
            case 2:
                g = k = [];
                var m = c.ea[d + 5]
                  , q = c.ea[d + 6];
                vd(g, e, f, c.ea[d + 1], c.ea[d + 2], c.ea[d + 3], c.ea[d + 4], m, q, l * l);
                g.push(new A(m,q));
                2 === k.length && 1E-4 > e * (k[0].y - k[1].y) + k[0].x * (k[1].y - f) + k[1].x * (f - k[0].y) && (k[0] = k[1],
                k.length = 1);
                for (e = 0; e < k.length; e++)
                    h.lineTo(k[e].x, k[e].y);
                e = c.ea[d + 5];
                f = c.ea[d + 6];
                break;
            case 3:
                g = k = [];
                m = c.ea[d + 3];
                q = c.ea[d + 4];
                xd(g, e, f, c.ea[d + 1], c.ea[d + 2], m, q, l * l);
                g.push(new A(m,q));
                for (e = 0; e < k.length; e++)
                    h.lineTo(k[e].x, k[e].y);
                e = c.ea[d + 3];
                f = c.ea[d + 4];
                break;
            case Zb:
                h.closePath()
            }
            d += $b[c.ea[d]]
        }
        this.ka = h;
        c = 0 + this.pa("shapeWidth");
        if (0 < c) {
            h = this.ka;
            this.log("ConvertToRects: width=%s", c);
            var d = 0, h = h.ea, r, u;
            for (f = new Ad; d < h.length; ) {
                this.log("cmd %s %s %s", h[d], h[d + 1], h[d + 2]);
                switch (h[d]) {
                case Wb:
                    r = h[d + 1];
                    u = h[d + 2];
                    break;
                case Xb:
                    k = h[d + 1],
                    e = h[d + 2],
                    this.log("(%s,%s-%s,%s)", r, u, k, e),
                    0 < Nb(r, u, k, e) && (m = K(r, u, k, e),
                    g = m.y * c / 2,
                    m = -m.x * c / 2,
                    f.moveTo(r + g, u + m),
                    f.lineTo(k + g, e + m),
                    f.lineTo(k - g, e - m),
                    f.lineTo(r - g, u - m),
                    f.closePath()),
                    r = k,
                    u = e
                }
                d += $b[h[d]]
            }
            this.ka = f
        }
        this.rect = Fd(this.ka, l);
        r = this.rect.width - 2 * (this.fa.lineWidth / 2 + 1);
        u = this.fa.lineWidth;
        l = this.ka.clone();
        l.transform(this.fa.matrix.inverse());
        this.ab = Fd(l, 3);
        this.ab.dc(2 * u + 1, 2 * u + 1);
        this.rect.dc(2 * u + 1, 2 * u + 1);
        8 > this.rect.width && (this.rect.x += this.rect.width / 2 - 4,
        this.rect.width = 8);
        8 > this.rect.height && (this.rect.y += this.rect.height / 2 - 4,
        this.rect.height = 8);
        this.fa.closed && (u = nd(this.rect),
        this.ba.setProperty("textAlign", "centre"),
        this.ba.setProperty("baseWidth", r),
        this.ba.format(a, b),
        r = u.x - this.ba.rect.x - this.ba.rect.width / 2,
        u = u.y - this.ba.rect.y - this.ba.Ie / 2,
        this.ba.transform(new F(r,u), new F(-r,-u)),
        this.ba.format(a, b));
        this.eb = 0 === pf(this.fa.fillStyle).values[3];
        this.da.length = 0;
        0 < this.fa.angleArcs ? (this.da.push(new Ub(this)),
        this.da[this.da.length - 1].Vb = this.fa.angleArcs) : 0 < this.fa.cloudRadius && this.da.push(new ac(this));
        for (l = 0; l < this.da.length; l++)
            this.da[l].format(a)
    }
    ;
    n.le = function() {
        return this.Ka
    }
    ;
    n.Gd = function() {
        return this.ka
    }
    ;
    function tf(a, b) {
        function c(a, c) {
            var h, q, r, u;
            h = a.x - c.x * f;
            q = a.y - c.y * f;
            r = h + c.y * e / 2;
            u = q - c.x * e / 2;
            h += -c.y * e / 2;
            q += c.x * e / 2;
            d.aa.push(new Lb(0,new A(h,q)));
            d.aa.push(new Ob(d.aa[d.aa.length - 1],a,g));
            d.aa.push(new Ob(d.aa[d.aa.length - 1],new A(r,u),g));
            "solid" === d.fa.arrowStyle && d.aa.push(new Mb(d.aa[d.aa.length - 1],new A(h,q),b,d.fa.smoothness,0))
        }
        a.gb = 0 < a.fa.arrowSize && !a.fa.closed && 0 < a.aa.length;
        if (a.gb) {
            var d = a
              , e = a.fa.arrowSize
              , f = a.fa.arrowXOffset
              , g = a.fa.smoothness;
            null === f && (f = e);
            var h = a.aa[a.aa.length - 1];
            c(h.ja, h.ac());
            a.fa.doubleArrow && c(a.aa[0].ja, kd(a.aa[1].Bc()))
        }
    }
    n.close = function() {
        this.fa.commands.push(7)
    }
    ;
    n.clip = function(a) {
        if (this.fa.closed) {
            this.log("Clipping to a path");
            for (var b = 0; b < this.aa.length; b++)
                this.aa[b].ma(a);
            a.closePath()
        }
    }
    ;
    n.Gc = function(a) {
        if (!this.fa.spotHighlight) {
            var b = this.inverse;
            a.save();
            a.lineJoin = "round";
            a.transform(b.m11, b.m21, b.m12, b.m22, b.Da, b.Ea);
            a.beginPath();
            a.lineCap = "round";
            var b = !0, c;
            for (c = 0; c < this.da.length; c++)
                this.da[c].Vg && (b = !1);
            if (b)
                for (c = 0; c < this.aa.length; c++)
                    this.aa[c].ma(a);
            this.fa.closed && (a.closePath(),
            a.fill(),
            a.shadowColor = "rgba(0,0,0,0.0)");
            this.na.length && 0 < this.fa.lineWidth ? (a.beginPath(),
            Cd(this.ka, a, this.na),
            a.lineCap = "butt") : 0 < 0 + this.pa("shapeWidth") && (a.beginPath(),
            this.ka.ma(a));
            0 < this.fa.lineWidth && a.stroke();
            if (this.fa.arrowSize && "solid" === this.fa.arrowStyle) {
                a.beginPath();
                for (c = this.ua; c < this.aa.length; c++)
                    this.aa[c].ma(a);
                a.fillStyle = this.fa.strokeStyle;
                a.fill()
            }
            this.fa.closed && this.ba.ma(a);
            for (c = 0; c < this.da.length; c++)
                this.da[c].ma(a);
            a.restore()
        }
    }
    ;
    n.$a = function(a, b) {
        if (this.qa || this.pa("locked"))
            return null;
        var c = 12 + this.fa.shapeWidth / 2 + this.fa.lineWidth / 2;
        if (a >= this.rect.x - c && a < this.rect.x + c + this.rect.width && b >= this.rect.y - c && b < this.rect.y + c + this.rect.height)
            if (this.fa.closed && !this.eb) {
                if (Ed(this.ka, a, b))
                    return this
            } else if (Dd(this.ka, a, b, c) || "" !== this.fa.text && this.ba.$a(a, b))
                return this;
        return null
    }
    ;
    n.lineTo = function(a, b) {
        var c = this.fa.commands;
        c.push(1);
        c.push(a);
        c.push(b)
    }
    ;
    n.Dd = function(a, b) {
        var c = this.fa.commands;
        c.push(5);
        c.push(a);
        c.push(b)
    }
    ;
    n.dd = function() {
        return !1 !== this.fa.editable && !0 !== this.fa.lockEditMode
    }
    ;
    n.Ub = function(a, b, c) {
        c = 8 * c;
        if (a >= this.origin.x - c && a < this.origin.x + c && b >= this.origin.y - c && b < this.origin.y + c)
            return 0;
        for (var d = 0; d < this.ua; d++) {
            var e = this.aa[d];
            if (e.control) {
                if (a >= e.control.x - c && a < e.control.x + c && b >= e.control.y - c && b < e.control.y + c)
                    return 3 * d + 1
            } else if (e.Ha) {
                if (a >= e.Ha.x - c && a < e.Ha.x + c && b >= e.Ha.y - c && b < e.Ha.y + c)
                    return 3 * d + 1;
                if (a >= e.Ma.x - c && a < e.Ma.x + c && b >= e.Ma.y - c && b < e.Ma.y + c)
                    return 3 * d + 2
            }
            if (a >= this.aa[d].ja.x - c && a < this.aa[d].ja.x + c && b >= this.aa[d].ja.y - c && b < this.aa[d].ja.y + c)
                return 3 * d
        }
        return null
    }
    ;
    n.kc = function(a) {
        var b = this.fa.commands;
        a = a / 3;
        var c = 0, d = !1, e = 0, f, g;
        for (f = 0; f < b.length; ) {
            g = b[f];
            if (7 === g) {
                d = !0;
                break
            }
            e += 1;
            f += sf[b[f]] + 1
        }
        0 === a && d && (a = e - 1);
        for (f = 0; f < b.length; c++) {
            var h;
            switch (b[f]) {
            case 0:
                h = "move_to";
                break;
            case 1:
                h = "line_to";
                break;
            case 2:
                h = "quadratic_to"
            }
            if (a === c)
                return h;
            f += sf[b[f]] + 1
        }
        return null
    }
    ;
    n.Le = function() {
        return !0
    }
    ;
    n.je = function(a, b, c) {
        a.save();
        a.lineWidth = 1 * b;
        a.strokeStyle = "#0050B7";
        a.fillStyle = "#0050B7";
        b = 8 * b;
        0 === c ? a.fillRect(this.origin.x - b, this.origin.y - b, 2 * b, 2 * b) : a.strokeRect(this.origin.x - b, this.origin.y - b, 2 * b, 2 * b);
        var d = this.aa.length;
        this.fa.closed && --d;
        for (d = 1; d < this.ua; d++) {
            var e = this.aa[d];
            a.beginPath();
            if (e.control)
                a.arc(this.aa[d].control.x, this.aa[d].control.y, b, 0, 2 * Math.PI),
                a.arc(this.aa[d].control.x, this.aa[d].control.y, 2 * b, 0, 2 * Math.PI),
                c === 3 * d + 1 ? a.fill() : a.stroke();
            else if (e instanceof Rb || e instanceof Sb) {
                var f, g, h;
                f = e.Ha;
                g = e.Ma;
                h = e instanceof Rb ? e.ya.ja : e.ja;
                f && (a.moveTo(h.x, h.y),
                a.lineTo(f.x, f.y),
                a.moveTo(f.x + b, f.y),
                a.arc(f.x, f.y, b, 0, 2 * Math.PI),
                c === 3 * d + 1 ? a.fill() : a.stroke());
                a.beginPath();
                a.moveTo(e.ja.x, e.ja.y);
                a.lineTo(g.x, g.y);
                a.moveTo(g.x + b, g.y);
                a.arc(g.x, g.y, b, 0, 2 * Math.PI);
                c === 3 * d + 2 ? a.fill() : a.stroke()
            }
            c === 3 * d ? a.fillRect(this.aa[d].ja.x - b, this.aa[d].ja.y - b, 2 * b, 2 * b) : a.strokeRect(this.aa[d].ja.x - b, this.aa[d].ja.y - b, 2 * b, 2 * b)
        }
        a.restore()
    }
    ;
    function R(a) {
        void 0 === a ? this.ea = [] : this.ea = a
    }
    R.prototype = {
        da: function(a, b, c) {
            for (var d = 0, e = 0; e < a; e++)
                d += sf[this.ea[d]] + 1;
            this.ea[d + 1] = b;
            this.ea[d + 2] = c
        },
        moveTo: function(a, b) {
            this.ea.push(0);
            this.ea.push(a);
            this.ea.push(b)
        },
        lineTo: function(a, b) {
            this.ea.push(1);
            this.ea.push(a);
            this.ea.push(b)
        },
        Dd: function(a, b) {
            this.ea.push(5);
            this.ea.push(a);
            this.ea.push(b)
        },
        ba: function(a, b, c, d) {
            this.ea.push(2);
            this.ea.push(c);
            this.ea.push(d);
            this.ea.push(a);
            this.ea.push(b)
        },
        aa: function(a, b, c, d) {
            this.ea.push(6);
            this.ea.push(c);
            this.ea.push(d);
            this.ea.push(a);
            this.ea.push(b)
        },
        vc: function(a, b, c, d, e, f) {
            this.ea.push(4);
            this.ea.push(e);
            this.ea.push(f);
            this.ea.push(a);
            this.ea.push(b);
            this.ea.push(c);
            this.ea.push(d)
        },
        arcTo: function(a, b, c, d, e) {
            this.ea.push(3);
            this.ea.push(c);
            this.ea.push(d);
            this.ea.push(a);
            this.ea.push(b);
            this.ea.push(e)
        },
        ka: function() {
            for (var a = [], b = 0; b < this.ea.length; ) {
                for (var c = this.ea[b], d = 0; d < sf[c]; d += 2)
                    a.push(new A(this.ea[b + 1 + d],this.ea[b + 1 + d + 1]));
                b += sf[c] + 1
            }
            a = md(a);
            return {
                x: a.x,
                y: a.y,
                width: a.width,
                height: a.height
            }
        },
        translate: function(a, b) {
            for (var c = 0; c < this.ea.length; ) {
                for (var d = this.ea[c], e = 0; e < sf[d]; e += 2)
                    this.ea[c + 1 + e] += a,
                    this.ea[c + 2 + e] += b;
                c += sf[d] + 1
            }
        },
        closePath: function() {
            this.ea.push(7)
        },
        close: function() {
            this.closePath()
        },
        Rb: function() {
            return this.ea
        }
    };
    function uf() {
        var a = new A(0,0)
          , b = new R;
        b.moveTo(a.x, a.y - 50);
        b.aa(a.x + 50, a.y - 50, a.x + 50, a.y);
        b.aa(a.x + 50, a.y + 50, a.x, a.y + 50);
        b.aa(a.x - 50, a.y + 50, a.x - 50, a.y);
        b.aa(a.x - 50, a.y - 50, a.x, a.y - 50);
        b.closePath();
        return b.Rb()
    }
    Re("PathNode", qf);
    function vf(a, b, c, d, e) {
        this.view = a;
        this.node = null;
        this.type = b;
        this.url = c || "";
        this.fa = d || {};
        this.ka = e;
        "wrap"in this.fa || (this.fa.wrap = this.view.ia.get("multilineText"));
        "fontSize"in this.fa || (this.fa.fontSize = this.view.ia.get("defaultFontSize"));
        this.ba = new hb(this.view)
    }
    vf.prototype = {
        Gb: function() {
            this.log("Entering DrawLinesBehaviour");
            this.view.canvas.style.cursor = "crosshair";
            this.view.ia.$b() || ue(this.view, "click-to-place-first-point-of-line");
            this.view.ma();
            this.aa = new A(0,0);
            this.da = new A(0,0);
            this.node = null;
            this.state = "start"
        },
        log: t("DRAWLINES"),
        reset: function() {
            this.Gb()
        },
        hb: function(a) {
            var b;
            "touchstart" === a.type ? (b = a.changedTouches[0],
            b = y(this.view, b.pageX, b.pageY),
            this.Oa(b.x, b.y, a)) : "touchmove" === a.type ? (b = a.changedTouches[0],
            b = y(this.view, b.pageX, b.pageY),
            this.Ra(b.x, b.y, a)) : "touchend" === a.type && (b = a.changedTouches[0],
            b = y(this.view, b.pageX, b.pageY),
            this.Ya(b.x, b.y, a))
        },
        Wa: function(a) {
            this.ba.Wa(a);
            this.ba.aa && this.node && this.reset()
        },
        vb: function(a) {
            "cancel" === a && (null !== this.node && this.view.Kg && "curve" === this.type && this.za(),
            null !== this.node && this.view.la.removeNode(this.node),
            this.view.Ga.qb ? this.view.sb.emit("goto-toolbar") : G(this.view))
        },
        done: function() {
            this.view.ia.get("autoPickTool") ? G(this.view) : this.state = "start"
        },
        Oa: function(a, b) {
            var c = this.view.Ua(new A(a,b));
            if ("start" === this.state)
                if (this.aa = new A(a,b),
                "stampline" === this.type)
                    this.node = ee("StampLineNode", wf(this.view.la), this.view.la),
                    this.node.setProperty("x1", c.x),
                    this.node.setProperty("y1", c.y),
                    this.node.setProperty("x2", c.x),
                    this.node.setProperty("y2", c.y),
                    this.node.setProperty("url", this.url),
                    he(this.view.la, this.node),
                    ue(this.view, "click-to-set-the-end-of-the-line"),
                    this.view.update(),
                    this.index = 3;
                else {
                    this.node = new qf(wf(this.view.la),this.view.la);
                    this.node.setProperty("seed", Math.round(65535 * Math.random()));
                    this.node.setProperty("strokeStyle", this.view.mb);
                    this.node.setProperty("lineWidth", this.view.Ba.lineWidth);
                    this.node.setProperty("sloppiness", this.view.Ba.sloppiness);
                    this.node.setProperty("smoothness", this.view.Ba.smoothness);
                    for (var d in this.fa)
                        this.fa.hasOwnProperty(d) && this.node.setProperty(d, this.fa[d]);
                    he(this.view.la, this.node);
                    "arrow" === this.type && (this.node.setProperty("arrowSize", this.view.ia.wa.defaultArrowSize),
                    this.node.setProperty("arrowStyle", this.view.ia.wa.defaultArrowStyle));
                    this.node.moveTo(c.x, c.y);
                    xf(this, c.x, c.y);
                    this.index = 3;
                    this.view.update();
                    this.state = "predrag"
                }
            else if ("placing" === this.state)
                if ("arrow" !== this.type && 8 > this.aa.kb(new A(a,b)) && 3 < this.index)
                    this.log("Clicked close to start; automatically closing path"),
                    this.node.close(),
                    this.za(),
                    this.done();
                else if (8 > this.da.kb(new A(a,b))) {
                    if (3 < this.index) {
                        for (var c = this.node.fa.commands, e = d = 0; e < this.index / 3; e++)
                            d += sf[c[d]] + 1;
                        c.splice(d, sf[c[d]] + 1);
                        this.za()
                    } else
                        this.cancel();
                    this.done()
                } else {
                    if (this.ka) {
                        this.za();
                        this.done();
                        return
                    }
                    xf(this, c.x, c.y);
                    this.index += 3;
                    ce(this.view.la, this.node.id);
                    this.view.update()
                }
            else
                throw "Invalid state";
            this.da = new A(a,b)
        },
        Ya: function(a, b) {
            var c = this.aa.kb(new A(a,b));
            this.log("onMouseUp (%s,%s) %s", a, b, this.state);
            "predrag" === this.state && (this.log("MovedBy: %s", c),
            10 < c ? (this.za(),
            this.done()) : (this.state = "placing",
            ue(this.view, "click-to-place-another-point-or-double-click-to-end-the-line")))
        },
        Ra: function(a, b) {
            var c = this.view.Ua(new A(a,b));
            a = c.x;
            b = c.y;
            this.node && (this.node.Mc(this.index, a, b),
            this.node.format(this.view.oa, this.view.request),
            this.view.ma())
        },
        za: function() {
            var a = this.node
              , b = a.aa[a.aa.length - 1];
            8 >= Nb(b.ja.x, b.ja.y, a.origin.x, a.origin.y) && a.close();
            this.view.la.removeNode(this.node);
            a = this.view.ia.wa.defaultArrowSize;
            b = this.node.pa("commands");
            if ("linear-bezier" === this.type) {
                for (var c = 0, d = [], e, f, g, h, k, l; c < b.length; ) {
                    var m = b[c];
                    switch (m) {
                    case 0:
                        g = b[c + 1];
                        h = b[c + 2];
                        d.push(m, g, h);
                        break;
                    case 1:
                        e = b[c + 1],
                        f = b[c + 2],
                        void 0 !== k && d.push(4, e, f, (k + g) / 2, (l + h) / 2, (g + e) / 2, (h + f) / 2),
                        k = g,
                        l = h,
                        g = e,
                        h = f
                    }
                    c += sf[m] + 1
                }
                b = d
            }
            g = {
                arrowSize: "arrow" === this.type ? a : 0,
                arrowStyle: this.view.ia.wa.defaultArrowStyle,
                commands: b,
                seed: this.node.pa("seed"),
                fillStyle: this.view.jb,
                strokeStyle: this.view.mb,
                lineWidth: this.view.Ba.lineWidth,
                sloppiness: this.view.Ba.sloppiness,
                smoothness: this.view.Ba.smoothness,
                layer: this.view.Ja
            };
            for (var q in this.fa)
                this.fa.hasOwnProperty(q) && (g[q] = this.fa[q]);
            this.view.za([new E("PathNode",g)]);
            this.node = null
        },
        cancel: function() {
            this.node && (this.view.la.removeNode(this.node),
            this.node = null)
        },
        Mb: function() {
            this.view.canvas.style.cursor = "default";
            ue(this.view, null);
            this.view.ma()
        },
        Nb: function(a) {
            var b;
            a.zd ? (this.view.jb = a.Va,
            this.view.zb = a.Va,
            b = "fillStyle",
            this.log("We are drawing lines. Set strokeStyle instead of fillStyle")) : b = "strokeStyle";
            this.view.mb = a.Va;
            this.view.setProperty(b, a.Va)
        },
        ec: function(a, b) {
            b ? (this.view.jb = de(this.view.jb, a),
            this.view.zb = de(this.view.zb, a)) : this.view.mb = de(this.view.mb, a);
            le(this.view, a, b)
        },
        Tb: function() {
            return this.type
        }
    };
    function xf(a, b, c) {
        "curve" === a.type || "arrow" === a.type || "linear-bezier" === a.type ? a.node.Dd(b, c) : a.node.lineTo(b, c)
    }
    ;function yf() {}
    yf.prototype = {
        Eb: "Action",
        Te: function(a) {
            var b, c, d, e;
            this.id && (this.id = a(this.id));
            if (this.aa && 0 < this.aa.length) {
                e = [];
                b = c = 0;
                for (d = this.aa.length - 1; 0 <= d ? c <= d : c >= d; b = 0 <= d ? ++c : --c)
                    e.push(this.aa[b] = a(this.aa[b]));
                return e
            }
        },
        log: t("ACTION"),
        toString: function() {
            return "" + this.Eb + "()"
        }
    };
    yf.prototype = x.aa({}, Ab.prototype, yf.prototype);
    function E(a, b, c, d) {
        this.type = a;
        this.ba = c;
        this.index = d;
        this.fa = b;
        this.id = 0
    }
    E.prototype = {
        Eb: "CreateAction",
        Bb: function(a) {
            this.id = this.id || wf(a);
            this.node = ee(this.type, this.id, a);
            if (!this.node)
                if (this.type in cf)
                    this.node = new bf(this.id,a),
                    this.node.setProperty("type", this.type);
                else {
                    this.log("Bad node type: %s", this.type);
                    var b = this.node = ee("UnknownNode", this.id, a)
                      , c = this.type;
                    b.ba = c;
                    b.aa.text = c;
                    b.log("Creating placeholder for node type %s", c)
                }
            ge(this.node, this.fa);
            if (void 0 === this.ba || void 0 === this.index)
                this.ba = a.bd().id,
                this.index = -1;
            b = B(a, this.ba, !1);
            zf(a, b, this.node, this.index);
            this.log("Add %s id %s to parent %s index %s", this.node.type(), this.id, b.type(), this.index)
        },
        toString: function() {
            return "" + this.Eb + "(" + this.type + ", " + JSON.stringify(this.fa) + ", parent=" + this.ba + ", index=" + this.index + ")"
        },
        cb: function(a) {
            a.removeNode(this.node)
        }
    };
    E.prototype = x.aa({}, yf.prototype, E.prototype);
    function Af(a) {
        this.aa = a;
        this.ba = []
    }
    Af.prototype = {
        Eb: "DeleteAction",
        Bb: function(a) {
            var b, c, d, e;
            this.ba.length = 0;
            e = this.aa;
            c = 0;
            for (d = e.length; c < d; c++)
                b = e[c],
                b = B(a, b, !1),
                this.ba.push({
                    node: b,
                    parent: b.parent,
                    index: a.removeNode(b)
                })
        },
        cb: function(a) {
            var b, c, d, e;
            if (0 !== this.ba.length)
                for (e = this.ba,
                c = 0,
                d = e.length; c < d; c++)
                    b = e[c],
                    zf(a, b.parent, b.node, b.index)
        }
    };
    Af.prototype = x.aa({}, yf.prototype, Af.prototype);
    function me(a, b, c) {
        this.aa = a;
        this.name = b;
        this.value = c;
        this.ba = []
    }
    me.prototype = {
        Eb: "SetAction",
        Bb: function(a) {
            var b, c, d, e;
            this.ba.length = 0;
            e = this.aa;
            c = 0;
            for (d = e.length; c < d; c++)
                b = e[c],
                b = B(a, b, !0),
                this.ba.push(b.pa(this.name)),
                b.setProperty(this.name, this.value)
        },
        cb: function(a) {
            var b, c, d, e;
            if (0 !== this.aa.length)
                for (b = d = 0,
                e = this.aa.length - 1; 0 <= e ? d <= e : d >= e; b = 0 <= e ? ++d : --d)
                    c = B(a, this.aa[b], !0),
                    c.setProperty(this.name, this.ba[b])
        },
        Ne: function(a) {
            if (this.name !== a.name)
                return !1;
            this.aa.sort();
            a.aa.sort();
            if (this.aa.length !== a.aa.length)
                return !1;
            for (var b = 0; b < this.aa.length; b++)
                if (this.aa[b] !== a.aa[b])
                    return !1;
            this.log("Merging property change %s", this.name);
            this.value = a.value;
            return !0
        }
    };
    me.prototype = x.aa({}, yf.prototype, me.prototype);
    function Ud(a, b) {
        this.aa = a;
        this.xa = b;
        this.inverse = b.inverse()
    }
    Ud.prototype = {
        Eb: "TransformAction",
        Bb: function(a) {
            this.log("Execute transformAction");
            var b, c, d, e;
            e = this.aa;
            c = 0;
            for (d = e.length; c < d; c++)
                b = e[c],
                b = B(a, b, !0),
                b.transform(this.xa)
        },
        cb: function(a) {
            var b, c, d, e;
            e = this.aa;
            c = 0;
            for (d = e.length; c < d; c++)
                b = e[c],
                b = B(a, b, !0),
                b.transform(this.inverse)
        },
        Te: function(a) {
            var b, c, d;
            if (0 !== this.aa.length)
                for (b = c = 0,
                d = this.aa.length - 1; 0 <= d ? c <= d : c >= d; b = 0 <= d ? ++c : --c)
                    this.aa[b] = a(this.aa[b])
        }
    };
    Ud.prototype = x.aa({}, yf.prototype, Ud.prototype);
    function Ya(a, b, c, d, e, f) {
        this.id = a;
        this.ba = b;
        this.da = c;
        this.ka = d;
        this.x = e;
        this.y = f
    }
    Ya.prototype = {
        Eb: "MoveEditHandleAction",
        Bb: function(a) {
            B(a, this.id, !0).Mc(this.ba, this.x, this.y)
        },
        cb: function(a) {
            B(a, this.id, !0).Mc(this.ba, this.da, this.ka)
        }
    };
    Ya.prototype = x.aa({}, yf.prototype, Ya.prototype);
    function Bf(a) {
        this.id = 0;
        this.aa = a;
        this.ba = []
    }
    Bf.prototype = {
        Eb: "GroupAction",
        Bb: function(a) {
            var b, c, d, e;
            this.ba.length = 0;
            e = this.aa;
            c = 0;
            for (d = e.length; c < d; c++)
                b = e[c],
                b = B(a, b),
                this.ba.push({
                    node: b,
                    parent: b.parent,
                    index: Te(b.parent, b)
                });
            this.id = this.id || wf(a);
            this.node = a.Ic(this.id, this.aa)
        },
        cb: function(a) {
            var b, c;
            if (0 !== this.aa.length) {
                for (b = c = this.aa.length - 1; 0 <= c && !(0 > b); b = c += -1)
                    b = this.ba[b],
                    zf(a, b.parent, b.node, b.index);
                a.removeNode(this.node)
            }
        },
        toString: function() {
            return "GroupAction(" + JSON.stringify(this.aa) + ")"
        }
    };
    Bf.prototype = x.aa({}, yf.prototype, Bf.prototype);
    function Cf(a) {
        this.aa = a;
        this.ba = []
    }
    Cf.prototype = {
        Eb: "UngroupAction",
        Bb: function(a) {
            var b, c, d, e, f, g, h, k, l;
            d = {};
            k = this.aa;
            e = 0;
            for (g = k.length; e < g; e++)
                if (b = k[e],
                b = B(a, b),
                Ne(b) && !(b.id in d))
                    for (d[b.id] = !0,
                    c = {
                        node: b,
                        parent: b.parent,
                        children: b.children.concat(),
                        index: a.removeNode(b)
                    },
                    this.ba.push(c),
                    l = c.children,
                    f = 0,
                    h = l.length; f < h; f++)
                        b = l[f],
                        zf(a, c.parent, b, -1)
        },
        cb: function(a) {
            var b, c, d, e;
            if (0 !== this.ba.length) {
                for (b = d = this.ba.length - 1; 0 <= d && !(0 > b); b = d += -1)
                    if (b = this.ba[b],
                    0 !== b.children.length) {
                        for (c = e = b.children.length - 1; 0 <= e && !(0 > c); c = e += -1)
                            zf(a, b.node, b.children[c], -1);
                        zf(a, b.parent, b.node, b.index)
                    }
                a.Fd()
            }
        }
    };
    Cf.prototype = x.aa({}, yf.prototype, Cf.prototype);
    function Df(a, b) {
        var c, d, e, f;
        if (Ne(a))
            for (f = a.children,
            d = 0,
            e = f.length; d < e; d++)
                c = f[d],
                Df(c, b);
        else
            a.transform(b)
    }
    function Ef(a, b) {
        this.aa = a;
        this.offset = b;
        this.Aa = [];
        this.ba = []
    }
    Ef.prototype = {
        Eb: "DuplicateAction",
        Bb: function(a) {
            var b, c, d, e, f, g;
            d = new F(this.offset,this.offset);
            this.Aa.length = 0;
            var h = this;
            c = this.ba.length ? function() {
                return h.ba[e]
            }
            : function() {
                var b = wf(a);
                h.ba.push(b);
                return b
            }
            ;
            g = this.aa;
            e = 0;
            for (f = g.length; e < f; e++)
                b = g[e],
                b = B(a, b).clone(c),
                Df(b, d),
                he(a, b),
                this.Aa.push(b)
        },
        cb: function(a) {
            var b, c;
            if (0 !== this.Aa.length)
                for (b = c = this.Aa.length - 1; 0 <= c && !(0 > b); b = c += -1)
                    a.removeNode(this.Aa[b])
        }
    };
    Ef.prototype = x.aa({}, yf.prototype, Ef.prototype);
    function Ff(a, b) {
        this.aa = a;
        this.type = b;
        this.Aa = [];
        this.ba = []
    }
    Ff.prototype = {
        Eb: "ChangeOrderAction",
        Bb: function(a) {
            var b, c, d, e, f, g;
            this.ba.length = 0;
            this.Aa.length = 0;
            g = this.aa;
            e = 0;
            for (f = g.length; e < f; e++)
                switch (b = g[e],
                b = B(a, b),
                d = b.parent,
                c = a.removeNode(b),
                this.ba.push(c),
                this.Aa.push(b),
                this.type) {
                case Gf:
                    zf(a, d, b, -1);
                    break;
                case Hf:
                    zf(a, d, b, 0);
                    break;
                case If:
                    0 < c ? zf(a, d, b, c - 1) : zf(a, d, b, c);
                    break;
                case Jf:
                    c < d.children.length ? zf(a, d, b, c + 1) : zf(a, d, b, c)
                }
        },
        cb: function(a) {
            var b, c, d, e;
            if (0 !== this.aa.length)
                for (b = e = this.aa.length - 1; 0 <= e && !(0 > b); b = e += -1)
                    c = this.Aa[b],
                    d = c.parent,
                    a.removeNode(c),
                    zf(a, d, c, this.ba[b])
        }
    };
    var Gf = 0
      , Hf = 1
      , Jf = 2
      , If = 3;
    Ff.prototype = x.aa({}, yf.prototype, Ff.prototype);
    function Kf(a) {
        this.fa = a
    }
    Kf.prototype = {
        Eb: "SetDocumentPropertiesAction",
        Bb: function(a) {
            var b;
            this.ba = {};
            for (b in this.fa)
                this.fa.hasOwnProperty(b) && (this.ba[b] = a.pa(b),
                a.setProperty(b, this.fa[b]))
        },
        cb: function(a) {
            for (var b in this.ba)
                this.ba.hasOwnProperty(b) && a.setProperty(b, this.ba[b])
        }
    };
    Kf.prototype = x.aa({}, yf.prototype, Kf.prototype);
    function Lf(a) {
        this.da = a;
        this.ba = 0
    }
    Lf.prototype = {
        Eb: "SetPageAction",
        Bb: function(a) {
            this.ba = a.yb;
            a.pb(this.da)
        },
        cb: function(a) {
            a.pb(this.ba)
        }
    };
    Lf.prototype = x.aa({}, yf.prototype, Lf.prototype);
    function S(a, b) {
        if (!a)
            throw b || "Assertion failed";
    }
    function Mf(a) {
        S("number" === typeof a, "Expected a number")
    }
    function Nf(a) {
        return "object" === typeof a && "[object Array]" === Object.prototype.toString.apply(a)
    }
    function Of(a) {
        return "string" === typeof a
    }
    function M(a) {
        return "number" === typeof a
    }
    ;function T(a) {
        this.keys = {};
        1 === arguments.length && this.add(arguments[0]);
        1 === arguments.length && "object" === typeof arguments[0] && this.add(arguments[0])
    }
    T.prototype = {
        contains: function(a) {
            return a in this.keys
        },
        add: function(a) {
            var b, c;
            if ("string" === typeof a || "number" === typeof a)
                this.keys[a] = !0;
            else if ("object" === typeof a)
                if ("[object Array]" === Object.prototype.toString.apply(a))
                    for (c = 0; c < a.length; c++)
                        b = a[c],
                        this.keys[b] = !0;
                else
                    for (b in a)
                        a.hasOwnProperty(b) && (this.keys[b] = !0);
            else
                return S(!1, "Arg must be an array")
        },
        remove: function(a) {
            delete this.keys[a]
        },
        Rb: function() {
            var a, b;
            b = [];
            for (a in this.keys)
                this.keys.hasOwnProperty(a) && b.push(a);
            return b
        }
    };
    function Pf(a) {
        var b, c;
        c = [];
        for (b in a.keys)
            a.keys.hasOwnProperty(b) && c.push(parseFloat(b));
        return c
    }
    function Qf(a, b) {
        var c, d;
        S(b instanceof T);
        d = new T;
        for (c in a.keys)
            b.contains(c) || d.add(c);
        return d
    }
    ;function Rf(a) {
        J.apply(this, arguments);
        this.na = new zb;
        this.Aa = {};
        this.ua = new T;
        this.Fd = this.eb = !0;
        this.rb = 0;
        this.ka = new T;
        this.da = new T;
        this.qa = new T;
        this.root = new Se(wf(this),this);
        this.Aa[this.root.id] = this.root;
        this.ub = 0;
        this.tb = "magenta";
        this.gb = this.na.next;
        this.fa = {};
        this.Ka = new T;
        this.Db = new T;
        this.Ca = [];
        this.aa = [];
        this.yb = 0;
        a || (Sf(this, this.root),
        this.pb(this.ed(0)))
    }
    Rf.prototype = {
        log: t("DOC"),
        empty: function() {
            return 0 === this.root.children.length
        },
        Lb: function() {
            return this.gb !== this.na.next
        },
        za: function(a, b) {
            this.ka = new T;
            this.da = new T;
            this.qa = new T;
            if (b) {
                this.log("Performing actions without adding to undo stack");
                for (var c = 0; c < a.length; c++)
                    a[c].Bb(this)
            } else
                this.na.za(a, !1, this);
            return {
                Sb: Pf(this.ka),
                Qc: Pf(this.da),
                Cc: Pf(Qf(Qf(this.qa, this.ka), this.da))
            }
        },
        cb: function() {
            this.ka = new T;
            this.da = new T;
            this.qa = new T;
            this.na.cb(this);
            return {
                Sb: Pf(this.ka),
                Qc: Pf(this.da),
                Cc: Pf(Qf(Qf(this.qa, this.ka), this.da))
            }
        },
        fc: function() {
            this.ka = new T;
            this.da = new T;
            this.qa = new T;
            this.na.fc(this);
            return {
                Sb: Pf(this.ka),
                Qc: Pf(this.da),
                Cc: Pf(Qf(Qf(this.qa, this.ka), this.da))
            }
        },
        xc: function() {
            return this.na.xc()
        },
        wc: function() {
            return this.na.wc()
        },
        format: function(a, b) {
            var c, d, e, f, g;
            d = this.eb ? this.Aa : this.ua.keys;
            e = [];
            for (c in d)
                d.hasOwnProperty(c) && e.push(this.Aa[c]);
            g = Tf(this, e);
            d = 0;
            for (f = g.length; d < f; d++)
                c = g[d],
                c.format(a, b);
            this.ua.keys = {};
            this.eb = !1;
            return e.length
        },
        ma: function(a) {
            function b(b) {
                Uf(f, a, b);
                f.Zc(function(c) {
                    f.Ka.contains(Oe(c)) || Le(c) === b && (c.qa || c.ma(a))
                })
            }
            var c, d, e, f = this;
            c = Pf(this.Db);
            c.sort(function(a, b) {
                return a - b
            });
            d = 0;
            for (e = c.length; d < e; d++)
                b(c[d])
        },
        $a: function(a, b, c, d) {
            var e;
            e = null;
            this.Zc(function(f) {
                Oe(f) === c && f.$a(a, b) && (!(null === e || Le(e) <= Le(f)) || d && d !== f.type() || (e = f))
            });
            return e
        },
        Ab: function(a, b) {
            var c;
            c = function(d) {
                var e, f, g;
                if (d.children)
                    for (a && b(d),
                    g = d.children,
                    e = 0,
                    f = g.length; e < f; e++)
                        d = g[e],
                        c(d);
                else
                    b(d)
            }
            ;
            c(this.root)
        },
        Zc: function(a, b) {
            function c(b) {
                if (b.children)
                    for (var e = 0; e < b.children.length; e++)
                        c(b.children[e]);
                else
                    "PageNode" !== b.type() && a(b)
            }
            1 === arguments.length && (b = this.yb);
            c(this.aa[b])
        },
        Ic: function(a, b) {
            var c, d, e, f;
            c = new Se(a,this);
            he(this, c);
            e = 0;
            for (f = b.length; e < f; e++)
                d = b[e],
                zf(this, c, this.Aa[d], -1);
            return c
        },
        removeNode: function(a, b) {
            var c, d, e = this;
            void 0 === b && (b = !0);
            c = Te(a.parent, a);
            0 <= c && (a.parent.children.splice(c, 1),
            a.parent = null,
            b && (d = function(b) {
                var c, h, k, l;
                delete e.Aa[b.id];
                a.Re();
                e.ua.remove(b.id);
                if (Ne(b))
                    for (l = b.children,
                    h = 0,
                    k = l.length; h < k; h++)
                        c = l[h],
                        d(c);
                b.pa("spotHighlight") && Vf(e.Ca, b)
            }
            ,
            d(a)));
            "PageNode" === a.type() && (this.aa.splice(c, 1),
            c === this.yb && (this.log("Removed current page."),
            this.pb(Math.min(c, this.aa.length - 1))));
            this.da.add(a.id);
            return c
        },
        Cb: function() {
            var a, b, c, d, e;
            a = e = d = b = null;
            this.Ab(!1, function(c) {
                if (null === b || c.rect.x < b)
                    b = c.rect.x;
                if (null === d || c.rect.right() > d)
                    d = c.rect.right();
                if (null === e || c.rect.y < e)
                    e = c.rect.y;
                if (null === a || c.rect.bottom() > a)
                    a = c.rect.bottom()
            });
            c = null === b ? new P(0,0,10,10) : new P(b,e,d - b,a - e);
            this.log("getDrawingRectangle: %s", c);
            return c
        },
        pa: function(a) {
            return this.fa[a]
        },
        setProperty: function(a, b) {
            void 0 === b ? a in this.fa && delete this.fa[a] : this.fa[a] = b
        },
        vd: function(a, b) {
            this.log("showLayer(%s, %s)", a, b);
            b ? this.Ka.remove(a) : this.Ka.add(a)
        },
        me: function(a) {
            return !this.Ka.contains(a)
        },
        ed: function(a) {
            this.log("Adding page to document with index %s", a);
            if (a > this.aa.length)
                return this.log("Error: Can insert page with index %s", a),
                -1;
            var b = ee("PageNode", wf(this), this);
            zf(this, this.root, b, a);
            return a
        },
        bc: function() {
            return this.aa.length
        },
        pb: function(a) {
            if (0 <= a && a < this.aa.length)
                return this.log("Set current page to %s/%s", a, this.aa.length),
                this.yb = a,
                !0;
            this.log("Tried to set page to non-existing %s", a);
            return !1
        },
        bd: function() {
            return this.aa[this.yb]
        },
        Sc: function(a) {
            this.Ab(!1, function(b) {
                b.Sc(a)
            })
        }
    };
    function Wf(a) {
        var b = 816
          , c = 1056;
        "width"in a.fa && (b = a.fa.width);
        "height"in a.fa && (c = a.fa.height);
        return new jd(b,c)
    }
    function Xf(a) {
        return "width"in a.fa ? new P(0,0,a.fa.width,a.fa.height) : a.Cb()
    }
    function Vf(a, b) {
        var c;
        "function" !== typeof b ? c = function(a) {
            return a === b
        }
        : c = b;
        for (var d = 0, e = 0; e < a.length; e++)
            c(a[e]) ? d += 1 : d && (a[e - d] = a[e]);
        a.length -= d
    }
    function zf(a, b, c, d) {
        c.parent && a.removeNode(c, !1);
        -1 === d ? b.children.push(c) : b.children.splice(d, 0, c);
        Sf(a, c);
        a.Fd = !0;
        "PageNode" === c.type() && (-1 === d ? a.aa.push(c) : a.aa.splice(d, 0, c));
        c.parent = b
    }
    function Yf(a, b, c) {
        var d, e, f, g, h, k, l, m, q, r;
        0 === b.indexOf("zwibblerclip.") && (b = b.substr(13));
        f = JSON.parse(b);
        b = [];
        h = a.rb;
        q = 0;
        for (r = f.length; q < r; q++)
            if (e = f[q],
            "GroupAction" === e.type)
                b.push(new Bf(e.members)),
                c.push(h++);
            else if ("CreateAction" === e.type) {
                m = e.properties;
                k = {};
                for (g in m)
                    m.hasOwnProperty(g) && (l = m[g],
                    "[object Array]" === Object.prototype.toString.apply(l) && "Matrix" === l[0] && (l.splice(0, 1),
                    l = new Q(l)),
                    k[g] = l);
                b.push(new E(e.node,k));
                c.push(h++)
            }
        d = a.rb;
        g = function(b) {
            a.log("Remap %s -> %s", b, b + d);
            return b + d
        }
        ;
        e = 0;
        for (f = b.length; e < f; e++)
            c = b[e],
            c.Te(g);
        return b
    }
    function Zf(a, b, c, d) {
        var e, f, g, h;
        if (Ne(b)) {
            e = [];
            h = b.children;
            f = 0;
            for (g = h.length; f < g; f++)
                b = h[f],
                d = Zf(a, b, c, d),
                e.push(d - 1);
            c.push({
                type: "GroupAction",
                members: e
            })
        } else {
            a = Je(b);
            g = {};
            for (e in a)
                a.hasOwnProperty(e) && (f = a[e],
                f instanceof Q && (f = ["Matrix", f.m11, f.m12, f.m21, f.m22, f.Da, f.Ea]),
                g[e] = f);
            c.push({
                type: "CreateAction",
                node: b.type(),
                properties: g
            })
        }
        return d + 1
    }
    function $f(a, b) {
        var c;
        c = 0;
        a.Fd && (a.Fd = !1,
        a.Ab(!0, function(a) {
            a.Xa = c++
        }));
        b.sort(function(a, b) {
            return a.Xa - b.Xa
        })
    }
    function Tf(a, b) {
        var c, d, e, f, g;
        e = [];
        c = {};
        f = 0;
        for (g = b.length; f < g; f++) {
            for (d = b[f]; Me(d); )
                d = d.parent;
            d.id in c || (c[d.id] = !0,
            e.push(d))
        }
        $f(a, e);
        return e
    }
    function ag(a, b) {
        var c = [];
        a.Zc(function(a) {
            b.contains(a.Cb()) && c.push(a)
        });
        return c
    }
    function Uf(a, b, c) {
        if (0 !== a.Ca.length && c === a.ub) {
            b.save();
            b.beginPath();
            c = Xf(a);
            b.moveTo(c.x, c.y);
            b.lineTo(c.x, c.bottom());
            b.lineTo(c.right(), c.bottom());
            b.lineTo(c.right(), c.y);
            b.closePath();
            for (var d = 0; d < a.Ca.length; d++)
                a.Ca[d].clip(b);
            b.clip();
            b.fillStyle = a.tb;
            b.fillRect(c.x, c.y, c.width, c.height);
            b.restore()
        }
    }
    function bg(a) {
        a.na = new zb
    }
    function B(a, b, c) {
        var d;
        void 0 === c && (c = !1);
        Mf(b);
        return b in a.Aa ? (d = a.Aa[b],
        c && (a.ua.add(b),
        a.qa.add(b)),
        d) : null
    }
    function he(a, b) {
        zf(a, a.aa[a.yb], b, -1)
    }
    function ce(a, b) {
        Mf(b);
        a.qa.add(b);
        a.ua.add(b)
    }
    function Sf(a, b, c) {
        var d, e, f, g;
        void 0 === c && (c = !0);
        S("id"in b, "Must be a node");
        if (!(b.id in a.Aa) && (a.Aa[b.id] = b,
        a.ka.add(b.id),
        Ne(b)))
            for (g = b.children,
            e = 0,
            f = g.length; e < f; e++)
                d = g[e],
                Sf(a, d, c);
        b.Sc(!1);
        c && a.ua.add(b.id);
        a.Db.add(Le(b));
        b.pa("spotHighlight") && "PathNode" === b.type() && a.Ca.push(b);
        b.Pe()
    }
    function wf(a) {
        a.log("nextId bumped to %s", a.rb + 1);
        return a.rb++
    }
    x.aa({}, J.prototype, Rf.prototype);
    function cg(a) {
        var b = this;
        this.Ob = 0;
        "string" === typeof a ? (this.getUint8 = function() {
            S(b.Ob < b.data.length);
            return b.data.charCodeAt(b.Ob++) & 255
        }
        ,
        this.data = a) : this.data = new Uint8Array(a)
    }
    cg.prototype = {
        log: t("BinaryReader"),
        seek: function(a) {
            S(0 <= a && a <= this.data.length);
            var b = this.Ob;
            this.Ob = a;
            return b
        },
        getUint8: function() {
            S(this.Ob < this.data.length);
            return this.data[this.Ob++]
        },
        getUint16: function() {
            return (this.getUint8() << 8 | this.getUint8()) >>> 0
        },
        getUint32: function() {
            return dg(this) >>> 0
        },
        getInt16: function() {
            var a = this.getUint16();
            a & 32768 && (a -= 65536);
            return a
        },
        getDate: function() {
            var a = 1E3 * (4294967296 * this.getUint32() + this.getUint32()) + Date.UTC(1904, 1, 1);
            return new Date(a)
        }
    };
    function eg(a, b) {
        for (var c = "", d = 0; d < b; d++)
            c += String.fromCharCode(a.getUint8());
        return c
    }
    function dg(a) {
        return a.getUint8() << 24 | a.getUint8() << 16 | a.getUint8() << 8 | a.getUint8()
    }
    function fg(a) {
        this.format = 0;
        this.aa = [];
        for (var b = 0; 256 > b; b++) {
            var c = a.getUint8();
            this.log("   Glyph[%s] = %s", b, c);
            this.aa.push(c)
        }
    }
    fg.prototype = {
        log: t("CMAP0"),
        map: function(a) {
            return 0 <= a && 255 >= a ? this.aa[a] : 0
        }
    };
    function gg(a) {
        this.format = 4;
        var b, c = [], d = a.getUint16() / 2;
        a.getUint16();
        a.getUint16();
        a.getUint16();
        for (b = 0; b < d; b++)
            c.push({
                Ee: a.getUint16()
            });
        a.getUint16();
        for (b = 0; b < d; b++)
            c[b].re = a.getUint16();
        for (b = 0; b < d; b++)
            c[b].Jg = a.getUint16();
        for (b = 0; b < d; b++) {
            var e = a.getUint16();
            e ? c[b].Jd = a.Ob - 2 + e : c[b].Jd = 0
        }
        this.aa = c;
        this.ba = {};
        this.file = a
    }
    gg.prototype = {
        log: t("CMAP4"),
        map: function(a) {
            if (!(a in this.ba)) {
                for (var b = 0; b < this.aa.length; b++) {
                    var c = this.aa[b];
                    if (c.re <= a && c.Ee >= a) {
                        var d, e;
                        c.Jd ? (e = c.Jd + 2 * (a - c.re),
                        this.file.seek(e),
                        d = this.file.getUint16()) : d = c.Jg + a & 65535;
                        this.log("Charcode %s is between %s and %s; maps to %s (%s) roffset=%s", a, c.re, c.Ee, e, d, c.Jd);
                        this.ba[a] = d;
                        break
                    }
                }
                b === this.aa.length && (this.ba[a] = 0)
            }
            return this.ba[a]
        }
    };
    function hg(a, b, c) {
        this.da = b && !c || !b && c;
        this.file = a;
        this.offset = a.Ob;
        this.ba = a.getUint16();
        a.getUint16();
        a.getUint16();
        a.getUint16();
        this.map = {};
        for (b = 0; b < this.ba; b++) {
            c = a.getUint16();
            var d = a.getUint16()
              , e = a.getInt16();
            this.map[c << 16 | d] = e
        }
        this.reset()
    }
    hg.prototype = {
        log: t("KERN0"),
        reset: function() {
            this.aa = -1
        },
        get: function(a) {
            var b = 0;
            if (0 <= this.aa) {
                var c = this.aa << 16 | a;
                c in this.map && (b = this.map[c])
            }
            this.aa = a;
            return this.da ? {
                x: 0,
                y: b
            } : {
                x: b,
                y: 0
            }
        }
    };
    function ig(a) {
        this.file = new cg(a);
        this.ka = [];
        this.fd = [];
        a = this.file;
        var b = {};
        a.getUint32();
        var c = a.getUint16();
        a.getUint16();
        a.getUint16();
        a.getUint16();
        for (var d = 0; d < c; d++) {
            var e = eg(a, 4);
            b[e] = {
                hg: a.getUint32(),
                offset: a.getUint32(),
                length: a.getUint32()
            };
            "head" !== e && this.log("Table %s has checksum 0x%s", e, b[e].hg.toString(16))
        }
        this.aa = b;
        a = this.file;
        S("head"in this.aa);
        a.seek(this.aa.head.offset);
        this.version = dg(a) / 65536;
        dg(a);
        a.getUint32();
        this.ua = a.getUint32();
        S(1594834165 === this.ua);
        a.getUint16();
        this.na = a.getUint16();
        a.getDate();
        a.getDate();
        this.Lh = a.getInt16();
        this.Rh = a.getInt16();
        this.Kh = a.getInt16();
        this.Qh = a.getInt16();
        a.getUint16();
        a.getUint16();
        a.getInt16();
        this.qa = a.getInt16();
        a.getInt16();
        a = this.file;
        S("name"in this.aa);
        b = this.aa.name.offset;
        a.seek(b);
        a.getUint16();
        c = a.getUint16();
        d = a.getUint16();
        for (e = 0; e < c; e++) {
            var f = a.getUint16(), g = a.getUint16(), h = a.getUint16(), k = a.getUint16(), l = a.getUint16(), m = a.getUint16(), m = a.seek(b + d + m), q;
            if (0 === f || 3 === f) {
                q = a;
                for (var r = "", u = 0; u < l; u += 2)
                    r += String.fromCharCode(q.getUint16());
                q = r
            } else
                q = eg(a, l);
            this.log("Name %s/%s id %s language %s: %s", f, g, k, h, q);
            a.seek(m);
            switch (k) {
            case 1:
                this.fontFamily = q;
                break;
            case 4:
                this.ba = q
            }
        }
        a = this.file;
        S("cmap"in this.aa);
        b = this.aa.cmap.offset;
        a.seek(b);
        a.getUint16();
        c = a.getUint16();
        for (d = 0; d < c; d++)
            e = a.getUint16(),
            g = a.getUint16(),
            f = a.getUint32(),
            this.log("CMap platformid=%s specificid=%s offset=%s", e, g, f),
            3 === e && 1 >= g && (e = a,
            f = e.seek(b + f),
            g = e.getUint16(),
            h = e.getUint16(),
            e.getUint16(),
            k = void 0,
            this.log("    Cmap format %s length %s", g, h),
            0 === g ? k = new fg(e) : 4 === g && (k = new gg(e)),
            k && this.ka.push(k),
            e.seek(f));
        a = this.file;
        S("hhea"in this.aa);
        a.seek(this.aa.hhea.offset);
        dg(a);
        a.getInt16();
        a.getInt16();
        a.getInt16();
        a.getUint16();
        a.getInt16();
        a.getInt16();
        a.getInt16();
        a.getInt16();
        a.getInt16();
        a.getInt16();
        a.getInt16();
        a.getInt16();
        a.getInt16();
        a.getInt16();
        a.getInt16();
        this.da = a.getUint16();
        a = this.file;
        if ("kern"in this.aa)
            for (a.seek(this.aa.kern.offset),
            h = a.getUint16(),
            b = a.getUint16(),
            this.log("Kern Table version: %s", h),
            this.log("Kern nTables: %s", b),
            c = 0; c < b; c++)
                h = a.getUint16(),
                d = a.getUint16(),
                k = a.getUint16(),
                e = k >> 8,
                f = k & 4,
                g = 0 === (k & 1),
                this.log("Kerning subtable version %s format %s length %s coverage: %s", h, e, d, k),
                h = null,
                0 === e ? h = new hg(a,g,f) : (this.log("Unknown format -- skip"),
                a.seek(a.Ob + d)),
                h && this.fd.push(h);
        S("maxp"in this.aa);
        a = this.file.seek(this.aa.maxp.offset + 4);
        b = this.file.getUint16();
        this.file.seek(a);
        this.length = b
    }
    ig.prototype = {
        log: t("TrueType"),
        transform: function(a, b) {
            a.scale(b / this.na, -b / this.na)
        }
    };
    function jg(a, b) {
        function c(b, c, e) {
            for (var h = 0, k = 0; k < f; k++) {
                var w = g[k];
                w & c ? h = w & e ? h + a.getUint8() : h - a.getUint8() : ~w & e && (h += a.getInt16());
                d[k][b] = h
            }
        }
        b.type = "simple";
        b.hc = [];
        for (var d = b.va = [], e = 0; e < b.hd; e++)
            b.hc.push(a.getUint16());
        a.seek(a.getUint16() + a.Ob);
        if (0 !== b.hd) {
            for (var f = Math.max.apply(null, b.hc) + 1, g = [], e = 0; e < f; e++) {
                var h = a.getUint8();
                g.push(h);
                d.push({
                    Nc: 0 < (h & 1)
                });
                if (h & 8) {
                    var k = a.getUint8();
                    S(0 < k);
                    for (e += k; k--; )
                        g.push(h),
                        d.push({
                            Nc: 0 < (h & 1)
                        })
                }
            }
            c("x", 2, 16);
            c("y", 4, 32)
        }
    }
    function kg(a, b) {
        var c;
        S("loca"in a.aa);
        c = a.aa.loca;
        var d = a.file, e, f;
        1 === a.qa ? (e = d.seek(c.offset + 4 * b),
        c = d.getUint32(),
        f = d.getUint32()) : (e = d.seek(c.offset + 2 * b),
        c = 2 * d.getUint16(),
        f = 2 * d.getUint16());
        d.seek(e);
        c = c === f ? 0 : c + a.aa.glyf.offset;
        d = a.file;
        if (0 === c || c >= a.aa.glyf.offset + a.aa.glyf.length)
            return null;
        S(c >= a.aa.glyf.offset);
        S(c < a.aa.glyf.offset + a.aa.glyf.length);
        d.seek(c);
        c = {
            hd: d.getInt16(),
            Lh: d.getInt16(),
            Rh: d.getInt16(),
            Kh: d.getInt16(),
            Qh: d.getInt16()
        };
        S(-1 <= c.hd);
        if (-1 === c.hd) {
            var g, h, k, l, m;
            c.type = "simple";
            var q = 32;
            c.hc = [];
            for (c.va = []; q & 32; ) {
                var r, u, q = d.getUint16();
                m = d.getUint16();
                e = 1;
                g = f = 0;
                h = 1;
                l = k = 0;
                q & 1 ? (r = d.getInt16(),
                u = d.getInt16()) : (r = d.getUint8(),
                u = d.getUint8());
                q & 2 && (k = r,
                l = u);
                q & 8 ? h = e = d.getInt16() / 16384 : q & 64 ? (e = d.getInt16() / 16384,
                h = d.getInt16() / 16384) : q & 128 && (e = d.getInt16() / 16384,
                f = d.getInt16() / 16384,
                g = d.getInt16() / 16384,
                h = d.getInt16() / 16384);
                a.log("Read component glyph index %s", m);
                a.log("Transform: [%s %s %s %s %s %s]", e, f, g, h, k, l);
                r = d.Ob;
                if (m = kg(a, m)) {
                    var w = c.va.length;
                    for (u = 0; u < m.hc.length; u++)
                        c.hc.push(m.hc[u] + w);
                    for (u = 0; u < m.va.length; u++) {
                        var w = m.va[u].x
                          , v = m.va[u].y
                          , w = e * w + f * v + k
                          , v = g * w + h * v + l;
                        c.va.push({
                            x: w,
                            y: v,
                            Nc: m.va[u].Nc
                        })
                    }
                }
                d.seek(r)
            }
            c.hd = c.hc.length;
            q & 256 && d.seek(d.getUint16() + d.Ob)
        } else
            jg(d, c);
        return c
    }
    function lg() {
        J.call(this);
        this.fonts = {};
        this.error = null;
        this.aa = 0
    }
    lg.prototype = {
        log: t("FontCollection"),
        add: function(a, b) {
            this.aa += 1;
            var c = this;
            x.ba({
                url: a,
                oh: function(d) {
                    var e = b;
                    c.log("Got font %s; result is %s bytes", a, d.length);
                    for (var f = "", g = 0; g < d.length; g++)
                        f += String.fromCharCode(d.charCodeAt(g) & 255);
                    d = new ig(f);
                    c.log("Loaded '%s'", d.ba);
                    for (g = 0; g < d.ba.length; g++)
                        c.log("   %s, %s", d.ba.charAt(g), d.ba.charCodeAt(g));
                    e = e || d.ba;
                    c.fonts[e] = {
                        name: d.ba,
                        url: a,
                        data: f,
                        font: d
                    };
                    --c.aa;
                    0 === c.aa && c.emit("done")
                },
                error: function() {
                    c.log("Error fetching " + a)
                },
                eg: function(a, b) {
                    b.overrideMimeType("text/plain; charset=x-user-defined")
                }
            })
        },
        get: function(a) {
            this.log("Lookup font %s", a);
            for (var b = 0; b < a.length; b++)
                this.log("   %s, %s", a.charAt(b), a.charCodeAt(b));
            if (a in this.fonts)
                return this.fonts[a].font;
            this.log("Lookup font %s; not found", a)
        }
    };
    lg.prototype = x.aa({}, J.prototype, lg.prototype);
    function V(a, b) {
        this.type = a;
        this.values = b;
        if (4 > this.values.length)
            throw "Bad value";
    }
    var mg;
    function pf(a, b) {
        a.toLowerCase()in ng && (a = ng[a.toLowerCase()]);
        var c = /\#([0-9a-f])([0-9a-f])([0-9a-f])/i, d = /rgb\( *([0-9]+) *, *([0-9]+) *, *([0-9]+) *\)/, e = /rgba\( *([0-9]+) *, *([0-9]+) *, *([0-9]+) *, *([0-9\.]+) *\)/, f;
        f = /\#([0-9a-f][0-9a-f])([0-9a-f][0-9a-f])([0-9a-f][0-9a-f])/i.exec(a);
        if (null !== f)
            c = parseInt(f[1], 16) / 255,
            d = parseInt(f[2], 16) / 255,
            e = parseInt(f[3], 16) / 255,
            f = 1;
        else if (f = e.exec(a),
        null !== f)
            c = parseFloat(f[1]) / 255,
            d = parseFloat(f[2]) / 255,
            e = parseFloat(f[3]) / 255,
            f = parseFloat(f[4]);
        else {
            f = d.exec(a);
            if (null !== f)
                c = parseFloat(f[1]) / 255,
                d = parseFloat(f[2]) / 255,
                e = parseFloat(f[3]) / 255;
            else if (f = c.exec(a),
            null !== f)
                c = parseInt(f[1], 16),
                c = (16 * c + c) / 255,
                d = parseInt(f[2], 16),
                d = (16 * d + d) / 255,
                e = parseInt(f[2], 16),
                e = (16 * e + e) / 255;
            else {
                if (b)
                    return null;
                c = 1;
                d = 0;
                e = 1
            }
            f = 1
        }
        return new V(0,[c, d, e, f])
    }
    V.prototype = {
        toString: function() {
            function a(a) {
                a = Math.round(255 * a);
                return 16 > a ? "0" + a.toString(16) : a.toString(16)
            }
            var b = og(this, 0);
            return 1 === b.values[3] ? "#" + a(b.values[0]) + a(b.values[1]) + a(b.values[2]) : "rgba(" + Math.round(255 * b.values[0]) + "," + Math.round(255 * b.values[1]) + "," + Math.round(255 * b.values[2]) + "," + b.values[3] + ")"
        },
        kb: function(a) {
            a.type !== this.type && (a = og(a, this.type));
            if (2 === this.type) {
                var b = this.values[0]
                  , c = a.values[0]
                  , b = b > c ? Math.min(b - c, c - b + 360) : Math.min(c - b, b - c + 360)
                  , b = b / 360;
                return Math.pow(b * b + (this.values[1] - a.values[1]) * (this.values[1] - a.values[1]) + (this.values[2] - a.values[2]) * (this.values[2] - a.values[2]), .5)
            }
            return Math.pow((this.values[0] - a.values[0]) * (this.values[0] - a.values[0]) + (this.values[1] - a.values[1]) * (this.values[1] - a.values[1]) + (this.values[2] - a.values[2]) * (this.values[2] - a.values[2]), .5)
        }
    };
    function og(a, b) {
        return mg[a.type][b](a)
    }
    (function() {
        function a(a) {
            var b = a.values[0]
              , c = a.values[1]
              , d = a.values[2];
            0 > b && (b += 360);
            var e = b / 60 - Math.floor(b / 60), f = d * (1 - c), g = d * (1 - e * c), c = d * (1 - (1 - e) * c), h, k, l;
            switch (Math.floor(b / 60) % 6) {
            case 0:
                h = d;
                k = c;
                l = f;
                break;
            case 1:
                h = g;
                k = d;
                l = f;
                break;
            case 2:
                h = f;
                k = d;
                l = c;
                break;
            case 3:
                h = f;
                k = g;
                l = d;
                break;
            case 4:
                h = c;
                k = f;
                l = d;
                break;
            case 5:
                h = d,
                k = f,
                l = g
            }
            return new V(0,[h, k, l, a.values[3]])
        }
        function b(a) {
            var b, c = a.values[0], d = a.values[1], e = a.values[2], f = Math.max(c, d, e), g = Math.min(c, d, e);
            f === g ? b = 0 : f === c ? b = (60 * (d - e) / (f - g) + 360) % 360 : f === d ? b = 60 * (e - c) / (f - g) + 120 : f === e && (b = 60 * (c - d) / (f - g) + 240);
            return new V(2,[b, 0 === f ? 0 : 1 - g / f, f, a.values[3]])
        }
        function c(a) {
            function b(a) {
                return a > 6 / 29 * (6 / 29) * (6 / 29) ? Math.pow(a, 1 / 3) : 1 / 3 * (29 / 6) * (29 / 6) * a + 4 / 29
            }
            var c = b(a.values[1] / l.ae);
            return new V(3,[116 * c - 16, 500 * (b(a.values[0] / l.$d) - c), 200 * (c - b(a.values[2] / l.be)), a.values[3]])
        }
        function d(a) {
            var b = (a.values[0] + 16) / 116
              , c = b + a.values[1] / 500
              , d = b - a.values[2] / 200
              , e = 6 / 29;
            return new V(1,[c > e ? l.$d * c * c * c : 3 * (c - 16 / 116) * e * e * l.$d, b > e ? l.ae * b * b * b : 3 * (b - 16 / 116) * e * e * l.ae, d > e ? l.be * d * d * d : 3 * (d - 16 / 116) * e * e * l.be, a.values[3]])
        }
        function e(a) {
            for (var b = [], c = 0; 3 > c; c++)
                b[c] = .04045 >= a.values[c] ? a.values[c] / 12.92 : Math.pow((a.values[c] + .055) / 1.055, 2.4);
            return new V(1,[.4124 * b[0] + .3576 * b[1] + .1805 * b[2], .2126 * b[0] + .7152 * b[1] + .0722 * b[2], .0193 * b[0] + .1192 * b[1] + .9505 * b[2], a.values[3]])
        }
        function f(a) {
            var b = []
              , c = [];
            b[0] = 3.241 * a.values[0] - 1.5374 * a.values[1] - .4986 * a.values[2];
            b[1] = -.9692 * a.values[0] + 1.876 * a.values[1] + .0416 * a.values[2];
            b[2] = .0556 * a.values[0] - .204 * a.values[1] + 1.057 * a.values[2];
            for (var d = 0; 3 > d; d++)
                c[d] = .0031308 >= b[d] ? 12.92 * b[d] : 1.055 * Math.pow(b[d], 1 / 2.4) - .055;
            c[3] = a.values[3];
            return new V(0,c)
        }
        function g(a) {
            return new V(a.type,a.values.concat())
        }
        function h(a) {
            return c(e(a))
        }
        function k(a) {
            return b(f(a))
        }
        var l = {
            $d: .9505,
            ae: 1,
            be: 1.089
        };
        mg = [[g, e, b, h], [f, g, k, c], [a, function(b) {
            return e(a(b))
        }
        , g, function(b) {
            return h(a(b))
        }
        ], [function(a) {
            return f(d(a))
        }
        , d, function(a) {
            return k(d(a))
        }
        , g]]
    })();
    var ng = {
        aliceblue: "#f0f8ff",
        antiquewhite: "#faebd7",
        aqua: "#00ffff",
        aquamarine: "#7fffd4",
        azure: "#f0ffff",
        beige: "#f5f5dc",
        bisque: "#ffe4c4",
        black: "#000000",
        blanchedalmond: "#ffebcd",
        blue: "#0000ff",
        blueviolet: "#8a2be2",
        brown: "#a52a2a",
        burlywood: "#deb887",
        cadetblue: "#5f9ea0",
        chartreuse: "#7fff00",
        chocolate: "#d2691e",
        coral: "#ff7f50",
        cornflowerblue: "#6495ed",
        cornsilk: "#fff8dc",
        crimson: "#dc143c",
        cyan: "#00ffff",
        darkblue: "#00008b",
        darkcyan: "#008b8b",
        darkgoldenrod: "#b8860b",
        darkgray: "#a9a9a9",
        darkgreen: "#006400",
        darkkhaki: "#bdb76b",
        darkmagenta: "#8b008b",
        darkolivegreen: "#556b2f",
        darkorange: "#ff8c00",
        darkorchid: "#9932cc",
        darkred: "#8b0000",
        darksalmon: "#e9967a",
        darkseagreen: "#8fbc8f",
        darkslateblue: "#483d8b",
        darkslategray: "#2f4f4f",
        darkturquoise: "#00ced1",
        darkviolet: "#9400d3",
        deeppink: "#ff1493",
        deepskyblue: "#00bfff",
        dimgray: "#696969",
        dodgerblue: "#1e90ff",
        firebrick: "#b22222",
        floralwhite: "#fffaf0",
        forestgreen: "#228b22",
        fuchsia: "#ff00ff",
        gainsboro: "#dcdcdc",
        ghostwhite: "#f8f8ff",
        gold: "#ffd700",
        goldenrod: "#daa520",
        gray: "#808080",
        green: "#008000",
        greenyellow: "#adff2f",
        honeydew: "#f0fff0",
        hotpink: "#ff69b4",
        indianred: "#cd5c5c",
        indigo: "#4b0082",
        ivory: "#fffff0",
        khaki: "#f0e68c",
        lavender: "#e6e6fa",
        lavenderblush: "#fff0f5",
        lawngreen: "#7cfc00",
        lemonchiffon: "#fffacd",
        lightblue: "#add8e6",
        lightcoral: "#f08080",
        lightcyan: "#e0ffff",
        lightgoldenrodyellow: "#fafad2",
        lightgreen: "#90ee90",
        lightgrey: "#d3d3d3",
        lightpink: "#ffb6c1",
        lightsalmon: "#ffa07a",
        lightseagreen: "#20b2aa",
        lightskyblue: "#87cefa",
        lightslategray: "#778899",
        lightsteelblue: "#b0c4de",
        lightyellow: "#ffffe0",
        lime: "#00ff00",
        limegreen: "#32cd32",
        linen: "#faf0e6",
        magenta: "#ff00ff",
        maroon: "#800000",
        mediumaquamarine: "#66cdaa",
        mediumblue: "#0000cd",
        mediumorchid: "#ba55d3",
        mediumpurple: "#9370d8",
        mediumseagreen: "#3cb371",
        mediumslateblue: "#7b68ee",
        mediumspringgreen: "#00fa9a",
        mediumturquoise: "#48d1cc",
        mediumvioletred: "#c71585",
        midnightblue: "#191970",
        mintcream: "#f5fffa",
        mistyrose: "#ffe4e1",
        moccasin: "#ffe4b5",
        navajowhite: "#ffdead",
        navy: "#000080",
        oldlace: "#fdf5e6",
        olive: "#808000",
        olivedrab: "#6b8e23",
        orange: "#ffa500",
        orangered: "#ff4500",
        orchid: "#da70d6",
        palegoldenrod: "#eee8aa",
        palegreen: "#98fb98",
        paleturquoise: "#afeeee",
        palevioletred: "#d87093",
        papayawhip: "#ffefd5",
        peachpuff: "#ffdab9",
        peru: "#cd853f",
        pink: "#ffc0cb",
        plum: "#dda0dd",
        powderblue: "#b0e0e6",
        purple: "#800080",
        red: "#ff0000",
        rosybrown: "#bc8f8f",
        royalblue: "#4169e1",
        saddlebrown: "#8b4513",
        salmon: "#fa8072",
        sandybrown: "#f4a460",
        seagreen: "#2e8b57",
        seashell: "#fff5ee",
        sienna: "#a0522d",
        silver: "#c0c0c0",
        skyblue: "#87ceeb",
        slateblue: "#6a5acd",
        slategray: "#708090",
        snow: "#fffafa",
        springgreen: "#00ff7f",
        steelblue: "#4682b4",
        tan: "#d2b48c",
        teal: "#008080",
        thistle: "#d8bfd8",
        tomato: "#ff6347",
        transparent: "rgba(0,0,0,0.0)",
        turquoise: "#40e0d0",
        violet: "#ee82ee",
        wheat: "#f5deb3",
        white: "#ffffff",
        whitesmoke: "#f5f5f5",
        yellow: "#ffff00",
        yellowgreen: "#9acd32"
    };
    var pg = t("MISC");
    function qg(a) {
        window.jQuery && a instanceof window.jQuery && (a = a[0]);
        return x(a)
    }
    function rg(a) {
        var b = document.createElement("canvas");
        a && a.appendChild(b);
        "G_vmlCanvasManager"in window && (pg("Emulating canvas in IE"),
        G_vmlCanvasManager.initElement(b),
        x(b).bind("selectstart", function(a) {
            pg("Cancelled selectstart on canvas");
            a.stopPropagation();
            a.preventDefault()
        }));
        b.style.background = "transparent";
        return b
    }
    var sg = /MSIE ([0-9]{1,}[\.0-9]{0,})/
      , tg = null;
    function ug() {
        var a;
        if (null !== tg)
            a = tg;
        else {
            a = -1;
            if ("Microsoft Internet Explorer" === navigator.appName) {
                var b = sg.exec(navigator.userAgent);
                null !== b && (a = parseFloat(b[1]))
            }
            tg = a;
            pg("IE version is %s", a)
        }
        return 0 <= a && 9 > a
    }
    function pe(a) {
        for (var b = 0; a; )
            try {
                var c = parseInt(x(a).ga("z-index"), 10);
                c && (b = Math.max(b, c));
                a = a.parentNode
            } catch (d) {
                break
            }
        return b
    }
    function vg() {
        if (null === wg) {
            var a = document.createElement("div");
            a.style.visibility = "hidden";
            a.style.width = "100px";
            document.body.appendChild(a);
            var b = a.offsetWidth;
            a.style.overflow = "scroll";
            var c = document.createElement("div");
            c.style.width = "100%";
            a.appendChild(c);
            c = c.offsetWidth;
            a.parentNode.removeChild(a);
            wg = b - c;
            pg("ScrollbarWidth calculated as %spx", wg)
        }
        return wg
    }
    var wg = null;
    function de(a, b) {
        var c = pf(a);
        c.values[3] = b;
        return c.toString()
    }
    function xg(a) {
        var b = atob(a.split(",")[1]);
        a = a.split(",")[0].split(":")[1].split(";")[0];
        for (var c = new ArrayBuffer(b.length), d = new Uint8Array(c), e = 0; e < b.length; e++)
            d[e] = b.charCodeAt(e);
        return new Blob([c],{
            type: a
        })
    }
    function gb(a, b) {
        var c;
        "function" !== typeof b ? c = function(a) {
            return a === b
        }
        : c = b;
        for (var d = 0, e = 0; e < a.length; e++)
            c(a[e]) ? d += 1 : d && (a[e - d] = a[e]);
        a.length -= d
    }
    function yg() {
        var a = document.documentElement
          , b = a.scrollHeight > x(a).height()
          , a = a.scrollWidth > x(a).width()
          , b = b ? vg() : 0
          , a = a ? vg() : 0;
        return {
            width: x(window).width() - b,
            height: x(window).height() - a,
            x: document.body.scrollLeft,
            y: document.body.scrollTop
        }
    }
    function qe(a) {
        var b = yg();
        a = x(a);
        var c = a.offset();
        c.left = Math.min(c.left, b.x + b.width - a.outerWidth());
        c.top = Math.min(c.top, b.y + b.height - a.outerHeight());
        a.offset(c)
    }
    function zg(a, b) {
        function c(a, b) {
            var c = {
                stopPropagation: function() {
                    a.stopPropagation()
                },
                preventDefault: function() {
                    a.preventDefault()
                },
                lb: a
            }, d;
            for (d in b)
                b.hasOwnProperty(d) && (c[d] = b[d]);
            return c
        }
        var d = 1
          , e = 0;
        a.addEventListener("mousedown", function(a) {
            3 === (a.buttons & 3) && (d = 1,
            e = 0,
            b(c(a, {
                type: "gesturestart",
                pageX: a.pageX,
                pageY: a.pageY,
                scale: d,
                rotation: e
            })))
        }, !1);
        a.addEventListener("contextmenu", function(a) {
            a.preventDefault()
        }, !1);
        a.addEventListener("mousemove", function(a) {
            3 === (a.buttons & 3) && b(c(a, {
                type: "gesturechange",
                pageX: a.pageX,
                pageY: a.pageY,
                scale: d,
                rotation: e
            }))
        }, !1);
        a.addEventListener("mouseup", function(a) {
            5 !== (a.buttons & 3) && b(c(a, {
                type: "gestureend",
                pageX: a.pageX,
                pageY: a.pageY,
                scale: d,
                rotation: 0
            }))
        }, !1);
        a.addEventListener("wheel", function(a) {
            3 === (a.buttons & 3) && (d = 0 < a.deltaY ? 1.1 * d : d / 1.1,
            0 < a.deltaX ? e += 10 : 0 > a.deltaY && (e -= 10),
            b(c(a, {
                type: "gesturechange",
                pageX: a.pageX,
                pageY: a.pageY,
                scale: d,
                rotation: e
            })))
        })
    }
    ;function Ag(a, b, c, d) {
        Bg(this, a, b, c, d)
    }
    function Bg(a, b, c, d, e) {
        function f(a) {
            for (var b = 30; 100 > b; b += 20)
                a.values[2] = b / 100,
                g.aa.push(a.toString())
        }
        J.call(a);
        a.canvas = x(rg(b[0]));
        a.ha = a.canvas;
        a.canvas.ga("position", "absolute");
        a.canvas.ga("border", "none");
        a.canvas.ga("border-top", "1px solid black");
        a.canvas.ga("display", "block");
        a.oa = a.canvas[0].getContext("2d");
        a.size = c;
        a.$b = d;
        a.na = e;
        a.aa = "rgba(0,0,0,0.0) rgba(0,0,0,0.5) #000000 #ffffff #000088 #008800 #008888 #880000 #880088 #884400 #888888 #444444 #0000ff #00ff00 #00ffff #ff0000 #ff00ff #ffff00".split(" ");
        var g = a;
        f(new V(2,[0, 0, 0, 1]));
        for (b = 0; 720 > b; b += 35)
            c = new V(2,[b, .5, 0, 1]),
            f(c);
        Cg(a, 100);
        a.canvas.bind("touchstart", function(a) {
            var b = g.canvas.offset();
            g.Hb(a.touches[0].pageX - b.left - 0, a.touches[0].pageY - b.top - 0, 1);
            a.preventDefault();
            a.stopPropagation()
        });
        Ka(a.canvas, function(a) {
            var b = g.canvas.offset();
            g.Hb(a.pageX - b.left - 0, a.pageY - b.top - 0, a.which) || (a.preventDefault(),
            a.stopPropagation())
        });
        a.canvas.bind("contextmenu", function(a) {
            a.preventDefault();
            a.stopPropagation();
            return !1
        })
    }
    n = Ag.prototype;
    n.log = t("COLOURPANEL");
    n.qc = function(a, b) {
        this.size = a;
        this.$b = b;
        this.format();
        this.ma()
    }
    ;
    function Dg(a, b) {
        a.aa = b.slice(0);
        a.log("Set colours to %s len=%s", a.aa, a.aa.length);
        a.format();
        a.ma()
    }
    function Cg(a, b) {
        a.width = b;
        a.canvas.fb("width", "" + a.width);
        a.format();
        a.ma()
    }
    function Eg(a, b) {
        a.ka = b;
        a.canvas.fb("height", "" + (a.ka - 1))
    }
    n.height = function() {
        return this.ka
    }
    ;
    n.moveTo = function(a, b) {
        this.canvas.ga("left", "" + a + "px");
        this.canvas.ga("top", "" + b + "px")
    }
    ;
    n.format = function() {
        this.da = Math.floor(this.width / this.size);
        var a = Math.ceil(this.aa.length / this.da);
        this.log("Format to width=%s; height=%s wrap=%s, cpr=%s", this.width, a * this.size, this.na, this.da);
        this.na ? Eg(this, a * this.size) : Eg(this, this.size)
    }
    ;
    function Fg(a, b, c, d) {
        a.fillStyle = "#ffffff";
        a.fillRect(b, c, d, d);
        a.beginPath();
        a.strokeStyle = "#000000";
        a.moveTo(b, c);
        a.lineTo(b + d, c + d);
        a.moveTo(b + d, c);
        a.lineTo(b, c + d);
        a.stroke()
    }
    function Gg(a, b, c, d) {
        for (var e, f = 0; f < d; f += 5) {
            e = 0 === f / 5 % 2;
            for (var g = 0; g < d; g += 5)
                a.fillStyle = e ? "#000000" : "#ffffff",
                e = !e,
                a.fillRect(b + g, c + f, 5, 5)
        }
        e = a.createLinearGradient(b + d, c + d, b, c);
        e.addColorStop(0, "rgba(255, 255, 255, 1.0)");
        e.addColorStop(1, "rgba(255, 255, 255, 0.0)");
        a.fillStyle = e;
        a.fillRect(b, c, d, d)
    }
    n.ma = function() {
        for (var a = 0, b = 0, c = 0; c < this.aa.length; c++) {
            var d = pf(this.aa[c]);
            this.oa.fillStyle = this.aa[c];
            this.oa.fillRect(a, b, this.size, this.size);
            0 === d.values[3] ? Fg(this.oa, a, b, this.size) : .5 === d.values[3] && Gg(this.oa, a, b, this.size);
            a += this.size;
            a >= this.width && (b += this.size,
            a = 0)
        }
    }
    ;
    n.sa = function() {
        this.canvas.sa()
    }
    ;
    n.show = function() {
        this.canvas.show()
    }
    ;
    n.Hb = function(a, b, c) {
        a = Math.floor(a / this.size);
        var d = Math.floor(b / this.size);
        b = d * this.da + a;
        this.log("row=%s col=%s index=%s coloursPerRow=%s", d, a, b, this.da);
        c = 1 === c;
        return 0 === b && "rgba(0,0,0,0.0)" === this.aa[0] ? (this.emit("opacity", 0, c),
        !0) : 1 === b && "rgba(0,0,0,0.5)" === this.aa[1] ? (this.emit("opacity", .5, c),
        !0) : b < this.aa.length ? (this.emit("colour", {
            Va: this.aa[b],
            zd: c
        }),
        !0) : !1
    }
    ;
    x.aa(Ag.prototype, J.prototype);
    function Hg(a, b, c) {
        var d = this;
        J.call(this);
        this.na = b;
        this.ha = x(a);
        b || (this.ha.ga("overflow-y", "scroll"),
        this.ha.ga("text-align", "center"));
        b || c || (a = x("<input>").fb("type", "button").fb("value", "Add Page"),
        this.ha.append(a),
        a.click(function() {
            d.aa.Ac(d.aa.ed(d.aa.jc() + 1))
        }),
        a = x("<input>").fb("type", "button").fb("value", "Delete Page"),
        this.ha.append(a),
        a.click(function() {
            d.aa.Ce(d.aa.jc())
        }),
        this.ka = !1);
        this.da = []
    }
    Hg.prototype = {
        log: t("PageSelector"),
        pb: function(a) {
            this.log("Set page %s", a);
            this.page < this.da.length && x(this.da[this.page]).ga("border-color", "transparent");
            this.page = a;
            this.page < this.da.length && x(this.da[this.page]).ga("border-color", "#9fb3e7")
        }
    };
    function Ig(a, b) {
        var c = rg(a.ha[0]);
        a.na || (x(c).ga("margin-left", "10px"),
        x(c).ga("margin-right", "10px"),
        x(c).ga("margin-top", "5px"),
        x(c).ga("margin-bottom", "5px"));
        x(c).ga("border-width", "3px");
        a.log("Make canvas for page %s, currentPage is %s", b, a.page);
        b === a.page ? x(c).ga("border-color", "#9fb3e7") : x(c).ga("border-color", "transparent");
        x(c).ga("border-style", "solid");
        a.da.push(c);
        c.page = b;
        x(c).click(function() {
            a.aa.Ac(c.page)
        });
        return c
    }
    function Jg(a) {
        a.log("Regenerate page views.");
        var b = a.ha.width() - 6 - 10 - vg()
          , c = a.ha.height() - 6
          , d = a.aa.bc()
          , e = a.aa.ad();
        c > b ? c = b / e.width * e.height : b = c / e.height * e.width;
        for (var f = 0; f < d; f++) {
            var g;
            g = f === a.da.length ? Ig(a, f) : a.da[f];
            g.width = b;
            g.height = c;
            g = g.getContext("2d");
            g.save();
            g.fillStyle = "#ffffff";
            g.fillRect(0, 0, b, c);
            g.scale(b / e.width, b / e.width);
            g.translate(-e.x, -e.y);
            a.aa.ma(g, {
                page: f
            });
            g.restore()
        }
        for (; f < a.da.length; f++)
            x(a.da[f]).remove();
        a.da.length = d
    }
    function Kg(a, b) {
        function c() {
            null === e && d.ka && (e = setTimeout(function() {
                Jg(d);
                d.pb(d.aa.jc());
                e = null
            }, 100))
        }
        var d = a
          , e = null;
        a.aa = b;
        b.on("document-changed", function() {
            c()
        });
        b.on("resource-loaded", function() {
            c()
        });
        b.on("set-page", function(a) {
            d.pb(a)
        })
    }
    function Lg(a, b) {
        a.ka = b;
        a.ka && a.aa && setTimeout(function() {
            Jg(a)
        }, 10)
    }
    Hg.prototype = x.aa({}, J.prototype, Hg.prototype);
    function Mg(a, b, c) {
        Ng(this, a, b, c)
    }
    function Ng(a, b, c, d) {
        J.call(a);
        a.Xa = !0;
        a.id = b;
        a.canvas = rg(document.body);
        a.canvas.style.position = "absolute";
        a.canvas.style.border = "none";
        a.oa = a.canvas.getContext("2d");
        a.cc = c;
        a.width = 32;
        a.height = 500;
        a.canvas.width = a.width;
        a.canvas.height = a.height;
        x(a.canvas).bind("click", function(b) {
            a.Hb(b)
        });
        x(a.canvas).bind("mousedown", function(b) {
            a.Oa(b)
        });
        d.bind(x(document.body), "mousemove", function(b) {
            a.Ra(b)
        });
        d.bind(x(document.body), "mouseup", function(b) {
            a.Ya(b)
        });
        x(a.canvas).bind("touchstart", function(b) {
            a.hb(b)
        });
        d.bind(x(document.body), "touchmove", function(b) {
            a.hb(b)
        });
        d.bind(x(document.body), "touchend", function(b) {
            a.hb(b)
        });
        a.aa = null;
        a.Qa = !1;
        a.ua = "#c0c0c0";
        a.qa = "#808080";
        a.borderWidth = 1;
        a.ka = 0;
        a.da = 100;
        a.na = 10;
        a.position = 5;
        a.format()
    }
    n = Mg.prototype;
    n.log = t("SCROLLBAR", !0);
    n.moveTo = function(a, b) {
        this.canvas.style.left = "" + a + "px";
        this.canvas.style.top = "" + b + "px"
    }
    ;
    n.qc = function(a, b) {
        this.width = a;
        this.height = b;
        this.canvas.width = this.width;
        this.canvas.height = b;
        this.format();
        this.ma()
    }
    ;
    n.sa = function() {
        this.canvas.style.display = "none"
    }
    ;
    n.show = function() {
        this.canvas.style.display = "block"
    }
    ;
    n.format = function() {
        var a;
        a = this.cc ? this.width : this.height;
        var b = this.na / this.da * a;
        a = (this.position - this.ka) / this.da * a;
        this.aa = this.cc ? new P(a,0,b - 1,this.height - 1) : new P(0,a,this.width - 1,b - 1);
        this.aa.x = Math.round(this.aa.x) + .5;
        this.aa.y = Math.round(this.aa.y) + .5;
        this.aa.width = Math.round(this.aa.width);
        this.aa.height = Math.round(this.aa.height)
    }
    ;
    n.ma = function() {
        this.oa.beginPath();
        this.oa.fillStyle = this.ua;
        this.oa.strokeStyle = this.qa;
        this.oa.lineWidth = this.borderWidth;
        this.oa.rect(this.borderWidth / 2, this.borderWidth / 2, this.width - this.borderWidth, this.height - this.borderWidth);
        this.oa.fill();
        this.oa.stroke();
        this.oa.beginPath();
        this.oa.fillStyle = this.qa;
        this.oa.strokeStyle = "#000000";
        this.oa.rect(this.aa.x, this.aa.y, this.aa.width, this.aa.height);
        this.oa.fill();
        this.oa.stroke()
    }
    ;
    function Og(a, b) {
        var c = x(a.canvas).offset();
        if ("touchstart" === b.type || "touchend" === b.type || "touchmove" === b.type)
            b = b.changedTouches[0];
        return new A(b.pageX - c.left,b.pageY - c.top)
    }
    n.hb = function(a) {
        switch (a.type) {
        case "touchstart":
            this.Oa(a);
            break;
        case "touchend":
            this.Ya(a);
            break;
        case "touchmove":
            this.Ra(a)
        }
    }
    ;
    n.Hb = function() {}
    ;
    function Pg(a, b) {
        var c;
        c = a.cc ? b.x / a.width * a.da + a.ka : b.y / a.height * a.da + a.ka;
        c = Math.min(c, a.da - a.na + a.ka);
        return c = Math.max(c, a.ka)
    }
    n.Oa = function(a) {
        a.preventDefault();
        a = Og(this, a);
        this.aa.Wb(a.x, a.y) ? this.cc ? (this.offset = a.x - this.aa.x,
        a.x -= this.offset) : (this.offset = a.y - this.aa.y,
        a.y -= this.offset) : (this.position = Pg(this, a),
        this.offset = 0,
        this.cc ? this.aa.x = (this.position - this.ka) / this.da * this.width : this.aa.y = (this.position - this.ka) / this.da * this.height,
        this.emit("scroll", this.position),
        this.ma());
        this.Qa = !0
    }
    ;
    n.Ra = function(a) {
        this.Qa && (this.Qa && "mousemove" === a.type && ("buttons"in a && 0 === a.buttons || 0 === a.which) ? this.Qa = !1 : (a.preventDefault(),
        a = Og(this, a),
        this.cc ? a.x -= this.offset : a.y -= this.offset,
        this.position = Pg(this, a),
        this.emit("scroll", this.position),
        this.format(),
        this.ma()))
    }
    ;
    n.Ya = function() {
        this.Qa && (this.Qa = !1)
    }
    ;
    function we(a) {
        return a.cc ? a.height : a.width
    }
    Mg.prototype = x.aa({}, J.prototype, Mg.prototype);
    function Qg(a, b) {
        this.ha = a;
        this.canvas = document.createElement("canvas");
        this.height = this.width = b;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.canvas.style.cursor = "crosshair";
        this.ua = 0;
        this.ha.appendChild(this.canvas);
        "G_vmlCanvasManager"in window && window.G_vmlCanvasManager.initElement(this.canvas);
        this.oa = this.canvas.getContext("2d");
        var c = document.createElement("input");
        c.setAttribute("type", "range");
        this.na = document.createElement("input");
        this.na.setAttribute("type", "checkbox");
        "range" === c.type ? (this.ha.appendChild(document.createElement("br")),
        this.ha.appendChild(c),
        c.min = 0,
        c.max = 255,
        c.value = 255,
        this.da = c) : (this.da = null,
        c = "colourcheckbox" + this.ua,
        this.na.setAttribute("id", c),
        this.ha.appendChild(document.createElement("br")),
        this.ha.appendChild(this.na),
        this.ua += 1,
        c = x("<label>").fb("for", c).text("Transparent"),
        this.ha.appendChild(c[0]));
        this.aa = this.height;
        this.ka = .8 * this.height;
        if (Qg[b])
            this.data = Qg[b];
        else {
            for (var c = this.oa.getImageData(0, 0, this.aa, this.aa), d = this.aa / 2, e = this.ka / 2, f, g = 0; g < this.aa; g++) {
                var h = Math.sqrt(d * d - (g - d) * (g - d))
                  , k = Math.floor(-h + d)
                  , l = Math.floor(h + d)
                  , m = e * e - (g - d) * (g - d);
                if (0 <= m) {
                    for (var h = Math.sqrt(m), m = Math.floor(-h + d), q = Math.floor(h + d), h = g * this.aa * 4 + 4 * k; k <= m; k++)
                        f = Math.atan2(g - d, k - d),
                        f = new V(2,[f / Math.PI * 180, 1, 1, 1]),
                        f = og(f, 0),
                        c.data[h++] = 255 * f.values[0],
                        c.data[h++] = 255 * f.values[1],
                        c.data[h++] = 255 * f.values[2],
                        c.data[h++] = 255;
                    h = g * this.aa * 4 + 4 * q;
                    k = q
                } else
                    h = g * this.aa * 4 + 4 * k;
                for (; k <= l; k++)
                    f = Math.atan2(g - d, k - d),
                    f = new V(2,[f / Math.PI * 180, 1, 1, 1]),
                    f = og(f, 0),
                    c.data[h++] = 255 * f.values[0],
                    c.data[h++] = 255 * f.values[1],
                    c.data[h++] = 255 * f.values[2],
                    c.data[h++] = 255
            }
            this.data = c;
            Qg[b] = c
        }
        this.ba = new V(2,[20, 1, 1, 1]);
        this.update();
        this.ma();
        var r = this;
        r.Ca = !1;
        r.qa = "";
        Ka(x(this.canvas), function(a) {
            var b = x(r.canvas).offset()
              , c = a.pageX - b.left
              , b = a.pageY - b.top;
            r.Ca = !0;
            Rg(r, c, b);
            a.stopPropagation();
            a.preventDefault()
        });
        Ia(x(this.canvas), function(a) {
            if (r.Ca) {
                var b = x(r.canvas).offset();
                Rg(r, a.pageX - b.left, a.pageY - b.top)
            }
            a.stopPropagation();
            a.preventDefault()
        });
        Ja(function() {
            r.Ca = !1;
            r.qa = ""
        });
        null !== this.da && Ea(x(this.da), function() {
            r.ba.values[3] = r.da.value / 255;
            r.update();
            r.ma()
        });
        Ea(x(this.na), function() {
            r.ba.values[3] = r.na.checked ? 0 : 1;
            r.update();
            r.ma()
        })
    }
    Qg.prototype = {
        update: function() {
            this.Ka && this.Ka(this.ba.toString())
        },
        ma: function() {
            this.oa.save();
            this.oa.lineWidth = 1;
            this.oa.fillStyle = "rgb(128, 128, 128)";
            this.oa.fillRect(0, 0, this.width, this.height);
            this.oa.putImageData(this.data, 0, 0);
            var a = this.ba.values[0] / 180 * Math.PI;
            this.oa.beginPath();
            var b = {
                x: Math.cos(a) * this.ka / 2 + this.aa / 2,
                y: Math.sin(a) * this.ka / 2 + this.aa / 2
            }
              , c = {
                x: Math.cos(a + 2 * Math.PI / 3) * this.ka / 2 + this.aa / 2,
                y: Math.sin(a + 2 * Math.PI / 3) * this.ka / 2 + this.aa / 2
            }
              , d = {
                x: Math.cos(a + 4 * Math.PI / 3) * this.ka / 2 + this.aa / 2,
                y: Math.sin(a + 4 * Math.PI / 3) * this.ka / 2 + this.aa / 2
            }
              , e = Math.cos(a) * this.aa / 2 + this.aa / 2
              , a = Math.sin(a) * this.aa / 2 + this.aa / 2
              , f = c.x + (d.x - c.x) / 2
              , g = c.y + (d.y - c.y) / 2;
            this.oa.moveTo(b.x, b.y);
            this.oa.lineTo(c.x, c.y);
            this.oa.lineTo(d.x, d.y);
            this.oa.lineTo(b.x, b.y);
            var h = this.oa.createLinearGradient(c.x, c.y, d.x, d.y);
            h.addColorStop(0, "#ffffff");
            h.addColorStop(1, "#000000");
            this.oa.fillStyle = h;
            this.oa.fill();
            h = this.oa.createLinearGradient(b.x, b.y, f, g);
            f = og(this.ba, 2);
            f.values[1] = 1;
            f.values[2] = 1;
            f = og(f, 0);
            f.values[3] = 1;
            h.addColorStop(0, f.toString());
            f.values[3] = 0;
            h.addColorStop(1, f.toString());
            this.oa.fillStyle = h;
            this.oa.fill();
            this.strokeStyle = "#000000";
            this.oa.beginPath();
            this.oa.moveTo(b.x, b.y);
            this.oa.lineTo(e, a);
            this.oa.stroke();
            a = 1 - this.ba.values[2];
            e = this.ba.values[1] * b.x + a * d.x + (1 - this.ba.values[1] - a) * c.x;
            a = this.ba.values[1] * b.y + a * d.y + (1 - this.ba.values[1] - a) * c.y;
            this.oa.beginPath();
            this.oa.arc(e, a, 4, 0, 2 * Math.PI, !1);
            this.oa.stroke();
            this.oa.restore();
            this.nc = b;
            this.Oc = c;
            this.ld = d
        }
    };
    function Rg(a, b, c) {
        var d = Math.sqrt((b - a.aa / 2) * (b - a.aa / 2) + (c - a.aa / 2) * (c - a.aa / 2));
        if ("ring" === a.qa || "triangle" !== a.qa && d >= a.ka / 2 && d <= a.aa / 2)
            a.ba.values[0] = Math.atan2(a.aa / 2 - c, a.aa / 2 - b) / Math.PI * 180 + 180,
            0 === a.ba.values[1] && (a.ba.values[1] = 1,
            a.ba.values[2] = 1),
            a.qa = "ring";
        else {
            var e, f = a.nc, d = a.Oc, g = a.ld;
            e = (f.x - g.x) * (d.y - g.y) - (d.x - g.x) * (f.y - g.y);
            d = ((d.y - g.y) * (b - g.x) - (d.x - g.x) * (c - g.y)) / e;
            b = 1 - Math.max(0, d) - Math.max(0, (-(f.y - g.y) * (b - g.x) + (f.x - g.x) * (c - g.y)) / e);
            a.ba.values[1] = Math.min(Math.max(d, 0), 1);
            a.ba.values[2] = 1 - Math.min(Math.max(b, 0), 1);
            a.qa = "triangle"
        }
        0 === a.ba.values[3] && (a.ba.values[3] = 1,
        null !== a.da && (a.da.value = 255));
        a.ma();
        a.update()
    }
    function Sg(a, b) {
        a.ba = og(pf(b), 2);
        null !== a.da && (a.da.value = Math.round(255 * a.ba.values[3]));
        a.na.checked = 0 === a.ba.values[3] ? !0 : !1;
        a.ma();
        a.update()
    }
    function Tg() {
        var a = document.createElement("canvas");
        "G_vmlCanvasManager"in window && window.G_vmlCanvasManager.initElement(a);
        return a.getContext && a.getContext("2d").getImageData
    }
    ;function Ug(a, b, c) {
        this.ia = a;
        this.na = b;
        this.ua = c;
        ec(this, x("<div>"));
        Na(this.ha, "PropertyPanel");
        this.aa = [];
        this.ba = {};
        this.view = null;
        this.Aa = [];
        (this.qa = Tg() && "wheel" === a.get("colourPicker")) || this.log("ColourWheel not supported in this canvas.");
        this.action = null;
        this.ha.ga("background", "#ffffff");
        this.ha.ga("border", "none");
        this.ha.ga("font-family", "tahoma,arial,helvetica,sans");
        this.ha.ga("color", "#4fa0d3");
        this.ha.ga("font-weight", "bold");
        this.ha.ga("font-size", "10pt");
        this.ha.ga("overflow-y", "scroll");
        var d = this;
        this.ha.click(function() {
            d.log("PropertyPanel clicked.");
            d.emit("click")
        });
        this.da = null
    }
    Ug.prototype = {
        log: t("PROP"),
        on: function(a, b) {
            if ("click" === a)
                this.da = b;
            else
                throw "This object only handles the click event";
        },
        emit: function() {
            this.da && this.da()
        },
        apply: function(a, b) {
            this.view.setProperty(a, b)
        }
    };
    function Vg(a, b, c, d) {
        null !== a.action && a.action.name === d.name || a.view.setProperty(d.name, b);
        c.value = b
    }
    function Wg(a, b) {
        if (!b.He)
            if (a.qa) {
                var c = document.createElement("div")
                  , d = new Qg(c,120);
                Sg(d, b.input.value);
                d.Ka = function(c) {
                    Vg(a, c, b.input, b.input.Pb)
                }
                ;
                b.Eh = d;
                b.He = !0;
                b.parentNode.appendChild(c)
            } else {
                c = new Ag(x(b.parentNode),20,!1,!0);
                c.ha.ga("position", "static");
                Dg(c, a.ia.get("colourPalette"));
                b.Eh = c;
                b.He = !0;
                b.parentNode.appendChild(c.ha[0]);
                var e;
                c.on("colour", function(c) {
                    Vg(a, c.Va, b.input, b.input.Pb);
                    c = pf(c.Va).values[3];
                    e.value = Math.round(100 * c)
                });
                e = hd(a.ua);
                e.min = 0;
                e.max = 100;
                var f = pf(b.input.value);
                e.Ye(Math.round(100 * f.values[3]));
                e.onchange = function() {
                    f = pf(b.input.value);
                    f.values[3] = e.value / 100;
                    Vg(a, f.toString(), b.input, b.input.Pb)
                }
                ;
                b.parentNode.appendChild(document.createElement("br"));
                b.parentNode.appendChild(e)
            }
    }
    function Xg(a) {
        function b() {
            Wg(a, this)
        }
        function c() {
            var b = this;
            "timer"in b && clearTimeout(b.timer);
            b.timer = setTimeout(function() {
                a.apply(b.Pb.name, b.value)
            }, 250)
        }
        function d() {
            a.view.log("Someone clicked a button for %s", this.Pb.name)
        }
        function e(b) {
            13 === b.keyCode && a.apply(this.Pb.name, this.value)
        }
        function f() {
            a.apply(this.Pb.name, this.Pb.values[parseInt(this.value, 10)].value)
        }
        x(a.ha).empty();
        var g, h;
        for (g = 0; g < a.aa.length; g++) {
            var k = a.aa[g]
              , l = k.qe;
            if ("none" !== l.type) {
                var m = document.createElement("div");
                h = document.createElement("span");
                h.appendChild(document.createTextNode(l.display));
                m.appendChild(h);
                m.appendChild(document.createElement("br"));
                if ("select" === l.type) {
                    var q = document.createElement("select");
                    for (h = 0; h < l.values.length; h++) {
                        var r = l.values[h]
                          , u = document.createElement("option");
                        u.appendChild(document.createTextNode(r.name));
                        u.setAttribute("value", h);
                        r.value === k.value && u.setAttribute("selected", "");
                        q.appendChild(u)
                    }
                    q.Pb = l;
                    q.onchange = f;
                    m.appendChild(q)
                } else if ("colour" === l.type)
                    h = document.createElement("input"),
                    h.setAttribute("type", "text"),
                    h.value = k.value,
                    h.Pb = l,
                    La(x(h), e),
                    m.appendChild(h),
                    k = document.createElement("img"),
                    k.src = L(a.ia, "wd-wheel.png"),
                    k.style.verticalAlign = "middle",
                    k.input = h,
                    m.appendChild(k),
                    x(k).click(b);
                else if ("text" === l.type)
                    h = document.createElement("input"),
                    h.setAttribute("type", "text"),
                    h.value = k.value,
                    h.Pb = l,
                    La(x(h), e),
                    m.appendChild(h);
                else if ("textarea" === l.type)
                    h = document.createElement("textarea"),
                    h.setAttribute("rows", "3"),
                    h.setAttribute("cols", "20"),
                    h.value = k.value,
                    h.Pb = l,
                    La(x(h), c),
                    m.appendChild(h);
                else if ("button" === l.type)
                    h = document.createElement("input"),
                    h.setAttribute("type", "button"),
                    h.value = "Edit",
                    h.Pb = l,
                    x(h).click(d),
                    m.appendChild(h);
                else
                    throw "Error: No such property";
                a.ha.append(m)
            }
        }
    }
    function Yg(a, b, c) {
        var d = a.na.yc();
        if ("strokeStyle" === c)
            return {
                name: c,
                type: "colour",
                display: d("outline-colour")
            };
        if ("fillStyle" === c)
            return {
                name: c,
                type: "colour",
                display: d("fill-colour")
            };
        if ("lineWidth" === c)
            return a = [{
                name: d("thickness-pencil"),
                value: 1
            }, {
                name: d("thickness-pen"),
                value: 2
            }, {
                name: d("thickness-marker"),
                value: 4
            }, {
                name: d("thickness-brush"),
                value: 10
            }],
            !0 !== b.pa("closed") && "TextNode" !== b.type() || a.unshift({
                name: d("none"),
                value: 0
            }),
            {
                name: c,
                display: d("outline-thickness"),
                type: "select",
                values: a
            };
        if ("sloppiness" === c)
            return {
                name: "sloppiness",
                display: d("sloppiness"),
                type: "select",
                values: [{
                    name: d("sloppiness-draftsman"),
                    value: 0
                }, {
                    name: d("sloppiness-artist"),
                    value: .25
                }, {
                    name: d("sloppiness-cartoonist"),
                    value: .5
                }, {
                    name: d("sloppiness-child"),
                    value: 1
                }, {
                    name: d("sloppiness-drunk"),
                    value: 2
                }]
            };
        if ("smoothness" === c)
            return {
                name: "smoothness",
                display: d("smoothness"),
                type: "select",
                values: [{
                    name: d("smoothness-sharpest"),
                    value: 0
                }, {
                    name: d("smoothness-sharper"),
                    value: .1
                }, {
                    name: d("smoothness-sharp"),
                    value: .2
                }, {
                    name: d("smoothness-smooth"),
                    value: .3
                }, {
                    name: d("smoothness-smoothest"),
                    value: .5
                }]
            };
        if ("shadow" === c)
            return {
                name: "shadow",
                display: d("shadow"),
                type: "select",
                values: [{
                    name: d("yes"),
                    value: !0
                }, {
                    name: d("no"),
                    value: !1
                }]
            };
        if ("dashes" === c)
            return {
                name: "dashes",
                display: d("line-style"),
                type: "select",
                values: [{
                    name: d("line-style-solid"),
                    value: ""
                }, {
                    name: d("line-style-short-dashes"),
                    value: "5,5"
                }, {
                    name: d("line-style-long-dashes"),
                    value: "10,5"
                }]
            };
        if ("matrix" === c || "inverse" === c || "closed" === c || "commands" === c || "seed" === c)
            return {
                name: c,
                type: "none"
            };
        if ("text" === c)
            return {
                name: "text",
                display: d("text"),
                type: "textarea"
            };
        if ("textFillStyle" === c)
            return {
                name: "textFillStyle",
                display: d("text-colour"),
                type: "colour"
            };
        if ("fontSize" === c)
            return {
                name: "fontSize",
                display: d("font-size"),
                type: "select",
                values: [{
                    name: "10",
                    value: 10
                }, {
                    name: "12",
                    value: 12
                }, {
                    name: "15",
                    value: 15
                }, {
                    name: "20",
                    value: 20
                }, {
                    name: "30",
                    value: 30
                }, {
                    name: "40",
                    value: 40
                }, {
                    name: "50",
                    value: 50
                }, {
                    name: "60",
                    value: 60
                }, {
                    name: "100",
                    value: 100
                }]
            };
        if ("fontName" === c) {
            b = [];
            c = a.ia.wa.fonts;
            for (a = 0; a < c.length; a++)
                b.push({
                    name: c[a],
                    value: c[a]
                });
            return {
                name: "fontName",
                display: d("font"),
                type: "select",
                values: b
            }
        }
        return "arrowSize" === c ? {
            name: "arrowSize",
            display: d("arrowhead-size"),
            type: "select",
            values: [{
                name: d("arrowhead-size-none"),
                value: 0
            }, {
                name: d("arrowhead-size-tiny"),
                value: 10
            }, {
                name: d("arrowhead-size-small"),
                value: 15
            }, {
                name: d("arrowhead-size-medium"),
                value: 20
            }, {
                name: d("arrowhead-size-large"),
                value: 30
            }]
        } : "arrowStyle" === c ? {
            name: "arrowStyle",
            display: d("arrowhead-style"),
            type: "select",
            values: [{
                name: d("arrowhead-style-simple"),
                value: "simple"
            }, {
                name: d("arrowhead-style-solid"),
                value: "solid"
            }]
        } : "doubleArrow" === c ? {
            name: "doubleArrow",
            display: d("double-arrows"),
            type: "select",
            values: [{
                name: d("no"),
                value: !1
            }, {
                name: d("yes"),
                value: !0
            }]
        } : "url" === c ? {
            name: "url",
            display: d("image-url"),
            type: "text"
        } : "rows" === c ? {
            name: c,
            display: "Rows",
            type: "text"
        } : "columns" === c ? {
            name: c,
            display: "Columns",
            type: "text"
        } : {
            name: c,
            display: "Display-" + c,
            type: "text"
        }
    }
    Ug.prototype = x.aa({}, cc.prototype, Ug.prototype);
    function Zg(a, b, c, d) {
        this.view = a;
        this.Ea = this.Da = 0;
        this.Qa = !1;
        this.aa = b;
        this.Oa(c, d)
    }
    Zg.prototype = {
        log: t("SELECT"),
        hb: function(a) {
            "touchmove" === a.type ? (a = $g(this.view, a.changedTouches[0]),
            this.Ra(a.x, a.y)) : "touchend" === a.type && (a = $g(this.view, a.changedTouches[0]),
            this.Ya(a.x, a.y))
        },
        Wa: function(a) {
            this.log("Gesture detected; aborting select box.");
            this.view.ra = this.aa;
            this.view.ra.Wa && this.view.ra.Wa(a)
        },
        Oa: function(a, b) {
            this.Da = a;
            this.Ea = b;
            this.Qa = !0
        },
        Ra: function(a, b) {
            if (this.Qa) {
                var c = this.view.oa
                  , d = this;
                this.view.ma(function() {
                    c.save();
                    c.strokeStyle = "#0050B7";
                    c.lineWidth = 2 / d.view.scale;
                    c.fillStyle = "rgba(0, 80, 183, 0.2)";
                    var e = new P(d.Da + .5,d.Ea + .5,a - d.Da,b - d.Ea);
                    c.fillRect(e.x, e.y, e.width, e.height);
                    c.strokeRect(e.x, e.y, e.width, e.height);
                    c.restore()
                })
            }
        },
        Ya: function(a, b) {
            this.Qa = !1;
            this.view.ib();
            for (var c = this.view, d = ag(c.la, new P(this.Da,this.Ea,a - this.Da,b - this.Ea)), e = 0; e < d.length; e++)
                $e(c, d[e]);
            af(this.view);
            this.view.ma();
            this.view.ra = this.aa
        }
    };
    function Za(a) {
        this.view = a;
        ue(this.view, "");
        this.$b = this.view.ia.$b();
        this.na = 1;
        this.$b && (this.na = 2);
        this.ba = new hb(a)
    }
    Za.prototype = {
        log: t("DefaultBehaviour"),
        Gb: function() {
            this.log("Entering pick tool.");
            this.view.canvas.style.cursor = "default"
        },
        Mb: function() {
            this.log("Leaving pick tool.")
        },
        hb: function(a) {
            for (var b, c = 0; c < a.touches.length; c++) {
                b = a.touches[c];
                b = y(this.view, b.pageX, b.pageY);
                if ("touchstart" === a.type)
                    return this.Oa(b.x, b.y, a);
                if ("touchend" === a.type)
                    return this.Ya(b.x, b.y)
            }
            return !1
        },
        Wa: function(a) {
            this.ba.Wa(a)
        },
        Oa: function(a, b, c) {
            var d, e;
            this.log("onMouseDown");
            if (this.view.ia.get("readOnly"))
                (d = this.view.la.$a(a, b, this.view.Ja)) ? (this.log("layer=%s active=%s", Oe(d), this.view.Ja),
                this.view.aa.emit("node-clicked", d.id)) : this.log("readOnly mode: Ignoring click.");
            else {
                d = this.view;
                if (d.Fa)
                    e = null;
                else {
                    e = d.te / d.scale;
                    for (var f = null, g = Number.MAX_VALUE, h = 0; h < d.eb.length; h++) {
                        var k = d.eb[h]
                          , l = Nb(k.x, k.y, a, b);
                        l < e && l < g && (g = l,
                        f = k)
                    }
                    e = f
                }
                if (e)
                    C(this.view, new Qd(this.view,e,!1,a,b));
                else {
                    if (d = this.view.selection.length)
                        d = this.view,
                        g = ve(d),
                        h = x(d.canvas).offset(),
                        f = we(d.ba),
                        "changedTouches"in c ? (e = c.changedTouches[0].pageX - h.left - g,
                        g = c.changedTouches[0].pageY - h.top - g) : (e = c.pageX - h.left - g,
                        g = c.pageY - h.top - g),
                        h = d.da,
                        d = d.gb && e > h.width - d.gb.width - f && g < d.gb.height;
                    d && ah(this.view);
                    if (this.view.Fa && (d = this.view.Fa,
                    e = d.Ub(a, b, 1 / this.view.scale * this.na),
                    null !== e)) {
                        C(this.view, new Xa(this.view,d,e,a,b));
                        return
                    }
                    if (d = this.view.la.$a(a, b, this.view.Ja))
                        this.log("layer=%s active=%s", Oe(d), this.view.Ja),
                        this.view.aa.emit("node-clicked", d.id);
                    if (d && Oe(d) === this.view.Ja) {
                        f = d === this.view.Fa;
                        g = d.Ib === this.view.Ib;
                        this.log("wasEditNode: %s, wasSelected: %s", f, g);
                        if ("WallNode" === d.type() && (e = d.Ub(a, b, 1 / this.view.scale),
                        null !== e)) {
                            C(this.view, new Xa(this.view,d,e,a,b));
                            return
                        }
                        g || (c.shiftKey || this.view.ib(),
                        $e(this.view, d),
                        af(this.view));
                        C(this.view, new Qd(this.view,this.view.Yb ? new Ae(d,d.Sa()) : new Be,!f && g,a,b))
                    } else if (c = this.view,
                    c.selection.length && c.Xd.Wb(a, b))
                        C(this.view, new Qd(this.view,this.view.Yb ? new Ae(this.view.selection[0],this.view.selection[0].Sa()) : new Be,!0,a,b));
                    else if (c = this.view.ia,
                    "auto" === c.wa.allowSelectBox ? (d = c.$b(),
                    e = document.documentElement.clientHeight,
                    f = window.innerHeight,
                    g = !d || d && 0 < f - e + 50,
                    c.log("Allowing select box: %s (useTouch=%s, documentHeight=%s, windowHeight=%s)", g, d, e, f),
                    c = g) : c = c.wa.allowSelectBox,
                    c)
                        this.view.Fa = null,
                        C(this.view, new Zg(this.view,this,a,b));
                    else
                        return this.log("Disabled select box -- mobile touch active."),
                        this.view.Fa = null,
                        this.view.ib(),
                        af(this.view),
                        this.view.ma(),
                        !1
                }
            }
        },
        Ya: function() {
            this.log("onMouseUp")
        },
        vb: function(a, b) {
            this.log("keyboard: %s", a);
            var c = !0
              , d = this.view.ia.get("nudge");
            b && b.ctrlKey && (d = this.view.ia.get("preciseNudge"));
            switch (a) {
            case "bring-to-front":
                bh(this.view);
                break;
            case "send-to-back":
                ch(this.view);
                break;
            case "left":
                dh(this.view, -1, 0, d) || (this.view.Na = Math.min(this.view.Na + 16, 0),
                nb(this.view),
                this.view.ma());
                break;
            case "right":
                dh(this.view, 1, 0, d) || (d = this.view.da.width,
                this.view.Na = Math.max(-(d * this.view.scale - d), this.view.Na - 16),
                nb(this.view),
                this.view.ma());
                break;
            case "up":
                dh(this.view, 0, -1, d) || (this.view.La = Math.min(this.view.La + 16, 0),
                nb(this.view),
                this.view.ma());
                break;
            case "down":
                dh(this.view, 0, 1, d) || (d = this.view.da.height,
                this.view.La = Math.max(-(d * this.view.scale - d), this.view.La - 16),
                nb(this.view),
                this.view.ma());
                break;
            case "select-none":
                this.view.ib();
                af(this.view);
                this.view.ma();
                this.view.Ga.qb && this.view.sb.emit("goto-toolbar");
                break;
            case "select-all":
                var e = [];
                this.view.la.Zc(function(a) {
                    e.push(a)
                });
                eh(this.view, e);
                this.view.ma();
                this.view.Ga.qb && this.view.sb.emit("goto-toolbar");
                break;
            case "duplicate":
                fh(this.view);
                break;
            case "move-up":
                gh(this.view);
                break;
            case "move-down":
                hh(this.view);
                break;
            case "delete":
                ah(this.view);
                break;
            case "curve-tool":
                ih(this.view, {});
                break;
            case "line-tool":
                jh(this.view, {}, !1);
                break;
            case "group":
                kh(this.view);
                break;
            case "ungroup":
                lh(this.view);
                break;
            case "undo":
                this.view.cb();
                break;
            case "redo":
                this.view.fc();
                break;
            case "cut":
                mh(this.view);
                break;
            case "copy":
                nh(this.view);
                break;
            case "paste":
                oh(this.view);
                break;
            case "zoom-normal":
                this.view.ia.get("allowZoom") ? (d = ph(this.view),
                this.view.scale = 1,
                this.view.Na = -d.x,
                this.view.La = -d.y,
                nb(this.view),
                this.view.ma()) : this.log("Zooming is disabled.");
                break;
            case "zoom-in":
                this.view.ia.get("allowZoom") ? qh(this.view) : this.log("Zooming is disabled.");
                break;
            case "zoom-out":
                this.view.ia.get("allowZoom") ? rh(this.view) : this.log("Zooming is disabled.");
                break;
            default:
                c = !1
            }
            c && (b.preventDefault(),
            b.stopPropagation())
        },
        Nb: function(a) {
            var b;
            a.zd ? (this.view.jb = a.Va,
            this.view.zb = a.Va,
            b = "fillStyle") : (this.view.mb = a.Va,
            b = "strokeStyle");
            this.view.setProperty(b, a.Va)
        },
        ec: function(a, b) {
            b ? (this.view.jb = de(this.view.jb, a),
            this.view.zb = de(this.view.zb, a)) : this.view.mb = de(this.view.mb, a);
            le(this.view, a, b)
        },
        mc: function(a, b) {
            this.log("onDoubleClick");
            var c = this.view.la.$a(a, b, this.view.Ja);
            this.log("hittest: %s, hasText: %s", null !== c, null !== c && c.Id());
            this.view.aa.emit("double-click", a, b, c ? c.id : null);
            c && "PathNode" === c.type() && !this.view.ia.get("allowTextInShape") ? this.log("Editing text in shape is disabled.") : c && c.Id() && (this.log("Text double-clicked."),
            sh(this.view, {}),
            ke(this.view.ra, c, a, b))
        },
        Tb: function() {
            return "pick"
        }
    };
    for (var th = [], uh = 0; 4 > uh; uh++)
        th.push(String.fromCharCode(">2$-".charCodeAt(uh) ^ "zwibbler3".charCodeAt(uh % 9)));
    for (var vh = [115, 116, 114, 111, 107, 101, 84, 101, 120, 116], wh = [], xh = 0; xh < vh.length; xh++)
        wh.push(String.fromCharCode(vh[xh]));
    function yh(a, b, c, d, e, f, g, h) {
        this.ia = e;
        this.ef = f;
        this.ka = c;
        this.sb = d;
        this.oc = h;
        this.canvas = a[0];
        this.oa = this.canvas.getContext("2d");
        this.aa = g;
        this.ub = !0 === e.get("pageView");
        this.Fc = new cb;
        zh(this);
        this.Ga = {
            qb: !1,
            Qa: !1,
            ge: !1,
            x: 100,
            y: 100
        };
        this.ra = new Za(this);
        this.Vc = null;
        this.ua = new Mg("horizontal",!0,this.oc);
        this.canvas.parentNode.appendChild(this.ua.canvas);
        this.ba = new Mg("vertical",!1,this.oc);
        this.canvas.parentNode.appendChild(this.ba.canvas);
        this.Xa = "none";
        this.Zb = 0;
        this.Yb = this.Bd = this.Ec = !0;
        this.eb = [];
        this.Ja = "default";
        this.Ud = Ah(this);
        this.da = new jd(this.canvas.width / this.Ud,this.canvas.height / this.Ud);
        var k = this;
        this.request = new Ib;
        this.request.canvas = this.canvas;
        this.request.on("reformat", function(a) {
            k.log("Node %s requests reformat", a);
            a in k.la.Aa && (k.log("   Reformatting... zoom=%s", k.Xa),
            ce(k.la, a));
            k.update();
            a === k.qa && Bh(k);
            Ch(k);
            k.aa.emit("resource-loaded")
        });
        this.request.on("convert-dom-request", function(a, b) {
            k.aa.emit("convert-dom-request", b, a)
        });
        this.qa = this.background = this.tb = null;
        this.Uc = "no-repeat";
        this.Fa = null;
        e.on("useTouch", function() {
            e.$b() ? (k.gb = document.createElement("img"),
            k.gb.setAttribute("src", L(e, "wd-trash.png")),
            k.te = 16) : (k.gb = null,
            k.te = 8)
        });
        this.na = null;
        this.ba.on("scroll", function(a) {
            k.La = -a * k.scale;
            k.ma()
        });
        this.ua.on("scroll", function(a) {
            k.Na = -a * k.scale;
            k.ma()
        });
        Bh(this);
        Dh(this, b);
        (a = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame) ? (this.log("Using requestAnimationFrame"),
        this.Cd = a) : this.log("Emulating requestAnimationFrame");
        this.Vd = !1;
        this.Xb = null;
        this.ia.on("update", function(a, b) {
            k.kd(a, b)
        });
        this.oc.bind(x(document), "webkitfullscreenchange", function() {
            0 <= navigator.userAgent.search("Safari") && 0 > navigator.userAgent.search("Chrome") && (k.log("SAFARI WORKAROUND: Disabling requestAnimationFrame."),
            k.Cd = yh.prototype.Cd)
        });
        this.Db = !1;
        G(this)
    }
    yh.prototype = {
        log: t("VIEW"),
        Cd: function(a) {
            a()
        },
        vd: function(a, b) {
            this.la.vd(a, b);
            b || a !== this.Ja || (this.ib(),
            af(this));
            this.ma()
        },
        kd: function(a, b) {
            var c = !1;
            switch (a) {
            case "allowResize":
                Yd(this);
                this.ma();
                break;
            case "defaultBrushColour":
                this.zb = b;
                this.ra && void 0 !== this.ra.ne && this.ra.td(b);
                break;
            case "defaultFillStyle":
                this.jb = this.Ba.fillStyle = b;
                break;
            case "defaultStrokeStyle":
                this.mb = b;
                this.Ba.strokeStyle = b;
                break;
            case "defaultLineWidth":
                this.Ba.lineWidth = b;
                this.ra && !this.ra.ne && this.ra.Md && this.ra.Md(b);
                break;
            case "defaultFont":
                this.Ba.fontName = b;
                break;
            case "defaultBold":
                this.Ba.bold = b;
                break;
            case "defaultItalic":
                this.Ba.italic = b;
                break;
            case "defaultFontSize":
                this.Ba.fontSize = b;
                break;
            case "defaultTextFillStyle":
                this.Ba.textFillStyle = b;
                break;
            case "defaultTextStokeStyle":
                this.Ba.textStrokeStyle = b;
                break;
            case "defaultTextLineWidth":
                this.Ba.textLineWidth = b;
                break;
            case "defaultBrushWidth":
                this.rc = b;
                this.ra && this.ra.ne && this.ra.Md(b);
                break;
            case "defaultZoom":
                Eh(this, b);
                break;
            case "pageView":
                this.ub = b;
                c = !0;
                break;
            case "pagePlacement":
                Eh(this, this.Xa);
                break;
            case "snap":
            case "background":
            case "gridSpacing":
            case "gridBlocks":
            case "gridColour":
            case "backgroundImage":
                Bh(this);
                c = !0;
                break;
            case "pageShadow":
            case "symmetry":
            case "outsidePageColour":
                c = !0;
                break;
            case "readOnly":
                !0 === b && (G(this),
                this.ib(),
                af(this),
                c = !0),
                this.la.Sc(b)
            }
            this.ra.kd && this.ra.kd(a, b);
            c && this.ma()
        },
        vb: function(a, b) {
            var c;
            if (this.Ga.qb) {
                var d = 0
                  , e = 0
                  , f = this.ia.get("nudge");
                switch (a) {
                case "right":
                    d = f;
                    break;
                case "left":
                    d = -f;
                    break;
                case "down":
                    e = f;
                    break;
                case "up":
                    e = -f;
                    break;
                case "enter":
                    this.ra.Hb ? (this.Ga.Qa = !1,
                    c = "click") : (this.Ga.Qa = !this.Ga.Qa,
                    c = this.Ga.Qa ? "mousedown" : "mouseup")
                }
                if (d || e)
                    c = this.da,
                    this.Ga.x += d,
                    this.Ga.x = Math.max(this.Ga.x, 0),
                    this.Ga.x = Math.min(c.width, this.Ga.x),
                    this.Ga.y += e,
                    this.Ga.y = Math.max(this.Ga.y, 0),
                    this.Ga.y = Math.min(c.height, this.Ga.y),
                    this.ma(),
                    c = "mousemove";
                c ? (b.preventDefault(),
                b.stopPropagation(),
                this.ma(),
                e = x(this.canvas).offset(),
                d = this.Ga.x + e.left - window.pageXOffset,
                e = this.Ga.y + e.top - window.pageYOffset,
                this.log("Simulate a %s at (%s,%s)", c, d, e),
                f = document.createEvent("MouseEvents"),
                f.initMouseEvent(c, !0, !0, window, 0, d, e, d, e, !1, !1, !1, !1, this.Ga.Qa ? 1 : 0, null),
                this.canvas.dispatchEvent(f),
                c = !0) : c = !1
            } else
                c = !1;
            if (!c) {
                this.ra.vb && this.ra.vb(a, b);
                switch (a) {
                case "next-page":
                    this.pb(this.la.yb + 1);
                    break;
                case "previous-page":
                    this.pb(this.la.yb - 1);
                    break;
                case "zoom-to-page":
                    this.ia.get("allowZoom") && Eh(this, "page");
                    break;
                case "zoom-to-width":
                    this.ia.get("allowZoom") && Eh(this, "width")
                }
                b.preventDefault();
                b.stopPropagation()
            }
        },
        Kg: function() {
            return this.Ga.qb
        },
        Ua: function(a) {
            var b = this.ia.get("snap")
              , c = this.ia.get("autoSnap");
            if (0 < b)
                c = Math.round(a.x / b) * b,
                a = Math.round(a.y / b) * b;
            else {
                if (0 < c)
                    return this.Fc.Ua(a.x, a.y, c / this.scale);
                c = a.x;
                a = a.y
            }
            return new A(c,a)
        },
        setProperty: function(a, b) {
            var c = Fh(this, !0);
            this.Ba[a] = b;
            if (c.length) {
                var d = [new me(c,a,b)];
                if ("fillStyle" === a)
                    for (var e = 0; e < c.length; e++) {
                        var f = B(this.la, c[e], !1);
                        this.log("nodeType=%s closed=%s", f.type(), f.pa("closed"));
                        "PathNode" === f.type() && !1 === f.pa("closed") && d.push(new me([c[e]],"strokeStyle",b))
                    }
                this.za(d)
            }
            0 < this.selection.length && "lineWidth" === a && "BrushNode" === this.selection[0].type() ? this.rc = b : "textFillStyle" === a && (this.Ba.textFillStyle = b)
        },
        ib: function() {
            0 < this.selection.length && (this.Ib += 1,
            this.selection.length = 0,
            this.log("Clear selection. selectGeneration=%s", this.Ib));
            null !== this.Ka && this.aa.emit("selected-edit-handle", null, null);
            this.Fa && (this.log("Clear selection."),
            this.Ka = this.Fa = null)
        },
        za: function(a, b) {
            if (this.ia.get("readOnly"))
                this.log("readOnly mode: Ignoring change.");
            else {
                var c = this.la.za(a, b);
                this.log("Commit added %s nodes", c.Sb.length);
                var d;
                this.la.format(this.oa, this.request);
                if (c.Sb.length) {
                    var e = [];
                    for (d = 0; d < c.Sb.length; d++)
                        e.push(B(this.la, c.Sb[d], !1));
                    this.ia.get("autoPickTool") && eh(this, e)
                } else if (this.selection.length || this.Fa) {
                    e = 0;
                    this.Ib += 1;
                    for (d = 0; d < this.selection.length; d++)
                        d !== e && (this.selection[e] = this.selection[d]),
                        this.selection[e].id in this.la.Aa && (this.selection[e].Ib = this.Ib,
                        e++);
                    this.selection.length !== e && (this.selection.length = e);
                    !this.Fa || this.Fa.id in this.la.Aa || (this.log("EditNode %s no longer exists", this.Fa.id),
                    this.Fa = null,
                    null !== this.Ka && this.aa.emit("selected-edit-handle", null, null),
                    this.Ka = null);
                    0 !== this.selection.length || this.Fa || this.ib();
                    af(this)
                }
                Gh(this, c);
                Ch(this);
                this.ma();
                this.aa.emit("document-changed")
            }
        },
        update: function(a, b) {
            if (this.la.format(this.oa, this.request) || a)
                Yd(this),
                this.ma(b)
        },
        wb: function() {
            var a = x(this.canvas)
              , b = a.offset()
              , c = x(this.canvas.parentNode).offset()
              , d = a.width()
              , a = a.height()
              , e = b.left - c.left
              , b = b.top - c.top
              , c = ve(this);
            this.ba.moveTo(e + d - 20 + c, b + c);
            this.ba.qc(20, a - 20);
            this.ua.moveTo(e + c, b + a - 20 + c);
            this.ua.qc(d - 20, 20);
            Ch(this);
            this.ma()
        },
        ma: function(a) {
            if (!Hh(this) && (this.Xb = a,
            !this.Vd)) {
                this.Vd = !0;
                var b = this;
                this.Cd.call(window, function() {
                    b.Vd = !1;
                    var a = Ah(b);
                    a !== b.Ud && (b.log("Detected DPR change; resize canvas now"),
                    Ih(b, b.da.width, b.da.height),
                    b.Ud = a);
                    var d = ib(b)
                      , e = d.x
                      , f = d.y
                      , g = d.width
                      , h = d.height;
                    b.oa.setTransform(1, 0, 0, 1, 0, 0);
                    b.oa.clearRect(0, 0, b.canvas.width, b.canvas.height);
                    b.ub && (b.oa.fillStyle = b.ia.get("outsidePageColour"),
                    b.oa.fillRect(0, 0, b.canvas.width, b.canvas.height));
                    b.oa.scale(a, a);
                    b.oa.translate(b.Na, b.La);
                    b.oa.scale(b.scale, b.scale);
                    d = new F(b.Na,b.La);
                    d = d.multiply(new jb(b.scale,b.scale));
                    b.oa.tc = d;
                    b.ub ? (e = b.oa,
                    f = Wf(b.la),
                    e.beginPath(),
                    e.fillStyle = "#FFFFFF",
                    b.ia.get("pageShadow") && (e.shadowOffsetX = 3 / b.scale,
                    e.shadowOffsetY = 3 / b.scale,
                    e.shadowBlur = 5 / b.scale,
                    e.shadowColor = "rgba(0,0,0,1.0)"),
                    e.rect(0, 0, f.width, f.height),
                    e.fill(),
                    e.shadowColor = "rgba(0,0,0,0.0)",
                    e.shadowBlur = 0,
                    e.shadowOffsetX = 0,
                    e.shadowOffsetY = 0,
                    e.strokeStyle = b.ia.get("pageBorderColour"),
                    e.stroke(),
                    Jh(b, e, 0, 0, f.width, f.height),
                    b.tb && b.tb(e, 0, 0, f.width, f.height)) : Jh(b, b.oa, e, f, Math.max(g, g - e), Math.max(h, h - e));
                    e = Ze(b);
                    f = b.ia.wa.symmetry;
                    if (1 < f) {
                        g = 2 * Math.PI / f;
                        h = b.Ua(new A(b.canvas.width / a / 2,b.canvas.height / a / 2));
                        f & 1 && (d = new qd(g,h.x,h.y));
                        for (b.oa.save(); g < 2 * Math.PI - 1E-8; )
                            0 === (f & 1) && (d = new ud(g,h.x,h.y)),
                            b.oa.transform(d.m11, d.m21, d.m12, d.m22, d.Da, d.Ea),
                            b.la.ma(b.oa),
                            g += 2 * Math.PI / f;
                        b.oa.setTransform(1, 0, 0, 1, 0, 0);
                        b.oa.fillStyle = "rgba(255,255,255,0.3)";
                        b.oa.fillRect(0, 0, b.canvas.width, b.canvas.height);
                        b.oa.restore()
                    }
                    b.la.ma(b.oa);
                    b.aa.Xb && (b.oa.save(),
                    b.aa.Xb(b.oa),
                    b.oa.restore());
                    if (0 < b.selection.length) {
                        b.oa.save();
                        d = b.oa;
                        d.lineWidth = 1 / b.scale;
                        d.strokeStyle = "#888888";
                        d.beginPath();
                        for (f = 0; f < b.selection.length; f++)
                            h = b.selection[f],
                            g = h.Sa(),
                            h = new Ad(h.ab),
                            h.transform(g),
                            Cd(h, d, [3 / b.scale, 3 / b.scale]);
                        d.stroke();
                        g = b.scale;
                        for (f = 0; f < b.eb.length; f++) {
                            var h = b.eb[f]
                              , k = b.Ad.apply(h.x, h.y);
                            h instanceof Rd ? b.Wd && (d.beginPath(),
                            d.strokeStyle = "#008000",
                            d.lineWidth = 3 / g,
                            d.moveTo(k.x, k.y),
                            d.arc(k.x, k.y, 6 / g, 0, 1.5 * Math.PI, !1),
                            d.stroke()) : (d.beginPath(),
                            d.strokeStyle = "#000",
                            d.lineWidth = 1 / g,
                            d.rect(k.x - 4 / g, k.y - 4 / g, 4 / g * 2, 4 / g * 2),
                            d.stroke())
                        }
                        b.oa.restore()
                    }
                    e && b.oa.restore();
                    b.Fa && b.Fa.je(b.oa, 1 / b.scale, b.Ka);
                    b.sc && b.ia.get("showHints") && (b.oa.save(),
                    b.oa.font = 10 / b.scale + "px Arial",
                    b.oa.fillStyle = "#000000",
                    b.oa.textBaseline = "top",
                    b.oa.fillText(b.sc, 0, 0),
                    b.oa.restore());
                    e = b.oa;
                    b.Ga.qb && (d = b.Ga.x,
                    f = b.Ga.y,
                    g = Ah(b),
                    e.save(),
                    e.setTransform(g, 0, 0, g, 0, 0),
                    e.beginPath(),
                    b.Ga.ge ? (e.moveTo(d - 3, f - 10),
                    e.lineTo(d + 3, f - 10),
                    e.moveTo(d - 3, f + 10),
                    e.lineTo(d + 3, f + 10),
                    e.moveTo(d, f - 10),
                    e.lineTo(d, f + 10)) : (e.moveTo(d, f - 3),
                    e.lineTo(d, f - 15),
                    e.moveTo(d, f + 3),
                    e.lineTo(d, f + 15),
                    e.moveTo(d - 3, f),
                    e.lineTo(d - 15, f),
                    e.moveTo(d + 3, f),
                    e.lineTo(d + 15, f)),
                    b.Ga.Qa && b.oa.arc(d, f, 8, 0, 2 * Math.PI, !1),
                    e.lineWidth = 2,
                    e.strokeStyle = "#000000",
                    e.stroke(),
                    e.restore());
                    b.ra.pe && b.ra.pe(b.oa);
                    b.Xb && b.Xb(b.oa);
                    b.aa.Jc("draw", b.oa);
                    b.oa.setTransform(a, 0, 0, a, 0, 0);
                    0 < b.selection.length && b.gb && (a = b.gb.width,
                    b.oa.drawImage(b.gb, b.canvas.width - a - we(b.ba), 0));
                    b.na && b.na.complete && (a = b.na.naturalWidth,
                    b.oa.drawImage(b.na, b.canvas.width - a - we(b.ba), 0))
                })
            }
        },
        cb: function() {
            if (this.ia.get("readOnly"))
                this.log("readOnly mode: Ignoring undo.");
            else if (this.la.xc()) {
                var a = this.la.cb();
                this.la.format(this.oa, this.request);
                Kh(this);
                Yd(this);
                Ch(this);
                nb(this);
                Gh(this, a);
                this.ma();
                this.aa.emit("document-changed")
            }
        },
        fc: function() {
            if (this.ia.get("readOnly"))
                this.log("readOnly mode: Ignoring redo.");
            else if (this.la.wc()) {
                var a = this.la.fc();
                this.la.format(this.oa, this.request);
                Kh(this);
                Yd(this);
                Ch(this);
                nb(this);
                Gh(this, a);
                this.ma();
                this.aa.emit("document-changed")
            }
        },
        Nb: function(a, b) {
            this.ra.Nb ? (this.log("Simulating click of colour %s", a),
            this.ra.Nb({
                Va: a,
                zd: b
            })) : this.log("A colour is not needed for this tool.")
        },
        pb: function(a) {
            this.la.pb(a) && (this.ib(),
            af(this),
            this.ma(),
            this.aa.emit("set-page", a))
        }
    };
    function te(a, b) {
        b ? (a.na = document.createElement("img"),
        a.na.setAttribute("src", L(a.ia, "wd-done.png")),
        a.na.onload = function() {
            a.ma()
        }
        ) : a.na = null
    }
    function Hh(a) {
        a.Db && a.log("Updates are locked. Ignoring draw/format request");
        return a.Db
    }
    function Lh(a, b) {
        !a.Db && b ? (a.log("Locking updates."),
        a.Db = !0) : a.Db && !b && (a.log("Resuming updates"),
        a.Db = !1,
        Ch(a),
        nb(a),
        a.ma())
    }
    function kb(a, b) {
        a.log("setViewRect(%s)", b);
        var c = a.da
          , c = Math.min(c.width / b.width, c.height / b.height)
          , d = b.y * c;
        a.Na = -(b.x * c);
        a.La = -d;
        a.scale = c;
        a.Xa = c;
        nb(a);
        a.ma()
    }
    function ib(a) {
        var b = a.da;
        return new P((0 - a.Na) / a.scale,(0 - a.La) / a.scale,b.width / a.scale,b.height / a.scale)
    }
    function Ih(a, b, c) {
        var d = Ah(a);
        a.canvas.width = b * d;
        a.canvas.height = c * d;
        a.canvas.style.width = b + "px";
        a.canvas.style.height = c + "px";
        a.da.width = b;
        a.da.height = c
    }
    function Ah(a) {
        return (window.devicePixelRatio || 1) / (a.oa.Zh || a.oa.Uh || a.oa.Vh || a.oa.Wh || a.oa.Th || 1)
    }
    function Mh(a, b, c, d) {
        if (!d)
            if (0 === b.length)
                d = new A(0,0);
            else {
                d = b[0].Cb().clone();
                for (var e = 1; e < b.length; e++)
                    pd(d, b[e].Cb());
                d = nd(d)
            }
        c = new ud(c,d.x,d.y);
        a.za([new Ud(Nh(a, b),c)])
    }
    function rh(a) {
        Eh(a, a.scale / 1.1)
    }
    function qh(a) {
        Eh(a, 1.1 * a.scale)
    }
    function Oh(a, b) {
        var c, d;
        c = a.la.rb;
        d = a.Ua(new A(100,100));
        a.za([new E("ImageNode",{
            url: b,
            layer: a.Ja
        }), new Ud([c],new F(d.x,d.y))]);
        return G(a)
    }
    function Ph(a, b) {
        b = x.aa({}, {
            commands: uf(),
            fillStyle: a.jb,
            strokeStyle: a.mb,
            seed: Math.round(65535 * Math.random()),
            lineWidth: a.Ba.lineWidth,
            sloppiness: a.Ba.sloppiness,
            layer: a.Ja,
            wrap: a.ia.get("multilineText"),
            fontSize: a.ia.get("defaultFontSize")
        }, b);
        var c;
        c = "radial" === a.ia.get("drawCircleStyle") ? "circle" : "rectangle";
        C(a, new ae(a,"PathNode",b,100,100,c))
    }
    function Qh(a, b) {
        b = b || {};
        var c, d, e, f, g;
        e = new R;
        f = new A(-50,-50);
        g = new A(50,-50);
        d = new A(50,50);
        c = new A(-50,50);
        e.moveTo(f.x, f.y);
        e.lineTo(g.x, g.y);
        e.lineTo(d.x, d.y);
        e.lineTo(c.x, c.y);
        e.lineTo(f.x, f.y);
        e.close();
        b = x.aa({}, {
            commands: e.Rb(),
            fillStyle: a.jb,
            strokeStyle: a.mb,
            seed: Math.round(65535 * Math.random()),
            lineWidth: a.Ba.lineWidth,
            sloppiness: a.Ba.sloppiness,
            layer: a.Ja,
            wrap: a.ia.get("multilineText"),
            fontSize: a.ia.get("defaultFontSize")
        }, b);
        a.log("Create an item on layer %s", a.Ja);
        C(a, new ae(a,"PathNode",b,100,100,"rectangle"))
    }
    function dh(a, b, c, d) {
        if (a.Yb)
            return b *= d / a.scale,
            c *= d / a.scale,
            a.log("Nudge selection by %s, %s", b, c),
            d = Fh(a),
            d.length && a.za([new Ud(d,new F(b,c))]),
            0 < d.length;
        a.log("Can't nudge; selection motion is locked.")
    }
    function Rh(a, b, c, d) {
        a.log("Set document size %s,%s", b, c);
        null === b && (b = void 0);
        null === c && (c = void 0);
        d ? d.push(new Kf({
            width: b,
            height: c
        })) : (a.la.setProperty("width", b),
        a.la.setProperty("height", c),
        nb(a),
        Ch(a),
        a.aa.emit("document-changed"))
    }
    function nb(a) {
        if (!Hh(a))
            if (a.ia.get("scrollbars")) {
                var b = a.da
                  , c = ph(a)
                  , d = ib(a)
                  , e = !1
                  , f = !1;
                if (d.y <= c.y && d.bottom() >= c.bottom())
                    a.ba.sa();
                else {
                    a.ba.show();
                    var e = a.ba
                      , g = Math.min(d.y, c.y)
                      , h = Math.max(d.bottom(), c.bottom())
                      , k = d.height
                      , l = -a.La / a.scale;
                    e.ka = g;
                    e.da = h - g;
                    e.na = k;
                    e.position = l;
                    e.format();
                    e.ma();
                    e = !0
                }
                d.x <= c.x && d.right() >= c.right() ? a.ua.sa() : (a.ua.show(),
                f = a.ua,
                g = Math.min(d.x, c.x),
                c = Math.max(d.right(), c.right()),
                d = d.width,
                h = -a.Na / a.scale,
                f.ka = g,
                f.da = c - g,
                f.na = d,
                f.position = h,
                f.format(),
                f.ma(),
                f = !0);
                f && e ? (a.ba.qc(20, b.height - 20),
                a.ua.qc(b.width - 20, 20)) : e ? a.ba.qc(20, b.height) : f && a.ua.qc(b.width, 20)
            } else
                a.ba.sa(),
                a.ua.sa()
    }
    function ph(a) {
        a.ub ? (a = Wf(a.la),
        a = new P(0,0,a.width,a.height)) : a = Xf(a.la);
        return a
    }
    function Sh(a, b, c) {
        a.ia.get("readOnly") ? a.log("readOnly mode: Ignoring tool click.") : C(a, new vf(a,"arrow",void 0,b,c))
    }
    function ih(a, b) {
        a.ia.get("readOnly") ? a.log("readOnly mode: Ignoring tool click.") : C(a, new vf(a,"curve",void 0,b))
    }
    function Th(a, b, c) {
        a.ia.get("readOnly") ? a.log("readOnly mode: Ignoring tool click.") : (b.lineWidth = b.lineWidth || a.rc,
        b.strokeStyle = b.strokeStyle || a.zb,
        C(a, new Xe(a,0,b,c)))
    }
    function Uh(a, b) {
        a.ia.get("readOnly") ? a.log("readOnly mode: Ignoring tool click.") : (b.lineWidth = b.lineWidth || a.rc,
        b.strokeStyle = b.strokeStyle || a.zb,
        C(a, new Xe(a,0,b,"shapebrush")))
    }
    function Vh(a, b) {
        a.ia.get("readOnly") ? a.log("readOnly mode: Ignoring tool click.") : (b.lineWidth = b.lineWidth || a.rc,
        b.strokeStyle = b.strokeStyle || a.zb,
        C(a, new Xe(a,0,b,"brush")))
    }
    function jh(a, b, c) {
        a.ia.get("readOnly") ? a.log("readOnly mode: Ignoring tool click.") : C(a, new vf(a,"line",void 0,b,c))
    }
    function sh(a, b) {
        a.ia.get("readOnly") ? a.log("readOnly mode: Ignoring tool click.") : C(a, new ie(a,b))
    }
    function C(a, b) {
        a.ra && a.ra.Mb && a.ra.Mb();
        a.ra = b;
        b.Gb && b.Gb();
        b.Tb && a.aa.emit("tool-changed", b.Tb())
    }
    function G(a) {
        C(a, new Za(a))
    }
    function ue(a, b) {
        b ? (a.sc = a.ef.get(b),
        a.aa.emit("hint", a.sc)) : (a.sc = null,
        a.aa.emit("hint", ""))
    }
    function oh(a, b) {
        var c = [];
        b || (b = ga("clipboard"));
        var d = Yf(a.la, b, c)
          , e = a.ia.get("pasteOffset");
        0 !== e && (a.Zb += e,
        a.log("Using paste offset %s", a.Zb),
        d.push(new Ud(c,new F(a.Zb,a.Zb))));
        a.za(d);
        a.update()
    }
    function fh(a) {
        var b = Fh(a);
        0 < b.length && a.za([new Ef(b,10)])
    }
    function nh(a, b, c) {
        var d;
        if (c) {
            var e = a.la
              , f = [];
            for (d = 0; d < c.length; d++) {
                var g = B(e, c[d], !1);
                g && f.push(g)
            }
            d = f = Tf(e, f)
        } else
            d = Wd(a);
        c = a.la;
        var h, k, e = [], f = 0;
        k = Tf(c, d);
        g = 0;
        for (h = k.length; g < h; g++)
            d = k[g],
            f = Zf(c, d, e, f);
        c = "zwibblerclip." + JSON.stringify(e);
        !0 !== b && fa("clipboard", c);
        a.log("Reset paste offset to 0");
        a.Zb = 0;
        return c
    }
    function mh(a) {
        nh(a);
        ah(a)
    }
    function Ze(a) {
        if (a.ub) {
            var b = Wf(a.la);
            a.oa.save();
            a.oa.beginPath();
            a.oa.rect(0, 0, b.width, b.height);
            a.oa.clip()
        }
        return a.ub
    }
    function Ch(a) {
        if (!Hh(a)) {
            var b = ph(a)
              , c = a.da
              , c = new P(0,0,c.width,c.height);
            b.ic(a.ve) && c.ic(a.ue) ? a.log("No need to rezoom.") : Eh(a, a.Xa) ? (a.log("Successfully rezoomed."),
            a.ve = b,
            a.ue = c) : a.log("Failed to zoom")
        }
    }
    function Jh(a, b, c, d, e, f) {
        a.background ? (b.Wc = b.createPattern(a.background, a.Uc),
        b.fillStyle = b.Wc,
        b.fillRect(c, d, e, f)) : a.tb ? a.tb(b, c, d, e, f) : "G_vmlCanvasManager"in window && (b.fillStyle = "rgba(0, 0, 0, 0.0)",
        b.fillRect(c, d, e, f))
    }
    function Bh(a) {
        var b = a.ia.get("snap"), c = null, d, e;
        d = a.ia.get("background");
        var f = pf(d, !0)
          , g = a.ia.get("backgroundImage");
        a.tb = null;
        a.background = null;
        a.Uc = "no-repeat";
        a.log("createBackground()");
        a.log("backgroundNodeId==%s", a.qa);
        if ("grid" === d) {
            a.Uc = "repeat";
            var b = a.ia.get("gridBlocks")
              , g = a.ia.get("gridSpacing")
              , h = (b || 1) * g
              , c = rg(document.body);
            c.width = h;
            c.height = h;
            d = c.getContext("2d");
            d.fillStyle = "#ffffff";
            d.fillRect(0, 0, h, h);
            d.beginPath();
            for (e = 0; e < h; e += g)
                if (e % h || 1 > b)
                    d.moveTo(e + .5, 0),
                    d.lineTo(e + .5, h);
            for (e = 0; e < h; e += g)
                if (e % h || 1 > b)
                    d.moveTo(0, e + .5),
                    d.lineTo(h, e + .5);
            d.strokeStyle = a.ia.get("gridColour");
            d.lineWidth = .5;
            d.stroke();
            if (0 < b) {
                d.beginPath();
                for (e = 0; e <= h; e += h)
                    d.moveTo(e, 0),
                    d.lineTo(e, h);
                for (e = 0; e <= h; e += h)
                    d.moveTo(0, e + .5),
                    d.lineTo(h, e + .5);
                d.lineWidth = 2;
                d.stroke()
            }
        } else
            g ? a.request.add(null, "image", g, null, function(b) {
                a.log("Background image finished loading");
                a.background = b
            }) : a.qa ? (a.log("Regenerate background image"),
            b = B(a.la, a.qa, !1),
            d = b.rect.clone(),
            c = rg(document.body),
            c.width = d.x + d.width,
            c.height = d.y + d.height,
            d = c.getContext("2d"),
            b.ma(d)) : f ? (a.log("Using background colour %s", f.toString()),
            a.tb = function(a, b, c, d, e) {
                a.fillStyle = f.toString();
                a.fillRect(b, c, d, e)
            }
            ) : 0 < b && "clear" !== d && (a.Uc = "repeat",
            c = rg(document.body),
            c.width = b,
            c.height = b,
            d = c.getContext("2d"),
            d.beginPath(),
            d.moveTo(0, 0),
            d.arc(0, 0, 3, 0, 2 * Math.PI, !1),
            d.moveTo(b, 0),
            d.arc(b, 0, 3, 0, 2 * Math.PI, !1),
            d.moveTo(b, b),
            d.arc(b, b, 3, 0, 2 * Math.PI, !1),
            d.moveTo(0, b),
            d.arc(0, b, 3, 0, 2 * Math.PI, !1),
            d.fillStyle = "#c0c0c0",
            d.fill());
        c && document.body.removeChild(c);
        a.background = c
    }
    function Fh(a, b) {
        var c = Wd(a);
        b || (c = Tf(a.la, c));
        return Nh(a, c)
    }
    function Nh(a, b) {
        for (var c = [], d = 0; d < b.length; d++)
            a.log("Selected id=%s", b[d].id),
            c.push(b[d].id);
        return c
    }
    function Wd(a) {
        var b = a.selection.concat();
        a.Fa && b.push(a.Fa);
        for (var c = 0; c < b.length; c++)
            a.log("Selected node=%s", b[c].id);
        return b
    }
    function Kh(a) {
        for (var b = 0, c = 0; c < a.selection.length; c++)
            c !== b && (a.selection[b] = a.selection[c]),
            a.selection[b].id in a.la.Aa && (b += 1);
        a.selection.length !== b && (a.selection.length = b);
        !a.Fa || a.Fa.id in a.la.Aa || (a.Fa = null,
        null !== a.Ka && a.aa.emit("selected-edit-handle", null, null),
        a.Ka = null)
    }
    function Yd(a) {
        function b(a, b, c, d, e) {
            !1 !== f.Ec && f.eb.push(new ze(a,c,new A(b.x + d * b.width,b.y + e * b.height),new A(b.x + (1 - d) * b.width,b.y + (1 - e) * b.height)))
        }
        var c;
        a.Ec = !0;
        a.Bd = !0;
        a.Yb = !0;
        var d = !1;
        a.eb.length = 0;
        if (0 !== a.selection.length) {
            a.Ca = a.selection[0].Cb().clone();
            a.selection[0].pa("lockSize") && (a.Ec = !1);
            a.selection[0].pa("lockRotation") && (a.Bd = !1);
            a.selection[0].pa("lockPosition") && (a.Yb = !1);
            a.selection[0].pa("lockAspectRatio") && (d = !0);
            for (c = 1; c < a.selection.length; c++)
                pd(a.Ca, a.selection[c].Cb()),
                a.selection[c].pa("lockSize") && (a.Ec = !1),
                a.selection[c].pa("lockRotation") && (a.Bd = !1),
                a.selection[c].pa("lockAspectRatio") && (d = !0),
                a.selection[c].pa("lockPosition") && (a.Yb = !1);
            1 === a.selection.length ? a.Xd = a.selection[0].Ge() : a.Xd = new Id(a.Ca);
            var e, f = a, g, h = 0 < a.ia.get("snap");
            a.log("snap=%s", a.ia.get("snap"));
            1 < a.selection.length ? (e = new Q,
            g = null,
            c = a.Ca) : (g = a.selection[0],
            c = g.ab,
            e = g.Sa());
            a.ia.get("allowResize") && (d || (b(g, c, e, .5, 0),
            b(g, c, e, 1, .5),
            b(g, c, e, .5, 1),
            b(g, c, e, 0, .5)),
            b(g, c, e, 0, 0),
            b(g, c, e, 1, 0),
            b(g, c, e, 1, 1),
            b(g, c, e, 0, 1));
            if (a.Bd)
                if (g && g.pa("rotationHandles"))
                    for (a = g.pa("rotationHandles"),
                    c = 0; c < a.length; c += 4)
                        f.eb.push(new Rd(g,e,new A(a[c],a[c + 1]),new A(a[c + 2],a[c + 3]),h));
                else
                    f.eb.push(new Rd(g,e,new A(c.x + .5 * c.width,c.y - 10 / a.scale),new A(c.x + .5 * c.width,c.y + .5 * c.height),h))
        }
    }
    function af(a) {
        Yd(a);
        if (a.Vc) {
            var b = a.Vc
              , c = a.selection;
            b.action = null;
            b.aa.length = 0;
            b.ba = {};
            b.Aa = c.concat();
            for (var d = !1, e = 0; e < c.length; e++) {
                var f = c[e];
                Me(f) && (d = !0);
                var g = Je(f), h;
                for (h in g)
                    if (g.hasOwnProperty(h)) {
                        var k = b
                          , l = h
                          , m = f
                          , q = void 0
                          , q = k.ia;
                        l in k.ba ? (q = k.ba[l],
                        q.value !== m.pa(l) && (q.value = null)) : "locked" === l || "points" === l || !0 === m.pa("closed") && ("arrowSize" === l || "arrowStyle" === l || "doubleArrow" === l) || !1 === m.pa("closed") && ("fontName" === l || "fontSize" === l || "textFillStyle" === l || "text" === l || "fillStyle" === l) || "ImageNode" === m.type() && ("fillStyle" === l || "strokeStyle" === l || "lineWidth" === l || "shadow" === l) || "BrushNode" === m.type() && "fillStyle" === l || "TextNode" === m.type() && "fillStyle" === l || "lockSize" === l || "lockRotate" === l || "rotateAround" === l || "layer" === l || 0 === l.indexOf("cell-") || "fontName" === l && !q.get("showFontNameProperty") || "fontSize" === l && !q.get("showFontSizeProperty") || "smoothness" === l && !q.get("showSmoothnessProperty") || "sloppiness" === l && !q.get("showSloppinessProperty") || (q = {
                            qe: Yg(k, m, l),
                            value: m.pa(l)
                        },
                        q.qe.display && 0 === q.qe.display.indexOf("Display-") || (k.aa.push(q),
                        k.ba[l] = q))
                    }
            }
            Xg(b);
            if (b.ia.get("showKeyboardHelp"))
                for (f = d,
                d = Na(x("<div>"), "keydiv"),
                d.ga("font-size", "8pt"),
                d.ga("color", "#909090"),
                d.ga("font-weight", "normal"),
                x(b.ha).append(d),
                g = b.na.yc(),
                d.append("<h1>" + g("keyboard") + "</h1>"),
                e = [{
                    key: b.ia.get("keyCurveTool"),
                    description: g("draw-curves")
                }, {
                    key: b.ia.get("keyLineTool"),
                    description: g("draw-lines")
                }],
                0 < c.length && e.push({
                    key: b.ia.get("keyDelete"),
                    description: g("delete-selection")
                }, {
                    key: b.ia.get("keyDuplicate"),
                    description: g("duplicate-selection")
                }, {
                    key: b.ia.get("keyMoveUp"),
                    description: g("move-selection-closer")
                }, {
                    key: b.ia.get("keyMoveDown"),
                    description: g("move-selection-away")
                }),
                1 < c.length && e.push({
                    key: b.ia.get("keyGroup"),
                    description: g("group-selection")
                }),
                f && e.push({
                    key: b.ia.get("keyUngroup"),
                    description: g("break-apart-group")
                }),
                e.push({
                    key: b.ia.get("keyZoomIn"),
                    description: g("zoom-in")
                }),
                e.push({
                    key: b.ia.get("keyZoomOut"),
                    description: g("zoom-out")
                }),
                e.push({
                    key: g("arrow-keys"),
                    description: g("move-while-zoomed")
                }),
                b = 0; b < e.length; b++)
                    c = Na(x("<a>").text(e[b].key), "key"),
                    c.ga("background", "#d0d0d0"),
                    c.ga("border-left", "1px solid #808080"),
                    c.ga("border-right", "1px solid #e0e0e0"),
                    c.ga("border-top", "1px solid #808080"),
                    c.ga("border-bottom", "1px solid #e0e0e0"),
                    c.ga("padding-left", "0.5em"),
                    c.ga("padding-right", "0.5em"),
                    c.ga("margin-right", "1em"),
                    c.ga("color", "#4fa0d3"),
                    c.ga("font-weight", "bold"),
                    c = x("<p>").append(c),
                    c[0].appendChild(document.createTextNode(e[b].description)),
                    d.append(c)
        }
        a.aa.emit("selected-nodes")
    }
    function eh(a, b) {
        a.ib();
        for (var c = 0; c < b.length; c++)
            b[c].pa("locked") || "PageNode" === b[c].type() || $e(a, b[c]);
        af(a)
    }
    function $e(a, b) {
        a.Fa = null;
        if (b.Ib !== a.Ib && Oe(b) === a.Ja) {
            a.selection.push(b);
            b.Ib = a.Ib;
            if (Me(b)) {
                for (var c = b.parent, d = 0; d < c.children.length; d++)
                    $e(a, c.children[d]);
                $e(a, c)
            }
            b.children && 0 < b.children.length && $e(a, b.children[0])
        }
    }
    function ah(a) {
        var b = Fh(a);
        b.length && a.za([new Af(b)])
    }
    function lh(a) {
        var b = Fh(a);
        b.length && a.za([new Cf(b)])
    }
    function kh(a) {
        var b = Fh(a);
        b.length && a.za([new Bf(b)])
    }
    function le(a, b, c) {
        a.log("setSelectionOpacity(%s, fill=%s)", b, c);
        var d = Fh(a, !0)
          , e = [];
        c = c ? "fillStyle" : "strokeStyle";
        for (var f = 0; f < d.length; f++) {
            var g = d[f]
              , h = B(a.la, g).pa(c);
            h && (h = de(h, b),
            e.push(new me([g],c,h)),
            a.log("   set %s of %s to %s", c, g, h))
        }
        e.length && a.za(e);
        a.log("   Affected %s of %s nodes", e.length, d.length)
    }
    function ch(a) {
        var b = Fh(a);
        b.length && a.za([new Ff(b,Hf)])
    }
    function bh(a) {
        var b = Fh(a);
        b.length && a.za([new Ff(b,Gf)])
    }
    function hh(a) {
        var b = Fh(a);
        b.length && a.za([new Ff(b,If)])
    }
    function gh(a) {
        var b = Fh(a);
        b.length && a.za([new Ff(b,Jf)])
    }
    function Wh(a) {
        a.Ga.qb && (a.Ga.qb = !1,
        a.ma())
    }
    function re(a) {
        a.Ga.qb = !0;
        a.Ga.ge = !1;
        if (0 < a.selection.length) {
            a.log("showKeyboardCursorAndStartMoving()");
            a.Ga.Qa = !0;
            var b = nd(a.Ca);
            a.Ga.x = b.x;
            a.Ga.y = b.y;
            G(a);
            C(a, new Qd(a,new Ae(a.selection[0],a.selection[0].Sa()),!1,b.x - 4,b.y - 4))
        }
        a.ma()
    }
    function zh(a) {
        var b = ve(a)
          , c = new Date;
        x(a.canvas).bind("touchstart", function(b) {
            if (a.ra.hb) {
                var d = !0;
                300 < (new Date).getTime() - c.getTime() ? d = !1 !== a.ra.hb(b.lb) : a.ra.mc && (d = $g(a, b.lb.touches[0]),
                d = !1 !== a.ra.mc(d.x, d.y, b.lb));
                d && (b.stopPropagation(),
                b.preventDefault());
                c = new Date
            }
        });
        x(a.canvas).bind("touchmove", function(b) {
            a.ra.hb && !1 !== a.ra.hb(b.lb) && (b.stopPropagation(),
            b.preventDefault())
        });
        x(a.canvas).bind("touchend", function(b) {
            a.ra.hb && !1 !== a.ra.hb(b.lb) && (b.stopPropagation(),
            b.preventDefault())
        });
        x(a.canvas).bind("gesturestart", function(b) {
            a.log("GestureStart");
            a.ra.Wa && !1 !== a.ra.Wa(b.lb) && (b.stopPropagation(),
            b.preventDefault())
        });
        x(a.canvas).bind("gesturechange", function(b) {
            a.log("GestureChange");
            a.ra.Wa && !1 !== a.ra.Wa(b.lb) && (b.stopPropagation(),
            b.preventDefault())
        });
        x(a.canvas).bind("gestureend", function(b) {
            a.log("GestureEnd");
            a.ra.Wa && !1 !== a.ra.Wa(b.lb) && (b.stopPropagation(),
            b.preventDefault())
        });
        "ongesturestart"in a.canvas ? a.log("Using native gestures") : (a.log("Using emulated gestures"),
        $a(a.canvas, function(b) {
            a.ra.Wa && !1 !== a.ra.Wa(b) && (b.stopPropagation(),
            b.preventDefault())
        }));
        a.ia.get("simulateGestures") && zg(a.canvas, function(b) {
            a.log("Simulating %s", b.type);
            a.ra.Wa && !1 !== a.ra.Wa(b) && (b.stopPropagation(),
            b.preventDefault())
        });
        var d = new A(0,0)
          , e = 0
          , f = !1;
        "ontouchstart"in a.canvas || (a.log("No touchstart events; using pointer events"),
        x(a.canvas).bind("pointerdown", function(c) {
            a.log("PointerDown");
            d = new A(c.pageX,c.pageY);
            e = (new Date).getTime();
            f = !0;
            if (a.ra.Oa) {
                var g = x(a.canvas).offset();
                !1 !== a.ra.Oa((c.pageX - g.left - b - a.Na) / a.scale, (c.pageY - g.top - b - a.La) / a.scale, c.lb) && (a.log("%s.preventDefault()", c.type),
                c.stopPropagation(),
                c.preventDefault())
            }
        }),
        x(a.canvas).bind("pointermove", function(c) {
            if (a.ra.Ra) {
                var d = x(a.canvas).offset();
                !1 !== a.ra.Ra((c.pageX - d.left - b - a.Na) / a.scale, (c.pageY - d.top - b - a.La) / a.scale, c.lb) && (c.stopPropagation(),
                c.preventDefault())
            }
        }),
        a.oc.bind(x(document), "pointerup", function(c) {
            a.log("PointerUp");
            var g, l;
            a.ra.Ya && f && (g = x(a.canvas).offset(),
            l = (c.pageX - g.left - b - a.Na) / a.scale,
            g = (c.pageY - g.top - b - a.La) / a.scale,
            !1 !== a.ra.Ya(l, g, c.lb) && (c.stopPropagation(),
            c.preventDefault()));
            f = !1;
            a.log("TimeDist=%s PixelDist=%s", (new Date).getTime() - e, d.kb(new A(c.pageX,c.pageY)));
            a.ra.Hb && 200 > (new Date).getTime() - e && 2 > d.kb(new A(c.pageX,c.pageY)) && (a.log("Simulate mouseclick from pointerup"),
            g = x(a.canvas).offset(),
            l = (c.pageX - g.left - b - a.Na) / a.scale,
            g = (c.pageY - g.top - b - a.La) / a.scale,
            !1 !== a.ra.Hb(l, g, c.lb) && (c.stopPropagation(),
            c.preventDefault()))
        }));
        Ia(x(a.canvas), function(c) {
            if (a.ra.Ra) {
                var d = x(a.canvas).offset();
                a.ra.Ra((c.pageX - d.left - b - a.Na) / a.scale, (c.pageY - d.top - b - a.La) / a.scale, c)
            }
            c.preventDefault()
        });
        Ka(x(a.canvas), function(c) {
            var d = x(a.canvas).offset();
            f = !0;
            a.ra.Oa && a.ra.Oa((c.pageX - d.left - b - a.Na) / a.scale, (c.pageY - d.top - b - a.La) / a.scale, c);
            c.preventDefault()
        });
        a.oc.bind(x(document), "mouseup", function(c) {
            var d = x(a.canvas).offset();
            a.ra.Ya && f && a.ra.Ya((c.pageX - d.left - b - a.Na) / a.scale, (c.pageY - d.top - b - a.La) / a.scale, c);
            f = !1;
            c.stopPropagation();
            c.preventDefault()
        });
        x(a.canvas).click(function(c) {
            var d = x(a.canvas).offset();
            a.ra.Hb && a.ra.Hb((c.pageX - d.left - b - a.Na) / a.scale, (c.pageY - d.top - b - a.La) / a.scale, c);
            c.stopPropagation();
            c.preventDefault()
        });
        Ha(x(a.canvas), function(c) {
            var d = x(a.canvas).offset();
            if (a.ra.mc || a.ra.Hb) {
                var e = (c.pageX - d.left - b - a.Na) / a.scale
                  , d = (c.pageY - d.top - b - a.La) / a.scale;
                ug() && a.ra.Hb && (a.log("Insert false mouse click for IE"),
                a.ra.Hb(e, d));
                a.ra.mc && a.ra.mc(e, d, c)
            }
            c.stopPropagation();
            c.preventDefault()
        });
        x(a.canvas).bind("mouseenter", function(a) {
            a.stopPropagation();
            a.preventDefault()
        });
        x(a.canvas).bind("mouseleave", function(a) {
            a.stopPropagation();
            a.preventDefault()
        });
        x(a.canvas).bind("mouseover", function(a) {
            a.stopPropagation();
            a.preventDefault()
        });
        x(a.canvas).bind("mouseout", function(a) {
            a.stopPropagation();
            a.preventDefault()
        });
        !window.parent && a.ia.get("setFocus") && x(a.canvas).focus();
        a.ka.bind("colour", function(b) {
            a.ra.Nb && a.ra.Nb(b)
        });
        a.ka.bind("opacity", function(b, c) {
            a.ra.ec && a.ra.ec(b, c)
        });
        if (!a.ia.get("simulateGestures")) {
            var g = "mousewheel";
            "onwheel"in document.createElement("div") && (g = "wheel");
            a.log("Binding to '%s' for mouse wheel", g);
            x(a.canvas).bind(g, function(c) {
                var d = c.lb.wheelDelta || -40 * c.lb.deltaY
                  , e = d / 120 * 32
                  , f = x(a.canvas).offset()
                  , g = (c.pageX - f.left - b - a.Na) / a.scale
                  , f = (c.pageY - f.top - b - a.La) / a.scale;
                a.ra.oe && !1 !== a.ra.oe(g, f, e, c.lb) || "block" !== a.ba.canvas.style.display || (g = ph(a),
                a.La = -120 >= d ? Math.max(a.La + e, -(g.bottom() * a.scale - a.canvas.height)) : Math.min(a.La + e, -g.y * a.scale),
                nb(a),
                a.ma(),
                c.stopPropagation(),
                c.preventDefault())
            })
        }
        x(a.canvas).bind("dragover", function() {
            a.log("Dragover")
        });
        x(a.canvas).bind("dragdrop", function() {
            a.log("Drop")
        });
        x(a.canvas).bind("dragenter", function() {
            a.log("DragEnter")
        });
        x(a.canvas).bind("dragleave", function() {
            a.log("DragLeave")
        })
    }
    function $g(a, b) {
        return y(a, b.pageX, b.pageY)
    }
    function oe(a, b, c) {
        var d = ve(a)
          , e = x(a.canvas).offset();
        return new A(b * a.scale + a.Na + e.left + d,c * a.scale + a.La + e.top + d)
    }
    function y(a, b, c) {
        var d = ve(a)
          , e = x(a.canvas).offset();
        return a.Ua(new A((b - e.left - d - a.Na) / a.scale,(c - e.top - d - a.La) / a.scale))
    }
    function Eh(a, b) {
        var c;
        a.log("Zooming to: %s", b);
        var d = a.da
          , e = d.width - 20;
        c = "width"in a.la.fa;
        var f = !0;
        a.Xa = b;
        c || (a.log("WARNING: Cannot zoom to page/width because the document size has not been set."),
        f = !1);
        if (M(b))
            a.scale = b;
        else if ("none" === b || a.la.empty() || !c)
            a.scale = 1;
        else if ("page" === b) {
            c = ph(a);
            var g = e = 0;
            a.scale = Math.min(d.width / c.width, d.height / c.height);
            a.scale * c.width < d.width && (e += (d.width - a.scale * c.width) / 2 / a.scale);
            a.scale * c.height < d.height && (g += (d.height - a.scale * c.height) / 2 / a.scale);
            "centre" === a.ia.get("pagePlacement") && (a.Na = -(c.x - e) * a.scale);
            a.La = -(c.y - g) * a.scale;
            a.log("RECT=%s scale=%s tx=%s", c, a.scale, a.Na);
            a.Xa = b
        } else
            "width" === b && (c = ph(a),
            a.scale = e / c.width,
            a.Na = -c.x * a.scale,
            a.La = -c.y * a.scale,
            a.log("RECT=%s scale=%s tx=%s ty=%s", c, a.scale, a.Na, a.La),
            a.Xa = b);
        nb(a);
        a.ma();
        return f
    }
    function Xh(a, b, c) {
        a.Ba[b] = c;
        "fillStyle" === b ? a.jb = c : "strokeStyle" === b && (a.mb = c)
    }
    function Dh(a, b) {
        a.log("setDocument()");
        G(a);
        a.la = b;
        a.scale = 1;
        a.Na = 0;
        a.La = 0;
        a.selection = [];
        a.Fa = null;
        a.Ka = null;
        a.Ib = 1;
        a.Ca = new P(0,0,0,0);
        a.Xd = new Id(a.Ca);
        a.Ad = new Q;
        a.Wd = !0;
        a.sc = null;
        a.Ja = "default";
        a.jb = "#ffffff";
        a.zb = a.ia.wa.defaultBrushColour;
        a.mb = a.ia.wa.defaultStrokeStyle;
        a.Ba = {};
        a.Ba.lineWidth = a.ia.wa.defaultLineWidth;
        a.Ba.sloppiness = .5;
        a.Ba.fontName = a.ia.wa.defaultFont;
        a.Ba.fontSize = a.ia.wa.defaultFontsize;
        a.Ba.bold = a.ia.wa.defaultBold;
        a.Ba.italic = a.ia.wa.defaultItalic;
        a.Ba.smoothness = .3;
        a.Ba.textFillStyle = a.ia.wa.defaultTextFillStyle;
        a.Ba.textStrokeStyle = a.ia.wa.defaultTextStrokeStyle;
        a.Ba.textLineWidth = a.ia.wa.defaultTextLineWidth;
        a.rc = a.ia.get("defaultBrushWidth");
        var c = ph(a);
        a.Na = -c.x;
        a.La = -c.y;
        nb(a);
        a.la.tb = a.ia.get("spotHighlightColour");
        a.la.ub = a.ia.get("spotHighlightZIndex");
        a.la.format(a.oa, a.request);
        a.ve = new P(0,0,0,0);
        a.ue = new P(0,0,0,0);
        "none" !== a.Xa ? Eh(a, a.Xa) : (Eh(a, a.ia.get("defaultZoom")),
        a.ma())
    }
    function ve(a) {
        return parseInt(x(a.canvas).ga("border-left-width"), 10) || 0
    }
    function Gh(a, b) {
        var c, d, e, f = -1, g = !1;
        a.log("HandleChanges called");
        for (c = 0; c < b.Qc.length; c++)
            e = b.Qc[c],
            fb(a.Fc, e, []),
            e === a.qa && (a.log("Background node has been removed"),
            f = null);
        for (c = 0; c < b.Sb.length; c++)
            e = b.Sb[c],
            d = B(a.la, e, !1),
            fb(a.Fc, e, d.le()),
            "background" === d.pa("layer") && (a.log("Background node has been added"),
            f = e);
        for (c = 0; c < b.Cc.length; c++)
            e = b.Cc[c],
            d = B(a.la, e, !1),
            fb(a.Fc, e, d.le()),
            "background" === d.pa("layer") ? (a.log("Background node has been changed"),
            f = e,
            g = !0) : e === a.qa && (a.log("Node removed from background layer"),
            f = null);
        -1 === f || !g && f === a.qa || (a.qa = f,
        Bh(a),
        a.qa && B(a.la, a.qa, !1).pc(!0));
        (b.Sb.length || b.Cc.length) && eb(a.Fc);
        b.Sb.length && a.aa.emit("nodes-added", b.Sb);
        b.Cc.length && a.aa.emit("nodes-changed", b.Cc);
        b.Qc.length && a.aa.emit("nodes-removed", b.Qc)
    }
    ;function Yh(a, b) {
        this.methods = b;
        this.view = a;
        this.ba = new hb(a)
    }
    Yh.prototype = {
        log: t("CustomToolBehaviour"),
        Gb: function() {
            this.log("Entering CustomToolBehaviour");
            this.methods.enter && this.methods.enter()
        },
        Mb: function() {
            this.log("Leaving CustomToolBehaviour");
            this.methods.leave && this.methods.leave()
        },
        Hb: function(a, b, c) {
            return this.methods.onMouseClick ? this.methods.onMouseClick(a, b, c) : !1
        },
        Oa: function(a, b, c) {
            return this.methods.onMouseDown ? this.methods.onMouseDown(a, b, c) : !1
        },
        Ra: function(a, b, c) {
            return this.methods.onMouseMove ? this.methods.onMouseMove(a, b, c) : !1
        },
        Ya: function(a, b, c) {
            return this.methods.onMouseUp ? this.methods.onMouseUp(a, b, c) : !1
        },
        mc: function(a, b, c) {
            return this.methods.onDoubleClick ? this.methods.onDoubleClick(a, b, c) : !1
        },
        Nb: function(a) {
            return this.methods.onColour ? this.methods.onColour(a.Va) : !1
        },
        vb: function(a) {
            this.log("keyboard: %s", a);
            "cancel" === a && (this.log("ESC pressed. Abort brush and go back to toolbar."),
            G(this.view),
            this.view.sb.emit("goto-toolbar"))
        },
        pe: function(a) {
            if (this.methods.onRedraw)
                this.methods.onRedraw(a)
        },
        hb: function(a) {
            if (this.methods.onTouch)
                return this.methods.onTouch(a);
            var b;
            a.touches && a.touches.length ? b = a.touches[0] : a.changedTouches && a.changedTouches.length ? b = a.changedTouches[0] : (this.log("No touches!"),
            b = {
                pageX: 0,
                pageY: 0
            });
            b = y(this.view, b.pageX, b.pageY);
            return "touchstart" === a.type ? this.Oa(b.x, b.y, a) : "touchend" === a.type ? this.Ya(b.x, b.y, a) : "touchmove" === a.type ? this.Ra(b.x, b.y, a) : !1
        },
        Wa: function(a) {
            return this.methods.onGesture ? this.methods.onGesture(a) : this.ba.Wa(a)
        },
        oe: function(a, b, c, d) {
            return this.methods.onMouseWheel ? this.methods.onMouseWheel(a, b, c, d) : !1
        },
        Tb: function() {
            return this.methods.getToolName ? this.methods.getToolName() : null
        }
    };
    function Zh(a, b) {
        this.aa = a;
        this.name = b;
        this.ha = x("<div>").ga("border-top", "1px solid #888").ga("padding", "5px").ga("cursor", "default");
        this.aa.append(this.ha);
        this.update(0)
    }
    Zh.prototype = {
        update: function(a) {
            this.ha.text(this.name + "... " + Math.round(100 * a) + "%")
        },
        error: function(a) {
            var b = this
              , c = Ma(x("<input>").fb("type", "button"), "OK");
            c.click(function() {
                b.done()
            });
            Oa(this.ha, this.name + "... " + a + " ");
            this.ha.append(c)
        },
        done: function() {
            this.ha.remove()
        }
    };
    function $h(a) {
        for (var b = [], c = 0; c < a; c++)
            b.push("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz01234567890"[Math.floor(63 * Math.random())]);
        return b.join("")
    }
    "object" === typeof module && (exports.Sh = $h);
    function ai(a) {
        function b(b) {
            c && clearTimeout(c);
            c = setTimeout(function() {
                c = null;
                a()
            }, arguments.length ? b : 1E3)
        }
        var c = null;
        b.cancel = function() {
            c && (clearTimeout(c),
            c = null)
        }
        ;
        return b
    }
    ;function bi(a, b) {
        this.Ia = a;
        "" !== b && b || (b = "repeat");
        this.repeat = b
    }
    function ci() {
        this.xa = new Q;
        this.ka = [];
        this.lineCap = "butt";
        this.lineJoin = "miter";
        this.strokeStyle = "#000000";
        this.lineWidth = 1;
        this.fillStyle = "#000000";
        this.textBaseline = "top";
        this.font = "10pt arial"
    }
    ci.prototype = {
        save: function() {
            this.ka.push({
                fillStyle: this.fillStyle,
                font: this.font,
                lineJoin: this.lineJoin,
                lineCap: this.lineCap,
                lineWidth: this.lineWidth,
                xa: this.xa.clone(),
                strokeStyle: this.strokeStyle,
                textBaseline: this.textBaseline
            })
        },
        restore: function() {
            var a = this.ka.pop();
            this.fillStyle = a.fillStyle;
            this.font = a.font;
            this.lineJoin = a.lineJoin;
            this.lineCap = a.lineCap;
            this.lineWidth = a.lineWidth;
            this.xa = a.xa;
            this.strokeStyle = a.strokeStyle;
            this.textBaseline = a.textBaseline
        },
        arc: function(a, b, c, d, e, f) {
            f && (f = d,
            d = e,
            e = f);
            for (; 0 > d; )
                d += 2 * Math.PI;
            for (; 0 > e; )
                e += 2 * Math.PI;
            d > e && (d -= 2 * Math.PI);
            var g, h, k = 2 * Math.PI;
            g = d % k;
            h = e % k;
            h === g && (h += 2 * Math.PI);
            e = [];
            d = Math.PI / 2;
            f = g < h ? 1 : -1;
            for (var l = g, k = Math.min(k, Math.abs(h - g)); 1E-5 < k; ) {
                g = l + f * Math.min(k, d);
                var m = (g - l) / 2
                  , q = c * Math.cos(m)
                  , r = c * Math.sin(m)
                  , u = .5522847498 * Math.tan(m);
                h = q + u * r;
                q = -r + u * q;
                r = -q;
                u = m + l;
                m = Math.cos(u);
                u = Math.sin(u);
                e.push({
                    Gh: c * Math.cos(l),
                    Mh: c * Math.sin(l),
                    Hh: h * m - q * u,
                    Nh: h * u + q * m,
                    Ih: h * m - r * u,
                    Oh: h * u + r * m,
                    Jh: c * Math.cos(g),
                    Ph: c * Math.sin(g)
                });
                k -= Math.abs(g - l);
                l = g
            }
            for (c = 0; c < e.length; c++)
                d = e[c],
                0 === c && this.moveTo(d.Gh + a, d.Mh + b),
                this.bezierCurveTo(d.Hh + a, d.Nh + b, d.Ih + a, d.Oh + b, d.Jh + a, d.Ph + b)
        },
        strokeRect: function(a, b, c, d) {
            this.beginPath();
            this.rect(a, b, c, d);
            this.stroke()
        },
        setTransform: function(a, b, c, d, e, f) {
            this.xa = new Q(a,c,b,d,e,f)
        },
        transform: function(a, b, c, d, e, f) {
            a = new Q(a,c,b,d,e,f);
            this.xa = this.xa.multiply(a)
        },
        translate: function(a, b) {
            this.transform(1, 0, 0, 1, a, b)
        },
        scale: function(a, b) {
            this.transform(a, 0, 0, b, 0, 0)
        },
        rotate: function(a) {
            var b = Math.cos(a);
            a = Math.sin(a);
            this.transform(b, a, -a, b, 0, 0)
        },
        rect: function(a, b, c, d) {
            this.beginPath();
            this.moveTo(a, b);
            this.lineTo(a + c, b);
            this.lineTo(a + c, b + d);
            this.lineTo(a, b + d);
            this.lineTo(a, b);
            this.closePath()
        },
        fillRect: function(a, b, c, d) {
            this.rect(a, b, c, d);
            this.fill()
        },
        Hc: function(a) {
            var b = null
              , c = null
              , d = "normal"
              , e = "normal"
              , f = "normal"
              , g = "normal";
            a = a.split(/\s+/);
            a: for (; ; ) {
                var h = a.shift();
                if (!h)
                    break;
                switch (h) {
                case "normal":
                    break;
                case "italic":
                case "oblique":
                    d = h;
                    break;
                case "small-caps":
                    f = h;
                    break;
                case "bold":
                case "bolder":
                case "lighter":
                case "100":
                case "200":
                case "300":
                case "400":
                case "500":
                case "600":
                case "700":
                case "800":
                case "900":
                    e = h;
                    break;
                default:
                    if (!c) {
                        h = h.split("/");
                        c = h[0];
                        1 < h.length && (g = h[1]);
                        break
                    }
                    b = h;
                    a.length && (b += " " + a.join(" "));
                    2 < b.length && ('"' === b.charAt(0) || "'" === b.charAt(0)) && (b = b.substr(1, b.length - 2));
                    break a
                }
            }
            return {
                fontStyle: d,
                fontVariant: f,
                fontWeight: e,
                fontSize: c,
                lineHeight: g,
                fontFamily: b
            }
        },
        createPattern: function(a, b) {
            return new bi(a,b)
        }
    };
    function di() {
        this.ea = []
    }
    di.prototype = {
        lineTo: function(a, b, c) {
            a.apply(b, c);
            this.ea.push({
                Xc: "L",
                nc: a.apply(b, c)
            })
        },
        moveTo: function(a, b, c) {
            a.apply(b, c);
            this.ea.push({
                Xc: "M",
                nc: a.apply(b, c)
            })
        },
        quadraticCurveTo: function(a, b, c, d, e) {
            this.ea.push({
                Xc: "Q",
                nc: a.apply(b, c),
                Oc: a.apply(d, e)
            })
        },
        bezierCurveTo: function(a, b, c, d, e, f, g) {
            this.ea.push({
                Xc: "C",
                nc: a.apply(b, c),
                Oc: a.apply(d, e),
                ld: a.apply(f, g)
            })
        },
        closePath: function() {
            this.ea.push({
                Xc: "Z"
            })
        }
    };
    function ei(a, b) {
        for (var c = b.inverse(), d = "", e = 0; e < a.ea.length; e++) {
            var f = a.ea[e];
            0 < e && (d += " ");
            d += f.Xc;
            if (f.nc) {
                var g = c.apply(f.nc.x, f.nc.y)
                  , d = d + (g.x + "," + g.y);
                f.Oc && (g = c.apply(f.Oc.x, f.Oc.y),
                d += "," + g.x + "," + g.y,
                f.ld && (f = c.apply(f.ld.x, f.ld.y),
                d += "," + f.x + "," + f.y))
            }
        }
        return d
    }
    function fi(a) {
        ci.call(this);
        this.xa = new Q;
        this.ea = [];
        this.path = new di;
        this.log("SVG context rect: %s", a);
        this.root = new yc("svg",{
            xmlns: "http://www.w3.org/2000/svg",
            "xmlns:xlink": "http://www.w3.org/1999/xlink",
            version: 1.2,
            baseProfile: "tiny",
            width: a.width,
            height: a.height,
            viewBox: a.x + " " + a.y + " " + a.width + " " + a.height
        });
        this.ba = new yc("defs",{});
        this.aa = [];
        Ac(this.root, this.ba)
    }
    fi.prototype = {
        log: t("SvgContext"),
        Yd: 1,
        Zd: 2,
        FONT: 4,
        node: function(a, b, c, d) {
            function e(a, b) {
                if (b instanceof bi) {
                    var d;
                    d = f;
                    var e = gi(d, b);
                    if (e)
                        d = e;
                    else {
                        var m;
                        e = b.Ia;
                        m = gi(d, e);
                        if (!m) {
                            m = "image" + d.aa.length;
                            d.aa.push({
                                Lc: e,
                                jd: m
                            });
                            var q = document.createElement("canvas")
                              , r = q.getContext("2d");
                            q.width = e.width;
                            q.height = e.height;
                            r.drawImage(e, 0, 0);
                            q = q.toDataURL();
                            Ac(d.ba, new yc("image",{
                                id: m,
                                x: 0,
                                y: 0,
                                width: e.width,
                                height: e.height,
                                "xlink:href": q
                            }))
                        }
                        e = "pattern" + d.aa.length;
                        d.aa.push({
                            Lc: b,
                            jd: e
                        });
                        q = new yc("pattern",{
                            id: e
                        });
                        "no-repeat" === b.repeat ? (q.aa.width = "1",
                        q.aa.height = "1") : "repeat-x" === b.repeat ? (q.aa.patternUnits = "userSpaceOnUse",
                        q.aa.width = b.Ia.width,
                        q.aa.height = 1E4) : ("repeat-y" === b.repeat ? (q.aa.patternUnits = "userSpaceOnUse",
                        q.aa.width = 1E4) : (q.aa.patternUnits = "userSpaceOnUse",
                        q.aa.width = b.Ia.width),
                        q.aa.height = b.Ia.height);
                        Ac(q, new yc("use",{
                            "xlink:href": "#" + m
                        }));
                        Ac(d.ba, q);
                        d = e
                    }
                    c[a] = "url(#" + d + ")"
                } else
                    d = pf(b),
                    e = d.values[3],
                    1 > e && (d.values[3] = 1,
                    c[a + "-opacity"] = "" + e),
                    c[a] = d.toString()
            }
            var f = this;
            td(this.xa) || (c.transform = "matrix(" + this.xa.m11 + " " + this.xa.m21 + " " + this.xa.m12 + " " + this.xa.m22 + " " + this.xa.Da + " " + this.xa.Ea + ")");
            b & this.Yd ? e("fill", this.fillStyle) : c.fill = "none";
            b & this.Zd && (e("stroke", this.strokeStyle),
            c["stroke-width"] = this.lineWidth,
            "miter" !== this.lineJoin && (c["stroke-linejoin"] = this.lineJoin),
            "butt" !== this.lineCap && (c["stroke-linecap"] = this.lineCap));
            b & this.FONT && (b = this.Hc(this.font),
            c["font-weight"] = b.fontWeight,
            c["font-size"] = parseFloat(b.fontSize),
            c["font-style"] = b.fontStyle,
            c["font-family"] = b.fontFamily);
            Ac(this.root, new yc(a,c,d))
        },
        toString: function() {
            return '<?xml version="1.0" encoding="UTF-8"?>\n' + this.root.toString()
        },
        yd: function() {
            for (var a = this.toString(), b = new Uint8Array(a.length), c = 0; c < a.length; c++)
                b[c] = a.charCodeAt(c);
            return new Blob([b],{
                type: "image/svg+xml"
            })
        },
        beginPath: function() {
            this.path = new di
        },
        transform: function(a, b, c, d, e, f) {
            a = new Q(a,c,b,d,e,f);
            this.xa = this.xa.multiply(a)
        },
        closePath: function() {
            this.path.closePath()
        },
        fill: function() {
            this.node("path", this.Yd, {
                d: ei(this.path, this.xa)
            })
        },
        stroke: function() {
            this.node("path", this.Zd, {
                d: ei(this.path, this.xa)
            })
        },
        moveTo: function(a, b) {
            this.path.moveTo(this.xa, a, b)
        },
        lineTo: function(a, b) {
            this.path.lineTo(this.xa, a, b)
        },
        quadraticCurveTo: function(a, b, c, d) {
            this.path.quadraticCurveTo(this.xa, a, b, c, d)
        },
        bezierCurveTo: function(a, b, c, d, e, f) {
            this.path.bezierCurveTo(this.xa, a, b, c, d, e, f)
        },
        fillText: function(a, b, c) {
            this.Hc(this.font);
            this.node("text", this.Yd | this.FONT, {
                x: b,
                y: c
            }, a)
        },
        strokeText: function(a, b, c) {
            this.Hc(this.font);
            this.node("text", this.Zd | this.FONT, {
                x: b,
                y: c
            }, a)
        },
        drawImage: function(a, b, c, d, e, f, g, h, k) {
            var l = document.createElement("canvas")
              , m = l.getContext("2d");
            l.width = d;
            l.height = e;
            m.drawImage(a, -b, -c);
            a = l.toDataURL();
            Ac(this.root, new yc("image",{
                transform: "matrix(" + this.xa.m11 + " " + this.xa.m21 + " " + this.xa.m12 + " " + this.xa.m22 + " " + this.xa.Da + " " + this.xa.Ea + ")",
                x: f,
                y: g,
                width: h,
                height: k,
                "xlink:href": a
            }))
        }
    };
    function gi(a, b) {
        for (var c = 0; c < a.aa.length; c++)
            if (console.log("Check ", a.aa[c].Lc),
            a.aa[c].Lc === b && void 0 === a.aa[c].Je)
                return a.aa[c].jd;
        console.log("Not found");
        return null
    }
    fi.prototype = x.aa({}, ci.prototype, fi.prototype);
    function hi(a, b, c, d) {
        this.x = a;
        this.y = b;
        this.width = c;
        this.height = d;
        this.ba = [];
        this.ka = ii(this, "Pages", {
            Kids: [],
            Count: 0
        });
        this.qa = ii(this, "Catalog", {
            Pages: this.ka._id + " 0 R"
        });
        this.fonts = {};
        this.da = [];
        this.na = {};
        this.aa = 1;
        ji(this)
    }
    var ki = null;
    hi.prototype = {
        log: t("PdfWriter"),
        yd: function() {
            for (var a = li(this), b = new Uint8Array(a.length), c = 0; c < a.length; c++)
                b[c] = a.charCodeAt(c);
            return new Blob([b],{
                type: "application/pdf"
            })
        },
        Qb: function(a) {
            for (var b = [], c = 0; c < arguments.length; c++) {
                var d = "" + arguments[c];
                0 < d.indexOf("e") && (d = arguments[c].toFixed(20));
                b.push(d)
            }
            return b.join(" ")
        }
    };
    function mi(a, b, c, d, e) {
        e ? b.push("<<\n") : (c.push(b.join("").length),
        b.push(d._id + " 0 obj\n"),
        "Type"in d ? b.push("<< /Type /" + d.Type + "\n") : b.push("<<\n"));
        "_stream"in d && (d.Length = d._stream.toString().length);
        for (var f in d)
            if (d.hasOwnProperty(f) && "Type" !== f && "_" !== f.charAt(0)) {
                e && b.push("    ");
                b.push("   /" + f + " ");
                var g = d[f];
                "object" === typeof g && "[object Array]" === Object.prototype.toString.apply(g) ? b.push("[ " + g.join(" ") + " ]") : "object" === typeof g ? mi(a, b, c, g, !0) : b.push(g);
                b.push("\n")
            }
        e && b.push("    ");
        b.push(">>\n");
        "_stream"in d && (b.push("stream\n"),
        b.push(d._stream + "\n"),
        b.push("endstream\n"));
        e || b.push("endobj\n")
    }
    function li(a) {
        var b = [], c = [], d;
        b.push("%PDF-1.4\n%\u0080\u0081\u0082\u0083\n");
        for (d = 0; d < a.ba.length; d++)
            mi(a, b, c, a.ba[d], !1);
        var e = b.join("").length;
        b.push("xref\n0 " + (a.ba.length + 1) + "\n");
        b.push("0000000000 65535 f\n");
        for (d = 0; d < a.ba.length; d++) {
            for (var f = c[d], f = "" + f; 10 > f.length; )
                f = "0" + f;
            b.push(f + " 00000 n \n")
        }
        b.push("trailer\n");
        b.push("<< /Size " + (a.ba.length + 1) + "\n");
        b.push("   /Root " + a.qa._id + " 0 R\n");
        b.push(">>\n");
        b.push("startxref\n");
        b.push(e + "\n");
        b.push("%%EOF\n");
        return b.join("")
    }
    function ni(a, b, c) {
        var d = oi(a, b.Ia, c.toString());
        if (!d) {
            d = "P" + a.aa;
            a.aa += 1;
            pi(a, b.Ia, b.Ia);
            var e = oi(a, b.Ia)
              , f = new Q(b.Ia.width,0,0,-b.Ia.height,0,b.Ia.height)
              , f = c.multiply(f)
              , g = "1"
              , h = "1";
            if ("no-repeat" === b.repeat || "repeat-y" === b.repeat)
                g = "1000000";
            if ("no-repeat" === b.repeat || "repeat-x" === b.repeat)
                h = "1000000";
            d = ii(a, "Pattern", {
                _name: d,
                PatternType: "1",
                PaintType: "1",
                TilingType: "2",
                BBox: "[0 0 1 1]",
                XStep: g,
                YStep: h,
                Matrix: "[ " + a.Qb(f.m11, f.m21, f.m12, f.m22, f.Da, f.Ea) + "]",
                Resources: "<< /XObject << /" + e._name + " " + e._id + " 0 R >> >>"
            });
            d._stream = "/" + e._name + " Do";
            a.da.push({
                Lc: b.Ia,
                Je: c.toString(),
                jd: d
            })
        }
        qi(a, "Pattern", d);
        return "/" + d._name
    }
    function pi(a, b, c) {
        var d, e = oi(a, b);
        if (!e) {
            e = "I" + a.aa;
            a.aa += 1;
            var f;
            c instanceof HTMLImageElement ? (f = document.createElement("canvas"),
            f.width = c.width,
            f.height = c.height,
            f.getContext("2d").drawImage(c, 0, 0)) : f = c;
            c = f.getContext("2d").getImageData(0, 0, f.width, f.height);
            var g = "", h = !1, k, l;
            null !== ki ? k = ki : (k = document.createElement("canvas"),
            g = !1,
            k.width = 10,
            k.height = 10,
            "toDataURL"in k && (g = 0 < k.toDataURL("image/jpeg").indexOf("jpeg")),
            ki = g,
            a.log("JPEG supported: %s", g),
            k = g);
            if (k) {
                a.log("Using JPEG encoding");
                k = "[/DCTDecode]";
                g = rb("");
                for (d = 0; d < c.data.length; d += 4)
                    h = h || 255 > c.data[d + 3];
                d = f.toDataURL("image/jpeg");
                var m = atob(d.split(",")[1]);
                for (d = 0; d < m.length; d++)
                    g.Pa(m.charCodeAt(d))
            } else {
                a.log("Using LZW encoding");
                k = "[/Ascii85Decode /LZWDecode]";
                g = rb("LZWEncoder,Ascii85Encoder");
                for (d = 0; d < c.data.length; d += 4)
                    g.Pa(c.data[d]),
                    g.Pa(c.data[d + 1]),
                    g.Pa(c.data[d + 2]),
                    h = h || 255 > c.data[d + 3];
                l = "[ null <</EarlyChange 0 >> ]"
            }
            g.flush();
            g = g.$c().toString();
            e = ii(a, "XObject", {
                Subtype: "/Image",
                Width: f.width,
                Height: f.height,
                ColorSpace: "/DeviceRGB",
                BitsPerComponent: 8,
                Length: g.length,
                Interpolate: "true",
                Filter: k,
                _name: e,
                _stream: g
            });
            l && (e.DecodeParms = l);
            if (h) {
                g = rb("LZWEncoder,Ascii85Encoder");
                for (d = 0; d < c.data.length; d += 4)
                    g.Pa(c.data[d + 3]);
                g.flush();
                g = g.$c().toString();
                f = ii(a, "XObject", {
                    Subtype: "/Image",
                    Width: f.width,
                    Height: f.height,
                    ColorSpace: "/DeviceGray",
                    BitsPerComponent: 8,
                    Length: g.length,
                    Filter: "[/ASCII85Decode /LZWDecode]",
                    DecodeParms: "[ null << /EarlyChange 0 >> ]",
                    _stream: g
                });
                e.SMask = f._id + " 0 R"
            }
            a.da.push({
                Lc: b,
                jd: e
            })
        }
        qi(a, "XObject", e);
        return "/" + e._name
    }
    function oi(a, b, c) {
        for (var d = 0; d < a.da.length; d++)
            if (a.da[d].Lc === b && c === a.da[d].Je)
                return a.da[d].jd;
        return null
    }
    function qi(a, b, c) {
        "Resources"in a.page || (a.page.Resources = {});
        b in a.page.Resources || (a.page.Resources[b] = {});
        a.page.Resources[b][c._name] = c._id + " 0 R"
    }
    function ri(a, b, c) {
        var d = "" + b + "-" + c;
        if (!(d in a.na)) {
            var e = "gs" + a.aa;
            a.aa += 1;
            var f = ii(a, "ExtGState", {
                _name: e
            });
            c ? f.ca = a.Qb(b) : f.CA = a.Qb(b);
            a.na[d] = e;
            qi(a, "ExtGState", f)
        }
        return a.na[d]
    }
    function ii(a, b, c) {
        var d = a.ba.length + 1;
        b && (c.Type = b);
        c._id = d;
        a.ba.push(c);
        return c
    }
    function ji(a, b, c, d, e) {
        b = b || a.x;
        c = c || a.y;
        d = d || a.width;
        e = e || a.height;
        a.log("StartPage MediaBox=[%s %s %s %s]", b, c, d, e);
        a.page = ii(a, "Page", {
            MediaBox: [b, c, b + d, c + e],
            Parent: a.ka._id + " 0 R"
        });
        a.ka.Kids.push(a.page._id + " 0 R");
        a.ka.Count += 1;
        a.na = {}
    }
    function si(a, b) {
        ci.call(this);
        this.ua = b;
        this.na = this.bg;
        this.da = a.clone();
        this.da.transform(new jb(.75,.75,0,0));
        this.Pc = "black";
        this.ba = new hi(72 * a.x / 96,72 * a.y / 96,72 * a.width / 96,72 * a.height / 96);
        this.aa = [];
        this.path = [];
        this.y = this.x = 0;
        this.qa = [];
        this.strokeStyle = this.fillStyle = "#000000";
        ti(this)
    }
    si.prototype = {
        log: t("PDFContext"),
        save: function() {
            ci.prototype.save.call(this);
            this.aa.push("q");
            this.qa.push({
                xa: this.xa.clone(),
                Pc: this.Pc,
                sd: this.sd,
                rd: this.rd,
                qd: this.qd,
                pd: this.pd,
                od: this.od,
                nd: this.nd,
                md: this.md
            })
        },
        restore: function() {
            ci.prototype.restore.call(this);
            this.aa.push("Q");
            var a = this.qa.pop();
            this.xa = a.xa;
            this.Pc = a.Pc;
            this.sd = a.sd;
            this.rd = a.rd;
            this.qd = a.qd;
            this.pd = a.pd;
            this.od = a.od;
            this.nd = a.nd;
            this.md = a.md
        },
        beginPath: function() {
            this.path.length = 0
        },
        toString: function() {
            ui(this);
            return li(this.ba)
        },
        yd: function() {
            ui(this);
            return this.ba.yd()
        },
        setTransform: function(a, b, c, d, e, f) {
            var g = nd(this.da);
            this.xa = (new Q(a,c,b,d,e,f)).multiply(new ud(0,g.x,g.y)).multiply(new jb(.75,.75,0,0))
        },
        closePath: function() {
            this.path.push("h")
        },
        fill: function() {
            vi(this);
            for (var a = 0; a < this.path.length; a++)
                this.aa.push(this.path[a]);
            this.aa.push("f")
        },
        stroke: function() {
            wi(this);
            for (var a = 0; a < this.path.length; a++)
                this.aa.push(this.path[a]);
            this.aa.push("S")
        },
        moveTo: function(a, b) {
            var c = this.xa.apply(a, b);
            this.path.push(this.ba.Qb(c.x, c.y) + " m");
            this.x = a;
            this.y = b
        },
        lineTo: function(a, b) {
            var c = this.xa.apply(a, b);
            this.path.push(this.ba.Qb(c.x, c.y) + " l");
            this.x = a;
            this.y = b
        },
        quadraticCurveTo: function(a, b, c, d) {
            this.bezierCurveTo(2 / 3 * a + 1 / 3 * this.x, 2 / 3 * b + 1 / 3 * this.y, 2 / 3 * a + 1 / 3 * c, 2 / 3 * b + 1 / 3 * d, c, d)
        },
        bezierCurveTo: function(a, b, c, d, e, f) {
            a = this.xa.apply(a, b);
            c = this.xa.apply(c, d);
            d = this.xa.apply(e, f);
            this.path.push(this.ba.Qb(a.x, a.y, c.x, c.y, d.x, d.y) + " c");
            this.x = e;
            this.y = f
        },
        fillText: function(a, b, c) {
            this.na(a, b, c, 0)
        },
        strokeText: function(a, b, c) {
            this.na(a, b, c, 1)
        },
        bg: function(a, b, c, d) {
            var e, f, g = this.Hc(this.font), h = this.ua.get(g.fontFamily);
            if (h) {
                0 === d ? vi(this) : wi(this);
                this.beginPath();
                g = parseFloat(g.fontSize);
                this.save();
                this.translate(b, c);
                h.transform(this, g);
                for (g = c = b = 0; g < h.fd.length; g++)
                    h.fd[g].reset();
                for (g = 0; g < a.length; g++) {
                    var k, l = h;
                    k = a.charCodeAt(g);
                    var m = 0;
                    for (e = 0; e < l.ka.length && !(m = l.ka[e].map(k)); e++)
                        ;
                    k = m;
                    l = h;
                    m = k;
                    S("hmtx"in l.aa);
                    e = l.file;
                    f = e.seek(l.aa.hmtx.offset + 4);
                    var q = l.aa.hmtx.offset
                      , r = {};
                    m < l.da ? (q += 4 * m,
                    f = l.file.seek(q),
                    r.fe = e.getUint16()) : (f = e.seek(q + 4 * (l.da - 1)),
                    r.fe = e.getUint16(),
                    e.seek(q + 4 * l.da + 2 * (m - l.da)));
                    r.Mg = e.getInt16();
                    l.file.seek(f);
                    l = r;
                    e = h;
                    f = k;
                    for (var q = void 0, u = m = r = 0; u < e.fd.length; u++)
                        q = e.fd[u].get(f),
                        r += q.x,
                        m += q.y;
                    e = r;
                    f = m;
                    h.log("Metrics for %s code %s index %s: %s %s kern: %s,%s", a.charAt(g), a.charCodeAt(g), k, l.fe, l.Mg, e, f);
                    m = b + e;
                    e = c + f;
                    k = kg(h, k);
                    if (null !== k && "simple" === k.type)
                        for (var u = r = q = f = 0, w = void 0; q < k.va.length; q++) {
                            var v = k.va[q];
                            0 === f ? (this.moveTo(v.x + m, v.y + e),
                            f = 1) : 1 === f ? v.Nc ? this.lineTo(v.x + m, v.y + e) : f = 2 : (w = k.va[q - 1],
                            v.Nc ? (this.quadraticCurveTo(w.x + m, w.y + e, v.x + m, v.y + e),
                            f = 1) : this.quadraticCurveTo(w.x + m, w.y + e, (w.x + v.x) / 2 + m, (w.y + v.y) / 2 + e));
                            q === k.hc[r] && (2 === f && (w = v,
                            v = k.va[u],
                            v.Nc ? this.quadraticCurveTo(w.x + m, w.y + e, v.x + m, v.y + e) : this.quadraticCurveTo(w.x + m, w.y + e, (w.x + v.x) / 2 + m, (w.y + v.y) / 2 + e)),
                            u = q + 1,
                            r += 1,
                            f = 0)
                        }
                    b += l.fe
                }
                this.restore();
                0 === d ? this.fill() : this.stroke()
            } else {
                h = this.Hc(this.font);
                if (this.od !== h.fontSize || this.nd !== h.fontFamily)
                    g = this.ba,
                    l = h.fontFamily,
                    l in g.fonts || (k = "F" + g.aa,
                    g.aa += 1,
                    m = "/" + l.replace(/ /g, ""),
                    k = ii(g, "Font", {
                        _name: k,
                        BaseFont: m,
                        Encoding: "/StandardEncoding",
                        Subtype: "/Type1"
                    }),
                    g.fonts[l] = k),
                    qi(g, "Font", g.fonts[l]),
                    this.aa.push("/" + g.fonts[l]._name + " " + this.ba.Qb(parseFloat(h.fontSize)) + " Tf"),
                    this.od = h.fontSize,
                    this.nd = h.fontFamily;
                this.md !== d && (this.aa.push(d + " Tr"),
                this.md = 0);
                0 === d ? vi(this) : wi(this);
                this.aa.push("BT");
                d = this.xa.multiply(new Q(1,0,0,-1,b,c));
                this.aa.push(this.ba.Qb(d.m11, d.m21, d.m12, d.m22, d.Da, d.Ea) + " Tm");
                this.aa.push("(" + a.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)") + ") Tj");
                this.aa.push("ET")
            }
        },
        Hc: function(a) {
            var b = null
              , c = null
              , d = "normal"
              , e = "normal"
              , f = "normal"
              , g = "normal";
            a = a.split(/\s+/);
            a: for (; ; ) {
                var h = a.shift();
                if (!h)
                    break;
                switch (h) {
                case "normal":
                    break;
                case "italic":
                case "oblique":
                    d = h;
                    break;
                case "small-caps":
                    f = h;
                    break;
                case "bold":
                case "bolder":
                case "lighter":
                case "100":
                case "200":
                case "300":
                case "400":
                case "500":
                case "600":
                case "700":
                case "800":
                case "900":
                    e = h;
                    break;
                default:
                    if (!c) {
                        h = h.split("/");
                        c = h[0];
                        1 < h.length && (g = h[1]);
                        break
                    }
                    b = h;
                    a.length && (b += " " + a.join(" "));
                    break a
                }
            }
            b && (b = b.replace(/"/g, ""));
            return {
                fontStyle: d,
                fontVariant: f,
                fontWeight: e,
                fontSize: c,
                lineHeight: g,
                fontFamily: b
            }
        },
        drawImage: function(a, b, c, d, e, f, g, h, k) {
            var l = parseInt(a.width, 10)
              , m = parseInt(a.height, 10);
            if (3 === arguments.length)
                return this.drawImage(a, 0, 0, l, m, arguments[1], arguments[2], l, m);
            if (5 === arguments.length)
                return this.drawImage(a, 0, 0, l, m, arguments[1], arguments[2], arguments[3], arguments[4]);
            this.log("DrawImage(%s, %s, %s, %s, %s, %s, %s %s)", b, c, d, e, f, g, h, k);
            g = g + k;
            l = document.createElement("canvas");
            m = l.getContext("2d");
            l.width = d;
            l.height = e;
            m.drawImage(a, -b, -c);
            l = pi(this.ba, [a.src, b, c, d, e].join(), l);
            this.aa.push("q");
            m = this.xa.multiply(new Q(h,0,0,-k,f,g));
            this.aa.push(this.ba.Qb(m.m11, m.m21, m.m12, m.m22, m.Da, m.Ea) + " cm");
            this.aa.push(l + " Do");
            this.aa.push("Q")
        }
    };
    function wi(a) {
        function b(a) {
            return "bevel" === a ? 2 : "round" === a ? 1 : 0
        }
        function c(a) {
            return "butt" === a ? 0 : "round" === a ? 1 : 2
        }
        if (a.sd !== a.strokeStyle) {
            if (a.strokeStyle instanceof bi) {
                var d = ni(a.ba, a.strokeStyle, a.xa);
                a.aa.push("/Pattern CS");
                a.aa.push(d + " SCN")
            } else
                "string" === typeof a.strokeStyle && (d = og(pf(a.strokeStyle), 0),
                a.aa.push(a.ba.Qb(d.values[0], d.values[1], d.values[2]) + " RG"),
                d = ri(a.ba, d.values[3], !1),
                a.aa.push("/" + d + " gs"));
            a.sd = a.strokeStyle
        }
        a.rd !== a.lineWidth && (a.rd = a.lineWidth,
        a.aa.push(a.ba.Qb(72 * a.lineWidth / 96) + " w"));
        a.qd !== a.lineJoin && (a.qd = a.lineJoin,
        a.aa.push(b(a.lineJoin) + " j"));
        a.pd !== a.lineCap && (a.pd = a.lineCap,
        a.aa.push(c(a.lineCap) + " J"))
    }
    function vi(a) {
        if (a.Pc !== a.fillStyle) {
            if (a.fillStyle instanceof bi) {
                var b = ni(a.ba, a.fillStyle, a.xa);
                a.aa.push("/Pattern cs");
                a.aa.push(b + " scn")
            } else
                "string" === typeof a.fillStyle && (b = og(pf(a.fillStyle), 0),
                a.aa.push(a.ba.Qb(b.values[0], b.values[1], b.values[2]) + " rg"),
                b = ri(a.ba, b.values[3], !0),
                a.aa.push("/" + b + " gs"));
            a.Pc = a.fillStyle
        }
    }
    function ui(a) {
        if (a.aa.length) {
            var b = a.ba, c;
            c = ii(a.ba, null, {
                _stream: a.aa.join("\n")
            });
            b.page.Contents = c._id + " 0 R"
        }
        a.aa.length = 0
    }
    function ti(a) {
        a.log("Start page: %s", a.da);
        a.setTransform(1, 0, 0, 1, 0, 0)
    }
    si.prototype = x.aa({}, ci.prototype, si.prototype);
    var xi = t("DOC");
    Rf.prototype.save = function(a, b) {
        var c, d;
        if ("list" === a)
            d = yi(this),
            c = "application/json";
        else if ("zwibbler3" === a)
            c = yi(this),
            d = "zwibbler3." + window.JSON.stringify(c),
            c = "application/octet-stream";
        else if ("svg" === a)
            c = Xf(this),
            d = new fi(c),
            this.ma(d),
            c = "image/svg+xml";
        else if ("pdf" === a) {
            c = Xf(this);
            d = new si(c,window.Zwibbler.fonts);
            var e = this.yb;
            for (c = 0; c < this.bc(); c++) {
                if (0 < c) {
                    var f = d;
                    ui(f);
                    ji(f.ba, f.da.x, f.da.y, f.da.width, f.da.height);
                    ti(f);
                    f.beginPath()
                }
                this.pb(c);
                this.ma(d)
            }
            this.pb(e);
            c = "application/pdf"
        } else
            throw "Unknown save format: " + a;
        var g;
        if (Of(d))
            if ("string" === b)
                g = d;
            else if ("data-uri" === b)
                g = "data:" + c + ";base64," + xc("base64", d);
            else {
                if ("blob" === b)
                    for (e = new Uint8Array(d.length),
                    c = 0; c < d.length; c++)
                        e[c] = d.charCodeAt(c)
            }
        else if (d.yd && d.toString)
            "string" === b ? g = d.toString() : "data-uri" === b ? g = "data:" + c + ";base64," + xc("base64", d.toString()) : "blob" === b && (g = d.yd());
        else if ("object" === b)
            g = d;
        else
            throw "Error in ZwibblerDocument.save()";
        return g
    }
    ;
    function zi(a) {
        if ("{" === a.charAt(0))
            return Ai(a);
        if (0 === a.indexOf("zwibbler3.")) {
            var b = window.JSON.parse(a.substr(10));
            return Bi(b)
        }
        if (0 === a.indexOf("zwibblerclip."))
            return b = new Rf(!1),
            a = Yf(b, a, []),
            b.za(a),
            bg(b),
            b;
        throw "Format detection failed.";
    }
    function Ai(a) {
        var b = t("IMPORT"), c = new Rf, d = c.rb, e, f, g, h, k, l = [];
        k = function(a) {
            var b = new Q;
            b.m11 = a.m11;
            b.m12 = a.m12;
            b.m21 = a.m21;
            b.m22 = a.m22;
            b.Da = a.dx;
            b.Ea = a.dy;
            return b
        }
        ;
        g = function(a) {
            var b = 0;
            "arrowSize"in a && (b = a.arrowSize,
            a = a.path);
            var c = k(a.matrix)
              , b = {
                strokeStyle: a.strokeStyle,
                fillStyle: a.fillStyle,
                lineWidth: a.lineWidth,
                smoothness: a.smoothness,
                sloppiness: a.sloppiness,
                shadow: a.shadow,
                arrowSize: b,
                seed: Math.round(65535 * Math.random())
            };
            if ("textNode"in a) {
                var e = a.textNode;
                b.fontSize = e.fontSize;
                b.fontName = e.fontName;
                b.text = e.text;
                b.textFillStyle = "textFillStyle"in e ? e.textFillStyle : e.fillStyle
            }
            "path"in a && (a = a.path);
            var e = a.closed
              , f = new R
              , g = a.segments;
            a = c.apply(a.startX, a.startY);
            f.moveTo(a.x, a.y);
            for (a = 0; a < g.length; a++) {
                var h = g[a], m;
                switch (h.type) {
                case 1:
                    m = c.apply(h.x, h.y);
                    f.lineTo(m.x, m.y);
                    break;
                case 2:
                    m = c.apply(h.x, h.y);
                    f.Dd(m.x, m.y);
                    break;
                case 3:
                    m = c.apply(h.x1, h.y1);
                    h = c.apply(h.x, h.y);
                    f.aa(m.x, m.y, h.x, h.y);
                    break;
                default:
                    throw "Unknown path segment type: " + h.type;
                }
            }
            e && f.close();
            b.commands = f.Rb();
            l.push(new E("PathNode",b));
            d += 1
        }
        ;
        e = function(a, b) {
            for (var c = [], e = a.children, g = e.length - 1; 0 <= g; g--) {
                var h = d;
                try {
                    f(e[g], b + 1)
                } catch (k) {
                    continue
                }
                c.push(h)
            }
            0 < b && (d += 1,
            l.push(new Bf(c)))
        }
        ;
        h = function(a) {
            var b = k(a.matrix)
              , b = b.multiply(new F(0,1.3 * a.fontSize));
            l.push(new E("TextNode",{
                fillStyle: a.fillStyle,
                lineWidth: 0,
                text: a.text,
                fontName: a.fontName,
                fontSize: a.fontSize,
                matrix: b
            }));
            d += 1
        }
        ;
        f = function(a, b) {
            switch (a.type) {
            case "Node":
                e(a, b);
                break;
            case "PathNode":
            case "ArrowNode":
                g(a);
                break;
            case "TextNode":
                h(a);
                break;
            default:
                throw "Unknown node type: " + a.type;
            }
        }
        ;
        var m;
        try {
            m = window.JSON.parse(a)
        } catch (q) {
            a = a.replace(/\\\\/g, "\\").replace(/\\"/g, '"');
            try {
                m = window.JSON.parse(a)
            } catch (r) {
                throw b("Couldn't parse file."),
                "Couldn't parse file.";
            }
        }
        b("Successfully parsed!");
        f(m, 0);
        c.za(l);
        return c
    }
    function yi(a) {
        function b(a, d) {
            var e = {
                id: d.id,
                type: d.type()
            };
            c.push(e);
            a && (e.parent = a.id);
            var f = Je(d), m;
            for (m in f)
                f.hasOwnProperty(m) && ("matrix" === m ? e[m] = f[m].Rb() : "inverse" !== m && (e[m] = f[m]));
            if (Ne(d))
                for (e = 0; e < d.children.length; e++)
                    b(d, d.children[e])
        }
        var c = [], d = {
            type: "document"
        }, e = !1, f;
        for (f in a.fa)
            a.fa.hasOwnProperty(f) && (d[f] = a.fa[f],
            e = !0);
        e && c.push(d);
        b(null, a.root);
        return c
    }
    function Bi(a) {
        function b(a, c) {
            var d;
            if (void 0 !== a) {
                d = {};
                for (var e in a)
                    a.hasOwnProperty(e) && "children" !== e && "parent" !== e && "id" !== e && "type" !== e && (d[e] = "matrix" === e ? new Q(a[e]) : a[e]);
                e = h;
                0 !== a.id && f.push(new E(a.type,d,c,-1));
                g[a.id] = h;
                h += 1;
                if (void 0 !== a.children)
                    for (d = 0; d < a.children.length; d++)
                        b(a.children[d], e)
            }
        }
        var c, d, e;
        a = window.JSON.parse(window.JSON.stringify(a));
        var f = []
          , g = {}
          , h = 0
          , k = {}
          , l = !1;
        for (c = 0; c < a.length; c++)
            if (e = a[c],
            "document" === e.type)
                delete e.type,
                f.push(new Kf(e));
            else {
                "PageNode" === e.type && (l = !0);
                if ("parent"in e) {
                    if (!(e.parent in k))
                        throw "Error: child " + e.id + " references parent " + e.parent + " before it was defined.";
                    d = k[e.parent];
                    void 0 !== d.children ? d.children.push(e) : d.children = [e]
                }
                "GroupNode" !== e.type && "PageNode" !== e.type || void 0 !== e.children || (e.children = []);
                k[e.id] = e
            }
        l || (h += 1);
        b(k[0], h);
        xi(JSON.stringify(g));
        for (c = 0; c < f.length; c++)
            xi(f[c].toString());
        a = new Rf(l);
        a.za(f);
        bg(a);
        return a
    }
    ;function Ci(a, b, c) {
        var d = this;
        this.aa = a;
        this.ha = b;
        this.Ca = new Sa;
        this.ha.empty();
        "absolute" !== this.ha.ga("position") && "fixed" !== this.ha.ga("position") && this.ha.ga("position", "relative");
        this.ha.ga("overlow", "none");
        this.ha.ga("text-align", "left");
        this.eb = new Xc(x("<div>").ga("width", "300px"),this.Ca);
        this.log("Starting Zwibbler Version %s", 14);
        this.ha.append(this.eb.ha);
        this.ia = new pc(c);
        this.Xa = new Ta("en:arrowhead-size:Arrowhead size\nes:arrowhead-size:Flecha tama\u00f1o\n\nen:arrowhead-size-large:Large\nes:arrowhead-size-large:Grande\n\nen:arrowhead-size-medium:Medium\nes:arrowhead-size-medium:Medio\n\nen:arrowhead-size-none:None\nes:arrowhead-size-none:Nada\n\nen:arrowhead-size-small:Small\nes:arrowhead-size-small:Peque\u00f1o\n\nen:arrowhead-size-tiny:Tiny\nes:arrowhead-size-tiny:Diminuto\n\nen:arrowhead-style:Arrowhead style\nes:arrowhead-style:Flecha estilo\n\nen:arrowhead-style-simple:Simple\nes:arrowhead-style-simple:Llanura\n\nen:arrowhead-style-solid:Solid\nes:arrowhead-style-solid:Denso\n\nen:arrow-keys:Arrow Keys\nes:arrow-keys:Teclas de flecha\n\nen:arrow-tool:Arrow tool\nes:arrow-tool:Flecha\nfr:arrow-tool:Fl\u00e8che\nnl:arrow-tool:Pijl\n\nen:break-apart-group:Break apart group\nes:break-apart-group:Dividir el grupo\n\nen:bring-to-front:Bring to front\nes:bring-to-front:Traer al frente\n\nen:brush-tool:Brush tool\nes:brush-tool:Brocha\nfr:brush-tool:Brosse\nnl:brush-tool:Penseel\n\nen:circle-tool:Circle tool\nes:circle-tool:C\u00edrculo\nfr:circle-tool:Cercle\nnl:circle-tool:Cirkel\n\nen:click-to-place-another-point-or-double-click-to-end-the-line:Click to place another point, or double-click to end the line.\nes:click-to-place-another-point-or-double-click-to-end-the-line:Haga clic para colocar otro punto, o doble clic para finalizar la l\u00ednea\nfr:click-to-place-another-point-or-double-click-to-end-the-line:Cliquez pour placer un autre point, ou double-cliquez pour terminer la ligne.\nnl:click-to-place-another-point-or-double-click-to-end-the-line:Klik op een ander punt te plaatsen, of dubbelklik om de lijn te be\u00ebindigen.\n\nen:click-to-place-first-point-of-line:Click to place first point of line\nes:click-to-place-first-point-of-line:Haga clic para colocar el primer punto de la l\u00ednea\nfr:click-to-place-the-first-point-of-line:Cliquez pour placer le premier point de la ligne\nnl:click-to-place-the-first-point-of-line:Klik om het eerste punt van de lijn te plaatsen.\n\nen:click-to-set-the-end-of-the-line:Click to set the end of the line\nes:click-to-set-the-end-of-the-line:Haga clic para colocar el extremo de la l\u00ednea\nfr:click-to-set-the-end-of-the-line:Cliquez pour d\u00e9finir la fin de la ligne\nnl:click-to-set-the-end-of-the-line:Klik hier voor het einde van de lijn in te stellen.\n\nen:copy:Copy\nes:copy:Copiar\nfr:copy:Copie\nnl:copy:Kopi\u00ebren\n\nen:curve-tool:Curve tool\nes:curve-tool:Curva\nfr:curve-tool:Courbes\nnl:curve-tool:Kromme\n\nen:delete-selection:Delete selection\nes:delete-selection:Eliminar la selecci\u00f3n\n\nen:del-key:Del\nes:del-key:Del\n\nen:double-arrows:Double arrows\nes:double-arrows:flechas dobles\n\nen:draw-curves:Draw curves\nes:draw-curves:Dibuje las curvas\n\nen:draw-lines:Draw lines\nes:draw-lines:Dibujar l\u00edneas\n\nen:duplicate-selection:Duplicate selection\nes:duplicate-selection:Duplica la selecci\u00f3n\n\nen:fill-colour:Fill colour\nes:fill-colour:Color de relleno\n\nen:font:Font\nes:font:Font\n\nen:font-size:Font size\nes:font-size:Tama\u00f1o de letra\n\nen:group-selection:Group selection\nes:group-selection:Grupo la selecci\u00f3n\n\nen:image-tool:Image tool\nes:image-tool:Imagen\nfr:image-tool:Image\nnl:image-tool:Afbeelding\n\nen:image-url:Image URL\nes:image-url:URL de la imagen\n\nen:keyboard:Keyboard\nes:keyboard:Teclado\n\nen:line-style:Line style\nes:line-style:Estilo de l\u00ednea\n\nen:line-style-long-dashes:Long dashes\nes:line-style-long-dashes:Gui\u00f3n largo\n\nen:line-style-short-dashes:Short dashes\nes:line-style-short-dashes:Gui\u00f3n corto\n\nen:line-style-solid:Solid\nes:line-style-solid:Denso\n\nen:line-tool:Line tool\nes:line-tool:Raya\nfr:line-tool:Lignes\nnl:line-tool:Lijn\n\nen:move-selection-away:Move selection away\nes:move-selection-away:Mover la selecci\u00f3n de distancia\n\nen:move-selection-closer:Move selection closer\nes:move-selection-closer:Mover la selecci\u00f3n de distancia\n\nen:move-while-zoomed:Move while zoomed\nes:move-while-zoomed:Desplazarse por la pantalla\n\nen:none:None\nes:none:Nada\n\nen:no:No\nes:no:No\n\nen:outline-colour:Outline colour\nes:outline-colour:Color del contorno\n\nen:outline-thickness:Outline thickness\nes:outline-thickness:Grosor del contorno\n\nen:page-down-key:Page Down\nes:page-down-key:Page Down\n\nen:page-up-key:Page Up\nes:page-up-key:Page Up\n\nen:paste:Paste\nes:paste:Pegar\nfr:paste:Coller\nnl:paste:Plak\n\nen:pick-tool:Pick tool\nes:pick-tool:Seleccionar\nfr:pick-tool:S\u00e9lectionner\nnl:pick-tool:Uitkiezen\n\nen:rectangle-tool:Rectangle tool\nes:rectangle-tool:rect\u00e1ngulo\nfr:rectangle-tool:Rectangle\nnl:rectangle-tool:Rechthoek\n\nen:redo:Redo\nes:redo:Rehacer\nfr:redo:Refaire\nnl:redo:Opnieuw maken\n\nen:rounded-rectangle-tool:Rounded rectangle tool\nes:rounded-rectangle-tool:Rect\u00e1ngulo redondeado\n\nen:save:Save\nes:save:Guardar\n\nen:send-to-back:Send to back\nes:send-to-back:Enviar a la parte posterior\n\nen:shadow:Shadow\nes:shadow:Sombra\n\nen:shape-brush-tool:Shape brush tool\nes:shape-brush-tool:Brush que dibuja formas\n\nen:sloppiness-artist:Artist\nes:sloppiness-artist:Artista\n\nen:sloppiness-cartoonist:Cartoonist\nes:sloppiness-cartoonist:Caricaturista\n\nen:sloppiness-child:Child\nes:sloppiness-child:Ni\u00f1o\n\nen:sloppiness-draftsman:Draftsman\nes:sloppiness-draftsman:Dibujante\n\nen:sloppiness-drunk:Drunk\nes:sloppiness-drunk:Borracho\n\nen:sloppiness:Sloppiness\nes:sloppiness:La dejadez\n\nen:smoothness-sharper:Sharper\nes:smoothness-sharper:Muy afilado\n\nen:smoothness-sharpest:Sharpest\nes:smoothness-sharpest:M\u00e1s afilado\n\nen:smoothness-sharp:Sharp\nes:smoothness-sharp:Afilado\n\nen:smoothness-smoothest:Smoothest\nes:smoothness-smoothest:Muy liso\n\nen:smoothness:Smoothness\nes:smoothness:Lisura\n\nen:smoothness-smooth:Smooth\nes:smoothness-smooth:Liso\n\nen:text-colour:Text colour\nes:text-colour:Color del texto\n\nen:text:Text\nes:text:Texto\n\nen:text-tool:Text tool\nes:text-tool:Texto\nfr:text-tool:Texte\nnl:text-tool:Tekst\n\nen:thickness-brush:Brush\nes:thickness-brush:Brocha\n\nen:thickness-marker:Marker\nes:thickness-marker:Rotulador\n\nen:thickness-pencil:Pencil\nes:thickness-pencil:L\u00e1piz\n\nen:thickness-pen:Pen\nes:thickness-pen:Pluma\n\nen:undo:Undo\nes:undo:Deshacer\nfr:undo:D\u00e9faire\nnl:undo:Ongedaan maken\n\nen:yes:Yes\nes:yes:S\u00ed\n\nen:zoom-in:Zoom in\nes:zoom-in:Zoom\n\nen:zoom-out:Zoom out\nes:zoom-out:Disminuir el zoom\n");
        Wa(this.Xa, this.ia.get("language"));
        this.ua = null;
        this.Ka = x("<div>");
        this.Ka.ga("position", "absolute");
        this.Ka.ga("overflow", "hidden");
        this.ha.append(this.Ka);
        this.canvas = x(rg(this.Ka[0]));
        this.canvas.ga("outline", "0");
        this.canvas.ga("position", "absolute");
        this.canvas.ga("left", "0");
        this.canvas.ga("top", "0");
        this.canvas.fb("tabindex", "0");
        this.oa = this.canvas[0].getContext("2d");
        this.ia.on("useTouch", function(a, b, c) {
            d.ia.$b() ? (a = 40,
            b = !0) : (a = 20,
            b = !1);
            c ? d.ka = new Ag(d.ha,a,b,!1) : (d.ka.qc(a, b),
            Di(d, !0))
        });
        this.sb = new J;
        this.view = new yh(this.canvas,new Rf,this.ka,this.sb,this.ia,this.Xa,this.aa,this.Ca);
        Ei(this);
        Fi(this);
        this.aa.on("tool-changed", function(a) {
            bd(d.toolbar, a)
        });
        Gi(this);
        this.qa = new Ug(this.ia,this.Xa,this.Ca);
        this.ha.append(this.qa.ha);
        this.ia.Ze() && (this.view.Vc = this.qa);
        this.qa.view = this.view;
        this.qa.on("click", function() {
            d.focus("none")
        });
        this.Ca.bind(x(window), "resize", function() {
            Di(d)
        });
        window.$ && (d.log("jQuery detected; register for bootstrap events"),
        window.$(document).bind("shown.bs.modal", function() {
            d.log("Bootstrap modal shown; resize now");
            d.aa.resize()
        }));
        this.Ec = lc();
        this.Yb = "debug"in this.Ec || this.ia.wa.showDebug;
        this.da = new fc(this.ha);
        this.da.ha.ga("border-right", "1px solid black");
        this.na = new fc(this.ha);
        this.na.ha.ga("border-top", "1px solid black");
        this.na.on("click", function(a) {
            return Oh(d.view, a)
        });
        this.da.on("click", function(a) {
            return Hi(d, a)
        });
        null !== this.ia.wa.backgroundImage && (Hi(this, this.ia.wa.backgroundImage),
        bg(this.view.la));
        Ii(this);
        this.ia.on("update", function(a, b) {
            d.kd(a, b)
        });
        this.rc = this.sc = -1;
        this.ba = new Hg(x("<div>"),!1,!this.ia.get("showPageSelectorControls"));
        this.ba.ha.ga("position", "absolute");
        this.ba.ha.ga("top", "0");
        this.ba.ha.ga("bottom", "0");
        this.ba.ha.ga("width", "160px");
        this.ba.ha.ga("left", "50px");
        this.ba.ha.ga("background", this.ia.get("outsidePageColour"));
        Lg(this.ba, this.ia.get("showPageSelector"));
        this.ha.append(this.ba.ha);
        this.Zb = x("<div>").ga("position", "absolute").ga("top", "0").ga("right", "0").ga("box-shadow", "3px 3px 3px #444").ga("background", "#ccc").ga("color", "black").ga("border-bottom-left-radius", "4px").ga("font-family", "arial,sans");
        this.ha.append(this.Zb);
        Di(this);
        (a = tc(this.ia)) ? this.tb = new Hg(x(a),!0,!0) : this.tb = null;
        this.ia.get("setFocus") && this.focus("toolbar");
        this.ub = [];
        Kg(this.ba, this.aa);
        this.tb && (Kg(this.tb, this.aa),
        Lg(this.tb, !0));
        this.aa.emit("document-changed");
        this.aa.emit("set-page", this.view.la.yb);
        da() && (this.ia.get("persistent") && (a = ga("zwibbler-document")) && Ji(this, zi(a)),
        this.oc = ai(function() {
            d.ia.get("persistent") && (d.log("Saving document"),
            fa("zwibbler-document", d.aa.save()))
        }),
        d.aa.on("document-changed", function() {
            d.oc()
        }),
        d.Ca.add(function() {
            d.oc.cancel()
        }));
        this.Ca.add(function() {
            d.ha.empty();
            delete d.ha[0].zwibbler
        })
    }
    Ci.prototype = {
        log: t("APP"),
        kd: function(a, b) {
            var c = !1;
            this.log("onConfigChange %s=%s", a, b);
            switch (a) {
            case "debug":
            case "showDebug":
                this.Yb = b;
                c = !0;
                break;
            case "showPageSelector":
                c = !0;
                Lg(this.ba, b);
                break;
            case "backgroundImage":
                Hi(this, b);
                break;
            case "showToolbar":
            case "showColourPanel":
                c = !0;
                break;
            case "showArrowTool":
            case "showBrushTool":
            case "showCircleTool":
            case "showCopyPaste":
            case "showCurveTool":
            case "showLineTool":
            case "showMoveToFrontBack":
            case "showPickTool":
            case "showRoundRectTool":
            case "showShapeBrushTool":
            case "showSquareTool":
            case "showTextTool":
            case "showUndoRedo":
            case "toolbarButtonSize":
                Fi(this);
                c = !0;
                break;
            case "language":
                Wa(this.Xa, b)
            }
            c && Di(this, !0)
        },
        focus: function(a) {
            this.log("Set focus to %s", a);
            if ("toolbar" !== a && "canvas" !== a && "none" !== a)
                throw "Focus must be toolbar or canvas or none, not " + a;
            this.gb = a;
            "toolbar" === this.gb ? (this.toolbar.focus(),
            Wh(this.view),
            this.ha.focus()) : "canvas" === this.gb && (this.toolbar.blur(),
            this.ha.focus())
        },
        createNode: function(a, b, c) {
            var d;
            d = this.view.la.rb;
            "layer"in c || (c.layer = this.view.Ja);
            a.push(new E(b,c));
            return d
        },
        Ld: function() {
            Ji(this, new Rf);
            null !== this.ia.wa.backgroundImage && (Hi(this, this.ia.wa.backgroundImage),
            bg(this.view.la))
        },
        Ic: function(a, b) {
            var c;
            c = this.view.la.rb;
            a.push(new Bf(b));
            return c
        }
    };
    function Ki(a, b, c) {
        return a.createNode(b, "PathNode", {
            commands: c,
            fillStyle: a.view.jb,
            strokeStyle: a.view.mb,
            seed: Math.round(65535 * Math.random()),
            lineWidth: a.view.Ba.lineWidth,
            sloppiness: a.view.Ba.sloppiness,
            angleArcs: a.ia.get("angleArcs")
        })
    }
    function Li(a, b, c) {
        var d, e;
        if ("image/svg+xml" === b || "application/pdf" === b)
            return "image/svg+xml" === b ? e = new fi(new P(0,0,c.width,c.height)) : e = new si(new P(0,0,c.width,c.height),window.Zwibbler.fonts),
            Mi(a, e, c),
            "data:" + b + ";base64," + xc("base64", e.toString());
        d = x("<canvas>");
        d.fb("width", "" + c.width);
        d.fb("height", "" + c.height);
        e = d[0].getContext("2d");
        if ("image/jpeg" === b || "image/bmp" === b)
            e.fillStyle = "#ffffff",
            e.fillRect(0, 0, c.width, c.height);
        Mi(a, e, c);
        if ("image/bmp" === b) {
            a = d[0];
            c = a.getContext("2d").getImageData(0, 0, a.width, a.height);
            a = c.width;
            e = c.height;
            b = a * e * 3;
            d = b + 54;
            var f = [66, 77, d & 255, d >> 8 & 255, d >> 16 & 255, d >> 24 & 255, 0, 0, 0, 0, 54, 0, 0, 0]
              , g = [40, 0, 0, 0, a & 255, a >> 8 & 255, a >> 16 & 255, a >> 24 & 255, e & 255, e >> 8 & 255, e >> 16 & 255, e >> 24 & 255, 1, 0, 24, 0, 0, 0, 0, 0, b & 255, b >> 8 & 255, b >> 16 & 255, b >> 24 & 255, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            b = (4 - 3 * a % 4) % 4;
            c = c.data;
            d = a << 2;
            for (var h = rb("Base64Encoder"), k = 0; k < f.length; k++)
                h.Pa(f[k]);
            for (k = 0; k < g.length; k++)
                h.Pa(g[k]);
            do {
                f = d * (e - 1);
                for (g = 0; g < a; g++)
                    k = g << 2,
                    h.Pa(c[f + k + 2]),
                    h.Pa(c[f + k + 1]),
                    h.Pa(c[f + k]);
                for (f = 0; f < b; f++)
                    h.Pa(0)
            } while (--e);h.flush();
            a = "data:image/bmp;base64," + h.$c().toString()
        } else
            a = d[0].toDataURL(b);
        return a
    }
    function Mi(a, b, c) {
        b.translate(-c.x, -c.y);
        Jh(a.view, b, c.x, c.y, c.width, c.height);
        a.view.la.ma(b);
        a.aa.Xb && a.aa.Xb(b)
    }
    function Di(a, b) {
        var c, d, e, f, g, h, k, l, m, q, r, u, w, v, z;
        l = x(window).width();
        c = x(window).height();
        if (b || l !== a.Vc || c !== a.Uc)
            a.Vc = l,
            a.Uc = c,
            v = a.ha.width() - 0,
            l = a.ha.height() - 0,
            0 >= v || !b && v === a.sc && l === a.rc || (a.sc = v,
            a.rc = l,
            a.ia.wa.showBackgroundSelector ? (c = 100,
            a.da.show(),
            g = a.da,
            g.ba = c - 24,
            g.aa = 0) : (c = 0,
            a.da.sa()),
            a.ia.wa.showImageSelector ? (f = 100,
            g = a.na,
            g.ba = 0,
            g.aa = f - 24,
            a.na.show()) : (f = 0,
            a.na.sa()),
            a.ia.wa.showPageSelector ? (a.ba.ha.show(),
            z = a.ba.ha.outerWidth()) : (a.ba.ha.sa(),
            z = 0),
            a.ia.lh() ? (a.ka.show(),
            Cg(a.ka, v),
            g = a.ka.height()) : (a.ka.sa(),
            g = 0),
            a.log("Colour panel height is %s", g),
            a.ia.mh() ? (a.toolbar.show(!0),
            d = l - g,
            e = a.toolbar,
            0 >= d || (h = (e.gc + 2) * Math.ceil(e.ka / d) + 1,
            e.ha.style.width = "" + h + "px",
            e.ha.style.height = "" + d + "px",
            e.log("Toolbar width/height = %s,%s totalHeight=%s", h, d, e.ka)),
            w = a.toolbar.width()) : (a.toolbar.show(!1),
            w = 0),
            d = ve(a.view),
            a.toolbar.moveTo(c + z, 0),
            h = l - g,
            k = q = u = 0,
            a.Yb && (a.eb.show(),
            k = a.eb.width()),
            (r = a.ia.Ze() && 700 <= v) && (q = 300),
            u += q + k,
            m = v - 2 * d - c - u,
            e = l - 2 * d - g - f,
            a.da.width(c),
            a.da.height(l - 2 * d - g),
            a.da.moveTo(0, 0),
            a.ba.ha.ga("top", "0"),
            a.ba.ha.ga("left", "0"),
            a.na.width(m),
            a.na.height(f),
            a.na.moveTo(c, l - 2 * d - g - f),
            f = v - 2 * d - w - u - c - z,
            a.Ka.ga("left", "" + (z + c + w) + "px"),
            a.Ka.ga("top", "0"),
            a.Ka.ga("width", "" + f + "px"),
            a.Ka.ga("height", "" + e + "px"),
            Ih(a.view, f, e),
            a.ka.moveTo(0, h),
            Cg(a.ka, v),
            a.ka.ma(),
            a.Zb.ga("top", "0").ga("right", "" + (q + k) + "px"),
            a.Yb ? (a.eb.moveTo(v - k, 0),
            a.eb.height(l - 2 * d - g)) : a.eb.sa(),
            r ? (a.qa.show(),
            a.qa.moveTo(v - k - q, 0),
            a.qa.width(q),
            a.qa.height(l - 2 * d - g)) : a.Fc || a.qa.sa(),
            a.view.wb())
    }
    function Hi(a, b) {
        var c, d;
        c = [];
        null !== a.ua && a.ua in a.view.la.Aa && c.push(new Af([a.ua]));
        b && (d = a.view.la.rb,
        c.push(new E("ImageNode",{
            url: b,
            locked: !0,
            layer: a.view.Ja
        })),
        c.push(new Ff([d],Hf)));
        a.ua = d;
        a.view.za(c);
        d && B(a.view.la, d, !1).pc(!0);
        a.view.ib();
        af(a.view)
    }
    function Ni(a) {
        a.ua = null;
        a.view.la.Ab(!1, function(b) {
            "ImageNode" === b.type() && !0 === b.pa("locked") && (a.log("Found background image at nodeid %s", b.id),
            a.ua = b.id,
            b.pc(!0))
        })
    }
    function Oi(a, b) {
        a.focus("canvas");
        var c = a.view;
        c.Ga.qb = !0;
        c.Ga.Qa = !1;
        c.Ga.ge = b;
        c.log("Showing keyboard cursor, caret=%s", b);
        c.ma()
    }
    function Pi(a) {
        a.focus("canvas");
        re(a.view)
    }
    function Gi(a) {
        a.gb = "none";
        a.Db = new dd;
        sc(a.ia, a.Db);
        a.Db.on("*", function(b, c) {
            "toolbar" === a.gb ? a.toolbar.vb(b, c) : "canvas" === a.gb ? a.view.vb(b, c) : a.log("Ignore key action -- don't have focus.")
        });
        a.ha.fb("tabindex", "0");
        gd(a.Db, a.ha[0]);
        a.Ca.add(function() {
            a.Db.detach(a.ha[0])
        });
        a.canvas.click(function() {
            ug() ? a.gb = "canvas" : a.focus("canvas")
        });
        x(a.toolbar.ha).click(function() {
            a.focus("toolbar")
        });
        a.ka.on("colour", function() {
            a.focus("canvas")
        });
        a.sb.on("goto-toolbar", function() {
            a.ia.get("showToolbar") ? a.focus("toolbar") : a.aa.emit("blur")
        });
        a.sb.on("goto-canvas", function() {
            a.focus("canvas")
        });
        a.ha.on("blur", function() {
            a.log("Blur event received -- hide keyboard cursor");
            Wh(a.view)
        })
    }
    function Fi(a) {
        function b(a) {
            return 0 === a.type.indexOf("key")
        }
        var c, d, e, f, g, h;
        a.toolbar && (a.toolbar.ha.remove(),
        a.toolbar = null);
        var k = a.Xa.yc();
        a.toolbar = new $c(a.ia.$b(),a.ia.get("toolbarButtonSize"));
        if (a.ia.get("showToolbar")) {
            a.ia.get("showPickTool") && cd(a.toolbar, "pick", k("pick-tool"), L(a.ia, "wd-pick.png"), function(c) {
                G(a.view);
                b(c) && Oi(a)
            });
            a.ia.get("showSquareTool") && a.toolbar.Kb(L(a.ia, "wd-box.png"), k("rectangle-tool"), function(c) {
                Qh(a.view);
                b(c) && Pi(a)
            });
            a.ia.get("showRoundRectTool") && a.toolbar.Kb(L(a.ia, "wd-roundrect.png"), k("rounded-rectangle-tool"), function(c) {
                Qh(a.view, {
                    roundRadius: a.ia.get("defaultRoundRectRadius")
                });
                b(c) && Pi(a)
            });
            a.ia.get("showCircleTool") && a.toolbar.Kb(L(a.ia, "wd-circle.png"), k("circle-tool"), function(c) {
                Ph(a.view);
                b(c) && Pi(a)
            });
            a.ia.get("showShapeBrushTool") && cd(a.toolbar, "shapebrush", k("shape-brush-tool"), L(a.ia, "wd-shapebrush.png"), function(c) {
                Uh(a.view, {});
                b(c) && Oi(a)
            });
            a.ia.kh() && cd(a.toolbar, "brush", k("brush-tool"), L(a.ia, "wd-brush.png"), function(c) {
                Vh(a.view, {});
                b(c) && Oi(a)
            });
            a.ia.get("showLineTool") && cd(a.toolbar, "line", k("line-tool"), L(a.ia, "wd-line.png"), function(c) {
                jh(a.view, {
                    angleArcs: a.ia.get("angleArcs")
                }, !1);
                b(c) && Oi(a)
            });
            a.ia.get("showCurveTool") && cd(a.toolbar, "curve", k("curve-tool"), L(a.ia, "wd-curve.png"), function(c) {
                ih(a.view, {});
                b(c) && Oi(a)
            });
            a.ia.get("showArrowTool") && cd(a.toolbar, "arrow", k("arrow-tool"), L(a.ia, "wd-arrow.png"), function(c) {
                Sh(a.view, {}, !1);
                b(c) && Oi(a)
            });
            a.ia.get("showTextTool") && cd(a.toolbar, "text", k("text-tool"), L(a.ia, "wd-text.png"), function(c) {
                var d = a.view, e, f;
                "interactive" === d.ia.get("textMode") ? sh(d, {}) : (e = d.la.rb,
                f = d.Ua(new A(100,100)),
                d.za([new E("TextNode",{
                    text: d.ia.wa.defaultText,
                    fontSize: d.Ba.fontSize,
                    fontName: d.Ba.fontName,
                    bold: d.Ba.bold,
                    italic: d.Ba.italic,
                    textFillStyle: d.Ba.textFillStyle,
                    strokeStyle: d.Ba.textStrokeStyle,
                    lineWidth: d.Ba.textLineWidth,
                    layer: d.Ja
                }), new Ud([e],new F(f.x,f.y))]));
                b(c) && Oi(a, !0)
            });
            c = function(b) {
                a.toolbar.Kb(d, b.name, function(c) {
                    a.log("Custom button %s clicked.", b.name);
                    b.onclick.call(c.target, a.aa)
                })
            }
            ;
            g = 0;
            for (h = Qi.length; g < h; g++)
                e = Qi[g],
                f = e.name,
                d = e.image,
                a.log("add custom button %s", f),
                c(e);
            bd(a.toolbar, "pick");
            a.ia.wa.showImageTool && a.toolbar.Kb(L(a.ia, "wd-image.png"), k("image-tool"), function() {
                Oh(a.view, "logo.png")
            });
            a.ia.wa.showMoveToFrontBack && (a.toolbar.Kb(L(a.ia, "wd-moveup.png"), k("bring-to-front"), function() {
                bh(a.view)
            }),
            a.toolbar.Kb(L(a.ia, "wd-movedown.png"), k("send-to-back"), function() {
                ch(a.view)
            }));
            a.ia.get("showUndoRedo") && (a.toolbar.Kb(L(a.ia, "wd-undo.png"), k("undo"), function() {
                a.view.cb()
            }),
            a.toolbar.Kb(L(a.ia, "wd-redo.png"), k("redo"), function() {
                a.view.fc()
            }));
            a.ia.get("showCopyPaste") && (a.toolbar.Kb(L(a.ia, "wd-copy.png"), k("copy"), function() {
                nh(a.view)
            }),
            a.toolbar.Kb(L(a.ia, "wd-paste.png"), k("paste"), function() {
                oh(a.view)
            }))
        }
        a.toolbar.on("click", function() {
            a.focus("toolbar")
        });
        a.toolbar.ha.style.position = "absolute";
        a.toolbar.ha.style.left = "0";
        a.toolbar.ha.style.right = "0";
        a.ha.append(a.toolbar.ha)
    }
    function Ji(a, b) {
        a.ua = null;
        Dh(a.view, b);
        Ei(a);
        Ni(a);
        a.aa && (a.aa.emit("document-changed"),
        a.aa.emit("set-page", b.yb));
        for (var c = 0; c < a.ub.length; c++) {
            var d = a.ub[c];
            a.log("Removing old DomElement of type %s", d.tagName);
            x(d).remove()
        }
        a.ub = []
    }
    function Ei(a) {
        a.ia.wa.sloppy || Xh(a.view, "sloppiness", 0);
        var b;
        b = ("" + a.ia.wa.defaultSmoothness).toLowerCase();
        Xh(a.view, "smoothness", "sharpest" === b ? 0 : "sharper" === b ? .1 : "sharp" === b ? .2 : "smoothest" === b ? .5 : .3);
        Xh(a.view, "fillStyle", a.ia.wa.defaultFillStyle);
        Xh(a.view, "strokeStyle", a.ia.wa.defaultStrokeStyle);
        Xh(a.view, "fontName", a.ia.wa.defaultFont);
        Xh(a.view, "fontSize", a.ia.wa.defaultFontSize);
        Xh(a.view, "lineWidth", a.ia.wa.defaultLineWidth);
        Xh(a.view, "textFillStyle", a.ia.wa.defaultTextFillStyle)
    }
    function Ii(a) {
        var b, c, d, e, f;
        a.canvas[0].getContext("2d");
        e = a.ia.wa.fonts;
        f = [];
        c = 0;
        for (d = e.length; c < d; c++)
            b = e[c],
            a.log("Preloading: %s", b),
            b = x("<div>").ga("font-family", b).text("abcd"),
            b.ga("color", "transparent"),
            f.push(a.ha.append(b))
    }
    ;function X(a, b) {
        this.da = {};
        this.ba = 0;
        this.aa = [];
        this.ka = 0;
        this.qa = new T;
        this.Ca = new T;
        this.na = 0;
        this.ua = -1;
        this.app = new Ci(this,a,b);
        Ri(this);
        this.Xb = null;
        var c = this;
        this.app.Ca.add(function() {
            delete c.da;
            delete c.aa;
            delete c.app;
            delete c.Xb
        })
    }
    X.prototype = {
        log: t("CONTEXT"),
        cg: function() {
            1 < this.ba && this.xb("abortTransaction is not implemented for nested calls. Please contact support.");
            this.ba = 0;
            this.aa = []
        },
        gf: function(a) {
            var b = this.app.Xa;
            Ua(b, a, b.data)
        },
        dg: function() {
            return this.ed(this.bc())
        },
        ze: function() {
            this.ba += 1;
            1 === this.ba ? (this.aa = [],
            this.ka = 0,
            this.Ca.keys = {},
            this.qa.keys = {},
            this.na = 0,
            this.ua = this.app.view.la.yb,
            this.log("beginTransaction() -- beginning new")) : this.log("beginTransaction() -- already in one, bump counter")
        },
        hf: function() {
            bh(this.app.view)
        },
        wc: function() {
            return this.app.view.la.wc()
        },
        xc: function() {
            return this.app.view.la.xc()
        },
        ib: function() {
            this.app.view.ib();
            af(this.app.view);
            this.app.view.ma()
        },
        ig: function() {
            bg(this.app.view.la)
        },
        jg: function(a, b) {
            this.td(a, !b)
        },
        lg: function() {
            this.ba = Math.max(0, this.ba - 1);
            0 === this.ba ? (this.app.view.za(this.aa, !0),
            this.aa = [],
            this.ka = 0,
            this.log("committing irreversible transaction.")) : this.log("delaying transaction commit -- nested call (count=%s)", this.ba)
        },
        ie: function() {
            this.ba = Math.max(0, this.ba - 1);
            0 === this.ba ? (this.app.view.za(this.aa),
            this.aa = [],
            this.ka = 0,
            this.log("committing transaction.")) : this.log("delaying transaction commit -- nested call (count=%s)", this.ba)
        },
        jf: function(a, b) {
            return nh(this.app.view, a, b)
        },
        Ic: function(a) {
            if (0 < a.length)
                return Si(this, this.app.Ic(this.aa, a))
        },
        createNode: function(a, b) {
            this.log("createNode(%s)", a);
            var c = Ti(b);
            return Si(this, this.app.createNode(this.aa, a, c))
        },
        kf: function(a) {
            return Si(this, Ki(this.app, this.aa, a))
        },
        mf: function(a, b) {
            function c(a, b) {
                b.click(function(b) {
                    a.onclick.call(this, d, b)
                })
            }
            a = qg(a);
            Nf(b) || this.error("createToolbar: second paramter must be array");
            var d = this, e;
            e = "javascript:void(0)";
            for (var f = 0; f < b.length; f++) {
                var g = b[f]
                  , h = x("<a>").fb("href", e);
                h.ga("background-repeat", "no-repeat");
                h.ga("background-position", "center");
                h.ga("display", "inline-block");
                Na(h, "zwibbler-button");
                g.toolName && Na(h, g.toolName);
                g.onclick && c(g, h);
                g.title && h.fb("title", g.title);
                g.background ? h.ga("background", g.background) : g.image && h.ga("background-image", "url(" + g.image + ")");
                g.html && (h[0].innerHTML = g.html);
                a.append(h)
            }
            var k = null;
            this.on("tool-changed", function(b) {
                d.log("Tool-changed: %s", b);
                if (k)
                    for (var c = k, e = "zwibbler-selected".split(oa), f = 0, g = c.length; f < g; f++) {
                        var h = c[f];
                        if (1 === h.nodeType && h.className) {
                            for (var v = (" " + h.className + " ").replace(ta, " "), z = 0, W = e.length; z < W; z++)
                                v = v.replace(" " + e[z] + " ", " ");
                            h.className = na.da(v)
                        }
                    }
                k = a.find("." + b);
                Na(k, "zwibbler-selected")
            })
        },
        mg: function(a, b) {
            "string" === typeof b && (b = x("#" + b));
            if ("PageSelector" === a) {
                this.log("Creating page selector");
                var c = new Hg(b,!1,!1);
                Lg(c, !0);
                Kg(c, this);
                Jg(c)
            } else
                return this.xb("Cannot create UI Elemment %s", a),
                !1;
            return !0
        },
        lf: function(a) {
            var b = this.app, c = this.aa, d, e, f, g, h, k;
            if (6 > a.length)
                b.log("newShape: Cannot create shape with fewer than three points."),
                a = void 0;
            else {
                d = new R;
                f = h = 0;
                for (k = a.length - 1; h <= k; f = h += 2)
                    g = b.view.Ua(new A(a[f],a[f + 1])),
                    0 === f ? (d.moveTo(g.x, g.y),
                    e = g) : d.lineTo(g.x, g.y);
                d.lineTo(e.x, e.y);
                d.close();
                a = Ki(b, c, d.Rb())
            }
            return Si(this, a)
        },
        nf: function() {
            var a = nh(this.app.view, !1);
            this.De();
            return a
        },
        pf: function() {
            var a = this.app.Ca;
            a.log("Running %s destructors", a.aa.length);
            for (var b = a.aa.length - 1; 0 <= b; b--)
                a.aa[b]();
            a.aa = null;
            for (var c in this)
                this.hasOwnProperty(c) && delete this[c]
        },
        of: function(a) {
            this.Be(a)
        },
        Be: function(a) {
            this.log("deleteNodes()");
            var b;
            if (b = M(a) || a.length) {
                b = a;
                M(b) && (b = [b]);
                for (var c = 0; c < b.length; c++) {
                    var d = b[c]
                      , e = B(this.app.view.la, d, !1);
                    e && !this.Ca.contains(d) || !e && this.qa.contains(d) || (b.splice(c, 1),
                    --c)
                }
                b = 0 < b.length
            }
            b && (b = this.aa,
            c = a,
            Nf(c) || (c = [c]),
            b.push(new Af(c)),
            Si(this, void 0),
            this.Ca.add(a))
        },
        Ce: function() {
            1 < this.ba && this.xb("deletePage is not implemented inside transactions. Please contact support.");
            if (1 === this.bc())
                this.log("Cannot remove all the pages.");
            else {
                var a = this.app.view.la.bd().id;
                this.aa.push(new Af([a]));
                Si(this)
            }
        },
        De: function() {
            ah(this.app.view)
        },
        Lb: function() {
            if (1 === arguments.length && !1 === arguments[0]) {
                var a = this.app.view.la;
                a.gb = a.na.next
            }
            return this.app.view.la.Lb()
        },
        qf: function(a, b, c) {
            "jpeg" === a && (a = "jpg");
            var d;
            if ("pdf" === a || "svg" === a || "png" === a || "jpg" === a || "bmp" === a || "zwibbler3" === a) {
                "png" === a || "jpg" === a || "bmp" === a || "pdf" === a || "svg" === a ? (a = this.save(a, c),
                "Blob"in window && (d = xg(a))) : a = this.app.view.la.save(a, "data-uri");
                if (d) {
                    if (window.navigator.msSaveOrOpenBlob) {
                        this.log("Using msSaveOrOpenBlob()");
                        window.navigator.msSaveOrOpenBlob(d, b);
                        return
                    }
                    a = window.URL.createObjectURL(d)
                }
                var e = document.createElement("a");
                e.innerHTML = "download";
                e.setAttribute("href", a);
                e.setAttribute("download", b);
                e.style.display = "none";
                document.body.appendChild(e);
                e.click();
                setTimeout(function() {
                    document.body.removeChild(e)
                }, 100)
            } else
                this.log("unsupported format for download: %s", a)
        },
        ma: function(a, b) {
            b = b || {};
            var c = b.page || 0
              , d = this.app.view.la.yb
              , e = Xf(this.app.view.la);
            this.app.view.la.pb(c);
            Jh(this.app.view, a, 0, 0, e.width, e.height);
            this.app.view.la.ma(a);
            this.app.view.la.pb(d)
        },
        pg: function(a) {
            var b = B(this.app.view.la, a, !1);
            b ? b.Id() ? (sh(this.app.view, {}),
            ke(this.app.view.ra, b, b.rect.x, b.rect.y)) : this.log("editNodeText: node %s (%s) cannot contain text.", a, b.type()) : this.log("editNodeText: nodeid %s does not exist.", a)
        },
        rf: function() {
            fh(this.app.view)
        },
        emit: function(a, b) {
            var c, d = this;
            this.da || (this.da = {});
            c = Array.prototype.slice.call(arguments, 1);
            setTimeout(function() {
                var b, f, g, h;
                if (a in d.da)
                    for (h = d.da[a],
                    f = 0,
                    g = h.length; f < g; f++)
                        b = h[f],
                        b.apply(null, c)
            }, 0);
            return this
        },
        Jc: function(a, b) {
            var c;
            this.da || (this.da = {});
            c = Array.prototype.slice.call(arguments, 1);
            var d, e, f, g;
            if (a in this.da)
                for (g = this.da[a],
                e = 0,
                f = g.length; e < f; e++)
                    d = g[e],
                    d.apply(null, c)
        },
        focus: function(a) {
            a ? Oi(this.app) : this.app.focus("canvas")
        },
        rg: function(a) {
            a = this.Fe(a);
            return a.length ? a[0] : null
        },
        Fe: function(a) {
            var b = this.app.view.la, c = [], d;
            for (d in b.Aa)
                if (b.Aa.hasOwnProperty(d)) {
                    var e = b.Aa[d];
                    e.pa("tag") === a && c.push(e)
                }
            a = [];
            for (b = 0; b < c.length; b++)
                a.push(c[b].id);
            return a
        },
        sg: function(a, b, c) {
            var d = null;
            if (3 === arguments.length) {
                if (!M(b) || !M(c)) {
                    this.xb("flip: 2nd and 3rd args must be numbers.");
                    return
                }
                d = new A(b,c)
            }
            var e = this.app.view
              , f = a / 180 * Math.PI;
            0 === e.selection.length && null === e.Fa || e.log("flipSelection: selection is empty");
            Mh(e, Wd(e), f, d)
        },
        sf: function(a, b, c, d) {
            var e = Ui(this, a)
              , f = null;
            if (4 === arguments.length) {
                if (!M(c) || !M(d)) {
                    this.xb("flip: 3rd and 4th args must be numbers.");
                    return
                }
                f = new A(c,d)
            }
            Mh(this.app.view, e, b / 180 * Math.PI, f)
        },
        tg: function(a, b, c) {
            function d(a) {
                a.on("click contextmenu", function(b) {
                    m.call(g, a.ga("background-color"), 1 === b.which);
                    b.preventDefault()
                })
            }
            function e() {
                var c = x("<div>").ga("width", b + "px").ga("height", b + "px").ga("display", "inline-block");
                a.append(c);
                return c
            }
            function f(a, b) {
                var c = document.createElement("canvas");
                c.width = a;
                c.height = a;
                b(c.getContext("2d"), 0, 0, a);
                return e().append(c)
            }
            var g = this;
            a = qg(a);
            c = c || {};
            var h, k, l, m = c.onColour || c.onColor || g.td;
            h = f(b, Fg);
            h.on("click contextmenu", function(a) {
                m.call(g, "transparent", 1 === a.which);
                a.preventDefault()
            });
            h = f(b, Gg);
            h.on("click contextmenu", function(a) {
                if (c.onOpacity)
                    c.onOpacity(.5, 1 === a.which);
                else
                    g.Xe(.5, 1 === a.which);
                a.preventDefault()
            });
            for (k = 0; 1 >= k; k += 1 / 13)
                l = (new V(2,[0, 0, k, 1])).toString(),
                d(e().ga("background-color", l));
            for (k = .3; 1 >= k; k += .7 / 14)
                for (h = 0; 360 > h; h += 22.5)
                    l = (new V(2,[h, .7, k, 1])).toString(),
                    d(e().ga("background-color", l));
            for (h = 0; 360 > h; h += 22.5)
                l = (new V(2,[h, 1, 1, 1])).toString(),
                d(e().ga("background-color", l))
        },
        ce: function() {
            var a = this.app.view;
            a.log("getActiveLayer() -> %s", a.Ja);
            return a.Ja
        },
        ug: function() {
            var a = [];
            this.app.view.la.Zc(function(b) {
                a.push(b.id)
            }, this.jc());
            return a
        },
        tf: function() {
            var a = this.app;
            return null !== a.ua && a.ua in a.view.la.Aa ? B(a.view.la, a.ua).pa("url") : null
        },
        uf: function(a) {
            var b = this.app.view;
            Nf(a) || (a = [a]);
            for (var c = null, d = 0; d < a.length; d++) {
                var e = B(b.la, a[d]);
                e && (null === c ? c = e.Cb().clone() : pd(c, e.Cb()))
            }
            null === c && (c = new P(0,0,0,0));
            return Vi(c)
        },
        jc: function() {
            return this.ba ? this.ua : this.app.view.la.yb
        },
        vf: function() {
            return this.app.view.jb
        },
        wf: function() {
            return this.app.view.mb
        },
        xf: function() {
            var a = this.app.view
              , b = null;
            a.ra.Tb && (b = a.ra.Tb());
            return b
        },
        wg: function(a, b) {
            var c = y(this.app.view, a, b);
            return {
                x: c.x,
                y: c.y
            }
        },
        ad: function() {
            var a = Xf(this.app.view.la);
            return {
                x: a.x,
                y: a.y,
                width: a.width,
                height: a.height
            }
        },
        yf: function() {
            return this.app.view.Ba.fillStyle
        },
        zg: function(a) {
            return this.app.Xa.get(a)
        },
        error: function(a) {
            alert(a)
        },
        xg: function() {
            return Vi(this.app.view.la.Cb())
        },
        yg: function(a, b) {
            return this.we(a, b)
        },
        Bg: function() {
            var a = [], b = {}, c;
            this.app.view.la.Ab(!1, function(d) {
                !(c = Oe(d)) || c in b || (b[c] = 1,
                a.push(c))
            });
            c = this.ce();
            c in b || a.push(c);
            return a
        },
        Ag: function(a) {
            var b = [];
            this.app.view.la.Ab(!1, function(c) {
                Oe(c) === a && b.push(c.id)
            });
            return b
        },
        we: function(a, b) {
            var c = this.app, d, e;
            (d = B(c.view.la, a)) && (e = d.pa(b));
            c.log("GetItemProperty %s: %s=%s", a, b, e);
            return e
        },
        Cg: function(a) {
            var b = B(this.app.view.la, a);
            null === b && this.xb("Error: node %s does not exist", a);
            a = b.Cb();
            return {
                x: a.x,
                y: a.y,
                width: a.width,
                height: a.height
            }
        },
        zf: function(a) {
            return (a = B(this.app.view.la, a)) ? a.type() : ""
        },
        Dg: function(a, b) {
            var c = this.app.view.la.$a(a, b, this.app.view.Ja);
            return c ? c.id : null
        },
        bc: function() {
            var a = this.app.view.la.bc();
            this.ba && (a += this.na);
            return a
        },
        Gd: function(a) {
            var b = B(this.app.view.la, a, !1);
            if ("PathNode" !== b.type())
                return null;
            a = bc(b.Gd().clone());
            var c = [];
            b.Sa();
            for (b = 0; b < a.length; b++) {
                var d = a[b];
                c.push(d.x);
                c.push(d.y)
            }
            return c
        },
        Eg: function(a) {
            a = B(this.app.view.la, a, !1);
            if ("PathNode" !== a.type())
                return null;
            a = a.Gd();
            for (var b = [], c = [], d = 0; d < a.ea.length; ) {
                switch (a.ea[d]) {
                case Wb:
                    c = [{
                        x: a.ea[d + 1],
                        y: a.ea[d + 2]
                    }];
                    b.push(c);
                    break;
                case Xb:
                    c.push({
                        x: a.ea[d + 1],
                        y: a.ea[d + 2]
                    })
                }
                d += $b[a.ea[d]]
            }
            return b
        },
        ag: function() {
            this.app.view.Vc = this.app.qa;
            this.app.Fc = !0;
            return this.app.qa.ha[0]
        },
        vg: function() {
            return this.app.view.scale
        },
        Fg: function(a, b, c, d) {
            var e;
            e = oe(this.app.view, a, b);
            if (void 0 === c)
                return {
                    x: e.x,
                    y: e.y
                };
            a = oe(this.app.view, a + c, b + d);
            return Vi(new P(e.x,e.y,a.x - e.x,a.y - e.y))
        },
        Gg: function() {
            return this.app.view.Ka
        },
        Bf: function() {
            return this.app.view.Ba.strokeStyle
        },
        kc: function(a, b) {
            var c = B(this.app.view.la, a, !1);
            return c ? c.kc(b) : null
        },
        bh: function(a, b, c) {
            var d = B(this.app.view.la, a, !1);
            if (!d)
                return this.log("setEditHandle: node %s doesn't exist.", a),
                !1;
            if ("PathNode" !== d.type())
                return this.log("setEditHandle: node %s is not a PathNode.", a),
                !1;
            d = d.pa("commands");
            b = b / 3;
            var e = 0, f = [], g = new A(0,0), h = !1, k = 0, l, m;
            for (l = 0; l < d.length; ) {
                m = d[l];
                if (7 === m) {
                    h = !0;
                    break
                }
                k += 1;
                l += sf[d[l]] + 1
            }
            0 === b && h && (b = k - 1);
            for (l = 0; l < d.length; e++) {
                m = d[l];
                h = !1;
                b === e && (2 === m && "line_to" === c ? (f.push(1, d[l + 1], d[l + 2]),
                h = !0) : 1 === m && "quadratic_to" === c && (f.push(2, d[l + 1], d[l + 2], (g.x + d[l + 1]) / 2, (g.y + d[l + 2]) / 2),
                h = !0));
                g = new A(d[l + 1],d[l + 2]);
                if (!h)
                    for (m = 0; m < 1 + sf[d[l]]; m++)
                        f.push(d[l + m]);
                l += sf[d[l]] + 1
            }
            d = f;
            if (!d)
                return this.log("setEditHandle: failed"),
                !1;
            this.ee(a, "commands", d);
            return !0
        },
        Af: function(a) {
            return Fh(this.app.view, a)
        },
        Ig: function() {
            return Vi(ib(this.app.view))
        },
        xb: function(a, b) {
            for (var c = arguments[0].split("%s"), d = [], e = 0; e < c.length; e++)
                d.push(c[e]),
                e < c.length - 1 && d.push(JSON.stringify(arguments[e + 1]));
            this.log(d.join(""));
            throw {
                message: d,
                toString: function() {
                    return d
                }
            };
        },
        ed: function(a) {
            var b = this.app.view.la.rb;
            this.aa.push(new E("PageNode",{},this.app.view.la.root.id,a));
            Si(this, b);
            this.ba && (this.na += 1);
            return a
        },
        me: function(a) {
            return this.app.view.la.me(a)
        },
        load: function(a, b) {
            1 === arguments.length && (b = arguments[0],
            a = "zwibbler3");
            var c;
            "list" === a ? (Ji(this.app, Bi(b)),
            c = void 0) : c = Ji(this.app, zi(b));
            return c
        },
        Cf: function(a) {
            var b = this;
            M(a) || this.error("lockUpdates: Expected a number");
            this.Ka && clearTimeout(this.Ka);
            this.Ka = setTimeout(function() {
                Lh(b.app.view, !1)
            }, a);
            Lh(b.app.view, !0)
        },
        Df: function() {
            hh(this.app.view)
        },
        Ef: function() {
            gh(this.app.view)
        },
        Ld: function() {
            this.app.Ld();
            Ri(this)
        },
        Ff: function() {
            this.Ac(Math.min(this.jc() + 1, this.bc() - 1))
        },
        on: function(a, b) {
            "draw" === a ? this.Xb = b : a in this.da ? this.da[a].push(b) : this.da[a] = [b];
            return this
        },
        Sg: function(a) {
            "function" === typeof a || this.xb("Error: onComplete needs a function argument.");
            var b = this.app.view;
            b.request.aa ? (b.log("Formatting in progress; will call function soon"),
            Fb(b.request, a)) : (b.log("Format already done; call function in 1 tick"),
            setTimeout(a, 0))
        },
        Gf: function(a) {
            oh(this.app.view, a)
        },
        Ug: function() {
            this.Ac(Math.max(this.jc() - 1, 0))
        },
        Hf: function(a, b) {
            var c = [], d;
            if (M(a))
                c.push(a);
            else if (Nf(a))
                for (d = 0; d < a.length; d++)
                    M(a[d]) ? c.push(a[d]) : this.error("print(): pageSpec must be array of numbers");
            else if (!a)
                for (d = 0; d < this.bc(); d++)
                    c.push(d);
            b = b ? Wi(this, b) : Wi(this, this.ad());
            var e = this.jc()
              , f = document.createElement("canvas");
            f.width = b.width;
            f.height = b.height;
            var g = f.getContext("2d");
            g.translate(-b.x, -b.y);
            var h = window.open("about:blank", "_blank");
            h.document.write("<!DOCTYPE html><html><body>");
            for (d = 0; d < c.length; d++)
                this.Ac(c[d]),
                Jh(this.app.view, g, b.x, b.y, b.width, b.height),
                this.app.view.la.ma(g),
                0 < d ? h.document.write("<div style='page-break-before:always'>") : h.document.write("<div>"),
                h.document.write("<img style='width:100%' src='"),
                h.document.write(f.toDataURL()),
                h.document.write("'></div>"),
                g.clearRect(b.x, b.y, b.width, b.height);
            h.document.write("</body></html>");
            h.document.close();
            h.focus();
            h.print();
            h.close();
            this.Ac(e)
        },
        fc: function() {
            this.app.view.fc()
        },
        If: function(a) {
            this.app.view.ma(a)
        },
        resize: function() {
            var a = this;
            setTimeout(function() {
                Di(a.app, !0)
            }, 1)
        },
        save: function(a, b) {
            a = a || "zwibbler3";
            var c = {
                jpeg: "image/jpeg",
                jpg: "image/jpeg",
                png: "image/png",
                bmp: "image/bmp",
                svg: "image/svg+xml",
                pdf: "application/pdf"
            };
            b = Wi(this, b || this.ad());
            switch (a) {
            case "list":
                return this.app.view.la.save("list", "object");
            case "png":
            case "jpeg":
            case "jpg":
            case "bmp":
            case "svg":
            case "pdf":
                return Li(this.app, c[a], b);
            case "zwibbler3":
                return this.app.view.la.save("zwibbler3", "string");
            case "image/png":
            case "image/jpeg":
            case "image/bmp":
                for (var d = Li(this.app, a, b), d = d.substr(d.indexOf(",") + 1), c = ["base64"], e = 0; e < c.length; e++)
                    d = wc[c[e]](d);
                return d;
            default:
                return "Unsupported format: " + a
            }
        },
        $g: function(a) {
            x(this.app.view.canvas).ga("cursor", a)
        },
        Kf: function(a) {
            a = Ui(this, a);
            eh(this.app.view, a);
            af(this.app.view);
            this.app.view.ma()
        },
        Lf: function() {
            ch(this.app.view)
        },
        xe: function(a) {
            var b = this.app.view;
            b.log("setActiveLayer(%s)", a);
            b.Ja = a;
            b.ib();
            af(b);
            b.ma()
        },
        Yg: function(a, b) {
            var c = this.app, d, e, f, g;
            gc(c.da);
            b && (d = c.da,
            d.ba = b,
            d.aa = b);
            g = [];
            e = 0;
            for (f = a.length; e < f; e++)
                d = a[e],
                "string" === typeof d ? g.push(hc(c.da, d, d)) : g.push(hc(c.da, d.small, d.large, d.tooltip))
        },
        Zg: function(a, b) {
            "defaultPaperSize" === a && this.Nd(b);
            return qc(this.app.ia, a, b)
        },
        td: function(a, b) {
            this.app.view.Nb(a, b)
        },
        Ac: function(a) {
            this.ba ? (this.log("Set page to %s inside transaction", a),
            this.aa.push(new Lf(a)),
            this.ua = a) : this.app.view.pb(a)
        },
        Mf: function(a) {
            var b = this.app.view;
            a ? (b.log("Setting a custom background function."),
            b.tb = a) : b.log("Clearing custom background function.")
        },
        de: function(a, b) {
            !M(a) && null !== a || !M(b) && null !== b ? alert("setDocumentSize: width/height must be numbers") : Rh(this.app.view, a, b)
        },
        Ve: function(a, b) {
            !M(a) && null !== a || !M(b) && null !== b ? alert("setDocumentSize: width/height must be numbers") : Si(this, Rh(this.app.view, a, b, this.aa))
        },
        ah: function(a, b) {
            var c = B(this.app.view.la, a);
            c || this.xb("setDomElement: Node %s does not exist", a);
            "DomNode" !== c.type() && this.xb("setDomElement: Node %s is not a DomNode. It is %s", a, c.type());
            c.We(b);
            this.app.ub.push(b)
        },
        fh: function(a, b) {
            Of(a) && Of(b) ? (this.ce() === a && this.xe(b),
            this.app.view.la.Ab(!1, function(c) {
                Oe(c) === a && c.setProperty("layer", b)
            })) : this.xb("setLayerName() needs string arguments.")
        },
        Nd: function(a) {
            var b = null, c = null, d, e = !0, f = !1;
            if (2 === arguments.length)
                M(arguments[0]) && M(arguments[1]) ? (d = arguments[0],
                b = arguments[1]) : Of(arguments[0]) && "boolean" === typeof arguments[1] ? (c = arguments[0],
                f = arguments[1]) : e = !1;
            else if (1 === arguments.length && Of(arguments[0]))
                for (var g = arguments[0].split(" "), h = 0; h < g.length; h++)
                    "landscape" === g[h] ? f = !0 : "portrait" === g[h] ? f = !1 : c = g[h];
            if (!1 === e)
                return this.log("Bad arguments to setPaperSize()."),
                !1;
            if (null === c)
                return this.de(d, b),
                !0;
            switch (c.toLowerCase()) {
            case "letter":
                d = 816;
                b = 1056;
                break;
            case "legal":
                d = 816;
                b = 1344;
                break;
            case "11x17":
                d = 1056;
                b = 1632;
                break;
            case "tabloid":
                d = 1056;
                b = 1632;
                break;
            case "a0":
                d = 841 / 25.4 * 96;
                b = 1189 / 25.4 * 96;
                break;
            case "a1":
                d = 594 / 25.4 * 96;
                b = 841 / 25.4 * 96;
                break;
            case "a2":
                d = 420 / 25.4 * 96;
                b = 594 / 25.4 * 96;
                break;
            case "a3":
                d = 297 / 25.4 * 96;
                b = 420 / 25.4 * 96;
                break;
            case "a4":
                d = 210 / 25.4 * 96;
                b = 297 / 25.4 * 96;
                break;
            case "none":
                b = d = null;
                break;
            default:
                return this.log("Invalid paper size: %s", c),
                !1
            }
            f && (c = d,
            d = b,
            b = c);
            this.de(d, b);
            return !0
        },
        dh: function(a, b) {
            var c = this.app, d, e, f, g;
            gc(c.na);
            g = [];
            b && (d = c.na,
            d.ba = b,
            d.aa = b);
            e = 0;
            for (f = a.length; e < f; e++)
                d = a[e],
                "string" === typeof d ? g.push(hc(c.na, d, d)) : g.push(hc(c.na, d.small, d.large, d.tooltip))
        },
        eh: function(a, b, c) {
            this.ee(a, b, c)
        },
        Nf: function(a, b) {
            if (2 !== arguments.length)
                throw "Error: setNodeProperties takes 2 arguments.";
            var c = this.aa, d = a, e;
            this.app.log("External app setNodeProperty %s: %s", d, b);
            Nf(d) || (d = [d]);
            for (e in b)
                b.hasOwnProperty(e) && c.push(new me(d,e,b[e]));
            return Si(this, void 0)
        },
        ee: function(a, b, c) {
            var d = this.aa;
            this.app.log("External app setItemProperty %s: %s=%s", a, b, c);
            var e;
            Nf(a) ? e = a : e = [a];
            d.push(new me(e,b,c));
            return Si(this, void 0)
        },
        gh: function(a, b) {
            Nf(a) || (a = [a]);
            for (var c = 0; c < a.length; c++) {
                var d = B(this.app.view.la, a[c], !0);
                d && d.pc(!b)
            }
            this.app.view.ma()
        },
        Xe: function(a, b) {
            var c = this.app.view;
            c.ra.ec ? (c.log("Simulating opacity change %s", a),
            c.ra.ec(a, b)) : c.log("An opacity is not needed for this tool.")
        },
        Pf: function(a) {
            var b = this.app.view;
            b.ub = a;
            a = ph(b);
            b.Na = -a.x;
            b.La = -a.y;
            nb(b);
            b.ma()
        },
        ih: function(a) {
            "object" === typeof a && M(a.x) && M(a.y) && M(a.width) && M(a.height) || this.xb("setViewRect: arg must be an object with numeric x, y, width, height properties");
            0 !== a.width && 0 !== a.height || this.xb("setViewRect: width and height must be non-zero.");
            kb(this.app.view, Wi(this, a))
        },
        jh: function(a) {
            M(a) || "page" === a || "width" === a ? Eh(this.app.view, a) : this.log("setZoom: invalid parameter.")
        },
        vd: function(a, b) {
            this.app.view.vd(a, b)
        },
        ye: function(a, b, c) {
            this.log("Translate node %s by %s,%s actions=%s", a, b, c, this.aa.length);
            var d = this.aa;
            Nf(a) || (a = [a]);
            d.push(new Ud(a,new F(b,c)));
            return Si(this, !0)
        },
        Wg: function(a) {
            var b = Math.round(a / (Math.PI / 2));
            a = b * Math.PI / 2;
            var b = 0 === b % 2
              , c = Xi(this)
              , d = this.ad()
              , e = d.width / 2
              , f = d.height / 2;
            this.ze();
            for (var g = 0; g < c.length; g++)
                this.Ue(c[g], a, e, f),
                b || this.ye(c[g], f - e, e - f);
            b || this.Ve(d.height, d.width);
            this.ie()
        },
        Ue: function(a, b, c, d) {
            this.log("Rotate node %s by %s around (%s,%s) actions=%s", a, b / Math.PI * 180, c, d, this.aa.length);
            var e = B(this.app.view.la, a);
            null === e && this.xb("rotateNode: Node %s doesn't exist", a);
            4 > arguments.length && (e = nd(e.Cb()),
            c = e.x,
            d = e.y);
            this.aa.push(new Ud([a],new qd(b,c,d)));
            return Si(this, !0)
        },
        Jf: function(a, b, c, d, e) {
            this.log("Scale node %s by %s,%s actions=%s", a, b, c, this.aa.length);
            this.aa.push(new Ud([a],new jb(b,c,d || 0,e || 0)));
            return Si(this, !0)
        },
        Of: function(a, b, c, d, e, f, g) {
            7 !== arguments.length && this.xb("setNodeTransform: requires 7 arguments");
            this.log("setNodeTransform(id=%s %s %s %s %s %s %s %s)", a, b, c, d, e, f, g);
            var h = this.aa
              , k = a;
            Nf(k) || (k = [k]);
            var l;
            l = new Q(b,d,c,e,f,g);
            h.push(new me(k,"matrix",l));
            return Si(this, !0)
        },
        cb: function() {
            this.app.view.cb()
        },
        Qf: function(a) {
            this.aa.push(new Cf(a));
            return Si(this, void 0)
        },
        Rf: function(a, b) {
            function c() {}
            function d() {}
            var e = new Zh(this.app.Zb,b || "Working")
              , f = new XMLHttpRequest
              , g = new FormData(a);
            f.upload.addEventListener("progress", function(a) {
                e.update(a.loaded / a.total)
            }, !1);
            f.addEventListener("load", function() {
                200 === f.status ? (e.done(),
                d(f.response, f)) : (e.error("Error"),
                c(f, f))
            }, !1);
            f.addEventListener("error", function() {
                e.error("Error");
                c(f, f)
            }, !1);
            f.addEventListener("abort", function() {
                e.error("Aborted");
                c(f)
            }, !1);
            f.open(a.method, a.action);
            f.send(g);
            var h = {
                success: function(a) {
                    d = a;
                    return h
                },
                error: function(a) {
                    c = a;
                    return h
                }
            };
            return h
        },
        ph: function(a, b) {
            Sh(this.app.view, Ti(a), b)
        },
        $e: function(a, b) {
            2 === arguments.length ? Vh(this.app.view, {
                lineWidth: b,
                strokeStyle: a
            }) : Vh(this.app.view, Ti(arguments[0]))
        },
        qh: function(a) {
            Ph(this.app.view, Ti(a))
        },
        rh: function(a) {
            ih(this.app.view, Ti(a))
        },
        sh: function(a) {
            "object" === typeof a || this.error("useCustomTool(): requires an object as argument.");
            C(this.app.view, new Yh(this.app.view,a))
        },
        Sf: function(a) {
            var b = this.app.view
              , c = B(b.la, a, !1);
            c ? c.dd() ? (G(b),
            b.ib(),
            af(b),
            b.Fa = c,
            b.ma()) : b.log("useEditHandleTool: nodetype %s has no edit mode", c.type()) : b.log("useEditHandleTool: node %s doesn't exist.", a)
        },
        Tf: function() {
            Ph(this.app.view)
        },
        th: function(a, b, c) {
            "object" === typeof a ? (a = Ti(a),
            c = b) : a = {
                strokeStyle: a,
                lineWidth: b
            };
            Th(this.app.view, a, c || "freehand")
        },
        Ch: function(a) {
            var b = this.app.view;
            C(b, new bb(b,a))
        },
        uh: function(a, b) {
            jh(this.app.view, Ti(a), b)
        },
        vh: function() {
            var a = this.app.view;
            C(a, new lb(a))
        },
        wh: function() {
            G(this.app.view)
        },
        Uf: function(a, b, c) {
            var d = this.app.view;
            c = c || 1;
            var e;
            e = new R;
            for (var f = 0; f <= a; f++) {
                var g = 50 * Math.sin(b)
                  , h = 50 * -Math.cos(b);
                f & 1 && (g *= c,
                h *= c);
                0 === f ? e.moveTo(g, h) : e.lineTo(g, h);
                b += 2 * Math.PI / a
            }
            e.close();
            a = {
                commands: e.Rb(),
                fillStyle: d.jb,
                strokeStyle: d.mb,
                seed: Math.round(65535 * Math.random()),
                lineWidth: d.Ba.lineWidth,
                sloppiness: d.Ba.sloppiness,
                layer: d.Ja,
                wrap: d.ia.get("multilineText"),
                fontSize: d.ia.get("defaultFontSize")
            };
            d.log("Create an item on layer %s", d.Ja);
            C(d, new ae(d,"PathNode",a,100,100,"circle"))
        },
        xh: function(a) {
            Th(this.app.view, Ti(a), "quadratic")
        },
        Vf: function(a) {
            Qh(this.app.view, Ti(a))
        },
        yh: function(a) {
            Qh(this.app.view, x.aa({}, {
                roundRadius: this.app.ia.get("defaultRoundRectRadius")
            }, a || {}))
        },
        zh: function(a, b) {
            Uh(this.app.view, {
                strokeStyle: a,
                lineWidth: b
            })
        },
        Wf: function(a, b, c, d, e) {
            var f = this.app.view;
            b = Ti(b);
            C(f, new ae(f,a,b,c,d,e))
        },
        Xf: function() {
            var a = this.app.view;
            C(a, new xe(a))
        },
        Bh: function(a) {
            var b = this.app.view;
            b.ia.get("readOnly") ? b.log("readOnly mode: Ignoring tool click.") : C(b, new vf(b,"stampline",a))
        },
        Ah: function(a) {
            Qh(this.app.view, Ti(a))
        },
        Dh: function(a) {
            sh(this.app.view, Ti(a))
        },
        Yf: function(a) {
            var b = this.app.view;
            a = Ti(a);
            C(b, new se(b,a))
        },
        Zf: function() {
            qh(this.app.view)
        },
        $f: function() {
            rh(this.app.view)
        }
    };
    function Ui(a, b) {
        var c = [];
        M(b) && (b = [b]);
        for (var d = 0; d < b.length; d++) {
            var e = B(a.app.view.la, b[d], !1);
            e && c.push(e)
        }
        return c
    }
    function Ri(a) {
        var b = a.app.ia.get("defaultPaperSize");
        a.log("onNewDocument()");
        "none" !== b && a.Nd(b)
    }
    function Wi(a, b) {
        "object" !== typeof b && a.error("Error: Rectangle object expected.");
        b = new P(b.x || 0,b.y || 0,b.width || 0,b.height || 0);
        ld(b);
        return b
    }
    function Vi(a) {
        return {
            x: a.x,
            y: a.y,
            width: a.width,
            height: a.height
        }
    }
    function Xi(a) {
        var b = [];
        a.app.view.la.Ab(!1, function(a) {
            b.push(a.id)
        });
        return b
    }
    function Si(a, b) {
        if (!a.ba)
            return a.log("Not in a transaction. committing immediately. id=%s", b),
            a.ie(),
            b;
        if ("number" === typeof b)
            return a.ka += 1,
            a.log("id=%s numCreated=%s realid=%s", b, a.ka, b + a.ka - 1),
            a.qa.add(b + a.ka - 1),
            b + a.ka - 1
    }
    function Ti(a) {
        a = a || {};
        var b = {}, c;
        for (c in a)
            if (a.hasOwnProperty(c)) {
                var d = a[c];
                "matrix" === c ? (d = new Q(d),
                b.matrix = d) : b[c] = d
            }
        return b
    }
    ;"jQuery"in window && (window.jQuery.fn.zwibbler = function(a) {
        a = a || {};
        var b = null;
        this.each(function(c, d) {
            d.zwibbler && x(d).empty();
            b = new X(x(d),a);
            d.zwibbler = b
        });
        return b
    }
    ,
    window.jQuery.fn.zwibblerContext = function() {
        return this[0].zwibbler
    }
    );
    var Qi = []
      , cf = {};
    window.Zwibbler = {
        create: function(a, b) {
            "string" === typeof a && 0 < a.length && "." !== a.charAt(0) && "#" !== a.charAt(0) && (a = "#" + a);
            var c = qg(a);
            return null === c ? (alert("Zwibbler.create: Cannot find an element with id " + a),
            null) : new X(x(c),b)
        },
        addButton: function(a) {
            for (var b = ["name", "image", "onclick"], c = 0; c < b.length; c++)
                if (!(b[c]in a))
                    return alert("Zwibbler.addButton: missing " + b[c]),
                    !1;
            Qi.push(a);
            return !0
        },
        addCustomNode: function(a, b) {
            cf[a] = b
        },
        Dialog: function(a, b) {
            function c() {
                var a = d.outerWidth()
                  , b = d.outerHeight()
                  , c = yg();
                d.offset({
                    left: c.x + c.width / 2 - a / 2,
                    top: c.y + c.height / 2 - b / 2
                })
            }
            var d = qg(a);
            null === d[0].parentNode && x(document.body).append(d);
            "static" === d.ga("position") && d.ga("position", "absolute");
            d.ga("display", "none");
            b = b || {};
            var e = pe(d[0])
              , f = new Nc("transparent");
            d.ga("z-index", "" + e);
            f.aa = e;
            f.insertBefore = d;
            var g = b.showNear
              , h = b.showHow
              , k = {
                hide: function() {
                    f.sa();
                    d.sa();
                    if (k.onhide)
                        k.onhide();
                    x(window).Tc("resize", c)
                },
                show: function(a, b) {
                    var e, r;
                    2 === arguments.length && M(a) && M(b) ? (e = a,
                    r = b) : (a = a || g,
                    b = b || h);
                    d.show();
                    var u = d.outerWidth()
                      , w = d.outerHeight();
                    if (void 0 !== e) {
                        var v = yg();
                        e = {
                            left: e,
                            top: r
                        };
                        e.left = Math.min(e.left, v.x + v.width - u - 2);
                        e.top = Math.min(e.top, v.y + v.height - w - 3);
                        d.offset(e)
                    } else
                        a && b ? (v = qg(a),
                        u = d,
                        e = b,
                        w = v.offset(),
                        e = e.toLowerCase().split(" "),
                        2 !== e.length && (e = ["tl", "tl"]),
                        0 <= e[0].indexOf("b") && (w.top += v.outerHeight()),
                        0 <= e[0].indexOf("r") && (w.left += v.outerWidth()),
                        0 <= e[1].indexOf("b") && (w.top -= u.outerHeight()),
                        0 <= e[1].indexOf("r") && (w.left -= u.outerWidth()),
                        u.ga("position", "absolute"),
                        v = yg(),
                        e = u.width(),
                        r = u.height(),
                        w.left = Math.min(w.left, v.x + v.width - e),
                        w.top = Math.min(w.top, v.y + v.height - r),
                        u.offset(w)) : (x(window).on("resize", c),
                        c());
                    f.show(k.hide);
                    if (k.onshow)
                        k.onshow()
                },
                onshow: b.onshow,
                onhide: b.onhide
            };
            return k
        },
        ColourWheel: function(a, b) {
            a = x(a)[0];
            var c = new Qg(a,b)
              , d = new J;
            c.Ka = function(a) {
                d.emit("change", a)
            }
            ;
            return {
                on: function(a, b) {
                    d.on(a, b)
                },
                colour: function() {
                    if (arguments.length)
                        Sg(c, arguments[0]);
                    else
                        return c.ba.toString()
                }
            }
        },
        SlidingPanel: function(a, b) {
            b = b || {};
            var c = b.autohide, d;
            d = "string" === typeof a ? x("#" + a) : x(a);
            var e = new Pc(d);
            if (b.onshow)
                e.on("show", b.onshow);
            if (b.onhide)
                e.on("hide", b.onhide);
            return {
                show: function(a) {
                    e.show(a, c)
                },
                hide: function() {
                    e.sa()
                }
            }
        },
        createPreview: function(a, b) {
            return window.Zwibbler.render(a, b)
        },
        render: function(a, b) {
            function c() {
                var a = q.Cb()
                  , b = 1
                  , c = 0
                  , r = 0;
                f && (a.y = f);
                k && (a.height = k - a.y);
                g && (a.x = g);
                h && (a.width = h - a.x);
                d && e ? b = Math.min(d / a.width, e / a.height) : d ? (b = d / a.width,
                e = a.height * b) : e ? (b = e / a.height,
                d = a.width * b) : (d = a.width,
                e = a.height);
                a.width * b < d && (c = d / 2 - a.width * b / 2);
                a.height * b < e && (r = e / 2 - a.height * b / 2);
                c -= a.x * b;
                r -= a.y * b;
                l.width = Math.ceil(d);
                l.height = Math.ceil(e);
                m.translate(c, r);
                m.scale(b, b);
                q.ma(m)
            }
            b = b || {};
            var d = b.width || 0
              , e = b.height || 0
              , f = b.top || 0
              , g = b.left || 0
              , h = b.right || 0
              , k = b.bottom || 0
              , l = rg(null)
              , m = l.getContext("2d")
              , q = zi(a)
              , r = new Ib;
            q.format(m, r);
            r.on("reformat", function(a) {
                ce(q, a.id)
            });
            if (r.aa)
                r.on("done", function() {
                    q.format(m, r);
                    c()
                });
            else
                c();
            return l
        },
        parseColour: function(a) {
            a = pf(a);
            return {
                r: a.values[0],
                g: a.values[1],
                b: a.values[2],
                a: a.values[3]
            }
        },
        makeColour: function(a) {
            return (new V(0,[a.r, a.g, a.b, a.a])).toString()
        },
        getAbsoluteUrl: function(a) {
            var b = document.createElement("a");
            b.href = a;
            return b.href
        },
        base64Encode: function(a) {
            return xc("base64", a)
        },
        fonts: new lg,
        addFont: function(a, b) {
            window.Zwibbler.fonts.add(b, a)
        },
        PathCommands: function(a) {
            return new R(a)
        },
        CommandsFromSvgPath: function(a) {
            var b = new R;
            Nd(b, a);
            return b.Rb()
        },
        getImageSize: function(a, b) {
            var c = document.createElement("img");
            c.src = a;
            c.onload = function() {
                b(c.naturalWidth, c.naturalHeight, c)
            }
        },
        setColourOpacity: function(a, b) {
            return de(a, b)
        }
    };
    var Yi;
    function Y() {
        var a, b;
        if ("G_vmlCanvasManager"in window || document.createElement("canvas").getContext) {
            b = {
                showMenu: !1,
                showPropertyPanel: !0,
                showColourPanel: !0,
                fonts: ["Arial", "Times New Roman", "FG Virgil", "Stinky Kitty"],
                defaultFont: "FG Virgil",
                showShapeBrushTool: !0,
                imageFolder: "http://zwibbler.com"
            };
            this.ka = !0;
            a = lc();
            "1.0" === a.component && (this.ka = b.showPropertyPanel = !1);
            window.Zwibbler.addButton({
                name: "clipart",
                image: "http://zwibbler.com/wd-image.png",
                onclick: p(function() {
                    return this.Qe()
                }, this)
            });
            this.Za = window.Zwibbler.create("draw", b);
            this.Ta = new Bc;
            this.file = {
                id: -1,
                Jb: 0,
                name: "Drawing created on " + (new Date).toLocaleDateString()
            };
            this.ba = new cc(x("#menubar"));
            this.ma = new cc(x("#draw"));
            x(window).resize(p(function() {
                return this.wb()
            }, this));
            Zi(this);
            this.wb();
            x("#createaccount").click(p(function() {
                return $i(this)
            }, this));
            x("#logout-a").click(p(function() {
                return Kc(this.Ta, p(function(a) {
                    if ("ok" === a)
                        return Zi(this)
                }, this))
            }, this));
            aj(this);
            this.da = new Gb;
            this.da.on("saveToString", p(function(a, b) {
                return b([this.Za.save("zwibbler3")])
            }, this));
            this.da.on("loadFromString", p(function(a, b) {
                this.Za.load(null, a.sourceText);
                return b([])
            }, this));
            this.da.on("saveToTemporaryFile", p(function(a, b) {
                var e, f;
                f = a.type;
                e = this.Za.save("zwibbler3");
                return Ec(f, e, p(function(a, c) {
                    return "ok" === a ? b([c.url]) : alert(a)
                }, this))
            }, this));
            x(window).bind("beforeunload", p(function() {
                return fa("zwibbler-saved", this.Za.save("zwibbler3"))
            }, this));
            if (b = ga("zwibbler-saved"))
                try {
                    this.Za.load(null, b)
                } catch (c) {}
            a.defaultPaperSize && this.Za.Nd(a.defaultPaperSize);
            this.na = new bj(this,this.Ta);
            "kids"in lc() && this.Me()
        } else
            document.getElementById("main").style.display = "none",
            document.getElementById("no-canvas").style.display = "block"
    }
    n = Y.prototype;
    n.Me = function() {
        var a, b, c;
        this.ka = !1;
        this.ma.sa();
        this.ma = new cc(x("<div>"));
        document.body.appendChild(this.ma.ha[0]);
        this.ma.ha.fb("id", "kidsdiv");
        this.Za = window.Zwibbler.create("kidsdiv", {
            showToolbar: !1,
            showPropertyPanel: !1,
            useTouch: !0
        });
        this.ma.ha[0].webkitRequestFullScreen && this.ma.ha[0].webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
        this.aa = x("<img>");
        this.ma.ha.append(this.aa);
        this.aa.fb("src", "penguin.png");
        this.aa.ga("pointer-events", "none");
        this.aa.ga("position", "absolute");
        this.aa.ga("left", "0");
        this.aa.ga("right", "0");
        this.Za.$e("rgba(0,0,255,1.0)", 20);
        "Audio"in window ? (c = [new window.Audio("dream-harp-01.wav"), new window.Audio("dream-harp-06.wav"), new window.Audio("dream-harp-09.wav")],
        a = -1,
        b = p(function() {
            if (-1 === a || c[a].ended)
                return a += 1,
                a = a % c.length,
                this.log("Playing audio %s!", a),
                c[a].play()
        }, this),
        x(this.Za.app.view.canvas).bind("touchmove", b),
        x(this.Za.app.view.canvas).bind("mousemove", b)) : this.log("No Audio support!");
        return this.wb()
    }
    ;
    function aj(a) {
        var b;
        b = document.getElementById("uploadtarget");
        x(b).bind("load", p(function() {
            var a, d, e, f, g, h;
            a = b.contentDocument.body.innerHTML;
            h = a.indexOf("0123456789");
            d = a.lastIndexOf("9876543210");
            if (-1 === h)
                alert("Error opening file: Cannot find start marker");
            else if (-1 === d)
                alert("Error opening file: Cannot find end marker");
            else {
                a = a.substr(h + 10, d - h - 10);
                d = "";
                var k, l, m, q, r;
                h = 0;
                for (a = a.replace(/[^A-Za-z0-9\-_\=\+\/]/g, ""); h < a.length; )
                    k = jc[a.charAt(h++)],
                    l = jc[a.charAt(h++)],
                    q = jc[a.charAt(h++)],
                    r = jc[a.charAt(h++)],
                    k = k << 2 | l >> 4,
                    l = (l & 15) << 4 | q >> 2,
                    m = (q & 3) << 6 | r,
                    d += String.fromCharCode(k),
                    64 !== q && (d += String.fromCharCode(l)),
                    64 !== r && (d += String.fromCharCode(m));
                a = d;
                d = "";
                for (r = q = h = 0; h < a.length; )
                    q = a.charCodeAt(h),
                    128 > q ? (d += String.fromCharCode(q),
                    h++) : 191 < q && 224 > q ? (r = a.charCodeAt(h + 1),
                    d += String.fromCharCode((q & 31) << 6 | r & 63),
                    h += 2) : (r = a.charCodeAt(h + 1),
                    d += String.fromCharCode((q & 15) << 12 | (r & 63) << 6 | a.charCodeAt(h + 2) & 63),
                    h += 3);
                a = d;
                O && (this.log("Hide working dialog"),
                O.sa());
                try {
                    return g = window.JSON.parse(a),
                    f = g.name,
                    9 <= f.length && ".zwibbler" === f.substr(f.length - 9) && (f = f.substr(0, f.length - 9)),
                    e = {
                        id: -1,
                        name: f,
                        Jb: 0,
                        data: g.data
                    },
                    cj(this, e)
                } catch (u) {
                    return alert("Error opening file: " + u)
                }
            }
        }, a));
        document.getElementById("fileinput").onchange = p(function() {
            O.sa();
            return document.getElementById("uploadform").submit()
        }, a)
    }
    n.log = t("FrontEnd");
    n.wb = function() {
        var a, b, c, d;
        this.log("onResize!");
        d = x(window).width() - 0;
        c = x(window).height() - 0;
        a = this.ba.height();
        this.ka ? this.ba.show() : (a = 0,
        this.ba.sa());
        b = 0 + a;
        a = c - b;
        this.ba.width(d);
        this.ba.moveTo(0, 0);
        this.ma.moveTo(0, b);
        this.ma.width(d);
        this.ma.height(a);
        this.aa && (this.aa.ga("max-width", d + "px"),
        this.aa.ga("max-height", "" + (c - 90) + "px"));
        this.log("width/height=(%s,%s)", d, a);
        return this.Za.resize()
    }
    ;
    n.cf = function(a) {
        this.Ta.aa(a);
        return dj(this, null)
    }
    ;
    n.Og = function() {
        var a, b;
        a = "" + Ma(x("#signin-username"));
        b = "" + Ma(x("#signin-password"));
        Mc(this.Ta, a, b, p(function(a, b) {
            if ("ok" === a)
                return dj(this, b);
            x("#loginerror").text(a);
            return this.wb()
        }, this))
    }
    ;
    function dj(a, b) {
        x("#signin").sa();
        x("#logout").show();
        null !== b && -1 !== a.file.id && a.file.id in b && (a.file.id = b[a.file.id]);
        return a.Za.resize()
    }
    function Zi(a) {
        x("#signin").show();
        x("#logout").sa();
        a.file.id = -1;
        a.file.Jb = 0;
        return a.Za.resize()
    }
    function cj(a, b) {
        var c;
        a.file = b;
        try {
            c = eval("(" + b.data + ")"),
            b.data = JSON.stringify(c)
        } catch (d) {}
        a.Za.load(null, b.data);
        return a.Za.Lb(!1)
    }
    n.Rg = function() {
        this.Za.Lb() && !confirm("Lose your changes?") || this.Za.Ld()
    }
    ;
    n.Qe = function() {
        this.log("Showing clipartdialog");
        this.na.show()
    }
    ;
    n.Xg = function() {
        var a;
        a = this.Za.save("zwibbler3");
        (new ej(this.Ta,this.file,a,this.Za)).show()
    }
    ;
    n.df = function() {
        var a, b;
        null === this.Ta.Dc || this.Za.Lb() || -1 === this.file.id ? (b = "Log in first",
        null !== this.Ta.Dc && (b = "Save first"),
        a = new fj,
        x("#message-title").text(b),
        x("#message-text").text("You can only share drawings if you log in and save them first."),
        a.show()) : (a = new gj(this.Ta,this.file),
        a.show())
    }
    ;
    n.he = function() {
        (new hj(this.Ta)).show()
    }
    ;
    n.og = function(a) {
        var b, c, d;
        c = document.createElement("form");
        d = document.createElement("input");
        b = document.createElement("input");
        document.body.appendChild(c);
        c.appendChild(d);
        c.appendChild(b);
        c.method = "post";
        c.action = "http://zwibbler.com/server.cgi";
        d.type = "hidden";
        d.name = "type";
        d.value = a;
        b.type = "hidden";
        b.name = "document";
        b.value = this.Za.save("zwibbler3");
        c.submit();
        document.body.removeChild(c);
        O.sa()
    }
    ;
    n.gg = function() {
        var a;
        a = new ij(this.Ta);
        a.show();
        a.on("open", p(function(a) {
            return cj(this, a)
        }, this))
    }
    ;
    function $i(a) {
        var b;
        b = new jj;
        b.show();
        b.on("create", p(function(a, d) {
            this.log("Create account %s, %s", a, d);
            b.sa();
            return Lc(this.Ta, a, d, p(function(a, c) {
                var d;
                if ("ok" === a)
                    d = dj(this, c);
                else {
                    var h;
                    b.show();
                    x("#createaccounterror").text(a);
                    d = "" + Ma(b.da);
                    h = "" + Ma(b.ka);
                    d.length ? (Ma(b.da, d),
                    h.length ? (Ma(b.ka, h),
                    b.qa.focus()) : b.ka.focus()) : b.da.focus();
                    d = void 0
                }
                return d
            }, this))
        }, a))
    }
    function jj() {
        jj.Fb.constructor.call(this, "createaccount-dialog");
        this.da = x("#userNameInput");
        this.ka = x("#passwordInput1");
        this.qa = x("#passwordInput2")
    }
    ba(jj, N);
    jj.prototype.show = function() {
        jj.Fb.show.apply(this, arguments);
        return this.da.focus()
    }
    ;
    jj.prototype.na = function() {
        var a, b, c;
        a = Ma(this.da);
        b = Ma(x("#passwordInput1"));
        c = Ma(x("#passwordInput2"));
        b !== c ? x("#createaccounterror").text("Passwords do not match") : this.emit("create", a, b)
    }
    ;
    x("#previewcanvas").click(p(function() {
        return O.lc()
    }, this));
    function ij(a) {
        this.Ta = a;
        this.ka = p(this.ka, this);
        ij.Fb.constructor.call(this, "browse");
        this.Yc = null;
        this.request = new Ib;
        this.da = document.createElement("img");
        this.da.src = "wd-clickopen.png";
        x(this.da).click(p(function() {
            return this.lc()
        }, this));
        this.mode = "normal";
        x("#deletebutton").sa();
        x("#browse-working").sa();
        x("#browse-prompt").sa();
        x("#browse-main").show();
        document.getElementById("fileinput").value = "";
        Jc(this.Ta, p(function(a) {
            return "ok" === a ? kj(this) : alert(a)
        }, this))
    }
    ba(ij, N);
    function kj(a) {
        var b, c, d, e, f, g, h, k;
        document.getElementById("previewcanvas").getContext("2d").clearRect(0, 0, 350, 350);
        f = x("#filelist");
        f.empty();
        h = x("<table>").fb("width", "100%");
        e = function() {
            x("#deletebutton").sa();
            Fc(this.Qg, function(b, c) {
                if ("ok" === b)
                    return a.ka(c)
            });
            return !1
        }
        ;
        g = 0;
        for (k = a.Ta.files.length - 1; g <= k; g += 1)
            d = a.Ta.files[g],
            c = "#ffffff",
            g & 1 && (c = "#C0C0C0"),
            b = x("<a>").fb("href", "#").text(d.name).click(e),
            b[0].Qg = a.Ta.files[g].id,
            d = new Date(1E3 * parseInt(d.modificationDate, 10)),
            d = d.toLocaleString(),
            h.append(x("<tr>").append(x("<td>").ga("background", c).append(b)).append(x("<td>").ga("background", c).text(d)));
        return f.append(h)
    }
    ij.prototype.ka = function(a) {
        var b;
        try {
            b = zi(a.data)
        } catch (c) {
            alert(c);
            return
        }
        this.Yc = a;
        x("#deletebutton").show();
        a = document.getElementById("previewcanvas").getContext("2d");
        a.clearRect(0, 0, 350, 350);
        a.save();
        a.setTransform(.5, 0, 0, .5, 0, 0);
        b.format(a, this.request);
        b.ma(a);
        a.setTransform(1, 0, 0, 1, 0, 0);
        a.restore();
        if (this.da.complete)
            return a.drawImage(this.da, 90, 142)
    }
    ;
    ij.prototype.qa = function() {
        x("#browse-main").sa();
        x("#browse-prompt").show();
        return this.mode = "prompt"
    }
    ;
    ij.prototype.lc = function() {
        if ("normal" === this.mode) {
            if (this.sa(),
            this.Yc)
                return this.emit("open", this.Yc)
        } else if ("prompt" === this.mode)
            return x("#browse-prompt").sa(),
            x("#browse-working").show(),
            Gc(this.Ta, this.Yc.id, p(function() {
                x("#browse-working").sa();
                x("#browse-main").show();
                this.Yc = null;
                kj(this);
                return this.mode = "normal"
            }, this))
    }
    ;
    ij.prototype.na = function() {
        if ("normal" === this.mode)
            return this.sa();
        if ("prompt" === this.mode)
            return x("#browse-prompt").sa(),
            x("#browse-main").show(),
            this.mode = "normal"
    }
    ;
    La(x("#savefilename"), function(a) {
        if (13 === a.keyCode)
            return O.lc()
    });
    function ej(a, b, c, d) {
        this.Ta = a;
        this.file = b;
        this.la = c;
        this.Za = d;
        ej.Fb.constructor.call(this, "save");
        document.getElementById("savefilename").value = this.file.name;
        x("#save-normal").show();
        this.Ta.Dc ? x("#no-account-warning").sa() : x("#no-account-warning").show();
        x("#save-working").sa();
        x("#save-error").sa()
    }
    ba(ej, N);
    ej.prototype.lc = function() {
        var a, b;
        a = document.getElementById("savefilename");
        b = this.file.name !== a.value;
        this.file.name = a.value;
        x("#save-normal").sa();
        x("#save-working").show();
        a = this.la;
        if ("client" === document.getElementById("savetype").value)
            return Yi(this.file.name + ".zwibbler", "application/octet-stream", a),
            this.sa();
        if (-1 === this.file.id || b)
            return Ic(this.Ta, this.file.name, a, p(function(a, b) {
                return "ok" === a ? (this.file.id = b,
                this.file.Jb = 0,
                this.sa(),
                this.Za.Lb(!1)) : this.error(a)
            }, this));
        this.file.data = a;
        return Hc(this.Ta, this.file, p(function(a) {
            return "ok" === a ? (this.sa(),
            this.Za.Lb(!1)) : this.error(a)
        }, this))
    }
    ;
    ej.prototype.error = function(a) {
        x("#save-working").sa();
        x("#save-error").show();
        return x("#save-error-code").text(a)
    }
    ;
    ej.prototype.da = function() {
        return this.sa()
    }
    ;
    function lj() {
        lj.Fb.constructor.call(this, "working")
    }
    ba(lj, N);
    Yi = function(a, b, c) {
        var d, e, f, g, h;
        f = document.createElement("form");
        h = document.createElement("input");
        g = document.createElement("input");
        e = document.createElement("input");
        d = document.createElement("textarea");
        document.body.appendChild(f);
        f.appendChild(h);
        f.appendChild(g);
        f.appendChild(e);
        f.appendChild(d);
        f.method = "post";
        f.action = "index.php";
        h.type = "hidden";
        h.name = "type";
        h.value = "echo";
        g.type = "hidden";
        g.name = "name";
        g.value = a;
        e.type = "hidden";
        e.name = "contentType";
        e.value = b;
        d.name = "contents";
        d.value = c;
        f.submit();
        document.body.removeChild(f)
    }
    ;
    function gj(a, b) {
        this.Ta = a;
        this.file = b;
        gj.Fb.constructor.call(this, "share");
        x("#share-enabled").sa();
        x("#share-working").sa();
        x("#share-not-enabled").sa();
        this.file.Jb ? mj(this) : x("#share-not-enabled").show()
    }
    ba(gj, N);
    gj.prototype.ka = function() {
        x("#share-enabled").sa();
        x("#share-working").show();
        this.file.Jb = 0;
        this.file.data = "";
        return Hc(this.Ta, this.file, p(function(a) {
            x("#share-working").sa();
            if ("ok" === a)
                return this.file.Jb = 0,
                this.sa();
            this.file.Jb = 1;
            return this.error(a)
        }, this))
    }
    ;
    gj.prototype.da = function() {
        x("#share-not-enabled").sa();
        x("#share-working").show();
        this.file.Jb = 1;
        this.file.data = "";
        return Hc(this.Ta, this.file, p(function(a) {
            x("#share-working").sa();
            if ("ok" === a)
                return mj(this);
            this.file.Jb = 0;
            return this.error(a)
        }, this))
    }
    ;
    function mj(a) {
        var b, c;
        b = "http://" + window.location.host + "/shared/" + a.file.id + ".";
        c = b + "png";
        a = b + "pdf";
        b += "svg";
        x("#share-png")[0].value = c;
        x("#share-pdf")[0].value = a;
        x("#share-svg")[0].value = b;
        return x("#share-enabled").show()
    }
    gj.prototype.error = function(a) {
        x("#share-error").show();
        return x("#share-error-code").text(a)
    }
    ;
    function fj() {
        fj.Fb.constructor.call(this, "message")
    }
    ba(fj, N);
    fj.prototype.lc = function() {
        return this.sa()
    }
    ;
    function hj(a) {
        this.Ta = a;
        hj.Fb.constructor.call(this, "changePasswordDiv");
        nj("");
        this.form = document.getElementById("changepasswordform");
        this.form.oldpassword.value = "";
        this.form.newpassword1.value = "";
        this.form.newpassword2.value = "";
        this.form.submitButton.disabled = !1;
        this.form.cancelButton.disabled = !1
    }
    ba(hj, N);
    hj.prototype.da = function() {
        var a, b;
        b = this.form.oldpassword.value;
        a = this.form.newpassword1.value;
        a !== this.form.newpassword2.value ? nj("Passwords do not match.") : "" === a ? nj("Password is blank.") : (nj(""),
        this.form.submitButton.disabled = !0,
        this.form.cancelButton.disabled = !0,
        this.Ta.he(b, a, p(function(a) {
            if ("ok" === a)
                return this.sa();
            this.form.submitButton.disabled = !1;
            this.form.cancelButton.disabled = !1;
            return nj(a)
        }, this)));
        return !1
    }
    ;
    function nj(a) {
        return x("#passwordError").text(a)
    }
    x("#clipart-text").on("keypress", function(a) {
        if (13 === a.keyCode)
            return O.Se()
    });
    function bj(a, b) {
        this.app = a;
        this.Ta = b;
        this.log("construct");
        this.uc = new fc(x("#clipartView"));
        this.uc.ha.ga("border", "2px solid black");
        this.uc.on("click", p(function(a) {
            a = a.svg.url;
            this.sa();
            return this.app.Za.createNode("ImageNode", {
                url: a
            })
        }, this));
        this.Kc = 0;
        bj.Fb.constructor.call(this, "clipartDiv")
    }
    ba(bj, N);
    n = bj.prototype;
    n.log = t("CLIPART");
    n.bd = function(a, b) {
        return Dc(this.da, b, p(function(b, d) {
            var e;
            if (d) {
                var f, g, h;
                if (a === this.Kc) {
                    h = d.payload;
                    f = 0;
                    for (g = h.length; f < g; f++)
                        e = h[f],
                        "svg"in e && "png_thumb"in e.svg && hc(this.uc, e.svg.png_thumb, e);
                    e = d.info.current_page;
                    f = d.info.pages;
                    this.log("Got page %s of %s", e, f);
                    e = e < f && 10 > e ? this.bd(a, e + 1) : oj(!1)
                } else
                    e = void 0
            } else
                e = alert(b);
            return e
        }, this))
    }
    ;
    n.Se = function() {
        oj(!0);
        this.Kc += 1;
        gc(this.uc);
        this.da = Ma(x("#clipart-text"));
        return this.bd(this.Kc, 1)
    }
    ;
    function oj(a) {
        return a ? x("#clipart-working").ga("visibility", "visible") : x("#clipart-working").ga("visibility", "hidden")
    }
    n.show = function() {
        bj.Fb.show.call(this);
        oj(!1);
        return setTimeout(p(function() {
            this.log("show resize triggered");
            return this.wb()
        }, this), 1E3)
    }
    ;
    n.sa = function() {
        bj.Fb.sa.call(this);
        return this.Kc += 1
    }
    ;
    n.wb = function() {
        var a, b, c, d;
        bj.Fb.wb.call(this);
        d = this.ha.width();
        a = this.ha.height();
        b = x("#clipart-heading").height();
        c = a - b;
        this.uc.ha.width(d);
        this.uc.ha.height(c);
        this.log("dlgHeight=%s headingHeight=%s set height=%s", a, b, c);
        return this.uc.format()
    }
    ;
    window.FrontEndApp = Y;
    Y.prototype.kidsMode = Y.prototype.Me;
    Y.prototype.setUsername = Y.prototype.cf;
    Y.prototype.loginClicked = Y.prototype.Og;
    Y.prototype.newDrawing = Y.prototype.Rg;
    Y.prototype.onClipArt = Y.prototype.Qe;
    Y.prototype.saveClicked = Y.prototype.Xg;
    Y.prototype.shareClicked = Y.prototype.df;
    Y.prototype.changePassword = Y.prototype.he;
    Y.prototype.downloadAs = Y.prototype.og;
    Y.prototype.browseDrawings = Y.prototype.gg;
    jj.prototype.onCreate = jj.prototype.na;
    ij.prototype.deleteClicked = ij.prototype.qa;
    ij.prototype.okayClicked = ij.prototype.lc;
    ij.prototype.cancelClicked = ij.prototype.na;
    ej.prototype.okayClicked = ej.prototype.lc;
    ej.prototype.cancelClicked = ej.prototype.da;
    gj.prototype.unshareClicked = gj.prototype.ka;
    gj.prototype.shareClicked = gj.prototype.da;
    fj.prototype.okayClicked = fj.prototype.lc;
    hj.prototype.onsubmit = hj.prototype.da;
    window.createApp = function() {
        return new Y
    }
    ;
    bj.prototype.onSearch = bj.prototype.Se;
    Bc.prototype.setUsername = Bc.prototype.aa;
    R.prototype.change = R.prototype.da;
    R.prototype.moveTo = R.prototype.moveTo;
    R.prototype.lineTo = R.prototype.lineTo;
    R.prototype.curveTo = R.prototype.Dd;
    R.prototype.quadraticTo = R.prototype.ba;
    R.prototype.cornerTo = R.prototype.aa;
    R.prototype.bezierTo = R.prototype.vc;
    R.prototype.arcTo = R.prototype.arcTo;
    R.prototype.getBoundingBox = R.prototype.ka;
    R.prototype.translate = R.prototype.translate;
    R.prototype.closePath = R.prototype.closePath;
    R.prototype.close = R.prototype.close;
    R.prototype.toArray = R.prototype.Rb;
    df.prototype.setElement = df.prototype.We;
    X.prototype.log = X.prototype.log;
    X.prototype.abortTransaction = X.prototype.cg;
    X.prototype.addToLanguage = X.prototype.gf;
    X.prototype.addPage = X.prototype.dg;
    X.prototype.beginTransaction = X.prototype.ze;
    X.prototype.bringToFront = X.prototype.hf;
    X.prototype.canRedo = X.prototype.wc;
    X.prototype.canUndo = X.prototype.xc;
    X.prototype.clearSelection = X.prototype.ib;
    X.prototype.clearUndo = X.prototype.ig;
    X.prototype.clickColour = X.prototype.jg;
    X.prototype.commitIrreversibleTransaction = X.prototype.lg;
    X.prototype.commitTransaction = X.prototype.ie;
    X.prototype.copy = X.prototype.jf;
    X.prototype.createGroup = X.prototype.Ic;
    X.prototype.createNode = X.prototype.createNode;
    X.prototype.createPath = X.prototype.kf;
    X.prototype.createToolbar = X.prototype.mf;
    X.prototype.createUiElement = X.prototype.mg;
    X.prototype.createShape = X.prototype.lf;
    X.prototype.cut = X.prototype.nf;
    X.prototype.destroy = X.prototype.pf;
    X.prototype.deleteNode = X.prototype.of;
    X.prototype.deleteNodes = X.prototype.Be;
    X.prototype.deletePage = X.prototype.Ce;
    X.prototype.deleteSelection = X.prototype.De;
    X.prototype.dirty = X.prototype.Lb;
    X.prototype.download = X.prototype.qf;
    X.prototype.draw = X.prototype.ma;
    X.prototype.editNodeText = X.prototype.pg;
    X.prototype.duplicate = X.prototype.rf;
    X.prototype.emit = X.prototype.emit;
    X.prototype.focus = X.prototype.focus;
    X.prototype.findNode = X.prototype.rg;
    X.prototype.findNodes = X.prototype.Fe;
    X.prototype.flip = X.prototype.sg;
    X.prototype.flipNodes = X.prototype.sf;
    X.prototype.generatePalette = X.prototype.tg;
    X.prototype.getActiveLayer = X.prototype.ce;
    X.prototype.getAllNodes = X.prototype.ug;
    X.prototype.getBackgroundImage = X.prototype.tf;
    X.prototype.getBoundingRectangle = X.prototype.uf;
    X.prototype.getCurrentPage = X.prototype.jc;
    X.prototype.getCurrentFillColour = X.prototype.vf;
    X.prototype.getCurrentOutlineColour = X.prototype.wf;
    X.prototype.getCurrentTool = X.prototype.xf;
    X.prototype.getDocumentCoordinates = X.prototype.wg;
    X.prototype.getDocumentSize = X.prototype.ad;
    X.prototype.getFillColour = X.prototype.yf;
    X.prototype.getLanguageString = X.prototype.zg;
    X.prototype.getDrawingRectangle = X.prototype.xg;
    X.prototype.getItemProperty = X.prototype.yg;
    X.prototype.getLayers = X.prototype.Bg;
    X.prototype.getLayerNodes = X.prototype.Ag;
    X.prototype.getNodeProperty = X.prototype.we;
    X.prototype.getNodeRectangle = X.prototype.Cg;
    X.prototype.getNodeType = X.prototype.zf;
    X.prototype.getNodeUnderPoint = X.prototype.Dg;
    X.prototype.getPageCount = X.prototype.bc;
    X.prototype.getPathData = X.prototype.Gd;
    X.prototype.getPathAsPoints = X.prototype.Eg;
    X.prototype._getPropertyPanelElement = X.prototype.ag;
    X.prototype.getCanvasScale = X.prototype.vg;
    X.prototype.getScreenCoordinates = X.prototype.Fg;
    X.prototype.getSelectedEditHandle = X.prototype.Gg;
    X.prototype.getStrokeColour = X.prototype.Bf;
    X.prototype.getEditHandleType = X.prototype.kc;
    X.prototype.setEditHandle = X.prototype.bh;
    X.prototype.getSelectedNodes = X.prototype.Af;
    X.prototype.getViewRectangle = X.prototype.Ig;
    X.prototype.insertPage = X.prototype.ed;
    X.prototype.isLayerVisible = X.prototype.me;
    X.prototype.load = X.prototype.load;
    X.prototype.lockUpdates = X.prototype.Cf;
    X.prototype.moveDown = X.prototype.Df;
    X.prototype.moveUp = X.prototype.Ef;
    X.prototype.newDocument = X.prototype.Ld;
    X.prototype.nextPage = X.prototype.Ff;
    X.prototype.on = X.prototype.on;
    X.prototype.onComplete = X.prototype.Sg;
    X.prototype.paste = X.prototype.Gf;
    X.prototype.previousPage = X.prototype.Ug;
    X.prototype.print = X.prototype.Hf;
    X.prototype.redo = X.prototype.fc;
    X.prototype.redraw = X.prototype.If;
    X.prototype.resize = X.prototype.resize;
    X.prototype.save = X.prototype.save;
    X.prototype.setCursor = X.prototype.$g;
    X.prototype.selectNodes = X.prototype.Kf;
    X.prototype.sendToBack = X.prototype.Lf;
    X.prototype.setActiveLayer = X.prototype.xe;
    X.prototype.setBackgroundBrowserImages = X.prototype.Yg;
    X.prototype.setConfig = X.prototype.Zg;
    X.prototype.setColour = X.prototype.td;
    X.prototype.setCurrentPage = X.prototype.Ac;
    X.prototype.setCustomBackgroundFn = X.prototype.Mf;
    X.prototype.setDocumentSize = X.prototype.de;
    X.prototype.setDocumentSizeInTransaction = X.prototype.Ve;
    X.prototype.setDomElement = X.prototype.ah;
    X.prototype.setLayerName = X.prototype.fh;
    X.prototype.setPaperSize = X.prototype.Nd;
    X.prototype.setIconBrowserImages = X.prototype.dh;
    X.prototype.setItemProperty = X.prototype.eh;
    X.prototype.setNodeProperties = X.prototype.Nf;
    X.prototype.setNodeProperty = X.prototype.ee;
    X.prototype.setNodeVisibility = X.prototype.gh;
    X.prototype.setOpacity = X.prototype.Xe;
    X.prototype.setPageView = X.prototype.Pf;
    X.prototype.setViewRectangle = X.prototype.ih;
    X.prototype.setZoom = X.prototype.jh;
    X.prototype.showLayer = X.prototype.vd;
    X.prototype.translateNode = X.prototype.ye;
    X.prototype.rotateDocument = X.prototype.Wg;
    X.prototype.rotateNode = X.prototype.Ue;
    X.prototype.scaleNode = X.prototype.Jf;
    X.prototype.setNodeTransform = X.prototype.Of;
    X.prototype.undo = X.prototype.cb;
    X.prototype.ungroup = X.prototype.Qf;
    X.prototype.upload = X.prototype.Rf;
    X.prototype.useArrowTool = X.prototype.ph;
    X.prototype.useBrushTool = X.prototype.$e;
    X.prototype.useCircleTool = X.prototype.qh;
    X.prototype.useCurveTool = X.prototype.rh;
    X.prototype.useCustomTool = X.prototype.sh;
    X.prototype.useEditHandleTool = X.prototype.Sf;
    X.prototype.useEllipseTool = X.prototype.Tf;
    X.prototype.useFreehandTool = X.prototype.th;
    X.prototype.useStampTool = X.prototype.Ch;
    X.prototype.useLineTool = X.prototype.uh;
    X.prototype.usePanTool = X.prototype.vh;
    X.prototype.usePickTool = X.prototype.wh;
    X.prototype.usePolygonTool = X.prototype.Uf;
    X.prototype.useQuadraticBezierTool = X.prototype.xh;
    X.prototype.useRectangleTool = X.prototype.Vf;
    X.prototype.useRoundRectTool = X.prototype.yh;
    X.prototype.useShapeBrushTool = X.prototype.zh;
    X.prototype.useShapeTool = X.prototype.Wf;
    X.prototype.useSplitWallTool = X.prototype.Xf;
    X.prototype.useStampLineTool = X.prototype.Bh;
    X.prototype.useSquareTool = X.prototype.Ah;
    X.prototype.useTextTool = X.prototype.Dh;
    X.prototype.useWallTool = X.prototype.Yf;
    X.prototype.zoomIn = X.prototype.Zf;
    X.prototype.zoomOut = X.prototype.$f;
    Ci.prototype.createGroup = Ci.prototype.Ic;
    window.Dialog = N;
    N.emit = function() {
        var a;
        a = 1 <= arguments.length ? ca.call(arguments, 0) : [];
        O && O.emit.apply(O, a)
    }
    ;
    N.current = function() {
        return O
    }
    ;

})();
