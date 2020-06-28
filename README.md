For unit testing I'm using Jest library with React Test Renderer
To start unit tests, run `npm run test`

For E2E testing I'm using Detox because it’s tailored for React Native apps
To start E2E tests, run following commands
`detox build --configuration android.emu.debug`
`npm run start`
`detox test --configuration android.emu.debug`
