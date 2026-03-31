# Söl Tea — CLAUDE.md

Концептуальний портфоліо e-commerce магазин нішових китайських чаїв.
Автор: Яна Лізгова (UX/UI, Design Engineer).
Стиль: мінімалістично-круто, editorial, без пафосу.

---

## Дизайн система

### CSS змінні (є в :root кожного файлу)
```css
--cream: #F5F0E8        /* фон сторінки */
--cream-bright: #FDFCF9 /* фон карток */
--sand: #E8E0CC         /* неактивні теги, кнопки, dropdown */
--green-800: #226F54    /* основний акцент */
--green-500: #7CC44A    /* другорядний акцент, бейджі "Новинка" */
--terra: #C4855A        /* wishlist активний, бейдж "Обмежений" */
--black: #1C1A14
--gray-800: #4A4538
--gray-500: #7A7060
--gray-300: #B5AFA3
--gray-100: #D9D3C7
```

### Шрифти
- Заголовки: **Inter 900**, letter-spacing: -0.02em до -0.03em
- Body / UI: **DM Sans 300–500**

### Іконки
HugeIcons stroke-rounded. CDN: `https://use.hugeicons.com/font/icons.css`
Клас: `hgi-stroke hgi-[назва]`
**Не використовувати `hgi-solid`** — ненадійно завантажується в Safari.
Для wishlist активного стану — лише змінювати `color: var(--terra)`, іконку не міняти.

### Кнопки
| Клас | Фон | Текст | Hover |
|------|-----|-------|-------|
| `.btn-primary` | green-800 | cream-bright | black |
| `.btn-secondary` | green-500 | cream-bright | green-800 |
| `.btn-outline-cream` | прозорий | cream-bright | cream-bright fill |
| `.btn-filled-cream` | cream-bright | green-800 | sand |
| `.btn-outline-dark` | прозорий | green-800 | green-800 fill |
| `.btn-add` | black | cream-bright | green-800 |

Стрілки в кнопках: `translateX(3px)` → `translateX(7px)` на hover.
border-radius кнопок: `40px` (pill).

### Правила
- Без дівайдерів — тільки блочна структура
- border-radius карток: `20–24px`
- Чергування блоків: cream → green-800 → cream → green-800

---

## Файли проекту

Всі файли в одній папці `~/Desktop/sol-tea/`. Посилання — просто назва файлу.

| Файл | Статус | Опис |
|------|--------|------|
| `sol-tea.html` | ✅ Готова | Головна сторінка |
| `index.html` | ✅ Готова | Редирект на sol-tea.html |
| `sol-shop.html` | 🔧 В роботі | Магазин (каталог) |
| `sol-product.html` | ⬜ Не почата | Картка товару |
| `sol-cart.html` | ⬜ Не почата | Кошик |
| `sol-checkout.html` | ⬜ Не почата | Оформлення замовлення |

---

## Медіа та зображення

Всі зображення зараз — плейсхолдери (div з текстом "Фото").
Коли будуть готові файли — замінити на `<img src="images/назва.jpg" alt="...">`.
Папка для зображень: `/images/` (поряд з html-файлами).
**Не видаляти плейсхолдери** поки зображення не готові.

---

## Навігація між сторінками

### Що вже працює
- `sol-shop.html` → nav "Про нас" веде на `sol-tea.html` ✅
- `sol-shop.html` → логотип веде на `sol-tea.html` ✅

### Що треба виправити в `sol-tea.html`
- Nav посилання "Магазин" → додати `href="sol-shop.html"`
- Кнопка "До колекцій" (hero) → додати `href="sol-shop.html"`
- Кнопка "Переглянути всі" (блок Хіти продажів) → `href="sol-shop.html"`
- Кнопки "Переглянути" (блок Колекції) → `href="sol-shop.html"`
- Логотип у nav → огорнути в `<a href="sol-tea.html">`

### Як додавати посилання на кнопки
```html
<!-- Кнопка-посилання: -->
<a href="sol-shop.html" class="btn-primary">
  Переглянути всі <i class="hgi-stroke hgi-arrow-right-01"></i>
</a>

<!-- Або через onclick: -->
<button class="btn-primary" onclick="window.location.href='sol-shop.html'">
  До колекцій
</button>
```

---

## Структура nav (однакова на всіх сторінках)

```
Логотип (→ sol-tea.html) | Про нас | Магазин | Пошук | [spacer] | Профіль | Кошик | FAQ | Бургер
```

---

## JS функції — не перейменовувати

| Функція | Що робить |
|---------|-----------|
| `toggleProfile()` | slide-in панель профілю (справа) |
| `toggleMobileMenu()` | мобільне меню (зліва) |
| `addToCart(name, btn)` | додає товар у sessionStorage, оновлює badge |
| `updateCartBadge()` | синхронізує badge кошика |
| `goToCart()` | переходить на sol-cart.html |
| `toggleWish(el)` | wishlist — міняє колір на terra (не міняє клас іконки!) |
| `renderFilters()` | рендерить пілюлі підфільтрів (тільки sol-shop) |
| `renderCards()` | рендерить картки + анімація через rAF (тільки sol-shop) |
| `toggleCatDropdown()` | відкриває/закриває dropdown категорій (тільки sol-shop) |
| `selectCategory(el)` | вибір категорії з dropdown (тільки sol-shop) |
| `filterSwitch(el)` | single-select підфільтр (тільки sol-shop) |

### Cart badge
Зберігається в `sessionStorage` ключ `'solCart'`.
Формат: `[{ name: "Те Гуань Інь", qty: 2 }, ...]`
Передається між сторінками автоматично поки відкрита вкладка.

---

## sol-shop.html — специфіка

### Фільтри — два рівні
1. **Dropdown** `.cat-dropdown` — вибір секції (Чай / Посуд / Дошки / Аксесуари)
2. **Пілюлі** `.filter-pill` — підфільтри в рядку після dropdown

### Single-select
Клік на пілюлю встановлює один активний фільтр. Мультивибору немає.

### Анімація карток
Через `requestAnimationFrame` — НЕ через CSS animation-delay.
Причина: CSS `translate` property ненадійна в Safari, використовується `transform: translateY`.

### z-index стек
- `.filter-bar`: z-index 100
- `.cat-dropdown`, `.cat-menu`: z-index 200
- `.products-grid`: z-index 1
- Панелі (profile, mobile menu): z-index 201

### Дані товарів
Зберігаються в JS об'єкті `SECTIONS` всередині файлу.
Структура кожного товару: `{ name, cat, region, desc, price, bg, badge }`

---

## Що не реалізовано (не чіпати)

- **Пошук** — поле є візуально, функціонал не підключений
- **Пагінація** — кнопки є декоративно, реальна логіка не реалізована
- **Email підписка** — поле є у футері, відповідь після сабміту не реалізована
- **Wishlist панель** — серця на картках є, але окрема панель вішліста не зроблена (планується)

---

## GitHub

- Репозиторій: https://github.com/yananaaas/sol-tea
- GitHub Pages: https://yananaaas.github.io/sol-tea/
- Деплой автоматичний через ~1 хв після push
- Команда для деплою: `git add . && git commit -m "опис змін" && git push`
- Або в Claude Code: *"залий зміни на GitHub"*

---

## Що не чіпати без потреби

- SVG paths логотипу (складна геометрія, 3 path)
- Назви JS функцій з таблиці вище
- sessionStorage ключ `'solCart'`
- CDN посилання (Google Fonts, HugeIcons)

---

## Наступні задачі

### Термінові (малі правки в готових файлах)
1. `sol-tea.html` — виправити посилання в nav і кнопках (див. розділ "Навігація")

### Наступні сторінки
- `sol-product.html` — картка товару: фото, назва, регіон, ціна, вибір граму, кнопка в кошик
- `sol-cart.html` — кошик: список з sessionStorage, кількість, ціни, кнопка оформити
- `sol-checkout.html` — форма: ім'я, Нова Пошта, email, телефон, оплата

### Пізніше
- Додати wishlist панель (slide-in як профіль) з іконкою серця в nav
- Підключити реальні зображення з папки `/images/`
- Email підписка — показувати повідомлення після сабміту
