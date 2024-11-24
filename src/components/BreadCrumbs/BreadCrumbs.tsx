import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './BreadCrumbs.scss';

export const BreadCrumbs: React.FC = () => {
  const location = useLocation();

  const generatePathArray = (pathname: string) =>
    pathname
      .split('/')
      .filter(Boolean)
      .map((segment, index, arr) => ({
        name: segment,
        path: `/${arr.slice(0, index + 1).join('/')}`,
        isLast: index === arr.length - 1,
      }));

  const pathSegments = generatePathArray(location.pathname);

  return (
    <div className="bread-crumbs">
      <Link to="/" title="Return to the Homepage">
        <i className="ico ico-home" />
      </Link>
      {pathSegments.map(({ name, path, isLast }) => (
        <React.Fragment key={path}>
          <i className="ico ico-right" />
          {isLast ? (
            <p className="bread-crumbs__current">{name}</p>
          ) : (
            <Link to={path} className="bread-crumbs__link">
              {name}
            </Link>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
