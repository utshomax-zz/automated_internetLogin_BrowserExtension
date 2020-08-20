function checkNet(){
    var xhr = new XMLHttpRequest();
    xhr.open('HEAD', 'https://google.com', true);

    xhr.timeout = 4000; 

    xhr.onload = function () {
    if(xhr.status>=200 && xhr.status<=308){
        chrome.tabs.create({url: "https://google.com", active: true });
    }
    else{
        console.log('Something wrong');
    }
    };

    xhr.ontimeout = function (e) {
        opentab();
    };

    xhr.send(null);
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

checkNet();

