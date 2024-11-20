import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from './nav.module.scss';
import navJson from './nav.json';
import { searchValueAtom } from '@/store';
import { useAtom } from 'jotai';

interface Nav {
  index: number;
  path: string;
  label: string;
  searchValue: string;
}

function Nav() {
  const [navMenu] = useState<Nav[]>(navJson);
  const [, setSearchValue] = useAtom(searchValueAtom);
  const params = useParams();

  useEffect(() => {
    if (params && params.searchValue) {
      setSearchValue(params.searchValue);
    }
  }, [params, setSearchValue]);

  /** 네비게이션 UI */
  const navLinks = navMenu.map((nav: Nav) => (
    <Link key={`nav-${nav.index}`} to={nav.path}>
      <small
        className={`text-base font-medium leading-10 px-2 py-1 rounded ${
          nav.path === `/search/${params.searchValue}`
            ? 'bg-blue-200'
            : 'bg-transparent'
        }`}
      >
        {nav.label}
      </small>
    </Link>
  ));

  return <nav className={styles.nav}>{navLinks}</nav>;
}

export { Nav };
