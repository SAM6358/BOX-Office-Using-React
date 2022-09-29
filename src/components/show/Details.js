import React from 'react';
import { DetailsWrapper } from './Details.styled';

const Details = ({ type, status, network, premiered }) => {
  return (
    <DetailsWrapper>
      <p>
        Status : <span>{status}</span>
      </p>
      <p>
        Type : <span>{type}</span>
      </p>
      <p>
        Premiered {premiered} {network ? `on ${network.name}` : null}
      </p>
    </DetailsWrapper>
  );
};

export default Details;
