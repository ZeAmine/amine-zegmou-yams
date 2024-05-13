import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, clearUser, RootState } from '../store/user';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home: React.FC = () => {
  const handleClick = async () => {
    // try {
    //   const response = await axios.get('http://localhost:3001/game/play', {
    //     headers: {
    //       'x-access-token': token,
    //     },
    //   });
    //   dispatch(setUser(response.data.user));
    //   setMessage(response.data.message);
    //   setDice(response.data.dice_table);
    // } catch (error) {
    //   console.error('Erreur lors de la récupération des détails du jeu : ', error);
    // }
  };

  return (
    <main className="home">
      <div className="home-main">
        <div className="home-main__wrapper">
          <button className="home-main__btn" onClick={handleClick}>
            Lancer les dés
          </button>
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
        <div className="home-info__score">
          <span className="home-info__score-label">Score</span>
          <div>
            <h4 className="home-info__score-title">CARRE</h4>
            <span className="home-info__score-subtitle">4/5 dés identiques</span>
          </div>
          <p className="home-info__score-description">VOUS AVEZ GAGNE 2 pâtisserie(s) !</p>
        </div>
        <div className="home-info__lives">
          <span className="home-info__lives-label">Lives</span>
          <div>
            <img src="/life.svg" alt="life" />
            <img src="/life.svg" alt="life" />
            <img src="/life.svg" alt="life" />
          </div>
        </div>
        <button className="home-info__btn" disabled>
          Scores
        </button>
      </div>
    </main>
  );
};

export default Home;
