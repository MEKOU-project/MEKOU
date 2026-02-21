import { useState, useEffect } from 'react';

// 仮のデータ構造
interface TraceData {
  id: string;
  title: string;
  category: '中枢' | '都道府県';
  location: string;
  hotScore: number;
  updatedAt: string;
}

function TRACE() {
  const [traces, setTraces] = useState<TraceData[]>([]);

  // TODO: ここでRowPhaserが吐き出したJSONをfetch
  // useEffect(() => { ... }, []);

  return (
    <div className="fade-in" style={{padding: '20px', maxWidth: '900px', margin: '0 auto', color: '#e0e0e0'}}>
      <h1 className="neu-inset" style={{textAlign: 'center', marginBottom: '40px', letterSpacing: '4px'}}>TRACE / MEKOU</h1>

      {/* 1. 日本神エール: マップ可視化セクション */}
      <div className="neu-card" style={{height: '300px', marginBottom: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#1a1a1a'}}>
        <div style={{textAlign: 'center'}}>
          <h2 style={{color: '#ff4d4d'}}>日本神エール</h2>
          <p>MAP VISUALIZER: 悪事の現在地</p>
          <div style={{border: '1px solid #444', padding: '10px', marginTop: '10px'}}>
             [現在、全国の議案をスキャン中...]
          </div>
        </div>
      </div>

      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px'}}>
        {/* 2. 最新情報 */}
        <div className="neu-card">
          <h2 style={{borderBottom: '1px solid #444'}}>最新情報</h2>
          <p style={{fontSize: '0.8rem', opacity: 0.7}}>New Arrivals</p>
          <ul style={{listStyle: 'none', padding: 0}}>
             <li style={{padding: '5px 0'}}>・内閣府: 第177号 提出</li>
             <li style={{padding: '5px 0'}}>・東京都: 財政見直し案</li>
          </ul>
        </div>

        {/* 3. HOTセクション (計算式反映) */}
        <div className="neu-card" style={{borderLeft: '4px solid #ff4d4d'}}>
          <h2 style={{color: '#ff4d4d'}}>HOT</h2>
          <p style={{fontSize: '0.8rem'}}>公式: $Talk \times NewComm^2$</p>
          <div style={{marginTop: '10px'}}>
             <strong>#コロナ条例改正案</strong>
             <div style={{fontSize: '0.7rem', color: '#ff4d4d'}}>CRITICAL LEVEL: MAX</div>
          </div>
        </div>
      </div>

      {/* 4. トレースリスト (カテゴリ分類) */}
      <div className="neu-card" style={{marginTop: '30px'}}>
        <h2>トレースリスト</h2>
        <div style={{display: 'flex', gap: '10px', marginBottom: '20px'}}>
          <button className="neu-button">中枢 (内閣・厚労省)</button>
          <button className="neu-button">都道府県 (北海道〜沖縄)</button>
        </div>
        {/* ここにmap関数でJSON一覧を展開 */}
      </div>
    </div>
  );
}

export default TRACE;