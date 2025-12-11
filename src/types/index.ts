// API Types
export interface SceneGenerationRequest {
  description: string;
  difficulty?: 'easy' | 'medium' | 'hard' | 'deadly';
  party_size?: number;
}

export interface TokenGenerationRequest {
  creature_type: string;
  count: number;
  variant?: string;
}

export interface Position {
  x: number;
  y: number;
}

export interface TokenMetadata {
  hp?: number;
  ac?: number;
  role?: string;
  initiative?: number;
}

export interface TokenData {
  name: string;
  type: 'npc' | 'creature' | 'pc' | 'prop';
  asset_url: string;
  position: Position;
  metadata: TokenMetadata;
}

export interface SceneData {
  scene: {
    name: string;
    description: string;
    read_aloud: string;
  };
  tokens: TokenData[];
  items?: any[];
}

export interface Asset {
  id: string;
  name: string;
  url: string;
  type: 'token' | 'map' | 'prop';
  tags: string[];
  source: string;
}

export interface AssetSearchResponse {
  assets: Asset[];
  total: number;
}

// OBR Types
export interface OBRItemOptions {
  dpi: number;
  offset: { x: number; y: number };
}
