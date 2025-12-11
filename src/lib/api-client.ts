import type {
  SceneGenerationRequest,
  TokenGenerationRequest,
  SceneData,
  AssetSearchResponse
} from '../types';

// Backend API URL - configurable
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_URL) {
    this.baseUrl = baseUrl;
  }

  async generateScene(request: SceneGenerationRequest): Promise<SceneData> {
    const response = await fetch(`${this.baseUrl}/api/owlbear/generate-scene`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`Failed to generate scene: ${response.statusText}`);
    }

    return response.json();
  }

  async generateTokens(request: TokenGenerationRequest): Promise<{ tokens: any[] }> {
    const response = await fetch(`${this.baseUrl}/api/owlbear/generate-tokens`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`Failed to generate tokens: ${response.statusText}`);
    }

    return response.json();
  }

  async searchAssets(query: string, type?: string, limit: number = 20): Promise<AssetSearchResponse> {
    const params = new URLSearchParams({ query, limit: limit.toString() });
    if (type) {
      params.append('type', type);
    }

    const response = await fetch(`${this.baseUrl}/api/owlbear/assets?${params}`);

    if (!response.ok) {
      throw new Error(`Failed to search assets: ${response.statusText}`);
    }

    return response.json();
  }

  getAssetUrl(assetId: string): string {
    return `${this.baseUrl}/api/owlbear/assets/${assetId}`;
  }
}

export const apiClient = new ApiClient();
