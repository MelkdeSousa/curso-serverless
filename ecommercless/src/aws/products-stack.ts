import { RemovalPolicy, Stack, StackProps } from 'aws-cdk-lib'
import { AttributeType, BillingMode, Table } from 'aws-cdk-lib/aws-dynamodb'
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs'
import { Construct } from 'constructs'
import * as path from 'path'
import { makeNodejsFunction } from '../factories/makeNodejsFunction'
import { AWS } from './types'

export class ProductsStack extends Stack implements AWS.ProductsLambdas {
  readonly productsFetchFunction: NodejsFunction
  readonly productsAdminFunction: NodejsFunction

  readonly productsTable: Table

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props)

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

    this.productsFetchFunction = makeNodejsFunction(
      this,
      'ProductsFetchFunction',
      'products-fetch',
      path.join(__dirname, '..', 'lambda', 'products', 'fetch.ts'),
      {
        PRODUCTS_TABLE: this.productsTable.tableName,
      },
    )

    this.productsTable.grantReadData(this.productsFetchFunction)

    this.productsAdminFunction = makeNodejsFunction(
      this,
      'ProductsAdminFunction',
      'products-admin',
      path.join(__dirname, '..', 'lambda', 'products', 'admin.ts'),
      {
        PRODUCTS_TABLE: this.productsTable.tableName,
      },
    )

    this.productsTable.grantWriteData(this.productsAdminFunction)
  }
}
