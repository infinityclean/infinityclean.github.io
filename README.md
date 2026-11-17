# Infinity Cleaning Service — site / сайт

**Perfecțiunea stă în detalii · Совершенство — в деталях**

🌐 **https://infinityclean.github.io/** — pagina de alegere a designului / страница выбора дизайна

| # | Varianta / Вариант | Link |
|---|---|---|
| 1 | **Noir Royal** — clasic, ca în catalog / классика, как в каталоге | https://infinityclean.github.io/noir/ |
| 2 | **Catalog digital** — catalogul de răsfoit / листаемый каталог | https://infinityclean.github.io/catalog/ |
| 3 | **Modern** — cu calculator de preț / с калькулятором цены | https://infinityclean.github.io/modern/ |

Fiecare variantă: română / русский (`?lang=ru`), adaptată pentru telefon, butoane WhatsApp · Viber · Telegram, catalog PDF.
Каждый вариант: румынский / русский (`?lang=ru`), адаптирован для телефона, кнопки WhatsApp · Viber · Telegram, каталог PDF.

## Structura / Структура

```
index.html            pagina de alegere / страница выбора
noir/  catalog/  modern/   cele 3 variante / 3 варианта (index.html + style.css + app.js)
assets/js/data.js     TOATE textele, prețurile și contactele (RO + RU) / ВСЕ тексты, цены и контакты
assets/js/core.js     limbă, contacte, formular → WhatsApp, calculator / язык, контакты, форма, калькулятор
assets/catalog/       catalogul PDF / каталог PDF (RO, RU)
```

Prețurile și contactele se schimbă într-un singur loc — `assets/js/data.js` (sursa: `src/content/data.js` din proiect).
Цены и контакты меняются в одном месте — `assets/js/data.js` (исходник: `src/content/data.js` в проекте).

## Licențe / Лицензии

- Fonturi / шрифты: Playfair Display, Montserrat — SIL Open Font License (`assets/fonts/OFL-*.txt`)
- Pictograme / иконки: [Tabler Icons](https://tabler.io/icons) — MIT
- QR: [qrcode-generator](https://github.com/kazuhikoarase/qrcode-generator) (Kazuhiko Arase) — MIT
- Logo, ilustrații / логотип, иллюстрации: © Infinity Cleaning Service
