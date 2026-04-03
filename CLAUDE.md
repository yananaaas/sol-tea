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
--sand: #E8E0CC         /* неактивні теги, кнопки, dropdown, stat-card */
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
Розмір кнопок: `padding: 14px 28px; font-size: 15px` — єдиний стандарт для всіх кнопок.
`border-radius: 40px` (pill) для всіх.

| Клас | Фон | Текст | Hover |
|------|-----|-------|-------|
| `.btn-primary` | green-800 | cream-bright | black |
| `.btn-secondary` | green-500 | cream-bright | cream-bright fill, green-800 text |
| `.btn-outline-cream` | прозорий | cream-bright | cream-bright fill |
| `.btn-filled-cream` | cream-bright | green-800 | sand |
| `.btn-outline-dark` | прозорий | green-800 | green-800 fill |
| `.btn-add` | black | cream-bright | green-800 |

Стрілки в кнопках: `translateX(3px)` → `translateX(7px)` на hover.
`.btn-secondary i { transform: translateX(3px); margin-right: -4px; }` — для arrow-right-01.

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
| `sol-shop.html` | ✅ Готова | Магазин (каталог) |
| `index.html` | ✅ Готова | Редирект на sol-tea.html |
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

- `sol-tea.html` → nav "Магазин" → `sol-shop.html` ✅
- `sol-tea.html` → логотип → `sol-tea.html` (треба огорнути в `<a>`)
- `sol-shop.html` → nav "Про нас" → `sol-tea.html` ✅
- `sol-shop.html` → логотип → `sol-tea.html` ✅
- Кнопки "До колекцій", "Переглянути всі", "Переглянути" — ще не мають `href="sol-shop.html"`

---

## Структура nav (однакова на всіх сторінках)

**Десктоп** (80px):
```
Логотип | Про нас | Магазин | [Пошук 280px] | [spacer] | [nav-search-inline hidden] | Профіль | Вішліст | Кошик | FAQ
```

**Мобілка** (72px):
```
Логотип | [margin-left: auto →] Пошук | Профіль | Вішліст | Кошик | Бургер
```
- Всі іконки: `44×44px`, `font-size: 22px`, `gap: 0`
- Бургер відкриває **dropdown** меню (не slide-in панель!) — позиціонується `top: 76px; right: 16px`
- Dropdown: `width: 240px; background: var(--sand); border-radius: 20px`

### Search overlay (десктоп) / inline (мобілка)
- **Десктоп**: клік на поле пошуку відкриває `.search-overlay` під nav
- **Мобілка**: клік на іконку пошуку додає клас `search-active` до `<nav>`:
  - `.nav-right` і `.burger-btn` ховаються
  - `.nav-search-inline` показується (`display: flex`) — поле прямо в nav
  - `.search-overlay { display: none !important }` — overlay на мобілці вимкнений
- `font-size: 16px` на input — запобігає iOS Safari zoom

---

## JS функції — не перейменовувати

### sol-tea.html
| Функція | Що робить |
|---------|-----------|
| `toggleProfile()` | slide-in панель профілю (справа) |
| `toggleMobileMenu()` | dropdown меню (права сторона) |
| `openSearch()` | десктоп: відкриває `.search-overlay`; мобілка: `nav.search-active` |
| `closeSearch()` | закриває обидва, скидає фільтр |
| `filterProducts(q)` | ховає/показує `.product-card` по запиту |

### sol-shop.html
| Функція | Що робить |
|---------|-----------|
| `toggleProfile()` | slide-in панель профілю (справа) |
| `toggleMobileMenu()` | dropdown меню (права сторона) |
| `addToCart(name, btn)` | додає товар у sessionStorage, оновлює badge |
| `updateCartBadge()` | синхронізує badge кошика |
| `goToCart()` | переходить на sol-cart.html |
| `toggleWish(el)` | wishlist — міняє колір на terra |
| `renderFilters()` | рендерить пілюлі підфільтрів |
| `renderCards()` | рендерить картки + пагінація + searchQuery фільтр |
| `toggleCatDropdown()` | відкриває/закриває dropdown категорій |
| `selectCategory(el)` | вибір категорії з dropdown |
| `filterSwitch(el)` | single-select підфільтр |
| `goToPage(page)` | пагінація (без scroll-to-top) |
| `openMobileSearch()` | десктоп: `.mobile-search-overlay`; мобілка: `nav.search-active` |
| `closeMobileSearch()` | закриває обидва, скидає searchQuery |
| `onSearchInput(value)` | оновлює searchQuery → renderCards() |

### Cart badge
Зберігається в `sessionStorage` ключ `'solCart'`.
Формат: `[{ name: "Те Гуань Інь", qty: 2 }, ...]`

---

## Поточний стан блоків — sol-tea.html

### Hero
- Десктоп: повна висота `calc(100vh - 80px - 32px)`, контент по центру зліва
- Мобілка: `calc(100svh - 72px - 16px)`, контент `bottom: 0; padding: 32px 28px 60px`
- Кнопки на мобілці: горизонтально, **ліворуч** (`flex-start`, без justify-content override)
- Кнопка "До колекцій": `btn-secondary` з `hgi-arrow-right-01` праворуч від тексту

### Stats (блок з цифрами)
- Фон секції: `var(--cream)` (не зелений!)
- Картки: `background: var(--sand)`
- Числа: `color: var(--black)` (чорний, не зелений)
- Лейбл: `color: var(--black)`
- Підпис: `color: var(--gray-500)`
- Відступи: `padding: 80px 48px` (десктоп), `padding: 80px 24px` (мобілка) — рівні

### Ticker (бігучий рядок)
- `padding: 14px 28px; font-size: 15px` — такий самий розмір, як кнопки

### Bestsellers (картки товарів)
- Десктоп: 4 колонки, `product-img { aspect-ratio: 1/1 }`
- Мобілка: 1 колонка, `aspect-ratio: 1/1`
- Ціна: `font-size: 20px; font-weight: 900; color: var(--green-800)`
- Кнопка: `.btn-add { padding: 14px 28px; font-size: 15px }`
- Серце: `44×44px; font-size: 20px`

### Ritual (Чай як ритуал)
- Десктоп: hover-ефект — фото ховається, з'являється зелений контент
- Мобілка: статичний layout — фото зверху (`aspect-ratio: 1/1`), контент під ним, картка `background: var(--sand)`, текст темний (`var(--black)`)
- На мобілці `transition: none` щоб прибрати hover-анімацію
- Іконка на картці: `hgi-leaf-01` (не `hgi-tea-cup` — такого іконки немає)

### Testimonials (відгуки)
- Фон: `var(--cream)` (не зелений!)
- Без заголовка (`h2` відсутній)
- Без аватар-стеку
- Просто marquee-стрічка з картками відгуків
- Аватарки різних кольорів через inline `style="background: ..."` на кожній картці

---

## sol-shop.html — специфіка

### Фільтри — два рівні
1. **Dropdown** `.cat-dropdown` — вибір секції (Чай / Посуд / Дошки / Аксесуари)
2. **Пілюлі** `.filter-pill` — підфільтри в рядку після dropdown

### Мобільний filter-bar (два рядки)
```
Рядок 1: [Dropdown: Чай ▼]  [Сортування ⊟]
Рядок 2: [Всі] [Улун] [Пуер] [Да Хун Пао] ...
```
CSS: `order: 1` для dropdown, `order: 2` для sort-btn, `order: 3; width: 100%` для filter-pills.

### Пагінація
Реальна, функціональна. `ITEMS_PER_PAGE = 8`. Функція `goToPage(page)`.
`flex-wrap: nowrap` + `flex-shrink: 0` на `.page-btn` — не деформується.
`goToPage()` НЕ скролить до верху — просто рендерить нову сторінку.

### Single-select фільтри
Клік на пілюлю встановлює один активний фільтр. Мультивибору немає.

### Анімація карток
Через `requestAnimationFrame` — НЕ через CSS animation-delay.
Причина: CSS `translate` ненадійна в Safari, використовується `transform: translateY`.

### z-index стек
- `.filter-bar`: z-index 100
- `.cat-dropdown`, `.cat-menu`: z-index 200
- `.products-grid`: z-index 1
- Панелі (profile, mobile menu): z-index 201

### Дані товарів
Зберігаються в JS об'єкті `SECTIONS` всередині файлу.
Структура кожного товару: `{ name, cat, region, desc, price, bg, badge }`
Секції: `tea`, `teaware`, `boards`, `accessories`

Поточний контент (чай):
- Улун: 6 позицій
- Пуер: 6 позицій
- Сезонне: 2 позиції
- Набори: 2 позиції

---

## Що не реалізовано (не чіпати)

- **Email підписка** — поле є у футері, відповідь після сабміту не реалізована
- **Wishlist панель** — серця на картках є, але окрема slide-in панель не зроблена (планується)
- **Кнопки навігації** — "До колекцій", "Переглянути всі", "Переглянути" без `href` на `sol-shop.html`

---

## GitHub

- Репозиторій: https://github.com/yananaaas/sol-tea
- GitHub Pages: https://yananaaas.github.io/sol-tea/
- Деплой автоматичний через ~1 хв після push
- Команда: `git add sol-tea.html sol-shop.html && git commit -m "опис" && git push`

---

## Що не чіпати без потреби

- SVG paths логотипу (складна геометрія, 3 path)
- Назви JS функцій з таблиць вище
- sessionStorage ключ `'solCart'`
- CDN посилання (Google Fonts, HugeIcons)

---

## Правило
Після виконання кожного таску — автоматично прибирати його з черги в цьому файлі (без нагадування).

---

## Наступні таски (черга)

1. **Кнопка Кошика + хедер** — зробити дії з кнопкою Кошика та відображення Кошика/Вподобаного у хедері
2. **Фото в картках товарів** — зробити область фото дещо меншою (не прям квадратною)
5. **FAQ у хедері** — розділ Запитання → чат з підтримкою
7. **Блоки фото+текст на головній** — вирівняти контейнери 1:1
9. **Сторінка продукту** `sol-product.html` — розпочати після всіх виправлень вище

---

## Наступні сторінки

- `sol-product.html` — картка товару: фото, назва, регіон, ціна, вибір граму, кнопка в кошик
- `sol-cart.html` — кошик: список з sessionStorage, кількість, ціни, кнопка оформити
- `sol-checkout.html` — форма: ім'я, Нова Пошта, email, телефон, оплата

### Пізніше
- Додати wishlist панель (slide-in як профіль) з іконкою серця в nav
- Підключити реальні зображення з папки `/images/`
- Email підписка — показувати повідомлення після сабміту
