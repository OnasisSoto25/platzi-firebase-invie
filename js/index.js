var btnLogin = document.getElementById('btnLogin');
var btnLogout= document.getElementById('btnLogout');
var ref = firebase.database().ref("usuario");

firebase.auth().onAuthStateChanged(function (user){
    if (user){
        console.log('tenemos usuario');
        console.log(user);
    } else {
        //window.location.replace('index.html');
        console.log('no tenemos usuario')
    }
});



// Facebook
btnLogin.addEventListener("click", function(event){
    event.preventDefault();
    var provider = new firebase.auth.FacebookAuthProvider();
    provider.addScope('public_profile');//Permiso para inicio de sesion con google, solo ver contactos
    firebase.auth().signInWithPopup(provider)
        .then(function (datosUsuario) {
            console.log(datosUsuario);
            usuario = {
                nombre: datosUsuario.user.displayName,
                email: datosUsuario.user.email,
                uid: datosUsuario.user.uid
            };
            agregarUsuario(usuario, datosUsuario.user.uid);
        }).catch(function (err) {
            console.log(err);
    })
});

// Google
/*btnLogin.addEventListener("click", function(event){
    event.preventDefault();
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');//Permiso para inicio de sesion con google, solo ver contactos
    firebase.auth().signInWithPopup(provider)
        .then(function (datosUsuario) {
            console.log(datosUsuario);
        }).catch(function (err) {
        console.log(err);
    })
});*/

btnLogout.addEventListener("click", function(event){
    event.preventDefault();
    firebase.auth().signOut();
});

function agregarUsuario(usuario, userId){
    ref.child(userId).update(usuario);
}