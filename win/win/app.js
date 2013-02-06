/// <reference path="def/webgl.d.ts" />
/// <reference path="def/three.d.ts" />
var WebGLHelper = {
    CreateNativeCanvas: function (element, id, replace, okHandler, failHandler) {
        try  {
            var cnv = document.createElement("canvas");
            if(replace) {
                if(element.attributes.width) {
                    cnv.width = element.attributes.width.value;
                }
                if(element.attributes.height) {
                    cnv.height = element.attributes.height.value;
                }
                if(element.cssText) {
                    cnv.style.cssText = element.cssText;
                }
                element.parentNode.replaceChild(cnv, element);
            } else {
                element.appendChild(cnv);
            }
            cnv.innerHTML = "Your browser does not support &lt;canvas&gt; tag.";
            cnv.id = id;
            if(okHandler) {
                okHandler(cnv, id);
            }
            return cnv;
        } catch (e) {
            if(failHandler) {
                failHandler(null, id);
            }
            return null;
        }
    },
    CreatePluginCanvas: function (element, id, replace, okHandler, failHandler) {
        var container = document.createElement("div");
        container.style.cssText = "position:relative;width:100%;height:100%";
        var obj = document.createElement("object");
        container.appendChild(obj);
        if(replace) {
            if(element.attributes.width) {
                obj.width = element.attributes.width.value;
            }
            if(element.attributes.height) {
                obj.height = element.attributes.height.value;
            }
            if(element.cssText) {
                obj.style.cssText = element.cssText;
            }
            element.parentNode.replaceChild(container, element);
        } else {
            element.appendChild(container);
        }
        var errorHandler = function () {
            obj.style.visibility = "visible";
            obj.onreadystatechange = null;
            if(failHandler) {
                failHandler(null, id);
            }
        };
        var successHandler = function () {
            obj.style.visibility = "visible";
            if(okHandler) {
                okHandler(obj, id);
            }
        };
        obj.style.visibility = "hidden";
        obj.onreadystatechange = successHandler;
        obj.onerror = errorHandler;
        obj.id = id;
        obj.codeBase = 'iewebgl v1.1.3';
        obj.type = "application/x-webgl";
        return obj;
    },
    CreateGLCanvasInline: function (id, okHandler, failHandler) {
        var NotIE = navigator.userAgent.indexOf("MSIE") < 0;
        var native = NotIE;//? || typeof WebGLRenderingContext !== 'undefined' && !WebGLRenderingContext.hasOwnProperty('iewebgl');
        
        var init_func = native ? WebGLHelper.CreateNativeCanvas : WebGLHelper.CreatePluginCanvas;
        return init_func(document.getElementById("WebGLCanvasCreationScript"), id, true, okHandler, failHandler);
    }
};
//@ sourceMappingURL=app.js.map
