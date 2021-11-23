import { CfnOutput } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Cluster } from 'aws-cdk-lib/aws-ecs';
import { Vpc, SecurityGroup } from 'aws-cdk-lib/aws-ec2';
import { CLUSTER_NAME } from '../constants';
import { getStackOutputs } from '../aws-sdk';

export default async (scope: Construct) => {
  const vpc = Vpc.fromLookup(scope, 'DefaultVpc', {
    isDefault: true,
  });

  const stackAOutputs = await getStackOutputs('StackA');

  // Remember that hyphens are removed from the output names
  const clusterName = stackAOutputs[`${CLUSTER_NAME}ExistingClusterStackName`];
  const securityGroupId = stackAOutputs[`${CLUSTER_NAME}ExistingClusterSecurityGroup`];

  const clusterSecurityGroup = SecurityGroup.fromLookup(scope, 'ECSInstanceSecurityGroup',
    securityGroupId,
  );

  const cluster = Cluster.fromClusterAttributes(scope, 'ExistingCluster', {
    vpc: vpc,
    clusterName: clusterName,
    securityGroups: [
      clusterSecurityGroup
    ],
  });

  /* Stack Outputs */
  new CfnOutput(scope, 'ExistingClusterName', {
    value: cluster.clusterName,
  });
};
