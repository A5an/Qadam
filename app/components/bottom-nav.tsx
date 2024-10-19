'use client';

import React from 'react';

import Link from 'next/link';

import useNavigation from '../hook/use-navigation';
import useScrollingEffect from '../hook/use-scroll';
import { Icon } from '@iconify/react';

const BottomNav = () => {
  const scrollDirection = useScrollingEffect(); // Use the custom hook
  const navClass = scrollDirection === 'up' ? '' : 'opacity-25 duration-500';

  const {
    isHomeActive,
    isExploreActive,
    isNotificationsActive,
    isProfileActive,
    isMapActive,
  } = useNavigation();

  return (
    <div
      className={`fixed bottom-0 w-full py-4 z-10 bg-zinc-100 dark:bg-zinc-950 border-t dark:border-zinc-800 border-zinc-200 shadow-lg ${navClass}`}
    >
      <div className="flex flex-row justify-around items-center bg-transparent w-full">
        <Link href="/" className="flex items-center relative">
          {isHomeActive ? (
            <Icon icon="mdi:learn-outline" width="32" height="32" className="stroke-current stroke-505" />
          ) : (
            <Icon icon="mdi:learn-outline" width="32" height="32" />
          )}
        </Link>
        <Link href="/search" className="flex items-center">
          {isExploreActive ? (
            <Icon
              icon="uil:search"
              width="32"
              height="32"
              className="stroke-current stroke-5"
            />
          ) : (
            <Icon icon="uil:search" width="32" height="32" />
          )}
        </Link>
        <Link href="/map" className="flex items-center">
          {isMapActive ? (
            <Icon icon="mdi:map-outline" width="32" height="32" className="stroke-current stroke-5" />
          ) : (
            <Icon icon="mdi:map-outline" width="32" height="32" />
          )}
        </Link>
        <Link href="/loops" className="flex items-center">
          {isNotificationsActive ? (
            <Icon icon="ri:infinity-fill" width="32" height="32" className="stroke-current stroke-5" />
          ) : (
            <Icon icon="ri:infinity-line" width="32" height="32" />
          )}
        </Link>
        <Link href="/profile" className="flex items-center">
          {isProfileActive ? (
            <Icon icon="iconamoon:profile-fill" width="32" height="32"/>
          ) : (
            <Icon icon="iconamoon:profile-duotone" width="32" height="32" />
          )}
        </Link>
      </div>
    </div>
  );
};

export default BottomNav;