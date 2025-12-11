import './app.css';
import App from './App.svelte';
import { obrClient } from './lib/obr-client';

// Initialize OBR SDK
obrClient.initialize().then(() => {
  console.log('DM Secret Weapon extension loaded');
});

// Mount Svelte app
const app = new App({
  target: document.getElementById('app')!,
});

export default app;
