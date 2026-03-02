import { useState, useEffect } from 'react';
import type { MasterData } from './types';

const STORAGE_ROOT = '/RowData/';

export default function MAP({ onSelect }: { onSelect: (cat: string, id: string) => void }) {
  const [master, setMaster] = useState<MasterData | null>(null);
  const [riskMap, setRiskMap] = useState<Record<string, number>>({});

  useEffect(() => {
    async function loadRisk() {
      try {
        const res = await fetch(`${STORAGE_ROOT}index.json`);
        const data: MasterData = await res.json();
        setMaster(data);

        // カテゴリ名から都道府県を抽出し、file_count等をリスク値として集計
        const scores: Record<string, number> = {};
        data.categories.forEach(cat => {
          // 例: "東京都_議案" -> "東京都" を抽出
          const pref = cat.name.split('_')[0];
          scores[pref] = (scores[pref] || 0) + (cat.file_count > 50 ? 1.0 : 0.5);
        });
        setRiskMap(scores);
      } catch (e) { console.error("Map data load failed", e); }
    }
    loadRisk();
  }, []);

  // 都道府県の位置データ（簡略化したグリッドMAP方式）
  const prefs = [
    { name: "北海道", x: 9, y: 0 }, { name: "青森", x: 9, y: 2 }, { name: "岩手", x: 9, y: 3 },
    { name: "宮城", x: 9, y: 4 }, { name: "秋田", x: 8, y: 3 }, { name: "山形", x: 8, y: 4 },
    { name: "福島", x: 9, y: 5 }, { name: "茨城", x: 9, y: 6 }, { name: "栃木", x: 8, y: 6 },
    { name: "群馬", x: 7, y: 6 }, { name: "埼玉", x: 8, y: 7 }, { name: "千葉", x: 9, y: 7 },
    { name: "東京都", x: 8, y: 8 }, { name: "神奈川", x: 7, y: 8 }, { name: "新潟", x: 7, y: 4 },
    { name: "富山", x: 6, y: 4 }, { name: "石川", x: 5, y: 4 }, { name: "福井", x: 5, y: 5 },
    { name: "山梨", x: 7, y: 7 }, { name: "長野", x: 6, y: 6 }, { name: "岐阜", x: 5, y: 6 },
    { name: "静岡", x: 6, y: 8 }, { name: "愛知", x: 5, y: 8 }, { name: "三重", x: 4, y: 8 },
    { name: "滋賀", x: 4, y: 6 }, { name: "京都", x: 3, y: 5 }, { name: "大阪", x: 3, y: 7 },
    { name: "兵庫", x: 2, y: 6 }, { name: "奈良", x: 4, y: 7 }, { name: "和歌山", x: 3, y: 8 },
    { name: "鳥取", x: 1, y: 5 }, { name: "島根", x: 0, y: 5 }, { name: "岡山", x: 1, y: 6 },
    { name: "広島", x: 0, y: 6 }, { name: "山口", x: -1, y: 7 }, { name: "徳島", x: 2, y: 9 },
    { name: "香川", x: 1, y: 8 }, { name: "愛媛", x: 0, y: 8 }, { name: "高知", x: 1, y: 9 },
    { name: "福岡", x: -2, y: 7 }, { name: "佐賀", x: -3, y: 7 }, { name: "長崎", x: -4, y: 7 },
    { name: "熊本", x: -3, y: 8 }, { name: "大分", x: -2, y: 8 }, { name: "宮崎", x: -2, y: 9 },
    { name: "鹿児島", x: -3, y: 9 }, { name: "沖縄", x: -4, y: 10 }
  ];

  return (
    <div className="neu-card" style={{ padding: '40px', textAlign: 'center' }}>
      <div style={{ fontSize: '0.7rem', color: '#444', marginBottom: '20px' }}>// GEOGRAPHICAL_RISK_DISTRIBUTION</div>
      
      <div style={{ position: 'relative', width: '600px', height: '500px', margin: '0 auto', background: '#050505', border: '1px solid #1a1a1a' }}>
        {prefs.map(p => {
          const risk = riskMap[p.name] || 0;
          const isActive = risk > 0;
          return (
            <div
              key={p.name}
              onClick={() => {
                if (!isActive) return;

                // masterデータから該当する都道府県のカテゴリを探す
                const matched = master?.categories.find(c => c.name.includes(p.name));
                
                if (matched) {
                  // ディレクトリ名（例: 東京都_提出法案）を抽出
                  const dirName = matched.path.split('/')[0];
                  onSelect(dirName, "latest");
                }
              }}
              style={{
                position: 'absolute',
                left: `${(p.x + 5) * 40}px`,
                top: `${p.y * 40}px`,
                width: '38px',
                height: '38px',
                border: `1px solid ${isActive ? '#ff4d4d' : '#222'}`,
                background: isActive ? `rgba(255, 77, 77, ${0.1 + (risk * 0.3)})` : '#0a0a0a',
                color: isActive ? '#ff4d4d' : '#333',
                fontSize: '0.6rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: isActive ? 'pointer' : 'default',
                boxShadow: isActive ? `0 0 ${risk * 15}px rgba(255, 77, 77, 0.5)` : 'none',
                transition: '0.3s'
              }}
            >
              {p.name.substring(0, 2)}
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'center', gap: '20px', fontSize: '0.6rem' }}>
        <span style={{ color: '#222' }}>■ LOW_RISK</span>
        <span style={{ color: '#ff4d4d' }}>■ HIGH_RISK_DETECTED</span>
      </div>
    </div>
  );
}