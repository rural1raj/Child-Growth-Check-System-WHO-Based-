
import { GROWTH_DATA } from './constants';
import { Gender, GrowthStatus, CalculationResult } from './types';

export const getInterpolatedMedian = (gender: Gender, age: number): { weight: number, height: number } => {
  const data = GROWTH_DATA[gender];
  
  // Find surrounding data points
  let lowerIdx = 0;
  for (let i = 0; i < data.length; i++) {
    if (data[i].ageInMonths <= age) {
      lowerIdx = i;
    } else {
      break;
    }
  }
  
  const upperIdx = Math.min(lowerIdx + 1, data.length - 1);
  
  if (lowerIdx === upperIdx) {
    return {
      weight: data[lowerIdx].weightMedian,
      height: data[lowerIdx].heightMedian
    };
  }
  
  const p1 = data[lowerIdx];
  const p2 = data[upperIdx];
  
  // Linear interpolation formula: y = y1 + (x - x1) * (y2 - y1) / (x2 - x1)
  const ratio = (age - p1.ageInMonths) / (p2.ageInMonths - p1.ageInMonths);
  const weight = p1.weightMedian + ratio * (p2.weightMedian - p1.weightMedian);
  const height = p1.heightMedian + ratio * (p2.heightMedian - p1.heightMedian);
  
  return { weight, height };
};

export const determineStatus = (actual: number, median: number): GrowthStatus => {
  // Simple threshold logic for fieldwork
  const percentage = (actual / median) * 100;
  if (percentage >= 90) return GrowthStatus.NORMAL;
  if (percentage >= 75) return GrowthStatus.SLIGHTLY_LOW;
  return GrowthStatus.VERY_LOW;
};

export const calculateGrowthResult = (
  gender: Gender,
  age: number,
  actualWeight: number,
  actualHeight: number
): CalculationResult => {
  const medians = getInterpolatedMedian(gender, age);
  
  return {
    medianWeight: medians.weight,
    medianHeight: medians.height,
    weightStatus: determineStatus(actualWeight, medians.weight),
    heightStatus: determineStatus(actualHeight, medians.height)
  };
};
