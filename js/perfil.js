// var btnLogin = document.getElementById('btnLogin');
var btnLogout= document.getElementById('btnLogout');
var ref = firebase.database().ref("usuario");
var btnEditar = document.getElementById('perfilEditar');
var perfilNombre = document.getElementById('perfilNombre');
var perfilEmail = document.getElementById('perfilEmail');

var refImg = firebase.storage().ref();
refImg.child('').getDownloadURL()
    .then(function (url) {

    });

var usuario = {};

// var refTest = firebase.database().ref("test");
// var btnPush = document.getElementById("btnPush");
// var btnSet = document.getElementById("btnSet");
// var btnUpdate = document.getElementById("btnUpdate");
// var btnRemove = document.getElementById("btnRemove");

// btnRemove.addEventListener("click", function () {
//     ref.remove();
// });

btnEditar.addEventListener('click', function () {

});

function leerInformacion(uId){
    ref.child(uId).once('value', function (data) {
        console.log(data.val());
        llenarInformacion(data.val().nombre, data.val().email);
    });
}

function llenarInformacion(nombre, email){
    perfilEmail.innerHTML = email;
    perfilNombre.innerText = nombre;
}


//leerInformacion();

// btnPush.addEventListener("click", function (event) {
//     var objeto = {
//         curso: "firebase",
//         profesor: "angel",
//         contenidos: {
//             primero: "autenticacion"
//         }
//     };
//     refTest.push(objeto)
//         .then( function () {
//             alert("se subio correctamente")
//         }).catch(function (error) {
//             console.log(error)
//     })
// });
//
// btnUpdate.addEventListener("click", function () {
//     var obj = {
//         // curso: "desarrollo web",
//         // profesor: "Leonidas Esteban",
//         // contenido: {
//         //     primero: "formulario"
//         // }
//         lugar: 'platzi',
//         curso: 'react JS'
//     };
//     refTest.update(obj);
// });
//
// btnSet.addEventListener("click", function () {
//     var obj = {
//         curso: 'Responsive',
//         profesor: "Leonidas",
//         contenido: {
//             primero: 'media-query'
//         }
//     };
//     refTest.set(obj)
//         .then(function () {
//             alert('set');
//     }).catch(function (error) {
//         console.log(error);
//         alert('fallo el set')
//     })
// });

var usuario = {};
firebase.auth().onAuthStateChanged(function (user){
    if (user){
        console.log('tenemos usuario');
        leerInformacion(user.uid);
        console.log(user);
    } else {
        console.log('no tenemos usuario')
    }
});



// Facebook
// btnLogin.addEventListener("click", function(event){
//     event.preventDefault();
//     var provider = new firebase.auth.FacebookAuthProvider();
//     provider.addScope('public_profile');//Permiso para inicio de sesion con google, solo ver contactos
//     firebase.auth().signInWithPopup(provider)
//         .then(function (datosUsuario) {
//             console.log(datosUsuario);
//             usuario = {
//                 nombre: datosUsuario.user.displayName,
//                 email: datosUsuario.user.email,
//                 uid: datosUsuario.user.uid
//             };
//             agregarUsuario(usuario);
//         }).catch(function (err) {
//         console.log(err);
//     })
// });

btnLogout.addEventListener("click", function(event){
    event.preventDefault();
    firebase.auth().signOut();
});



function agregarUsuario(usuario){
    ref.push(usuario)
}