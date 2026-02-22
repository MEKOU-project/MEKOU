import { useState, useEffect } from 'react';

const DB: any = {
  '195': { title: '国家公務員給与法', time: '20:15', chunks: ['給与87%制限', '附則21項適用'] },
  'covid-19': { title: 'コロナ条例改正案', time: '19:40', chunks: ['宿泊施設確保義務', '保健所連携強化'] },
  'tpp-01': { title: 'TPP著作権法改正', time: '18:20', chunks: ['非親告罪化の範囲', '保護期間延長'] },
  'tax-2026': { title: '消費税増税附則', time: '17:55', chunks: ['還付制限の撤廃', 'インボイス詳細修正'] },
  'energy-04': { title: '再エネ特措法', time: '16:10', chunks: ['出力制御の強制', '賦課金単価改定'] }
};

function TRACE() {
  const [selectedId, setSelectedId] = useState<string>('195');
  const [slotIndex, setSlotIndex] = useState(0);

  const hotTraces = Object.keys(DB).map(key => ({ id: key, ...DB[key] }));

  // スロットの回転ロジック
  useEffect(() => {
    const timer = setInterval(() => {
      setSlotIndex((prev) => (prev + 1) % hotTraces.length);
    }, 4000); // 4秒ごとに回転
    return () => clearInterval(timer);
  }, [hotTraces.length]);

  return (
    <div className="trace-root fade-in">
      <style>{`
        .trace-root {
          background-color: #000; /* 完全な黒 */
          min-height: 100vh;
          color: #e0e0e0;
          padding: 20px;
          font-family: 'Share Tech Mono', 'Courier New', monospace;
        }

        /* スロット・バーティカル・カルーセル */
        .slot-machine {
          height: 80px;
          overflow: hidden;
          background: #0a0a0a;
          border: 1px solid #333;
          position: relative;
          margin-bottom: 20px;
        }
        .slot-wrapper {
          transition: transform 0.8s cubic-bezier(0.65, 0, 0.35, 1);
          transform: translateY(-${slotIndex * 80}px);
        }
        .slot-item {
          height: 80px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 0 20px;
          border-left: 4px solid #ff4d4d;
        }

        /* 斜線アニメーション */
        .stripe-loader {
          height: 4px;
          background: linear-gradient(-45deg, #ff4d4d 25%, transparent 25%, transparent 50%, #ff4d4d 50%, #ff4d4d 75%, transparent 75%);
          background-size: 20px 20px;
          animation: barberpole 1s linear infinite;
        }
        @keyframes barberpole { from {background-position: 0 0;} to {background-position: 40px 0;} }

        .neu-card {
          background: #0a0a0a;
          border: 1px solid #222;
          border-radius: 4px; /* あえて角を丸めすぎない */
          padding: 20px;
          box-shadow: inset 0 0 20px rgba(0,0,0,1);
        }

        .active-id { color: #ff4d4d; text-shadow: 0 0 8px #ff4d4d; }
      `}</style>

      <div style={{maxWidth: '1000px', margin: '0 auto'}}>
        <h1 className="neu-inset" style={{textAlign: 'center', color: '#ff4d4d', letterSpacing: '8px', marginBottom: '40px'}}>
          AUDIT / TRACE
        </h1>

        {/* TOP: HOT SLOT */}
        <div className="slot-machine neu-card">
          <div className="slot-wrapper">
            {hotTraces.map((t) => (
              <div key={t.id} className="slot-item" onClick={() => setSelectedId(t.id)} style={{cursor: 'pointer'}}>
                <div style={{fontSize: '0.7rem', color: '#888'}}>CRITICAL_HOT_ANALYSIS // ID: {t.id}</div>
                <div style={{fontSize: '1.2rem', color: '#ff4d4d'}}>{t.title}</div>
              </div>
            ))}
          </div>
          <div className="stripe-loader" style={{position: 'absolute', bottom: 0, left: 0}}></div>
        </div>

        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px'}}>
          {/* 詳細表示 */}
          <div className="neu-card" style={{gridColumn: 'span 2', borderTop: '2px solid #ff4d4d'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '20px'}}>
              <h2 className="active-id">NODE_{selectedId}</h2>
              <div style={{fontSize: '0.8rem', textAlign: 'right'}}>
                <span style={{color: '#888'}}>TIMESTAMP:</span><br/>
                {DB[selectedId].time} SCAN_COMPLETED
              </div>
            </div>
            <div className="analysis-content">
              {DB[selectedId].chunks.map((c: string, i: number) => (
                <div key={i} className="neu-inset" style={{padding: '10px', marginBottom: '10px', fontSize: '0.9rem', borderLeft: '2px solid #ff4d4d'}}>
                  {c}
                </div>
              ))}
            </div>
          </div>

          {/* 右側：簡易リスト or ステータス */}
          <div className="neu-card">
            <h2 style={{fontSize: '1rem', borderBottom: '1px solid #333', paddingBottom: '10px'}}>ARCHIVE_LOG</h2>
            {Object.keys(DB).map(key => (
              <div key={key} onClick={() => setSelectedId(key)} 
                   style={{padding: '10px 0', cursor: 'pointer', fontSize: '0.8rem', borderBottom: '1px solid #111', color: selectedId === key ? '#ff4d4d' : '#888'}}>
                {DB[key].title}
              </div>
            ))}
          </div>
        </div>

        {/* 下部：MAP / LIST プレースホルダー */}
        <div className="neu-card" style={{marginTop: '20px', textAlign: 'center', opacity: 0.5}}>
          <p>[ GEO-LOCATION MAP VIEW - UNDER CONSTRUCTION ]</p>
        </div>
      </div>
    </div>
  );
}

export default TRACE;