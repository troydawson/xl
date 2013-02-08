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
//V3.01.A - http://www.openjs.com/scripts/jx/
var Util = (function () {
    function Util() { }
    Util.getHTTPObject = function getHTTPObject() {
        var http = null;
        //Use IE's ActiveX items to load the file.
        if(typeof ActiveXObject != 'undefined') {
            try  {
                http = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e) {
                try  {
                    http = new ActiveXObject("Microsoft.XMLHTTP");
                } catch (E) {
                    http = false;
                }
            }//If ActiveX is not available, use the XMLHttpRequest of Firefox/Mozilla etc. to load the document.
            
        } else if(XMLHttpRequest) {
            try  {
                http = new XMLHttpRequest();
            } catch (e) {
                http = false;
            }
        }
        return http;
    };
    Util.load = function load(url, callback) {
        if(!url || !callback) {
            return;
        }
        var http = this.getHTTPObject();//The XMLHttpRequest object is recreated at every call - to defeat Cache problem in IE
        
        if(!http) {
            return;
        }
        if(http.overrideMimeType) {
            http.overrideMimeType('text/xml');
        }
        //Kill the Cache problem in IE:
        var now = "uid=" + new Date().getTime();
        url += (url.indexOf("?") + 1) ? "&" : "?";
        url += now;
        var file_info = new ParseURI(url).parse();
        http.open("GET", file_info['path'], true);
        http.onreadystatechange = function () {
            if(http.readyState != 4) {
                return;
            }
            if(http.status != 200) {
                console.log(http.status);
                return;
            }
            var result = http.responseText || "";
            if(file_info['protocol'] == "json") {
                result = JSON.parse(result.replace(/[\t\n\r]/g, ""));
            }
            if(callback) {
                callback(result);
            }
        };
        http.send(null);
    };
    return Util;
})();
//@ sourceMappingURL=Utility.js.map
