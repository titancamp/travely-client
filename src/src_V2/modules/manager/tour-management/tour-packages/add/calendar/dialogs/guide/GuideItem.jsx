//TODO needs to change to correspond design(duplicated for demo)
import { AccessTime, Person, Phone } from '@mui/icons-material';
import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

import { CardItem, DetailsHeaderItem } from '../component';
import { AccommodationDetails } from '../constants';
import { Accommodation as AccommodationMock } from '../mock';
import styles from './styles.module.css';

export default function GuideItem({ data, expandCollapse, expanded }) {
  return (
    <>
      <CardItem expanded={expanded} action={expandCollapse} data={data} />
      {expanded === data.id && (
        <div className={styles.itemExpandedContainer}>
          <div className={styles.itemExpanded}>
            <DetailsHeaderItem
              Icon={AccessTime}
              content='12:00 / 2:00'
              title='Check In / Check Out'
            />
            <DetailsHeaderItem Icon={Phone} title='Phone' content='+374 11 11 11 11' />
            <DetailsHeaderItem Icon={Person} title='Contact Person' content='John Doe' />
          </div>

          <TableContainer>
            <MuiTable>
              <TableHead className={styles.tableHead}>
                <TableRow className={styles.tableHeadRow}>
                  {AccommodationDetails.head.map(({ content }, index) => (
                    <TableCell key={index} variant='head' size='small'>
                      {content}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {AccommodationMock.details.map((data) => (
                  <TableRow onClick={() => {}} key={data.id} className={styles.tableRow}>
                    <TableCell variant='body' size='small'>
                      {data.type}
                    </TableCell>
                    <TableCell variant='body' size='small'>
                      {data.price}
                    </TableCell>
                    <TableCell variant='body' size='small'>
                      {data.qty}
                    </TableCell>
                    <TableCell variant='body' size='small'>
                      {data.beds}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </MuiTable>
          </TableContainer>
        </div>
      )}
      {/*{true && <LinearProgress />}*/}
    </>
  );
}
