import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { MessageWsGateway } from './message-ws.gateway';
import { MessageWsService } from './message-ws.service';

@Module({
  providers: [MessageWsGateway, MessageWsService],
  imports: [AuthModule],
})
export class MessageWsModule {}
