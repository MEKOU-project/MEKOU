// Trace/TraceSystem.tsx
import { useState } from 'react';
import Dashboard from './Dashboard';
import ListView from './ListView';
import TraceView from './TraceView';
import MAP from './MAP';

export default function TraceSystem() {

  const [mode, setMode] = useState<'DASHBOARD' | 'LIST' | 'MAP'>('DASHBOARD');
  const [target, setTarget] = useState<{cat: string, id: string} | null>(null);
  const [filterCat, setFilterCat] = useState<string | undefined>(undefined);

  const handleSelect = (cat: string, id: string) => {
    if (id === "latest") {
      setFilterCat(cat);
      setMode('LIST'); // 画面をリストへ切り替え
    } else {
      setTarget({ cat, id }); // 詳細オーバーレイを表示
    }
  };

  return (
    <div className="trace-system-root">
      {/* メインビューの切り替え */}
      {mode === 'DASHBOARD' && <Dashboard onSelect={handleSelect} />}
      {mode === 'LIST' && (
        <ListView 
          filterCat={filterCat} 
          onSelect={handleSelect} 
          onClearFilter={() => setFilterCat(undefined)} 
        />
      )}
      {mode === 'MAP' && <MAP onSelect={handleSelect} />}

      {/* 詳細表示 (TraceView) は常に最前面で待機 */}
      {target && (
        <div className="trace-overlay" style={{position: 'fixed', inset: 0, zIndex: 9999, background: '#000'}}>
          <TraceView cat={target.cat} id={target.id} onBack={() => setTarget(null)} />
        </div>
      )}

      {/* Trace内専用ナビ */}
      <nav className="bottom-nav">
        <button onClick={() => {setMode('DASHBOARD'); setTarget(null);}}>CORE</button>
        <button onClick={() => {setMode('LIST'); setTarget(null);}}>ARCHIVE</button>
        <button onClick={() => {setMode('MAP'); setTarget(null);}}>MAP</button>
      </nav>
    </div>
  );
}