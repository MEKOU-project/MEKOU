import { useState } from 'react';
import { Link } from 'react-router-dom';

// 実際には fetch や import historyData from './history.json' で読み込む
const historyData = [
  {
    date: "2026-02-15",
    category: "MARKET",
    event: "寮内フィールドワーク完了 (n=69)",
    detail: "予算バンドが1万〜3万であることを特定。8万以上の高価格帯への拒絶反応を確認。"
  },
  {
    date: "2026-02-10",
    category: "ENGINE",
    event: "MEKOU Portal プロトタイプ開発",
    detail: "Frutiger Aero 思想に基づいたUIを実装。PROGRESSおよびHISTORYモジュールの稼働。"
  },
  {
    date: "2026-01-13",
    category: "LOGIC",
    event: "血縁と宿命の再確認",
    "detail": "家系の系譜（マイニング、官僚、製造）をMEKOUの論理に統合。"
  }
];

function HISTORY() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <div className="fade-in" style={{padding: '20px', maxWidth: '800px', margin: '0 auto'}}>
      <h1 className="neu-inset" style={{textAlign: 'center', marginBottom: '40px'}}>HISTORY</h1>
      
      <div className="timeline-container">
        {historyData.map((item, idx) => (
          <div key={idx} className="neu-card" style={{marginBottom: '20px', textAlign: 'left'}} onClick={() => setOpenIdx(openIdx === idx ? null : idx)}>
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '10px'}}>
              <span style={{fontSize: '0.8rem', color: 'var(--accent-color)', fontWeight: 'bold'}}>{item.date}</span>
              <span style={{fontSize: '0.7rem', opacity: 0.6}}>[{item.category}]</span>
            </div>
            <h3 style={{fontSize: '1.1rem', margin: '0'}}>{item.event}</h3>
            
            {openIdx === idx && (
              <div className="neu-inset" style={{marginTop: '15px', fontSize: '0.9rem', lineHeight: '1.6'}}>
                {item.detail}
              </div>
            )}
          </div>
        ))}
      </div>

      <Link to="/" className="neu-card" style={{display: 'block', marginTop: '40px', textAlign: 'center', textDecoration: 'none'}}>
        RETURN TO ROOT
      </Link>
    </div>
  );
}

export default HISTORY;