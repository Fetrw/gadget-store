import { FC, useEffect, useState } from 'react';
import { MobileHeader } from './MobileHeader/MobileHeader';
import { DesktopHeader } from './DesktopHeader/DesktopHeader';

import './Header.scss';

export const Header: FC = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (width < 640) {
    return <MobileHeader />;
  }

  return <DesktopHeader />;
};
