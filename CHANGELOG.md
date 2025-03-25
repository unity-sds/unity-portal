# Changelog

All notable changes to this project will be documented in this file. 

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.9.0] (Unreleased)
- Changed project and venue information location. This information is now available in the navbar instead of on the homepage of the application [#59](https://github.com/unity-sds/unity-portal/issues/59)
- Changed Docker image build workflow is triggered when a tag is created and no longer triggered when code is merged to `main` or `features/*` branches [#51](https://github.com/unity-sds/unity-ui/issues/51)
- Changed Docker image build workflow so that it uses the image name `unity-portal-application` instead of `unity-ui-application`
- Rebranded the application's project references so that they state "MDPS" instead of "Unity" [#55](https://github.com/unity-sds/unity-portal/issues/55)
- Rebranded the application and repo so that the "ui" is now known as the "portal" [#61](https://github.com/unity-sds/unity-portal/issues/61), [#64](https://github.com/unity-sds/unity-portal/issues/64)
- Removed hard-coded links for all project's venues [#58](https://github.com/unity-sds/unity-portal/issues/58)
- Fixed issue with basepath not set correctly after proxy label was updated from `ui` to `portal` [#68](https://github.com/unity-sds/unity-portal/issues/68)

## [0.8.0] 2025-01-14
- Added support to report on when health API endpoint is not available in navbar and on health dashboard
- Fixed clickable area of navbar menu items
- Added support to hard code links for projects/venues
- Added health check URL to health dashboard [#40](https://github.com/unity-sds/unity-portal/issues/40)
- Fixed health dashboard column resizer element z-index
- Added cards to homepage [#38](https://github.com/unity-sds/unity-portal/issues/38)
- Updated router configuration to improve URL readability.  URLs no longer contain router information using a hash (#39). [#39](https://github.com/unity-sds/unity-portal/issues/39
- Updated home page route to be located at `/home` and the route `/` redirects to it. [#39](https://github.com/unity-sds/unity-portal/issues/39)
- Updated application basename configuration to use the proxy name `ui` instead of `dashboard` [#45](https://github.com/unity-sds/unity-portal/issues/45)
- Added hard-coded links for STAC Browser for the unity/dev and unity/test venues [#47](https://github.com/unity-sds/unity-portal/issues/47)

## [0.7.0] 2024-09-27
- Updated node version lts/iron
- Added ability to fetch health information from Health API Endpoint for Health Dashboard
- Removed cognito authentication
- Added authorization via httpd proxy
- Removed unneeded navigation links
- Removed job monitoring and new job features
- Added progress bar to be displayed when health information is being fetched
- Various code cleanup and optimization activities

## [0.6.0] (unreleased)
- Added Health Dashboard using static JSON file containing example health information. [#29](https://github.com/unity-sds/unity-portal/issues/29)
- Updated navbar menu so that it is (partially) dynamic. External UI information is loaded via the Health JSON file. [#20](https://github.com/unity-sds/unity-portal/issues/20)

## [0.5.0] 2024-04-15
- Updated Navbar CSS styling to match Figma designs [#5](https://github.com/unity-sds/unity-portal/issues/5)
- Added CI/CD workflow to build application as a docker image. [#21](https://github.com/unity-sds/unity-portal/issues/21)
- Updated application build configuration. Stateful information has been removed from project configuration. Instead we now allow environment variables to be supplied to the container at startup which in turn get injected into the Unity UI Codebase. This is in support of moving to dynamic configuration of the application via Unity Marketplace. Related to [#3](https://github.com/unity-sds/unity-sds-portal/issues/3)

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
