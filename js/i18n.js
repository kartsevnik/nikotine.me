(function () {
  "use strict";

  const supportedLanguages = ["it", "en", "ru", "uk"];
  const storageKey = "siteLanguage";
  const originalText = new WeakMap();
  const originalAttributes = new WeakMap();

  const metadata = {
    home: {
      en: {
        title: "Nikolay — Developer, Creator & Explorer",
        description:
          "Personal digital card of Nikolay — developer, creator and explorer. Contacts, projects and creative work.",
      },
      it: {
        title: "Nikolay — Sviluppatore, Creatore ed Esploratore",
        description:
          "Il biglietto da visita digitale di Nikolay — sviluppatore, creatore ed esploratore. Contatti, progetti e lavori creativi.",
      },
      ru: {
        title: "Nikolay — Разработчик, Автор и Исследователь",
        description:
          "Цифровая визитка Николая — разработчика, автора и исследователя. Контакты, проекты и творческие работы.",
      },
      uk: {
        title: "Nikolay — Розробник, Автор і Дослідник",
        description:
          "Цифрова візитівка Миколи — розробника, автора й дослідника. Контакти, проєкти та творчі роботи.",
      },
    },
    sup: {
      en: {
        title: "SUP Rental & Weekend Guided Experience — Nikolay",
        description:
          "SUP rental in Castellanza: full kits, free pickup, and guided support on weekends.",
      },
      it: {
        title: "Noleggio SUP ed Esperienza Guidata nel Weekend — Nikolay",
        description:
          "Noleggio SUP a Castellanza: kit completi, ritiro gratuito e assistenza guidata nel weekend.",
      },
      ru: {
        title: "Аренда SUP и Сопровождение в Выходные — Nikolay",
        description:
          "Аренда SUP в Кастелланце: полные комплекты, бесплатный самовывоз и сопровождение в выходные.",
      },
      uk: {
        title: "Оренда SUP і Супровід у Вихідні — Nikolay",
        description:
          "Оренда SUP у Кастелланці: повні комплекти, безкоштовний самовивіз і супровід у вихідні.",
      },
    },
  };

  const translations = {
    en: {},
    it: {
      "Language selector": "Selezione lingua",
      "Nikolay logo — letter N": "Logo Nikolay — lettera N",
      "Developer · Creator · Explorer": "Sviluppatore · Creatore · Esploratore",
      "Build with purpose. Create with freedom. Explore without limits.":
        "Costruisci con uno scopo. Crea in libertà. Esplora senza limiti.",
      Contacts: "Contatti",
      Projects: "Progetti",
      "SUP Rental": "Noleggio SUP",
      "Power Platform tutorials, tools and developer practices":
        "Tutorial, strumenti e pratiche di sviluppo per Power Platform",
      "Visual stories, characters and creative experiments":
        "Storie visive, personaggi ed esperimenti creativi",
      "An illustrated story for learning English":
        "Una storia illustrata per imparare l’inglese",
      "Price and service": "Prezzi e servizi",
      "SUP rental prices and services": "Prezzi e servizi per il noleggio SUP",
      "Beaches, lakes and SUP launch points in Italy":
        "Spiagge, laghi e punti di accesso SUP in Italia",
      "Coming soon": "Prossimamente",
      "Link coming soon": "Link disponibile prossimamente",
      "— open project": "— apri il progetto",
      "— coming soon": "— prossimamente",
      "— link not set": "— link non impostato",
      "open on": "apri su",
      "open project": "apri il progetto",
      "coming soon": "prossimamente",
      "link not set": "link non impostato",
      logo: "logo",
      "Page navigation": "Navigazione della pagina",
      "Back to Nikolay home page": "Torna alla home page di Nikolay",
      "← Back home": "← Torna alla home",
      "Castellanza · Italy": "Castellanza · Italia",
      "SUP Rental &": "Noleggio SUP ed",
      "Weekend Guided Experience": "Esperienza Guidata nel Weekend",
      "Boards, full kits, free pickup, and guided support on weekends.":
        "Tavole, kit completi, ritiro gratuito e assistenza guidata nel weekend.",
      "View pricing": "Vedi i prezzi",
      "Book now": "Prenota ora",
      "Service highlights": "Punti di forza del servizio",
      "Free pickup": "Ritiro gratuito",
      "Weekend support": "Assistenza nel weekend",
      "Your equipment": "La tua attrezzatura",
      "What’s in one set": "Cosa include un set",
      "One set includes everything listed below. Life vests are subject to availability.":
        "Un set include tutto ciò che è elencato di seguito. I giubbotti salvagente sono soggetti a disponibilità.",
      "SUP kit": "Kit SUP",
      "SUP Kit": "Kit SUP",
      Paddle: "Pagaia",
      Leash: "Leash di sicurezza",
      Pump: "Pompa",
      "Life vest": "Giubbotto salvagente",
      "Subject to availability": "Soggetto a disponibilità",
      "Choose your format": "Scegli la formula",
      Pricing: "Prezzi",
      "All prices shown below are per day.":
        "Tutti i prezzi indicati di seguito si intendono al giorno.",
      "Best for groups": "Ideale per gruppi",
      "Weekend only": "Solo nel weekend",
      "Not just board rental. A ready-to-go experience: logistics, support, basic instruction, and peace of mind. Higher value, premium format.":
        "Non è un semplice noleggio. Un’esperienza pronta all’uso con logistica, assistenza, istruzioni di base e massima tranquillità. Una formula premium ad alto valore.",
      "What’s included": "Cosa è incluso",
      Assistance: "Assistenza",
      "Basic instruction": "Istruzioni di base",
      "Pricing formula": "Formula di prezzo",
      "Number of sets × guided support rate":
        "Numero di set × tariffa di assistenza guidata",
      "Example: 5 sets × €45 = €225": "Esempio: 5 set × €45 = €225",
      "Guided support rates per set / day":
        "Tariffe di assistenza guidata per set / giorno",
      Sets: "Set",
      "Price per set": "Prezzo per set",
      "2–3 sets": "2–3 set",
      "4–6 sets": "4–6 set",
      "7–9 sets": "7–9 set",
      "10–11 sets": "10–11 set",
      "Request weekend date & number of sets":
        "Richiedi la data nel weekend e il numero di set",
      "Most popular": "Più scelto",
      "Self Rental": "Noleggio autonomo",
      "Equipment only. No guide, no accompaniment. Best for independent riders who already know the basics.":
        "Solo attrezzatura, senza guida né accompagnamento. Ideale per chi è autonomo e conosce già le basi.",
      "What’s included per set": "Cosa è incluso per set",
      "SUP board": "Tavola SUP",
      "Self rental pricing / day": "Prezzi del noleggio autonomo / giorno",
      Price: "Prezzo",
      "1 set": "1 set",
      "2 sets": "2 set",
      "3 sets": "3 set",
      "4+ sets": "4+ set",
      "On request": "Su richiesta",
      "Deposit required for first rental":
        "Deposito richiesto per il primo noleggio",
      "A refundable security deposit is required.":
        "È richiesto un deposito cauzionale rimborsabile.",
      "Book self rental": "Prenota il noleggio autonomo",
      "Clear and separate": "Chiaro e separato",
      "Payments & deposit": "Pagamenti e deposito",
      Payment: "Pagamento",
      Type: "Tipo",
      Notes: "Note",
      "Payment 1": "Pagamento 1",
      "Rental fee": "Costo del noleggio",
      "Non-refundable": "Non rimborsabile",
      "Payment 2": "Pagamento 2",
      "Security deposit": "Deposito cauzionale",
      "Refundable after inspection": "Rimborsabile dopo il controllo",
      Cash: "Contanti",
      Preferred: "Preferito",
      "Inspection on return and immediate refund.":
        "Controllo alla restituzione e rimborso immediato.",
      Online: "Online",
      "Refund within up to 72 hours after inspection.":
        "Rimborso entro 72 ore dal controllo.",
      Logistics: "Logistica",
      Pickup: "Ritiro",
      "Collect your set free of charge in Castellanza.":
        "Ritira gratuitamente il tuo set a Castellanza.",
      "Open free pickup location in Google Maps":
        "Apri il punto di ritiro gratuito in Google Maps",
      "Pickup from my location": "Ritiro presso la mia sede",
      "Open in Google Maps ↗": "Apri in Google Maps ↗",
      "Bank transfer": "Bonifico bancario",
      "How to pay": "Come pagare",
      "Use the details below for the rental payment.":
        "Utilizza i dati seguenti per il pagamento del noleggio.",
      "Payment 1 · Rental fee": "Pagamento 1 · Costo del noleggio",
      Recipient: "Beneficiario",
      "Payment reference": "Causale",
      "Copy IBAN": "Copia IBAN",
      Copied: "Copiato",
      "Copy IBAN:": "Copia IBAN:",
      "Planning a group visit?": "Stai organizzando un’uscita di gruppo?",
      "Some locations may charge separate beach or lido entry fees. Example: Lago di Monate — approx. €10 entry (confirm for groups). Other spots may be free or priced on request.":
        "Alcune località possono applicare costi separati per l’accesso alla spiaggia o al lido. Esempio: Lago di Monate — ingresso di circa €10 (da confermare per i gruppi). Altri luoghi possono essere gratuiti o avere prezzi su richiesta.",
      "Useful answers": "Risposte utili",
      "What is included in one set?": "Cosa è incluso in un set?",
      "One set includes a SUP board, paddle, leash, pump, pin, and life vest when available.":
        "Un set include tavola SUP, pagaia, leash, pompa, pin e giubbotto salvagente, se disponibile.",
      "What is the difference between Self Rental and Weekend Guided Experience?":
        "Qual è la differenza tra Noleggio autonomo ed Esperienza guidata nel weekend?",
      "Self Rental is equipment only. Guided Experience includes support, basic instruction, and logistics, and is available on weekends.":
        "Il Noleggio autonomo comprende solo l’attrezzatura. L’Esperienza guidata include assistenza, istruzioni di base e logistica ed è disponibile nel weekend.",
      "Do I need to pay a deposit?": "Devo versare un deposito?",
      "Yes, a security deposit is required for first-time rentals. The amount is provided on request.":
        "Sì, per il primo noleggio è richiesto un deposito cauzionale. L’importo viene comunicato su richiesta.",
      "How is the deposit returned?": "Come viene restituito il deposito?",
      "Cash deposits are refunded immediately after inspection. Online deposits are refunded within up to 72 hours after inspection.":
        "I depositi in contanti vengono restituiti subito dopo il controllo. I depositi online vengono rimborsati entro 72 ore dal controllo.",
      "How do I pay?": "Come posso pagare?",
      "Pay the rental fee using the UniCredit IBAN and include the exact payment reference shown above.":
        "Paga il noleggio tramite l’IBAN UniCredit e inserisci esattamente la causale indicata sopra.",
      "Is pickup free?": "Il ritiro è gratuito?",
      "Yes, pickup from Castellanza is free.":
        "Sì, il ritiro a Castellanza è gratuito.",
      "Can I rent 4+ sets?": "Posso noleggiare 4 o più set?",
      "Yes. Pricing for four or more self-rental sets is available on request.":
        "Sì. Il prezzo per quattro o più set a noleggio autonomo è disponibile su richiesta.",
      "Is guided experience available on weekdays?":
        "L’esperienza guidata è disponibile nei giorni feriali?",
      "No. The Guided Experience is available on weekends only.":
        "No. L’Esperienza guidata è disponibile solo nel weekend.",
      "Ready to ride?": "Pronto a partire?",
      "Request a booking": "Richiedi una prenotazione",
      "Send the details below. Availability and deposit amount will be confirmed personally.":
        "Invia i dati qui sotto. La disponibilità e l’importo del deposito verranno confermati personalmente.",
      Name: "Nome",
      Date: "Data",
      "Number of sets": "Numero di set",
      "Service type": "Tipo di servizio",
      "Choose service": "Seleziona il servizio",
      "Request booking via WhatsApp": "Richiedi la prenotazione via WhatsApp",
      "Submitting opens WhatsApp with your booking details. No data is stored on this site.":
        "L’invio apre WhatsApp con i dati della prenotazione. Nessun dato viene memorizzato su questo sito.",
      "Ask about group pricing ↗": "Chiedi i prezzi per gruppi ↗",
      "SUP Rental · Castellanza": "Noleggio SUP · Castellanza",
      "Hello, I'd like to request a SUP booking.":
        "Ciao, vorrei richiedere una prenotazione SUP.",
      "Name:": "Nome:",
      "Date:": "Data:",
      "Number of sets:": "Numero di set:",
      "Service:": "Servizio:",
      "Pickup:": "Ritiro:",
      "Pickup / delivery:": "Ritiro / consegna:",
      "Delivery address:": "Indirizzo di consegna:",
      "Weekend Guided Experience is available on Saturdays and Sundays only.":
        "L’Esperienza guidata nel weekend è disponibile solo il sabato e la domenica.",
      "Hello, I'd like to ask about SUP group pricing.":
        "Ciao, vorrei informazioni sui prezzi SUP per gruppi.",
    },
    ru: {
      "Language selector": "Выбор языка",
      "Nikolay logo — letter N": "Логотип Nikolay — буква N",
      "Developer · Creator · Explorer": "Разработчик · Автор · Исследователь",
      "Build with purpose. Create with freedom. Explore without limits.":
        "Создавай осмысленно. Твори свободно. Исследуй без границ.",
      Contacts: "Контакты",
      Projects: "Проекты",
      "SUP Rental": "Аренда SUP",
      "Power Platform tutorials, tools and developer practices":
        "Руководства, инструменты и практики разработки для Power Platform",
      "Visual stories, characters and creative experiments":
        "Визуальные истории, персонажи и творческие эксперименты",
      "An illustrated story for learning English":
        "Иллюстрированная история для изучения английского",
      "Price and service": "Цены и услуги",
      "SUP rental prices and services": "Цены и услуги аренды SUP",
      "Beaches, lakes and SUP launch points in Italy":
        "Пляжи, озёра и места спуска SUP в Италии",
      "Coming soon": "Скоро",
      "Link coming soon": "Ссылка появится скоро",
      "— open project": "— открыть проект",
      "— coming soon": "— скоро",
      "— link not set": "— ссылка не указана",
      "open on": "открыть на",
      "open project": "открыть проект",
      "coming soon": "скоро",
      "link not set": "ссылка не указана",
      logo: "логотип",
      "Page navigation": "Навигация по странице",
      "Back to Nikolay home page": "Вернуться на главную страницу Nikolay",
      "← Back home": "← На главную",
      "Castellanza · Italy": "Кастелланца · Италия",
      "SUP Rental &": "Аренда SUP и",
      "Weekend Guided Experience": "Сопровождение в Выходные",
      "Boards, full kits, free pickup, and guided support on weekends.":
        "Доски, полные комплекты, бесплатный самовывоз и сопровождение в выходные.",
      "View pricing": "Смотреть цены",
      "Book now": "Забронировать",
      "Service highlights": "Преимущества услуги",
      "Free pickup": "Бесплатный самовывоз",
      "Weekend support": "Поддержка в выходные",
      "Your equipment": "Ваше снаряжение",
      "What’s in one set": "Что входит в комплект",
      "One set includes everything listed below. Life vests are subject to availability.":
        "Один комплект включает всё перечисленное ниже. Спасательные жилеты предоставляются при наличии.",
      "SUP kit": "Комплект SUP",
      "SUP Kit": "Комплект SUP",
      Paddle: "Весло",
      Leash: "Страховочный лиш",
      Pump: "Насос",
      "Life vest": "Спасательный жилет",
      "Subject to availability": "При наличии",
      "Choose your format": "Выберите формат",
      Pricing: "Цены",
      "All prices shown below are per day.": "Все цены ниже указаны за один день.",
      "Best for groups": "Лучший выбор для групп",
      "Weekend only": "Только в выходные",
      "Not just board rental. A ready-to-go experience: logistics, support, basic instruction, and peace of mind. Higher value, premium format.":
        "Не просто аренда доски, а полностью подготовленный формат: организация, поддержка, базовый инструктаж и спокойствие. Премиальная услуга с большей ценностью.",
      "What’s included": "Что включено",
      Assistance: "Сопровождение",
      "Basic instruction": "Базовый инструктаж",
      "Pricing formula": "Формула расчёта",
      "Number of sets × guided support rate":
        "Количество комплектов × тариф сопровождения",
      "Example: 5 sets × €45 = €225": "Пример: 5 комплектов × €45 = €225",
      "Guided support rates per set / day":
        "Тариф сопровождения за комплект / день",
      Sets: "Комплекты",
      "Price per set": "Цена за комплект",
      "2–3 sets": "2–3 комплекта",
      "4–6 sets": "4–6 комплектов",
      "7–9 sets": "7–9 комплектов",
      "10–11 sets": "10–11 комплектов",
      "Request weekend date & number of sets":
        "Запросить дату и количество комплектов",
      "Most popular": "Самый популярный",
      "Self Rental": "Самостоятельная аренда",
      "Equipment only. No guide, no accompaniment. Best for independent riders who already know the basics.":
        "Только снаряжение, без гида и сопровождения. Подходит самостоятельным пользователям, знакомым с основами.",
      "What’s included per set": "Что входит в комплект",
      "SUP board": "SUP-доска",
      "Self rental pricing / day": "Самостоятельная аренда / день",
      Price: "Цена",
      "1 set": "1 комплект",
      "2 sets": "2 комплекта",
      "3 sets": "3 комплекта",
      "4+ sets": "4+ комплекта",
      "On request": "По запросу",
      "Deposit required for first rental": "Залог при первой аренде",
      "A refundable security deposit is required.": "Требуется возвращаемый залог.",
      "Book self rental": "Забронировать самостоятельную аренду",
      "Clear and separate": "Понятно и раздельно",
      "Payments & deposit": "Оплата и залог",
      Payment: "Платёж",
      Type: "Тип",
      Notes: "Примечание",
      "Payment 1": "Платёж 1",
      "Rental fee": "Стоимость аренды",
      "Non-refundable": "Не возвращается",
      "Payment 2": "Платёж 2",
      "Security deposit": "Залог",
      "Refundable after inspection": "Возвращается после проверки",
      Cash: "Наличные",
      Preferred: "Предпочтительно",
      "Inspection on return and immediate refund.":
        "Проверка при возврате и немедленный возврат залога.",
      Online: "Онлайн",
      "Refund within up to 72 hours after inspection.":
        "Возврат в течение 72 часов после проверки.",
      Logistics: "Логистика",
      Pickup: "Самовывоз",
      "Collect your set free of charge in Castellanza.":
        "Заберите комплект бесплатно в Кастелланце.",
      "Open free pickup location in Google Maps":
        "Открыть место бесплатного самовывоза в Google Maps",
      "Pickup from my location": "Самовывоз от моего адреса",
      "Open in Google Maps ↗": "Открыть в Google Maps ↗",
      "Bank transfer": "Банковский перевод",
      "How to pay": "Как оплатить",
      "Use the details below for the rental payment.":
        "Используйте реквизиты ниже для оплаты аренды.",
      "Payment 1 · Rental fee": "Платёж 1 · Стоимость аренды",
      Recipient: "Получатель",
      "Payment reference": "Назначение платежа",
      "Copy IBAN": "Копировать IBAN",
      Copied: "Скопировано",
      "Copy IBAN:": "Скопируйте IBAN:",
      "Planning a group visit?": "Планируете групповую поездку?",
      "Some locations may charge separate beach or lido entry fees. Example: Lago di Monate — approx. €10 entry (confirm for groups). Other spots may be free or priced on request.":
        "В некоторых местах отдельно оплачивается вход на пляж или в лидо. Например, Lago di Monate — около €10 за вход (для групп необходимо уточнить). Другие места могут быть бесплатными или иметь цену по запросу.",
      "Useful answers": "Полезные ответы",
      "What is included in one set?": "Что входит в один комплект?",
      "One set includes a SUP board, paddle, leash, pump, pin, and life vest when available.":
        "Один комплект включает SUP-доску, весло, лиш, насос, pin и спасательный жилет при наличии.",
      "What is the difference between Self Rental and Weekend Guided Experience?":
        "В чём разница между самостоятельной арендой и сопровождением в выходные?",
      "Self Rental is equipment only. Guided Experience includes support, basic instruction, and logistics, and is available on weekends.":
        "Самостоятельная аренда включает только снаряжение. Формат с сопровождением включает поддержку, базовый инструктаж и организацию и доступен в выходные.",
      "Do I need to pay a deposit?": "Нужно ли оставлять залог?",
      "Yes, a security deposit is required for first-time rentals. The amount is provided on request.":
        "Да, при первой аренде требуется залог. Сумма сообщается по запросу.",
      "How is the deposit returned?": "Как возвращается залог?",
      "Cash deposits are refunded immediately after inspection. Online deposits are refunded within up to 72 hours after inspection.":
        "Залог наличными возвращается сразу после проверки. Онлайн-залог возвращается в течение 72 часов после проверки.",
      "How do I pay?": "Как оплатить?",
      "Pay the rental fee using the UniCredit IBAN and include the exact payment reference shown above.":
        "Оплатите аренду по IBAN UniCredit и укажите точное назначение платежа, приведённое выше.",
      "Is pickup free?": "Самовывоз бесплатный?",
      "Yes, pickup from Castellanza is free.": "Да, самовывоз из Кастелланцы бесплатный.",
      "Can I rent 4+ sets?": "Можно арендовать 4 и более комплектов?",
      "Yes. Pricing for four or more self-rental sets is available on request.":
        "Да. Стоимость самостоятельной аренды четырёх и более комплектов предоставляется по запросу.",
      "Is guided experience available on weekdays?":
        "Доступно ли сопровождение в будние дни?",
      "No. The Guided Experience is available on weekends only.":
        "Нет. Услуга сопровождения доступна только в выходные.",
      "Ready to ride?": "Готовы отправиться на воду?",
      "Request a booking": "Запросить бронирование",
      "Send the details below. Availability and deposit amount will be confirmed personally.":
        "Отправьте данные ниже. Наличие и сумма залога будут подтверждены лично.",
      Name: "Имя",
      Date: "Дата",
      "Number of sets": "Количество комплектов",
      "Service type": "Тип услуги",
      "Choose service": "Выберите услугу",
      "Request booking via WhatsApp": "Запросить бронирование через WhatsApp",
      "Submitting opens WhatsApp with your booking details. No data is stored on this site.":
        "После отправки откроется WhatsApp с данными бронирования. Сайт не хранит ваши данные.",
      "Ask about group pricing ↗": "Узнать цены для групп ↗",
      "SUP Rental · Castellanza": "Аренда SUP · Кастелланца",
      "Hello, I'd like to request a SUP booking.":
        "Здравствуйте, я хотел(а) бы забронировать SUP.",
      "Name:": "Имя:",
      "Date:": "Дата:",
      "Number of sets:": "Количество комплектов:",
      "Service:": "Услуга:",
      "Pickup:": "Самовывоз:",
      "Pickup / delivery:": "Самовывоз / доставка:",
      "Delivery address:": "Адрес доставки:",
      "Weekend Guided Experience is available on Saturdays and Sundays only.":
        "Сопровождение доступно только по субботам и воскресеньям.",
      "Hello, I'd like to ask about SUP group pricing.":
        "Здравствуйте, я хотел(а) бы узнать цены на SUP для группы.",
    },
    uk: {
      "Language selector": "Вибір мови",
      "Nikolay logo — letter N": "Логотип Nikolay — літера N",
      "Developer · Creator · Explorer": "Розробник · Автор · Дослідник",
      "Build with purpose. Create with freedom. Explore without limits.":
        "Створюй зі змістом. Твори вільно. Досліджуй без меж.",
      Contacts: "Контакти",
      Projects: "Проєкти",
      "SUP Rental": "Оренда SUP",
      "Power Platform tutorials, tools and developer practices":
        "Посібники, інструменти та практики розробки для Power Platform",
      "Visual stories, characters and creative experiments":
        "Візуальні історії, персонажі та творчі експерименти",
      "An illustrated story for learning English":
        "Ілюстрована історія для вивчення англійської",
      "Price and service": "Ціни та послуги",
      "SUP rental prices and services": "Ціни та послуги оренди SUP",
      "Beaches, lakes and SUP launch points in Italy":
        "Пляжі, озера та місця спуску SUP в Італії",
      "Coming soon": "Незабаром",
      "Link coming soon": "Посилання з’явиться незабаром",
      "— open project": "— відкрити проєкт",
      "— coming soon": "— незабаром",
      "— link not set": "— посилання не вказано",
      "open on": "відкрити на",
      "open project": "відкрити проєкт",
      "coming soon": "незабаром",
      "link not set": "посилання не вказано",
      logo: "логотип",
      "Page navigation": "Навігація сторінкою",
      "Back to Nikolay home page": "Повернутися на головну сторінку Nikolay",
      "← Back home": "← На головну",
      "Castellanza · Italy": "Кастелланца · Італія",
      "SUP Rental &": "Оренда SUP і",
      "Weekend Guided Experience": "Супровід у Вихідні",
      "Boards, full kits, free pickup, and guided support on weekends.":
        "Дошки, повні комплекти, безкоштовний самовивіз і супровід у вихідні.",
      "View pricing": "Переглянути ціни",
      "Book now": "Забронювати",
      "Service highlights": "Переваги послуги",
      "Free pickup": "Безкоштовний самовивіз",
      "Weekend support": "Підтримка у вихідні",
      "Your equipment": "Ваше спорядження",
      "What’s in one set": "Що входить до комплекту",
      "One set includes everything listed below. Life vests are subject to availability.":
        "Один комплект містить усе перелічене нижче. Рятувальні жилети надаються за наявності.",
      "SUP kit": "Комплект SUP",
      "SUP Kit": "Комплект SUP",
      Paddle: "Весло",
      Leash: "Страхувальний ліш",
      Pump: "Насос",
      "Life vest": "Рятувальний жилет",
      "Subject to availability": "За наявності",
      "Choose your format": "Оберіть формат",
      Pricing: "Ціни",
      "All prices shown below are per day.": "Усі ціни нижче вказані за один день.",
      "Best for groups": "Найкраще для груп",
      "Weekend only": "Лише у вихідні",
      "Not just board rental. A ready-to-go experience: logistics, support, basic instruction, and peace of mind. Higher value, premium format.":
        "Не просто оренда дошки, а повністю підготовлений формат: організація, підтримка, базовий інструктаж і спокій. Преміальна послуга з більшою цінністю.",
      "What’s included": "Що включено",
      Assistance: "Супровід",
      "Basic instruction": "Базовий інструктаж",
      "Pricing formula": "Формула розрахунку",
      "Number of sets × guided support rate":
        "Кількість комплектів × тариф супроводу",
      "Example: 5 sets × €45 = €225": "Приклад: 5 комплектів × €45 = €225",
      "Guided support rates per set / day":
        "Тариф супроводу за комплект / день",
      Sets: "Комплекти",
      "Price per set": "Ціна за комплект",
      "2–3 sets": "2–3 комплекти",
      "4–6 sets": "4–6 комплектів",
      "7–9 sets": "7–9 комплектів",
      "10–11 sets": "10–11 комплектів",
      "Request weekend date & number of sets":
        "Запросити дату й кількість комплектів",
      "Most popular": "Найпопулярніше",
      "Self Rental": "Самостійна оренда",
      "Equipment only. No guide, no accompaniment. Best for independent riders who already know the basics.":
        "Лише спорядження, без гіда та супроводу. Підходить самостійним користувачам, які знають основи.",
      "What’s included per set": "Що входить до комплекту",
      "SUP board": "SUP-дошка",
      "Self rental pricing / day": "Самостійна оренда / день",
      Price: "Ціна",
      "1 set": "1 комплект",
      "2 sets": "2 комплекти",
      "3 sets": "3 комплекти",
      "4+ sets": "4+ комплекти",
      "On request": "За запитом",
      "Deposit required for first rental": "Застава під час першої оренди",
      "A refundable security deposit is required.": "Потрібна поворотна застава.",
      "Book self rental": "Забронювати самостійну оренду",
      "Clear and separate": "Зрозуміло й окремо",
      "Payments & deposit": "Оплата та застава",
      Payment: "Платіж",
      Type: "Тип",
      Notes: "Примітка",
      "Payment 1": "Платіж 1",
      "Rental fee": "Вартість оренди",
      "Non-refundable": "Не повертається",
      "Payment 2": "Платіж 2",
      "Security deposit": "Застава",
      "Refundable after inspection": "Повертається після перевірки",
      Cash: "Готівка",
      Preferred: "Бажано",
      "Inspection on return and immediate refund.":
        "Перевірка під час повернення та негайне повернення застави.",
      Online: "Онлайн",
      "Refund within up to 72 hours after inspection.":
        "Повернення протягом 72 годин після перевірки.",
      Logistics: "Логістика",
      Pickup: "Самовивіз",
      "Collect your set free of charge in Castellanza.":
        "Заберіть комплект безкоштовно в Кастелланці.",
      "Open free pickup location in Google Maps":
        "Відкрити місце безкоштовного самовивозу в Google Maps",
      "Pickup from my location": "Самовивіз з моєї адреси",
      "Open in Google Maps ↗": "Відкрити в Google Maps ↗",
      "Bank transfer": "Банківський переказ",
      "How to pay": "Як оплатити",
      "Use the details below for the rental payment.":
        "Використовуйте реквізити нижче для оплати оренди.",
      "Payment 1 · Rental fee": "Платіж 1 · Вартість оренди",
      Recipient: "Одержувач",
      "Payment reference": "Призначення платежу",
      "Copy IBAN": "Копіювати IBAN",
      Copied: "Скопійовано",
      "Copy IBAN:": "Скопіюйте IBAN:",
      "Planning a group visit?": "Плануєте групову поїздку?",
      "Some locations may charge separate beach or lido entry fees. Example: Lago di Monate — approx. €10 entry (confirm for groups). Other spots may be free or priced on request.":
        "У деяких місцях окремо оплачується вхід на пляж або до лідо. Наприклад, Lago di Monate — близько €10 за вхід (для груп потрібно уточнити). Інші місця можуть бути безкоштовними або мати ціну за запитом.",
      "Useful answers": "Корисні відповіді",
      "What is included in one set?": "Що входить до одного комплекту?",
      "One set includes a SUP board, paddle, leash, pump, pin, and life vest when available.":
        "Один комплект містить SUP-дошку, весло, ліш, насос, pin і рятувальний жилет за наявності.",
      "What is the difference between Self Rental and Weekend Guided Experience?":
        "У чому різниця між самостійною орендою та супроводом у вихідні?",
      "Self Rental is equipment only. Guided Experience includes support, basic instruction, and logistics, and is available on weekends.":
        "Самостійна оренда містить лише спорядження. Формат із супроводом включає підтримку, базовий інструктаж і організацію та доступний у вихідні.",
      "Do I need to pay a deposit?": "Чи потрібно залишати заставу?",
      "Yes, a security deposit is required for first-time rentals. The amount is provided on request.":
        "Так, під час першої оренди потрібна застава. Сума повідомляється за запитом.",
      "How is the deposit returned?": "Як повертається застава?",
      "Cash deposits are refunded immediately after inspection. Online deposits are refunded within up to 72 hours after inspection.":
        "Застава готівкою повертається одразу після перевірки. Онлайн-застава повертається протягом 72 годин після перевірки.",
      "How do I pay?": "Як оплатити?",
      "Pay the rental fee using the UniCredit IBAN and include the exact payment reference shown above.":
        "Сплатіть оренду за IBAN UniCredit та вкажіть точне призначення платежу, наведене вище.",
      "Is pickup free?": "Самовивіз безкоштовний?",
      "Yes, pickup from Castellanza is free.": "Так, самовивіз із Кастелланци безкоштовний.",
      "Can I rent 4+ sets?": "Можна орендувати 4 або більше комплектів?",
      "Yes. Pricing for four or more self-rental sets is available on request.":
        "Так. Вартість самостійної оренди чотирьох або більше комплектів надається за запитом.",
      "Is guided experience available on weekdays?":
        "Чи доступний супровід у будні?",
      "No. The Guided Experience is available on weekends only.":
        "Ні. Послуга супроводу доступна лише у вихідні.",
      "Ready to ride?": "Готові вийти на воду?",
      "Request a booking": "Запросити бронювання",
      "Send the details below. Availability and deposit amount will be confirmed personally.":
        "Надішліть дані нижче. Наявність і суму застави буде підтверджено особисто.",
      Name: "Ім’я",
      Date: "Дата",
      "Number of sets": "Кількість комплектів",
      "Service type": "Тип послуги",
      "Choose service": "Оберіть послугу",
      "Request booking via WhatsApp": "Запросити бронювання через WhatsApp",
      "Submitting opens WhatsApp with your booking details. No data is stored on this site.":
        "Після надсилання відкриється WhatsApp із даними бронювання. Сайт не зберігає ваші дані.",
      "Ask about group pricing ↗": "Дізнатися ціни для груп ↗",
      "SUP Rental · Castellanza": "Оренда SUP · Кастелланца",
      "Hello, I'd like to request a SUP booking.":
        "Вітаю, я хотів(ла) би забронювати SUP.",
      "Name:": "Ім’я:",
      "Date:": "Дата:",
      "Number of sets:": "Кількість комплектів:",
      "Service:": "Послуга:",
      "Pickup:": "Самовивіз:",
      "Pickup / delivery:": "Самовивіз / доставка:",
      "Delivery address:": "Адреса доставки:",
      "Weekend Guided Experience is available on Saturdays and Sundays only.":
        "Супровід доступний лише в суботу та неділю.",
      "Hello, I'd like to ask about SUP group pricing.":
        "Вітаю, я хотів(ла) би дізнатися ціни на SUP для групи.",
    },
  };

  function normalize(value) {
    return String(value || "")
      .replace(/\s+/g, " ")
      .trim();
  }

  function detectLanguage() {
    try {
      const saved = localStorage.getItem(storageKey);
      if (supportedLanguages.includes(saved)) return saved;
    } catch (_error) {
      // Storage may be unavailable in privacy modes.
    }

    const browserLanguages =
      Array.isArray(navigator.languages) && navigator.languages.length
        ? navigator.languages
        : [navigator.language];

    for (const language of browserLanguages) {
      const code = String(language || "")
        .toLowerCase()
        .split("-")[0];
      if (supportedLanguages.includes(code)) return code;
    }

    return "en";
  }

  let currentLanguage =
    supportedLanguages.includes(window.__initialLanguage)
      ? window.__initialLanguage
      : detectLanguage();

  function translate(source, language) {
    const normalized = normalize(source);
    if (!normalized || language === "en") return normalized;
    return translations[language]?.[normalized] || normalized;
  }

  function translateTextNodes(root, language) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const parent = node.parentElement;
        if (
          !parent ||
          ["SCRIPT", "STYLE", "CODE"].includes(parent.tagName) ||
          parent.closest("[data-language-menu]")
        ) {
          return NodeFilter.FILTER_REJECT;
        }
        return normalize(node.nodeValue)
          ? NodeFilter.FILTER_ACCEPT
          : NodeFilter.FILTER_REJECT;
      },
    });

    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);

    nodes.forEach(function (node) {
      if (!originalText.has(node)) originalText.set(node, node.nodeValue);
      const source = originalText.get(node);
      const leading = source.match(/^\s*/)?.[0] || "";
      const trailing = source.match(/\s*$/)?.[0] || "";
      node.nodeValue = leading + translate(source, language) + trailing;
    });
  }

  function translateAttributes(root, language) {
    const attributes = ["aria-label", "title", "placeholder"];
    root.querySelectorAll("[aria-label], [title], [placeholder]").forEach(function (element) {
      if (!originalAttributes.has(element)) {
        const values = {};
        attributes.forEach(function (attribute) {
          if (element.hasAttribute(attribute)) {
            values[attribute] = element.getAttribute(attribute);
          }
        });
        originalAttributes.set(element, values);
      }

      const values = originalAttributes.get(element);
      Object.entries(values).forEach(function ([attribute, source]) {
        element.setAttribute(attribute, translate(source, language));
      });
    });
  }

  function updateMetadata(language) {
    const page = document.body?.dataset.page || "home";
    const values = metadata[page]?.[language] || metadata[page]?.en;
    if (!values) return;

    document.title = values.title;
    const description = document.querySelector('meta[name="description"]');
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (description) description.content = values.description;
    if (ogTitle) ogTitle.content = values.title.replace(/ — Nikolay$/, "");
    if (ogDescription) ogDescription.content = values.description;
  }

  function updateLanguageControls(language) {
    const labels = { it: "IT", en: "EN", ru: "RU", uk: "UA" };

    document.querySelectorAll("[data-language-menu]").forEach(function (menu) {
      const trigger = menu.querySelector(".language-menu__trigger");
      const current = menu.querySelector("[data-language-current]");
      if (trigger) {
        trigger.setAttribute("aria-label", translate("Language selector", language));
      }
      if (current) current.textContent = labels[language];

      menu.querySelectorAll("[data-language]").forEach(function (button) {
        const active = button.dataset.language === language;
        button.classList.toggle("is-active", active);
        button.setAttribute("aria-pressed", String(active));
      });
    });
  }

  function closeLanguageMenus(except) {
    document.querySelectorAll("[data-language-menu]").forEach(function (menu) {
      if (menu === except) return;
      const trigger = menu.querySelector(".language-menu__trigger");
      const options = menu.querySelector(".language-menu__options");
      if (trigger) trigger.setAttribute("aria-expanded", "false");
      if (options) options.hidden = true;
    });
  }

  function applyLanguage(language) {
    const selected = supportedLanguages.includes(language) ? language : "en";
    currentLanguage = selected;
    document.documentElement.lang = selected;
    translateTextNodes(document.body, selected);
    translateAttributes(document.body, selected);
    updateMetadata(selected);
    updateLanguageControls(selected);
    document.documentElement.classList.remove("i18n-pending");
    window.dispatchEvent(
      new CustomEvent("site:languagechange", { detail: { language: selected } })
    );
  }

  function setLanguage(language) {
    const selected = supportedLanguages.includes(language) ? language : "en";
    try {
      localStorage.setItem(storageKey, selected);
    } catch (_error) {
      // Switching still works when storage is unavailable.
    }
    applyLanguage(selected);
  }

  document.addEventListener("click", function (event) {
    const languageButton = event.target.closest?.("[data-language]");
    if (languageButton) {
      const menu = languageButton.closest("[data-language-menu]");
      const trigger = menu?.querySelector(".language-menu__trigger");
      setLanguage(languageButton.dataset.language);
      closeLanguageMenus();
      trigger?.focus();
      return;
    }

    const trigger = event.target.closest?.(".language-menu__trigger");
    if (trigger) {
      const menu = trigger.closest("[data-language-menu]");
      const options = menu?.querySelector(".language-menu__options");
      if (!options) return;
      const opening = options.hidden;
      closeLanguageMenus(menu);
      options.hidden = !opening;
      trigger.setAttribute("aria-expanded", String(opening));
      return;
    }

    if (!event.target.closest?.("[data-language-menu]")) {
      closeLanguageMenus();
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key !== "Escape") return;
    const menu = event.target.closest?.("[data-language-menu]");
    if (!menu) return;
    const trigger = menu.querySelector(".language-menu__trigger");
    closeLanguageMenus();
    trigger?.focus();
  });

  window.siteI18n = {
    supportedLanguages,
    translations,
    getLanguage: function () {
      return currentLanguage;
    },
    setLanguage,
    apply: function () {
      applyLanguage(currentLanguage);
    },
    t: function (source) {
      return translate(source, currentLanguage);
    },
  };

  document.addEventListener("DOMContentLoaded", function () {
    applyLanguage(currentLanguage);
  });
})();
