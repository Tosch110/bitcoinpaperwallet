ninja.translator = {
  currentCulture: "en",

  translate: function (culture) {
    var dict = ninja.translator.translations[culture];
    if (dict) {
      // set current culture
      ninja.translator.currentCulture = culture;
      // update menu UI
      for (var cult in ninja.translator.translations) {
        document.getElementById("culture" + cult).setAttribute("class", "");
      }
      document.getElementById("culture" + culture).setAttribute("class", "selected");
      // apply translations
      for (var id in dict) {
        if (document.getElementById(id) && document.getElementById(id).value) {
          document.getElementById(id).value = dict[id];
        }
        else if (document.getElementById(id)) {
          document.getElementById(id).innerHTML = dict[id];
        }
      }
    }
  },

  get: function (id) {
    var translation = ninja.translator.translations[ninja.translator.currentCulture][id];
    return translation;
  },

  translations: {
    "en": {
      // javascript alerts or messages
      "paperlabelbitcoinaddress": "Bitcoin Address:",
      "paperlabelprivatekey": "Private Key (Wallet Import Format):",
      "paperlabelencryptedkey": "Encrypted Private Key (Password required)",
      "bip38alertpassphraserequired": "Passphrase required for BIP38 key",
      "detailalertnotvalidprivatekey": "The text you entered is not a valid private key or passphrase.",
      "detailconfirmsha256": "The text you entered does not appear to be a private " + window.currencyName + " key.\n\nWould you like to use this text as a passphrase and create a private key using its SHA256 hash?\n\nWarning: Choosing an extremely strong passphrase (also known as a \"brain wallet\") is important as all common phrases, words, lyrics etc. are regularly scanned by hackers for bitcoin balances worth stealing.",
      "bip38alertincorrectpassphrase": "Incorrect passphrase for this encrypted private key.",
    },

    "es": {
      // javascript alerts or messages
      "paperlabelbitcoinaddress": "Dirección Bitcoin:",
      "paperlabelprivatekey": "Clave privada (formato para importar):",

      // header and menu html
      "tagline": "Generador de carteras Bitcoin de código abierto en lado de cliente con Javascript",
      "generatelabelbitcoinaddress": "Generando dirección Bitcoin...",
      "generatelabelmovemouse": "<blink>Mueve un poco el ratón para crear entropía...</blink>",
      "calibratewallet": "Calibrate Printer (es)",
      "paperwallet": "Cartera en papel",
      "landwallet": "Welcome (Es)",

      // footer html
      "footerlabeldonations": "Donaciones:",
      "footerlabeltranslatedby": "Traducción: <b>12345</b>Vypv2QSmuRXcciT5oEB27mPbWGeva",
      "footerlabelpgp": "Clave pública PGP",
      "footerlabelversion": "Histórico de versiones",
      "footerlabelgithub": "Repositorio GitHub",
      "footerlabelcopyright1": "&copy; Copyright 2016 Canton Becker and bitaddress.org.",
      "footerlabelcopyright2": "Copyright del código JavaScript: en el fuente.",
      "footerlabelnowarranty": "Sin garantía.",

      // paper wallet html
      "paperlabeladdressesperpage": "Direcciones por página:",
      "paperlabeladdressestogenerate": "Direcciones en total:",
      "papergenerate1": "Generar",
      "paperprint": "Imprimir"
    },

    "fr": {
      // javascript alerts or messages
      "paperlabelbitcoinaddress": "Adresse Bitcoin:",
      "paperlabelprivatekey": "Clé Privée (Format d'importation de porte-monnaie):",

      // header and menu html
      "tagline": "Générateur De Porte-Monnaie Bitcoin Javascript Hors-Ligne",
      "generatelabelbitcoinaddress": "Création de l'adresse Bitcoin...",
      "generatelabelmovemouse": "<blink>BOUGEZ votre souris pour ajouter de l'entropie...</blink>",
      "calibratewallet": "Calibrate Printer (fr)",
      "paperwallet": "Porte-Monnaie Papier",
      "landwallet": "Welcome (Fr)",

      // footer html
      "footerlabeldonations": "Dons:",
      "footerlabeltranslatedby": "Traduction: 1Gy7NYSJNUYqUdXTBow5d7bCUEJkUFDFSq",
      "footerlabelpgp": "Clé Publique PGP",
      "footerlabelversion": "Historique De Version Signé",
      "footerlabelgithub": "Dépôt GitHub",
      "footerlabelcopyright1": "&copy; Copyright 2016 Canton Becker and bitaddress.org.",
      "footerlabelcopyright2": "Les droits d'auteurs JavaScript sont inclus dans le code source.",
      "footerlabelnowarranty": "Aucune garantie.",
      "newaddress": "Générer Une Nouvelle Adresse",

      // paper wallet html
      "paperlabeladdressesperpage": "Adresses par page:",
      "paperlabeladdressestogenerate": "Nombre d'adresses à créer:",
      "papergenerate1": "Générer",
      "paperprint": "Imprimer"
    }
  }
};

ninja.translator.showEnglishJson = function () {
  var english = ninja.translator.translations["en"];
  var spanish = ninja.translator.translations["es"];
  var spanishClone = {};
  for (var key in spanish) {
    spanishClone[key] = spanish[key];
  }
  var newLang = {};
  for (var key in english) {
    newLang[key] = english[key];
    delete spanishClone[key];
  }
  for (var key in spanishClone) {
    if (document.getElementById(key)) {
      if (document.getElementById(key).value) {
        newLang[key] = document.getElementById(key).value;
      }
      else {
        newLang[key] = document.getElementById(key).innerHTML;
      }
    }
  }
  var div = document.createElement("div");
  div.setAttribute("class", "englishjson");
  div.innerHTML = "<h3>English Json</h3>";
  var elem = document.createElement("textarea");
  elem.setAttribute("rows", "35");
  elem.setAttribute("cols", "110");
  elem.setAttribute("wrap", "off");
  var langJson = "{\n";
  for (var key in newLang) {
    langJson += "\t\"" + key + "\"" + ": " + "\"" + newLang[key].replace(/\"/g, "\\\"").replace(/\n/g, "\\n") + "\",\n";
  }
  langJson = langJson.substr(0, langJson.length - 2);
  langJson += "\n}\n";
  elem.innerHTML = langJson;
  div.appendChild(elem);
  document.body.appendChild(div);
};
