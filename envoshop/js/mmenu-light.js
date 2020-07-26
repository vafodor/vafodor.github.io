/*!
 * mmenujs.com/mmenu-light
 *
 * Copyright (c) Fred Heusschen
 * www.frebsite.nl
 *
 * License: CC-BY-4.0
 * http://creativecommons.org/licenses/by/4.0/
 */
var mmlight = function() {
    var e = function(e) {
            return Array.prototype.slice.call(e)
        },
        t = function(t, n) {
            return e((n || document).querySelectorAll(t))
        },
        n = function() {
            document.addEventListener("click", function(e) {
                var t = e.target;
                t.closest(".mm") && t.matches("a") && e.stopPropagation()
            });
            var n = function(e) {
                e.target.closest(".mm") || t(".mm.mm--open").forEach(function(t) {
                   t.mmlight.close()
                })
            };
            document.addEventListener("click", function(t) {
                var n = t.target,
                    m = n.closest(".mm");
                if (m) {
                    var a = n.matches("li") ? n : !!n.matches("span") && n.parentElement;
                    a && (t.stopPropagation(), e(a.children).forEach(function(e) {
                        e.matches("ul") && (a.parentElement.classList.add("mm--parent"), m.mmlight.openPanel(e))
                    }))
                }
            }), document.addEventListener("click", function(e) {
                var n = e.target;
                if (n.matches(".mm")) {
                    e.stopPropagation();
                    var m = t(".mm--open", n),
                        a = m[m.length - 1];
                    if (a) {
                        a.classList.remove("mm--open");
                        var o = a.parentElement.closest("ul");
                        o && n.mmlight.openPanel(o)
                    }
                }
            }), document.addEventListener("click", n), document.addEventListener("touchstart", n)
        },
        m = {
            mediaQuery: "all",
            title: "Menu"
        };
    return function(a, o) {
        var r = {};
        o = o || {}, ["mediaQuery", "title"].forEach(function(e) {
            r[e] = o[e] || m[e]
        }), n(), n = function() {};
        var s = null,
            c = function(e) {
                a.classList[e.matches ? "add" : "remove"]("mm")
            },
            i = {
                create: function(e) {
                    return void 0 === e && (e = r.mediaQuery), "number" == typeof e && (e = "(max-width: " + e + "px)"), r.mediaQuery = e, (s = window.matchMedia(e)).addListener(c), a.classList[s.matches ? "add" : "remove"]("mm"), i
                },
                destroy: function() {
                    return s.removeListener(c), a.classList.remove("mm"), i
                },
                init: function(e) {
                    var n = t(e, a),
                        m = n[n.length - 1],
                        o = null;
                    return m && (o = m.closest("ul")), o || (o = a.querySelector("ul")), i.openPanel(o), i
                },
                open: function() {
                    return a.classList.add("mm--open"), document.body.classList.add("mm--open"), i
                },
                close: function() {
                    return a.classList.remove("mm--open"), document.body.classList.remove("mm--open"), i
                },
                openPanel: function(n) {
                    n || (n = a.querySelector("ul"));
                    var m = n.dataset.mmTitle,
                        o = n.parentElement;
                    o === a ? a.classList.add("mm--home") : (a.classList.remove("mm--home"), m || e(o.children).forEach(function(e) {
                        e.matches("a, span") && (m = e.textContent)
                    })), m || (m = r.title), a.dataset.mmTitle = m, t(".mm--open", a).forEach(function(e) {
                        e.classList.remove(".mm--open", "mm--parent")
                    }), n.classList.add("mm--open"), n.classList.remove("mm--parent");
                    for (var s = n.parentElement.closest("ul"); s;) s.classList.add("mm--open", "mm--parent"), s = s.parentElement.closest("ul");
                    return i
                }
            };
        return a.mmlight = i, i
    }
}();