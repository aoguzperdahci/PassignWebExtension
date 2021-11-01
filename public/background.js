var initialValue = null;
var timeOut;

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {

  if (request.method === "getInitialValue") {
    sendResponse({ data: initialValue });
  } else if (request.method === "setInitialValue") {
    clearTimeout(timeOut);
    initialValue = request.data;
    timeOut = setTimeout(function() {
      initialValue = null;
    },180000)
    sendResponse("initialValue set")
  } else if(request.method === "clearInitialValue") {
    initialValue = null;
    sendResponse("initialValue clear")
  } else {
    sendResponse({});
  }
});
