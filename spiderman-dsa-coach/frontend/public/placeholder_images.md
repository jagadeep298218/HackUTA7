# Testing Without Custom Images

If you don't have your custom images ready yet, the app will automatically fall back to the emoji mascot (🕷️) so you can still test all the functionality.

## To Test Right Now:
1. Start the frontend: `npm run dev`
2. Open `http://localhost:3000`
3. The mascot will show as 🕷️ emoji
4. All functionality works: dragging, dialog, text bubbles, etc.

## When You're Ready to Add Images:
1. Place your images in this directory (`frontend/public/`)
2. Name them exactly: `standard_pose.png` and `speaking_pose.png`
3. Refresh the browser
4. Your custom mascot will appear!

## Image Tips:
- **Size**: 80x80px or larger (will scale automatically)
- **Format**: PNG with transparent background
- **Quality**: High resolution for best results
- **Names**: Must be exactly `standard_pose.png` and `speaking_pose.png`

The app is designed to work seamlessly with or without custom images! 🕸️
