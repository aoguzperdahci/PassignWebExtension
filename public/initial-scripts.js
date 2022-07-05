
chrome.storage.local.get(["initialValue"])
.then(result => {
    if(result){
        sessionStorage.setItem("initialValue", JSON.stringify(result.initialValue));
        console.log("initial-scripts", result.initialValue)
    }else{
        sessionStorage.setItem("initialValue", null);
        console.log("initial-scripts", null)
    }
});

document.addEventListener('DOMContentLoaded', function () {

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        var tab = tabs[0];
        var url = new URL(tab.url);
        var domain = url.hostname;
        document.querySelector("#urlHostname").value = domain;
        domain = domain.replace("www.", "");
        var subDomains = domain.split(".");
        var website = "";
    
        for (let i = subDomains.length - 1; i >= 0; i--) {
            if (subDomains[i].length > 3 || i === subDomains.length - 3) {
                website = subDomains[i];
                break;
            }
        }
    
        if (website === "") {
            website = subDomains[0];
        }
        document.querySelector("#searchUrl").value = website;
    });

    var setInitialValue = document.getElementById("setInitialValue");
    setInitialValue.addEventListener("click", function (e) {
        var initialValue = JSON.parse(sessionStorage.getItem("initialValue"));
        chrome.runtime.sendMessage({ method: "setInitialValue", data: initialValue }, function (response) {
            console.log(response)
        });
    })
    
    var clearInitialValue = document.getElementById("clearInitialValue");

    clearInitialValue.addEventListener("click", function (e) {
        chrome.runtime.sendMessage({ method: "clearInitialValue" }, function (response) {
            console.log(response)
        });
    })

    document.onkeydown = function(e) {
        e = e || window.event;
        if (e.ctrlKey && e.key == " ") {
            var button = document.querySelector(".autofill")
            if(button){
                button.click();
            }
        }
    }

    var shortKey = document.querySelector("#shortKey");
    if(shortKey){
        shortKey.click()
        shortKey.focus()
    }
});