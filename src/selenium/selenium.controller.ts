import { SeleniumService } from './selenium.service';
import { Controller, Get } from '@nestjs/common';

@Controller('selenium')
export class SeleniumController {
    constructor(private readonly seleniumService: SeleniumService) { }

    @Get('test')
    async testSelenium() {
        await this.seleniumService.initalize();
    }
}
