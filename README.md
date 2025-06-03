# Desafio RDI - Testes Automatizados

Este projeto contém testes automatizados desenvolvidos com Cypress para validar funcionalidades de login em uma aplicação web.

## 🚀 Tecnologias Utilizadas

- [Cypress](https://www.cypress.io/) - Framework de testes end-to-end
- JavaScript

## 📋 Pré-requisitos

- Node.js (versão LTS recomendada)
- npm ou yarn

## 🔧 Instalação

1. Clone o repositório:

```bash
git clone https://github.com/jose-paulo-95/desafio-rdi
```

2. Instale as dependências:

```bash
npm install
# ou
yarn install
```

## 🧪 Executando os Testes

Para executar os testes em modo interativo:

```bash
npx cypress open
```

Para executar os testes em modo headless:

```bash
npx cypress run
```

## 📁 Estrutura do Projeto

```
cypress/
  ├── e2e/
  │   └── web/
  │       └── Login/
  │           ├── Login.cy.js
  │           └── loginActions.js
```

## 📝 Casos de Teste

O projeto inclui os seguintes cenários de teste para a funcionalidade de login:

- Login com credenciais válidas
- Tentativa de login com credenciais inválidas
- Validação de campos obrigatórios
- Validação de formato de email
- Fluxo de logout

## 🤝 Contribuindo

1. Faça um Fork do projeto
2. Crie uma Branch para sua Feature (`git checkout -b feature/AmazingFeature`)
3. Faça o Commit das suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Faça o Push para a Branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
