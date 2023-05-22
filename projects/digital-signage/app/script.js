let data = {}
let id = window.location.href.split("?id=")[1]
let done = false;
        setTimeout(function() {
            document.getElementById("start").showModal();
        }, 100);

        setTimeout(function() {
            document.getElementById("start").close();
            document.getElementById("load").showModal();
            
            setTimeout(function() {
                fetch('https://84d5e4ce-6ead-46a0-a71f-01b9fce0d9f8.id.repl.co/getUpdate?id=' + id)
                .then(response => response.text())
                .then(oc => get(oc));
        }, 1000);
        }, 5000);

        function get(oc) {
            data = JSON.parse(oc);
                setTimeout(function() {
                    load();       
            }, 1000);
        }

        function load() {
            if (data[id].type == "iframe") {
                document.write(`<iframe src="${data[id].data}" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden; z-index:999999;">
    Your browser doesn't support iframes
</iframe>`);
noload();
            } else if (data[id].type == "html") {
                document.write(`${data[id].data}`);
                noload()
            } else if (data[id].type == "text") {
                document.write(`
                <style>
                @import url('https://fonts.googleapis.com/css?family=Bowlby+One+SC');

                h1 {
                  text-align: center;
                  font-family: 'Bowlby One SC', cursive;
                  font-size: 25.5vw;
                }
                </style>
                
                <h1>${data[id].data}</h1>
                `);
                noload();
            } else if (data[id].type == "video") {
                document.write(`<video autoplay loop id="myVideo">
  <source src="${data[id].data}">
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
            } else if (data[id].type == "image") {
                document.write(`
                <style>
                    * {
    background-image: url('${data[id].data}');
    background-repeat: no-repeat;
    background-attachment: fixed; 
    background-size: 100% 100%;
                    }

</style>`);
noload();
            } else {
                document.getElementById("error").innerHTML = "Error getting data<br>Reloading...";
                document.getElementById("load").showModal();
                setTimeout(function() {
                    // for some resone location.reload() dose not work in a .js file
                    reload();
            }, 1000);
            }
        }

        function noload() {
            setTimeout(function() {
                document.getElementById("load").close();
                done = true
        }, 1000);
        }

        setInterval(function() {
            if (done) {
                fetch('https://84d5e4ce-6ead-46a0-a71f-01b9fce0d9f8.id.repl.co/checkForUpdate?id=' + id)
                .then(response => response.text())
                .then(uc => updateCheck(uc));
            }
        }, 5000);

        function updateCheck(uc) {
            if (uc) {
                document.getElementById("error").innerHTML = "Update requested...";
                document.getElementById("load").showModal();
                setTimeout(function() {
                    // for some resone location.reload() dose not work in a .js file
                    reload();
            }, 1000);
            }
        }