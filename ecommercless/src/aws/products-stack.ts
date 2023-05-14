import { RemovalPolicy, Stack, StackProps } from 'aws-cdk-lib'
import { AttributeType, BillingMode, Table } from 'aws-cdk-lib/aws-dynamodb'
import { LayerVersion } from 'aws-cdk-lib/aws-lambda'
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs'
import { StringParameter } from 'aws-cdk-lib/aws-ssm'
import { Construct } from 'constructs'
import * as path from 'path'
import { makeNodejsFunction } from '~/factories/makeNodejsFunction'
import { AWS } from './types'

export class ProductsStack extends Stack implements AWS.ProductsLambdas {
  readonly productsFetchFunction: NodejsFunction
  readonly productsAdminFunction: NodejsFunction

  readonly productsTable: Table

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props)

    const productsFunctionFolder = path.join(
      __dirname,
      '..',
      'lambda',
      'products',
    )

    this.productsTable = new Table(this, 'ProductsTable', {
      tableName: 'products',
      partitionKey: {
        name: 'id',
        type: AttributeType.STRING,
      },
      // production should RETAIN
      removalPolicy: RemovalPolicy.DESTROY,
      billingMode: BillingMode.PROVISIONED,
      readCapacity: 1,
      writeCapacity: 1,
    })

    const productsLayerArn = StringParameter.valueForStringParameter(
      this,
      'ProductsLayerVersionArn',
    )
    const productsLayer = LayerVersion.fromLayerVersionArn(
      this,
      'Products:ayerVersionArn',
      productsLayerArn,
    )

    const layers = [productsLayer]

    this.productsFetchFunction = makeNodejsFunction(
      this,
      'ProductsFetchFunction',
      'products-fetch',
      path.join(productsFunctionFolder, 'fetch.ts'),
      {
        PRODUCTS_TABLE: this.productsTable.tableName,
      },
      layers,
    )

    this.productsTable.grantReadData(this.productsFetchFunction)

    this.productsAdminFunction = makeNodejsFunction(
      this,
      'ProductsAdminFunction',
      'products-admin',
      path.join(productsFunctionFolder, 'admin.ts'),
      {
        PRODUCTS_TABLE: this.productsTable.tableName,
      },
      layers,
    )

    this.productsTable.grantWriteData(this.productsAdminFunction)
  }
}
