export type ModelYearValue = string;

export type ModelYearTuple = [
  ModelYearValue, // MY21
  ModelYearValue, // MY22 pre-Mar
  ModelYearValue, // MY22 post-Mar
  ModelYearValue, // MY23
  ModelYearValue, // MY24
  ModelYearValue, // MY25
  ModelYearValue, // MY26
];

export interface Feature {
  name: string;
  values: ModelYearTuple;
  notes?: string;
}

export interface Category {
  id: string;
  title: string;
  features: Feature[];
}

export interface PaintColor {
  name: string;
  polestarCode: string;
  volvoName: string;
  volvoCode: string;
  hex: string;
  values: ModelYearTuple;
  isMetallic: boolean;
  replacedBy?: string;
  notes?: string;
}
