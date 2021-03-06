import StaffActions from "./staff-actions";

export const columns = [
  {
    field: "firstName",
    headerName: "First name",
    flex: 0.25,
  },
  {
    field: "lastName",
    headerName: "Last name",
    flex: 0.25,
  },
  {
    field: "jobTitle",
    headerName: "Title",
    flex: 0.25,
  },
  {
    field: "email",
    headerName: "Email",
    flex: 0.4,
  },
  {
    field: "phoneNumber",
    headerName: "Phone",
    flex: 0.2,
  },
  {
    field: " ",
    headerName: "Actions",
    width: 150,
    renderCell: StaffActions,
  },
];
