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
            if (data.type == "iframe") {
                document.write(`<iframe src="${data.data}" allow="accelerometer; autoplay; encrypted-media; gyroscope;" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden; z-index:999999;">
    Your browser doesn't support iframes
</iframe>`);
noload();
            } else if (data.type == "text") {
                document.write(`
                <style>
                .text {
                    font-size:50vw
                }
                </style>
                
                <h1 class="text">${data.data}</h1>
                `);
                noload();
            } else if (data.type == "video") {
                document.write(`<video onload="document.getElementById('myVideo').play();" autoplay loop id="myVideo">
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
                document.write(`<iframe src="https://awashcard0.pages.dev/projects/digital-signage/app/error.html" allow="accelerometer; autoplay; encrypted-media; gyroscope;" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden; z-index:999999;">
                Your browser doesn't support iframes
            </iframe>`);
            noload();
            }
        }

        function noload() {
            done = true;
            setTimeout(function() {
                // document.write removes the modal so this is useless
                document.getElementById("load").close();
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
            if (uc == "true") {
                up();
            }
        }
