import React from 'react';

const Winners: React.FC = () => {
  return (
    <main className="home">
      <div className="home-main">
        <div className="home-main__wrapper">
          <button className="home-main__btn">Lancer les dés</button>
          <figure className="home-main__media">
            <img src="https://picsum.photos/seed/picsum/200/300" alt="cake" />
          </figure>
          <div className="home-main__piece">
            <div className="cercle"></div>
          </div>
          <div className="home-main__piece">
            <div className="cercle"></div>
          </div>
          <div className="home-main__piece">
            <div className="cercle"></div>
          </div>
          <div className="home-main__piece">
            <div className="cercle"></div>
          </div>
          <div className="home-main__piece">
            <div className="cercle"></div>
          </div>
        </div>
      </div>
      <div className="home-info">
        <button className="home-info__btn" disabled>
          Scores
        </button>
      </div>
    </main>
  );
};

export default Winners;
