import { App, Stack } from 'aws-cdk-lib';
import createStackA from './stacks/stack-a';
import createStackB from './stacks/stack-b';
import { env } from './constants'

const app = new App();

const stackA = new Stack(app, 'StackA', { env });
createStackA(stackA);

/* Uncomment code below once StackA is deployed */
const stackB = new Stack(app, 'StackB', { env });
createStackB(stackB);
