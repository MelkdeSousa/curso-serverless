import { RemovalPolicy, Stack, StackProps } from 'aws-cdk-lib'
import { Code, LayerVersion, Runtime } from 'aws-cdk-lib/aws-lambda'
import { StringParameter } from 'aws-cdk-lib/aws-ssm'
import { Construct } from 'constructs'
import * as path from 'path'

export class ProductsLayersStack extends Stack {
  readonly productsLayers: LayerVersion

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props)

    const productsFunctionFolder = path.join(
      __dirname,
      '..',
      'lambda',
      'products',
    )

    this.productsLayers = new LayerVersion(this, 'ProductsLayer', {
      code: Code.fromAsset(path.join(productsFunctionFolder, 'layers')),
      compatibleRuntimes: [Runtime.NODEJS_16_X],
      layerVersionName: 'ProductsLayer',
      removalPolicy: RemovalPolicy.RETAIN,
    })

    new StringParameter(this, 'ProductsLayerVersionArn', {
      parameterName: 'ProductsLayerVersionArn',
      stringValue: this.productsLayers.layerVersionArn,
    })
  }
}
