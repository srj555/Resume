# Resume Editor

Interactive resume editor with 3 version themes, inline editing, and PDF export.

## Deploy to GitHub Pages — Step by Step

### 1. Create a GitHub repo

Go to [github.com/new](https://github.com/new) and create a new repo called `resume-editor` (or any name you like).

### 2. Update the base path

Open `vite.config.js` and change the `base` value to match your repo name:

```js
base: '/your-repo-name/',
```

### 3. Push the code

```bash
cd resume-editor
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/resume-editor.git
git push -u origin main
```

### 4. Enable GitHub Pages

1. Go to your repo → **Settings** → **Pages**
2. Under **Build and deployment**, set Source to **GitHub Actions**
3. That's it — the workflow will auto-run on push

### 5. Access your site

After the workflow completes (~1-2 minutes), your resume editor will be live at:

```
https://YOUR_USERNAME.github.io/resume-editor/
```

## Local Development

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`

## How to Use

- **Switch versions** — Click the tabs at the top (Senior Android / Eng. Tech Lead / Fintech)
- **Edit any text** — Click on any text field to edit it inline
- **Upload photo** — Click the photo placeholder or the Upload button
- **Export PDF** — Click "Export PDF" button → Save as PDF from the print dialog
