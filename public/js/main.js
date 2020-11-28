$(document).ready(function () {
	$('#domain-name').hide();
	$('#short-hand').hide();
	$('#copy-msg').hide();
	$('#short-url').hide();
	$('#copy-icon').hide();

	$('#shorten-btn').click(function () {
		if ($('#custom-checkbox').is(':checked')) {
			if (!$('#long-url').val()) {
				myFunction('Please enter proper URL');
			} else if (!$('#short-hand').val()) {
				myFunction('Please enter proper custom URL')
			} else {
				$('#copy-msg').show();
				$('#short-url').show();
				$('#copy-icon').show();
			}
		} else if (!$('#long-url').val()) {
			myFunction('Please enter proper URL');
		} else {
			$('#copy-msg').show();
			$('#short-url').show();
			$('#copy-icon').show();
		}
	});

	$('#custom-checkbox').change(function () {
		if (this.checked) {
			$('#domain-name').show();
			$('#short-hand').show();
		} else {
			$('#domain-name').hide();
			$('#short-hand').hide();
		}
	});
});

function myFunction(message) {
	// Get the snackbar DIV
	var x = document.getElementById("snackbar");

	x.innerHTML=message;

	// Add the "show" class to DIV
	x.className = "show";

	// After 3 seconds, remove the show class from DIV
	setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  }