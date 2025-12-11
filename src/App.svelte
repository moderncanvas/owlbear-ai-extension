<script>
  let message = "Hello from DM Secret Weapon!";
  let count = 0;
</script>

<div style="padding: 20px; background: #1a1a1a; color: white; min-height: 100vh;">
  <h1 style="color: #7c3aed;">{message}</h1>
  <p>Extension loaded successfully!</p>
  <p>Count: {count}</p>
  <button on:click={() => count++} style="padding: 10px; margin: 5px;">Increment</button>
  <button on:click={() => count--} style="padding: 10px; margin: 5px;">Decrement</button>
</div>
