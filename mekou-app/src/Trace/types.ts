export interface CategoryMeta { 
  name: string; 
  path: string; 
  file_count: number; 
}
export interface MasterData { 
  categories: CategoryMeta[]; 
}
export interface IndexItem {
  id: string;
  title: string;
  time: string;
  category: string;
}