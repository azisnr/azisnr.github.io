$(document).ready(function(){
    Notification.requestPermission(function(status){
        console.log('Notification permissiln status ..',status);
    });

    function displayNotification(){
        if(Notification.permission === 'granted'){
        console.log("wwwwwww");

            navigator.serviceWorker.getRegistration()
            .then(function(reg){
                var opt = {
                    body : 'Avengers: End Games',
                    icon : 'images/icons/icon-96x96.png',
                    vibrate : [100,50,100],
                    data : {
                        dateOfArrival : Date.now(),
                        primaryKey : 1
                    },
                    actions : [
                        {action : 'google.com', title : 'Kunjungi Laman'},
                        {action : 'close', title : 'Close'}
                    ]
                };
                reg.showNotification('Marvel',opt);
            })
        }
    }
    
    $('#notification').on('click', function(){
        console.log('www');
        displayNotification();
    })
    
    function isOnline(){
        $status = $('#connection-status');
        if(navigator.online){
            status.html = '<p>anda Online</p>';
        }
        else {
            status.html = '<p>anda Offline</p>';
        }
        window.addEventListene('online',isOnline);
        window.addEventListener('offline',isOnline);
        isOnline();
    }

});




//Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/serviceworker.js')
        .then(function(reg){
            return navigator.serviceWorker.ready;
        }).then(function(reg){
            document.getElementById('req-sync')
            .addEventListener('click',function(){
                reg.sync.register('image-fetch').then(()=>{
                    console.log('syn-register');
                }).catch(function(err){
                    console.log('fetch image gagal, Error :',err);
                });
            });
        })
        // Registration was successful
        // console.log('ServiceWorker registration successful with scope: ', registration.scope);
      }, function(err) {
        // registration failed :(
        console.log('ServiceWorker registration failed: ', err);
      });
    }

self.addEventListener('sync',function(event){
    console.log('firing sync');
    if(event.tag === 'image-fetch'){
        console.log('sync event fired');
        event.waitUntul(fetchImage());
    }
});

function fetchImage(){
    console.log('Firing : doSomeStuff()');
    fetch('/images/logo-monster.png').then(function(response){
        return response;
    }).then(function(text){
        console.log('Request Succes : ',text);
    }).catch(function(err){
        console.log('Request Failed : ', err);
    });
}