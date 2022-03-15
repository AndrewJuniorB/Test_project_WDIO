const CountryLangPage = require('../pageobjects/country.lang.page.js');
const LoginPage = require('../pageobjects/login.page.js');
const TwoFactorVerification = require('../pageobjects/twoFA.page.js');

// const SecurePage = require('../pageobjects/secure.page');
const userName = "codechallengeadc@outlook.com";
const password = "P@ssword$12";
const pswOutlook = "P@ssword$1234";
const option = "1";


describe('Dropdown elements: English language, USA country', () => {
    it('should choose US and English', async () => {
        await CountryLangPage.open();
        await browser.pause(3000);
        await CountryLangPage.countryLang("US", "en-US");
    });
});


describe('My Login application', () => {
    it('Should login with valid credentials', async () => {
        await LoginPage.open();
        await browser.pause(3000);
        await LoginPage.login(userName, password);
        await browser.pause(3000);
        const link = $(`a`);
        await expect(link).toHaveHref('https://pro.libreview.io/articles/min-requirements?lang=en-US&country=US');
        await LoginPage.btnSubmit.click();
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
    it('Should send code by click Send Code button', async () => {
        await TwoFactorVerification.sendCode(option);
        let verify = $('#twoFactor-step2-code-input');
        await browser.waitUntil(() => verify.isDisplayed());
        await TwoFactorVerification.clickBtn.click();
    });

    it('Verify and Log in should be disabled', async () => {
        let elem = $('#twoFactor-step2-next-button');
        let enabled = elem.isEnabled();
        await browser.pause(1000);
    });

});

describe("Verify we able to fetch verification code from Outlook", () => {
    it('Should open a new outlook tab', async () => {
        await browser.pause(3000);
        // create new window
        await browser.newWindow('https://login.live.com/')
        await browser.pause(3000);
        await console.log("TITLE --=-=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=", await browser.getTitle()) // outputs: "Sign in to your Microsoft account"
    });

    it('Should login into Outlook with valid user credentials', async () => {
        const handles = await browser.getWindowHandles();
        console.log('HANDLESTITLE --=-=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=', handles);
        // Enter email
        await $('#i0116').setValue(userName);
        await browser.pause(3000);
        // Clcik Next
        let next = $(`#idSIButton9`);
        await next.click();
        await browser.pause(3000);

        // Password
        await $('#i0118').setValue(pswOutlook);
        await browser.pause(5000);
        await $(`#idSIButton9`).click();
        await browser.pause(3000);
    });

    // Here should be test when user login to Outlook Email;
    it('Should select option yes/No for Stay signed in', async() => {
        await $(`#idSIButton9`).click();
        await browser.pause(3000);
        await browser.url('https://outlook.live.com/mail/0/');
        await browser.pause(3000);
        let spanText = await $('span');
        console.log('SPAN TEXT=====================================>', await spanText.getText());
        let text = await spanText.getText();
        let globalRegex = new RegExp('code is:*', 'g');
        console.log('INDEX ======================>', globalRegex.lastIndex)
        await browser.debug();


        // switch back via title match
        await browser.switchWindow('LibreView')
    });


    // Next Click on Inbox and select email from libreview
    // Within email where by selector copy or send value to libreview window;


});


