# GitHub Pages Deployment Guide

This guide will help you deploy your AAC AI project to GitHub Pages at `https://aacforai.github.io`.

## Prerequisites

- GitHub account
- Git installed on your local machine
- Node.js 18+ installed

## Step-by-Step Deployment

### 1. Create GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click "New repository" or go to https://github.com/new
3. **Repository name**: `aacforai.github.io` (this exact name is required for user pages)
4. Set to **Public** (required for free GitHub Pages)
5. **Do NOT** initialize with README, .gitignore, or license (we already have these files)
6. Click "Create repository"

### 2. Initialize Git and Push Code

Open terminal/command prompt in your project directory and run:

```bash
# Initialize git repository
git init

# Add all files
git add .

# Make initial commit
git commit -m "Initial commit: AAC AI project ready for GitHub Pages"

# Add GitHub repository as origin (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/aacforai.github.io.git

# Push to GitHub
git push -u origin main
```

**Note**: If you get an error about the main branch, try:
```bash
git branch -M main
git push -u origin main
```

### 3. Enable GitHub Pages

1. Go to your repository on GitHub: `https://github.com/YOUR_USERNAME/aacforai.github.io`
2. Click on "Settings" tab
3. Scroll down to "Pages" in the left sidebar
4. Under "Source", select **"GitHub Actions"**
5. The GitHub Actions workflow will automatically trigger

### 4. Monitor Deployment

1. Go to the "Actions" tab in your repository
2. You should see a workflow run called "Deploy to GitHub Pages"
3. Click on it to monitor the deployment progress
4. Once complete, your site will be available at: `https://aacforai.github.io`

## Automatic Deployments

Once set up, the site will automatically redeploy whenever you:
- Push changes to the main branch
- Merge pull requests into main

## Local Testing Before Deployment

Always test your changes locally before pushing:

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Test production build
npm run export
```

## Troubleshooting

### Common Issues

1. **404 Error**: Make sure repository name is exactly `aacforai.github.io`
2. **Build Fails**: Check the Actions tab for error details
3. **Assets Not Loading**: Verify `next.config.js` has correct `basePath` and `assetPrefix`
4. **Deployment Stuck**: Try pushing a small change to trigger a new build

### GitHub Actions Workflow

The deployment uses the workflow in `.github/workflows/deploy.yml` which:
1. Checks out your code
2. Sets up Node.js 18
3. Installs dependencies with `npm ci`
4. Builds the project with `npm run export`
5. Adds `.nojekyll` file (required for Next.js on GitHub Pages)
6. Deploys to GitHub Pages

### Manual Deployment (Fallback)

If GitHub Actions fails, you can deploy manually:

```bash
# Build the project
npm run export

# Navigate to the out directory
cd out

# Initialize git and push to gh-pages branch
git init
git add .
git commit -m "Deploy to GitHub Pages"
git remote add origin https://github.com/YOUR_USERNAME/aacforai.github.io.git
git push -f origin main:gh-pages
```

Then change the Pages source to "Deploy from a branch" and select `gh-pages`.

## Custom Domain (Optional)

To use a custom domain like `aac.example.com`:

1. Add a `CNAME` file to the `public/` directory with your domain
2. Configure DNS with your domain provider
3. Update GitHub Pages settings to use the custom domain

## Security Considerations

- Repository must be public for free GitHub Pages
- All code and content will be publicly visible
- Don't commit sensitive information (API keys, etc.)
- Consider using GitHub Secrets for sensitive configuration

## Performance Optimization

The current setup includes:
- Static site generation for fast loading
- Optimized images and assets
- Minimal JavaScript bundle
- Accessible design for all users

## Support

If you encounter issues:
1. Check the GitHub Actions logs
2. Review this deployment guide
3. Check GitHub Pages documentation
4. Open an issue in the repository

---

Your AAC AI project is now ready for the world! 🚀