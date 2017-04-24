function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function setCookie(key, value) {
	var expires = new Date();
    expires.setTime(expires.getTime() + (1 * 6 * 60 * 60 * 1000));
    document.cookie = key + '=' + value + ';expires=' + expires.toUTCString();
}

function getCookie(key) {
    var keyValue = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
    return keyValue ? keyValue[2] : null;
}
		
$(document).ready(function () {
	$('#pointer input[type=radio]').not("[attr='disabled']").on('change', function() {
		var selectPoint=($('input[name=Point]:checked', '#pointer').val()); 
		$("#hiddenPointName").val(selectPoint);
		setCookie('point', selectPoint);
		setCookie('offline', 'true');
		$("button[type=submit]").prop('disabled', false);
	});
	
	$('#pointer #btnLogin').on('click', function() {
		console.log ("Login");
		$('#pointer').attr('action','signin-offline.html');
	})

	$('#pointer #btnReg').on('click', function() {
		console.log ("Register");
		$('#pointer').attr('action','signup-offline.html');
	})
})

// $(location).href('http://address.com')