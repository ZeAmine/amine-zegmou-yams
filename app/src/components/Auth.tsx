import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearUser } from '../store/user.ts';
import axios from 'axios';

interface AuthProps {
  type?: 'login' | 'register';
}

const Auth: React.FC = ({ type = 'login' }: AuthProps) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const history = useHistory();
  // const authenticated = useSelector((state) => state.auth.authenticated);

  // useEffect(() => {
  //   if (type === 'login' && authenticated) {
  //     history.push('/');
  //   }
  // }, [authenticated, type, history]);

  useEffect(() => {
    dispatch(clearUser());
  }, [dispatch]);

  const validate = () => {
    const errors = [];
    const regexEmail = /\S+@\S+\.\S+/;

    if (!email || email.search(regexEmail) !== 0) {
      errors.push('Invalid email');
    }

    if (!password) {
      errors.push('Required password');
    }

    if (type === 'register' && password !== passwordConfirm) {
      errors.push('Passwords do not match');
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
          <button type="submit">{type === 'login' ? 'Connexion' : 'Inscription'}</button>
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
