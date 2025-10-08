var SetSessionData = function() {
    function e() {
        r = document.referrer ? new URL(document.referrer).hostname : window.location.host,
        i = window.location.host,
        a = getCookie("gl_sd_data"),
        c = window.location.hash ? window.location.hash.substring(1) : ""
    }
    function t() {
        if (c) {
            var e = c.split("=")[0] || ""
              , t = c.split("=")[1] || "";
            "enc_sd" == e && (t.indexOf("&") > -1 && (t = t.split("&")[0] || ""),
            u = t)
        }
    }
    function n() {
        var e = new XMLHttpRequest;
        e.open("POST", "/api/v1/set-user-session"),
        e.setRequestHeader("Access-Control-Allow-Origin", "*"),
        e.setRequestHeader("Content-Type", "application/json; charset=utf-8"),
        e.setRequestHeader("X-CSRF-Token", document.querySelector('meta[name="csrf-token"]').getAttribute("content")),
        e.onload = function() {
            if (200 === e.status) {
                var t = JSON.parse(e.response);
                t && console.log("Response for this request is", t)
            }
        }
        ,
        e.send(JSON.stringify({
            enc_data: u
        }))
    }
    function o() {
        r != i && (t(),
        u && !a && n())
    }
    function s() {
        e(),
        o()
    }
    var i, r, a, c, u = null;
    return {
        registerEvents: s
    }
}();
window.addEventListener("load", (function() {
    SetSessionData.registerEvents()
}
));
