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

**Stressing Test:** busca como o sistema se comporta sobre alta carga, avalia disponibilidade, estabilidade e recuperabilidade do sistema

Precisa ser feito alguma perguntas
Como seu sistema se comporta em condições extremas?
Qual é a capacidade máxima do seu sistema em termos de usuários ou taxa de transferência?
O ponto de ruptura do seu sistema?
O sistema se recupera sem intervenção manual após o término do teste de estresse?

O teste pode validar a arquitetura de uma aplicação que foi construída, identificando gargalos que podem ser prejudiciais a uma aplicação.

```
export const options = {
    stages: [
        {duration: '2m', target: 100},
        {duration: '5m', target: 100},
        {duration: '2m', target: 200},
        {duration: '5m', target: 200},
        {duration: '2m', target: 300},
        {duration: '5m', target: 300},
        {duration: '2m', target: 400},
        {duration: '5m', target: 400},
        {duration: '10m', target: 0},
    ],
};
```

O aumento de carga repentino consegue validar se a sua infraestrutura consegue se recuperar sozinha 
A rapidez com que os mecanismos de dimensionamento automático reagem ao aumento de carga.
Se houver alguma falha durante os eventos de dimensionamento.

**Spike Testing:** atingimos uma carga extrema em um período de tempo muito curto.

Ele mostra como seu sistema funcionará sob um aumento repentino de tráfego e como seu sistema irá se recuperar assim que o tráfego diminuir

4 tipos de resposta

Excelente: onde o sistema não é degradado durante o aumento do tráfego, o tempo de resposta é semelhante durante o tráfego baixo e alto.

Bom: o tempo de resposta é mais lento, mas o sistema não apresenta erros e todos os pedidos são tratados.

Insatisfatório: o sistema produz erros durante o aumento de tráfego, mas volta ao normal depois que o tráfego diminui

Ruim: o sistema trava e não se recupera depois que o tráfego diminui

```
export const options = {
    stages: [
        {duration: '10s', target: 100},
        {duration: '1m', target: 100},
        {duration: '10s', target: 1400},
        {duration: '3m', target: 1400},
        {duration: '10s', target: 100},
        {duration: '3m', target: 100},
        {duration: '10s', target: 0},
    ],
};
```
**Soak Testing ou teste de imersão:** se preocupa com a confiabilidade durante um longo período de tempo, simulando dias de tráfego em um sistema em poucas horas.

O sistema não sofre de bugs ou vazamento de memória.
Verifique se as reinicializações inesperadas do aplicativo não perdem solicitações
Encontre bugs relacionados a condições de corrida que aparecem esporadicamente

Certificar que o seu banco de dados não esgote o espaço de armazenamento alocado e pare.
Certifique-se de que seus logs não esgotam o armazenamento em disco alocado
Certifique-se de que os serviços externos dos quais você depende não parem de funcionar após a execução de uma certa quantidade de solicitações.

```
export const options = {
    stages: [
        {duration: '2m', target: 400},
        {duration: '3h56m', target: 400},
        {duration: '2m', target: 0},
    ],
};
```

Dois pontos importante antes de executar o teste 
Quantidade de usuários usar 80% da capacidade do sistema para não ocasionar o ponto de ruptura e requisitos de infraestrutura se o seu sistema utiliza alguma aplicação externa e essa aplicação ocasiona em custos para o seu time, precisa ter em mente os custos e falar com a liderança.

**Breakpoint Testing ou teste de ponto de interrupção:** onde desejamos encontrar o limite do seu sistema, conhecido como teste de capacidade. 

Ajustar/ Cuidar de pontos fracos do sistema, buscando limites maiores suportados pelo sistema
Ajudar a planejar e verificar a correção de sistema com baixo limite de utilização

Quando executar o teste:
Após mudanças significativas na base de código/ infraestrutura
Consumo elevado de recursos pelo seu sistema
Carga do sistema cresce continuamente? 

Considerações antes de iniciar o teste
Atenção a elasticidade de ambientes de nuvem ( limite do sistema)
Aumento de carga gradual para essa modalidade
Tipo de teste de ciclo iterativo ( vai realizar vários experimentos para atingir o limite do sistema)
Interrupção manual (no CLI) ou automática (Abortion failes)

Você precisa que o sistema seja aprovado em todos os outros testes antes, pois ele precisa estar maduro para realizar o brakpoint test.

```
import http from 'k6/http';
import {sleep} from 'k6';


export const options = {
    executor: ‘ramping-arrival-rate’, 
    stages: [
        {duration: '2h', target: 20000},
    ],
};


export default () => {
	const urlRes = http.get(‘https://test-api.k6.io’);
	sleep(1);
};
```

**Ciclo de vida de um teste com K6**

**Inicialização:** vamos carregar arquivo locais, importar módulos, essa chamada ocorre uma única vez. 


```
import {sleep} from 'k6';
```


**Configuração:** onde configuramos dados que são compartilhados entre todos os usuários virtuais, dentre todas as views. É uma etapa que também é chamada uma única vez durante todo o ciclo de execução. 

```	
export const option = {
    vus: 1,                 
    duration: '10s'
}
```

**Execução ou código VU:** é onde executamos a nossa função de teste, o código vu são executados rapidamente durante a execução do teste. Pode solicitar http, emitir métricas e fazer tudo que espera que um testes de carga faça

```
export default () => {
	console.log(“testando o k6”);
	sleep(‘);
};
```

**Desmontagem:** etapa opcional do teste onde podemos processar os resultados da etapa de configuração e execução. Bastante útil quando queremos enviar resultados por um webhook para alguma plataforma externa ou tratamento de dados. É executada uma única vez durante o ciclo de vida do teste.

```
export function teardown(data){ 
   console.log(data)
}
```










