export const differenceCost = (plannedCost, actualCost) => {
  if (typeof plannedCost !== 'number' || typeof actualCost !== 'number') {
    return 0;
  }
  return plannedCost - actualCost;
};

export const remainingCost = (actualCost, paidCost) => {
  if (typeof actualCost !== 'number' || typeof paidCost !== 'number') {
    return 0;
  }
  return actualCost - paidCost;
};
