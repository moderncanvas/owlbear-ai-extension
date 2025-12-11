<script lang="ts">
  import { apiClient } from '../lib/api-client';
  import { obrClient } from '../lib/obr-client';
  import type { SceneData } from '../types';

  let description = '';
  let difficulty: 'easy' | 'medium' | 'hard' | 'deadly' = 'medium';
  let partySize = 4;
  let loading = false;
  let error = '';
  let success = '';
  let generatedScene: SceneData | null = null;

  async function generateScene() {
    if (!description.trim()) {
      error = 'Please enter a scene description';
      return;
    }

    loading = true;
    error = '';
    success = '';
    generatedScene = null;

    try {
      const sceneData = await apiClient.generateScene({
        description,
        difficulty,
        party_size: partySize,
      });

      generatedScene = sceneData;
      success = 'Scene generated successfully!';
    } catch (err) {
      error = err instanceof Error ? err.message : 'Failed to generate scene';
      console.error('Scene generation error:', err);
    } finally {
      loading = false;
    }
  }

  async function addToOwlbear() {
    if (!generatedScene) return;

    loading = true;
    error = '';

    try {
      await obrClient.generateScene(generatedScene);
      success = 'Scene added to Owlbear Rodeo!';
    } catch (err) {
      error = err instanceof Error ? err.message : 'Failed to add scene to Owlbear Rodeo';
      console.error('OBR error:', err);
    } finally {
      loading = false;
    }
  }

  function reset() {
    description = '';
    generatedScene = null;
    error = '';
    success = '';
  }
</script>

<div class="scene-generator">
  {#if !generatedScene}
    <div class="form-group">
      <label for="description">Scene Description</label>
      <textarea
        id="description"
        name="description"
        bind:value={description}
        placeholder="Describe the scene... e.g., 'A dimly lit tavern with 3 patrons and a bartender'"
        rows="4"
      ></textarea>
    </div>

    <div class="form-row">
      <div class="form-group">
        <label for="difficulty">Difficulty</label>
        <select id="difficulty" name="difficulty" bind:value={difficulty}>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
          <option value="deadly">Deadly</option>
        </select>
      </div>

      <div class="form-group">
        <label for="party-size">Party Size</label>
        <input
          id="party-size"
          name="party-size"
          type="number"
          bind:value={partySize}
          min="1"
          max="10"
        />
      </div>
    </div>

    <button
      class="primary generate-btn"
      onclick={generateScene}
      disabled={loading || !description.trim()}
    >
      {#if loading}
        <span class="loading"></span> Generating...
      {:else}
        ✨ Generate Scene
      {/if}
    </button>
  {:else}
    <div class="scene-preview">
      <h3>{generatedScene.scene.name}</h3>

      <div class="card">
        <h4>Read Aloud</h4>
        <p class="read-aloud">{generatedScene.scene.read_aloud}</p>
      </div>

      <div class="card">
        <h4>Tokens ({generatedScene.tokens.length})</h4>
        <div class="token-list">
          {#each generatedScene.tokens as token}
            <div class="token-item">
              <span class="token-name">{token.name}</span>
              <span class="token-type">{token.type}</span>
            </div>
          {/each}
        </div>
      </div>

      <div class="button-group">
        <button class="primary" onclick={addToOwlbear} disabled={loading}>
          {#if loading}
            <span class="loading"></span> Adding...
          {:else}
            ➕ Add to Owlbear Rodeo
          {/if}
        </button>
        <button class="secondary" onclick={reset}>
          🔄 Generate New
        </button>
      </div>
    </div>
  {/if}

  {#if error}
    <p class="error">{error}</p>
  {/if}

  {#if success}
    <p class="success">{success}</p>
  {/if}
</div>

<style>
  .scene-generator {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  .generate-btn {
    width: 100%;
  }

  .scene-preview {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  h3 {
    margin: 0;
    color: var(--color-primary);
  }

  h4 {
    margin: 0 0 0.5rem 0;
    font-size: 0.875rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: var(--color-text-muted);
  }

  .read-aloud {
    font-style: italic;
    line-height: 1.6;
    margin: 0;
  }

  .token-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .token-item {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem;
    background: var(--color-bg);
    border-radius: 4px;
  }

  .token-name {
    font-weight: 500;
  }

  .token-type {
    font-size: 0.75rem;
    text-transform: uppercase;
    color: var(--color-text-muted);
    background: var(--color-bg-light);
    padding: 0.125rem 0.5rem;
    border-radius: 12px;
  }

  .button-group {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem;
  }
</style>
