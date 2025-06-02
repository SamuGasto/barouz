export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      cupon: {
        Row: {
          created_at: string
          descripcion: string
          disponible: boolean
          fecha_fin: string
          fecha_inicio: string
          hora_fin: string
          hora_inicio: string
          id: string
          imagen_url: string
          nombre: string
          tipo_descuento: Database["public"]["Enums"]["TipoDescuento"]
          valor_descuento: number
        }
        Insert: {
          created_at?: string
          descripcion: string
          disponible: boolean
          fecha_fin: string
          fecha_inicio: string
          hora_fin: string
          hora_inicio: string
          id?: string
          imagen_url: string
          nombre: string
          tipo_descuento: Database["public"]["Enums"]["TipoDescuento"]
          valor_descuento: number
        }
        Update: {
          created_at?: string
          descripcion?: string
          disponible?: boolean
          fecha_fin?: string
          fecha_inicio?: string
          hora_fin?: string
          hora_inicio?: string
          id?: string
          imagen_url?: string
          nombre?: string
          tipo_descuento?: Database["public"]["Enums"]["TipoDescuento"]
          valor_descuento?: number
        }
        Relationships: []
      }
      cupon_pedido_final: {
        Row: {
          created_at: string
          cupon_id: string
          id: string
          pedido_final_id: string
        }
        Insert: {
          created_at?: string
          cupon_id: string
          id?: string
          pedido_final_id: string
        }
        Update: {
          created_at?: string
          cupon_id?: string
          id?: string
          pedido_final_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "cupon_pedido_final_cupon_id_fkey"
            columns: ["cupon_id"]
            isOneToOne: false
            referencedRelation: "cupon"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cupon_pedido_final_pedido_final_id_fkey"
            columns: ["pedido_final_id"]
            isOneToOne: false
            referencedRelation: "pedido_final"
            referencedColumns: ["id"]
          },
        ]
      }
      extra: {
        Row: {
          cantidad: number
          categoria: string
          "categoria-producto": Database["public"]["Enums"]["CategoriaProducto"]
          created_at: string
          id: string
          nombre: string
          precio: number
          tipo: Database["public"]["Enums"]["TipoExtra"]
        }
        Insert: {
          cantidad?: number
          categoria?: string
          "categoria-producto"?: Database["public"]["Enums"]["CategoriaProducto"]
          created_at?: string
          id?: string
          nombre?: string
          precio?: number
          tipo: Database["public"]["Enums"]["TipoExtra"]
        }
        Update: {
          cantidad?: number
          categoria?: string
          "categoria-producto"?: Database["public"]["Enums"]["CategoriaProducto"]
          created_at?: string
          id?: string
          nombre?: string
          precio?: number
          tipo?: Database["public"]["Enums"]["TipoExtra"]
        }
        Relationships: []
      }
      horario: {
        Row: {
          created_at: string
          dia: Database["public"]["Enums"]["DiasDeLaSemana"]
          hora_fin: string
          hora_inicio: string
          id: string
          local_id: string
        }
        Insert: {
          created_at?: string
          dia: Database["public"]["Enums"]["DiasDeLaSemana"]
          hora_fin: string
          hora_inicio: string
          id?: string
          local_id: string
        }
        Update: {
          created_at?: string
          dia?: Database["public"]["Enums"]["DiasDeLaSemana"]
          hora_fin?: string
          hora_inicio?: string
          id?: string
          local_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "horario_local_id_fkey"
            columns: ["local_id"]
            isOneToOne: false
            referencedRelation: "local"
            referencedColumns: ["id"]
          },
        ]
      }
      local: {
        Row: {
          created_at: string
          direccion: string
          id: string
          latitud: number
          longitud: number
          nombre: string
          telefono: string
        }
        Insert: {
          created_at?: string
          direccion: string
          id?: string
          latitud: number
          longitud: number
          nombre: string
          telefono: string
        }
        Update: {
          created_at?: string
          direccion?: string
          id?: string
          latitud?: number
          longitud?: number
          nombre?: string
          telefono?: string
        }
        Relationships: []
      }
      pedido: {
        Row: {
          cantidad: number
          created_at: string
          id: string
          pedido_final_id: string
          precio_final: number
          producto_id: string
        }
        Insert: {
          cantidad: number
          created_at?: string
          id?: string
          pedido_final_id: string
          precio_final: number
          producto_id: string
        }
        Update: {
          cantidad?: number
          created_at?: string
          id?: string
          pedido_final_id?: string
          precio_final?: number
          producto_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "pedido_pedido_final_id_fkey"
            columns: ["pedido_final_id"]
            isOneToOne: false
            referencedRelation: "pedido_final"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pedido_producto_id_fkey"
            columns: ["producto_id"]
            isOneToOne: false
            referencedRelation: "producto"
            referencedColumns: ["id"]
          },
        ]
      }
      pedido_extra: {
        Row: {
          cantidad: number
          created_at: string
          extra_id: string | null
          id: string
          pedido_id: string
        }
        Insert: {
          cantidad: number
          created_at?: string
          extra_id?: string | null
          id?: string
          pedido_id: string
        }
        Update: {
          cantidad?: number
          created_at?: string
          extra_id?: string | null
          id?: string
          pedido_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "pedido_extra_extra_id_fkey"
            columns: ["extra_id"]
            isOneToOne: false
            referencedRelation: "extra"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pedido_extra_pedido_id_fkey"
            columns: ["pedido_id"]
            isOneToOne: false
            referencedRelation: "pedido"
            referencedColumns: ["id"]
          },
        ]
      }
      pedido_final: {
        Row: {
          created_at: string
          direccion: string
          estado: Database["public"]["Enums"]["EstadoPedidos"]
          fecha_hora: string
          id: string
          razon_cancelacion: string
          tipo_envio: Database["public"]["Enums"]["TipoEnvio"]
          total_final: number
          user_id: string
        }
        Insert: {
          created_at?: string
          direccion?: string
          estado?: Database["public"]["Enums"]["EstadoPedidos"]
          fecha_hora?: string
          id?: string
          razon_cancelacion?: string
          tipo_envio?: Database["public"]["Enums"]["TipoEnvio"]
          total_final: number
          user_id: string
        }
        Update: {
          created_at?: string
          direccion?: string
          estado?: Database["public"]["Enums"]["EstadoPedidos"]
          fecha_hora?: string
          id?: string
          razon_cancelacion?: string
          tipo_envio?: Database["public"]["Enums"]["TipoEnvio"]
          total_final?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "pedido_final_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "usuario"
            referencedColumns: ["id"]
          },
        ]
      }
      producto: {
        Row: {
          categoria: Database["public"]["Enums"]["CategoriaProducto"]
          created_at: string
          descripcion: string
          disponible: boolean
          id: string
          imagen: string
          nombre: string
          precio: number
        }
        Insert: {
          categoria: Database["public"]["Enums"]["CategoriaProducto"]
          created_at?: string
          descripcion?: string
          disponible: boolean
          id?: string
          imagen?: string
          nombre?: string
          precio: number
        }
        Update: {
          categoria?: Database["public"]["Enums"]["CategoriaProducto"]
          created_at?: string
          descripcion?: string
          disponible?: boolean
          id?: string
          imagen?: string
          nombre?: string
          precio?: number
        }
        Relationships: []
      }
      producto_ubicacion: {
        Row: {
          created_at: string
          id: string
          producto_id: string
          ubicacion: Database["public"]["Enums"]["Ubicaciones"]
        }
        Insert: {
          created_at?: string
          id?: string
          producto_id: string
          ubicacion: Database["public"]["Enums"]["Ubicaciones"]
        }
        Update: {
          created_at?: string
          id?: string
          producto_id?: string
          ubicacion?: Database["public"]["Enums"]["Ubicaciones"]
        }
        Relationships: [
          {
            foreignKeyName: "Producto_Ubicacion_producto_id_fkey"
            columns: ["producto_id"]
            isOneToOne: false
            referencedRelation: "producto"
            referencedColumns: ["id"]
          },
        ]
      }
      usuario: {
        Row: {
          created_at: string
          direccion: string | null
          gmail: string
          id: string
          nombre: string
          rol: Database["public"]["Enums"]["Roles"]
          telefono: string | null
        }
        Insert: {
          created_at?: string
          direccion?: string | null
          gmail: string
          id?: string
          nombre?: string
          rol?: Database["public"]["Enums"]["Roles"]
          telefono?: string | null
        }
        Update: {
          created_at?: string
          direccion?: string | null
          gmail?: string
          id?: string
          nombre?: string
          rol?: Database["public"]["Enums"]["Roles"]
          telefono?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      CategoriaProducto:
        | "Waffles"
        | "Helados"
        | "Churros"
        | "Waffle Cookies"
        | "Postres"
        | "Bebidas"
        | "Otros"
      DiasDeLaSemana:
        | "Lunes"
        | "Martes"
        | "Miércoles"
        | "Jueves"
        | "Viernes"
        | "Sábado"
        | "Domingo"
      EstadoPedidos:
        | "Recibido"
        | "En preparación"
        | "En camino"
        | "Entregado"
        | "Cancelado"
      Roles: "cliente" | "admin" | "caja" | "cocina"
      TipoDescuento: "porcentaje" | "valor"
      TipoEnvio: "Delivery" | "Retiro en tienda"
      TipoExtra: "incremental" | "checkbox"
      Ubicaciones: "destacados_principal" | "destacados_menu"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      CategoriaProducto: [
        "Waffles",
        "Helados",
        "Churros",
        "Waffle Cookies",
        "Postres",
        "Bebidas",
        "Otros",
      ],
      DiasDeLaSemana: [
        "Lunes",
        "Martes",
        "Miércoles",
        "Jueves",
        "Viernes",
        "Sábado",
        "Domingo",
      ],
      EstadoPedidos: [
        "Recibido",
        "En preparación",
        "En camino",
        "Entregado",
        "Cancelado",
      ],
      Roles: ["cliente", "admin", "caja", "cocina"],
      TipoDescuento: ["porcentaje", "valor"],
      TipoEnvio: ["Delivery", "Retiro en tienda"],
      TipoExtra: ["incremental", "checkbox"],
      Ubicaciones: ["destacados_principal", "destacados_menu"],
    },
  },
} as const
