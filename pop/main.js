var arr=[];
var card=document.getElementById('card').style;
var onlineView=document.getElementById('online').style;
var preload=document.getElementById('preload').style;
var on=document.getElementById('on').style;
var off=document.getElementById('off').style;
var online= navigator.onLine;

preload.display='block';
function setOfline(){
    chrome.storage.sync.set({'isonline' : '0'}, function(){
        if(chrome.runtime.error){
            console.log("Error.");
        }
        return;
    });
}

function setOnline(){
    chrome.storage.sync.set({'isonline' : '1'}, function(){
        if(chrome.runtime.error){
            console.log("Error.");
        }
        return;
    });
}
function check(c){
    if(c==0){
        arr[0]=0;
    }
    if(c==1){
        arr[0]=1;
    }
}
function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

function preStop(){
    preload.display='none';
}

async function checkNet() {
    await checkUser();
    return new Promise(function (resolve, reject) {
        if(online){
            var xhr = new XMLHttpRequest();
            xhr.open('HEAD', 'https://google.com', true);
            xhr.timeout = 2000; 
            xhr.onload = function () {
                if(xhr.status>=200 && xhr.status<=308){
                    setOnline(); 
                    resolve(xhr.status);
                }
                else {
                    setOfline();
                    resolve('rejected');
                }
            };
            xhr.ontimeout = function (e) {
                setOfline();
                resolve('timeout');
            };
            xhr.send();
        }
        else{
            setOfline();
            resolve('offline');
        }    
    });
}


async function saveTodb(username,password){
    await chrome.storage.sync.set({'username' : username}, function(){
        if(chrome.runtime.error){
            console.log("Error.");
        }
    });
    await chrome.storage.sync.set({'password' : password}, function(){
        if(chrome.runtime.error){
            console.log("Error.");
        }
    });
    return;
}
async function checkUser(){
    await chrome.storage.sync.get('username', function(items){
        if(!chrome.runtime.error){
            if(items.username){
                check(1);
                card.display='none';
                
            }
            else{
                check(0);
                onlineView.display='none';
            }
        }
        else{
            console.log('runtime');
        }
        return;
    });
    
}
async function showStatus(){
    await checkNet();
  
    await chrome.storage.sync.get('isonline', function(items){
        if(!chrome.runtime.error){
            if(items.isonline && arr[0]==1){
                sleep(2000);
                preload.display='none';
                onlineView.display='block';
                if(items.isonline=='1'){
                    card.display='none';
                    off.display='none';
                    on.display='block';
                }
                if(items.isonline=='0'){
                    card.display='none';
                    on.display='none';
                    off.display='block';
                }
            }
            if(arr[0]==0){
                sleep(2000);
                preload.display='none';
                card.display='block';
            }
        }
        else{
            console.log('runtime');
        }
        return;
    });
}
document.getElementById("submitbtn").addEventListener("click", function(){
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    if(arr[0]==0){
        if(username!='' && password!=''){
            card.display='none';
            preload.display='block';
            saveTodb(username,password);
            sleep(1500);
            preload.display='none';
            location.reload();

        }
        else{
            document.getElementById('username').style.borderBottomColor='red';
        }
    }
    if(arr[0]==1){
        console.log('user exist');
    }

});
document.getElementById("username").addEventListener("change", function(){
    document.getElementById('username').style.borderBottomColor='#7caadf';
    document.getElementById('password').style.borderBottomColor='#7caadf';
});



document.getElementById("checkinternet").addEventListener("click", function(){
    showStatus();
    location.reload();
});


document.getElementById("remove").addEventListener("click", function(){
    saveTodb('','');
    location.reload();
});

document.getElementById("connect").addEventListener("click", function(){
    window.open('https://192.168.1.220/Reset', '_blank');
});
showStatus();

