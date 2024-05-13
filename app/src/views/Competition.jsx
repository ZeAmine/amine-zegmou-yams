function Competition() {
  return (
    <main className="competition">
      <div className="competition-main">
        <div className="competition-main__wrapper">
          <button className="competition-main__btn">Lacncer les dés</button>
          <figure className="competition-main__media">
            <img src="https://picsum.photos/seed/picsum/200/300" alt="cake" />
          </figure>
          <div className="competition-main__piece">
            <div className="cercle"></div>
          </div>
          <div className="competition-main__piece">
            <div className="cercle"></div>
          </div>
          <div className="competition-main__piece">
            <div className="cercle"></div>
          </div>
          <div className="competition-main__piece">
            <div className="cercle"></div>
          </div>
          <div className="competition-main__piece">
            <div className="cercle"></div>
          </div>
        </div>
      </div>
      <div className="competition-info">
        <div className="competition-info__score">
          <span className="competition-info__score-label">Score</span>
          <div>
            <h4 className="competition-info__score-title">CARRE</h4>
            <span className="competition-info__score-subtitle">4/5 dés identiques </span>
          </div>
          <p className="competition-info__score-description">VOUS AVEZ GAGNE 2 pâtisserie(s) !</p>
        </div>
        <div className="competition-info__lives">
          <span className="competition-info__lives-label">Lives</span>
          <div>
            <img src="/life.svg" alt="life" />
            <img src="/life.svg" alt="life" />
            <img src="/life.svg" alt="life" />
          </div>
        </div>
        <button className="competition-info__btn" disabled>
          Scores
        </button>
      </div>
    </main>
  );
}

export default Competition;
