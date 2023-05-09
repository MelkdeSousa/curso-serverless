import { AWS } from '../../aws/types'

export const handler: AWS.AWSLambda = async (event, context) => {
  console.log('api gateway event: ', event)
  console.log('api gateway context: ', context)

  return {
    body: JSON.stringify({
      message: 'Hello World!',
    }),
    statusCode: 200,
  }
}
