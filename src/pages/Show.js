import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { APIGet } from '../misc/Configure';

const Show = () => {
  const { id } = useParams();

  const [show, Setshow] = useState(null);
  const [isLoading, setisLoading] = useState(true);
  const [error, Seterror] = useState(null);

  useEffect(() => {
    let isMounted = true;
    APIGet(`/shows/${id}?embed[]=seasons&embed[]=cast`)
      .then(results => {
        if (isMounted) {
          Setshow(results);
          setisLoading(false);
        }
      })
      .catch(err => {
        if (isMounted) {
          Seterror(err.messsage);
          setisLoading(false);
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
