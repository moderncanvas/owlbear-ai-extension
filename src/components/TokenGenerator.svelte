<script lang="ts">
  import { apiClient } from '../lib/api-client';
  import { obrClient } from '../lib/obr-client';
  import { sceneBuilder } from '../lib/scene-builder';

  let creatureType = '';
  let count = 1;
  let variant = '';
  let loading = false;
  let error = '';
  let success = '';

  async function generateTokens() {
    if (!creatureType.trim()) {
      error = 'Please enter a creature type';
      return;
    }

    loading = true;
    error = '';
    success = '';

    try {
      const response = await apiClient.generateTokens({
        creature_type: creatureType,
        count,
        variant: variant || undefined,
      });

      // Generate positions for tokens
      const positions = sceneBuilder.generatePositions(response.tokens.length, 'encounter');

      // Add positions to tokens
      const tokensWithPositions = response.tokens.map((token, i) => ({
        ...token,
        position: positions[i],
      }));

      // Add to Owlbear Rodeo
      await obrClient.addTokens(tokensWithPositions);

      success = `Added ${response.tokens.length} ${creatureType} token(s) to the scene!`;

      // Reset form
      creatureType = '';
      count = 1;
      variant = '';
    } catch (err) {
      error = err instanceof Error ? err.message : 'Failed to generate tokens';
      console.error('Token generation error:', err);
    } finally {
      loading = false;
    }
  }

  const commonCreatures = [
    'Goblin',
    'Orc',
    'Skeleton',
    'Zombie',
    'Wolf',
    'Bear',
    'Dragon',
    'Giant Spider',
    'Bandit',
    'Guard',
  ];
</script>

<div class="token-generator">
  <div class="form-group">
    <label for="creature">Creature Type</label>
    <input
      id="creature"
      type="text"
      bind:value={creatureType}
      placeholder="e.g., Goblin, Orc, Dragon"
      list="creature-suggestions"
    />
    <datalist id="creature-suggestions">
      {#each commonCreatures as creature}
        <option value={creature} />
      {/each}
    </datalist>
  </div>

  <div class="form-row">
    <div class="form-group">
      <label for="count">Count</label>
      <input
        id="count"
        type="number"
        bind:value={count}
        min="1"
        max="20"
      />
    </div>

    <div class="form-group">
      <label for="variant">Variant (Optional)</label>
      <input
        id="variant"
        type="text"
        bind:value={variant}
        placeholder="e.g., Raider, Elite"
      />
    </div>
  </div>

  <button
    class="primary"
    on:click={generateTokens}
    disabled={loading || !creatureType.trim()}
  >
    {#if loading}
      <span class="loading"></span> Generating...
    {:else}
      ✨ Add Tokens
    {/if}
  </button>

  {#if error}
    <p class="error">{error}</p>
  {/if}

  {#if success}
    <p class="success">{success}</p>
  {/if}

  <div class="quick-actions">
    <h4>Quick Add</h4>
    <div class="quick-buttons">
      <button
        class="secondary quick-btn"
        on:click={() => { creatureType = 'Goblin'; count = 4; }}
      >
        4× Goblins
      </button>
      <button
        class="secondary quick-btn"
        on:click={() => { creatureType = 'Skeleton'; count = 3; }}
      >
        3× Skeletons
      </button>
      <button
        class="secondary quick-btn"
        on:click={() => { creatureType = 'Guard'; count = 2; }}
      >
        2× Guards
      </button>
      <button
        class="secondary quick-btn"
        on:click={() => { creatureType = 'Dragon'; count = 1; variant = 'Adult Red'; }}
      >
        1× Dragon
      </button>
    </div>
  </div>
</div>

<style>
  .token-generator {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  .quick-actions {
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid var(--color-border);
  }

  h4 {
    margin: 0 0 0.5rem 0;
    font-size: 0.875rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: var(--color-text-muted);
  }

  .quick-buttons {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem;
  }

  .quick-btn {
    font-size: 0.75rem;
    padding: 0.5rem;
  }
</style>
