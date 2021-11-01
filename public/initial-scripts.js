chrome.runtime.sendMessage({ method: "getInitialValue" }, function (response) {
    if (response.data !== null) {
        sessionStorage.setItem("initialValue", JSON.stringify(response.data));
    }
});

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

document.addEventListener('DOMContentLoaded', function () {
    var setInitialValue = document.getElementById("setInitialValue");

    setInitialValue.addEventListener("click", function (e) {
        var initialValue = JSON.parse(sessionStorage.getItem("initialValue"));
        chrome.runtime.sendMessage({ method: "setInitialValue", data: initialValue }, function (response) {
            console.log(response)
        });
    })

    var setInitialValue = document.getElementById("clearInitialValue");

    setInitialValue.addEventListener("click", function (e) {
        chrome.runtime.sendMessage({ method: "clearInitialValue" }, function (response) {
            console.log(response)
        });
    })

});