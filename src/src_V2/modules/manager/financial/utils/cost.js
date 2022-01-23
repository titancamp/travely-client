import { actualCostMaxValue } from '../constants';

const actualCostValidCondition = (actualCost) =>
  actualCost > actualCostMaxValue || actualCost < 0;

export const actualCountedCost = (actualCost) => {
  if (actualCostValidCondition(actualCost)) {
    return '-';
  }
  return actualCost;
};

export const differenceCost = (plannedCost, actualCost) => {
  if (actualCostValidCondition(actualCost)) {
    return '-';
  }
  return plannedCost - actualCost;
};

export const remainingCost = (actualCost, paidCost) => {
  if (actualCostValidCondition(actualCost)) {
    return '-';
  }
  return actualCost - paidCost;
};
