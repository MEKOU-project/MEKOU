import { useState } from 'react';
import Dashboard from './Dashboard';
import ListView from './ListView';
import TraceView from './TraceView';
import MAP from './MAP';
import './index.css';

export default function AuditSystem() {
  const [view, setView] = useState<'DASHBOARD' | 'LIST' | 'MAP'>('DASHBOARD');
  const [target, setTarget] = useState<{cat: string, id: string} | null>(null);
  const [filterCat, setFilterCat] = useState<string | undefined>(undefined);

  const handleSelect = (cat: string, id: string) => {
    // 1. 省庁カードやMAPの都道府県をクリックした場合 (最新一覧へ)
    if (id === "latest") {
      setFilterCat(cat); 
      setView('LIST');   
      setTarget(null);   
    } 
    // 2. リスト内の個別アイテムをクリックした場合 (詳細解析へ)
    else {
      setTarget({ cat, id }); 
    }
  };

  return (
    <div className="mekou-root">
      <div className="content-layer">
        {view === 'DASHBOARD' && <Dashboard onSelect={handleSelect} />}
        {view === 'LIST' && (
          <ListView 
            onSelect={handleSelect} 
            filterCat={filterCat} 
            onClearFilter={() => setFilterCat(undefined)} 
          />
        )}
        {view === 'MAP' && <MAP onSelect={handleSelect} />}
      </div>

      {/* 詳細オーバーレイ: targetがある時だけ最前面に描画 */}
      {target && (
        <div className="trace-overlay">
          <TraceView cat={target.cat} id={target.id} onBack={() => setTarget(null)} />
        </div>
      )}

      <nav className="bottom-nav">
        <button onClick={() => { setView('DASHBOARD'); setTarget(null); }} className={view === 'DASHBOARD' ? 'active' : ''}>CORE</button>
        <button onClick={() => { setView('LIST'); setTarget(null); }} className={view === 'LIST' ? 'active' : ''}>ARCHIVE</button>
        <button onClick={() => { setView('MAP'); setTarget(null); }} className={view === 'MAP' ? 'active' : ''}>MAP</button>
      </nav>
    </div>
  );
}