# SolarSim

## Overview

SolarSim allows users to simulate how long it will take for a solar panel to heat the fluid within a storage tank from a starting temperature to a final temperature.

### Assumptions

- Solar flux is treated as a constant rather than dynamically changing over time
- The fluid contained within the storage tank is water
- The storage tank is perfectly insulated
- The pipe transmitting the heat from the solar panel to the storage tank is perfectly insulated and its volume is ignored

---

## Instructions

- After cloning/downloading the repository, run the following command from the root directory to install all required dependencies:

  `npm install && npm run install-all-deps`

- To start the dev server run the following command from the root directory:

  `npm run dev`

---

## Summary

Prior to digging into the code, I spent a few hours deciding how I wanted to tackle the problem, the tech stack I would use, and how I wanted it to function. I opted to use the following technologies to build out the front end application:
<br>

- React (with TypeScript) to build strongly typed reusable components
- Material-UI to streamline styling
- Chart.js for data plots
- Three.js for 3D modeling

I then proceeded to draw out what I wanted the basic application to look like and map out core functionality the product needed to have. Subsequently, I built out the file structure to keep the application intuitive and easy to maintain.

The application was made with a mobile first design so it can be used on a myriad of devices, this goal lead many of the design decisions. While personally I believe the app is better suited for desktop use, it prooved to be a fun design challenge to enable mobile compatibility as well.

I'm aware that PassiveLogic utilizes Three.js on some of their software. I have not had the chance of using Three.js before, and wanted to implement it in some way in this project. The [3D model portion](./src/components/Canvas.tsx) of the app is fairly limited but allows users to dynamically change shapes that represent the solar panel and storage tank based on user input as well as pan in and out to gain a closer look if desired.

From experience with using simulation software in the past, I've always felt the UI to be cluttered and non-intuitive. That being the case I decided to use color queues and collapsible forms to declutter the UI and provide quick intuitive feedback to the user.

### Form Validation

To verify inputs were acceptable values when specifying [Solar Panel Settings](./src/components/SolarPanelSettings.tsx), [Storage Tank Settings](./src/components/StorageTankSettings.tsx), and [Results Settings](./src/components/ResultsSettings.tsx), several [form validator helper functions](./src/utils/formControl.ts) were created.

### Heat Transfer

To handle the heat transfer calculations, I created several [helper function](./src/utils/heatTransferCalcs.ts) to handle calculating solar panel energy production, storage tank heating energy requirements, required time, etc.

Energy produced by the solar panel was calculated using the equation
`Q = I*A*ε` where _I_ is the solar flux, _A_ is the surface area, and _ε_ is the solar panel's efficiency.

The required energy for the water in the storage tank to reach its desired temperature was calulated using the equation `Q = m*c*ΔT` where _m_ is the mass of the water, _c_ is the specific heat of the water, and _ΔT_ is the difference between the final temperature and initial temperature.

---

## Future Improvements

- Build out a robust test suite for unit testing and integration testing.
- Allow user to specify different fluids within the storage tank as well as allow more output options (i.e. different plots, ability to display different units, etc.)
- Create an Instructions page that explains how the application works (I would have used React Router to accomplish this and have a button on the NavBar to direct users to the page)
- Allow user to export a CSV file of simulation results if desired.
- Account for changes in solar flux do to elevation and time of day (weather as well using a weather API).
- Account for energy losses do to storage tank not being fully insulated, the app collects the thermal conductivity of the storage tank, but because of time constraints I was unable to fully get this integrated into the heat transfer calculations helper function. This could also be achieved by allowing users to select from a list of different storage tank materials that have varying thermal conductivity values. Additional experimental data would also be ideal to have an accurate heat transfer coefficient to calculate heat loss.
- Build out the 3D functionality to have animations while simulation is running and improve overall look to be more polished.
- Improve a11y
- Build out backend functionality to allow users to store previous results.
- Deploy application on AWS EB or through just using AWS S3 and AWS Cloudfront (since it is only a frontend application)
