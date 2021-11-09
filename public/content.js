chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.command === "autofill") {

        var div = document.querySelector("#autofill-div");
        if (div) {
            document.body.removeChild(div);
        }

        var inputs = document.querySelectorAll("input");

        if (inputs.length === 0) {
            sendResponse({ result: 0 })
            return;
        }

        var usernameField = null;
        var emailField = null;
        var passwordFiled = null;

        for (let i = 0; i < inputs.length; i++) {

            switch (inputs[i].type) {
                case "text":
                    if (passwordFiled === null && (inputs[i].id && inputs[i].id.toLocaleLowerCase().includes("password")) || (inputs[i].name && inputs[i].name.toLocaleLowerCase().includes("password"))) {
                        passwordFiled = inputs[i];
                        continue;
                    }

                    if (usernameField !== null || (inputs[i].id && inputs[i].id.toLocaleLowerCase().includes("search")) || (inputs[i].name && inputs[i].name.toLocaleLowerCase().includes("search"))) {
                        continue;
                    } else {
                        usernameField = inputs[i];
                    }
                    break;
                case "email":
                    if (emailField !== null) {
                        continue;
                    } else {
                        emailField = inputs[i];
                    }
                    break;
                case "password":
                    if (passwordFiled !== null) {
                        continue;
                    } else {
                        passwordFiled = inputs[i];
                    }
                    break;
                default:
                    break;
            }
        }

        var autofill = document.createElement("div");
        autofill.id = "autofill-div";
        autofill.style.position = "fixed";
        autofill.style.display = "block";
        autofill.style.width = "100%";
        autofill.style.height = "100%";
        autofill.style.zIndex = 2147483647;
        autofill.style.opacity = 1;

        autofill.addEventListener("mouseover", function () {
            var event = new Event('change', { bubbles: true });

            if (usernameField) {
                usernameField.click();
                usernameField.focus();
                usernameField.value = request.username;
                usernameField.dispatchEvent(event);
            }
            if (emailField) {
                emailField.click();
                emailField.focus();
                emailField.value = request.username;
                emailField.dispatchEvent(event);
            }
            if (passwordFiled) {
                passwordFiled.click();
                passwordFiled.focus();
                passwordFiled.value = request.password;
                passwordFiled.dispatchEvent(event);
            }

            document.body.removeChild(autofill);
        });
        document.body.insertBefore(autofill, document.body.firstChild);
    }
    sendResponse({ result: inputs.length })
})