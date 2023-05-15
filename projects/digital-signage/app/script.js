let data = {id: "hi", type: "text", data: "Cool text"}

        setTimeout(function() {
            document.getElementById("start").showModal();
        }, 100);

        setTimeout(function() {
            document.getElementById("start").close();
            document.getElementById("load").showModal();
            
            setTimeout(function() {
                load();
        }, 1000);
        }, 5000);

        function load() {
            if (data.type == "iframe") {
                document.write(`<iframe src="${data.data}" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden; z-index:999999;">
    Your browser doesn't support iframes
</iframe>`);
noload();
            } else if (data.type == "html") {
                document.write(`${data.data}`);
                noload()
            } else if (data.type == "text") {
                document.write(`<h1>${data.data}</h1>
                <script>
                    /*!	
* FitText.js 1.0 jQuery free version
*
* Copyright 2011, Dave Rupert http://daverupert.com 
* Released under the WTFPL license 
* http://sam.zoy.org/wtfpl/
* Modified by Slawomir Kolodziej http://slawekk.info
*
* Date: Tue Aug 09 2011 10:45:54 GMT+0200 (CEST)
*/
(function(){

  var addEvent = function (el, type, fn) {
    if (el.addEventListener)
      el.addEventListener(type, fn, false);
		else
			el.attachEvent('on'+type, fn);
  };
  
  var extend = function(obj,ext){
    for(var key in ext)
      if(ext.hasOwnProperty(key))
        obj[key] = ext[key];
    return obj;
  };

  window.fitText = function (el, kompressor, options) {

    var settings = extend({
      'minFontSize' : -1/0,
      'maxFontSize' : 1/0
    },options);

    var fit = function (el) {
      var compressor = kompressor || 1;

      var resizer = function () {
        el.style.fontSize = Math.max(Math.min(el.clientWidth / (compressor*10), parseFloat(settings.maxFontSize)), parseFloat(settings.minFontSize)) + 'px';
      };

      // Call once to set.
      resizer();

      // Bind events
      // If you have any js library which support Events, replace this part
      // and remove addEvent function (or use original jQuery version)
      addEvent(window, 'resize', resizer);
      addEvent(window, 'orientationchange', resizer);
    };

    if (el.length)
      for(var i=0; i<el.length; i++)
        fit(el[i]);
    else
      fit(el);

    // return set of elements
    return el;
  };
})();

setTimeout(function() {
    fitText(document.querySelector("h1"), 0.38);       
}, 1000);
                    </script>`);
                noload();
            } else if (data.type == "video") {
                document.write(`<video autoplay loop id="myVideo">
  <source src="${data.data}">
  Your browser does not support HTML5 video.
</video>
<style>
            * {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: Arial;
  font-size: 17px;
}

#myVideo {
  position: fixed;
  right: 0;
  bottom: 0;
  min-width: 100%; 
  min-height: 100%;
}
        </style>`);
        noload();
            } else if (data.type == "image") {
                document.write(`
                <style>
                    * {
    background-image: url('${data.data}');
    background-repeat: no-repeat;
    background-attachment: fixed; 
    background-size: 100% 100%;
                    }

</style>`);
noload();
            } else {
                document.getElementById("error").innerHTML = "Error getting data"
            }
        }

        function noload() {
            setTimeout(function() {
                document.getElementById("load").close();
        }, 1000);
        }
