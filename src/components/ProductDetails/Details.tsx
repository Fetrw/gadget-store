/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/indent */
import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import { ProductDetails } from '../../types/ProductDetails';
import { Product } from '../../types/Product';
import { colorHexMap } from '../../constants/colorHexMap';
import { AddToCartButton } from '../ProductCard/AddCartButton/AddCartButton';
import { AddToFavButton } from '../ProductCard/AddFavButton/AddFavButton';
import './Details.scss';

type Props = {
  productDetails: ProductDetails;
  product: Product;
};

export const Details: React.FC<Props> = ({ productDetails, product }) => {
  const [bigImage, setBigImage] = useState<string>();
  const [fullTechSpecs, setFullTechSpecs] = useState<
    Array<Record<string, any>>
  >([]);

  useEffect(() => {
    setBigImage(productDetails.images[0]);
    setFullTechSpecs([
      { Screen: productDetails.screen },
      { Resolution: productDetails.resolution },
      { Processor: productDetails.processor },
      { RAM: productDetails.ram },
      { 'Built in memory': productDetails.capacityAvailable },
      { Camera: productDetails.camera },
      { Zoom: productDetails.zoom },
      {
        Cell: productDetails.cell.map((el, index) =>
          index === productDetails.cell.length - 1 ? el : el + ', ',
        ),
      },
    ]);
  }, [productDetails]);

  const updateColor = (newColor: string) => {
    const currentURL = window.location.href;
    const parts = currentURL.split('-');

    parts[parts.length - 1] = newColor;
    const newURL = parts.join('-');

    window.location.href = newURL;
  };

  const updateStorage = (newStorage: string) => {
    const normNewStorage = newStorage.toLowerCase();
    const currentURL = window.location.href;
    const parts = currentURL.split('-');

    parts[parts.length - 2] = normNewStorage;
    const newURL = parts.join('-');

    window.location.href = newURL;
  };

  return (
    <>
      <h2 className="item-title">{productDetails.name}</h2>

      {/* Images Section */}
      <section className="boxed-images">
        <div className="boxed-images__small-container">
          {productDetails.images.map(image => (
            <img
              key={image}
              className={cn('boxed-images__small-image', {
                'boxed-images__small-image--active': image === bigImage,
              })}
              src={image}
              alt={image}
              onClick={() => setBigImage(image)}
            />
          ))}
        </div>
        <div className="boxed-images__big-container">
          <img
            className="boxed-images__big-image"
            src={bigImage}
            alt={productDetails.name}
          />
        </div>
      </section>

      {/* Short Parameters */}
      <section className="short-params section-container">
        <div className="short-params__pairs">
          <p className="short-params__pairs-title">Available colors</p>
          <div className="wrapper">
            {productDetails.colorsAvailable.map(color => (
              <p
                key={color}
                style={{ backgroundColor: colorHexMap[color] }}
                className={cn('short-params__available-color', {
                  'short-params__available-color--active':
                    color === productDetails.color,
                })}
                onClick={() => updateColor(color)}
              ></p>
            ))}
          </div>
        </div>

        <div className="short-params__pairs">
          <p className="short-params__pairs-title">Select capacity</p>
          <div className="wrapper wrapper--capacity">
            {productDetails.capacityAvailable.map(capacity => (
              <div
                key={capacity}
                className={cn('short-params__available-capacity', {
                  'short-params__available-capacity--active':
                    capacity === productDetails.capacity,
                })}
                onClick={() => updateStorage(capacity)}
              >
                {capacity}
              </div>
            ))}
          </div>
        </div>

        <div className="short-params__prices">
          <span className="short-params__prices-discount">{`$${productDetails.priceDiscount}`}</span>
          <span className="short-params__prices-full">{`$${productDetails.priceRegular}`}</span>
        </div>

        <div className="wrapper">
          {product && <AddToCartButton product={product} />}
          <AddToFavButton product={product} />
        </div>

        <div className="short-params__params">
          {fullTechSpecs.slice(0, 4).map((TechSpec, index) => (
            <div className="short-params__params-pair" key={index}>
              {Object.entries(TechSpec).map(([property, value]) => (
                <React.Fragment key={property}>
                  <p className="short-params__param">{property}</p>
                  <p className="short-params__value">{value || ''}</p>
                </React.Fragment>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="about section-container">
        <h3 className="about__title">About</h3>
        {productDetails.description.map((element, index) => (
          <React.Fragment key={index}>
            <h4 className="about__paragraph-title">{element.title}</h4>
            <p className="about__paragraph-body">
              {Array.isArray(element.text)
                ? element.text.join(', ')
                : element.text}
            </p>
          </React.Fragment>
        ))}
      </section>

      {/* Tech Specs */}
      <section className="tech-specs section-container">
        <h3 className="tech-specs__title">Tech specs</h3>
        <div className="tech-specs__params-container">
          {fullTechSpecs.map((TechSpec, index) => (
            <div className="tech-specs__params-pair" key={index}>
              {Object.entries(TechSpec).map(([property, value]) => (
                <React.Fragment key={property}>
                  <p className="tech-specs__param">{property}</p>
                  <p className="tech-specs__value">{value || ''}</p>
                </React.Fragment>
              ))}
            </div>
          ))}
        </div>
      </section>
    </>
  );
};
