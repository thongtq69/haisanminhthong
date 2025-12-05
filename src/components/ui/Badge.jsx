const Badge = ({ children, color = 'christmas-red', className = '' }) => {
  const colors = {
    'christmas-red': 'bg-christmas-red text-white',
    'ocean-blue': 'bg-ocean-blue text-white',
    'accent-red': 'bg-accent-red text-white',
    'accent-blue': 'bg-accent-blue text-white',
  };
  
  return (
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${colors[color]} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;

