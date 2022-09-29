import React from 'react';

const Details = ({ type, status, network, premiered }) => {
  return (
    <div>
      <p>
        Status : <span>{status}</span>
      </p>
      <p>
        Type : <span>{type}</span>
      </p>
      <p>
        Premiered {premiered} {network ? `on ${network.name}` : null}
      </p>
    </div>
  );
};

export default Details;
