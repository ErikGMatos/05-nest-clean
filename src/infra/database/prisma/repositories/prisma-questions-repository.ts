import { PaginationParams } from '@/core/repositories/pagination-params'
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { Question } from '@/domain/forum/enterprise/entities/question'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { PrismaQuestionMapper } from '../mappers/prisma-question-mapper'

@Injectable()
export class PrismaQuestionsRepository implements QuestionsRepository {
  constructor(private prismaService: PrismaService) {}

  async findById(id: string): Promise<Question | null> {
    const question = await this.prismaService.question.findUnique({
      where: {
        id,
      },
    })
    if (!question) {
      return null
    }
    return PrismaQuestionMapper.toDomain(question)
  }

  findBySlug(slug: string): Promise<Question | null> {
    throw new Error('Method not implemented.')
  }

  create(answer: Question): Promise<void> {
    throw new Error('Method not implemented.')
  }

  delete(answer: Question): Promise<void> {
    throw new Error('Method not implemented.')
  }

  save(answer: Question): Promise<void> {
    throw new Error('Method not implemented.')
  }

  findManyRecent(params: PaginationParams): Promise<Question[]> {
    throw new Error('Method not implemented.')
  }
}
