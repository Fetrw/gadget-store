import { FC, useEffect, useRef, useState, KeyboardEvent } from 'react';
import cn from 'classnames';

import './DropDown.scss';

interface Props {
  options: string[];
  chosenOption: string;
  onClick: (value: string) => void;
}

export const DropDown: FC<Props> = ({ options, chosenOption, onClick }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  const handleClick = (value: string) => {
    setIsDropdownOpen(false);
    onClick(value);
  };

  const handleToggleOpen = () => setIsDropdownOpen(!isDropdownOpen);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'ArrowDown') {
      setFocusedIndex(prevIndex => (prevIndex + 1) % options.length);
    } else if (event.key === 'ArrowUp') {
      setFocusedIndex(
        prevIndex => (prevIndex - 1 + options.length) % options.length,
      );
    } else if (event.key === 'Enter' && focusedIndex !== -1) {
      handleClick(options[focusedIndex]);
    } else if (event.key === 'Escape') {
      setIsDropdownOpen(false);
    }
  };

  return (
    <div
      className="dropdown"
      ref={dropdownRef}
      onKeyDown={handleKeyDown}
      role="combobox"
      aria-expanded={isDropdownOpen}
      aria-haspopup="listbox"
    >
      <button
        className={cn('dropbutton dropdown__top', {
          'dropdown__top--active': isDropdownOpen,
        })}
        onClick={handleToggleOpen}
        aria-controls="dropdown-list"
        aria-label="Choose an option"
      >
        {chosenOption[0].toUpperCase() + chosenOption.slice(1)}
        <i className={`ico ${isDropdownOpen ? 'ico-up' : 'ico-down'}`} />
      </button>

      <div
        className={cn('dropdown__bottom', {
          'dropdown__bottom--active': isDropdownOpen,
        })}
        id="dropdown-list"
        role="listbox"
      >
        {options.map((option, index) => (
          <button
            key={option}
            onClick={() => handleClick(option)}
            className={cn('dropbutton dropdown__option', {
              'dropdown__option--focused': index === focusedIndex,
            })}
            role="option"
            aria-selected={chosenOption === option}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};
