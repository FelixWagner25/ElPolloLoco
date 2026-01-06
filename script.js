/**
 * Dircets user from impressum page back to main page.
 */
function backToHome() {
  window.opener.location.replace("./index.html");
  setTimeout(() => {
    window.close();
  }, 50);
}

/**
 * Opens Impressum via script in order to allow closing when redirecting to home.
 * @param {event} event
 */
function openImpressum(event) {
  event.preventDefault();
  window.open("./impressum.html", "_blank");
}
