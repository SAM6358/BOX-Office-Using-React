import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { APIGet } from '../misc/Configure';

const Show = () => {
  const { id } = useParams();

  const [show, Setshow] = useState(null);

  useEffect(() => {
    APIGet(`/shows/${id}?embed[]=seasons&embed[]=cast`).then(results => {
      Setshow(results);
    });
  }, [id]);
  console.log('show', show);
  return <div>Hello</div>;
};

export default Show;
