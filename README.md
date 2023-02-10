# Cinema Ticket Reservation System - Front End

- Lisa Reß-Park: 3798263
- Nora Klemp: 7979965
- Luca Chmielarski: 3047210
- Aidan Zimmer: 4803747
- Marcel Bulling: 2953627
- Johanna Deike: 4940972

Die Dokumentation ist im Backend-Repository unter Dokumentation_Projekt.pdf zu finden.
 
 ## Branch Rules:
 The main development will be done on the dev branch. Version Releases will be merged on `main` after approval with all team members.
 All merges on `dev` need to be merged within an approved Pull-Request. This means that at least one Frontend team member needs to approve the coding of the feature branch.
 
 ### Naming of the Branches
 
 All feature branches need to be named as follows:
 feat/[TICKET_ID]/[TICKET_NAME] eg. feat/TGB-39/createLogin-> the Pull Request follows a similiar naming convention <br>
 e.g. feat: [TICKET_ID] - [TICKET_NAME]
 
 All bug branches need to be named as follows:
 fix/[TICKET_ID]/[TICKET_NAME]  fix/TGB-64/fixBugXY-> the Pull Request follows a similiar naming convention <br>
 e.g. fix: [TICKET_ID] - [TICKET_NAME]

## Coding Guidelines
- Simple standalone components will be developped as React Function Components because of simplicity and performance reasons
- Complex Components and Views will be developped as ES6 Classes because of hooks and lifecycle reasons
