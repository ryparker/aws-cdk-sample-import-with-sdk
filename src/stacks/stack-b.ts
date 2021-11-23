import { Stack, StackProps, CfnOutput } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Cluster } from 'aws-cdk-lib/aws-ecs';
import { Vpc, SecurityGroup } from 'aws-cdk-lib/aws-ec2';

export interface StackBProps extends StackProps {
  clusterName: string;
  securityGroupId: string;
}

export default class StackB extends Stack {
  constructor(scope: Construct, id: string, props: StackBProps) {
    super(scope, id, props);
    console.log({ props })

    const vpc = Vpc.fromLookup(this, 'DefaultVpc', {
      isDefault: true,
    });

    const clusterSecurityGroup = SecurityGroup.fromLookup(this, 'EcsInstanceSecurityGroup',
      props.securityGroupId,
    );

    const cluster = Cluster.fromClusterAttributes(this, 'ExistingCluster', {
      vpc: vpc,
      clusterName: props.clusterName,
      securityGroups: [
        clusterSecurityGroup
      ],
    });

    /* Stack Outputs */
    new CfnOutput(this, 'ExistingClusterName', {
      value: cluster.clusterName,
    });
  }
};
