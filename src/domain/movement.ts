import { Muscles } from "./muscles"

export interface Movement {
  name: string
  muscles: Partial<Record<Muscles, number>>
}

const backSquat: Movement = {
  name: "Back Squat",
  muscles: {
    quads: 1,
    hamstrings: 0.5,
    glutes: 0.5,
  },
}

const legPress: Movement = {
  name: "Leg Press",
  muscles: {
    quads: 1,
    hamstrings: 0.5,
    glutes: 0.5,
  },
}

const gluteHamRaise: Movement = {
  name: "Glute Ham Raise",
  muscles: {
    hamstrings: 1.0,
    glutes: 1.0,
  },
}

const legCurl: Movement = {
  name: "Leg Curl",
  muscles: {
    hamstrings: 1.0,
  },
}

const legExtension: Movement = {
  name: "Leg Extension",
  muscles: {
    quads: 1.0,
  },
}

const calfRaise: Movement = {
  name: "Calf Raise",
  muscles: {
    calves: 1.0,
  },
}

const barbellHipThrust: Movement = {
  name: "Barbell Hip Thrust",
  muscles: {
    glutes: 1.0,
  },
}

const benchPress: Movement = {
  name: "Bench Press",
  muscles: {
    chest: 1.0,
    triceps: 0.5,
    anteriorDelt: 0.5,
  },
}

const dumbellInclinePress: Movement = {
  name: "Dumbell Incline Press",
  muscles: {
    chest: 1.0,
    triceps: 0.5,
    anteriorDelt: 0.5,
  },
}

const overheadPress: Movement = {
  name: "Overhead Press",
  muscles: {
    anteriorDelt: 1.0,
    chest: 0.5,
    triceps: 0.5,
  },
}

const cableCrossOver: Movement = {
  name: "Cable Crossover",
  muscles: {
    chest: 1.0,
    anteriorDelt: 0.5,
    triceps: 0.5,
  },
}

const dip: Movement = {
  name: "Dip",
  muscles: {
    chest: 1.0,
    anteriorDelt: 0.5,
    triceps: 0.5,
  },
}

const cableLateralRaise: Movement = {
  name: "Cable Lateral Raise",
  muscles: {
    lateralDelt: 1.0,
  },
}

const dumbellLateralRaise: Movement = {
  name: "Dumbell Lateral Raise",
  muscles: {
    lateralDelt: 1.0,
  },
}

const tricepPushdown: Movement = {
  name: "Tricep Pushdown",
  muscles: {
    triceps: 1.0,
  },
}

const tricepExtension: Movement = {
  name: "Machine Tricep Extension",
  muscles: {
    triceps: 1.0,
  },
}

const overheadTricepExtension: Movement = {
  name: "Overhead Tricep Extension",
  muscles: {
    triceps: 1.0,
  },
}

const pullup: Movement = {
  name: "Pullup",
  muscles: {
    lats: 1.0,
    biceps: 0.5,
  },
}

const chinup: Movement = {
  name: "Supinated Pullup",
  muscles: {
    lats: 1.0,
    biceps: 0.5,
  },
}

const pendalayRow: Movement = {
  name: "Pendalay Row",
  muscles: {
    upperBack: 1.0,
    lats: 0.5,
  },
}

const oneArmRow: Movement = {
  name: "One Arm Row",
  muscles: {
    lats: 1.0,
    upperBack: 0.5,
  },
}

const pullover: Movement = {
  name: "Pullover",
  muscles: {
    lats: 1.0,
  },
}

const seatedRow: Movement = {
  name: "Seated Row",
  muscles: {
    upperBack: 1.0,
    lats: 0.5,
  },
}

const supinatedPulldown: Movement = {
  name: "45° Supinated Pulldown",
  muscles: {
    lats: 1.0,
    upperBack: 0.5,
    biceps: 0.5,
  },
}

const hammerCurl: Movement = {
  name: "Hammer Curl",
  muscles: {
    biceps: 1.0,
  },
}

const preacherCurl: Movement = {
  name: "Preacher Curl",
  muscles: {
    biceps: 1.0,
  },
}

const inclineDumbellCurl: Movement = {
  name: "Incline Dumbell Curl",
  muscles: {
    biceps: 1.0,
  },
}

const rearDeltFly: Movement = {
  name: "Rear delt fly",
  muscles: {
    posteriorDelt: 1.0,
    upperBack: 0.5,
  },
}

const facepull: Movement = {
  name: "Facepull",
  muscles: {
    posteriorDelt: 1.0,
    upperBack: 0.5,
  },
}

const trapBarShrug: Movement = {
  name: "Trap Bar Shrug",
  muscles: {
    traps: 1.0,
  },
}

const barbellShrug: Movement = {
  name: "Barbell Shrug",
  muscles: {
    traps: 1.0,
  },
}

const hangingLegRaise: Movement = {
  name: "Hanging Leg Raise",
  muscles: {
    abs: 1.0,
  },
}

const cableCrunches: Movement = {
  name: "Cable Crunches",
  muscles: {
    abs: 1.0,
  },
}

const romainianDeadlift: Movement = {
  name: "Romain Deadlift",
  muscles: {
    hamstrings: 1.0,
    glutes: 1.0,
  },
}

const deadlift: Movement = {
  name: "Deadlift",
  muscles: {
    hamstrings: 1.0,
    glutes: 1.0,
  },
}

export type Movements = keyof typeof movements
export const movements = {
  backSquat,
  legPress,
  gluteHamRaise,
  legCurl,
  legExtension,
  calfRaise,
  barbellHipThrust,
  benchPress,
  overheadPress,
  cableCrossOver,
  dip,
  cableLateralRaise,
  dumbellLateralRaise,
  tricepPushdown,
  tricepExtension,
  overheadTricepExtension,
  pullup,
  chinup,
  pendalayRow,
  oneArmRow,
  pullover,
  seatedRow,
  supinatedPulldown,
  hammerCurl,
  preacherCurl,
  inclineDumbellCurl,
  rearDeltFly,
  facepull,
  trapBarShrug,
  barbellShrug,
  dumbellInclinePress,
  hangingLegRaise,
  cableCrunches,
  romainianDeadlift,
  deadlift,
}
