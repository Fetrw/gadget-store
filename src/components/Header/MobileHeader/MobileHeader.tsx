import { FC, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';

import '../Header.scss';

type Link = { title: string; link: string };

const NavLinks: FC<{ links: Link[]; onClose: () => void }> = ({
  links,
  onClose,
}) => (
  <ul className="nav__list">
    {links.map(link => (
      <li className="nav__item" key={link.title}>
        <NavLink to={link.link} className="nav__link" onClick={onClose}>
          {link.title}
        </NavLink>
      </li>
    ))}
  </ul>
);

const Indicator: FC<{
  count: number;
  iconClass: string;
  link: string;
  onClose: () => void;
}> = ({ count, iconClass, link, onClose }) => (
  <NavLink to={link} className="nav__button" onClick={onClose}>
    <div className={iconClass}>
      {!!count && <div className="indicator">{count}</div>}
    </div>
  </NavLink>
);

export const MobileHeader: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const favorites = useSelector(
    (state: RootState) => state.favorites.favorites,
  );

  const toggleMenuOpen = () => setIsMenuOpen(!isMenuOpen);
  const handleMenuClose = () => setIsMenuOpen(false);

  const links: Link[] = [
    { title: 'Home', link: '/' },
    { title: 'Phones', link: '/phones' },
    { title: 'Tablets', link: '/tablets' },
    { title: 'Accessories', link: '/accessories' },
  ];

  return (
    <>
      <header className="header">
        <NavLink
          to="/"
          className="header__logo-link"
          onClick={handleMenuClose}
          title="Go to Home page"
        >
          <img src={'logo.svg'} alt="Nice Gadgets logo" className="logo" />
        </NavLink>

        <div className="header__buttons">
          <button
            className="menu-button"
            onClick={toggleMenuOpen}
            title={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <div
              className={`ico ${isMenuOpen ? 'ico-close-dark' : 'ico-menu'}`}
            />
          </button>
        </div>
      </header>

      <aside className={`menu ${isMenuOpen ? 'menu--open' : ''}`}>
        <nav className="nav">
          <NavLinks links={links} onClose={handleMenuClose} />
          <div className="nav__buttons">
            <Indicator
              count={favorites.length}
              iconClass="ico ico-fav icon"
              link="/favourites"
              onClose={handleMenuClose}
            />
            <Indicator
              count={cartItems.length}
              iconClass="ico ico-cart icon"
              link="/cart"
              onClose={handleMenuClose}
            />
          </div>
        </nav>
      </aside>
    </>
  );
};
