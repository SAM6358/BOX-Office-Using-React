import React, { useState } from 'react';
import { APIGet } from '../misc/Configure';
import MainPageLayout from '../components/MainPageLayout';
import ShowGrid from '../components/show/ShowGrid';
import ActorGrid from '../components/actor/ActorGrid';

const Home = () => {
  const [input, setInput] = useState('');
  const [results, setResults] = useState(null);
  const [searchOptions, setsearchOptions] = useState('shows');

  const isSearchShows = searchOptions === 'shows';

  const onSearch = () => {
    APIGet(`/search/${searchOptions}?q=${input}`).then(result => {
      setResults(result);
    });
  };
  const onKeyDown = ev => {
    if (ev.keyCode === 13) {
      onSearch();
    }
  };
  const onInputChange = ev => {
    setInput(ev.target.value);
  };

  const renderResults = () => {
    if (results && results.length === 0) {
      return <div>No results Found.</div>;
    }
    if (results && results.length > 0) {
      return results[0].show ? (
        <ShowGrid data={results} />
      ) : (
        <ActorGrid data={results} />
      );
    }
    return null;
  };

  const onRadioChange = ev => {
    setsearchOptions(ev.target.value);
  };

  return (
    <MainPageLayout>
      <input
        type="text"
        placeholder="Search"
        onChange={onInputChange}
        onKeyDown={onKeyDown}
        value={input}
      />
      <div>
        <label htmlFor="search-shows">
          Shows
          <input
            id="search-shows"
            type="radio"
            value="shows"
            checked={isSearchShows}
            onChange={onRadioChange}
          />
        </label>
        <label htmlFor="search-actors">
          Actors
          <input
            id="search-shows"
            type="radio"
            value="people"
            checked={!isSearchShows}
            onChange={onRadioChange}
          />
        </label>
      </div>
      <button type="button" onClick={onSearch}>
        Search
      </button>
      {renderResults()}
    </MainPageLayout>
  );
};

export default Home;
