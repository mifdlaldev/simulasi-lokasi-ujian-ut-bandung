# UT Bandung Exam Location Prototype Implementation Plan

> **For agentic workers:** Use `subagent-driven-development` or `/start-work` to execute this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a responsive interactive frontend prototype for Universitas Terbuka Bandung students to choose an exam location through a guided wizard.

**Architecture:** Greenfield single-page React prototype using local static data, local React state, reusable UI primitives, and step-specific components. No backend, API, auth, database, admin panel, real UT integration, or automated test infrastructure during initial development.

**Tech Stack:** Vite + React + TypeScript + Tailwind CSS, local state/reducer, local mock data, browser-based smoke verification.

---

## TL;DR

> **Quick Summary**: Create an official-campus-style UT Bandung exam-location selection prototype with complete student identity form, searchable kab/kota dropdown, school/location cards, location detail view, and two-stage confirmation.
>
> **Deliverables**:
> - Vite React TypeScript Tailwind project scaffold
> - UT blue/yellow/white visual theme (`#034694`, `#FFF200`, white)
> - Wizard flow: identity → region → location → detail → review → final confirmation
> - Dummy realistic UT Bandung region/school data with dates, quotas, photos, addresses, and map links/embeds
> - Responsive desktop/mobile UI
> - Build/preview smoke verification and deferred QA scenario guide
>
> **Estimated Effort**: Medium
> **Parallel Execution**: YES - 3 implementation waves + final verification wave
> **Critical Path**: Wave 1A/1B foundation → Wave 2 feature components → Task 15 integration + Task 17 visual polish → Wave 3B validation/responsive/docs → F1-F4

---

## Context

### Original Request
The user wants a website simulation for students at Universitas Terbuka Bandung to select an exam location. The website should show a form with a searchable kabupaten/kota selector, then show school exam locations, exam date, room quota, school details, photo, GPS/maps, full address, and two-stage confirmation.

### Interview Summary
**Key Discussions**:
- Target is an **interactive prototype**, not a production backend application.
- UX flow is **wizard bertahap** to reduce cognitive load.
- Form includes complete student identity: NIM, name, program study, email/phone.
- Data starts as **realistic dummy data** and can be replaced later.
- Visual style is **resmi kampus** with UT blue/yellow/white.
- Two-stage confirmation is **Review Lalu Final**: summary review, checkbox statement, final confirm.
- User explicitly prefers **no automated testing setup during initial development**; user will request testing/bug search/debug later.

**Research Findings**:
- Workspace is effectively empty except `.sisyphus/`; no package/config/source/test files exist.
- Recommended stack: Vite + React + Tailwind for a prototype because it is lightweight and avoids backend/SEO overhead.
- Official docs references: Vite `https://vite.dev/guide/`, React `https://react.dev/learn`, Tailwind with Vite `https://tailwindcss.com/docs/installation/using-vite`.
- UT official/repo text describes logo colors as dark blue and yellow but did not expose official hex values. Temporary sampled public-logo colors: blue `#034694`, yellow `#FFF200`.

### Metis Review
**Identified Gaps** (addressed):
- No blocking gaps.
- Default map strategy: use embed/link, no API key.
- Default photo strategy: local/public placeholders or stable placeholder URLs.
- Guardrails: no backend/API/auth/admin panel/live UT data/quota mutation/automated test setup.
- Verification still needs install/build/preview smoke checks and QA scenarios, without adding test frameworks.

### High Accuracy Status
- **Selected by user**: YES
- **Momus review**: Completed
- **Last Momus verdict**: `OKAY`
- **Current status**: Ready for `/start-work ut-bandung-lokasi-ujian` execution.

### Execution Handoff Decision
- **Confirmed implementation orchestrator**: Sisyphus
- **Confirmed model preference**: GPT-5.5 xHigh / Extra High
- **Reason**: Prometheus is the planner; Sisyphus is the appropriate executor for `/start-work` plan execution.

---

## Work Objectives

### Core Objective
Deliver a polished, responsive, official-campus-style frontend prototype that simulates UT Bandung exam-location selection end-to-end without backend persistence.

### Concrete Deliverables
- Project scaffold and dependency scripts
- Theme tokens and responsive layout foundation
- Mock data model for UT Bandung regions and exam schools
- Wizard state model and validation rules
- Student identity step
- Searchable kab/kota dropdown step
- School location selection cards
- School detail page/step with photo, address, map, date, quota
- Two-stage review/final confirmation
- Success/finalized screen
- README/manual run instructions

### Definition of Done
- [ ] `npm install` completes without dependency errors
- [ ] `npm run build` completes successfully
- [ ] `npm run preview -- --host 127.0.0.1` serves the built prototype
- [ ] Desktop layout works at `1440x900`
- [ ] Mobile layout works at `390x844`
- [ ] Wizard happy path completes with concrete dummy data
- [ ] Required field validation prevents invalid forward navigation
- [ ] No automated test framework/config/test files are added during initial development

### Must Have
- Student identity fields: NIM, name, program study, email/phone
- Searchable kabupaten/kota dropdown
- Region-filtered school/location options
- Exam date and available room quota display
- School photo, map/GPS link or embed, and full address
- Two-stage confirmation: review summary, then final checkbox + confirm
- Official campus visual tone using UT blue/yellow/white
- Responsive desktop and mobile experience

### Must NOT Have (Guardrails)
- No backend, API, database, server actions, or persistent quota mutation
- No authentication/login or admin panel
- No real UT data scraping/integration
- No OTP/SMS/WhatsApp/email notification flow
- No automated test setup during initial development
- No paid map API key or external service requirement
- No generic purple-gradient AI aesthetic
- No scope expansion beyond the approved prototype

---

## Verification Strategy (MANDATORY)

> **ZERO HUMAN INTERVENTION FOR PLAN ACCEPTANCE** - Verification criteria are executable by agents/tools. User manual testing is outside this plan and may happen after development as requested by the user.

### Test Decision
- **Infrastructure exists**: NO
- **Automated tests**: None during initial development, per user preference
- **Framework**: None for automated tests in this plan
- **Build verification**: `npm run build`
- **Preview verification**: `npm run preview -- --host 127.0.0.1`
- **Agent QA**: Browser-driven scenario checks documented for final/later testing; no committed Playwright/Vitest setup.

### QA Policy
Every task includes agent-executable QA scenarios. These are browser/manual-operation scenarios for an agent to run during final verification or when user requests testing later. Evidence should be saved to `.sisyphus/evidence/task-{N}-{scenario-slug}.{ext}`.

---

## Execution Strategy

### Parallel Execution Waves

```text
Wave 1A (Independent foundation - start immediately):
├── Task 1: Project scripts and Vite config [quick]
├── Task 2: App HTML entry and global CSS entry [quick]
├── Task 3: TypeScript contracts [quick]
└── Task 6: UT brand content and theme foundation [visual-engineering]

Wave 1B (Dependent foundation - after required 1A outputs):
├── Task 4: Dummy exam-location data [quick]
├── Task 5: Wizard state and validation helpers [quick]
└── Task 7: Shared UI primitives [visual-engineering]

Wave 2 (Feature components - after Wave 1B):
├── Task 8: App shell and wizard layout [visual-engineering]
├── Task 9: Student identity step [quick]
├── Task 10: Searchable kab/kota step [quick]
├── Task 11: Location selection cards [visual-engineering]
├── Task 12: Location detail, photo placeholder, and map preview [visual-engineering]
├── Task 13: Review/final confirmation step [quick]
└── Task 14: Responsive summary/sidebar components [visual-engineering]

Wave 3A (Dependency-forced integration start - after Wave 2):
├── Task 15: Wire complete wizard flow in App [unspecified-high]
└── Task 17: Official-campus visual polish [visual-engineering]

Wave 3B (Final polish/docs - after Wave 3A):
├── Task 16: Validation feedback and disabled states [quick]
├── Task 18: Responsive/accessibility pass [visual-engineering]
└── Task 19: README and run instructions [writing]

Wave FINAL (After ALL tasks — 4 parallel reviews, then user okay):
├── Task F1: Plan compliance audit (oracle)
├── Task F2: Code quality review (unspecified-high)
├── Task F3: Real manual QA by agent/browser (unspecified-high + playwright skill if available)
└── Task F4: Scope fidelity check (deep)
```

### Dependency Matrix

| Task | Depends On | Blocks | Wave |
|---|---:|---|---:|
| 1 | None | 15, 19 | 1A |
| 2 | None | 7, 8, 15, 17 | 1A |
| 3 | None | 4, 5, 9, 10, 11, 12, 13, 15 | 1A |
| 4 | 3 | 10, 11, 12, 15 | 1B |
| 5 | 3 | 9, 10, 13, 15, 16 | 1B |
| 6 | None | 7, 8, 12, 17 | 1A |
| 7 | 2, 6 | 8-14, 16, 17, 18 | 1B |
| 8 | 2, 6, 7 | 15, 18 | 2 |
| 9 | 3, 5, 7 | 15, 16 | 2 |
| 10 | 3, 4, 5, 7 | 15, 16 | 2 |
| 11 | 3, 4, 7 | 15 | 2 |
| 12 | 3, 4, 6, 7 | 15 | 2 |
| 13 | 3, 5, 7 | 15, 16 | 2 |
| 14 | 3, 4, 7 | 15, 18 | 2 |
| 15 | 8-14 | 16, 18, 19 | 3A |
| 16 | 5, 9, 10, 13, 15 | F1-F4 | 3B |
| 17 | 2, 6, 7, 8 | 18 | 3A |
| 18 | 8, 14, 15, 17 | F1-F4 | 3B |
| 19 | 1, 15 | F1-F4 | 3B |

### Agent Dispatch Summary

- **Wave 1A**: 4 tasks — T1-T3 `quick`, T6 `visual-engineering`
- **Wave 1B**: 3 tasks — T4-T5 `quick`, T7 `visual-engineering`
- **Wave 2**: 7 tasks — T8 `visual-engineering`, T9-T10 `quick`, T11-T12 `visual-engineering`, T13 `quick`, T14 `visual-engineering`
- **Wave 3A**: 2 tasks — T15 `unspecified-high`, T17 `visual-engineering` (dependency-forced fewer than 3)
- **Wave 3B**: 3 tasks — T16 `quick`, T18 `visual-engineering`, T19 `writing`
- **FINAL**: 4 review tasks — F1 `oracle`, F2 `unspecified-high`, F3 `unspecified-high`, F4 `deep`

---

## TODOs

> Implementation + verification = ONE task. Do not add automated test framework/config/test files during initial development. Every task still has acceptance criteria and QA scenarios.

- [ ] 1. Project scripts and Vite config

  **What to do**:
  - Create root package metadata for a Vite React TypeScript Tailwind prototype.
  - Add scripts: `dev`, `build`, `preview`.
  - Configure Vite with React and Tailwind plugin only; do not add test framework dependencies.

  **Files**:
  - Create: `package.json`
  - Create: `vite.config.ts`

  **Must NOT do**:
  - Do not create Vitest/Playwright/Jest config or test files.
  - Do not add backend/server dependencies.

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Small greenfield config setup.
  - **Skills**: [`vercel-react-best-practices`]
    - `vercel-react-best-practices`: React project setup and performance-safe defaults.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1A
  - **Blocks**: Tasks 15, 19
  - **Blocked By**: None

  **References**:
  - Official Vite guide: `https://vite.dev/guide/` - project scripts and Vite config expectations.
  - Tailwind with Vite: `https://tailwindcss.com/docs/installation/using-vite` - use Tailwind's Vite plugin.
  - Draft: `.sisyphus/drafts/ut-bandung-lokasi-ujian.md` - user explicitly requested no automated testing during initial development.

  **Acceptance Criteria**:
  - [ ] `package.json` includes `dev`, `build`, and `preview` scripts.
  - [ ] `package.json` includes React, Vite, TypeScript, Tailwind dependencies needed for the prototype.
  - [ ] `vite.config.ts` contains Vite React + Tailwind setup.
  - [ ] No `vitest`, `jest`, `playwright`, or test config files are added.

  **QA Scenarios**:
  ```text
  Scenario: Config scripts are present
    Tool: Bash
    Preconditions: Task files created
    Steps:
      1. Run `node -e "const p=require('./package.json'); console.log(Object.keys(p.scripts).sort().join(','))"`
      2. Assert output contains `build,dev,preview`
      3. Run `ls vite.config.ts package.json`
    Expected Result: Both files exist and scripts are listed.
    Failure Indicators: Missing script, missing config, or test dependency present.
    Evidence: .sisyphus/evidence/task-1-config-scripts.txt

  Scenario: No automated test setup exists
    Tool: Bash
    Preconditions: Task files created
    Steps:
      1. Run `node -e "const p=require('./package.json'); const all={...p.dependencies,...p.devDependencies}; console.log(['vitest','jest','playwright'].filter(k=>all&&all[k]).join(',') || 'none')"`
      2. Assert output is `none`
    Expected Result: No automated test framework dependency is installed.
    Evidence: .sisyphus/evidence/task-1-no-test-deps.txt
  ```

- [ ] 2. HTML entry and global CSS entry

  **What to do**:
  - Create the Vite HTML entry, React mount entry, and global CSS entry.
  - Import Tailwind and project theme CSS.
  - Set Indonesian language metadata and official prototype page title.

  **Files**:
  - Create: `index.html`
  - Create: `src/main.tsx`
  - Create: `src/index.css`

  **Must NOT do**:
  - Do not build feature UI in `main.tsx`.
  - Do not hard-code large component styles in `index.html`.

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Entry-point scaffolding only.
  - **Skills**: [`vercel-react-best-practices`]
    - `vercel-react-best-practices`: Keep root rendering simple and predictable.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1A
  - **Blocks**: Tasks 8, 15, 17
  - **Blocked By**: None

  **References**:
  - React learn: `https://react.dev/learn` - React root rendering conventions.
  - Tailwind with Vite: `https://tailwindcss.com/docs/installation/using-vite` - CSS import pattern.

  **Acceptance Criteria**:
  - [ ] `index.html` contains `<html lang="id">` and title `Simulasi Pemilihan Lokasi Ujian UT Bandung`.
  - [ ] `src/main.tsx` renders `<App />` into `#root`.
  - [ ] `src/index.css` imports Tailwind and `./styles/theme.css`.
  - [ ] No feature logic exists in `main.tsx`.

  **QA Scenarios**:
  ```text
  Scenario: HTML and React entry are wired
    Tool: Bash
    Preconditions: Task files created
    Steps:
      1. Run `grep -n "lang=\"id\"\|root\|Simulasi Pemilihan" index.html src/main.tsx`
      2. Assert the command outputs matches from both `index.html` and `src/main.tsx`.
    Expected Result: Indonesian language, root mount, and page title are visible.
    Evidence: .sisyphus/evidence/task-2-entry-wiring.txt

  Scenario: CSS entry imports theme
    Tool: Bash
    Preconditions: `src/index.css` exists
    Steps:
      1. Run `grep -n "tailwind\|styles/theme.css" src/index.css`
      2. Assert both Tailwind and theme imports are present.
    Expected Result: Global CSS entry loads Tailwind and theme file.
    Evidence: .sisyphus/evidence/task-2-css-entry.txt
  ```

- [ ] 3. TypeScript contracts

  **What to do**:
  - Define shared data contracts for student identity, regions, exam locations, and wizard steps.
  - Keep contracts stable so Wave 2 components can be implemented independently.

  **Files**:
  - Create: `src/types/location.ts`
  - Create: `src/types/wizard.ts`

  **Must NOT do**:
  - Do not put dummy data in type files.
  - Do not model backend/database entities beyond prototype needs.

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Focused type definitions.
  - **Skills**: [`vercel-react-best-practices`]
    - `vercel-react-best-practices`: Component contract clarity for React props/state.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1A
  - **Blocks**: Tasks 4, 5, 9, 10, 11, 12, 13, 15
  - **Blocked By**: None

  **References**:
  - Draft requirements: `.sisyphus/drafts/ut-bandung-lokasi-ujian.md:3-21` - fields and flow to model.

  **Acceptance Criteria**:
  - [ ] `StudentIdentity` includes `nim`, `name`, `programStudy`, `email`, and `phone`.
  - [ ] `ExamRegion` includes stable `id` and `name`.
  - [ ] `ExamLocation` includes `id`, `regionId`, `schoolName`, `examDate`, `availableRooms`, `address`, `mapUrl`, `photoUrl`, and `description`.
  - [ ] `WizardStep` covers identity, region, location, detail, review, success.

  **QA Scenarios**:
  ```text
  Scenario: Required contracts expose prototype fields
    Tool: Bash
    Preconditions: Type files created
    Steps:
      1. Run `grep -n "StudentIdentity\|ExamRegion\|ExamLocation\|WizardStep" src/types/location.ts src/types/wizard.ts`
      2. Run `grep -n "nim\|programStudy\|schoolName\|examDate\|availableRooms\|mapUrl\|photoUrl" src/types/location.ts src/types/wizard.ts`
    Expected Result: All required contract and field names are present.
    Evidence: .sisyphus/evidence/task-3-contract-fields.txt

  Scenario: No backend-like contracts are introduced
    Tool: Bash
    Preconditions: Type files created
    Steps:
      1. Run `grep -R "password\|token\|role\|admin\|database" src/types || true`
      2. Assert no output contains backend/auth/admin fields.
    Expected Result: Type scope remains prototype-only.
    Evidence: .sisyphus/evidence/task-3-no-backend-types.txt
  ```

- [ ] 4. Dummy exam-location data

  **What to do**:
  - Create realistic dummy data for UT Bandung working-area regions and school exam locations.
  - Include enough data to demonstrate filtering and choice: at least 6 regions and at least 10 schools.
  - Use replaceable local data structure; no network fetch.

  **Files**:
  - Create: `src/data/examLocations.ts`

  **Must NOT do**:
  - Do not scrape or claim official UT location data.
  - Do not fetch remote data at runtime.
  - Do not implement quota mutation logic.

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Static data modeling.
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1B
  - **Blocks**: Tasks 10, 11, 12, 15
  - **Blocked By**: Task 3

  **References**:
  - Draft: `.sisyphus/drafts/ut-bandung-lokasi-ujian.md:14` - dummy data first.
  - Type contracts: `src/types/location.ts` - shape to satisfy.

  **Acceptance Criteria**:
  - [ ] Exports `examRegions` with at least 6 region entries.
  - [ ] Exports `examLocations` with at least 10 school/location entries.
  - [ ] Every location has valid `regionId` matching a region.
  - [ ] Every location has date, quota, full address, map URL, photo URL, and description.
  - [ ] File comment clearly states data is dummy/prototype data.

  **QA Scenarios**:
  ```text
  Scenario: Dummy data has enough choices
    Tool: Bash
    Preconditions: Data file created
    Steps:
      1. Run `grep -o "schoolName" src/data/examLocations.ts | wc -l`
      2. Assert output is `10` or greater.
      3. Run `grep -o "name:" src/data/examLocations.ts | wc -l`
      4. Assert region/name count indicates multiple regions.
    Expected Result: Data volume supports search/filter demo.
    Evidence: .sisyphus/evidence/task-4-data-volume.txt

  Scenario: Data is not represented as official live data
    Tool: Bash
    Preconditions: Data file created
    Steps:
      1. Run `grep -n "dummy\|prototype\|contoh" src/data/examLocations.ts`
      2. Assert at least one explanatory comment is present.
    Expected Result: Data provenance is clear and non-misleading.
    Evidence: .sisyphus/evidence/task-4-dummy-disclaimer.txt
  ```

- [ ] 5. Wizard state and validation helpers

  **What to do**:
  - Create reducer/state helpers for the wizard's selected identity, region, location, and confirmation state.
  - Create minimal validation helpers for required fields and step navigation.

  **Files**:
  - Create: `src/state/wizardReducer.ts`
  - Create: `src/state/validation.ts`

  **Must NOT do**:
  - Do not add Zustand or external state libraries unless later tasks prove local state is insufficient.
  - Do not persist data to backend/local database.

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Local reducer and deterministic helper functions.
  - **Skills**: [`vercel-react-best-practices`]
    - `vercel-react-best-practices`: Avoid unnecessary global state and rerender-heavy patterns.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1B
  - **Blocks**: Tasks 9, 10, 13, 15, 16
  - **Blocked By**: Task 3

  **References**:
  - React state docs: `https://react.dev/learn/managing-state` - local state/reducer guidance.
  - Wizard types: `src/types/wizard.ts` - step names and state shape.

  **Acceptance Criteria**:
  - [ ] Reducer supports setting identity, region, location, review acknowledgement, and final confirmation.
  - [ ] Validation requires NIM, name, program study, and at least one contact method.
  - [ ] Validation requires region before location and location before review.
  - [ ] No external state package is added.

  **QA Scenarios**:
  ```text
  Scenario: Reducer actions are present
    Tool: Bash
    Preconditions: State files created
    Steps:
      1. Run `grep -n "SET_IDENTITY\|SET_REGION\|SET_LOCATION\|CONFIRM_FINAL" src/state/wizardReducer.ts`
      2. Assert all action names are present.
    Expected Result: Wizard can track all required decisions.
    Evidence: .sisyphus/evidence/task-5-reducer-actions.txt

  Scenario: Validation guards required fields
    Tool: Bash
    Preconditions: Validation file created
    Steps:
      1. Run `grep -n "nim\|name\|programStudy\|email\|phone\|region\|location" src/state/validation.ts`
      2. Assert required student and selection fields are referenced.
    Expected Result: Validation covers identity and selection prerequisites.
    Evidence: .sisyphus/evidence/task-5-validation-fields.txt
  ```

- [ ] 6. UT brand content and theme foundation

  **What to do**:
  - Define brand constants for temporary UT blue/yellow/white palette.
  - Create official-campus copy strings for header, instructions, confirmations, and disclaimer that data is prototype/dummy.
  - Create initial theme CSS file so `src/index.css` imports a real file from the start.

  **Files**:
  - Create: `src/content/brand.ts`
  - Create: `src/content/copy.ts`
  - Create: `src/styles/theme.css`

  **Must NOT do**:
  - Do not download or embed official UT trademark assets unless user provides permission/assets.
  - Do not imply dummy exam locations are official.

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Brand tone and visual placeholder choices affect UI quality.
  - **Skills**: [`frontend-design`, `ui-ux-designer`]
    - `frontend-design`: Avoid generic visual style.
    - `ui-ux-designer`: Maintain formal, accessible institutional tone.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1A
  - **Blocks**: Tasks 8, 12, 17
  - **Blocked By**: None

  **References**:
  - UT logo text source: `https://github.com/UnivTerbuka/UnivTerbuka/blob/main/logo-ut.md` - confirms dark blue and yellow symbolic colors.
  - Draft color decision: `.sisyphus/drafts/ut-bandung-lokasi-ujian.md:32` - temporary hex values.

  **Acceptance Criteria**:
  - [ ] `brand.ts` exports `utBlue = "#034694"`, `utYellow = "#FFF200"`, and white/background tokens.
  - [ ] Copy includes a clear prototype/dummy-data disclaimer.
  - [ ] `src/styles/theme.css` exists and defines initial CSS variables/classes for the palette.
  - [ ] Tone is formal and suitable for campus service simulation.

  **QA Scenarios**:
  ```text
  Scenario: Brand colors are defined
    Tool: Bash
    Preconditions: Brand file created
    Steps:
      1. Run `grep -n "#034694\|#FFF200" src/content/brand.ts`
      2. Assert both temporary UT palette values are present.
    Expected Result: UT-inspired color tokens are available.
    Evidence: .sisyphus/evidence/task-6-brand-colors.txt

  Scenario: Dummy-data disclaimer exists
    Tool: Bash
    Preconditions: Copy file created
    Steps:
      1. Run `grep -n "dummy\|prototype\|simulasi\|contoh" src/content/copy.ts`
      2. Assert disclaimer text exists.
    Expected Result: UI copy will not misrepresent data as official.
    Evidence: .sisyphus/evidence/task-6-disclaimer.txt
  ```

- [ ] 7. Shared UI primitives

  **What to do**:
  - Create reusable UI primitives for buttons, fields, and stepper navigation.
  - Use accessible labels, focus-visible styles, and consistent UT color tokens.

  **Files**:
  - Create: `src/components/ui/Button.tsx`
  - Create: `src/components/ui/FormField.tsx`
  - Create: `src/components/ui/Stepper.tsx`

  **Must NOT do**:
  - Do not hard-code step-specific business logic in primitives.
  - Do not create a large generic component library beyond prototype needs.

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Reusable UI quality and accessibility matter for all screens.
  - **Skills**: [`frontend-design`, `accessibility`]
    - `frontend-design`: Polished institutional styling.
    - `accessibility`: Labels, focus states, keyboard usability.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1B
  - **Blocks**: Tasks 8-14, 16, 17, 18
  - **Blocked By**: Tasks 2, 6

  **References**:
  - React components: `https://react.dev/learn/your-first-component` - component composition.
  - WCAG form labels principle: use accessible labels for fields and buttons.

  **Acceptance Criteria**:
  - [ ] Button supports primary, secondary, and disabled states.
  - [ ] FormField renders label, input/select slot, helper text, and error message.
  - [ ] Stepper indicates current step and completed prior steps.
  - [ ] Focus-visible styles are obvious against white/blue/yellow palette.

  **QA Scenarios**:
  ```text
  Scenario: UI primitives expose required states
    Tool: Bash
    Preconditions: UI files created
    Steps:
      1. Run `grep -n "primary\|secondary\|disabled\|aria\|focus" src/components/ui/Button.tsx src/components/ui/FormField.tsx src/components/ui/Stepper.tsx`
      2. Assert outputs include state and accessibility hooks.
    Expected Result: Shared components support required variants and accessibility basics.
    Evidence: .sisyphus/evidence/task-7-ui-states.txt

  Scenario: Primitives contain no feature-specific location logic
    Tool: Bash
    Preconditions: UI files created
    Steps:
      1. Run `grep -R "schoolName\|examDate\|availableRooms\|regionId" src/components/ui || true`
      2. Assert no feature-specific fields appear.
    Expected Result: Primitives remain reusable and decoupled.
    Evidence: .sisyphus/evidence/task-7-no-feature-logic.txt
  ```

- [ ] 8. App shell and wizard layout

  **What to do**:
  - Build the page shell with official-campus header, main card/container, and stepper placement.
  - Provide layout slots for wizard content and selection summary.

  **Files**:
  - Create: `src/components/layout/AppShell.tsx`
  - Create: `src/components/layout/WizardFrame.tsx`

  **Must NOT do**:
  - Do not wire complete business flow yet; Task 15 handles integration.
  - Do not add routing.

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: First visual impression and structure.
  - **Skills**: [`frontend-design`, `ui-ux-designer`]
    - `frontend-design`: Distinctive official-campus page composition.
    - `ui-ux-designer`: Clear hierarchy for multi-step flow.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2
  - **Blocks**: Tasks 15, 18
  - **Blocked By**: Tasks 2, 6, 7

  **References**:
  - Brand content: `src/content/brand.ts`, `src/content/copy.ts` - colors and copy.
  - UI primitives: `src/components/ui/Stepper.tsx` - progress display.

  **Acceptance Criteria**:
  - [ ] Header identifies the prototype as UT Bandung exam location simulation.
  - [ ] Layout has clear content area and stepper region.
  - [ ] White card surfaces contrast with UT blue/yellow accents.
  - [ ] No routing or final state logic exists in shell components.

  **QA Scenarios**:
  ```text
  Scenario: Shell includes official-campus structure
    Tool: Bash
    Preconditions: Layout files created
    Steps:
      1. Run `grep -n "UT Bandung\|Universitas Terbuka\|Stepper\|children" src/components/layout/AppShell.tsx src/components/layout/WizardFrame.tsx`
      2. Assert header/copy and composition slots are present.
    Expected Result: Layout can host wizard content with institutional identity.
    Evidence: .sisyphus/evidence/task-8-shell-structure.txt

  Scenario: Shell has no routing dependency
    Tool: Bash
    Preconditions: Layout files created
    Steps:
      1. Run `grep -R "react-router\|BrowserRouter\|Route" src/components/layout || true`
      2. Assert no routing code appears.
    Expected Result: Prototype remains a simple SPA wizard.
    Evidence: .sisyphus/evidence/task-8-no-routing.txt
  ```

- [ ] 9. Student identity step

  **What to do**:
  - Build the wizard step for complete student identity.
  - Include fields for NIM, name, program study, email, and phone.
  - Show inline helper/error slots from validation props.

  **Files**:
  - Create: `src/components/steps/StudentIdentityStep.tsx`

  **Must NOT do**:
  - Do not submit identity to an API.
  - Do not collect sensitive data beyond the approved demo fields.

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Focused form component.
  - **Skills**: [`accessibility`]
    - `accessibility`: Proper labels, input types, and error association.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2
  - **Blocks**: Tasks 15, 16
  - **Blocked By**: Tasks 3, 5, 7

  **References**:
  - Type contract: `src/types/location.ts:StudentIdentity` - field names.
  - Validation helpers: `src/state/validation.ts` - required field rules.
  - UI primitive: `src/components/ui/FormField.tsx` - field rendering pattern.

  **Acceptance Criteria**:
  - [ ] Component renders NIM, name, program study, email, and phone fields.
  - [ ] Email field uses `type="email"`; phone field uses appropriate tel input.
  - [ ] Component accepts value, change handler, and error props.
  - [ ] Empty required fields can display field-level errors.

  **QA Scenarios**:
  ```text
  Scenario: Identity fields are rendered
    Tool: Bash
    Preconditions: Component created
    Steps:
      1. Run `grep -n "NIM\|Nama\|Program Studi\|Email\|Telepon\|HP" src/components/steps/StudentIdentityStep.tsx`
      2. Assert all labels are present.
    Expected Result: Complete student identity form exists.
    Evidence: .sisyphus/evidence/task-9-identity-fields.txt

  Scenario: Identity step has no API submission
    Tool: Bash
    Preconditions: Component created
    Steps:
      1. Run `grep -n "fetch\|axios\|XMLHttpRequest" src/components/steps/StudentIdentityStep.tsx || true`
      2. Assert no network request code appears.
    Expected Result: Identity data remains local prototype state.
    Evidence: .sisyphus/evidence/task-9-no-api.txt
  ```

- [ ] 10. Searchable kabupaten/kota step

  **What to do**:
  - Build the region search/dropdown step.
  - Allow typing query such as `Bandung` and selecting one matching kabupaten/kota.
  - Show empty-state text when no region matches.

  **Files**:
  - Create: `src/components/steps/RegionSearchStep.tsx`

  **Must NOT do**:
  - Do not use a heavy third-party combobox library for this prototype.
  - Do not hard-code regions inside the component; consume props/data.

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Search/filter component with local state.
  - **Skills**: [`accessibility`, `vercel-react-best-practices`]
    - `accessibility`: Keyboard and ARIA combobox/listbox basics.
    - `vercel-react-best-practices`: Keep filtering lightweight.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2
  - **Blocks**: Tasks 15, 16
  - **Blocked By**: Tasks 3, 4, 5, 7

  **References**:
  - Mock data: `src/data/examLocations.ts:examRegions` - region source.
  - Draft requirement: searchable kab/kota dropdown.

  **Acceptance Criteria**:
  - [ ] Search input filters `examRegions` by case-insensitive region name.
  - [ ] Selecting a region calls a provided `onSelectRegion` handler.
  - [ ] Empty state appears for a query like `zzzz`.
  - [ ] Selected region is visibly highlighted or summarized.

  **QA Scenarios**:
  ```text
  Scenario: Region search supports Bandung query
    Tool: Browser/Playwright later or Bash source check
    Preconditions: Component integrated or created
    Steps:
      1. In running preview, type `Bandung` in region search input.
      2. Assert matching options include `Kota Bandung` or `Kabupaten Bandung`.
      3. Select one result.
    Expected Result: Selected region is visible and Next button can become available after integration.
    Evidence: .sisyphus/evidence/task-10-region-search.png

  Scenario: Empty search is handled gracefully
    Tool: Browser/Playwright later
    Preconditions: Component integrated or created
    Steps:
      1. Type `zzzz` into region search input.
      2. Assert text similar to `Wilayah tidak ditemukan` is visible.
    Expected Result: No crash; clear empty-state message appears.
    Evidence: .sisyphus/evidence/task-10-empty-search.png
  ```

- [ ] 11. Location selection cards

  **What to do**:
  - Build location card UI and location selection step.
  - Filter locations by selected region.
  - Display school name, exam date, available room quota, and short address.

  **Files**:
  - Create: `src/components/location/LocationCard.tsx`
  - Create: `src/components/steps/LocationSelectionStep.tsx`

  **Must NOT do**:
  - Do not mutate quota when selected.
  - Do not show schools from other regions after a region is selected.

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Card layout, hierarchy, and selection state are visual.
  - **Skills**: [`frontend-design`, `accessibility`]
    - `frontend-design`: High-quality card design.
    - `accessibility`: Button/card selection semantics.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2
  - **Blocks**: Task 15
  - **Blocked By**: Tasks 3, 4, 7

  **References**:
  - Mock data: `src/data/examLocations.ts:examLocations` - location fields.
  - Type contract: `src/types/location.ts:ExamLocation` - card props.

  **Acceptance Criteria**:
  - [ ] Each card shows school name, exam date, available rooms, and address summary.
  - [ ] Cards can show selected/unselected visual states.
  - [ ] Step filters cards to the selected `regionId`.
  - [ ] Empty state appears if selected region has no locations.

  **QA Scenarios**:
  ```text
  Scenario: Location cards show required details
    Tool: Browser/Playwright later
    Preconditions: Region selected in running preview
    Steps:
      1. Select `Kota Bandung` in region step.
      2. Advance to location selection.
      3. Assert at least one card shows school name, date, quota, and address text.
    Expected Result: Region-specific location options are visible.
    Evidence: .sisyphus/evidence/task-11-location-cards.png

  Scenario: Quota is display-only
    Tool: Bash
    Preconditions: Components created
    Steps:
      1. Run `grep -R "availableRooms.*--\|availableRooms.*-=" src/components/location src/components/steps || true`
      2. Assert no mutation logic appears.
    Expected Result: Prototype does not pretend to reserve/decrement rooms.
    Evidence: .sisyphus/evidence/task-11-no-quota-mutation.txt
  ```

- [ ] 12. Location detail, photo placeholder, and map preview

  **What to do**:
  - Build location detail step showing selected school photo, full address, description, date, quota, and map preview/link.
  - Use no API key; use safe embed/link/placeholder strategy.

  **Files**:
  - Create: `src/components/location/MapPreview.tsx`
  - Create: `src/components/steps/LocationDetailStep.tsx`
  - Create: `public/school-placeholder.svg`

  **Must NOT do**:
  - Do not require Google Maps API key.
  - Do not fetch map data dynamically.

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Detail page combines image, map, and information hierarchy.
  - **Skills**: [`frontend-design`, `accessibility`]
    - `frontend-design`: Polished detail composition.
    - `accessibility`: Image alt text and link labeling.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2
  - **Blocks**: Task 15
  - **Blocked By**: Tasks 3, 4, 6, 7

  **References**:
  - Mock data: `src/data/examLocations.ts` - map/photo/address fields.
  - Metis default: map links/embeds only, no API key.

  **Acceptance Criteria**:
  - [ ] Detail step renders selected school name, photo, full address, date, quota, and description.
  - [ ] Map preview renders either iframe embed or external map link from `mapUrl`.
  - [ ] Local `public/school-placeholder.svg` exists for dummy/prototype school photos.
  - [ ] Image has meaningful `alt` text based on school name.
  - [ ] Missing selection shows a safe fallback message instead of crashing.

  **QA Scenarios**:
  ```text
  Scenario: Detail page shows all selected school information
    Tool: Browser/Playwright later
    Preconditions: A location card has been selected
    Steps:
      1. Advance to detail step.
      2. Assert selected school name, full address, exam date, quota, and map section are visible.
      3. Assert image has non-empty alt text.
    Expected Result: Detail view is complete and accessible.
    Evidence: .sisyphus/evidence/task-12-location-detail.png

  Scenario: No map API key is required
    Tool: Bash
    Preconditions: Map component created
    Steps:
      1. Run `grep -R "API_KEY\|VITE_GOOGLE\|maps.googleapis.com/maps/api" src/components/location src/components/steps || true`
      2. Assert no API-key based code appears.
    Expected Result: Map strategy stays prototype-safe.
    Evidence: .sisyphus/evidence/task-12-no-map-api.txt
  ```

- [ ] 13. Review and final confirmation step

  **What to do**:
  - Build the review step that summarizes student identity, selected region, selected school, date, quota, and address.
  - Add final acknowledgement checkbox and confirm button.
  - Build success/finalized state component.

  **Files**:
  - Create: `src/components/steps/ReviewConfirmationStep.tsx`
  - Create: `src/components/steps/SuccessStep.tsx`

  **Must NOT do**:
  - Do not send confirmation to backend.
  - Do not say the selection is officially registered; call it simulation/prototype confirmation.

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Summary and final local-state confirmation.
  - **Skills**: [`accessibility`]
    - `accessibility`: Checkbox labels and disabled confirm state.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2
  - **Blocks**: Tasks 15, 16
  - **Blocked By**: Tasks 3, 5, 7

  **References**:
  - Draft confirmation decision: `.sisyphus/drafts/ut-bandung-lokasi-ujian.md:8` - Review Lalu Final.
  - Copy constants: `src/content/copy.ts` - formal confirmation wording and disclaimer.

  **Acceptance Criteria**:
  - [ ] Review displays identity, region, school, date, quota, and address.
  - [ ] Confirm button remains disabled until acknowledgement checkbox is checked.
  - [ ] Success step states this is a simulation/prototype confirmation.
  - [ ] No network request is made on confirmation.

  **QA Scenarios**:
  ```text
  Scenario: Review step requires acknowledgement
    Tool: Browser/Playwright later
    Preconditions: Wizard reaches review step with selected location
    Steps:
      1. Observe final confirm button before checking acknowledgement.
      2. Assert button is disabled.
      3. Check acknowledgement checkbox.
      4. Assert final confirm button becomes enabled.
    Expected Result: Two-stage confirmation prevents accidental final action.
    Evidence: .sisyphus/evidence/task-13-acknowledgement.png

  Scenario: Confirmation stays local
    Tool: Bash
    Preconditions: Review component created
    Steps:
      1. Run `grep -R "fetch\|axios\|XMLHttpRequest" src/components/steps/ReviewConfirmationStep.tsx src/components/steps/SuccessStep.tsx || true`
      2. Assert no network request code appears.
    Expected Result: Final confirmation is prototype-local only.
    Evidence: .sisyphus/evidence/task-13-no-network.txt
  ```

- [ ] 14. Responsive summary/sidebar components

  **What to do**:
  - Build compact summary components showing current selections during the wizard.
  - Provide desktop sidebar and mobile collapsible/compact summary behavior.

  **Files**:
  - Create: `src/components/layout/SelectionSummary.tsx`
  - Create: `src/components/layout/MobileStepHeader.tsx`

  **Must NOT do**:
  - Do not duplicate final review logic; summary is informational.
  - Do not block progress from summary component.

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Responsive information hierarchy.
  - **Skills**: [`frontend-design`, `accessibility`]
    - `frontend-design`: Desktop/mobile layout polish.
    - `accessibility`: Responsive content remains readable and navigable.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2
  - **Blocks**: Tasks 15, 18
  - **Blocked By**: Tasks 3, 4, 7

  **References**:
  - Wizard state: `src/state/wizardReducer.ts` - current selections.
  - UI shell: `src/components/layout/WizardFrame.tsx` - layout slots.

  **Acceptance Criteria**:
  - [ ] Summary displays selected region and selected school when available.
  - [ ] Summary displays placeholder text before selections are made.
  - [ ] Mobile header shows current step name and progress.
  - [ ] Summary component never mutates wizard state directly.

  **QA Scenarios**:
  ```text
  Scenario: Summary handles empty and selected states
    Tool: Browser/Playwright later
    Preconditions: Running preview with wizard integration
    Steps:
      1. Open initial wizard and assert summary says no region/location selected yet.
      2. Select a region and school.
      3. Assert summary updates with chosen region and school name.
    Expected Result: Summary reflects local state without controlling it.
    Evidence: .sisyphus/evidence/task-14-summary-states.png

  Scenario: Summary has no direct mutation action
    Tool: Bash
    Preconditions: Components created
    Steps:
      1. Run `grep -R "dispatch\|SET_REGION\|SET_LOCATION\|CONFIRM" src/components/layout/SelectionSummary.tsx src/components/layout/MobileStepHeader.tsx || true`
      2. Assert no wizard mutation actions appear.
    Expected Result: Summary remains display-only.
    Evidence: .sisyphus/evidence/task-14-display-only.txt
  ```

- [ ] 15. Wire complete wizard flow in App

  **What to do**:
  - Create/modify `src/App.tsx` to connect reducer, mock data, layout, steps, navigation buttons, and final state.
  - Enforce linear flow: identity → region → location → detail → review → success.
  - Ensure selections are passed to child components via props.

  **Files**:
  - Create/Modify: `src/App.tsx`

  **Must NOT do**:
  - Do not introduce React Router.
  - Do not bypass validation to advance steps.
  - Do not add persistence unless explicitly approved later.

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: Integration task connects all prior modules and validates flow consistency.
  - **Skills**: [`vercel-react-best-practices`]
    - `vercel-react-best-practices`: Keep state and rendering efficient and understandable.

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 3A
  - **Blocks**: Tasks 16, 18, 19
  - **Blocked By**: Tasks 8-14

  **References**:
  - All Wave 2 components: `src/components/steps/*`, `src/components/layout/*` - integration targets.
  - Reducer: `src/state/wizardReducer.ts` - state transitions.
  - Mock data: `src/data/examLocations.ts` - regions and locations.

  **Acceptance Criteria**:
  - [ ] `App.tsx` renders all wizard steps in approved order.
  - [ ] Next/back navigation works through local state.
  - [ ] Region selection filters location choices.
  - [ ] Location selection populates detail and review screens.
  - [ ] Final confirm displays success screen.
  - [ ] `npm run build` passes after integration.

  **QA Scenarios**:
  ```text
  Scenario: Happy path completes end-to-end
    Tool: Browser/Playwright later
    Preconditions: `npm run preview -- --host 127.0.0.1` is running
    Steps:
      1. Fill NIM `123456789`, name `Siti Aminah`, program study `Manajemen`, email `siti@example.com`, phone `081234567890`.
      2. Continue to region step and search `Bandung`.
      3. Select `Kota Bandung` or another visible Bandung option.
      4. Select first visible school card.
      5. Continue through detail, review, acknowledgement checkbox, final confirm.
      6. Assert success screen contains `Simulasi` and selected school name.
    Expected Result: Wizard completes without reload or backend request.
    Evidence: .sisyphus/evidence/task-15-happy-path.png

  Scenario: Build passes after integration
    Tool: Bash
    Preconditions: Dependencies installed
    Steps:
      1. Run `npm run build`
      2. Assert command exits with status 0.
    Expected Result: Integrated app compiles successfully.
    Evidence: .sisyphus/evidence/task-15-build.txt
  ```

- [ ] 16. Validation feedback and disabled states

  **What to do**:
  - Apply validation helpers to navigation and form feedback.
  - Ensure incomplete identity, missing region, missing location, and unchecked final acknowledgement block forward progress.

  **Files**:
  - Modify: `src/App.tsx`
  - Modify: `src/components/steps/StudentIdentityStep.tsx`
  - Modify: `src/components/steps/ReviewConfirmationStep.tsx`

  **Must NOT do**:
  - Do not add alert-only validation; errors must be visible inline or on buttons.
  - Do not block going backward.

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Focused validation wiring.
  - **Skills**: [`accessibility`]
    - `accessibility`: Error messages must be perceivable and associated.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3B
  - **Blocks**: F1-F4
  - **Blocked By**: Tasks 5, 9, 10, 13, 15

  **References**:
  - Validation helpers: `src/state/validation.ts` - source of rules.
  - UI primitive: `src/components/ui/FormField.tsx` - error display pattern.

  **Acceptance Criteria**:
  - [ ] Empty identity fields prevent advancing and show field-level errors.
  - [ ] Missing region prevents advancing from region step.
  - [ ] Missing location prevents advancing from location step.
  - [ ] Final confirm disabled until acknowledgement checked.
  - [ ] Back navigation remains available where relevant.

  **QA Scenarios**:
  ```text
  Scenario: Missing identity blocks progress
    Tool: Browser/Playwright later
    Preconditions: Running preview at initial step
    Steps:
      1. Click Next without filling identity fields.
      2. Assert the wizard remains on identity step.
      3. Assert visible error text references required identity fields.
    Expected Result: Invalid identity cannot proceed.
    Evidence: .sisyphus/evidence/task-16-identity-validation.png

  Scenario: Missing location blocks progress
    Tool: Browser/Playwright later
    Preconditions: Region has been selected and location step is visible
    Steps:
      1. Click Next without selecting a school card.
      2. Assert location step remains visible.
      3. Assert error text asks user to select an exam location.
    Expected Result: Location selection is required before detail/review.
    Evidence: .sisyphus/evidence/task-16-location-validation.png
  ```

- [ ] 17. Official-campus visual polish

  **What to do**:
  - Apply final visual polish using UT-inspired blue/yellow/white palette.
  - Add refined shadows, borders, spacing, and formal campus-service tone.
  - Avoid generic AI visuals; make the UI feel like a serious university service prototype.

  **Files**:
  - Modify: `src/styles/theme.css`
  - Modify: `src/index.css`
  - Modify: `src/components/layout/AppShell.tsx`

  **Must NOT do**:
  - Do not use purple gradient/generic SaaS aesthetic.
  - Do not reduce contrast with yellow-on-white text.
  - Do not use official UT logo files unless provided by user.

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Visual direction and design-system polish.
  - **Skills**: [`frontend-design`, `ui-ux-designer`, `accessibility`]
    - `frontend-design`: Distinctive polished frontend.
    - `ui-ux-designer`: Formal service hierarchy.
    - `accessibility`: Color contrast and focus visibility.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3A
  - **Blocks**: Task 18
  - **Blocked By**: Tasks 2, 6, 7, 8

  **References**:
  - Brand tokens: `src/content/brand.ts` - color values.
  - UT logo color explanation: `https://github.com/UnivTerbuka/UnivTerbuka/blob/main/logo-ut.md` - dark blue/yellow meaning.

  **Acceptance Criteria**:
  - [ ] Theme CSS defines UT blue, UT yellow, white, neutral backgrounds, borders, and focus ring tokens.
  - [ ] Primary actions use blue with accessible text contrast.
  - [ ] Yellow is used as accent/highlight, not as low-contrast body text.
  - [ ] Header and surfaces communicate official campus/service tone.

  **QA Scenarios**:
  ```text
  Scenario: UT-inspired tokens are used in theme
    Tool: Bash
    Preconditions: Theme file created
    Steps:
      1. Run `grep -n "#034694\|#FFF200\|focus\|border" src/styles/theme.css src/index.css`
      2. Assert palette and focus/border tokens are present.
    Expected Result: Visual system is centralized and UT-inspired.
    Evidence: .sisyphus/evidence/task-17-theme-tokens.txt

  Scenario: No generic purple-gradient aesthetic
    Tool: Bash
    Preconditions: Styling complete
    Steps:
      1. Run `grep -R "purple\|violet\|from-purple\|to-purple" src || true`
      2. Assert no purple gradient classes/tokens are used for main theme.
    Expected Result: Visual direction follows requested UT palette.
    Evidence: .sisyphus/evidence/task-17-no-purple.txt
  ```

- [ ] 18. Responsive and accessibility pass

  **What to do**:
  - Polish desktop and mobile layouts.
  - Ensure keyboard focus, labels, alt text, and responsive step navigation are usable.
  - Verify mobile width around `390x844` and desktop width around `1440x900`.

  **Files**:
  - Modify: `src/components/layout/WizardFrame.tsx`
  - Modify: `src/components/layout/SelectionSummary.tsx`
  - Modify: `src/styles/theme.css`

  **Must NOT do**:
  - Do not hide required information on mobile.
  - Do not make clickable cards keyboard-inaccessible.

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Cross-breakpoint UI quality and accessibility.
  - **Skills**: [`accessibility`, `frontend-design`]
    - `accessibility`: Keyboard and semantic review.
    - `frontend-design`: Responsive composition polish.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3B
  - **Blocks**: F1-F4
  - **Blocked By**: Tasks 8, 14, 15, 17

  **References**:
  - UI primitives: `src/components/ui/*` - labels/focus patterns.
  - Layout components: `src/components/layout/*` - responsive structure.

  **Acceptance Criteria**:
  - [ ] At `390x844`, wizard content fits without horizontal scrolling.
  - [ ] At `1440x900`, layout uses space effectively with summary/sidebar.
  - [ ] All inputs have visible labels.
  - [ ] Interactive controls have visible focus states.
  - [ ] Images have alt text.

  **QA Scenarios**:
  ```text
  Scenario: Mobile layout has no horizontal overflow
    Tool: Browser/Playwright later
    Preconditions: Running preview
    Steps:
      1. Set viewport to `390x844`.
      2. Navigate through identity, region, location, detail, and review steps.
      3. Assert no horizontal scrollbar appears and primary controls are visible.
    Expected Result: Mobile flow is usable end-to-end.
    Evidence: .sisyphus/evidence/task-18-mobile.png

  Scenario: Keyboard navigation reaches primary controls
    Tool: Browser/Playwright later
    Preconditions: Running preview
    Steps:
      1. Press Tab from the page start through identity fields and Next button.
      2. Assert visible focus indicator appears on each interactive element.
      3. Press Shift+Tab and assert focus moves backward predictably.
    Expected Result: Keyboard users can navigate the wizard controls.
    Evidence: .sisyphus/evidence/task-18-keyboard.txt
  ```

- [ ] 19. README and run instructions

  **What to do**:
  - Document how to install, run dev server, build, preview, and replace dummy data.
  - Document scope guardrails and testing preference: no automated tests in initial development; user may request testing/debug later.

  **Files**:
  - Create: `README.md`
  - Create: `.sisyphus/evidence/README.md`

  **Must NOT do**:
  - Do not claim the prototype is production-ready.
  - Do not document nonexistent automated tests.

  **Recommended Agent Profile**:
  - **Category**: `writing`
    - Reason: Clear run and handoff documentation.
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3B
  - **Blocks**: F1-F4
  - **Blocked By**: Tasks 1, 15

  **References**:
  - Success criteria in this plan - commands and scope guardrails.
  - Mock data file: `src/data/examLocations.ts` - replacement instructions.

  **Acceptance Criteria**:
  - [ ] README includes `npm install`, `npm run dev`, `npm run build`, and `npm run preview -- --host 127.0.0.1`.
  - [ ] README explains where dummy data lives and how to replace it.
  - [ ] README states prototype limitations: no backend/auth/admin/live UT data.
  - [ ] Evidence README explains naming pattern `.sisyphus/evidence/task-{N}-{scenario}.ext`.

  **QA Scenarios**:
  ```text
  Scenario: README contains run commands
    Tool: Bash
    Preconditions: README created
    Steps:
      1. Run `grep -n "npm install\|npm run dev\|npm run build\|npm run preview" README.md`
      2. Assert all commands are documented.
    Expected Result: Future operator can run the prototype.
    Evidence: .sisyphus/evidence/task-19-run-docs.txt

  Scenario: README does not advertise automated tests
    Tool: Bash
    Preconditions: README created
    Steps:
      1. Run `grep -n "npm test\|vitest\|playwright test\|jest" README.md || true`
      2. Assert no automated test command is advertised for initial development.
    Expected Result: Documentation matches user preference.
    Evidence: .sisyphus/evidence/task-19-no-test-docs.txt
  ```

---

## Final Verification Wave (MANDATORY — after ALL implementation tasks)

> 4 review agents run in PARALLEL. ALL must APPROVE. Present consolidated results to user and get explicit "okay" before completing.

- [ ] F1. **Plan Compliance Audit** — `oracle`
  Read this plan end-to-end. For each Must Have, verify implementation exists in source files or running preview. For each Must NOT Have, search codebase for forbidden patterns/configs. Check evidence files exist in `.sisyphus/evidence/`. Output: `Must Have [N/N] | Must NOT Have [N/N] | Tasks [N/N] | VERDICT: APPROVE/REJECT`.

  **Acceptance Criteria**:
  - [ ] All Must Have items are verified with file path, command output, or browser evidence.
  - [ ] All Must NOT Have guardrails are searched and absent.
  - [ ] Evidence files for implemented task scenarios exist or missing evidence is reported as rejection.
  - [ ] Output ends with `VERDICT: APPROVE` only if all checks pass.

- [ ] F2. **Code Quality Review** — `unspecified-high`
  Run `npm install` if needed, `npm run build`, and inspect changed files for unused imports, `any`, dead code, console debugging, generic naming, over-abstraction, and AI-slop comments. Output: `Build [PASS/FAIL] | Files [N clean/N issues] | VERDICT`.

  **Acceptance Criteria**:
  - [ ] `npm run build` exits with status 0.
  - [ ] Changed files have no unused imports, dead code, or production `console.log` leftovers.
  - [ ] No automated test framework/config/test files were introduced.
  - [ ] Output ends with approval only if all issues are clean or fixed.

- [ ] F3. **Real Manual QA by Agent/Browser** — `unspecified-high` (+ `playwright` skill if available)
  Start preview server, open browser, execute every QA scenario from every task, test desktop `1440x900` and mobile `390x844`, capture screenshots/notes to `.sisyphus/evidence/final-qa/`. Output: `Scenarios [N/N pass] | Responsive [PASS/FAIL] | Edge Cases [N tested] | VERDICT`.

  **Acceptance Criteria**:
  - [ ] Happy path completes from identity entry to success screen.
  - [ ] Negative cases block incomplete identity, missing region, missing location, and unchecked acknowledgement.
  - [ ] Desktop `1440x900` and mobile `390x844` screenshots are captured.
  - [ ] Output rejects if any scenario fails or evidence is missing.

- [ ] F4. **Scope Fidelity Check** — `deep`
  Compare actual files/diff to this plan. Verify no backend/API/auth/admin/test-infra/live-data/notification scope creep. Output: `Tasks [N/N compliant] | Scope Creep [CLEAN/N issues] | VERDICT`.

  **Acceptance Criteria**:
  - [ ] Every implementation task maps to changed files and no planned task is missing.
  - [ ] No backend/API/auth/admin/live-data/notification/automated-test scope creep exists.
  - [ ] Any unplanned file change is explained or rejected.
  - [ ] Output ends with approval only if scope is clean.

---

## Commit Strategy

The current workspace is not a git repo. If execution happens inside a git repo, commit by wave:
- **Wave 1**: `feat(scaffold): set up prototype foundation`
- **Wave 2**: `feat(wizard): add exam location selection screens`
- **Wave 3**: `feat(prototype): integrate and polish UT exam location flow`
- **Final fixes**: `fix(prototype): address final review findings`

If no git repo exists, skip commits and report changed files after each wave.

---

## Success Criteria

### Verification Commands
```bash
npm install
npm run build
npm run preview -- --host 127.0.0.1
```

### Final Checklist
- [ ] All Must Have items are present
- [ ] All Must NOT Have items are absent
- [ ] Build passes
- [ ] Preview opens successfully
- [ ] Wizard completes happy path
- [ ] Validation blocks incomplete identity/location choices
- [ ] Desktop and mobile layouts are usable
- [ ] No automated test framework/config/test files were added
