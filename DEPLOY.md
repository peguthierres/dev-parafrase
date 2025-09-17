# Guia de Deploy para Netlify

Este projeto está configurado para deploy automático no Netlify. Siga os passos abaixo para fazer o deploy da aplicação.

## Pré-requisitos

1. **Conta no Netlify**: Crie uma conta em [netlify.com](https://netlify.com)
2. **Projeto Supabase**: Configure um projeto no [Supabase](https://supabase.com)
3. **Repositório Git**: O código deve estar em um repositório Git (GitHub, GitLab, etc.)

## Configuração do Supabase

1. Acesse o dashboard do seu projeto Supabase
2. Vá para **Settings** > **API**
3. Copie as seguintes informações:
   - **Project URL** (ex: `https://xyzcompany.supabase.co`)
   - **Anon public key** (chave pública anônima)

## Deploy no Netlify

### Método 1: Deploy via Git (Recomendado)

1. **Conectar Repositório**:
   - Acesse o dashboard do Netlify
   - Clique em "New site from Git"
   - Conecte seu repositório GitHub/GitLab
   - Selecione o repositório do projeto

2. **Configurar Build Settings**:
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
   - **Node version**: `18`

3. **Configurar Variáveis de Ambiente**:
   - Vá para **Site settings** > **Environment variables**
   - Adicione as seguintes variáveis:
     ```
     NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
     NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anonima-aqui
     ```

4. **Deploy**:
   - Clique em "Deploy site"
   - O Netlify fará o build e deploy automaticamente

### Método 2: Deploy Manual

1. **Build Local**:
   ```bash
   npm install
   npm run build
   ```

2. **Deploy via Drag & Drop**:
   - Acesse o dashboard do Netlify
   - Arraste a pasta `.next` para a área de deploy
   - Configure as variáveis de ambiente conforme descrito acima

## Configurações Importantes

### Arquivo netlify.toml

O projeto já inclui um arquivo `netlify.toml` com as configurações necessárias:

```toml
[build]
  publish = ".next"
  command = "npm run build"

[build.environment]
  NODE_VERSION = "18"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

### Variáveis de Ambiente

As seguintes variáveis devem ser configuradas no Netlify:

- `NEXT_PUBLIC_SUPABASE_URL`: URL do seu projeto Supabase
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Chave pública anônima do Supabase

### Fontes

O projeto foi configurado para usar fontes compatíveis com Netlify:
- **Inter**: Fonte principal (substitui Geist)
- **JetBrains Mono**: Fonte monoespaçada (substitui Geist Mono)

## Troubleshooting

### Erro de Build

Se houver erros de build relacionados a:

1. **Fontes não encontradas**: As fontes foram atualizadas para Inter e JetBrains Mono
2. **Window is not defined**: Todos os usos de `window` foram protegidos com verificações SSR
3. **Supabase não configurado**: Verifique se as variáveis de ambiente estão corretas

### Verificação Pós-Deploy

Após o deploy, verifique:

1. **Site carrega corretamente**: Acesse a URL fornecida pelo Netlify
2. **Autenticação funciona**: Teste login/registro
3. **Banco de dados conecta**: Verifique se as frases são carregadas
4. **Funcionalidades client-side**: Teste compartilhamento, curtidas, etc.

## Deploy Contínuo

Com a configuração atual:
- Commits na branch principal fazem deploy automático
- Pull requests criam preview deploys
- Rollback é possível via dashboard do Netlify

## Suporte

Para problemas específicos:
1. Verifique os logs de build no dashboard do Netlify
2. Confirme que todas as variáveis de ambiente estão configuradas
3. Teste o build localmente com `npm run build`

## Exemplo de Variáveis de Ambiente

Copie o arquivo `env.example` e configure suas variáveis:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://xyzcompany.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

O projeto está pronto para deploy no Netlify! 🚀
