import React from 'react';
import NewUserRegister from './components/newUserRegister';
import Header from './components/adminHeader';
// import AdminUsersTable from './components/AdminUsersTable';

function AdminPage() {
  return (
    <div>
      <Header />
      <NewUserRegister />
    </div>
  );
}

export default AdminPage;
