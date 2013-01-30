﻿jsonp({"fullName":'Function.prototype.createBuffered',"source":'System\\Lang\\assets\\scripts\\Function.js',"sourceFile":'data/source/System\\Lang\\assets\\scripts\\Function.js.html#Function-prototype-createBuffered',"summary":'<p>Creates a delegate function, optionally with a bound scope which, when called, buffers\nthe execution of the passed function for the configured number of milliseconds.\nIf called again within that period, the impending invocation will be canceled, and the\ntimeout period will begin again.</p>\n',"params":[{"type":'Function',"name":'fn',"summary":'<p>The function to invoke on a buffered timer.</p>\n'},{"type":'Number',"name":'buffer',"summary":'<p>The number of milliseconds by which to buffer the invocation of the\nfunction.</p>\n'},{"type":'Object',"name":'scope',"summary":'<p>(optional) The scope (<code>this</code> reference) in which\nthe passed function is executed. If omitted, defaults to the scope specified by the caller.</p>\n'},{"type":'Array',"name":'args',"summary":'<p>(optional) Override arguments for the call. Defaults to the arguments\npassed by the caller.</p>\n'}],"returns":{"type":'Function',"summary":'<p>A function which invokes the passed function after buffering for the specified time.</p>\n'},"name":'createBuffered',"memberOf":'Function',"memberType":'method'});