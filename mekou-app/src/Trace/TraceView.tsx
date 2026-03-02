import { useState, useEffect } from 'react';

export default function TraceView({ cat, id, onBack }: any) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`${import.meta.env.BASE_URL}RowData/${cat}/${id}.json`);
        const json = await res.json();
        setData(json);
      } catch (e) {
        console.error("TRACE_LOAD_ERROR", e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [cat, id]);

  if (loading) return <div className="animate-flicker">ACCESSING_ARCHIVE...</div>;
  if (!data) return <div>DATA_NOT_FOUND</div>;

  // llama_analysis があればそちらを、なければ全体をダンプ
  const chunks = data.llama_analysis?.chunks || [];

  return (
    <div className="trace-view-container">
      <header className="trace-header">
        <h2 className="section-title-blue">ANALYSIS_REPORT: {id}</h2>
      </header>

      <div className="analysis-feed">
        {chunks.map((chunk: any, i: number) => (
          <div key={i} className="neu-inset chunk-card">
            <div className="chunk-header">
              <span className="label">PURPOSE</span>
              <h3 className="purpose-text">{chunk.purpose || "UNKNOWN"}</h3>
            </div>

            <div className="chunk-body">
                <span className="label">CHANGES</span>
                <ul className="changes-list">
                    {chunk.changes?.map((c: any, j: number) => (
                    <li key={j} className="change-item">
                        {/* 文字列ならそのまま、オブジェクトなら new/old を展開 */}
                        {typeof c === 'string' 
                        ? c 
                        : `[UPDATE] ${c.old || ''} → ${c.new || ''}`
                        }
                    </li>
                    ))}
                </ul>
                </div>

            {(chunk.enforcement_date || chunk.penalties) && (
              <footer className="chunk-meta">
                {chunk.enforcement_date && <span>DATE: {chunk.enforcement_date}</span>}
                {chunk.penalties && <span className="highlight">PENALTY: {chunk.penalties}</span>}
              </footer>
            )}
          </div>
        ))}
        {data.gemini_review && typeof data.gemini_review === 'string' ? (
          <section className="neu-inset" style={{marginBottom: '30px', borderLeft: '3px solid var(--accent-red)'}}>
            <span className="label" style={{color: 'var(--accent-red)'}}>SYSTEM_INTERPRETATION</span>
            <p style={{fontSize: '0.9rem', lineHeight: '1.6', marginTop: '10px'}}>
              {data.gemini_review}
            </p>
          </section>
        ) : data.gemini_review?.error ? (
          <section className="neu-inset" style={{marginBottom: '30px', opacity: 0.5}}>
            <span className="label">SYSTEM_STATUS</span>
            <p style={{fontSize: '0.8rem', marginTop: '10px'}}>ANALYSIS_FAILED: RESOURCE_EXHAUSTED</p>
          </section>
        ) : null}
      </div>
        <div className="trace-footer" style={{
            display: 'flex', 
            gap: '15px', 
            padding: '20px 0', 
            justifyContent: 'center',
            borderTop: '1px solid rgba(255,255,255,0.05)'
            }}>
            <button className="neu-card" onClick={onBack} style={{ flex: 1, fontSize: '0.8rem' }}>
                ← BACK
            </button>
            
            <a 
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`【MEKOU_LOG】法案ID:${id} の論理の歪みを検知。 #MEKOU #思考の再起動`)}&url=${encodeURIComponent(window.location.href)}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="neu-card"
                style={{ 
                flex: 1, /* ポストボタンを少し大きくして強調 */
                fontSize: '0.8rem', 
                color: '#1DA1F2', 
                textAlign: 'center',
                textDecoration: 'none'
                }}
            >
                POST_TO_X_FOR_DISCUSSION
            </a>
            </div>
    </div>
  );
}