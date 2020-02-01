# FindDev
Neste repositório você vai encontrar uma aplicação completa (Mobile,Browser, API) de um serviço de localização de desenvolvedores/programadores.

# About App

A ideia deste app surgiu com um problema de muitos programdores, a necessiade de encontrar outra pessoa que trabalha com as mesma tecnologias. Assim surgiu o FindDev, um aplicativo idealizado pela rocketseat durante a semana omnistack, um evento promovido por eles durante uma semana.

## Getting Started

Durante o desenvolvimento do aplicativo, foi implementado algumas funcionalidades a mais e também algumas melhorias na interface.

O app dispões de uma maior interação entres os usuarios, fornecendo funções como Seguir ( semelhante ao instragam ) e disparos de eventos em tempo real, tanto entre o mobile como no browser.

- No navegador  Todas a funcionalidades do app se baseia no cadastro do usuario do github e da localização do usuario, com essas informações sendo utilizadas para gerar uma maior interação entre os usuarios e também sendo utilizado no mobile para fins de localização e filtragem.

- Na versão mobile é implementado todas as funcionalidades paras localização de uma pessoa que trabalhe com alguma tecnologia de seu interesse, permitindo dessa forma uma contanto mais rapido com a mesma e quem sabe na coloboração para o seu projeto.

Então para começar a utiliza-lo vamos ao pré-requisitos e a sua instalação.

### Prerequisites

1.  Instalando o Yarn
 > Para instalar o yarn, você possui duas formas.
 
 1. Acessar o site oficial e baixar a versão para o seu S.O
 2. Caso esteja no  windows, instalar via Chocolatey é uma otima opção

Via Chocolatey, acesse o site oficial e sigua todas os passos informados, após a instalação digite o seguinte comando:
```
choco install yarn
```

feito isso, no mesmo terminal, execute o seguinte comando: 
```
yarn -v
```
Você verá algo semelhante a isto:
> 1.17.3

A versão 1.17.3 pode variar com o tempo e com a versão que você baixou.

2.  Instalando o Node.JS
 > Para instalar o node, você possui duas formas.
 
 1. Acessar o site oficial e baixar a versão LTS para o seu S.O
 2. Caso esteja no  windows, instalar via Chocolatey é uma otima opção
 
 ##### A versão LTS é a versão mais estável do Node

Via Chocolatey, acesse o site oficial e sigua todas os passos informados, após a instalação digite o seguinte comando:
```
choco install nodejs-lts
```
feito isso, no mesmo terminal, execute o seguinte comando: 
```
node -v
```
Você verá algo semelhante a isto:
> v12.14.0

A versão 12.14.0 pode variar com o tempo e com a versão que você baixou.


### Installing

Com os pré-requisitos instalados, agora você precisa baixar este repositório.

Com o dowloand do repositório concluido, descompacte (caso tenha baixado em formato zip) e abra a pasta API no terminal de sua escolha. Feito isso execute os seguintes comandos:

1.
```
yarn install
```
2. Após a finalização da instalação, no mesmo terminal e pasta, execute o seguinte comando
```
yarn dev
```
Aguarde um pouco e você deverar ver uma mensagem semelhante a isto:
> API, online!


Após a instalação e execução da API, repita o primeiro passo, porém, agora, na pasta browser

1. Após a finalização da instalação, no mesmo terminal e pasta, execute o seguinte comando
```
yarn start
```
Aguarde um pouco e uma nova janela/aba de seu navegador padrão irar abrir, aguarde um pouco, a interface da aplicação irar aparecer para você.


```
until finished
```

End with an example of getting some data out of the system or using it for a little demo

## Running the tests

Explain how to run the automated tests for this system

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [Maven](https://maven.apache.org/) - Dependency Management
* [ROME](https://rometools.github.io/rome/) - Used to generate RSS Feeds

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Billie Thompson** - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone whose code was used
* Inspiration
* etc
