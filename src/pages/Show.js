/* eslint-disable no-underscore-dangle */
import React, { useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import Cast from '../components/show/Cast';
import Details from '../components/show/Details';
import Seasons from '../components/show/Seasons';
import ShowMainData from '../components/show/ShowMainData';
import { APIGet } from '../misc/Configure';

const reducer = (prevState, action) => {
  switch (action.type) {
    case 'FETCH_SUCCESS': {
      return { show: action.show, isLoading: false, error: null };
    }

    case 'FETCH_FAILED': {
      return { ...prevState, isLoading: false, error: action.error };
    }
    default:
      return prevState;
  }
};

const initialState = {
  show: null,
  isLoading: true,
  error: null,
};

const Show = () => {
  const { id } = useParams();

  const [{ show, isLoading, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  // const [show, Setshow] = useState(null);
  // const [isLoading, setisLoading] = useState(true);
  // const [error, Seterror] = useState(null);

  useEffect(() => {
    let isMounted = true;
    APIGet(`/shows/${id}?embed[]=seasons&embed[]=cast`)
      .then(results => {
        if (isMounted) {
          dispatch({ type: 'FETCH_SUCCESS', show: results });
        }
      })
      .catch(err => {
        if (isMounted) {
          dispatch({ type: 'FETCH_FAILED', error: err.message });
        }
      });
    return () => {
      isMounted = false;
    };
  }, [id]);
  if (isLoading) {
    return <div>Data is being loaded.</div>;
  }
  if (error) {
    <div> Error! occured: {error} </div>;
  }
  return (
    <div>
      <ShowMainData
        name={show.name}
        image={show.image}
        rating={show.rating}
        summary={show.summary}
        genre={show.genres}
      />

      <div>
        <h2> Details </h2>
        <Details
          type={show.type}
          status={show.status}
          network={show.network}
          premiered={show.premiered}
        />
      </div>

      <div>
        <h2> Seasons </h2>
        <Seasons seasons={show._embedded.seasons} />
      </div>

      <div>
        <h2> Cast </h2>
        <Cast cast={show._embedded.cast} />
      </div>
    </div>
  );
};

export default Show;
