<script lang="ts">
  import SceneGenerator from './components/SceneGenerator.svelte';
  import TokenGenerator from './components/TokenGenerator.svelte';

  let activeTab: 'scene' | 'tokens' = 'scene';
</script>

<div class="app">
  <header>
    <h1>🎲 DM Secret Weapon</h1>
    <p class="subtitle">AI-Powered Scene & Token Generator</p>
  </header>

  <div class="tabs">
    <div
      class="tab"
      class:active={activeTab === 'scene'}
      on:click={() => activeTab = 'scene'}
      on:keypress={() => activeTab = 'scene'}
      role="tab"
      tabindex="0"
    >
      Generate Scene
    </div>
    <div
      class="tab"
      class:active={activeTab === 'tokens'}
      on:click={() => activeTab = 'tokens'}
      on:keypress={() => activeTab = 'tokens'}
      role="tab"
      tabindex="0"
    >
      Add Tokens
    </div>
  </div>

  <main>
    {#if activeTab === 'scene'}
      <SceneGenerator />
    {:else}
      <TokenGenerator />
    {/if}
  </main>

  <footer>
    <p class="attribution">
      Assets from <a href="https://www.forgotten-adventures.net/" target="_blank">Forgotten Adventures</a>
      and <a href="https://www.caeora.com/" target="_blank">Caeora</a>
    </p>
  </footer>
</div>

<style>
  .app {
    display: flex;
    flex-direction: column;
    height: 100vh;
    padding: 1rem;
  }

  header {
    margin-bottom: 1rem;
  }

  h1 {
    margin: 0;
    font-size: 1.5rem;
    background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .subtitle {
    margin: 0.25rem 0 0 0;
    font-size: 0.875rem;
    color: var(--color-text-muted);
  }

  main {
    flex: 1;
    overflow-y: auto;
  }

  footer {
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid var(--color-border);
  }

  .attribution {
    font-size: 0.75rem;
    color: var(--color-text-muted);
    text-align: center;
    margin: 0;
  }

  .attribution a {
    color: var(--color-primary);
    text-decoration: none;
  }

  .attribution a:hover {
    text-decoration: underline;
  }
</style>
