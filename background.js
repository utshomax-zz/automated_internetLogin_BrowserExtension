var online=navigator.onLine;

async function checkNet() {
    return new Promise(function (resolve, reject) {
        if(online){
            var xhr = new XMLHttpRequest();
            xhr.open('HEAD', 'https://google.com', true);
            xhr.timeout = 2000; 
            xhr.onload = function () {
                if(xhr.status>=200 && xhr.status<=308){
                    resolve('loaded');
                }

            };
            xhr.ontimeout = function (e) {
                opentab();
                resolve('Timeout');
            };
            xhr.send();
        }
        else{
            resolve('offline');
        }    
    });
}

function opentab(){
    const INTERVAL = 10000;
    setTimeout(function(){
        chrome.tabs.create({url: "https://192.168.1.220/PortalMain", active: false }, tab =>{
            setTimeout(function(){
                chrome.tabs.remove(tab.id);
            },INTERVAL);
        }); 
    },INTERVAL);
}

async function main(){
    await checkNet();
}

main();

chrome.runtime.onInstalled.addListener(function (object) {
    chrome.tabs.create({url: "https://github.com/utshomax/Automated_InternetLogin_BrowserExtension"});
});