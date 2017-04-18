function getParameterByName(e) {
    e = e.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var t = new RegExp("[\\?&]" + e + "=([^&#]*)"),
    n = t.exec(location.search);
    return null == n ? "": decodeURIComponent(n[1].replace(/\+/g, " "))
}
function getCookie(e) {
    for (var t = document.cookie,
    n = t.split(";"), i = 0; i < n.length; i++) {
        var r = n[i].split("=");
        if ($.trim(r[0]) == e) return r[1] && r[1].length ? r[1] : null
    }
    return ! 1
}
mdc.inited = function() {
    console.log("mdc inited")
},
$(function() {
    function e() {
        var e = getParameterByName("file"),
        t = getParameterByName("version");
        e && (t && (e = e + "&version=" + t), $.get(e,
        function(t) {
            if (mdc.init(t, !1), /YnoteAndroid/.test(navigator.userAgent)) {
                var n = e.match(/group\/([0-9a-zA-Z]+)/),
                i = e.match(/file\/([0-9a-zA-Z]+)/);
                window.PreView.loadComplete(n ? n[1] : "", i ? i[1] : "")
            }
        }))
    }
    /YnoteAndroid/.test(navigator.userAgent) && !getCookie("YNOTE_CSTK") ? $.ajax({
        url: "/yws/mapi/user?method=get&keyfrom=web",
        async: !1,
        cache: !1,
        type: "GET",
        success: e
    }) : e(),
    window.preview = function(e) {
        $.get(e,
        function(e) {
            mdc.init(e, !1)
        })
    },
    $(".markdown-body").delegate("a", "click",
    function(e) {
        var t = $(e.target),
        n = e.target,
        i = window.location;
        if ("" !== n.hash) {
            if (!n.origin && 0 === n.href.indexOf(i.origin)) return;
            if (n.origin === i.origin) return
        }
        t.attr("target", "_blank")
    })
});