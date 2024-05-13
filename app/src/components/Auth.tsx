import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearUser, RootState, setUser } from '../store/user.ts';
import axios from 'axios';

interface AuthProps {
  type: 'login' | 'register';
}

const Auth: React.FC<AuthProps> = ({ type }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const auth = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (type === 'login' && auth && auth.token) {
      navigate('/');
    }
  }, [auth, type, navigate]);

  useEffect(() => {
    dispatch(clearUser());
  }, [dispatch]);

  const validate = () => {
    const errors: string[] = [];
    const regexEmail = /\S+@\S+\.\S+/;

    if (type === 'register' && !regexEmail.test(email)) {
      errors.push('Invalid email');
    }

    if (!username) {
      errors.push('Required username');
    }

    if (!password) {
      errors.push('Required password');
    }

    return errors;
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();

    const errors = validate();

    if (errors.length > 0) {
      return console.error(errors);
    }

    if (type === 'register') {
      try {
        await axios.post('http://localhost:3001/auth/register', { email, username, password });
        navigate('/login');
      } catch (error) {
        console.error("Erreur d'inscription: ", error);
      }
    }

    if (type === 'login') {
      try {
        const response = await axios.post('http://localhost:3001/auth/login', { username, password });
        localStorage.setItem('token', response.data.token);
        dispatch(setUser(response.data));
        navigate('/');
      } catch (error) {
        console.error('Erreur de connexion: ', error);
      }
    }
  };

  return (
    <section className="auth">
      <div className="auth-wrapper">
        <div className="auth-head">
          <h1>{type === 'login' ? 'Connectez-vous' : 'Inscrivez-vous'}</h1>
          <p>Entrez les informations requis pour vous {type === 'login' ? 'connecter' : 'inscrire'}.</p>
        </div>
        <form className="auth-form" onSubmit={onSubmit}>
          {type === 'register' && (
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          )}
          <input
            type="text"
            placeholder="Nom d'utilisateur"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="auth-form__btn">
            {type === 'login' ? 'Connexion' : 'Inscription'}
          </button>
          <button type="submit" className="auth-form__subBtn">
            <a href={type === 'login' ? '/signup' : '/login'}>{type === 'login' ? "S'inscrire" : 'Se connecter'}</a>
          </button>
        </form>
      </div>
      <p className="auth-footer">
        By clicking continue, you agree to our <u> Terms of Service </u> <br />
        and <u>Privacy Policy</u>.
      </p>
    </section>
  );
};

export default Auth;
