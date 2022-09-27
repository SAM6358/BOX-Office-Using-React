import React from 'react';

const ActorCard = ({ name, country, birthday, deathday, gender, image }) => {
  return (
    <div>
      <div>
        <img src={image} alt="show" />
      </div>
      <h1>
        {name} {gender ? `${gender}` : null}
      </h1>
      <p>{country ? `Resident of ${country}` : 'Country Unavailable'}</p>
      {birthday ? <p>Born {birthday}</p> : null}
      <p> {deathday ? `Died ${deathday}` : 'Alive'} </p>
    </div>
  );
};

export default ActorCard;
