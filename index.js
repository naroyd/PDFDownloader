document.getElementsByClassName('cancel')[0].addEventListener("click", function (e){
    chrome.tabs.query({active: true}, function(tabs) {
        let tab = tabs[0];
        if (tab) {
            chrome.scripting.executeScript(
                {
                    target:{tabId: tab.id, allFrames: true},
                    func:reloadTab
                })
        }
    })
    document.getElementsByClassName('status')[0].innerText='available for parsing and downloading'
    document.getElementsByClassName('parse')[0].style.display='inline-block'
    document.getElementsByClassName('advanced')[0].style.display='block'
    document.getElementsByClassName('attention')[0].style.display='block'
    document.getElementsByClassName('warning')[0].style.display='none'
    document.getElementsByClassName('status-img')[0].src="/source/icons/File_Check.svg"
    document.getElementsByClassName('wait')[0].style.display='none'
    document.getElementsByClassName('cancel')[0].style.display='none'
})
window.addEventListener('load', function (e){
    chrome.tabs.query({active: true}, function(tabs) {
        let tab = tabs[0];
        if (tab) {
            chrome.scripting.executeScript(
                {
                    target:{tabId: tab.id, allFrames: true},
                    func:onLoad,
                    args:[time]
                }).then(injectionResults => {
                    const {frameId, result} = injectionResults.at(-1)
                    if (result){
                        document.getElementsByClassName('status')[0].innerText='available for parsing and downloading'
                        document.getElementsByClassName('parse')[0].style.display='inline-block'
                        document.getElementsByClassName('advanced')[0].style.display='block'
                        document.getElementsByClassName('attention')[0].style.display='block'
                        document.getElementsByClassName('status-img')[0].src="/source/icons/File_Check.svg"
                    }
                })
        }
    }
    )
}
)


document.getElementsByClassName('parse')[0].addEventListener("click", function (e){
    let time = Number(document.getElementById('time').value)
    let toggleStatus = Number(document.getElementById('toggle-status').innerText)
    let height;
    let width;
    if(toggleStatus){
        height = Math.floor(Number(document.getElementById('height').value)/0.2645833333)
        width = Math.floor(Number(document.getElementById('width').value)/0.2645833333)
    }
    chrome.tabs.query({active: true}, function(tabs) {
        let tab = tabs[0];
        let url;
        if (tab) {
            chrome.scripting.executeScript(
                {
                    target:{tabId: tab.id, allFrames: true},
                    func:grabImages,
                    args:[time]
                }).then(injectionResults => {
                    const {frameId, result} = injectionResults.at(-1)
                            if(result.length){
                                const pdfKit = require('pdfkit');
                                const blobStream = require('blob-stream');
                                const doc = new pdfKit({autoFirstPage:false})
                                for(let i=0; i<result.length; i++){

                                    let img = doc.openImage(Buffer.from(result[i].replace('data:image/png;base64,',''), 'base64'));
                                    if(toggleStatus){
                                        doc.addPage({size: [width, height]});
                                        doc.image(img, 0, 0, {align: 'center', valign: 'center', width: width, height: height})
                                    }
                                    else{
                                        doc.addPage({size: [img.width, img.height]});
                                        doc.image(img, 0, 0, {align: 'center', valign: 'center'})
                                    }
                                }
                                const stream = doc.pipe(blobStream())
                                doc.end();
                                
                                stream.on('finish', function() {
                                    url = stream.toBlobURL('application/pdf');
                                    document.getElementsByClassName('download')[0].href = url;
                                    document.getElementsByClassName('download')[0].download = url.slice(-36);
                                    document.getElementsByClassName('status-img')[0].src="/source/icons/Check_Big.svg"
                                    document.getElementsByClassName('wait')[0].style.display='none'
                                    document.getElementsByClassName('cancel')[0].style.display='none'
                                    document.getElementsByClassName('warning')[0].style.display='none'
                                    document.getElementsByClassName('download')[0].style.display='inline-block'
                                    document.getElementsByClassName('reload')[0].style.display='inline-block'
                                })
                            }
                    }
                );
        } else {
            alert("There are no active tabs")
        }
    })    
})

function reloadTab(){
    window.location.reload();
}

async function grabImages(time) {
    let arr = []
    let pages_count = document.getElementsByClassName('page').length;
    let viewer = document.getElementById('viewerContainer');
    viewer.scrollTo(0,0);
    let position = 0
    let pg=document.getElementsByClassName('page')
    for(let i=1; i<=pages_count;i++){
        await new Promise(r => setTimeout(r, time));
        let img = new Image();
        let scrl = Number(pg[i-1].style.height.slice(0, pg[i-1].style.height.toString().length-2))+11
        position+=scrl
        img.src = document.getElementById('page'+i).toDataURL('image/png')
        arr.push(img.src)
        viewer.scrollTo(0, position);
    }
    viewer.scrollTo(0, 0);
    return arr
}
function onLoad(){
    return document.documentElement.innerHTML.indexOf('viewer.js')>-1;
}
