const Page = require('./page');

class CountryLangPage extends Page {

    get chooseCountry() {
        return $("select#country-select");
    }

    get inputLang () {
        return $("select#language-select");
    }

    get btnSubmit () {
        return $('//button[@type="submit"]');
    }

    async countryLang(country, lang) {
        await this.chooseCountry.selectByAttribute("value", country);
        await this.inputLang.selectByAttribute("value", lang);
        await this.btnSubmit.click();
    }

    open() {
        return super.open('chooseCountryLanguage');
    }
}

module.exports = new CountryLangPage();
