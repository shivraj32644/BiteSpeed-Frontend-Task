import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

const ThemeToggle=() => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <button onClick={toggleTheme} className="py-2 px-4 bg-neutral-200  rounded">
      {theme === 'light' ? <Moon className='h-4 w-4 text-black'/> : <Sun className='h-4 w-4 text-black'/>}
    </button>
  );
};

export default ThemeToggle;
