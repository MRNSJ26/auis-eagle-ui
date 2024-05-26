export interface Profile {
  full_name: string|null
  email: string|null
  gpa?: number|null
  crdits?: number|null
  major?: string|null
  minor?: string|null
  photo?: string|null
  start_year?: string|null
  completed_classes?: string[]|null
  in_progress_clssses?: string[]|null
}

export interface Token {
  email: string | null
  token: string | null
}