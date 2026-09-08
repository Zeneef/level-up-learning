import valorant from "@/assets/thumb-valorant.jpg";
import cs2 from "@/assets/thumb-cs2.jpg";
import lol from "@/assets/thumb-lol.jpg";
import fortnite from "@/assets/thumb-fortnite.jpg";
import minecraft from "@/assets/thumb-minecraft.jpg";

export type Game = {
  slug: string;
  name: string;
  art: string;
  tagline: string;
  courses: number;
  players: string;
};

export const games: Game[] = [
  {
    slug: "valorant",
    name: "VALORANT",
    art: valorant,
    tagline: "Aim, agents, and ranked climbing",
    courses: 148,
    players: "62k",
  },
  {
    slug: "counter-strike",
    name: "Counter-Strike 2",
    art: cs2,
    tagline: "Utility, spray control, and IGL craft",
    courses: 96,
    players: "41k",
  },
  {
    slug: "league-of-legends",
    name: "League of Legends",
    art: lol,
    tagline: "Laning, macro, and jungle tempo",
    courses: 112,
    players: "55k",
  },
  {
    slug: "fortnite",
    name: "Fortnite",
    art: fortnite,
    tagline: "Building, editing, and endgames",
    courses: 74,
    players: "38k",
  },
  {
    slug: "minecraft",
    name: "Minecraft",
    art: minecraft,
    tagline: "Redstone, farms, and speedruns",
    courses: 53,
    players: "29k",
  },
];

export const categories = [
  { slug: "aim-training", name: "Aim Training", courses: 62 },
  { slug: "game-sense", name: "Game Sense", courses: 48 },
  { slug: "movement", name: "Movement & Mechanics", courses: 39 },
  { slug: "ranked-climbing", name: "Ranked Climbing", courses: 57 },
  { slug: "team-strategy", name: "Team Strategy", courses: 31 },
  { slug: "settings-setup", name: "Settings & Setup", courses: 24 },
];

export type Creator = {
  username: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  rating: number;
  students: number;
  badge: string;
  gamesPlayed: string[];
  achievements: string[];
  socials: { label: string; handle: string }[];
};

export const creators: Creator[] = [
  {
    username: "fytch",
    name: "Fytch",
    role: "VALORANT Coach",
    bio: "Helping players climb from Diamond to Radiant. 6 years of coaching, 3 seasons of Tier-2 play.",
    avatar: "FY",
    rating: 4.9,
    students: 18420,
    badge: "Top Creator",
    gamesPlayed: ["VALORANT"],
    achievements: ["Radiant 12x", "Tier-2 coach", "1.8k reviews"],
    socials: [
      { label: "Twitch", handle: "twitch.tv/fytch" },
      { label: "X", handle: "@fytch" },
    ],
  },
  {
    username: "novaline",
    name: "Novaline",
    role: "CS2 Analyst",
    bio: "Ex-analyst turned educator. I teach the utility discipline that separates Faceit 8 from Faceit 10.",
    avatar: "NV",
    rating: 4.8,
    students: 9210,
    badge: "Trusted Creator",
    gamesPlayed: ["Counter-Strike 2"],
    achievements: ["Faceit 10", "Team analyst", "Level design consultant"],
    socials: [{ label: "X", handle: "@novaline" }],
  },
  {
    username: "kaelith",
    name: "Kaelith",
    role: "League Macro Coach",
    bio: "Challenger jungler. Macro, tempo, and win conditions explained without the jargon.",
    avatar: "KA",
    rating: 4.9,
    students: 14030,
    badge: "Expert",
    gamesPlayed: ["League of Legends"],
    achievements: ["Challenger 5x", "Academy coach"],
    socials: [{ label: "YouTube", handle: "youtube.com/kaelith" }],
  },
  {
    username: "brixel",
    name: "Brixel",
    role: "Fortnite Creator",
    bio: "Building and endgame specialist. Zero-build player? I have a track for you too.",
    avatar: "BX",
    rating: 4.7,
    students: 7640,
    badge: "Rising Creator",
    gamesPlayed: ["Fortnite"],
    achievements: ["FNCS qualifier", "Creative map designer"],
    socials: [{ label: "Twitch", handle: "twitch.tv/brixel" }],
  },
  {
    username: "redstonia",
    name: "Redstonia",
    role: "Minecraft Engineer",
    bio: "Redstone engineer and technical builder. Farms that actually keep up with your world.",
    avatar: "RS",
    rating: 4.8,
    students: 6120,
    badge: "Community Favorite",
    gamesPlayed: ["Minecraft"],
    achievements: ["Technical MC contributor", "500+ builds"],
    socials: [{ label: "YouTube", handle: "youtube.com/redstonia" }],
  },
];

export type Lesson = {
  slug: string;
  title: string;
  type: "video" | "text";
  minutes: number;
};
export type Module = { title: string; lessons: Lesson[] };

const standardCurriculum: Module[] = [
  {
    title: "Module 1 — Fundamentals",
    lessons: [
      { slug: "introduction", title: "Introduction", type: "video", minutes: 6 },
      { slug: "core-mechanics", title: "Core Mechanics", type: "video", minutes: 14 },
      { slug: "essential-settings", title: "Essential Settings", type: "text", minutes: 9 },
    ],
  },
  {
    title: "Module 2 — Improvement",
    lessons: [
      { slug: "practice-methods", title: "Practice Methods", type: "video", minutes: 18 },
      { slug: "common-mistakes", title: "Common Mistakes", type: "text", minutes: 11 },
      { slug: "advanced-techniques", title: "Advanced Techniques", type: "video", minutes: 22 },
    ],
  },
  {
    title: "Module 3 — Competitive",
    lessons: [
      { slug: "game-reading", title: "Game Reading", type: "video", minutes: 17 },
      { slug: "decision-making", title: "Decision Making", type: "text", minutes: 12 },
      { slug: "advanced-strategies", title: "Advanced Strategies", type: "video", minutes: 24 },
    ],
  },
];

export type Course = {
  slug: string;
  title: string;
  gameSlug: string;
  category: string;
  creator: string;
  thumb: string;
  short: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  students: number;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  hours: number;
  badge?: "Bestseller" | "New";
  trending: number;
  publishedDaysAgo: number;
  outcomes: string[];
  modules: Module[];
  progress?: number;
};

function course(c: Omit<Course, "modules" | "outcomes"> & Partial<Course>): Course {
  return {
    modules: standardCurriculum,
    outcomes: [
      "Build a practice routine you can actually keep",
      "Read fights before they happen instead of reacting",
      "Fix the three habits that stall most players at your rank",
      "Translate mechanics into consistent ranked wins",
    ],
    ...c,
  } as Course;
}

export const coursesData: Course[] = [
  course({
    slug: "radiant-aim-system",
    title: "Radiant Aim System",
    gameSlug: "valorant",
    category: "aim-training",
    creator: "fytch",
    thumb: valorant,
    short:
      "The exact aim framework I use with Immortal and Radiant students — crosshair placement, micro-adjust drills, and duel discipline.",
    price: 39,
    originalPrice: 59,
    rating: 4.9,
    reviews: 1842,
    students: 12480,
    difficulty: "Intermediate",
    hours: 6.5,
    badge: "Bestseller",
    trending: 98,
    publishedDaysAgo: 120,
    progress: 42,
  }),
  course({
    slug: "advanced-jett-mechanics",
    title: "Advanced Jett Mechanics",
    gameSlug: "valorant",
    category: "movement",
    creator: "fytch",
    thumb: valorant,
    short: "Updrafts, dash timings, and entry patterns that survive coordinated defenses.",
    price: 29,
    rating: 4.8,
    reviews: 903,
    students: 6210,
    difficulty: "Advanced",
    hours: 4.2,
    trending: 91,
    publishedDaysAgo: 40,
    progress: 12,
  }),
  course({
    slug: "competitive-game-sense",
    title: "Competitive Game Sense",
    gameSlug: "valorant",
    category: "game-sense",
    creator: "fytch",
    thumb: valorant,
    short: "Round reading, economy calls, and mid-round adaptation for solo queue climbers.",
    price: 0,
    rating: 4.7,
    reviews: 512,
    students: 20140,
    difficulty: "Beginner",
    hours: 3.1,
    trending: 88,
    publishedDaysAgo: 15,
    badge: "New",
  }),
  course({
    slug: "cs2-utility-mastery",
    title: "CS2 Utility Mastery",
    gameSlug: "counter-strike",
    category: "team-strategy",
    creator: "novaline",
    thumb: cs2,
    short: "Smokes, flashes and molly timings per map, with the reasoning behind every lineup.",
    price: 45,
    originalPrice: 65,
    rating: 4.9,
    reviews: 1104,
    students: 8930,
    difficulty: "Intermediate",
    hours: 7.4,
    badge: "Bestseller",
    trending: 95,
    publishedDaysAgo: 200,
  }),
  course({
    slug: "spray-control-lab",
    title: "Spray Control Lab",
    gameSlug: "counter-strike",
    category: "aim-training",
    creator: "novaline",
    thumb: cs2,
    short: "Recoil patterns, counter-strafing, and the drills that make them muscle memory.",
    price: 19,
    rating: 4.6,
    reviews: 388,
    students: 4120,
    difficulty: "Beginner",
    hours: 2.8,
    trending: 74,
    publishedDaysAgo: 9,
    badge: "New",
  }),
  course({
    slug: "jungle-tempo-blueprint",
    title: "Jungle Tempo Blueprint",
    gameSlug: "league-of-legends",
    category: "game-sense",
    creator: "kaelith",
    thumb: lol,
    short: "Pathing, tempo windows and objective setup from a 5x Challenger jungler.",
    price: 35,
    rating: 4.9,
    reviews: 972,
    students: 9880,
    difficulty: "Advanced",
    hours: 5.6,
    badge: "Bestseller",
    trending: 93,
    publishedDaysAgo: 90,
    progress: 78,
  }),
  course({
    slug: "laning-fundamentals",
    title: "Laning Fundamentals",
    gameSlug: "league-of-legends",
    category: "ranked-climbing",
    creator: "kaelith",
    thumb: lol,
    short: "Wave management and trading patterns explained without the jargon.",
    price: 0,
    rating: 4.7,
    reviews: 604,
    students: 15320,
    difficulty: "Beginner",
    hours: 3.4,
    trending: 81,
    publishedDaysAgo: 30,
  }),
  course({
    slug: "building-and-endgames",
    title: "Building & Endgames",
    gameSlug: "fortnite",
    category: "movement",
    creator: "brixel",
    thumb: fortnite,
    short: "Piece control, edit flow and endgame positioning for competitive lobbies.",
    price: 25,
    originalPrice: 40,
    rating: 4.7,
    reviews: 441,
    students: 5210,
    difficulty: "Intermediate",
    hours: 4.9,
    trending: 86,
    publishedDaysAgo: 55,
  }),
  course({
    slug: "zero-build-domination",
    title: "Zero Build Domination",
    gameSlug: "fortnite",
    category: "ranked-climbing",
    creator: "brixel",
    thumb: fortnite,
    short: "Cover usage, rotations and loadout theory for no-build ranked.",
    price: 18,
    rating: 4.5,
    reviews: 213,
    students: 2410,
    difficulty: "Beginner",
    hours: 2.4,
    trending: 69,
    publishedDaysAgo: 6,
    badge: "New",
  }),
  course({
    slug: "redstone-engineering",
    title: "Redstone Engineering",
    gameSlug: "minecraft",
    category: "settings-setup",
    creator: "redstonia",
    thumb: minecraft,
    short: "From repeaters to fully automated farms — circuits explained visually.",
    price: 22,
    rating: 4.8,
    reviews: 655,
    students: 7420,
    difficulty: "Intermediate",
    hours: 6.1,
    badge: "Bestseller",
    trending: 84,
    publishedDaysAgo: 150,
  }),
  course({
    slug: "speedrun-foundations",
    title: "Speedrun Foundations",
    gameSlug: "minecraft",
    category: "game-sense",
    creator: "redstonia",
    thumb: minecraft,
    short: "Route planning, RNG management and the practice loop for sub-20 runs.",
    price: 15,
    rating: 4.6,
    reviews: 190,
    students: 1980,
    difficulty: "Advanced",
    hours: 3.8,
    trending: 72,
    publishedDaysAgo: 21,
  }),
];

export const getGame = (slug: string) => games.find((g) => g.slug === slug);
export const getCourse = (slug: string) => coursesData.find((c) => c.slug === slug);
export const getCreator = (username: string) => creators.find((c) => c.username === username);
export const creatorOf = (course: Course) => getCreator(course.creator)!;
export const gameOf = (course: Course) => getGame(course.gameSlug)!;
export const categoryName = (slug: string) =>
  categories.find((c) => c.slug === slug)?.name ?? slug;

export const lessonCount = (c: Course) =>
  c.modules.reduce((n, m) => n + m.lessons.length, 0);

export const flatLessons = (c: Course) =>
  c.modules.flatMap((m, mi) => m.lessons.map((l) => ({ ...l, module: m.title, moduleIndex: mi })));

export const reviewsData = [
  {
    name: "Aeryn",
    avatar: "AE",
    rating: 5,
    date: "2 weeks ago",
    verified: true,
    text: "Went from Plat 2 to Diamond 3 in a month. The micro-adjust drills alone were worth the price.",
  },
  {
    name: "Kobo",
    avatar: "KO",
    rating: 5,
    date: "1 month ago",
    verified: true,
    text: "Structured, no filler, and every lesson ends with something I can practice the same night.",
  },
  {
    name: "Silv",
    avatar: "SI",
    rating: 4,
    date: "2 months ago",
    verified: true,
    text: "Great content. I would have liked a couple more demo reviews, but the framework is solid.",
  },
];

export const faqs = [
  {
    q: "Do I keep access forever?",
    a: "Yes. Once you enroll, the course stays in My Courses along with your progress and notes.",
  },
  {
    q: "What if the game gets patched?",
    a: "Creators update their curriculum after major patches, and updates are free for enrolled students.",
  },
  {
    q: "Is there a refund policy?",
    a: "Paid courses are refundable within 14 days if you have completed less than 30% of the lessons.",
  },
  {
    q: "What rank should I be?",
    a: "Each course lists a difficulty. Beginner tracks assume no competitive experience at all.",
  },
];
