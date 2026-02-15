import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// 本来は外部JSONから読み込むが、ここでは定義
const progressData = [
  {
    phase: "Phase 0.5",
    title: "市場調査・DCON",
    tasks: [
      { label: "寮内フィールドワーク (n=69)", isOk: true },
      { label: "予算・需要バンドの特定", isOk: true },
      { label: "DCON本選登壇・投資家交渉", isOk: false }
    ]
  },
  {
    phase: "Phase 1",
    title: "社会実装・独立圏構築",
    tasks: [
      { label: "介護施設への技術売却・導入", isOk: false },
      { label: "自社介護施設の建設・検証", isOk: false },
      { label: "食品流通最適化（ロス削減）", isOk: false }
    ]
  }
];

function PROGRESS() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <div className="fade-in" style={{padding: '20px', maxWidth: '800px', margin: '0 auto'}}>
      <h1 className="neu-inset" style={{textAlign: 'center', marginBottom: '40px'}}>PROGRESS</h1>

      {progressData.map((item, idx) => {
        // OKの割合を計算
        const okCount = item.tasks.filter(t => t.isOk).length;
        const rate = Math.round((okCount / item.tasks.length) * 100);

        return (
          <div key={idx} className="neu-card" style={{marginBottom: '30px', textAlign: 'left'}} onClick={() => setOpenIdx(openIdx === idx ? null : idx)}>
            <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem'}}>
              <span>{item.phase}</span>
              <span>{rate}% COMPLETED</span>
            </div>
            <h2 style={{margin: '10px 0'}}>{item.title}</h2>
            
            {/* プログレスバー */}
            <div className="neu-inset" style={{height: '12px', padding: '2px', margin: '10px 0'}}>
              <div style={{
                width: `${rate}%`,
                height: '100%',
                background: 'var(--accent-color)',
                borderRadius: '10px',
                boxShadow: '0 0 10px rgba(0, 168, 255, 0.5)',
                transition: 'width 0.8s ease-out'
              }}></div>
            </div>

            {/* タップで展開される詳細 */}
            {openIdx === idx && (
              <ul style={{marginTop: '20px', listStyle: 'none', paddingLeft: '5px', fontSize: '0.9rem'}}>
                {item.tasks.map((task, tIdx) => (
                  <li key={tIdx} style={{marginBottom: '8px', display: 'flex', alignItems: 'center'}}>
                    <span style={{marginRight: '10px'}}>{task.isOk ? '☑' : '☐'}</span>
                    <span style={{opacity: task.isOk ? 1 : 0.6}}>{task.label}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      })}

      <Link to="/" className="neu-card" style={{display: 'block', marginTop: '40px', textAlign: 'center', textDecoration: 'none'}}>
        RETURN TO ROOT
      </Link>
    </div>
  );
}

export default PROGRESS;