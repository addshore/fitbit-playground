import * as document from "document";

/**
 * Switches from one "page" to another
 * Where pages are elements with their name prefixed with "page-" as an ID
 * https://dev.fitbit.com/build/guides/user-interface/javascript/#hiding-showing-an-element
 */
export function switchPage(from,to) {
  var fromPage = document.getElementById("page-" + from);
  var toPage = document.getElementById("page-" + to);
  fromPage.style.display = "none"
  toPage.style.display = "inline"
  emitEvent(from, to)
};

function emitEvent(from, to) {
  document.dispatchEvent({type:'page-switch',from:from,to:to});
}

// Announce the event in the console
document.addEventListener("page-switch", function (event) {
  console.log("Page switched from " + event.from + " to " + event.to)
}, false);