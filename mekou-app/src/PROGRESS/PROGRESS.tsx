import { useState } from 'react';
import { Link } from 'react-router-dom';

// 本来は外部JSONから読み込むが、ここでは定義
const progressData = [
  {
    phase: "Phase 0.5",
    title: "市場調査・DCON",
    tasks: [
      { label: "MEKOU ENGINEのHP作成", isOk: true },
      { label: "法律のトレースシステムの開発、プロトタイプ", isOk: true },
      { label: "音声メモシステム開発", isOk: false},
      { label: "MEKOU ENGINEの開発が８０％を超える", isOk: false},
      { label: "資金が2000万に到達", isOk: false }
    ]
  },
  {
    phase: "Phase 1",
    title: "自立型コミュニティ・社会実証",
    tasks: [
      { label: "介護施設への技術売却・導入", isOk: false },
      { label: "資金が2000万に到達", isOk: false },
      { label: "自社介護施設の建設・検証", isOk: false },
      { label: "食品流通最適化", isOk: false }
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
            <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', letterSpacing: '0.2em'}}>
              <span style={{opacity: 0.6}}>{item.phase}</span>
              {/* パーセント表示をネオンブルーで激しく光らせる */}
              <span style={{
                color: 'var(--accent-blue)', 
                fontWeight: 'bold', 
                textShadow: '0 0 12px var(--accent-blue), 0 0 20px var(--accent-blue)'
              }}>
                {rate}% <span style={{fontSize: '0.6rem', opacity: 0.8}}>STATUS: LOADED</span>
              </span>
            </div>

          <div className="neu-inset" style={{height: '20px', padding: '4px', margin: '15px 0', background: '#000'}}>
            <div style={{
              width: `${rate}%`,
              height: '100%',
              /* 強力なグラデーションとスキャンライン効果 */
              background: 'linear-gradient(90deg, #0055ff, #00ffff)',
              borderRadius: '10px',
              boxShadow: '0 0 20px var(--accent-blue)',
              transition: 'width 2s cubic-bezier(0.19, 1, 0.22, 1)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* バーの中に流れる光の筋を追加 */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: '-100%',
                width: '100%',
                height: '100%',
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                animation: 'bar-scan 2s infinite'
              }}></div>
            </div>
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