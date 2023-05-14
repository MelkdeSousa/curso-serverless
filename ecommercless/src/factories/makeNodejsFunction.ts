import { Duration } from 'aws-cdk-lib'
import { ILayerVersion, Runtime } from 'aws-cdk-lib/aws-lambda'
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs'
import { Construct } from 'constructs'

export const makeNodejsFunction = (
  scope: Construct,
  id: string,
  name: string,
  path: string,
  environment: Record<string, string> = {},
  layers: ILayerVersion[] = [],
): NodejsFunction => {
  return new NodejsFunction(scope, id, {
    functionName: name,
    entry: path,
    handler: 'handler',
    memorySize: 128,
    timeout: Duration.seconds(5),
    bundling: {
      minify: true,
      sourceMap: false,
    },
    runtime: Runtime.NODEJS_16_X,
    environment,
    layers,
  })
}
