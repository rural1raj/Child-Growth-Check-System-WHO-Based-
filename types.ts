
export enum Gender {
  BOY = 'MALE',
  GIRL = 'FEMALE'
}

export enum GrowthStatus {
  NORMAL = 'NORMAL',
  SLIGHTLY_LOW = 'SLIGHTLY_LOW',
  VERY_LOW = 'VERY_LOW'
}

export interface GrowthDataPoint {
  ageInMonths: number;
  weightMedian: number;
  heightMedian: number;
}

export interface GrowthReference {
  [Gender.BOY]: GrowthDataPoint[];
  [Gender.GIRL]: GrowthDataPoint[];
}

export interface CalculationResult {
  medianWeight: number;
  medianHeight: number;
  weightStatus: GrowthStatus;
  heightStatus: GrowthStatus;
}
