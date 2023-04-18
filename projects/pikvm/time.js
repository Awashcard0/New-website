function timeanddate() {
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
time = h+":"+m+":"+s+ampm+" "+date;
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