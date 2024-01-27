# Copper Console (Node implementation)

A program to interpret data from Network Tables and display it in a nice view.

## Requirements

- NodeJS

## Installation

Use [one of our pre-built releases](https://github.com/team401/Copper-Console/releases).

### Building from source

Alternatively, you can build from source using electron forge:

- Cloning the repository
- Opening the cloned repository
- Running `npm run make`

As seen below:

```bash
git clone https://github.com/team401/Copper-Console
cd Copper-Console
npm run make
```

An executable will be generated in `out/Copper Console-{your platform}/`, and a
distributable zip acrhive will be created in `out/make/zip/{your platform}/Copper Console-{your platform}.zip`

You can also just run a development build of the project with

```bash
npm run start
```

## Project Structure

Typescript source code is located in `src/`.
This typescript is then compiled into javascript which is placed under `app/`
when any npm scripts are run with `npx tsc`.
The app is then launched using electron-forge from the `app` directory.
Because `app` is auto-generated, no javascript files within `app` should be
edited manually added to version control. However, `app/field.png` and
`app/index.html` should be added because they are not auto-generated and are
used for the rendering process in the electron app.

Data is passed between the main process (`src/main.ts`) and the renderer process
(`src/renderer.ts`) through electron using `src/preload.ts`. An interface defining the
API exposed to the renderer is defined in `src/interface.d.ts`.

There is also a simple program to send dummy network tables data located in
`ntspoofer/`. See `ntspoofer/README.md` for details on how to use it.

## Credits

Field image taken from user [MikLast on chiefdelphi.com](https://www.chiefdelphi.com/t/2024-crescendo-top-down-field-renders/447764)

Network tables code is taken from the [AdvantageScope project](https://github.com/Mechanical-Advantage/AdvantageScope) on GitHub, which is graciously provided
under the MIT license. It can be found in this repository under `src/nt4/`,
along with its [license](https://github.com/team401/Copper-Console/blob/main/src/nt4/LICENSE).
