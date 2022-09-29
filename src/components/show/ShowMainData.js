import React from 'react';
import IMAGE_NOT_FOUND from '../../images/not-found.png';
import { Star } from '../Styled';

const ShowMainData = ({ name, image, rating, summary, genre }) => {
  return (
    <div>
      <img src={image ? image.original : IMAGE_NOT_FOUND} alt="show-cover" />
      <div>
        <div>
          <h1>{name}</h1>
          <div>
            <Star />
            <span>{rating.average || 'N/A'}</span>
          </div>
        </div>
        <div dangerouslySetInnerHTML={{ __html: summary }} />
        <div>
          Tags:{' '}
          <div>
            {genre.map((genr, i) => (
              <span key={i}>{genr}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowMainData;
