import { SeleniumController } from './selenium.controller';
import { SeleniumService } from './selenium.service';
import { Module } from '@nestjs/common';

@Module({
    providers: [SeleniumService],
    controllers: [SeleniumController]
})
export class SeleniumModule {}
