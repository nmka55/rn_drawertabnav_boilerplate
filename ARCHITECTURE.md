# Architecture guide

`src/app` owns providers and theme tokens. `src/navigation` owns typed route trees. Feature folders own screens and domain state. `components/ui` contains controlled, form-library-free controls; `components/form` contains their typed React Hook Form adapters.

Use `Screen` as every screen's parent. It applies safe-area padding and keyboard avoidance by default. Set `scroll` for forms. `topAccessory`, `bottomAccessory`, `bleedTop`, and `bleedBottom` support hero content without creating a second screen shell.

## Forms

Use an `App*` component with ordinary controlled `value`/change props when local state owns a value. Use a `Form*` component with explicit typed `control` and `name` when React Hook Form owns it. Explicit controls prevent accidental binding when multiple forms appear on one screen.

## State and persistence

Redux Toolkit state is feature-owned and accessed through typed hooks. Never put passwords, tokens, raw form drafts, or secret API responses in Redux. The demo token belongs only in OS-backed Keychain/Keystore; MMKV stores a validated display-profile allowlist.

## Native dependency policy

Keep the RN-generated native projects intact. Add manual native code only when current documentation requires it. This project adds the `react-native-screens` fragment-restoration setup in `MainActivity.kt`; other selected native libraries autolink, followed by `pod install` on macOS.

## Adding a field

Add the controlled component under `components/ui`, a small `useController` wrapper under `components/form`, a gallery example, and a user-visible test. This keeps the boilerplate useful rather than accumulating dead exports.
