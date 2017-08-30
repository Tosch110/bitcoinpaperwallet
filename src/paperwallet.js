ninja.wallets.paperwallet = {
  open: function () {
    document.getElementById("main").setAttribute("class", "paper"); // add 'paper' class to main div
    var paperArea = document.getElementById("paperarea");
    paperArea.style.display = "block";
    var perPageLimitElement = document.getElementById("paperlimitperpage");
    var limitElement = document.getElementById("paperlimit");
    var pageBreakAt = (ninja.wallets.paperwallet.useArtisticWallet) ? ninja.wallets.paperwallet.pageBreakAtArtisticDefault : ninja.wallets.paperwallet.pageBreakAtDefault;
    if (perPageLimitElement && perPageLimitElement.value < 1) {
      perPageLimitElement.value = pageBreakAt;
    }
    if (limitElement && limitElement.value < 1) {
      limitElement.value = pageBreakAt;
    }
    if (document.getElementById("paperkeyarea").innerHTML == "") {
      document.getElementById("paperencrypt").checked = false;
      ninja.wallets.paperwallet.encrypt = false;
      ninja.wallets.paperwallet.build(pageBreakAt, pageBreakAt, !document.getElementById('paperart').checked, document.getElementById('paperpassphrase').value);
    }
  },

  close: function () {
    document.getElementById("paperarea").style.display = "none";
    document.getElementById("main").setAttribute("class", ""); // remove 'paper' class from main div
  },

  toggleVanityField: function(show) {
    document.getElementById('keyButtons').style.display= show ? 'none' : 'block';
    document.getElementById('supplyKeys').style.display = show ? 'block' : 'none';
  },

  remaining: null, // use to keep track of how many addresses are left to process when building the paper wallet
  count: 0,
  pageBreakAtDefault: 7,
  pageBreakAtArtisticDefault: 1,
  useArtisticWallet: true,
  pageBreakAt: null,
  passphrase: null,
  lastwallet: null,
  minPassphraseLength: 15,

  build: function (numWallets, pageBreakAt, useArtisticWallet, passphrase) {
    if (numWallets < 1) numWallets = 1;
    ninja.wallets.paperwallet.remaining = numWallets;
    ninja.wallets.paperwallet.count = 0;
    ninja.wallets.paperwallet.useArtisticWallet = useArtisticWallet;
    ninja.wallets.paperwallet.pageBreakAt = pageBreakAt;
    document.getElementById("paperkeyarea").innerHTML = "";
    if (ninja.wallets.paperwallet.encrypt && passphrase == "") {
      alert(ninja.translator.get("bip38alertpassphraserequired"));
      return;
    }
    ninja.wallets.paperwallet.passphrase = passphrase;
    setTimeout(ninja.wallets.paperwallet.batch, 0);
  },

  buildManual: function(wallet, passphrase) {
    ninja.wallets.paperwallet.remaining = 1;
    ninja.wallets.paperwallet.count = 0;
    ninja.wallets.paperwallet.pageBreakAt = 1;
    document.getElementById("paperkeyarea").innerHTML = "";
    if (ninja.wallets.paperwallet.encrypt && passphrase == "") {
      alert(ninja.translator.get("bip38alertpassphraserequired"));
      return;
    }
    ninja.wallets.paperwallet.passphrase = passphrase;
    setTimeout(function() {
      ninja.wallets.paperwallet.batch(wallet);
    }, 0);
  },

  batch: function (addressSeed) {
    if (ninja.wallets.paperwallet.remaining > 0) {
      var paperArea = document.getElementById("paperkeyarea");
      ninja.wallets.paperwallet.count++;
      var i = ninja.wallets.paperwallet.count;
      var pageBreakAt = ninja.wallets.paperwallet.pageBreakAt;
      var div = document.createElement("div");
      div.setAttribute("id", "keyarea" + i);
      div.innerHTML = ninja.wallets.paperwallet.templateArtisticHtml(i);
      div.setAttribute("class", "keyarea art");
      if (paperArea.innerHTML != "") {
        // page break
         if ((i-1) % pageBreakAt == 0 && i >= pageBreakAt) {
          var pBreak = document.createElement("div");
          pBreak.setAttribute("class", "pagebreak");
          document.getElementById("paperkeyarea").appendChild(pBreak);
          div.style.pageBreakBefore = "always";
          if (!ninja.wallets.paperwallet.useArtisticWallet) {
            div.style.borderTop = "2px solid green";
          }
        }
      }
      document.getElementById("paperkeyarea").appendChild(div);
      ninja.wallets.paperwallet.generateNewWallet(addressSeed, function(wallet) {
        var walletKey = ninja.wallets.paperwallet.encrypt ? wallet.encryptedKey : wallet.wifKey;
        ninja.wallets.paperwallet.showArtisticWallet(i, wallet.address, walletKey);
      });
      ninja.wallets.paperwallet.remaining--;
      setTimeout(ninja.wallets.paperwallet.batch, 0);
    }
  },

  generateNewWallet: function(addressSeed, callback) {
    if (addressSeed == null) {
      var key = new Bitcoin.ECKey(false);
      var liskPassphrase = lisk.mnemonic.generate();
      var liskKeypair = lisk.crypto.getPrivateAndPublicKeyFromSecret(liskPassphrase);
      var liskAddress = lisk.crypto.getAddressFromPublicKey(liskKeypair.publicKey);
      addressSeed = { address: liskAddress, wifKey: liskPassphrase };
    }
    ninja.wallets.paperwallet.lastwallet = addressSeed;
    if (ninja.wallets.paperwallet.encrypt) {
      document.getElementById("busyblock").className = "busy";
      setTimeout(function() {
        ninja.privateKey.BIP38PrivateKeyToEncryptedKeyAsync(addressSeed.wifKey, ninja.wallets.paperwallet.passphrase, false, function(encodedKey) {
          document.getElementById("busyblock").className = "";
          addressSeed.passphrase = ninja.wallets.paperwallet.passphrase;
          addressSeed.encryptedKey = encodedKey;
          ninja.wallets.paperwallet.lastwallet.addressSeed = addressSeed;
          callback(addressSeed);
        });
      }, 10);
    } else {
      callback(addressSeed);
    }
  },

  templateArtisticHtml: function (i) {
    var keyelement = 'btcprivwif';
    if (ninja.wallets.paperwallet.encrypt) {
      keyelement = 'btcencryptedkey'
    }

    var walletHtml =
          "<div class='artwallet' id='artwallet" + i + "'>" +
    //"<iframe src='bitcoin-wallet-01.svg' id='papersvg" + i + "' class='papersvg' ></iframe>" +
            "<img id='papersvg" + i + "' class='papersvg' src='" + window.frontJPG + "' />" +
            "<div id='qrcode_public" + i + "' class='qrcode_public'></div>" +
            "<div id='qrcode_private" + i + "' class='qrcode_private'></div>" +
            "<div class='btcaddress' id='btcaddress" + i + "'></div>" +
            "<div class='dupbtcaddress' id='dupbtcaddress" + i + "'></div>" +
            "<div class='" + keyelement + "' id='" + keyelement + i + "'></div>" +
            "<div class='dup" + keyelement + "' id='dup" + keyelement + i + "'></div>" +
            "<div class='wallettype' id='wallettype" + i + "'></div>" +
          "</div>";
    return walletHtml;
  },

  showArtisticWallet: function (idPostFix, bitcoinAddress, privateKey) {

    // BIP38 coloration
    var colors = {
      'bip38': {
        publicUpper: "#fff57c",
        publicLower: "#f7931a",
        privateLeft: "#78bad6",
        privateRight: "#fff67d",
        pointer: "#0084a8",
        guilloche: "white",
        text: "#1937a9",
        textShadow: "white",
        textPointer: "white",
      },
      'default': {
        publicUpper: "#0288d1",
					publicLower: "#ffffff",
					privateLeft: "#0288d1",
					privateRight: "#0288d1",
					pointer: "#dcd6f",
					guilloche: "white",
					text: "#1937a9",
					textShadow: "white",
					textPointer: "white",
      }
    };

    var keyValuePair = {};
    keyValuePair["qrcode_public" + idPostFix] = bitcoinAddress;
    keyValuePair["qrcode_private" + idPostFix] = privateKey;
    ninja.qrCode.showQrCode(keyValuePair, 2.75);
    document.getElementById("btcaddress" + idPostFix).innerHTML = bitcoinAddress;
    document.getElementById("dupbtcaddress" + idPostFix).innerHTML = bitcoinAddress;

    if (ninja.wallets.paperwallet.encrypt) {
      var half = privateKey.length / 2;
      document.getElementById("btcencryptedkey" + idPostFix).innerHTML = privateKey;
      document.getElementById("dupbtcencryptedkey" + idPostFix).innerHTML = privateKey;
      if (window.designChoice != 'default') document.getElementById("wallettype" + idPostFix).innerHTML = 'BIP38 ENCRYPTED'; // only add for special designs
      drawOpts.text['walletImportFormat'] = 'BIP38 ENCRYPTED';
      drawOpts.color = colors['bip38'];
    }
    else {
      document.getElementById("btcprivwif" + idPostFix).innerHTML = privateKey;
      document.getElementById("dupbtcprivwif" + idPostFix).innerHTML = privateKey;
      document.getElementById("wallettype" + idPostFix).innerHTML = '';
      drawOpts.color = colors['default'];
      if (window.designChoice != 'default') document.getElementById("wallettype" + idPostFix).innerHTML = ''; // special designs should have this burned into the JPG
      drawOpts.text['walletImportFormat'] = 'WALLET IMPORT FORMAT';
    }

    if (window.designChoice == 'default') { // if we are not loading up a special JPG-based design, render the canvas
      document.getElementById("papersvg1").src = PaperWallet.draw.frontImage(bitcoinAddress, drawOpts);
    }
    // CODE to modify SVG DOM elements
    //var paperSvg = document.getElementById("papersvg" + idPostFix);
    //if (paperSvg) {
    //	svgDoc = paperSvg.contentDocument;
    //	if (svgDoc) {
    //		var bitcoinAddressElement = svgDoc.getElementById("bitcoinaddress");
    //		var privateKeyElement = svgDoc.getElementById("privatekey");
    //		if (bitcoinAddressElement && privateKeyElement) {
    //			bitcoinAddressElement.textContent = bitcoinAddress;
    //			privateKeyElement.textContent = privateKeyWif;
    //		}
    //	}
    //}
  },

  toggleArt: function (element) {
    if (!element.checked) {
      // show Art
      document.getElementById("paperlimitperpage").value = ninja.wallets.paperwallet.pageBreakAtArtisticDefault;
      document.getElementById("paperlimit").value = ninja.wallets.paperwallet.pageBreakAtArtisticDefault;
    }
    else {
      // hide Art
      document.getElementById("paperlimitperpage").value = ninja.wallets.paperwallet.pageBreakAtDefault;
      document.getElementById("paperlimit").value = ninja.wallets.paperwallet.pageBreakAtDefault;
    }
  },

  toggleEncryptSettings: function(show, cancelSave) {
    if (show == null)
      show = document.getElementById('paperbip38settings').className != 'show';
    var encryptBox = document.getElementById('paperencrypt');
    if (cancelSave == true) {
      encryptBox.checked = ninja.wallets.paperwallet.encrypt;
    }

    document.getElementById('paperbip38settings').className = show ? 'show' : '';
    if (!cancelSave) document.getElementById('paperencryptpassphrase').innerText =
      document.getElementById('paperencryptpassphrase').textContent = document.getElementById('paperpassphrase').value;

    if (!show && !cancelSave) {
      ninja.wallets.paperwallet.encrypt = encryptBox.checked;
      ninja.wallets.paperwallet.buildManual(ninja.wallets.paperwallet.lastwallet, document.getElementById('paperpassphrase').value);
      ninja.wallets.paperwallet.resetLimits();
    }

    document.getElementById('paperencryptstatus').className = ninja.wallets.paperwallet.encrypt ? '' : 'hide';
  },

  resetLimits: function () {
    var hideArt = document.getElementById("paperart");
    var paperEncrypt = document.getElementById("paperencrypt");
    var limit;
    var limitperpage;

    document.getElementById("paperkeyarea").style.fontSize = "100%";
    if (!hideArt.checked) {
      limit = ninja.wallets.paperwallet.pageBreakAtArtisticDefault;
      limitperpage = ninja.wallets.paperwallet.pageBreakAtArtisticDefault;
    }
    else if (hideArt.checked && paperEncrypt.checked) {
      limit = ninja.wallets.paperwallet.pageBreakAtDefault;
      limitperpage = ninja.wallets.paperwallet.pageBreakAtDefault;
      // reduce font size
      document.getElementById("paperkeyarea").style.fontSize = "95%";
    }
    else if (hideArt.checked && !paperEncrypt.checked) {
      limit = ninja.wallets.paperwallet.pageBreakAtDefault;
      limitperpage = ninja.wallets.paperwallet.pageBreakAtDefault;
    }
    document.getElementById("paperlimitperpage").value = limitperpage;
    document.getElementById("paperlimit").value = limit;
  }
};
ninja.wallets.detailwallet = {
  qrscanner: {
    scanner: null,

    start: function() {
      document.getElementById('paperqrscanner').className = 'show';
      ninja.wallets.detailwallet.qrscanner.showError(null);
      var supported = ninja.wallets.detailwallet.qrscanner.scanner.isSupported();
      if (!supported) {
        document.getElementById('paperqrnotsupported').className = '';
      } else {
        ninja.wallets.detailwallet.qrscanner.scanner.start();
      }
    },

    stop: function() {
      ninja.wallets.detailwallet.qrscanner.scanner.stop();
      document.getElementById('paperqrscanner').className = '';
    },

    showError: function(error) {
      if (error) {
        if (error == 'PERMISSION_DENIED' || error == 'PermissionDeniedError') {
          document.getElementById('paperqrerror').innerHTML = '';
          document.getElementById('paperqrpermissiondenied').className = '';
        } else {
          document.getElementById('paperqrerror').innerHTML = error;
          document.getElementById('paperqrpermissiondenied').className = 'hide';
        }
      } else {
        document.getElementById('paperqrerror').innerHTML = '';
        document.getElementById('paperqrpermissiondenied').className = 'hide';
      }
    }
  },

  open: function () {
    document.getElementById("detailarea").style.display = "block";
    document.getElementById("detailprivkey").focus();
    if (!ninja.wallets.detailwallet.qrscanner.scanner) {
      ninja.wallets.detailwallet.qrscanner.scanner = new QRCodeScanner(320, 240, 'paperqroutput',
        function(data) {
          document.getElementById('detailprivkey').value = data;
          document.getElementById('paperqrscanner').className = '';
        },
        function(error) {
          ninja.wallets.detailwallet.qrscanner.showError(error);
        });
    }
  },

  close: function () {
    document.getElementById("detailarea").style.display = "none";
  },

  openCloseFaq: function (faqNum) {
    // do close
    if (document.getElementById("detaila" + faqNum).style.display == "block") {
      document.getElementById("detaila" + faqNum).style.display = "none";
      document.getElementById("detaile" + faqNum).setAttribute("class", "more");
    }
    // do open
    else {
      document.getElementById("detaila" + faqNum).style.display = "block";
      document.getElementById("detaile" + faqNum).setAttribute("class", "less");
    }
  },

  viewDetails: function () {
    var bip38 = false;
    var key = document.getElementById("detailprivkey").value.toString().replace(/^\s+|\s+$/g, ""); // trim white space
    document.getElementById("detailprivkey").value = key;
    var bip38CommandDisplay = document.getElementById("detailbip38commands").style.display;
    ninja.wallets.detailwallet.clear();
    if (key == "") {
      return;
    }
    if (ninja.privateKey.isBIP38Format(key)) {
      document.getElementById("detailbip38commands").style.display = bip38CommandDisplay;
      if (bip38CommandDisplay != "block") {
        document.getElementById("detailbip38commands").style.display = "block";
        document.getElementById("detailprivkeypassphrase").focus();
        return;
      }
      var passphrase = document.getElementById("detailprivkeypassphrase").value.toString().replace(/^\s+|\s+$/g, ""); // trim white space
      if (passphrase == "") {
        alert(ninja.translator.get("bip38alertpassphraserequired"));
        return;
      }
      document.getElementById("busyblock_decrypt").className = "busy";
      // show Private Key BIP38 Format
      document.getElementById("detailprivbip38").innerHTML = key;
      document.getElementById("detailbip38").style.display = "block";
      ninja.privateKey.BIP38EncryptedKeyToByteArrayAsync(key, passphrase, function (btcKeyOrError) {
        document.getElementById("busyblock_decrypt").className = "";
        if (btcKeyOrError.message) {
          alert(btcKeyOrError.message);
          ninja.wallets.detailwallet.clear();
        } else {
          ninja.wallets.detailwallet.populateKeyDetails(new Bitcoin.ECKey(btcKeyOrError));
        }
      });
    }
    else {
      if (Bitcoin.ECKey.isMiniFormat(key)) {
        // show Private Key Mini Format
        document.getElementById("detailprivmini").innerHTML = key;
        document.getElementById("detailmini").style.display = "block";
      }
      else if (Bitcoin.ECKey.isBase6Format(key)) {
        // show Private Key Base6 Format
        document.getElementById("detailprivb6").innerHTML = key;
        document.getElementById("detailb6").style.display = "block";
      }
      var btcKey = new Bitcoin.ECKey(key);
      if (btcKey.priv == null) {
        // enforce a minimum passphrase length
        if (key.length >= ninja.wallets.paperwallet.minPassphraseLength) {
          // Deterministic Wallet confirm box to ask if user wants to SHA256 the input to get a private key
          var usePassphrase = confirm(ninja.translator.get("detailconfirmsha256"));
          if (usePassphrase) {
            var bytes = Crypto.SHA256(key, { asBytes: true });
            var btcKey = new Bitcoin.ECKey(bytes);
          }
          else {
            ninja.wallets.detailwallet.clear();
          }
        }
        else {
          alert(ninja.translator.get("detailalertnotvalidprivatekey"));
          ninja.wallets.detailwallet.clear();
        }
      }
      ninja.wallets.detailwallet.populateKeyDetails(btcKey);
    }
  },

  populateKeyDetails: function (btcKey) {
    if (btcKey.priv != null) {
      btcKey.setCompressed(false);
      document.getElementById('detailkeyarea').className = '';
      document.getElementById('detailkeyareakey').innerHTML = document.getElementById('detailprivkey').value;
      document.getElementById("detailprivhex").innerHTML = btcKey.toString().toUpperCase();
      document.getElementById("detailprivb64").innerHTML = btcKey.toString("base64");
      var bitcoinAddress = btcKey.getBitcoinAddress();
      var wif = btcKey.getBitcoinWalletImportFormat();
      ninja.wallets.detailwallet.lastwallet = { address: bitcoinAddress, wifKey: wif };
      document.getElementById("detailpubkey").innerHTML = btcKey.getPubKeyHex();
      document.getElementById("detailaddress").innerHTML = bitcoinAddress;
      document.getElementById("detailprivwif").innerHTML = wif;
      btcKey.setCompressed(true);
      var bitcoinAddressComp = btcKey.getBitcoinAddress();
      var wifComp = btcKey.getBitcoinWalletImportFormat();
      document.getElementById("detailpubkeycomp").innerHTML = btcKey.getPubKeyHex();
      document.getElementById("detailaddresscomp").innerHTML = bitcoinAddressComp;
      document.getElementById("detailprivwifcomp").innerHTML = wifComp;

      ninja.qrCode.showQrCode({
        "detailqrcodepublic": bitcoinAddress,
        "detailqrcodepubliccomp": bitcoinAddressComp,
        "detailqrcodeprivate": wif,
        "detailqrcodeprivatecomp": wifComp
      }, 4);
    }
  },

  clear: function () {
    document.getElementById('detailkeyarea').className = 'hide';
    document.getElementById("detailpubkey").innerHTML = "";
    document.getElementById("detailpubkeycomp").innerHTML = "";
    document.getElementById("detailaddress").innerHTML = "";
    document.getElementById("detailaddresscomp").innerHTML = "";
    document.getElementById("detailprivwif").innerHTML = "";
    document.getElementById("detailprivwifcomp").innerHTML = "";
    document.getElementById("detailprivhex").innerHTML = "";
    document.getElementById("detailprivb64").innerHTML = "";
    document.getElementById("detailprivb6").innerHTML = "";
    document.getElementById("detailprivmini").innerHTML = "";
    document.getElementById("detailprivbip38").innerHTML = "";
    document.getElementById("detailqrcodepublic").innerHTML = "";
    document.getElementById("detailqrcodepubliccomp").innerHTML = "";
    document.getElementById("detailqrcodeprivate").innerHTML = "";
    document.getElementById("detailqrcodeprivatecomp").innerHTML = "";
    document.getElementById("detailb6").style.display = "none";
    document.getElementById("detailmini").style.display = "none";
    document.getElementById("detailbip38commands").style.display = "none";
    document.getElementById("detailbip38").style.display = "none";
  },

  loadInPaperWallet: function() {
    document.getElementById("paperkeyarea").innerHTML = 'Loading...';
    ninja.tabSwitch(document.getElementById('paperwallet'));
    ninja.wallets.paperwallet.toggleVanityField(true);
    document.getElementById('suppliedPrivateKey').value = ninja.wallets.detailwallet.lastwallet.wifKey;
    if (ninja.wallets.paperwallet.encrypt && !confirm('Do you want to encrypt this wallet using the previously supplied private key?')) {
      document.getElementById('paperencrypt').checked = false;
      ninja.wallets.paperwallet.toggleEncryptSettings(false);
    }
    ninja.wallets.paperwallet.buildManual(ninja.wallets.detailwallet.lastwallet, ninja.wallets.paperwallet.passphrase);
  }
};
