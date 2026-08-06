import {
  ArrowRight,
  CalendarDays,
  Check,
  ChevronDown,
  Clock3,
  Globe2,
  Heart,
  Hotel,
  MapPin,
  Menu,
  MessageCircle,
  Moon,
  Phone,
  Plane,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Star,
  Sun,
  Users,
  Utensils,
  X,
} from "lucide-react";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
} from "react";

type Language = "ru" | "en";
type Theme = "light" | "dark";
type SortMode = "recommended" | "priceAsc" | "priceDesc" | "rating";

type Tour = {
  id: number;
  countryRu: string;
  countryEn: string;
  cityRu: string;
  cityEn: string;
  hotel: string;
  image: string;
  departureCity: string;
  departureDate: string;
  nights: number;
  stars: number;
  rating: number;
  reviews: number;
  mealRu: string;
  mealEn: string;
  price: number;
  oldPrice?: number;
  badgeRu?: string;
  badgeEn?: string;
  featuresRu: string[];
  featuresEn: string[];
};

type SearchState = {
  departureCity: string;
  country: string;
  date: string;
  nights: string;
  adults: number;
  children: number;
  budget: number;
};

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=2200&q=88";

const CONTACTS = {
  phone: "+7 777 000 00 00",
  whatsapp: "https://wa.me/77770000000",
  instagram: "https://instagram.com/",
  email: "hello@dayanatravel.kz",
};

const DEPARTURE_CITIES = [
  "Алматы",
  "Астана",
  "Петропавловск",
  "Шымкент",
  "Караганда",
  "Актобе",
];

const TOURS: Tour[] = [
  {
    id: 1,
    countryRu: "Турция",
    countryEn: "Turkey",
    cityRu: "Анталья",
    cityEn: "Antalya",
    hotel: "Lara Garden Resort",
    image:
      "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1200&q=82",
    departureCity: "Астана",
    departureDate: "2026-08-18",
    nights: 7,
    stars: 5,
    rating: 9.1,
    reviews: 428,
    mealRu: "Всё включено",
    mealEn: "All inclusive",
    price: 389000,
    oldPrice: 449000,
    badgeRu: "Горящий тур",
    badgeEn: "Hot deal",
    featuresRu: ["Первая линия", "Песчаный пляж", "Детский клуб"],
    featuresEn: ["Beachfront", "Sandy beach", "Kids club"],
  },
  {
    id: 2,
    countryRu: "ОАЭ",
    countryEn: "UAE",
    cityRu: "Дубай",
    cityEn: "Dubai",
    hotel: "Marina View Hotel",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=82",
    departureCity: "Алматы",
    departureDate: "2026-08-24",
    nights: 6,
    stars: 4,
    rating: 8.8,
    reviews: 306,
    mealRu: "Завтраки",
    mealEn: "Breakfast",
    price: 327000,
    oldPrice: 369000,
    badgeRu: "Популярный",
    badgeEn: "Popular",
    featuresRu: ["Dubai Marina", "Трансфер до пляжа", "Бассейн"],
    featuresEn: ["Dubai Marina", "Beach shuttle", "Pool"],
  },
  {
    id: 3,
    countryRu: "Египет",
    countryEn: "Egypt",
    cityRu: "Шарм-эль-Шейх",
    cityEn: "Sharm El Sheikh",
    hotel: "Coral Bay Aqua Resort",
    image:
      "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=1200&q=82",
    departureCity: "Астана",
    departureDate: "2026-09-02",
    nights: 8,
    stars: 5,
    rating: 9.0,
    reviews: 512,
    mealRu: "Всё включено",
    mealEn: "All inclusive",
    price: 298000,
    oldPrice: 345000,
    badgeRu: "−14%",
    badgeEn: "−14%",
    featuresRu: ["Коралловый риф", "Аквапарк", "Большая территория"],
    featuresEn: ["Coral reef", "Water park", "Large grounds"],
  },
  {
    id: 4,
    countryRu: "Таиланд",
    countryEn: "Thailand",
    cityRu: "Пхукет",
    cityEn: "Phuket",
    hotel: "Kata Palm Retreat",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=82",
    departureCity: "Алматы",
    departureDate: "2026-09-10",
    nights: 10,
    stars: 4,
    rating: 8.7,
    reviews: 274,
    mealRu: "Завтраки",
    mealEn: "Breakfast",
    price: 515000,
    badgeRu: "Выбор гостей",
    badgeEn: "Guest choice",
    featuresRu: ["Пляж Kata", "Тропический сад", "Семейные номера"],
    featuresEn: ["Kata Beach", "Tropical garden", "Family rooms"],
  },
  {
    id: 5,
    countryRu: "Вьетнам",
    countryEn: "Vietnam",
    cityRu: "Нячанг",
    cityEn: "Nha Trang",
    hotel: "Ocean Pearl Nha Trang",
    image:
      "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=82",
    departureCity: "Алматы",
    departureDate: "2026-08-29",
    nights: 9,
    stars: 4,
    rating: 8.9,
    reviews: 198,
    mealRu: "Завтраки",
    mealEn: "Breakfast",
    price: 458000,
    oldPrice: 499000,
    badgeRu: "Горящий тур",
    badgeEn: "Hot deal",
    featuresRu: ["Вид на море", "Центр города", "Пляж рядом"],
    featuresEn: ["Sea view", "City centre", "Near the beach"],
  },
  {
    id: 6,
    countryRu: "Мальдивы",
    countryEn: "Maldives",
    cityRu: "Мале",
    cityEn: "Malé",
    hotel: "Lagoon Private Island",
    image:
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=82",
    departureCity: "Алматы",
    departureDate: "2026-10-03",
    nights: 7,
    stars: 5,
    rating: 9.6,
    reviews: 144,
    mealRu: "Полупансион",
    mealEn: "Half board",
    price: 949000,
    oldPrice: 1099000,
    badgeRu: "Premium",
    badgeEn: "Premium",
    featuresRu: ["Вилла на воде", "Домашний риф", "Трансфер включён"],
    featuresEn: ["Overwater villa", "House reef", "Transfer included"],
  },
  {
    id: 7,
    countryRu: "Индонезия",
    countryEn: "Indonesia",
    cityRu: "Бали",
    cityEn: "Bali",
    hotel: "Ubud Jungle Suites",
    image:
      "https://images.unsplash.com/photo-1533669955142-6a73332af4db?auto=format&fit=crop&w=1200&q=82",
    departureCity: "Алматы",
    departureDate: "2026-09-18",
    nights: 11,
    stars: 5,
    rating: 9.3,
    reviews: 231,
    mealRu: "Завтраки",
    mealEn: "Breakfast",
    price: 684000,
    badgeRu: "Новинка",
    badgeEn: "New",
    featuresRu: ["Вилла с бассейном", "Джунгли Убуда", "SPA"],
    featuresEn: ["Pool villa", "Ubud jungle", "SPA"],
  },
  {
    id: 8,
    countryRu: "Грузия",
    countryEn: "Georgia",
    cityRu: "Батуми",
    cityEn: "Batumi",
    hotel: "Boulevard Residence",
    image:
      "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=1200&q=82",
    departureCity: "Астана",
    departureDate: "2026-08-20",
    nights: 6,
    stars: 4,
    rating: 8.5,
    reviews: 166,
    mealRu: "Без питания",
    mealEn: "Room only",
    price: 241000,
    badgeRu: "Выгодно",
    badgeEn: "Best value",
    featuresRu: ["Старый Батуми", "Набережная", "Номер с кухней"],
    featuresEn: ["Old Batumi", "Promenade", "Kitchenette"],
  },
  {
    id: 9,
    countryRu: "Турция",
    countryEn: "Turkey",
    cityRu: "Стамбул",
    cityEn: "Istanbul",
    hotel: "Sultanahmet Boutique",
    image:
      "https://images.unsplash.com/photo-1527838832700-5059252407fa?auto=format&fit=crop&w=1200&q=82",
    departureCity: "Петропавловск",
    departureDate: "2026-09-06",
    nights: 5,
    stars: 4,
    rating: 9.0,
    reviews: 352,
    mealRu: "Завтраки",
    mealEn: "Breakfast",
    price: 279000,
    badgeRu: "City break",
    badgeEn: "City break",
    featuresRu: ["Исторический центр", "Трансфер", "Экскурсия в подарок"],
    featuresEn: ["Historic centre", "Transfer", "Free city tour"],
  },
  {
    id: 10,
    countryRu: "ОАЭ",
    countryEn: "UAE",
    cityRu: "Рас-эль-Хайма",
    cityEn: "Ras Al Khaimah",
    hotel: "Marjan Island Family Resort",
    image:
      "https://images.unsplash.com/photo-1546412414-e1885259563a?auto=format&fit=crop&w=1200&q=82",
    departureCity: "Астана",
    departureDate: "2026-09-14",
    nights: 7,
    stars: 5,
    rating: 9.2,
    reviews: 287,
    mealRu: "Всё включено",
    mealEn: "All inclusive",
    price: 474000,
    oldPrice: 529000,
    badgeRu: "Для семьи",
    badgeEn: "Family pick",
    featuresRu: ["Частный пляж", "Детский аквапарк", "Семейный номер"],
    featuresEn: ["Private beach", "Kids water park", "Family room"],
  },
  {
    id: 11,
    countryRu: "Египет",
    countryEn: "Egypt",
    cityRu: "Хургада",
    cityEn: "Hurghada",
    hotel: "Sunrise Makadi Club",
    image:
      "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?auto=format&fit=crop&w=1200&q=82",
    departureCity: "Шымкент",
    departureDate: "2026-08-27",
    nights: 7,
    stars: 5,
    rating: 8.9,
    reviews: 401,
    mealRu: "Всё включено",
    mealEn: "All inclusive",
    price: 312000,
    badgeRu: "Хит продаж",
    badgeEn: "Bestseller",
    featuresRu: ["Пологий вход", "Аквапарк", "Анимация"],
    featuresEn: ["Shallow entry", "Water park", "Entertainment"],
  },
  {
    id: 12,
    countryRu: "Таиланд",
    countryEn: "Thailand",
    cityRu: "Паттайя",
    cityEn: "Pattaya",
    hotel: "Jomtien Bay Residence",
    image:
      "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=1200&q=82",
    departureCity: "Астана",
    departureDate: "2026-10-11",
    nights: 9,
    stars: 4,
    rating: 8.4,
    reviews: 179,
    mealRu: "Завтраки",
    mealEn: "Breakfast",
    price: 489000,
    badgeRu: "Новая цена",
    badgeEn: "New price",
    featuresRu: ["Jomtien Beach", "Бассейн", "Рядом ночной рынок"],
    featuresEn: ["Jomtien Beach", "Pool", "Near night market"],
  },
];

const COPY = {
  ru: {
    navTours: "Найти тур",
    navHot: "Предложения",
    navWhy: "Почему мы",
    navContacts: "Контакты",
    call: "Связаться",
    eyebrow: "Туры из Казахстана с поддержкой менеджера",
    heroTitleA: "Ваш отдых начинается",
    heroTitleB: "с правильного выбора",
    heroText:
      "Сравните направления, отели и цены самостоятельно. Выберите подходящий вариант — Dayana Travel поможет всё проверить и оформить.",
    heroPrimary: "Найти тур",
    heroSecondary: "Смотреть предложения",
    trustOne: "Подбор за 1 минуту",
    trustTwo: "Проверка тура менеджером",
    trustThree: "Поддержка до возвращения",
    searchTitle: "Куда отправимся?",
    departure: "Вылет из",
    country: "Страна",
    allCountries: "Любая страна",
    date: "Дата вылета",
    nights: "Ночей",
    anyNights: "Любое количество",
    travelers: "Туристы",
    adults: "Взрослые",
    children: "Дети",
    budget: "Бюджет на человека",
    anyBudget: "Любой бюджет",
    find: "Найти туры",
    demo: "Демо-каталог MVP",
    popular: "Популярные направления",
    popularText: "Начните поиск с направлений, которые чаще выбирают путешественники из Казахстана.",
    from: "от",
    offers: "предложений",
    resultsEyebrow: "Каталог Dayana Travel",
    resultsTitle: "Подходящие туры",
    resultsText: "Меняйте параметры и сравнивайте варианты без звонков и ожидания.",
    filters: "Фильтры",
    stars: "Категория отеля",
    anyStars: "Любая",
    meal: "Питание",
    anyMeal: "Любое питание",
    maxPrice: "Максимальная цена",
    reset: "Сбросить",
    sortRecommended: "Рекомендуемые",
    sortPriceAsc: "Сначала дешевле",
    sortPriceDesc: "Сначала дороже",
    sortRating: "По рейтингу",
    found: "Найдено",
    tourWord: "туров",
    noResults: "По этим параметрам туров не найдено",
    noResultsText: "Попробуйте увеличить бюджет, изменить даты или выбрать другую страну.",
    choose: "Выбрать тур",
    perPerson: "за 1 человека",
    totalFor: "Ориентировочно за всех",
    nightsShort: "ночей",
    reviews: "отзывов",
    departureLabel: "Вылет",
    favorite: "В избранное",
    unfavorite: "Убрать из избранного",
    showMore: "Показать ещё",
    whyEyebrow: "Спокойный отдых начинается здесь",
    whyTitle: "Вы выбираете — мы берём оформление на себя",
    whyText:
      "Самостоятельный поиск остаётся простым, а перед оплатой менеджер перепроверяет наличие, итоговую цену и условия тура.",
    whyOneTitle: "Актуальная проверка",
    whyOneText: "Уточняем наличие мест и окончательную стоимость у поставщика.",
    whyTwoTitle: "Безопасное оформление",
    whyTwoText: "Фиксируем состав тура и объясняем условия до оплаты.",
    whyThreeTitle: "Поддержка в поездке",
    whyThreeText: "Остаёмся на связи от бронирования до возвращения домой.",
    footerText: "Самостоятельный поиск туров и персональное сопровождение вашего путешествия.",
    selectedTour: "Вы выбрали тур",
    requestTitle: "Отправить тур на проверку",
    requestText: "Менеджер уточнит наличие и итоговую стоимость, затем свяжется с вами.",
    name: "Ваше имя",
    phone: "Телефон или WhatsApp",
    email: "Email (необязательно)",
    comment: "Комментарий или пожелания",
    send: "Проверить и забронировать",
    sending: "Отправляем...",
    successTitle: "Тур отправлен на проверку",
    successText: "Менеджер свяжется с вами после подтверждения цены и наличия.",
    close: "Закрыть",
    disclaimer:
      "Цены в MVP демонстрационные. Реальные цены и наличие появятся после подключения API туроператоров.",
  },
  en: {
    navTours: "Find a tour",
    navHot: "Deals",
    navWhy: "Why us",
    navContacts: "Contacts",
    call: "Contact us",
    eyebrow: "Tours from Kazakhstan with personal support",
    heroTitleA: "Your holiday begins",
    heroTitleB: "with the right choice",
    heroText:
      "Compare destinations, hotels and prices on your own. Choose a suitable option and Dayana Travel will verify and arrange it.",
    heroPrimary: "Find a tour",
    heroSecondary: "View deals",
    trustOne: "Search in 1 minute",
    trustTwo: "Manager verification",
    trustThree: "Support until return",
    searchTitle: "Where are we going?",
    departure: "Departure from",
    country: "Country",
    allCountries: "Any country",
    date: "Departure date",
    nights: "Nights",
    anyNights: "Any duration",
    travelers: "Travelers",
    adults: "Adults",
    children: "Children",
    budget: "Budget per person",
    anyBudget: "Any budget",
    find: "Find tours",
    demo: "MVP demo catalog",
    popular: "Popular destinations",
    popularText: "Start with destinations most often chosen by travelers from Kazakhstan.",
    from: "from",
    offers: "offers",
    resultsEyebrow: "Dayana Travel catalog",
    resultsTitle: "Matching tours",
    resultsText: "Change your preferences and compare options without calls or waiting.",
    filters: "Filters",
    stars: "Hotel category",
    anyStars: "Any",
    meal: "Meal plan",
    anyMeal: "Any meal plan",
    maxPrice: "Maximum price",
    reset: "Reset",
    sortRecommended: "Recommended",
    sortPriceAsc: "Lowest price",
    sortPriceDesc: "Highest price",
    sortRating: "Highest rated",
    found: "Found",
    tourWord: "tours",
    noResults: "No tours match these preferences",
    noResultsText: "Try increasing your budget, changing dates or choosing another country.",
    choose: "Choose tour",
    perPerson: "per person",
    totalFor: "Estimated total",
    nightsShort: "nights",
    reviews: "reviews",
    departureLabel: "Departure",
    favorite: "Add to favorites",
    unfavorite: "Remove from favorites",
    showMore: "Show more",
    whyEyebrow: "A stress-free holiday starts here",
    whyTitle: "You choose — we handle the booking",
    whyText:
      "Self-service search stays simple, while a manager checks availability, final price and tour conditions before payment.",
    whyOneTitle: "Live verification",
    whyOneText: "We confirm availability and the final supplier price.",
    whyTwoTitle: "Safe booking",
    whyTwoText: "We fix the package details and explain all terms before payment.",
    whyThreeTitle: "Travel support",
    whyThreeText: "We stay in touch from booking until you return home.",
    footerText: "Self-service tour search with personal travel support.",
    selectedTour: "Your selected tour",
    requestTitle: "Send tour for verification",
    requestText: "A manager will confirm availability and final price, then contact you.",
    name: "Your name",
    phone: "Phone or WhatsApp",
    email: "Email (optional)",
    comment: "Comments or preferences",
    send: "Verify and book",
    sending: "Sending...",
    successTitle: "Tour sent for verification",
    successText: "A manager will contact you after confirming availability and price.",
    close: "Close",
    disclaimer:
      "Prices in this MVP are for demonstration. Live pricing and availability require tour operator API integration.",
  },
};

const formatPrice = (value: number, language: Language) =>
  new Intl.NumberFormat(language === "ru" ? "ru-KZ" : "en-US").format(value) +
  " ₸";

const formatDate = (value: string, language: Language) =>
  new Intl.DateTimeFormat(language === "ru" ? "ru-RU" : "en-GB", {
    day: "numeric",
    month: "short",
  }).format(new Date(`${value}T12:00:00`));

const countries = Array.from(new Set(TOURS.map((tour) => tour.countryRu)));

function App() {
  const [language, setLanguage] = useState<Language>(() => {
    return (localStorage.getItem("dayana-language") as Language) || "ru";
  });
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem("dayana-theme") as Theme | null;
    if (saved) return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [search, setSearch] = useState<SearchState>({
    departureCity: "Астана",
    country: "",
    date: "",
    nights: "",
    adults: 2,
    children: 0,
    budget: 1000000,
  });
  const [appliedSearch, setAppliedSearch] = useState<SearchState>(search);
  const [minStars, setMinStars] = useState(0);
  const [mealFilter, setMealFilter] = useState("");
  const [sortMode, setSortMode] = useState<SortMode>("recommended");
  const [visibleCount, setVisibleCount] = useState(6);
  const [favorites, setFavorites] = useState<number[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("dayana-favorites") || "[]");
    } catch {
      return [];
    }
  });
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [travelerName, setTravelerName] = useState("");
  const [travelerPhone, setTravelerPhone] = useState("");
  const [travelerEmail, setTravelerEmail] = useState("");
  const [travelerComment, setTravelerComment] = useState("");

  const resultsRef = useRef<HTMLElement>(null);
  const t = COPY[language];

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("dayana-theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("dayana-language", language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem("dayana-favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    document.body.style.overflow = selectedTour ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedTour]);

  const meals = useMemo(
    () => Array.from(new Set(TOURS.map((tour) => tour.mealRu))),
    [],
  );

  const filteredTours = useMemo(() => {
    const matches = TOURS.filter((tour) => {
      const countryMatches =
        !appliedSearch.country || tour.countryRu === appliedSearch.country;
      const cityMatches =
        !appliedSearch.departureCity ||
        tour.departureCity === appliedSearch.departureCity;
      const dateMatches =
        !appliedSearch.date || tour.departureDate >= appliedSearch.date;
      const nightsMatches =
        !appliedSearch.nights ||
        (() => {
          const [min, max] = appliedSearch.nights.split("-").map(Number);
          return tour.nights >= min && tour.nights <= max;
        })();
      const budgetMatches = tour.price <= appliedSearch.budget;
      const starsMatch = minStars === 0 || tour.stars >= minStars;
      const mealMatches = !mealFilter || tour.mealRu === mealFilter;
      return (
        countryMatches &&
        cityMatches &&
        dateMatches &&
        nightsMatches &&
        budgetMatches &&
        starsMatch &&
        mealMatches
      );
    });

    return [...matches].sort((a, b) => {
      if (sortMode === "priceAsc") return a.price - b.price;
      if (sortMode === "priceDesc") return b.price - a.price;
      if (sortMode === "rating") return b.rating - a.rating;
      return b.rating * 10 - a.rating * 10 || a.price - b.price;
    });
  }, [appliedSearch, minStars, mealFilter, sortMode]);

  const destinationStats = useMemo(() => {
    return countries.slice(0, 6).map((country) => {
      const tours = TOURS.filter((tour) => tour.countryRu === country);
      return {
        country,
        countryEn: tours[0].countryEn,
        count: tours.length,
        price: Math.min(...tours.map((tour) => tour.price)),
        image: tours[0].image,
      };
    });
  }, []);

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAppliedSearch(search);
    setVisibleCount(6);
    window.setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const resetFilters = () => {
    const resetState: SearchState = {
      departureCity: "",
      country: "",
      date: "",
      nights: "",
      adults: 2,
      children: 0,
      budget: 1000000,
    };
    setSearch(resetState);
    setAppliedSearch(resetState);
    setMinStars(0);
    setMealFilter("");
    setSortMode("recommended");
    setVisibleCount(6);
  };

  const toggleFavorite = (id: number) => {
    setFavorites((current) =>
      current.includes(id)
        ? current.filter((favoriteId) => favoriteId !== id)
        : [...current, id],
    );
  };

  const chooseDestination = (country: string) => {
    const next = { ...search, country, departureCity: "" };
    setSearch(next);
    setAppliedSearch(next);
    setVisibleCount(6);
    window.setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const openTour = (tour: Tour) => {
    setSelectedTour(tour);
    setSent(false);
  };

  const closeTour = () => {
    setSelectedTour(null);
    setSent(false);
  };

  const submitTourRequest = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSending(true);
    await new Promise((resolve) => window.setTimeout(resolve, 1000));
    setSending(false);
    setSent(true);
  };

  const totalTravelers = appliedSearch.adults + appliedSearch.children;

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f6f5f0] text-[#17211b] transition-colors duration-300 dark:bg-[#0d1612] dark:text-[#f5f6f3]">
      <header className="fixed inset-x-0 top-0 z-40 px-3 pt-3 sm:px-5 sm:pt-4">
        <nav className="mx-auto flex max-w-7xl items-center gap-3 rounded-2xl border border-white/70 bg-white/85 px-3 py-2.5 shadow-[0_12px_40px_rgba(19,33,25,0.12)] backdrop-blur-xl transition-colors dark:border-white/10 dark:bg-[#132019]/90 dark:shadow-[0_12px_40px_rgba(0,0,0,0.35)] sm:px-4">
          <a href="#top" className="flex shrink-0 items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#245b46] text-white dark:bg-[#69a889] dark:text-[#0d1612]">
              <Plane size={17} />
            </span>
            <span>
              <strong className="block text-sm leading-none tracking-tight text-[#17211b] dark:text-white">
                Dayana Travel
              </strong>
              <span className="mt-1 hidden text-[9px] font-semibold uppercase tracking-[0.18em] text-[#6e786f] dark:text-[#aab4ad] sm:block">
                Travel marketplace
              </span>
            </span>
          </a>

          <div className="ml-5 hidden items-center gap-5 lg:flex">
            <a className="nav-link" href="#search">
              {t.navTours}
            </a>
            <a className="nav-link" href="#results">
              {t.navHot}
            </a>
            <a className="nav-link" href="#why">
              {t.navWhy}
            </a>
            <a className="nav-link" href="#contacts">
              {t.navContacts}
            </a>
          </div>

          <div className="ml-auto flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setLanguage(language === "ru" ? "en" : "ru")}
              className="control-button gap-1.5 px-2.5 text-xs font-bold"
              aria-label="Change language"
            >
              <Globe2 size={15} />
              {language.toUpperCase()}
            </button>
            <button
              type="button"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="control-button"
              aria-label="Change theme"
            >
              {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
            </button>
            <a
              href={CONTACTS.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="hidden rounded-xl bg-[#17211b] px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#2e3a32] dark:bg-[#f5f6f3] dark:text-[#0d1612] dark:hover:bg-white sm:inline-flex"
            >
              {t.call}
            </a>
            <button
              type="button"
              className="control-button lg:hidden"
              onClick={() => setMobileMenuOpen((current) => !current)}
              aria-label="Open menu"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="absolute left-3 right-3 top-[calc(100%+8px)] rounded-2xl border border-[#e3e5df] bg-white p-3 shadow-xl dark:border-white/10 dark:bg-[#15211b] lg:hidden">
              {[ 
                [t.navTours, "#search"],
                [t.navHot, "#results"],
                [t.navWhy, "#why"],
                [t.navContacts, "#contacts"],
              ].map(([label, href]) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block rounded-xl px-3 py-3 text-sm font-semibold text-[#17211b] transition-colors hover:bg-[#f1f3ef] dark:text-white dark:hover:bg-white/5"
                >
                  {label}
                </a>
              ))}
            </div>
          )}
        </nav>
      </header>

      <main id="top">
        <section className="relative min-h-[820px] overflow-hidden sm:min-h-[860px] lg:min-h-[760px] lg:h-screen">
          <img
            src={HERO_IMAGE}
            alt="Tropical coast"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#07120c]/90 via-[#07120c]/55 to-black/15" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07120c]/75 via-transparent to-black/25" />

          <div className="relative mx-auto flex min-h-[820px] max-w-7xl flex-col justify-end px-4 pb-8 pt-28 sm:min-h-[860px] sm:px-6 sm:pb-10 lg:h-full lg:min-h-0 lg:justify-center lg:px-8 lg:pb-0">
            <div className="max-w-3xl pb-[430px] sm:pb-[410px] lg:pb-24">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-2 text-xs font-semibold text-white backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-[#e0b96e]" />
                {t.eyebrow}
              </div>
              <h1 className="max-w-3xl text-4xl font-semibold leading-[1.02] tracking-[-0.045em] text-white drop-shadow-lg sm:text-6xl lg:text-7xl">
                {t.heroTitleA}
                <br />
                <span className="font-serif-accent font-normal italic text-[#f3d99e]">
                  {t.heroTitleB}
                </span>
              </h1>
              <p className="mt-5 max-w-xl text-sm leading-7 text-white/85 sm:text-base">
                {t.heroText}
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href="#search"
                  className="group inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3.5 text-sm font-bold text-[#17211b] transition-all hover:-translate-y-0.5 hover:bg-[#f5f6f3]"
                >
                  <Search size={17} />
                  {t.heroPrimary}
                </a>
                <a
                  href="#results"
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/35 bg-black/15 px-5 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-all hover:-translate-y-0.5 hover:bg-white/15"
                >
                  {t.heroSecondary}
                  <ArrowRight size={16} />
                </a>
              </div>
              <div className="mt-7 flex flex-wrap gap-x-5 gap-y-3 text-xs font-medium text-white/90">
                {[t.trustOne, t.trustTwo, t.trustThree].map((item) => (
                  <span key={item} className="inline-flex items-center gap-2">
                    <Check size={14} className="text-[#f3d99e]" />
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <form
              id="search"
              onSubmit={handleSearch}
              className="absolute bottom-5 left-4 right-4 rounded-[28px] border border-white/60 bg-white p-3 shadow-[0_30px_90px_rgba(0,0,0,0.28)] sm:bottom-8 sm:left-6 sm:right-6 sm:p-4 lg:bottom-8 lg:left-8 lg:right-8 dark:border-white/10 dark:bg-[#132019]"
            >
              <div className="mb-3 flex items-center justify-between gap-3 px-1">
                <div>
                  <h2 className="text-base font-bold tracking-tight text-[#17211b] dark:text-white sm:text-lg">
                    {t.searchTitle}
                  </h2>
                  <p className="mt-0.5 text-[11px] text-[#6e786f] dark:text-[#aab4ad]">
                    {t.demo}
                  </p>
                </div>
                <span className="hidden rounded-full bg-[#e8f0eb] px-3 py-1.5 text-[11px] font-bold text-[#245b46] dark:bg-[#203429] dark:text-[#91c6aa] sm:inline-flex">
                  12 {t.offers}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 lg:grid-cols-[1.05fr_1.05fr_1fr_.72fr_.68fr_.68fr_.85fr_auto]">
                <SearchField label={t.departure} icon={<Plane size={15} />}>
                  <select
                    value={search.departureCity}
                    onChange={(event) =>
                      setSearch({ ...search, departureCity: event.target.value })
                    }
                    className="search-input"
                  >
                    <option value="">{language === "ru" ? "Любой город" : "Any city"}</option>
                    {DEPARTURE_CITIES.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </SearchField>

                <SearchField label={t.country} icon={<MapPin size={15} />}>
                  <select
                    value={search.country}
                    onChange={(event) =>
                      setSearch({ ...search, country: event.target.value })
                    }
                    className="search-input"
                  >
                    <option value="">{t.allCountries}</option>
                    {countries.map((country) => (
                      <option key={country} value={country}>
                        {language === "ru"
                          ? country
                          : TOURS.find((tour) => tour.countryRu === country)?.countryEn}
                      </option>
                    ))}
                  </select>
                </SearchField>

                <SearchField label={t.date} icon={<CalendarDays size={15} />}>
                  <input
                    type="date"
                    min="2026-08-06"
                    value={search.date}
                    onChange={(event) =>
                      setSearch({ ...search, date: event.target.value })
                    }
                    className="search-input"
                  />
                </SearchField>

                <SearchField label={t.nights} icon={<Clock3 size={15} />}>
                  <select
                    value={search.nights}
                    onChange={(event) =>
                      setSearch({ ...search, nights: event.target.value })
                    }
                    className="search-input"
                  >
                    <option value="">{t.anyNights}</option>
                    <option value="5-7">5–7</option>
                    <option value="8-10">8–10</option>
                    <option value="11-14">11–14</option>
                  </select>
                </SearchField>

                <SearchField label={t.adults} icon={<Users size={15} />}>
                  <select
                    value={search.adults}
                    onChange={(event) =>
                      setSearch({ ...search, adults: Number(event.target.value) })
                    }
                    className="search-input"
                  >
                    {[1, 2, 3, 4, 5, 6].map((count) => (
                      <option key={count} value={count}>
                        {count}
                      </option>
                    ))}
                  </select>
                </SearchField>

                <SearchField label={t.children} icon={<Users size={15} />}>
                  <select
                    value={search.children}
                    onChange={(event) =>
                      setSearch({ ...search, children: Number(event.target.value) })
                    }
                    className="search-input"
                  >
                    {[0, 1, 2, 3, 4].map((count) => (
                      <option key={count} value={count}>
                        {count}
                      </option>
                    ))}
                  </select>
                </SearchField>

                <SearchField label={t.budget} icon={<SlidersHorizontal size={15} />}>
                  <select
                    value={search.budget}
                    onChange={(event) =>
                      setSearch({ ...search, budget: Number(event.target.value) })
                    }
                    className="search-input"
                  >
                    <option value={300000}>300 000 ₸</option>
                    <option value={400000}>400 000 ₸</option>
                    <option value={500000}>500 000 ₸</option>
                    <option value={700000}>700 000 ₸</option>
                    <option value={1000000}>{t.anyBudget}</option>
                  </select>
                </SearchField>

                <button
                  type="submit"
                  className="col-span-2 flex min-h-[64px] items-center justify-center gap-2 rounded-2xl bg-[#245b46] px-5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-[#1d4a39] lg:col-span-1 dark:bg-[#69a889] dark:text-[#0d1612] dark:hover:bg-[#7fbb9d]"
                >
                  <Search size={17} />
                  <span className="lg:hidden xl:inline">{t.find}</span>
                </button>
              </div>
            </form>
          </div>
        </section>

        <section className="py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="section-kicker">Dayana Travel picks</p>
                <h2 className="section-title">{t.popular}</h2>
              </div>
              <p className="max-w-xl text-sm leading-6 text-[#687169] dark:text-[#aab4ad]">
                {t.popularText}
              </p>
            </div>

            <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {destinationStats.map((destination, index) => (
                <button
                  key={destination.country}
                  type="button"
                  onClick={() => chooseDestination(destination.country)}
                  className={`group relative overflow-hidden rounded-[26px] text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                    index === 0 ? "sm:col-span-2 lg:col-span-1" : ""
                  }`}
                >
                  <img
                    src={destination.image}
                    alt={destination.country}
                    className="h-[330px] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                    <div className="flex items-end justify-between gap-4">
                      <div>
                        <h3 className="text-2xl font-semibold tracking-tight">
                          {language === "ru"
                            ? destination.country
                            : destination.countryEn}
                        </h3>
                        <p className="mt-1 text-xs text-white/70">
                          {destination.count} {t.offers}
                        </p>
                      </div>
                      <span className="rounded-full bg-white px-3 py-2 text-xs font-bold text-[#17211b]">
                        {t.from} {formatPrice(destination.price, language)}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section
          id="results"
          ref={resultsRef}
          className="scroll-mt-24 border-y border-[#e1e3dd] bg-white py-20 transition-colors dark:border-white/10 dark:bg-[#101b15] sm:py-24"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
              <div>
                <p className="section-kicker">{t.resultsEyebrow}</p>
                <h2 className="section-title">{t.resultsTitle}</h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-[#687169] dark:text-[#aab4ad]">
                  {t.resultsText}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-xl bg-[#edf1ed] px-3 py-2 text-xs font-bold text-[#365344] dark:bg-[#1d2d24] dark:text-[#b9d0c2]">
                  {t.found}: {filteredTours.length} {t.tourWord}
                </span>
                <div className="relative">
                  <select
                    value={sortMode}
                    onChange={(event) => setSortMode(event.target.value as SortMode)}
                    className="appearance-none rounded-xl border border-[#dfe2dc] bg-white py-2 pl-3 pr-9 text-xs font-semibold text-[#17211b] outline-none transition focus:border-[#245b46] dark:border-white/10 dark:bg-[#15211b] dark:text-white"
                  >
                    <option value="recommended">{t.sortRecommended}</option>
                    <option value="priceAsc">{t.sortPriceAsc}</option>
                    <option value="priceDesc">{t.sortPriceDesc}</option>
                    <option value="rating">{t.sortRating}</option>
                  </select>
                  <ChevronDown
                    size={14}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#6e786f]"
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 grid gap-7 lg:grid-cols-[250px_minmax(0,1fr)] xl:grid-cols-[270px_minmax(0,1fr)]">
              <aside className="h-fit rounded-[24px] border border-[#e1e3dd] bg-[#fafaf7] p-4 dark:border-white/10 dark:bg-[#15211b] lg:sticky lg:top-24">
                <div className="flex items-center justify-between">
                  <h3 className="flex items-center gap-2 text-sm font-bold">
                    <SlidersHorizontal size={16} />
                    {t.filters}
                  </h3>
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="text-xs font-semibold text-[#245b46] transition-opacity hover:opacity-60 dark:text-[#91c6aa]"
                  >
                    {t.reset}
                  </button>
                </div>

                <FilterBlock label={t.stars}>
                  <div className="grid grid-cols-3 gap-2">
                    {[0, 4, 5].map((stars) => (
                      <button
                        key={stars}
                        type="button"
                        onClick={() => setMinStars(stars)}
                        className={`rounded-xl border px-2 py-2.5 text-xs font-semibold transition-all ${
                          minStars === stars
                            ? "border-[#245b46] bg-[#e8f0eb] text-[#245b46] dark:border-[#69a889] dark:bg-[#203429] dark:text-[#91c6aa]"
                            : "border-[#dfe2dc] bg-white text-[#687169] hover:border-[#9da69f] dark:border-white/10 dark:bg-[#101b15] dark:text-[#aab4ad]"
                        }`}
                      >
                        {stars === 0 ? t.anyStars : `${stars}+ ★`}
                      </button>
                    ))}
                  </div>
                </FilterBlock>

                <FilterBlock label={t.meal}>
                  <select
                    value={mealFilter}
                    onChange={(event) => setMealFilter(event.target.value)}
                    className="filter-select"
                  >
                    <option value="">{t.anyMeal}</option>
                    {meals.map((meal) => (
                      <option key={meal} value={meal}>
                        {language === "ru"
                          ? meal
                          : TOURS.find((tour) => tour.mealRu === meal)?.mealEn}
                      </option>
                    ))}
                  </select>
                </FilterBlock>

                <FilterBlock label={t.maxPrice}>
                  <input
                    type="range"
                    min={250000}
                    max={1000000}
                    step={50000}
                    value={appliedSearch.budget}
                    onChange={(event) =>
                      setAppliedSearch({
                        ...appliedSearch,
                        budget: Number(event.target.value),
                      })
                    }
                    className="w-full accent-[#245b46] dark:accent-[#69a889]"
                  />
                  <div className="mt-2 flex justify-between text-[11px] font-semibold text-[#687169] dark:text-[#aab4ad]">
                    <span>250 000 ₸</span>
                    <span>{formatPrice(appliedSearch.budget, language)}</span>
                  </div>
                </FilterBlock>

                {favorites.length > 0 && (
                  <div className="mt-4 rounded-2xl bg-[#fff4dc] p-3 text-xs leading-5 text-[#6f5220] dark:bg-[#2b2618] dark:text-[#e6ca8e]">
                    <strong className="block">{favorites.length}</strong>
                    {language === "ru"
                      ? "туров сохранено в избранном"
                      : "tours saved to favorites"}
                  </div>
                )}
              </aside>

              <div>
                {filteredTours.length === 0 ? (
                  <div className="flex min-h-[420px] flex-col items-center justify-center rounded-[28px] border border-dashed border-[#cfd4cd] bg-[#fafaf7] px-5 text-center dark:border-white/15 dark:bg-[#15211b]">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#e8f0eb] text-[#245b46] dark:bg-[#203429] dark:text-[#91c6aa]">
                      <Search size={23} />
                    </div>
                    <h3 className="mt-4 text-lg font-bold">{t.noResults}</h3>
                    <p className="mt-2 max-w-md text-sm leading-6 text-[#687169] dark:text-[#aab4ad]">
                      {t.noResultsText}
                    </p>
                    <button
                      type="button"
                      onClick={resetFilters}
                      className="mt-5 rounded-xl bg-[#245b46] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#1d4a39] dark:bg-[#69a889] dark:text-[#0d1612]"
                    >
                      {t.reset}
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                      {filteredTours.slice(0, visibleCount).map((tour) => (
                        <TourCard
                          key={tour.id}
                          tour={tour}
                          language={language}
                          totalTravelers={totalTravelers}
                          isFavorite={favorites.includes(tour.id)}
                          onToggleFavorite={() => toggleFavorite(tour.id)}
                          onChoose={() => openTour(tour)}
                        />
                      ))}
                    </div>

                    {visibleCount < filteredTours.length && (
                      <button
                        type="button"
                        onClick={() => setVisibleCount((count) => count + 6)}
                        className="mx-auto mt-8 flex items-center gap-2 rounded-2xl border border-[#cfd4cd] bg-white px-5 py-3 text-sm font-bold text-[#17211b] transition-all hover:-translate-y-0.5 hover:border-[#879188] dark:border-white/15 dark:bg-[#15211b] dark:text-white"
                      >
                        {t.showMore}
                        <ArrowRight size={16} />
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>

            <p className="mt-8 rounded-2xl border border-[#e3d5b5] bg-[#fff8e8] px-4 py-3 text-xs leading-5 text-[#765b27] dark:border-[#514324] dark:bg-[#272316] dark:text-[#dbc184]">
              {t.disclaimer}
            </p>
          </div>
        </section>

        <section id="why" className="scroll-mt-24 py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-end">
              <div>
                <p className="section-kicker">{t.whyEyebrow}</p>
                <h2 className="section-title max-w-xl">{t.whyTitle}</h2>
                <p className="mt-4 max-w-xl text-sm leading-7 text-[#687169] dark:text-[#aab4ad]">
                  {t.whyText}
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  [Search, t.whyOneTitle, t.whyOneText],
                  [ShieldCheck, t.whyTwoTitle, t.whyTwoText],
                  [MessageCircle, t.whyThreeTitle, t.whyThreeText],
                ].map(([Icon, title, text]) => {
                  const IconComponent = Icon as typeof Search;
                  return (
                    <article
                      key={String(title)}
                      className="rounded-[24px] border border-[#dfe2dc] bg-white p-5 transition-all hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-[#15211b]"
                    >
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#e8f0eb] text-[#245b46] dark:bg-[#203429] dark:text-[#91c6aa]">
                        <IconComponent size={19} />
                      </div>
                      <h3 className="mt-4 text-sm font-bold">{String(title)}</h3>
                      <p className="mt-2 text-xs leading-5 text-[#687169] dark:text-[#aab4ad]">
                        {String(text)}
                      </p>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer
        id="contacts"
        className="border-t border-[#dfe2dc] bg-[#17211b] py-10 text-white dark:border-white/10 dark:bg-[#080e0b]"
      >
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-[1fr_auto_auto] lg:px-8">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#69a889] text-[#0d1612]">
                <Plane size={17} />
              </span>
              <strong className="text-lg">Dayana Travel</strong>
            </div>
            <p className="mt-4 max-w-md text-sm leading-6 text-white/60">
              {t.footerText}
            </p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/40">
              {t.navContacts}
            </p>
            <div className="mt-3 space-y-2 text-sm">
              <a className="footer-link" href={`tel:${CONTACTS.phone.replace(/\s/g, "")}`}>
                <Phone size={15} /> {CONTACTS.phone}
              </a>
              <a className="footer-link" href={`mailto:${CONTACTS.email}`}>
                <MessageCircle size={15} /> {CONTACTS.email}
              </a>
            </div>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/40">
              WhatsApp
            </p>
            <a
              href={CONTACTS.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-[#17211b] transition-transform hover:-translate-y-0.5"
            >
              <MessageCircle size={16} />
              {t.call}
            </a>
          </div>
        </div>
        <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-2 border-t border-white/10 px-4 pt-5 text-[11px] text-white/40 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <span>© 2026 Dayana Travel</span>
          <span>{t.disclaimer}</span>
        </div>
      </footer>

      {selectedTour && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-0 backdrop-blur-sm sm:items-center sm:p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="max-h-[94vh] w-full max-w-4xl overflow-y-auto rounded-t-[28px] bg-white shadow-2xl dark:bg-[#132019] sm:rounded-[28px]">
            <div className="grid md:grid-cols-[.95fr_1.05fr]">
              <div className="relative min-h-[280px] overflow-hidden md:min-h-full md:rounded-l-[28px]">
                <img
                  src={selectedTour.image}
                  alt={selectedTour.hotel}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/15" />
                <button
                  type="button"
                  onClick={closeTour}
                  className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[#17211b] transition-transform hover:scale-105 md:hidden"
                  aria-label={t.close}
                >
                  <X size={18} />
                </button>
                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/70">
                    {t.selectedTour}
                  </p>
                  <h3 className="mt-2 text-2xl font-bold">{selectedTour.hotel}</h3>
                  <p className="mt-1 text-sm text-white/80">
                    {language === "ru" ? selectedTour.cityRu : selectedTour.cityEn},{" "}
                    {language === "ru"
                      ? selectedTour.countryRu
                      : selectedTour.countryEn}
                  </p>
                  <p className="mt-4 text-2xl font-bold">
                    {formatPrice(selectedTour.price, language)}
                  </p>
                  <p className="text-xs text-white/60">{t.perPerson}</p>
                </div>
              </div>

              <div className="p-5 sm:p-7">
                <div className="hidden items-start justify-between gap-4 md:flex">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#6e786f] dark:text-[#aab4ad]">
                      Dayana Travel
                    </p>
                    <h3 className="mt-1 text-2xl font-bold tracking-tight">
                      {t.requestTitle}
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={closeTour}
                    className="control-button"
                    aria-label={t.close}
                  >
                    <X size={18} />
                  </button>
                </div>
                <p className="mt-2 text-sm leading-6 text-[#687169] dark:text-[#aab4ad]">
                  {t.requestText}
                </p>

                <div className="mt-5 grid grid-cols-2 gap-2 text-xs">
                  <ModalFact
                    icon={<CalendarDays size={15} />}
                    label={`${formatDate(selectedTour.departureDate, language)} · ${selectedTour.nights} ${t.nightsShort}`}
                  />
                  <ModalFact
                    icon={<Users size={15} />}
                    label={`${totalTravelers} ${t.travelers.toLowerCase()}`}
                  />
                  <ModalFact
                    icon={<Hotel size={15} />}
                    label={`${selectedTour.stars}★ · ${selectedTour.rating}/10`}
                  />
                  <ModalFact
                    icon={<Utensils size={15} />}
                    label={language === "ru" ? selectedTour.mealRu : selectedTour.mealEn}
                  />
                </div>

                {sent ? (
                  <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#e8f0eb] text-[#245b46] dark:bg-[#203429] dark:text-[#91c6aa]">
                      <Check size={24} />
                    </div>
                    <h4 className="mt-4 text-lg font-bold">{t.successTitle}</h4>
                    <p className="mt-2 max-w-sm text-sm leading-6 text-[#687169] dark:text-[#aab4ad]">
                      {t.successText}
                    </p>
                    <button
                      type="button"
                      onClick={closeTour}
                      className="mt-5 rounded-xl bg-[#245b46] px-5 py-3 text-sm font-bold text-white dark:bg-[#69a889] dark:text-[#0d1612]"
                    >
                      {t.close}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={submitTourRequest} className="mt-5 space-y-3">
                    <input
                      required
                      value={travelerName}
                      onChange={(event) => setTravelerName(event.target.value)}
                      placeholder={t.name}
                      className="modal-input"
                    />
                    <div className="grid gap-3 sm:grid-cols-2">
                      <input
                        required
                        value={travelerPhone}
                        onChange={(event) => setTravelerPhone(event.target.value)}
                        placeholder={t.phone}
                        className="modal-input"
                      />
                      <input
                        type="email"
                        value={travelerEmail}
                        onChange={(event) => setTravelerEmail(event.target.value)}
                        placeholder={t.email}
                        className="modal-input"
                      />
                    </div>
                    <textarea
                      rows={3}
                      value={travelerComment}
                      onChange={(event) => setTravelerComment(event.target.value)}
                      placeholder={t.comment}
                      className="modal-input resize-none"
                    />
                    <button
                      type="submit"
                      disabled={sending}
                      className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#245b46] py-3.5 text-sm font-bold text-white transition-colors hover:bg-[#1d4a39] disabled:opacity-60 dark:bg-[#69a889] dark:text-[#0d1612]"
                    >
                      {sending ? t.sending : t.send}
                      {!sending && <ArrowRight size={16} />}
                    </button>
                    <p className="text-center text-[10px] leading-4 text-[#879087] dark:text-[#829087]">
                      {t.disclaimer}
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SearchField({
  label,
  icon,
  children,
}: {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <label className="flex min-w-0 flex-col justify-center rounded-2xl border border-[#e1e3dd] bg-[#fafaf7] px-3 py-2 transition-colors focus-within:border-[#245b46] dark:border-white/10 dark:bg-[#0f1914] dark:focus-within:border-[#69a889]">
      <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-[#7b847c] dark:text-[#91a096]">
        {icon}
        <span className="truncate">{label}</span>
      </span>
      {children}
    </label>
  );
}

function FilterBlock({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-5 border-t border-[#e1e3dd] pt-4 dark:border-white/10">
      <p className="mb-3 text-xs font-bold text-[#455047] dark:text-[#dce5df]">
        {label}
      </p>
      {children}
    </div>
  );
}

function TourCard({
  tour,
  language,
  totalTravelers,
  isFavorite,
  onToggleFavorite,
  onChoose,
}: {
  tour: Tour;
  language: Language;
  totalTravelers: number;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onChoose: () => void;
}) {
  const t = COPY[language];
  const features = language === "ru" ? tour.featuresRu : tour.featuresEn;

  return (
    <article className="group overflow-hidden rounded-[24px] border border-[#e1e3dd] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-[#15211b]">
      <div className="relative overflow-hidden">
        <img
          src={tour.image}
          alt={tour.hotel}
          className="h-52 w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-3">
          {tour.badgeRu ? (
            <span className="rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-bold text-[#17211b] shadow-sm backdrop-blur-md">
              {language === "ru" ? tour.badgeRu : tour.badgeEn}
            </span>
          ) : (
            <span />
          )}
          <button
            type="button"
            onClick={onToggleFavorite}
            aria-label={isFavorite ? t.unfavorite : t.favorite}
            className={`flex h-9 w-9 items-center justify-center rounded-full backdrop-blur-md transition-all hover:scale-105 ${
              isFavorite
                ? "bg-[#fff0ed] text-[#d65345]"
                : "bg-white/90 text-[#17211b]"
            }`}
          >
            <Heart size={17} fill={isFavorite ? "currentColor" : "none"} />
          </button>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate text-xs font-semibold text-[#6e786f] dark:text-[#aab4ad]">
              {language === "ru" ? tour.cityRu : tour.cityEn},{" "}
              {language === "ru" ? tour.countryRu : tour.countryEn}
            </p>
            <h3 className="mt-1 line-clamp-2 min-h-[44px] text-[15px] font-bold leading-5 text-[#17211b] dark:text-white">
              {tour.hotel} {tour.stars}★
            </h3>
          </div>
          <div className="flex shrink-0 items-center gap-1 rounded-lg bg-[#e8f0eb] px-2 py-1.5 text-xs font-bold text-[#245b46] dark:bg-[#203429] dark:text-[#91c6aa]">
            <Star size={12} fill="currentColor" />
            {tour.rating}
          </div>
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {features.slice(0, 3).map((feature) => (
            <span
              key={feature}
              className="rounded-lg bg-[#f1f3ef] px-2 py-1 text-[10px] font-semibold text-[#657068] dark:bg-[#1d2d24] dark:text-[#b8c5bc]"
            >
              {feature}
            </span>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2 border-y border-[#eceee9] py-3 text-[11px] text-[#687169] dark:border-white/10 dark:text-[#aab4ad]">
          <span className="flex items-center gap-1.5">
            <CalendarDays size={13} />
            {formatDate(tour.departureDate, language)} · {tour.nights} {t.nightsShort}
          </span>
          <span className="flex items-center gap-1.5">
            <Utensils size={13} />
            {language === "ru" ? tour.mealRu : tour.mealEn}
          </span>
          <span className="col-span-2 flex items-center gap-1.5">
            <Plane size={13} />
            {t.departureLabel}: {tour.departureCity}
          </span>
        </div>

        <div className="mt-4 flex items-end justify-between gap-3">
          <div>
            {tour.oldPrice && (
              <p className="text-[11px] text-[#9aa19b] line-through">
                {formatPrice(tour.oldPrice, language)}
              </p>
            )}
            <p className="text-lg font-extrabold tracking-tight text-[#17211b] dark:text-white">
              {formatPrice(tour.price, language)}
            </p>
            <p className="text-[10px] text-[#7b847c] dark:text-[#91a096]">
              {t.perPerson} · {t.totalFor}{" "}
              {formatPrice(tour.price * Math.max(totalTravelers, 1), language)}
            </p>
          </div>
          <button
            type="button"
            onClick={onChoose}
            className="flex shrink-0 items-center gap-1.5 rounded-xl bg-[#17211b] px-3.5 py-2.5 text-xs font-bold text-white transition-colors hover:bg-[#2e3a32] dark:bg-[#f5f6f3] dark:text-[#0d1612] dark:hover:bg-white"
          >
            {t.choose}
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </article>
  );
}

function ModalFact({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2 rounded-xl bg-[#f1f3ef] px-3 py-2.5 font-semibold text-[#566159] dark:bg-[#1d2d24] dark:text-[#c2cec6]">
      {icon}
      <span className="truncate">{label}</span>
    </div>
  );
}

export default App;
