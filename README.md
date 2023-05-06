# Aprendizados

- [x] Criar usuário no IAM
- [x] Definir o usuário na maquina com `aws configure`
- [x] usar [AWS CDK](https://www.npmjs.com/package/aws-cdk): `npx aws-cdk`
- [x] iniciar um projeto com typescript: `npx aws-cdk init --language typescript`
- [x] lista de stack dentro do projeto: `npx aws-cdk list`
- [ ] destruir tudo que já foi feito no projeto: `npx aws-cdk destroy --all`
- [ ] deploy das stacks: `npx aws-cdk deploy --all`

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

### API Gateway

- Fica na frente de serviço que expõem apis para o mundo externo
- Validações de URI, Verbos HTTP, Corpo de requisição
- Integração com funções lambdas, cognito para autent./autor. de usuários
- Monitoramento com CloudWatch
- Custo por Requisição e quantidade de dados transferidos