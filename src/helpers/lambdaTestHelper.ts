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

export async function getBrowser(testName: string): Promise<Browser> {
  if (process.env.LT_USERNAME && process.env.LT_ACCESS_KEY) {
    const capabilities = getLambdaTestCapabilities(testName);
    return await chromium.connect({
      wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`
    });
  } else {
    return await chromium.launch();
  }
}