import { useState } from 'react'
// App.tsx
import './App.css'

function App() {
  return (
    <div className="App">
      <header>
        <h1>Welcome to <span className="highlight">MEKOU</span></h1>
        <p className="manifesto">同じ朝は来ない</p>
      </header>

      {/* 思想・マニフェストセクション（凹型で深く刻む） */}
      <section className="neu-inset">
        <p>
          既存のインフラ、法律、そしてPDFに埋もれた悪意。<br />
          MEKOUは、自律した経済、自給自足のエネルギー、そして透明な論理（ミエール）によって、民衆の手に独立を取り戻す。
        </p>
      </section>

      {/* 4本柱のグリッド（凸型で押し出す） */}
      <div>
        <a href="#miero" className="neu-card">
          <h2>論理：ミエール</h2>
          <p style={{fontSize: '0.8rem', marginTop: '8px', color: '#a0a0aa'}}>国家汚染度の可視化</p>
        </a>

        <a href="#engine" className="neu-card">
          <h2>技術：MEKOU ENGINE</h2>
          <p style={{fontSize: '0.8rem', marginTop: '8px', color: '#a0a0aa'}}>次世代3D/VR基盤</p>
        </a>

        <a href="#delsite" className="neu-card">
          <h2>経済：DELSITE</h2>
          <p style={{fontSize: '0.8rem', marginTop: '8px', color: '#a0a0aa'}}>内部通貨と独自の経済圏</p>
        </a>

        <a href="#commune" className="neu-card">
          <h2>物理：COMMUNE</h2>
          <p style={{fontSize: '0.8rem', marginTop: '8px', color: '#a0a0aa'}}>介護施設と中立住居</p>
        </a>
      </div>

      {/* ロードマップ（凹型） */}
      <section className="neu-inset" style={{marginTop: '40px'}}>
        <h2 style={{marginBottom: '10px'}}>VICTORY CONDITION</h2>
        <ul style={{fontSize: '0.9rem', paddingLeft: '20px'}}>
          <li>情報の民主化とPDF解析ツールの普及</li>
          <li>MEKOU ENGINEによる独自経済圏のVR実装</li>
          <li>物理拠点の設立と食料・エネルギーの確保</li>
        </ul>
      </section>

      <footer style={{marginTop: '60px', opacity: 0.5, fontSize: '0.8rem'}}>
        &copy; 2026 MEKOU Project.
      </footer>
    </div>
  )
}

export default App
