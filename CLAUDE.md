# Söl Tea — CLAUDE.md

Концептуальний портфоліо e-commerce магазин нішових китайських чаїв.
Автор: Яна Лізгова (UX/UI, Design Engineer).
Стиль: мінімалістично-круто, editorial, без пафосу.

> **Еталон дизайн системи:** `sol-design-system.html` — живий документ із компонентами, кольорами, spacing і правилами. Будь-які нові компоненти або зміни — перевіряти і узгоджувати з ним. GitHub Pages: https://yananaaas.github.io/sol-tea/sol-design-system.html

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
| `.btn-leave-review` | — | — | — |

`.btn-leave-review` — підклас для кнопки "Залишити відгук" в sol-product.html. Розширює `.btn-outline-dark`. Десктоп: `margin-left: auto` (права сторона хедера відгуків). Мобілка: `margin-left: 0` (новий рядок).

> **Увага:** `.btn-outline-dark` визначений лише в `sol-product.html`. В `sol-tea.html` і `sol-shop.html` його немає.

Стрілки в кнопках: `translateX(3px)` → `translateX(7px)` на hover.
`.btn-secondary i { transform: translateX(3px); margin-right: -4px; }` — для arrow-right-01.

### Кнопки-іконки
Два типи, обидва круглі, без border:
- **`.nav-icon-btn`** — навігація в хедері. `44×44px`, `font-size: 22px`, `position: relative` (для індикатора). Hover: `background: var(--sand)` в `@media (hover: hover)`.
- **`.gallery-arrow`** — стрілки слайдера на сторінці товару. `40×40px`, `font-size: 20px`, `background: rgba(253,252,249,0.88)`. `position: absolute; top: 50%; transform: translateY(-50%); z-index: 3`. Disabled: `opacity: 0.3`. `.gallery-arrow-prev { left: 12px }`, `.gallery-arrow-next { right: 12px }`.

### Indicator (nav badge)
Кружечок-індикатор кількості поверх `.nav-icon-btn`. `position: absolute; top: 2px; right: 2px; min-width: 17px; height: 17px; border-radius: 20px; font-family: Inter; font-size: 10px; font-weight: 700`.
- `.cart-badge` / `.wish-badge` — класи для кошика і вподобаних
- Кошик: `background: var(--green-800)`, вподобані: `background: var(--terra)`
- При 0 елементах — badge не показується (видаляється з DOM)

### Counter (qty selector)
Контрол вибору кількості в кошику і чекауті.
```css
.qty-ctrl { background: var(--sand); border-radius: 40px; padding: 4px; gap: 2px; }
.qty-btn  { width: 32px; height: 32px; border-radius: 50%; font-size: 16px; }
.qty-num  { min-width: 28px; font-family: Inter; font-size: 14px; font-weight: 700; }
```
Мінімум 1 — кнопка «–» `disabled` при `qty === 1`. Hover кнопок в `@media (hover: hover)`.

### Pagination
```css
.pagination { display: flex; align-items: center; gap: 6px; flex-wrap: nowrap; }
.page-btn   { width: 40px; height: 40px; flex-shrink: 0; border-radius: 50%; background: var(--sand); font-size: 14px; }
.page-btn.active { background: var(--green-800); color: var(--cream-bright); }
.page-btn:disabled { opacity: 0.4; cursor: default; }
.page-dots  { color: var(--gray-300); width: 32px; text-align: center; letter-spacing: 2px; }
```
Рендериться динамічно через JS. Завжди показує: 1, last, current, current±1. Крапки де є пропуск > 1. Стрілки ← → по краях.

### Правила дизайну
- Без дівайдерів — тільки блочна структура
- border-radius карток: `20–24px`
- Чергування блоків: cream → green-800 → cream → green-800
- **Hover ефекти** — загортати в `@media (hover: hover)` скрізь де є зміна кольору/фону на інтерактивних елементах. Інакше iOS застряє у hover-стані після тапу.
- **Без border на inputs** — інпути відрізняються від фону кольором (`background: var(--cream-bright)` на `var(--cream)` фоні). Focus через `background: var(--sand)`, без border. Помилка через `background: rgba(232,74,46,0.1)`, без border. Ніякого `outline` і `box-shadow`.
- **Без uppercase в лейблах** — текст лейблів форм завжди sentence case. `font-size: 13px; font-weight: 500; color: var(--gray-500)`. `text-transform: uppercase` і `letter-spacing` на лейблах — не використовувати.

---

## Система відступів (стандарт сайту)

Виведена на основі sol-shop.html і застосована на всіх сторінках.

### Горизонтальні відступи
- Десктоп: `padding: 0 48px` або `padding: X 48px`
- Мобілка: `padding: 0 16px` або `padding: X 24px` (24px для контентних секцій, 16px для nav і sticky елементів)
- Максимальна ширина контенту: `max-width: 1280px; margin: 0 auto`

### Max-width cap (сайт)
- `html { background: var(--cream); overflow-x: hidden; }` — кремовий фон на бокових полях ширших екранів
- `body { max-width: 1440px; margin: 0 auto; }` — весь контент обмежений 1440px
- **Full-bleed секції** (footer, ticker, testimonials, зелені секції): `width: max(100%, 100vw); margin-left: min(0px, calc((1440px - 100vw) / 2));` — розтягуються на повний viewport
- **overflow-x: hidden** — обов'язково на `<html>`, **не** `<body>` (body не може мати overflow:hidden, бо full-bleed дочірні елементи використовують від'ємні margin)

### Вертикальні відступи — сторінки типу "каталог/список" (shop, faq)
```
Nav bottom → h1:        52px desktop / 24px mobile  (padding-top на header)
h1 → pills/filter bar:  24px  (padding-bottom на header)
Pills → контент:        36px desktop / 24px mobile  (padding-bottom на pill-bar, 0 top на секціях)
Між секціями:           36px desktop / 28px mobile  (padding-bottom на секції, padding-top: 0)
```

**Модель: gap завжди через `padding-bottom` попереднього елемента, наступний має `padding-top: 0`.**
Так само як shop: `filter-bar { padding-bottom: 36px }` + products без `padding-top`.

### Вертикальні відступи — "важкі" секції (sol-tea.html)
- Секції: `padding: 80px 48px` desktop, `padding: 60px–80px 24px` mobile

### h1 заголовки сторінок
- Розмір: `clamp(40px, 5vw, 64px)` Inter 900, `letter-spacing: -0.03em`, `line-height: 1`
- Мобілка: `clamp(28px, 8vw, 40px)`
- **Без анімації** — h1 з'являється миттєво без fade/slide. Клас `anim-h` і подібні не використовувати на h1.

### Пілюлі (filter-pill, anchor-pill)
- Десктоп: `padding: 9px 18px; font-size: 13px; font-weight: 500; border-radius: 40px`
- Мобілка: `padding: 12px 18px; font-size: 13px`
- Active: `background: var(--green-800); color: var(--cream-bright)`
- Hover: тільки в `@media (hover: hover)` — `background: var(--gray-100)`
- Іконка всередині пілюлі: `font-size: 16px`, gap: `7–8px`
- Іконка типу "сортування/дія": `font-size: 18px`, `gap: 8px` (як sort-btn в shop)

---

## Файли проекту

Всі файли в одній папці `~/Desktop/sol-tea/`. Посилання — просто назва файлу.

| Файл | Статус | Опис |
|------|--------|------|
| `sol-tea.html` | ✅ Готова | Головна сторінка |
| `sol-shop.html` | ✅ Готова | Магазин (каталог) |
| `index.html` | ✅ Готова | Редирект на sol-tea.html |
| `sol-product.html` | ✅ Готова | Сторінка товару (динамічна, ?name=...) |
| `sol-faq.html` | ✅ Готова | Часті запитання |
| `sol-cart.html` | ✅ Готова | Кошик (таби Кошик/Вподобане) |
| `sol-checkout.html` | ✅ Готова | Оформлення замовлення |
| `sol-about.html` | 🔲 Планується | Окрема сторінка "Про нас" (не дублює Головну) |
| `sol-design-system.html` | ✅ Готова | Документація дизайн системи з живими прикладами |

---

## Медіа та зображення

Всі зображення зараз — плейсхолдери (div з текстом "Фото").
Коли будуть готові файли — замінити на `<img src="images/назва.jpg" alt="...">`.
Папка для зображень: `/images/` (поряд з html-файлами).
**Не видаляти плейсхолдери** поки зображення не готові.

---

## Навігація між сторінками

- `sol-tea.html` → nav "Магазин" → `sol-shop.html` ✅
- `sol-tea.html` → логотип → `sol-tea.html` ✅
- `sol-tea.html` → "Всі товари" (Хіти продажів) → `sol-shop.html` ✅
- `sol-tea.html` → FAQ іконка → `sol-faq.html` ✅
- `sol-shop.html` → nav "Про нас" → `sol-tea.html` ✅
- `sol-shop.html` → логотип → `sol-tea.html` ✅
- `sol-shop.html` → FAQ іконка → `sol-faq.html` ✅
- `sol-faq.html` → "Написати нам" кнопка → `mailto:hello@sol-tea.com`
- Кнопки "До колекцій", "Переглянути всі", "Переглянути" — ще не мають `href`

---

## Структура nav (однакова на всіх сторінках)

### CSS структура nav
```css
/* nav — лише позиційний + фоновий контейнер, full viewport width */
nav { position: fixed; top: 0; left: 0; right: 0; z-index: 400; background: var(--cream); height: 80px; }
/* nav-inner — flex-контейнер з обмеженням 1440px, відступи як у решти сторінки */
.nav-inner { max-width: 1440px; margin: 0 auto; height: 100%; display: flex; align-items: center; gap: 32px; padding: 0 48px; }
/* mobile */
nav { height: 72px; }
.nav-inner { padding: 0 16px; gap: 4px; }
```
**Важливо:** nav-inner є обгорткою всіх дочірніх елементів nav у HTML (логотип, посилання, пошук, іконки, бургер). Це гарантує однаковий відступ хедера і контенту на будь-якій ширині viewport.

### Логотип nav
```css
.nav-logo { flex-shrink: 0; display: flex; align-items: center; }
.nav-logo a { display: flex; align-items: center; } /* для shop/product де структура div>a>svg */
.nav-logo svg { height: 42px; width: 41px; display: block; }
```
SVG логотипу **не має** inline атрибутів `width`/`height` — тільки `viewBox="0 0 242 249"`. CSS є єдиним джерелом розмірів (Safari при масштабуванні може пріоритизувати HTML-атрибути над CSS).

### Іконки nav та badge
- `.nav-icon-btn`: `44×44px; font-size: 22px; position: relative` (десктоп і мобілка однаково)
- `.cart-badge, .wish-badge`: `top: 2px; right: 2px; min-width: 17px; height: 17px; font-size: 10px; font-weight: 700`
- `font-size: 10px` — мінімум для стабільного рендерингу Safari при масштабуванні

### Фіксовані панелі (profile-panel, mobile-menu)
Позиціонуються відносно viewport, але вирівняні з body:
```css
right: max(16px, calc((100vw - 1440px) / 2 + 16px))
```

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
- FAQ іконка (`nav-faq`) прихована на мобілці — замість неї пункт у бургер-меню
- Активна сторінка в бургер-меню: клас `active` на відповідному `.mm-item`

### Search overlay (десктоп) / inline (мобілка)
- **Десктоп**: клік на поле пошуку відкриває `.search-overlay` під nav
- **Мобілка**: клік на іконку пошуку додає клас `search-active` до `<nav>`:
  - `.nav-right` і `.burger-btn` ховаються
  - `.nav-search-inline` показується (`display: flex`) — поле прямо в nav
  - `.search-overlay { display: none !important }` — overlay на мобілці вимкнений
- `font-size: 16px` на input — запобігає iOS Safari zoom
- `.focus()` викликається **синхронно** (без `setTimeout`) — інакше iOS не відкриває клавіатуру
- При активному пошуку `margin-left: 12px` між логотипом і інпутом (рівний відступу сторінки)

---

## JS функції — не перейменовувати

### sol-tea.html
| Функція | Що робить |
|---------|-----------|
| `toggleProfile()` | dropdown панель профілю |
| `toggleMobileMenu()` | dropdown бургер-меню |
| `openSearch()` | десктоп: відкриває `.search-overlay`; мобілка: `nav.search-active` |
| `closeSearch()` | закриває обидва, скидає фільтр |
| `filterProducts(q)` | ховає/показує `.product-card` по запиту |
| `addToCart(name, btn)` | toggle: додає/прибирає з кошика, оновлює badge і стан кнопки |
| `setCartBtnState(btn, inCart)` | оновлює вигляд кнопки кошика (зелена / чорна) |
| `updateCartBadge()` | синхронізує badge кошика в nav |
| `updateWishBadge()` | синхронізує badge вподобаних в nav |
| `solToggleWish(event, btn, id)` | toggle wishlist для карток Хітів продажів: пише в solWish, оновлює badge, toggles .liked |
| `initCartBtns()` | при завантаженні відновлює стан кнопок з sessionStorage |
| `getCart()` | читає solCart з sessionStorage |
| `saveCart(c)` | зберігає solCart у sessionStorage |

### sol-shop.html
| Функція | Що робить |
|---------|-----------|
| `toggleProfile()` | dropdown панель профілю |
| `toggleMobileMenu()` | dropdown бургер-меню |
| `addToCart(name, btn)` | toggle: додає/прибирає з кошика, оновлює badge і стан кнопки |
| `setCartBtnState(btn, inCart)` | оновлює вигляд кнопки кошика |
| `updateCartBadge()` | синхронізує badge кошика |
| `updateWishBadge()` | синхронізує badge вподобаних |
| `goToCart()` | переходить на sol-cart.html |
| `toggleWish(el, name)` | wishlist toggle — колір terra + запис у solWish |
| `renderFilters()` | рендерить пілюлі підфільтрів |
| `renderCards()` | рендерить картки + пагінація + searchQuery фільтр |
| `toggleCatDropdown()` | відкриває/закриває dropdown категорій |
| `selectCategory(el)` | вибір категорії з dropdown |
| `filterSwitch(el)` | single-select підфільтр |
| `goToPage(page)` | пагінація (без scroll-to-top) |
| `openMobileSearch()` | десктоп: `.mobile-search-overlay`; мобілка: `nav.search-active` |
| `closeMobileSearch()` | закриває обидва, скидає searchQuery |
| `onSearchInput(value)` | оновлює searchQuery → renderCards() |
| `getCart()` | читає solCart з sessionStorage |
| `saveCart(c)` | зберігає solCart у sessionStorage |

### sol-faq.html
| Функція | Що робить |
|---------|-----------|
| `toggleProfile()` | dropdown панель профілю |
| `toggleMobileMenu()` | dropdown бургер-меню |
| `openSearch()` | мобілка: `nav.search-active` |
| `toggleFaq(btn)` | toggle акордеону — клас `open` на `.faq-item` |
| `scrollToSection(id)` | smooth scroll до секції + активує пілюлю + lock 900ms |
| `setActivePill(id)` | знімає/ставить `.active` на anchor-pill |
| `updateCartBadge()` | синхронізує badge кошика |
| `updateWishBadge()` | синхронізує badge вподобаних |
| `getCart()` | читає solCart з sessionStorage |

### sessionStorage
| Ключ | Формат | Опис |
|------|--------|------|
| `'solCart'` | `[{ name: "Те Гуань Інь", qty: 1 }, ...]` | Кошик |
| `'solWish'` | `["teg", "shen", ...]` | Вподобані (короткі id для sol-tea.html, повні імена для sol-shop/product) |

---

## Поточний стан блоків — sol-tea.html

### Hero
- Десктоп: повна висота `calc(100vh - 80px - 32px)`, контент по центру зліва
- Мобілка: `calc(100svh - 72px - 16px)`, контент `bottom: 0; padding: 32px 28px 60px`
- Кнопки на мобілці: горизонтально, **ліворуч** (`flex-start`, без justify-content override)
- Кнопка "До колекцій": `btn-secondary` з `hgi-arrow-right-01` праворуч від тексту

### About (блоки фото + текст, 3 штуки)
- Секція після hero: "Чай — це не просто напій. Це момент.", "Прямо з джерела — до вашої чашки", "Упаковано з турботою, доставлено швидко"
- Десктоп: `grid-template-columns: 1fr 1fr; gap: 80px`, `.about-image { aspect-ratio: 1/1 }`
- Другий блок `.about-row.reverse`: на десктопі фото зліва (`.about-image { order: -1 }`), на мобілці скидається до `order: 0` (фото після тексту)
- **Мобілка**: `grid-template-columns: 1fr`, `.about-image { height: calc(100vw - 48px) }` — явна висота замість `aspect-ratio`, бо flex-контейнер без контенту ігнорує aspect-ratio

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
- Десктоп: 4 колонки, `gap: 40px`, `product-img { aspect-ratio: 4/3 }`
- Мобілка: 1 колонка, `gap: 24px`, override `aspect-ratio: 1/1`
- Картки: `display: flex; flex-direction: column` — рівна висота в ряду, footer завжди внизу
- Ціна: `font-size: 20px; font-weight: 900; color: var(--green-800)`
- Кнопка `.btn-add`: чорна → клік додає в кошик (зелена, "В кошику") → повторний клік прибирає
- `.btn-add` hover загорнутий у `@media (hover: hover)` — щоб iOS не застрягав на зеленому після тапу
- Серце: `44×44px; font-size: 20px`
- **Wishlist:** кнопки викликають `solToggleWish(event, this, 'id')` з короткими id: `'teg'`, `'shen'`, `'feng'`, `'shu'`
- `.product-wish:hover` загорнутий у `@media (hover: hover)` — щоб на iOS серце не залишалось теракотовим після тапу

### Ritual (Чай як ритуал)
- Десктоп: hover-ефект — фото ховається, з'являється зелений контент; `gap: 40px`
- Мобілка: статичний layout — фото зверху, контент під ним, картка `background: var(--sand)`, текст темний (`var(--black)`); `gap: 24px`
- На мобілці `transition: none` щоб прибрати hover-анімацію
- **Важливо:** `.ritual-card-photo` на мобілці: `width: 100%; height: calc(100vw - 48px)` — явна висота, бо flex-контейнер без контенту ігнорує `aspect-ratio`
- Іконка на картці: `hgi-leaf-01` (не `hgi-tea-cup` — такого іконки немає)

### Testimonials (відгуки)
- Фон: `var(--cream)` (не зелений!)
- Без заголовка (`h2` відсутній)
- Marquee-стрічка з картками відгуків, `gap: 40px`
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

## sol-faq.html — специфіка

### Структура сторінки
1. Nav (ідентична іншим сторінкам, `nav-faq` кнопка має клас `active`)
2. Hero: `h1` "Часті запитання" — **без анімації**
3. Anchor nav (sticky)
4. 4 FAQ-секції: Доставка, Оплата, Товари, Повернення
5. CTA-секція: кнопка "Написати нам"
6. Footer

### Anchor nav
```css
.anchor-nav { position: sticky; top: 80px/72px; z-index: 99; background: var(--cream);
              padding: 0 48px 36px; /* desktop */ / padding: 0 16px 24px; /* mobile */ }
```
- 5 пілюль: Доставка, Оплата, Товари, Повернення + "Написати нам" (остання)
- Активна пілюля підсвічується через `IntersectionObserver` з `pillLocked` механізмом (900ms після кліку)
- scroll-margin-top: `148px` desktop / `136px` mobile

### "Написати нам" пілюля (`.anchor-pill-cta`)
- Стиль як звичайна пілюля (sand фон), але з іконкою `hgi-message-01`
- Іконка: `font-size: 18px` (як sort-btn), `gap: 8px`
- Active стан: `background: var(--black)` (не зелений!)
- Hover: `@media (hover: hover)` тільки

### FAQ секції
```css
.faq-section { padding: 0 48px 36px; }          /* desktop */
.faq-section { padding: 0 24px 28px; }           /* mobile */
.faq-section-inner { max-width: 1280px; margin: 0 auto; }
.faq-section-header h2 { clamp(26px, 3vw, 38px) } /* desktop */
.faq-section-header h2 { font-size: 22px; }        /* mobile */
```
- **padding-top: 0** на секціях — gap дає `padding-bottom` anchor nav (36px/24px)

### Акордеон
- `.faq-item.open` — клас через `toggleFaq(btn)`
- Відповідь: `max-height: 0 → 400px`, `transition: 0.35s cubic-bezier`
- Іконка: `hgi-add-01`, при відкритті `rotate(45deg)`
- Питання: `padding: 28px` desktop / `22px` mobile, Inter 600 16px/15px
- Відповідь-inner: `padding: 0 28px 32px` / `0 22px 24px`

### CTA секція
```html
<section class="faq-section" id="faq-cta">
  <a href="mailto:hello@sol-tea.com" class="btn-primary">Написати нам →</a>
</section>
```
- `.btn-primary` в FAQ: `background: var(--black)`, hover → `var(--green-800)` (локальне визначення в файлі)

### Мобільний бургер
- Пункт FAQ має клас `active` в бургер-меню

---

## Що не реалізовано (не чіпати)

- **Email підписка** — поле є у футері, відповідь після сабміту не реалізована
- **Wishlist панель** — серця і badge є, але окрема slide-in панель не зроблена (планується)
- **Кнопки навігації** — "До колекцій", "Переглянути всі", "Переглянути" без `href`

## Профіль-панель (однакова на всіх сторінках)
- Фон: `var(--sand)` — як відкритий дропдаун
- Хедер (аватар + ім'я): `background: var(--cream-bright)`, `border-radius: 20px 20px 0 0`
- Ім'я: `var(--black)`, email: `var(--gray-500)`
- `.pp-avatar`: `44×44px` десктоп, `52×52px` мобілка (override у `@media (max-width: 768px)`)
- `.pp-item-icon`: `40×40px, font-size: 20px` десктоп; `44×44px, font-size: 22px` мобілка
- `.pp-item-icon` базово: `background: var(--sand)`, `color: var(--green-800)`
- `.pp-item:hover`: `background: var(--sand)`
- Аватар — плейсхолдер `hgi-user-circle` поки немає фото
- Індикатор кошика в nav: `background: var(--green-800)`, `font-weight: 500`
- Індикатор вподобаних в nav: `background: var(--terra)`, `font-weight: 500`

---

## GitHub

- Репозиторій: https://github.com/yananaaas/sol-tea
- GitHub Pages: https://yananaaas.github.io/sol-tea/
- Деплой автоматичний через ~1 хв після push
- Команда: `git add sol-tea.html sol-shop.html sol-product.html sol-faq.html sol-cart.html sol-checkout.html CLAUDE.md && git commit -m "опис" && git push origin HEAD:main`

---

## Що не чіпати без потреби

- SVG paths логотипу (складна геометрія, 3 path) — але `viewBox` і CSS розміри — окей
- SVG логотипу **не має** inline `width`/`height` атрибутів — не додавати
- Назви JS функцій з таблиць вище
- sessionStorage ключ `'solCart'`
- CDN посилання (Google Fonts, HugeIcons)

---

## Правило
Після виконання кожного таску — автоматично прибирати його з черги в цьому файлі (без нагадування).

---

## sol-product.html — специфіка

- URL: `sol-product.html?name=Те+Гуань+Інь`
- Дані товарів у JS масиві `PRODUCTS` (розширена версія SECTIONS з sol-shop.html)
- Кожен товар: `{name, cat, section, region, desc, longDesc, price, bg, badge, grams, brew, images, reviews}`
- `brew`: `{temp, time, amount, steeps}` — для чаїв; `null` для посуду/дошок/аксесуарів
- `grams`: масив `[50, 100, 200]` або `null` (для наборів і не-чаю)
- `images`: завжди `3` для всіх товарів
- `goToProduct(name)` — є в усіх трьох файлах (sol-tea, sol-shop, sol-product)
- Схожі товари: спочатку same `cat`, fallback — same `section`, max 4

### Галерея
- `.gallery-col > .gallery-sticky` — sticky-обгортка лише для gallery-viewport + gallery-nav
- `.gallery-viewport`: `position: relative; aspect-ratio: 4/3` (десктоп), `1/1` (мобілка)
- `.gallery-slide`: `position: absolute; inset: 0; opacity: 0` → `.active { opacity: 1 }`
- Стрілки `.gallery-arrow-prev/next` — абсолютно поверх viewport, `z-index: 3`
- Мініатюри `.gallery-thumb` — під viewport, `flex: 1; aspect-ratio: 1/1; gap: 24px`
- `.pi-region` і `.pi-wish` — JS-інжектяться всередину `vp.innerHTML` в `renderGallery()`
- Свайп на мобілці: `touchstart/touchend` → `changeSlide()` при delta > 40px
- `let currentSlide = 0` — глобальна змінна

### Блок "Як заварювати?"
- `.pi-brew` — всередині `.product-info`, після `.pi-bottom` (ціна + кошик)
- Заголовок `.pi-brew-title`: Inter 900, 22px (підзаголовок)
- Текст `.pi-brew-text`: "Нагрійте воду до X, засипте Y і заваріть протягом Z. Можна повторити N."
- Показується тільки якщо `p.brew != null`

### Відгуки
- Хедер `.reviews-header`: h2 + лічильник + кнопка `.btn-leave-review` (margin-left: auto)
- На мобілці `.btn-leave-review` переноситься на новий рядок (flex-wrap: wrap)
- Порожній стан: текст "Поки що немає відгуків. Будьте першим!"
- Кнопка "Залишити відгук" — завжди видима, незалежно від наявності відгуків

### Порядок секцій на сторінці
1. Hero (галерея + інфо з brew)
2. Схожі товари `.similar-section`
3. Відгуки `.reviews-section`
4. Footer

### Nav на sol-product.html
- FAQ кнопка має клас `nav-faq` → прихована на мобілці (`.nav-faq { display: none }`)
- `.nav-right { gap: 0 }` на мобілці — як на sol-tea.html і sol-shop.html
- Решта nav — ідентична sol-tea.html і sol-shop.html

### Мобільна специфіка sol-product.html
- `.product-hero { grid-template-columns: 1fr }` — **не** `display: flex`, звичайний 1-колонковий грід
- `.gallery-sticky { position: static }` — знімаємо sticky на мобілці
- `.gallery-viewport { aspect-ratio: 1/1 }` — квадрат на мобілці
- `.product-info { padding-top: 24px }` — відступ між галереєю і назвою товару
- `.product-breadcrumb { font-size: 15px; font-weight: 500 }` — як `.mm-item-title` (пункти бургер-меню)
- `.similar-grid { gap: 24px }` — як на сторінці Магазин
- `.reviews-section`, `.similar-section { padding: 40px 16px }`
- `.reviews-header { flex-wrap: wrap }` + `.btn-leave-review { margin-left: 0 }` — кнопка на новому рядку

### Десктопна специфіка sol-product.html
- `.product-hero { grid-template-columns: 55fr 45fr; column-gap: 64px; padding-bottom: 60px }`
- `.gallery-col` — перша колонка (55fr); всередині: `.gallery-sticky` (sticky top:100px) + `.pi-brew`
- `.gallery-nav { gap: 24px }` — мініатюри з великим відступом
- `.gallery-thumb { border-radius: 20px }` — консистентно з картками
- `.similar-section`, `.reviews-section { padding: 60px 48px }`
- `@media (min-width: 769px) and (max-width: 1100px)` — similar-grid 3 колонки

### JS функції — sol-product.html
| Функція | Що робить |
|---------|-----------|
| `renderProduct(p)` | рендерить всю сторінку по об'єкту продукту |
| `renderGallery(p)` | вставляє слайди + region + wish + стрілки в vp.innerHTML |
| `goToSlide(i)` | перемикає активний слайд, синхронізує thumbs і стрілки |
| `changeSlide(dir)` | +1/-1 від currentSlide |
| `renderGrams(p)` | рендерить пілюлі вибору грамів |
| `selectGram(btn, g)` | active-стан пілюлі |
| `renderBrew(brew)` | заповнює `.pi-brew-text` текстом інструкції |
| `renderReviews(reviews)` | рендерить карток відгуків або порожній стан |
| `renderSimilar(p)` | схожі товари (same cat → same section → max 4) |
| `toggleProductCart()` | toggle кошика для поточного товару |
| `toggleProductWish()` | toggle wishlist для поточного товару |
| `adjustBg(hex, amount)` | світліше/темніше фон для слайдів 2 і 3 |
| `goToProduct(name)` | `window.location.href` з name param |

---

## sol-cart.html — специфіка

### Структура сторінки
1. Nav (ідентична іншим, кнопка кошика має клас `active`)
2. Hero: `h1` "Кошик" — без анімації
3. Tab bar (sticky, top: 80px/72px): таби Кошик / Вподобане
4. `#cartPane` або `#wishPane` — залежно від активного таба
5. Footer

### Tab bar
```css
.tab-bar { position: sticky; top: 80px; z-index: 99; background: var(--cream); padding: 0 48px 36px; }
.tab-pill.active { background: var(--green-800); color: var(--cream-bright); }
.tab-count { color: var(--green-800); } /* cart */
.tab-count.wish-count { color: var(--terra); } /* wish */
.tab-pill.active .tab-count { color: var(--cream-bright); } /* обидва активні */
```
- URL `?tab=wish` → відкривається одразу вкладка Вподобане
- Числа в пілюлях — просто текст, не badge-кружечок

### Кошик (cart pane)
- Layout: `grid-template-columns: 1fr 380px; gap: 48px` (десктоп) → `1fr` на мобілці
- При порожньому кошику: `cart-empty-layout` клас → `grid-template-columns: 1fr !important`, по центру
- Елемент товару: `.cart-item-top` (назва + X кнопка) + `.cart-item-controls` (qty + ціна)
- X кнопка (`.cart-item-remove`) — у верхній частині поряд з назвою, **не** в рядку з qty
- Qty контрол: sand background, rounded 40px, minus/plus кнопки по 32px
- Summary: `position: sticky; top: 168px` (враховує nav + tab-bar)
- Прогрес-бар до безкоштовної доставки: threshold `1000 ₴`
- `.summary-value.free`: `display: inline-flex; align-items: center; gap: 6px` — галочка вирівняна

### Вподобане (wish pane)
- Картки — точна копія компонента з sol-shop.html (`.product-card`, `.product-img`, `.product-wish`, `.product-badge`, `.product-body`, `.product-footer`, `.btn-add`)
- Grid: 4 колонки → 3 (1100px) → 2 (768px) → 1 (480px)
- Анімація: double rAF → `.show` клас
- Серце `.product-wish.liked` — завжди `color: var(--terra)` (вже в вподобаних)
- Кнопка "В кошику" → `toggleWishCart(name, btn)` — додає/прибирає з кошика без видалення з wishlist

### Пошук
- Повноекранна панель `.search-panel` — як на sol-tea.html
- Desktop: `oninput` на `#desktopSearchInput` → `onDesktopSearchInput()` → `filterProducts(q)`
- Mobile: `openSearch()` → `nav.search-active` → `#navSearchInput` → `filterProducts(q)`
- `filterProducts(q)` шукає по масиву PRODUCTS (38 позицій), показує картки в панелі
- Підсвічування тексту: `<mark style="background:var(--green-500)...">`
- Кнопка "В кошику" прямо в результатах → `toggleSearchCart(name, btn)`

### Дані
- Масив `PRODUCTS` (38 позицій) — `{name, price, bg, badge, region, desc}`
- `PRODUCT_MAP` — lookup по name
- `WISH_ID_MAP` — маппінг коротких id з sol-tea.html: `{teg, shen, feng, shu}` → повне ім'я

### JS функції — sol-cart.html
| Функція | Що робить |
|---------|-----------|
| `switchTab(tab)` | перемикає таби cart/wish, рендерить контент |
| `renderCart()` | рендерить список товарів або empty-state |
| `renderWishlist()` | рендерить картки вподобаного або empty-state |
| `changeQty(name, delta)` | ±1 кількість товару в кошику |
| `removeFromCart(name)` | видаляє товар з кошика |
| `toggleWishCart(name, btn)` | додає/прибирає wishlist-товар з кошика |
| `removeFromWish(id)` | видаляє з wishlist |
| `toggleSearchCart(name, btn)` | toggle кошика з панелі пошуку |
| `filterProducts(q)` | пошук по PRODUCTS, показує `.search-panel` |
| `onDesktopSearchInput(val)` | desktop input → filterProducts + clear btn |
| `clearDesktopSearch()` | скидає десктоп-пошук |
| `openSearch()` | мобілка: `nav.search-active`; десктоп: фокус |
| `closeSearch()` | закриває пошук, скидає обидва inputs |
| `toggleProfile()` | dropdown панель профілю |
| `toggleMobileMenu()` | dropdown бургер-меню |
| `updateCartBadge()` | синхронізує badge кошика |
| `updateWishBadge()` | синхронізує badge вподобаних |
| `updateCartTabCount()` | оновлює цифру в пілюлі Кошика |
| `updateWishTabCount()` | оновлює цифру в пілюлі Вподобаного |
| `getCart()` / `saveCart(c)` | читає/зберігає solCart |
| `getWish()` / `saveWish(w)` | читає/зберігає solWish |
| `goToProduct(name)` | перехід на sol-product.html?name=... |

---

## sol-checkout.html — специфіка

### Структура сторінки
1. Nav (ідентична іншим)
2. `.checkout-layout` — двоколонковий грід (55fr / 45fr, десктоп), 1 колонка (мобілка)
3. Ліва колонка `.checkout-left`: breadcrumb "← Кошик" + 3 секції
4. Права колонка `.checkout-right`: sticky `.co-summary` (Замовлення)
5. `#checkoutSuccess` — екран після оформлення (прихований до сабміту)
6. Footer

### Breadcrumb
- `← Кошик` — посилання на `sol-cart.html`, стиль як `.product-breadcrumb` на sol-product.html
- Відступи: `padding: 32px 0 28px` desktop / `20px 0 16px` mobile

### Секції форми
1. **Інформація про доставку** — Ім'я, Email, Телефон
2. **Доставка** — вибір способу (НП відділення / НП кур'єр / Укрпошта) + поле Міста + поле Відділення з dropdown
3. **Спосіб оплати** — Карткою онлайн (LiqPay) / При отриманні

### Delivery dropdown
- Відкривається при фокусі на полі Відділення
- Закривається при кліку поза `.branch-wrap`
- Mock-дані: 10 НП відділень/поштоматів, 5 Укрпошта
- `DELIVERY_META` — об'єкт з hint текстом, лейблом і плейсхолдером для кожного типу
- При зміні типу доставки: оновлюється hint, лейбл поля, плейсхолдер, очищається значення

### Логотипи доставки (inline img)
- Розмір: `28×28px; border-radius: 6px; object-fit: contain`
- НП: `images/logo-np.jpg`
- Укрпошта: `images/logo-ukrposhta.webp`

### Payment pills (.pay-pill)
- Розмір: `28×28px; border-radius: 6px` desktop / `24×24px` mobile
- Фон: `#F2F0ED` (всі однаковий)
- `object-fit: contain; padding: 2px` (базово)
- Apple Pay: `object-fit: cover; padding: 3px`
- Privat24: `padding: 4px`
- Файли: `images/logo-visa.png`, `logo-mastercard.png`, `logo-applepay.png`, `logo-gpay.png`, `logo-privat24.png`

### Summary (права колонка)
- `position: sticky; top: 168px` (враховує nav + відступ)
- `.co-summary-title` "Замовлення": `clamp(26px, 3vw, 38px)` — як `.co-section-title`
- `.co-item-img`: `88×88px; border-radius: 16px` desktop / `72×72px; border-radius: 14px` mobile
- Placeholder "ФОТО": `font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--gray-300)`
- Безкоштовна доставка з `1000 ₴` — checkmark `hgi-checkmark-circle-02`

### Валідація форми
- `submitOrder()` перевіряє поля: `fieldName`, `fieldEmail`, `fieldPhone`, `fieldCity`, `fieldBranch`
- Помилка: `background: rgba(232,74,46,0.1)` на інпуті (без border)
- Успіх: ховає `#checkoutMain`, показує `#checkoutSuccess` з номером замовлення

### JS функції — sol-checkout.html
| Функція | Що робить |
|---------|-----------|
| `selectDelivery(type, el)` | вибір способу доставки, оновлює hint/лейбл/placeholder |
| `selectPayment(type, el)` | вибір способу оплати |
| `openBranchDropdown()` | відкриває dropdown відділень |
| `closeBranchDropdown()` | закриває dropdown |
| `onBranchInput(val)` | фільтрує список відділень |
| `renderBranchDropdown(query)` | рендерить пункти dropdown |
| `selectBranch(val)` | заповнює поле і закриває dropdown |
| `updateSummaryRows()` | перераховує підсумок, доставку, суму |
| `submitOrder()` | валідація + перехід до success-екрану |
| `clearError(inp)` | знімає стан помилки з інпута |
| `updateCartBadge()` / `updateWishBadge()` | синхронізують badges |
| `getCart()` / `saveCart(c)` | читають/зберігають solCart |
| `goToProduct(name)` | перехід на sol-product.html?name=... |

---

## Архітектура і адмін-панель (план)

### Рішення
- **База даних:** Supabase — REST API, вбудована автентифікація, безкоштовний tier
- **Адмін-панель:** власна `sol-admin.html` у стилі Söl Tea

### Схема
```
Supabase (БД)
    ↑ пише                  ↓ читає
sol-admin.html         sol-shop, sol-product, sol-tea
(захищена логіном)     (публічні сторінки)
```

### Таблиці Supabase
| Таблиця | Що зберігає |
|---------|-------------|
| `products` | name, cat, section, region, desc, longDesc, price, bg, badge, grams, brew |
| `orders` | customer_name, email, phone, delivery_type, city, branch, payment, total, status |
| `subscriptions` | email, created_at |
| `reviews` | product_name, author, rating, text, status (pending / published) |

### Адмін-панель — екрани
- Логін (Supabase Auth, email + пароль)
- Каталог: список товарів + додати / редагувати / видалити
- Замовлення: таблиця зі статусами (нове / в обробці / виконано)
- Відгуки: модерація (опублікувати / відхилити)
- Підписки: список emails

### Фази реалізації
1. Supabase: створити проект, таблиці, мігрувати товари з JS-масивів
2. Сайт читає товари з Supabase (замість хардкод масиву)
3. `sol-admin.html` — CRUD каталогу + перегляд замовлень / відгуків
4. Форми на сайті → пишуть у Supabase (checkout → orders, футер → subscriptions, відгук → reviews)

---

## Наступні таски (черга)

### Пріоритет 1 — Компоненти (окремий чат)
- **Web Components для всіх компонентів** — кожен компонент → окремий JS-файл у папці `components/`, підключається як кастомний елемент на всіх відповідних сторінках.
- **Джерело правди для кожного компонента** — Яна вказує перед початком роботи над кожним окремим компонентом. Не починати без її підтвердження.
- Самі зміни в DS — не робити, це окремий таск пізніше.

### Принцип роботи над компонентом
1. **Створення локально** — спочатку файл у `components/<name>.js` за еталоном (CSS + розмітка з джерела правди). Сам файл-еталон НЕ редагувати — це джерело, а не місце для змін.
2. **Чекати апрув компонента** — Яна підтверджує що компонент готовий, перед інтеграцією.
3. **Інтеграція по черзі** — додавати на сторінки одну за одною (першою — джерело правди), кожен крок — апрув Яни.
4. **Push в main одразу після апруву** — без додаткового питання, всі правки разом одним коміт-повідомленням, GitHub Pages підхоплює сам.
5. **Оновити чергу** — позначити компонент ✅ Готово в цьому файлі.

**Готово:**
- ✅ `components/sol-nav.js` — `<sol-nav active="...">` — хедер/навігація
- ✅ `components/sol-footer.js` — `<sol-footer>` — футер
- ✅ `components/sol-search.js` — `<sol-search variant="...">` — інпут пошуку (вбудований у sol-nav)
- ✅ `components/sol-product-card.js` — `<sol-product-card>` — картка товару (інтегрована на всіх сторінках: sol-shop, sol-tea, sol-product, sol-cart, sol-faq, sol-checkout)
- ✅ `components/sol-review-card.js` — `<sol-review-card>` — картка відгуку (інтегрована на sol-product через `renderReviews`, на sol-tea з `variant="marquee"` для бігучого рядка)
- ✅ `components/sol-counter.js` — `<sol-counter value="..." min="1" max="...">` — qty selector (інтегрований на sol-cart, еміт `change` з `detail: { value, delta }`)
- ✅ `components/sol-faq-item.js` — `<sol-faq-item question="..." answer="...">` — акордеон запитань (інтегрований на sol-faq, 14 елементів у 4 секціях)
- ✅ `components/sol-pagination.js` — `<sol-pagination current="..." total="...">` — пагінація (інтегрована на sol-shop, еміт `page-change` з `detail: { page }`)

**Залишилось:** немає, всі 8 компонентів готові і перенесені в DS.

### Перенесення компонентів у sol-design-system.html ✅ Готово
Усі 8 компонентів живуть у DS як справжні `<sol-*>` теги:
- nav / footer / search / product-card / review-card — у iframe (бо потребують повного document context).
- counter / faq-item / pagination — інлайн у DS scope (атомарні).
- Кожна секція має: пояснювальний параграф з жирними ключовими термінами, метадані з `<strong>` лейблами, source-блок з підсвіткою через регекс-хайлайтер.
- 12 правил у Guidelines (додано Web Components і Sessionstorage).

### Пріоритет 2 — Сторінки (окремий чат)
- **sol-about.html** — «Про нас»: команда, цінності, процес відбору чаю, джерела. Не дублює Головну. Той самий editorial стиль.
- **Редизайн Головної** — ревізія і часткова редизайн sol-tea.html: що прибрати, що підсилити.

### Пріоритет 3 — Мануальне тестування (окремий чат)
- **Функціональне тестування всіх сторінок** — після about і редизайну Головної, десктоп і мобайл: перевірити кожну інтерактивну дію (кошик, вподобані, пошук, фільтри, пагінація, акордеон, форми, навігація). Фіксувати і одразу виправляти баги.

### Пріоритет 4 — Код і архітектура — сайт (окремий чат)
- **Code review сайту** — після мануального тестування, до адмінки
- **Email підписка** — повідомлення після сабміту у футері

### Пріоритет 5 — Адмін-панель (окремий чат)
- **`sol-admin.html`** — спочатку без бекенду (mock-дані / localStorage):
  - Екран каталогу: список товарів, додати / редагувати / видалити
  - Форма товару: всі поля (назва, ціна, опис, категорія, регіон, граматура, brew тощо)
  - Екран замовлень: таблиця зі статусами (нове / в обробці / виконано)
  - Екран відгуків: модерація (опублікувати / відхилити)
  - Стиль: той самий Söl Tea дизайн, editorial, мінімалістично

### Пріоритет 6 — Код і архітектура — адмінка (окремий чат)
- **Code review адмінки** — окреме ревʼю після готової sol-admin.html

### Пріоритет 7 — Медіа (окремий чат)
- **Підготувати зображення** — фото продуктів, hero, about
- **Підключити `/images/`** — замінити всі placeholder-div на `<img>` теги скрізь
- **Нормалізувати логотипи** — PNG доставки/оплат: Figma → 100×100px, 10% відступ з кожної сторони

### Пріоритет 8 — База даних (окремий чат)
Підключити Supabase після готової адмінки:
- Таблиці: `products`, `orders`, `subscriptions`, `reviews`
- Сайт читає товари з Supabase (замість JS-масиву)
- Форми → Supabase: checkout → `orders`, футер → `subscriptions`, відгук → `reviews`
- Адмінка → Supabase Auth + повноцінний CRUD

### Пріоритет 9 — Кейс (окремий чат)
- **A/B варіації** — задокументувати варіанти для кейсу, пояснити рішення
- **Кейс-стаді** — стаття про проект: процес, рішення, результат. Для портфоліо і Medium/Behance

> Оновлення `sol-design-system.html` — окрема черга, після завершення поточної.
