import React, { useState, useEffect } from 'react';
import handleFetch from '../../../services/api';

function AdminUsersTable() {
  const [users, setUsers] = useState('');
  const [usersList, setUsersList] = useState(users);

  useEffect(() => {
    const getAllUsers = async () => {
      const { data } = await handleFetch();
      setUsers(data);
    };

    const fetchUsers = async () => {
      const filteredUsers = users.filter((user) => user.role !== 'administrator');
      if (filteredUsers !== usersList) {
        setUsersList(filteredUsers);
      }
    };
    getAllUsers();
    fetchUsers();
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Item</th>
          <th>Nome</th>
          <th>Email</th>
          <th>Tipo</th>
          <th>Excluir</th>
        </tr>
      </thead>
      <tbody>
        {usersList.map((user, index) => (
          <tr key={ `${index + 1}-${user.id}` }>
            <td
              data-testid={ `admin_manage__element-user-table-item-number-${index}` }
            >
              {index + 1}
            </td>
            <td
              data-testid={ `admin_manage__element-user-table-name-${index}` }
            >
              {user.name}
            </td>
            <td
              data-testid={ `admin_manage__element-user-table-email-${index}` }
            >
              {user.email}
            </td>
            <td
              data-testid={ `admin_manage__element-user-table-role-${index}` }
            >
              {user.role === 'customer' ? 'Cliente' : 'P. Vendedora'}
            </td>
            <td>
              <button
                type="button"
                data-testid={ `admin_manage__element-user-table-remove-${index}` }
                onClick={ () => handleClick(user.id) }
              >
                Excluir
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default AdminUsersTable;
