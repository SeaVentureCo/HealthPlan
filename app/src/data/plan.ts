// Weekly update: edit canteenMenu and currentWeek only
//
// This file is the single source of truth for all plan content.
// Components import from here — no hardcoded strings in UI.
//
// Each Sunday: bring next week's canteen menu and any plan tweaks to Claude
// in Cursor. Claude will produce the exact edit to the canteenMenu array
// below. The rest of this file rarely changes.

export type DayTag =
  | "strength"
  | "zone2"
  | "hiit"
  | "yoga"
  | "social"
  | "rest"
  | "travel";

export type Phase = "Reset" | "Build" | "Push" | "Peak" | "Arrive";

export interface DayPlan {
  name: string;
  tag: DayTag;
  detail: string;
}

export interface WeekPlan {
  weekNumber: number;
  label: string;
  dates: string;
  phase: Phase;
  days: DayPlan[];
}

export interface CanteenPick {
  label: string;
  type: "yes" | "ok" | "no";
}

export interface CanteenDay {
  day: string;
  training: string;
  verdict: string;
  picks: CanteenPick[];
}

export interface Exercise {
  name: string;
  sets: string;
  reps: string;
  note: string;
}

export interface WorkoutSession {
  day: string;
  location: string;
  exercises: Exercise[];
}

export interface MealSlot {
  slot: string;
  food: string;
  kcal: string;
}

export interface MealDay {
  day: string;
  meals: MealSlot[];
  total: string;
}

export interface PrepStep {
  time: string;
  title: string;
  detail: string;
}

export interface DailyRule {
  title: string;
  detail: string;
  accent: boolean;
}

export interface SetupItem {
  text: string;
  sub: string;
}

export interface Checkpoint {
  week: string;
  title: string;
  detail: string;
  urgent?: boolean;
}

export interface DailyStructureSlot {
  label: string;
  title: string;
  detail: string;
  kcal: string;
}

// ── DATES ─────────────────────────────────────────────────────────────
export const BERMUDA_DATE = new Date("2026-07-09T00:00:00Z");
export const PLAN_START_DATE = new Date("2026-04-20T00:00:00Z");

// Projected weight per week (Start, Wk1..Wk10)
export const PROJECTED_WEIGHTS: number[] = [
  90, 89.1, 88.1, 87.0, 86.0, 85.0, 84.0, 83.0, 82.1, 81.2, 80.5,
];

// ── WEEKS ─────────────────────────────────────────────────────────────
export const weeks: WeekPlan[] = [
  {
    weekNumber: 1,
    label: "Week 1",
    dates: "20–26 Apr",
    phase: "Reset",
    days: [
      { name: "Monday", tag: "strength", detail: "Upper push — Beethovenstraat, 19:30. Bench, OHP, incline DB, lateral raises, tricep pushdowns." },
      { name: "Tuesday", tag: "zone2", detail: "35–40 min run or cycling — outdoors or Beethovenstraat, 19:30." },
      { name: "Wednesday", tag: "hiit", detail: "HIIT class — Koningsweg, pre-booked 19:30. End by 20:15." },
      { name: "Thursday", tag: "social", detail: "Office drinks — full rest day. Eat protein before going out." },
      { name: "Friday", tag: "strength", detail: "Upper pull — Beethovenstraat, 19:00. Row, pull-ups, cable row, face pulls, curls." },
      { name: "Saturday", tag: "strength", detail: "Lower body — Beethovenstraat, 10:00. Squat, RDL, leg press, lunges, leg curl." },
      { name: "Sunday", tag: "yoga", detail: "Yoga class — Koningsweg morning. Meal prep after — 9 meals, 2 hrs." },
    ],
  },
  {
    weekNumber: 2,
    label: "Week 2",
    dates: "27 Apr–3 May",
    phase: "Reset",
    days: [
      { name: "Monday", tag: "strength", detail: "Upper push — increase weight if last week felt easy." },
      { name: "Tuesday", tag: "zone2", detail: "35–40 min — maintain or beat last week's pace." },
      { name: "Wednesday", tag: "hiit", detail: "HIIT class — Koningsweg. Push harder than week 1." },
      { name: "Thursday", tag: "social", detail: "Office drinks — rest day." },
      { name: "Friday", tag: "strength", detail: "Upper pull — progressive overload, heavier than week 1." },
      { name: "Saturday", tag: "strength", detail: "Lower body — add weight to squat and deadlift." },
      { name: "Sunday", tag: "yoga", detail: "Yoga — Koningsweg. Meal prep with rotated dinner recipe." },
    ],
  },
  {
    weekNumber: 3,
    label: "Week 3",
    dates: "4–10 May",
    phase: "Build",
    days: [
      { name: "Monday", tag: "strength", detail: "Upper push — come back to Claude for recipe rotation + check-in." },
      { name: "Tuesday", tag: "zone2", detail: "40 min — increase duration by 5 min this week." },
      { name: "Wednesday", tag: "hiit", detail: "HIIT class — Koningsweg. Max effort every interval." },
      { name: "Thursday", tag: "social", detail: "Office drinks — rest day." },
      { name: "Friday", tag: "strength", detail: "Upper pull — heavier than week 2." },
      { name: "Saturday", tag: "strength", detail: "Lower body — push the squat." },
      { name: "Sunday", tag: "yoga", detail: "Yoga + meal prep with new batch recipes." },
    ],
  },
  {
    weekNumber: 4,
    label: "Week 4",
    dates: "11–17 May",
    phase: "Build",
    days: [
      { name: "Monday", tag: "strength", detail: "Upper push — week 4 check-in + refeed day assessment." },
      { name: "Tuesday", tag: "zone2", detail: "40–45 min Zone 2." },
      { name: "Wednesday", tag: "hiit", detail: "HIIT class — Koningsweg." },
      { name: "Thursday", tag: "social", detail: "Office drinks — consider 1 drink only from week 4 onwards." },
      { name: "Friday", tag: "strength", detail: "Upper pull." },
      { name: "Saturday", tag: "strength", detail: "Lower body — refeed day if flagged." },
      { name: "Sunday", tag: "yoga", detail: "Yoga + meal prep." },
    ],
  },
  {
    weekNumber: 5,
    label: "Week 5",
    dates: "18–24 May",
    phase: "Push",
    days: [
      { name: "Monday", tag: "strength", detail: "Upper push — carb cycling starts this week. Come back to Claude." },
      { name: "Tuesday", tag: "zone2", detail: "45 min — pace should be improving." },
      { name: "Wednesday", tag: "hiit", detail: "HIIT class — Koningsweg. Peak effort." },
      { name: "Thursday", tag: "social", detail: "Office drinks — rest day." },
      { name: "Friday", tag: "strength", detail: "Upper pull." },
      { name: "Saturday", tag: "strength", detail: "Lower body." },
      { name: "Sunday", tag: "yoga", detail: "Yoga + meal prep." },
    ],
  },
  {
    weekNumber: 6,
    label: "Week 6",
    dates: "25–31 May",
    phase: "Push",
    days: [
      { name: "Monday", tag: "strength", detail: "Upper push." },
      { name: "Tuesday", tag: "zone2", detail: "45 min Zone 2." },
      { name: "Wednesday", tag: "hiit", detail: "HIIT class — Koningsweg." },
      { name: "Thursday", tag: "social", detail: "Office drinks." },
      { name: "Friday", tag: "strength", detail: "Upper pull." },
      { name: "Saturday", tag: "strength", detail: "Lower body." },
      { name: "Sunday", tag: "yoga", detail: "Yoga + meal prep." },
    ],
  },
  {
    weekNumber: 7,
    label: "Week 7",
    dates: "1–7 Jun",
    phase: "Push",
    days: [
      { name: "Monday", tag: "strength", detail: "Upper push." },
      { name: "Tuesday", tag: "zone2", detail: "50 min Zone 2." },
      { name: "Wednesday", tag: "hiit", detail: "HIIT class — Koningsweg." },
      { name: "Thursday", tag: "social", detail: "Office drinks." },
      { name: "Friday", tag: "strength", detail: "Upper pull." },
      { name: "Saturday", tag: "strength", detail: "Lower body." },
      { name: "Sunday", tag: "yoga", detail: "Yoga + meal prep." },
    ],
  },
  {
    weekNumber: 8,
    label: "Week 8",
    dates: "8–14 Jun",
    phase: "Peak",
    days: [
      { name: "Monday", tag: "strength", detail: "Upper push — come back to Claude for peak week plan + sodium strategy." },
      { name: "Tuesday", tag: "zone2", detail: "50 min Zone 2." },
      { name: "Wednesday", tag: "hiit", detail: "HIIT class — Koningsweg." },
      { name: "Thursday", tag: "social", detail: "Office drinks." },
      { name: "Friday", tag: "strength", detail: "Upper pull." },
      { name: "Saturday", tag: "strength", detail: "Lower body." },
      { name: "Sunday", tag: "yoga", detail: "Yoga + meal prep." },
    ],
  },
  {
    weekNumber: 9,
    label: "Week 9",
    dates: "15–21 Jun",
    phase: "Peak",
    days: [
      { name: "Monday", tag: "strength", detail: "Upper push — reduce rest periods." },
      { name: "Tuesday", tag: "zone2", detail: "50 min — sodium reduction now in effect." },
      { name: "Wednesday", tag: "hiit", detail: "HIIT class — Koningsweg." },
      { name: "Thursday", tag: "social", detail: "Office drinks — 1 drink max." },
      { name: "Friday", tag: "strength", detail: "Upper pull." },
      { name: "Saturday", tag: "strength", detail: "Lower body." },
      { name: "Sunday", tag: "yoga", detail: "Yoga + final full meal prep." },
    ],
  },
  {
    weekNumber: 10,
    label: "Week 10",
    dates: "22 Jun–9 Jul",
    phase: "Arrive",
    days: [
      { name: "Monday", tag: "strength", detail: "Upper push — lighter, pump-focused. High reps, shorter rest." },
      { name: "Tuesday", tag: "zone2", detail: "30 min easy — taper begins." },
      { name: "Wednesday", tag: "hiit", detail: "Last HIIT class — Koningsweg." },
      { name: "Thursday", tag: "social", detail: "Office drinks — no alcohol this week." },
      { name: "Friday", tag: "rest", detail: "Light walk only. Sodium cut. Drink 4L water." },
      { name: "Saturday", tag: "rest", detail: "Pack, rest, prep for travel. No training." },
      { name: "Sunday", tag: "travel", detail: "KL691 Amsterdam → Toronto, 02 Jul. You did it." },
    ],
  },
];

// ── CANTEEN MENU ──────────────────────────────────────────────────────
// 👇 Replace this each Sunday with the new week's menu. Nothing else needs
// to change. Keep the array length at 4 (Mon–Thu) unless the canteen runs Fri.
export const canteenMenu: CanteenDay[] = [
  {
    day: "Monday 20 Apr",
    training: "Upper push",
    verdict:
      "Go for the chicken curry — high protein, straightforward. Load the salad bar alongside. Skip the peanut soup (high calorie) and cheesecake.",
    picks: [
      { label: "Chicken curry", type: "yes" },
      { label: "Salad bar build", type: "yes" },
      { label: "Petjel salad (small)", type: "ok" },
      { label: "Surinamese tempeh", type: "ok" },
      { label: "Cheesecake", type: "no" },
      { label: "Canteen smoothie", type: "no" },
      { label: "3pm muffin", type: "no" },
    ],
  },
  {
    day: "Tuesday 21 Apr",
    training: "Zone 2",
    verdict:
      "Chicken mole is the pick — lean protein with a rich sauce. Go easy on the sauce if self-serving. Pico de gallo on the side is great. Skip the pasta salad.",
    picks: [
      { label: "Chicken mole", type: "yes" },
      { label: "Chili con tofu", type: "yes" },
      { label: "Pico de gallo", type: "yes" },
      { label: "Mexican bowl (no sour cream)", type: "ok" },
      { label: "Banana cake", type: "no" },
      { label: "Pasta salad", type: "no" },
      { label: "3pm cherry roll", type: "no" },
    ],
  },
  {
    day: "Wednesday 22 Apr",
    training: "HIIT class",
    verdict:
      "Beef steak is the highest protein option today — HIIT day, so you need it. Niçoise bowl gives you good fats. The green canteen smoothie is actually vegetable-based today — fine to have.",
    picks: [
      { label: "Beef steak", type: "yes" },
      { label: "Niçoise bowl", type: "yes" },
      { label: "Broccoli salad", type: "yes" },
      { label: "Green smoothie (veg-based)", type: "yes" },
      { label: "Quinoa & sweet potato stew", type: "ok" },
      { label: "Cheese kroket", type: "no" },
      { label: "Cinnamon roll", type: "no" },
    ],
  },
  {
    day: "Thursday 23 Apr",
    training: "Rest / social",
    verdict:
      "Rest day — lighter carbs ideally. Gnocchi with beef ragù is the protein star. Take half the gnocchi portion. Beef carpaccio from pick-and-mix is excellent — lean and high protein.",
    picks: [
      { label: "Beef ragù (½ gnocchi)", type: "yes" },
      { label: "Beef carpaccio", type: "yes" },
      { label: "Root vegetables salad", type: "yes" },
      { label: "Vegan caprese", type: "ok" },
      { label: "Pizza Margherita", type: "no" },
      { label: "Farinata", type: "no" },
      { label: "Dessert", type: "no" },
    ],
  },
];

// ── WORKOUTS ──────────────────────────────────────────────────────────
export const workoutSessions: WorkoutSession[] = [
  {
    day: "Monday — Upper push",
    location: "Trainmore Beethovenstraat · 19:30",
    exercises: [
      { name: "Barbell bench press", sets: "4", reps: "8–10", note: "Main compound — control the eccentric" },
      { name: "Overhead press", sets: "4", reps: "8–10", note: "Dumbbell or barbell" },
      { name: "Incline dumbbell press", sets: "3", reps: "10–12", note: "45° incline" },
      { name: "Lateral raises", sets: "3", reps: "15", note: "Light — strict form, no swinging" },
      { name: "Tricep pushdowns", sets: "3", reps: "12", note: "Cable, rope attachment" },
      { name: "Cable flyes", sets: "3", reps: "12", note: "Low to high for upper chest" },
    ],
  },
  {
    day: "Wednesday — HIIT class",
    location: "Trainmore Koningsweg · pre-booked 19:30",
    exercises: [
      { name: "Pre-booked group class", sets: "—", reps: "—", note: "Show up and follow the instructor. Push max effort every interval." },
      { name: "If no class: treadmill sprints", sets: "10–12×", reps: "40s on / 20s off", note: "5 min warmup, 5 min cooldown" },
    ],
  },
  {
    day: "Friday — Upper pull",
    location: "Trainmore Beethovenstraat · 19:00",
    exercises: [
      { name: "Barbell row", sets: "4", reps: "8–10", note: "Overhand grip, chest to bar" },
      { name: "Pull-ups or lat pulldown", sets: "4", reps: "max / 8", note: "Full range of motion" },
      { name: "Seated cable row", sets: "3", reps: "10–12", note: "Neutral grip, elbows close" },
      { name: "Face pulls", sets: "3", reps: "15", note: "Cable at head height — great for posture" },
      { name: "Hammer curls", sets: "3", reps: "12", note: "Neutral grip both arms" },
      { name: "Rear delt flyes", sets: "3", reps: "15", note: "Dumbbell or cable, light weight" },
    ],
  },
  {
    day: "Saturday — Lower body",
    location: "Trainmore Beethovenstraat · 10:00",
    exercises: [
      { name: "Barbell squat", sets: "4", reps: "6–8", note: "Primary compound — go heavy with good form" },
      { name: "Romanian deadlift", sets: "4", reps: "8–10", note: "Hinge at hips, feel the hamstring stretch" },
      { name: "Leg press", sets: "3", reps: "12", note: "Feet shoulder-width, full depth" },
      { name: "Walking lunges", sets: "3", reps: "12 each", note: "With dumbbells" },
      { name: "Leg curl", sets: "3", reps: "12", note: "Machine, slow eccentric" },
      { name: "Calf raises", sets: "4", reps: "15", note: "Full range — pause at the top" },
    ],
  },
];

// ── MEALS ─────────────────────────────────────────────────────────────
export const dailyStructure: DailyStructureSlot[] = [
  {
    label: "BREAKFAST · HOME",
    title: "Protein smoothie",
    detail: "2 scoops whey · frozen spinach · frozen berries · ½ banana · almond milk · 1 tbsp nut butter",
    kcal: "~500 kcal · 52g protein",
  },
  {
    label: "LUNCH · UBER CANTEEN",
    title: "Biggest meal of the day",
    detail: "Protein + veg first. Small carbs. Skip dessert, 3pm snacks and canteen smoothies always.",
    kcal: "~650 kcal · 55g protein",
  },
  {
    label: "DINNER · HOME (PREPPED)",
    title: "Pull from the fridge",
    detail: "Already made Sunday. Heat and eat within 10 min of getting home. No Uber Eats.",
    kcal: "~470 kcal · 50g protein",
  },
];

export const macroTargets = {
  protein: "185g",
  calories: "~1,850 (training day) · ~1,620 (rest day)",
  water: "3–4L",
};

export const weekendMeals: MealDay[] = [
  {
    day: "Saturday — training day (lower body)",
    total: "~1,850 kcal · ~185g protein",
    meals: [
      { slot: "Breakfast", food: "Protein smoothie — add 30g oats for extra carbs (training day)", kcal: "~560 kcal · 54g protein" },
      { slot: "Lunch (post-gym)", food: "Harissa chicken + quinoa-chickpea base + roasted veg", kcal: "~710 kcal · 59g protein · 50g carbs" },
      { slot: "Snack", food: "200g cottage cheese + rice cake or raw veg", kcal: "~160 kcal · 22g protein" },
      { slot: "Dinner", food: "Spiced turkey mince + roasted veg (no extra carbs)", kcal: "~420 kcal · 50g protein" },
    ],
  },
  {
    day: "Sunday — rest day (yoga only)",
    total: "~1,620 kcal · ~178g protein",
    meals: [
      { slot: "Breakfast (pre-yoga)", food: "Protein smoothie — standard, no oats", kcal: "~500 kcal · 52g protein" },
      { slot: "Lunch", food: "Harissa chicken + roasted veg + 150g cottage cheese", kcal: "~520 kcal · 60g protein · low carb" },
      { slot: "Snack", food: "200g Greek yoghurt + handful of berries", kcal: "~180 kcal · 16g protein" },
      { slot: "Dinner", food: "Spiced turkey mince + roasted veg + big leafy salad", kcal: "~420 kcal · 50g protein" },
    ],
  },
];

// ── PREP ──────────────────────────────────────────────────────────────
export const prepStats = {
  meals: "9",
  prepTime: "~2 hrs",
  containers: "9",
  estCost: "€28–35",
};

export const prepSteps: PrepStep[] = [
  { time: "13:00", title: "Oven on + air fryer ready", detail: "Season chicken thighs with harissa paste, olive oil, lemon, garlic. Set air fryer to 200°C. Start rice cooker with 160g dry quinoa." },
  { time: "13:10", title: "Air fry chicken thighs", detail: "800g chicken thighs into air fryer — 18–20 min at 200°C. Crispier and faster than oven. Do two batches if needed." },
  { time: "13:15", title: "Prep roast veg", detail: "Chop 2 courgettes, 2 red peppers, 1 red onion, 200g cherry tomatoes. Toss with olive oil, cumin, oregano, salt. Into the oven at 200°C for 25 min." },
  { time: "13:20", title: "Make spiced turkey mince", detail: "Brown 500g turkey mince. Add garlic, onion, tinned tomatoes, smoked paprika, cumin, chilli. Simmer 20 min uncovered until thick." },
  { time: "13:45", title: "Prep cottage cheese + snacks", detail: "Portion 2× 150g cottage cheese into small containers. Wash and chop raw veg snacks — cucumber, carrot, celery." },
  { time: "14:00", title: "Pull everything + assemble", detail: "Slice and portion chicken into 5 containers. Divide turkey mince into 4 containers. Portion roasted veg (9 portions). Weigh and portion quinoa-chickpea for Saturday." },
  { time: "14:30", title: "Label, fridge, done", detail: "All containers labelled (Mon dinner, Tue dinner... Sat lunch etc). Stack in fridge. Smoothie ingredients in freezer bags. You're set for the week." },
];

// ── RULES ─────────────────────────────────────────────────────────────
export const dailyRules: DailyRule[] = [
  { title: "185g protein — every day", detail: "Non-negotiable. Splits: ~52g breakfast smoothie, ~55g canteen lunch, ~50g prepped dinner, ~28g pre-gym shake.", accent: true },
  { title: "Protein smoothie before leaving home", detail: "Blender out the night before. 90 seconds. No excuses.", accent: false },
  { title: "No Uber Eats for dinner", detail: "Dinner is in the fridge. This one decision eliminates 90% of the problem.", accent: true },
  { title: "10,000 steps (check Garmin)", detail: "Walk to meetings, take stairs, walk home from gym. Free calorie burn.", accent: false },
  { title: "Phone down 22:30 — lights out 23:00", detail: "Sleep is where fat loss actually happens. Cortisol from poor sleep stores fat.", accent: true },
  { title: "3–4L water daily", detail: "Reduces false hunger signals, improves gym performance, flushes sodium.", accent: false },
  { title: "Skip dessert, 3pm snacks & canteen smoothies", detail: "Already doing this — keep it up every day without exception.", accent: false },
  { title: "Leave office by 19:00 on training days", detail: "Gym bag packed the night before. Non-negotiable exit time.", accent: true },
];

export const sleepProtocol = [
  { label: "PHONE DOWN", value: "22:30", color: "text" as const },
  { label: "LIGHTS OUT", value: "23:00", color: "text" as const },
  { label: "ALARM", value: "07:30", color: "amber" as const },
  { label: "SLEEP", value: "8.5h", color: "green" as const },
];

// ── DASHBOARD DAILY CHECKLIST ─────────────────────────────────────────
// Order matters — item_index in DB matches the position in this array.
export const dailyChecklistItems: string[] = [
  "Protein smoothie before leaving home",
  "Hit 185g protein target",
  "10,000 steps (check Garmin)",
  "Phone down 22:30 — lights out 23:00",
  "3–4L water",
  "No Uber Eats — dinner is in the fridge",
];

// ── SETUP ─────────────────────────────────────────────────────────────
export const setupItems: SetupItem[] = [
  { text: "Order Philips 7000 blender", sub: "Amazon — add to cart and order today" },
  { text: "Order MCIRCO 20-piece glass containers", sub: "Amazon — €35.99, arrives tomorrow" },
  { text: "Garmin charged + Garmin Connect set up", sub: "Enable HRV, Body Battery, sleep tracking — link to Strava" },
  { text: "Book Wednesday HIIT class — Trainmore Koningsweg", sub: "Book in advance so you can't cancel" },
  { text: "Book Sunday yoga class — Trainmore Koningsweg", sub: "Morning slot — done before meal prep" },
  { text: "Buy whey protein (1–2kg tub)", sub: "Optimum Nutrition Gold Standard or MyProtein Impact Whey" },
  { text: "Buy smoothie ingredients", sub: "Frozen spinach, frozen berries, almond milk, nut butter, bananas" },
  { text: "Saturday supermarket shop", sub: "After gym — buy everything for the Sunday cook" },
  { text: "Complete first Sunday meal prep", sub: "9 meals, ~2 hrs, label all containers before fridging" },
];

// ── CHECKPOINTS ───────────────────────────────────────────────────────
export const checkpoints: Checkpoint[] = [
  { week: "Now — this week", title: "Get the shopping list", detail: "Full supermarket list for Sunday cook + smoothie ingredients.", urgent: true },
  { week: "End of week 1", title: "First check-in", detail: "Log week 1 average weight. How did training feel? Any meals go wrong?", urgent: true },
  { week: "End of week 2", title: "Habit audit", detail: "Are non-negotiables sticking? Sleep improving? Review Garmin HRV data." },
  { week: "Week 3", title: "Recipe rotation", detail: "Rotate dinner batch recipes — new proteins and flavours so it doesn't feel repetitive." },
  { week: "Week 4", title: "Progress review + refeed", detail: "Weigh in and assess trend. Introduce a refeed day if adaptation is showing." },
  { week: "Week 5–7", title: "Carb cycling structure", detail: "Build a training vs rest day carb split to accelerate the cut in the push phase." },
  { week: "Week 8", title: "Peak week strategy", detail: "Sodium reduction plan, training taper, and what to eat in the final 7 days." },
  { week: "Week 10", title: "Bermuda arrival protocol", detail: "Final water cut, what to wear, how to feel your best walking off the plane 9 July." },
];

// ── HELPERS ───────────────────────────────────────────────────────────
export function daysToBermuda(now: Date = new Date()): number {
  return Math.max(0, Math.round((BERMUDA_DATE.getTime() - now.getTime()) / 86400000));
}

export function currentWeekIndex(now: Date = new Date()): number {
  const diff = Math.floor((now.getTime() - PLAN_START_DATE.getTime()) / 86400000 / 7);
  return Math.max(0, Math.min(9, diff));
}

export function phaseColor(phase: Phase): string {
  switch (phase) {
    case "Reset": return "blue";
    case "Build": return "green";
    case "Push": return "coral";
    case "Peak": return "amber";
    case "Arrive": return "purple";
  }
}

export function tagColor(tag: DayTag): string {
  switch (tag) {
    case "strength": return "blue";
    case "zone2": return "green";
    case "hiit": return "coral";
    case "yoga": return "purple";
    case "social": return "pink";
    case "rest": return "muted";
    case "travel": return "amber";
  }
}

export function tagLabel(tag: DayTag): string {
  switch (tag) {
    case "strength": return "Strength";
    case "zone2": return "Zone 2";
    case "hiit": return "HIIT class";
    case "yoga": return "Yoga";
    case "social": return "Social";
    case "rest": return "Rest";
    case "travel": return "Travel";
  }
}
