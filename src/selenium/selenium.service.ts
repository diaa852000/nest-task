import { Injectable } from '@nestjs/common';
import { By, Key, until, Browser, Builder } from 'selenium-webdriver'

@Injectable()
export class SeleniumService {

    constructor() {
        this.initalize();
    }

    async initalize() {
        const driver = await new Builder().forBrowser(Browser.CHROME).build()
        try {
            await driver.get('https://www.google.com/webhp?hl=ar&ictx=2&sa=X&ved=0ahUKEwik_L3Z1NOHAxXygP0HHT-4AfYQPQgJ')
            await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN)
            await driver.wait(until.titleIs('webdriver - Google Search'), 1000)

        } catch (e) {
            console.log(e.message)
        } finally {
            if (driver) {
                await driver?.quit();
            }
        }

    }
}
