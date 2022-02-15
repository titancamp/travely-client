import { ExpandMore } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  FormControl,
  InputAdornment,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';

import { moneyMask } from '../../../../../../utils';
import { useScrollIntoView } from '../../../../../../utils/hooks';
import { columns, currencyList } from './constants';
import fakeData from './mock';
import styles from './style.module.css';
import { ArrayGroup, ArraySum } from './utils';

export default function FinanceSummary() {
  const [fakeDataGroup, setFakeDataGroup] = useState({});
  const [totalCost, setTotalCost] = useState(0);
  const [summary, setSummary] = useState({
    margin: 0,
    amount: 0,
    currency: 'AMD',
    rate: {
      AMD: 1,
      USD: 480,
      RUR: 6,
      EUR: 550,
      GBP: 655,
      AED: 130,
    },
  });
  const [totalPrice, setTotalPrice] = useState(totalCost + summary.amount);
  const [isAccordionExpanded, setIsAccordionExpanded] = useState({});

  useEffect(() => {
    countCosts();
    groupData();
  }, []);

  const groupData = () => {
    const newFakeDataGroup = {};
    const accordionExpanded = {};

    for (const key in data) {
      if ('Trasnportations' === key || 'Guides' === key) {
        newFakeDataGroup[key] = [{ name: null, items: data[key] }];
      } else {
        newFakeDataGroup[key] = ArrayGroup(data[key], 'name');
      }
      accordionExpanded[key] = false;
    }

    setIsAccordionExpanded(accordionExpanded);
    setFakeDataGroup(newFakeDataGroup);
  };

  const countCosts = () => {
    let cost = 0;
    for (const key in data) {
      cost += ArraySum(data[key], 'totalCost');
    }

    setTotalCost(cost);
    setTotalPrice(cost + +summary.amount);
  };

  const inSummaryChanges = (name, { target: { value, type } }) => {
    let { amount, margin /* rate */ } = summary;
    let newTotalPrice = totalCost + +summary.amount;

    const newSummary = { ...summary };
    let rate = newSummary.rate[newSummary.currency];

    if ('number' === type) {
      switch (name) {
        case 'margin':
          margin = value;
          amount = ((totalCost * value) / 100).toFixed(2);
          newTotalPrice = (totalCost + +amount) / rate;

          break;
        case 'amount':
          amount = value;
          margin = ((amount * 100) / totalCost).toFixed(2);
          newTotalPrice = (totalCost + +amount) / rate;

          break;
        case 'totalPrice':
          newTotalPrice = value;
          amount = newTotalPrice * newSummary.rate[newSummary.currency] - totalCost;
          margin = ((amount * 100) / totalCost).toFixed(2);
      }

      newSummary.margin = margin;
      newSummary.amount = amount;

      if ('rate' === name) {
        rate = value;
        newSummary.rate[newSummary.currency] = rate;

        newTotalPrice = newTotalPrice / rate;
      }
    }

    if ('currency' === name) {
      newTotalPrice = newTotalPrice / newSummary.rate[value];
      newSummary.currency = value;
    }

    setTotalPrice(newTotalPrice);
    setSummary(newSummary);
  };

  const handleAccordionHeaderClick = (key) => {
    setIsAccordionExpanded({
      ...isAccordionExpanded,
      [key]: !isAccordionExpanded[key],
    });
  };

  const fakeDataGroupKeys = Object.keys(fakeDataGroup);
  const data = fakeData || {};
  const accordionRef = Object.keys(fakeData).reduce(
    (acc, groupKey) => ({
      ...acc,
      [groupKey]: useScrollIntoView(isAccordionExpanded[groupKey], {
        behavior: 'smooth',
        block: 'center',
      }),
    }),
    {}
  );

  return (
    <Box className={styles.container}>
      <Box className={styles.contentData}>
        <Box>
          {fakeDataGroupKeys.map((groupKey) => {
            const currency = fakeDataGroup[groupKey][0].items[0].currency;
            const sum = ArraySum(data[groupKey], 'totalCost');

            return (
              <Accordion
                key={groupKey}
                className={styles.accordion}
                ref={accordionRef[groupKey]}
              >
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls='panel1a-content'
                  id='panel1a-header'
                  className={styles.accordionBox}
                  onClick={() => handleAccordionHeaderClick(groupKey)}
                >
                  <Typography className={`${styles.detailsTxt} ${styles.name}`}>
                    {groupKey}{' '}
                    <span className={styles.detailsCount}>
                      ({fakeDataGroup[groupKey].length})
                    </span>
                  </Typography>
                  <Box className={styles.groupTotal}>
                    <Typography className={styles.groupTotal}>
                      Total:{' '}
                      <span>
                        {currency} {moneyMask(sum)}
                      </span>
                    </Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails className={styles.accordionDetails}>
                  {fakeDataGroup[groupKey].map((item, index) => {
                    const groupItems = item.items;
                    const groupColumns = columns[groupKey];
                    const groupColumnKeys = Object.keys(groupColumns);

                    return (
                      <TableContainer
                        className={styles.tableContainer}
                        key={`${groupKey}_${index}`}
                      >
                        <Table style={{ position: 'relative' }}>
                          <TableHead className={styles.tableHead}>
                            {item.name !== null && (
                              <TableRow className={styles.groupRow}>
                                <TableCell
                                  className={styles.tableCell}
                                  colSpan={groupColumnKeys.length}
                                >
                                  <span>
                                    {index + 1}. Name: {item.name}
                                  </span>
                                </TableCell>
                              </TableRow>
                            )}
                            <TableRow>
                              {groupColumnKeys.map((c) =>
                                (item.name !== null && c === 'name') ||
                                c === 'currency' ? null : (
                                  <TableCell key={c}>{groupColumns[c].label}</TableCell>
                                )
                              )}
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {Object.values(groupItems).map((groupItem) => {
                              return (
                                <TableRow
                                  className={styles.tableRow}
                                  key={`${groupItem.id}`}
                                >
                                  {groupColumnKeys.map((columnKey) =>
                                    (item.name !== null && columnKey === 'name') ||
                                    columnKey === 'currency' ? null : (
                                      <TableCell
                                        key={`${groupItem.id}_${columnKey}`}
                                        className={styles.tableCell}
                                      >
                                        {/*todo bad check - instead define column types*/}
                                        {columnKey.toLowerCase().includes('cost')
                                          ? `${groupItem.currency} ${moneyMask(
                                              groupItem[columnKey]
                                            )}`
                                          : groupItem[columnKey]}
                                      </TableCell>
                                    )
                                  )}
                                </TableRow>
                              );
                            })}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    );
                  })}
                </AccordionDetails>
              </Accordion>
            );
          })}
        </Box>
        <Box className={`${styles.contentFooter} ${styles.accordionDetailItems}`}>
          <Box className={`${styles.flex4} ${styles.flex}`}>
            <span>Total</span>
          </Box>
          <Box className={`${styles.flex6} ${styles.flex}`}>
            <Box>
              <span>Total Cost: AMD {moneyMask(totalCost)}</span>
            </Box>
            <Box>
              <span>
                Total Price: AMD {moneyMask(totalPrice * summary.rate[summary.currency])}
              </span>
            </Box>
            <Box>
              <span>Profit: </span>
              <span className={styles.green}>
                AMD {moneyMask(totalPrice * summary.rate[summary.currency] - totalCost)}
              </span>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box className={styles.contentSummary}>
        <Box className={styles.mainBox}>
          <Box className={styles.textDiv}>
            <Box className={`${styles.summaryHeader} ${styles.mainText}`}>
              Price Summary
            </Box>
          </Box>
        </Box>
        <Box className={styles.wrapper}>
          <Accordion className={styles.accordion} expanded>
            <AccordionSummary
              aria-controls='panel1a-content'
              id='panel1a-header'
              className={styles.accordionSummary}
            >
              <Typography className={styles.detailsTxt}>Cost</Typography>
            </AccordionSummary>
            <AccordionDetails className={styles.accordionSummaryDetails}>
              <Box className={styles.accordionDetailItems}>
                <Box>Total Cost:</Box>
                <Box className={styles.accordionDetailTxt}>
                  AMD {moneyMask(totalCost)}
                </Box>
              </Box>
            </AccordionDetails>
          </Accordion>
        </Box>
        <Box className={styles.wrapper}>
          <Accordion className={styles.accordion} expanded>
            <AccordionSummary
              aria-controls='panel1a-content'
              id='panel1a-header'
              className={styles.accordionSummary}
            >
              <Typography className={styles.detailsTxt}>Profit</Typography>
            </AccordionSummary>
            <AccordionDetails className={styles.accordionSummaryDetails}>
              <Box autoComplete='off' className={styles.flexInputs}>
                <FormControl>
                  <TextField
                    label={'Margin'}
                    size='small'
                    variant='outlined'
                    type='number'
                    value={summary.margin}
                    InputProps={{
                      endAdornment: <InputAdornment position='end'>%</InputAdornment>,
                      inputProps: {
                        min: -100,
                        max: 100,
                      },
                    }}
                    onChange={inSummaryChanges.bind(this, 'margin')}
                  />
                </FormControl>
                <TextField
                  label={'Amount'}
                  size='small'
                  variant='outlined'
                  type='number'
                  value={summary.amount}
                  InputProps={{
                    startAdornment: <InputAdornment position='start'>AMD</InputAdornment>,
                    min: -90000000,
                    max: 90000000,
                  }}
                  onChange={inSummaryChanges.bind(this, 'amount')}
                />
              </Box>
            </AccordionDetails>
          </Accordion>
        </Box>
        <Box className={styles.wrapper}>
          <Accordion className={styles.accordion} expanded>
            <AccordionSummary
              aria-controls='panel1a-content'
              id='panel1a-header'
              className={styles.accordionSummary}
            >
              <Typography className={styles.detailsTxt}>Price</Typography>
            </AccordionSummary>
            <AccordionDetails className={styles.accordionSummaryDetails}>
              <Box className={`${styles.accordionDetailItems} ${styles.totalPrice}`}>
                <Box>Total Price:</Box>
                <Box className={styles.accordionDetailTxt}>
                  AMD {moneyMask(totalPrice * summary.rate[summary.currency])}
                </Box>
              </Box>
              <Alert className={styles.alert} severity='warning'>
                Set currency and exchange rate to calculate total price.
              </Alert>
              <Box autoComplete='off' className={styles.flexInputs}>
                <TextField
                  select
                  label={'Currency'}
                  size='small'
                  variant='outlined'
                  value={summary.currency}
                  onChange={inSummaryChanges.bind(this, 'currency')}
                >
                  {currencyList.map((c) => (
                    <MenuItem key={c} value={c}>
                      {c}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  label={'Rate'}
                  size='small'
                  variant='outlined'
                  type='number'
                  value={summary.rate[summary.currency]}
                  onChange={
                    summary.currency === 'AMD'
                      ? null
                      : inSummaryChanges.bind(this, 'rate')
                  }
                />
              </Box>
            </AccordionDetails>
          </Accordion>
        </Box>
        <Box className={styles.wrapper}>
          <Box className={styles.accordionSummaryDetails}>
            <Box className={styles.accordionDetailItems}>
              <Box className={`${styles.summaryHeader} ${styles.mainText}`}>
                Total in {summary.currency}
              </Box>
              <TextField
                size='small'
                variant='outlined'
                type='number'
                value={totalPrice || ''}
                onChange={inSummaryChanges.bind(this, 'totalPrice')}
                inputMode='numeric'
                inputProps={{
                  min: 0,
                  max: 9000000000,
                }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
