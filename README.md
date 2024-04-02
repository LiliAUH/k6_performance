# k6_performance
Exercícios utilizados no curso de K6
O que é o k6?
O k6 é uma ferramenta de teste de carga de código aberto e gratuita, com isso será capaz de detectar regressões de desempenho e problemas mais cedo, permitindo construir sistemas mais resilientes e aplicativos robustos. Portanto o k6 utiliza a linguagem JavaScript para a criação dos cenários de teste

Casos de uso da ferramenta k6?
O k6 é utilizado por desenvolvedores, engenheiros de controle de qualidade e DevOps.

Eles usam a ferramenta com objetivo de testar o desempenho de APIs, microservices e sites. Casos de uso comum da ferramenta k6 são:

Teste de carga
O k6 é otimizado para consumo mínimo de recursos do sistema. É uma ferramenta de alto desempenho projetada para executar testes com alta carga ( testes de pico , estresse , absorção ) em ambientes de pré-produção e controle de qualidade.

Monitoramento de desempenho
O k6 fornece ótimos primitivos para automação de testes de desempenho . Você pode executar testes com uma pequena quantidade de carga para monitorar continuamente o desempenho de seu ambiente de produção.

Pré-requisito:

Ter conhecimento da linguagem JavaScript (Js).
Instalação do Visual Studio Code
Instalação do K6

Ir para a URL https://github.com/grafana/k6/releases
Na parte de Assets tem os arquivos que podem ser baixados
Baixar esse arquivo para windows k6-v0.50.0-windows-amd64.msi
Assim que terminar o upload do arquivo, clicar duas vezes no executável
Deveria abrir um modal com steps e vai clicando em next até chegar no Finish

Após a criação da pasta do projeto, iremos abrir essa pasta dentro do Visual Studio Code. De acordo com a imagem abaixo:
Clicar na opção Open File
Abrir a pasta criada para o seu projeto

Diferentes tipos de testes de performance

**Smoke Testing:** visa validar o mínimo funcionamento após uma modificação da aplicação.

**benefícios:** Carga mínima para avaliar se o script está funcional

A carga é constante mas curta duração, verifica se o core está funcional 

**VUS:** virtual user

**Duration:** tempo de duração

```
export const option = {
    vus: 1,                    //quantidade de usuários virtuais
    duration: '10s'
}
```

**Loading Test:** avaliação de desempenho de usuários e durações simultâneas.

tem alto volume de usuário, em um período não muito longo e nem muito curto. 
Permite a carga constante e estágios de cargas

```
export const options = {
    stages: [
        { duration: '5m', target: 100 },
        { duration: '10m', target: 100 },
        { duration: '5m', target: 0 }
    ]};
```

**Fase 1 -** fase de arrancada ou rump up onde, durante 5 min sai do usuário 0 até chegar 100, que seria a fase de aceleração

**Fase 2 -** fase de carga durante 10min vai ter uma carga constante de 100 usuário

**Fase 3 -** fase de desaceleração ou rump down , onde os usuários vão diminuindo de 100 até chegar em 0 num intervalo de 5 min.

**benefícios:** 
- permite que o sistema aqueça ou redimensione automaticamente para lidar com o tráfego
- permite que você compare o tempo de resposta entre os estágios de carga baixa e carga normal 

Stressing Test: busca como o sistema se comporta sobre alta carga, avalia disponibilidade, estabilidade e recuperabilidade do sistema

Precisa ser feito alguma perguntas
Como seu sistema se comporta em condições extremas?
Qual é a capacidade máxima do seu sistema em termos de usuários ou taxa de transferência?
O ponto de ruptura do seu sistema?
O sistema se recupera sem intervenção manual após o término do teste de estresse?

O teste pode validar a arquitetura de uma aplicação que foi construída, identificando gargalos que podem ser prejudiciais a uma aplicação.

