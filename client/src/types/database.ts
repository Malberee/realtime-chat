import { MergeDeep } from 'type-fest'

import { Database as DatabaseGenerated } from './database-generated'

export type Avatar = {
  chin: number
  hair: number
  nose: number
  mouth: number
  forehead: number
  backgroundColor: number
  foregroundColor: number
}

export type MessageType = Omit<
  Database['public']['Tables']['messages']['Row'],
  'author_id'
>

export type Database = MergeDeep<
  DatabaseGenerated,
  {
    public: {
      Tables: {
        messages: {
          Row: {
            author_id: never
            author: DatabaseGenerated['public']['Tables']['profiles']['Row']
          }
        }
        profiles: {
          Row: {
            avatar: Avatar
          }
          // Optional: Use if you want type-checking for inserts and updates
          // Insert: {
          //   data?: CustomJsonType | null;
          // };
          // Update: {
          //   data?: CustomJsonType | null;
          // };
        }
      }
    }
  }
>
