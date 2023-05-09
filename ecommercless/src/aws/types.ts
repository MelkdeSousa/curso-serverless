import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs'

export type ProductsLambdas = {
  productsFetchFunction: NodejsFunction
  productsAdminFunction: NodejsFunction
}
