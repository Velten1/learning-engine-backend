/// <reference types="node" />
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const questions = [
  "O que você descobriu que não sabia antes?",
  "Qual foi o maior desafio durante o estudo?",
  "Qual conexão inesperada você fez durante o estudo?",
  "O que você precisa praticar mais para dominar esse conteúdo?",
    "Qual conceito foi mais difícil de entender?",
    "Qual conceito foi mais fácil de entender?",
    "O que você achava que sabia, mas percebeu que não sabia?",
    "Qual parte do conteúdo exigiu mais esforço mental?",
    "Você conseguiu manter o foco durante todo o pomodoro?",
    "Em que momento você sentiu mais dificuldade de concentração?",
    "O que fez você se distrair, se houve distração?",
    "Qual foi o principal aprendizado desse pomodoro?",
    "Qual termo técnico novo você aprendeu hoje?",
    "O que ainda ficou confuso?",
    "Se tivesse mais tempo, o que você estudaria melhor?",
    "Qual foi o erro mais comum que você quase cometeu?",
    "O que você faria diferente se estudasse esse conteúdo novamente?",
    "Esse conteúdo se conecta com algo que você já sabia?",
    "Qual parte você conseguiria aplicar agora na prática?",
    "Qual parte você ainda não se sente confiante para aplicar?",
    "Você precisou reler ou rever algo mais de uma vez?",
    "Qual foi o momento de maior clareza durante o estudo?",
    "Qual foi o momento de maior confusão?",
    "O conteúdo foi mais teórico ou prático?",
    "Você sente que aprendeu de forma profunda ou superficial?",
    "Que pergunta você faria para um professor sobre esse conteúdo?",
    "Qual exemplo ajudou mais no entendimento?",
    "O que não foi explicado claramente no material?",
    "Qual parte exigiu mais raciocínio lógico?",
    "Qual parte exigiu mais memorização?",
    "Você conseguiu acompanhar o ritmo do estudo?",
    "O conteúdo estava no nível certo para você?",
    "O que você já dominava antes de começar esse pomodoro?",
    "O que você ainda precisa revisar depois?",
    "Qual conceito você consegue resumir em uma frase?",
    "Qual conceito você teria dificuldade de resumir?",
    "Você fez anotações? Elas ajudaram?",
    "O que você anotou que considera mais importante?",
    "O que você não anotou mas deveria ter anotado?",
    "Esse estudo te deixou mais confiante?",
    "Esse estudo te deixou com mais dúvidas?",
    "Qual parte você ensinaria primeiro para outra pessoa?",
    "Qual parte você deixaria para ensinar por último?",
    "O que te surpreendeu nesse conteúdo?",
    "O que você achou mais chato de estudar?",
    "O que você achou mais interessante de estudar?",
    "Esse conteúdo é essencial ou complementar?",
    "Onde esse conhecimento é mais usado na prática?",
    "Em qual situação real você aplicaria isso?",
    "Você conseguiu visualizar mentalmente o que estava estudando?",
    "Qual analogia ajudaria a entender esse conteúdo?",
    "O que você ainda não consegue explicar em voz alta?",
    "O que você explicaria com facilidade?",
    "Esse conteúdo depende muito de conhecimento prévio?",
    "Qual pré-requisito você sente que precisa reforçar?",
    "Qual parte você gostaria de aprofundar futuramente?",
    "Qual parte você considera menos relevante?",
    "Você sente que esse estudo valeu o tempo investido?",
    "O que tornaria esse estudo mais eficiente?",
    "Você mudou sua opinião sobre esse assunto?",
    "O que você achava que era simples, mas não é?",
    "O que você achava que era difícil, mas não é?",
    "Qual detalhe pequeno faz muita diferença nesse conteúdo?",
    "Qual erro conceitual você precisa evitar?",
    "O que você confundiu inicialmente?",
    "O que ficou claro logo de início?",
    "Você conseguiu seguir uma linha lógica no conteúdo?",
    "Em qual parte você se perdeu?",
    "O conteúdo foi bem estruturado?",
    "Qual ordem faria mais sentido para estudar esse tema?",
    "O que você precisa pesquisar depois desse pomodoro?",
    "Qual pergunta esse estudo respondeu?",
    "Qual pergunta esse estudo gerou?",
    "Você conseguiu conectar teoria e prática?",
    "Onde a teoria falha em explicar a prática?",
    "Onde a prática ajuda a entender a teoria?",
    "Qual parte exige mais experiência para dominar?",
    "Qual parte um iniciante consegue entender?",
    "Qual parte você só entenderá com mais tempo?",
    "Esse conteúdo se repete em outros temas?",
    "Esse conteúdo é base para outros aprendizados?",
    "Qual conceito é fundamental aqui?",
    "Qual conceito é secundário?",
    "Você sente que avançou em relação ao último estudo?",
    "O que mostra que você evoluiu?",
    "O que mostra que você ainda precisa melhorar?",
    "Qual foi o maior ganho desse pomodoro?",
    "Qual foi a maior dificuldade desse pomodoro?",
    "O que você faria se tivesse que estudar isso amanhã de novo?",
    "Que tipo de exercício ajudaria nesse conteúdo?",
    "Que tipo de exemplo faltou?",
    "Qual parte você ignorou sem perceber?",
    "Qual parte merece mais atenção no futuro?",
    "O que você não entendeu por falta de base?",
    "O que você entendeu graças a estudos anteriores?",
    "Qual foi o ponto mais técnico?",
    "Qual foi o ponto mais conceitual?",
    "Esse estudo te motivou a continuar?",
    "Esse estudo te cansou mentalmente?",
    "Em que nível você colocaria seu entendimento agora?",
    "O que falta para chegar ao próximo nível?",
    "O que você aprendeu que pode usar imediatamente?",
    "O que você só poderá usar mais para frente?",
    "Qual parte você precisaria revisar antes de uma prova?",
    "Qual parte você lembra sem consultar material?",
    "Qual parte você esquece com facilidade?",
    "O que você entendeu melhor lendo?",
    "O que você entendeu melhor praticando?",
    "O que você entendeu melhor assistindo?",
    "Qual formato de estudo funcionou melhor?",
    "Qual formato de estudo funcionou pior?",
    "O que você mudaria no seu método de estudo?",
    "O que você manteria no seu método de estudo?",
    "Qual foi o maior obstáculo interno?",
    "Qual foi o maior obstáculo externo?",
    "Você conseguiu manter consistência?",
    "Você quebrou o ritmo em algum momento?",
    "O que te ajudou a voltar ao foco?",
    "O que mais atrapalhou seu foco?",
    "Qual conceito você precisa revisar amanhã?",
    "Qual conceito você pode considerar dominado?",
    "O que você ainda não consegue resolver sozinho?",
    "O que você já consegue resolver sem ajuda?",
    "Esse estudo te aproximou do seu objetivo?",
    "O que ainda te distancia do seu objetivo?",
    "Qual parte você subestimou?",
    "Qual parte você superestimou?",
    "Qual aprendizado foi inesperado?",
    "Qual aprendizado foi óbvio?",
    "Qual conceito você confundiu com outro?",
    "O que ajudou a desfazer essa confusão?",
    "Qual foi o insight mais importante?",
    "Qual foi o insight mais simples?",
    "O que você faria diferente no próximo pomodoro?",
    "O que você repetiria no próximo pomodoro?",
    "O que você percebeu sobre sua forma de aprender?",
    "O que esse estudo revelou sobre suas dificuldades?",
    "O que esse estudo revelou sobre seus pontos fortes?",
    "O que você faria se tivesse que ensinar isso hoje?",
    "O que você precisaria estudar antes de ensinar?",
    "Qual parte ainda parece abstrata?",
    "Qual parte parece concreta?",
    "Qual parte depende mais de prática?",
    "Qual parte depende mais de teoria?",
    "Esse conteúdo exige mais tempo do que você esperava?",
    "Esse conteúdo foi mais rápido do que você esperava?",
    "Qual foi o melhor momento do estudo?",
    "Qual foi o pior momento do estudo?",
    "O que você faria para melhorar sua compreensão?",
    "O que você faria para melhorar sua retenção?",
    "Qual conceito você lembra sem esforço?",
    "Qual conceito exige esforço para lembrar?",
    "Esse estudo mudou sua forma de pensar?",
    "Esse estudo reforçou algo que você já acreditava?",
    "Qual parte você dominou mais do que esperava?",
    "Qual parte você dominou menos do que esperava?",
    "O que você considera essencial revisar?",
    "O que você considera opcional revisar?",
    "Qual conceito você precisa ver em outro material?",
    "Qual conceito foi bem explicado nesse material?",
    "O que você sentiu ao finalizar esse pomodoro?",
    "Você sente progresso real?",
    "Qual foi o principal aprendizado emocional?",
    "Qual foi o principal aprendizado técnico?"
  ]
  

async function main() {
  console.log('Iniciando seed de questões...')
  console.log(`Total de questões a processar: ${questions.length}`)
  
  let created = 0
  let skipped = 0
  let errors = 0
  
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i]
    
    try {
      // Verificar se a questão já existe no banco
      const existing = await prisma.question.findFirst({
        where: { text: question }
      })
      
      if (existing) {
        skipped++
        if ((i + 1) % 20 === 0) {
          console.log(`Processando... ${i + 1}/${questions.length}`)
        }
        continue
      }
      
      // Criar a questão apenas se não existir
      await prisma.question.create({
        data: {
          text: question,
          isActive: true,
        },
      })
      
      created++
      
      // Log de progresso a cada 20 questões
      if ((i + 1) % 20 === 0) {
        console.log(`Processando... ${i + 1}/${questions.length}`)
      }
    } catch (error: any) {
      errors++
      const questionPreview = question.length > 50 
        ? `${question.substring(0, 50)}...` 
        : question
      console.error(`Erro ao criar questão ${i + 1}: "${questionPreview}"`)
      console.error(`Erro: ${error.message}`)
      // Continua processando as próximas questões mesmo se uma falhar
    }
  }
  
  // Resumo final
  console.log('\nSeed concluído!')
  console.log(`${created} questões criadas`)
  console.log(`${skipped} questões já existiam (puladas)`)
  if (errors > 0) {
    console.log(`${errors} erros encontrados`)
  }
  console.log(`Total processado: ${questions.length} questões\n`)
}

main()
  .catch((e) => {
    console.error('\nErro fatal durante o seed:')
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })