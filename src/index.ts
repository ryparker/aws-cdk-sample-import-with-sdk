import { App, Stack } from 'aws-cdk-lib';
import createStackA from './stacks/stack-a';
import createStackB from './stacks/stack-b';
import { env } from './constants'

const app = new App();

const stackA = new Stack(app, 'StackA', { env });
createStackA(stackA);

const stackB = new Stack(app, 'StackB', { env });

(async () => {
  try {
    await createStackB(stackB);
  } catch (e) {
    throw new Error((e as string));
  }
})();
