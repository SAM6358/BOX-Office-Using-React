import React from 'react';
import IMAGE_NOT_FOUND from '../../images/not-found.png';
import { Star } from '../Styled';
import { Headline, MainDataWrapper, TagList } from './ShowMainData.styled';

const ShowMainData = ({ name, image, rating, summary, genre }) => {
  return (
    <MainDataWrapper>
      <img src={image ? image.original : IMAGE_NOT_FOUND} alt="show-cover" />
      <div className="text-side">
        <Headline>
          <h1>{name}</h1>
          <div>
            <Star />
            <span>{rating.average || 'N/A'}</span>
          </div>
        </Headline>
        <div
          className="summary"
          dangerouslySetInnerHTML={{ __html: summary }}
        />
        <div>
          Tags:{' '}
          <TagList>
            {genre.map((genr, i) => (
              <span key={i}>{genr}</span>
            ))}
          </TagList>
        </div>
      </div>
    </MainDataWrapper>
  );
};

export default ShowMainData;
