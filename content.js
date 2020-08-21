//Reading tab data and login with userid and password
function setOfline(){
chrome.storage.sync.set({'isonline' : '0'}, function(){
    if(chrome.runtime.error){
        console.log("Error.");
    }
});
}
function setOnline(){
    chrome.storage.sync.set({'isonline' : '1'}, function(){
        if(chrome.runtime.error){
            console.log("Error.");
        }
    });
}
function session(){
    try{
        var s=document.getElementsByClassName('portal_link')[0].innerHTML;
        console.log(s);
        if(s.trim()=='Regain access to the network'){
            window.location.href='https://192.168.1.220/Reset';
        }
        
    }
    catch{
        return false;
    }

}

function grunted(){
    try{
        var g=document.getElementById('UserCheck_Logoff_Button');
        var t=document.getElementById('nac_expiration_time');
        if(t!=null){
            console.log(t);
            setOnline();
        }
        else{
            return false;
        }
    }
    catch{
        return false;
    }
}


function scripty(){
    var myVar = setTimeout(
        function () {
          var username = document.getElementById('LoginUserPassword_auth_username')
          var password = document.getElementById('LoginUserPassword_auth_password')
          var login= document.getElementById('UserCheck_Login_Button')
    
          if (username && password) {
            username.value = "119cs0145";
            password.value = "...Dot99+++";
            login.click();
          } 
        }, 2000);
}
chrome.storage.sync.set({'username' : 'utsho'}, function(){
    if(chrome.runtime.error){
        console.log("Error.");
    }
});
chrome.storage.sync.get('username', function(items){
    if(!chrome.runtime.error){
        //do what you want to do with the data
        var x = items.username;
        console.log(x);
    }
});
session();

if(window.location.href =='https://192.168.1.220/PortalMain' && grunted()==false){
    grunted();
    scripty();
}


