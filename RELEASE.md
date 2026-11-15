# Release Instructions

To create a new release for `garis-kode/adaptivecard-js`:

1. Go to the [Release GitHub Action](https://github.com/garis-kode/adaptivecard-js/actions/workflows/release.yml).
2. Click **Run workflow**.
3. Ensure the **branch** is set to `main` (or your target release branch).
4. Enter the **version** you wish to release (e.g., `1.0.0` or `v1.0.0`).
5. Click **Run workflow**.

## Automated Pipeline Steps

Once triggered, the automated workflow:
1. **Validates Version**: Ensures the input adheres to semantic versioning (`X.Y.Z`).
2. **Generates Release Notes**: Compiles notes from pull requests and commits merged since the previous release.
3. **Creates GitHub Release**: Publishes the GitHub release and creates the git tag `v<version>`.
4. **Updates Changelog**: Runs the changelog updater job to append the new release notes and timestamp into `CHANGELOG.md` and commits it back to the repository.
