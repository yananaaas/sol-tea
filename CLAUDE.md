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
| `.btn-leave-review` | — | — | — |

`.btn-leave-review` — підклас для кнопки "Залишити відгук" в sol-product.html. Розширює `.btn-outline-dark`. Десктоп: `margin-left: auto` (права сторона хедера відгуків). Мобілка: `margin-left: 0` (новий рядок).

> **Увага:** `.btn-outline-dark` визначений лише в `sol-product.html`. В `sol-tea.html` і `sol-shop.html` його немає.

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
| `sol-product.html` | ✅ Готова | Сторінка товару (динамічна, ?name=...) |
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
- `sol-tea.html` → логотип → `sol-tea.html` ✅
- `sol-tea.html` → "Всі товари" (Хіти продажів) → `sol-shop.html` ✅
- `sol-tea.html` → FAQ іконка → `sol-faq.html` ✅ (сторінки ще немає)
- `sol-shop.html` → nav "Про нас" → `sol-tea.html` ✅
- `sol-shop.html` → логотип → `sol-tea.html` ✅
- `sol-shop.html` → FAQ іконка → `sol-faq.html` ✅ (сторінки ще немає)
- Кнопки "До колекцій", "Переглянути всі", "Переглянути" — ще не мають `href`

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
- Команда: `git add sol-tea.html sol-shop.html sol-product.html CLAUDE.md && git commit -m "опис" && git push`

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

## Наступні таски (черга)

1. **FAQ сторінка** `sol-faq.html` — Часті запитання (кнопка в хедері вже веде туди)

---

## Наступні сторінки

- `sol-cart.html` — кошик: список з sessionStorage, кількість, ціни, кнопка оформити
- `sol-checkout.html` — форма: ім'я, Нова Пошта, email, телефон, оплата

### Пізніше
- Додати wishlist панель (slide-in як профіль) з іконкою серця в nav
- Підключити реальні зображення з папки `/images/`
- Email підписка — показувати повідомлення після сабміту
