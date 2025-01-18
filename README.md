
# Barber Scheduler

Este é um aplicativo de agendamento de horários para barbeiros e serviços semelhantes. Ele permite que os usuários agendem horários de forma fácil e rápida, gerenciando modais e estados de forma eficiente.

## Tecnologias Utilizadas

- **React** com **TypeScript**
- **Tailwind CSS** para estilização
- **DaisyUI** para componentes prontos
- **Zustand** para gerenciamento de estados globais
- **Vite** como bundler de desenvolvimento

## Passos para Configuração

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/barber-scheduler.git
```

### 2. Instale as dependências

Navegue até a pasta do projeto e instale as dependências utilizando npm ou yarn.

Com npm:

```bash
cd barber-scheduler
npm install
```

Com yarn:

```bash
cd barber-scheduler
yarn install
```

### 3. Configure o Tailwind CSS

O Tailwind CSS já está configurado. Caso queira personalizar o tema, basta modificar o arquivo `tailwind.config.js`.

### 4. Execute o aplicativo

Após a instalação, inicie o servidor de desenvolvimento com o comando:

Com npm:

```bash
npm run dev
```

Com yarn:

```bash
yarn dev
```

O aplicativo estará disponível em `http://localhost:3000`.

## Estrutura do Projeto

A estrutura do projeto segue uma organização modular, com foco em reutilização de componentes e fácil manutenção:

```
/barber-scheduler
├── /public
│   └── index.html
├── /src
│   ├── /assets      # Imagens, fontes e outros arquivos estáticos
│   ├── /components  # Componentes reutilizáveis (ex: Buttons, Inputs, Modais)
│   ├── /modals      # Modais e lógica de gerenciamento de modais
│   ├── /store       # Zustand store para gerenciamento de estados globais
│   ├── /styles      # Arquivos de estilo (configuração do Tailwind)
│   ├── /types       # Definições de tipos TypeScript
│   └── /App.tsx     # Componente principal
└── /tailwind.config.js  # Arquivo de configuração do Tailwind CSS
```

## Como Contribuir

1. Faça um fork deste repositório.
2. Crie uma branch para sua feature (`git checkout -b minha-feature`).
3. Faça suas modificações e commit (`git commit -am 'Adicionando nova feature'`).
4. Envie para o repositório remoto (`git push origin minha-feature`).
5. Crie um Pull Request descrevendo suas mudanças.

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).
