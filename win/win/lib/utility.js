var ParseURI = (function () {
    function ParseURI(str) {
        this.str = str;
        this.keys = [
            "source", 
            "protocol", 
            "authority", 
            "userInfo", 
            "user", 
            "password", 
            "host", 
            "port", 
            "relative", 
            "path", 
            "directory", 
            "file", 
            "query", 
            "anchor"
        ];
    }
    ParseURI.prototype.parse = function () {
        var parser = /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/;
        var m = parser.exec(this.str), uri = {
        }, i = 14;
        while(i--) {
            uri[this.keys[i]] = m[i] || "";
        }
        var q = {
            name: "queryKey",
            parser: /(?:^|&)([^&=]*)=?([^&]*)/g
        };
        uri[q.name] = {
        };
        uri[this.keys[12]].replace(q.parser, function ($0, $1, $2) {
            if($1) {
                uri[q.name][$1] = $2;
            }
        });
        return uri;
    };
    return ParseURI;
})();
;
//@ sourceMappingURL=utility.js.map
