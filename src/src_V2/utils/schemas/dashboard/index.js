export function getDashboardInitialValues(initialValues = {}) {
  const lastThirtyDays = new Date().setMonth(new Date().getMonth() - 1);

  return {
    date: lastThirtyDays,
    ...initialValues,
  };
}
