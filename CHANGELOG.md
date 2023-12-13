# Changelog

All notable changes to this project will be documented in this file. 

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.4.0] - 2023-12-13
- Updated /job/new endpoint so it lists the applications for which jobs may be executed.
- Moved chirp rebinning job form to /jobs/new/chirp
- Added job submission forms for L1A and L1B PGEs
- Added process utility to help facilitate changes listed above.

## [0.3.1] - 2023-12-12
- Fixed link associated with logo on mobile platforms

## [0.3.0] - 2023-11-13

- Updated environment configurations to account for SIPS-TEST deployments
- Updated scrolling behavior for all UIs so they can be scrolled independently from the navbar. And in the case of the Job Monitoring UI, the detail view scrolls independently from the main view.

## [0.2.0] - 2023-10-02

- Updated Job Monitoring Dashboard, data is fetched from WPS-T Endpoint
- Added placeholder "Submit Time" column to Job Monitoring Dashboard
- Added "Create New Job" form that submits a request to execute a job, currently using hard-coded inputs for the CHIRP Rebinning process.
- Added display of input parameters to Job Detail view.
- Updated routing to allow deep linking to a specific job.
- Added environment configurations to allow for local development and deployments to our various MCP environments.
- Updated "base" parameter to account for deployments that utilize our CloudFront/API GW configurations on AWS.
- Added ability to modify document meta information, like title and description as user navigates to different views.
- Updated display of app version in navbar so that version information from package.json is used.
- Fixed styling of navlinks in mobile platforms.
- Fixed broken Unity logo in mobile view.
- Miscellaneous performance, css styling enhancements, and resolution of typescript and linting errors.

## [0.1.0] - 2023-06-28

### Added 

- Creation of React app project using Vite. Routing was also integrated
- Integration of Authentication via Cognito
- Integration of React Stellar Navbar component [#73](https://github.com/unity-sds/unity-project-management/issues/73)
- Developed Jobs Monitoring Dashboard — currently loads static data - [#1](https://github.com/unity-sds/unity-jobs-ui/issues/1), [#4],(https://github.com/unity-sds/unity-jobs-ui/issues/4)[#12], (https://github.com/unity-sds/unity-jobs-ui/issues/12)
- Jobs Detail view [#72](https://github.com/unity-sds/unity-jobs-ui/issues/18)
- Integration of generic web view for loading third-party user interfaces
