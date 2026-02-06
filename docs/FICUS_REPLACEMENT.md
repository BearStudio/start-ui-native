# Required Components to Replace Remaining Ficus UI Usage

This document lists components and hooks that still need to be created or updated to fully remove `react-native-ficus-ui` from the codebase.

## Summary: Components Created ✅

The following custom components have been created and are used as Ficus replacements:

- **Box** – `@/components/ui/box` – View with className
- **Stack, HStack, VStack, Center** – `@/components/ui/stack` – Layout primitives
- **ScrollBox** – `@/components/ui/scroll-box` – ScrollView with className
- **Divider** – `@/components/ui/divider` – Horizontal/vertical divider line
- **Button** – `@/components/ui/button` – Already existed
- **Text** – `@/components/ui/text` – Already existed
- **Card, CardHeader, CardTitle, CardBody** – `@/components/ui/card` – Updated to use custom primitives

---

## Required Components to Create

### 1. **Input** (TextInput)
- **Used in:** `src/components/form/field-text.tsx`
- **Ficus API:** `Input` with `as`, `borderColor`, `placeholderTextColor`, etc.
- **Replacement:** Create `@/components/ui/input.tsx` – TextInput with className, support for `as` (BottomSheetTextInput), error state styling
- **Reference:** react-native-reusables Input pattern

### 2. **PinInput** (OTP input)
- **Used in:** `src/components/form/field-otp.tsx`
- **Ficus API:** `PinInput` with `cellCount`, `value`, `onChangeText`, etc.
- **Replacement:** Create `@/components/ui/pin-input.tsx` – OTP code input with configurable cell count
- **Reference:** react-native-reusables or custom implementation with multiple TextInputs

### 3. **Badge**
- **Used in:** `src/features/app-onboarding/app-onboarding-screens.tsx`
- **Ficus API:** `Badge` with `bg`, `color`
- **Replacement:** Create `@/components/ui/badge.tsx` – Small label/chip component

### 4. **IconButton**
- **Used in:** `src/components/ui/theme-switcher.tsx`
- **Ficus API:** `IconButton` with `icon`, `variant`, `color`, `size`, `onPress`
- **Replacement:** Create `@/components/ui/icon-button.tsx` – Button with icon only, or use existing Button with `size="icon"`

### 5. **useDisclosure** hook
- **Used in:** `src/components/ui/theme-switcher.tsx`, `src/components/ui/bottom-sheet.tsx`
- **Ficus API:** `{ isOpen, onOpen, onClose, onToggle }`
- **Replacement:** Create `@/hooks/use-disclosure.ts` – Simple boolean state + open/close/toggle

### 6. **useColorMode** / **useColorModeValue**
- **Used in:** `src/components/theme-manager.tsx`, `src/components/ui/bottom-sheet.tsx`, `src/hooks/use-themed-style.tsx`
- **Ficus API:** Theme context for light/dark mode
- **Replacement:** Use `useColorScheme()` from React Native + `Appearance` API, or create `@/hooks/use-color-mode.ts` that syncs with AsyncStorage theme preference

---

## Required: Icon System Update

### 7. **ficus() wrapper for SVG icons**
- **Used in:** All `src/components/icons/generated/*.tsx` (60+ files), `src/components/icons/icon.tsx`, `src/components/icons/svgr.config.cjs`, `src/layout/view-safe-content.tsx`, `src/components/ui/bottom-sheet.tsx`
- **Ficus API:** `ficus(Component)` – Wraps component to accept Ficus style props (color, size, etc.)
- **Replacement options:**
  - **A:** Create `@/lib/ficus-compat.ts` – Minimal `ficus()` that forwards `color`, `width`, `height` to SVG `fill`/`stroke`
  - **B:** Update `svgr.config.cjs` to export raw Svg components without ficus wrapper; use `className="text-foreground"` for color
  - **C:** Use `lucide-react-native` directly where possible instead of generated icons

---

## Files Still Using Ficus (by category)

### Layout / Form (can use custom Box, Stack, etc.)
- `src/features/app-onboarding/view-app-onboarding.tsx` – Center, Stack, HStack, Button, Text, Badge
- `src/features/app-onboarding/app-onboarding-screens.tsx` – Badge, Box, Button, HStack, Stack, Text
- `src/features/account/view-account.tsx` – Box, Button, HStack, Stack, Text, etc.
- `src/features/devtools/login-hint.tsx` – Pressable, Text → use custom
- `src/components/ui/theme-switcher.tsx` – Box, Button, HStack, IconButton, Pressable, Text, useDisclosure
- `src/components/ui/locale-switcher.tsx` – Box, Button, HStack, Text, useDisclosure

### Form fields (need Input, PinInput)
- `src/components/form/field-text.tsx` – Box, Input
- `src/components/form/field-otp.tsx` – Box, PinInput

### Theme / Bottom sheet
- `src/components/theme-manager.tsx` – useColorMode
- `src/components/ui/bottom-sheet.tsx` – ficus, useColorModeValue, useDisclosure
- `src/hooks/use-themed-style.tsx` – useColorModeValue

### Icons (need ficus replacement)
- `src/components/icons/icon.tsx` – ficus
- `src/components/icons/generated/*.tsx` – ficus (all)
- `src/components/icons/svgr.config.cjs` – ficus template

### Stories / docs
- `src/components/ui/card.stories.tsx` – Box, Button, HStack, Text, VStack
- `src/components/icons/docs.stories.tsx` – Button, ScrollBox, Stack
- `src/components/form/docs.stories.tsx` – ScrollBox, Stack
- `src/hooks/use-share/docs.stories.tsx` – Button
- `src/hooks/use-browser/docs.stories.tsx` – Button

### Lib (ficus-ui config – remove when Ficus removed)
- `src/lib/ficus-ui/*` – Theme, foundations, component configs

---

## Suggested Implementation Order

1. **useDisclosure** – Simple, unblocks theme-switcher and locale-switcher
2. **Input** – Unblocks field-text
3. **PinInput** – Unblocks field-otp
4. **IconButton** – Or use Button size="icon"
5. **Badge** – Unblocks app-onboarding
6. **Theme/color mode** – Replace useColorMode with Appearance + AsyncStorage
7. **Icon ficus()** – Create compat layer or update SVGR template
8. **Bottom sheet** – Remove ficus wrapper, use plain BottomSheetModal
9. **Stories** – Replace with custom components
10. **Remove** `src/lib/ficus-ui` and `react-native-ficus-ui` dependency
