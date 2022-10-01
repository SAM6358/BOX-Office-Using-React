/* eslint-disable no-underscore-dangle */
import React from 'react';
import { useParams } from 'react-router-dom';
import Cast from '../components/show/Cast';
import Details from '../components/show/Details';
import Seasons from '../components/show/Seasons';
import ShowMainData from '../components/show/ShowMainData';
import { useShow } from '../misc/Custom-hooks';
import { InfoBlock, ShowPageWrapper } from './Show.styled';

const Show = () => {
  const { id } = useParams();
  const { show, isLoading, error } = useShow(id);

  // const [show, Setshow] = useState(null);
  // const [isLoading, setisLoading] = useState(true);
  // const [error, Seterror] = useState(null);

  if (isLoading) {
    return <div>Data is being loaded.</div>;
  }
  if (error) {
    <div> Error! occured: {error} </div>;
  }
  return (
    <ShowPageWrapper>
      <ShowMainData
        name={show.name}
        image={show.image}
        rating={show.rating}
        summary={show.summary}
        genre={show.genres}
      />

      <InfoBlock>
        <h2> Details </h2>
        <Details
          type={show.type}
          status={show.status}
          network={show.network}
          premiered={show.premiered}
        />
      </InfoBlock>

      <InfoBlock>
        <h2> Seasons </h2>
        <Seasons seasons={show._embedded.seasons} />
      </InfoBlock>

      <InfoBlock>
        <h2> Cast </h2>
        <Cast cast={show._embedded.cast} />
      </InfoBlock>
    </ShowPageWrapper>
  );
};

export default Show;
