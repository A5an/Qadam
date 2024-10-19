'use client';

import { useEffect, useState } from 'react';

import { usePathname } from 'next/navigation';

const useNavigation = () => {
  const pathname = usePathname();
  const [isHomeActive, setIsHomeActive] = useState(false);
  const [isExploreActive, setIsExploreActive] = useState(false);
  const [isNotificationsActive, setIsNotificationsActive] = useState(false);
  const [isProfileActive, setIsProfileActive] = useState(false);
  const [isMapActive, setIsMapActive] = useState(false);


  useEffect(() => {
    setIsHomeActive(false);
    setIsExploreActive(false);
    setIsNotificationsActive(false);
    setIsProfileActive(false);
    setIsMapActive(false);

    switch (pathname) {
      case '/':
        setIsHomeActive(true);
        break;
      case '/search':
        setIsExploreActive(true);
        break;
      case '/loops':
        setIsNotificationsActive(true);
        break;
      case '/profile':
        setIsProfileActive(true);
        break;
      case '/map':
        setIsMapActive(true);
        break;
      default:
        // Handle any other cases here
        break;
    }
  }, [pathname]);

  return {
    isHomeActive,
    isExploreActive,
    isNotificationsActive,
    isProfileActive,
    isMapActive,
  };
};

export default useNavigation;