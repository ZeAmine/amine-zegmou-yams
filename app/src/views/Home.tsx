import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, clearUser, RootState } from '../store/user.ts';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import DiceSixFacesOne from '../images/dice-six-faces-one.tsx';
import DiceSixFacesTwo from '../images/dice-six-faces-two.tsx';
import DiceSixFacesThree from '../images/dice-six-faces-three.tsx';
import DiceSixFacesFour from '../images/dice-six-faces-four.tsx';
import DiceSixFacesFive from '../images/dice-six-faces-five.tsx';
import DiceSixFacesSix from '../images/dice-six-faces-six.tsx';

const Home: React.FC = () => {
  const [data, setData] = useState(null);
  const [token, setToken] = useState('');
  const [dice, setDice] = useState([]);
  const [message, setMessage] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [lives, setLives] = useState(0);
  const [winner, setWinner] = useState([{}]);

  const main = React.createRef<HTMLDivElement>();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const auth = useSelector((state: RootState) => state.user);
  useEffect(() => {
    const tokenStored = localStorage.getItem('token');

    if (tokenStored) {
      setToken(tokenStored);
      setLives(auth.nbr_games);
      setWinner(auth.winner);
      // fetchData();
    } else {
      navigate('/login');
    }
  }, [dispatch, navigate, auth]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/game/play', {
        headers: { 'x-access-token': token },
      });

      dispatch(setUser(response.data.user));

      setDice(response.data.dice_table);
      setType(response.data.type);
      setMessage(response.data.message);
      setDescription(response.data.description);
      setWinner(response.data.user.winner);
      setLives(response.data.user.nbr_games);

      return setData(response.data);
    } catch (error) {
      return console.error('Erreur lors de la récupération des détails du jeu: ', error);
    }
  };

  const setPlay = async () => {
    main.current?.classList.add('is-active');

    await fetchData();

    if (auth.nbr_games >= 3 || winner.length !== 0) {
      navigate('/winners');
    }
  };

  const setLogout = () => {
    localStorage.removeItem('token');
    dispatch(clearUser());
    navigate('/login');
  };

  useEffect(() => {
    // if (lives === 3 || auth.winner.length !== 0) {
    //   localStorage.removeItem('token');
    //   dispatch(clearUser());
    //   navigate('/winners');
    // }
  }, [auth, lives, winner, dispatch, navigate]);

  return (
    <main className="home">
      <div ref={main} className="home-main">
        <div className="home-main__wrapper">
          <button className="home-main__btn" onClick={setPlay}>
            Lancer les dés
          </button>
          <button className="home-main__scoreBtn">
            <a href="/winners"></a>
            Scores
          </button>
          <div className="home-main__medias">
            {winner.length ? (
              winner.map((item, index) => (
                <figure key={index} className="home-main__media">
                  <img src={`http://localhost:3001/images/${item.image}`} alt="cake" />
                </figure>
              ))
            ) : (
              <>
                <figure className="home-main__media">
                  <img src="https://picsum.photos/seed/picsum/200/300" alt="cake" />
                </figure>
                <figure className="home-main__media">
                  <img src="https://picsum.photos/seed/picsum/200/300" alt="cake" />
                </figure>
                <figure className="home-main__media">
                  <img src="https://picsum.photos/seed/picsum/200/300" alt="cake" />
                </figure>
              </>
            )}
          </div>
          <div className="home-main__dices">
            <div className="home-main__dices-wrapper">
              {dice.length && token
                ? dice.map((value, index) => <DiceImage key={index} value={value} />)
                : winner.map((item, index) => <h4 key={index}>{item.name}</h4>)}
            </div>
          </div>
        </div>
      </div>
      <div className="home-info">
        <div className="home-info__score">
          <span className="home-info__score-label">Score</span>
          <div>
            <h4 className="home-info__score-title">{type}</h4>
            <span className="home-info__score-subtitle">{description}</span>
          </div>
          <p className="home-info__score-description">{message}</p>
        </div>
        <div className="home-info__lives">
          <span className="home-info__lives-label">Vies</span>
          <div className={`home-info__lives-medias disable-${lives}`}>
            <img src="/life.svg" alt="life" />
            <img src="/life.svg" alt="life" />
            <img src="/life.svg" alt="life" />
          </div>
        </div>
        <div className="home-info__btns">
          <button className="home-info__btn" onClick={setLogout}>
            Se déconnecter
          </button>
        </div>
      </div>
    </main>
  );
};

const DiceImage: React.FC<{ value: number }> = ({ value }) => {
  switch (value) {
    case 1:
      return <DiceSixFacesOne />;
    case 2:
      return <DiceSixFacesTwo />;
    case 3:
      return <DiceSixFacesThree />;
    case 4:
      return <DiceSixFacesFour />;
    case 5:
      return <DiceSixFacesFive />;
    case 6:
      return <DiceSixFacesSix />;
    default:
      return null;
  }
};

export default Home;
