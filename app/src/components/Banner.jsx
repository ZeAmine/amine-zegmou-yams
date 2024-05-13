import React from 'react';
import { Link } from 'react-router-dom';

function Nav() {
  return (
    <header>
      <h1 style={styles.mainTitle}>
        <Link to="/">EZ Shopping</Link>
      </h1>

      <div style={{ display: 'flex' }}>
        <div style={styles.menuItem}>
          👱‍♂️ <Link to="/profile">John Doe</Link>
        </div>
        <div style={styles.menuItem}>
          🛒{' '}
          <Link to="/basket">
            <strong>4</strong> items
          </Link>
        </div>
        <div style={styles.menuItem}>
          🌓 <Link to="#">Dark Mode</Link>
        </div>
      </div>
    </header>
  );
}

const styles = {
  menuItem: { margin: '1rem', fontSize: '1.2rem' },
  mainTitle: { fontSize: '2rem', textAlign: 'center', margin: '1rem' },
};

export default Nav;
