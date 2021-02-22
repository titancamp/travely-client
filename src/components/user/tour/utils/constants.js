import {makeStyles} from "@material-ui/core/styles";
import {DRAWER_WIDTH} from "../../../../utility";

export const TOUR_COLUMNS = [
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

export const TOUR_ROWS = [
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
        id: 2, 
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


export const RECENT_TOURS = [
    {
        id: 1,
        title: 'Bellinis in Armenia',
        path: "/user/tour"
    },
    {
        id: 2,
        title: 'John Smith Family Armenia',
        path: "/user/tour"
    },
    {
        id: 3,
        title: 'Gambini Family Armenia History',
        path: "/user/tour"
    }
];
