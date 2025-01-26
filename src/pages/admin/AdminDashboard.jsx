import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const [adminRole, setAdminRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkAdminRole();
  }, []);

  const checkAdminRole = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      const { data: adminData, error } = await supabase
        .from('admin_roles')
        .select('role, admin_permissions(*)')
        .eq('user_id', user.id)
        .single();

      if (error) throw error;
      setAdminRole(adminData);
    } catch (err) {
      console.error('Error checking admin role:', err);
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  const menuItems = [
    {
      title: 'Users',
      description: 'Manage user accounts and permissions',
      path: '/admin/users',
      allowed: adminRole.role === 'super_admin' || adminRole.admin_permissions.can_manage_users
    },
    {
      title: 'Transactions',
      description: 'Process deposits and withdrawals',
      path: '/admin/transactions',
      allowed: adminRole.role === 'super_admin' || adminRole.admin_permissions.can_process_transactions
    },
    {
      title: 'Balance Management',
      description: 'Modify user account balances',
      path: '/admin/balances',
      allowed: adminRole.role === 'super_admin' || adminRole.admin_permissions.can_modify_balance
    },
    {
      title: 'Reports',
      description: 'View system reports and analytics',
      path: '/admin/reports',
      allowed: adminRole.role === 'super_admin' || adminRole.admin_permissions.can_view_reports
    }
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems.map((item, index) => (
          item.allowed && (
            <div
              key={index}
              className="bg-[#1A1A1A] p-6 rounded-lg cursor-pointer hover:bg-[#2A2A2A] transition-colors"
              onClick={() => navigate(item.path)}
            >
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-400">{item.description}</p>
            </div>
          )
        ))}
      </div>
    </div>
  );
}