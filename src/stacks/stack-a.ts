import { Stack, StackProps, CfnOutput } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Cluster } from 'aws-cdk-lib/aws-ecs';
import { Vpc, SecurityGroup } from 'aws-cdk-lib/aws-ec2';
import { CLUSTER_NAME } from '../constants';

export default class StackA extends Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    const vpc = Vpc.fromLookup(this, 'DefaultVpc', {
      isDefault: true,
    })

    const cluster = new Cluster(this, CLUSTER_NAME, { vpc, clusterName: CLUSTER_NAME });

    const clusterSecurityGroup = new SecurityGroup(this, 'ECSInstanceSecurityGroup', { vpc });
    cluster.connections.addSecurityGroup(clusterSecurityGroup);

    /* Stack Outputs */
    new CfnOutput(this, `${CLUSTER_NAME}-ExistingClusterStackName`, {
      value: cluster.clusterName,
    });
    new CfnOutput(this, `${CLUSTER_NAME}-ExistingClusterSecurityGroup`, {
      value: clusterSecurityGroup.securityGroupId,
    });
  }
}
