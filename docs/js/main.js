$(document).ready(function () {
	$('#domain-name').hide();
	$('#short-hand').hide();
	$('#copy-msg').hide();
	$('#short-url').hide();
	$('#copy-icon').hide();

	$('#copy-icon').click(function () {
		const shortUrl = $('#short-url').text();
		console.log(shortUrl);
		// shortURL.setSelectionRange(0, 99999);
		document.execCommand('Copy');
		showToast('URL coppied to clipboard');
	})

	$('#shorten-btn').click(function () {
		if ($('#custom-checkbox').is(':checked')) {
			if (!$('#long-url').val()) {
				showToast('Please enter proper URL');
			} else if (!$('#short-hand').val()) {
				showToast('Please enter proper custom URL')
			} else {
				const longUrl = $('#long-url').text();
				const shortHand = $('#short-hand').text();

				var settings = {
					"url": "https://trims.tk/create",
					"method": "POST",
					"timeout": 0,
					"headers": {
					  "Content-Type": "application/json"
					},
					"data": JSON.stringify({"url" : longUrl, "shortHand" : shortHand, "custom" : true}),
				  };

				  $.ajax(settings).done(function (response) {
					alert(response);
					console.log('response');
					// $('#copy-msg').show();
					// $('#short-url').show();
					// $('#copy-icon').show();
				  });
			}
		} else if (!$('#long-url').val()) {
			showToast('Please enter proper URL');
		} else {
			const longUrl = $('#long-url').text();

			var settings = {
				"url": "https://trims.tk/create",
				"method": "POST",
				"timeout": 0,
				"headers": {
				  "Content-Type": "application/json"
				},
				"data": JSON.stringify({"url" : longUrl, "shortHand" : "", "custom" : false}),
			  };

			  $.ajax(settings).done(function (response) {
				alert(response);
				console.log('response');
				// $('#copy-msg').show();
				// $('#short-url').show();
				// $('#copy-icon').show();
			  });
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

function showToast(message) {
	// Get the snackbar DIV
	var x = document.getElementById("snackbar");

	x.innerHTML=message;

	// Add the "show" class to DIV
	x.className = "show";

	// After 3 seconds, remove the show class from DIV
	setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  }