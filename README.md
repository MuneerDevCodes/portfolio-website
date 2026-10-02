<h1 align="center">
  muneerdevcodes.vercel.app
</h1>
<p align="center">
  A portfolio website i.e. <a href="https://muneerdevcodes.vercel.app" target="_blank">muneerdevcodes.vercel.app</a> built with <a href="https://nextjs.org/" target="_blank">Next.js</a> and hosted with <a href="https://vercel.com/" target="_blank">Vercel</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node-22.x-green" alt="Node 22" />
  <img src="https://img.shields.io/badge/Next.js-13.5-black" alt="Next.js 13" />
  <img src="https://img.shields.io/badge/TypeScript-4.8-blue" alt="TypeScript" />
</p>

<br>

**🔗 Live Demo:** [muneerdevcodes.vercel.app](https://muneerdevcodes.vercel.app/)

## Table of Contents

- [Sections](#sections)
- [Built With](#built-with)
- [How to use](#how-to-use)
- [Available Scripts](#available-scripts)
- [Customizing](#customizing)
- [Project Structure](#project-structure)
- [Troubleshooting](#troubleshooting)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [Continuous Development](#continuous-development)
- [Contact](#contact)
- [Acknowledgements](#acknowledgements)
- [License](#license)
- [Show Your Support](#show-your-support)

## Sections

- Hero
- About
- Skills
- Experience
- Featured Projects
- Projects
- Contact

## Built With

- [Next.js](https://nextjs.org/) `13.5` - App Router (`src/app/`)
- [TypeScript](https://www.typescriptlang.org/) `4.8`
- [TailwindCSS](https://tailwindcss.com/) `3.2` - Class-based dark mode
- [Framer Motion](https://www.framer.com/motion/) `9` - For animations
- [Iconify](https://icon-sets.iconify.design/) - For icons
- [Lottie Files](https://lottiefiles.com/) - For illustrations
- [Vercel Analytics](https://vercel.com/docs/analytics) - Web analytics
- [Google Analytics](https://developers.google.com/analytics) - Optional, via `NEXT_PUBLIC_GA_ID`
- [Husky](https://typicode.github.io/husky/) + [lint-staged](https://github.com/okonet/lint-staged) - Pre-commit hooks

## How to use

###### You'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) **v22 or newer**. The repo pins the exact version in [`.nvmrc`](.nvmrc) — if you use [nvm](https://github.com/nvm-sh/nvm):

```bash
  nvm install && nvm use
```

1. Fork this repository and clone the project

###### Please give me proper credit by linking back to [muneerdevcodes.vercel.app](https://muneerdevcodes.vercel.app).

```bash
  git clone https://github.com/MuneerDevCodes/portfolio-website.git
```

2. Go to the project directory

```bash
  cd portfolio-website
```

3. Install dependencies

```bash
  npm install
```

> **Note**
> This project uses **npm**. `package-lock.json` is committed, so `npm install` reproduces the exact dependency tree.

4. Set up your environment variables (optional)

```bash
  cp .env.example .env.local
```

```bash
  NEXT_PUBLIC_GA_ID="YOUR_GOOGLE_ANALYTICS_ID_HERE"
```

`NEXT_PUBLIC_GA_ID` is optional. Leave it blank and Google Analytics is skipped entirely; see `src/app/layout.tsx`.

5. Start the server

```bash
  npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Available Scripts

| Script                 | Description                               |
| ---------------------- | ----------------------------------------- |
| `npm run dev`          | Start the development server on port 3000 |
| `npm run build`        | Create an optimised production build      |
| `npm start`            | Serve the production build                |
| `npm run lint`         | Run ESLint over the project               |
| `npm run lint:fix`     | Auto-fix ESLint issues, then run Prettier |
| `npm run format`       | Format all files with Prettier            |
| `npm run format:check` | Verify formatting without writing changes |
| `npm run prepare`      | Install the Husky Git hooks               |

> **Note**
> Every script is run with npm, e.g. `npm run <script>`.

## Customizing

Most of the content lives in `src/lib/content/` — edit these files to make the site yours.

- **Most content** (hero, about, skills, experience, projects, contact, footer, navbar) - edit `src/lib/content/`
- **SEO, your name, and email** - edit `src/lib/content/portfolio.ts`
- **About paragraphs** - edit `src/containers/About.tsx`
- **Resume** - replace `/public/resume.pdf` with yours (the filename must stay `resume.pdf`)
- **Your image** - replace `/public/me.png` with yours (the filename must stay `me.png`)
- **Theme & colors** - edit `src/styles/globals.css` (CSS variables drive both light and dark themes)
- **How many projects show initially** - edit `PROJECTS_INITIALLY` in `src/lib/utils/config.ts`
- **Using remote images** - add the hostname to `images.remotePatterns` in `next.config.js`, otherwise Next.js will refuse to load it

## Project Structure

```
portfolio-website/
├── public/                  # Static assets (resume, image, lotties, favicons)
│   └── scripts/no-flash.js  # Prevents a light/dark theme flash on load
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── layout.tsx       # Root layout, metadata, analytics, theme provider
│   │   ├── page.tsx         # Home page — composes all sections
│   │   └── not-found.tsx    # 404 page
│   ├── components/          # Reusable UI components
│   │   ├── buttons/  dynamic/  lists/
│   │   ├── skills/   socials/
│   │   └── ui/              # Cursor, ProjectCard, Sidebar, Wrapper, etc.
│   ├── containers/          # Page sections (Hero, About, Skills, ...)
│   │   ├── layout/          # Navbar, Footer, Layout
│   │   └── Social/
│   ├── lib/
│   │   ├── content/         # ★ All editable content lives here
│   │   ├── hooks/           # use-theme, use-window-width
│   │   ├── types/           # TypeScript types
│   │   └── utils/           # config, fonts, helper
│   └── styles/              # Global CSS, theme variables, animations
├── .env.example             # Copy to .env.local
└── next.config.js           # Allowed image domains and Next.js options
```

## Troubleshooting

<details>
<summary><b>Port 3000 is already in use</b></summary>

Next.js automatically falls back to the next available port and prints the URL it used:

```
 ⚠ Port 3000 is in use, trying 3001 instead.
```

To choose a port explicitly:

```bash
  npm run dev -- -p 3001
```

</details>

<details>
<summary><b>Changes aren't showing up / stale build</b></summary>

Delete the build cache and restart:

```bash
  rm -rf .next
  npm run dev
```

</details>

<details>
<summary><b>Same, but on Windows PowerShell</b></summary>

`rm -rf` isn't native to PowerShell — use `Remove-Item` instead:

```powershell
  Remove-Item -Recurse -Force .next
  npm run dev
```

</details>

<details>
<summary><b>Remote images aren't loading</b></summary>

Add the image's hostname to `images.remotePatterns` in `next.config.js`. See [Customizing](#customizing).

</details>

## Deployment

The site is deployed on [Vercel](https://vercel.com). To deploy your own fork:

1. Push your changes to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) and import your repository.
3. Keep the detected framework preset as **Next.js**.
4. Add `NEXT_PUBLIC_GA_ID` under **Settings → Environment Variables** if you want Google Analytics.
5. Click **Deploy**.

No `vercel.json` is required — the defaults work out of the box.

## Contributing

Remember, Good PR makes you a Good contributor!

1. Run the project locally, refer [how to use](#how-to-use).
2. Use conventional commit messages, e.g. `feat: add blog page`, `fix: correct footer link`.
3. Run `npm run lint:fix` before pushing.

> **Note**
> Commits are checked by ESLint and Prettier through Husky pre-commit hooks. Run `npm run prepare` once after cloning if the hooks aren't active.

<div align="center">
  <a href="https://github.com/MuneerDevCodes/portfolio-website/graphs/contributors">
    <img src="https://contrib.rocks/image?repo=MuneerDevCodes/portfolio-website" alt="Contributors" />
  </a>
</div>


## Contact

- Website - [muneerdevcodes.vercel.app](https://muneerdevcodes.vercel.app)
- Email - [Muneerdevcodes@gmail.com](mailto:Muneerdevcodes@gmail.com)
- Phone - [+92 325 3658104](tel:+923253658104)
- Github - [@MuneerDevCodes](https://github.com/MuneerDevCodes)


## License

© 2026 Muhammad Muneer. All rights reserved.

This repository is proprietary and shared for viewing purposes only. No permission is granted to copy, modify, distribute, sublicense, or reuse any part of this project without prior written consent from the author.


