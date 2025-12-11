<script lang="ts">
  let message = "Hello from DM Secret Weapon!";
</script>

<div style="padding: 20px; color: white;">
  <h1>{message}</h1>
  <p>Extension loaded successfully!</p>
  <button onclick={() => message = "Button clicked!"}>Test Button</button>
</div>
