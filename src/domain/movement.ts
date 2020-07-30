import { Muscles } from "./muscles"

export interface Movement {
  name: string
  muscles: Partial<Record<Muscles, number>>
}

const movementsInternal: Array<Movement> = [
  {
    name: "Back Squat",
    muscles: {
      quads: 1,
      hamstrings: 0.5,
      glutes: 0.5,
    },
  },

  {
    name: "Leg Press",
    muscles: {
      quads: 1,
      hamstrings: 0.5,
      glutes: 0.5,
    },
  },
  {
    name: "Glute Ham Raise",
    muscles: {
      hamstrings: 1.0,
      glutes: 1.0,
    },
  },

  {
    name: "Leg Curl",
    muscles: {
      hamstrings: 1.0,
    },
  },

  {
    name: "Leg Extension",
    muscles: {
      quads: 1.0,
    },
  },

  {
    name: "Calf Raise",
    muscles: {
      calves: 1.0,
    },
  },

  {
    name: "Barbell Hip Thrust",
    muscles: {
      glutes: 1.0,
    },
  },

  {
    name: "Bench Press",
    muscles: {
      chest: 1.0,
      triceps: 0.5,
      anteriorDelt: 0.5,
    },
  },

  {
    name: "Dumbell Incline Press",
    muscles: {
      chest: 1.0,
      triceps: 0.5,
      anteriorDelt: 0.5,
    },
  },

  {
    name: "Overhead Press",
    muscles: {
      anteriorDelt: 1.0,
      chest: 0.5,
      triceps: 0.5,
    },
  },

  {
    name: "Cable Crossover",
    muscles: {
      chest: 1.0,
      anteriorDelt: 0.5,
      triceps: 0.5,
    },
  },

  {
    name: "Dip",
    muscles: {
      chest: 1.0,
      anteriorDelt: 0.5,
      triceps: 0.5,
    },
  },

  {
    name: "Cable Lateral Raise",
    muscles: {
      lateralDelt: 1.0,
    },
  },
  {
    name: "Dumbell Lateral Raise",
    muscles: {
      lateralDelt: 1.0,
    },
  },

  {
    name: "Tricep Pushdown",
    muscles: {
      triceps: 1.0,
    },
  },

  {
    name: "Machine Tricep Extension",
    muscles: {
      triceps: 1.0,
    },
  },

  {
    name: "Overhead Tricep Extension",
    muscles: {
      triceps: 1.0,
    },
  },

  {
    name: "Pullup",
    muscles: {
      lats: 1.0,
      biceps: 0.5,
    },
  },

  {
    name: "Supinated Pullup",
    muscles: {
      lats: 1.0,
      biceps: 0.5,
    },
  },

  {
    name: "Pendalay Row",
    muscles: {
      upperBack: 1.0,
      lats: 0.5,
    },
  },

  {
    name: "One Arm Row",
    muscles: {
      lats: 1.0,
      upperBack: 0.5,
    },
  },

  {
    name: "Pullover",
    muscles: {
      lats: 1.0,
    },
  },

  {
    name: "Seated Row",
    muscles: {
      upperBack: 1.0,
      lats: 0.5,
    },
  },

  {
    name: "45° Supinated Pulldown",
    muscles: {
      lats: 1.0,
      upperBack: 0.5,
      biceps: 0.5,
    },
  },

  {
    name: "Hammer Curl",
    muscles: {
      biceps: 1.0,
    },
  },

  {
    name: "Preacher Curl",
    muscles: {
      biceps: 1.0,
    },
  },

  {
    name: "Incline Dumbell Curl",
    muscles: {
      biceps: 1.0,
    },
  },

  {
    name: "Rear delt fly",
    muscles: {
      posteriorDelt: 1.0,
      upperBack: 0.5,
    },
  },
  {
    name: "Facepull",
    muscles: {
      posteriorDelt: 1.0,
      upperBack: 0.5,
    },
  },

  {
    name: "Trap Bar Shrug",
    muscles: {
      traps: 1.0,
    },
  },

  {
    name: "Barbell Shrug",
    muscles: {
      traps: 1.0,
    },
  },

  {
    name: "Hanging Leg Raise",
    muscles: {
      abs: 1.0,
    },
  },

  {
    name: "Cable Crunches",
    muscles: {
      abs: 1.0,
    },
  },
  {
    name: "Romain Deadlift",
    muscles: {
      hamstrings: 1.0,
      glutes: 1.0,
    },
  },

  {
    name: "Deadlift",
    muscles: {
      hamstrings: 1.0,
      glutes: 1.0,
    },
  },
]

export type Movements = Map<string, Movement>
export const movements: Movements = new Map(movementsInternal.map(it => [it.name, it]))
