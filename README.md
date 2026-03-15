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

## License

    ResearchCube Datapack Creator
    Copyright (C) 2026  fireheart3911

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as published
    by the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.



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

Automatically deployed to GitHub Pages via GitHub Actions on push to `live`.
