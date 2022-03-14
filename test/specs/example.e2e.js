const CountryLangPage = require('../pageobjects/country.lang.page.js');
const LoginPage = require('../pageobjects/login.page.js');
const TwoFactorVerification = require('../pageobjects/twoFA.page.js')
// const SecurePage = require('../pageobjects/secure.page');
const userName = "codechallengeadc@outlook.com";
const password = "P@ssword$12";
const option = "1";


describe('Dropdown elements: English language, USA country', () => {
    it('should choose US and English', async () => {
        await CountryLangPage.open();
        browser.pause(3000);
        await CountryLangPage.countryLang("US", "en-US");
    });
});


describe('My Login application', () => {
    it('Should login with valid credentials', async () => {
        await LoginPage.open();
        browser.pause(3000);
        await LoginPage.login(userName, password);
        browser.pause(3000);
        const link = $(`a`);
        await expect(link).toHaveHref('https://pro.libreview.io/articles/min-requirements?lang=en-US&country=US');
        LoginPage.btnSubmit.click();
        // await expect(SecurePage.flashAlert).toBeExisting();
        // await expect(SecurePage.flashAlert).toHaveTextContaining(
        //     'You logged into a secure area!');
    });
});

describe('Send 2FA verification code', () => {
    it('Should detect if send code button clickable', async () => {
        let el = $(`//button[@type="submit"]`);
        let clickable = await el.isClickable();
        console.log(clickable);
        // wait for element to be clickable
        await browser.waitUntil(() => el.isClickable());
    });
    it('Should send code by click Send Code button', async() => {
        TwoFactorVerification.sendCode(option);
        let verify = $('#twoFactor-step2-code-input');
        console.log("VERIFY=-=-=-=-=-=-", await verify.isDisplayed());
        // wait for element to be clickable
        // browser.waitUntil(() => verify.isDisplayed());
        TwoFactorVerification.clickBtn.click();
    });

    it('Verify and Log in should be disabled', async() =>{
        let elem = $(`#twoFactor-step2-next-button`);
        let enabled = elem.isEnabled();
        console.log("ENABLED ??? =-=-=-=-=-=-", await enabled);
        browser.debug();
        await browser.pause(1000);
    });

});

describe("verify we able to fetch verification code from Outlook", () => {
    it('Should open a new outlook tab', async () => {
        browser.pause(5000);
        await browser.url('https://login.live.com/')
        // console.log(await browser.getTitle()) // outputs: "Sign in to your Microsoft account"

        // const handles = await browser.getWindowHandles()
        // await browser.switchToWindow(handles[1])
        // await browser.closeWindow()
        // await browser.switchToWindow(handles[0])
        // console.log(await browser.getTitle()) // outputs: "Sign in to your Microsoft account"
    });
});


