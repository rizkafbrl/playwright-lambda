import { chromium, Browser } from 'playwright';

export function getLambdaTestCapabilities(testName: string) {
  return {
    'browserName': 'Chrome',
    'browserVersion': 'latest',
    'LT:Options': {
      'platform': 'Windows 10',
      'build': 'Playwright Sample Build',
      'name': testName,
      'user': process.env.LT_USERNAME,
      'accessKey': process.env.LT_ACCESS_KEY,
      'network': true,
      'video': true,
      'console': true
    }
  };
}

export async function getBrowser(testName: string, runOnLambda: boolean): Promise<Browser> {
  if (runOnLambda) {
    const capabilities = getLambdaTestCapabilities(testName);
    const wsEndpoint = `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`;
    console.log(`Running tests on LambdaTest as user: ${process.env.LT_USERNAME}`);
    console.log(`WebSocket Endpoint: ${wsEndpoint}`);
    console.log(`Command to run: npx playwright test --lambda`);
    return await chromium.connect({ wsEndpoint });
  } else if (process.env.GITPOD_WORKSPACE_ID) {
    console.log('Running tests on Gitpod');
    console.log(`Command to run: npx playwright test`);
    return await chromium.launch();
  } else {
    console.log('Running tests locally');
    console.log(`Command to run: npx playwright test`);
    return await chromium.launch();
  }
}