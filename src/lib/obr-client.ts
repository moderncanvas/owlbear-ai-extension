import OBR, { buildImage, buildText } from '@owlbear-rodeo/sdk';
import type { Item } from '@owlbear-rodeo/sdk';
import type { TokenData, SceneData } from '../types';

/**
 * OBR Client - Handles all Owlbear Rodeo SDK interactions
 */
class OBRClient {
  private initialized = false;

  async initialize(): Promise<void> {
    if (this.initialized) return;

    return new Promise((resolve) => {
      OBR.onReady(() => {
        this.initialized = true;
        console.log('OBR SDK initialized');
        resolve();
      });
    });
  }

  /**
   * Create a token item from token data
   */
  createToken(token: TokenData): Item {
    const GRID_SIZE = 140; // Standard OBR grid size in pixels
    const TOKEN_SIZE = GRID_SIZE; // 1x1 token

    return buildImage(
      {
        height: TOKEN_SIZE,
        width: TOKEN_SIZE,
        url: token.asset_url,
        mime: 'image/png',
      },
      {
        dpi: 150,
        offset: { x: TOKEN_SIZE / 2, y: TOKEN_SIZE / 2 },
      }
    )
      .position(token.position)
      .name(token.name)
      .plainText(token.name)
      .locked(false)
      .visible(true)
      .layer('CHARACTER')
      .metadata({
        'dm-secret-weapon': {
          type: token.type,
          hp: token.metadata.hp,
          ac: token.metadata.ac,
          role: token.metadata.role,
        },
      })
      .build();
  }

  /**
   * Create a text label item
   */
  createLabel(text: string, position: { x: number; y: number }): Item {
    return buildText()
      .position(position)
      .plainText(text)
      .textType('PLAIN')
      .textAlign('CENTER')
      .width(400)
      .fontSize(16)
      .fontWeight(400)
      .layer('TEXT')
      .build();
  }

  /**
   * Add tokens to the current scene
   */
  async addTokens(tokens: TokenData[]): Promise<void> {
    const items = tokens.map((token) => this.createToken(token));
    await OBR.scene.items.addItems(items);
  }

  /**
   * Generate a complete scene with tokens
   */
  async generateScene(sceneData: SceneData): Promise<void> {
    // Create all tokens
    const tokenItems = sceneData.tokens.map((token) => this.createToken(token));

    // Create scene name label at the top
    const sceneLabel = this.createLabel(sceneData.scene.name, { x: 700, y: 50 });

    // Add all items to the scene
    await OBR.scene.items.addItems([sceneLabel, ...tokenItems]);

    // Show notification
    await OBR.notification.show(`Created scene: ${sceneData.scene.name}`, 'SUCCESS');
  }

  /**
   * Clear all items created by this extension
   */
  async clearGeneratedItems(): Promise<void> {
    const items = await OBR.scene.items.getItems((item) => {
      return item.metadata['dm-secret-weapon'] !== undefined;
    });

    const itemIds = items.map((item) => item.id);
    await OBR.scene.items.deleteItems(itemIds);
  }

  /**
   * Get the current scene bounds
   */
  async getSceneBounds(): Promise<{ width: number; height: number }> {
    const metadata = await OBR.scene.getMetadata();
    // Default to a reasonable size if not set
    return {
      width: 5600, // 40 grid squares * 140px
      height: 4200, // 30 grid squares * 140px
    };
  }

  /**
   * Show a notification
   */
  async showNotification(message: string, type: 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR' = 'INFO'): Promise<void> {
    await OBR.notification.show(message, type);
  }

  /**
   * Open a modal
   */
  async openModal(url: string, width: number = 600, height: number = 800): Promise<void> {
    await OBR.modal.open({
      url,
      width,
      height,
    });
  }
}

export const obrClient = new OBRClient();
