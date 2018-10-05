import React from 'react';
import { Carousel } from 'react-materialize';

export default(props) => {
  return (
    <div className="articles">
      <div>
        <img src="https://static01.nyt.com/newsgraphics/2018/06/25/empire/e2d731aad1c655444f3d3a6a3c34c6c6b697d331/00_trumpfam_investigation.png" />
        <h4>Trump Tax Schemes</h4>
        <p>Trump is involved in suspect taxes schemes involving his father.</p>
      </div>
      <div>
        <img src="https://static01.nyt.com/images/2018/10/07/arts/07weiner1/07weiner1-superJumbo.jpg?quality=90&auto=webp" />
        <h4>After Mad Men?</h4>
        <p>Matt Weiner on his life after the hit show mad men.</p>
      </div>
      <div>
        <img src="https://static01.nyt.com/images/2018/10/04/us/politics/04dc-kavanaugh-2/merlin_144687546_a2cf0967-489e-496f-976b-78c10e316e7a-superJumbo.jpg?quality=90&auto=webp" />
        <h4>Senators appaled at laughter</h4>
        <p>Senator crowd in to talke about the recent political events</p>
      </div>
    </div>
  )
}