import { DatePicker } from '@mui/lab';
import { Box, Divider, Grid, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { Line, XAxis, LineChart, YAxis, CartesianGrid } from 'recharts';
import {getDashboardInitialValues} from "src/src_V2/utils/schemas/dashboard";
import styles from './Dashboard.module.css';

const MOCK_DATA = [
  { year: 2016, income: 1500, expense: 2000 },
  { year: 2017, income: 2500, expense: 2200 },
  { year: 2018, income: 3500, expense: 2500 },
  { year: 2019, income: 4500, expense: 3000 },
  { year: 2020, income: 5500, expense: 4000 },
  { year: 2021, income: 6500, expense: 5000 },
];

export default function Dashboard() {

  const { values, handleChange } = useFormik({
    initialValues: getDashboardInitialValues(),
  });

  return (
    <Grid container direction='column' rowSpacing={5} className={styles.container}>
      <Grid item>
        <Typography variant='h5'>Dashboard</Typography>
      </Grid>
      <Grid item>
        <Grid container spacing={3}>
          <Grid item className={styles.chartContainer}>
            <DatePicker
              onChange={handleChange}
              value={values.date}
              name='date'
              label='Date'
              renderInput={(props) => <TextField {...props} />}
            />
            <Grid container spacing={5} className={styles.charts}>
              <Grid item>
                <Typography fontWeight={500} className={styles.chartTitle}>
                  Income & Expense
                </Typography>
                <LineChart width={320} height={250} data={MOCK_DATA}>
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis dataKey='year' />
                  <YAxis />
                  <Line
                    type='monotone'
                    dataKey='income'
                    stroke='#903FE0'
                    activeDot={{ r: 8 }}
                  />
                  <Line type='monotone' dataKey='expense' stroke='#266EF2' />
                </LineChart>
                <Grid container spacing={6} className={styles.chartColors}>
                  <Grid item className={styles.colorItem}>
                    <Box className={`${styles.chartLineColor} ${styles.lineIncome}`} />
                    <Typography>Income</Typography>
                  </Grid>
                  <Grid item className={styles.colorItem}>
                    <Box className={`${styles.chartLineColor} ${styles.lineExpenses}`} />
                    <Typography>Expenses</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Typography fontWeight={500} className={styles.chartTitle}>
                  Completed & Cancelled Tours
                </Typography>
                <LineChart width={320} height={250} data={MOCK_DATA}>
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis dataKey='year' />
                  <YAxis />
                  <Line
                    type='monotone'
                    dataKey='income'
                    stroke='#3FE0C3'
                    activeDot={{ r: 8 }}
                  />
                  <Line type='monotone' dataKey='expense' stroke='#F226A1' />
                </LineChart>
                <Grid container spacing={6} className={styles.chartColors}>
                  <Grid item className={styles.colorItem}>
                    <Box className={`${styles.chartLineColor} ${styles.lineCompleted}`} />
                    <Typography>Completed</Typography>
                  </Grid>
                  <Grid item className={styles.colorItem}>
                    <Box className={`${styles.chartLineColor} ${styles.lineCanceled}`} />
                    <Typography>Cancelled Tours</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container direction='column' rowSpacing={3}>
              <Grid item className={`${styles.analyticsItem} ${styles.ongoingAnalytics}`}>
                <Typography fontWeight={500}>Ongoing Tours</Typography>
                <Divider className={styles.divider} />
                <Typography variant='h4'>40</Typography>
              </Grid>
              <Grid
                item
                className={`${styles.analyticsItem} ${styles.upcomingAnalytics}`}
              >
                <Typography fontWeight={500}>Upcoming Tours</Typography>
                <Divider className={styles.divider} />
                <Typography variant='h4'>12</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
