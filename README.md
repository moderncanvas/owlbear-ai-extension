# DM Secret Weapon - Owlbear Rodeo Extension

AI-powered scene and token generation for Owlbear Rodeo.

## Features

- **AI Scene Generation**: Describe a scene and watch it come to life in Owlbear Rodeo
- **Token Generation**: Quickly add creatures and NPCs with appropriate tokens
- **Smart Positioning**: Automatic intelligent placement based on scene type
- **Beautiful Assets**: Uses high-quality assets from Forgotten Adventures and Caeora

## Development

### Prerequisites

- Node.js 18+
- npm or yarn
- Backend server running (see main project README)

### Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Environment Variables

Create a `.env` file:

```
VITE_API_URL=http://localhost:8000
```

## Installing in Owlbear Rodeo

### Local Development

1. Build the extension: `npm run build`
2. In Owlbear Rodeo, go to Extensions
3. Click "Add Extension"
4. Enter the local manifest URL: `http://localhost:5173/manifest.json`

### Production

1. Build the extension: `npm run build`
2. Host the `dist` folder on a web server
3. Submit to Owlbear Rodeo extension store

## Project Structure

```
owlbear-extension/
├── src/
│   ├── components/         # Svelte components
│   │   ├── SceneGenerator.svelte
│   │   └── TokenGenerator.svelte
│   ├── lib/               # Utility libraries
│   │   ├── api-client.ts  # Backend API client
│   │   ├── obr-client.ts  # OBR SDK wrapper
│   │   └── scene-builder.ts
│   ├── types/             # TypeScript types
│   ├── App.svelte         # Main app component
│   └── main.ts            # Entry point
├── public/
│   ├── index.html
│   └── icon.svg
├── manifest.json          # Extension manifest
└── package.json
```

## Attribution

Uses assets from:
- [Forgotten Adventures](https://www.forgotten-adventures.net/)
- [Caeora](https://www.caeora.com/)

## License

Private project for personal use.
