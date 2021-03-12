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


/** Switch Checkbox Button **/
$("#deleteaccount").click(function () {
	if (document.getElementById("deleteaccount").checked == true) {
        document.getElementById("delete_account").disabled = false;
    } else {
        document.getElementById("delete_account").disabled = true;
    }
});

$("#newpassword").click(function () {
	if (document.getElementById("newpassword").checked == true) {
        document.getElementById("new_password_account").disabled = false;
    } else {
        document.getElementById("new_password_account").disabled = true;
    }
});



/* globals Chart:false, feather:false */

  // Grap
  
