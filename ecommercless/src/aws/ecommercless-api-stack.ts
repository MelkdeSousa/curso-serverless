import { Stack, StackProps } from 'aws-cdk-lib'
import {
  AccessLogFormat,
  LambdaIntegration,
  LogGroupLogDestination,
  RestApi,
} from 'aws-cdk-lib/aws-apigateway'
import { LogGroup } from 'aws-cdk-lib/aws-logs'
import { Construct } from 'constructs'
import { AWS } from './types'

export type ECommerclessApiStackProps = StackProps & AWS.ProductsLambdas

export class ECommerclessApiStack extends Stack {
  constructor(
    scope: Construct,
    id: string,
    {
      productsFetchFunction,
      productsAdminFunction,
      ...props
    }: ECommerclessApiStackProps,
  ) {
    super(scope, id, props)

    // create log group for api gateway in cloudwatch
    const logGroup = new LogGroup(this, 'ECommerclessApiLogs')

    const api = new RestApi(this, 'ECommerclessApi', {
      restApiName: 'ecommercless-api',
      cloudWatchRole: true,
      deployOptions: {
        accessLogDestination: new LogGroupLogDestination(logGroup), // api gateway access logs
        accessLogFormat: AccessLogFormat.jsonWithStandardFields({
          httpMethod: true,
          protocol: true,
          requestTime: true,
          resourcePath: true,
          status: true,
          responseLength: true,
          caller: true,
          ip: false, // sensitive
          user: false, // sensitive
        }),
      },
    })

    // integration of api gateway with lambda function productsFetchFunction
    const productsFetchFunctionIntegration = new LambdaIntegration(
      productsFetchFunction,
    )
    const productsAdminFunctionIntegration = new LambdaIntegration(
      productsAdminFunction,
    )

    // api gateway resource "/products"
    const productsResource = api.root.addResource('products')

    // api gateway resource "/products" with GET method
    productsResource.addMethod('GET', productsFetchFunctionIntegration)

    const productsIdResource = productsResource.addResource('{id}')

    // api gateway resource "/products/{id}" with GET method
    productsIdResource.addMethod('GET', productsFetchFunctionIntegration)

    // api gateway resource "/products" with POST method
    productsResource.addMethod('POST', productsAdminFunctionIntegration)

    // api gateway resource "/products/{id}" with PUT method
    productsIdResource.addMethod('PUT', productsAdminFunctionIntegration)

    // api gateway resource "/products/{id}" with DELETE method
    productsIdResource.addMethod('DELETE', productsAdminFunctionIntegration)
  }
}
