const Page = require('./page');
const country = "US";
const language = "en-US";

class LoginPage extends Page {

    get inputEmails() {
        return $("#loginForm-email-input");
    }

    get inputPassword () {
        return $("#loginForm-password-input");
    }

    get btnSubmit () {
        return $('//button[@type="submit"]');
    }

    async login(username, password) {

        await this.inputEmails.setValue(username);
        await this.inputPassword.setValue(password);
        await this.btnSubmit.click();

    }

    open () {
        return super.open(`?lang=en-US&country=US&ck=0`);
    }
}

module.exports = new LoginPage();