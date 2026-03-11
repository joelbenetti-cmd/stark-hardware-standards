export interface Fastener {
  id?: string;
  internal_code: string;
  category: string;
  standard: string;
  type: string;
  thread: string;
  length_mm: number;
  head_type: string;
  drive_type: string;
  material: string;
  strength_grade: string;
  coating: string;
  usage: string;
  notes: string;
  created_at?: string;
}

export type FastenerFilters = {
  search: string;
  category: string;
  thread: string;
  type: string;
  material: string;
  minLength: string;
  maxLength: string;
};
