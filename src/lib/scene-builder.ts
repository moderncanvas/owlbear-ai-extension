import type { SceneData, TokenData, Position } from '../types';

/**
 * Scene Builder - Handles intelligent positioning and layout of tokens
 */
export class SceneBuilder {
  private readonly GRID_SIZE = 140; // OBR grid size in pixels
  private readonly GRID_COLS = 40;
  private readonly GRID_ROWS = 30;

  /**
   * Generate smart positions for tokens based on scene type
   */
  generatePositions(tokenCount: number, sceneType: 'tavern' | 'dungeon' | 'outdoor' | 'encounter'): Position[] {
    switch (sceneType) {
      case 'tavern':
        return this.generateTavernLayout(tokenCount);
      case 'encounter':
        return this.generateEncounterLayout(tokenCount);
      case 'dungeon':
        return this.generateDungeonLayout(tokenCount);
      default:
        return this.generateDefaultLayout(tokenCount);
    }
  }

  /**
   * Generate tavern-style layout (NPCs scattered around)
   */
  private generateTavernLayout(count: number): Position[] {
    const positions: Position[] = [];
    const centerX = (this.GRID_COLS / 2) * this.GRID_SIZE;
    const centerY = (this.GRID_ROWS / 2) * this.GRID_SIZE;

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = this.GRID_SIZE * (3 + Math.random() * 5);

      positions.push({
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius,
      });
    }

    return positions;
  }

  /**
   * Generate encounter layout (enemies vs party)
   */
  private generateEncounterLayout(count: number): Position[] {
    const positions: Position[] = [];
    const leftX = this.GRID_SIZE * 5;
    const rightX = this.GRID_SIZE * 35;
    const centerY = (this.GRID_ROWS / 2) * this.GRID_SIZE;

    // Split between left (party) and right (enemies)
    const halfCount = Math.floor(count / 2);

    // Left side (party formation)
    for (let i = 0; i < halfCount; i++) {
      positions.push({
        x: leftX + (i % 2) * this.GRID_SIZE * 2,
        y: centerY + (Math.floor(i / 2) - halfCount / 4) * this.GRID_SIZE * 2,
      });
    }

    // Right side (enemies)
    for (let i = 0; i < count - halfCount; i++) {
      positions.push({
        x: rightX + (i % 3) * this.GRID_SIZE * 2,
        y: centerY + (Math.floor(i / 3) - (count - halfCount) / 6) * this.GRID_SIZE * 2,
      });
    }

    return positions;
  }

  /**
   * Generate dungeon layout (spread out exploration)
   */
  private generateDungeonLayout(count: number): Position[] {
    const positions: Position[] = [];
    const startX = this.GRID_SIZE * 5;
    const startY = this.GRID_SIZE * 5;

    for (let i = 0; i < count; i++) {
      positions.push({
        x: startX + (i % 6) * this.GRID_SIZE * 3,
        y: startY + Math.floor(i / 6) * this.GRID_SIZE * 3,
      });
    }

    return positions;
  }

  /**
   * Generate default grid layout
   */
  private generateDefaultLayout(count: number): Position[] {
    const positions: Position[] = [];
    const cols = Math.ceil(Math.sqrt(count));
    const startX = this.GRID_SIZE * 10;
    const startY = this.GRID_SIZE * 10;

    for (let i = 0; i < count; i++) {
      positions.push({
        x: startX + (i % cols) * this.GRID_SIZE * 2,
        y: startY + Math.floor(i / cols) * this.GRID_SIZE * 2,
      });
    }

    return positions;
  }

  /**
   * Grid to pixel coordinates
   */
  gridToPixels(gridX: number, gridY: number): Position {
    return {
      x: gridX * this.GRID_SIZE + this.GRID_SIZE / 2,
      y: gridY * this.GRID_SIZE + this.GRID_SIZE / 2,
    };
  }

  /**
   * Pixel to grid coordinates
   */
  pixelsToGrid(x: number, y: number): { gridX: number; gridY: number } {
    return {
      gridX: Math.floor(x / this.GRID_SIZE),
      gridY: Math.floor(y / this.GRID_SIZE),
    };
  }
}

export const sceneBuilder = new SceneBuilder();
