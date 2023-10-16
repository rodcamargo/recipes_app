import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import searchIcon from '../images/searchIcon.svg';
import Context from '../context/Context';
import '../CSS/SearchBar.css';

const SearchBar = (props) => {
  const { namePath } = props;
  const [inputIsDisabled, setInputIsDisabled] = useState(false);

  const { searchFood } = useContext(Context);

  const handleChange = () => {
    if (inputIsDisabled) {
      return setInputIsDisabled(false);
    }
    return setInputIsDisabled(true);
  };

  return (
    <div id="search-bar">
      <button
        data-testid="btn-search"
        type="button"
        onClick={ () => handleChange() }
      >
        <img src={ searchIcon } alt="Search" data-testid="search-top-btn" />
      </button>
      <form onSubmit={ (e) => searchFood(e, namePath) }>
        {inputIsDisabled ? (
          <input
            data-testid="search-input"
            type="text"
            placeholder="Search for recipe"
            id="search-input"
            name="search-input"
          />
        ) : null }
        <fieldset id="food-select">
          <label htmlFor="ingrediente">
            <input
              data-testid="ingredient-search-radio"
              type="radio"
              name="food-select"
              id="ingrediente"
              value="ingrediente"
            />
            Ingrendient
          </label>
          <label htmlFor="nome">
            <input
              data-testid="name-search-radio"
              type="radio"
              name="food-select"
              id="nome"
              value="nome"
            />
            Name
          </label>
          <label htmlFor="primeira-letra">
            <input
              data-testid="first-letter-search-radio"
              type="radio"
              name="food-select"
              id="primeira-letra"
              value="primeira-letra"
            />
            First Letter
          </label>
        </fieldset>
        <button
          data-testid="exec-search-btn"
          type="submit"
          id="btn-search"
        >
          Search
        </button>
      </form>
    </div>
  );
};

SearchBar.propTypes = {
  namePath: PropTypes.string.isRequired,
};
export default SearchBar;
