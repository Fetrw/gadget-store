import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import './Slider.scss';
import { sliderData } from '../../constants/sliderData';

export const Banner = () => {
  const [sliderIndex, setSliderIndex] = useState(0);

  const nextSliderImage = useCallback(() => {
    setSliderIndex(prevIndex => (prevIndex + 1) % sliderData.length);
  }, []);

  const prevSliderImage = useCallback(() => {
    setSliderIndex(prevIndex =>
      prevIndex === 0 ? sliderData.length - 1 : prevIndex - 1,
    );
  }, []);

  useEffect(() => {
    const interval = setInterval(nextSliderImage, 5000);

    return () => clearInterval(interval);
  }, [nextSliderImage, sliderIndex]);

  return (
    <div className="banner-slider">
      <div className="banner-slider__content">
        <button
          className="banner-slider__nav-btn"
          type="button"
          onClick={prevSliderImage}
          aria-label="Previous slide"
          title="Previous slide"
          name="Previous slide"
        >
          <i className="ico ico-left-dark" />
        </button>

        <div className="banner-slider__image-wrapper">
          {sliderData.map((slide, index) => (
            <Link
              to={slide.linkUrl}
              key={slide.linkUrl}
              className="banner-slider__link"
            >
              <img
                src={slide.imgUrl}
                alt={`Slide ${index + 1}`}
                className={cn('banner-slider__image', {
                  active: sliderIndex === index,
                })}
                style={{
                  translate: ` ${-100 * sliderIndex}%`,
                }}
              />
            </Link>
          ))}
        </div>

        <button
          className="banner-slider__nav-btn"
          type="button"
          onClick={nextSliderImage}
          aria-label="Next slide"
          title="Next slide"
          name="Next slide"
        >
          <i className="ico ico-right-dark" />
        </button>
      </div>

      <div className="banner-slider__pagination">
        {sliderData.map((slide, index) => (
          <button
            key={slide.linkUrl}
            type="button"
            className={cn('banner-slider__dot', {
              active: sliderIndex === index,
            })}
            onClick={() => setSliderIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
