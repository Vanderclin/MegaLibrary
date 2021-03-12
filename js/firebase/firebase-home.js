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
		var displayName = user.displayName;
		var email = user.email;
		var emailVerified = user.emailVerified;
		var photoURL = user.photoURL;
		var isAnonymous = user.isAnonymous;
		var uid = user.uid;
		var providerData = user.providerData;
		// Uploads & Downloads
		firebase.database().ref('users').child(uid).on('value', function (snapshot) {
			var upl = snapshot.child('uploads_level').val();
			var dwl = snapshot.child('downloads_level').val();
			
			
			
			
			/** Uploaded daily **/
			var sunday_ul = snapshot.child('uploads_scale').child('sunday').val();
			var monday_ul = snapshot.child('uploads_scale').child('monday').val();
			var tuesday_ul = snapshot.child('uploads_scale').child('tuesday').val();
			var wednesday_ul = snapshot.child('uploads_scale').child('wednesday').val();
			var thursday_ul = snapshot.child('uploads_scale').child('thursday').val();
			var friday_ul = snapshot.child('uploads_scale').child('friday').val();
			var saturday_ul = snapshot.child('uploads_scale').child('saturday').val();
			/** Downloaded daily **/
			var sunday_dl = snapshot.child('downloads_scale').child('sunday').val();
			var monday_dl = snapshot.child('downloads_scale').child('monday').val();
			var tuesday_dl = snapshot.child('downloads_scale').child('tuesday').val();
			var wednesday_dl = snapshot.child('downloads_scale').child('wednesday').val();
			var thursday_dl = snapshot.child('downloads_scale').child('thursday').val();
			var friday_dl = snapshot.child('downloads_scale').child('friday').val();
			var saturday_dl = snapshot.child('downloads_scale').child('saturday').val();
			
			if (upl === null) {
				document.getElementById("level_upload").innerText = 0;
			} else {
				document.getElementById("level_upload").innerText = upl;
			}
			if (dwl === null) {
				document.getElementById("level_download").innerText = 0;
			} else {
				document.getElementById("level_download").innerText = dwl;
			}
			

			var ctx = document.getElementById('panel_chart');
			// eslint-disable-next-line no-unused-vars
			var mChart = new Chart(ctx, {
				type: 'line',
				data: {
					labels: ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'],
					datasets: [{
						data: [ sunday_ul, monday_ul, tuesday_ul, wednesday_ul, thursday_ul, friday_ul, saturday_ul],
						label: 'Enviados',
						lineTension: 0,
						backgroundColor: '#573B93',
						borderColor: '#8257E6',
						borderWidth: 3,
						pointBackgroundColor: '#573B93',
					},
					{
						data: [ sunday_dl, monday_dl, tuesday_dl, wednesday_dl, thursday_dl, friday_dl, saturday_dl ],
						label: 'Baixados',
						lineTension: 0,
						backgroundColor: '#BC417E',
						borderColor: '#DC3545',
						borderWidth: 3,
						pointBackgroundColor: '#BC417E'
					}
					]
				},
				options: {
					scales: {
						yAxes: [{
							ticks: {
								beginAtZero: true
							}
						}]
					},
					legend: {
						display: true
					}
				}
			});


		});

		firebase.database().ref('users').child(uid).on('value', function (snapshot) {
			var presentation = snapshot.child('presentation').val();
			if ((presentation === null) || (presentation === false)) {
				$("#modal_presentation").modal("show");
			}
		});


		// Displays the user's photo
		if (photoURL === null) {
			document.getElementById("modal-account-image").src = "../assets/icons/avatar.png";
			document.getElementById("dropdownAvatar").src = "../assets/icons/avatar.png";
			$("#modal-update-profile").modal("show");
		} else {
			document.getElementById("modal-account-image").src = photoURL;
			document.getElementById("dropdownAvatar").src = photoURL;
		}

		// Displays the user's name
		if (displayName === null) {
			document.getElementById("modal-account-name").innerText = "Unknow";
			document.getElementById("navbar-name").innerText = "Unknow";
			document.getElementById("modal-account-email").innerText = email;
		} else {
			document.getElementById("modal-account-name").innerText = displayName;
			document.getElementById("navbar-name").innerText = displayName;
			document.getElementById("modal-account-email").innerText = email;
		}
		// Displays user verification [True or False]
		if (emailVerified === false) {
			document.getElementById("modal-account-check").src = "../assets/icons/user_unverified.png";
			document.getElementById("modal-account-status").innerText = "status: usuário não verificado";
			$("#alert-message").toast("show");
			document.getElementById("message").innerText = "Por favor, confirme seu endereço de e-mail";
			document.getElementById("modal-account-activation-button").style.display = "block";
			document.getElementById("floatingActionButton").style.display = "none";
		} else {
			document.getElementById("modal-account-check").src = "../assets/icons/user_verified.png";
			document.getElementById("modal-account-status").innerText = "status: usuário verificado";
			document.getElementById("modal-account-activation-button").style.display = "none";
			document.getElementById("floatingActionButton").style.display = "block";
		}

	} else {
		window.location.replace('/');
	}
});

$("#modal-button-signout").click(function () {
	firebase.auth().signOut().then(function () {
		// Sign-out successful.
		window.location.reload();
	}).catch(function (error) {
		// An error happened.
	});
});

function accountActivation() {
	var user = firebase.auth().currentUser;
	user.sendEmailVerification().then(function () {
		// Email sent.
	}).catch(function (error) {
		// An error happened.
	});
}

function setTrue() {
	var uid = firebase.auth().currentUser.uid;
	firebase.database().ref('users').child(uid).child('presentation').set(true);
}

/** Account Delete *****************************************/
function accountDelete() {
	var user = firebase.auth().currentUser;
	user.delete().then(function () {
		// User deleted
		setTimeout(function () {
			window.location.replace("/");
		}, 1000);
	}).catch(function (error) {
		// An error happened.
	});
}
/***********************************************************/

function updateProfile() {

	var update_avatar = document.getElementById("avatar").files[0];
	var update_name = document.getElementById("avatar-name").value;
	var uid = firebase.auth().currentUser.uid;
	var storageRef = firebase.storage().ref("users").child("profiles").child(uid);
	var uploadTask = storageRef.put(update_avatar);

	uploadTask.on('state_changed', function (snapshot) {
		// Observe state change events such as progress, pause, and resume
		// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
		var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
		$('.progress-bar').css('width', progress + '%').attr('aria-valuenow', progress);
		switch (snapshot.state) {
			case firebase.storage.TaskState.PAUSED: // or 'paused'
				console.log('Upload is paused');
				break;
			case firebase.storage.TaskState.RUNNING: // or 'running'
				console.log('Upload is running');
				break;
		}
	}, function (error) {
		// Handle unsuccessful uploads
	}, function () {
		// Handle successful uploads on complete
		// For instance, get the download URL: https://firebasestorage.googleapis.com/...
		uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
			console.log('File available at', downloadURL);

			var user = firebase.auth().currentUser;
			var data = {
				name: update_name,
				picture: downloadURL
			};
			firebase.database().ref().child("users").child(uid).set(data);

			user.updateProfile({
				displayName: update_name,
				photoURL: downloadURL
			}).then(function () {
				// Update successful.
			}).catch(function (error) {
				// An error happened.
			});
		});
	});
}

$(document).ready(function () {

	firebase.database().ref('posts').orderByChild('book_name').on('child_added', function (snapshot) {
		var card = "";
		card += '<div class="card">';
		card += '<img src="' + snapshot.child('book_image').val() + '" id="' + snapshot.child('book_key').val() + '" onClick="resultClick(this.id)">';
		card += '<h5 class="hide">' + snapshot.child('book_name').val() + '</h5>';
		card += '</div>';

		$("#content-books").html($("#content-books").html() + card);
	});

	$("#publish_post").on('click', function () {

		var bookimage = document.getElementById("book_image").files[0];
		var bookname = $("#book_name").val();
		var bookauthor = $("#book_author").val();
		var bookurl = $("#book_url").val();
		var bookdescription = $("#book_description").val();

		// Generate a reference to a new location and add some data using push()
		var postsRef = firebase.database().ref('posts').push();
		// Get the unique key generated by push()
		var bookkey = postsRef.key;


		var ref = firebase.storage().ref("book");

		var uploadTask = ref.child("images/" + bookimage.name).put(bookimage);
		uploadTask.on('state_changed', function (snapshot) {
			var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
			$('.progress-bar').css('width', progress + '%').attr('aria-valuenow', progress);
			switch (snapshot.state) {
				case firebase.storage.TaskState.PAUSED: // or 'paused'
					console.log('Upload is paused');
					break;
				case firebase.storage.TaskState.RUNNING: // or 'running'
					console.log('Upload is running');
					break;
			}
		}, function (error) {
			// Handle unsuccessful uploads
		}, function () {
			firebase.database().ref('users').child(uid).child('uploads_scale').child(daysName(new Date)).set(firebase.database.ServerValue.increment(1));
			// Handle successful uploads on complete
			// For instance, get the download URL: https://firebasestorage.googleapis.com/...
			uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
				console.log('File available at', downloadURL);
				firebase.database().ref('posts').child(bookkey).set({
					book_image: downloadURL,
					book_name: bookname,
					book_url: bookurl,
					book_description: bookdescription,
					book_key: bookkey
				});
			});
		});

		$("#book_image_preview").attr("src", "../assets/images/cover.png");
		$("#book_name").val("");
		$("#book_author").val("");
		$("#book_url").val("");
		$("#book_description").val("");

		var uid = firebase.auth().currentUser.uid;
		firebase.database().ref('users/').child(uid).child('uploads_level').set(firebase.database.ServerValue.increment(1));

		setTimeout(function () {
			$("#modal_add").modal("hide");
		}, 5000);

	});

});

function resultClick(key) {
	$("#modal-content-book").modal("show");
	firebase.database().ref('posts').child(key).child('book_views').set(firebase.database.ServerValue.increment(1));
	firebase.database().ref('posts').child(key).on('value', function getData(snapshot) {
		var image = snapshot.child('book_image').val();
		var name = snapshot.child('book_name').val();
		var author = snapshot.child('book_author').val();
		var description = snapshot.child('book_description').val();
		var download = snapshot.child('book_download').val();
		var views = snapshot.child('book_views').val();
		var url = snapshot.child('book_url').val();

		document.getElementById("b_image").src = image;
		document.getElementById("b_name").innerText = name;
		document.getElementById("b_author").innerText = author;
		document.getElementById("b_description").innerText = description;
		if (download === null) {
			document.getElementById("b_download_number").innerText = "0";
		} else {
			document.getElementById("b_download_number").innerText = download;
		}
		if (views === null) {
			document.getElementById("b_views").innerText = "0";
		} else {
			document.getElementById("b_views").innerText = views;
		}

		var buttonDownload = "<button id='" + key + "' onClick='getURL(this.id)' class='btn btn-outline-light w-100'>Baixar</button>";
		document.getElementById("b_download").innerHTML = buttonDownload;
	});
}


function getURL(url) {
	firebase.database().ref('posts').child(url).on('value', function (snapshot) {
		var book_url = snapshot.child('book_url').val();
		if (book_url === null) {
			alert("O código não é válido!");
		} else {
			window.open(book_url, '_blank');
		}
	});
	
	var uid = firebase.auth().currentUser.uid;
	firebase.database().ref('posts').child(url).child('book_download').set(firebase.database.ServerValue.increment(1));
	firebase.database().ref('users').child(uid).child('downloads_level').set(firebase.database.ServerValue.increment(1));
	firebase.database().ref('users').child(uid).child('downloads_scale').child(daysName(new Date)).set(firebase.database.ServerValue.increment(1));
	$("#modal-content-book").modal("hide");
}

function daysName(date) {
	var days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
	var dn = String(date.getDay());
	var dayName = days[dn];
    var names = dayName;
    return names;
}
