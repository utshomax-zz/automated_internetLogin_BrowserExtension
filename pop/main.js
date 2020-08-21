var arr=[];
function saveTodb(username,password){
    chrome.storage.sync.set({'username' : username}, function(){
        if(chrome.runtime.error){
            console.log("Error.");
        }
    });
    chrome.storage.sync.set({'password' : password}, function(){
        if(chrome.runtime.error){
            console.log("Error.");
        }
    });
}

document.getElementById("submitbtn").addEventListener("click", function(){
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    if(arr[0]==0){
        if(username!='' && password!=''){
            saveTodb(username,password);
            console.log("saved");
            location.reload();

        }
        else{
            console.log('check input');
        }
    }
    if(arr[0]==1){
        console.log('user exist');
    }

});
chrome.storage.sync.get('isonline', function(items){
    if(!chrome.runtime.error){
        if(items.isonline){
            console.log(items.isonline);
        }
    }
    else{
        console.log('runtime');
    }
});
chrome.storage.sync.get('username', function(items){
    if(!chrome.runtime.error){
        if(items.username){
            console.log(items.username);
            check(1);
            document.getElementById('card').style.display='none';
            document.getElementById('online').style.display='block';
        }
        else{
            check(0);
        }
    }
    else{
        console.log('runtime');
    }
});

function check(c){
    if(c==0){
        arr[0]=0;
    }
    if(c==1){
        arr[0]=1;
    }
}