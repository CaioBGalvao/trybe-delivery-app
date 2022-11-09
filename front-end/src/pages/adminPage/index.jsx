import React from 'react';
import NewUserRegister from './components/newUserRegister';
import Header from './components/adminHeader';
import AdminUsersTable from './components/adminUsersTable';

function AdminPage() {
  return (
    <div>
      <Header />
      <NewUserRegister />
      <AdminUsersTable />
    </div>
  );
}

export default AdminPage;
