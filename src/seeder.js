ninja.seeder = {
  init: (function () {
    document.getElementById("generatekeyinput").value = "";
  })(),

  // number of mouse movements to wait for
  seedLimit: (function () {
    var num = Crypto.util.randomBytes(12)[11];
    return 200 + Math.floor(num);
  })(),

  seedCount: 0, // counter
  lastInputTime: new Date().getTime(),
  seedPoints: [],

  // seed function exists to wait for mouse movement to add more entropy before generating an address
  seed: function (evt) {
    if (!evt) var evt = window.event;
    var timeStamp = new Date().getTime();

    if (ninja.seeder.seedCount == ninja.seeder.seedLimit) {
      ninja.seeder.seedCount++;
      ninja.wallets.landwallet.open();
      document.getElementById("generate").style.display = "none";
      document.getElementById("menu").style.visibility = "visible";
      ninja.seeder.removePoints();
    }
    // seed mouse position X and Y when mouse movements are greater than 40ms apart.
    else if ((ninja.seeder.seedCount < ninja.seeder.seedLimit) && evt && (timeStamp - ninja.seeder.lastInputTime) > 40) {
      SecureRandom.seedTime();
      SecureRandom.seedInt16((evt.clientX * evt.clientY));
      ninja.seeder.showPoint(evt.clientX, evt.clientY);
      ninja.seeder.seedCount++;
      ninja.seeder.lastInputTime = new Date().getTime();
      ninja.seeder.showPool();
    }
  },

  // seed function exists to wait for mouse movement to add more entropy before generating an address
  seedKeyPress: function (evt) {
    if (!evt) var evt = window.event;
    // seeding is over now we generate and display the address
    if (ninja.seeder.seedCount == ninja.seeder.seedLimit) {
      ninja.seeder.seedCount++;
      ninja.wallets.landwallet.open();
      document.getElementById("generate").style.display = "none";
      document.getElementById("menu").style.visibility = "visible";
      ninja.seeder.removePoints();
    }
    // seed key press character
    else if ((ninja.seeder.seedCount < ninja.seeder.seedLimit) && evt.which) {
      var timeStamp = new Date().getTime();
      // seed a bunch (minimum seedLimit) of times
      SecureRandom.seedTime();
      SecureRandom.seedInt8(evt.which);
      var keyPressTimeDiff = timeStamp - ninja.seeder.lastInputTime;
      SecureRandom.seedInt8(keyPressTimeDiff);
      ninja.seeder.seedCount++;
      ninja.seeder.lastInputTime = new Date().getTime();
      ninja.seeder.showPool();
    }
  },

  showPool: function () {
    var poolHex;
    if (SecureRandom.poolCopyOnInit != null) {
      poolHex = Crypto.util.bytesToHex(SecureRandom.poolCopyOnInit);
      document.getElementById("seedpool").innerHTML = poolHex;
      document.getElementById("seedpooldisplay").innerHTML = poolHex;
    }
    else {
      poolHex = Crypto.util.bytesToHex(SecureRandom.pool);
      document.getElementById("seedpool").innerHTML = poolHex;
      document.getElementById("seedpooldisplay").innerHTML = poolHex;
    }
    document.getElementById("mousemovelimit").innerHTML = (ninja.seeder.seedLimit - ninja.seeder.seedCount);
  },

  showPoint: function (x, y) {
    var div = document.createElement("div");
    div.setAttribute("class", "seedpoint");
    div.style.top = y + "px";
    div.style.left = x + "px";

    // let's make the entropy 'points' grow and change color!
    percentageComplete = ninja.seeder.seedCount / ninja.seeder.seedLimit;
    pointSize = 2 + Math.ceil(9*percentageComplete) + 'px'
    pointColor = 255 - Math.ceil(110 * percentageComplete);
    div.style.backgroundColor = '#' + pointColor.toString(16) + 'FF' + pointColor.toString(16);
    div.style.width = pointSize;
    div.style.height = pointSize;

    document.getElementById("progress-bar-percentage").style.width=Math.ceil(percentageComplete*100)+"%";

    // for some reason, appending these divs to an IOS device breaks clicking altogether (?)
    if (navigator.platform != 'iPad' && navigator.platform != 'iPhone' && navigator.platform != 'iPod') {
      document.body.appendChild(div);
    }
    ninja.seeder.seedPoints.push(div);

  },

  removePoints: function () {
    for (var i = 0; i < ninja.seeder.seedPoints.length; i++) {
      document.body.removeChild(ninja.seeder.seedPoints[i]);
    }
    ninja.seeder.seedPoints = [];
  }
};
