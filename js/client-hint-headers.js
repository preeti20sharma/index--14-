function getBrandsConcatenated(e) {
    return e.map((function(e) {
        return '"' + escapeDoubleQuoteAndBackslash(e.brand) + '";v="' + e.version + '"'
    }
    )).join(", ")
}
function doubleQuoteEscape(e) {
    return e.replace(/"/g, '\\"')
}
function backslashEscape(e) {
    return e.replace(/\\/g, "\\\\")
}
function escapeDoubleQuoteAndBackslash(e) {
    return "string" == typeof e && e && (e = doubleQuoteEscape(e = backslashEscape(e))),
    e
}
function isValidArray(e) {
    return void 0 !== e && Array.isArray(e)
}
function getBrowserList(e, t) {
    return isValidArray(e) ? getBrandsConcatenated(e) : isValidArray(t) ? getBrandsConcatenated(t) : void 0
}
function getHintsValues() {
    return ["brands", "mobile", "platform", "architecture", "bitness", "fullVersionList", "model", "platformVersion", "wow64"]
}
function getPropertyQuoted(e) {
    return void 0 !== e ? '"' + escapeDoubleQuoteAndBackslash(e) + '"' : e
}
var clientHintHeaders = new Promise((function(e) {
    var t = navigator && navigator.userAgentData;
    t ? t.getHighEntropyValues(getHintsValues()).then((function(t) {
        var r = {
            User_Agent: navigator.userAgent,
            CH_UA: getBrowserList(t.brands),
            CH_UA_Arch: getPropertyQuoted(t.architecture),
            CH_UA_Mobile: "?" + (t.mobile ? "1" : "0"),
            CH_UA_Model: getPropertyQuoted(t.model),
            CH_UA_Platform: getPropertyQuoted(t.platform),
            CH_UA_Platform_Version: getPropertyQuoted(t.platformVersion),
            CH_UA_Full_Version_List: getBrowserList(t.fullVersionList, t.brands),
            CH_UA_Bitness: getPropertyQuoted(t.bitness),
            CH_UA_Wow64: "?" + (t.wow64 ? "1" : "0")
        };
        e(r)
    }
    )) : navigator ? e({
        "User-Agent": navigator.userAgent
    }) : e({})
}
));
window.getClientHindHeaders = function() {
    var e = {};
    clientHintHeaders.then((function(t) {
        for (var r in t)
            t.hasOwnProperty(r) && (e[r] = t[r]);
        for (var n = document.querySelectorAll("form"), o = 0; o < n.length; o++) {
            var a = document.createElement("input");
            a.setAttribute("type", "hidden"),
            a.setAttribute("name", "device_headers"),
            a.setAttribute("value", JSON.stringify(e)),
            n[o].appendChild(a)
        }
    }
    ))
}
,
window.addEventListener("load", window.getClientHindHeaders);
