import { AnswerAttachmentsRepository } from '@/domain/forum/application/repositories/answer-attachments-repository'
import { AnswerAttachment } from '@/domain/forum/enterprise/entities/answer-attachment'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { PrismaAnswerAttachmentMapper } from '../mappers/prisma-answer-attachment-mapper'

@Injectable()
export class PrismaAnswerAttachmentsRepository
  implements AnswerAttachmentsRepository
{
  constructor(private prismaService: PrismaService) {}

  async findManyByAnswerId(answerId: string): Promise<AnswerAttachment[]> {
    const answerAttachments = await this.prismaService.attachment.findMany({
      where: {
        answerId,
      },
    })

    return answerAttachments.map(PrismaAnswerAttachmentMapper.toDomain)
  }

  async deleteManyByAnswerId(answerId: string): Promise<void> {
    await this.prismaService.attachment.deleteMany({
      where: {
        answerId,
      },
    })
  }

  async createMany(attachments: AnswerAttachment[]) {
    if (attachments.length === 0) {
      return
    }

    const data = PrismaAnswerAttachmentMapper.toPrismaUpdatemany(attachments)

    await this.prismaService.attachment.updateMany(data)
  }

  async deletemany(attachments: AnswerAttachment[]) {
    if (attachments.length === 0) {
      return
    }

    const attachmentsIds = attachments.map((attachment) =>
      attachment.id.toString(),
    )

    await this.prismaService.attachment.deleteMany({
      where: {
        id: {
          in: attachmentsIds,
        },
      },
    })
  }
}
