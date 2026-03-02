import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import PROGRESS from './PROGRESS/PROGRESS'
import HISTORY from './HISTORY/HISTORY'
import TraceSystem from './Trace/TraceSystem'
import { useEffect, useState } from 'react'
// 他のページも同様に作成・インポート


const MANIFESTOS = [
  "同じ朝は来ない",
  "自給自足のエネルギー",
  "国民の自立",
  "自律した経済"
];

function Home() {

  return (
    <>
      <section className="neu-inset">
        <p style={{padding: '0 10px'}}>MEKOUは、自律した経済、自給自足のエネルギー、国民の自立を目指すプロジェクトです</p>
      </section>

      <div className="grid-container">
        <Link to="/Dashboard" className="neu-card">
          <h2 className="section-title-blue">論理：トレース</h2>
          <p className="sub-text">法律の可視化</p>
        </Link>

        <Link to="/engine" className="neu-card">
          <h2 className="section-title-blue">技術：MEKOU ENGINE</h2>
          <p className="sub-text">AI・VRによる可視化とシミュレーション</p>
        </Link>

        <Link to="/progress" className="neu-card">
          <h2 className="section-title-blue">進捗：PROGRESS</h2>
          <p className="sub-text">MEKOUプロジェクトの進行状況</p>
        </Link>

        <Link to="/history" className="neu-card">
          <h2 className="section-title-blue">履歴：HISTORY</h2>
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

    const [index, setIndex] = useState(0);
  useEffect(() => {
      const timer = setInterval(() => {
        setIndex((prev) => (prev + 1) % MANIFESTOS.length);
      }, 4000); // 4秒ごとに切り替え
      return () => clearInterval(timer);
    }, []);

  return (
    <Router basename={import.meta.env.BASE_URL}>
      <div className="App">
        <header>
          <Link to="/" style={{textDecoration: 'none', color: 'inherit'}}>
            <h1>Welcome to <span className="highlight">MEKOU</span></h1>
            <div className="manifesto-container neu-inset">
              <p className="manifesto animate-flicker">{MANIFESTOS[index]}</p>
            </div>
          </Link>
        </header>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/progress" element={<PROGRESS />} />
          <Route path="/history" element={<HISTORY />} />
          {/* ここを TraceSystem に差し替え */}
          <Route path="/dashboard" element={<TraceSystem />} />
          <Route path="*" element={<div>UNDER CONSTRUCTION</div>} />
        </Routes>

        <footer style={{marginTop: '60px', opacity: 0.5, fontSize: '0.8rem'}}>
          &copy; 2026 MEKOU Project.
        </footer>
      </div>
    </Router>
  )
}

export default App