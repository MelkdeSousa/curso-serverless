import { Duration, RemovalPolicy, Stack, StackProps } from 'aws-cdk-lib'
import { AttributeType, BillingMode, Table } from 'aws-cdk-lib/aws-dynamodb'
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs'
import { Construct } from 'constructs'
import * as path from 'path'

export class ProductsStack extends Stack {
  readonly productsFetchFunction: NodejsFunction
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

    this.productsFetchFunction = new NodejsFunction(
      this,
      'ProductsFetchFunction',
      {
        functionName: 'products-fetch',
        entry: path.join(
          __dirname,
          '..',
          'src',
          'lambda',
          'products',
          'fetch.ts',
        ),
        handler: 'handler',
        memorySize: 128,
        timeout: Duration.seconds(5),
        bundling: {
          minify: true,
          sourceMap: false,
        },
        environment: {
          PRODUCTS_TABLE: this.productsTable.tableName,
        },
      },
    )

    this.productsTable.grantReadData(this.productsFetchFunction)
  }
}
