#!/bin/bash


DIRECT_URL="postgresql://postgres.comrfuwuvpntemcmwnbg:Gustavoeonsouza090402@aws-1-sa-east-1.pooler.supabase.com:5432/postgres?sslmode=require"

echo "🔄 Sincronizando schema do banco para o código..."
echo "📡 Usando conexão direta (porta 5432)..."

DATABASE_URL=$DIRECT_URL node --experimental-wasm-reftypes node_modules/.bin/prisma db pull

if [ $? -eq 0 ]; then
    echo "✅ Schema sincronizado com sucesso!"
    echo "🔨 Regenerando Prisma Client..."
    npm run db:generate
    echo "✅ Prisma Client regenerado!"
else
    echo "❌ Erro ao sincronizar. Verifique a URL do banco de dados."
    exit 1
fi
