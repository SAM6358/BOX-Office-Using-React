import React, { useState } from 'react';
import { APIGet } from '../misc/Configure';
import MainPageLayout from '../components/MainPageLayout';
import ShowGrid from '../components/show/ShowGrid';
import ActorGrid from '../components/actor/ActorGrid';
import { useLastQuery } from '../misc/Custom-hooks';
import {
  RadioInputsWrapper,
  SearchButtonWrapper,
  SearchInput,
} from './Home.styled';
import CustomRadio from '../components/CustomRadio';

const Home = () => {
  const [input, setInput] = useLastQuery('');
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
      <SearchInput
        type="text"
        placeholder="Search"
        onChange={onInputChange}
        onKeyDown={onKeyDown}
        value={input}
      />
      <RadioInputsWrapper>
        <div>
          <CustomRadio
            label="Shows"
            id="search-shows"
            value="shows"
            checked={isSearchShows}
            onChange={onRadioChange}
          />
        </div>
        <div>
          <CustomRadio
            label="Actors"
            id="search-people"
            value="people"
            checked={!isSearchShows}
            onChange={onRadioChange}
          />
        </div>
      </RadioInputsWrapper>
      <SearchButtonWrapper>
        <button type="button" onClick={onSearch}>
          Search
        </button>
      </SearchButtonWrapper>
      {renderResults()}
    </MainPageLayout>
  );
};

export default Home;
