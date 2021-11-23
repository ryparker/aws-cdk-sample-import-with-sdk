import { CloudFormationClient, DescribeStacksCommand, Stack } from "@aws-sdk/client-cloudformation";
import { env } from './constants';

const client = new CloudFormationClient(env);

export const describeStacks = async (stackName: string): Promise<Stack> => {
  const command = new DescribeStacksCommand({ StackName: stackName });
  const response = await client.send(command);

  if (!response.Stacks) {
    throw new Error('Stack not found');
  }

  return response.Stacks[0];
};

export const fetchStackOutputs = async (stackName: string): Promise<{ [key: string]: string }> => {
  const stack = await describeStacks(stackName);

  if (stack.Outputs?.length === 0 && !stack.Outputs[0]) {
    throw new Error('Stack has no outputs');
  }

  const outputs = stack.Outputs?.reduce((acc, output) => {
    if (!output.OutputKey || !output.OutputValue) {
      throw new Error('OutputKey/OutputValue is missing');
    }

    acc[output.OutputKey] = output.OutputValue;
    return acc;
  }, {} as { [key: string]: string });

  return (outputs as { [key: string]: string });
}
