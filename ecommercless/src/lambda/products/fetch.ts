import { AWS } from '~/aws'

export const handler: AWS.AWSLambda = async (event, context) => {
  console.log(
    `${new Date().toISOString()} ${event.httpMethod} ${event.path}/${
      event.pathParameters
    }`,
  )

  return {
    body: JSON.stringify({
      message: 'Hello World!',
    }),
    statusCode: 200,
  }
}
