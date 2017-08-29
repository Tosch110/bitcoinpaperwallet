// run unit tests
if (ninja.getQueryString()["unittests"] == "true" || ninja.getQueryString()["unittests"] == "1") {
  ninja.unitTests.runSynchronousTests();
  // ninja.translator.showEnglishJson();
  // no need to show translations until we actually have some. 9/5/2013 - Canton
}
// run async unit tests
if (ninja.getQueryString()["asyncunittests"] == "true" || ninja.getQueryString()["asyncunittests"] == "1") {
  ninja.unitTests.runAsynchronousTests();
}
// change language
if (ninja.getQueryString()["culture"] != undefined) {
  ninja.translator.translate(ninja.getQueryString()["culture"]);
}

if (ninja.getQueryString()["showseedpool"] == "true" || ninja.getQueryString()["showseedpool"] == "1") {
  document.getElementById("seedpoolarea").style.display = "block";
}
