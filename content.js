//Reading tab data and login with userid and password
var id=[];
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
async function getID(){
    await chrome.storage.sync.get('username', function(items){
        if(!chrome.runtime.error){
            if(items.username){
                id[0]=items.username;
            }
        }
    }); 
    await chrome.storage.sync.get('password', function(items){
        if(!chrome.runtime.error){
            if(items.password){
                id[1]=items.password;
            }
        }
    }); 
    return;  
}
function privacyError(){
    try{
        var btn = document.getElementById('details-button')
        var link = document.getElementById('proceed-link')
        if(btn && link){
            btn.click();
            link.click();
        }
    }
    catch(e){

    }    
}

function scripty(){
    var myVar = setTimeout(
        function () {
          var username = document.getElementById('LoginUserPassword_auth_username')
          var password = document.getElementById('LoginUserPassword_auth_password')
          var login= document.getElementById('UserCheck_Login_Button')
          if (username && password) {
            username.value = id[0];
            password.value = id[1];
            login.click();
          } 
        }, 2000);
}
async function main(){
    await getID();
    scripty();
}
session();
if(window.location.href =='https://192.168.1.220/PortalMain' && grunted()==false){
    main();
}
else{
    privacyError();
}