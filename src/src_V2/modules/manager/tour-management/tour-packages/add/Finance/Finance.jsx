import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  Collapse,
  IconButton,
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
import { ExpandMore, Close } from '@mui/icons-material';
import styles from './style.module.css';

import { useState, useEffect } from 'react';
import fakeData from './mock';
import { ArraySum, ArrayGroup } from './utils';
import { columnTypes, currencyList, columns } from './constants';

export default function FinanceSummary() {
  const [data, setData] = useState(fakeData || {}); // remove fakeData
  const [fakeDataGroup, setFakeDataGroup] = useState({});
  const [totalCost, setTotalCost] = useState(0);
  const [showWarning, setShowWarning] = useState(true);
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

  useEffect(() => {
    let cost = 0;
    for (const key in data) {
      cost += ArraySum(data[key], 'totalCost');
    }

    setTotalCost(cost);
    setTotalPrice(cost + +summary.amount);
  }, [data]);

  //Bad case
  //TODO: find and change only changed fields, instead of new group creation
  useEffect(() => {
    const newFakeDataGroup = {};
    for (const key in data) {
      if ('Transportation' === key || 'Guides' === key) {
        newFakeDataGroup[key] = [{ name: null, items: data[key] }];
      } else {
        newFakeDataGroup[key] = ArrayGroup(data[key], 'name');
      }
    }

    setFakeDataGroup(newFakeDataGroup);
  }, [data]);

  const inSummaryChanges = (name, { target: { value, type } }) => {
    let { amount, margin /* rate */ } = summary;
    let newTotalPrice = totalCost + +summary.amount;

    const newSummary = { ...summary };

    if ('number' === type) {
      switch (name) {
        case 'margin':
          margin = value;
          amount = ((totalCost * value) / 100).toFixed(2);
          newTotalPrice = totalCost + +amount;

          break;
        case 'amount':
          amount = value;
          margin = ((amount * 100) / totalCost).toFixed(2);
          newTotalPrice = totalCost + +amount;

          break;
        case 'totalPrice':
          newTotalPrice = value;
          amount = newTotalPrice * newSummary.rate[newSummary.currency] - totalCost;
          margin = ((amount * 100) / totalCost).toFixed(2);
      }

      newSummary.margin = margin;
      newSummary.amount = amount;

      if ('rate' === name) {
        const rate = newSummary.rate;
        rate[newSummary.currency] = value;

        newTotalPrice = newTotalPrice / value;
      }
    }

    if ('currency' === name) {
      newTotalPrice = newTotalPrice / newSummary.rate[value];
      newSummary.currency = value;
    }

    setTotalPrice(newTotalPrice);
    setSummary(newSummary);
  };

  const inListChanges = (id, groupKey, field, { target: { value } }) => {
    const newData = { ...data };
    const rowData = newData[groupKey].find((i) => i.id === id);
    let groupTotal = 0;

    // let value = target.value;

    // TODO: changes need according to editable data
    switch (groupKey) {
      case 'Activities':
      case 'Foods':
        groupTotal = rowData.costPerGuest * value;
        break;
      default: {
        groupTotal = rowData.costPerDay * value;
      }
    }

    rowData[field] = value;
    rowData.totalCost = groupTotal;

    setData(newData);
  };

  const fakeDataGroupKeys = Object.keys(fakeDataGroup);

  return (
    <Box className={styles.container}>
      <Box className={styles.contentData}>
        <Box>
          {fakeDataGroupKeys.map((k) => {
            const currency = fakeDataGroup[k][0].items[0].currency;
            const sum = ArraySum(data[k], 'totalCost');

            return (
              <Accordion key={k} className={styles.accordion}>
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls='panel1a-content'
                  id='panel1a-header'
                  className={`${styles.accordionBox}`}
                >
                  <Box className={styles.paymentBox}>
                    <Typography className={styles.detailsTxt}>
                      {k}{' '}
                      <span className={styles.detailsCount}>
                        ({fakeDataGroup[k].length})
                      </span>
                    </Typography>
                  </Box>
                  <Box className={styles.groupTotal}>
                    <Typography className={styles.groupTotal}>
                      Total:{' '}
                      <span>
                        {currency} {sum.toFixed(2)}
                      </span>
                    </Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails className={styles.accordionDetails}>
                  {fakeDataGroup[k].map((item, index) => {
                    const groupItems = item.items;
                    const groupColumns = columns[k];
                    const groupColumnKeys = Object.keys(groupColumns);

                    return (
                      <TableContainer
                        className={styles.tableContainer}
                        key={`${k}_${index}`}
                      >
                        <Table style={{ position: 'relative' }}>
                          <TableHead className={styles.tableHead}>
                            {item.name !== null && (
                              <TableRow key={`${k}_${index}`} className={styles.groupRow}>
                                <TableCell
                                  className={`${styles.tableCell} ${styles.tableHeaderCell}`}
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
                                  {groupColumnKeys.map((c) => {
                                    if (
                                      groupColumns[c].type === columnTypes.inputNumber
                                    ) {
                                      return (
                                        <TableCell key={`${groupItem.id}_${c}`}>
                                          <TextField
                                            size='small'
                                            variant='outlined'
                                            type='number'
                                            value={groupItem[c]}
                                            min={0}
                                            max={1000}
                                            onChange={inListChanges.bind(
                                              this,
                                              groupItem.id,
                                              k,
                                              c
                                            )}
                                          />
                                        </TableCell>
                                      );
                                    }

                                    return (item.name !== null && c === 'name') ||
                                      c === 'currency' ? null : (
                                      <TableCell
                                        key={`${groupItem.id}_${c}`}
                                        className={c === 'totalCost' ? styles[c] : null}
                                      >
                                        {c.toLowerCase().includes('cost')
                                          ? `${groupItem.currency} `
                                          : ''}
                                        {groupItem[c]}
                                      </TableCell>
                                    );
                                  })}
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
          <Box className={`${styles.flex5} ${styles.flex}`}>
            <span className={styles.bold}>Total</span>
          </Box>
          <Box className={`${styles.flex5} ${styles.flex}`}>
            <Box>
              <span className={styles.bold}>Total Cost: </span>
              <span>AMD {totalCost.toFixed(2)}</span>
            </Box>
            <Box>
              <span className={styles.bold}>Total Price: </span>
              <span>AMD {(totalPrice * summary.rate[summary.currency]).toFixed(2)}</span>
            </Box>
            <Box>
              <span className={styles.bold}>Profit: </span>
              <span className={styles.green}>
                AMD {(totalPrice * summary.rate[summary.currency] - totalCost).toFixed(2)}
              </span>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box className={styles.contentSummary}>
        <Box className={styles.mainBox}>
          <Box className={styles.textDiv}>
            <Box className={`${styles.payableId} ${styles.mainText}`}>Price Summary</Box>
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
              <Box className={styles.accordionSummaryDetails}>
                <Box className={styles.accordionDetailItems}>
                  <Box>Total Cost:</Box>
                  <Box className={styles.accordionDetailTxt}>AMD {totalCost}</Box>
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
              <Box className={styles.accordionSummaryDetails}>
                <Box autoComplete='off' className={styles.flexInputs}>
                  <TextField
                    label={'Margin'}
                    size='small'
                    variant='outlined'
                    type='number'
                    value={summary.margin}
                    min={-100}
                    max={100}
                    InputProps={{
                      endAdornment: <InputAdornment position='end'>%</InputAdornment>,
                    }}
                    onChange={inSummaryChanges.bind(this, 'margin')}
                  />
                  <TextField
                    label={'Amount'}
                    size='small'
                    variant='outlined'
                    type='number'
                    value={summary.amount}
                    min={-90000000}
                    max={90000000}
                    onChange={inSummaryChanges.bind(this, 'amount')}
                  />
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
              <Typography className={styles.detailsTxt}>Price</Typography>
            </AccordionSummary>
            <AccordionDetails className={styles.accordionSummaryDetails}>
              <Box className={styles.accordionSummaryDetails}>
                <Box className={`${styles.accordionDetailItems} ${styles.totalPrice}`}>
                  <Box>Total Price:</Box>
                  <Box className={styles.accordionDetailTxt}>
                    AMD {(totalPrice * summary.rate[summary.currency]).toFixed(2)}
                  </Box>
                </Box>
                <Collapse in={showWarning}>
                  <Alert
                    severity='warning'
                    action={
                      <IconButton
                        aria-label='close'
                        color='inherit'
                        size='small'
                        onClick={() => {
                          setShowWarning(false);
                        }}
                      >
                        <Close fontSize='inherit' />
                      </IconButton>
                    }
                    sx={{ mb: 2 }}
                  >
                    Set currency and exchange rate to calculate total price.
                  </Alert>
                </Collapse>
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
                    onChange={inSummaryChanges.bind(this, 'rate')}
                  />
                </Box>
              </Box>
            </AccordionDetails>
          </Accordion>
        </Box>
        <Box className={styles.wrapper}>
          <Box className={styles.accordionSummaryDetails}>
            <Box className={styles.accordionDetailItems}>
              <Box className={`${styles.payableId} ${styles.mainText}`}>
                Total in {summary.currency}
              </Box>
              <TextField
                label={'Price'}
                size='small'
                variant='outlined'
                type='number'
                value={totalPrice || ''}
                onChange={inSummaryChanges.bind(this, 'totalPrice')}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
