
function showNav() {

    var i = document.getElementById('i');
    var nav = document.getElementById('navbar');

    if (!nav.style.display || nav.style.display === "none") {
        nav.style.display = "block";
        i.className = "fa fa-close";
    }
    else {
        nav.style.display = "none";
        i.className = "fa fa-bars";
    }
}

var prev_scroll = window.pageYOffset;
window.onscroll = function () {
    var cur_scroll = window.pageYOffset;
    if (prev_scroll > cur_scroll) {
        document.getElementById("navbar").style.top = "20px";
    } else {
        document.getElementById("navbar").style.top = "-500px";
    }
    prev_scroll = cur_scroll;
}

function showPassword() {
    var pass = document.getElementById('password');
    if (pass.type === "password") {
        pass.type = "text";
    } else {
        pass.type = "password";
    }
}


function showAvtars() {

    var avt = document.getElementById('avt');

    if (!avt.style.display || avt.style.display === "none") {
        avt.style.display = "flex";
    }
    else {
        avt.style.display = "none";
    }

}

function showImageinTab(src) {
    // Open the image in a new tab
    window.open(src, '');

}


