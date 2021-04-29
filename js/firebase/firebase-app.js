var firebaseConfig = {
	apiKey: "AIzaSyA0xOmYC-T8rrcyRgf3MabB0BgRDOuDACg",
	authDomain: "megalibrary-5cafb.firebaseapp.com",
	databaseURL: "https://megalibrary-5cafb.firebaseio.com",
	projectId: "megalibrary-5cafb",
	storageBucket: "megalibrary-5cafb.appspot.com",
	messagingSenderId: "86739228796",
	appId: "1:86739228796:web:e70b4a83f163d4135151f9",
	measurementId: "G-K07Z821C5T"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

firebase.auth().onAuthStateChanged(function (user) {
	if (user) {
		window.location.replace("/home/");
	} else {

	}
});

function signIn() {

	var email = document.getElementById('email-signin').value;
	var password = document.getElementById('password-signin').value;
	if (email.length < 4) {
		alert('Por favor insira um endereço de e-mail.');
		return;
	}
	if (password.length < 4) {
		alert('Por favor insira uma senha.');
		return;
	}
	firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
		var errorCode = error.code;
		var errorMessage = error.message;
		if (errorCode === 'auth/wrong-password') {
			alert('Senha incorreta.');
		} else if (errorCode === 'auth/user-not-found') {
			alert('Usuário não registrado.');
		} else {
			alert(errorMessage);
		}
		alert(error);
		document.getElementById('button-sign-in').disabled = false;
	});
	document.getElementById('button-sign-in').disabled = true;
}


function signUp() {

	var email = document.getElementById('email-signup').value;
	var password = document.getElementById('password-signup').value;
	if (email.length < 4) {
		alert('Por favor insira um endereço de e-mail.');
		return;
	}
	if (password.length < 4) {
		alert('Por favor insira uma senha.');
		return;
	}
	// Create user with email and pass.
	firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
		// Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;
		if (errorCode == 'auth/weak-password') {
			alert('A senha é muito fraca.');
		} else {
			alert(errorMessage);
			
		}
		document.getElementById('button-sign-up').disabled = false;
	});
	document.getElementById('button-sign-up').disabled = true;
}
