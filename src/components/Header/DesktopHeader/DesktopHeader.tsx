import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';

import '../Header.scss';

type Link = { title: string; link: string };

const NavLinks: FC<{ links: Link[] }> = ({ links }) => (
  <ul className="nav__list">
    {links.map(link => (
      <li className="nav__item" key={link.title}>
        <NavLink to={link.link} className="nav__link">
          {link.title}
        </NavLink>
      </li>
    ))}
  </ul>
);

const Indicator: FC<{
  count: number;
  iconClass: string;
  title: string;
  link: string;
}> = ({ count, iconClass, title, link }) => (
  <NavLink to={link} className="nav__button" title={title}>
    <div className={iconClass}>
      {!!count && <div className="indicator">{count}</div>}
    </div>
  </NavLink>
);

export const DesktopHeader: FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const favorites = useSelector(
    (state: RootState) => state.favorites.favorites,
  );

  const links: Link[] = [
    { title: 'Home', link: '/' },
    { title: 'Phones', link: '/phones' },
    { title: 'Tablets', link: '/tablets' },
    { title: 'Accessories', link: '/accessories' },
  ];

  return (
    <header className="header">
      <NavLink to="/" className="header__logo-link" title="Go to Home page">
        <img src={'/logo.svg'} alt="Nice Gadgets logo" className="logo" />
      </NavLink>

      <nav className="nav">
        <NavLinks links={links} />
        <div className="nav__buttons">
          <Indicator
            count={favorites.length}
            iconClass="ico ico-fav icon"
            title="Go to favourites"
            link="/favourites"
          />
          <Indicator
            count={cartItems.length}
            iconClass="ico ico-cart icon"
            title="Go to cart"
            link="/cart"
          />
        </div>
      </nav>
    </header>
  );
};
