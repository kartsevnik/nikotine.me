/**
 * J&N Education translations — merges into window.siteI18n.translations.
 * English source strings in HTML / jn-data.js are the keys.
 */
(function () {
  "use strict";

  const packs = {
    it: {
      Comics: "Fumetti",
      About: "Chi siamo",
      "← nikotine.me": "← nikotine.me",
      "J&N Education home": "Home J&N Education",
      "J&N Education navigation": "Navigazione J&N Education",
      "Learn English. Follow the Story.": "Impara l’inglese. Segui la storia.",
      "Funny stories, unforgettable characters, and real English lessons. Discover a different way to learn, one comic at a time.":
        "Storie divertenti, personaggi indimenticabili e vere lezioni di inglese. Scopri un modo diverso di imparare, un fumetto alla volta.",
      "Explore Comics": "Esplora i fumetti",
      "Meet the Creators": "Incontra gli autori",
      "Featured Comic": "Fumetto in evidenza",
      "Start with the first issue — a free educational comic for beginners.":
        "Inizia dal primo numero — un fumetto educativo gratuito per principianti.",
      "Why Comics?": "Perché i fumetti?",
      "Learning sticks when language lives inside a story you want to finish.":
        "Si impara meglio quando la lingua vive in una storia che vuoi finire.",
      "See the Meaning": "Vedi il significato",
      "Pictures and scenes make vocabulary and grammar easier to grasp.":
        "Immagini e scene rendono più facili vocabolario e grammatica.",
      "Follow the Story": "Segui la storia",
      "Characters and plot keep you reading — and learning — to the end.":
        "Personaggi e trama ti spingono a leggere — e a imparare — fino alla fine.",
      "Practice What You Learn": "Metti in pratica ciò che impari",
      "Each issue includes exercises so new structures become usable.":
        "Ogni numero include esercizi perché le nuove strutture diventino utilizzabili.",
      "Keep Exploring": "Continua a esplorare",
      "Every comic opens a new grammar focus and continues the adventure.":
        "Ogni fumetto apre un nuovo focus grammaticale e continua l’avventura.",
      "The people behind the stories, drawings, and learning design.":
        "Le persone dietro le storie, i disegni e il design didattico.",
      "Creator, Writer & Illustrator": "Creatore, scrittore e illustratore",
      "Editor & Educational Contributor": "Editor e contributo didattico",
      "A software developer with a passion for storytelling, visual creativity, and learning new things. Nikolai created J&N Education to explore a simple idea: what if learning English could feel more like reading a funny adventure than studying a textbook?":
        "Uno sviluppatore software con la passione per lo storytelling, la creatività visiva e l’apprendimento. Nikolai ha creato J&N Education per esplorare un’idea semplice: e se imparare l’inglese potesse sembrare più leggere un’avventura divertente che studiare un libro di testo?",
      "He brings the characters, stories, illustrations, and visual world of the comics to life, combining creativity with modern digital tools.":
        "Dà vita a personaggi, storie, illustrazioni e al mondo visivo dei fumetti, unendo creatività e strumenti digitali moderni.",
      "Jade helps shape the educational side of the project, bringing a language teacher's perspective to the stories, dialogues, grammar explanations, and learning activities.":
        "Jade dà forma al lato educativo del progetto, portando lo sguardo di un’insegnante di lingua su storie, dialoghi, spiegazioni grammaticali e attività di apprendimento.",
      "Her contribution helps keep the English clear, natural, and accessible, especially for learners taking their first steps.":
        "Il suo contributo mantiene l’inglese chiaro, naturale e accessibile, soprattutto per chi muove i primi passi.",
      "About the Project": "Sul progetto",
      "Explore the Library": "Esplora la biblioteca",
      "Browse published issues and open the one that fits your level.":
        "Sfoglia i numeri pubblicati e apri quello adatto al tuo livello.",
      "© 2026 J&N Education. All rights reserved.":
        "© 2026 J&N Education. Tutti i diritti riservati.",
      "Created, Written & Illustrated by Nikolai Kartsev":
        "Creato, scritto e illustrato da Nikolai Kartsev",
      "Edited by Jade Solomon": "Editing di Jade Solomon",
      "About Us": "Chi siamo",
      "J&N Education brings comics, English grammar, humor, and practice together — so learning feels like an adventure.":
        "J&N Education unisce fumetti, grammatica inglese, umorismo ed esercizi — così imparare sembra un’avventura.",
      "Our Mission": "La nostra missione",
      "Make learning English fun, visual, and unforgettable.":
        "Rendere l’apprendimento dell’inglese divertente, visivo e indimenticabile.",
      "We believe learning English should feel less like memorizing rules and more like discovering a new world. Through funny stories, memorable characters, visual grammar, and practical exercises, we turn English learning into an adventure worth continuing.":
        "Crediamo che imparare l’inglese debba sembrare meno memorizzare regole e più scoprire un mondo nuovo. Con storie divertenti, personaggi memorabili, grammatica visuale ed esercizi pratici, trasformiamo lo studio in un’avventura che vale la pena continuare.",
      "Educational Philosophy": "Filosofia educativa",
      "Story First": "Prima la storia",
      "An engaging story comes first; learning lives inside it.":
        "Prima arriva una storia coinvolgente; l’apprendimento vive al suo interno.",
      "Learn by Seeing": "Impara vedendo",
      "Visual context helps you understand words and structures.":
        "Il contesto visivo aiuta a capire parole e strutture.",
      "Grammar in Context": "Grammatica nel contesto",
      "Grammar is explained and used in real conversational situations.":
        "La grammatica viene spiegata e usata in situazioni conversazionali reali.",
      "Humor Helps Memory": "L’umorismo aiuta la memoria",
      "Humor and unexpected moments make learning stick.":
        "Umorismo e momenti inaspettati fanno restare ciò che impari.",
      "Read, Understand, Practice": "Leggi, comprendi, esercitati",
      "Theory, reading, and exercises come together in one issue.":
        "Teoria, lettura ed esercizi convivono in un solo numero.",
      "For Students and Teachers": "Per studenti e insegnanti",
      "Materials work for self-study and classroom use.":
        "I materiali funzionano per lo studio autonomo e in classe.",
      "How It All Began": "Come è cominciato tutto",
      "It started with a question: Can learning English be both useful and genuinely entertaining?":
        "È iniziato con una domanda: può imparare l’inglese essere utile e davvero divertente?",
      "Instead of another collection of disconnected grammar exercises, we imagined a world where language comes alive through characters, conversations, mistakes, and unexpected adventures.":
        "Invece di un’altra raccolta di esercizi grammaticali scollegati, abbiamo immaginato un mondo in cui la lingua prende vita attraverso personaggi, conversazioni, errori e avventure inaspettate.",
      "One idea became a story. The story became a comic. And the comic grew into something bigger: J&N Education.":
        "Un’idea è diventata una storia. La storia è diventata un fumetto. E il fumetto è cresciuto in qualcosa di più grande: J&N Education.",
      Contact: "Contatto",
      "Contact:": "Contatto:",
      "Contact Us": "Contattaci",
      "Questions about the comics, classroom use, or the project? Send a short message.":
        "Domande sui fumetti, sull’uso in classe o sul progetto? Invia un breve messaggio.",
      Name: "Nome",
      Email: "Email",
      Message: "Messaggio",
      "Send Message": "Invia messaggio",
      "Submitting opens your email app with the message ready to send. No data is stored on this site.":
        "L’invio apre la tua app email con il messaggio pronto. Nessun dato viene memorizzato su questo sito.",
      "J&N Education — Contact": "J&N Education — Contatto",
      "Email:": "Email:",
      "Comics Library": "Biblioteca di fumetti",
      "Educational comics for learning English — stories, grammar focus, and practice in every issue.":
        "Fumetti educativi per imparare l’inglese — storie, focus grammaticale ed esercizi in ogni numero.",
      "Comics catalog": "Catalogo fumetti",
      "No comics published yet. Check back soon.":
        "Nessun fumetto pubblicato ancora. Torna presto.",
      "This comic is not available yet.": "Questo fumetto non è ancora disponibile.",
      Published: "Pubblicato",
      Free: "Gratis",
      cover: "copertina",
      "Issue 1": "Numero 1",
      "View Details": "Vedi dettagli",
      "View Comic": "Vedi il fumetto",
      "Read Comic": "Leggi il fumetto",
      "Read PDF": "Leggi il PDF",
      "Back to comic": "Torna al fumetto",
      "Back to Library": "Torna alla biblioteca",
      "Comic reader": "Lettore fumetto",
      "Page controls": "Controlli pagina",
      Previous: "Precedente",
      Next: "Successiva",
      Page: "Pagina",
      of: "di",
      "Loading comic…": "Caricamento fumetto…",
      "Could not render this page.": "Impossibile mostrare questa pagina.",
      "Could not open this comic for viewing.":
        "Impossibile aprire questo fumetto per la visualizzazione.",
      "Comic viewer failed to load. Please refresh the page.":
        "Caricamento del lettore non riuscito. Aggiorna la pagina.",
      "Comic data failed to load. Please refresh the page.":
        "Caricamento dei dati del fumetto non riuscito. Aggiorna la pagina.",
      "In-browser viewing only. Saving the original file is not offered and cannot be fully prevented.":
        "Solo visualizzazione nel browser. Il salvataggio del file originale non è offerto e non può essere completamente impedito.",
      Level: "Livello",
      Grammar: "Grammatica",
      Pages: "Pagine",
      "Grammar Focus:": "Focus grammaticale:",
      "English Level:": "Livello di inglese:",
      "Pages:": "Pagine:",
      "Language:": "Lingua:",
      "Format:": "Formato:",
      "Published:": "Pubblicato:",
      "Author & Illustrator:": "Autore e illustratore:",
      "Editor:": "Editor:",
      "Educational Comic / PDF": "Fumetto educativo / PDF",
      "What's Inside": "Cosa c’è dentro",
      "This issue combines story, grammar, practice, and teacher support.":
        "Questo numero unisce storia, grammatica, esercizi e supporto per insegnanti.",
      Cover: "Copertina",
      "About page": "Pagina About",
      "Pre-Reading": "Pre-lettura",
      "Comic Story": "Storia a fumetti",
      Practice: "Esercizi",
      "What You Learned": "Cosa hai imparato",
      "Teacher Guide": "Guida per insegnanti",
      "Answer Keys": "Soluzioni",
      Contents: "Indice",
      "Next Issue": "Prossimo numero",
      "Beginner (A0–A1)": "Principiante (A0–A1)",
      "The Verb To Be": "Il verbo To Be",
      English: "Inglese",
      "A humorous fantasy adventure in Eden — and your first lesson with the verb to be.":
        "Un’avventura fantasy umoristica nell’Eden — e la tua prima lezione con il verbo to be.",
      'Adam and Eve thought life in paradise was supposed to be simple. But when a mysterious talking apple enters the picture, things get wonderfully complicated.':
        "Adamo ed Eva pensavano che la vita in paradiso dovesse essere semplice. Ma quando entra in scena una misteriosa mela parlante, le cose si complicano in modo meraviglioso.",
      "Join an unusual adventure filled with curious characters, unexpected surprises, and a little English grammar along the way.":
        "Unisciti a un’avventura insolita piena di personaggi curiosi, sorprese inaspettate e un po’ di grammatica inglese lungo il cammino.",
      'Your first lesson? The verb "to be." Your first problem? Well... that\'s another story.':
        'La tua prima lezione? Il verbo "to be". Il tuo primo problema? Beh... questa è un’altra storia.',
      "An illustrated story for learning English":
        "Una storia illustrata per imparare l’inglese",
      "Educational comics for learning English":
        "Fumetti educativi per imparare l’inglese",
      "J&N Education": "J&N Education",
      "J&N — A story that teaches!": "J&N — Una storia che insegna!",
    },
    ru: {
      Comics: "Комиксы",
      About: "О нас",
      "← nikotine.me": "← nikotine.me",
      "J&N Education home": "Главная J&N Education",
      "J&N Education navigation": "Навигация J&N Education",
      "Learn English. Follow the Story.": "Учи английский. Следуй за историей.",
      "Funny stories, unforgettable characters, and real English lessons. Discover a different way to learn, one comic at a time.":
        "Смешные истории, незабываемые герои и настоящие уроки английского. Открой другой способ учиться — по одному комиксу за раз.",
      "Explore Comics": "Смотреть комиксы",
      "Meet the Creators": "Познакомиться с авторами",
      "Featured Comic": "Избранный выпуск",
      "Start with the first issue — a free educational comic for beginners.":
        "Начни с первого выпуска — бесплатный образовательный комикс для начинающих.",
      "Why Comics?": "Почему комиксы?",
      "Learning sticks when language lives inside a story you want to finish.":
        "Знания закрепляются, когда язык живёт в истории, которую хочется дочитать.",
      "See the Meaning": "Увидеть смысл",
      "Pictures and scenes make vocabulary and grammar easier to grasp.":
        "Картинки и сцены помогают легче понимать слова и грамматику.",
      "Follow the Story": "Следовать за сюжетом",
      "Characters and plot keep you reading — and learning — to the end.":
        "Герои и сюжет удерживают внимание — и ты учишься до самого конца.",
      "Practice What You Learn": "Практиковать изученное",
      "Each issue includes exercises so new structures become usable.":
        "В каждом выпуске есть упражнения, чтобы новые конструкции стали рабочими.",
      "Keep Exploring": "Продолжать исследование",
      "Every comic opens a new grammar focus and continues the adventure.":
        "Каждый комикс открывает новую грамматическую тему и продолжает приключение.",
      "The people behind the stories, drawings, and learning design.":
        "Люди за историями, рисунками и образовательной частью.",
      "Creator, Writer & Illustrator": "Создатель, автор и иллюстратор",
      "Editor & Educational Contributor": "Редактор и образовательный соавтор",
      "A software developer with a passion for storytelling, visual creativity, and learning new things. Nikolai created J&N Education to explore a simple idea: what if learning English could feel more like reading a funny adventure than studying a textbook?":
        "Разработчик ПО со страстью к storytelling, визуальному творчеству и изучению нового. Nikolai создал J&N Education, чтобы проверить простую идею: а что, если учить английский будет больше похоже на чтение смешного приключения, чем на учебник?",
      "He brings the characters, stories, illustrations, and visual world of the comics to life, combining creativity with modern digital tools.":
        "Он оживляет персонажей, истории, иллюстрации и визуальный мир комиксов, сочетая творчество с современными цифровыми инструментами.",
      "Jade helps shape the educational side of the project, bringing a language teacher's perspective to the stories, dialogues, grammar explanations, and learning activities.":
        "Jade формирует образовательную сторону проекта, привнося взгляд преподавателя языка в истории, диалоги, объяснения грамматики и учебные активности.",
      "Her contribution helps keep the English clear, natural, and accessible, especially for learners taking their first steps.":
        "Её вклад помогает сохранять английский ясным, естественным и доступным — особенно для тех, кто делает первые шаги.",
      "About the Project": "О проекте",
      "Explore the Library": "Открыть библиотеку",
      "Browse published issues and open the one that fits your level.":
        "Смотри опубликованные выпуски и открывай подходящий по уровню.",
      "© 2026 J&N Education. All rights reserved.":
        "© 2026 J&N Education. Все права защищены.",
      "Created, Written & Illustrated by Nikolai Kartsev":
        "Создано, написано и проиллюстрировано: Nikolai Kartsev",
      "Edited by Jade Solomon": "Редактор: Jade Solomon",
      "About Us": "О нас",
      "J&N Education brings comics, English grammar, humor, and practice together — so learning feels like an adventure.":
        "J&N Education объединяет комиксы, английскую грамматику, юмор и практику — чтобы учёба ощущалась как приключение.",
      "Our Mission": "Наша миссия",
      "Make learning English fun, visual, and unforgettable.":
        "Сделать изучение английского весёлым, визуальным и незабываемым.",
      "We believe learning English should feel less like memorizing rules and more like discovering a new world. Through funny stories, memorable characters, visual grammar, and practical exercises, we turn English learning into an adventure worth continuing.":
        "Мы верим: учить английский должно быть меньше похоже на заучивание правил и больше — на открытие нового мира. Через смешные истории, ярких героев, визуальную грамматику и практические упражнения мы превращаем учёбу в приключение, которое хочется продолжать.",
      "Educational Philosophy": "Образовательная философия",
      "Story First": "Сначала история",
      "An engaging story comes first; learning lives inside it.":
        "Сначала увлекательная история; обучение живёт внутри неё.",
      "Learn by Seeing": "Учиться через зрительный образ",
      "Visual context helps you understand words and structures.":
        "Визуальный контекст помогает понимать слова и конструкции.",
      "Grammar in Context": "Грамматика в контексте",
      "Grammar is explained and used in real conversational situations.":
        "Грамматика объясняется и применяется в реальных диалоговых ситуациях.",
      "Humor Helps Memory": "Юмор помогает памяти",
      "Humor and unexpected moments make learning stick.":
        "Юмор и неожиданные моменты делают знания более стойкими.",
      "Read, Understand, Practice": "Читай, понимай, практикуй",
      "Theory, reading, and exercises come together in one issue.":
        "Теория, чтение и упражнения собраны в одном выпуске.",
      "For Students and Teachers": "Для студентов и преподавателей",
      "Materials work for self-study and classroom use.":
        "Материалы подходят для самостоятельной учёбы и занятий в классе.",
      "How It All Began": "Как всё начиналось",
      "It started with a question: Can learning English be both useful and genuinely entertaining?":
        "Всё началось с вопроса: может ли изучение английского быть одновременно полезным и по-настоящему увлекательным?",
      "Instead of another collection of disconnected grammar exercises, we imagined a world where language comes alive through characters, conversations, mistakes, and unexpected adventures.":
        "Вместо ещё одной коллекции разрозненных упражнений по грамматике мы представили мир, где язык оживает через персонажей, разговоры, ошибки и неожиданные приключения.",
      "One idea became a story. The story became a comic. And the comic grew into something bigger: J&N Education.":
        "Одна идея стала историей. История стала комиксом. А комикс вырос во что-то большее: J&N Education.",
      Contact: "Контакт",
      "Contact:": "Контакт:",
      "Contact Us": "Связаться с нами",
      "Questions about the comics, classroom use, or the project? Send a short message.":
        "Вопросы о комиксах, использовании на занятиях или о проекте? Напиши короткое сообщение.",
      Name: "Имя",
      Email: "Email",
      Message: "Сообщение",
      "Send Message": "Отправить сообщение",
      "Submitting opens your email app with the message ready to send. No data is stored on this site.":
        "Отправка откроет почтовое приложение с готовым письмом. Сайт не хранит ваши данные.",
      "J&N Education — Contact": "J&N Education — Обратная связь",
      "Email:": "Email:",
      "Comics Library": "Библиотека комиксов",
      "Educational comics for learning English — stories, grammar focus, and practice in every issue.":
        "Образовательные комиксы для изучения английского — истории, грамматика и практика в каждом выпуске.",
      "Comics catalog": "Каталог комиксов",
      "No comics published yet. Check back soon.":
        "Пока нет опубликованных комиксов. Загляни позже.",
      "This comic is not available yet.": "Этот комикс пока недоступен.",
      Published: "Опубликован",
      Free: "Бесплатно",
      cover: "обложка",
      "Issue 1": "Выпуск 1",
      "View Details": "Подробнее",
      "View Comic": "Открыть комикс",
      "Read Comic": "Читать комикс",
      "Read PDF": "Читать PDF",
      "Back to comic": "Назад к выпуску",
      "Back to Library": "Назад в библиотеку",
      "Comic reader": "Читалка комикса",
      "Page controls": "Управление страницами",
      Previous: "Назад",
      Next: "Вперёд",
      Page: "Страница",
      of: "из",
      "Loading comic…": "Загрузка комикса…",
      "Could not render this page.": "Не удалось показать эту страницу.",
      "Could not open this comic for viewing.":
        "Не удалось открыть этот комикс для просмотра.",
      "Comic viewer failed to load. Please refresh the page.":
        "Не удалось загрузить просмотрщик. Обновите страницу.",
      "Comic data failed to load. Please refresh the page.":
        "Не удалось загрузить данные комикса. Обновите страницу.",
      "In-browser viewing only. Saving the original file is not offered and cannot be fully prevented.":
        "Только просмотр в браузере. Сохранение исходного файла не предлагается и не может быть полностью предотвращено.",
      Level: "Уровень",
      Grammar: "Грамматика",
      Pages: "Страницы",
      "Grammar Focus:": "Грамматический фокус:",
      "English Level:": "Уровень английского:",
      "Pages:": "Страницы:",
      "Language:": "Язык:",
      "Format:": "Формат:",
      "Published:": "Опубликован:",
      "Author & Illustrator:": "Автор и иллюстратор:",
      "Editor:": "Редактор:",
      "Educational Comic / PDF": "Образовательный комикс / PDF",
      "What's Inside": "Что внутри",
      "This issue combines story, grammar, practice, and teacher support.":
        "Этот выпуск объединяет историю, грамматику, практику и материалы для преподавателя.",
      Cover: "Обложка",
      "About page": "Страница About",
      "Pre-Reading": "Перед чтением",
      "Comic Story": "История комикса",
      Practice: "Практика",
      "What You Learned": "Что ты выучил",
      "Teacher Guide": "Гайд для учителя",
      "Answer Keys": "Ключи ответов",
      Contents: "Содержание",
      "Next Issue": "Следующий выпуск",
      "Beginner (A0–A1)": "Начинающий (A0–A1)",
      "The Verb To Be": "Глагол To Be",
      English: "Английский",
      "A humorous fantasy adventure in Eden — and your first lesson with the verb to be.":
        "Юмористическое фэнтези-приключение в Эдеме — и первый урок с глаголом to be.",
      'Adam and Eve thought life in paradise was supposed to be simple. But when a mysterious talking apple enters the picture, things get wonderfully complicated.':
        "Адам и Ева думали, что жизнь в раю должна быть простой. Но когда появляется загадочное говорящее яблоко, всё чудесно усложняется.",
      "Join an unusual adventure filled with curious characters, unexpected surprises, and a little English grammar along the way.":
        "Присоединяйся к необычному приключению с любопытными героями, неожиданными сюрпризами и немного английской грамматики по пути.",
      'Your first lesson? The verb "to be." Your first problem? Well... that\'s another story.':
        'Твой первый урок? Глагол "to be". Твоя первая проблема? Ну... это уже другая история.',
      "An illustrated story for learning English":
        "Иллюстрированная история для изучения английского",
      "Educational comics for learning English":
        "Образовательные комиксы для изучения английского",
      "J&N Education": "J&N Education",
      "J&N — A story that teaches!": "J&N — История, которая учит!",
    },
    uk: {
      Comics: "Комікси",
      About: "Про нас",
      "← nikotine.me": "← nikotine.me",
      "J&N Education home": "Головна J&N Education",
      "J&N Education navigation": "Навігація J&N Education",
      "Learn English. Follow the Story.": "Вивчай англійську. Слідуй за історією.",
      "Funny stories, unforgettable characters, and real English lessons. Discover a different way to learn, one comic at a time.":
        "Кумедні історії, незабутні герої та справжні уроки англійської. Відкрий інший спосіб вчитися — по одному коміксу за раз.",
      "Explore Comics": "Переглянути комікси",
      "Meet the Creators": "Познайомитися з авторами",
      "Featured Comic": "Обраний випуск",
      "Start with the first issue — a free educational comic for beginners.":
        "Почни з першого випуску — безкоштовний освітній комікс для початківців.",
      "Why Comics?": "Чому комікси?",
      "Learning sticks when language lives inside a story you want to finish.":
        "Знання закріплюються, коли мова живе в історії, яку хочеться дочитати.",
      "See the Meaning": "Побачити сенс",
      "Pictures and scenes make vocabulary and grammar easier to grasp.":
        "Малюнки й сцени допомагають легше розуміти слова та граматику.",
      "Follow the Story": "Слідувати за сюжетом",
      "Characters and plot keep you reading — and learning — to the end.":
        "Герої та сюжет тримають увагу — і ти вчишся до самого кінця.",
      "Practice What You Learn": "Практикувати вивчене",
      "Each issue includes exercises so new structures become usable.":
        "У кожному випуску є вправи, щоб нові конструкції стали робочими.",
      "Keep Exploring": "Продовжувати дослідження",
      "Every comic opens a new grammar focus and continues the adventure.":
        "Кожен комікс відкриває нову граматичну тему й продовжує пригоду.",
      "The people behind the stories, drawings, and learning design.":
        "Люди за історіями, малюнками та освітньою частиною.",
      "Creator, Writer & Illustrator": "Творець, автор і ілюстратор",
      "Editor & Educational Contributor": "Редактор і освітній співавтор",
      "A software developer with a passion for storytelling, visual creativity, and learning new things. Nikolai created J&N Education to explore a simple idea: what if learning English could feel more like reading a funny adventure than studying a textbook?":
        "Розробник ПЗ із захопленням storytelling, візуальною творчістю та вивченням нового. Nikolai створив J&N Education, щоб перевірити просту ідею: а що, якби вчити англійську було більше схоже на читання кумедної пригоди, ніж на підручник?",
      "He brings the characters, stories, illustrations, and visual world of the comics to life, combining creativity with modern digital tools.":
        "Він оживляє персонажів, історії, ілюстрації та візуальний світ коміксів, поєднуючи творчість із сучасними цифровими інструментами.",
      "Jade helps shape the educational side of the project, bringing a language teacher's perspective to the stories, dialogues, grammar explanations, and learning activities.":
        "Jade формує освітню сторону проєкту, привносячи погляд викладача мови в історії, діалоги, пояснення граматики та навчальні активності.",
      "Her contribution helps keep the English clear, natural, and accessible, especially for learners taking their first steps.":
        "Її внесок допомагає зберігати англійську ясною, природною й доступною — особливо для тих, хто робить перші кроки.",
      "About the Project": "Про проєкт",
      "Explore the Library": "Відкрити бібліотеку",
      "Browse published issues and open the one that fits your level.":
        "Переглядай опубліковані випуски й відкривай той, що пасує за рівнем.",
      "© 2026 J&N Education. All rights reserved.":
        "© 2026 J&N Education. Усі права захищено.",
      "Created, Written & Illustrated by Nikolai Kartsev":
        "Створено, написано й проілюстровано: Nikolai Kartsev",
      "Edited by Jade Solomon": "Редактор: Jade Solomon",
      "About Us": "Про нас",
      "J&N Education brings comics, English grammar, humor, and practice together — so learning feels like an adventure.":
        "J&N Education поєднує комікси, англійську граматику, гумор і практику — щоб навчання відчувалося як пригода.",
      "Our Mission": "Наша місія",
      "Make learning English fun, visual, and unforgettable.":
        "Зробити вивчення англійської веселим, візуальним і незабутнім.",
      "We believe learning English should feel less like memorizing rules and more like discovering a new world. Through funny stories, memorable characters, visual grammar, and practical exercises, we turn English learning into an adventure worth continuing.":
        "Ми віримо: вчити англійську має бути менше схоже на заучування правил і більше — на відкриття нового світу. Через кумедні історії, яскравих героїв, візуальну граматику та практичні вправи ми перетворюємо навчання на пригоду, яку хочеться продовжувати.",
      "Educational Philosophy": "Освітня філософія",
      "Story First": "Спочатку історія",
      "An engaging story comes first; learning lives inside it.":
        "Спочатку захоплива історія; навчання живе всередині неї.",
      "Learn by Seeing": "Вчитися через бачення",
      "Visual context helps you understand words and structures.":
        "Візуальний контекст допомагає розуміти слова й конструкції.",
      "Grammar in Context": "Граматика в контексті",
      "Grammar is explained and used in real conversational situations.":
        "Граматика пояснюється й застосовується в реальних діалогових ситуаціях.",
      "Humor Helps Memory": "Гумор допомагає пам’яті",
      "Humor and unexpected moments make learning stick.":
        "Гумор і несподівані моменти роблять знання більш стійкими.",
      "Read, Understand, Practice": "Читай, розумій, практикуй",
      "Theory, reading, and exercises come together in one issue.":
        "Теорія, читання й вправи зібрані в одному випуску.",
      "For Students and Teachers": "Для студентів і викладачів",
      "Materials work for self-study and classroom use.":
        "Матеріали підходять для самостійного навчання та занять у класі.",
      "How It All Began": "Як усе починалося",
      "It started with a question: Can learning English be both useful and genuinely entertaining?":
        "Усе почалося з питання: чи може вивчення англійської бути водночас корисним і справді цікавим?",
      "Instead of another collection of disconnected grammar exercises, we imagined a world where language comes alive through characters, conversations, mistakes, and unexpected adventures.":
        "Замість ще однієї збірки розрізнених вправ із граматики ми уявили світ, де мова оживає через персонажів, розмови, помилки та несподівані пригоди.",
      "One idea became a story. The story became a comic. And the comic grew into something bigger: J&N Education.":
        "Одна ідея стала історією. Історія стала коміксом. А комікс виріс у щось більше: J&N Education.",
      Contact: "Контакт",
      "Contact:": "Контакт:",
      "Contact Us": "Зв’язатися з нами",
      "Questions about the comics, classroom use, or the project? Send a short message.":
        "Питання про комікси, використання на заняттях чи про проєкт? Надішли коротке повідомлення.",
      Name: "Ім’я",
      Email: "Email",
      Message: "Повідомлення",
      "Send Message": "Надіслати повідомлення",
      "Submitting opens your email app with the message ready to send. No data is stored on this site.":
        "Надсилання відкриє поштовий застосунок із готовим листом. Сайт не зберігає ваші дані.",
      "J&N Education — Contact": "J&N Education — Зворотний зв’язок",
      "Email:": "Email:",
      "Comics Library": "Бібліотека коміксів",
      "Educational comics for learning English — stories, grammar focus, and practice in every issue.":
        "Освітні комікси для вивчення англійської — історії, граматика та практика в кожному випуску.",
      "Comics catalog": "Каталог коміксів",
      "No comics published yet. Check back soon.":
        "Поки немає опублікованих коміксів. Завітай пізніше.",
      "This comic is not available yet.": "Цей комікс поки недоступний.",
      Published: "Опубліковано",
      Free: "Безкоштовно",
      cover: "обкладинка",
      "Issue 1": "Випуск 1",
      "View Details": "Детальніше",
      "View Comic": "Відкрити комікс",
      "Read Comic": "Читати комікс",
      "Read PDF": "Читати PDF",
      "Back to comic": "Назад до випуску",
      "Back to Library": "Назад до бібліотеки",
      "Comic reader": "Читалка коміксу",
      "Page controls": "Керування сторінками",
      Previous: "Назад",
      Next: "Далі",
      Page: "Сторінка",
      of: "з",
      "Loading comic…": "Завантаження коміксу…",
      "Could not render this page.": "Не вдалося показати цю сторінку.",
      "Could not open this comic for viewing.":
        "Не вдалося відкрити цей комікс для перегляду.",
      "Comic viewer failed to load. Please refresh the page.":
        "Не вдалося завантажити переглядач. Оновіть сторінку.",
      "Comic data failed to load. Please refresh the page.":
        "Не вдалося завантажити дані коміксу. Оновіть сторінку.",
      "In-browser viewing only. Saving the original file is not offered and cannot be fully prevented.":
        "Лише перегляд у браузері. Збереження вихідного файлу не пропонується і не може бути повністю запобіжено.",
      Level: "Рівень",
      Grammar: "Граматика",
      Pages: "Сторінки",
      "Grammar Focus:": "Граматичний фокус:",
      "English Level:": "Рівень англійської:",
      "Pages:": "Сторінки:",
      "Language:": "Мова:",
      "Format:": "Формат:",
      "Published:": "Опубліковано:",
      "Author & Illustrator:": "Автор і ілюстратор:",
      "Editor:": "Редактор:",
      "Educational Comic / PDF": "Освітній комікс / PDF",
      "What's Inside": "Що всередині",
      "This issue combines story, grammar, practice, and teacher support.":
        "Цей випуск поєднує історію, граматику, практику та матеріали для викладача.",
      Cover: "Обкладинка",
      "About page": "Сторінка About",
      "Pre-Reading": "Перед читанням",
      "Comic Story": "Історія коміксу",
      Practice: "Практика",
      "What You Learned": "Що ти вивчив",
      "Teacher Guide": "Гід для вчителя",
      "Answer Keys": "Ключі відповідей",
      Contents: "Зміст",
      "Next Issue": "Наступний випуск",
      "Beginner (A0–A1)": "Початковий (A0–A1)",
      "The Verb To Be": "Дієслово To Be",
      English: "Англійська",
      "A humorous fantasy adventure in Eden — and your first lesson with the verb to be.":
        "Гумористична фентезі-пригода в Едемі — і перший урок із дієсловом to be.",
      'Adam and Eve thought life in paradise was supposed to be simple. But when a mysterious talking apple enters the picture, things get wonderfully complicated.':
        "Адам і Єва думали, що життя в раю має бути простим. Але коли з’являється загадкове яблуко, що говорить, усе чудово ускладнюється.",
      "Join an unusual adventure filled with curious characters, unexpected surprises, and a little English grammar along the way.":
        "Приєднуйся до незвичайної пригоди з цікавими героями, несподіваними сюрпризами та трохи англійської граматики по дорозі.",
      'Your first lesson? The verb "to be." Your first problem? Well... that\'s another story.':
        'Твій перший урок? Дієслово "to be". Твоя перша проблема? Ну... це вже інша історія.',
      "An illustrated story for learning English":
        "Ілюстрована історія для вивчення англійської",
      "Educational comics for learning English":
        "Освітні комікси для вивчення англійської",
      "J&N Education": "J&N Education",
      "J&N — A story that teaches!": "J&N — Історія, що навчає!",
    },
  };

  function merge() {
    const i18n = window.siteI18n;
    if (!i18n || !i18n.translations) return false;
    Object.keys(packs).forEach(function (lang) {
      if (!i18n.translations[lang]) i18n.translations[lang] = {};
      Object.assign(i18n.translations[lang], packs[lang]);
    });
    return true;
  }

  if (!merge()) {
    document.addEventListener("DOMContentLoaded", merge);
  }
})();
