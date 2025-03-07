
export const ContactUsColumns = [
  {
    field: "name",
    headerName: "Name",
    width: 230,
  },
  {
    field: "email",
    headerName: "Email",
    width: 250,
  },
  {
    field: "message",
    headerName: "Message",
    width: 400,
  },
  {
    field: "createdAt",
    headerName: "Created At",
    width: 200,
  },
  {
    field: "updatedAt",
    headerName: "Updated At",
    width: 200,
  },
];

export const MailSubs = [
  {
    field: "email",
    headerName: "Email",
    width: 250,
  },
  {
    field: "subscribedAt",
    headerName: "Subscribed At",
    width: 200,
  },
];

export const NGOColumns = [
  {
    field: "name",
    headerName: "NGO Name",
    width: 230,
  },
  {
    field: "registrationNumber",
    headerName: "Registration Number",
    width: 230,
  },
  {
    field: "pincode",
    headerName: "Pincode",
    width: 150,
  },
  {
    field: "contact",
    headerName: "Contact",
    width: 230,
  },
  {
    field: "website",
    headerName: "Website",
    width: 250,
  },
  {
    field: "establishedYear",
    headerName: "Established Year",
    width: 200,
  },
  {
    field: "missionStatement",
    headerName: "Mission Statement",
    width: 370,
  },
  {
    field: "areasOfWork",
    headerName: "Areas of Work",
    width: 370,
  },
];


export const ReportColumns = [
  {
    field: "areaType",
    headerName: "Area Type",
    width: 200,
  },
  {
    field: "pollutionPlace",
    headerName: "Pollution Place",
    width: 250,
  },
  {
    field: "pollutionType",
    headerName: "Pollution Type",
    width: 250,
  },
  {
    field: "city",
    headerName: "City",
    width: 200,
  },
  {
    field: "area",
    headerName: "State",
    width: 200,
  },
  {
    field: "pincode",
    headerName: "Pincode",
    width: 150,
  },
  {
    field: "latitude",
    headerName: "Latitude",
    width: 200,
  },
  {
    field: "longitude",
    headerName: "Longitude",
    width: 200,
  },
  {
    field: "image",
    headerName: "Image URL",
    width: 300,
  },
  {
    field: "status",
    headerName: "Status",
    width: 250,
    type: "singleSelect",
    valueOptions: ["Forwarded to NGO", "Forwarded to Gov", "Rejected"],
    editable: true,
  },
];
