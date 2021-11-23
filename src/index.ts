import { App } from 'aws-cdk-lib';
import StackA from './stacks/stack-a';
import StackB from './stacks/stack-b';
import { env } from './constants'
import { fetchStackOutputs } from './aws-sdk';
import { CLUSTER_NAME } from './constants';

const app = new App();

new StackA(app, 'StackA', { env });

/* Uncomment code below once StackA is deployed */
// createStackB();

async function createStackB() {
  const stackOutputs = await fetchStackOutputs('StackA');

  // Remember that hyphens are removed from the output names
  const clusterName = stackOutputs[`${CLUSTER_NAME}ExistingClusterStackName`];
  const securityGroupId = stackOutputs[`${CLUSTER_NAME}ExistingClusterSecurityGroup`];

  new StackB(app, 'StackB', { env, clusterName, securityGroupId });
}
