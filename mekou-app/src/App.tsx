import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import PROGRESS from './PROGRESS/PROGRESS'
import HISTORY from './HISTORY/HISTORY'
import TRACE from './Trace/TRACE'
// 他のページも同様に作成・インポート

function Home() {
  return (
    <>
      <section className="neu-inset">
        <p style={{padding: '0 10px'}}>MEKOUは、自律した経済、自給自足のエネルギー、国民の自立を目指すプロジェクトです</p>
      </section>

      <div className="grid-container">
        <Link to="/trace" className="neu-card">
          <h2>論理：トレース</h2>
          <p className="sub-text">法律の可視化</p>
        </Link>

        <Link to="/engine" className="neu-card">
          <h2>技術：MEKOU ENGINE</h2>
          <p className="sub-text">AI・VRによる可視化とシミュレーション</p>
        </Link>

        <Link to="/progress" className="neu-card">
          <h2>進捗：PROGRESS</h2>
          <p className="sub-text">MEKOUプロジェクトの進行状況</p>
        </Link>

        <Link to="/history" className="neu-card">
          <h2>履歴：HISTORY</h2>
          <p className="sub-text">MEKOUプロジェクトのログ</p>
        </Link>
      </div>

      <section className="neu-inset" style={{marginTop: '40px'}}>
        <h2 className="section-title">VICTORY CONDITION</h2>
        <ul className="condition-list"><li>国民の自立</li></ul>
        <h2 className="section-title">DEFEAT CONDITION</h2>
        <ul className="condition-list"><li>MEKOUとしての思想、血縁の根絶</li></ul>
      </section>
    </>
  )
}

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <Link to="/" style={{textDecoration: 'none', color: 'inherit'}}>
            <h1>Welcome to <span className="highlight">MEKOU</span></h1>
            <p className="manifesto">同じ朝は来ない</p>
          </Link>
        </header>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/progress" element={<PROGRESS />} />
          <Route path="/history" element={<HISTORY />} />
          <Route path="/trace" element={<TRACE />} />
          {/* 未実装ページ用のプレースホルダー */}
          <Route path="*" element={<div className="neu-inset">UNDER CONSTRUCTION</div>} />
        </Routes>

        <footer style={{marginTop: '60px', opacity: 0.5, fontSize: '0.8rem'}}>
          &copy; 2026 MEKOU Project.
        </footer>
      </div>
    </Router>
  )
}

export default App