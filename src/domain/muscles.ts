export type Muscles = keyof typeof muscles
export const muscles = {
  chest: "Chest",
  upperBack: "Upper Back",
  lats: "Lats",
  biceps: "Biceps",
  triceps: "Triceps",
  anteriorDelt: "Anterior Delt",
  lateralDelt: "Lateral Delt",
  posteriorDelt: "Posterior Delt",
  traps: "Traps",
  quads: "Quads",
  hamstrings: "Hamstring",
  glutes: "Glutes",
  calves: "Calves",
  abs: "Abs",
} as const
