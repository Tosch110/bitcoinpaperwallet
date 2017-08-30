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

		'english': {
			publicAddress: "PUBLIC ADDRESS",
			depositVerify: "DEPOSIT / VERIFY",
			privateKey: "PRIVATE KEY",
			walletImportFormat: "WALLET IMPORT FORMAT",
			withdraw: "PRIVATE KEY / WITHDRAW",
			backLongTextFontSize: "9px",
			backPaperWallet: "LISK PAPER WALLET",
			backAmount: "Amount Added",
			backDate: "Date",
			backNotes: "Notes:",
			backInst1: "To deposit additional funds to this paper wallet, send Lisk to its public address, anytime.",
			backInst2: "Verify your balance by searching for the public address using a service such as https://explorer.lisk.io",
			backInst3: "<strong>Do not reveal the private key</strong> until you are ready to import the balance on this wallet to a Lisk client, exchange, or online wallet.",
			backInst4: "When withdrawing your funds from this wallet you should remove the <strong>ENTIRE BALANCE</strong>. If you attempt to spend only some of the funds you will likely lose the remaining Lisk forever.<br />For in depth instructions visit bitcoinpaperwallet.com",
		},

		'chinese': {
			publicAddress: "公开地址",
			depositVerify: "存款/查询余额",
			privateKey: "钱包导入格式",
			walletImportFormat: "WALLET IMPORT FORMAT",
			withdraw: "私钥/取款",
			backLongTextFontSize: "10px",
			backPaperWallet: "Lisk 纸钱包",
			backAmount: "添加数量",
			backDate: "日期",
			backNotes: "注释",
			backInst1: "可以随时向公开地址发送比特币为该纸钱包添加资金。",
			backInst2: "使用例如blockchain.info这样的服务，通过搜索公开地址来查询你的余额。",
			backInst3: "在你准备将余额导入到比特币客户端、交易平台或者在线钱包之前，<strong>请勿泄露私钥</strong>。",
			backInst4: "从此钱包取出资金时，请将<strong>全部余额一次性</strong>取走。如果你试图只取走一部分，那么你很有可能永远失去剩余的比特币。<br /><br />有疑问？请访问 : bitcoinpaperwallet.com",
		},

		'traditional-chinese': {
			publicAddress: "公開地址",
			depositVerify: "存款/查詢餘額",
			privateKey: "私鑰",
			walletImportFormat: "錢包導入格式",
			withdraw: "取款",
			backLongTextFontSize: "10px",
			backPaperWallet: "Lisk 紙錢包",
			backAmount: "添加數量",
			backDate: "日期",
			backNotes: "註釋",
			backInst1: "可以隨時向公開地址發送比特幣為該紙錢包添加資金。",
			backInst2: "使用例如blockchain.info這樣的服務，通過搜索公開地址來查詢你的餘額。",
			backInst3: "在你準備將餘額導入到比特幣客戶端、交易平台或者在線錢包之前，<strong>請勿洩露私鑰</strong>。",
			backInst4: "從此錢包取出資金時，請將<strong>全部餘額一次性</strong>取走。如果你試圖只取走一部分，那麼你很有可能會永遠失去剩餘的比特幣。<br /><br />有疑問？請訪問 : bitcoinpaperwallet.com",
		},

		'czech': {
			publicAddress: "VEŘEJNÁ ADRESA",
			depositVerify: "VLOŽIT / OVĚŘIT",
			privateKey: "SOUKROMÝ KLÍČ",
			walletImportFormat: "WALLET IMPORT FORMAT",
			withdraw: "SOUKROMÝ KLÍČ / VYBRAT",
			backLongTextFontSize: "9px",
			backPaperWallet: "Lisk Papírová peněženka",
			backAmount: "Částka",
			backDate: "Datum",
			backNotes: "Poznámky:",
			backInst1: "Pokud chcete vložit více peněz do této peněženky, můžete kdykoli použít stejnou veřejnou adresu.",
			backInst2: "Pokud chcete ověřit zůstatek v peněžence, můžete použít službu https://explorer.lisk.io a zadat veřejnou adresu.",
			backInst3: "<strong>NEUKAZUJTE NIKOMU SOUKROMÝ KLÍČ</strong> dokud se nerozhodnete opravdu převést zůstatek do klienta,na burzu nebo do online peněženky. ",
			backInst4: "Při výběru z této peněženky byste měli převést <strong>CELÝ ZŮSTATEK</strong>. Pokud převedete jen část, je možné že příjdete o zbytek.<br />Dotazy? Navštivte bitcoinpaperwallet.com",
		},

		'danish': {
			publicAddress: "OFFENTLIG ADRESSE",
			depositVerify: "INDBETAL / VERIFICÉR",
			privateKey: "PRIVAT NØGLE",
			walletImportFormat: "TEGNEBOGENS IMPORTFORMAT",
			withdraw: "PRIVAT NØGLE / UDBETAL",
			backLongTextFontSize: "9px",
			backPaperWallet: "Lisk-PAPIRTEGNEBOG",
			backAmount: "Indbetalt beløb",
			backDate: "Dato",
			backNotes: "Noter:",
			backInst1: "For at indbetale yderligere beløb til denne papirtegnebog sendes når som helst bitcoins til dens offentlige adresse.",
			backInst2: "Verificér din saldo ved at søge efter den offentlige adresse vha. en tjeneste som fx https://explorer.lisk.io",
			backInst3: "<strong>Afslør ikke den private nøgle</strong> før du er klar til at importere saldoen i denne tegnebog til en bitcoinklient, -børs eller online tegnebog.",
			backInst4: "Når du udbetaler dine penge fra denne tegnebog, bør du fjerne <strong>HELE SALDOEN</strong>. Hvis du forsøger kun at bruge nogle af pengene, vil du sandsynligvis miste de resterende bitcoins for evigt.<br />For vejledning, besøg bitcoinpaperwallet.com",
		},

		'dutch': {
			publicAddress: "PUBLIEK ADRES",
			depositVerify: "STORTING / VERIFICATIE",
			privateKey: "PRIVÉ SLEUTEL",
			walletImportFormat: "WALLET IMPORT FORMAT",
			withdraw: "PRIVÉ SLEUTEL",
			backLongTextFontSize: "8px",
			backPaperWallet: "Lisk Papieren portemonnee",
			backAmount: "Bedrag toegevoegd",
			backDate: "Datum",
			backNotes: "Notities:",
			backInst1: "Om meer geld naar deze papieren portemonnee over te maken kun je altijd bitcoins naar het publieke adres sturen.",
			backInst2: "Verifieer je saldo door het publieke adress op te zoeken met een service zoals https://explorer.lisk.io",
			backInst3: "<strong>LAAT JE PRIVÉ SLEUTEL NIET ZIEN</strong> totdat je het saldo van deze portemonnee over wilt maken naar een bitcoin client, exchange of online portemonnee.",
			backInst4: "Als je het saldo van deze portemonnee uit wilt laten betalen, dan kun je het beste het <strong>HELE BEDRAG</strong> opnemen. Als je probeert een beetje op te nemen ben je waarschijnlijk de overige bitcoins kwijt.<br /><br />Vragen? Ga naar bitcoinpaperwallet.com",
		},

		'french': {
			publicAddress: "ADRESSE PUBLIQUE",
			depositVerify: "Faire un Dépôt/Vérifier",
			privateKey: "CLÉ SECRÈTE",
			walletImportFormat: "WALLET IMPORT FORMAT",
			withdraw: "CLÉ SECRÈTE / FAIRE UN RETRAIT",
			backLongTextFontSize: "8px",
			backPaperWallet: "Lisk Portefeuille papier",
			backAmount: "Montant ajouté",
			backDate: "Date",
			backNotes: "Notes:",
			backInst1: "Pour déposer plus de fonds dans ce portefeuille papier, envoyer des Bitcoins à son adresse publique n'importe quand.",
			backInst2: "Vérifiez le solde en faisant une recherche de l'adresse publique en utilisant un service tel que https://explorer.lisk.io",
			backInst3: "<strong>NE RÉVÉLEZ PAS VOTRE CLÉ SECRÈTE</strong> jusqu'à ce que vous soyez prêt à transférer le solde de ce portefeuille à un client Bitcoin, une plate-forme d'échange ou un portefeuille en-ligne.",
			backInst4: "Lorsque vous allez retirer des fonds de ce portefeuille, vous devriez transférer le <strong>SOLDE EN ENTIER</strong>. Si vous essayez de ne dépenser qu'une partie des fonds, vous risquez de perdre le reste des Bitcoins à tout jamais.<br /><br />Questions ? Visitez : bitcoinpaperwallet.com",
		},

		'german': {
			publicAddress: "ÖFFENTLICHE ADRESSE",
			depositVerify: "EINZAHLEN / BESTÄTIGEN",
			privateKey: "PRIVATER SCHLÜSSEL",
			walletImportFormat: "WALLET IMPORT FORMAT",
			withdraw: "PRIVATER SCHLÜSSEL / ABHEBEN",
			backLongTextFontSize: "8px",
			backPaperWallet: "Lisk PAPIERBRIEFTASCHE",
			backAmount: "Gutschriften",
			backDate: "Datum",
			backNotes: "Notizen:",
			backInst1: "Um das Guthaben auf dieser Papierbrieftasche zu erhöhen, sende bitcoins an ihre öffentliche Adresse, jederzeit.",
			backInst2: "Um das Guthaben zu bestätigen suche nach der öffentlichen Adresse auf einem Service wie https://explorer.lisk.io",
			backInst3: "<strong>Mache den privaten schlüssel nie bekannt</strong> bis du bereit bist das Guthaben auf dieser Brieftasche abzuheben auf einen Lisk-Client, eine Wechselbörse oder eine Onlinebrieftasche.",
			backInst4: "Beim Abheben des Guthabens sollte das <strong>Ganze Guthaben</strong> auf einmal abgehoben werden. Beim Versuch nur einen Teil des Guthaben auszugeben kann es zum dauerhaften Verlust des restlichen Guthabens kommen. <br /><br />Noch mehr Fragen? Auf bitcoinpaperwallet.com",
		},

		'hebrew': {
			publicAddress: "כתובת פומבית",
			depositVerify: "הפקדה / וידוא מאזן",
			privateKey: "מפתח פרטי",
			walletImportFormat: "WALLET IMPORT FORMAT",
			withdraw: "מפתח פרטי / משיכה",
			backLongTextFontSize: "9px",
			backPaperWallet: "Lisk ארנק נייר",
			backAmount: "כמות שנטענה",
			backDate: "תאריך",
			backNotes: "הערות",
			backInst1: "כדי להפקיד לארנק זה, שלחו ביטקוינים לכתובת הפומבית, בכל זמן",
			backInst2: "ודאו את המאזן שלכם ע\"י חיפוש הכתובת הפומבית בעזרת שירות כמו https://explorer.lisk.io",
			backInst3: "אף פעם אל תגלו לאף אחד את המפתח הפרטי שלכם עד שאתם מוכנים לייצא את המטבעות לארנק ביטקוין ממוחשב, בורסאת ביטקוין או ארנק מקוון",
			backInst4: "בעת משיכת המטבעות, יש למשוך את -כל המטבעות- שבארנק. אם תנסו להוציא רק חלק מהמטבעות, תאבדו את המטבעות הנשארים לנצח שאלות? פנו ל: bitcoinpaperwallet.com",
		},

		'italian': {
			publicAddress: "INDIRIZZO PUBBLICO",
			depositVerify: "DEPOSITA / VERIFICA",
			privateKey: "CHIAVE PRIVATA",
			walletImportFormat: "WALLET IMPORT FORMAT",
			withdraw: "CHIAVE PRIVATA / PRELEVA",
			backLongTextFontSize: "9px",
			backPaperWallet: "Lisk PORTAFOGLIO CARTACEO",
			backAmount: "Importo depositato",
			backDate: "Data",
			backNotes: "Note:",
			backInst1: "Per depositare altri fondi su questo portafoglio cartaceo, invia bitcoins al suo indirizzo pubblico, in qualsiasi momento.",
			backInst2: "Puoi verificare il saldo cercando l'indirizzo pubblico su un servizio tipo https://explorer.lisk.io",
			backInst3: "<strong>NON ESPORRE LA CHIAVE PRIVATA</strong> se non per importare immediatamente il contenuto del portafoglio su un client bitcoin, un exchange o un portafoglio online.",
			backInst4: "Se prelevi i fondi depositati su questo portafoglio, ti consigliamo di prelevare l'<strong>INTERO IMPORTO</strong> depositato. Se cerchi di spendere i fondi solo in parte, probabilmente perderai i bitcoins residui.<br />Domande? Visita : bitcoinpaperwallet.com",
		},

		'japanese': {
			publicAddress: "公 開 ア ド レ ス",
			depositVerify: "入 金 / 残 高 確 認",
			privateKey: "秘 密 鍵",
			walletImportFormat: "WALLET IMPORT FORMAT",
			withdraw: "秘 密 鍵 / 出 金",
			backLongTextFontSize: "8px",
			backPaperWallet: "Lisk ペーパーウォレット",
			backAmount: "入金金額",
			backDate: "日付",
			backNotes: "メモ:",
			backInst1: "公開アドレス宛てに入金することで、このウォレットにいつでもビットコインを追加することができます。",
			backInst2: "blockchain.infoのようなサービスで公開アドレスを検索することで、残高を確認することができます。",
			backInst3: "ビットコインクライアントやオンラインウォレット、交換所にビットコインを移動する必要があるまで、<strong>秘密鍵を開封しないでください</strong>。",
			backInst4: "このウォレットからビットコインを出金する際には、<strong>全ての残高</strong>を出金してください。一部を残して出金した場合、残ったビットコインが永遠に失われる恐れがあります。<br /><br />詳しい情報は、bitcoinpaperwallet.comを参照してください。",
		},

		'polish': {
			publicAddress: "ADRES PUBLICZNY",
			depositVerify: "WPŁATA / WERYFIKACJA",
			privateKey: "KLUCZ PRYWATNY",
			walletImportFormat: "WALLET IMPORT FORMAT",
			withdraw: "KLUCZ PRYWATNY / WYPŁATA",
			backPaperWallet: "PAPIEROWY PORTFEL Lisk",
			backAmount: "Wpłacona kwota",
			backDate: "Data",
			backNotes: "Uwagi:",
			backInst1: "Aby wpłacić dodatkowe fundusze do tego portfela, wyślij bitcoiny na publiczny adres.",
			backInst2: "Sprawdź dostępne środki szukając publicznego adresu w usługach takich jak <u>https://explorer.lisk.io</u>.",
			backInst3: "<strong>Nie odsłaniaj prywatnego klucza</strong>, dopóki nie jesteś gotowy na wydanie wszystkich bitcoinów znajdujących się w tym portfelu.",
			backInst4: "Podczas wypłacania środków, <strong>powinieneś wypłacić WSZYSTKO</strong>. Jeśli spróbujesz wydać tylko trochę, prawdopodobnie stracisz całą resztę. Na zawsze.<br />Instrukcje znajdziesz na <u>bitcoinpaperwallet.com</u>.",
		},

		'portuguese': {
			publicAddress: "ENDEREÇO PÚBLICO",
			depositVerify: "DEPOSITE / VERIFIQUE",
			privateKey: "CHAVE PRIVADA",
			walletImportFormat: "WALLET IMPORT FORMAT",
			withdraw: "CHAVE PRIVADA / SAQUE",
			backLongTextFontSize: "8px",
			backPaperWallet: "Lisk PAPER WALLET",
			backAmount: "Saldo",
			backDate: "Data",
			backNotes: "Anotações:",
			backInst1: "Para depositar fundos adicionais na sua paper wallet deve-se enviar os bitcoins para seu endereço público, a qualquer hora.",
			backInst2: "Verifique o saldo através do seu endereço público usando um serviço como o https://explorer.lisk.io",
			backInst3: "<strong>NÃO REVELE A SUA CHAVE PRIVADA</strong> até que você esteja pronto a importar o saldo total para um cliente bitcoin ou uma carteira online ou, ainda, trocar sua paper wallet com alguém.",
			backInst4: "<strong>TRANSFIRA TODO O SALDO</strong> dessa carteira ao importá-la. Se você tentar importar somente uma parcela provavelmente o risco de perder o restante dos bitcoins é alto.<br /><br />Para mais informações visite bitcoinpaperwallet.com",
		},

		'russian': {
			publicAddress: "ОТКРЫТЫЙ АДРЕС",
			depositVerify: "ДЕПОЗИТ / ПРОВЕРКА",
			privateKey: "ЗАКРЫТЫЙ КЛЮЧ",
			walletImportFormat: "WALLET IMPORT FORMAT",
			withdraw: "ЗАКРЫТЫЙ КЛЮЧ / ВЫВОД",
			backLongTextFontSize: "8px",
			backPaperWallet: "Lisk БУМАЖНЫЙ КОШЕЛЁК",
			backAmount: "Внесено",
			backDate: "Дата",
			backNotes: "Заметки:",
			backInst1: "Для внесения дополнительных финансов на этот бумажный кошелёк отправьте биткоины на его открытый адрес в любое время.",
			backInst2: "Проверьте баланс найдя открытый адрес в таком сервисе, как https://explorer.lisk.io",
			backInst3: "<strong>НЕ ВСКРЫВАЙТЕ СВОЙ ЗАКРЫТЫЙ КЛЮЧ</strong> до тех пор, пока вы не будете готовы импортировать баланс этого кошелька в свой bitcoin-клиент, обменник, или онлайн-кошелёк.",
			backInst4: "Вы должны снять <strong>ВСЕ</strong> свои средства с этого кошелька единовременно. Если вы попытаетесь истратить только некую часть своих финансов, то, скорее всего, потеряете оставшиеся биткоины навсегда.<br /><br />Вопросы? Посетите: bitcoinpaperwallet.com.",
		},

		'spanish': {
			publicAddress: "DIRECCIÓN PÚBLICA",
			depositVerify: "DEPOSITAR / VERIFICAR",
			privateKey: "CLAVE PRIVADA",
			walletImportFormat: "WALLET IMPORT FORMAT",
			withdraw: "CLAVE PRIVADA / RETIRAR",
			backLongTextFontSize: "9px",
			backPaperWallet: "Lisk Cartera de papel",
			backAmount: "Cantidad añadida",
			backDate: "Fecha",
			backNotes: "Notas:",
			backInst1: "Para depositar fondos adicionales en esta cartera de papel, envíe unos Bitcoins a su dirección pública.",
			backInst2: "Para verificar su saldo, busque su dirección pública en un sitio web como https://explorer.lisk.io",
			backInst3: "<strong>NUNCA DEBE MOSTRAR SU CLAVE PRIVADA</strong> hasta que este preparado para importar el saldo de esta cartera a un cliente de bitcoin, un sitio de cambio, o una cartera de internet.",
			backInst4: "Cuando este sacando sus fondos, debe sacar <strong>LA TOTALIDAD DE SU SALDO</strong>. Si no hace esto, es posible que pierda sus Bitcoin.<br /><br />¿Dudas? Vaya a bitcoinpaperwallet.com",
		},

		'swedish': {
			publicAddress: "PUBLIK ADRESS",
			depositVerify: "SÄTT IN / VERIFIERA",
			privateKey: "PRIVAT NYCKEL",
			walletImportFormat: "WALLET IMPORT FORMAT",
			withdraw: "PRIVAT NYCKEL / TA UT",
			backLongTextFontSize: "9px",
			backPaperWallet: "Lisk PAPER WALLET",
			backAmount: "Insatt belopp",
			backDate: "Datum",
			backNotes: "Anteckningar:",
			backInst1: "För att sätta in bitcoin: använd den publika adressen.",
			backInst2: "Kontrollera saldot genom att söka efter den publika adressen på till exempel https://explorer.lisk.io",
			backInst3: "<strong>ANVÄND ELLER VISA INTE DEN PRIVATA NYCKELN</strong> förrän det är dags att flytta saldot till en bitcoinklient, börs eller online-plånbok.",
			backInst4: "När du flyttar bitcoin från en paperwallet bör du alltid <strong>TÖMMA DEN HELT</strong>. Om du inte gör det riskerar du att förlora kvarvarande bitcoin.<br /><br />Frågor? Besök bitcoinpaperwallet.com",
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
