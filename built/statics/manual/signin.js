function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function autoLogin(login, password)
{
    $.ajax({
        type: "POST",
        url: 'https://vkarmane-online.bpmonline.com/ServiceModel/AuthService.svc/Login',
        data: '<AuthToken xmlns="http://Terrasoft.WebApp.ServiceModel/"><UserName>'+login+'</UserName><UserPassword>'+password+'</UserPassword><WorkspaceName>Default</WorkspaceName></AuthToken>',
        dataType: "xml",
        contentType: "application/xml"
    }).success(function (result) {
        window.location.href = "https://vkarmane-online.bpmonline.com/0/Nui/ViewModule.aspx#MyLoansModule";
    }).error(function (result) {
        var codeResult = JSON.parse(result.responseText);
        if (codeResult.Code === 0)
            window.location.href = "https://vkarmane-online.bpmonline.com/0/Nui/ViewModule.aspx#MyLoansModule";
    });
}  

function getCookie(key) {
    var keyValue = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
    return keyValue ? keyValue[2] : null;
}     

$(document).ready(function () {
	offline=getCookie('offline');
	if (offline === true) 
		window.location.href = "select-point.html";
	console.log (offline);
	var login = getParameterByName("login");
    	var password = getParameterByName("password");
	if (login || password) 
	{
		autoLogin(login, password);
	}
})