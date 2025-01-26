export const adminCredentials = {
  superAdmin: {
    email: 'superadmin@vivstock.com',
    password: 'Vivstock#123!',
    role: 'super_admin',
    permissions: {
      canModifyBalance: true,
      canProcessTransactions: true,
      canManageUsers: true,
      canViewReports: true
    }
  },
  admins: [
    {
      email: 'balance.admin@vivstock.com',
      password: 'Admin123!',
      role: 'balance_admin',
      permissions: {
        canModifyBalance: true,
        canProcessTransactions: false,
        canManageUsers: false,
        canViewReports: true
      }
    },
    {
      email: 'transaction.admin@vivstock.com',
      password: 'Admin123!',
      role: 'transaction_admin',
      permissions: {
        canModifyBalance: false,
        canProcessTransactions: true,
        canManageUsers: false,
        canViewReports: true
      }
    },
    {
      email: 'support.admin@vivstock.com',
      password: 'Admin123!',
      role: 'support_admin',
      permissions: {
        canModifyBalance: false,
        canProcessTransactions: false,
        canManageUsers: true,
        canViewReports: true
      }
    }
  ]
};