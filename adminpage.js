var logout=document.getElementById('logout')
var productName = document.getElementById('productname')
var productPrice = document.getElementById('productprice')
var table = document.getElementsByTagName('table')[0]

logout.addEventListener('click',function(){
    firebase.auth().signOut();
    localStorage.removeItem('uid')
    localStorage.removeItem('email')
    window.location.replace('index.html')
})

function addproduct(){
    var productId = firebase.database().ref(`products/`).push().getKey()
    var obj = {
        productName : productName.value,
        productPrice : productPrice.value,
        productID : productId
    }
    firebase.database().ref(`products/${productId}`).set(obj)
    console.log('Added to db')
    window.location.reload();
}

function editproduct(e) {
    var from = e.parentNode.parentNode.childNodes[1].innerText
    var p = prompt('Edit ', from)
    var editKey = e.parentNode.parentNode.childNodes[1].getAttribute('id')
    e.parentNode.parentNode.childNodes[1].innerText = p
    if (p !== null) {
        var objEdit = {
            task: p,
            status: 'active',
            todoKey: editKey
        }
        db.ref(`users/${uid}/`).child('todos/').child(editKey).set(objEdit)
        // console.log(objEdit)
    } else{
        alert('Changes not found')
        e.parentNode.parentNode.childNodes[1].innerText = from
    }
    // console.log(from, ' ',editKey)
}


async function showData(){
    await firebase.database().ref('products/').once('value',(s)=>{
        var data = Object.values(s.toJSON());
        // table.innerHTML = ""
        data.map((v,i)=>{
            table.innerHTML +=`
            <td>${v.productName}</td>
            <td>${v.productPrice}</td>
            <td><button id=${v.productID} onclick="rem(this);"class="btn btn-danger">Delete
            <button id=${v.productID} onclick="rem(this);"class="btn btn-danger">Edit</td>
            `
        })
    })
}
showData();

function rem(e){
    var delID = e.getAttribute('id')
    firebase.database().ref(`products/${delID}`).remove()
    e.parentNode.parentNode.remove()
    window.location.reload();
}