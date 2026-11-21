# Release Instructions

## 1. Create the GitHub Release

1. Go to the [Release GitHub Action](https://github.com/garis-kode/adaptivecard-js/actions/workflows/release.yml).
2. Click **Run workflow**.
3. Ensure the **branch** is set to `main` (or your target release branch).
4. Enter the **version** you wish to release (e.g., `1.0.0` or `v1.0.0`).
5. Click **Run workflow**.

### Automated GitHub Pipeline Steps

Once triggered, the automated workflow:

1. **Validates & Synchronizes Version**: Ensures the input adheres to semantic versioning (`X.Y.Z`) and updates `package.json` if its `version` differs from the input.
2. **Runs Verification Gates**: Executes `bun run check` (`fmt:check`, `typecheck`, `test`, `build`) and `bun run test:pack` (tarball allowlist verification and isolated Node ESM/CJS, Bun, and TypeScript `NodeNext` consumer checks).
3. **Generates Release Notes & Updates Changelog**: Compiles release notes from pull requests and commits merged since the previous release, appends them with the release date into `CHANGELOG.md`, and commits the updated `package.json` and `CHANGELOG.md` in a single `chore(release): v<version>` commit.
4. **Creates GitHub Release**: Publishes the GitHub release and creates the git tag `v<version>` pointing at the release commit.
5. **Publishes to npm (OIDC)**: Checks out that exact release commit, verifies the target version is not yet published on npm, and publishes the package using npm Trusted Publishing (OIDC) without stored npm tokens.

---

## 2. One-Time npm Trusted Publisher Setup

Before running the workflow for the first time, configure **Trusted Publisher** for `adaptivecard-js` on npmjs.com:

1. Open the package **Settings** on [npmjs.com](https://www.npmjs.com/package/adaptivecard-js/access) and locate **Trusted Publisher**.
2. Select **GitHub Actions** and enter:
   - **Organization or user**: `garis-kode`
   - **Repository**: `adaptivecard-js`
   - **Workflow filename**: `release.yml`
   - **Environment name**: _(leave blank)_
3. Save the configuration. No `NPM_TOKEN` secret is required in GitHub Actions.
