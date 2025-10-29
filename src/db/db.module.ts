import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),

    TypeOrmModule.forRoot({
      type: 'postgres',
      autoLoadEntities: true,
      url: process.env.DATABASE_URL, 
      synchronize: true, 
      ssl: {
        rejectUnauthorized: false, // Neon host required
      },
    }),
  ],
})
export class DatabaseModule {}