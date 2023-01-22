// console.log(firebase.database())
var email = document.getElementById("email")
var password = document.getElementById("password")
var signup = document.getElementById("signup")
var signin = document.getElementById("signin")
var signout = document.getElementById("signout")
var role = document.getElementById('userRole')
var name = document.getElementById('username')
var uid;
signup.addEventListener("click", function () {
    firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
        .then(async (user) => {
            uid = user.user.uid

            localStorage.setItem("email", email.value)

            localStorage.setItem("uid", user.user.uid)

            var obj = {
                name: "demo",
                email: email.value,
                password: password.value,
                name: username.value,
                role: role.value,
                uid: user.user.uid

            }

            await firebase.database().ref("users/").child(user.user.uid).set(obj)
            console.log(obj)


            firebase.auth().signInWithEmailAndPassword(email.value, password.value)
                .then((user) => {
                    firebase.database().ref(`users/${uid}`).once('value', (snapshot) => {
                        var data = snapshot.toJSON()
                        var role = data.role;
        
                        if (role == 'Admin') {
                            window.location.replace('./adminpage.html')
                        } else if (role == 'User') {
                            window.location.replace('./userpage.html')
                        } else {
                            alert('Error Occured')
                        }
                    })
                })
                .catch((err) => {
                    console.log(err.message)
                })

        })
        .catch((e) => {
            console.log(e.message)
        })

})
signin.addEventListener("click", function () {
    firebase.auth().signInWithEmailAndPassword(email.value, password.value)
        .then((user1) => {
            uid = user1.user.uid
            localStorage.setItem("uid", user1.user.uid)
            localStorage.setItem("email", user1.user.email)

            firebase.database().ref(`users/${uid}`).once('value', (snapshot) => {
                var data = snapshot.toJSON()
                var role = data.role;

                if (role == 'Admin') {
                    window.location.replace('./adminpage.html')
                } else if (role == 'User') {
                    window.location.replace('./userpage.html')
                } else {
                    alert('Error Occured')
                }
            })
        })
        .catch((err) => {
            alert(err.message)
        })
})

