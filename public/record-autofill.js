document.addEventListener('DOMContentLoaded', function () {

    var form = document.getElementById("record-autofill");
    form.addEventListener("submit", function(e){
        e.preventDefault();
        var username = document.getElementById("username-autofill");
        var password = document.getElementById("password-autofill");

        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
            chrome.tabs.sendMessage(tabs[0].id, {command: "autofill", username: username.value, password: password.value}, function(response){
                console.log(response.result);
            });
            window.close();
        });
    });
});
