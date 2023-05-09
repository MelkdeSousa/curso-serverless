#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib'
import 'dotenv/config'
import 'source-map-support/register'
import { ECommerclessApiStack } from '~/aws/ecommercless-api-stack'
import { ProductsStack } from '~/aws/products-stack'

const env: cdk.Environment = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
}

const tags = {
  cost: 'ECommercless',
  team: 'melkdesousa',
}

const app = new cdk.App()

const productsStack = new ProductsStack(app, 'ProductsStack', {
  tags,
  env,
})

const eCommerclessApiStack = new ECommerclessApiStack(
  app,
  'ECommerclessApiStack',
  {
    productsFetchFunction: productsStack.productsFetchFunction,
    productsAdminFunction: productsStack.productsAdminFunction,
    env,
    tags,
  },
)

eCommerclessApiStack.addDependency(productsStack)

/* If you don't specify 'env', this stack will be environment-agnostic.
 * Account/Region-dependent features and context lookups will not work,
 * but a single synthesized template can be deployed anywhere. */

/* Uncomment the next line to specialize this stack for the AWS Account
 * and Region that are implied by the current CLI configuration. */
// env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },

/* Uncomment the next line if you know exactly what Account and Region you
 * want to deploy the stack to. */
// env: { account: '123456789012', region: 'us-east-1' },

/* For more information, see https://docs.aws.amazon.com/cdk/latest/guide/environments.html */
