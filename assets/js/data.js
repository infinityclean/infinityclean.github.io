/* =====================================================================
   INFINITY CLEANING SERVICE — single source of truth
   Texts (RO + RU), prices and contacts used by:
     • the printed catalog (PDF), the business cards
     • every website variant
   Edit here, then run:  python src/tools/build.py
   ===================================================================== */
window.ICS = {

  /* ---------- CONTACTS: replace the placeholders before printing ---------- */
  contacts: {
    phone: "+373 XX XXX XXX",            // shown on paper and on the site
    phoneIntl: "373XXXXXXXX",            // digits only, used for tel:, WhatsApp, Viber links
    messengers: ["whatsapp", "viber", "telegram"],   // which messengers work on this number
    telegramUser: "",                    // optional, without @ (if empty the phone number is used)
    instagram: "",                       // e.g. "infinity.cleaning.md" (without @). Empty = business name is shown
    facebook: "",                        // page name / id, e.g. "infinitycleaning.md"
    tiktok: "",
    email: "",                           // e.g. "contact@infinityclean.md" (empty = hidden)
    website: "infinityclean.github.io",
    websiteUrl: "https://infinityclean.github.io/",
    area:  { ro: "", ru: "" },           // e.g. "Chișinău și suburbii" / "Кишинёв и пригороды" (empty = hidden)
    hours: { ro: "", ru: "" },           // e.g. "Luni – Sâmbătă, 08:00 – 20:00" (empty = hidden)
    person: { name: "", role: { ro: "", ru: "" } }   // optional name on the business card
  },

  brand: {
    name: "Infinity Cleaning Service",
    tagline: { ro: "Perfecțiunea stă în detalii", ru: "Совершенство — в деталях" },
    claim:   { ro: "Servicii profesionale de curățenie", ru: "Профессиональная уборка" }
  },

  /* ---------- UI strings ---------- */
  t: {
    ro: {
      catalog: "Catalog de servicii", tariffs: "Tarife", includes: "Include",
      ourProducts: "Produsele noastre", clientProducts: "Produsele clientului",
      withOur: "cu produsele noastre", withClient: "cu produsele clientului",
      from: "de la", perM2: "lei/m²", lei: "lei", m2: "m²",
      about: "Despre noi", whyUs: "De ce să ne alegeți", services: "Serviciile noastre",
      priceList: "Lista de prețuri", howWeWork: "Cum lucrăm", goodToKnow: "Bine de știut",
      contact: "Contactați-ne", book: "Programați o curățenie", scan: "Scanați codul pentru a deschide site-ul",
      cleaningPerM2: "Curățenie · tarif per m²", windowsPerM2: "Geamuri · tarif per m²",
      upholsteryPerItem: "Mobilier tapițat · tarif per bucată", subscription: "Abonament",
      service: "Serviciu", page: "pag.", call: "Sunați", write: "Scrieți-ne",
      phone: "Telefon", web: "Site", email: "E-mail", social: "Rețele sociale", area: "Zona de lucru", hours: "Program",
      followUs: "Urmăriți-ne", monthlyPrepaid: "Plată lunară, în avans.", visitsMonth: "vizite/lună"
    },
    ru: {
      catalog: "Каталог услуг", tariffs: "Тарифы", includes: "Включает",
      ourProducts: "Наши средства", clientProducts: "Средства клиента",
      withOur: "с нашими средствами", withClient: "со средствами клиента",
      from: "от", perM2: "лей/м²", lei: "лей", m2: "м²",
      about: "О нас", whyUs: "Почему выбирают нас", services: "Наши услуги",
      priceList: "Прайс-лист", howWeWork: "Как мы работаем", goodToKnow: "Полезно знать",
      contact: "Свяжитесь с нами", book: "Запишитесь на уборку", scan: "Отсканируйте код, чтобы открыть сайт",
      cleaningPerM2: "Уборка · цена за м²", windowsPerM2: "Окна · цена за м²",
      upholsteryPerItem: "Мягкая мебель · цена за единицу", subscription: "Абонемент",
      service: "Услуга", page: "стр.", call: "Позвонить", write: "Написать",
      phone: "Телефон", web: "Сайт", email: "E-mail", social: "Соцсети", area: "Район работы", hours: "График",
      followUs: "Мы в соцсетях", monthlyPrepaid: "Ежемесячная оплата, авансом.", visitsMonth: "визита/мес."
    }
  },

  /* ---------- ABOUT ---------- */
  about: {
    ro: "Infinity Cleaning Service înseamnă curățenie făcută cu grijă, responsabilitate și atenție la fiecare detaliu. Avem grijă de locuința dumneavoastră ca de propria casă — pentru ca dumneavoastră să vă bucurați de timp liber, de confort și de un spațiu curat, proaspăt și igienizat.",
    ru: "Infinity Cleaning Service — это уборка с заботой, ответственностью и вниманием к каждой детали. Мы относимся к вашему дому как к своему, чтобы вы могли наслаждаться свободным временем, комфортом и чистым, свежим и ухоженным пространством."
  },
  values: [
    { icon: "diamond",
      title: { ro: "Atenție la detalii", ru: "Внимание к деталям" },
      text:  { ro: "Fiecare colț contează — de la prize până la pervazuri.", ru: "Важен каждый уголок — от розеток до подоконников." } },
    { icon: "spray",
      title: { ro: "Produse profesionale", ru: "Профессиональные средства" },
      text:  { ro: "Lucrăm cu produsele noastre sau cu ale dumneavoastră — la alegere.", ru: "Работаем с нашими средствами или с вашими — на ваш выбор." } },
    { icon: "calendar-check",
      title: { ro: "Punctualitate și flexibilitate", ru: "Пунктуальность и гибкость" },
      text:  { ro: "Venim la ora stabilită. Abonamente săptămânale, bilunare sau lunare.", ru: "Приезжаем в назначенное время. Абонементы раз в неделю, в две недели или в месяц." } },
    { icon: "receipt",
      title: { ro: "Prețuri clare", ru: "Понятные цены" },
      text:  { ro: "Tarife transparente per m² și evaluare corectă înainte de lucru.", ru: "Прозрачные тарифы за м² и честная оценка до начала работы." } }
  ],

  /* ---------- SERVICES (catalog order) ---------- */
  services: [
    {
      id: "generala", ill: "spray", icon: "spray", layout: "tariffs",
      title: { ro: "Curățenie generală", ru: "Генеральная уборка" },
      lead:  { ro: "Curățare completă și detaliată, pentru un rezultat impecabil.", ru: "Полная и тщательная уборка для безупречного результата." },
      prices: [
        { value: "35", unit: "perM2", label: "ourProducts" },
        { value: "30", unit: "perM2", label: "clientProducts" }
      ],
      includes: {
        ro: ["Curățarea tuturor încăperilor", "Îndepărtarea depunerilor dificile", "Igienizare completă a bucătăriei și a băii", "Degresarea suprafețelor", "Spălarea pardoselilor", "Curățarea ușilor, prizelor și întrerupătoarelor", "Locuință curată, proaspătă și igienizată"],
        ru: ["Уборка всех помещений", "Удаление сложных загрязнений", "Полная санобработка кухни и ванной", "Обезжиривание поверхностей", "Мытьё полов", "Чистка дверей, розеток и выключателей", "Чистое, свежее и гигиеничное жильё"]
      }
    },
    {
      id: "intretinere", ill: "bucket", icon: "bucket", layout: "tariffs",
      title: { ro: "Curățenie de întreținere", ru: "Поддерживающая уборка" },
      lead:  { ro: "Pentru o locuință mereu curată, ordonată și confortabilă.", ru: "Чтобы дом всегда оставался чистым, аккуратным и уютным." },
      prices: [
        { value: "25", unit: "perM2", label: "ourProducts" },
        { value: "20", unit: "perM2", label: "clientProducts" }
      ],
      includes: {
        ro: ["Aspirarea și spălarea pardoselilor", "Ștergerea prafului de pe suprafețe", "Curățarea mobilierului accesibil", "Igienizarea bucătăriei", "Curățarea și dezinfectarea băii", "Ordine și aspect impecabil"],
        ru: ["Пылесос и мытьё полов", "Удаление пыли с поверхностей", "Чистка доступной мебели", "Санобработка кухни", "Чистка и дезинфекция ванной", "Порядок и безупречный вид"]
      }
    },
    {
      id: "abonamente", ill: "calendar", icon: "calendar-check", layout: "plans",
      title: { ro: "Abonamente de întreținere", ru: "Абонементы на уборку" },
      lead:  { ro: "Curățenie regulată la un preț avantajos — alegeți ritmul potrivit pentru dumneavoastră.", ru: "Регулярная уборка по выгодной цене — выберите удобный для вас ритм." },
      plans: [
        { name: "WEEKLY",    visits: { ro: "4 vizite/lună", ru: "4 визита в месяц" }, our: "23", client: "19", tag: { ro: "Cel mai avantajos", ru: "Самый выгодный" } },
        { name: "BI-WEEKLY", visits: { ro: "2 vizite/lună", ru: "2 визита в месяц" }, our: "24", client: "19" },
        { name: "FLEX",      visits: { ro: "1 vizită/lună", ru: "1 визит в месяц" },  our: "25", client: "20" }
      ],
      note: { ro: "Plată lunară, în avans.", ru: "Ежемесячная оплата, авансом." }
    },
    {
      id: "camere", ill: "sofa", icon: "sofa", layout: "plain",
      title: { ro: "Curățarea camerelor și a livingului", ru: "Уборка комнат и гостиной" },
      lead:  { ro: "Camere curate și primitoare, în care vă simțiți cu adevărat acasă.", ru: "Чистые и уютные комнаты, в которых по-настоящему чувствуешь себя дома." },
      includes: {
        ro: ["Aspirarea covoarelor și a pardoselilor", "Ștergerea prafului de pe mobilier, rafturi și decorațiuni", "Curățarea ușilor, mânerelor și a prizelor", "Îngrijirea suprafețelor din sticlă (mese, vitrine)", "Menținerea unui ambient curat și plăcut"],
        ru: ["Пылесос ковров и полов", "Удаление пыли с мебели, полок и декора", "Чистка дверей, ручек и розеток", "Уход за стеклянными поверхностями (столы, витрины)", "Чистая и приятная атмосфера в доме"]
      }
    },
    {
      id: "bucatarie", ill: "kitchen", icon: "chef-hat", layout: "plain",
      title: { ro: "Bucătărie", ru: "Кухня" },
      lead:  { ro: "Curățenie și igienă acolo unde contează cel mai mult.", ru: "Чистота и гигиена там, где это важнее всего." },
      includes: {
        ro: ["Curățarea și degresarea blatului", "Curățarea plitei și a hotei", "Curățarea fațadelor mobilierului", "Interiorul și exteriorul electrocasnicelor (zonele accesibile)", "Chiuveta și bateria", "Îndepărtarea petelor și a urmelor de grăsime", "Igienizare completă"],
        ru: ["Чистка и обезжиривание столешницы", "Чистка варочной панели и вытяжки", "Чистка фасадов кухонной мебели", "Бытовая техника внутри и снаружи (в доступных местах)", "Мойка и смеситель", "Удаление пятен и следов жира", "Полная санобработка"]
      }
    },
    {
      id: "baie", ill: "bath", icon: "bath", layout: "plain",
      title: { ro: "Baie și grup sanitar", ru: "Ванная и санузел" },
      lead:  { ro: "Strălucire, prospețime și igienă impecabilă.", ru: "Блеск, свежесть и безупречная гигиена." },
      includes: {
        ro: ["Curățarea și dezinfectarea vasului de toaletă", "Curățarea lavoarului și a bateriilor", "Curățarea căzii sau a cabinei de duș", "Îndepărtarea calcarului și a depunerilor", "Curățarea oglinzilor și a suprafețelor", "Igienizare completă și prospețime"],
        ru: ["Чистка и дезинфекция унитаза", "Чистка раковины и смесителей", "Чистка ванны или душевой кабины", "Удаление известкового налёта и отложений", "Чистка зеркал и поверхностей", "Полная санобработка и свежесть"]
      }
    },
    {
      id: "geamuri", ill: "window", icon: "window", layout: "tariffs",
      title: { ro: "Spălarea geamurilor", ru: "Мытьё окон" },
      lead:  { ro: "Geamuri curate, fără dâre — mai multă lumină în casa dumneavoastră.", ru: "Чистые окна без разводов — больше света в вашем доме." },
      prices: [
        { value: "20", unit: "perM2", label: { ro: "Interior", ru: "Изнутри" } },
        { value: "25", unit: "perM2", label: { ro: "Exterior", ru: "Снаружи" } },
        { value: "35", unit: "perM2", label: { ro: "Ambele părți", ru: "С обеих сторон" } }
      ],
      note: { ro: "Murdărie accentuată: de la 45 lei/m², după evaluare.", ru: "Сильное загрязнение: от 45 лей/м², после оценки." },
      includes: {
        ro: ["Spălarea geamurilor pe ambele părți", "Curățarea ramelor și a pervazurilor", "Îndepărtarea petelor și a depunerilor", "Finisare fără dâre, pentru transparență maximă"],
        ru: ["Мытьё окон с обеих сторон", "Чистка рам и подоконников", "Удаление пятен и налёта", "Финиш без разводов — максимальная прозрачность"]
      }
    },
    {
      id: "balcoane", ill: "balcony", icon: "building", layout: "tariffs",
      title: { ro: "Balcoane și holuri", ru: "Балконы и коридоры" },
      lead:  { ro: "Spații de trecere curate și balcoane primitoare.", ru: "Чистые коридоры и уютные балконы." },
      prices: [ { value: "25", unit: "perM2", from: true, label: { ro: "Tarif de pornire", ru: "Стартовая цена" } } ],
      includes: {
        ro: ["Curățarea pardoselilor", "Spălarea balustradelor și a suprafețelor", "Curățarea geamurilor (la cerere)", "Îndepărtarea prafului și a murdăriei", "Aspect curat și ordonat"],
        ru: ["Мытьё полов", "Мытьё перил и поверхностей", "Мытьё окон (по запросу)", "Удаление пыли и грязи", "Чистый и аккуратный вид"]
      }
    },
    {
      id: "suplimentare", ill: "vacuum", icon: "vacuum", layout: "plain",
      title: { ro: "Servicii suplimentare", ru: "Дополнительные услуги" },
      lead:  { ro: "Pentru o prospețime completă a casei dumneavoastră.", ru: "Для полной свежести вашего дома." },
      includes: {
        ro: ["Curățarea tapițeriei (canapele, fotolii, saltele)", "Curățarea cu abur și dezinfectare", "Spălarea covoarelor", "Împrospătarea textilelor"],
        ru: ["Химчистка мягкой мебели (диваны, кресла, матрасы)", "Паровая чистка и дезинфекция", "Чистка ковров", "Освежение текстиля"]
      }
    },
    {
      id: "tapitate", ill: "armchair", icon: "armchair", layout: "pricelist",
      title: { ro: "Curățarea mobilei tapițate", ru: "Химчистка мягкой мебели" },
      lead:  { ro: "Curățare profesională, în profunzime, pentru un mobilier curat, igienizat și reîmprospătat.", ru: "Профессиональная глубокая чистка — для чистой, гигиеничной и обновлённой мебели." },
      includes: {
        ro: ["Curățare prin injecție-extracție (unde materialul permite)", "Îndepărtarea murdăriei și a petelor obișnuite", "Neutralizarea mirosurilor neplăcute", "Reîmprospătarea culorilor și a texturii", "Igienizare în profunzime"],
        ru: ["Чистка методом инжекции-экстракции (если позволяет материал)", "Удаление загрязнений и обычных пятен", "Нейтрализация неприятных запахов", "Освежение цвета и текстуры ткани", "Глубокая санобработка"]
      },
      items: [
        { icon: "chair",    name: { ro: "Scaun tapițat", ru: "Стул с мягкой обивкой" }, price: "80" },
        { icon: "armchair", name: { ro: "Fotoliu", ru: "Кресло" }, price: "250" },
        { icon: "sofa2",    name: { ro: "Canapea 2 locuri", ru: "Диван 2-местный" }, price: "500" },
        { icon: "sofa3",    name: { ro: "Canapea 3 locuri", ru: "Диван 3-местный" }, price: "600" },
        { icon: "corner",   name: { ro: "Colțar", ru: "Угловой диван" }, price: "800", from: true },
        { icon: "mattress1",name: { ro: "Saltea o persoană (o față)", ru: "Матрас односпальный (1 сторона)" }, price: "350" },
        { icon: "mattress2",name: { ro: "Saltea două persoane (o față)", ru: "Матрас двуспальный (1 сторона)" }, price: "550" },
        { icon: "kcorner",  name: { ro: "Colțar de bucătărie", ru: "Кухонный уголок" }, price: "500", from: true },
        { icon: "ottoman",  name: { ro: "Taburet tapițat", ru: "Пуф / мягкий табурет" }, price: "150" }
      ],
      notes: {
        ro: ["Comandă minimă: 500 lei.", "Prețul final se confirmă după fotografii și evaluare.", "Petele vechi, murdăria accentuată sau mirosurile persistente pot necesita cost suplimentar.", "Pentru piele naturală și materiale delicate — evaluare individuală."],
        ru: ["Минимальный заказ: 500 лей.", "Окончательная цена подтверждается после фото и оценки.", "Старые пятна, сильные загрязнения или стойкие запахи могут потребовать доплаты.", "Для натуральной кожи и деликатных материалов — индивидуальная оценка."]
      }
    }
  ],

  /* ---------- HOW WE WORK ---------- */
  steps: [
    { icon: "phone-call",      title: { ro: "Ne contactați", ru: "Вы связываетесь с нами" }, text: { ro: "Sunați-ne sau scrieți-ne pe WhatsApp, Viber ori Telegram.", ru: "Позвоните или напишите нам в WhatsApp, Viber или Telegram." } },
    { icon: "clipboard-check", title: { ro: "Evaluăm", ru: "Оцениваем" }, text: { ro: "Stabilim suprafața, tipul de curățenie și prețul — la nevoie, după fotografii.", ru: "Уточняем площадь, вид уборки и стоимость — при необходимости по фото." } },
    { icon: "sparkles",        title: { ro: "Facem curat", ru: "Наводим чистоту" }, text: { ro: "Venim la ora stabilită și lucrăm atent, cu produse profesionale.", ru: "Приезжаем в назначенное время и работаем аккуратно, с профессиональными средствами." } },
    { icon: "home-heart",      title: { ro: "Vă bucurați", ru: "Вы наслаждаетесь" }, text: { ro: "De o casă curată, proaspătă și confortabilă.", ru: "Чистым, свежим и уютным домом." } }
  ],

  /* ---------- GOOD TO KNOW ---------- */
  terms: {
    ro: [
      "Tarifele pentru curățenie sunt per m²; pentru mobilierul tapițat — per bucată.",
      "La alegere: lucrăm cu produsele noastre sau cu produsele dumneavoastră.",
      "Abonamentele se achită lunar, în avans.",
      "Prețul final se confirmă după evaluare (la nevoie — după fotografii).",
      "Murdăria accentuată poate necesita un cost suplimentar."
    ],
    ru: [
      "Тарифы на уборку — за м², на химчистку мягкой мебели — за единицу.",
      "На выбор: работаем с нашими средствами или с вашими.",
      "Абонементы оплачиваются ежемесячно, авансом.",
      "Окончательная цена подтверждается после оценки (при необходимости — по фото).",
      "Сильные загрязнения могут потребовать доплаты."
    ]
  },

  /* ---------- FAQ (websites) ---------- */
  faq: [
    { q: { ro: "Cum se calculează prețul?", ru: "Как рассчитывается стоимость?" },
      a: { ro: "Pentru curățenie — în funcție de suprafață (lei/m²) și de tipul serviciului. Pentru mobilierul tapițat — per bucată. Prețul final îl confirmăm după evaluare, la nevoie după fotografii.", ru: "Уборка — по площади (лей/м²) и виду услуги. Химчистка мягкой мебели — за единицу. Окончательную цену подтверждаем после оценки, при необходимости по фото." } },
    { q: { ro: "Folosiți produsele voastre?", ru: "Вы приезжаете со своими средствами?" },
      a: { ro: "Da, venim cu produse profesionale. Dacă preferați, putem lucra și cu produsele dumneavoastră — tariful este mai mic.", ru: "Да, мы приезжаем с профессиональными средствами. Если хотите, можем работать вашими — тогда тариф ниже." } },
    { q: { ro: "Cum funcționează abonamentele?", ru: "Как работают абонементы?" },
      a: { ro: "Alegeți ritmul: WEEKLY (4 vizite/lună), BI-WEEKLY (2 vizite/lună) sau FLEX (1 vizită/lună). Plata se face lunar, în avans.", ru: "Выберите ритм: WEEKLY (4 визита в месяц), BI-WEEKLY (2 визита) или FLEX (1 визит). Оплата — ежемесячно, авансом." } },
    { q: { ro: "Care este comanda minimă pentru mobilier tapițat?", ru: "Какой минимальный заказ на химчистку мебели?" },
      a: { ro: "Comanda minimă este de 500 lei. Pentru piele naturală și materiale delicate facem o evaluare individuală.", ru: "Минимальный заказ — 500 лей. Для натуральной кожи и деликатных материалов — индивидуальная оценка." } },
    { q: { ro: "Cum pot face o programare?", ru: "Как записаться на уборку?" },
      a: { ro: "Sunați-ne sau scrieți-ne pe WhatsApp, Viber ori Telegram. Stabilim împreună data, ora și detaliile.", ru: "Позвоните или напишите нам в WhatsApp, Viber или Telegram — вместе согласуем дату, время и детали." } }
  ],

  /* ---------- WEBSITE UI ---------- */
  web: {
    ro: {
      meta: { title: "Infinity Cleaning Service — curățenie profesională", description: "Curățenie generală și de întreținere, abonamente, spălarea geamurilor, balcoane și curățarea mobilei tapițate. Tarife clare per m². Perfecțiunea stă în detalii." },
      nav: { services: "Servicii", prices: "Prețuri", plans: "Abonamente", upholstery: "Mobilier tapițat", process: "Cum lucrăm", faq: "Întrebări", contact: "Contact", catalog: "Catalog" },
      hero: { kicker: "Servicii profesionale de curățenie", titleA: "Curățenie impecabilă,", titleB: "cu atenție la fiecare detaliu", title: "Curățenie impecabilă, cu atenție la fiecare detaliu", sub: "Curățenie generală și de întreținere, abonamente, spălarea geamurilor și curățarea mobilei tapițate — pentru o casă curată, proaspătă și confortabilă.", from: "Tarife de la", facts: ["Tarife clare per m²", "Produsele noastre sau ale dumneavoastră", "Abonamente lunare"] },
      cta: { book: "Programează o curățenie", bookShort: "Programează", call: "Sună acum", whatsapp: "Scrie pe WhatsApp", catalog: "Catalogul PDF", more: "Vezi toate lucrările", less: "Ascunde", browse: "Răsfoiește catalogul", choose: "Alege", menu: "Meniu", prev: "Înapoi", next: "Înainte", open: "Deschide", close: "Închide", top: "Sus" },
      sec: {
        services: ["Serviciile noastre", "Fiecare serviciu include o listă clară de lucrări — știți exact ce primiți."],
        prices: ["Tarife clare", "Prețuri per m² — cu produsele noastre sau cu ale dumneavoastră."],
        plans: ["Abonamente de întreținere", "Curățenie regulată la un preț avantajos. Plată lunară, în avans."],
        upholstery: ["Curățarea mobilei tapițate", "Curățare profesională, în profunzime, pentru un mobilier curat, igienizat și reîmprospătat."],
        process: ["Cum lucrăm", "Simplu și transparent — de la primul mesaj până la casa curată."],
        why: ["De ce să ne alegeți", "Lucrăm atent, punctual și cu prețuri clare."],
        faq: ["Întrebări frecvente", "Răspunsuri scurte la cele mai importante întrebări."],
        contact: ["Programați o curățenie", "Completați formularul — mesajul se deschide gata scris în WhatsApp. Sau sunați-ne direct."],
        catalog: ["Catalogul de servicii", "Descărcați catalogul complet în format PDF — în română sau în rusă."],
        calc: ["Calculați prețul", "Aflați costul estimativ în câteva secunde."]
      },
      form: { name: "Nume", phone: "Telefon", service: "Serviciu", area: "Suprafața (m²)", date: "Data dorită", message: "Detalii (opțional)", send: "Trimite pe WhatsApp", hint: "Se deschide WhatsApp cu mesajul completat — nimic nu se trimite fără confirmarea dumneavoastră.", greeting: "Bună ziua! Aș dori să programez o curățenie.", other: "Altceva / consultanță" },
      calc: { title: "Calculator de preț", tabCleaning: "Curățenie", tabUph: "Mobilier tapițat", type: "Tipul curățeniei", area: "Suprafața", products: "Produse", ours: "Produsele voastre", client: "Produsele mele", sides: "Partea geamurilor", result: "Cost estimativ", perVisit: "per vizită", perMonth: "pe lună", note: "Estimare orientativă. Prețul final se confirmă după evaluare.", minOrder: "Comanda minimă pentru mobilier tapițat este de 500 lei.", empty: "Adăugați obiectele de mobilier", send: "Trimite cererea pe WhatsApp", windows: "Spălarea geamurilor", windowsArea: "Suprafața geamurilor" },
      misc: { includes: "Include", tariffs: "Tarife", popular: "Cel mai avantajos", perM2: "lei/m²", lei: "lei", from: "de la", demoPhone: "Numărul de telefon va fi publicat în curând.", rights: "Toate drepturile rezervate.", lang: "Limba", ro: "Română", ru: "Русский", pdfRo: "Catalog în română (PDF)", pdfRu: "Каталог на русском (PDF)", pages: "16 pagini · A5", scan: "Scanați pentru a deschide site-ul", followUs: "Urmăriți-ne", item: "obiect" }
    },
    ru: {
      meta: { title: "Infinity Cleaning Service — профессиональная уборка", description: "Генеральная и поддерживающая уборка, абонементы, мытьё окон, балконы и химчистка мягкой мебели. Понятные тарифы за м². Совершенство — в деталях." },
      nav: { services: "Услуги", prices: "Цены", plans: "Абонементы", upholstery: "Мягкая мебель", process: "Как мы работаем", faq: "Вопросы", contact: "Контакты", catalog: "Каталог" },
      hero: { kicker: "Профессиональная уборка", titleA: "Безупречная чистота", titleB: "с вниманием к каждой детали", title: "Безупречная чистота с вниманием к каждой детали", sub: "Генеральная и поддерживающая уборка, абонементы, мытьё окон и химчистка мягкой мебели — для чистого, свежего и уютного дома.", from: "Тарифы от", facts: ["Понятные цены за м²", "Наши средства или ваши", "Ежемесячные абонементы"] },
      cta: { book: "Записаться на уборку", bookShort: "Записаться", call: "Позвонить", whatsapp: "Написать в WhatsApp", catalog: "Каталог PDF", more: "Весь перечень работ", less: "Свернуть", browse: "Листать каталог", choose: "Выбрать", menu: "Меню", prev: "Назад", next: "Вперёд", open: "Открыть", close: "Закрыть", top: "Наверх" },
      sec: {
        services: ["Наши услуги", "Каждая услуга включает понятный перечень работ — вы точно знаете, что получите."],
        prices: ["Понятные цены", "Цены за м² — с нашими средствами или с вашими."],
        plans: ["Абонементы на уборку", "Регулярная уборка по выгодной цене. Оплата ежемесячно, авансом."],
        upholstery: ["Химчистка мягкой мебели", "Профессиональная глубокая чистка — для чистой, гигиеничной и обновлённой мебели."],
        process: ["Как мы работаем", "Просто и прозрачно — от первого сообщения до чистого дома."],
        why: ["Почему выбирают нас", "Работаем аккуратно, пунктуально и по понятным ценам."],
        faq: ["Частые вопросы", "Коротко о самом важном."],
        contact: ["Запишитесь на уборку", "Заполните форму — сообщение откроется готовым в WhatsApp. Или просто позвоните."],
        catalog: ["Каталог услуг", "Скачайте полный каталог в PDF — на румынском или русском."],
        calc: ["Рассчитайте стоимость", "Узнайте примерную цену за несколько секунд."]
      },
      form: { name: "Имя", phone: "Телефон", service: "Услуга", area: "Площадь (м²)", date: "Желаемая дата", message: "Детали (необязательно)", send: "Отправить в WhatsApp", hint: "Откроется WhatsApp с готовым сообщением — без вашего подтверждения ничего не отправляется.", greeting: "Здравствуйте! Хочу записаться на уборку.", other: "Другое / консультация" },
      calc: { title: "Калькулятор стоимости", tabCleaning: "Уборка", tabUph: "Мягкая мебель", type: "Вид уборки", area: "Площадь", products: "Средства", ours: "Ваши средства", client: "Мои средства", sides: "Сторона окон", result: "Примерная стоимость", perVisit: "за визит", perMonth: "в месяц", note: "Ориентировочная оценка. Окончательная цена — после оценки.", minOrder: "Минимальный заказ на химчистку мебели — 500 лей.", empty: "Добавьте предметы мебели", send: "Отправить заявку в WhatsApp", windows: "Мытьё окон", windowsArea: "Площадь окон" },
      misc: { includes: "Включает", tariffs: "Тарифы", popular: "Самый выгодный", perM2: "лей/м²", lei: "лей", from: "от", demoPhone: "Номер телефона скоро появится на сайте.", rights: "Все права защищены.", lang: "Язык", ro: "Română", ru: "Русский", pdfRo: "Catalog în română (PDF)", pdfRu: "Каталог на русском (PDF)", pages: "16 страниц · A5", scan: "Отсканируйте, чтобы открыть сайт", followUs: "Мы в соцсетях", item: "шт." }
    }
  }
};
