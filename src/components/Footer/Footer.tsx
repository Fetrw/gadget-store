import { FC } from 'react';
import { Link } from 'react-router-dom';

import './Footer.scss';

export const Footer: FC = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <Link to="/" className="footer__logo">
          <img
            src="logo.svg"
            alt="Nice Gadgets Logo"
            className="footer__logo-image"
          />
        </Link>
        <ul className="footer__navigation">
          <li className="footer__navigation-item">
            <Link
              to="https://github.com/Fetrw/gadget-store"
              className="footer__navigation-link"
              target="_blank"
              rel="noreferrer"
            >
              Github
            </Link>
          </li>

          <li className="footer__navigation-item">
            <Link
              to="mailto:21vladmel15@gmail.com"
              className="footer__navigation-link"
              target="_blank"
              rel="noreferrer"
            >
              Contacts
            </Link>
          </li>

          <li className="footer__navigation-item">
            <Link
              to="https://github.com/Fetrw/gadget-store"
              className="footer__navigation-link"
              target="_blank"
              rel="noreferrer"
            >
              Rights
            </Link>
          </li>
        </ul>

        <button
          title="Back to the top"
          className="footer__back-button"
          onClick={() => window.scrollTo({ top: 0 })}
        >
          Back to top
          <div className="footer__back-icon ico ico-up" />
        </button>
      </div>
    </footer>
  );
};
