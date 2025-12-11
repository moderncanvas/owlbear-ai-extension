import './app.css';
import App from './App.svelte';

// Mount Svelte app immediately
const app = new App({
  target: document.getElementById('app')!,
});

// Initialize OBR SDK after app is mounted (don't block rendering)
import { obrClient } from './lib/obr-client';
obrClient.initialize().then(() => {
  console.log('DM Secret Weapon extension loaded');
}).catch(err => {
  console.error('OBR initialization error:', err);
});

export default app;
