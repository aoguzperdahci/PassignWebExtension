chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {

  if (request.method === "setInitialValue") {
    console.log("set", request.data)
    chrome.alarms.clear("PassignExtension");
    setValue(request.data);
    chrome.alarms.create("PassignExtension", {delayInMinutes: 3.0});
    sendResponse("initialValue set")
  } else if(request.method === "clearInitialValue") {
    resetValue();
    console.log("reset")
    sendResponse("initialValue clear")
  } else {
    sendResponse({});
  }
});

chrome.alarms.onAlarm.addListener(() => {
  resetValue();
})

function setValue(records) {
  chrome.storage.local.set({"initialValue": records}
  );
}

function resetValue() {
  chrome.storage.local.set({"initialValue": null}
  );
}