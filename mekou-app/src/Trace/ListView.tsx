// ListView.tsx
import { useState, useEffect } from 'react';

const STORAGE_ROOT = `${import.meta.env.BASE_URL}RowData/`;

export default function ListView({ filterCat, onSelect }: any) {
  const [allItems, setAllItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadEverything() {
      setLoading(true);
      try {
        // 1. まずルートの索引を読む
        const rootRes = await fetch(`${STORAGE_ROOT}index.json`);
        const rootData = await rootRes.json(); // { categories: [...] }

        // 2. 各カテゴリの index.json を並列で全部読みに行く
        const detailPromises = rootData.categories.map(async (cat: any) => {
          const res = await fetch(`${STORAGE_ROOT}${cat.path}`);
          if (!res.ok) return [];
          const data = await res.json(); // 各ディレクトリの index.json
          const pathParts = cat.path.split('/').filter(Boolean);
          const dirName = pathParts[0];
          console.log(`LOADED_CATEGORY: ${dirName} with ${data.list.length} items`);
          
          // データに「どの省庁か」という情報を付与してフラットにする
          return data.list.map((item: any) => ({
            ...item,
            category: dirName,
            displayCat: cat.name
          }));
        });

        const results = await Promise.all(detailPromises);
        const merged = results.flat().sort((a, b) => b.time.localeCompare(a.time));
        
        setAllItems(merged);
      } catch (e) {
        console.error("DATA_LOAD_ERROR", e);
      } finally {
        setLoading(false);
      }
    }
    loadEverything();
  }, []);

  // フィルタリング
  const displayItems = filterCat 
    ? allItems.filter(i => i.category === filterCat)
    : allItems;

  if (loading) return <div>FETCHING_ALL_ARCHIVES...</div>;

return (
  <div className="list-container">
    <h3 className="list-title">{filterCat ? `FILTER: ${filterCat}` : "ALL_DATA_STREAM"}</h3>
    <div className="mekou-grid">
      {displayItems.map((item) => (
        <div 
          key={`${item.category}-${item.id}`} 
          className="neu-card clickable-row" 
          onClick={() => {
            console.log("SENDING_ITEM_TO_TRACEVIEW:", item);
            onSelect(item.category, item.id); // IDだけでなくオブジェクトごと渡す
          }
        }
        >
          {/* カードの中身はそのまま */}
          <div className="card-inner">
            <span className="agency-tag">{item.displayCat}</span>
            <span className="date-tag">{item.time}</span>
          </div>
          <div className="card-body">
            <p className="item-title">{item.title}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);
}