import React from 'react';
import { StyledActorCard } from './ActorCard.styled';

const ActorCard = ({ name, country, birthday, deathday, gender, image }) => {
  return (
    <StyledActorCard>
      <div className="img-wrapper">
        <img src={image} alt="show" />
      </div>
      <h1>
        {name} {gender ? `${gender}` : null}
      </h1>
      <p>{country ? `Resident of ${country}` : 'Country Unavailable'}</p>
      {birthday ? <p>Born {birthday}</p> : null}
      <p className="deathday">{deathday ? `Died ${deathday}` : 'Alive'} </p>
    </StyledActorCard>
  );
};

export default ActorCard;
