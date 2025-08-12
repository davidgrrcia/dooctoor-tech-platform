## Dooctoor App — Build Plan and Task Checklist (React Native + Expo + Convex)

Reference designs: `docs/UI.html`

Goal: Ship a production-grade family health management app that centralizes medical records, appointments, and sharing permissions across a household.

Tech stack: React Native + Expo (Expo Router, TypeScript), Convex (data, auth, jobs), React Query/TanStack Query, Expo Notifications, EAS, lucide-react-native (icons).

Conventions:

- Use feature branches, squash merges, conventional commits.
- Each checklist item has clear acceptance criteria. Leave unchecked until verified in-app.

---

## 0) Project Foundations

- [ ] Monorepo bootstrapped and runnable
  - Acceptance:
    - `pnpm install` from repo root resolves
    - `pnpm --filter mobile start` launches Expo dev client (iOS/Android)
    - `pnpm --filter backend dev` runs Convex locally
- [ ] TypeScript, ESLint, Prettier consistent across packages
  - Acceptance: no lint/type errors in CI and locally
- [ ] Env management
  - Acceptance: `.env`, `.env.local` patterns; secrets are not committed; Expo Config Plugins read-only where necessary
- [ ] CI
  - Acceptance: GitHub Actions runs lint, typecheck, unit tests on PRs
- [ ] EAS setup
  - Acceptance: EAS project linked, profiles for `dev`, `preview`, `production`; store credentials configured

## 1) Design System and Theming

- [ ] Theme system and dark mode
  - Acceptance: Consistent theming via `ThemedText`/`ThemedView` and `useColorScheme`; dark mode follows system
- [ ] Brand tokens implemented
  - Acceptance: Color tokens from `UI.html` are available in a central theme module/constants:
    - brand.primary `#FD8006`
    - brand.secondary `#FF6B35`
    - info/security `#455581`
    - alerts/family `#CB4E8B`
    - share/social `#855798`
    - records.add `#f9545d`
    - surface/background tiers (white, gray-50, gray-100)
- [ ] Core components
  - Acceptance: Reusable `Button`, `Card`, `Icon`, `ListItem`, `Chip`, `Text`, `View` variants mirror `UI.html` styles and spacing
- [ ] Icons (lucide-react-native)
  - Acceptance: `lucide-react-native` installed and wired into a thin `Icon` wrapper; consistent sizes/colors across platforms
- [ ] Motion & haptics
  - Acceptance: Press feedback + subtle transitions for interactive elements; haptic feedback on primary actions (iOS/Android)

## 2) Navigation (Expo Router)

- [ ] Tabs: Home, Records, Agenda, Profile
  - Acceptance: Tab bar icons and labels match `UI.html` coloring states
- [ ] Stacks per tab
  - Acceptance: Details screens push on top of tab stacks (e.g., record details, member details)
- [ ] Deep links
  - Acceptance: Linking config opens specific screens (record by id, appointment by id)

## 3) Authentication & Onboarding

- [ ] Auth provider + Convex integration
  - Acceptance: Sign in/out with provider of choice (e.g., Supabase Auth, Clerk, or Auth0) and Convex sessions established
- [ ] Onboarding screen (Welcome)
  - Acceptance: Screen mirrors `UI.html` welcome/CTA; flows to sign-in or sign-up
- [ ] Session persistence
  - Acceptance: Silent session restore; splash gating
- [ ] Optional biometric lock
  - Acceptance: Enable/disable via Settings; Face/Touch ID gate on app resume

## 4) Convex Data Model

- [ ] Schema defined for core entities
  - Acceptance: Collections and indexes exist with access rules:
    - `users`
    - `families` (owner userId, name)
    - `familyMembers` (familyId, profile, demographics, relationships)
    - `records` (familyMemberId, type: lab|rx|image|note, title, provider, date, tags, status, fileIds)
    - `appointments` (familyMemberId, provider, location, start/end, status)
    - `medications` (familyMemberId, name, dosage, schedule)
    - `allergies` (familyMemberId, allergen, severity, notes)
    - `immunizations` (familyMemberId, vaccine, date, status)
    - `sharePermissions` (grantee user/email, scope: read|write, resource scope)
    - `files` (storage ref, mimeType, size, owner/family scopes)
    - `activities` (audit trail)
- [ ] Backend functions (queries/mutations)
  - Acceptance: CRUD for each entity; pagination; filtering; full-text or tag search for records
- [ ] Sample data seed
  - Acceptance: Seed script populates example family, members, records, appointments to match `UI.html`

## 5) Home (Family Dashboard)

- [ ] Header greeting + family summary
  - Acceptance: Shows current user, subtext, and accurate counts
- [ ] Family members list
  - Acceptance: Avatars, role labels; tap navigates to member profile
- [ ] Quick actions grid
  - Acceptance: Add Record, Schedule Appointment, Medications, Share Info open respective flows

## 6) Medical Records

- [ ] Records list with filters (All, Labs, Prescriptions, Images)
  - Acceptance: UI matches `UI.html`; filter chips update query; empty states
- [ ] Record details
  - Acceptance: Metadata, tags, status; file preview/open in viewer; share/export action
- [ ] Add/Edit/Delete records
  - Acceptance: Create flow supports attaching files, selecting member, tagging, status; optimistic UI with error recovery
- [ ] Search
  - Acceptance: Debounced search by title, provider, tags

## 7) Family Member Profile

- [ ] Profile header + vitals
  - Acceptance: Name, age, relationship, quick stats (height, weight, last temp)
- [ ] Health summary cards
  - Acceptance: Vaccines up-to-date, allergies, next checkup
- [ ] Recent records
  - Acceptance: Recent items list; tap-through to details
- [ ] Edit member
  - Acceptance: Update demographics, relationship, avatar

## 8) Agenda (Appointments)

- [ ] Calendar month view
  - Acceptance: Styled like `UI.html`; highlights current day and event indicators
- [ ] Today + upcoming lists
  - Acceptance: Sections for today and upcoming; statuses with color bars
- [ ] Create/edit appointments
  - Acceptance: Select member, provider, time; reminders; cancel/reschedule

## 9) Settings

- [ ] Profile summary
  - Acceptance: Shows name, email, role; navigate to profile editing
- [ ] Family management
  - Acceptance: Add/edit/remove family members (admin-only)
- [ ] Sharing permissions
  - Acceptance: Manage who can view/edit; invite via email; revoke access; scopes per member or all
- [ ] Privacy & security
  - Acceptance: Change password (if applicable), biometric toggle, session management
- [ ] App preferences
  - Acceptance: Notifications settings, data export

## 10) Sharing & Permissions

- [ ] Roles & scopes
  - Acceptance: Family Admin, Member, Caregiver roles; resource-scoped permissions enforced in Convex
- [ ] External sharing
  - Acceptance: Time-limited share links or targeted user invites; audit trail for access

## 11) Files & Storage

- [ ] File uploads from device (camera, library, files)
  - Acceptance: iOS/Android permissions handled; progress UI; multiple file formats
- [ ] Storage + access control
  - Acceptance: Files stored via Convex storage or S3; access checks in Convex; virus/mime validation where possible
- [ ] Previews
  - Acceptance: Image, PDF basic viewing; fallback open-in-native

## 12) Notifications & Reminders

- [ ] Push token registration
  - Acceptance: Device obtains and saves push token to Convex linked to user
- [ ] Local reminders
  - Acceptance: Schedule medication/appointment reminders locally; cancel/update logic
- [ ] Server-side scheduling
  - Acceptance: Convex scheduled jobs to trigger push for upcoming appointments

## 13) Offline, Sync, and Data Fetching

- [ ] React Query integration
  - Acceptance: Queries/mutations with caching, refetch on focus, retry policies
- [ ] Offline queue
  - Acceptance: Mutations queue and replay; user feedback when offline
- [ ] Error handling
  - Acceptance: Uniform error toasts/banners; retry affordances

## 14) Quality: Testing, Accessibility, i18n, Performance

- [ ] Unit tests (frontend/backend)
  - Acceptance: Core logic covered; CI green
- [ ] E2E smoke (Detox/Playwright for Expo)
  - Acceptance: Launch, login, create record, schedule appointment flows
- [ ] Accessibility
  - Acceptance: Color contrast, labels, focus order, dynamic type scaling
- [ ] i18n
  - Acceptance: English/Spanish toggle; copy externalized
- [ ] Performance budgets
  - Acceptance: Cold start threshold, list virtualization, image optimization

## 15) Analytics & Observability

- [ ] Analytics
  - Acceptance: Screen and key action events; privacy-compliant; opt-out
- [ ] Logging/monitoring
  - Acceptance: Error reporting (Sentry or similar); Convex logs/metrics dashboards

## 16) Security & Privacy

- [ ] Data protection
  - Acceptance: Transport security, at-rest encryption for files where feasible, PII minimization
- [ ] Access controls
  - Acceptance: All Convex functions enforce user and role checks; audit log entries on sensitive reads/writes
- [ ] Compliance readiness
  - Acceptance: GDPR basics (export/delete), consent surfaces for notifications/analytics

## 17) DevOps & Release

- [ ] CI/CD pipelines
  - Acceptance: PR checks, preview builds with EAS channels, automated versioning
- [ ] Release strategy
  - Acceptance: Staged rollouts, release notes, crash monitoring baseline
- [ ] Store readiness
  - Acceptance: App metadata, privacy labels, screenshots; TestFlight/Internal testing

---

## Route Map (Expo Router)

- `/` → Home (Dashboard)
- `/records` → Records list
- `/records/[id]` → Record details
- `/members/[id]` → Member profile
- `/appointments` → Agenda
- `/appointments/[id]` → Appointment details
- `/settings` → Settings root
- `/settings/sharing` → Sharing permissions
- `/auth/*` → Auth/onboarding

## Backend API (Convex) — High-Level

- queries:
  - `getFamily`, `listFamilyMembers`, `listRecords`, `searchRecords`, `listAppointments`, `getMemberSummary`
- mutations:
  - `createMember`, `updateMember`, `deleteMember`
  - `createRecord`, `updateRecord`, `deleteRecord`, `attachFilesToRecord`
  - `createAppointment`, `updateAppointment`, `cancelAppointment`
  - `grantShare`, `revokeShare`
  - `uploadFileInit`, `uploadFileComplete`

## QA Sign-off Checklist

- [ ] Flows from `UI.html` visually match on iOS and Android
- [ ] Core CRUD flows resilient to network loss
- [ ] Permissions enforce correct visibility across roles
- [ ] Push notifications received on physical devices
- [ ] App passes accessibility spot check

## Documentation

- [ ] README updates with setup/run instructions for mobile and backend
- [ ] Architecture overview (data flow, routing, state management)
- [ ] Support playbook (how to inspect logs, reseed, recover user access)
