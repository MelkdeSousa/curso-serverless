# Aprendizados

- [x] Criar usuário no IAM
- [x] Definir o usuário na maquina com `aws configure`
- [x] usar [AWS CDK](https://www.npmjs.com/package/aws-cdk): `npx aws-cdk`
- [x] iniciar um projeto com typescript: `npx aws-cdk init --language typescript`
- [x] preparar uma conta e região para o CDK: `npx aws-cdk bootstrap`
- [x] lista de stack dentro do projeto: `npx aws-cdk list`
- [x] deploy das stacks: `npx aws-cdk deploy --all`; pode usar as flag `--require-approval never` para evitar perguntas
- [x] destruir tudo que já foi feito no projeto: `npx aws-cdk destroy --all`

## Conceitos

### Cloud Formation

### Stack Cloud Formation

### Recursos

### Lambda

- São funções, pequenos trechos de código
- Executadas a partir de gatilhos (triggers), que são invocados por eventos (events)
- Executada em um ambiente de execução (runtime)
- Quando chamadas mais uma vez ao mesmo tempo, são executadas em paralelo
- Seu custo é calculado por tempo de execução e consumo de memória
- Elas devem ser feitas com ênfase em performance, toda redução de consumo de memória e tempo devem ser priorizadas
- Para ter acesso a outros recursos da AWS, é necessário informar quais são eles e quais as operações a serem realizadas neles

### API Gateway

- Fica na frente de serviço que expõem apis para o mundo externo
- Validações de URI, Verbos HTTP, Corpo de requisição
- Integração com funções lambdas, cognito para autent./autor. de usuários
- Monitoramento com CloudWatch
- Custo por Requisição e quantidade de dados transferidos

### Lambda layers

- É o mecanismo de compartilhamento de código entre lambdas
- Útil para separação de responsabilidade e reutilização de código (Modelo de acesso a dados, lógicas de negócio)
- A redução de código na lambda ajuda no code start


### DynamoDB

- Banco de dados NoSQL
- Orientado a Documentos
- Gerenciável, escalável, modos de capacidade
- itens TTL
- Autoscaling
- Chave primária simples, composta e índice
- schemaless