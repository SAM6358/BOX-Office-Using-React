import React, { useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
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
  console.log('show', show);
  if (isLoading) {
    return <div>Data is being loaded.</div>;
  }
  if (error) {
    <div> Error! occured: {error} </div>;
  }
  return <div>Hello</div>;
};

export default Show;
