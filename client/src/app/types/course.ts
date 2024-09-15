import { Lesson } from './lesson'
import { Teacher } from './teacher'
import { Category } from './category'
export interface Course {
  id?: number
  category_id?: number
  title?: string
  level?: string
  description?: string
  teacher_id?: number
  created_at?: string
  updated_at?: string
  image_url?: string
  lessons?: Lesson[]
  teacher?: Teacher
  category?: Category
}
