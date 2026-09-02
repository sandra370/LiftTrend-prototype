const screens = {
  "today-screen": "Today",
  "trends-screen": "Trends",
  "coach-screen": "AI Coach",
  "profile-screen": "Profile",
};

const title = document.querySelector("#screen-title");
const navItems = document.querySelectorAll(".nav-item");
const screenEls = document.querySelectorAll(".screen");
const workoutSheet = document.querySelector("[data-workout-sheet]");
const workoutTitle = document.querySelector("[data-workout-title]");
const workoutStatus = document.querySelector("[data-workout-status]");
const workoutHeading = document.querySelector("[data-workout-heading]");
const workoutCount = document.querySelector("[data-workout-count]");
const exerciseList = document.querySelector("[data-exercise-list]");
const focusStart = document.querySelector("[data-focus-start]");
const workoutSession = document.querySelector("[data-workout-session]");
const todaySummary = document.querySelector("[data-today-summary]");
const summaryTitle = document.querySelector("[data-summary-title]");
const summaryNote = document.querySelector("[data-summary-note]");
const summaryExerciseCount = document.querySelector("[data-summary-exercise-count]");
const summaryExercises = document.querySelector("[data-summary-exercises]");
const summaryStandardName = document.querySelector("[data-summary-standard-name]");
const summaryTrendsNote = document.querySelector("[data-summary-trends-note]");
const profileHome = document.querySelector("[data-profile-home]");
const profileDetailPanel = document.querySelector("[data-profile-detail-panel]");
const profileDetailTitle = document.querySelector("[data-profile-detail-title]");
const profileDetailCopy = document.querySelector("[data-profile-detail-copy]");
const profileDetailBody = document.querySelector("[data-profile-detail-body]");
const profileBackButton = document.querySelector("[data-profile-back]");
const trendManager = document.querySelector("[data-trend-manager]");
const trendOptions = document.querySelector("[data-trend-options]");
const trendManagerNote = document.querySelector("[data-trend-manager-note]");
const bodyMetricGrid = document.querySelector("[data-body-metric-grid]");
const trendsFreshness = document.querySelector("[data-trends-freshness]");
const addExerciseSheet = document.querySelector("[data-add-exercise-sheet]");
const standardsSheet = document.querySelector("[data-standards-sheet]");
const standardsList = document.querySelector("[data-standards-list]");
const standardsSearch = document.querySelector("[data-standards-search]");
const workoutSwitchWarning = document.querySelector("[data-workout-switch-warning]");
const workoutSwitchTitle = document.querySelector("[data-workout-switch-title]");
const workoutSwitchCopy = document.querySelector("[data-workout-switch-copy]");
const coachSignals = document.querySelector("[data-coach-signals]");
const coachDataScope = document.querySelector("[data-coach-data-scope]");
const coachCardList = document.querySelector("[data-coach-card-list]");
const coachEngineTitle = document.querySelector("[data-coach-engine-title]");
const coachEngineCopy = document.querySelector("[data-coach-engine-copy]");
const showLaterCoach = document.querySelector("[data-show-later-coach]");
const onboarding = document.querySelector("[data-onboarding]");
const profileName = document.querySelector("[data-profile-name]");
const profileSubtitle = document.querySelector("[data-profile-subtitle]");
const profilePersonalSummary = document.querySelector("[data-profile-personal-summary]");
const profileRecordingCount = document.querySelector("[data-profile-recording-count]");
const profileActiveCalories = document.querySelector("[data-profile-active-calories]");
const profileTrainingTime = document.querySelector("[data-profile-training-time]");
const statusTime = document.querySelector("[data-status-time]");
const statusSignal = document.querySelector("[data-status-signal]");
const statusBattery = document.querySelector("[data-status-battery]");
const watchHeartRate = document.querySelector("[data-watch-heart-rate]");
const watchCalories = document.querySelector("[data-watch-calories]");
const watchTime = document.querySelector("[data-watch-time]");
const summaryCalories = document.querySelector("[data-summary-calories]");
const summaryTime = document.querySelector("[data-summary-time]");
const activeSessionPanel = document.querySelector("[data-active-session-panel]");
const activeSessionTitle = document.querySelector("[data-active-session-title]");
const activeSessionCopy = document.querySelector("[data-active-session-copy]");
const toast = document.querySelector("[data-toast]");
const onboardingStorageKey = "lifttrendOnboardingComplete";
const appStateStorageKey = "lifttrendPrototypeState";
const activeWorkoutStorageKey = "lifttrendActiveWorkoutSession";
const appStateVersion = 2;
const Domain = window.LiftTrendDomain;
let profileReturnScreen = "";
let activeProfileDetailKey = "";
let lastSetSubmission = { signature: "", at: 0 };
let lastWorkoutFinish = { signature: "", at: 0 };
let lastExerciseAdd = { signature: "", at: 0 };
let lastStandardStart = { id: "", at: 0 };
let draggedExerciseCard = null;
let pointerDragState = null;

const workouts = {
  glute: {
    title: "Glute Focus",
    status: "Recording set 3 of Hip Thrust",
    template: "glute-template",
  },
  shoulder: {
    title: "Shoulder Strength",
    status: "Recording set 2 of Lateral Raise",
    template: "shoulder-template",
  },
  back: {
    title: "Back Focus",
    status: "Recording set 1 of Lat Pulldown",
    template: "back-template",
  },
  chest: {
    title: "Chest Focus",
    status: "Recording set 2 of Chest Press",
    template: "chest-template",
  },
  abs: {
    title: "Abs Focus",
    status: "Recording set 1 of Cable Crunch",
    template: "abs-template",
  },
  arms: {
    title: "Arms Focus",
    status: "Recording set 1 of Dumbbell Curl",
    template: "arms-template",
  },
  recovery: {
    title: "Recovery Flow",
    status: "Recording block 1 of Mobility Flow",
    template: "recovery-template",
  },
  custom: {
    title: "Custom Workout",
    status: "Add your first exercise",
    template: "custom-template",
  },
};

const sessionFocusGroups = [
  { key: "chest", label: "Chest", readout: "chest", className: "chest", alwaysShow: true },
  { key: "shoulders", label: "Shoulders", readout: "shoulder", className: "shoulder", alwaysShow: true },
  { key: "back", label: "Back", readout: "back", className: "back", alwaysShow: true },
  { key: "glutes", label: "Glutes/Legs", readout: "glute/leg", className: "glute", alwaysShow: true },
  { key: "abs", label: "Abs", readout: "abs", className: "abs" },
  { key: "arms", label: "Arms", readout: "arms", className: "arms" },
  { key: "recovery", label: "Recovery", readout: "recovery", className: "recovery" },
  { key: "cardio", label: "Cardio", readout: "cardio", className: "cardio" },
  { key: "custom", label: "Custom", readout: "custom", className: "custom" },
  { key: "other", label: "Other", readout: "other", className: "custom" },
];

const exerciseTrends = {
  hipThrust: {
    title: "Hip Thrust",
    heights: ["48%", "56%", "64%", "72%"],
    note: "Best used within one exercise: this shows whether hip thrust work is progressing without comparing it to unrelated lifts.",
  },
  chestPress: {
    title: "Chest Press",
    heights: ["42%", "46%", "55%", "61%"],
    note: "Chest press volume is trending up steadily. This is more useful than comparing chest press pounds against hip thrust pounds.",
  },
  lateralRaise: {
    title: "Lateral Raise",
    heights: ["38%", "52%", "62%", "62%"],
    note: "Lateral raise has flattened for two weeks. This is where AI can suggest adding reps or moving from 7.5 lb to 10 lb.",
  },
  latPulldown: {
    title: "Lat Pulldown",
    heights: ["44%", "44%", "51%", "58%"],
    note: "Lat pulldown is moving again after a flat week. Keep the same load until reps are clean across all sets.",
  },
  inclinePress: {
    title: "Incline Press",
    heights: ["35%", "48%", "48%", "57%"],
    note: "Incline press has enough history to track now. Add it here when chest strength is your current focus.",
  },
  dumbbellCurl: {
    title: "Dumbbell Curl",
    heights: ["30%", "42%", "49%", "49%"],
    note: "Dumbbell curl is pinned from your recorded arms sessions. It is flat this week, so add reps before increasing weight.",
  },
  cableCrunch: {
    title: "Cable Crunch",
    heights: ["28%", "36%", "45%", "54%"],
    note: "Cable crunch volume is rising steadily. Keep form strict and avoid turning this into hip flexor work.",
  },
  deadBug: {
    title: "Dead Bug",
    heights: ["32%", "32%", "40%", "44%"],
    note: "Dead bug is logged as bodyweight volume. Track it for consistency and control rather than load.",
  },
  rowErg: {
    title: "Row Erg",
    heights: ["30%", "42%", "55%", "68%"],
    note: "Row Erg trends should track distance, not lifting volume.",
  },
  treadmillWalk: {
    title: "Treadmill Walk",
    heights: ["36%", "44%", "50%", "62%"],
    note: "Walking trends should track time or distance instead of reps.",
  },
  foamRolling: {
    title: "Foam Rolling",
    heights: ["34%", "40%", "46%", "50%"],
    note: "Recovery trends are best tracked by minutes completed.",
  },
};

const recordedExerciseOrder = [
  "hipThrust",
  "chestPress",
  "lateralRaise",
  "latPulldown",
  "inclinePress",
  "dumbbellCurl",
  "cableCrunch",
  "deadBug",
  "rowErg",
  "treadmillWalk",
  "foamRolling",
];

const exerciseCatalog = {
  "Lat Pulldown": { group: "Back", target: "target 3 x 10", search: "lat pulldown back lats pull" },
  "Seated Row": { group: "Back", target: "target 3 x 10", search: "seated row cable row back lats rhomboids" },
  "Face Pull": { group: "Rear delts", target: "target 3 x 15", search: "face pull shoulders rear delt deltoid upper back rotator cuff" },
  "Chest Press": { group: "Chest", target: "target 3 x 10", search: "chest press pecs push machine" },
  "Incline Dumbbell Press": { group: "Upper chest", target: "target 3 x 8", search: "incline dumbbell press upper chest pecs push" },
  "Cable Fly": { group: "Chest", target: "target 3 x 12", search: "cable fly chest pecs flye" },
  "Lateral Raise": { group: "Side delts", target: "target 3 x 12", search: "lateral raise side delts shoulders deltoid" },
  "Dumbbell Shoulder Press": { group: "Shoulders", target: "target 3 x 8", search: "dumbbell shoulder press overhead press delts" },
  "Rear Delt Fly": { group: "Rear delts", target: "target 3 x 12", search: "rear delt fly reverse fly shoulders posterior deltoid" },
  "Hip Thrust": { group: "Glutes", target: "target 4 x 10", search: "hip thrust glutes bridge" },
  "Cable Kickback": { group: "Glutes", target: "target 3 x 12", search: "cable kickback glutes" },
  "Romanian Deadlift": { group: "Hamstrings", target: "target 3 x 10", search: "romanian deadlift rdl hamstrings glutes hinge" },
  "Goblet Squat": { group: "Quads", target: "target 3 x 10", search: "goblet squat quads legs" },
  "Dumbbell Curl": { group: "Biceps", target: "target 3 x 10", search: "dumbbell curl biceps arms" },
  "Triceps Pressdown": { group: "Triceps", target: "target 3 x 12", search: "triceps pressdown pushdown arms cable" },
  "Hammer Curl": { group: "Biceps", target: "target 2 x 12", search: "hammer curl biceps brachialis arms" },
  "Cable Crunch": { group: "Abs", target: "target 3 x 12", search: "cable crunch abs core" },
  "Dead Bug": { group: "Abs", target: "target 3 x 10/side", search: "dead bug abs core stability" },
  "Plank": { group: "Core", target: "target 3 x 45 sec", search: "plank core abs isometric" },
  "Mobility Flow": { group: "Recovery", target: "easy movement · 10 min", search: "mobility flow recovery stretch warmup" },
  "Light Lat Pulldown": { group: "Recovery", target: "easy pull · 2 x 15", search: "light lat pulldown recovery back easy pull" },
  "Custom Exercise": { group: "Custom", target: "target 3 x 10", search: "custom exercise own movement" },
};

Object.assign(exerciseCatalog, {
  "Pull-Up": { group: "Back", target: "target 3 x 6", search: "pull up back lats bodyweight vertical pull" },
  "Assisted Pull-Up": { group: "Back", target: "target 3 x 8", search: "assisted pull up back lats machine" },
  "Single-Arm Dumbbell Row": { group: "Back", target: "target 3 x 10/side", search: "single arm dumbbell row back lats rhomboids" },
  "Chest-Supported Row": { group: "Back", target: "target 3 x 10", search: "chest supported row back upper back" },
  "Barbell Row": { group: "Back", target: "target 3 x 8", search: "barbell row back lats hinge" },
  "Straight-Arm Pulldown": { group: "Lats", target: "target 3 x 12", search: "straight arm pulldown lats cable back" },
  "Back Extension": { group: "Erector spinae", target: "target 3 x 12", search: "back extension erector spinae posterior chain" },
  "Machine Chest Press": { group: "Chest", target: "target 3 x 10", search: "machine chest press pecs push" },
  "Push-Up": { group: "Chest", target: "target 3 x 10", search: "push up chest triceps bodyweight" },
  "Bench Press": { group: "Chest", target: "target 3 x 8", search: "bench press chest barbell pecs" },
  "Dumbbell Bench Press": { group: "Chest", target: "target 3 x 10", search: "dumbbell bench press chest pecs" },
  "Pec Deck": { group: "Chest", target: "target 3 x 12", search: "pec deck chest fly machine" },
  "Low-to-High Cable Fly": { group: "Upper chest", target: "target 3 x 12", search: "low to high cable fly upper chest" },
  "Overhead Press": { group: "Shoulders", target: "target 3 x 8", search: "overhead press shoulders delts barbell" },
  "Arnold Press": { group: "Shoulders", target: "target 3 x 10", search: "arnold press shoulders dumbbell" },
  "Cable Lateral Raise": { group: "Side delts", target: "target 3 x 12", search: "cable lateral raise side delts shoulders" },
  "Front Raise": { group: "Front delts", target: "target 3 x 12", search: "front raise anterior delts shoulders" },
  "Upright Row": { group: "Shoulders", target: "target 3 x 10", search: "upright row shoulders traps" },
  "External Rotation": { group: "Rotator cuff", target: "target 2 x 15", search: "external rotation rotator cuff shoulder health" },
  "Biceps Curl": { group: "Biceps", target: "target 3 x 10", search: "biceps curl arms cable dumbbell" },
  "Preacher Curl": { group: "Biceps", target: "target 3 x 10", search: "preacher curl biceps arms" },
  "Cable Curl": { group: "Biceps", target: "target 3 x 12", search: "cable curl biceps arms" },
  "Skull Crusher": { group: "Triceps", target: "target 3 x 10", search: "skull crusher triceps arms" },
  "Overhead Triceps Extension": { group: "Triceps", target: "target 3 x 12", search: "overhead triceps extension arms long head" },
  "Close-Grip Bench Press": { group: "Triceps", target: "target 3 x 8", search: "close grip bench triceps chest" },
  "Squat": { group: "Quads", target: "target 3 x 8", search: "squat quads glutes barbell legs" },
  "Front Squat": { group: "Quads", target: "target 3 x 6", search: "front squat quads legs barbell" },
  "Leg Press": { group: "Quads", target: "target 3 x 10", search: "leg press quads glutes machine" },
  "Bulgarian Split Squat": { group: "Quads", target: "target 3 x 8/side", search: "bulgarian split squat quads glutes unilateral" },
  "Walking Lunge": { group: "Quads", target: "target 3 x 10/side", search: "walking lunge quads glutes legs" },
  "Step-Up": { group: "Glutes", target: "target 3 x 10/side", search: "step up glutes quads unilateral" },
  "Leg Extension": { group: "Quads", target: "target 3 x 12", search: "leg extension quads machine" },
  "Lying Leg Curl": { group: "Hamstrings", target: "target 3 x 12", search: "lying leg curl hamstrings machine" },
  "Seated Leg Curl": { group: "Hamstrings", target: "target 3 x 12", search: "seated leg curl hamstrings machine" },
  "Good Morning": { group: "Hamstrings", target: "target 3 x 8", search: "good morning hamstrings glutes hinge" },
  "Glute Bridge": { group: "Glutes", target: "target 3 x 12", search: "glute bridge glutes hips" },
  "Banded Hip Abduction": { group: "Glute medius", target: "target 3 x 20", search: "banded hip abduction glute medius abductors" },
  "Machine Hip Abduction": { group: "Glute medius", target: "target 3 x 15", search: "hip abduction machine glute medius abductors" },
  "Sumo Deadlift": { group: "Glutes", target: "target 3 x 6", search: "sumo deadlift glutes adductors hamstrings" },
  "Conventional Deadlift": { group: "Full body", target: "target 3 x 5", search: "deadlift full body back hamstrings glutes" },
  "Standing Calf Raise": { group: "Calves", target: "target 4 x 12", search: "standing calf raise gastrocnemius calves" },
  "Seated Calf Raise": { group: "Calves", target: "target 4 x 15", search: "seated calf raise soleus calves" },
  "Tibialis Raise": { group: "Shins", target: "target 3 x 15", search: "tibialis raise shins anterior lower leg" },
  "Hanging Knee Raise": { group: "Abs", target: "target 3 x 10", search: "hanging knee raise abs hip flexors" },
  "Hanging Leg Raise": { group: "Abs", target: "target 3 x 8", search: "hanging leg raise abs core" },
  "Reverse Crunch": { group: "Abs", target: "target 3 x 12", search: "reverse crunch abs lower abs" },
  "Pallof Press": { group: "Obliques", target: "target 3 x 12/side", search: "pallof press obliques anti rotation core" },
  "Side Plank": { group: "Obliques", target: "target 3 x 30 sec/side", search: "side plank obliques core" },
  "Russian Twist": { group: "Obliques", target: "target 3 x 16", search: "russian twist obliques core rotation" },
  "Bird Dog": { group: "Core", target: "target 3 x 8/side", search: "bird dog core back glutes stability" },
  "Farmer Carry": { group: "Full body", target: "target 3 x 40 yd", search: "farmer carry full body grip core traps" },
  "Kettlebell Swing": { group: "Full body", target: "target 3 x 15", search: "kettlebell swing full body glutes hamstrings power" },
  "Battle Rope Waves": { group: "Full body", target: "target 6 x 30 sec", search: "battle rope waves conditioning full body" },
  "TRX Row": { group: "Back", target: "target 3 x 12", search: "trx row suspension back" },
  "90 Lat Stretch": { group: "Recovery", target: "mobility · 45 sec", search: "lat stretch back mobility recovery" },
  "Child's Pose": { group: "Recovery", target: "mobility · 60 sec", search: "child pose recovery hips back mobility" },
  "Kneeling Hip-Flexor Stretch": { group: "Recovery", target: "mobility · 45 sec/side", search: "hip flexor stretch recovery hips thighs" },
  "Treadmill Walk": { group: "Cardio", target: "target 20 min", search: "treadmill walk cardio incline walking duration time" },
  "Incline Walk": { group: "Cardio", target: "target 15 min", search: "incline walk treadmill cardio glutes duration time" },
  "Stationary Bike": { group: "Cardio", target: "target 20 min", search: "stationary bike cycling cardio duration distance" },
  "Elliptical": { group: "Cardio", target: "target 20 min", search: "elliptical cardio duration distance recovery" },
  "Row Erg": { group: "Cardio", target: "target 1000 m", search: "rowing erg cardio distance meters full body" },
  "Jump Rope": { group: "Cardio", target: "target 5 x 60 sec", search: "jump rope cardio conditioning calves duration" },
  "Sled Push": { group: "Full body", target: "target 4 x 20 yd", search: "sled push full body legs conditioning distance" },
  "Wall Sit": { group: "Quads", target: "target 3 x 45 sec", search: "wall sit quads isometric duration time" },
  "Hollow Hold": { group: "Abs", target: "target 3 x 30 sec", search: "hollow hold abs core isometric duration time" },
  "Copenhagen Plank": { group: "Adductors", target: "target 3 x 20 sec/side", search: "copenhagen plank adductors obliques unilateral duration side" },
  "Single-Leg Glute Bridge": { group: "Glutes", target: "target 3 x 12/side", search: "single leg glute bridge unilateral glutes bodyweight side" },
  "Single-Leg Romanian Deadlift": { group: "Hamstrings", target: "target 3 x 8/side", search: "single leg romanian deadlift unilateral hamstrings glutes balance" },
  "Suitcase Carry": { group: "Core", target: "target 3 x 30 yd/side", search: "suitcase carry unilateral core obliques grip distance side" },
  "Bear Crawl": { group: "Full body", target: "target 4 x 30 sec", search: "bear crawl full body core conditioning duration" },
  "Foam Rolling": { group: "Recovery", target: "recovery · 5 min", search: "foam rolling recovery mobility duration time" },
  "Breathing Reset": { group: "Recovery", target: "recovery · 3 min", search: "breathing reset recovery cooldown duration time" },
});

let pinnedTrends = ["hipThrust", "rowErg", "treadmillWalk", "foamRolling"];
let activeTrend = "hipThrust";
let currentWorkoutKey = "";
let currentWorkoutStartedAt = null;
let currentWorkoutCalories = 0;
let currentWorkoutMinutes = 0;
let pendingWorkoutSwitch = null;
let savedStandards = [];
let editingStandardId = "";
let pendingDeleteStandardId = "";
let deferredCoachCards = new Set();
let selectedTrendRange = "week";

const coachSuggestions = {
  lateralRaise: {
    name: "AI Shoulder Progression",
    workoutKey: "shoulder",
    acceptedTitle: "Added to your next shoulder workout",
    acceptedCopy: "LiftTrend will start lateral raises at 10 lb for 3 x 10, then keep three supporting shoulder movements editable.",
    exercises: [
      {
        name: "Lateral Raise",
        group: "Side delts",
        target: "AI progression · 10 lb · 3 x 10",
        sets: [{ setNumber: "1", weight: "10", reps: "10", rpe: "7", complete: false }],
      },
      {
        name: "Dumbbell Shoulder Press",
        group: "Shoulders",
        target: "target 3 x 8",
        sets: [{ setNumber: "1", weight: "25", reps: "8", rpe: "7", complete: false }],
      },
      {
        name: "Rear Delt Fly",
        group: "Rear delts",
        target: "target 3 x 12",
        sets: [{ setNumber: "1", weight: "10", reps: "12", rpe: "7", complete: false }],
      },
      {
        name: "Face Pull",
        group: "Rear delts",
        target: "shoulder health · 3 x 15",
        sets: [{ setNumber: "1", weight: "20", reps: "15", rpe: "7", complete: false }],
      },
    ],
  },
  goalDrift: {
    name: "AI Glute Rebalance",
    workoutKey: "glute",
    acceptedTitle: "Glute rebalance workout queued",
    acceptedCopy: "This swaps quad-dominant work for hip thrust, hinge, and isolation volume so the next session better matches your goal.",
    exercises: [
      {
        name: "Hip Thrust",
        group: "Glutes",
        target: "glute priority · 4 x 8",
        sets: [{ setNumber: "1", weight: "135", reps: "8", rpe: "7", complete: false }],
      },
      {
        name: "Cable Kickback",
        group: "Glutes",
        target: "isolation · 3 x 12/side",
        sets: [{ setNumber: "1", weight: "20", reps: "12", rpe: "7", complete: false }],
      },
      {
        name: "Romanian Deadlift",
        group: "Hamstrings",
        target: "hip hinge · 3 x 10",
        sets: [{ setNumber: "1", weight: "65", reps: "10", rpe: "7", complete: false }],
      },
      {
        name: "Dead Bug",
        group: "Abs",
        target: "core control · 3 x 10/side",
        sets: [{ setNumber: "1", weight: "", reps: "10/side", rpe: "6", complete: false }],
      },
    ],
  },
  recovery: {
    name: "AI Recovery Flow",
    workoutKey: "recovery",
    acceptedTitle: "Recovery workout ready",
    acceptedCopy: "This keeps the session complete but low intensity: mobility, light pull, core control, and easy glute activation.",
    exercises: [
      {
        name: "Mobility Flow",
        group: "Recovery",
        target: "easy movement · 10 min",
        sets: [{ setNumber: "1", weight: "", reps: "10 min", rpe: "4", complete: false }],
      },
      {
        name: "Light Lat Pulldown",
        group: "Recovery",
        target: "easy pull · 2 x 15",
        sets: [{ setNumber: "1", weight: "40", reps: "15", rpe: "5", complete: false }],
      },
      {
        name: "Dead Bug",
        group: "Abs",
        target: "core reset · 2 x 8/side",
        sets: [{ setNumber: "1", weight: "", reps: "8/side", rpe: "5", complete: false }],
      },
      {
        name: "Cable Kickback",
        group: "Glutes",
        target: "activation only · 2 x 15/side",
        sets: [{ setNumber: "1", weight: "10", reps: "15", rpe: "5", complete: false }],
      },
    ],
  },
  fatLossAdherence: {
    name: "AI Fat Loss Consistency",
    workoutKey: "cardio",
    acceptedTitle: "Fat-loss consistency workout ready",
    acceptedCopy: "This keeps the next session repeatable with light full-body work, incline walking, and simple effort tracking.",
    exercises: [
      {
        name: "Treadmill Walk",
        group: "Cardio",
        target: "steady incline · 25 min",
        sets: [{ setNumber: "1", distance: "1.5 mi", duration: "25 min", rpe: "6", complete: false }],
      },
      {
        name: "Goblet Squat",
        group: "Legs",
        target: "easy full-body · 2 x 10",
        sets: [{ setNumber: "1", weight: "25", reps: "10", rpe: "6", complete: false }],
      },
      {
        name: "Seated Row",
        group: "Back",
        target: "easy pull · 2 x 12",
        sets: [{ setNumber: "1", weight: "50", reps: "12", rpe: "6", complete: false }],
      },
      {
        name: "Dead Bug",
        group: "Abs",
        target: "core control · 2 x 8/side",
        sets: [{ setNumber: "1", weight: "", reps: "8/side", rpe: "5", complete: false }],
      },
    ],
  },
  healthConsistency: {
    name: "AI Health Consistency",
    workoutKey: "recovery",
    acceptedTitle: "Health consistency workout ready",
    acceptedCopy: "This keeps the next workout low-stress and repeatable with mobility, light strength, and an easy finish.",
    exercises: [
      {
        name: "Mobility Flow",
        group: "Recovery",
        target: "easy movement · 12 min",
        sets: [{ setNumber: "1", weight: "", reps: "12 min", rpe: "4", complete: false }],
      },
      {
        name: "Treadmill Walk",
        group: "Cardio",
        target: "comfortable pace · 15 min",
        sets: [{ setNumber: "1", distance: "0.8 mi", duration: "15 min", rpe: "5", complete: false }],
      },
      {
        name: "Dead Bug",
        group: "Abs",
        target: "core reset · 2 x 8/side",
        sets: [{ setNumber: "1", weight: "", reps: "8/side", rpe: "5", complete: false }],
      },
    ],
  },
};

const coachNavigationActions = {
  conflictingGoals: { label: "Edit goals", detail: "goals" },
  incompleteWearable: { label: "Review permissions", detail: "health" },
  inconsistentLogging: { label: "Review history", detail: "recordings" },
};

const aiCoachTrainingSnapshot = {
  userGoal: "Build strength while keeping glute emphasis higher than quad-dominant leg volume",
  dateRange: "Last 4 weeks",
  exerciseHistory: [
    { exercise: "Lateral Raise", load: "7.5 lb", pattern: "4 x 15", completedWeeks: 3, averageRpe: 7.5, maxRpe: 8, signal: "progression-ready" },
    { exercise: "Hip Thrust", monthlyVolumeChange: "-18%", signal: "glute-volume-down" },
    { exercise: "Goblet Squat", monthlyVolumeChange: "+25%", signal: "quad-volume-up" },
  ],
  watchSignals: {
    recentHeartRateTrend: "higher than baseline",
    activeCaloriesTrend: "stable",
    sessionRpeTrend: "elevated on lower body days",
  },
};

const profileDetails = {
  personal: {
    title: "Personal info",
    copy: "Update body data, training frequency, goals, and Apple Health weight used by AI Coach.",
    items: [],
  },
  recordings: {
    title: "Previous recordings",
    copy: "Review finished workouts, open set-level details, and compare recent sessions.",
    items: [],
  },
  health: {
    title: "Apple Health data",
    copy: "Control the data LiftTrend reads from Apple Watch and writes back to Health.",
    items: [
      ["Heart rate", "Read during active workouts"],
      ["Active calories", "Synced from Apple Watch"],
      ["Workout route and location", "Off for strength sessions"],
    ],
  },
  exercises: {
    title: "Exercise database",
    copy: "Browse a read-only strength exercise library with body-part labels and searchable aliases.",
    items: [
      ["Lat Pulldown", "Back · 14 logged sessions"],
      ["Cable Crunch", "Abs · 6 logged sessions"],
      ["Lateral Raise", "Shoulders · 18 logged sessions"],
    ],
  },
  testing: {
    title: "Tester feedback",
    copy: "Export a local test report or copy short feedback questions after trying the app.",
    items: [],
  },
  standards: {
    title: "Saved standards",
    copy: "Start, rename, edit, or delete reusable workout templates.",
    items: [
      ["Abs Focus Standard", "Cable crunch · Dead bug · Plank"],
      ["Glute Focus Standard", "Hip thrust · Cable kickback · RDL"],
      ["Shoulder Strength Standard", "Lateral raise · Press · Rear delt fly"],
    ],
    action: "Open Saved Standards",
  },
  language: {
    title: "Language",
    copy: "Choose the app language used for workout logging, coaching, and settings.",
    items: [
      ["English", "Current"],
      ["简体中文", "Available"],
    ],
  },
  units: {
    title: "Units",
    copy: "Set workout weight, body size, and energy units.",
    items: [
      ["Weight", "lb"],
      ["Body size", "cm"],
      ["Energy", "kcal"],
    ],
  },
  goals: {
    title: "Goals",
    copy: "Tell AI Coach what tradeoffs matter so suggestions match your current training intent.",
    items: [
      ["Primary goal", "Build strength"],
      ["Body focus", "Glutes and upper body balance"],
      ["Suggestion style", "Progressive overload with recovery checks"],
    ],
  },
};

const zhProfileDetails = {
  personal: {
    title: "个人信息",
    copy: "更新身体数据、训练频率、目标，以及 AI 教练使用的 Apple Health 体重。",
  },
  recordings: {
    title: "历史记录",
    copy: "查看已完成训练、展开每组详情，并对比最近训练。",
  },
  health: {
    title: "Apple Health 数据",
    copy: "管理 LiftTrend 从 Apple Watch 读取和写回 Health 的数据。",
  },
  exercises: {
    title: "动作数据库",
    copy: "浏览只读动作库，查看部位标签、搜索别名和已记录次数。",
  },
  testing: {
    title: "测试反馈",
    copy: "试用后导出本地测试报告，或复制几个简短反馈问题。",
  },
  standards: {
    title: "已保存模板",
    copy: "开始、重命名、编辑或删除可复用的训练模板。",
  },
  language: {
    title: "语言",
    copy: "选择训练记录、AI 教练和设置页面使用的语言。",
  },
  units: {
    title: "单位",
    copy: "设置训练重量、身体尺寸和能量单位。",
  },
  goals: {
    title: "目标",
    copy: "告诉 AI 教练你当前重视的取舍，让建议更贴合训练意图。",
  },
};

const zhText = {
  "Welcome to LiftTrend": "欢迎使用 LiftTrend",
  "Set up your coaching profile": "设置你的训练档案",
  "Basic body data and goals help AI Coach personalize volume, progression, recovery, and Apple Health updates.": "基础身体数据和目标会帮助 AI 教练个性化分析训练量、进阶、恢复和 Apple Health 更新。",
  Name: "姓名",
  Age: "年龄",
  Height: "身高",
  Weight: "体重",
  Sex: "性别",
  "Training frequency": "训练频率",
  "General goal": "总体目标",
  "Focus areas": "重点部位",
  "Target weight": "目标体重",
  "Current body fat": "当前体脂",
  "Target body fat": "目标体脂",
  "Save Profile": "保存档案",
  Skip: "跳过",
  "Ready to train": "准备训练",
  "Choose today's focus": "选择今天的训练重点",
  "Pick a body area and LiftTrend will load a suggested workout you can edit.": "选择一个部位，LiftTrend 会载入可编辑的建议训练。",
  "Saved Standards": "已保存模板",
  "Reusable workouts": "可复用训练",
  "Find standard": "查找模板",
  "Search standards or exercises": "搜索模板或动作",
  "In-progress workout": "进行中的训练",
  "Resume workout": "继续训练",
  "Your unsaved workout is available on this device.": "这台设备上有未完成的训练草稿。",
  Resume: "继续",
  Discard: "丢弃",
  "Change Workout": "更换训练",
  "Save Standard": "保存模板",
  Standards: "模板",
  "Finish Workout": "结束训练",
  "Finish Set": "记录本组",
  "Finish Exercise": "结束动作",
  "Start Exercise": "开始动作",
  "Add Set": "继续加组",
  "Reorder exercise": "调整动作顺序",
  "Move exercise up": "上移动作",
  "Move exercise down": "下移动作",
  "Exercise order updated": "动作顺序已更新",
  "Add Exercise": "添加动作",
  "Delete Exercise": "删除动作",
  "Confirm delete": "确认删除",
  Delete: "删除",
  Edit: "编辑",
  Save: "保存",
  Cancel: "取消",
  Done: "已完成",
  Load: "重量",
  Reps: "次数",
  "Time (min)": "时间（min）",
  "Duration (min)": "时长（min）",
  "Add an exercise to continue": "添加一个动作后继续",
  "Set up profile": "设置个人档案",
  "Goal not set": "目标未设置",
  "Frequency not set": "频率未设置",
  "Not set": "未设置",
  Choose: "请选择",
  Optional: "可选",
  "Your name": "你的姓名",
  "All exercises complete": "所有动作已完成",
  "No active exercise": "没有正在记录的动作",
  "No active set to record": "没有正在记录的组",
  "Add load, reps, time, distance, or RPE": "请填写重量、次数、时间、距离或 RPE",
  "Use a valid load number": "请输入有效的重量数字",
  "Use a valid duration number": "请输入有效的时长数字",
  "Use a valid distance number": "请输入有效的距离数字",
  "Use valid reps, like 10 or 10/side": "请输入有效次数，例如 10 或 10 每侧",
  "Use an RPE from 0 to 10": "RPE 请输入 0 到 10",
  "Set already recorded": "这一组已记录",
  "Current workout is not saved yet": "当前训练还没有保存",
  "Keep your current workout?": "保留当前训练吗？",
  Today: "今天",
  "Choose workout": "选择训练",
  "Unsaved workout": "未保存训练",
  "Keep Current": "保留当前",
  "Discard & Switch": "丢弃并切换",
  "Shoulder Strength": "肩部力量",
  "Glute Focus": "臀腿训练",
  "Back Focus": "背部训练",
  "Chest Focus": "胸部训练",
  "Abs Focus": "腹部训练",
  "Arms Focus": "手臂训练",
  "Recovery Flow": "恢复训练",
  "Build Custom Workout": "创建自定义训练",
  "Lateral raise · Shoulder press · Rear delt fly": "侧平举 · 肩推 · 后三角飞鸟",
  "Hip thrust · Cable kickback · Lateral raise": "臀推 · 绳索后踢 · 侧平举",
  "Lat pulldown · Row · Face pull": "高位下拉 · 划船 · 面拉",
  "Chest press · Incline press · Cable fly": "胸推 · 上斜卧推 · 绳索夹胸",
  "Dead bug · Cable crunch · Plank": "死虫 · 绳索卷腹 · 平板支撑",
  "Curl · Triceps pressdown · Hammer curl": "弯举 · 三头下压 · 锤式弯举",
  "Mobility · Light pull · Core reset": "灵活性 · 轻拉力 · 核心恢复",
  "Start empty and add exercises manually": "从空白开始，手动添加动作",
  Calories: "卡路里",
  Time: "时长",
  "Today's Summary": "今日总结",
  "Workout complete": "训练完成",
  "Nice work. Your set details are saved into today's recordings.": "完成得很好。你的组数详情已保存到今天的记录里。",
  "All planned exercises are complete. Your workout is saved to today's recordings.": "所有计划动作都已完成。训练已保存到今天的记录里。",
  "Workout ended early. Completed and started exercises are saved to today's recordings.": "训练已提前结束。已完成和已开始的动作都已保存到今天的记录里。",
  "Add or record an exercise before finishing": "结束训练前请先添加或记录一个动作",
  "Workout already saved": "这次训练已经保存",
  Hide: "收起",
  Exercises: "动作",
  "Target note": "目标备注",
  Remove: "移除",
  "Save as Standard": "保存为模板",
  "Back to Today": "回到今天",
  "View Updated Trends": "查看更新后的趋势",
  Week: "周",
  Month: "月",
  Year: "年",
  "Total calories": "总卡路里",
  "Training time": "训练时长",
  Workouts: "训练次数",
  "Body Metrics": "身体指标",
  "Latest saved workout is included in these trends.": "最近保存的训练已计入这些趋势。",
  "Session Mix": "训练分布",
  "by workout focus": "按训练重点",
  "Distribution check for whether this period matches your intended split.": "检查这个周期的训练分布是否符合你的计划。",
  Readout: "解读",
  "AI suggestion": "AI 建议",
  "Recorded exercises only": "仅已记录动作",
  "Choose trend": "选择趋势",
  Close: "关闭",
  "Replace selected": "替换当前",
  "selected trend": "当前趋势",
  "+ Add": "+ 添加",
  "Add trend": "添加趋势",
  volume: "训练量",
  distance: "距离",
  time: "时长",
  "volume trend chart": "训练量趋势图",
  "distance trend chart": "距离趋势图",
  "time trend chart": "时长趋势图",
  "No saved workouts yet. Finish a workout to update Trends.": "还没有保存的训练。结束一次训练后，趋势会更新。",
  "Pick any supported trend to add. You can show up to four trends, including volume, distance, and time.": "选择一个已记录过的趋势添加。最多显示四个趋势，包括训练量、距离和时长。",
  "Ready to check your plan": "准备分析你的计划",
  "Analyze your latest workouts and Apple Watch signals to get suggestions matched to your current goal.": "分析最近训练和 Apple Watch 信号，生成贴合当前目标的建议。",
  "Analyze latest data": "分析最新数据",
  "Show later suggestions": "显示稍后再看的建议",
  Profile: "个人",
  recordings: "记录",
  active: "活动",
  "training time": "训练时长",
  Personal: "个人",
  "Body data and coaching profile": "身体数据和训练档案",
  "Personal info": "个人信息",
  Data: "数据",
  "Personal records and exports": "训练记录和导出",
  "Previous recordings": "历史记录",
  "View history": "查看历史",
  "Apple Health data": "Apple Health 数据",
  Connected: "已连接",
  "Not connected": "未连接",
  "Exercise database": "动作数据库",
  "Recorded only": "仅已记录",
  "Tester feedback": "测试反馈",
  "Export / copy": "导出 / 复制",
  "Export local testing data": "导出本地测试数据",
  "Anonymous test report": "匿名测试报告",
  "Full local backup": "完整本地备份",
  "Copy feedback questions": "复制反馈问题",
  Copy: "复制",
  "Export a privacy-light report with counts, flow signals, and workout summaries.": "导出较少隐私信息的报告，包含数量、流程信号和训练摘要。",
  "Export everything saved in this browser so a tester can back up or send a debug file intentionally.": "导出这个浏览器里保存的全部内容，方便测试者主动备份或发送 debug 文件。",
  "Copy a short checklist testers can answer after a few workouts.": "复制一组简短问题，方便测试者练完几次后回答。",
  "Test report downloaded": "测试报告已下载",
  "Full backup downloaded": "完整备份已下载",
  "Feedback questions copied": "反馈问题已复制",
  "Could not copy feedback questions": "无法复制反馈问题",
  "Manage standard workouts": "管理训练模板",
  "Reusable workout templates": "可复用训练模板",
  "View / edit / delete": "查看 / 编辑 / 删除",
  Settings: "设置",
  "App preferences": "应用偏好",
  Language: "语言",
  Units: "单位",
  Goals: "目标",
  "Strength trend": "力量趋势",
  "Back to Profile": "返回个人",
  "Back to AI Coach": "返回 AI 教练",
  "Height cm": "身高 cm",
  "Height ft": "身高 ft",
  "Height in": "身高 in",
  "Log body metrics": "记录身体指标",
  "Each body metric entry needs a date so Trends can calculate changes accurately. Latest saved:": "每条身体指标都需要日期，趋势才能准确计算。最近保存：",
  none: "无",
  "Metric date": "指标日期",
  "Body fat": "体脂",
  "Body measurements": "身体围度",
  "Saved with the metric date above for waist, hip, thigh, and arm trends.": "会按上方日期保存，用于腰围、臀围、大腿围和手臂围趋势。",
  Waist: "腰围",
  Hip: "臀围",
  Thigh: "大腿围",
  Arm: "手臂围",
  "Apple Health weight": "Apple Health 体重",
  "updated today": "今天已更新",
  "Body metrics permission off": "身体指标权限关闭",
  "Use Apple Health weight": "使用 Apple Health 体重",
  "Choose Apple Health sync": "选择 Apple Health 同步",
  "No Apple Health weight synced yet": "还没有同步 Apple Health 体重",
  "Choose sync data": "选择同步数据",
  "Sync selected": "同步所选项目",
  "Not synced": "未同步",
  "Connect Apple Health to show live data": "连接 Apple Health 后显示实时数据",
  "App timer": "App 计时",
  "Not connected to Apple Watch": "未连接 Apple Watch",
  "Save Personal Info": "保存个人信息",
  Female: "女性",
  Male: "男性",
  "Prefer not to say": "不想说明",
  "3 days/week": "每周 3 天",
  "4 days/week": "每周 4 天",
  "5+ days/week": "每周 5 天以上",
  "Fat loss": "减脂",
  "Lean muscle": "精瘦增肌",
  Bulk: "增肌增重",
  Strength: "力量",
  "General health": "总体健康",
  Details: "详情",
  Editing: "编辑中",
  "No recordings yet": "还没有训练记录",
  "Finish a workout to build your history, trends, and AI Coach context.": "完成一次训练后，这里会形成历史记录、趋势和 AI 教练上下文。",
  Date: "日期",
  "Workout name": "训练名称",
  Focus: "重点",
  Minutes: "分钟",
  Energy: "能量",
  "Set details, one per line": "组数详情，每行一组",
  "Use Exercise · details. Examples: 10 reps, 30 sec, 1000 m, bodyweight.": "使用“动作 · 详情”。例如：10 次、30 秒、1000 米、自重。",
  "Add example line": "添加示例行",
  "Save Changes": "保存修改",
  "No set details yet": "还没有组数详情",
  "needs measurable details": "需要可衡量的详情",
  "Primary label": "主要标签",
  "Default prescription": "默认计划",
  "User history": "用户历史",
  "Useful for tracking": "适合追踪",
  "Back to database": "返回数据库",
  "Search exercises": "搜索动作",
  "Search exercise database": "搜索动作数据库",
  "No catalog match yet. Add it as a custom exercise from today's workout.": "还没有匹配动作。可以从今天训练里添加为自定义动作。",
  exercises: "个动作",
  "body-part labels · tap any exercise for details": "个部位标签 · 点击动作查看详情",
  "Duration, effort, heart rate, calories, and consistency across recovery or mobility sessions.": "追踪时长、主观强度、心率、卡路里，以及恢复或灵活性训练的一致性。",
  "Distance, duration, pace context, heart rate, calories, and weekly cardio consistency.": "追踪距离、时长、配速背景、心率、卡路里，以及每周有氧一致性。",
  "Reps, sets, duration when relevant, RPE, and whether form quality stays consistent.": "追踪次数、组数、必要时的时长、RPE，以及动作质量是否稳定。",
  "Load, reps, sets, RPE, total volume, and whether this movement should appear in pinned exercise trends or saved standard workouts.": "追踪重量、次数、组数、RPE、总训练量，以及是否值得固定在动作趋势或保存进训练模板。",
  "No logged sets yet": "还没有记录组数",
  "logged signal": "条记录信号",
  "logged signals": "条记录信号",
  "Apple Watch": "Apple Watch",
  Refresh: "刷新",
  "Heart rate": "心率",
  "Active calories": "活动卡路里",
  "Workout duration": "训练时长",
  "Body metrics": "身体指标",
  Location: "位置",
  "Read during workouts": "训练中读取",
  "Sync from Apple Watch": "从 Apple Watch 同步",
  "Write finished sessions": "写入已完成训练",
  "Read weight and body measurements when available": "可用时读取体重和身体围度",
  "Off for strength workouts": "力量训练默认关闭",
  "Available during active workout": "训练中可用",
  "Live from current session": "来自当前训练",
  "Last saved workout": "最近保存的训练",
  "No workout yet": "还没有训练",
  "No saved sessions": "没有保存的训练",
  "Profile value": "档案值",
  Permissions: "权限",
  "Choose what LiftTrend can read from Apple Health and what it can write back after workouts.": "选择 LiftTrend 可以从 Apple Health 读取哪些数据，以及训练后可以写回哪些数据。",
  "Goal presets": "目标预设",
  "Pick one, then analyze AI Coach again to see matching suggestions.": "选择一个预设后，再分析 AI 教练即可看到匹配建议。",
  "Primary goal": "主要目标",
  "Coaching style": "教练风格",
  Balanced: "平衡",
  Aggressive: "积极",
  "Recovery-first": "恢复优先",
  "Save Goals": "保存目标",
  Start: "开始",
  "+ Exercise": "+ 动作",
  "No standards yet": "还没有模板",
  "Save a workout as a standard to reuse its exercises, sets, weight, reps, and RPE defaults.": "把训练保存为模板后，可以复用动作、组数、重量、次数和 RPE 默认值。",
  "No matching standards": "没有匹配模板",
  "Try another workout name or exercise.": "试试其他训练名称或动作。",
  "A standard with this name already exists": "已存在同名模板",
  "Add an exercise before saving a standard": "先添加动作再保存模板",
  "Add an exercise to this standard before starting": "先给这个模板添加动作再开始",
  "Started standard": "已开始模板",
  "Use valid numbers for profile metrics": "请输入有效的档案数字",
  "Choose a valid metric date": "请选择有效的指标日期",
  "Use valid numbers for body metrics": "请输入有效的身体指标数字",
  "Personal info updated": "个人信息已更新",
  "Name this recording before saving": "保存前请填写训练名称",
  "Choose a valid recording date": "请选择有效的训练日期",
  "Use numbers for minutes and energy": "分钟和能量请输入数字",
  "Keep at least one set detail": "至少保留一条组数详情",
  "Recording updated": "训练记录已更新",
  "Recording deleted": "训练记录已删除",
  "Apple Health refreshed": "Apple Health 同步设置已更新",
  "Goal preset selected": "已选择目标预设",
  "Enable Body metrics permission first": "请先开启身体指标权限",
  "Apple Health weight imported": "Apple Health 体重已导入",
  "Goals updated. Analyze AI Coach again.": "目标已更新。请重新分析 AI 教练。",
  "Standard updated": "模板已更新",
  "Exercise added to standard": "已添加动作到模板",
  "Exercise removed": "动作已移除",
  "Standard deleted": "模板已删除",
  "What I checked": "我检查了什么",
  "Your latest coaching context": "最近用于分析的训练上下文",
  "Kept out of this check": "本次未纳入",
  "and detailed Health samples.": "以及详细 Health 样本。",
  "Why this suggestion?": "为什么给这个建议？",
  Observation: "观察",
  Interpretation: "解读",
  Rationale: "理由",
  Uncertainty: "不确定性",
  "How sure I am": "把握程度",
  "Based on": "依据",
  Accept: "接受",
  Later: "稍后",
  Accepted: "已接受",
  "Start Suggested Workout": "开始建议训练",
  "Save as Standard": "保存为模板",
  "Edit goals": "编辑目标",
  "Review permissions": "查看权限",
  "Review history": "查看历史",
  "Show 1 later suggestion": "显示 1 条稍后建议",
  "Later suggestions restored": "稍后建议已恢复",
  "Suggestion moved to later": "建议已移到稍后",
  "Suggestion accepted": "已接受建议",
  "Suggested workout ready": "建议训练已准备好",
  "LiftTrend turned this recommendation into an editable workout.": "LiftTrend 已把这条建议转换成可编辑的训练。",
  "New suggestions ready": "新建议已准备好",
  "Started AI suggestion": "已开始 AI 建议训练",
  "AI Coach action opened": "已打开 AI 教练相关设置",
  "No coaching suggestions yet": "暂时没有训练建议",
  "Log at least one workout and choose the Apple Watch data you want included. I will only suggest actions when there is enough support.": "请先记录至少一次训练，并选择你想纳入的 Apple Watch 数据。有足够依据时，我才会给出建议。",
  "Ready to check your plan": "准备分析你的计划",
  "Analyze your latest workouts and Apple Watch signals to refresh recommendations.": "分析最近训练和 Apple Watch 信号，刷新建议。",
  "I checked your latest workouts and Apple Watch signals. Each suggestion shows what it is based on and what is still uncertain.": "我检查了最近训练和 Apple Watch 信号。每条建议都会说明依据和不确定之处。",
  "Current workout": "当前训练",
  "Active cal": "活动卡路里",
  logged: "已记录",
  "Add to workout": "添加到训练",
  "Choose exercise": "选择动作",
  "Search recorded exercises": "搜索已记录动作",
  "Create custom exercise": "创建自定义动作",
  "Current workout kept": "已保留当前训练",
  "Workout switched": "已切换训练",
  "Workout saved": "训练已保存",
  "Saved workout draft discarded": "已丢弃训练草稿",
  enabled: "已开启",
  disabled: "已关闭",
};

const zhBodyMetricLabels = {
  Weight: "体重",
  "Body fat": "体脂",
  Waist: "腰围",
  Hip: "臀围",
  Thigh: "大腿围",
  Arm: "手臂围",
};

const zhExerciseNames = {
  "Lat Pulldown": "高位下拉",
  "Seated Row": "坐姿划船",
  "Face Pull": "面拉",
  "Chest Press": "胸推",
  "Incline Dumbbell Press": "上斜哑铃卧推",
  "Cable Fly": "绳索夹胸",
  "Lateral Raise": "侧平举",
  "Dumbbell Shoulder Press": "哑铃肩推",
  "Rear Delt Fly": "后三角飞鸟",
  "Hip Thrust": "臀推",
  "Cable Kickback": "绳索后踢",
  "Romanian Deadlift": "罗马尼亚硬拉",
  "Goblet Squat": "高脚杯深蹲",
  "Dumbbell Curl": "哑铃弯举",
  "Triceps Pressdown": "绳索下压",
  "Hammer Curl": "锤式弯举",
  "Cable Crunch": "绳索卷腹",
  "Dead Bug": "死虫",
  Plank: "平板支撑",
  "Mobility Flow": "灵活性恢复",
  "Light Lat Pulldown": "轻重量高位下拉",
  "Custom Exercise": "自定义动作",
  "Row Erg": "划船机",
  "Treadmill Walk": "跑步机步行",
  "Foam Rolling": "泡沫轴放松",
  "Pull-Up": "引体向上",
  "Assisted Pull-Up": "辅助引体向上",
  "Single-Arm Dumbbell Row": "单臂哑铃划船",
  "Chest-Supported Row": "俯卧支撑划船",
  "Barbell Row": "杠铃划船",
  "Straight-Arm Pulldown": "直臂下拉",
  "Back Extension": "背伸",
  "Machine Chest Press": "器械胸推",
  "Push-Up": "俯卧撑",
  "Bench Press": "杠铃卧推",
  "Dumbbell Bench Press": "哑铃卧推",
  "Pec Deck": "蝴蝶机夹胸",
  "Low-to-High Cable Fly": "低位绳索夹胸",
  "Overhead Press": "过顶推举",
  "Arnold Press": "阿诺德推举",
  "Cable Lateral Raise": "绳索侧平举",
  "Front Raise": "前平举",
  "Upright Row": "直立划船",
  "External Rotation": "外旋",
  "Biceps Curl": "二头弯举",
  "Preacher Curl": "牧师凳弯举",
  "Cable Curl": "绳索弯举",
  "Skull Crusher": "仰卧臂屈伸",
  "Overhead Triceps Extension": "过顶三头伸展",
  "Close-Grip Bench Press": "窄握卧推",
  Squat: "深蹲",
  "Front Squat": "前蹲",
  "Leg Press": "腿举",
  "Bulgarian Split Squat": "保加利亚分腿蹲",
  "Walking Lunge": "行走弓步",
  "Step-Up": "登阶",
  "Leg Extension": "腿屈伸",
  "Lying Leg Curl": "俯卧腿弯举",
  "Seated Leg Curl": "坐姿腿弯举",
  "Good Morning": "早安式",
  "Glute Bridge": "臀桥",
  "Banded Hip Abduction": "弹力带髋外展",
  "Machine Hip Abduction": "器械髋外展",
  "Sumo Deadlift": "相扑硬拉",
  "Conventional Deadlift": "传统硬拉",
  "Standing Calf Raise": "站姿提踵",
  "Seated Calf Raise": "坐姿提踵",
  "Tibialis Raise": "胫骨前肌提拉",
  "Hanging Knee Raise": "悬垂举膝",
  "Hanging Leg Raise": "悬垂举腿",
  "Reverse Crunch": "反向卷腹",
  "Pallof Press": "帕洛夫推",
  "Side Plank": "侧平板",
  "Russian Twist": "俄罗斯转体",
  "Bird Dog": "鸟狗",
  "Farmer Carry": "农夫行走",
  "Kettlebell Swing": "壶铃摆动",
  "Battle Rope Waves": "战绳波浪",
  "TRX Row": "TRX 划船",
  "90 Lat Stretch": "90 度背阔肌拉伸",
  "Child's Pose": "婴儿式",
  "Kneeling Hip-Flexor Stretch": "跪姿髋屈肌拉伸",
  "Incline Walk": "坡度步行",
  "Stationary Bike": "动感单车",
  Elliptical: "椭圆机",
  "Jump Rope": "跳绳",
  "Sled Push": "推雪橇",
  "Wall Sit": "靠墙静蹲",
  "Hollow Hold": "空心支撑",
  "Copenhagen Plank": "哥本哈根平板",
  "Single-Leg Glute Bridge": "单腿臀桥",
  "Single-Leg Romanian Deadlift": "单腿罗马尼亚硬拉",
  "Suitcase Carry": "单侧负重行走",
  "Bear Crawl": "熊爬",
  "Breathing Reset": "呼吸恢复",
};

const zhGroupLabels = {
  Back: "背部",
  "Rear delt": "后三角",
  "Rear delts": "后三角",
  Chest: "胸部",
  "Upper chest": "上胸",
  "Side delts": "中束",
  Shoulders: "肩部",
  Glutes: "臀部",
  Hamstrings: "腘绳肌",
  Quads: "股四头肌",
  Biceps: "二头肌",
  Triceps: "三头肌",
  Arms: "手臂",
  Abs: "腹部",
  Obliques: "腹斜肌",
  Core: "核心",
  Lats: "背阔肌",
  "Rotator cuff": "旋转袖",
  Adductors: "内收肌",
  Calves: "小腿",
  "Full body": "全身",
  Cardio: "有氧",
  "Erector spinae": "竖脊肌",
  "Glute medius": "臀中肌",
  Recovery: "恢复",
  Custom: "自定义",
};

const focusCardText = {
  shoulder: ["Shoulders", "Strength and shape", "肩部", "力量和线条"],
  glute: ["Glutes", "Hip-dominant day", "臀腿", "髋主导训练"],
  back: ["Back", "Pull strength", "背部", "拉力训练"],
  chest: ["Chest", "Press strength", "胸部", "推力训练"],
  abs: ["Abs", "Core control", "腹部", "核心控制"],
  arms: ["Arms", "Biceps and triceps", "手臂", "二头和三头"],
  recovery: ["Recovery", "Full-body reset", "恢复", "全身恢复"],
  custom: ["Custom", "Start empty", "自定义", "从空白开始"],
};

const workoutOptionText = {
  shoulder: ["Shoulder Strength", "Lateral raise · Shoulder press · Rear delt fly"],
  glute: ["Glute Focus", "Hip thrust · Cable kickback · Lateral raise"],
  back: ["Back Focus", "Lat pulldown · Row · Face pull"],
  chest: ["Chest Focus", "Chest press · Incline press · Cable fly"],
  abs: ["Abs Focus", "Dead bug · Cable crunch · Plank"],
  arms: ["Arms Focus", "Curl · Triceps pressdown · Hammer curl"],
  recovery: ["Recovery Flow", "Mobility · Light pull · Core reset"],
  custom: ["Build Custom Workout", "Start empty and add exercises manually"],
};


const zhFocusLabels = {
  chest: ["胸部", "胸部"],
  shoulders: ["肩部", "肩部"],
  back: ["背部", "背部"],
  glutes: ["臀腿", "臀腿"],
  abs: ["腹部", "腹部"],
  arms: ["手臂", "手臂"],
  recovery: ["恢复", "恢复"],
  cardio: ["有氧", "有氧"],
  custom: ["自定义", "自定义"],
  other: ["其他", "其他"],
};

const zhRecommendationText = {
  lateralRaise: {
    label: "进阶",
    title: "下次侧平举可以试 10 lb",
    recommendation: "下次肩部训练试 10 lb 做 3 x 10。第一组保守一点；如果动作变形或肩部不舒服，就回到 7.5 lb。",
    observation: "侧平举已经连续多周完成同一重量和目标次数，并且 RPE 仍在可控范围内。",
    interpretation: "这说明这个动作可能已经适合做一次小幅、可控的加重。",
    rationale: "加重量、降次数可以让进阶幅度更可控，也让下一次训练有明确的通过标准。",
    uncertainty: "这依赖最近记录准确，并且不应覆盖疼痛、动作质量下降、伤病建议或异常疲劳。",
  },
  goalDrift: {
    label: "目标偏移",
    title: "下一次下肢训练建议重新偏向臀部",
    recommendation: "开始一个臀部优先训练：臀推、绳索后踢、罗马尼亚硬拉和核心稳定动作，先不要继续增加股四头主导训练量。",
    observation: "最近训练分布显示臀部相关训练偏少，而股四头主导内容相对增加。",
    interpretation: "如果你的目标仍是臀部优先，这个训练组合可能正在偏离目标。",
    rationale: "这样能让下一次训练重新贴合重点，同时保留完整的下肢刺激。",
    uncertainty: "肌群标签来自记录动作的估算，不是直接的肌肉增长测量。如果目标变了，先更新目标再接受计划。",
  },
  recovery: {
    label: "恢复",
    title: "进阶前先安排一次低强度训练",
    recommendation: "开始恢复训练，或者下一次下肢日先维持重量，不急着加重。",
    observation: "Apple Watch 和主观强度信号提示最近训练压力可能偏高。",
    interpretation: "下一次高强度训练可能需要根据恢复情况做调整。",
    rationale: "较轻的训练能保持习惯，同时降低疲劳影响下一次表现的概率。",
    uncertainty: "心率和 RPE 只能作为恢复线索，不是医疗判断；睡眠、压力、酸痛和传感器准确度仍不完整。",
  },
  performanceDecline: {
    label: "表现",
    title: "先暂停加重，检查恢复因素",
    recommendation: "下次重复上一次成功的重量，并记录睡眠、酸痛或日程压力的简短备注。",
    observation: "近期表现信号不足以支持自动加重。",
    interpretation: "短期表现下降可能来自疲劳、记录不完整、动作变化或生活压力。",
    rationale: "先维持重量，能得到更干净的对比，再决定是否降量、换动作或继续进阶。",
    uncertainty: "这不是诊断；仅凭训练记录无法确认表现下降的具体原因。",
  },
  incompleteWearable: {
    label: "数据缺口",
    title: "不要过度解读缺失的穿戴数据",
    recommendation: "下一步先基于组数和 RPE 判断；如果你想纳入恢复信号，请开启心率和活动卡路里。",
    observation: "部分 Apple Watch 数据没有开启，所以恢复判断依据不完整。",
    interpretation: "训练记录仍然有用，但缺失的穿戴数据不应该被当作隐藏证据。",
    rationale: "这样可以避免 AI Coach 在证据不足时给出过度确定的恢复建议。",
    uncertainty: "在数据源可用并获得许可前，无法支持心率、睡眠或 readiness 相关结论。",
  },
  fatLossAdherence: {
    label: "减脂",
    title: "下一次训练以可持续为主",
    recommendation: "开始 30-45 分钟全身训练或坡度步行，并记录时长、卡路里和努力程度。强度保持在本周还能重复的水平。",
    observation: "当前目标更需要关注每周训练是否稳定，而不是某一个动作是否立刻加重。",
    interpretation: "对减脂来说，可重复的训练时间和能量消耗比单次力量进阶更有参考价值。",
    rationale: "稳定记录训练时长和能量输出，能给 AI Coach 更可靠的减脂建议依据。",
    uncertainty: "这不会估算热量缺口或体脂变化；饮食、步数、睡眠、压力和身体指标仍不完整。",
  },
  healthConsistency: {
    label: "稳定性",
    title: "下一次训练保持容易重复",
    recommendation: "开始 20-30 分钟恢复、灵活性或轻量全身训练。记录时长、努力程度和训练后的感觉。",
    observation: "你的目标更偏总体健康或恢复，关键是训练频率和恢复能不能持续。",
    interpretation: "可重复训练比单次高强度表现更重要。",
    rationale: "容易重复的训练能保持节奏，也避免把总体健康目标变成最大强度力量计划。",
    uncertainty: "这里只使用训练记录；睡眠、酸痛、压力、疾病和日常步数并不完整。",
  },
  inconsistentLogging: {
    label: "记录",
    title: "让接下来两次训练更容易比较",
    recommendation: "接下来两次训练，至少记录主动作的动作名、重量、次数、完成组数和 RPE。",
    observation: "缺少组数、RPE 或训练详情会让进阶和恢复信号不稳定。",
    interpretation: "记录不完整时，AI Coach 很难判断是训练变化还是记录缺口。",
    rationale: "少量但完整的记录能提供可比较的数据，同时不拖慢训练。",
    uncertainty: "App 无法判断缺失数据代表跳过训练，还是只是没有记录。",
  },
};

let profileRecordings = [];

const healthPermissions = [
  ["Heart rate", "Read during workouts", false],
  ["Active calories", "Sync from Apple Watch", false],
  ["Workout duration", "Write finished sessions", false],
  ["Body metrics", "Read weight and body measurements when available", false],
  ["Location", "Off for strength workouts", false],
];

const healthSyncState = {
  connected: false,
  lastSyncAt: new Date().toISOString(),
  device: "Apple Watch",
};

const profileSettingsState = {
  language: "English",
  weightUnit: "lb",
  bodyUnit: "ft/in",
  energyUnit: "kcal",
  goal: "",
  coachingStyle: "Balanced",
};

const profileSettingOptions = {
  language: ["English", "简体中文"],
  weightUnit: ["lb", "kg"],
  bodyUnit: ["cm", "ft/in"],
  energyUnit: ["kcal", "kJ"],
  coachingStyle: ["Balanced", "Aggressive", "Recovery-first"],
};

const userProfile = {
  name: "",
  age: "",
  heightCm: "",
  weightLb: "",
  sex: "",
  frequency: "",
  generalGoal: "",
  focusAreas: "",
  targetWeightLb: "",
  bodyFat: "",
  targetBodyFat: "",
  appleHealthWeight: "",
  measurements: {
    waistIn: "",
    hipIn: "",
    thighIn: "",
    armIn: "",
  },
  bodyMetricEntries: [],
};

let currentWeightUnit = "lb";
let currentDistanceUnit = "mi";
let pendingDeleteRecordingIndex = null;
let editingRecordingIndex = null;

function saveAppState() {
  const state = {
    appStateVersion,
    profileSettingsState,
    userProfile,
    pinnedTrends,
    activeTrend,
    selectedTrendRange,
    savedStandards,
    profileRecordings,
    healthSyncState,
    healthPermissions,
  };
  localStorage.setItem(appStateStorageKey, JSON.stringify(state));
}

function migratePinnedTrends(savedState) {
  if (savedState.appStateVersion >= appStateVersion) return;

  const hasDistanceTrend = pinnedTrends.some((exerciseKey) => trendMetricForExercise(exerciseKey).key === "distanceMeters");
  const hasDurationTrend = pinnedTrends.some((exerciseKey) => trendMetricForExercise(exerciseKey).key === "durationMinutes");
  if (hasDistanceTrend && hasDurationTrend) return;

  pinnedTrends = ["hipThrust", "rowErg", "treadmillWalk", "foamRolling"];
  activeTrend = "hipThrust";
}

function loadAppState() {
  try {
    const savedState = JSON.parse(localStorage.getItem(appStateStorageKey) || "null");
    if (!savedState) return;
    const savedPinnedTrends = Array.isArray(savedState.pinnedTrends) && savedState.pinnedTrends.length > 0
      ? savedState.pinnedTrends
      : null;

    if (savedState.profileSettingsState) {
      Object.assign(profileSettingsState, savedState.profileSettingsState);
      normalizeProfileSettingsState();
    }
    if (savedState.healthSyncState) {
      Object.assign(healthSyncState, savedState.healthSyncState);
    }
    if (Array.isArray(savedState.healthPermissions)) {
      savedState.healthPermissions.forEach((permission) => {
        const label = permission?.[0];
        const storedEnabled = permission?.[2];
        const permissionRow = healthPermissions.find(([permissionLabel]) => permissionLabel === label);
        if (permissionRow && typeof storedEnabled === "boolean") {
          permissionRow[2] = storedEnabled;
        }
      });
    }
    if (savedState.userProfile) {
      Object.assign(userProfile, savedState.userProfile);
      userProfile.measurements = {
        ...userProfile.measurements,
        ...(savedState.userProfile.measurements || {}),
      };
      userProfile.bodyMetricEntries = savedState.userProfile.bodyMetricEntries || userProfile.bodyMetricEntries;
    }
    if (["week", "month", "year"].includes(savedState.selectedTrendRange)) {
      selectedTrendRange = savedState.selectedTrendRange;
    }
    if (Array.isArray(savedState.savedStandards)) {
      savedStandards = savedState.savedStandards;
      ensureSavedStandardIds();
    }
    if (Array.isArray(savedState.profileRecordings)) {
      profileRecordings = savedState.profileRecordings;
    }
    ensureRecordedExerciseTrends();
    if (savedPinnedTrends) {
      pinnedTrends = savedPinnedTrends.filter((exerciseKey) => exerciseTrends[exerciseKey]);
    }
    migratePinnedTrends(savedState);
    if (savedState.activeTrend && exerciseTrends[savedState.activeTrend]) {
      activeTrend = savedState.activeTrend;
    }
  } catch {
    localStorage.removeItem(appStateStorageKey);
  }
}

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    navigateToScreen(item.dataset.screen);
  });
});

function navigateToScreen(target) {
  if (target !== "profile-screen" && profileReturnScreen) {
    resetProfileDetailToHome();
  }
  if (target === "trends-screen") {
    refreshTrendsScreen();
  }
  navItems.forEach((navItem) => navItem.classList.toggle("active", navItem.dataset.screen === target));
  screenEls.forEach((screen) => screen.classList.toggle("active", screen.id === target));
  title.textContent = getScreenTitle(target);
  document.querySelector(`#${target}`)?.scrollTo({ top: 0 });
}

function refreshTrendsScreen() {
  renderWorkoutTrends();
  renderTrendChips();
}

function clearProfileReturnContext() {
  profileReturnScreen = "";
  if (profileBackButton) {
    profileBackButton.textContent = "Back to Profile";
  }
}

function resetProfileDetailToHome() {
  clearProfileReturnContext();
  activeProfileDetailKey = "";
  profileDetailPanel.hidden = true;
  profileHome.hidden = false;
}

function getScreenTitle(target) {
  if (isChineseLanguage()) {
    return { "today-screen": "今天", "trends-screen": "趋势", "coach-screen": "AI 教练", "profile-screen": "个人" }[target] || screens[target];
  }
  return screens[target];
}

function isChineseLanguage() {
  return profileSettingsState.language === "简体中文";
}

function tx(text) {
  return isChineseLanguage() ? zhText[text] || text : text;
}

function localizedRangeName(range) {
  if (!isChineseLanguage()) return rangeLabel(range);
  return { week: "本周", month: "本月", year: "今年" }[range] || rangeLabel(range);
}

function localizedPreviousRangeName(range) {
  if (!isChineseLanguage()) return `last ${rangeLabel(range)}`;
  return { week: "上周", month: "上月", year: "去年" }[range] || `上个${rangeLabel(range)}`;
}

function localizedComparisonText(currentValue, previousValue, range, unit = "") {
  if (!isChineseLanguage()) return comparisonText(currentValue, previousValue, range, unit);
  if (!previousValue) return `没有${localizedPreviousRangeName(range)}数据`;
  const diff = currentValue - previousValue;
  const sign = diff > 0 ? "+" : "";
  const rounded = Math.abs(diff) >= 10 ? Math.round(diff) : diff.toFixed(1).replace(/\.0$/, "");
  return `${sign}${rounded}${unit} 对比${localizedPreviousRangeName(range)}`;
}

function localizedMetricLabel(metric) {
  if (!isChineseLanguage()) return metric.label;
  if (metric.key === "distanceMeters") return `距离（${distanceUnit()}）`;
  if (metric.key === "durationMinutes") return "时长（min）";
  return "训练量";
}

function localizedBodyMetricLabel(label) {
  return isChineseLanguage() ? zhBodyMetricLabels[label] || label : label;
}

function localizedBodyMetricSourceSummary(summary) {
  if (!summary) return isChineseLanguage() ? "无" : "none";
  if (!isChineseLanguage()) return summary;
  return String(summary)
    .split(", ")
    .map((item) => {
      const [label, source] = item.split(": ");
      const localizedLabel = localizedBodyMetricLabel(label);
      const localizedSource = localizedMetricSourceLabel(source);
      return source ? `${localizedLabel}: ${localizedSource}` : localizedLabel;
    })
    .join("，");
}

function localizedHealthScopeList(scopes = []) {
  if (!Array.isArray(scopes) || scopes.length === 0) return isChineseLanguage() ? "无" : "none";
  return scopes.map((scope) => tx(scope)).join(isChineseLanguage() ? "、" : ", ");
}

function localizedExcludedCoachFields(fields = []) {
  if (!Array.isArray(fields) || fields.length === 0) return isChineseLanguage() ? "无" : "none";
  if (!isChineseLanguage()) return fields.join(", ");
  const labels = {
    name: "姓名",
    age: "年龄",
    sex: "性别",
    height: "身高",
    weight: "体重",
    "body measurements": "身体围度",
    location: "位置",
    "raw heart-rate samples": "原始心率样本",
  };
  return fields.map((field) => labels[field] || field).join("、");
}

function localizedExerciseName(name) {
  return isChineseLanguage() ? zhExerciseNames[name] || name : name;
}

function canonicalExerciseNameFromLocalized(name) {
  const normalized = String(name || "").trim();
  if (exerciseCatalog[normalized]) return normalized;
  return Object.entries(zhExerciseNames).find(([, localizedName]) => localizedName === normalized)?.[0] || normalized;
}

function localizedTrendExerciseTitle(exerciseKey) {
  return localizedExerciseName(exerciseTrends[exerciseKey]?.title || "");
}

function localizedGroupName(group) {
  return isChineseLanguage() ? zhGroupLabels[group] || group : group;
}

function translatedTargetText(target) {
  const cleanTarget = String(target || "").replace(/^Added ·\s*/i, "").replace(/^Tap name to rename ·\s*/i, "");
  if (!isChineseLanguage()) return cleanTarget;
  return cleanTarget
    .replace(/^target/i, "目标")
    .replace(/\btarget\b/gi, "目标")
    .replace(/^Last time/i, "上次")
    .replace(/^Next/i, "下一步")
    .replace(/^Suggested upgrade/i, "建议进阶")
    .replace(/\beasy movement\b/i, "轻松活动")
    .replace(/\beasy pull\b/i, "轻松拉力")
    .replace(/\bmobility\b/i, "灵活性")
    .replace(/\brecovery\b/i, "恢复")
    .replace(/\bbodyweight\b/i, "自重")
    .replace(/\bsec\/side\b/gi, "秒/侧")
    .replace(/\bsec\b/gi, "秒")
    .replace(/\bmin\b/gi, "分钟")
    .replace(/\byd\/side\b/gi, "码/侧")
    .replace(/\byd\b/gi, "码");
}

function localizedTargetText(target, isCustom = false) {
  if (!isChineseLanguage()) return target;
  const translated = translatedTargetText(target);
  return isCustom ? `点击名称可重命名 · ${translated}` : `已添加 · ${translated}`;
}

function localizedWorkoutName(name) {
  if (!isChineseLanguage()) return name;
  return String(name || "")
    .replace("Glute Focus", "臀腿训练")
    .replace("Shoulder Strength", "肩部力量")
    .replace("Back Focus", "背部训练")
    .replace("Chest Focus", "胸部训练")
    .replace("Abs Focus", "腹部训练")
    .replace("Arms Focus", "手臂训练")
    .replace("Recovery Flow", "恢复训练")
    .replace("Custom Workout", "自定义训练")
    .replace("Saved Standard", "已保存模板")
    .replace("Workout", "训练");
}

function localizedToastValue(value) {
  if (!isChineseLanguage()) return value;
  return tx(localizedGoalText(localizedWorkoutName(value || "")));
}

function localizedHealthPermissionToast(permission) {
  const [label, , enabled] = permission || [];
  return `${tx(label || "")} ${tx(enabled ? "enabled" : "disabled")}`;
}

function canonicalCurrentWorkoutName() {
  return workouts[currentWorkoutKey]?.title || workoutTitle.dataset.workoutName || workoutTitle.textContent || "Workout";
}

function localizedSummaryTitle(workoutName) {
  const name = localizedWorkoutName(workoutName || "Workout");
  return isChineseLanguage() ? `${name}总结` : `${workoutName || "Workout"} Summary`;
}

function localizedStandardName(workoutName) {
  const name = localizedWorkoutName(workoutName || "Workout");
  return isChineseLanguage() ? `${name}模板` : `${workoutName || "Workout"} Standard`;
}

function localizedSetCountLabel(count) {
  const safeCount = Math.max(1, Number(count) || 1);
  return isChineseLanguage() ? `${safeCount} 组` : Domain.formatSetCountLabel(count);
}

function localizedSetNumberLabel(setNumber) {
  return isChineseLanguage() ? `第 ${setNumber} 组` : `Set ${setNumber}`;
}

function localizedSetGridLabel(exerciseName) {
  const name = localizedExerciseName(exerciseName);
  return isChineseLanguage() ? `${name} 组数` : `${name} sets`;
}

function localizedWorkoutSetDetail(set) {
  const detail = Domain.formatWorkoutSetDetail(set, weightUnit());
  return isChineseLanguage() ? translatedTargetText(detail) : detail;
}

function localizedSummaryTrendsNote(sessionCalories, sessionMinutes) {
  return isChineseLanguage()
    ? `趋势已更新：+1 次训练，+${formatEnergyFromKcal(sessionCalories)} ${energyUnit()}，+${sessionMinutes} 分钟，已计入周、月、年视图。`
    : `Trends updated: +1 workout, +${formatEnergyFromKcal(sessionCalories)} ${energyUnit()}, +${sessionMinutes} min in Week, Month, and Year views.`;
}

function localizedSetFieldLabel(label) {
  if (!isChineseLanguage()) return label;
  if (label.startsWith("Distance")) return `距离（${distanceUnit()}）`;
  return tx(label);
}

function localizedOptionLabel(option) {
  return isChineseLanguage() ? tx(option) : option;
}

function optionHtml(option, selectedValue) {
  return `<option value="${escapeHtml(option)}"${selectedValue === option ? " selected" : ""}>${escapeHtml(localizedOptionLabel(option))}</option>`;
}

function localizedGoalText(goal) {
  const text = String(goal || "").trim();
  if (!isChineseLanguage() || !text) return text;
  const replacements = [
    ["Build strength with glute emphasis", "提升力量，臀部优先"],
    ["glute emphasis", "臀部优先"],
    ["keeping glute emphasis higher than quad-dominant leg volume", "让臀部训练占比高于股四头肌主导训练"],
    ["glute-growth goal", "臀部增长目标"],
    ["Fat loss", "减脂"],
    ["General health", "总体健康"],
    ["Lean muscle", "精瘦增肌"],
    ["Build strength", "提升力量"],
    ["Strength", "力量"],
    ["Bulk", "增肌增重"],
    ["glutes", "臀部"],
    ["shoulders", "肩部"],
    ["back", "背部"],
    ["with", "，"],
    ["and", "和"],
  ];
  return replacements.reduce((value, [from, to]) => value.replace(new RegExp(from, "gi"), to), text);
}

function setExerciseCardData(card, { name, group, target } = {}) {
  if (!card) return;
  const heading = card.querySelector("h3");
  const targetNode = card.querySelector(".exercise-topline p");
  const pill = card.querySelector(".pill:not(.green)");
  card.dataset.exerciseName = name || card.dataset.exerciseName || heading?.textContent.trim() || "Exercise";
  card.dataset.exerciseGroup = group || card.dataset.exerciseGroup || pill?.textContent.trim() || exerciseCatalog[card.dataset.exerciseName]?.group || "Custom";
  card.dataset.exerciseTarget = target || card.dataset.exerciseTarget || targetNode?.textContent.trim()?.replace(/^Added ·\s*/i, "").replace(/^Tap name to rename ·\s*/i, "") || exerciseCatalog[card.dataset.exerciseName]?.target || "target 3 x 10";
}

function localizeExerciseCard(card) {
  if (!card) return;
  setExerciseCardData(card);
  const name = getExerciseName(card);
  const group = getExerciseGroup(card);
  const isEditable = Boolean(card.querySelector(".editable-name"));
  const heading = card.querySelector("h3");
  const targetNode = card.querySelector(".exercise-topline p");
  const pill = card.querySelector(".pill:not(.green)");
  if (heading && !isEditable) heading.textContent = localizedExerciseName(name);
  if (targetNode) targetNode.textContent = localizedTargetText(card.dataset.exerciseTarget, isEditable);
  if (pill) pill.textContent = localizedGroupName(group);
  card.querySelectorAll("[data-finish-set]").forEach((button) => { button.textContent = tx("Finish Set"); });
  card.querySelectorAll("[data-finish-exercise]").forEach((button) => { button.textContent = tx("Finish Exercise"); });
  card.querySelectorAll("[data-start-exercise]").forEach((button) => { button.textContent = tx("Start Exercise"); });
  card.querySelectorAll(".pill.green").forEach((pillNode) => { pillNode.textContent = tx("Done"); });
  card.querySelectorAll("[data-delete-exercise]").forEach((button) => {
    if (!card.classList.contains("confirm-delete")) button.textContent = tx("Delete Exercise");
  });
  card.querySelectorAll("[data-edit-complete-set]").forEach((button) => { button.textContent = tx("Edit"); });
  card.querySelectorAll("[data-delete-set]").forEach((button) => {
    if (!button.closest(".confirm-delete")) button.textContent = tx("Delete");
  });
  card.querySelectorAll(".set-row label span").forEach((label, index) => {
    const input = label.parentElement?.querySelector("input");
    const text = label.textContent.trim();
    if (text === "Weight" || text.startsWith("Weight") || text === "重量") {
      if (input && !input.dataset.setField) input.dataset.setField = "weight";
      label.textContent = localizedSetFieldLabel("Load");
    } else if (text === "Reps" || text === "次数") {
      if (input && !input.dataset.setField) input.dataset.setField = "reps";
      label.textContent = localizedSetFieldLabel("Reps");
    } else if (text === "Duration" || text.startsWith("Duration") || text.startsWith("时长")) {
      if (input && !input.dataset.setField) input.dataset.setField = "duration";
      label.textContent = localizedSetFieldLabel("Duration (min)");
    } else if (text === "Time" || text.startsWith("Time") || text.startsWith("时间")) {
      if (input && !input.dataset.setField) input.dataset.setField = "duration";
      label.textContent = localizedSetFieldLabel("Time (min)");
    } else if (text.startsWith("Distance") || text.startsWith("距离")) {
      if (input && !input.dataset.setField) input.dataset.setField = "distance";
      label.textContent = localizedSetFieldLabel(`Distance (${distanceUnit()})`);
    } else if (text === "RPE" && input && !input.dataset.setField) {
      input.dataset.setField = "rpe";
    } else if (input && !input.dataset.setField) {
      input.dataset.setField = ["weight", "reps", "rpe"][index % 3] || "rpe";
    }
    if (input) input.setAttribute("aria-label", label.textContent.trim());
  });
  card.querySelectorAll(".set-grid").forEach((grid) => {
    grid.setAttribute("aria-label", localizedSetGridLabel(getExerciseName(card)));
  });
}

function localizeExerciseCards() {
  exerciseList.querySelectorAll(".exercise-card").forEach(localizeExerciseCard);
}

function localizedMetricSourceLabel(source) {
  const label = metricSourceLabel(source);
  if (!isChineseLanguage()) return label;
  return { "Apple Health": "Apple Health", manual: "手动", estimated: "估算" }[label] || label;
}

function localizedMetricChange(latest, previous, key, type = "raw") {
  const english = metricChange(latest, previous, key, type);
  if (!isChineseLanguage()) return english;
  if (english === "new data point") return "新数据点";
  const match = english.match(/^([+-]?[\d.]+(?:\s(?:lb|kg|cm|in|pts|%|kcal|m|yd|min))?) since (\d{2}\/\d{2})$/);
  return match ? `自 ${match[2]} 起 ${match[1]}` : english;
}

function localizedTrendMetricPhrase(metric) {
  if (!isChineseLanguage()) return `4-week ${metric.label}`;
  return `4 周${localizedMetricLabel(metric)}`;
}

function localizedTrendAriaLabel(title, metric) {
  if (!isChineseLanguage()) return `${title} ${metric.label} trend chart`;
  return `${title} ${localizedMetricLabel(metric)}趋势图`;
}

function localizedExerciseTrendNote(title, dataPoints, metric, fallbackNote) {
  if (!dataPoints.length) {
    if (!isChineseLanguage()) return fallbackNote;
    return `${title} 暂时还没有足够的记录点。继续记录这个动作后，这里会显示${localizedMetricLabel(metric)}趋势。`;
  }
  const latest = displayTrendMetricValue(dataPoints[dataPoints.length - 1].volume, metric);
  if (!isChineseLanguage()) {
    return `${title} is based on ${dataPoints.length} recorded data point${dataPoints.length === 1 ? "" : "s"}. Latest ${metric.label}: ${latest}.`;
  }
  return `${title} 基于 ${dataPoints.length} 个已记录数据点。最新${localizedMetricLabel(metric)}：${latest}。`;
}

function focusGroupLabel(group, readout = false) {
  if (!isChineseLanguage()) return readout ? group.readout : group.label;
  return zhFocusLabels[group.key]?.[readout ? 1 : 0] || (readout ? group.readout : group.label);
}

function localizedCoachRecommendation(recommendation) {
  if (!isChineseLanguage()) return recommendation;
  const text = zhRecommendationText[recommendation.id] || {};
  return {
    ...recommendation,
    label: text.label || recommendation.label,
    title: text.title || recommendation.title,
    recommendation: text.recommendation || recommendation.recommendation,
    observation: text.observation || recommendation.observation,
    interpretation: text.interpretation || recommendation.interpretation,
    rationale: text.rationale || recommendation.rationale,
    uncertainty: text.uncertainty || recommendation.uncertainty,
    confidence: { high: "高", medium: "中", low: "低" }[recommendation.confidence] || recommendation.confidence,
    dataWindow: recommendation.dataWindow === "last 7 days" ? "最近 7 天" : recommendation.dataWindow,
  };
}

function setText(selector, englishText) {
  const element = document.querySelector(selector);
  if (element) element.textContent = tx(englishText);
}

function setAllText(selector, englishText) {
  document.querySelectorAll(selector).forEach((element) => {
    element.textContent = tx(englishText);
  });
}

function localizeStandardsSheet() {
  setText("[data-standards-sheet] .eyebrow", "Reusable workouts");
  setText("#standards-title", "Saved Standards");
  setAllText("[data-close-standards]", "Close");
  setText(".standard-search span", "Find standard");
  const input = document.querySelector("[data-standards-search]");
  if (input) {
    input.placeholder = tx("Search standards or exercises");
    input.setAttribute("aria-label", tx("Search standards or exercises"));
  }
}

function localizeAddExerciseSheet() {
  setText("[data-add-exercise-sheet] .eyebrow", "Add to workout");
  setText("#add-exercise-title", "Choose exercise");
  setAllText("[data-close-add-exercise]", "Close");
  const input = document.querySelector("[data-exercise-search]");
  if (input) {
    input.placeholder = tx("Search recorded exercises");
    input.setAttribute("aria-label", tx("Search recorded exercises"));
  }
}

function localizedProfileDetail(detailKey) {
  return isChineseLanguage() && zhProfileDetails[detailKey]
    ? { ...profileDetails[detailKey], ...zhProfileDetails[detailKey] }
    : profileDetails[detailKey];
}

function normalizeProfileSettingsState() {
  Object.entries(profileSettingOptions).forEach(([key, options]) => {
    if (!options.includes(profileSettingsState[key])) {
      profileSettingsState[key] = options[0];
    }
  });
  profileSettingsState.goal = normalizedStandardName(profileSettingsState.goal);
}

function weightUnit() {
  return profileSettingsState.weightUnit;
}

function bodyUnit() {
  return profileSettingsState.bodyUnit;
}

function measurementUnit() {
  return bodyUnit() === "cm" ? "cm" : "in";
}

function distanceUnit() {
  return bodyUnit() === "cm" ? "m" : "mi";
}

function energyUnit() {
  return profileSettingsState.energyUnit || "kcal";
}

function bodyMetricsPermissionEnabled() {
  return healthPermissions.some(([label, , enabled]) => label === "Body metrics" && enabled);
}

function unitSummary() {
  return `${profileSettingsState.weightUnit} · ${profileSettingsState.bodyUnit} · ${energyUnit()}`;
}

function goalSummary() {
  const goal = localizedGoalText(profileSettingsState.goal || userProfile.generalGoal || tx("Goal not set"));
  return goal.length > 34 ? `${goal.slice(0, 31)}...` : goal;
}

function onboardingMetricLabel(label, unit = "") {
  return unit ? `${tx(label)} (${unit})` : tx(label);
}

function applyOnboardingMetricLabels() {
  const labelConfigs = [
    ["Name"],
    ["Age"],
    ["Height", "ft"],
    ["Height", "in"],
    ["Weight", weightUnit()],
    ["Sex"],
    ["Training frequency"],
    ["General goal"],
    ["Focus areas"],
    ["Target weight", weightUnit()],
    ["Current body fat", "%"],
    ["Target body fat", "%"],
  ];
  document.querySelectorAll(".onboarding-grid label span").forEach((label, index) => {
    const [text, unit] = labelConfigs[index] || [label.textContent || ""];
    label.textContent = onboardingMetricLabel(text, unit);
  });
  document.querySelector("[data-onboard-height-ft]")?.setAttribute("placeholder", "ft");
  document.querySelector("[data-onboard-height-in]")?.setAttribute("placeholder", "in");
  document.querySelector("[data-onboard-weight]")?.setAttribute("placeholder", weightUnit());
  document.querySelector("[data-onboard-target-weight]")?.setAttribute("placeholder", weightUnit());
  document.querySelector("[data-onboard-current-body-fat]")?.setAttribute("placeholder", "%");
  document.querySelector("[data-onboard-body-fat]")?.setAttribute("placeholder", "%");
}

function profileGoalFromFields(generalGoal, focusAreas) {
  const goal = normalizedStandardName(generalGoal);
  const focus = normalizedStandardName(focusAreas);
  if (goal && focus) return `${goal}: ${focus}`;
  return goal || focus || "";
}

function convertWeightValue(value, fromUnit, toUnit) {
  return Domain.convertWeightValue(value, fromUnit, toUnit);
}

function convertHeightValue(value, fromUnit, toUnit) {
  return Domain.convertHeightValue(value, fromUnit, toUnit);
}

function convertMeasurementValue(value, fromUnit, toUnit) {
  return Domain.convertMeasurementValue(value, fromUnit, toUnit);
}

function formatDistanceNumber(value, unit) {
  if (!Number.isFinite(value)) return "";
  if (unit === "mi" && value < 1) return value.toFixed(2).replace(/0$/, "");
  if (unit === "mi" || unit === "km") return `${Math.round(value * 10) / 10}`;
  return `${Math.round(value)}`;
}

function convertDistanceValue(value, fromUnit, toUnit) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric) || fromUnit === toUnit) return String(value || "");
  const meters = {
    m: numeric,
    km: numeric * 1000,
    yd: numeric / 1.09361,
    mi: numeric * 1609.34,
  }[fromUnit];
  if (!Number.isFinite(meters)) return String(value || "");
  const converted = {
    m: meters,
    km: meters / 1000,
    yd: meters * 1.09361,
    mi: meters / 1609.34,
  }[toUnit];
  return formatDistanceNumber(converted, toUnit);
}

function energyFromKcal(kcal) {
  const numeric = Number(kcal) || 0;
  return energyUnit() === "kJ" ? Math.round(numeric * 4.184) : Math.round(numeric);
}

function kcalFromEnergy(value) {
  const numeric = Number(value) || 0;
  return energyUnit() === "kJ" ? Math.round(numeric / 4.184) : Math.round(numeric);
}

function formatEnergyFromKcal(kcal, { compact = false, empty = "0" } = {}) {
  const value = energyFromKcal(kcal);
  if (!value && empty) return empty;
  return compact ? formatCompactNumber(value) : value.toLocaleString();
}

function convertDistanceText(value, toUnit = distanceUnit()) {
  const text = String(value || "").trim();
  const normalizedText = normalizeDistanceUnitText(text);
  const match = normalizedText.match(/^(\d+(?:\.\d+)?)\s*(m|yd|km|mi)\b(.*)$/i);
  if (!match) return text;
  const [, amount, fromUnit, suffix = ""] = match;
  return `${convertDistanceValue(amount, fromUnit.toLowerCase(), toUnit)} ${toUnit}${suffix}`;
}

function normalizeDistanceUnitText(value) {
  return String(value || "").trim()
    .replace(/(\d+(?:\.\d+)?)\s*(?:公里|千米)/g, "$1 km")
    .replace(/(\d+(?:\.\d+)?)\s*(?:英里)/g, "$1 mi")
    .replace(/(\d+(?:\.\d+)?)\s*(?:码)/g, "$1 yd")
    .replace(/(\d+(?:\.\d+)?)\s*(?:米)/g, "$1 m");
}

function normalizeDistanceEntry(value) {
  const text = normalizeDistanceUnitText(value);
  if (!text) return "";
  if (/\b(m|yd|km|mi)\b/i.test(text)) return convertDistanceText(text, distanceUnit());
  return `${text} ${distanceUnit()}`;
}

function normalizedDecimalText(value) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return "";
  const rounded = Math.round(numeric * 10) / 10;
  return String(rounded).replace(/\.0$/, "");
}

function normalizeDurationEntry(value) {
  const text = normalizeDurationUnitText(value);
  if (!text) return "";
  const match = text.match(/^(\d+(?:\.\d+)?)\s*(sec|min)?$/i);
  if (!match) return text;
  const minutes = match[2]?.toLowerCase() === "sec" ? Number(match[1]) / 60 : Number(match[1]);
  return normalizedDecimalText(minutes);
}

function durationInputValue(value) {
  return normalizeDurationEntry(value);
}

function normalizeDurationUnitText(value) {
  return String(value || "").trim()
    .replace(/(\d+(?:\.\d+)?)\s*(?:分钟|分)/g, "$1 min")
    .replace(/(\d+(?:\.\d+)?)\s*(?:秒钟|秒)/g, "$1 sec");
}

function normalizeRepsEntry(value) {
  const text = String(value || "").trim();
  if (!text) return "";
  return text
    .replace(/(\d+(?:\.\d+)?)\s*(?:次|个)\s*((?:每侧|每边|\/侧))?/g, (_, reps, sideText) => {
      return sideText ? `${reps}/side` : reps;
    })
    .replace(/(\d+(?:\.\d+)?)\s*(?:每侧|每边|\/侧)/g, "$1/side");
}

function formatProfileWeight(lbValue) {
  if (!String(lbValue || "").trim()) return tx("Not set");
  return weightUnit() === "kg" ? `${convertWeightValue(lbValue, "lb", "kg")} kg` : `${lbValue} lb`;
}

function formatProfileHeight(cmValue) {
  if (!String(cmValue || "").trim()) return tx("Not set");
  if (bodyUnit() === "cm") return `${cmValue} cm`;
  const feetDecimal = Number(convertHeightValue(cmValue, "cm", "ft"));
  if (!Number.isFinite(feetDecimal)) return `${cmValue} cm`;
  const feet = Math.floor(feetDecimal);
  const inches = Math.round((feetDecimal - feet) * 12);
  return `${feet}'${inches}"`;
}

function formatMeasurement(inValue) {
  return measurementUnit() === "cm" ? `${convertMeasurementValue(inValue, "in", "cm")} cm` : `${inValue} in`;
}

function bodyFatDisplay(value) {
  return String(value || "").includes("%") ? value : `${value}%`;
}

function todayDateString() {
  return Domain.localDateString();
}

function latestBodyMetricEntry() {
  return validBodyMetricEntries().sort((a, b) => b.date.localeCompare(a.date))[0];
}

function validBodyMetricEntries() {
  const entries = Array.isArray(userProfile.bodyMetricEntries) ? userProfile.bodyMetricEntries : [];
  return entries.filter((entry) => isValidPastOrTodayDateValue(entry?.date));
}

function ensureBodyMetricEntries() {
  if (!Array.isArray(userProfile.bodyMetricEntries)) {
    userProfile.bodyMetricEntries = [];
  }
  return userProfile.bodyMetricEntries;
}

function entriesForMetric(key) {
  return validBodyMetricEntries()
    .filter((entry) => entry[key] !== undefined && entry[key] !== "")
    .sort((a, b) => a.date.localeCompare(b.date));
}

function latestMetricEntry(key) {
  return entriesForMetric(key).at(-1);
}

function comparisonBodyMetricEntry(latest, key) {
  if (!latest) return null;
  const latestDate = new Date(`${latest.date}T00:00:00`);
  const entries = entriesForMetric(key);
  return (
    entries
      .filter((entry) => {
        const diffDays = (latestDate - new Date(`${entry.date}T00:00:00`)) / 86400000;
        return diffDays >= 21 && diffDays <= 35;
      })
      .at(-1) || entries[0]
  );
}

function metricDataPointCount(latest, key) {
  if (!latest) return 0;
  const latestDate = new Date(`${latest.date}T00:00:00`);
  return entriesForMetric(key).filter((entry) => {
    const diffDays = (latestDate - new Date(`${entry.date}T00:00:00`)) / 86400000;
    return diffDays >= 0 && diffDays <= 28;
  }).length;
}

function metricSource(entry, key) {
  return entry?.sources?.[key] || entry?.source || "manual";
}

function metricSourceLabel(source) {
  return Domain.dataSourceLabel(source);
}

function numericMetric(value) {
  const numeric = Number(String(value || "").replace("%", ""));
  return Number.isFinite(numeric) ? numeric : null;
}

function metricChange(latest, previous, key, type = "raw") {
  let latestValue = numericMetric(latest?.[key]);
  let previousValue = numericMetric(previous?.[key]);
  if (latestValue === null || previousValue === null || latest?.date === previous?.date) return "new data point";
  let suffix = "";
  if (type === "weight") {
    latestValue = Number(convertWeightValue(latestValue, "lb", weightUnit()));
    previousValue = Number(convertWeightValue(previousValue, "lb", weightUnit()));
    suffix = ` ${weightUnit()}`;
  } else if (type === "measurement") {
    latestValue = Number(convertMeasurementValue(latestValue, "in", measurementUnit()));
    previousValue = Number(convertMeasurementValue(previousValue, "in", measurementUnit()));
    suffix = ` ${measurementUnit()}`;
  } else if (type === "bodyFat") {
    suffix = " pts";
  }
  const diff = latestValue - previousValue;
  const sign = diff > 0 ? "+" : "";
  const rounded = Math.abs(diff) >= 10 ? Math.round(diff) : diff.toFixed(1).replace(/\.0$/, "");
  return `${sign}${rounded}${suffix} since ${previous.date.slice(5).replace("-", "/")}`;
}

function formatEntryWeight(entry) {
  return formatProfileWeight(entry.weightLb);
}

function formatEntryMeasurement(entry, key) {
  return formatMeasurement(entry[key]);
}

function renderBodyMetricsTrend() {
  if (!bodyMetricGrid) return;

  const metricRows = [
    ["Weight", "weightLb", "weight", (entry) => formatEntryWeight(entry)],
    ["Body fat", "bodyFat", "bodyFat", (entry) => bodyFatDisplay(entry.bodyFat)],
    ["Waist", "waistIn", "measurement", (entry) => formatEntryMeasurement(entry, "waistIn")],
    ["Hip", "hipIn", "measurement", (entry) => formatEntryMeasurement(entry, "hipIn")],
    ["Thigh", "thighIn", "measurement", (entry) => formatEntryMeasurement(entry, "thighIn")],
    ["Arm", "armIn", "measurement", (entry) => formatEntryMeasurement(entry, "armIn")],
  ]
    .map(([label, key, type, formatter]) => {
      const latest = latestMetricEntry(key);
      if (!latest) return null;
      const previous = comparisonBodyMetricEntry(latest, key);
      return {
        label,
        value: formatter(latest),
        source: localizedMetricSourceLabel(metricSource(latest, key)),
        date: latest.date,
        count: metricDataPointCount(latest, key),
        change: localizedMetricChange(latest, previous, key, type),
      };
    })
    .filter(Boolean);

  bodyMetricGrid.replaceChildren();

  metricRows.forEach(({ label, value, source, date, count, change }) => {
    const row = document.createElement("div");
    row.className = "body-metric-card";
    const countLabel = isChineseLanguage()
      ? `${count} 个数据点 · 4 周内`
      : `${count} data point${count === 1 ? "" : "s"} in 4 wk`;
    row.innerHTML = `<div class="metric-card-top"><span>${escapeHtml(localizedBodyMetricLabel(label))}</span><span class="source-pill">${escapeHtml(source)}</span></div><strong>${escapeHtml(value)}</strong><small>${escapeHtml(date)} · ${escapeHtml(countLabel)}</small><em>${escapeHtml(change)}</em>`;
    bodyMetricGrid.append(row);
  });
}

function numberFromMeta(meta, pattern) {
  return Domain.numberFromMeta(meta, pattern);
}

function workoutMinutes(recording) {
  return Domain.workoutMinutes(recording);
}

function workoutCalories(recording) {
  return Domain.workoutCalories(recording);
}

function recordingDate(recording) {
  return Domain.recordingDate(recording);
}

function periodBounds(range, offset = 0) {
  return Domain.periodBounds(range, offset);
}

function recordingsInRange(range, offset = 0) {
  return Domain.recordingsInRange(profileRecordings, range, offset);
}

function latestIncludedRecording(recordings) {
  return [...recordings]
    .sort((a, b) => Domain.recordingDateOrNull(b) - Domain.recordingDateOrNull(a))[0] || null;
}

function rangeLabel(range) {
  return Domain.rangeLabel(range);
}

function comparisonText(currentValue, previousValue, range, unit = "") {
  return Domain.comparisonText(currentValue, previousValue, range, unit);
}

function setComparisonClass(node, currentValue, previousValue) {
  node.classList.toggle("positive", previousValue > 0 && currentValue >= previousValue);
  node.classList.toggle("negative", previousValue > 0 && currentValue < previousValue);
}

function formatMinutes(totalMinutes) {
  return Domain.formatMinutes(totalMinutes);
}

function formatCompactNumber(value) {
  return Domain.formatCompactNumber(value);
}

function currentSessionMinutes() {
  if (!currentWorkoutStartedAt) return 0;
  return Math.max(1, Math.round((Date.now() - currentWorkoutStartedAt) / 60000));
}

function estimateWorkoutCalories(minutes) {
  const setCount = [...exerciseList.querySelectorAll(".set-row.complete")].length;
  const exerciseCount = exerciseList.querySelectorAll(".exercise-card").length || 1;
  return Math.max(18, Math.round(minutes * 5.4 + setCount * 7 + exerciseCount * 4));
}

function renderWorkoutTelemetry() {
  if (!watchHeartRate || !watchCalories || !watchTime) return;
  const heartUnit = watchHeartRate.parentElement?.querySelector("span:last-child");
  const calorieUnit = watchCalories.parentElement?.querySelector("span:last-child");
  const timeUnit = watchTime.parentElement?.querySelector("span:last-child");
  if (workoutSession.hidden || !currentWorkoutStartedAt) {
    watchHeartRate.textContent = "--";
    watchCalories.textContent = healthSyncState.connected ? "0" : "--";
    watchTime.textContent = "0";
    if (heartUnit) heartUnit.textContent = healthSyncState.connected ? "bpm" : tx("Not connected");
    if (calorieUnit) calorieUnit.textContent = healthSyncState.connected ? energyUnit() : tx("Not connected");
    if (timeUnit) timeUnit.textContent = healthSyncState.connected ? "min" : tx("App timer");
    return;
  }

  const minutes = currentSessionMinutes();
  const calories = estimateWorkoutCalories(minutes);
  currentWorkoutMinutes = minutes;
  currentWorkoutCalories = calories;
  watchHeartRate.textContent = healthSyncState.connected ? String(112 + ((minutes * 7) % 24)) : "--";
  watchCalories.textContent = healthSyncState.connected ? formatEnergyFromKcal(calories) : "--";
  watchTime.textContent = String(minutes);
  if (heartUnit) heartUnit.textContent = healthSyncState.connected ? "bpm" : tx("Not connected");
  if (calorieUnit) calorieUnit.textContent = healthSyncState.connected ? energyUnit() : tx("Not connected");
  if (timeUnit) timeUnit.textContent = healthSyncState.connected ? "min" : tx("App timer");
}

function networkLabel() {
  if (!navigator.onLine) return "Offline";
  const connection = navigator.connection || navigator.webkitConnection || navigator.mozConnection;
  const effectiveType = connection?.effectiveType;
  if (effectiveType === "4g") return "5G";
  if (effectiveType === "3g") return "LTE";
  return "Wi-Fi";
}

async function renderSystemStatus() {
  if (statusTime) {
    statusTime.textContent = new Intl.DateTimeFormat([], { hour: "numeric", minute: "2-digit" }).format(new Date());
  }
  if (statusSignal) {
    statusSignal.textContent = networkLabel();
  }
  if (!statusBattery) return;

  if (navigator.getBattery) {
    try {
      const battery = await navigator.getBattery();
      const percent = Math.round(battery.level * 100);
      statusBattery.textContent = `${percent}%${battery.charging ? " charging" : ""}`;
      return;
    } catch (error) {
      // Battery status is optional in browsers, so fall through to a neutral label.
    }
  }

  statusBattery.textContent = "Battery";
}

function recordingMuscleGroup(recording) {
  return Domain.recordingMuscleGroup(recording);
}

function normalizedRecordingFocusGroup(value, workoutName = "") {
  const focusKey = String(value || "").trim();
  return sessionFocusGroups.some((group) => group.key === focusKey) ? focusKey : workoutFocusGroup(workoutName);
}

function sessionMixCoachCopy(muscleCounts, range) {
  const rangeName = rangeLabel(range);
  const localizedRange = localizedRangeName(range);
  const gluteCount = muscleCounts.glutes || 0;
  const upperCount = (muscleCounts.chest || 0) + (muscleCounts.shoulders || 0) + (muscleCounts.back || 0);

  if (gluteCount <= 1) {
    if (isChineseLanguage()) {
      return `根据${localizedRange}训练分布，臀腿训练对你的臀部增长目标来说偏少。我会建议下一次加一个臀部重点训练，然后用动作趋势检查臀推或后踢的训练量。`;
    }
    return `Based on your ${rangeName} Session Mix, glutes/legs are underrepresented for your glute-growth goal. I’d add one glute-focused workout next, then use Exercise Trends to check hip thrust or kickback volume.`;
  }

  if (isChineseLanguage()) {
    return `根据${localizedRange}训练分布，你的训练重点和当前目标基本匹配。我会建议下一次继续按计划训练，再用动作趋势确认关键动作是否在进步。`;
  }
  return `Based on your ${rangeName} Session Mix, your workout focus is reasonably balanced for your current goal. I’d keep the next workout aligned with your plan, then use Exercise Trends to confirm the key movements are progressing.`;
}

function renderWorkoutTrends(range = selectedTrendRange) {
  selectedTrendRange = range;
  document.querySelectorAll("[data-trend-range]").forEach((button) => {
    button.classList.toggle("selected", button.dataset.trendRange === range);
  });

  const currentRecordings = recordingsInRange(range, 0);
  const previousRecordings = recordingsInRange(range, -1);
  const workoutCount = currentRecordings.length;
  const previousWorkoutCount = previousRecordings.length;
  const totalMinutes = currentRecordings.reduce((sum, recording) => sum + workoutMinutes(recording), 0);
  const previousMinutes = previousRecordings.reduce((sum, recording) => sum + workoutMinutes(recording), 0);
  const totalCalories = currentRecordings.reduce((sum, recording) => sum + workoutCalories(recording), 0);
  const previousCalories = previousRecordings.reduce((sum, recording) => sum + workoutCalories(recording), 0);
  const totalEnergy = energyFromKcal(totalCalories);
  const previousEnergy = energyFromKcal(previousCalories);
  const latestRecording = latestIncludedRecording(currentRecordings);
  const muscleCounts = currentRecordings.reduce((counts, recording) => {
    const group = recordingMuscleGroup(recording);
    counts[group] = (counts[group] || 0) + 1;
    return counts;
  }, Object.fromEntries(sessionFocusGroups.map((group) => [group.key, 0])));
  const visibleFocusGroups = sessionFocusGroups.filter((group) => group.alwaysShow || (muscleCounts[group.key] || 0) > 0);
  const maxCount = Math.max(1, ...visibleFocusGroups.map((group) => muscleCounts[group.key] || 0));

  document.querySelector("[data-trend-calories]").textContent = totalCalories ? formatEnergyFromKcal(totalCalories, { empty: "" }) : "--";
  const caloriesSubtitle = document.querySelector("[data-trend-calories-subtitle]");
  caloriesSubtitle.textContent = localizedComparisonText(totalEnergy, previousEnergy, range, ` ${energyUnit()}`);
  setComparisonClass(caloriesSubtitle, totalEnergy, previousEnergy);
  document.querySelector("[data-trend-time]").textContent = formatMinutes(totalMinutes);
  const timeSubtitle = document.querySelector("[data-trend-time-subtitle]");
  timeSubtitle.textContent = localizedComparisonText(totalMinutes, previousMinutes, range, " min");
  setComparisonClass(timeSubtitle, totalMinutes, previousMinutes);
  document.querySelector("[data-trend-workouts]").textContent = String(workoutCount);
  const workoutsSubtitle = document.querySelector("[data-trend-workouts-subtitle]");
  workoutsSubtitle.textContent = localizedComparisonText(workoutCount, previousWorkoutCount, range);
  setComparisonClass(workoutsSubtitle, workoutCount, previousWorkoutCount);
  if (trendsFreshness) {
    trendsFreshness.textContent = latestRecording
      ? isChineseLanguage()
        ? `已计入 ${latestRecording.title}：${workoutMinutes(latestRecording)} min · ${formatEnergyFromKcal(workoutCalories(latestRecording), { empty: "0" })} ${energyUnit()}。`
        : `Updated with ${latestRecording.title}: ${workoutMinutes(latestRecording)} min · ${formatEnergyFromKcal(workoutCalories(latestRecording), { empty: "0" })} ${energyUnit()}.`
      : tx("No saved workouts yet. Finish a workout to update Trends.");
  }

  document.querySelectorAll("[data-dynamic-muscle-row]").forEach((row) => row.remove());
  visibleFocusGroups.forEach((group) => {
    let row = document.querySelector(`[data-muscle-row="${group.key}"]`);
    if (!row) {
      row = document.createElement("div");
      row.className = "bar-row";
      row.dataset.muscleRow = group.key;
      row.dataset.dynamicMuscleRow = "true";
      row.innerHTML = `<span>${focusGroupLabel(group)}</span><div class="bar-track"><div class="bar ${group.className}" style="width: 8%"></div></div><strong>0x</strong>`;
      document.querySelector(".insight-card")?.before(row);
    }
    const count = muscleCounts[group.key] || 0;
    if (!row) return;
    row.querySelector("span").textContent = focusGroupLabel(group);
    row.querySelector(".bar").style.width = count ? `${Math.max(8, Math.round((count / maxCount) * 86))}%` : "8%";
    row.querySelector("strong").textContent = `${count}x`;
  });

  const readoutParts = visibleFocusGroups.map((group) => `${muscleCounts[group.key] || 0} ${focusGroupLabel(group, true)}`);
  document.querySelector("[data-muscle-readout]").textContent = isChineseLanguage()
    ? `${localizedRangeName(range)}共有 ${workoutCount} 次训练：${readoutParts.join("，")}。`
    : `${workoutCount} saved workout${workoutCount === 1 ? "" : "s"} this ${rangeLabel(range)}: ${readoutParts.join(", ")}.`;
  document.querySelector("[data-muscle-ai-readout]").textContent = sessionMixCoachCopy(muscleCounts, range);
}

function normalizeExerciseName(name) {
  return Domain.normalizeExerciseName(name);
}

function trendExerciseName(exerciseKey) {
  return exerciseTrends[exerciseKey]?.title || "";
}

function trendExerciseAliases(exerciseKey) {
  const aliases = {
    hipThrust: ["Hip Thrust"],
    chestPress: ["Chest Press", "Machine Chest Press", "Dumbbell Bench Press"],
    lateralRaise: ["Lateral Raise", "Cable Lateral Raise"],
    latPulldown: ["Lat Pulldown", "Light Lat Pulldown"],
    inclinePress: ["Incline Press", "Incline Dumbbell Press"],
    dumbbellCurl: ["Dumbbell Curl", "Biceps Curl"],
    cableCrunch: ["Cable Crunch"],
    deadBug: ["Dead Bug"],
    rowErg: ["Row Erg"],
    treadmillWalk: ["Treadmill Walk", "Incline Walk"],
    foamRolling: ["Foam Rolling", "Mobility Flow", "Breathing Reset"],
  };
  return aliases[exerciseKey] || [trendExerciseName(exerciseKey)];
}

function trendMatchesExerciseName(exerciseKey, exerciseName) {
  return Domain.recordingLineMatchesExercise({ exerciseName }, trendExerciseAliases(exerciseKey));
}

function parseRecordingSetLine(line) {
  return Domain.parseRecordingSetLine(line);
}

function trendMetricForExercise(exerciseKey) {
  const name = trendExerciseName(exerciseKey);
  const aliases = trendExerciseAliases(exerciseKey);
  const catalogItem = exerciseCatalog[name] || aliases.map((alias) => exerciseCatalog[alias]).find(Boolean) || {};
  const type = exerciseTrackingType({
    name,
    group: catalogItem.group || "",
    target: catalogItem.target || "",
  });
  if (type === "distance") return { key: "distanceMeters", label: `distance (${distanceUnit()})`, unit: distanceUnit() };
  if (type === "duration") return { key: "durationMinutes", label: "time (min)", unit: "min" };
  return { key: "strengthVolume", label: "volume", unit: "" };
}

function displayTrendMetricValue(value, metric) {
  if (metric.key === "distanceMeters") {
    return `${convertDistanceValue(value, "m", distanceUnit()).toLocaleString()} ${distanceUnit()}`;
  }
  if (metric.key === "durationMinutes") {
    return `${Math.round(value * 10) / 10} min`;
  }
  return Math.round(value).toLocaleString();
}

function exerciseTrendDataPoints(exerciseKey) {
  const metric = trendMetricForExercise(exerciseKey);
  return Domain.exerciseTrendDataPoints(profileRecordings, trendExerciseAliases(exerciseKey), metric.key);
}

function chartHeightsForVolumes(points, fallbackHeights) {
  if (points.length === 0) return fallbackHeights;
  const values = points.map((point) => point.volume);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const heights = min === max
    ? points.map(() => "58%")
    : values.map((value) => `${Math.round(32 + ((value - min) / (max - min)) * 48)}%`);
  while (heights.length < 4) heights.unshift("12%");
  return heights.slice(-4);
}

function chartLabelsForPoints(points) {
  const labels = points.map((point) => point.label);
  while (labels.length < 4) labels.unshift("--");
  return labels.slice(-4);
}

function recordedTrendKeys() {
  ensureRecordedExerciseTrends();
  const keysWithData = Object.keys(exerciseTrends).filter((exerciseKey) => exerciseTrendDataPoints(exerciseKey).length > 0);
  const remainingKeys = recordedExerciseOrder.filter((exerciseKey) => !keysWithData.includes(exerciseKey));
  return [...keysWithData, ...remainingKeys];
}

function trendKeyForExerciseName(exerciseName) {
  return Object.keys(exerciseTrends).find((exerciseKey) => {
    return trendMatchesExerciseName(exerciseKey, exerciseName);
  }) || "";
}

function dynamicTrendKeyForExerciseName(exerciseName) {
  const normalized = normalizeExerciseName(exerciseName);
  return normalized ? `logged_${normalized}` : "";
}

function recordedExerciseNamesFromRecordings() {
  const names = new Map();
  profileRecordings.forEach((recording) => {
    recordingSetLines(recording).forEach((line) => {
      const parsed = parseRecordingSetLine(line);
      const normalized = normalizeExerciseName(parsed.exerciseName);
      if (normalized && !names.has(normalized)) {
        names.set(normalized, parsed.exerciseName);
      }
    });
  });
  return [...names.values()];
}

function ensureTrendForExerciseName(exerciseName) {
  const existingKey = trendKeyForExerciseName(exerciseName);
  if (existingKey) return existingKey;

  const dynamicKey = dynamicTrendKeyForExerciseName(exerciseName);
  if (!dynamicKey) return "";

  exerciseTrends[dynamicKey] = {
    title: exerciseName,
    heights: ["32%", "40%", "48%", "56%"],
    note: `${exerciseName} is available because you recorded it. Keep logging this exercise to build a clearer trend.`,
  };
  return dynamicKey;
}

function ensureRecordedExerciseTrends() {
  recordedExerciseNamesFromRecordings().forEach(ensureTrendForExerciseName);
}

function focusTrendsOnLoggedExercises(exercises = []) {
  const nextTrend = exercises.map((exercise) => ensureTrendForExerciseName(exercise.name)).find(Boolean);
  if (!nextTrend) return;

  activeTrend = nextTrend;
  if (!pinnedTrends.includes(nextTrend)) {
    pinnedTrends = pinnedTrends.length >= 4
      ? [nextTrend, ...pinnedTrends.slice(0, 3)]
      : [nextTrend, ...pinnedTrends];
  }
}

function metricExampleTrendKeys() {
  return ["rowErg", "foamRolling"];
}

function ensureMetricExampleTrendsVisible(availableTrendKeys) {
  metricExampleTrendKeys().forEach((exerciseKey) => {
    const metricKey = trendMetricForExercise(exerciseKey).key;
    const alreadyPinned = pinnedTrends.includes(exerciseKey);
    const metricAlreadyVisible = pinnedTrends.some((key) => trendMetricForExercise(key).key === metricKey);
    if (!availableTrendKeys.includes(exerciseKey) || alreadyPinned || metricAlreadyVisible) return;

    if (pinnedTrends.length < 4) {
      pinnedTrends.push(exerciseKey);
      return;
    }

    const strengthIndexes = pinnedTrends
      .map((key, index) => ({ key, index }))
      .filter((item) => trendMetricForExercise(item.key).key === "strengthVolume");
    const replaceIndex = strengthIndexes.length > 1
      ? strengthIndexes[strengthIndexes.length - 1].index
      : pinnedTrends.length - 1;
    pinnedTrends[replaceIndex] = exerciseKey;
  });
}

function applyUnitPreference() {
  const nextUnit = weightUnit();
  const nextDistanceUnit = distanceUnit();
  if (nextUnit !== currentWeightUnit) {
    document.querySelectorAll('input[data-set-field="weight"], input[data-edit-complete-set-field="weight"], input[data-edit-set-field="weight"]').forEach((input) => {
      input.value = convertWeightValue(input.value, currentWeightUnit, nextUnit);
    });
    currentWeightUnit = nextUnit;
  }
  if (nextDistanceUnit !== currentDistanceUnit) {
    document.querySelectorAll('input[data-set-field="distance"]').forEach((input) => {
      input.value = convertDistanceText(input.value, nextDistanceUnit);
    });
    currentDistanceUnit = nextDistanceUnit;
  }

  document.querySelectorAll(".set-row label span").forEach((label) => {
    if (label.textContent.startsWith("Weight")) {
      label.textContent = localizedSetFieldLabel(`Weight (${nextUnit})`);
    }
    if (label.textContent.startsWith("Distance")) {
      label.textContent = localizedSetFieldLabel(`Distance (${nextDistanceUnit})`);
    }
  });
  document.querySelectorAll("[data-energy-unit]").forEach((label) => {
    label.textContent = energyUnit();
  });
  document.querySelector("[data-profile-detail='units'] strong").textContent = unitSummary();
  renderProfileSummary();
  renderBodyMetricsTrend();
  renderWorkoutTrends();
  localizeExerciseCards();
}

function renderProfileSummary() {
  const displayName = normalizedStandardName(userProfile.name) || tx("Set up profile");
  const goal = localizedGoalText(userProfile.generalGoal) || tx("Goal not set");
  const frequency = userProfile.frequency ? tx(userProfile.frequency) : tx("Frequency not set");
  profileName.textContent = displayName;
  profileSubtitle.textContent = `${goal} · ${frequency} · Apple Watch ${tx(healthSyncState.connected ? "Connected" : "Not connected")}`;
  profilePersonalSummary.textContent = [formatProfileWeight(userProfile.weightLb), formatProfileHeight(userProfile.heightCm)]
    .filter((value, index, values) => value !== tx("Not set") || values.indexOf(value) === index)
    .join(" · ");
  profileRecordingCount.textContent = String(profileRecordings.length);
  const allCalories = profileRecordings.reduce((sum, recording) => sum + workoutCalories(recording), 0);
  const allMinutes = profileRecordings.reduce((sum, recording) => sum + workoutMinutes(recording), 0);
  if (profileActiveCalories) profileActiveCalories.textContent = formatEnergyFromKcal(allCalories, { compact: true });
  if (profileTrainingTime) profileTrainingTime.textContent = formatMinutes(allMinutes);
  const enabledPermissions = healthPermissions.filter((permission) => permission[2]).length;
  const healthSummary = document.querySelector("[data-profile-detail='health'] strong");
  if (healthSummary) {
    healthSummary.textContent = isChineseLanguage()
      ? `${tx(healthSyncState.connected ? "Connected" : "Not connected")} · ${enabledPermissions} 项开启`
      : `${tx(healthSyncState.connected ? "Connected" : "Not connected")} · ${enabledPermissions} on`;
  }
  const goalsSummary = document.querySelector("[data-profile-detail='goals'] strong");
  if (goalsSummary) goalsSummary.textContent = goalSummary();
  const watchButton = document.querySelector(".watch-button");
  if (watchButton) {
    watchButton.querySelector("small").textContent = tx(healthSyncState.connected ? "Connected" : "Not connected");
    watchButton.setAttribute("aria-label", `Apple Watch ${tx(healthSyncState.connected ? "Connected" : "Not connected")}`);
  }
}

function applyLanguagePreference() {
  const isChinese = isChineseLanguage();
  const navLabels = isChinese
    ? { "today-screen": "今天", "trends-screen": "趋势", "coach-screen": "AI 教练", "profile-screen": "个人" }
    : screens;

  navItems.forEach((item) => {
    item.querySelector("span:last-child").textContent = navLabels[item.dataset.screen];
  });
  title.textContent = navLabels[document.querySelector(".screen.active")?.id] || navLabels["today-screen"];
  setText(".onboarding-panel .metric-label", "Welcome to LiftTrend");
  setText(".onboarding-panel h2", "Set up your coaching profile");
  setText(".onboarding-panel p", "Basic body data and goals help AI Coach personalize volume, progression, recovery, and Apple Health updates.");
  applyOnboardingMetricLabels();
  setText("[data-save-onboarding]", "Save Profile");
  setText("[data-skip-onboarding]", "Skip");
  setText("#today-screen .focus-hero .metric-label", "Ready to train");
  setText("#today-screen .focus-hero h2", "Choose today's focus");
  setText("#today-screen .focus-hero p", "Pick a body area and LiftTrend will load a suggested workout you can edit.");
  setText("[data-open-standards].hero-link", "Saved Standards");
  setText("[data-workout-session] [data-open-standards]", "Standards");
  setText("[data-active-session-panel] .metric-label", "In-progress workout");
  setText("[data-active-session-title]", "Resume workout");
  setText("[data-active-session-copy]", "Your unsaved workout is available on this device.");
  setText("[data-resume-active-workout]", "Resume");
  setText("[data-discard-active-workout]", "Discard");
  document.querySelectorAll(".focus-card[data-workout]").forEach((card) => {
    const copy = focusCardText[card.dataset.workout];
    if (!copy) return;
    card.querySelector("strong").textContent = isChinese ? copy[2] : copy[0];
    card.querySelector("small").textContent = isChinese ? copy[3] : copy[1];
  });
  if (!workoutSession.hidden) {
    const workoutName = canonicalCurrentWorkoutName();
    workoutTitle.textContent = localizedWorkoutName(workoutName);
    workoutHeading.textContent = localizedWorkoutName(workoutName);
    refreshCurrentExerciseStatus();
    updateWorkoutProgress();
  }
  setText("[data-open-workouts]", "Change Workout");
  setText("[data-save-standard]", "Save Standard");
  setText("[data-finish-workout]", "Finish Workout");
  setText("[data-open-add-exercise]", "Add Exercise");
  setText("[data-workout-session] .record-panel .metric-label", "Current workout");
  setText(".watch-strip > div:nth-child(1) .metric-label", "Heart rate");
  setText(".watch-strip > div:nth-child(2) .metric-label", "Active cal");
  setText(".watch-strip > div:nth-child(3) .metric-label", "Time");
  setText("[data-workout-sheet] .eyebrow", "Today");
  setText("[data-workout-sheet] h2", "Choose workout");
  setAllText("[data-close-workouts]", "Close");
  setText("[data-workout-switch-warning] .metric-label", "Unsaved workout");
  setText("[data-workout-switch-title]", "Keep your current workout?");
  setText("[data-keep-current-workout]", "Keep Current");
  setText("[data-confirm-workout-switch]", "Discard & Switch");
  document.querySelectorAll(".workout-option[data-workout]").forEach((option) => {
    const copy = workoutOptionText[option.dataset.workout];
    if (!copy) return;
    const titleNode = option.querySelector("strong");
    const copyNode = option.querySelector("small");
    if (titleNode) titleNode.textContent = tx(copy[0]);
    if (copyNode) copyNode.textContent = tx(copy[1]);
  });
  localizeAddExerciseSheet();
  setText("[data-today-summary] .metric-label", "Workout complete");
  setText("[data-summary-title]", "Today's Summary");
  setText("[data-summary-note]", "Nice work. Your set details are saved into today's recordings.");
  setText(".standard-save-panel .metric-label", "Save as Standard");
  setText("[data-summary-save-standard]", "Save Standard");
  setText("[data-summary-new-workout]", "Back to Today");
  setText(".summary-metrics > div:nth-child(3) span:last-child", "logged");
  setText("[data-screen-link='trends-screen']", "View Updated Trends");
  document.querySelectorAll("[data-trend-range]").forEach((button) => {
    const label = { week: "Week", month: "Month", year: "Year" }[button.dataset.trendRange];
    if (label) button.textContent = tx(label);
  });
  setText(".trend-summary > div:nth-child(1) .metric-label", "Total calories");
  setText(".trend-summary > div:nth-child(2) .metric-label", "Training time");
  setText(".trend-summary > div:nth-child(3) .metric-label", "Workouts");
  setText("[data-trends-freshness]", "Latest saved workout is included in these trends.");
  setText("[data-body-metrics-panel] h2", "Body Metrics");
  const sessionMixPanel = document.querySelectorAll("#trends-screen .chart-panel")[1];
  if (sessionMixPanel) {
    sessionMixPanel.querySelector("h2").textContent = tx("Session Mix");
    sessionMixPanel.querySelector(".section-heading span").textContent = tx("by workout focus");
    sessionMixPanel.querySelector(":scope > .chart-note").textContent = tx("Distribution check for whether this period matches your intended split.");
  }
  setText(".insight-card strong", "Readout");
  setText(".ai-readout .pill", "AI suggestion");
  setText("[data-trend-manager] .eyebrow", "Recorded exercises only");
  setText("#trend-manager-title", "Choose trend");
  setText("[data-close-trend-manager]", "Close");
  setText("[data-run-ai-coach]", "Analyze latest data");
  setText("[data-show-later-coach]", "Show later suggestions");
  setText("[data-coach-engine] .metric-label", "AI Coach");
  setText("[data-coach-engine-title]", "Ready to check your plan");
  setText("[data-coach-engine-copy]", "Analyze your latest workouts and Apple Watch signals to get suggestions matched to your current goal.");
  setText("#profile-screen .profile-card .metric-label", "Profile");
  ["recordings", "active", "training time"].forEach((labelText, index) => {
    const label = document.querySelectorAll(".profile-stats > div > span")[index];
    if (label) label.textContent = tx(labelText);
  });
  setText("#profile-screen .profile-section:nth-of-type(2) h2", "Personal");
  setText("#profile-screen .profile-section:nth-of-type(2) .section-heading span", "Body data and coaching profile");
  setText("[data-profile-detail='personal'] span", "Personal info");
  setText("#profile-screen .profile-section:nth-of-type(3) h2", "Data");
  setText("#profile-screen .profile-section:nth-of-type(3) .section-heading span", "Personal records and exports");
  setText("[data-profile-detail='recordings'] span", "Previous recordings");
  setText("[data-profile-detail='recordings'] strong", "View history");
  setText("[data-profile-detail='health'] span", "Apple Health data");
  setText("[data-profile-detail='exercises'] span", "Exercise database");
  setText("[data-profile-detail='exercises'] strong", "Recorded only");
  setText("[data-profile-detail='testing'] span", "Tester feedback");
  setText("[data-profile-detail='testing'] strong", "Export / copy");
  setText("#profile-screen .profile-section:nth-of-type(4) h2", "Saved Standards");
  setText("#profile-screen .profile-section:nth-of-type(4) .section-heading span", "Reusable workout templates");
  setText("[data-profile-detail='standards'] span", "Manage standard workouts");
  setText("[data-profile-detail='standards'] strong", "View / edit / delete");
  setText("#profile-screen .profile-section:nth-of-type(5) h2", "Settings");
  setText("#profile-screen .profile-section:nth-of-type(5) .section-heading span", "App preferences");
  setText("[data-profile-detail='language'] span", "Language");
  setText("[data-profile-detail='units'] span", "Units");
  setText("[data-profile-detail='goals'] span", "Goals");
  localizeStandardsSheet();
  document.querySelector("[data-profile-detail='language'] strong").textContent = profileSettingsState.language;
  if (!profileDetailPanel.hidden && activeProfileDetailKey) {
    const detail = localizedProfileDetail(activeProfileDetailKey);
    profileBackButton.textContent = profileReturnScreen === "coach-screen" ? tx("Back to AI Coach") : tx("Back to Profile");
    profileDetailTitle.textContent = detail.title;
    profileDetailCopy.textContent = detail.copy;
  }
  renderProfileSummary();
  renderBodyMetricsTrend();
  renderWorkoutTrends(selectedTrendRange);
  renderTrendChips();
  localizeExerciseCards();
}

document.querySelectorAll("[data-trend-range]").forEach((button) => {
  button.addEventListener("click", () => {
    renderWorkoutTrends(button.dataset.trendRange);
    saveAppState();
  });
});

function setTrend(exerciseKey) {
  const trend = exerciseTrends[exerciseKey];
  const chart = document.querySelector("[data-exercise-chart]");
  const bars = chart?.querySelectorAll("span") || [];
  const chartLabels = document.querySelectorAll(".chart-labels span");
  const dataPoints = exerciseTrendDataPoints(exerciseKey).slice(-4);
  const metric = trendMetricForExercise(exerciseKey);
  const heights = chartHeightsForVolumes(dataPoints, trend.heights);
  const labels = chartLabelsForPoints(dataPoints);
  const displayTitle = localizedTrendExerciseTitle(exerciseKey);

  activeTrend = exerciseKey;
  document.querySelector("[data-exercise-trend-title]").textContent = displayTitle;
  const metricLabel = document.querySelector("[data-exercise-trend-metric]");
  if (metricLabel) metricLabel.textContent = localizedTrendMetricPhrase(metric);
  chart?.setAttribute("aria-label", localizedTrendAriaLabel(displayTitle, metric));
  document.querySelector("[data-exercise-trend-note]").textContent = localizedExerciseTrendNote(displayTitle, dataPoints, metric, trend.note);
  bars.forEach((bar, index) => {
    bar.style.height = heights[index] || "12%";
  });
  chartLabels.forEach((label, index) => {
    label.textContent = labels[index] || "--";
  });

  document.querySelectorAll("[data-trend-chip]").forEach((chip) => {
    chip.classList.toggle("selected", chip.dataset.trendChip === exerciseKey);
  });
}

function renderTrendChips() {
  const picker = document.querySelector(".exercise-picker");
  const action = document.querySelector("[data-open-trend-manager]");
  const availableRecordedKeys = recordedTrendKeys();
  pinnedTrends = pinnedTrends.filter((exerciseKey) => availableRecordedKeys.includes(exerciseKey));
  if (pinnedTrends.length === 0) {
    pinnedTrends = availableRecordedKeys.slice(0, 4);
  }
  picker.querySelectorAll("[data-trend-chip]").forEach((chip) => chip.remove());
  pinnedTrends.forEach((exerciseKey) => {
    const chip = document.createElement("div");
    chip.className = "trend-chip";
    chip.dataset.trendChip = exerciseKey;
    const metric = trendMetricForExercise(exerciseKey);
    const displayTitle = localizedTrendExerciseTitle(exerciseKey);
    const removeLabel = isChineseLanguage() ? `隐藏 ${displayTitle}` : `Hide ${displayTitle}`;
    chip.innerHTML = `<button type="button" data-exercise-trend="${exerciseKey}"><span>${escapeHtml(displayTitle)}</span><small>${localizedMetricLabel(metric)}</small></button><button class="remove-trend" type="button" data-remove-trend="${exerciseKey}" aria-label="${escapeHtml(removeLabel)}">×</button>`;
    picker.insertBefore(chip, action);
  });

  action.textContent = pinnedTrends.length >= 4 ? tx("Replace selected") : tx("+ Add");
  if (!pinnedTrends.includes(activeTrend)) {
    activeTrend = pinnedTrends[0] || availableRecordedKeys[0];
  }
  setTrend(activeTrend);
}

function openTrendManager() {
  const available = recordedTrendKeys().filter((exerciseKey) => !pinnedTrends.includes(exerciseKey));
  const mode = pinnedTrends.length >= 4 ? "replace" : "add";
  const activeName = localizedTrendExerciseTitle(activeTrend) || tx("selected trend");

  trendManagerNote.textContent = mode === "replace"
    ? isChineseLanguage()
      ? `正在替换 ${activeName}。如果想替换别的位置，请先点选对应的趋势标签。这里可以选择训练量、距离和时长趋势。`
      : `Replacing ${activeName}. Tap a chart chip first if you want to replace a different slot. Distance and time trends are available here.`
    : tx("Pick any supported trend to add. You can show up to four trends, including volume, distance, and time.");
  trendOptions.replaceChildren();

  available.forEach((exerciseKey) => {
    const button = document.createElement("button");
    button.className = "trend-option";
    button.type = "button";
    button.dataset.trendOption = exerciseKey;
    const metric = trendMetricForExercise(exerciseKey);
    const actionLabel = mode === "replace"
      ? isChineseLanguage() ? `替换 ${activeName}` : `replaces ${activeName}`
      : tx("Add trend");
    button.innerHTML = `${escapeHtml(localizedTrendExerciseTitle(exerciseKey))}<span>${localizedMetricLabel(metric)} · ${escapeHtml(actionLabel)}</span>`;
    trendOptions.append(button);
  });

  trendManager.hidden = false;
}

function closeTrendManager() {
  trendManager.hidden = true;
}

document.querySelector(".exercise-picker").addEventListener("click", (event) => {
  const trendButton = event.target.closest("[data-exercise-trend]");
  const removeButton = event.target.closest("[data-remove-trend]");
  const openButton = event.target.closest("[data-open-trend-manager]");

  if (trendButton) {
    setTrend(trendButton.dataset.exerciseTrend);
    saveAppState();
  }

  if (removeButton) {
    pinnedTrends = pinnedTrends.filter((exerciseKey) => exerciseKey !== removeButton.dataset.removeTrend);
    renderTrendChips();
    saveAppState();
  }

  if (openButton) {
    openTrendManager();
  }
});

trendOptions.addEventListener("click", (event) => {
  const option = event.target.closest("[data-trend-option]");
  if (!option) return;

  const exerciseKey = option.dataset.trendOption;
  if (pinnedTrends.length >= 4) {
    const replaceIndex = Math.max(0, pinnedTrends.indexOf(activeTrend));
    pinnedTrends = pinnedTrends.map((key, index) => index === replaceIndex ? exerciseKey : key);
  } else {
    pinnedTrends = [...pinnedTrends, exerciseKey];
  }

  activeTrend = exerciseKey;
  renderTrendChips();
  closeTrendManager();
  saveAppState();
});

document.querySelectorAll("[data-close-trend-manager]").forEach((item) => {
  item.addEventListener("click", closeTrendManager);
});

function openWorkoutSheet() {
  applyLanguagePreference();
  workoutSheet.hidden = false;
}

function closeWorkoutSheet() {
  workoutSheet.hidden = true;
  clearWorkoutSwitchWarning();
}

function openAddExerciseSheet() {
  addExerciseSheet.hidden = false;
  document.querySelector("[data-exercise-search]").value = "";
  filterExerciseOptions("");
  localizeAddExerciseSheet();
}

function closeAddExerciseSheet() {
  addExerciseSheet.hidden = true;
}

function normalizeExerciseSearch(value) {
  return String(value || "").trim().toLowerCase().replace(/[-_/]/g, " ").replace(/\s+/g, " ");
}

function compactExerciseSearch(value) {
  return normalizeExerciseSearch(value).replace(/\s+/g, "");
}

function exerciseSearchHaystack(name) {
  const catalogEntry = exerciseCatalog[name] || {};
  return [
    name,
    zhExerciseNames[name],
    catalogEntry.group,
    zhGroupLabels[catalogEntry.group],
    catalogEntry.target,
    translatedTargetText(catalogEntry.target || ""),
    catalogEntry.search,
  ].filter(Boolean).join(" ");
}

function addExerciseSearchScore(name, query) {
  const normalizedQuery = normalizeExerciseSearch(query);
  if (!normalizedQuery) return 1;

  const searchable = normalizeExerciseSearch(exerciseSearchHaystack(name));
  const compactSearchable = compactExerciseSearch(exerciseSearchHaystack(name));
  const compactQuery = compactExerciseSearch(normalizedQuery);
  if (normalizeExerciseSearch(name) === normalizedQuery) return 100;
  if (normalizeExerciseSearch(zhExerciseNames[name]) === normalizedQuery) return 100;
  if (normalizeExerciseSearch(name).startsWith(normalizedQuery)) return 90;
  if (normalizeExerciseSearch(zhExerciseNames[name]).startsWith(normalizedQuery)) return 90;
  if (searchable.includes(normalizedQuery)) return 70;
  if (compactQuery && compactSearchable.includes(compactQuery)) return 70;

  const queryTokens = normalizedQuery.split(" ").filter(Boolean);
  const matchedTokens = queryTokens.filter((token) => searchable.includes(token)).length;
  return matchedTokens === queryTokens.length ? 50 : 0;
}

function exerciseCatalogSortScore(name) {
  const item = exerciseCatalog[name] || {};
  const text = `${name} ${item.group || ""} ${item.target || ""} ${item.search || ""}`.toLowerCase();
  let score = 0;
  if (/\b(sec|min|yd|m)\b/.test(text)) score += 40;
  if (/\/side|single|unilateral/.test(text)) score += 30;
  if (/recovery|mobility|cardio|conditioning|carry|crawl/.test(text)) score += 20;
  return score;
}

function createAddExerciseOption(name, { customName = "" } = {}) {
  const catalogEntry = exerciseCatalog[name] || exerciseCatalog["Custom Exercise"];
  const option = document.createElement("button");
  option.className = `trend-option${name === "Custom Exercise" ? " custom" : ""}`;
  option.type = "button";
  option.dataset.addExercise = name;
  if (customName) option.dataset.customName = customName;
  const groupLabel = localizedGroupName(catalogEntry.group || "Custom");
  const displayName = customName
    ? isChineseLanguage() ? `${tx("Create custom exercise")}：${customName}` : `Create "${customName}"`
    : localizedExerciseName(name);
  option.innerHTML = `<span>${escapeHtml(groupLabel)}</span>${escapeHtml(displayName)}`;
  return option;
}

function renderAddExerciseOptions(query = "") {
  const container = addExerciseSheet.querySelector(".add-options");
  if (!container) return;

  const normalized = normalizeExerciseSearch(query);
  const matches = Object.keys(exerciseCatalog)
    .filter((name) => name !== "Custom Exercise")
    .map((name) => ({ name, score: addExerciseSearchScore(name, normalized) }))
    .filter((item) => !normalized || item.score > 0)
    .sort((a, b) => b.score - a.score || exerciseCatalogSortScore(b.name) - exerciseCatalogSortScore(a.name) || a.name.localeCompare(b.name));

  container.replaceChildren();
  matches.forEach((item) => container.append(createAddExerciseOption(item.name)));
  container.append(createAddExerciseOption("Custom Exercise", { customName: normalized ? query.trim() : "" }));
}

function openStandardsSheet() {
  if (standardsSearch) standardsSearch.value = "";
  renderStandards();
  localizeStandardsSheet();
  standardsSheet.hidden = false;
}

function closeStandardsSheet() {
  standardsSheet.hidden = true;
}

function filterExerciseOptions(query) {
  renderAddExerciseOptions(query);
}

function updateWorkoutProgress() {
  const cards = [...exerciseList.querySelectorAll(".exercise-card")];
  if (cards.length === 0) {
    workoutCount.textContent = isChineseLanguage() ? "0 个动作" : "0 exercises";
    workoutStatus.textContent = tx("Add an exercise to continue");
    return;
  }

  const currentIndex = cards.findIndex((card) => card.classList.contains("current"));
  const doneCount = cards.filter((card) => card.classList.contains("done")).length;
  const visibleIndex = currentIndex >= 0 ? currentIndex + 1 : doneCount;
  workoutCount.textContent = isChineseLanguage()
    ? `${visibleIndex} / ${cards.length} 个动作`
    : `${visibleIndex} of ${cards.length} exercises`;
}

function refreshCurrentExerciseStatus(card = exerciseList.querySelector(".exercise-card.current")) {
  if (!card?.classList.contains("current")) return;
  const currentName = getExerciseName(card);
  const activeSetNumber = card.querySelector(".active-set span")?.textContent.trim() || "1";
  workoutStatus.textContent = isChineseLanguage()
    ? `正在记录 ${localizedExerciseName(currentName)} 第 ${activeSetNumber} 组`
    : `Recording set ${activeSetNumber} of ${currentName}`;
}

function readActiveWorkoutSession() {
  try {
    const session = JSON.parse(localStorage.getItem(activeWorkoutStorageKey) || "null");
    return session?.exercises?.length ? session : null;
  } catch {
    localStorage.removeItem(activeWorkoutStorageKey);
    return null;
  }
}

function activeWorkoutSessionSnapshot() {
  if (workoutSession.hidden || exerciseList.querySelectorAll(".exercise-card").length === 0) return null;
  return {
    workoutKey: currentWorkoutKey || "custom",
    workoutName: canonicalCurrentWorkoutName(),
    startedAt: currentWorkoutStartedAt || Date.now(),
    savedAt: new Date().toISOString(),
    calories: currentWorkoutCalories,
    minutes: currentWorkoutMinutes,
    weightUnit: weightUnit(),
    exercises: [...exerciseList.querySelectorAll(".exercise-card")].map((card) => ({
      ...serializeExerciseCard(card),
      isCurrent: card.classList.contains("current"),
      isDone: card.classList.contains("done"),
    })),
  };
}

function persistActiveWorkoutSession() {
  const session = activeWorkoutSessionSnapshot();
  if (!session) {
    localStorage.removeItem(activeWorkoutStorageKey);
    renderActiveSessionPanel();
    return;
  }
  localStorage.setItem(activeWorkoutStorageKey, JSON.stringify(session));
}

function clearActiveWorkoutSession() {
  localStorage.removeItem(activeWorkoutStorageKey);
  renderActiveSessionPanel();
}

function activeSessionSetRowsHtml(exercise, isCurrent) {
  const sets = exercise.sets?.length
    ? exercise.sets
    : [{ setNumber: "1", weight: "", reps: getDefaultRepsFromText(exercise.target), rpe: "7", complete: false }];

  return sets.map((set, index) => {
    const shouldBeActive = isCurrent && !set.complete;
    if (shouldBeActive) {
      return activeSetRowHtml(exercise, set, index);
    }
    return completeSetRowHtml(exercise, set, index);
  }).join("");
}

function activeSessionShouldShowSetGrid(exercise, isCurrent, isDone) {
  return isCurrent || isDone || Boolean(exercise.sets?.some((set) => set.complete || set.touched));
}

function createExerciseCardFromActiveSession(exercise) {
  const article = document.createElement("article");
  const group = exercise.group || exerciseCatalog[exercise.name]?.group || "Custom";
  const target = exercise.target || exerciseCatalog[exercise.name]?.target || "target 3 x 10";
  const isCurrent = Boolean(exercise.isCurrent);
  const isDone = Boolean(exercise.isDone);
  const actionHtml = isCurrent
    ? `<div class="exercise-actions"><button class="small-button" type="button" data-finish-set>${tx("Finish Set")}</button><button class="outline-button" type="button" data-finish-exercise>${tx("Finish Exercise")}</button></div>`
    : isDone
      ? `<span class="pill green">${tx("Done")}</span><button class="outline-button start-exercise-button" type="button" data-start-exercise>${tx("Add Set")}</button>`
      : `<span class="pill">${escapeHtml(localizedGroupName(group))}</span><button class="outline-button start-exercise-button" type="button" data-start-exercise>${tx("Start Exercise")}</button>`;
  const hasSets = activeSessionShouldShowSetGrid(exercise, isCurrent, isDone);

  article.className = `exercise-card${isCurrent ? " current" : ""}${isDone ? " done" : ""}`;
  article.savedStandardExercise = exercise;
  setExerciseCardData(article, { name: exercise.name, group, target });
  article.innerHTML = `<div class="exercise-topline"><div><h3>${escapeHtml(localizedExerciseName(exercise.name))}</h3><p>${escapeHtml(localizedTargetText(target))}</p></div>${actionHtml}</div>${hasSets ? `<div class="set-grid" aria-label="${escapeHtml(localizedSetGridLabel(exercise.name))}">${activeSessionSetRowsHtml(exercise, isCurrent)}</div>` : ""}`;
  return article;
}

function restoreActiveWorkoutSession(session) {
  if (!session) return false;
  currentWorkoutKey = session.workoutKey || "custom";
  workoutTitle.dataset.workoutName = session.workoutName || workouts[currentWorkoutKey]?.title || "Workout";
  workoutTitle.textContent = localizedWorkoutName(workoutTitle.dataset.workoutName);
  workoutStatus.textContent = isChineseLanguage() ? "正在记录训练" : `Recording ${session.exercises[0]?.name || "workout"}`;
  workoutHeading.textContent = localizedWorkoutName(workoutTitle.dataset.workoutName);
  currentWorkoutStartedAt = session.startedAt || Date.now();
  currentWorkoutCalories = session.calories || 0;
  currentWorkoutMinutes = session.minutes || 0;
  exerciseList.replaceChildren(...session.exercises.map(createExerciseCardFromActiveSession));
  addDeleteControls();
  localizeExerciseCards();
  refreshCurrentExerciseStatus();
  updateWorkoutProgress();
  focusStart.hidden = true;
  workoutSession.hidden = false;
  todaySummary.hidden = true;
  renderWorkoutTelemetry();
  navigateToScreen("today-screen");
  document.querySelector("#today-screen").scrollTo({ top: 0 });
  showToast(isChineseLanguage() ? `已继续 ${localizedWorkoutName(session.workoutName || "workout")}` : `Resumed ${session.workoutName || "workout"}`);
  return true;
}

function renderActiveSessionPanel() {
  if (!activeSessionPanel) return;
  const session = readActiveWorkoutSession();
  activeSessionPanel.hidden = !session || !workoutSession.hidden;
  if (!session || !workoutSession.hidden) return;

  const completeSetCount = session.exercises.reduce((count, exercise) => {
    return count + (exercise.sets || []).filter((set) => set.complete).length;
  }, 0);
  activeSessionTitle.textContent = isChineseLanguage()
    ? `继续 ${localizedWorkoutName(session.workoutName || "workout")}`
    : `Resume ${session.workoutName || "workout"}`;
  activeSessionCopy.textContent = isChineseLanguage()
    ? `${session.exercises.length} 个动作 · ${completeSetCount} 组已记录 · 保存于 ${formatSyncTime(session.savedAt)}`
    : `${session.exercises.length} exercises · ${completeSetCount} recorded set${completeSetCount === 1 ? "" : "s"} · saved ${formatSyncTime(session.savedAt)}`;
}

function activeWorkoutHasUnsavedData() {
  return (!workoutSession.hidden && exerciseList.querySelectorAll(".exercise-card").length > 0) || Boolean(readActiveWorkoutSession());
}

function clearWorkoutSwitchWarning() {
  pendingWorkoutSwitch = null;
  if (workoutSwitchWarning) workoutSwitchWarning.hidden = true;
  if (workoutSheet) delete workoutSheet.dataset.switchWarningActive;
}

function showWorkoutSwitchWarning(label, onConfirm) {
  pendingWorkoutSwitch = onConfirm;
  if (workoutSwitchTitle) workoutSwitchTitle.textContent = tx("Keep your current workout?");
  if (workoutSwitchCopy) {
    workoutSwitchCopy.textContent = isChineseLanguage()
      ? `开始 ${localizedWorkoutName(label)} 会丢弃当前未保存的训练。请先结束当前训练，或确认丢弃后切换。`
      : `Starting ${label} will discard the current unsaved workout. Finish it first, or discard it and switch.`;
  }
  if (workoutSwitchWarning) workoutSwitchWarning.hidden = false;
  if (workoutSheet) workoutSheet.dataset.switchWarningActive = "true";
  closeStandardsSheet();
  workoutSheet.hidden = false;
  showToast(tx("Current workout is not saved yet"));
}

function protectActiveWorkoutSwitch(label, onConfirm, force = false) {
  if (!force && activeWorkoutHasUnsavedData()) {
    showWorkoutSwitchWarning(label, onConfirm);
    return false;
  }
  clearWorkoutSwitchWarning();
  onConfirm();
  return true;
}

function addDeleteControls() {
  exerciseList.querySelectorAll(".exercise-card").forEach((card) => {
    card.draggable = true;
    if (!card.querySelector("[data-drag-exercise]")) {
      card.querySelector(".exercise-topline")?.insertAdjacentHTML("afterbegin", `<div class="reorder-control"><button class="drag-handle" type="button" data-drag-exercise aria-label="${tx("Reorder exercise")}" aria-expanded="false">☰</button><div class="reorder-actions" hidden><button type="button" data-move-exercise="up" aria-label="${tx("Move exercise up")}">↑</button><button type="button" data-move-exercise="down" aria-label="${tx("Move exercise down")}">↓</button></div></div>`);
    }
    if (!card.querySelector("[data-delete-exercise]")) {
      card.insertAdjacentHTML("beforeend", `<button class="delete-action" type="button" data-delete-exercise>${tx("Delete Exercise")}</button>`);
    }
  });

  exerciseList.querySelectorAll(".set-row").forEach((row) => {
    if (row.classList.contains("complete") && !row.querySelector("[data-edit-complete-set]")) {
      row.insertAdjacentHTML("beforeend", `<button class="delete-action set-edit" type="button" data-edit-complete-set>${tx("Edit")}</button>`);
    }
    if (!row.querySelector("[data-delete-set]")) {
      row.insertAdjacentHTML("beforeend", `<button class="delete-action set-delete" type="button" data-delete-set>${tx("Delete")}</button>`);
    }
  });
}

function resetExerciseDeleteConfirmations(exceptCard = null) {
  exerciseList.querySelectorAll(".exercise-card.confirm-delete").forEach((card) => {
    if (card === exceptCard) return;
    card.classList.remove("confirm-delete");
    const button = card.querySelector("[data-delete-exercise]");
    if (button) button.textContent = tx("Delete Exercise");
  });
}

function resetSetDeleteConfirmations(exceptRow = null) {
  exerciseList.querySelectorAll(".set-row.confirm-delete").forEach((row) => {
    if (row === exceptRow) return;
    row.classList.remove("confirm-delete");
    const button = row.querySelector("[data-delete-set]");
    if (button) button.textContent = tx("Delete");
  });
}

function ensureCurrentCardHasActiveSet(card) {
  if (!card?.classList.contains("current") || card.querySelector(".active-set")) return;

  const exerciseName = getExerciseName(card);
  const exercise = {
    name: exerciseName,
    group: getExerciseGroup(card),
    target: getExerciseTarget(card),
  };
  let setGrid = card.querySelector(".set-grid");
  if (!setGrid) {
    card.insertAdjacentHTML("beforeend", `<div class="set-grid" aria-label="${escapeHtml(localizedSetGridLabel(exerciseName))}"></div>`);
    setGrid = card.querySelector(".set-grid");
  }

  const previousRows = [...setGrid.querySelectorAll(".set-row.complete, .set-row.edit-set")];
  const previousSet = previousRows.length ? serializeSetRow(previousRows.at(-1)) : getDefaultSetForExercise(exerciseName);
  const nextSetNumber = String(Number(previousSet.setNumber || previousRows.length || 0) + 1);
  const nextSet = {
    ...previousSet,
    setNumber: nextSetNumber,
    touched: false,
    complete: false,
  };
  setGrid.insertAdjacentHTML("beforeend", activeSetRowHtml(exercise, nextSet, Number(nextSetNumber) - 1));
}

function buildExerciseCard(name, options = {}) {
  const catalogEntry = exerciseCatalog[name] || exerciseCatalog["Custom Exercise"];
  const muscle = catalogEntry.group;
  const isCustom = name === "Custom Exercise";
  const displayName = options.customName?.trim() || name;
  const target = catalogEntry.target;
  const heading = isCustom
    ? `<h3 class="editable-name" contenteditable="true" spellcheck="false">${escapeHtml(displayName)}</h3>`
    : `<h3>${escapeHtml(localizedExerciseName(name))}</h3>`;

  const article = document.createElement("article");
  article.className = "exercise-card";
  setExerciseCardData(article, { name: displayName, group: muscle, target });
  article.innerHTML = `<div class="exercise-topline"><div>${heading}<p>${escapeHtml(localizedTargetText(target, isCustom))}</p></div><span class="pill">${escapeHtml(localizedGroupName(muscle))}</span><button class="outline-button start-exercise-button" type="button" data-start-exercise>${tx("Start Exercise")}</button></div>`;
  return article;
}

function addExercise(name, options = {}) {
  const displayName = options.customName?.trim() || name;
  const now = Date.now();
  const signature = displayName.toLowerCase();
  if (lastExerciseAdd.signature === signature && now - lastExerciseAdd.at < 900) {
    showToast(isChineseLanguage() ? `${localizedExerciseName(displayName)} 已添加` : `${displayName} already added`);
    return;
  }
  lastExerciseAdd = { signature, at: now };
  const card = buildExerciseCard(name, options);
  exerciseList.querySelector(".empty-workout")?.remove();
  exerciseList.append(card);

  if (!exerciseList.querySelector(".exercise-card.current")) {
    activateExerciseCard(card);
  }

  addDeleteControls();
  updateWorkoutProgress();
  renderWorkoutTelemetry();
  persistActiveWorkoutSession();
  closeAddExerciseSheet();
  showToast(isChineseLanguage() ? `已添加 ${localizedExerciseName(displayName)}` : `${displayName} added`);

  const editableName = card.querySelector(".editable-name");
  if (editableName) {
    editableName.focus();
    document.getSelection()?.selectAllChildren(editableName);
  }
}

function exerciseCardAfterPointer(y, draggedCard) {
  const cards = [...exerciseList.querySelectorAll(".exercise-card:not(.dragging)")].filter((card) => card !== draggedCard);
  return cards.reduce((closest, card) => {
    const box = card.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;
    if (offset < 0 && offset > closest.offset) {
      return { offset, card };
    }
    return closest;
  }, { offset: Number.NEGATIVE_INFINITY, card: null }).card;
}

function moveExerciseCardBefore(card, beforeCard) {
  if (!card || beforeCard === card) return false;
  if (beforeCard) {
    exerciseList.insertBefore(card, beforeCard);
  } else {
    exerciseList.append(card);
  }
  updateWorkoutProgress();
  persistActiveWorkoutSession();
  return true;
}

function moveExerciseCardByDirection(card, direction) {
  if (!card) return false;
  const sibling = direction === "up" ? card.previousElementSibling : card.nextElementSibling;
  if (!sibling?.classList.contains("exercise-card")) return false;
  const moved = direction === "up"
    ? moveExerciseCardBefore(card, sibling)
    : moveExerciseCardBefore(sibling, card);
  if (moved) showToast(tx("Exercise order updated"));
  return moved;
}

function toggleReorderActions(handle) {
  const actions = handle?.closest(".reorder-control")?.querySelector(".reorder-actions");
  if (!actions) return;
  const nextHidden = !actions.hidden;
  actions.hidden = nextHidden;
  handle.setAttribute("aria-expanded", String(!nextHidden));
}

function finishExerciseDrag() {
  if (!pointerDragState?.card) return;
  pointerDragState.card.classList.remove("dragging");
  pointerDragState.card.releasePointerCapture?.(pointerDragState.pointerId);
  pointerDragState = null;
  showToast(tx("Exercise order updated"));
}

function setWorkout(workoutKey, options = {}) {
  const workout = workouts[workoutKey];
  const template = document.querySelector(`#${workout.template}`);
  if (!workout || !template) return false;

  if (!options.force) {
    return protectActiveWorkoutSwitch(workout.title, () => setWorkout(workoutKey, { force: true }));
  }

  currentWorkoutKey = workoutKey;
  workoutTitle.dataset.workoutName = workout.title;
  workoutTitle.textContent = localizedWorkoutName(workout.title);
  workoutStatus.textContent = isChineseLanguage() ? "正在记录训练" : workout.status;
  workoutHeading.textContent = localizedWorkoutName(workout.title);
  currentWorkoutStartedAt = Date.now();
  currentWorkoutCalories = 0;
  currentWorkoutMinutes = 0;
  exerciseList.replaceChildren(template.content.cloneNode(true));
  addDeleteControls();
  localizeExerciseCards();
  refreshCurrentExerciseStatus();
  updateWorkoutProgress();
  focusStart.hidden = true;
  workoutSession.hidden = false;
  todaySummary.hidden = true;
  renderWorkoutTelemetry();
  persistActiveWorkoutSession();
  document.querySelector("#today-screen").scrollTo({ top: 0 });

  document.querySelectorAll(".workout-option").forEach((option) => {
    option.classList.toggle("selected", option.dataset.workout === workoutKey);
  });

  closeWorkoutSheet();
  return true;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => {
    return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char];
  });
}

function getExerciseName(card) {
  return card?.dataset.exerciseName || card?.querySelector("h3")?.textContent.trim() || "Exercise";
}

function getExerciseGroup(card) {
  return card?.dataset.exerciseGroup || card?.querySelector(".pill:not(.green)")?.textContent.trim() || exerciseCatalog[getExerciseName(card)]?.group || "Custom";
}

function getExerciseTarget(card) {
  const name = getExerciseName(card);
  return card?.dataset.exerciseTarget || card?.querySelector("p")?.textContent.trim() || exerciseCatalog[name]?.target || "target 3 x 10";
}

function exerciseTrackingType(exerciseOrName, targetOverride = "") {
  const name = typeof exerciseOrName === "string" ? exerciseOrName : exerciseOrName?.name;
  const catalogEntry = exerciseCatalog[name] || {};
  const group = String(exerciseOrName?.group || catalogEntry.group || "").toLowerCase();
  const target = String(targetOverride || exerciseOrName?.target || catalogEntry.target || "")
    .replace(/\blast time\b/gi, "")
    .replace(/^added\s*·\s*/i, "")
    .toLowerCase();
  const search = String(catalogEntry.search || "").toLowerCase();
  const text = `${name || ""} ${group} ${target} ${search}`;
  if (/\b\d+(?:\.\d+)?\s*(yd|m|mi|km)\b/.test(target) || /\b(distance|meters|rowing|carry)\b/.test(text)) return "distance";
  if (/\b(sec|min)\b/.test(target) || /\b(cardio|recovery|mobility|stretch|duration)\b/.test(text) || /\btime\b/.test(search)) return "duration";
  return "strength";
}

function defaultDurationFromText(targetText) {
  const durationMatch = String(targetText || "").match(/(\d+(?:\.\d+)?)\s*(sec|min)\b/i);
  return durationMatch ? normalizeDurationEntry(`${durationMatch[1]} ${durationMatch[2].toLowerCase()}`) : "";
}

function defaultDistanceFromText(targetText) {
  const distanceMatch = String(targetText || "").match(/(\d+(?:\.\d+)?)\s*(yd|m|mi|km)\b(\/side)?/i);
  return distanceMatch ? convertDistanceText(`${distanceMatch[1]} ${distanceMatch[2]}${distanceMatch[3] || ""}`, distanceUnit()) : "";
}

function setFieldValue(set, field, exercise) {
  if (field === "duration") return durationInputValue(set.duration || (exercise ? defaultDurationFromText(exercise.target) : "") || set.reps || "");
  if (field === "distance") return set.distance || (exercise ? defaultDistanceFromText(exercise.target) : "");
  if (field === "weight") return set.weight || "";
  if (field === "reps") return set.reps || (exercise ? getDefaultRepsFromText(exercise.target) : "");
  if (field === "rpe") return set.rpe || "7";
  return set[field] || "";
}

function setFieldConfig(exercise) {
  const type = exerciseTrackingType(exercise);
  if (type === "distance") {
    return [
      ["distance", localizedSetFieldLabel(`Distance (${distanceUnit()})`), "decimal"],
      ["duration", localizedSetFieldLabel("Time (min)"), "decimal"],
      ["rpe", "RPE", "decimal"],
    ];
  }
  if (type === "duration") {
    return [
      ["duration", localizedSetFieldLabel("Duration (min)"), "decimal"],
      ["distance", localizedSetFieldLabel(`Distance (${distanceUnit()})`), "decimal"],
      ["rpe", "RPE", "decimal"],
    ];
  }
  return [
    ["weight", localizedSetFieldLabel("Load"), "decimal"],
    ["reps", localizedSetFieldLabel("Reps"), "numeric"],
    ["rpe", "RPE", "decimal"],
  ];
}

function activeSetRowHtml(exercise, set, index) {
  const fields = setFieldConfig(exercise).map(([field, label, inputMode]) => {
    const value = setFieldValue(set, field, exercise);
    return `<label><span>${label}</span><input value="${escapeHtml(value)}" inputmode="${inputMode}" aria-label="${label}" data-set-field="${field}" /></label>`;
  }).join("");
  return `<div class="set-row active-set"${set.touched ? ' data-touched="true"' : ""}><span>${escapeHtml(set.setNumber || index + 1)}</span>${fields}</div>`;
}

function completeSetRowHtml(exercise, set, index) {
  const detail = localizedWorkoutSetDetail(set).split(" · ");
  const cells = [
    detail[0] || tx("Done"),
    detail[1] || (isChineseLanguage() ? "已记录" : "Completed"),
    detail.slice(2).join(" · ") || (isChineseLanguage() ? "已保存" : "Logged"),
  ];
  return `<div class="set-row complete" data-set-payload="${escapeHtml(JSON.stringify(set))}"><span>${escapeHtml(set.setNumber || index + 1)}</span>${cells.map((cell) => `<strong>${escapeHtml(cell)}</strong>`).join("")}</div>`;
}

function editCompleteSetRowHtml(exercise, set, index) {
  const fields = setFieldConfig(exercise).map(([field, label, inputMode]) => {
    const value = setFieldValue(set, field, exercise);
    return `<label><span>${label}</span><input value="${escapeHtml(value)}" inputmode="${inputMode}" aria-label="${label}" data-edit-complete-set-field="${field}" /></label>`;
  }).join("");
  return `<div class="set-row edit-set" data-original-set-payload="${escapeHtml(JSON.stringify(set))}"><span>${escapeHtml(set.setNumber || index + 1)}</span>${fields}<button class="small-button set-save" type="button" data-save-complete-set>${tx("Save")}</button><button class="ghost-button set-cancel" type="button" data-cancel-complete-set>${tx("Cancel")}</button></div>`;
}

function exerciseForSetRow(row) {
  const card = row?.closest(".exercise-card");
  const name = getExerciseName(card);
  return {
    name,
    group: card ? getExerciseGroup(card) : exerciseCatalog[name]?.group || "Custom",
    target: card ? getExerciseTarget(card) : exerciseCatalog[name]?.target || "target 3 x 10",
  };
}

function setPayloadFromCompleteRow(row) {
  if (row?.dataset.setPayload) {
    try {
      return JSON.parse(row.dataset.setPayload);
    } catch {
      row.removeAttribute("data-set-payload");
    }
  }
  return serializeSetRow(row);
}

function serializeEditedCompleteSetRow(row) {
  const setNumber = row.querySelector("span")?.textContent.trim() || "1";
  const values = {};
  row.querySelectorAll("[data-edit-complete-set-field]").forEach((input) => {
    const field = input.dataset.editCompleteSetField;
    values[field] = field === "distance"
      ? normalizeDistanceEntry(input.value)
      : field === "duration"
        ? normalizeDurationEntry(input.value)
        : field === "reps"
          ? normalizeRepsEntry(input.value)
          : input.value || "";
  });
  return { setNumber, weight: values.weight || "", reps: values.reps || "", duration: values.duration || "", distance: values.distance || "", rpe: values.rpe || "", complete: true };
}

function originalSetPayloadFromEditRow(row) {
  try {
    return JSON.parse(row?.dataset.originalSetPayload || "{}");
  } catch {
    return serializeEditedCompleteSetRow(row);
  }
}

function comparableSetValues(set) {
  return ["weight", "reps", "duration", "distance", "rpe"].map((field) => String(set?.[field] || "").trim()).join("|");
}

function validateSetRowBeforeSave(row) {
  const rpeInput = row?.querySelector('[data-set-field="rpe"], [data-edit-complete-set-field="rpe"], [data-edit-set-field="rpe"]');
  const rpeValue = rpeInput?.value.trim() || "";
  const evidenceFields = ["weight", "reps", "duration", "distance", "rpe"];
  const hasWorkoutEvidence = evidenceFields.some((field) => {
    return Boolean(row?.querySelector(`[data-set-field="${field}"], [data-edit-complete-set-field="${field}"], [data-edit-set-field="${field}"]`)?.value.trim());
  });
  if (!hasWorkoutEvidence) {
    showToast(tx("Add load, reps, time, distance, or RPE"));
    row?.querySelector("input")?.focus();
    return false;
  }
  const numericFieldChecks = [
    ["weight", "load", /^\d+(?:\.\d+)?$/],
    ["duration", "duration", /^\d+(?:\.\d+)?\s*(sec|min)?$/i],
    ["distance", "distance", /^\d+(?:\.\d+)?\s*(m|yd|km|mi)?$/i],
  ];

  for (const [field, label, pattern] of numericFieldChecks) {
    const input = row?.querySelector(`[data-set-field="${field}"], [data-edit-complete-set-field="${field}"], [data-edit-set-field="${field}"]`);
    const rawValue = input?.value.trim() || "";
    const value = field === "distance"
      ? normalizeDistanceUnitText(rawValue)
      : field === "duration"
        ? normalizeDurationUnitText(rawValue)
        : rawValue;
    if (value && !pattern.test(value)) {
      showToast(tx(`Use a valid ${label} number`));
      input?.focus();
      return false;
    }
  }

  const repsInput = row?.querySelector('[data-set-field="reps"], [data-edit-complete-set-field="reps"], [data-edit-set-field="reps"]');
  const repsValue = normalizeRepsEntry(repsInput?.value || "");
  if (repsValue && !/^\d+(?:\.\d+)?(?:\s*(?:\/side|each|per side))?$/i.test(repsValue)) {
    showToast(tx("Use valid reps, like 10 or 10/side"));
    repsInput?.focus();
    return false;
  }

  if (!rpeValue) return true;

  const numericRpe = Number(rpeValue);
  if (Number.isFinite(numericRpe) && numericRpe >= 0 && numericRpe <= 10) return true;

  showToast(tx("Use an RPE from 0 to 10"));
  rpeInput?.focus();
  return false;
}

function validateStandardEditor(row) {
  return [...row.querySelectorAll("[data-standard-exercise-index]")].every(validateSetRowBeforeSave);
}

function finalizeActiveSetBeforeFinishingExercise(card) {
  const activeSet = card?.querySelector(".active-set");
  if (!activeSet) return true;
  if (!validateSetRowBeforeSave(activeSet)) return false;

  const exercise = exerciseForSetRow(activeSet);
  const completedRows = [...card.querySelectorAll(".set-row.complete, .set-row.edit-set")];
  const currentSet = { ...serializeSetRow(activeSet), complete: true };
  const lastCompletedSet = completedRows.length ? serializeSetRow(completedRows.at(-1)) : null;
  const activeSetHasNewValues = lastCompletedSet
    ? comparableSetValues(currentSet) !== comparableSetValues(lastCompletedSet)
    : currentSet.touched;
  const index = [...activeSet.parentElement.querySelectorAll(".set-row")].indexOf(activeSet);

  if (activeSetHasNewValues) {
    activeSet.outerHTML = completeSetRowHtml(exercise, currentSet, index);
  } else {
    activeSet.remove();
  }
  return true;
}

function serializeSetRow(row) {
  const setNumber = row.querySelector("span")?.textContent.trim() || "1";
  if (row.classList.contains("edit-set")) {
    return serializeEditedCompleteSetRow(row);
  }
  if (row.classList.contains("active-set")) {
    const values = {};
    [...row.querySelectorAll("input")].forEach((input, index) => {
      const fallbackFields = ["weight", "reps", "rpe"];
      const field = input.dataset.setField || fallbackFields[index];
      values[field] = field === "distance"
        ? normalizeDistanceEntry(input.value)
        : field === "duration"
          ? normalizeDurationEntry(input.value)
          : field === "reps"
            ? normalizeRepsEntry(input.value)
            : input.value || "";
    });
    return { setNumber, weight: values.weight || "", reps: values.reps || "", duration: values.duration || "", distance: values.distance || "", rpe: values.rpe || "", touched: row.dataset.touched === "true", complete: false };
  }

  if (row.dataset.setPayload) {
    try {
      return { ...JSON.parse(row.dataset.setPayload), complete: row.classList.contains("complete") };
    } catch {
      row.removeAttribute("data-set-payload");
    }
  }

  const fields = [...row.querySelectorAll("strong, span")].map((item) => item.textContent.trim());
  const rawWeight = fields[1]?.replace(/\s*(lb|kg)$/i, "") || "";
  const rawReps = fields[2]?.replace(/\s*reps$/i, "") || "";
  return {
    setNumber,
    weight: rawWeight === "Done" ? "" : rawWeight,
    reps: rawReps === "Completed" ? "" : rawReps,
    rpe: fields[3]?.replace(/^RPE\s*/i, "") || "",
    complete: row.classList.contains("complete"),
  };
}

function serializeExerciseCard(card) {
  const name = getExerciseName(card);
  return {
    name,
    group: getExerciseGroup(card),
    target: getExerciseTarget(card),
    sets: [...card.querySelectorAll(".set-row")].map(serializeSetRow),
  };
}

function serializeLoggedExerciseCard(card) {
  const exercise = serializeExerciseCard(card);
  return {
    ...exercise,
    sets: [...card.querySelectorAll(".set-row.complete, .set-row.edit-set, .active-set[data-touched='true']")].map(serializeSetRow),
  };
}

function serializeStandardExerciseCard(card) {
  const exercise = serializeExerciseCard(card);
  return {
    ...exercise,
    sets: exercise.sets.map((set, index) => ({
      setNumber: String(index + 1),
      weight: set.weight || "",
      reps: set.reps || "",
      duration: set.duration || "",
      distance: set.distance || "",
      rpe: set.rpe || "7",
      complete: false,
    })),
  };
}

function plannedSetForStandardExercise(exercise) {
  const firstSet = exercise.sets?.[0] || getDefaultSetForExercise(exercise.name);
  return {
    ...firstSet,
    setNumber: "1",
    complete: false,
  };
}

function createSetRowsHtml(exercise, isCurrent) {
  if (isCurrent) {
    return activeSetRowHtml(exercise, plannedSetForStandardExercise(exercise), 0);
  }

  const sourceSets = exercise.sets?.length ? exercise.sets : [{ setNumber: "1", weight: "", reps: getDefaultRepsFromText(exercise.target), rpe: "7", complete: false }];
  return sourceSets.map((set, index) => {
    return completeSetRowHtml(exercise, set, index);
  }).join("");
}

function createExerciseCardFromStandard(exercise, isCurrent = false) {
  const article = document.createElement("article");
  const group = exercise.group || exerciseCatalog[exercise.name]?.group || "Custom";
  const target = exercise.target || exerciseCatalog[exercise.name]?.target || "target 3 x 10";
  const actionHtml = isCurrent
    ? `<div class="exercise-actions"><button class="small-button" type="button" data-finish-set>${tx("Finish Set")}</button><button class="outline-button" type="button" data-finish-exercise>${tx("Finish Exercise")}</button></div>`
    : `<span class="pill">${escapeHtml(localizedGroupName(group))}</span><button class="outline-button start-exercise-button" type="button" data-start-exercise>${tx("Start Exercise")}</button>`;

  article.className = `exercise-card${isCurrent ? " current" : ""}`;
  article.savedStandardExercise = exercise;
  setExerciseCardData(article, { name: exercise.name, group, target });
  article.innerHTML = `<div class="exercise-topline"><div><h3>${escapeHtml(localizedExerciseName(exercise.name))}</h3><p>${escapeHtml(localizedTargetText(target))}</p></div>${actionHtml}</div>${isCurrent ? `<div class="set-grid" aria-label="${escapeHtml(localizedSetGridLabel(exercise.name))}">${createSetRowsHtml(exercise, true)}</div>` : ""}`;
  return article;
}

function getDefaultSetForExercise(name) {
  const exercise = {
    name,
    target: exerciseCatalog[name]?.target || "target 3 x 10",
    group: exerciseCatalog[name]?.group || "Custom",
  };
  const set = {
    setNumber: "1",
    weight: "",
    reps: exerciseTrackingType(exercise) === "strength" ? getDefaultRepsFromText(exercise.target) : "",
    duration: exerciseTrackingType(exercise) !== "strength" ? defaultDurationFromText(exercise.target) : "",
    distance: exerciseTrackingType(exercise) === "distance" ? defaultDistanceFromText(exercise.target) : "",
    rpe: "7",
    complete: false,
  };
  return set;
}

function availableStandardExerciseNames(selectedName = "") {
  const names = new Map();
  [selectedName, ...Object.keys(exerciseCatalog), ...recordedExerciseNamesFromRecordings()].forEach((name) => {
    const normalized = normalizeExerciseName(name);
    if (normalized && !names.has(normalized)) {
      names.set(normalized, name);
    }
  });
  savedStandards.forEach((standard) => {
    (standard.exercises || []).forEach((exercise) => {
      const normalized = normalizeExerciseName(exercise.name);
      if (normalized && !names.has(normalized)) {
        names.set(normalized, exercise.name);
      }
    });
  });
  return [...names.values()];
}

function getCatalogOptions(selectedName) {
  return availableStandardExerciseNames(selectedName).map((name) => {
    return `<option value="${escapeHtml(name)}"${name === selectedName ? " selected" : ""}>${escapeHtml(localizedExerciseName(name))}</option>`;
  }).join("");
}

function renderStandardExerciseEditor(exercise, index) {
  const set = exercise.sets?.[exercise.sets.length - 1] || getDefaultSetForExercise(exercise.name);
  const target = exercise.target || exerciseCatalog[exercise.name]?.target || "target 3 x 10";
  const fieldExercise = {
    name: exercise.name,
    group: exercise.group || exerciseCatalog[exercise.name]?.group || "Custom",
    target,
  };
  const setDefaults = setFieldConfig(fieldExercise).map(([field, label, inputMode]) => {
    const value = setFieldValue(set, field, fieldExercise);
    return `<label><span>${escapeHtml(label)}</span><input value="${escapeHtml(value)}" data-edit-set-field="${field}" inputmode="${inputMode}" /></label>`;
  }).join("");
  return `<div class="standard-exercise-editor" data-standard-exercise-index="${index}">
    <label>
      <span>${tx("Exercises")}</span>
      <select data-edit-exercise-name>${getCatalogOptions(exercise.name)}</select>
    </label>
    <label>
      <span>${tx("Target note")}</span>
      <input value="${escapeHtml(target)}" data-edit-exercise-target />
    </label>
    <div class="standard-set-defaults">
      ${setDefaults}
    </div>
    <button class="ghost-button remove-standard-exercise" type="button" data-remove-standard-exercise>${tx("Remove")}</button>
  </div>`;
}

function renderStandardSetDefaults(exerciseRow, name, target) {
  const container = exerciseRow?.querySelector(".standard-set-defaults");
  if (!container) return;
  const exercise = {
    name,
    group: exerciseCatalog[name]?.group || "Custom",
    target,
  };
  const defaultSet = getDefaultSetForExercise(name);
  container.innerHTML = setFieldConfig(exercise).map(([field, label, inputMode]) => {
    const value = setFieldValue(defaultSet, field, exercise);
    return `<label><span>${escapeHtml(label)}</span><input value="${escapeHtml(value)}" data-edit-set-field="${field}" inputmode="${inputMode}" /></label>`;
  }).join("");
}

function standardEditorFieldNames(exerciseRow) {
  return [...(exerciseRow?.querySelectorAll("[data-edit-set-field]") || [])].map((input) => input.dataset.editSetField).join("|");
}

function standardFieldNamesForTarget(name, target) {
  const exercise = {
    name,
    group: exerciseCatalog[name]?.group || "Custom",
    target,
  };
  return setFieldConfig(exercise).map(([field]) => field).join("|");
}

function serializeStandardEditor(row, standard) {
  const nameInput = row.querySelector(`[data-standard-name-input="${standard.id}"]`);
  const exercises = [...row.querySelectorAll("[data-standard-exercise-index]")].map((exerciseRow, index) => {
    const name = exerciseRow.querySelector("[data-edit-exercise-name]")?.value || "Custom Exercise";
    const target = exerciseRow.querySelector("[data-edit-exercise-target]")?.value.trim() || exerciseCatalog[name]?.target || "target 3 x 10";
    const values = {};
    exerciseRow.querySelectorAll("[data-edit-set-field]").forEach((input) => {
      values[input.dataset.editSetField] = input.dataset.editSetField === "distance"
        ? normalizeDistanceEntry(input.value)
        : input.dataset.editSetField === "duration"
          ? normalizeDurationEntry(input.value)
          : input.dataset.editSetField === "reps"
            ? normalizeRepsEntry(input.value)
            : input.value || "";
    });
    const defaultSet = getDefaultSetForExercise(name);
    return {
      name,
      group: exerciseCatalog[name]?.group || "Custom",
      target,
      sets: [{
        setNumber: "1",
        weight: values.weight || "",
        reps: values.reps || defaultSet.reps || "",
        duration: values.duration || defaultSet.duration || "",
        distance: values.distance || defaultSet.distance || "",
        rpe: values.rpe || "7",
        complete: false,
      }],
      order: index,
    };
  });

  return {
    name: nameInput?.value.trim() || standard.name,
    exercises: exercises.length ? exercises : [createDefaultStandardExercise("Custom Exercise")],
  };
}

function createDefaultStandardExercise(name) {
  const target = exerciseCatalog[name]?.target || "target 3 x 10";
  return {
    name,
    group: exerciseCatalog[name]?.group || "Custom",
    target,
    sets: [getDefaultSetForExercise(name)],
  };
}

function normalizedStandardExercise(exercise = {}) {
  const name = normalizeExerciseName(exercise.name) ? exercise.name : "Custom Exercise";
  const target = String(exercise.target || "").trim() || exerciseCatalog[name]?.target || "target 3 x 10";
  const group = String(exercise.group || "").trim() || exerciseCatalog[name]?.group || "Custom";
  return {
    ...createDefaultStandardExercise(name),
    ...exercise,
    name,
    group,
    target,
    sets: Array.isArray(exercise.sets) && exercise.sets.length ? exercise.sets : [getDefaultSetForExercise(name)],
  };
}

function normalizedStandardExercises(standard = {}) {
  return Array.isArray(standard.exercises) && standard.exercises.length
    ? standard.exercises.map(normalizedStandardExercise)
    : [createDefaultStandardExercise("Custom Exercise")];
}

function startStandardWorkout(standard, options = {}) {
  if (!standard) return false;
  const exercises = normalizedStandardExercises(standard);
  const standardDisplayName = normalizedStandardName(standard.name) || "Saved Standard";
  if (!exercises.length) {
    showToast(tx("Add an exercise to this standard before starting"));
    return false;
  }
  if (!options.force && activeWorkoutHasUnsavedData()) {
    return protectActiveWorkoutSwitch(standardDisplayName, () => startStandardWorkout(standard, { force: true }));
  }
  const now = Date.now();
  const standardStartKey = standard.id || standardNameKey(standardDisplayName || exercises[0]?.name || "standard");
  if (lastStandardStart.id === standardStartKey && now - lastStandardStart.at < 1200) {
    showToast(isChineseLanguage() ? `${localizedWorkoutName(standardDisplayName)} 已经开始` : `${standardDisplayName} already started`);
    return false;
  }
  lastStandardStart = { id: standardStartKey, at: now };

  workoutTitle.textContent = localizedWorkoutName(standardDisplayName);
  workoutStatus.textContent = isChineseLanguage()
    ? `正在记录 ${localizedExerciseName(exercises[0]?.name || "first exercise")} 第 1 组`
    : `Recording set 1 of ${exercises[0]?.name || "first exercise"}`;
  workoutHeading.textContent = localizedWorkoutName(standardDisplayName);
  currentWorkoutKey = standard.workoutKey || "custom";
  currentWorkoutStartedAt = Date.now();
  currentWorkoutCalories = 0;
  currentWorkoutMinutes = 0;
  exerciseList.replaceChildren();
  exercises.forEach((exercise, index) => {
    exerciseList.append(createExerciseCardFromStandard(exercise, index === 0));
  });
  addDeleteControls();
  localizeExerciseCards();
  updateWorkoutProgress();
  focusStart.hidden = true;
  workoutSession.hidden = false;
  todaySummary.hidden = true;
  renderWorkoutTelemetry();
  persistActiveWorkoutSession();
  closeStandardsSheet();
  navigateToScreen("today-screen");
  document.querySelector("#today-screen").scrollTo({ top: 0 });
  return true;
}

function renderStandards(query = standardsSearch?.value || "") {
  if (ensureSavedStandardIds()) {
    saveAppState();
  }
  standardsList.replaceChildren();
  const normalizedQuery = normalizeExerciseSearch(query);

  if (savedStandards.length === 0) {
    const empty = document.createElement("div");
    empty.className = "insight-card";
    empty.innerHTML = `<strong>${tx("No standards yet")}</strong><span>${tx("Save a workout as a standard to reuse its exercises, sets, weight, reps, and RPE defaults.")}</span>`;
    standardsList.append(empty);
    return;
  }

  const visibleStandards = sortedSavedStandards().filter((standard) => standardMatchesSearch(standard, normalizedQuery));

  if (visibleStandards.length === 0) {
    const empty = document.createElement("div");
    empty.className = "insight-card";
    empty.innerHTML = `<strong>${tx("No matching standards")}</strong><span>${tx("Try another workout name or exercise.")}</span>`;
    standardsList.append(empty);
    return;
  }

  visibleStandards.forEach((standard) => {
    const row = document.createElement("div");
    row.className = "standard-row";
    const standardExercises = normalizedStandardExercises(standard);
    const exerciseNames = standardExercises.map((exercise) => localizedExerciseName(exercise.name)).join(" · ");
    const isConfirmingDelete = pendingDeleteStandardId === standard.id;
    if (editingStandardId === standard.id) {
      row.classList.add("editing");
      const exerciseEditors = standardExercises.map(renderStandardExerciseEditor).join("");
      row.innerHTML = `<div class="standard-edit"><label><span>${tx("Name")}</span><input value="${escapeHtml(standard.name)}" data-standard-name-input="${standard.id}" /></label><span>${escapeHtml(exerciseNames)}</span><div class="standard-exercise-list">${exerciseEditors}</div></div><div class="standard-actions"><button type="button" data-save-standard-edit="${standard.id}">${tx("Save")}</button><button type="button" data-add-standard-exercise="${standard.id}">${tx("+ Exercise")}</button><button type="button" data-cancel-standard-edit>${tx("Cancel")}</button></div>`;
    } else {
      row.innerHTML = `<div><strong>${escapeHtml(standard.name)}</strong><span>${escapeHtml(exerciseNames)}</span></div><div class="standard-actions"><button type="button" data-start-standard="${standard.id}">${tx("Start")}</button><button type="button" data-edit-standard="${standard.id}">${tx("Edit")}</button><button class="${isConfirmingDelete ? "danger-button" : ""}" type="button" ${isConfirmingDelete ? `data-confirm-delete-standard="${standard.id}"` : `data-delete-standard="${standard.id}"`}>${isConfirmingDelete ? tx("Confirm delete") : tx("Delete")}</button></div>`;
    }
    standardsList.append(row);
  });
}

function standardSortTime(standard) {
  const explicit = Date.parse(standard.updatedAt || standard.createdAt || "");
  if (Number.isFinite(explicit)) return explicit;
  const fromId = Number(standard.id);
  return Number.isFinite(fromId) ? fromId : 0;
}

function sortedSavedStandards() {
  return [...savedStandards].sort((a, b) => standardSortTime(b) - standardSortTime(a));
}

function safeStandardId(value, fallbackName, index) {
  const rawValue = String(value || "").trim();
  const safeValue = rawValue.replace(/[^a-zA-Z0-9_-]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
  if (safeValue) return safeValue;
  const fallback = String(fallbackName || "untitled").replace(/[^a-zA-Z0-9_-]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
  return `standard-${fallback || "untitled"}-${index + 1}`;
}

function ensureSavedStandardIds() {
  let changed = false;
  const usedIds = new Set();
  savedStandards = savedStandards.map((standard, index) => {
    const fallbackName = standardNameKey(standard?.name || "") || "untitled";
    const originalId = String(standard?.id || "").trim();
    let id = safeStandardId(standard?.id, fallbackName, index);
    if (id !== originalId) {
      changed = true;
    }
    if (!id || usedIds.has(id)) {
      id = safeStandardId("", fallbackName, index);
      changed = true;
    }
    usedIds.add(id);
    return standard?.id === id ? standard : { ...standard, id };
  });
  return changed;
}

function standardSearchText(standard) {
  const exerciseText = (standard.exercises || []).map((exercise) => `${exercise.name || ""} ${exercise.group || ""} ${exercise.target || ""}`);
  return [standard.name || "", ...exerciseText].join(" ");
}

function standardMatchesSearch(standard, normalizedQuery) {
  if (!normalizedQuery) return true;
  return normalizeExerciseSearch(standardSearchText(standard)).includes(normalizedQuery);
}

function touchStandard(standard, now = new Date()) {
  if (!standard) return;
  standard.updatedAt = now.toISOString();
  standard.createdAt = standard.createdAt || standard.updatedAt;
}

function normalizedStandardName(name) {
  return String(name || "").trim().replace(/\s+/g, " ");
}

function standardNameKey(name) {
  return normalizedStandardName(name).toLowerCase();
}

function standardNameConflict(name, standardId) {
  return savedStandards.some((standard) => standard.id !== standardId && standardNameKey(standard.name) === standardNameKey(name));
}

function canSaveEditedStandard(editedStandard, standard) {
  if (!editedStandard || !standard) return false;
  if (standardNameConflict(editedStandard.name, standard.id)) {
    showToast(tx("A standard with this name already exists"));
    return false;
  }
  return true;
}

function saveCurrentStandard(nameOverride) {
  const name = normalizedStandardName(nameOverride || workoutTitle.textContent || "Workout") || "Workout";
  const cards = [...exerciseList.querySelectorAll(".exercise-card")];
  if (cards.length === 0) {
    showToast(tx("Add an exercise before saving a standard"));
    return false;
  }
  for (const row of cards.flatMap((card) => [...card.querySelectorAll(".active-set[data-touched='true'], .edit-set")])) {
    if (!validateSetRowBeforeSave(row)) return false;
  }
  const exercises = cards.map(serializeStandardExerciseCard);
  const existingStandard = savedStandards.find((standard) => standardNameKey(standard.name) === standardNameKey(name));
  if (existingStandard) {
    existingStandard.name = name;
    existingStandard.workoutKey = currentWorkoutKey || existingStandard.workoutKey || "custom";
    existingStandard.exercises = exercises;
    touchStandard(existingStandard);
  } else {
    const standard = { id: `${Date.now()}`, name, workoutKey: currentWorkoutKey || "custom", exercises };
    touchStandard(standard);
    savedStandards = [...savedStandards, standard];
  }
  saveAppState();
  showToast(isChineseLanguage() ? `${existingStandard ? "已更新" : "已保存"}模板：${localizedWorkoutName(name)}` : `${existingStandard ? "Updated" : "Saved"} standard: ${name}`);
  return true;
}

function showToast(message) {
  toast.textContent = message;
  toast.hidden = false;
  window.clearTimeout(showToast.timeoutId);
  showToast.timeoutId = window.setTimeout(() => {
    toast.hidden = true;
  }, 2200);
}

function duplicateSetSubmission(card, set) {
  const signature = `${getExerciseName(card)}|${comparableSetValues(set)}`;
  const now = Date.now();
  const isDuplicate = lastSetSubmission.signature === signature && now - lastSetSubmission.at < 900;
  lastSetSubmission = { signature, at: now };
  return isDuplicate;
}

function recordCurrentSet() {
  const currentCard = exerciseList.querySelector(".exercise-card.current");
  const activeSet = currentCard?.querySelector(".active-set");
  if (!activeSet) {
    showToast(tx("No active set to record"));
    return;
  }
  if (!validateSetRowBeforeSave(activeSet)) return;

  const setNumber = Number(activeSet.querySelector("span")?.textContent || "1");
  const currentExercise = getExerciseName(currentCard);
  const exercise = {
    name: currentExercise,
    group: getExerciseGroup(currentCard),
    target: getExerciseTarget(currentCard),
  };
  const completedSet = {
    ...serializeSetRow(activeSet),
    setNumber: String(setNumber),
    complete: true,
  };
  if (duplicateSetSubmission(currentCard, completedSet)) {
    showToast(tx("Set already recorded"));
    return;
  }
  const nextSet = {
    ...completedSet,
    setNumber: String(setNumber + 1),
    touched: false,
    complete: false,
  };

  const setGrid = activeSet.parentElement;
  activeSet.classList.remove("active-set");
  activeSet.classList.add("complete");
  activeSet.outerHTML = completeSetRowHtml(exercise, completedSet, setNumber - 1);
  setGrid?.insertAdjacentHTML("beforeend", activeSetRowHtml(exercise, nextSet, setNumber));
  addDeleteControls();

  workoutStatus.textContent = isChineseLanguage()
    ? `正在记录 ${localizedExerciseName(currentExercise)} 第 ${setNumber + 1} 组`
    : `Recording set ${setNumber + 1} of ${currentExercise}`;
  renderWorkoutTelemetry();
  persistActiveWorkoutSession();
  showToast(isChineseLanguage() ? `第 ${setNumber} 组已记录` : `Set ${setNumber} recorded`);
}

function getDefaultReps(card) {
  const targetText = getExerciseTarget(card);
  return getDefaultRepsFromText(targetText);
}

function getDefaultRepsFromText(targetText) {
  const repsMatch = targetText.match(/x\s*(\d+)/i);
  return repsMatch?.[1] || "10";
}

function addPendingStartButton(card) {
  if (card.classList.contains("done") || card.querySelector("[data-start-exercise]")) return;

  const topline = card.querySelector(".exercise-topline");
  topline?.insertAdjacentHTML("beforeend", `<button class="outline-button start-exercise-button" type="button" data-start-exercise>${tx("Start Exercise")}</button>`);
}

function activateExerciseCard(card) {
  if (!card) return false;

  const previousCurrent = exerciseList.querySelector(".exercise-card.current");
  if (previousCurrent && previousCurrent !== card) {
    if (!finalizeActiveSetBeforeFinishingExercise(previousCurrent)) return false;
    previousCurrent.classList.remove("current");
    previousCurrent.querySelector(".exercise-actions")?.remove();
    addPendingStartButton(previousCurrent);
  }

  card.classList.add("current");
  card.classList.remove("done", "expanded");
  card.classList.remove("show-delete");
  card.querySelector(".pill.green")?.remove();
  card.querySelector("[data-start-exercise]")?.remove();

  if (!card.querySelector(".exercise-actions")) {
    card.querySelector(".exercise-topline")?.insertAdjacentHTML("beforeend", `<div class="exercise-actions"><button class="small-button" type="button" data-finish-set>${tx("Finish Set")}</button><button class="outline-button" type="button" data-finish-exercise>${tx("Finish Exercise")}</button></div>`);
  }

  if (!card.querySelector(".set-grid")) {
    const exerciseName = getExerciseName(card);
    const savedExercise = card.savedStandardExercise;
    const exercise = {
      name: exerciseName,
      group: getExerciseGroup(card),
      target: getExerciseTarget(card),
    };
    const rowsHtml = savedExercise
      ? createSetRowsHtml(savedExercise, true)
      : activeSetRowHtml(exercise, getDefaultSetForExercise(exerciseName), 0);
    card.insertAdjacentHTML("beforeend", `<div class="set-grid" aria-label="${escapeHtml(localizedSetGridLabel(exerciseName))}">${rowsHtml}</div>`);
  }

  if (!card.querySelector(".active-set")) {
    const lastSet = card.savedStandardExercise?.sets?.at(-1);
    const nextSetNumber = Number(lastSet?.setNumber || card.querySelectorAll(".set-row").length || 0) + 1;
    const exerciseName = getExerciseName(card);
    const exercise = {
      name: exerciseName,
      group: getExerciseGroup(card),
      target: getExerciseTarget(card),
    };
    const nextSet = {
      ...(lastSet || getDefaultSetForExercise(exerciseName)),
      setNumber: String(nextSetNumber),
      complete: false,
    };
    card.querySelector(".set-grid")?.insertAdjacentHTML("beforeend", activeSetRowHtml(exercise, nextSet, nextSetNumber - 1));
  }

  const currentName = getExerciseName(card);
  const activeSetNumber = card.querySelector(".active-set span")?.textContent.trim() || "1";
  workoutStatus.textContent = isChineseLanguage()
    ? `正在记录 ${localizedExerciseName(currentName)} 第 ${activeSetNumber} 组`
    : `Recording set ${activeSetNumber} of ${currentName}`;
  addDeleteControls();
  localizeExerciseCard(card);
  updateWorkoutProgress();
  persistActiveWorkoutSession();
  card.scrollIntoView({ block: "nearest" });
  return true;
}

function finishCurrentExercise() {
  const currentCard = exerciseList.querySelector(".exercise-card.current");
  if (!currentCard) {
    showToast(tx("No active exercise"));
    return;
  }

  if (!finalizeActiveSetBeforeFinishingExercise(currentCard)) return;
  const currentName = getExerciseName(currentCard);
  const nextCard = [...exerciseList.querySelectorAll(".exercise-card")].find((card) => {
    return card !== currentCard && !card.classList.contains("done");
  });

  currentCard.classList.remove("current");
  currentCard.classList.add("done");
  currentCard.querySelector(".exercise-actions")?.remove();
  currentCard.querySelector("[data-start-exercise]")?.remove();
  currentCard.querySelector(".exercise-topline")?.insertAdjacentHTML("beforeend", `<span class="pill green">${tx("Done")}</span><button class="outline-button start-exercise-button" type="button" data-start-exercise>${tx("Add Set")}</button>`);

  if (!nextCard) {
    workoutStatus.textContent = tx("All exercises complete");
    updateWorkoutProgress();
    renderWorkoutTelemetry();
    persistActiveWorkoutSession();
    showToast(isChineseLanguage() ? `${localizedExerciseName(currentName)} 已结束` : `${currentName} finished`);
    return;
  }

  activateExerciseCard(nextCard);
  renderWorkoutTelemetry();
  persistActiveWorkoutSession();
  showToast(isChineseLanguage() ? `${localizedExerciseName(currentName)} 已结束` : `${currentName} finished`);
}

function todayRecordingTitle(workoutName) {
  return Domain.recordingTitleForDate(workoutName);
}

function formatRecordingSet(exercise, set) {
  return Domain.formatWorkoutSet(exercise, set, weightUnit());
}

function workoutFocusGroup(workoutName = workoutTitle.textContent || "") {
  if (["glute"].includes(currentWorkoutKey)) return "glutes";
  if (["shoulder"].includes(currentWorkoutKey)) return "shoulders";
  if (["back"].includes(currentWorkoutKey)) return "back";
  if (["chest"].includes(currentWorkoutKey)) return "chest";
  if (["abs"].includes(currentWorkoutKey)) return "abs";
  if (["arms"].includes(currentWorkoutKey)) return "arms";
  if (["recovery"].includes(currentWorkoutKey)) return "recovery";
  if (["cardio"].includes(currentWorkoutKey)) return "cardio";
  if (["custom"].includes(currentWorkoutKey)) return "custom";

  const normalizedName = workoutName.toLowerCase();
  if (normalizedName.includes("glute") || normalizedName.includes("leg") || normalizedName.includes("lower")) return "glutes";
  if (normalizedName.includes("shoulder")) return "shoulders";
  if (normalizedName.includes("back") || normalizedName.includes("pull")) return "back";
  if (normalizedName.includes("chest") || normalizedName.includes("push")) return "chest";
  if (normalizedName.includes("abs") || normalizedName.includes("core")) return "abs";
  if (normalizedName.includes("arm") || normalizedName.includes("biceps") || normalizedName.includes("triceps")) return "arms";
  if (normalizedName.includes("recovery") || normalizedName.includes("mobility") || normalizedName.includes("reset")) return "recovery";
  if (normalizedName.includes("cardio") || normalizedName.includes("conditioning") || normalizedName.includes("walk") || normalizedName.includes("bike") || normalizedName.includes("row")) return "cardio";
  if (normalizedName.includes("custom")) return "custom";
  return "other";
}

function saveWorkoutRecording(workoutName, exercises, session = {}) {
  const minutes = session.minutes || currentWorkoutMinutes || currentSessionMinutes() || 1;
  const calories = session.calories || currentWorkoutCalories || estimateWorkoutCalories(minutes);
  const recording = Domain.buildWorkoutRecording({
    workoutName,
    exercises,
    minutes,
    calories,
    weightUnit: weightUnit(),
    focusGroup: workoutFocusGroup(workoutName),
  });
  profileRecordings = [recording, ...profileRecordings];
  focusTrendsOnLoggedExercises(exercises);
  renderProfileSummary();
  renderWorkoutTrends();
  renderTrendChips();
  saveAppState();
}

function cardHasLoggedWorkoutData(card) {
  return Boolean(card.querySelector(".set-row.complete, .set-row.edit-set, .active-set[data-touched='true']"));
}

function getLoggedWorkoutCards(cards) {
  return cards.filter(cardHasLoggedWorkoutData);
}

function workoutSessionMinutesFromLoggedExercises(exercises) {
  return Domain.workoutSessionMinutes({
    elapsedMinutes: currentSessionMinutes(),
    currentWorkoutMinutes,
    exercises,
  });
}

function duplicateWorkoutFinish(workoutName, exercises) {
  const signature = `${workoutName}|${currentWorkoutStartedAt}|${JSON.stringify(exercises.map((exercise) => [exercise.name, exercise.sets?.length || 0]))}`;
  const now = Date.now();
  const isDuplicate = lastWorkoutFinish.signature === signature && now - lastWorkoutFinish.at < 1500;
  lastWorkoutFinish = { signature, at: now };
  return isDuplicate;
}

function finishWorkout() {
  const activeCard = exerciseList.querySelector(".exercise-card.current");
  if (activeCard?.querySelector(".active-set[data-touched='true']") && !finalizeActiveSetBeforeFinishingExercise(activeCard)) return;
  const cards = [...exerciseList.querySelectorAll(".exercise-card")];
  const workoutName = workoutTitle.textContent || "Workout";
  const completedCards = cards.filter((card) => card.classList.contains("done"));
  const loggedCards = getLoggedWorkoutCards(cards);
  if (loggedCards.length === 0) {
    showToast(tx("Add or record an exercise before finishing"));
    return;
  }
  const loggedExercises = loggedCards.map(serializeLoggedExerciseCard);
  if (duplicateWorkoutFinish(workoutName, loggedExercises)) {
    showToast(tx("Workout already saved"));
    return;
  }
  const sessionMinutes = workoutSessionMinutesFromLoggedExercises(loggedExercises);
  const sessionCalories = estimateWorkoutCalories(sessionMinutes);
  currentWorkoutMinutes = sessionMinutes;
  currentWorkoutCalories = sessionCalories;

  summaryTitle.textContent = localizedSummaryTitle(workoutName);
  summaryStandardName.value = localizedStandardName(workoutName);
  document.querySelector(".standard-save-panel .metric-label").textContent = tx("Save as Standard");
  document.querySelector("[data-summary-save-standard]").textContent = tx("Save Standard");
  summaryNote.textContent = completedCards.length === cards.length
    ? tx("All planned exercises are complete. Your workout is saved to today's recordings.")
    : tx("Workout ended early. Completed and started exercises are saved to today's recordings.");
  summaryCalories.textContent = formatEnergyFromKcal(sessionCalories);
  summaryTime.textContent = String(sessionMinutes);
  summaryExerciseCount.textContent = String(loggedCards.length);
  if (summaryTrendsNote) {
    summaryTrendsNote.textContent = localizedSummaryTrendsNote(sessionCalories, sessionMinutes);
  }
  summaryExercises.replaceChildren();

  loggedExercises.forEach((exercise, index) => {
    const completeSets = exercise.sets.filter((set) => set.complete).length;
    const row = document.createElement("div");
    row.className = "summary-row";
    row.dataset.summaryExercise = String(index);
    const detailRows = exercise.sets.map((set) => {
      return `<div><span>${escapeHtml(localizedSetNumberLabel(set.setNumber))}</span><strong>${escapeHtml(localizedWorkoutSetDetail(set))}</strong></div>`;
    }).join("");
    row.innerHTML = `<div><span>${escapeHtml(localizedExerciseName(exercise.name))}</span><strong>${escapeHtml(localizedSetCountLabel(completeSets))}</strong></div><button class="ghost-button" type="button" data-toggle-summary>${tx("Details")}</button><div class="summary-detail">${detailRows}</div>`;
    summaryExercises.append(row);
  });

  saveWorkoutRecording(workoutName, loggedExercises, { minutes: sessionMinutes, calories: sessionCalories });
  clearActiveWorkoutSession();

  workoutSession.hidden = true;
  currentWorkoutStartedAt = null;
  focusStart.hidden = true;
  todaySummary.hidden = false;
  renderWorkoutTelemetry();
  navigateToScreen("today-screen");
  document.querySelector("#today-screen").scrollTo({ top: 0 });
  showToast(tx("Workout saved"));
}

function openProfileDetail(detailKey, options = {}) {
  const detail = localizedProfileDetail(detailKey);
  if (!detail) return;

  activeProfileDetailKey = detailKey;
  profileReturnScreen = options.returnScreen || "";
  if (profileBackButton) {
    profileBackButton.textContent = profileReturnScreen === "coach-screen" ? tx("Back to AI Coach") : tx("Back to Profile");
  }

  profileDetailTitle.textContent = detail.title;
  profileDetailCopy.textContent = detail.copy;
  profileDetailBody.replaceChildren();

  if (detailKey === "personal") {
    renderPersonalDetail();
  } else if (detailKey === "recordings") {
    renderRecordingDetail();
  } else if (detailKey === "health") {
    renderHealthDetail();
  } else if (detailKey === "exercises") {
    renderExerciseDatabaseDetail();
  } else if (detailKey === "testing") {
    renderTestingDetail();
  } else if (detailKey === "standards") {
    openStandardsSheet();
    return;
  } else if (detailKey === "language") {
    renderChoiceDetail("language", profileSettingOptions.language);
  } else if (detailKey === "units") {
    renderUnitsDetail();
  } else if (detailKey === "goals") {
    renderGoalsDetail();
  } else {
  detail.items.forEach(([label, value]) => {
    const row = document.createElement("div");
    row.className = "profile-row detail-row";
    row.innerHTML = `<span>${label}</span><strong>${value}</strong>`;
    profileDetailBody.append(row);
  });
  }

  if (detail.action) {
    const action = document.createElement("button");
    action.className = "small-button detail-action";
    action.type = "button";
    action.dataset.openStandards = "";
    action.textContent = detail.action;
    profileDetailBody.append(action);
  }

  profileHome.hidden = true;
  profileDetailPanel.hidden = false;
  document.querySelector("#profile-screen").scrollTo({ top: 0 });
}

function renderPersonalDetail() {
  const latestMetrics = latestBodyMetricEntry();
  const metricDate = todayDateString();
  const canImportBodyMetrics = bodyMetricsPermissionEnabled();
  const hasHealthWeight = Boolean(String(userProfile.appleHealthWeight || "").trim());
  const feetDecimal = Number(convertHeightValue(userProfile.heightCm, "cm", "ft"));
  const displayedFeet = Number.isFinite(feetDecimal) ? String(Math.floor(feetDecimal)) : "";
  const displayedInches = Number.isFinite(feetDecimal) ? String(Math.round((feetDecimal - Math.floor(feetDecimal)) * 12)) : "";
  const heightFields =
    bodyUnit() === "cm"
      ? `<label><span>${tx("Height cm")}</span><input value="${escapeHtml(userProfile.heightCm)}" inputmode="decimal" data-profile-field="heightCm" /></label>`
      : `<div class="split-fields"><label><span>${tx("Height ft")}</span><input value="${escapeHtml(displayedFeet)}" inputmode="numeric" data-profile-field="heightFt" /></label><label><span>${tx("Height in")}</span><input value="${escapeHtml(displayedInches)}" inputmode="numeric" data-profile-field="heightIn" /></label></div>`;
  const displayedWeight = weightUnit() === "kg" ? convertWeightValue(userProfile.weightLb, "lb", "kg") : userProfile.weightLb;
  const displayedTargetWeight = weightUnit() === "kg" ? convertWeightValue(userProfile.targetWeightLb, "lb", "kg") : userProfile.targetWeightLb;
  const measurementFields = [
    ["Waist", "waistIn"],
    ["Hip", "hipIn"],
    ["Thigh", "thighIn"],
    ["Arm", "armIn"],
  ]
    .map(([label, field]) => {
      const value = measurementUnit() === "cm" ? convertMeasurementValue(userProfile.measurements[field], "in", "cm") : userProfile.measurements[field];
      return `<label><span>${tx(label)} ${measurementUnit()}</span><input value="${escapeHtml(value)}" inputmode="decimal" data-measurement-field="${field}" /></label>`;
    })
    .join("");
  const generalGoalOptions = ["Fat loss", "Lean muscle", "Bulk", "Strength", "General health"]
    .map((option) => optionHtml(option, userProfile.generalGoal))
    .join("");
  const sexOptions = ["Female", "Male", "Prefer not to say"].map((option) => optionHtml(option, userProfile.sex)).join("");
  const frequencyOptions = ["3 days/week", "4 days/week", "5+ days/week"].map((option) => optionHtml(option, userProfile.frequency)).join("");
  const latestSaved = latestMetrics?.date || tx("none");

  const form = document.createElement("div");
  form.className = "profile-form personal-form";
  form.innerHTML = `<label><span>${tx("Name")}</span><input value="${escapeHtml(userProfile.name)}" data-profile-field="name" /></label><label><span>${tx("Age")}</span><input value="${escapeHtml(userProfile.age)}" inputmode="numeric" data-profile-field="age" /></label>${heightFields}<div class="profile-form-section"><strong>${tx("Log body metrics")}</strong><span>${tx("Each body metric entry needs a date so Trends can calculate changes accurately. Latest saved:")} ${escapeHtml(latestSaved)}</span></div><label><span>${tx("Metric date")}</span><input type="date" value="${escapeHtml(metricDate)}" max="${todayDateString()}" data-profile-field="metricDate" /></label><label><span>${tx("Weight")} ${weightUnit()}</span><input value="${escapeHtml(displayedWeight)}" inputmode="decimal" data-profile-field="weight" /></label><label><span>${tx("Body fat")}</span><input value="${escapeHtml(userProfile.bodyFat)}" data-profile-field="bodyFat" /></label><label><span>${tx("Sex")}</span><select data-profile-field="sex">${sexOptions}</select></label><label><span>${tx("Training frequency")}</span><select data-profile-field="frequency">${frequencyOptions}</select></label><label><span>${tx("General goal")}</span><select data-profile-field="generalGoal">${generalGoalOptions}</select></label><label><span>${tx("Focus areas")}</span><input value="${escapeHtml(userProfile.focusAreas)}" data-profile-field="focusAreas" /></label><label><span>${tx("Target weight")} ${weightUnit()}</span><input value="${escapeHtml(displayedTargetWeight)}" inputmode="decimal" data-profile-field="targetWeight" /></label><label><span>${tx("Target body fat")}</span><input value="${escapeHtml(userProfile.targetBodyFat)}" data-profile-field="targetBodyFat" /></label><div class="profile-form-section"><strong>${tx("Body measurements")}</strong><span>${tx("Saved with the metric date above for waist, hip, thigh, and arm trends.")}</span></div>${measurementFields}<div class="health-import"><div><strong>${tx("Apple Health weight")}</strong><span>${hasHealthWeight ? `${formatProfileWeight(userProfile.appleHealthWeight)} · ${tx("updated today")}` : tx("No Apple Health weight synced yet")}</span></div><button class="ghost-button" type="button" data-open-health-settings>${canImportBodyMetrics && hasHealthWeight ? tx("Use Apple Health weight") : tx("Choose Apple Health sync")}</button></div><button class="small-button" type="button" data-save-personal>${tx("Save Personal Info")}</button>`;
  profileDetailBody.append(form);
}

function renderRecordingDetail() {
  if (profileRecordings.length === 0) {
    const empty = document.createElement("div");
    empty.className = "profile-empty-state";
    empty.innerHTML = `<strong>${tx("No recordings yet")}</strong><span>${tx("Finish a workout to build your history, trends, and AI Coach context.")}</span>`;
    profileDetailBody.append(empty);
    return;
  }

  sortedProfileRecordingsForDisplay().forEach(({ recording, index }) => {
    const row = document.createElement("div");
    row.className = "profile-recording";
    row.dataset.recordingIndex = String(index);
    const isConfirmingDelete = pendingDeleteRecordingIndex === index;
    const isEditing = editingRecordingIndex === index;
    const setLines = recordingSetLines(recording);
    const displayTitle = recordingDisplayTitle(recording);
    const displayMeta = recordingDisplayMeta(recording, setLines);
    row.innerHTML = `<div><strong>${escapeHtml(displayTitle)}</strong><span>${escapeHtml(displayMeta)}</span></div><div class="recording-actions"><button class="ghost-button" type="button" data-toggle-recording-detail>${tx("Details")}</button><button class="ghost-button" type="button" data-edit-recording>${isEditing ? tx("Editing") : tx("Edit")}</button><button class="${isConfirmingDelete ? "danger-button" : "outline-button"}" type="button" ${isConfirmingDelete ? "data-confirm-delete-recording" : "data-delete-recording"}>${isConfirmingDelete ? tx("Confirm delete") : tx("Delete")}</button></div><div class="recording-sets">${setLines.map((set) => `<p>${escapeHtml(set)}</p>`).join("")}</div>${isEditing ? recordingEditForm(recording, index) : ""}`;
    profileDetailBody.append(row);
  });
}

function currentLocalDataSnapshot() {
  return {
    appStateVersion,
    exportedAt: new Date().toISOString(),
    profileSettingsState,
    userProfile,
    savedStandards,
    profileRecordings,
    healthSyncState,
    healthPermissions,
    activeWorkoutSession: activeWorkoutSessionSnapshot() || readActiveWorkoutSession(),
  };
}

function localTestingReport() {
  const activeSession = activeWorkoutSessionSnapshot() || readActiveWorkoutSession();
  const recordedExercises = recordedExerciseNamesFromRecordings();
  return {
    app: "LiftTrend Prototype",
    reportType: "anonymous-testing-report",
    exportedAt: new Date().toISOString(),
    language: profileSettingsState.language,
    units: {
      weight: weightUnit(),
      body: bodyUnit(),
      distance: distanceUnit(),
      energy: energyUnit(),
    },
    profileCompleteness: {
      hasName: Boolean(normalizedStandardName(userProfile.name)),
      hasAge: Boolean(String(userProfile.age || "").trim()),
      hasHeight: Boolean(String(userProfile.heightCm || "").trim()),
      hasWeight: Boolean(String(userProfile.weightLb || "").trim()),
      hasGoal: Boolean(normalizedStandardName(profileSettingsState.goal || userProfile.generalGoal)),
      hasFocusAreas: Boolean(normalizedStandardName(userProfile.focusAreas)),
    },
    counts: {
      savedWorkouts: profileRecordings.length,
      savedStandards: savedStandards.length,
      recordedExercises: recordedExercises.length,
      activeWorkoutExercises: activeSession?.exercises?.length || 0,
      activeWorkoutCompletedSets: activeSession?.exercises?.reduce((count, exercise) => {
        return count + (exercise.sets || []).filter((set) => set.complete).length;
      }, 0) || 0,
    },
    recentWorkoutSummaries: sortedProfileRecordingsForDisplay().slice(0, 8).map(({ recording }) => ({
      date: recordingDateValue(recording),
      title: recordingDisplayTitle(recording),
      focusGroup: recording.focusGroup || normalizedRecordingFocusGroup("", recordingDisplayTitle(recording)),
      meta: recordingDisplayMeta(recording),
      setCount: recordingSetLines(recording).length,
    })),
    savedStandardSummaries: sortedSavedStandards().slice(0, 8).map((standard) => ({
      name: standard.name,
      exerciseCount: normalizedStandardExercises(standard).length,
      exercises: normalizedStandardExercises(standard).map((exercise) => exercise.name),
    })),
    health: {
      connected: Boolean(healthSyncState.connected),
      enabledScopes: healthPermissions.filter(([, , enabled]) => enabled).map(([label]) => label),
    },
  };
}

function downloadJsonFile(filename, payload) {
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function safeDateFileStamp() {
  return todayDateString().replace(/[^0-9-]/g, "");
}

function feedbackQuestionsText() {
  return isChineseLanguage()
    ? [
      "LiftTrend 测试反馈",
      "1. 第一次打开时，你是否知道下一步该点哪里？",
      "2. 开始一次训练、添加动作、记录一组分别顺不顺？哪里卡住了？",
      "3. 如果误点结束动作/结束训练，你是否容易恢复或修正？",
      "4. Trends 页面有没有帮你理解最近训练？哪些数据没用？",
      "5. AI Coach 的建议是否具体、可信、能执行？",
      "6. 你愿意连续用 7 天吗？如果不愿意，最大原因是什么？",
      "7. 最想要补上的一个功能是什么？",
    ].join("\n")
    : [
      "LiftTrend testing feedback",
      "1. On first open, did you know what to do next?",
      "2. Was it easy to start a workout, add an exercise, and record a set? Where did you get stuck?",
      "3. If you accidentally finished an exercise or workout, was it easy to recover?",
      "4. Did Trends help you understand recent training? Which metrics felt unnecessary?",
      "5. Were AI Coach suggestions specific, believable, and actionable?",
      "6. Would you use this for 7 days in a row? If not, what is the biggest reason?",
      "7. What is the one feature you most want next?",
    ].join("\n");
}

function copyFeedbackQuestions() {
  const text = feedbackQuestionsText();
  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(text)
      .then(() => showToast(tx("Feedback questions copied")))
      .catch(() => showToast(tx("Could not copy feedback questions")));
    return;
  }
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.append(textarea);
  textarea.select();
  try {
    document.execCommand("copy");
    showToast(tx("Feedback questions copied"));
  } catch {
    showToast(tx("Could not copy feedback questions"));
  } finally {
    textarea.remove();
  }
}

function renderTestingDetail() {
  const section = document.createElement("div");
  section.className = "testing-panel";
  section.innerHTML = `
    <button class="profile-row testing-action" type="button" data-export-test-report>
      <span>${tx("Anonymous test report")}</span>
      <strong>${tx("Export local testing data")}</strong>
      <small>${tx("Export a privacy-light report with counts, flow signals, and workout summaries.")}</small>
    </button>
    <button class="profile-row testing-action" type="button" data-export-full-backup>
      <span>${tx("Full local backup")}</span>
      <strong>JSON</strong>
      <small>${tx("Export everything saved in this browser so a tester can back up or send a debug file intentionally.")}</small>
    </button>
    <button class="profile-row testing-action" type="button" data-copy-feedback-questions>
      <span>${tx("Copy feedback questions")}</span>
      <strong>${tx("Copy")}</strong>
      <small>${tx("Copy a short checklist testers can answer after a few workouts.")}</small>
    </button>`;
  profileDetailBody.append(section);
}

function sortedProfileRecordingsForDisplay() {
  return profileRecordings
    .map((recording, index) => ({ recording, index }))
    .sort((a, b) => {
      const bDate = Domain.recordingDateOrNull(b.recording)?.getTime() || 0;
      const aDate = Domain.recordingDateOrNull(a.recording)?.getTime() || 0;
      return bDate - aDate || a.index - b.index;
    });
}

function recordingDisplayTitle(recording) {
  return String(recording?.title || "").trim() || "Untitled recording";
}

function recordingDisplayMeta(recording, setLines = recordingSetLines(recording)) {
  return String(recording?.meta || "").trim() || `${setLines.length || 0} set${setLines.length === 1 ? "" : "s"} saved`;
}

function recordingSetLines(recording) {
  return Array.isArray(recording?.sets) ? recording.sets.filter((set) => String(set || "").trim()) : [];
}

function recordingEditForm(recording, index) {
  const focusOptions = [
    ["chest", "Chest"],
    ["shoulders", "Shoulders"],
    ["back", "Back"],
    ["glutes", "Glutes/Legs"],
    ["abs", "Abs"],
    ["arms", "Arms"],
    ["recovery", "Recovery"],
    ["cardio", "Cardio"],
    ["custom", "Custom"],
    ["other", "Other"],
  ];
  const workoutName = recordingWorkoutName(recording);
  const selectedFocus = normalizedRecordingFocusGroup(recording.focusGroup, workoutName);
  const focusSelect = focusOptions
    .map(([value, label]) => `<option value="${value}"${selectedFocus === value ? " selected" : ""}>${tx(label)}</option>`)
    .join("");
  const sets = recordingSetLines(recording).join("\n");

  const placeholder = isChineseLanguage() ? "臀推 · 135 磅 · 10 次 · RPE 8" : "Hip Thrust · 135 lb · 10 reps · RPE 8";
  return `<div class="recording-edit-form" data-recording-edit-form="${index}"><label><span>${tx("Date")}</span><input type="date" value="${escapeHtml(recordingDateValue(recording))}" max="${todayDateString()}" data-edit-recording-field="date" /></label><label><span>${tx("Workout name")}</span><input value="${escapeHtml(workoutName)}" data-edit-recording-field="name" /></label><label><span>${tx("Focus")}</span><select data-edit-recording-field="focusGroup">${focusSelect}</select></label><div class="split-fields"><label><span>${tx("Minutes")}</span><input value="${escapeHtml(String(workoutMinutes(recording) || ""))}" inputmode="numeric" data-edit-recording-field="minutes" /></label><label><span>${tx("Energy")} ${energyUnit()}</span><input value="${escapeHtml(String(energyFromKcal(workoutCalories(recording)) || ""))}" inputmode="numeric" data-edit-recording-field="calories" /></label></div><label><span>${tx("Set details, one per line")}</span><textarea rows="5" placeholder="${escapeHtml(placeholder)}" data-edit-recording-field="sets">${escapeHtml(sets)}</textarea><small class="field-hint">${tx("Use Exercise · details. Examples: 10 reps, 30 sec, 1000 m, bodyweight.")}</small></label><div class="recording-set-preview" data-recording-set-preview aria-live="polite">${recordingSetPreviewHtml(sets)}</div><div class="recording-set-tools"><button class="ghost-button" type="button" data-add-recording-set-line>${tx("Add example line")}</button></div><div class="recording-edit-actions"><button class="small-button" type="button" data-save-recording-edit>${tx("Save Changes")}</button><button class="ghost-button" type="button" data-cancel-recording-edit>${tx("Cancel")}</button></div></div>`;
}

function normalizeRecordingSetLineInput(line) {
  const parts = String(line || "").split("·").map((part) => part.trim());
  const normalizedLine = parts.length > 1
    ? [canonicalExerciseNameFromLocalized(parts[0]), ...parts.slice(1)].join(" · ")
    : String(line || "");
  return normalizedLine
    .replace(/(\d+(?:\.\d+)?)\s*(?:磅|lbs?)/gi, "$1 lb")
    .replace(/(\d+(?:\.\d+)?)\s*(?:公斤|千克)/g, "$1 kg")
    .replace(/(\d+(?:\.\d+)?)\s*(?:分钟|分)/g, "$1 min")
    .replace(/(\d+(?:\.\d+)?)\s*(?:秒钟|秒)/g, "$1 sec")
    .replace(/(\d+(?:\.\d+)?)\s*(?:公里|千米)/g, "$1 km")
    .replace(/(\d+(?:\.\d+)?)\s*(?:英里)/g, "$1 mi")
    .replace(/(\d+(?:\.\d+)?)\s*(?:码)/g, "$1 yd")
    .replace(/(\d+(?:\.\d+)?)\s*(?:米)/g, "$1 m")
    .replace(/(\d+(?:\.\d+)?)\s*(?:次|个)\s*((?:每侧|每边|\/侧))?/g, (_, value, sideText) => {
      return sideText ? `${value}/side` : `${value} reps`;
    })
    .replace(/\bRPE\s*([零一二三四五六七八九十\d.]+)/gi, (_, value) => `RPE ${chineseNumberToDigit(value)}`)
    .replace(/自重/g, "bodyweight")
    .replace(/已完成/g, "completed")
    .replace(/已记录/g, "logged");
}

function chineseNumberToDigit(value) {
  const text = String(value || "").trim();
  if (/^\d+(?:\.\d+)?$/.test(text)) return text;
  const map = { 零: 0, 一: 1, 二: 2, 两: 2, 三: 3, 四: 4, 五: 5, 六: 6, 七: 7, 八: 8, 九: 9, 十: 10 };
  if (text === "十") return "10";
  if (text.length === 2 && text.endsWith("十")) return String((map[text[0]] || 1) * 10);
  if (text.includes("十")) {
    const [tens, ones] = text.split("十");
    return String((map[tens] || 1) * 10 + (map[ones] || 0));
  }
  return String(map[text] ?? text);
}

function recordingSetLinesFromText(value) {
  return String(value || "")
    .split("\n")
    .map((line) => normalizeRecordingSetLineInput(line.trim()))
    .filter(Boolean);
}

function recordingSetPreviewLoad(loadLb) {
  if (!loadLb) return "";
  const unit = weightUnit();
  const value = unit === "kg" ? convertWeightValue(loadLb, "lb", "kg") : Math.round(loadLb * 10) / 10;
  return `${value} ${unit}`;
}

function recordingSetPreviewDistance(distanceMeters) {
  if (!distanceMeters) return "";
  const unit = distanceUnit();
  return `${convertDistanceValue(distanceMeters, "m", unit)} ${unit}`;
}

function recordingSetPreviewHtml(value) {
  const setLines = recordingSetLinesFromText(value);
  if (!setLines.length) {
    return `<small>${tx("No set details yet")}</small>`;
  }

  return setLines
    .map((line, index) => {
      const parsed = parseRecordingSetLine(line);
      const metricParts = [];
      if (parsed.loadLb) metricParts.push(recordingSetPreviewLoad(parsed.loadLb));
      if (parsed.reps) metricParts.push(`${parsed.reps} reps`);
      if (parsed.durationMinutes) metricParts.push(`${Math.round(parsed.durationMinutes * 10) / 10} min`);
      if (parsed.distanceMeters) metricParts.push(recordingSetPreviewDistance(parsed.distanceMeters));
      if (parsed.rpe !== null && parsed.rpe !== undefined) metricParts.push(`RPE ${parsed.rpe}`);
      const summary = metricParts.length ? metricParts.join(" · ") : tx("needs measurable details");
      const fallbackLine = isChineseLanguage() ? `第 ${index + 1} 行` : `Line ${index + 1}`;
      return `<p><strong>${escapeHtml(localizedExerciseName(parsed.exerciseName) || fallbackLine)}</strong><span>${escapeHtml(summary)}</span></p>`;
    })
    .join("");
}

function updateRecordingSetPreview(form) {
  const preview = form?.querySelector("[data-recording-set-preview]");
  const textarea = form?.querySelector('[data-edit-recording-field="sets"]');
  if (!preview || !textarea) return;
  preview.innerHTML = recordingSetPreviewHtml(textarea.value);
}

function recordingWorkoutName(recording) {
  const titleParts = String(recording?.title || "").split("·");
  const fallbackTitle = String(recording?.title || "").trim();
  return titleParts.length > 1 ? titleParts.slice(1).join("·").trim() : fallbackTitle || "Workout";
}

function recordingDateValue(recording) {
  if (recording?.date) {
    const date = new Date(recording.date);
    if (!Number.isNaN(date.getTime())) {
      return Domain.localDateString(date);
    }
  }
  return todayDateString();
}

function isValidPastOrTodayDateValue(dateValue) {
  return Domain.validMetricDateValue(dateValue);
}

function titleForRecordingEdit(dateValue, workoutName) {
  const [year, month, day] = String(dateValue || todayDateString()).split("-").map(Number);
  const date = Number.isFinite(year) && Number.isFinite(month) && Number.isFinite(day)
    ? new Date(year, month - 1, day)
    : new Date();
  return Domain.recordingTitleForDate(workoutName || "Workout", date);
}

function metaForRecordingEdit(setLines, minutes, calories) {
  const exerciseNames = new Set(setLines.map((line) => line.split("·")[0].trim()).filter(Boolean));
  return `${exerciseNames.size || 1} exercises · ${setLines.length || 1} sets · ${minutes || 0} min · ${calories || 0} kcal`;
}

function parseRecordingMetricInput(value) {
  const rawValue = String(value || "").trim();
  if (!rawValue) return 0;
  const numeric = Number(rawValue);
  return Number.isFinite(numeric) ? Math.max(0, numeric) : null;
}

function recordingLineValidationMessage(index, reason, label = "") {
  if (!isChineseLanguage()) {
    if (reason === "shape") return `Line ${index + 1}: use Exercise · set details`;
    if (reason === "missingWork") return `Line ${index + 1}: add load, reps, time, distance, RPE, or bodyweight`;
    if (reason === "invalidNumber") return `Line ${index + 1}: use a valid ${label} number`;
    return `Line ${index + 1}: use an RPE from 0 to 10`;
  }
  const fieldLabel = { load: "重量", duration: "时长", distance: "距离", RPE: "RPE" }[label] || label;
  if (reason === "shape") return `第 ${index + 1} 行：请使用“动作 · 组数详情”`;
  if (reason === "missingWork") return `第 ${index + 1} 行：请添加重量、次数、时间、距离、RPE 或自重`;
  if (reason === "invalidNumber") return `第 ${index + 1} 行：请输入有效的${fieldLabel}数字`;
  return `第 ${index + 1} 行：RPE 需要在 0 到 10 之间`;
}

function validateRecordingSetLines(setLines) {
  const tokenChecks = [
    { pattern: /(?:^|\s)([^\s·]+)\s*(?:lb|kg)\b/i, label: "load" },
    { pattern: /(?:^|\s)([^\s·]+)\s*(?:sec|min)\b/i, label: "duration" },
    { pattern: /(?:^|\s)([^\s·]+)\s*(?:m|yd|km|mi)\b/i, label: "distance" },
    { pattern: /\bRPE\s*([^\s·]+)/i, label: "RPE" },
  ];
  const recognizedWorkPattern = /(\d+(?:\.\d+)?\s*(?:lb|kg|sec|min|m|yd|km|mi|reps?)\b)|(\d+\s*x\s*\d+)|(\d+\s*\/side\b)|(\bRPE\s*\d+(?:\.\d+)?\b)|\b(bodyweight|completed|logged)\b/i;

  for (const [index, line] of setLines.entries()) {
    const parts = String(line).split("·").map((part) => part.trim());
    if (!parts[0] || !parts.slice(1).join(" ").trim()) {
      return { valid: false, message: recordingLineValidationMessage(index, "shape") };
    }
    const detailText = parts.slice(1).join(" ");
    if (!recognizedWorkPattern.test(detailText)) {
      return { valid: false, message: recordingLineValidationMessage(index, "missingWork") };
    }
    for (const check of tokenChecks) {
      const match = String(line).match(check.pattern);
      if (match && !/^\d+(?:\.\d+)?$/.test(match[1])) {
        return { valid: false, message: recordingLineValidationMessage(index, "invalidNumber", check.label) };
      }
    }
    const rpeMatch = String(line).match(/\bRPE\s*([\d.]+)/i);
    if (rpeMatch) {
      const rpe = Number(rpeMatch[1]);
      if (!Number.isFinite(rpe) || rpe < 0 || rpe > 10) {
        return { valid: false, message: recordingLineValidationMessage(index, "invalidRpe") };
      }
    }
  }

  return { valid: true, message: "" };
}

function appendRecordingSetLine(button) {
  const form = button.closest("[data-recording-edit-form]");
  const textarea = form?.querySelector('[data-edit-recording-field="sets"]');
  if (!textarea) return;

  const currentValue = textarea.value.trim();
  const firstExercise = currentValue.split("\n")[0]?.split("·")[0]?.trim() || "New Exercise";
  const exampleLine = `${firstExercise} · bodyweight · completed`;
  textarea.value = currentValue ? `${currentValue}\n${exampleLine}` : exampleLine;
  updateRecordingSetPreview(form);
  textarea.focus();
}

function parseOptionalPositiveNumber(value, fallback) {
  const rawValue = String(value || "").trim();
  if (!rawValue) return fallback;
  const numeric = Number(rawValue);
  return Number.isFinite(numeric) && numeric >= 0 ? numeric : null;
}

function parseOptionalPercent(value, fallback) {
  const rawValue = String(value || "").trim();
  if (!rawValue) return fallback;
  const normalized = rawValue.replace("%", "").trim();
  const numeric = Number(normalized);
  if (!Number.isFinite(numeric) || numeric < 0 || numeric > 100) return null;
  return `${numeric}%`;
}

function refreshRecordingDependentViews() {
  ensureRecordedExerciseTrends();
  renderProfileSummary();
  renderWorkoutTrends();
  renderTrendChips();
  renderAiCoachEngine();
  saveAppState();
}

function saveEditedRecording(index) {
  const recording = profileRecordings[index];
  const form = profileDetailBody.querySelector(`[data-recording-edit-form="${index}"]`);
  if (!recording || !form) return;

  const workoutName = form.querySelector('[data-edit-recording-field="name"]')?.value.trim() || "";
  if (!workoutName) {
    showToast(tx("Name this recording before saving"));
    return;
  }
  const dateValue = form.querySelector('[data-edit-recording-field="date"]')?.value || "";
  if (!isValidPastOrTodayDateValue(dateValue)) {
    showToast(tx("Choose a valid recording date"));
    return;
  }
  const editedDate = new Date(`${dateValue}T12:00:00`);
  const minutesInput = parseRecordingMetricInput(form.querySelector('[data-edit-recording-field="minutes"]')?.value);
  const energyInput = parseRecordingMetricInput(form.querySelector('[data-edit-recording-field="calories"]')?.value);
  if (minutesInput === null || energyInput === null) {
    showToast(tx("Use numbers for minutes and energy"));
    return;
  }
  const minutes = Math.round(minutesInput);
  const calories = kcalFromEnergy(energyInput);
  const focusGroup = normalizedRecordingFocusGroup(form.querySelector('[data-edit-recording-field="focusGroup"]')?.value, workoutName);
  const setLines = recordingSetLinesFromText(form.querySelector('[data-edit-recording-field="sets"]')?.value);

  if (setLines.length === 0) {
    showToast(tx("Keep at least one set detail"));
    return;
  }
  const setLineValidation = validateRecordingSetLines(setLines);
  if (!setLineValidation.valid) {
    showToast(setLineValidation.message);
    return;
  }

  profileRecordings[index] = {
    ...recording,
    date: editedDate.toISOString(),
    focusGroup,
    title: titleForRecordingEdit(dateValue, workoutName),
    meta: metaForRecordingEdit(setLines, minutes, calories),
    sets: setLines,
  };
  editingRecordingIndex = null;
  pendingDeleteRecordingIndex = null;
  refreshRecordingDependentViews();
  openProfileDetail("recordings");
  showToast(tx("Recording updated"));
}

function deleteProfileRecording(index) {
  if (!profileRecordings[index]) return;

  profileRecordings.splice(index, 1);
  pendingDeleteRecordingIndex = null;
  editingRecordingIndex = null;
  refreshRecordingDependentViews();
  openProfileDetail("recordings");
  showToast(tx("Recording deleted"));
}

function formatSyncTime(value) {
  if (!value) return "Not synced yet";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Not synced yet";
  return new Intl.DateTimeFormat([], { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }).format(date);
}

function healthMetricCards() {
  const latestMetrics = latestBodyMetricEntry();
  const latestWorkout = latestIncludedRecording(profileRecordings);
  if (!healthSyncState.connected) {
    return [
      [tx("Heart rate"), "--", tx("Connect Apple Health to show live data")],
      [tx("Active calories"), "--", tx("Connect Apple Health to show live data")],
      [tx("Workout duration"), "--", tx("Connect Apple Health to show live data")],
      [tx("Weight"), "--", tx("No Apple Health weight synced yet")],
    ];
  }
  const currentHeartRate = workoutSession.hidden ? tx("Not synced") : `${watchHeartRate?.textContent || "--"} bpm`;
  return [
    [tx("Heart rate"), currentHeartRate, workoutSession.hidden ? tx("Available during active workout") : tx("Live from current session")],
    [tx("Active calories"), latestWorkout ? `${formatEnergyFromKcal(workoutCalories(latestWorkout), { empty: "0" })} ${energyUnit()}` : `0 ${energyUnit()}`, latestWorkout?.title || tx("No workout yet")],
    [tx("Workout duration"), latestWorkout ? formatMinutes(workoutMinutes(latestWorkout)) : "0h", latestWorkout ? tx("Last saved workout") : tx("No saved sessions")],
    [tx("Weight"), latestMetrics ? formatProfileWeight(latestMetrics.weightLb) : formatProfileWeight(userProfile.weightLb), latestMetrics ? `${localizedMetricSourceLabel(latestMetrics.source || "manual")} · ${latestMetrics.date}` : tx("Profile value")],
  ];
}

function renderHealthDetail() {
  const hero = document.createElement("div");
  hero.className = "health-sync-card";
  hero.innerHTML = `<div><span class="metric-label">${tx("Apple Watch")}</span><strong>${healthSyncState.connected ? tx("Connected") : tx("Not connected")}</strong><p>${escapeHtml(healthSyncState.connected ? `${healthSyncState.device} · ${isChineseLanguage() ? "上次同步" : "last sync"} ${formatSyncTime(healthSyncState.lastSyncAt)}` : tx("Choose sync data"))}</p></div><button class="small-button" type="button" data-refresh-health>${tx("Sync selected")}</button>`;
  profileDetailBody.append(hero);

  const metrics = document.createElement("div");
  metrics.className = "health-metric-grid";
  metrics.innerHTML = healthMetricCards()
    .map(([label, value, copy]) => `<div><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong><small>${escapeHtml(copy)}</small></div>`)
    .join("");
  profileDetailBody.append(metrics);

  const permissionsHeading = document.createElement("div");
  permissionsHeading.className = "profile-form-section";
  permissionsHeading.innerHTML = `<strong>${tx("Permissions")}</strong><span>${tx("Choose what LiftTrend can read from Apple Health and what it can write back after workouts.")}</span>`;
  profileDetailBody.append(permissionsHeading);

  healthPermissions.forEach(([label, copy, enabled], index) => {
    const row = document.createElement("button");
    row.className = "profile-row health-row";
    row.type = "button";
    row.dataset.healthToggle = String(index);
    row.innerHTML = `<span><strong>${escapeHtml(tx(label))}</strong><small>${escapeHtml(tx(copy))}</small></span><span class="toggle ${enabled ? "on" : ""}" aria-hidden="true"></span>`;
    profileDetailBody.append(row);
  });
}

function bodyMetricEntryWithHealthWeight(metricDate, existingEntry = null) {
  return {
    ...(existingEntry || {}),
    date: metricDate,
    weightLb: userProfile.appleHealthWeight || userProfile.weightLb,
    bodyFat: existingEntry?.bodyFat || userProfile.bodyFat,
    waistIn: existingEntry?.waistIn || userProfile.measurements.waistIn,
    hipIn: existingEntry?.hipIn || userProfile.measurements.hipIn,
    thighIn: existingEntry?.thighIn || userProfile.measurements.thighIn,
    armIn: existingEntry?.armIn || userProfile.measurements.armIn,
    source: existingEntry ? "mixed" : "apple_health",
    sources: {
      ...(existingEntry?.sources || {}),
      weightLb: "apple_health",
      bodyFat: existingEntry?.sources?.bodyFat || "manual",
      waistIn: existingEntry?.sources?.waistIn || "manual",
      hipIn: existingEntry?.sources?.hipIn || "manual",
      thighIn: existingEntry?.sources?.thighIn || "manual",
      armIn: existingEntry?.sources?.armIn || "manual",
    },
  };
}

function sameBodyMetricValue(currentValue, nextValue) {
  return String(currentValue ?? "").trim() === String(nextValue ?? "").trim();
}

function manualBodyMetricFieldSource(existingEntry, field, nextValue) {
  const previousSource = existingEntry?.sources?.[field];
  if (!previousSource || previousSource === "manual") return "manual";
  return sameBodyMetricValue(existingEntry?.[field], nextValue) ? previousSource : "manual";
}

function bodyMetricSourceFromFieldSources(sources) {
  return Object.values(sources || {}).some((source) => source && source !== "manual") ? "mixed" : "manual";
}

function upsertManualBodyMetricEntry(metricDate, { includeMeasurements = true } = {}) {
  const bodyMetricEntries = ensureBodyMetricEntries();
  const existingEntryIndex = bodyMetricEntries.findIndex((entry) => entry.date === metricDate);
  const existingEntry = existingEntryIndex >= 0 ? bodyMetricEntries[existingEntryIndex] : null;
  const metricFields = {
    weightLb: userProfile.weightLb,
    bodyFat: userProfile.bodyFat,
    waistIn: includeMeasurements ? userProfile.measurements.waistIn : existingEntry?.waistIn || "",
    hipIn: includeMeasurements ? userProfile.measurements.hipIn : existingEntry?.hipIn || "",
    thighIn: includeMeasurements ? userProfile.measurements.thighIn : existingEntry?.thighIn || "",
    armIn: includeMeasurements ? userProfile.measurements.armIn : existingEntry?.armIn || "",
  };
  const sources = Object.fromEntries(
    Object.entries(metricFields).map(([field, value]) => [field, manualBodyMetricFieldSource(existingEntry, field, value)])
  );
  const metricEntry = {
    date: metricDate,
    ...metricFields,
    source: bodyMetricSourceFromFieldSources(sources),
    sources,
  };
  if (existingEntryIndex >= 0) {
    bodyMetricEntries[existingEntryIndex] = metricEntry;
  } else {
    bodyMetricEntries.push(metricEntry);
  }
  return metricEntry;
}

function syncAppleHealthData() {
  healthSyncState.connected = healthPermissions.some(([, , enabled]) => enabled);
  healthSyncState.lastSyncAt = new Date().toISOString();

  const bodyMetricsEnabled = bodyMetricsPermissionEnabled();
  if (bodyMetricsEnabled && String(userProfile.appleHealthWeight || "").trim()) {
    const metricDate = todayDateString();
    const bodyMetricEntries = ensureBodyMetricEntries();
    const existingEntryIndex = bodyMetricEntries.findIndex((entry) => entry.date === metricDate);
    const existingEntry = existingEntryIndex >= 0 ? bodyMetricEntries[existingEntryIndex] : null;
    const metricEntry = bodyMetricEntryWithHealthWeight(metricDate, existingEntry);
    if (existingEntryIndex >= 0) {
      bodyMetricEntries[existingEntryIndex] = metricEntry;
    } else {
      bodyMetricEntries.push(metricEntry);
    }
  }

  renderProfileSummary();
  renderWorkoutTelemetry();
  renderBodyMetricsTrend();
  saveAppState();
  openProfileDetail("health");
  showToast(tx("Apple Health refreshed"));
}

function renderExerciseDatabaseDetail() {
  const detail = localizedProfileDetail("exercises");
  profileDetailTitle.textContent = detail.title;
  profileDetailCopy.textContent = detail.copy;
  profileDetailBody.replaceChildren();

  const count = document.createElement("div");
  const groups = new Set(Object.values(exerciseCatalog).map((item) => item.group));
  count.className = "exercise-library-summary";
  count.innerHTML = `<strong>${Object.keys(exerciseCatalog).length} ${tx("exercises")}</strong><span>${groups.size} ${tx("body-part labels · tap any exercise for details")}</span>`;
  profileDetailBody.append(count);

  const search = document.createElement("label");
  search.className = "search-field profile-search";
  search.innerHTML = `<span class="search-icon" aria-hidden="true"></span><input type="search" placeholder="${escapeHtml(tx("Search exercises"))}" aria-label="${escapeHtml(tx("Search exercise database"))}" data-profile-exercise-search />`;
  profileDetailBody.append(search);

  const list = document.createElement("div");
  list.className = "profile-exercise-list";
  list.dataset.profileExerciseList = "";
  profileDetailBody.append(list);
  renderProfileExerciseList("");
}

function renderProfileExerciseList(query) {
  const list = profileDetailBody.querySelector("[data-profile-exercise-list]");
  if (!list) return;

  const normalized = normalizeExerciseSearch(query);
  list.replaceChildren();
  const matches = Object.entries(exerciseCatalog)
    .filter(([name]) => name !== "Custom Exercise")
    .map(([name, item]) => ({ name, item, score: addExerciseSearchScore(name, normalized) }))
    .filter((item) => !normalized || item.score > 0)
    .sort((a, b) => b.score - a.score || exerciseCatalogSortScore(b.name) - exerciseCatalogSortScore(a.name) || a.name.localeCompare(b.name));

  if (matches.length === 0) {
    const empty = document.createElement("div");
    empty.className = "exercise-library-empty";
    empty.textContent = tx("No catalog match yet. Add it as a custom exercise from today's workout.");
    list.append(empty);
    return;
  }

  matches
    .forEach(({ name, item }) => {
      const row = document.createElement("button");
      row.className = "exercise-library-row";
      row.type = "button";
      row.dataset.exerciseDetailName = name;
      row.innerHTML = `<div><strong>${escapeHtml(localizedExerciseName(name))}</strong><span>${escapeHtml(translatedTargetText(item.target))}</span></div><span class="pill">${escapeHtml(localizedGroupName(item.group))}</span>`;
      list.append(row);
    });
}

function exerciseLoggedCount(name) {
  const normalizedName = name.toLowerCase();
  const inRecordings = profileRecordings.reduce((count, recording) => {
    return count + recordingSetLines(recording).filter((set) => set.split("·")[0].trim().toLowerCase() === normalizedName).length;
  }, 0);
  const inTrends = Object.values(exerciseTrends).some((trend) => trend.title.toLowerCase() === normalizedName) ? 4 : 0;
  return inRecordings + inTrends;
}

function supportingMusclesForExercise(item) {
  const text = `${item.group} ${item.search}`.toLowerCase();
  const muscleRules = [
    ["Glutes", ["glute", "hip thrust", "kickback", "bridge", "abduction"]],
    ["Quads", ["quad", "squat", "leg press", "lunge", "step up", "leg extension"]],
    ["Hamstrings", ["hamstring", "deadlift", "hinge", "leg curl", "rdl"]],
    ["Calves", ["calf", "soleus", "gastrocnemius"]],
    ["Back", ["back", "row", "pulldown", "pull up", "lat"]],
    ["Lats", ["lat", "pulldown", "pull up"]],
    ["Chest", ["chest", "pec", "press", "fly", "push up"]],
    ["Shoulders", ["shoulder", "delt", "overhead", "raise"]],
    ["Rear delts", ["rear delt", "posterior", "face pull", "reverse fly"]],
    ["Rotator cuff", ["rotator", "external rotation", "face pull"]],
    ["Biceps", ["bicep", "curl"]],
    ["Triceps", ["tricep", "pressdown", "skull", "extension"]],
    ["Abs", ["abs", "crunch", "leg raise", "dead bug"]],
    ["Obliques", ["oblique", "pallof", "side plank", "twist"]],
    ["Core", ["core", "plank", "carry", "stability"]],
    ["Recovery", ["recovery", "mobility", "stretch", "easy"]],
    ["Full body", ["full body", "carry", "swing", "battle rope", "deadlift"]],
  ];
  const muscles = [item.group];
  muscleRules.forEach(([label, keywords]) => {
    if (keywords.some((keyword) => text.includes(keyword))) muscles.push(label);
  });
  return [...new Set(muscles)].slice(0, 5);
}

function exerciseTrackingCopy(item) {
  if (item.type === "duration") {
    return tx("Duration, effort, heart rate, calories, and consistency across recovery or mobility sessions.");
  }
  if (item.type === "distance") {
    return tx("Distance, duration, pace context, heart rate, calories, and weekly cardio consistency.");
  }
  if (item.type === "bodyweight") {
    return tx("Reps, sets, duration when relevant, RPE, and whether form quality stays consistent.");
  }
  return tx("Load, reps, sets, RPE, total volume, and whether this movement should appear in pinned exercise trends or saved standard workouts.");
}

function openExerciseLibraryDetail(name) {
  const item = exerciseCatalog[name];
  if (!item) return;

  const loggedCount = exerciseLoggedCount(name);
  const muscles = supportingMusclesForExercise(item);
  profileDetailTitle.textContent = localizedExerciseName(name);
  profileDetailCopy.textContent = `${localizedGroupName(item.group)} · ${translatedTargetText(item.target)}`;
  profileDetailBody.replaceChildren();

  const detail = document.createElement("div");
  detail.className = "exercise-detail-panel";
  const historyLabel = loggedCount
    ? `${loggedCount} ${tx(loggedCount === 1 ? "logged signal" : "logged signals")}`
    : tx("No logged sets yet");
  detail.innerHTML = `<button class="ghost-button" type="button" data-back-exercise-library>${tx("Back to database")}</button><div class="exercise-detail-stat"><span>${tx("Primary label")}</span><strong>${escapeHtml(localizedGroupName(item.group))}</strong></div><div class="exercise-detail-stat"><span>${tx("Default prescription")}</span><strong>${escapeHtml(translatedTargetText(item.target.replace("target ", "")))}</strong></div><div class="exercise-detail-stat"><span>${tx("User history")}</span><strong>${escapeHtml(historyLabel)}</strong></div><div class="exercise-detail-block"><strong>${tx("Useful for tracking")}</strong><p>${escapeHtml(exerciseTrackingCopy(item))}</p></div><div class="exercise-muscle-tags">${muscles.map((muscle) => `<span>${escapeHtml(localizedGroupName(muscle))}</span>`).join("")}</div>`;
  profileDetailBody.append(detail);
}

function renderChoiceDetail(settingKey, options) {
  const group = document.createElement("div");
  group.className = "profile-choice-grid";
  options.forEach((option) => {
    const button = document.createElement("button");
    button.className = "choice-button";
    button.type = "button";
    button.dataset.profileChoice = settingKey;
    button.dataset.choiceValue = option;
    button.classList.toggle("selected", profileSettingsState[settingKey] === option);
    button.textContent = option;
    group.append(button);
  });
  profileDetailBody.append(group);
}

function renderUnitsDetail() {
  const sections = [
    ["Workout weight", "weightUnit", ["lb", "kg"], "Used for set logging and strength trends."],
    ["Body size", "bodyUnit", ["cm", "ft/in"], "Used for height plus waist, hip, thigh, arm, and future circumference tracking."],
    ["Energy", "energyUnit", ["kcal", "kJ"], "Used for Apple Watch calories and workout summaries."],
  ];

  sections.forEach(([label, unitType, options, copy]) => {
    const section = document.createElement("section");
    section.className = "unit-section";
    section.innerHTML = `<div><strong>${label}</strong><span>${copy}</span></div>`;

    const grid = document.createElement("div");
    grid.className = "unit-choice-grid";
    options.forEach((option) => {
      const button = document.createElement("button");
      button.className = "choice-button";
      button.type = "button";
      button.dataset.unitChoice = "";
      button.dataset.unitType = unitType;
      button.dataset.unitValue = option;
      button.classList.toggle("selected", profileSettingsState[unitType] === option);
      button.textContent = option;
      grid.append(button);
    });

    section.append(grid);
    profileDetailBody.append(section);
  });
}

function renderGoalsDetail() {
  const form = document.createElement("div");
  form.className = "profile-form";
  const goalPresets = [
    ["Fat loss: walking and strength consistency", "Fat loss"],
    ["General health and consistency", "General health"],
    ["Lean muscle: glutes, shoulders, back", "Lean muscle"],
    ["Strength with shoulder progression", "Strength"],
  ].map(([value, label]) => `<button class="choice-button" type="button" data-goal-preset="${escapeHtml(value)}">${tx(label)}</button>`).join("");
  const coachingOptions = ["Balanced", "Aggressive", "Recovery-first"].map((option) => optionHtml(option, profileSettingsState.coachingStyle)).join("");
  form.innerHTML = `<div class="profile-form-section"><strong>${tx("Goal presets")}</strong><span>${tx("Pick one, then analyze AI Coach again to see matching suggestions.")}</span></div><div class="profile-choice-grid">${goalPresets}</div><label><span>${tx("Primary goal")}</span><input value="${escapeHtml(profileSettingsState.goal)}" data-goal-input /></label><label><span>${tx("Coaching style")}</span><select data-coaching-style>${coachingOptions}</select></label><button class="small-button" type="button" data-save-goals>${tx("Save Goals")}</button>`;
  profileDetailBody.append(form);
}

function completeOnboarding(message) {
  localStorage.setItem(onboardingStorageKey, "true");
  onboarding.hidden = true;
  renderProfileSummary();
  saveAppState();
  showToast(message);
}

function saveUserProfileFromOnboarding() {
  const ageValue = parseOptionalPositiveNumber(document.querySelector("[data-onboard-age]")?.value, userProfile.age);
  const heightFt = parseOptionalPositiveNumber(document.querySelector("[data-onboard-height-ft]")?.value, "");
  const heightIn = parseOptionalPositiveNumber(document.querySelector("[data-onboard-height-in]")?.value, "");
  const heightCm = heightFt === null || heightIn === null
    ? null
    : heightFt === "" && heightIn === ""
      ? userProfile.heightCm
      : convertHeightValue((Number(heightFt) || 0) + (Number(heightIn) || 0) / 12, "ft", "cm");
  const weightLb = parseOptionalPositiveNumber(document.querySelector("[data-onboard-weight]")?.value, userProfile.weightLb);
  const targetWeightLb = parseOptionalPositiveNumber(document.querySelector("[data-onboard-target-weight]")?.value, userProfile.targetWeightLb);
  const bodyFat = parseOptionalPercent(document.querySelector("[data-onboard-current-body-fat]")?.value, userProfile.bodyFat);
  const targetBodyFat = parseOptionalPercent(document.querySelector("[data-onboard-body-fat]")?.value, userProfile.targetBodyFat);
  if ([ageValue, heightCm, weightLb, targetWeightLb, bodyFat, targetBodyFat].includes(null)) {
    showToast(tx("Use valid numbers for profile metrics"));
    return;
  }
  userProfile.name = document.querySelector("[data-onboard-name]")?.value.trim() || userProfile.name;
  userProfile.age = String(ageValue);
  userProfile.heightCm = String(heightCm);
  userProfile.weightLb = weightUnit() === "kg" ? convertWeightValue(weightLb, "kg", "lb") : String(weightLb);
  userProfile.bodyFat = bodyFat;
  userProfile.sex = document.querySelector("[data-onboard-sex]")?.value || userProfile.sex;
  userProfile.frequency = document.querySelector("[data-onboard-frequency]")?.value || userProfile.frequency;
  userProfile.generalGoal = document.querySelector("[data-onboard-goal]")?.value || userProfile.generalGoal;
  userProfile.focusAreas = document.querySelector("[data-onboard-focus]")?.value || userProfile.focusAreas;
  userProfile.targetWeightLb = weightUnit() === "kg" ? convertWeightValue(targetWeightLb, "kg", "lb") : String(targetWeightLb);
  userProfile.targetBodyFat = targetBodyFat;
  profileSettingsState.goal = profileGoalFromFields(userProfile.generalGoal, userProfile.focusAreas);
  upsertManualBodyMetricEntry(todayDateString(), { includeMeasurements: false });
  renderBodyMetricsTrend();
  completeOnboarding(isChineseLanguage() ? "档案已保存" : "Profile saved");
}

function applyOnboardingState() {
  onboarding.hidden = localStorage.getItem(onboardingStorageKey) === "true";
}

function savePersonalProfile() {
  const metricDate = profileDetailBody.querySelector('[data-profile-field="metricDate"]')?.value || "";
  if (!isValidPastOrTodayDateValue(metricDate)) {
    showToast(tx("Choose a valid metric date"));
    return;
  }
  const ageValue = parseOptionalPositiveNumber(profileDetailBody.querySelector('[data-profile-field="age"]')?.value, userProfile.age);
  const weightValue = parseOptionalPositiveNumber(profileDetailBody.querySelector('[data-profile-field="weight"]')?.value, weightUnit() === "kg" ? convertWeightValue(userProfile.weightLb, "lb", "kg") : userProfile.weightLb);
  const targetWeight = parseOptionalPositiveNumber(profileDetailBody.querySelector('[data-profile-field="targetWeight"]')?.value, weightUnit() === "kg" ? convertWeightValue(userProfile.targetWeightLb, "lb", "kg") : userProfile.targetWeightLb);
  const bodyFat = parseOptionalPercent(profileDetailBody.querySelector('[data-profile-field="bodyFat"]')?.value, userProfile.bodyFat);
  const targetBodyFat = parseOptionalPercent(profileDetailBody.querySelector('[data-profile-field="targetBodyFat"]')?.value, userProfile.targetBodyFat);
  const measurementValues = {};
  let hasInvalidMeasurement = false;
  profileDetailBody.querySelectorAll("[data-measurement-field]").forEach((input) => {
    const fallback = measurementUnit() === "cm"
      ? convertMeasurementValue(userProfile.measurements[input.dataset.measurementField], "in", "cm")
      : userProfile.measurements[input.dataset.measurementField];
    const parsed = parseOptionalPositiveNumber(input.value, fallback);
    if (parsed === null) {
      hasInvalidMeasurement = true;
    } else {
      measurementValues[input.dataset.measurementField] = parsed;
    }
  });
  let heightCm;
  if (bodyUnit() === "cm") {
    const parsedHeight = parseOptionalPositiveNumber(profileDetailBody.querySelector('[data-profile-field="heightCm"]')?.value, userProfile.heightCm);
    heightCm = parsedHeight === null ? null : parsedHeight;
  } else {
    const fallbackFeetDecimal = Number(convertHeightValue(userProfile.heightCm, "cm", "ft"));
    const fallbackFeet = Number.isFinite(fallbackFeetDecimal) ? Math.floor(fallbackFeetDecimal) : 0;
    const fallbackInches = Number.isFinite(fallbackFeetDecimal) ? Math.round((fallbackFeetDecimal - fallbackFeet) * 12) : 0;
    const feet = parseOptionalPositiveNumber(profileDetailBody.querySelector('[data-profile-field="heightFt"]')?.value, fallbackFeet);
    const inches = parseOptionalPositiveNumber(profileDetailBody.querySelector('[data-profile-field="heightIn"]')?.value, fallbackInches);
    heightCm = feet === null || inches === null ? null : convertHeightValue(feet + inches / 12, "ft", "cm");
  }
  if ([ageValue, weightValue, targetWeight, bodyFat, targetBodyFat, heightCm].includes(null) || hasInvalidMeasurement) {
    showToast(tx("Use valid numbers for body metrics"));
    return;
  }
  userProfile.name = profileDetailBody.querySelector('[data-profile-field="name"]')?.value.trim() || userProfile.name;
  userProfile.age = String(ageValue);
  userProfile.heightCm = String(heightCm);
  userProfile.weightLb = weightUnit() === "kg" ? convertWeightValue(weightValue, "kg", "lb") : weightValue;
  userProfile.bodyFat = bodyFat;
  userProfile.sex = profileDetailBody.querySelector('[data-profile-field="sex"]')?.value || userProfile.sex;
  userProfile.frequency = profileDetailBody.querySelector('[data-profile-field="frequency"]')?.value || userProfile.frequency;
  userProfile.generalGoal = profileDetailBody.querySelector('[data-profile-field="generalGoal"]')?.value || userProfile.generalGoal;
  userProfile.focusAreas = profileDetailBody.querySelector('[data-profile-field="focusAreas"]')?.value || userProfile.focusAreas;
  userProfile.targetWeightLb = weightUnit() === "kg" ? convertWeightValue(targetWeight, "kg", "lb") : targetWeight;
  userProfile.targetBodyFat = targetBodyFat;
  Object.entries(measurementValues).forEach(([field, value]) => {
    userProfile.measurements[field] =
      measurementUnit() === "cm" ? convertMeasurementValue(value, "cm", "in") : String(value);
  });
  upsertManualBodyMetricEntry(metricDate);
  profileSettingsState.goal = profileGoalFromFields(userProfile.generalGoal, userProfile.focusAreas);
  renderProfileSummary();
  renderBodyMetricsTrend();
  saveAppState();
  openProfileDetail("personal");
  showToast(tx("Personal info updated"));
}

function closeProfileDetail() {
  const returnScreen = profileReturnScreen;
  resetProfileDetailToHome();
  document.querySelector("#profile-screen").scrollTo({ top: 0 });
  if (returnScreen) {
    navigateToScreen(returnScreen);
  }
}

function getDetectedCoachSignals(context = currentAiCoachContext()) {
  if (!context.recentWorkouts.length) return [];

  const signals = [];
  const progressionReadiness = Domain.progressionReadinessForExercise(profileRecordings, ["Lateral Raise", "Cable Lateral Raise"]);
  const progressionRelevantGoal = Domain.goalSupportsProgression(context.goal);
  const progressionSignal = progressionReadiness.ready
    ? {
        exercise: "Lateral Raise",
        load: `${progressionReadiness.loadLb} lb`,
        pattern: `${progressionReadiness.totalReps} total reps`,
        completedWeeks: progressionReadiness.completedWeeks,
        averageRpe: Math.round(progressionReadiness.averageRpe * 10) / 10,
        maxRpe: progressionReadiness.maxRpe,
        signal: "progression-ready",
      }
    : progressionRelevantGoal
      ? aiCoachTrainingSnapshot.exerciseHistory.find((item) => item.signal === "progression-ready")
      : null;
  const glutePriorityGoal = Domain.goalSupportsGlutePriority(context.goal);
  const goalDrift = glutePriorityGoal ? Domain.goalDriftForGlutePriority(profileRecordings) : { drifting: false };
  const gluteSignal = glutePriorityGoal
    ? goalDrift.drifting
      ? { exercise: "Glute-focused sessions", monthlyVolumeChange: goalDrift.gluteChange, signal: "glute-volume-down" }
      : aiCoachTrainingSnapshot.exerciseHistory.find((item) => item.signal === "glute-volume-down")
    : null;
  const quadSignal = glutePriorityGoal
    ? goalDrift.drifting
      ? { exercise: "Quad-dominant sets", monthlyVolumeChange: goalDrift.quadChange, signal: "quad-volume-up" }
      : aiCoachTrainingSnapshot.exerciseHistory.find((item) => item.signal === "quad-volume-up")
    : null;
  const heartRateEnabled = context.wearableSignals.enabledScopes.includes("Heart rate");
  const activeCaloriesEnabled = context.wearableSignals.enabledScopes.includes("Active calories");

  if (progressionSignal?.completedWeeks >= 3 && progressionSignal?.maxRpe <= 8) {
    signals.push({
      id: "lateralRaise",
      label: "Progression ready",
      evidence: `${progressionSignal.exercise} ${progressionSignal.load} completed for ${progressionSignal.pattern} across ${progressionSignal.completedWeeks} weeks with average RPE ${progressionSignal.averageRpe} and max RPE ${progressionSignal.maxRpe}.`,
    });
  } else if (progressionSignal) {
    signals.push({
      id: "performanceDecline",
      label: "Progression held",
      evidence: `${progressionSignal.exercise} met the rep target, but max RPE ${progressionSignal.maxRpe || "unknown"} is too high for an automatic load increase.`,
    });
  }

  if (gluteSignal && quadSignal) {
    signals.push({
      id: "goalDrift",
      label: "Goal drift",
      evidence: `Glute volume is ${gluteSignal.monthlyVolumeChange} while quad-dominant work is ${quadSignal.monthlyVolumeChange}.`,
    });
  }

  if (context.goalProfile?.fatLoss && context.currentPeriodSummary.workouts > 0) {
    signals.push({
      id: "fatLossAdherence",
      label: "Fat-loss consistency",
      evidence: `This week has ${context.currentPeriodSummary.workouts} logged workout${context.currentPeriodSummary.workouts === 1 ? "" : "s"}, ${context.currentPeriodSummary.minutes} minutes, and ${context.currentPeriodSummary.calories} kcal recorded.`,
    });
  } else if ((context.goalProfile?.generalHealth || context.goalProfile?.recoveryPriority) && context.currentPeriodSummary.workouts > 0) {
    signals.push({
      id: "healthConsistency",
      label: "Health consistency",
      evidence: `This week has ${context.currentPeriodSummary.workouts} logged workout${context.currentPeriodSummary.workouts === 1 ? "" : "s"} and ${context.currentPeriodSummary.minutes} training minutes recorded.`,
    });
  }

  if (heartRateEnabled && activeCaloriesEnabled) {
    signals.push({
      id: "recovery",
      label: "Recovery check",
      evidence: `Apple Watch heart-rate trend is ${aiCoachTrainingSnapshot.watchSignals.recentHeartRateTrend} while session RPE is ${aiCoachTrainingSnapshot.watchSignals.sessionRpeTrend}.`,
    });
  } else {
    const missingWearableScopes = [
      heartRateEnabled ? "" : "Heart rate",
      activeCaloriesEnabled ? "" : "Active calories",
    ].filter(Boolean);
    signals.push({
      id: "incompleteWearable",
      label: "Wearable gap",
      evidence: `${missingWearableScopes.join(" and ")} ${missingWearableScopes.length === 1 ? "is" : "are"} not enabled, so recovery confidence is limited.`,
    });
  }

  return signals;
}

function currentAiCoachContext() {
  return Domain.buildAiCoachContext({
    profileSettingsState,
    userProfile,
    profileRecordings,
    healthPermissions,
  });
}

function coachGoalRouteLabel(goalProfile = {}) {
  if (isChineseLanguage()) {
    if (goalProfile.fatLoss) return "减脂稳定性";
    if (goalProfile.generalHealth || goalProfile.recoveryPriority) return "总体健康 / 恢复";
    if (goalProfile.strength || goalProfile.muscleGain || goalProfile.shoulderPriority) return "力量或增肌进阶";
    if (goalProfile.glutePriority) return "臀腿优先";
    return "综合训练";
  }
  if (goalProfile.fatLoss) return "Fat loss consistency";
  if (goalProfile.generalHealth || goalProfile.recoveryPriority) return "General health / recovery";
  if (goalProfile.strength || goalProfile.muscleGain || goalProfile.shoulderPriority) return "Strength or muscle progression";
  if (goalProfile.glutePriority) return "Glute / lower-body priority";
  return "General coaching";
}

function renderAiCoachDataScope(context, fresh) {
  if (!coachDataScope) return;
  coachDataScope.hidden = !fresh;
  if (!fresh) {
    coachDataScope.replaceChildren();
    return;
  }

  const included = [
    isChineseLanguage() ? `你的目标：${localizedGoalText(context.goal)}` : `Your goal: ${context.goal}`,
    isChineseLanguage() ? `教练重点：${coachGoalRouteLabel(context.goalProfile)}` : `Coaching focus: ${coachGoalRouteLabel(context.goalProfile)}`,
    isChineseLanguage() ? `最近训练：${context.recentWorkouts.length}` : `Recent workouts: ${context.recentWorkouts.length}`,
    isChineseLanguage() ? `Apple Watch 数据：${localizedHealthScopeList(context.wearableSignals.enabledScopes)}` : `Apple Watch data: ${localizedHealthScopeList(context.wearableSignals.enabledScopes)}`,
    isChineseLanguage()
      ? `身体指标：${localizedBodyMetricSourceSummary(context.bodyMetrics.sourceSummary)}${context.bodyMetrics.latestDate ? ` (${context.bodyMetrics.latestDate})` : ""}`
      : `Body metrics: ${context.bodyMetrics.sourceSummary || "none"}${context.bodyMetrics.latestDate ? ` (${context.bodyMetrics.latestDate})` : ""}`,
  ];
  const excluded = localizedExcludedCoachFields(context.excludedFields.slice(0, 4));
  coachDataScope.innerHTML = `<summary>${tx("What I checked")}</summary><div><strong>${tx("Your latest coaching context")}</strong><p>${included.map(escapeHtml).join(" · ")}</p></div><small>${tx("Kept out of this check")}: ${escapeHtml(excluded)} ${tx("and detailed Health samples.")}</small>`;
}

function renderCoachRecommendationDetails(card, recommendation) {
  if (!card || !recommendation) return;
  const visibleRecommendation = localizedCoachRecommendation(recommendation);

  const actionRow = card.querySelector(".action-row");
  card.querySelector(".coach-evidence")?.remove();
  card.querySelector(".pill").textContent = visibleRecommendation.label;
  card.querySelector("h2").textContent = visibleRecommendation.title;
  card.querySelector("p").textContent = visibleRecommendation.recommendation;

  const evidence = document.createElement("details");
  evidence.className = "coach-evidence";
  evidence.innerHTML = `
    <summary>${tx("Why this suggestion?")}</summary>
    <div><strong>${tx("Observation")}</strong><span>${escapeHtml(visibleRecommendation.observation)}</span></div>
    <div><strong>${tx("Interpretation")}</strong><span>${escapeHtml(visibleRecommendation.interpretation)}</span></div>
    <div><strong>${tx("Rationale")}</strong><span>${escapeHtml(visibleRecommendation.rationale)}</span></div>
    <div><strong>${tx("Uncertainty")}</strong><span>${escapeHtml(visibleRecommendation.uncertainty)}</span></div>
    <small>${tx("How sure I am")}: ${escapeHtml(visibleRecommendation.confidence)} · ${tx("Based on")}: ${escapeHtml(visibleRecommendation.dataWindow)}</small>
  `;
  if (actionRow) {
    card.insertBefore(evidence, actionRow);
  } else {
    card.append(evidence);
  }
}

function coachPillClass(recommendation) {
  if (recommendation.id === "lateralRaise") return "pill amber";
  if (recommendation.id === "goalDrift" || recommendation.id === "fatLossAdherence") return "pill coral";
  return "pill green";
}

function createCoachCard(recommendation) {
  const visibleRecommendation = localizedCoachRecommendation(recommendation);
  const card = document.createElement("article");
  card.className = recommendation.priority >= 80 ? "coach-card high" : "coach-card";
  card.dataset.coachCard = recommendation.cardKey;
  const acceptAction = coachSuggestions[recommendation.id]
    ? `<button class="small-button" type="button" data-accept-coach="${escapeHtml(recommendation.id)}">${tx("Accept")}</button>`
    : "";
  const navigationAction = coachNavigationActions[recommendation.id]
    ? `<button class="small-button" type="button" data-coach-action="${escapeHtml(recommendation.id)}">${escapeHtml(tx(coachNavigationActions[recommendation.id].label))}</button>`
    : "";
  card.innerHTML = `<span class="${coachPillClass(recommendation)}">${escapeHtml(visibleRecommendation.label)}</span><h2>${escapeHtml(visibleRecommendation.title)}</h2><p>${escapeHtml(visibleRecommendation.recommendation)}</p><div class="action-row">${acceptAction || navigationAction}<button class="ghost-button" type="button" data-later-coach>${tx("Later")}</button></div>`;
  renderCoachRecommendationDetails(card, recommendation);
  return card;
}

function renderCoachCards(recommendations, fresh) {
  if (!coachCardList) return;
  coachCardList.replaceChildren();
  if (!fresh) return;

  recommendations.forEach((recommendation) => {
    if (deferredCoachCards.has(recommendation.cardKey)) return;
    coachCardList.append(createCoachCard(recommendation));
  });
}

function renderAiCoachEngine({ fresh = false } = {}) {
  const coachContext = currentAiCoachContext();
  const signals = getDetectedCoachSignals(coachContext);
  const recommendations = Domain.buildAiCoachRecommendations({ signals, context: coachContext });
  if (fresh) {
    deferredCoachCards = new Set();
  }
  coachSignals.replaceChildren();

  signals.forEach((signal) => {
    const item = document.createElement("div");
    item.className = "coach-signal";
    const visibleSignal = localizedCoachRecommendation({ id: signal.id, label: signal.label, observation: signal.evidence });
    item.innerHTML = `<strong>${escapeHtml(visibleSignal.label)}</strong><span>${escapeHtml(visibleSignal.observation)}</span>`;
    coachSignals.append(item);
  });

  if (fresh && recommendations.length === 0) {
    coachEngineTitle.textContent = tx("No coaching suggestions yet");
    coachEngineCopy.textContent = tx("Log at least one workout and choose the Apple Watch data you want included. I will only suggest actions when there is enough support.");
  } else {
    coachEngineTitle.textContent = fresh
      ? isChineseLanguage() ? `${recommendations.length} 条新建议已准备好` : `${recommendations.length} new suggestions ready`
      : tx("Ready to check your plan");
    coachEngineCopy.textContent = fresh
      ? tx("I checked your latest workouts and Apple Watch signals. Each suggestion shows what it is based on and what is still uncertain.")
      : tx("Analyze your latest workouts and Apple Watch signals to refresh recommendations.");
  }
  coachSignals.hidden = !fresh || signals.length === 0;
  renderAiCoachDataScope(coachContext, fresh);
  renderCoachCards(recommendations, fresh);
  updateDeferredCoachButton();
}

function acceptCoachSuggestion(suggestionKey, button) {
  const suggestion = coachSuggestions[suggestionKey];
  const card = button?.closest(".coach-card") || document.querySelector(`[data-coach-card="${suggestionKey}"]`);
  if (!suggestion || !card) return;

  card.classList.add("accepted");
  card.querySelector(".pill").textContent = tx("Accepted");
  card.querySelector(".pill").className = "pill green";
  card.querySelector("h2").textContent = isChineseLanguage() ? tx("Suggested workout ready") : suggestion.acceptedTitle || "Suggested workout ready";
  card.querySelector("p").textContent = isChineseLanguage() ? tx("LiftTrend turned this recommendation into an editable workout.") : suggestion.acceptedCopy || "LiftTrend turned this recommendation into an editable workout.";
  card.querySelector(".action-row").innerHTML = `<button class="small-button" type="button" data-start-coach-workout="${suggestionKey}">${tx("Start Suggested Workout")}</button><button class="ghost-button" type="button" data-save-coach-standard="${suggestionKey}">${tx("Save as Standard")}</button>`;
  showToast(tx("Suggestion accepted"));
}

function updateDeferredCoachButton() {
  showLaterCoach.hidden = deferredCoachCards.size === 0;
  showLaterCoach.textContent = isChineseLanguage()
    ? `显示 ${deferredCoachCards.size} 条稍后建议`
    : deferredCoachCards.size === 1
      ? "Show 1 later suggestion"
      : `Show ${deferredCoachCards.size} later suggestions`;
}

function deferCoachSuggestion(button) {
  const card = button.closest(".coach-card");
  if (!card) return;

  deferredCoachCards.add(card.dataset.coachCard);
  card.classList.add("deferred");
  card.hidden = true;
  updateDeferredCoachButton();
  showToast(tx("Suggestion moved to later"));
}

function showDeferredCoachSuggestions() {
  document.querySelectorAll("[data-coach-card]").forEach((card) => {
    if (deferredCoachCards.has(card.dataset.coachCard)) {
      card.hidden = false;
      card.classList.remove("deferred");
    }
  });
  deferredCoachCards = new Set();
  updateDeferredCoachButton();
  showToast(tx("Later suggestions restored"));
}

function runCoachNavigationAction(actionKey) {
  const action = coachNavigationActions[actionKey];
  if (!action) return;

  navigateToScreen("profile-screen");
  openProfileDetail(action.detail, { returnScreen: "coach-screen" });
  showToast(isChineseLanguage() ? tx("AI Coach action opened") : `${action.label} opened`);
}

function safeCoachSuggestionExercises(suggestion) {
  const exercises = Array.isArray(suggestion?.exercises) ? suggestion.exercises : [];
  const sourceExercises = exercises.length ? exercises : [createDefaultStandardExercise("Custom Exercise")];
  return sourceExercises.map((exercise) => {
    const name = normalizeExerciseName(exercise.name) ? exercise.name : "Custom Exercise";
    return {
      ...normalizedStandardExercise({ ...exercise, name }),
      sets: Array.isArray(exercise.sets) && exercise.sets.length
        ? exercise.sets.map((set) => ({ ...set }))
        : [getDefaultSetForExercise(name)],
    };
  });
}

function startCoachWorkout(suggestionKey) {
  const suggestion = coachSuggestions[suggestionKey];
  if (!suggestion) return;
  const suggestionName = normalizedStandardName(suggestion.name) || "Suggested Workout";

  const started = startStandardWorkout({
    id: `coach-${suggestionKey}`,
    name: suggestionName,
    workoutKey: suggestion.workoutKey,
    exercises: safeCoachSuggestionExercises(suggestion),
  });
  if (started) showToast(tx("Started AI suggestion"));
}

function saveCoachStandard(suggestionKey) {
  const suggestion = coachSuggestions[suggestionKey];
  if (!suggestion) return;
  const suggestionName = normalizedStandardName(suggestion.name) || "Suggested Workout";

  const exercises = safeCoachSuggestionExercises(suggestion).map((exercise) => ({
    ...exercise,
    sets: exercise.sets.map((set) => ({ ...set, complete: false })),
  }));
  const existingStandard = savedStandards.find((standard) => standardNameKey(standard.name) === standardNameKey(suggestionName));
  if (existingStandard) {
    existingStandard.name = suggestionName;
    existingStandard.workoutKey = suggestion.workoutKey || existingStandard.workoutKey || "custom";
    existingStandard.exercises = exercises;
    touchStandard(existingStandard);
  } else {
    const standard = {
      id: `${Date.now()}`,
      name: suggestionName,
      workoutKey: suggestion.workoutKey || "custom",
      exercises,
    };
    touchStandard(standard);
    savedStandards = [...savedStandards, standard];
  }
  saveAppState();
  showToast(isChineseLanguage() ? `${existingStandard ? "已更新" : "已保存"}模板：${localizedWorkoutName(suggestionName)}` : `${existingStandard ? "Updated" : "Saved"} standard: ${suggestionName}`);
}

document.querySelector("[data-open-workouts]").addEventListener("click", openWorkoutSheet);

document.querySelectorAll("[data-close-workouts]").forEach((item) => {
  item.addEventListener("click", closeWorkoutSheet);
});

document.addEventListener("click", (event) => {
  if (event.target.closest("[data-resume-active-workout]")) {
    const session = readActiveWorkoutSession();
    restoreActiveWorkoutSession(session);
    return;
  }
  if (event.target.closest("[data-discard-active-workout]")) {
    clearActiveWorkoutSession();
    showToast(tx("Saved workout draft discarded"));
    return;
  }
  if (event.target.closest("[data-open-add-exercise]")) {
    openAddExerciseSheet();
  }
  if (event.target.closest("[data-open-standards]")) {
    openStandardsSheet();
  }
  if (event.target.closest("[data-keep-current-workout]")) {
    closeWorkoutSheet();
    closeStandardsSheet();
    showToast(tx("Current workout kept"));
  }
  if (event.target.closest("[data-confirm-workout-switch]")) {
    const switchAction = pendingWorkoutSwitch;
    pendingWorkoutSwitch = null;
    if (switchAction) {
      switchAction();
      showToast(tx("Workout switched"));
    }
  }
  if (event.target.closest("[data-open-health]")) {
    navigateToScreen("profile-screen");
    openProfileDetail("health");
  }
  if (event.target.closest("[data-refresh-health]")) {
    syncAppleHealthData();
  }
  const screenLink = event.target.closest("[data-screen-link]");
  if (screenLink) {
    navigateToScreen(screenLink.dataset.screenLink);
  }
  const profileDetailButton = event.target.closest("[data-profile-detail]");
  if (profileDetailButton) {
    openProfileDetail(profileDetailButton.dataset.profileDetail);
  }
  if (event.target.closest("[data-profile-back]")) {
    closeProfileDetail();
  }
  const editRecordingButton = event.target.closest("[data-edit-recording]");
  if (editRecordingButton) {
    const recordingRow = editRecordingButton.closest("[data-recording-index]");
    editingRecordingIndex = Number(recordingRow?.dataset.recordingIndex);
    pendingDeleteRecordingIndex = null;
    openProfileDetail("recordings");
    return;
  }
  if (event.target.closest("[data-cancel-recording-edit]")) {
    editingRecordingIndex = null;
    openProfileDetail("recordings");
    return;
  }
  const addRecordingSetLineButton = event.target.closest("[data-add-recording-set-line]");
  if (addRecordingSetLineButton) {
    appendRecordingSetLine(addRecordingSetLineButton);
    return;
  }
  const saveRecordingEditButton = event.target.closest("[data-save-recording-edit]");
  if (saveRecordingEditButton) {
    const recordingRow = saveRecordingEditButton.closest("[data-recording-index]");
    saveEditedRecording(Number(recordingRow?.dataset.recordingIndex));
    return;
  }
  const deleteRecordingButton = event.target.closest("[data-delete-recording]");
  if (deleteRecordingButton) {
    const recordingRow = deleteRecordingButton.closest("[data-recording-index]");
    pendingDeleteRecordingIndex = Number(recordingRow?.dataset.recordingIndex);
    editingRecordingIndex = null;
    openProfileDetail("recordings");
    return;
  }
  const confirmDeleteRecordingButton = event.target.closest("[data-confirm-delete-recording]");
  if (confirmDeleteRecordingButton) {
    const recordingRow = confirmDeleteRecordingButton.closest("[data-recording-index]");
    deleteProfileRecording(Number(recordingRow?.dataset.recordingIndex));
    return;
  }
  const recordingRow = event.target.closest("[data-recording-index]");
  if (recordingRow && event.target.closest("[data-toggle-recording-detail]")) {
    pendingDeleteRecordingIndex = null;
    recordingRow.classList.toggle("expanded");
  }
  const healthToggle = event.target.closest("[data-health-toggle]");
  if (healthToggle) {
    const index = Number(healthToggle.dataset.healthToggle);
    healthPermissions[index][2] = !healthPermissions[index][2];
    healthSyncState.connected = healthPermissions.some(([, , enabled]) => enabled);
    renderProfileSummary();
    renderWorkoutTelemetry();
    saveAppState();
    openProfileDetail("health");
    showToast(localizedHealthPermissionToast(healthPermissions[index]));
  }
  const exerciseDetailButton = event.target.closest("[data-exercise-detail-name]");
  if (exerciseDetailButton) {
    openExerciseLibraryDetail(exerciseDetailButton.dataset.exerciseDetailName);
  }
  if (event.target.closest("[data-back-exercise-library]")) {
    renderExerciseDatabaseDetail();
  }
  if (event.target.closest("[data-export-test-report]")) {
    downloadJsonFile(`lifttrend-test-report-${safeDateFileStamp()}.json`, localTestingReport());
    showToast(tx("Test report downloaded"));
    return;
  }
  if (event.target.closest("[data-export-full-backup]")) {
    downloadJsonFile(`lifttrend-local-backup-${safeDateFileStamp()}.json`, currentLocalDataSnapshot());
    showToast(tx("Full backup downloaded"));
    return;
  }
  if (event.target.closest("[data-copy-feedback-questions]")) {
    copyFeedbackQuestions();
    return;
  }
  const choiceButton = event.target.closest("[data-profile-choice]");
  if (choiceButton) {
    profileSettingsState[choiceButton.dataset.profileChoice] = choiceButton.dataset.choiceValue;
    profileDetailBody.querySelectorAll("[data-profile-choice]").forEach((button) => {
      button.classList.toggle("selected", button === choiceButton);
    });
    if (choiceButton.dataset.profileChoice === "language") {
      applyLanguagePreference();
      if (!coachSignals.hidden || coachCardList.children.length) {
        renderAiCoachEngine({ fresh: true });
      }
    }
    if (choiceButton.dataset.profileChoice === "units") {
      applyUnitPreference();
    }
    saveAppState();
    showToast(isChineseLanguage() ? `已选择 ${localizedToastValue(choiceButton.dataset.choiceValue)}` : `${choiceButton.dataset.choiceValue} selected`);
  }
  const unitButton = event.target.closest("[data-unit-choice]");
  if (unitButton) {
    profileSettingsState[unitButton.dataset.unitType] = unitButton.dataset.unitValue;
    profileDetailBody.replaceChildren();
    renderUnitsDetail();
    applyUnitPreference();
    saveAppState();
    showToast(isChineseLanguage() ? `已选择 ${localizedToastValue(unitButton.dataset.unitValue)}` : `${unitButton.dataset.unitValue} selected`);
  }
  const goalPresetButton = event.target.closest("[data-goal-preset]");
  if (goalPresetButton) {
    const goalInput = profileDetailBody.querySelector("[data-goal-input]");
    if (goalInput) goalInput.value = goalPresetButton.dataset.goalPreset;
    profileDetailBody.querySelectorAll("[data-goal-preset]").forEach((button) => {
      button.classList.toggle("selected", button === goalPresetButton);
    });
    showToast(tx("Goal preset selected"));
  }
  if (event.target.closest("[data-save-onboarding]")) {
    saveUserProfileFromOnboarding();
  }
  if (event.target.closest("[data-skip-onboarding]")) {
    completeOnboarding("Onboarding skipped. You can update Profile anytime.");
  }
  if (event.target.closest("[data-save-personal]")) {
    savePersonalProfile();
  }
  if (event.target.closest("[data-import-health-weight]")) {
    if (!bodyMetricsPermissionEnabled()) {
      showToast(tx("Enable Body metrics permission first"));
      return;
    }
    if (!String(userProfile.appleHealthWeight || "").trim()) {
      showToast(tx("No Apple Health weight synced yet"));
      return;
    }
    userProfile.weightLb = userProfile.appleHealthWeight;
    const metricDate = profileDetailBody.querySelector('[data-profile-field="metricDate"]')?.value || "";
    if (!isValidPastOrTodayDateValue(metricDate)) {
      showToast(tx("Choose a valid metric date"));
      return;
    }
    const bodyMetricEntries = ensureBodyMetricEntries();
    const existingEntryIndex = bodyMetricEntries.findIndex((entry) => entry.date === metricDate);
    const existingEntry = existingEntryIndex >= 0 ? bodyMetricEntries[existingEntryIndex] : null;
    const healthEntry = bodyMetricEntryWithHealthWeight(metricDate, existingEntry);
    if (existingEntryIndex >= 0) {
      bodyMetricEntries[existingEntryIndex] = healthEntry;
    } else {
      bodyMetricEntries.push(healthEntry);
    }
    const weightField = profileDetailBody.querySelector('[data-profile-field="weight"]');
    if (weightField) {
      weightField.value = weightUnit() === "kg" ? convertWeightValue(userProfile.appleHealthWeight, "lb", "kg") : userProfile.appleHealthWeight;
    }
    renderProfileSummary();
    renderBodyMetricsTrend();
    saveAppState();
    showToast(tx("Apple Health weight imported"));
  }
  if (event.target.closest("[data-open-health-settings]")) {
    navigateToScreen("profile-screen");
    openProfileDetail("health");
  }
  if (event.target.closest("[data-save-goals]")) {
    profileSettingsState.goal = profileDetailBody.querySelector("[data-goal-input]")?.value || profileSettingsState.goal;
    profileSettingsState.coachingStyle = profileDetailBody.querySelector("[data-coaching-style]")?.value || profileSettingsState.coachingStyle;
    saveAppState();
    renderProfileSummary();
    renderAiCoachEngine({ fresh: false });
    showToast(tx("Goals updated. Analyze AI Coach again."));
  }
  const acceptCoachButton = event.target.closest("[data-accept-coach]");
  if (acceptCoachButton) {
    acceptCoachSuggestion(acceptCoachButton.dataset.acceptCoach, acceptCoachButton);
  }
  const laterCoachButton = event.target.closest("[data-later-coach]");
  if (laterCoachButton) {
    deferCoachSuggestion(laterCoachButton);
  }
  const coachActionButton = event.target.closest("[data-coach-action]");
  if (coachActionButton) {
    runCoachNavigationAction(coachActionButton.dataset.coachAction);
  }
  if (event.target.closest("[data-show-later-coach]")) {
    showDeferredCoachSuggestions();
  }
  const startCoachButton = event.target.closest("[data-start-coach-workout]");
  if (startCoachButton) {
    startCoachWorkout(startCoachButton.dataset.startCoachWorkout);
  }
  const saveCoachButton = event.target.closest("[data-save-coach-standard]");
  if (saveCoachButton) {
    saveCoachStandard(saveCoachButton.dataset.saveCoachStandard);
    openStandardsSheet();
  }
  if (event.target.closest("[data-run-ai-coach]")) {
    renderAiCoachEngine({ fresh: true });
    showToast(tx("New suggestions ready"));
  }
});

document.querySelectorAll("[data-close-add-exercise]").forEach((item) => {
  item.addEventListener("click", closeAddExerciseSheet);
});

document.querySelectorAll("[data-close-standards]").forEach((item) => {
  item.addEventListener("click", closeStandardsSheet);
});

document.querySelector("[data-exercise-search]").addEventListener("input", (event) => {
  filterExerciseOptions(event.target.value);
});

profileDetailBody.addEventListener("input", (event) => {
  const setDetails = event.target.closest('[data-edit-recording-field="sets"]');
  if (setDetails) {
    updateRecordingSetPreview(setDetails.closest("[data-recording-edit-form]"));
  }

  const search = event.target.closest("[data-profile-exercise-search]");
  if (search) {
    renderProfileExerciseList(search.value);
  }
});

addExerciseSheet.addEventListener("click", (event) => {
  const option = event.target.closest("[data-add-exercise]");
  if (!option) return;
  addExercise(option.dataset.addExercise, { customName: option.dataset.customName || "" });
});

standardsSearch?.addEventListener("input", () => {
  editingStandardId = "";
  pendingDeleteStandardId = "";
  renderStandards(standardsSearch.value);
});

standardsList.addEventListener("click", (event) => {
  const startButton = event.target.closest("[data-start-standard]");
  const editButton = event.target.closest("[data-edit-standard]");
  const saveEditButton = event.target.closest("[data-save-standard-edit]");
  const addExerciseButton = event.target.closest("[data-add-standard-exercise]");
  const removeExerciseButton = event.target.closest("[data-remove-standard-exercise]");
  const cancelEditButton = event.target.closest("[data-cancel-standard-edit]");
  const deleteButton = event.target.closest("[data-delete-standard]");
  const confirmDeleteButton = event.target.closest("[data-confirm-delete-standard]");

  if (startButton) {
    const standard = savedStandards.find((item) => item.id === startButton.dataset.startStandard);
    if (standard) {
      pendingDeleteStandardId = "";
      const started = startStandardWorkout(standard);
      if (started) {
        showToast(isChineseLanguage() ? `${tx("Started standard")}：${localizedWorkoutName(standard.name)}` : `Started ${standard.name}`);
      }
    }
  }

  if (editButton) {
    const standard = savedStandards.find((item) => item.id === editButton.dataset.editStandard);
    if (standard) {
      editingStandardId = standard.id;
      pendingDeleteStandardId = "";
      renderStandards();
    }
  }

  if (saveEditButton) {
    const standard = savedStandards.find((item) => item.id === saveEditButton.dataset.saveStandardEdit);
    const row = saveEditButton.closest(".standard-row");
    if (standard && row) {
      if (!validateStandardEditor(row)) return;
      const editedStandard = serializeStandardEditor(row, standard);
      if (!canSaveEditedStandard(editedStandard, standard)) return;
      standard.name = editedStandard.name;
      standard.exercises = editedStandard.exercises;
      touchStandard(standard);
      editingStandardId = "";
      pendingDeleteStandardId = "";
      saveAppState();
      renderStandards();
      showToast(tx("Standard updated"));
    }
  }

  if (addExerciseButton) {
    const standard = savedStandards.find((item) => item.id === addExerciseButton.dataset.addStandardExercise);
    if (standard) {
      const row = addExerciseButton.closest(".standard-row");
      if (row && !validateStandardEditor(row)) return;
      const editedStandard = row ? serializeStandardEditor(row, standard) : standard;
      if (!canSaveEditedStandard(editedStandard, standard)) return;
      standard.name = editedStandard.name;
      standard.exercises = [...editedStandard.exercises, createDefaultStandardExercise("Custom Exercise")];
      touchStandard(standard);
      editingStandardId = standard.id;
      saveAppState();
      renderStandards();
      showToast(tx("Exercise added to standard"));
    }
  }

  if (removeExerciseButton) {
    const exerciseRow = removeExerciseButton.closest("[data-standard-exercise-index]");
    const standard = savedStandards.find((item) => item.id === editingStandardId);
    if (standard && exerciseRow) {
      const index = Number(exerciseRow.dataset.standardExerciseIndex);
      const row = removeExerciseButton.closest(".standard-row");
      if (row && !validateStandardEditor(row)) return;
      const editedStandard = row ? serializeStandardEditor(row, standard) : standard;
      if (!canSaveEditedStandard(editedStandard, standard)) return;
      standard.name = editedStandard.name;
      standard.exercises = editedStandard.exercises.filter((_, exerciseIndex) => exerciseIndex !== index);
      if (standard.exercises.length === 0) {
        standard.exercises = [createDefaultStandardExercise("Custom Exercise")];
      }
      touchStandard(standard);
      saveAppState();
      renderStandards();
      showToast(tx("Exercise removed"));
    }
  }

  if (cancelEditButton) {
    editingStandardId = "";
    pendingDeleteStandardId = "";
    renderStandards();
  }

  if (deleteButton) {
    pendingDeleteStandardId = deleteButton.dataset.deleteStandard;
    editingStandardId = "";
    renderStandards();
    return;
  }

  if (confirmDeleteButton) {
    savedStandards = savedStandards.filter((item) => item.id !== confirmDeleteButton.dataset.confirmDeleteStandard);
    if (editingStandardId === confirmDeleteButton.dataset.confirmDeleteStandard) {
      editingStandardId = "";
    }
    pendingDeleteStandardId = "";
    saveAppState();
    renderStandards();
    showToast(tx("Standard deleted"));
  }
});

standardsList.addEventListener("change", (event) => {
  const select = event.target.closest("[data-edit-exercise-name]");
  const targetInputChange = event.target.closest("[data-edit-exercise-target]");
  if (!select && !targetInputChange) return;

  const exerciseRow = (select || targetInputChange).closest("[data-standard-exercise-index]");
  const targetInput = exerciseRow?.querySelector("[data-edit-exercise-target]");
  const selectedName = select?.value || exerciseRow?.querySelector("[data-edit-exercise-name]")?.value || "Custom Exercise";
  const target = select
    ? exerciseCatalog[selectedName]?.target || targetInput?.value || "target 3 x 10"
    : targetInput?.value || exerciseCatalog[selectedName]?.target || "target 3 x 10";

  if (select && targetInput) {
    targetInput.value = target;
  }
  if (select || standardEditorFieldNames(exerciseRow) !== standardFieldNamesForTarget(selectedName, target)) {
    renderStandardSetDefaults(exerciseRow, selectedName, target);
  }
});

summaryExercises.addEventListener("click", (event) => {
  const toggleButton = event.target.closest("[data-toggle-summary]");
  const row = event.target.closest(".summary-row");
  if (!row || (!toggleButton && event.target.closest("button"))) return;

  row.classList.toggle("expanded");
  const button = row.querySelector("[data-toggle-summary]");
  if (button) {
    button.textContent = row.classList.contains("expanded") ? tx("Hide") : tx("Details");
  }
});

document.querySelectorAll(".workout-option[data-workout]").forEach((option) => {
  option.addEventListener("click", () => setWorkout(option.dataset.workout));
});

document.querySelectorAll(".focus-card[data-workout]").forEach((option) => {
  option.addEventListener("click", () => setWorkout(option.dataset.workout));
});

exerciseList.addEventListener("click", (event) => {
  const finishSetButton = event.target.closest("[data-finish-set]");
  const finishExerciseButton = event.target.closest("[data-finish-exercise]");
  const startExerciseButton = event.target.closest("[data-start-exercise]");
  const reorderHandle = event.target.closest("[data-drag-exercise]");
  const moveExerciseButton = event.target.closest("[data-move-exercise]");
  const deleteSetButton = event.target.closest("[data-delete-set]");
  const deleteExerciseButton = event.target.closest("[data-delete-exercise]");
  const editCompleteSetButton = event.target.closest("[data-edit-complete-set]");
  const saveCompleteSetButton = event.target.closest("[data-save-complete-set]");
  const cancelCompleteSetButton = event.target.closest("[data-cancel-complete-set]");
  const setRow = event.target.closest(".set-row");
  const exerciseCard = event.target.closest(".exercise-card");

  if (reorderHandle) {
    toggleReorderActions(reorderHandle);
    return;
  }

  if (moveExerciseButton) {
    moveExerciseCardByDirection(moveExerciseButton.closest(".exercise-card"), moveExerciseButton.dataset.moveExercise);
    return;
  }

  if (editCompleteSetButton) {
    const row = editCompleteSetButton.closest(".set-row");
    const exercise = exerciseForSetRow(row);
    const set = setPayloadFromCompleteRow(row);
    const index = [...row.parentElement.querySelectorAll(".set-row")].indexOf(row);
    resetSetDeleteConfirmations();
    row.outerHTML = editCompleteSetRowHtml(exercise, set, index);
    addDeleteControls();
    return;
  }

  if (saveCompleteSetButton) {
    const row = saveCompleteSetButton.closest(".set-row");
    if (!validateSetRowBeforeSave(row)) return;
    const exercise = exerciseForSetRow(row);
    const set = serializeEditedCompleteSetRow(row);
    const index = [...row.parentElement.querySelectorAll(".set-row")].indexOf(row);
    row.outerHTML = completeSetRowHtml(exercise, set, index);
    addDeleteControls();
    renderWorkoutTelemetry();
    persistActiveWorkoutSession();
    showToast(isChineseLanguage() ? "本组已更新" : "Set updated");
    return;
  }

  if (cancelCompleteSetButton) {
    const row = cancelCompleteSetButton.closest(".set-row");
    const exercise = exerciseForSetRow(row);
    const set = originalSetPayloadFromEditRow(row);
    const index = [...row.parentElement.querySelectorAll(".set-row")].indexOf(row);
    row.outerHTML = completeSetRowHtml(exercise, set, index);
    addDeleteControls();
    renderWorkoutTelemetry();
    persistActiveWorkoutSession();
    return;
  }

  if (deleteSetButton) {
    const row = deleteSetButton.closest(".set-row");
    if (!row?.classList.contains("confirm-delete")) {
      resetSetDeleteConfirmations(row);
      row?.classList.add("confirm-delete");
      deleteSetButton.textContent = isChineseLanguage() ? "确认" : "Confirm";
      return;
    }
    const card = row?.closest(".exercise-card");
    const wasActiveSet = row?.classList.contains("active-set");
    row?.remove();
    if (wasActiveSet) {
      ensureCurrentCardHasActiveSet(card);
    }
    resetSetDeleteConfirmations();
    updateWorkoutProgress();
    renderWorkoutTelemetry();
    persistActiveWorkoutSession();
    showToast(isChineseLanguage() ? "本组已删除" : "Set deleted");
    return;
  }

  if (deleteExerciseButton) {
    const card = deleteExerciseButton.closest(".exercise-card");
    if (!card?.classList.contains("confirm-delete")) {
      resetExerciseDeleteConfirmations(card);
      card?.classList.add("confirm-delete");
      deleteExerciseButton.textContent = tx("Confirm delete");
      return;
    }
    const wasCurrent = card?.classList.contains("current");
    const name = getExerciseName(card);
    const nextCard = card?.nextElementSibling?.classList.contains("exercise-card")
      ? card.nextElementSibling
      : card?.previousElementSibling?.classList.contains("exercise-card")
        ? card.previousElementSibling
        : null;

    card?.remove();

    if (wasCurrent && nextCard) {
      activateExerciseCard(nextCard);
    }

    addDeleteControls();
    resetExerciseDeleteConfirmations();
    updateWorkoutProgress();
    renderWorkoutTelemetry();
    persistActiveWorkoutSession();
    showToast(isChineseLanguage() ? `${localizedExerciseName(name)} 已删除` : `${name} deleted`);
    return;
  }

  if (finishSetButton) {
    recordCurrentSet();
    return;
  }
  if (finishExerciseButton) {
    finishCurrentExercise();
    return;
  }
  if (startExerciseButton) {
    activateExerciseCard(startExerciseButton.closest(".exercise-card"));
    return;
  }

  if (setRow) {
    setRow.classList.toggle("show-delete");
    return;
  }

  if (exerciseCard?.classList.contains("done") && !event.target.closest("button, input, label")) {
    exerciseCard.classList.toggle("expanded");
    return;
  }

  if (exerciseCard && !event.target.closest("button, input, label")) {
    exerciseCard.classList.toggle("show-delete");
  }
});

exerciseList.addEventListener("dragstart", (event) => {
  const card = event.target.closest(".exercise-card");
  if (!card || event.target.closest("input, label")) {
    event.preventDefault();
    return;
  }
  draggedExerciseCard = card;
  card.classList.add("dragging");
  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.setData("text/plain", getExerciseName(card));
});

exerciseList.addEventListener("dragover", (event) => {
  if (!draggedExerciseCard) return;
  event.preventDefault();
  const afterCard = exerciseCardAfterPointer(event.clientY, draggedExerciseCard);
  moveExerciseCardBefore(draggedExerciseCard, afterCard);
});

exerciseList.addEventListener("drop", (event) => {
  if (!draggedExerciseCard) return;
  event.preventDefault();
  draggedExerciseCard.classList.remove("dragging");
  draggedExerciseCard = null;
  showToast(tx("Exercise order updated"));
});

exerciseList.addEventListener("dragend", () => {
  draggedExerciseCard?.classList.remove("dragging");
  draggedExerciseCard = null;
});

exerciseList.addEventListener("pointerdown", (event) => {
  const handle = event.target.closest("[data-drag-exercise]");
  const card = handle?.closest(".exercise-card");
  if (!handle || !card) return;
  pointerDragState = { card, pointerId: event.pointerId, started: false };
  card.setPointerCapture?.(event.pointerId);
});

exerciseList.addEventListener("pointermove", (event) => {
  if (!pointerDragState || pointerDragState.pointerId !== event.pointerId) return;
  event.preventDefault();
  pointerDragState.started = true;
  pointerDragState.card.classList.add("dragging");
  const afterCard = exerciseCardAfterPointer(event.clientY, pointerDragState.card);
  moveExerciseCardBefore(pointerDragState.card, afterCard);
});

exerciseList.addEventListener("pointerup", finishExerciseDrag);
exerciseList.addEventListener("pointercancel", finishExerciseDrag);

exerciseList.addEventListener("keydown", (event) => {
  const handle = event.target.closest("[data-drag-exercise]");
  if (!handle || !["Enter", " "].includes(event.key)) return;
  event.preventDefault();
  toggleReorderActions(handle);
});

document.querySelector("[data-save-standard]").addEventListener("click", () => {
  saveCurrentStandard();
});

document.querySelector("[data-summary-save-standard]").addEventListener("click", () => {
  if (saveCurrentStandard(summaryStandardName.value)) {
    openStandardsSheet();
  }
});

document.querySelector("[data-finish-workout]").addEventListener("click", finishWorkout);

document.querySelector("[data-summary-new-workout]").addEventListener("click", () => {
  todaySummary.hidden = true;
  focusStart.hidden = false;
  workoutSession.hidden = true;
  renderActiveSessionPanel();
  title.textContent = "Today";
  document.querySelector("#today-screen").scrollTo({ top: 0 });
});

exerciseList.addEventListener("input", (event) => {
  if (event.target.closest("input")) {
    event.target.closest(".active-set")?.setAttribute("data-touched", "true");
    persistActiveWorkoutSession();
  }
  const editableName = event.target.closest(".editable-name");
  if (editableName) {
    const card = editableName.closest(".exercise-card");
    const nextName = editableName.textContent.trim() || "Custom Exercise";
    if (card) {
      card.dataset.exerciseName = nextName;
      card.dataset.exerciseGroup = card.dataset.exerciseGroup || "Custom";
      card.dataset.exerciseTarget = card.dataset.exerciseTarget || exerciseCatalog["Custom Exercise"].target;
    }
    refreshCurrentExerciseStatus(card);
    persistActiveWorkoutSession();
  }
});

exerciseList.addEventListener("blur", (event) => {
  const editableName = event.target.closest(".editable-name");
  if (editableName) {
    const card = editableName.closest(".exercise-card");
    const nextName = editableName.textContent.trim() || "Custom Exercise";
    if (card) card.dataset.exerciseName = nextName;
    refreshCurrentExerciseStatus(card);
    persistActiveWorkoutSession();
  }
}, true);

loadAppState();
renderTrendChips();
renderAiCoachEngine();
renderProfileSummary();
applyUnitPreference();
renderWorkoutTrends();
renderSystemStatus();
renderWorkoutTelemetry();
applyOnboardingState();
renderActiveSessionPanel();
applyLanguagePreference();

window.setInterval(() => {
  renderSystemStatus();
  renderWorkoutTelemetry();
}, 30000);

window.addEventListener("online", renderSystemStatus);
window.addEventListener("offline", renderSystemStatus);
(navigator.connection || navigator.webkitConnection || navigator.mozConnection)?.addEventListener?.("change", renderSystemStatus);
