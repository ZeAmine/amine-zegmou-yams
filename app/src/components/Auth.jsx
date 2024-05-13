import React, { useState, useEffect } from 'react';
// import { useHistory } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';

function Auth({ type = 'login' }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  // const history = useHistory();
  // const dispatch = useDispatch();
  // const authenticated = useSelector((state) => state.auth.authenticated);

  const title = type === 'login' ? 'Connectez-vous' : 'Inscrivez-vous';
  const action = type === 'login' ? 'connecter' : 'inscrire';
  const cta = type === 'login' ? 'Connexion' : 'Inscription';

  // useEffect(() => {
  //   if (type === 'login' && authenticated) {
  //     history.push('/');
  //   }
  // }, [authenticated, type, history]);

  const validate = () => {
    const errors = [];
    const regexEmail = /\S+@\S+\.\S+/;

    if (!email || email.search(regexEmail) !== 0) {
      errors.push('Invalid email');
    }

    if (!password) {
      errors.push('Required');
    }

    if (type === 'register' && password !== passwordConfirm) {
      errors.push('Passwords do not match');
    }

    return errors;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();

    if (errors.length > 0) {
      return console.error(errors);
    }

    if (type === 'register') {
      // Dispatch your register action here
      // dispatch(registerAction({ name: 'test', prenom: 'test', adresse: 'test', telephone: 'test', email, password }));
      // history.push('/login');
    }

    if (type === 'login') {
      // Dispatch your login action here
      // dispatch(loginAction({ email, password }));
      // history.push('/');
    }
  };

  return (
    <section className="auth">
      <div className="auth-wrapper">
        <div className="auth-head">
          <h1>{title}</h1>
          <p>Entrez votre email et mot de passe pour vous {action}.</p>
        </div>
        <form className="auth-form" onSubmit={onSubmit}>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {type === 'register' && (
            <input
              type="password"
              placeholder="Confirmer mot de passe"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              required
            />
          )}
          <button type="submit">{cta}</button>
        </form>
      </div>
      <p className="auth-footer">
        By clicking continue, you agree to our <u> Terms of Service </u> <br />
        and <u>Privacy Policy</u>.
      </p>
    </section>
  );
}

export default Auth;
