import React from "react";
import { DataGrid } from '@material-ui/data-grid';

const rows = [
  {
    id: 1, 
    status: 'All booked',
    name: 'Bellinis in Armenia',
    origin: 'Italy',
    days: '7',
    date: 'Jan 28-Feb 11',
    destination: 'Yerevan, Sevan, Dilijan',
    guests: 'Marco Belini, Chiara Belini',
    hotels: 'Noy Land, Popock 1',
    activities: 'Yell Park, Papanino',
    flight: 'QR 706',
    price: '$5400',
    notes: 'Very picky person',
    createdBy: 'Armine G',
   },
   {
    id: 1, 
    status: 'All booked',
    name: 'Bellinis in Armenia',
    origin: 'Italy',
    days: '7',
    date: 'Jan 28-Feb 11',
    destination: 'Yerevan, Sevan, Dilijan',
    guests: 'Marco Belini, Chiara Belini',
    hotels: 'Noy Land, Popock 1',
    activities: 'Yell Park, Papanino',
    flight: 'QR 706',
    price: '$5400',
    notes: 'Very picky person',
    createdBy: 'Armine G',
   },
];

const columns = [
  { field: 'status', headerName: 'Status'},
  { field: 'name', headerName: 'Name', width: 150 },
  { field: 'origin', headerName: 'Origin' },
  { field: 'days', headerName: 'Nr. of days' },
  { field: 'destination', headerName: 'Destination', width: 150 },
  { field: 'date', headerName: 'Dates', width: 150 },
  { field: 'guests', headerName: 'Guests', width: 150 },
  { field: 'hotels', headerName: 'Hotels', width: 150 },
  { field: 'activities', headerName: 'Activities', width: 150 },
  { field: 'flight', headerName: 'Flight' },
  { field: 'price', headerName: 'Price' },
  { field: 'notes', headerName: 'Notes' },
  { field: 'createdBy', headerName: 'Created By' },
];

export default class Tour extends React.Component {
  constructor(props) {
    super(props);
    };

  render() {
    return (
      <div style={{ height: 600, width: '100%', top: '40px' }}>
        <DataGrid rows={rows} columns={columns} />
      </div>
    );
  }
}
