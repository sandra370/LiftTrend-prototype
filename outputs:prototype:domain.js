(function attachLiftTrendDomain(root) {
  function convertWeightValue(value, fromUnit, toUnit) {
    const numeric = Number(value);
    if (!Number.isFinite(numeric) || fromUnit === toUnit) return value;
    const converted = fromUnit === "lb" ? numeric * 0.453592 : numeric / 0.453592;
    return converted >= 100 ? String(Math.round(converted)) : converted.toFixed(1).replace(/\.0$/, "");
  }

  function convertHeightValue(value, fromUnit, toUnit) {
    const numeric = Number(value);
    if (!Number.isFinite(numeric) || fromUnit === toUnit) return value;
    const converted = fromUnit === "cm" ? numeric / 30.48 : numeric * 30.48;
    return toUnit === "cm" ? String(Math.round(converted)) : converted.toFixed(1).replace(/\.0$/, "");
  }

  function convertMeasurementValue(value, fromUnit, toUnit) {
    const numeric = Number(value);
    if (!Number.isFinite(numeric) || fromUnit === toUnit) return value;
    const converted = fromUnit === "in" ? numeric * 2.54 : numeric / 2.54;
    return converted >= 100 ? String(Math.round(converted)) : converted.toFixed(1).replace(/\.0$/, "");
  }

  function convertDistanceValue(value, fromUnit, toUnit) {
    const numeric = Number(value);
    if (!Number.isFinite(numeric) || fromUnit === toUnit) return value;
    const meters = fromUnit === "km"
      ? numeric * 1000
      : fromUnit === "mi"
        ? numeric * 1609.34
        : fromUnit === "yd"
          ? numeric * 0.9144
          : numeric;
    const converted = toUnit === "km"
      ? meters / 1000
      : toUnit === "mi"
        ? meters / 1609.34
        : toUnit === "yd"
          ? meters / 0.9144
          : meters;
    return converted >= 100 ? String(Math.round(converted)) : converted.toFixed(1).replace(/\.0$/, "");
  }

  function numberFromMeta(meta, pattern) {
    const match = meta?.match(pattern);
    return match ? Number(match[1]) : 0;
  }

  function workoutMinutes(recording) {
    return numberFromMeta(recording?.meta, /(\d+)\s*min/i);
  }

  function workoutCalories(recording) {
    return numberFromMeta(recording?.meta, /(\d+)\s*kcal/i);
  }

  function localDateString(date = new Date()) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function setDurationMinutes(set) {
    const text = String(set?.duration || "").trim();
    if (!text) return 0;
    const match = text.match(/^(\d+(?:\.\d+)?)\s*(sec|min)?$/i);
    if (!match) return 0;
    return Number(match[1]) * (match[2]?.toLowerCase() === "sec" ? 1 / 60 : 1);
  }

  function loggedWorkoutDurationMinutes(exercises = []) {
    return Math.round(exercises.reduce((total, exercise) => {
      return total + (exercise.sets || []).reduce((setTotal, set) => setTotal + setDurationMinutes(set), 0);
    }, 0));
  }

  function workoutSessionMinutes({ elapsedMinutes = 0, currentWorkoutMinutes = 0, exercises = [] } = {}) {
    return Math.max(elapsedMinutes || 0, currentWorkoutMinutes || 0, loggedWorkoutDurationMinutes(exercises), 1);
  }

  function recordingDateOrNull(recording, now = new Date()) {
    if (recording?.date) {
      const explicitDate = new Date(recording.date);
      if (!Number.isNaN(explicitDate.getTime())) return explicitDate;
    }
    const titleDate = String(recording?.title || "").split("·")[0].trim();
    if (titleDate.toLowerCase() === "today") return now;
    if (!/^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{1,2}$/i.test(titleDate)) return null;
    const parsed = new Date(`${titleDate} ${now.getFullYear()}`);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
  }

  function recordingDate(recording, now = new Date()) {
    return recordingDateOrNull(recording, now) || now;
  }

  function periodBounds(range, offset = 0, now = new Date()) {
    if (range === "month") {
      const start = new Date(now.getFullYear(), now.getMonth() + offset, 1);
      const end = new Date(now.getFullYear(), now.getMonth() + offset + 1, 1);
      return { start, end };
    }
    if (range === "year") {
      const start = new Date(now.getFullYear() + offset, 0, 1);
      const end = new Date(now.getFullYear() + offset + 1, 0, 1);
      return { start, end };
    }

    const end = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1 + offset * 7);
    const start = new Date(end);
    start.setDate(end.getDate() - 7);
    return { start, end };
  }

  function recordingsInRange(recordings, range, offset = 0, now = new Date()) {
    const { start, end } = periodBounds(range, offset, now);
    return recordings.filter((recording) => {
      const date = recordingDateOrNull(recording, now);
      if (!date) return false;
      return date >= start && date < end;
    });
  }

  function recentRecordingsForAiContext(recordings = [], now = new Date()) {
    return [...recordings]
      .filter((recording) => {
        const date = recordingDateOrNull(recording, now);
        return Boolean(date && date <= now);
      })
      .sort((a, b) => recordingDateOrNull(b, now) - recordingDateOrNull(a, now))
      .slice(0, 5);
  }

  function rangeLabel(range) {
    return range === "year" ? "year" : range === "month" ? "month" : "week";
  }

  function comparisonText(currentValue, previousValue, range, unit = "") {
    if (!previousValue) return `No prior ${rangeLabel(range)}`;
    const diff = currentValue - previousValue;
    const sign = diff > 0 ? "+" : "";
    const rounded = Math.abs(diff) >= 10 ? Math.round(diff) : diff.toFixed(1).replace(/\.0$/, "");
    return `${sign}${rounded}${unit} vs last ${rangeLabel(range)}`;
  }

  function formatMinutes(totalMinutes) {
    if (!totalMinutes) return "0h";
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  }

  function formatCompactNumber(value) {
    if (!value) return "0";
    return value >= 1000 ? `${(value / 1000).toFixed(1).replace(/\.0$/, "")}k` : String(value);
  }

  function recordingMuscleGroup(recording) {
    const focusGroup = String(recording?.focusGroup || "").toLowerCase();
    const knownFocusGroups = ["chest", "shoulders", "back", "glutes", "abs", "arms", "recovery", "cardio", "custom", "other"];
    if (knownFocusGroups.includes(focusGroup)) return focusGroup;

    const title = String(recording?.title || "").toLowerCase();

    if (title.includes("glute") || title.includes("leg") || title.includes("lower")) return "glutes";
    if (title.includes("shoulder")) return "shoulders";
    if (title.includes("back") || title.includes("pull")) return "back";
    if (title.includes("chest") || title.includes("push")) return "chest";
    if (title.includes("abs") || title.includes("core")) return "abs";
    if (title.includes("arm") || title.includes("biceps") || title.includes("triceps")) return "arms";
    if (title.includes("recovery") || title.includes("mobility") || title.includes("reset")) return "recovery";
    if (title.includes("cardio") || title.includes("conditioning") || title.includes("walk") || title.includes("bike") || title.includes("row")) return "cardio";
    if (title.includes("custom")) return "custom";
    return "custom";
  }

  function normalizeExerciseName(name) {
    return String(name || "").toLowerCase().replace(/[^a-z0-9]/g, "");
  }

  function parseRecordingSetLine(line) {
    const parts = String(line).split("·").map((part) => part.trim());
    const exerciseName = parts[0] || "";
    const detail = parts.slice(1).join(" ");
    const weightMatch = detail.match(/([\d.]+)\s*(lb|kg)/i);
    const distanceMatch = detail.match(/([\d.]+)\s*(m|yd|km|mi)\b/i);
    const durationMatch = detail.match(/([\d.]+)\s*(sec|min)\b/i);
    const repSchemeMatch = detail.match(/(\d+)\s*x\s*(\d+)/i);
    const repsMatch = detail.match(/(\d+)\s*reps?/i) || detail.match(/(\d+)\s*\/side/i);
    const rpeMatch = detail.match(/RPE\s*([\d.]+)/i);
    const weight = weightMatch ? Number(convertWeightValue(weightMatch[1], weightMatch[2].toLowerCase(), "lb")) : 0;
    const reps = repSchemeMatch ? Number(repSchemeMatch[1]) * Number(repSchemeMatch[2]) : repsMatch ? Number(repsMatch[1]) : 1;
    const distanceMeters = distanceMatch ? Number(convertDistanceValue(distanceMatch[1], distanceMatch[2].toLowerCase(), "m")) : 0;
    const durationMinutes = durationMatch
      ? Number(durationMatch[1]) * (durationMatch[2].toLowerCase() === "sec" ? 1 / 60 : 1)
      : 0;
    const rpe = rpeMatch ? Number(rpeMatch[1]) : null;
    return {
      exerciseName,
      loadLb: weight,
      reps,
      rpe,
      strengthVolume: weight > 0 ? weight * reps : reps,
      durationMinutes,
      distanceMeters,
    };
  }

  function recordingLineMatchesExercise(line, aliases = []) {
    const parsed = typeof line === "string" ? parseRecordingSetLine(line) : line;
    const normalizedName = normalizeExerciseName(parsed.exerciseName);
    return aliases.some((alias) => normalizeExerciseName(alias) === normalizedName);
  }

  function exerciseTrendDataPoints(recordings = [], aliases = [], metricKey = "strengthVolume") {
    return [...recordings].reverse().flatMap((recording) => {
      const totalValue = (recording.sets || []).reduce((sum, line) => {
        const parsed = parseRecordingSetLine(line);
        return recordingLineMatchesExercise(parsed, aliases) ? sum + (parsed[metricKey] || 0) : sum;
      }, 0);

      return totalValue > 0
        ? [{ label: String(recording.title || "").split("·")[0].trim(), volume: totalValue }]
        : [];
    });
  }

  function progressionReadinessForExercise(recordings = [], aliases = [], {
    minWeeks = 3,
    maxRpe = 8,
  } = {}) {
    const weeklyEntries = new Map();
    recordings.forEach((recording) => {
      const matchedSets = (recording.sets || [])
        .map(parseRecordingSetLine)
        .filter((line) => recordingLineMatchesExercise(line, aliases) && line.loadLb > 0 && line.reps > 0);
      if (!matchedSets.length) return;
      const date = recordingDate(recording);
      const weekKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
      const totalReps = matchedSets.reduce((sum, set) => sum + set.reps, 0);
      const loadLb = matchedSets[0].loadLb;
      const rpes = matchedSets.map((set) => set.rpe).filter((value) => Number.isFinite(value));
      weeklyEntries.set(weekKey, {
        loadLb,
        totalReps,
        maxRpe: rpes.length ? Math.max(...rpes) : null,
        setCount: matchedSets.length,
      });
    });

    const entries = [...weeklyEntries.values()];
    if (entries.length < minWeeks) {
      return { ready: false, reason: "not enough weeks", completedWeeks: entries.length };
    }
    const latestEntries = entries.slice(-minWeeks);
    const [first] = latestEntries;
    const sameTarget = latestEntries.every((entry) => entry.loadLb === first.loadLb && entry.totalReps === first.totalReps);
    const observedRpes = latestEntries.map((entry) => entry.maxRpe).filter((value) => Number.isFinite(value));
    const observedMaxRpe = observedRpes.length ? Math.max(...observedRpes) : null;
    if (!sameTarget) {
      return { ready: false, reason: "target varied", completedWeeks: latestEntries.length };
    }
    if (observedMaxRpe === null || observedMaxRpe > maxRpe) {
      return { ready: false, reason: "effort too high or missing", completedWeeks: latestEntries.length, maxRpe: observedMaxRpe };
    }
    return {
      ready: true,
      completedWeeks: latestEntries.length,
      loadLb: first.loadLb,
      totalReps: first.totalReps,
      maxRpe: observedMaxRpe,
      averageRpe: observedRpes.reduce((sum, value) => sum + value, 0) / observedRpes.length,
    };
  }

  function percentChange(currentValue, previousValue) {
    if (!previousValue) return currentValue > 0 ? "+100%" : "0%";
    const change = ((currentValue - previousValue) / previousValue) * 100;
    const sign = change > 0 ? "+" : "";
    return `${sign}${Math.round(change)}%`;
  }

  function isQuadDominantLine(line) {
    const parsed = typeof line === "string" ? parseRecordingSetLine(line) : line;
    return /\b(squat|leg press|leg extension|lunge|split squat|step up)\b/i.test(parsed.exerciseName);
  }

  function goalDriftForGlutePriority(recordings = [], now = new Date()) {
    const currentEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    const currentStart = new Date(currentEnd);
    currentStart.setDate(currentEnd.getDate() - 28);
    const previousStart = new Date(currentStart);
    previousStart.setDate(currentStart.getDate() - 28);

    function summarize(start, end) {
      return recordings.reduce((summary, recording) => {
        const date = recordingDate(recording, now);
        if (date < start || date >= end) return summary;
        if (recordingMuscleGroup(recording) === "glutes") summary.gluteSessions += 1;
        summary.quadDominantSets += (recording.sets || []).filter(isQuadDominantLine).length;
        return summary;
      }, { gluteSessions: 0, quadDominantSets: 0 });
    }

    const current = summarize(currentStart, currentEnd);
    const previous = summarize(previousStart, currentStart);
    const gluteChange = percentChange(current.gluteSessions, previous.gluteSessions);
    const quadChange = percentChange(current.quadDominantSets, previous.quadDominantSets);

    return {
      drifting: current.gluteSessions < previous.gluteSessions && current.quadDominantSets > previous.quadDominantSets,
      current,
      previous,
      gluteChange,
      quadChange,
    };
  }

  function trainingGoalProfile(goal = "") {
    const text = String(goal).toLowerCase();
    return {
      muscleGain: /\b(lean muscle|muscle gain|hypertrophy|bulk|build muscle)\b/.test(text),
      strength: /\b(strength|power|stronger|progression|progressive overload)\b/.test(text),
      fatLoss: /\b(fat loss|lose fat|weight loss|cut)\b/.test(text),
      generalHealth: /\b(general health|health|wellness|fitness|consistency|maintenance)\b/.test(text),
      glutePriority: /\b(glute|glutes|booty|hip|hips|lower body|lower-body)\b/.test(text),
      shoulderPriority: /\b(shoulder|shoulders|delt|delts|upper body|upper-body)\b/.test(text),
      recoveryPriority: /\b(recovery|mobility|restore|rehab)\b/.test(text),
    };
  }

  function goalSupportsGlutePriority(goal = "") {
    return trainingGoalProfile(goal).glutePriority;
  }

  function goalSupportsProgression(goal = "") {
    const profile = trainingGoalProfile(goal);
    return profile.strength || profile.muscleGain || profile.shoulderPriority;
  }

  function validMetricDateValue(dateValue, now = new Date()) {
    const match = String(dateValue || "").match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (!match) return false;
    const [, year, month, day] = match.map(Number);
    const parsed = new Date(year, month - 1, day);
    const isCalendarDate = parsed.getFullYear() === year
      && parsed.getMonth() === month - 1
      && parsed.getDate() === day;
    return Boolean(isCalendarDate && dateValue <= localDateString(now));
  }

  function latestDatedEntry(entries = [], now = new Date()) {
    return [...entries]
      .filter((entry) => validMetricDateValue(entry?.date, now))
      .sort((a, b) => b.date.localeCompare(a.date))[0] || null;
  }

  const bodyMetricSourceLabels = {
    weightLb: "Weight",
    bodyFat: "Body fat",
    waistIn: "Waist",
    hipIn: "Hip",
    thighIn: "Thigh",
    armIn: "Arm",
    general: "Overall",
  };

  function dataSourceLabel(source) {
    if (source === "apple_health") return "Apple Health";
    if (source === "manual") return "manual";
    if (source === "mixed") return "mixed";
    return source || "unknown";
  }

  function bodyMetricSourceSummary(sources = {}) {
    const entries = Object.entries(sources || {});
    if (!entries.length) return "none";
    return entries
      .map(([key, source]) => `${bodyMetricSourceLabels[key] || key}: ${dataSourceLabel(source)}`)
      .join(", ");
  }

  function bodyMetricSourcesForEntry(entry) {
    if (!entry) return {};
    const sources = entry.sources || {};
    const visibleSources = Object.fromEntries(
      Object.entries(sources).filter(([key]) => entry[key] !== undefined && entry[key] !== "")
    );
    if (Object.keys(visibleSources).length) return visibleSources;
    return entry.source ? { general: entry.source } : {};
  }

  function buildAiCoachContext({
    profileSettingsState = {},
    userProfile = {},
    profileRecordings = [],
    healthPermissions = [],
  } = {}, now = new Date()) {
    const enabledHealthScopes = healthPermissions
      .filter((permission) => permission?.[2])
      .map((permission) => permission[0])
      .filter((label) => label !== "Location");
    const latestMetrics = latestDatedEntry(userProfile.bodyMetricEntries, now);
    const bodyMetricSources = bodyMetricSourcesForEntry(latestMetrics);
    const bodyMetricsAvailable = Object.keys(bodyMetricSources).length > 0;
    const recentWorkouts = recentRecordingsForAiContext(profileRecordings, now).map((recording) => {
      const date = recordingDate(recording, now).toISOString().slice(0, 10);
      return {
        title: recording.title,
        date,
        minutes: workoutMinutes(recording),
        calories: workoutCalories(recording),
        exerciseCount: numberFromMeta(recording.meta, /(\d+)\s*exercises/i),
        setCount: numberFromMeta(recording.meta, /(\d+)\s*sets/i),
        muscleGroup: recordingMuscleGroup(recording),
      };
    });
    const lastFourWeeks = recordingsInRange(profileRecordings, "week", 0, now);

    return {
      schemaVersion: "ai-coach-context-v1",
      generatedAt: now.toISOString(),
      goal: profileSettingsState.goal || `${userProfile.generalGoal || "General training"}: ${userProfile.focusAreas || "not specified"}`,
      goalProfile: trainingGoalProfile(profileSettingsState.goal || `${userProfile.generalGoal || ""}: ${userProfile.focusAreas || ""}`),
      coachingStyle: profileSettingsState.coachingStyle || "Balanced",
      trainingFrequency: userProfile.frequency || "not specified",
      unitPreferences: {
        weight: profileSettingsState.weightUnit || "lb",
        body: profileSettingsState.bodyUnit || "cm",
        energy: profileSettingsState.energyUnit || "kcal",
      },
      recentWorkouts,
      currentPeriodSummary: {
        range: "last 7 days",
        workouts: lastFourWeeks.length,
        minutes: lastFourWeeks.reduce((sum, recording) => sum + workoutMinutes(recording), 0),
        calories: lastFourWeeks.reduce((sum, recording) => sum + workoutCalories(recording), 0),
      },
      wearableSignals: {
        enabledScopes: enabledHealthScopes,
        locationIncluded: false,
        rawSamplesIncluded: false,
      },
      bodyMetrics: {
        available: bodyMetricsAvailable,
        latestDate: bodyMetricsAvailable ? latestMetrics?.date || null : null,
        sources: bodyMetricSources,
        sourceSummary: bodyMetricSourceSummary(bodyMetricSources),
        rawValuesIncluded: false,
      },
      excludedFields: [
        "name",
        "age",
        "sex",
        "height",
        "weight",
        "body measurements",
        "location",
        "raw heart-rate samples",
      ],
    };
  }

  function buildAiCoachRecommendations({ signals = [], context = {} } = {}) {
    const goal = context.goal || "the user's stated training goal";
    const frequency = context.trainingFrequency || "the logged training frequency";
    const recommendationPriority = {
      overreaching: 100,
      conflictingGoals: 95,
      goalDrift: 90,
      lateralRaise: 85,
      performanceDecline: 80,
      fatLossAdherence: 75,
      healthConsistency: 70,
      recovery: 65,
      inconsistentLogging: 55,
      incompleteWearable: 30,
    };
    const signalTemplates = {
      lateralRaise: {
        id: "lateralRaise",
        cardKey: "progression",
        label: "Progression",
        title: "Try 10 lb lateral raises next session",
        interpretation: "Repeatedly completing the same load and rep target suggests this movement may be ready for a small, controlled progression.",
        recommendation: "Next shoulder session, try 10 lb for 3 x 10. Keep the first set conservative and return to 7.5 lb if form or shoulder comfort changes.",
        rationale: "Increasing load while lowering reps keeps the jump manageable and gives the next workout a clear pass/fail target.",
        uncertainty: "This assumes recent sets were logged accurately and felt manageable. It should not override pain, poor form, injury guidance, or unusually high fatigue.",
        confidence: "medium",
      },
      goalDrift: {
        id: "goalDrift",
        cardKey: "goalDrift",
        label: "Goal drift",
        title: "Rebalance the next lower-body session",
        interpretation: `The recent exercise mix may be drifting away from ${goal}.`,
        recommendation: "Start a glute-priority workout with hip thrust, cable kickback, Romanian deadlift, and a core stability movement before adding more quad-dominant volume.",
        rationale: "This keeps the next workout aligned with the stated focus while preserving a complete lower-body training stimulus.",
        uncertainty: "Muscle-volume tags are estimates from logged exercises, not direct muscle growth measurements. If the goal changed, update goals before accepting this plan.",
        confidence: "medium",
      },
      recovery: {
        id: "recovery",
        cardKey: "recovery",
        label: "Recovery",
        title: "Use a lower-intensity session before progressing",
        interpretation: `Higher wearable strain plus elevated effort can mean the next hard session should be adjusted to match ${frequency}.`,
        recommendation: "Start the recovery workout or hold loads steady for the next lower-body day instead of adding weight.",
        rationale: "A lighter session keeps the habit intact while reducing the chance that fatigue drives poor performance in the next hard workout.",
        uncertainty: "Heart-rate and RPE trends are readiness clues, not a medical diagnosis. Sleep, stress, soreness, illness, and sensor accuracy are not fully known here.",
        confidence: "low",
      },
      returningAfterBreak: {
        id: "returningAfterBreak",
        cardKey: "returningAfterBreak",
        label: "Return",
        title: "Restart below your previous working volume",
        interpretation: "A longer break means the last logged loads may not reflect today's readiness.",
        recommendation: "Use the previous workout as a template, but start with fewer total sets and stop 2-3 reps before failure.",
        rationale: "Reducing volume first makes it easier to rebuild consistency without turning the first session back into a recovery problem.",
        uncertainty: "The exact break length, sleep, soreness, and injury status are not fully known, so the safest action is a conservative first session.",
        confidence: "medium",
      },
      performanceDecline: {
        id: "performanceDecline",
        cardKey: "performanceDecline",
        label: "Performance",
        title: "Hold progression and check recovery inputs",
        interpretation: "A short-term drop in performance can come from fatigue, inconsistent logging, exercise changes, or life stress.",
        recommendation: "Repeat the last successful load next time and add a short note about sleep, soreness, or schedule pressure.",
        rationale: "Holding load steady creates a cleaner comparison before deciding whether to deload, change exercise selection, or progress again.",
        uncertainty: "This is not a diagnosis. The cause of the drop cannot be confirmed from workout records alone.",
        confidence: "medium",
      },
      inconsistentLogging: {
        id: "inconsistentLogging",
        cardKey: "inconsistentLogging",
        label: "Logging",
        title: "Make the next two sessions easier to compare",
        interpretation: "Missing sets, RPE, or workout details make progression and recovery signals less reliable.",
        recommendation: "For the next two workouts, record at least exercise name, load, reps, completed sets, and RPE for the main lift.",
        rationale: "A smaller but complete logging target gives AI Coach enough comparable data without slowing down the workout.",
        uncertainty: "The app cannot tell whether missing data means skipped work or incomplete logging.",
        confidence: "high",
      },
      conflictingGoals: {
        id: "conflictingGoals",
        cardKey: "conflictingGoals",
        label: "Goal check",
        title: "Choose the goal that should win this month",
        interpretation: "The current goals may pull training decisions in different directions.",
        recommendation: "Pick one priority for the next four weeks: strength, muscle gain, fat loss, or general health. Keep the other goal as a secondary constraint.",
        rationale: "A clear priority helps AI Coach avoid giving progression, recovery, and calorie suggestions that fight each other.",
        uncertainty: "This is based on stated goals, not a judgment about which goal is better.",
        confidence: "high",
      },
      incompleteWearable: {
        id: "incompleteWearable",
        cardKey: "incompleteWearable",
        label: "Data gap",
        title: "Use workout logs without overreading wearable gaps",
        interpretation: "Wearable data is incomplete, so recovery confidence should stay lower.",
        recommendation: "Base the next suggestion on logged sets and RPE, or enable Heart rate and Active calories if you want recovery signals included.",
        rationale: "Workout logs can still support progression, but missing wearable inputs should not be treated as hidden evidence.",
        uncertainty: "No heart-rate, sleep, or readiness conclusion is supported until those data sources are available and permitted.",
        confidence: "high",
      },
      fatLossAdherence: {
        id: "fatLossAdherence",
        cardKey: "fatLossAdherence",
        label: "Fat loss",
        title: "Keep the next workout consistent",
        interpretation: `For ${goal}, the most useful training signal is whether weekly activity stays repeatable, not whether one lift increases today.`,
        recommendation: "Start a 30-45 minute full-body or incline-walk session and record duration, calories, and effort. Keep the session easy enough to repeat this week.",
        rationale: "Consistent logged training time and energy output give AI Coach a better basis for fat-loss guidance than a single strength progression.",
        uncertainty: "This does not estimate a calorie deficit or body-fat change. Food intake, steps, sleep, stress, and body-metric updates are not fully known here.",
        confidence: "medium",
      },
      healthConsistency: {
        id: "healthConsistency",
        cardKey: "healthConsistency",
        label: "Consistency",
        title: "Keep the next session easy to repeat",
        interpretation: `For ${goal}, the key signal is whether training frequency and recovery stay sustainable across the week.`,
        recommendation: "Start a 20-30 minute recovery, mobility, or light full-body session. Record duration, effort, and how the session felt afterward.",
        rationale: "A repeatable session keeps momentum without turning a general-health goal into a max-effort strength plan.",
        uncertainty: "This uses logged workouts only. Sleep, soreness, stress, illness, and daily step count are not fully available here.",
        confidence: "medium",
      },
      overreaching: {
        id: "overreaching",
        cardKey: "overreaching",
        label: "Load management",
        title: "Take one lower-stress training day",
        interpretation: "Rising effort, lower performance, and elevated wearable strain together can indicate that training stress is outpacing recovery.",
        recommendation: "Make the next workout technique-focused: reduce load or sets, keep RPE moderate, and avoid chasing a new best.",
        rationale: "One lower-stress day can preserve the routine while giving performance a chance to rebound.",
        uncertainty: "This is a training-load suggestion, not medical advice. Pain, dizziness, illness, or injury concerns should be handled outside the app.",
        confidence: "medium",
      },
    };

    return signals
      .map((signal) => {
        const template = signalTemplates[signal?.id];
        if (!template) return null;
        return {
          ...template,
          observation: signal.evidence || "Not enough logged evidence for this signal.",
          priority: recommendationPriority[signal.id] || 0,
          sourceSignal: signal.label || template.label,
          dataWindow: context.currentPeriodSummary?.range || "recent logged data",
        };
      })
      .filter(Boolean)
      .sort((a, b) => b.priority - a.priority)
      .slice(0, 3);
  }

  function recordingTitleForDate(workoutName, date = new Date()) {
    const safeName = workoutName || "Workout";
    const month = new Intl.DateTimeFormat("en", { month: "short" }).format(date);
    return `${month} ${date.getDate()} · ${safeName}`;
  }

  function formatWorkoutSet(exercise, set, weightUnit = "lb") {
    const load = set?.weight ? `${set.weight} ${weightUnit}` : "bodyweight";
    const distance = set?.distance ? `${set.distance}` : "";
    const rawDuration = set?.duration ? `${set.duration}` : "";
    const duration = rawDuration && /^\d+(\.\d+)?$/.test(rawDuration) ? `${rawDuration} min` : rawDuration;
    const rawReps = String(set?.reps || "");
    const shouldAppendReps = rawReps && /^\d+(\.\d+)?$/.test(rawReps);
    const reps = rawReps ? `${rawReps}${shouldAppendReps ? " reps" : ""}` : "completed";
    const rpe = set?.rpe ? `RPE ${set.rpe}` : "logged";
    if (distance || duration) {
      const work = [distance, duration].filter(Boolean).join(" · ");
      return `${exercise?.name || "Exercise"} · ${work || "completed"} · ${rpe}`;
    }
    return `${exercise?.name || "Exercise"} · ${load} · ${reps} · ${rpe}`;
  }

  function formatWorkoutSetDetail(set, weightUnit = "lb") {
    return formatWorkoutSet({ name: "Exercise" }, set, weightUnit).replace(/^Exercise · /, "");
  }

  function formatSetCountLabel(count, fallback = 1) {
    const safeCount = Number(count) || fallback;
    return `${safeCount} set${safeCount === 1 ? "" : "s"}`;
  }

  function buildWorkoutRecording({
    workoutName = "Workout",
    exercises = [],
    minutes = 1,
    calories = 0,
    weightUnit = "lb",
    date = new Date(),
    focusGroup = "",
  } = {}) {
    const safeExercises = exercises.length ? exercises : [{ name: "Workout", sets: [{ complete: false }] }];
    const completeSetCount = safeExercises.reduce((count, exercise) => {
      return count + (exercise.sets || []).filter((set) => set.complete).length;
    }, 0);
    const setLines = safeExercises.flatMap((exercise) => {
      const sets = exercise.sets || [];
      const completedSets = sets.filter((set) => set.complete);
      const setsToRecord = completedSets.length ? completedSets : sets.slice(0, 1);
      return setsToRecord.map((set) => formatWorkoutSet(exercise, set, weightUnit));
    });

    return {
      date: date.toISOString(),
      focusGroup,
      title: recordingTitleForDate(workoutName, date),
      meta: `${safeExercises.length} exercises · ${completeSetCount || 1} sets · ${minutes || 1} min · ${calories || 0} kcal`,
      sets: setLines,
    };
  }

  const api = {
    buildAiCoachContext,
    buildAiCoachRecommendations,
    buildWorkoutRecording,
    comparisonText,
    convertDistanceValue,
    convertHeightValue,
    convertMeasurementValue,
    convertWeightValue,
    dataSourceLabel,
    exerciseTrendDataPoints,
    formatCompactNumber,
    formatMinutes,
    formatSetCountLabel,
    loggedWorkoutDurationMinutes,
    localDateString,
    goalDriftForGlutePriority,
    goalSupportsGlutePriority,
    goalSupportsProgression,
    validMetricDateValue,
    normalizeExerciseName,
    numberFromMeta,
    parseRecordingSetLine,
    periodBounds,
    progressionReadinessForExercise,
    rangeLabel,
    bodyMetricSourceSummary,
    bodyMetricSourcesForEntry,
    recentRecordingsForAiContext,
    trainingGoalProfile,
    recordingDate,
    recordingDateOrNull,
    recordingLineMatchesExercise,
    recordingMuscleGroup,
    recordingTitleForDate,
    recordingsInRange,
    setDurationMinutes,
    formatWorkoutSetDetail,
    formatWorkoutSet,
    workoutCalories,
    workoutMinutes,
    workoutSessionMinutes,
  };

  root.LiftTrendDomain = api;
  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  }
})(typeof globalThis !== "undefined" ? globalThis : window);
