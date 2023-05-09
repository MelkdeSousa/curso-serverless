import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from 'aws-lambda'

import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs'

export namespace AWS {
  export type ProductsLambdas = {
    productsFetchFunction: NodejsFunction
    productsAdminFunction: NodejsFunction
  }

  export type AWSLambda = (
    event: APIGatewayProxyEvent,
    context: Context,
  ) => Promise<APIGatewayProxyResult>
}
