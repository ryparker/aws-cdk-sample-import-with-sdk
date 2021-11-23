# AWS CDK (v2) Sample Import with AWS SDK

This is a sample CDK project that uses the AWS SDK to import resources from another stack.

## :rocket: Quick Start

_Prerequisite: Have [CDK credentials exported in shell env](https://docs.aws.amazon.com/cdk/latest/guide/environments.html) or replace values in `./src/constants.ts`_

**1. Install dependencies with Yarn v1**

```shell
yarn install
```

**2. Create the [bootstrap stack](https://docs.aws.amazon.com/cdk/latest/guide/bootstrapping.html) in your AWS account**
_This only needs to be ran once per account/region._

```shell
yarn bootstrap
```

**3. Build Cloudformation files**

```shell
yarn build
```

**4. Deploy Stack A**

```shell
yarn deploy StackA
```

**5. Uncomment StackB code in `./src/index.ts`, then build and deploy**

```shell
yarn build StackB
yarn deploy StackB
```
