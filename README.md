# Art of War Prototype

A modern React TypeScript application built from a Figma Make export.

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm

### Installation & Development

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view in browser.

3. **Build for production**
   ```bash
   npm run build
   ```

### 📦 Deployment to GitHub Pages

1. **Create GitHub repository**
   ```bash
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```

2. **Deploy to GitHub Pages** 
   - The project is already configured with GitHub Actions
   - Just push to the `main` branch and it will auto-deploy
   - Your site will be available at: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

3. **Enable GitHub Pages** (first time only)
   - Go to repository Settings → Pages
   - Select "Deploy from a branch" → "gh-pages"

## 🛠️ Project Structure

```
├── src/
│   ├── main.tsx           # App entry point
│   ├── App.tsx           # Main app component
│   ├── assets/           # Static assets
│   └── styles/           # Global styles
├── components/           # React components
├── data/                # Data files (courses, etc.)
├── utils/               # Utility functions
└── imports/             # Figma-generated components
```

## 🔧 Configuration

- **Vite** - Build tool and dev server
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Radix UI** - Accessible components
- **Supabase** - Backend (optional)

## 📝 Notes

- **Styling Fixed**: All gold strokes, sidebar spacing, and navigation elements restored
- **Fonts**: Alacrity Sans and Luxora Grotesk fonts configured (will fallback to web fonts)
- **Colors**: Custom Art of War color palette properly integrated with Tailwind
- Figma assets replaced with placeholder images
- Supabase integration requires environment variables

## 🔧 Environment Variables

Copy `.env.example` to `.env.local` and configure:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key
```

## 📚 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run deploy` - Deploy to GitHub Pages (manual)