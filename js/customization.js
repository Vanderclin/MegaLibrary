$("#modal-account-check").click(function () {
	setTimeout(function () {
			$("#modal-account-check-collapse").collapse("hide");
		},
		3000);
});


function readURLTwo(input) {
	if (input.files && input.files[0]) {
		var reader = new FileReader();
		reader.onload = function (f) {
			$("#book_image_preview").attr("src", f.target.result);
		};
		reader.readAsDataURL(input.files[0]);
	}
}

$("#book_image").change(function () {
	readURLTwo(this);
});


function accountSignIn() {
	document.getElementById("main-signin").style.display = "block";
	document.getElementById("main-signup").style.display = "none";
}

function accountSignUp() {
	document.getElementById("main-signin").style.display = "none";
	document.getElementById("main-signup").style.display = "block";
}
/**************************************************************************************/
function readURL(input) {
	if (input.files && input.files[0]) {
		var reader = new FileReader();
		reader.onload = function (e) {
			$("#avatar_view").attr("src", e.target.result);
		};
		reader.readAsDataURL(input.files[0]);
	}
}

$("#avatar").change(function () {
	readURL(this);
});
