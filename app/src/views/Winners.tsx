import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { clearUser } from '../store/user.ts';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Winner {
  name: string;
  image: string;
  date: string;
}

interface User {
  id: string;
  email: string;
  username: string;
  nbr_games: number;
  winner: Winner[];
  role: string;
}

const Winners: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchResults = async (token: string) => {
      try {
        const response = await axios.get('http://localhost:3001/admin/results', {
          headers: { 'x-access-token': token },
        });

        response.data.map((user) => {
          return user.winner.map((winner) => {
            return (winner.time = parseInt(winner.time.split(':')[0]) + 2 + ':' + winner.time.split(':')[1]);
          });
        });

        return setUsers(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des résultats: ', error);
      }
    };

    const tokenStored = localStorage.getItem('token');

    if (tokenStored) {
      fetchResults(tokenStored);
    } else {
      navigate('/login');
    }
  }, [navigate, dispatch, setUsers]);

  const setLogout = () => {
    localStorage.removeItem('token');
    dispatch(clearUser());
    navigate('/login');
  };

  return (
    <main className="winners">
      <div className="winners-main">
        <div className="winners-main__wrapper">
          <h1 className="winners-main__title">LA LISTE DES GRANDS GAGNANTS</h1>
          <ul className="winners-main__labels">
            <li className="winners-main__label">Prénoms</li>
            <li className="winners-main__label">Pâtisserie</li>
            <li className="winners-main__label">Date</li>
            <li className="winners-main__label">Heure</li>
          </ul>
          <div className="winners-main__users">
            {users.map((user) => (
              <div key={user.id} className="winners-main__user">
                <p className="winners-main__user-info">{user.username}</p>
                <div>
                  {user.winner.map((winner, index) => (
                    <div key={index}>{winner.name}</div>
                  ))}
                </div>
                <div>{user.winner[0].date}</div>
                <div>{user.winner[0].time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="winners-info">
        <button className="winners-info__btn">
          <a href="/"></a>
          Retour
        </button>
        <button className="winners-info__btn" onClick={setLogout}>
          <a href="/login"></a>
          Se déconnecter
        </button>
      </div>
    </main>
  );
};

export default Winners;
