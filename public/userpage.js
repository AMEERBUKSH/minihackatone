var logout=document.getElementById('logout')
logout.addEventListener('click',function(){
    firebase.auth().signOut();
    localStorage.removeItem('uid')
    localStorage.removeItem('email')
    window.location.replace('index.html')
})