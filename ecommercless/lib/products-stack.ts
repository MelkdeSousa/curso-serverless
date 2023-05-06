import { Duration, Stack, StackProps } from 'aws-cdk-lib'
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs'
import { Construct } from 'constructs'
import * as path from 'path'

export class ProductsStack extends Stack {
  readonly productsFetchFunction: NodejsFunction

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props)

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
      },
    )
  }
}
