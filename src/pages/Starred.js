import React, { useEffect, useState } from 'react';
import MainPageLayout from '../components/MainPageLayout';
import ShowGrid from '../components/show/ShowGrid';
import { APIGet } from '../misc/Configure';
import { useShows } from '../misc/Custom-hooks';

const Starred = () => {
  const [starred] = useShows();

  const [Shows, setShows] = useState(null);
  const [Error, setError] = useState(null);
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    if (starred && starred.length > 0) {
      const promises = starred.map(showId => APIGet(`/shows/${showId}`));

      Promise.all(promises)
        .then(APIdata => APIdata.map(show => ({ show })))
        .then(results => {
          setShows(results);
          setisLoading(false);
        })
        .catch(err => {
          setError(err.message);
          setisLoading(false);
        });
    } else setisLoading(false);
  });

  return (
    <MainPageLayout>
      {isLoading && <div>Shows are Loading. Please Wait... </div>}
      {Error && <div>Error occured : {Error}</div>}
      {!isLoading && !Shows && <div>No shows were starred.</div>}
      {!isLoading && !Error && Shows && <ShowGrid data={Shows} />}
    </MainPageLayout>
  );
};

export default Starred;
