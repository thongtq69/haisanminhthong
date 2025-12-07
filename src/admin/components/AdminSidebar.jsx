import { NavLink } from 'react-router-dom';

const AdminSidebar = () => {
  const navItems = [
    { path: '/admin', label: 'Dashboard', icon: '📊' },
    { path: '/admin/products', label: 'Products', icon: '🦀' },
    { path: '/admin/categories', label: 'Categories', icon: '📁' },
  ];

  return (
    <div className="w-64 bg-slate-900 text-slate-100 min-h-screen fixed left-0 top-0">
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-xl font-bold">Admin Panel</h1>
        <p className="text-sm text-slate-400 mt-1">Seafood Crab Shop</p>
      </div>
      <nav className="p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-slate-800 text-white'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`
                }
              >
                <span className="text-xl">{item.icon}</span>
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="absolute bottom-4 left-4 right-4">
        <NavLink
          to="/"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
        >
          <span>←</span>
          <span>Back to Shop</span>
        </NavLink>
      </div>
    </div>
  );
};

export default AdminSidebar;

