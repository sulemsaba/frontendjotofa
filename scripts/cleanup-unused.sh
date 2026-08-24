#!/usr/bin/env bash
# Removes code and dependencies that nothing in src/ imports anymore.
# Verified on 2026-08-24: only ui/button.tsx and ui/sonner.tsx are used;
# every package below has zero imports outside the deleted ui files.
set -euo pipefail
cd "$(dirname "$0")/.."

# 1. Unused shadcn/ui components (46 of 48 files)
find src/components/ui -type f -name '*.tsx' \
  ! -name 'button.tsx' ! -name 'sonner.tsx' -print -delete

# 2. Unused hooks that only served those components
rm -f src/hooks/use-mobile.ts src/hooks/use-toast.ts

# 3. Old font sources (site now loads Inter-Variable.woff2 + InterTight-Variable.woff2)
rm -f "public/fonts/OpenSans-VariableFont_wdth,wght.ttf" \
      public/fonts/OpenSans-Variable.woff2 \
      public/fonts/GeistMono-VariableFont_wght.ttf \
      public/fonts/PlayfairDisplay-VariableFont_wght.ttf \
      public/fonts/InterTight.ttf \
      public/fonts/InterVariable.woff2

# 4. Unused flag images (fake language toggle was removed)
rm -rf public/images/flags

# 5. Unused dependencies
npm uninstall \
  @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities \
  @hookform/resolvers react-hook-form zod \
  recharts embla-carousel-react cmdk react-resizable-panels \
  react-day-picker input-otp vaul zustand @reactuses/core \
  react-markdown next-auth next-intl z-ai-web-dev-sdk date-fns \
  @radix-ui/react-accordion @radix-ui/react-alert-dialog \
  @radix-ui/react-aspect-ratio @radix-ui/react-avatar \
  @radix-ui/react-checkbox @radix-ui/react-collapsible \
  @radix-ui/react-context-menu @radix-ui/react-dialog \
  @radix-ui/react-dropdown-menu @radix-ui/react-hover-card \
  @radix-ui/react-label @radix-ui/react-menubar \
  @radix-ui/react-navigation-menu @radix-ui/react-popover \
  @radix-ui/react-progress @radix-ui/react-radio-group \
  @radix-ui/react-scroll-area @radix-ui/react-select \
  @radix-ui/react-separator @radix-ui/react-slider \
  @radix-ui/react-switch @radix-ui/react-tabs \
  @radix-ui/react-toast @radix-ui/react-toggle \
  @radix-ui/react-toggle-group @radix-ui/react-tooltip

# 6. Verify
npx tsc --noEmit && npm run build
echo "Cleanup complete."
