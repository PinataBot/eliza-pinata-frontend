export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type SupabaseDatabase = {
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          operationName?: string;
          query?: string;
          variables?: Json;
          extensions?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      accounts: {
        Row: {
          avatarUrl: string | null;
          createdAt: string | null;
          details: Json | null;
          email: string;
          id: string;
          name: string | null;
          username: string | null;
        };
        Insert: {
          avatarUrl?: string | null;
          createdAt?: string | null;
          details?: Json | null;
          email: string;
          id: string;
          name?: string | null;
          username?: string | null;
        };
        Update: {
          avatarUrl?: string | null;
          createdAt?: string | null;
          details?: Json | null;
          email?: string;
          id?: string;
          name?: string | null;
          username?: string | null;
        };
        Relationships: [];
      };
      blobs: {
        Row: {
          blobId: string | null;
          blobObjectId: string | null;
          content: Json | null;
          createdAt: string;
          id: string;
          type: string | null;
        };
        Insert: {
          blobId?: string | null;
          blobObjectId?: string | null;
          content?: Json | null;
          createdAt?: string;
          id?: string;
          type?: string | null;
        };
        Update: {
          blobId?: string | null;
          blobObjectId?: string | null;
          content?: Json | null;
          createdAt?: string;
          id?: string;
          type?: string | null;
        };
        Relationships: [];
      };
      cache: {
        Row: {
          agentId: string;
          createdAt: string | null;
          expiresAt: string | null;
          key: string;
          value: Json | null;
        };
        Insert: {
          agentId: string;
          createdAt?: string | null;
          expiresAt?: string | null;
          key: string;
          value?: Json | null;
        };
        Update: {
          agentId?: string;
          createdAt?: string | null;
          expiresAt?: string | null;
          key?: string;
          value?: Json | null;
        };
        Relationships: [];
      };
      goals: {
        Row: {
          createdAt: string | null;
          description: string | null;
          id: string;
          name: string | null;
          objectives: Json;
          roomId: string | null;
          status: string | null;
          userId: string | null;
        };
        Insert: {
          createdAt?: string | null;
          description?: string | null;
          id: string;
          name?: string | null;
          objectives?: Json;
          roomId?: string | null;
          status?: string | null;
          userId?: string | null;
        };
        Update: {
          createdAt?: string | null;
          description?: string | null;
          id?: string;
          name?: string | null;
          objectives?: Json;
          roomId?: string | null;
          status?: string | null;
          userId?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "fk_room";
            columns: ["roomId"];
            isOneToOne: false;
            referencedRelation: "rooms";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "fk_user";
            columns: ["userId"];
            isOneToOne: false;
            referencedRelation: "accounts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "goals_roomId_fkey";
            columns: ["roomId"];
            isOneToOne: false;
            referencedRelation: "rooms";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "goals_userId_fkey";
            columns: ["userId"];
            isOneToOne: false;
            referencedRelation: "accounts";
            referencedColumns: ["id"];
          },
        ];
      };
      knowledge: {
        Row: {
          agentId: string | null;
          chunkIndex: number | null;
          content: Json;
          createdAt: string | null;
          embedding: string | null;
          id: string;
          isMain: boolean | null;
          isShared: boolean | null;
          originalId: string | null;
        };
        Insert: {
          agentId?: string | null;
          chunkIndex?: number | null;
          content: Json;
          createdAt?: string | null;
          embedding?: string | null;
          id: string;
          isMain?: boolean | null;
          isShared?: boolean | null;
          originalId?: string | null;
        };
        Update: {
          agentId?: string | null;
          chunkIndex?: number | null;
          content?: Json;
          createdAt?: string | null;
          embedding?: string | null;
          id?: string;
          isMain?: boolean | null;
          isShared?: boolean | null;
          originalId?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "knowledge_agentId_fkey";
            columns: ["agentId"];
            isOneToOne: false;
            referencedRelation: "accounts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "knowledge_originalId_fkey";
            columns: ["originalId"];
            isOneToOne: false;
            referencedRelation: "knowledge";
            referencedColumns: ["id"];
          },
        ];
      };
      logs: {
        Row: {
          body: Json;
          createdAt: string | null;
          id: string;
          roomId: string;
          type: string;
          userId: string;
        };
        Insert: {
          body: Json;
          createdAt?: string | null;
          id?: string;
          roomId: string;
          type: string;
          userId: string;
        };
        Update: {
          body?: Json;
          createdAt?: string | null;
          id?: string;
          roomId?: string;
          type?: string;
          userId?: string;
        };
        Relationships: [
          {
            foreignKeyName: "fk_room";
            columns: ["roomId"];
            isOneToOne: false;
            referencedRelation: "rooms";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "fk_user";
            columns: ["userId"];
            isOneToOne: false;
            referencedRelation: "accounts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "logs_roomId_fkey";
            columns: ["roomId"];
            isOneToOne: false;
            referencedRelation: "rooms";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "logs_userId_fkey";
            columns: ["userId"];
            isOneToOne: false;
            referencedRelation: "accounts";
            referencedColumns: ["id"];
          },
        ];
      };
      memories_1024: {
        Row: {
          agentId: string | null;
          content: Json;
          createdAt: string | null;
          embedding: string | null;
          id: string;
          roomId: string | null;
          type: string;
          unique: boolean;
          userId: string | null;
        };
        Insert: {
          agentId?: string | null;
          content: Json;
          createdAt?: string | null;
          embedding?: string | null;
          id: string;
          roomId?: string | null;
          type: string;
          unique?: boolean;
          userId?: string | null;
        };
        Update: {
          agentId?: string | null;
          content?: Json;
          createdAt?: string | null;
          embedding?: string | null;
          id?: string;
          roomId?: string | null;
          type?: string;
          unique?: boolean;
          userId?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "fk_agent";
            columns: ["agentId"];
            isOneToOne: false;
            referencedRelation: "accounts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "fk_room";
            columns: ["roomId"];
            isOneToOne: false;
            referencedRelation: "rooms";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "fk_user";
            columns: ["userId"];
            isOneToOne: false;
            referencedRelation: "accounts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "memories_1024_agentId_fkey";
            columns: ["agentId"];
            isOneToOne: false;
            referencedRelation: "accounts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "memories_1024_roomId_fkey";
            columns: ["roomId"];
            isOneToOne: false;
            referencedRelation: "rooms";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "memories_1024_userId_fkey";
            columns: ["userId"];
            isOneToOne: false;
            referencedRelation: "accounts";
            referencedColumns: ["id"];
          },
        ];
      };
      memories_1536: {
        Row: {
          agentId: string | null;
          content: Json;
          createdAt: string | null;
          embedding: string | null;
          id: string;
          roomId: string | null;
          type: string;
          unique: boolean;
          userId: string | null;
        };
        Insert: {
          agentId?: string | null;
          content: Json;
          createdAt?: string | null;
          embedding?: string | null;
          id: string;
          roomId?: string | null;
          type: string;
          unique?: boolean;
          userId?: string | null;
        };
        Update: {
          agentId?: string | null;
          content?: Json;
          createdAt?: string | null;
          embedding?: string | null;
          id?: string;
          roomId?: string | null;
          type?: string;
          unique?: boolean;
          userId?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "fk_agent";
            columns: ["agentId"];
            isOneToOne: false;
            referencedRelation: "accounts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "fk_room";
            columns: ["roomId"];
            isOneToOne: false;
            referencedRelation: "rooms";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "fk_user";
            columns: ["userId"];
            isOneToOne: false;
            referencedRelation: "accounts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "memories_1536_agentId_fkey";
            columns: ["agentId"];
            isOneToOne: false;
            referencedRelation: "accounts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "memories_1536_roomId_fkey";
            columns: ["roomId"];
            isOneToOne: false;
            referencedRelation: "rooms";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "memories_1536_userId_fkey";
            columns: ["userId"];
            isOneToOne: false;
            referencedRelation: "accounts";
            referencedColumns: ["id"];
          },
        ];
      };
      memories_384: {
        Row: {
          agentId: string | null;
          content: Json;
          createdAt: string | null;
          embedding: string | null;
          id: string;
          roomId: string | null;
          type: string;
          unique: boolean;
          userId: string | null;
        };
        Insert: {
          agentId?: string | null;
          content: Json;
          createdAt?: string | null;
          embedding?: string | null;
          id: string;
          roomId?: string | null;
          type: string;
          unique?: boolean;
          userId?: string | null;
        };
        Update: {
          agentId?: string | null;
          content?: Json;
          createdAt?: string | null;
          embedding?: string | null;
          id?: string;
          roomId?: string | null;
          type?: string;
          unique?: boolean;
          userId?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "fk_agent";
            columns: ["agentId"];
            isOneToOne: false;
            referencedRelation: "accounts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "fk_room";
            columns: ["roomId"];
            isOneToOne: false;
            referencedRelation: "rooms";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "fk_user";
            columns: ["userId"];
            isOneToOne: false;
            referencedRelation: "accounts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "memories_384_agentId_fkey";
            columns: ["agentId"];
            isOneToOne: false;
            referencedRelation: "accounts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "memories_384_roomId_fkey";
            columns: ["roomId"];
            isOneToOne: false;
            referencedRelation: "rooms";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "memories_384_userId_fkey";
            columns: ["userId"];
            isOneToOne: false;
            referencedRelation: "accounts";
            referencedColumns: ["id"];
          },
        ];
      };
      memories_768: {
        Row: {
          agentId: string | null;
          content: Json;
          createdAt: string | null;
          embedding: string | null;
          id: string;
          roomId: string | null;
          type: string;
          unique: boolean;
          userId: string | null;
        };
        Insert: {
          agentId?: string | null;
          content: Json;
          createdAt?: string | null;
          embedding?: string | null;
          id: string;
          roomId?: string | null;
          type: string;
          unique?: boolean;
          userId?: string | null;
        };
        Update: {
          agentId?: string | null;
          content?: Json;
          createdAt?: string | null;
          embedding?: string | null;
          id?: string;
          roomId?: string | null;
          type?: string;
          unique?: boolean;
          userId?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "fk_agent";
            columns: ["agentId"];
            isOneToOne: false;
            referencedRelation: "accounts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "fk_room";
            columns: ["roomId"];
            isOneToOne: false;
            referencedRelation: "rooms";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "fk_user";
            columns: ["userId"];
            isOneToOne: false;
            referencedRelation: "accounts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "memories_768_agentId_fkey";
            columns: ["agentId"];
            isOneToOne: false;
            referencedRelation: "accounts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "memories_768_roomId_fkey";
            columns: ["roomId"];
            isOneToOne: false;
            referencedRelation: "rooms";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "memories_768_userId_fkey";
            columns: ["userId"];
            isOneToOne: false;
            referencedRelation: "accounts";
            referencedColumns: ["id"];
          },
        ];
      };
      participants: {
        Row: {
          createdAt: string | null;
          id: string;
          last_message_read: string | null;
          roomId: string | null;
          userId: string | null;
          userState: string | null;
        };
        Insert: {
          createdAt?: string | null;
          id?: string;
          last_message_read?: string | null;
          roomId?: string | null;
          userId?: string | null;
          userState?: string | null;
        };
        Update: {
          createdAt?: string | null;
          id?: string;
          last_message_read?: string | null;
          roomId?: string | null;
          userId?: string | null;
          userState?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "fk_room";
            columns: ["roomId"];
            isOneToOne: false;
            referencedRelation: "rooms";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "fk_user";
            columns: ["userId"];
            isOneToOne: false;
            referencedRelation: "accounts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "participants_roomId_fkey";
            columns: ["roomId"];
            isOneToOne: false;
            referencedRelation: "rooms";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "participants_userId_fkey";
            columns: ["userId"];
            isOneToOne: false;
            referencedRelation: "accounts";
            referencedColumns: ["id"];
          },
        ];
      };
      relationships: {
        Row: {
          createdAt: string | null;
          id: string;
          status: string | null;
          userA: string;
          userB: string;
          userId: string;
        };
        Insert: {
          createdAt?: string | null;
          id: string;
          status?: string | null;
          userA: string;
          userB: string;
          userId: string;
        };
        Update: {
          createdAt?: string | null;
          id?: string;
          status?: string | null;
          userA?: string;
          userB?: string;
          userId?: string;
        };
        Relationships: [
          {
            foreignKeyName: "fk_user";
            columns: ["userId"];
            isOneToOne: false;
            referencedRelation: "accounts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "fk_user_a";
            columns: ["userA"];
            isOneToOne: false;
            referencedRelation: "accounts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "fk_user_b";
            columns: ["userB"];
            isOneToOne: false;
            referencedRelation: "accounts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "relationships_userA_fkey";
            columns: ["userA"];
            isOneToOne: false;
            referencedRelation: "accounts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "relationships_userB_fkey";
            columns: ["userB"];
            isOneToOne: false;
            referencedRelation: "accounts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "relationships_userId_fkey";
            columns: ["userId"];
            isOneToOne: false;
            referencedRelation: "accounts";
            referencedColumns: ["id"];
          },
        ];
      };
      rooms: {
        Row: {
          createdAt: string | null;
          id: string;
        };
        Insert: {
          createdAt?: string | null;
          id: string;
        };
        Update: {
          createdAt?: string | null;
          id?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      memories: {
        Row: {
          agentId: string | null;
          content: Json | null;
          createdAt: string | null;
          embedding: string | null;
          id: string | null;
          roomId: string | null;
          type: string | null;
          unique: boolean | null;
          userId: string | null;
        };
        Relationships: [];
      };
    };
    Functions: {
      binary_quantize:
        | {
            Args: {
              "": string;
            };
            Returns: unknown;
          }
        | {
            Args: {
              "": unknown;
            };
            Returns: unknown;
          };
      check_similarity_and_insert: {
        Args: {
          query_table_name: string;
          query_userid: string;
          query_content: Json;
          query_roomid: string;
          query_embedding: string;
          similarity_threshold: number;
          query_createdAt: string;
        };
        Returns: undefined;
      };
      count_memories: {
        Args: {
          query_table_name: string;
          query_roomid: string;
          query_unique?: boolean;
        };
        Returns: number;
      };
      create_room: {
        Args: {
          roomId?: string;
        };
        Returns: string;
      };
      dmetaphone: {
        Args: {
          "": string;
        };
        Returns: string;
      };
      dmetaphone_alt: {
        Args: {
          "": string;
        };
        Returns: string;
      };
      get_embedding_list: {
        Args: {
          query_table_name: string;
          query_threshold: number;
          query_input: string;
          query_field_name: string;
          query_field_sub_name: string;
          query_match_count: number;
        };
        Returns: {
          embedding: string;
          levenshtein_score: number;
        }[];
      };
      get_goals: {
        Args: {
          query_roomid: string;
          query_userid?: string;
          only_in_progress?: boolean;
          row_count?: number;
        };
        Returns: {
          createdAt: string | null;
          description: string | null;
          id: string;
          name: string | null;
          objectives: Json;
          roomId: string | null;
          status: string | null;
          userId: string | null;
        }[];
      };
      get_participant_userState: {
        Args: {
          roomId: string;
          userId: string;
        };
        Returns: string;
      };
      halfvec_avg: {
        Args: {
          "": number[];
        };
        Returns: unknown;
      };
      halfvec_out: {
        Args: {
          "": unknown;
        };
        Returns: unknown;
      };
      halfvec_send: {
        Args: {
          "": unknown;
        };
        Returns: string;
      };
      halfvec_typmod_in: {
        Args: {
          "": unknown[];
        };
        Returns: number;
      };
      hnsw_bit_support: {
        Args: {
          "": unknown;
        };
        Returns: unknown;
      };
      hnsw_halfvec_support: {
        Args: {
          "": unknown;
        };
        Returns: unknown;
      };
      hnsw_sparsevec_support: {
        Args: {
          "": unknown;
        };
        Returns: unknown;
      };
      hnswhandler: {
        Args: {
          "": unknown;
        };
        Returns: unknown;
      };
      ivfflat_bit_support: {
        Args: {
          "": unknown;
        };
        Returns: unknown;
      };
      ivfflat_halfvec_support: {
        Args: {
          "": unknown;
        };
        Returns: unknown;
      };
      ivfflathandler: {
        Args: {
          "": unknown;
        };
        Returns: unknown;
      };
      l2_norm:
        | {
            Args: {
              "": unknown;
            };
            Returns: number;
          }
        | {
            Args: {
              "": unknown;
            };
            Returns: number;
          };
      l2_normalize:
        | {
            Args: {
              "": string;
            };
            Returns: string;
          }
        | {
            Args: {
              "": unknown;
            };
            Returns: unknown;
          }
        | {
            Args: {
              "": unknown;
            };
            Returns: unknown;
          };
      remove_memories: {
        Args: {
          query_table_name: string;
          query_roomid: string;
        };
        Returns: undefined;
      };
      search_memories: {
        Args: {
          query_table_name: string;
          query_roomid: string;
          query_embedding: string;
          query_match_threshold: number;
          query_match_count: number;
          query_unique: boolean;
        };
        Returns: {
          id: string;
          userId: string;
          content: Json;
          createdAt: string;
          similarity: number;
          roomId: string;
          embedding: string;
        }[];
      };
      set_participant_userState: {
        Args: {
          roomId: string;
          userId: string;
          state: string;
        };
        Returns: undefined;
      };
      soundex: {
        Args: {
          "": string;
        };
        Returns: string;
      };
      sparsevec_out: {
        Args: {
          "": unknown;
        };
        Returns: unknown;
      };
      sparsevec_send: {
        Args: {
          "": unknown;
        };
        Returns: string;
      };
      sparsevec_typmod_in: {
        Args: {
          "": unknown[];
        };
        Returns: number;
      };
      text_soundex: {
        Args: {
          "": string;
        };
        Returns: string;
      };
      vector_avg: {
        Args: {
          "": number[];
        };
        Returns: string;
      };
      vector_dims:
        | {
            Args: {
              "": string;
            };
            Returns: number;
          }
        | {
            Args: {
              "": unknown;
            };
            Returns: number;
          };
      vector_norm: {
        Args: {
          "": string;
        };
        Returns: number;
      };
      vector_out: {
        Args: {
          "": string;
        };
        Returns: unknown;
      };
      vector_send: {
        Args: {
          "": string;
        };
        Returns: string;
      };
      vector_typmod_in: {
        Args: {
          "": unknown[];
        };
        Returns: number;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = SupabaseDatabase[Extract<keyof SupabaseDatabase, "public">];

export type Tables<
  PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] & PublicSchema["Views"]) | { schema: keyof SupabaseDatabase },
  TableName extends PublicTableNameOrOptions extends { schema: keyof SupabaseDatabase }
    ? keyof (SupabaseDatabase[PublicTableNameOrOptions["schema"]]["Tables"] &
        SupabaseDatabase[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof SupabaseDatabase }
  ? (SupabaseDatabase[PublicTableNameOrOptions["schema"]]["Tables"] &
      SupabaseDatabase[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    ? (PublicSchema["Tables"] & PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends keyof PublicSchema["Tables"] | { schema: keyof SupabaseDatabase },
  TableName extends PublicTableNameOrOptions extends { schema: keyof SupabaseDatabase }
    ? keyof SupabaseDatabase[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof SupabaseDatabase }
  ? SupabaseDatabase[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends keyof PublicSchema["Tables"] | { schema: keyof SupabaseDatabase },
  TableName extends PublicTableNameOrOptions extends { schema: keyof SupabaseDatabase }
    ? keyof SupabaseDatabase[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof SupabaseDatabase }
  ? SupabaseDatabase[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends keyof PublicSchema["Enums"] | { schema: keyof SupabaseDatabase },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof SupabaseDatabase }
    ? keyof SupabaseDatabase[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof SupabaseDatabase }
  ? SupabaseDatabase[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"] | { schema: keyof SupabaseDatabase },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof SupabaseDatabase;
  }
    ? keyof SupabaseDatabase[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof SupabaseDatabase }
  ? SupabaseDatabase[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;
