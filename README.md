# ResearchCube Datapack Creator

A visual web tool for designing research trees and exporting datapacks for the [ResearchCube](https://github.com/researchcube) Minecraft mod.

## Features

- Visual node graph editor (React Flow) for research tree design
- Research node editor with tier, duration, item/fluid costs, prerequisites, idea chips
- Recipe editor for Drive Crafting (shapeless/shaped) and Processing Station recipes
- AND/OR prerequisite logic with edge-based connections
- Full validation engine (cycle detection, tier-fluid matching, slot limits)
- ZIP export with correct datapack folder structure
- JSON/ZIP import for editing existing datapacks
- 23-node example tree included
- Dark theme, localStorage auto-save

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deployment

Automatically deployed to GitHub Pages via GitHub Actions on push to `main`.
