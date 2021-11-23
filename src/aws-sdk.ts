import { CloudFormationClient, DescribeStacksCommand, Stack } from "@aws-sdk/client-cloudformation";
import { env } from './constants';

const client = new CloudFormationClient(env);

export const describeStacks = async (stackName: string): Promise<Stack> => {
  const command = new DescribeStacksCommand({ StackName: stackName });
  const response = await client.send(command);

  if (response.Stacks?.length === 0 && !response.Stacks[0]) {
    throw new Error('Stack not found');
  }

  // @ts-expect-error TS incorrectly thinks response.Stacks[0] could be undefined
  return response.Stacks[0];
};

export const getStackOutputs = async (stackName: string): Promise<{ [key: string]: string }> => {
  const stack = await describeStacks(stackName);

  if (stack.Outputs?.length === 0 && !stack.Outputs[0]) {
    throw new Error('Stack has no outputs');
  }

  const outputs = stack.Outputs?.reduce((acc, output) => {
    // @ts-expect-error TS incorrectly thinks output.OutputKey could be undefined
    acc[output.OutputKey] = output.OutputValue;
    return acc;
  }, {} as { [key: string]: string });

  return (outputs as { [key: string]: string });
}
