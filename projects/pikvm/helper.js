function timeanddate() {
    let user = sessionStorage.getItem("name");
 today = new Date();
///let day = today.getDay()
 date = (today.getMonth()+1)+"/"+today.getDate()+"/"+today.getFullYear();

    var to=new Date();
    var h=to.getHours();
    var m=to.getMinutes();
    var s=to.getSeconds();
    var ampm = "";
    m = checkTime(m);
    s = checkTime(s);
    if (h > 12) {
        h = h - 12;
        ampm = " PM";
    } else if (h == 12){
        h = 12;
        ampm = " PM";
    } else if (h < 12){
        ampm = " AM";
    } else {
        ampm = " PM";
    };
    if(h==0) {
    h=12;
    }

time = h+":"+m+":"+s+ampm+" "+date+" Logged in as: "+user+" Time left: "+Math.floor((1800 - elapsedSeconds) / 60);
document.getElementById("time").innerHTML = time
}

function checkTime(i) {
    if (i<10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}

// timers
setInterval(function(){
    timeanddate();
}, 500);

setInterval(function(){
    remainingMinutes=remainingMinutes-1
}, 60000);

let startTime = sessionStorage.getItem('sessionTime') || Date.now();
let elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
sessionStorage.setItem('sessionTime', startTime);

if (elapsedSeconds < 1800) {
  let remainingSeconds = 1800 - elapsedSeconds;
  setTimeout(() => {
    //  time over
    console.log("time done");
    sessionStorage.setItem('sessionTime', startTime);
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("sessionTime");
    location.reload();
  }, remainingSeconds * 1000);
}

let remainingMinutes = Math.floor((3600 - elapsedSeconds) / 60);
let remainingSecondsDisplay = (3600 - elapsedSeconds) % 60;
