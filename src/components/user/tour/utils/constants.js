export const TOUR_COLUMNS = [
  // { field: "status", headerName: "Status" },
  { field: "name", headerName: "Name", width: 300 },
  { field: "origin", headerName: "Origin", width: 300 },
  // { field: "days", headerName: "Nr. of days" },
  // { field: "destination", headerName: "Destination", width: 150 },
  { field: "startDate", headerName: "Start Date", width: 300 },
  { field: "endDate", headerName: "End dates", width: 300 },
  // { field: "guests", headerName: "Guests", width: 150 },
  // { field: "hotels", headerName: "Hotels", width: 150 },
  // { field: "activities", headerName: "Activities", width: 150 },
  // { field: "flight", headerName: "Flight" },
  // { field: "price", headerName: "Price" },
  { field: "notes", headerName: "Notes", width: 300 },
  // { field: "createdBy", headerName: "Created By" },
];

export const TOUR_ROWS = [
  {
    id: 1,
    status: "All booked",
    name: "Bellinis in Armenia",
    origin: "Italy",
    days: "7",
    date: "Jan 28-Feb 11",
    destination: "Yerevan, Sevan, Dilijan",
    guests: "Marco Belini, Chiara Belini",
    hotels: "Noy Land, Popock 1",
    activities: "Yell Park, Papanino",
    flight: "QR 706",
    price: "$5400",
    notes: "Very picky person",
    createdBy: "Armine G",
  },
  {
    id: 2,
    status: "All booked",
    name: "Bellinis in Armenia",
    origin: "Italy",
    days: "7",
    date: "Jan 28-Feb 11",
    destination: "Yerevan, Sevan, Dilijan",
    guests: "Marco Belini, Chiara Belini",
    hotels: "Noy Land, Popock 1",
    activities: "Yell Park, Papanino",
    flight: "QR 706",
    price: "$5400",
    notes: "Very picky person",
    createdBy: "Armine G",
  },
];

export const RECENT_TOURS = [
  {
    id: 1,
    title: "Bellinis in Armenia",
    path: "/user/tour",
  },
  {
    id: 2,
    title: "John Smith Family Armenia",
    path: "/user/tour",
  },
  {
    id: 3,
    title: "Gambini Family Armenia History",
    path: "/user/tour",
  },
];

export const GUESTS_COLUMNS = [
  { field: "firstName", headerName: "First name", width: 150 },
  { field: "lastName", headerName: "Last name", width: 150 },
  { field: "phoneNumber", headerName: "Phone", width: 150 },
  { field: "email", headerName: "Email", width: 150 },
  { field: "dateOfBirth", headerName: "Date of birth", width: 150 },
  { field: "placeOfBirth", headerName: "Place of birth", width: 150 },
  { field: "passportNumber", headerName: "Passport", width: 150 },
  { field: "issuedBy", headerName: "Issued by", width: 150 },
  { field: "issuedDate", headerName: "Issue date", width: 150 },
  { field: "expireDate", headerName: "Expire date", width: 150 },
  { field: "notes", headerName: "Notes", width: 150 },
];

export const GUESTS_ROWS = [
  {
    id: 1,
    firstName: "Artur",
    lastName: "Vahanyan",
    phone: "099009800",
    email: "artur.va@gmail.com",
    dateOfBirth: "Jan 28-Feb 11",
    placeOfBirth: "Chishineu",
    passportNumber: "AN23478326",
    issuedBy: "004",
    issueDate: "02.02.16",
    expirationDate: "02.02.26",
    notes: "ababscjfbwjsvc",
  },
  {
    id: 2,
    firstName: "Valod",
    lastName: "Hakobyan",
    phone: "0990098001",
    email: "artur.va@gmail.com1",
    dateOfBirth: "Jan 28-Feb 12",
    placeOfBirth: "Chishineu1",
    passportNumber: "AN234783261",
    issuedBy: "0044",
    issueDate: "02.02.15",
    expirationDate: "02.02.25",
    notes: "ascasc",
  },
];

export const ACTIVITIES_COLUMNS = [
  { field: "activityName", headerName: "Activity name", width: 150 },
  { field: "date", headerName: "Date", width: 150 },
  { field: "time", headerName: "Time", width: 150 },
  { field: "numberOfGuests", headerName: "Number of guests", width: 150 },
  { field: "status", headerName: "Status", width: 150 },
  { field: "notes", headerName: "Notes", width: 150 },
];

export const ACTIVITIES_ROWS = [
  {
    id: 1,
    destinations: "Dilijan",
    activityName: "Kchuch",
    date: "05/02/2021",
    time: "14:14",
    numberOfGuests: "14",
    status: "Booked",
    notes: "order has been placed",
  },
];

export const TRANSPORTATION_COLUMNS = [
  { field: "destination", headerName: "Destination" },
  { field: "companyName", headerName: "Company name" },
  { field: "startDate", headerName: "Start Date" },
  { field: "endDate", headerName: "End Date" },
  { field: "hotelName", headerName: "Hotel Information" },
  { field: "driverName", headerName: "Driver Name" },
  { field: "carModel", headerName: "Car Type/Model" },
];

export const TRANSPORTATION_ROWS = [
  {
    id: 1,
    destination: "Dilijan",
    companyName: "Art tour",
    startDate: "05/02/2021",
    endDate: "05/12/2021",
    hotelName: "Ararat resort",
    driverName: "Ashot",
    carModel: "Mercedes",
  },
];

export const ASSIGN_TOUR_GUIDE_COLUMNS = [
  { field: "destination", headerName: "Destination", width: 150 },
  { field: "activityName", headerName: "Activity name", width: 150 },
  { field: "date", headerName: "Date", width: 150 },
  { field: "guideName", headerName: "Tour Guide Name", width: 150 },
  { field: "notes", headerName: "Notes", width: 150 },
];

export const ASSIGN_TOUR_GUIDE_ROWS = [
  {
    id: 1,
    destination: "Dilijan",
    activityName: "lavash baking",
    date: "05/02/2021",
    tourGuideName: "Armenuhi Voskanyan",
    hotelName: "Ararat resort",
    notes: "some notes",
  },
];

export const HOTEL_COLUMNS = [
  { field: "destination", headerName: "Destination", width: 200 },
  { field: "hotelName", headerName: "Hotel name", width: 200 },
  { field: "checkinDate", headerName: "Checkin Date", width: 200 },
  { field: "checkoutDate", headerName: "Checkout Date", width: 200 },
  { field: "cancellationDate", headerName: "Cancellation Date", width: 200 },
  { field: "bookingState", headerName: "Booking State", width: 200 },
  { field: "contactPerson", headerName: "Contact Person", width: 200 },
];

export const HOTEL_ROWS = [
  {
    id: 1,
    destination: "Dilijan",
    hotelName: "Ibis Yerevan",
    checkinDate: "05/02/2021",
    checkoutDate: "05/12/2021",
    cancellationDate: "05/12/2021",
    address: "North Avenue",
    rooms: "Double - 1",
    bookingState: "booked",
    contactPerson: "Armenuhi Voskanyan",
  },
];
