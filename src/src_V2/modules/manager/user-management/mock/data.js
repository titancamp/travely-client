export const mockUserManagementData = [
  {
    id: 0,
    name: 'Theresa Webb',
    position: 'Tour Manager',
    email: 'chrwin@me.com',
    phone: '+37460555555',
    status: 'Pending',
    permissions: {
      templates: 1,
      packages: 3,
      receivable: 0,
      payable: 1,
    },
  },
  {
    id: 1,
    name: 'Wade Warren',
    position: 'Tour Manager',
    email: 'shaffei@me.com',
    phone: '+37460555555',
    status: 'Active',
    permissions: {
      templates: 1,
      packages: 3,
      receivable: 0,
      payable: 1,
    },
  },
  {
    id: 2,
    name: 'Brooklyn Simmons',
    position: 'Tour Manager',
    email: 'dbrobins@outlook.com',
    phone: '+37460555555',
    status: 'Active',
    permissions: {
      templates: 1,
      packages: 3,
      receivable: 0,
      payable: 1,
    },
  },
  {
    id: 3,
    name: 'Ronald Richards',
    position: 'Tour Manager',
    email: 'iapetus@aol.com',
    phone: '+37460555555',
    status: 'Pending',
    permissions: {
      templates: 1,
      packages: 3,
      receivable: 0,
      payable: 1,
    },
  },
  {
    id: 4,
    name: 'Brooklyn Simmons',
    position: 'Tour Manager',
    email: 'seasweb@me.com',
    phone: '+37460555555',
    status: 'Active',
    permissions: {
      templates: 1,
      packages: 3,
      receivable: 0,
      payable: 1,
    },
  },
  {
    id: 5,
    name: 'Theresa Webb',
    position: 'Tour Manager',
    email: 'chrwin@me.com',
    phone: '+37460555555',
    status: 'Inactive',
    permissions: {
      templates: 1,
      packages: 3,
      receivable: 0,
      payable: 1,
    },
  },
  {
    id: 6,
    name: 'Wade Warren',
    position: 'Tour Manager',
    email: 'shaffei@me.com',
    phone: '+37460555555',
    status: 'Inactive',
    permissions: {
      templates: 1,
      packages: 3,
      receivable: 0,
      payable: 1,
    },
  },
  {
    id: 7,
    name: 'Brooklyn Simmons',
    position: 'Tour Manager',
    email: 'dbrobins@outlook.com',
    phone: '+37460555555',
    status: 'Inactive',
    permissions: {
      templates: 1,
      packages: 3,
      receivable: 0,
      payable: 1,
    },
  },
  {
    id: 8,
    name: 'Ronald Richards',
    position: 'Tour Manager',
    email: 'iapetus@aol.com',
    phone: '+37460555555',
    status: 'Inactive',
    permissions: {
      templates: 1,
      packages: 3,
      receivable: 0,
      payable: 1,
    },
  },
  {
    id: 9,
    name: 'Brooklyn Simmons',
    position: 'Tour Manager',
    email: 'seasweb@me.com',
    phone: '+37460555555',
    status: 'Inactive',
    permissions: {
      templates: 1,
      packages: 3,
      receivable: 0,
      payable: 1,
    },
  },
];

export const actionLevels = {
  view: 1,
  edit: 2,
};

export const resources = {
  templates: 'Tour Templates',
  packages: 'Tour Packages',
  receivable: 'Receivable Financial Information',
  payable: 'Payable Financial Information',
};

export const mockResourceDescription = {
  templates:
    'Having "View" checked, user will be able to view all suppliers and tour templates. Having "Edit" checked, "View" permission will be automatically checked and user will not only be able to view all suppliers and tour templates but also create them.',
  packages:
    'Having "Edit" permission checked, "View" permission for "Tour Templates" permission will be automatically checked. Having "View" checked for "Tour Packages", user will be able to view all tour packages. Having "Edit" checked, "View" permission will be automatically checked and user will not only be able to view all tour packages but also create them.',
  receivable:
    'Having "View" checked, user will be able to view receivables. Having "Edit" checked, "View" permission will be automatically checked and user will not only be able to view all receivables but also create them.',
  payable:
    'Having "View" checked, user will be able to view payables. Having "Edit" checked, "View" permission will be automatically checked and user will not only be able to view all payables but also create them.',
};
