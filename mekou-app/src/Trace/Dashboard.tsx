import { useState, useEffect } from 'react';
import type { MasterData } from './types';

const STORAGE_ROOT = '/RowData/';
const AGENCIES = ["内閣府", "総務省", "法務省", "外務省", "財務省", "文部科学省", "厚生労働省", "農林水産省", "経済産業省", "国土交通省", "環境省", "防衛省", "警察庁"];

export default function Dashboard({ onSelect }: { onSelect: (cat: string, id: string) => void }) {
  const [master, setMaster] = useState<MasterData | null>(null);

  useEffect(() => {
    fetch(`${STORAGE_ROOT}index.json`)
      .then(res => res.json())
      .then(setMaster)
      .catch(console.error);
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>AGENCY_DIRECTORY</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '10px' }}>
        {AGENCIES.map(name => {
          const matched = master?.categories.find(c => c.name.includes(name));
          const dirName = matched?.path.split('/')[0];
          return (
            <div 
              key={name}
              onClick={() => matched && dirName && onSelect(dirName, "latest")}
              style={{
                padding: '15px',
                border: `1px solid ${matched ? '#f00' : '#333'}`,
                cursor: matched ? 'pointer' : 'default',
                opacity: matched ? 1 : 0.3
              }}
            >
              {name} ({matched?.file_count || 0})
            </div>
          );
        })}
      </div>
    </div>
  );
}