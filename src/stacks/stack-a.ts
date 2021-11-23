import { CfnOutput } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Cluster } from 'aws-cdk-lib/aws-ecs';
import { Vpc, SecurityGroup } from 'aws-cdk-lib/aws-ec2';
import { CLUSTER_NAME } from '../constants';

export default (scope: Construct) => {
  const vpc = Vpc.fromLookup(scope, 'DefaultVpc', {
    isDefault: true,
  })

  const cluster = new Cluster(scope, CLUSTER_NAME, { vpc, clusterName: CLUSTER_NAME });

  const clusterSecurityGroup = new SecurityGroup(scope, 'ECSInstanceSecurityGroup', { vpc });
  cluster.connections.addSecurityGroup(clusterSecurityGroup);

  /* Stack Outputs */
  new CfnOutput(scope, `${CLUSTER_NAME}-ExistingClusterStackName`, {
    value: cluster.clusterName,
  });

  new CfnOutput(scope, `${CLUSTER_NAME}-ExistingClusterSecurityGroup`, {
    value: clusterSecurityGroup.securityGroupId,
  });
}
