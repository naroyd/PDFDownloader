let parse = document.getElementsByClassName('parse')[0];
let download = document.getElementsByClassName('download')[0];
let reload = document.getElementsByClassName('reload')[0];
let wait = document.getElementsByClassName('wait')[0];
let cancel = document.getElementsByClassName('cancel')[0];

let parseHover = document.getElementsByClassName('parse-hover')[0];
let downloadHover = document.getElementsByClassName('download-hover')[0];
let reloadHover = document.getElementsByClassName('reload-hover')[0];
let cancelHover = document.getElementsByClassName('cancel-hover')[0];


let attention = document.getElementsByClassName('attention')[0];
let warning = document.getElementsByClassName('warning')[0];

let switchToggle= document.getElementsByClassName('switch-toggle')[0];
let toggle = document.getElementsByClassName('toggle')[0];

let advanced = document.getElementsByClassName('advanced')[0];

let imgStatus = document.getElementsByClassName('status-img')[0];

let toggleActive = false

document.addEventListener('input', function(e){
    let el = e.target;
    if (el.tagName == "INPUT"){
        if (Number(el.value) > 10000 || el.value=='' || Number(el.value)<1 || el.value.indexOf('.')>-1){
            el.style.borderColor='#F24848';
            el.style.color = '#F24848';
            parse.style.display='none';
        }
        else{
            parse.style.display='inline-block';
            el.removeAttribute('style');
        }
    }
});

parse.addEventListener("mouseout", function(e){
    parseHover.style.transform=`translate(0px, 0px)`;
});
parse.addEventListener("mousemove", function(e){
    let x = e.pageX-150;
    let y = e.pageY-175;

    parseHover.style.transform=`translate(${x}px, ${y}px)`;
});

parse.addEventListener("click", function (e){
    parse.style.display = 'none';
    advanced.style.display = 'none';
    wait.style.display = 'inline-block';
    cancel.style.display = 'inline-block';
    attention.style.display = 'none';
    warning.style.display = 'block';
    imgStatus.src = '/source/icons/Loading.svg';
});

download.addEventListener("mouseout", function(e){
    downloadHover.style.transform=`translate(0px, 0px)`;
});
download.addEventListener("mousemove", function(e){
    let x = e.pageX-150;
    let y = e.pageY-180;

    downloadHover.style.transform=`translate(${x}px, ${y}px)`;
});

reload.addEventListener("mouseout", function(e){
    reloadHover.style.transform=`translate(0px, 0px)`;
});
reload.addEventListener("mousemove", function(e){
    let x = e.pageX-150;
    let y = e.pageY-220;

    reloadHover.style.transform=`translate(${x}px, ${y}px)`;
});

reload.addEventListener('click', function(e){
    download.style.display = 'none';
    reload.style.display = 'none';
    advanced.style.display = 'block';
    parse.style.display = 'inline-block';
    warning.style.display = 'none';
    attention.style.display = 'block';
    imgStatus.src = '/source/icons/File_Check.svg';
});

cancel.addEventListener("mouseout", function(e){
    cancelHover.style.transform=`translate(0px, 0px)`;
});
cancel.addEventListener("mousemove", function(e){
    let x = e.pageX-150;
    let y = e.pageY-220;

    cancelHover.style.transform=`translate(${x}px, ${y}px)`;
});

switchToggle.addEventListener("click", function(e){
    if(!toggleActive){
        toggle.style.transform=`translateX(16px)`;
        toggle.style.backgroundColor='white';
        document.getElementById('book-format').style.display='block';
    }
    else{
        toggle.style.transform=`translateX(0px)`;
        toggle.style.backgroundColor='#ffffff00';
        document.getElementById('book-format').style.display='none';
    }
    toggleActive= !toggleActive;
    document.getElementById('toggle-status').innerText=`${Number(toggleActive)}`;
});