# PawPlan — React Web Administration

PawPlan is a volunteer-coordination project for animal shelters. This repository contains the **React and TypeScript web application**, focused on shelter administration.

## Implemented administration workflows

- Change user roles
- Add and edit dog profiles
- Manage appointments

The application uses Firebase/Firestore for shared platform data. The repository contains administration pages, reusable forms, repository-based data access and validation schemas.

## Status

This is a training and personal project, not a claimed production deployment. The implemented administration workflows are distinct from the volunteer-facing features in the mobile projects.

## Technologies and structure

- React and TypeScript
- Firebase/Firestore
- Vite
- Reusable UI components and forms
- Repository-based data access
- Validation schemas

Accessibility work includes semantic structure, keyboard navigation and screen-reader support. This is ongoing work, not a claim of complete accessibility compliance.

## Related implementations

Each implementation has its own scope:

| Project | Focus |
|---|---|
| [React web](https://github.com/kniederelz1988/pawplan-react) | Shelter administration: users, roles, dogs and appointments |
| [React Native](https://github.com/kniederelz1988/pawplan-react-native) | Focused cross-platform migration prototype for browsing dogs and appointment booking |
| [Native Android](https://github.com/kniederelz1988/pawplan-android-native) | Kotlin volunteer workflows, route tracking, incident reporting and notifications |
| [iOS](https://github.com/kniederelz1988/pawplan-ios) | Initial Swift/SwiftUI prototype |

The [React Native web demo](https://pawplan-reactnative.vercel.app/dogs/overview) demonstrates the Expo web build of that prototype. It is **not a demo of this React administration application**.

## Motivation

PawPlan originated from experience volunteering at an animal shelter. It explores how software can reduce the friction of coordinating volunteers, dogs and walking appointments while providing practical experience across web and mobile development.
