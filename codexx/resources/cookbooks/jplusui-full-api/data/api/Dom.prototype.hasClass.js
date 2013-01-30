﻿jsonp({"fullName":'Dom.prototype.hasClass',"source":'Base_1.js',"sourceFile":'data/source/Base_1.js.html#Dom-prototype-hasClass',"summary":'<p>\u68c0\u67e5\u5f53\u524d Dom \u5bf9\u8c61\u662f\u5426\u542b\u6709\u67d0\u4e2a\u7279\u5b9a\u7684\u7c7b\u3002</p>\n',"params":[{"type":'String',"name":'className',"summary":'<p>\u8981\u5224\u65ad\u7684\u7c7b\u540d\u3002\u53ea\u5141\u8bb8\u4e00\u4e2a\u7c7b\u540d\u3002</p>\n'}],"returns":{"type":'Boolean',"summary":'<p>\u5982\u679c\u5b58\u5728\u5219\u8fd4\u56de true\u3002</p>\n'},"example":'<p>\u9690\u85cf\u5305\u542b\u6709\u67d0\u4e2a\u7c7b\u7684\u5143\u7d20\u3002</p>\n\n<h5>HTML:</h5>\n\n<pre lang=\"htm\" format=\"none\">\n&lt;div class=\"protected\"&gt;&lt;/div&gt;&lt;div&gt;&lt;/div&gt;\n</pre>\n\n<h5>JavaScript:</h5>\n\n<pre>Dom.query(\"div\").on(\'click\', function(){\nif ( this.hasClass(\"protected\") )\nthis.hide();\n});\n</pre>\n',"name":'hasClass',"memberOf":'Dom',"memberType":'method'});