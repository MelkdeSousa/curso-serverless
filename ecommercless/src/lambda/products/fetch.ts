import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from 'aws-lambda'

type AWSLambda = (
  event: APIGatewayProxyEvent,
  context: Context,
) => Promise<APIGatewayProxyResult>

export const handler: AWSLambda = async (event, context) => {
  console.log('api gateway event: ', event)
  console.log('api gateway context: ', context)

  return {
    body: JSON.stringify({
      message: 'Hello World!',
    }),
    statusCode: 200,
  }
}
