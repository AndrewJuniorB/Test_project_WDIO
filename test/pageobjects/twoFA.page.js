const Page = require('./page');

class TwoFactorVerification extends Page {

    get emailsNotEmpty() {
        return $('#twoFactor-verify-step1-primary-method');
    }

    get optionSelected () {
        return $('select#2fa-method-select');
    }

    get clickBtn () {
        return $('//button[@type="submit"]');
    }

    async sendCode(option) {
        await this.emailsNotEmpty.isDisplayed();
        await this.optionSelected.selectByAttribute("value", option);
        await this.clickBtn.click();
    }

    open () {
        return super.open("auth/finishlogin");
    }
}

module.exports = new TwoFactorVerification();