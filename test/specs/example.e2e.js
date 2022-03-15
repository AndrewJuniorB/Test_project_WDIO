const CountryLangPage = require('../pageobjects/country.lang.page.js');
const LoginPage = require('../pageobjects/login.page.js');
const TwoFactorVerification = require('../pageobjects/twoFA.page.js');
// Testing variables
const userName = "codechallengeadc@outlook.com";
const password = "P@ssword$12";
const pswOutlook = "P@ssword$1234";
const option = "1";
let code;

// TESTS
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

        // Enter email
        await $('#i0116').setValue(userName);
        await browser.pause(2000);

        // Clcik Next
        let next = $(`#idSIButton9`);
        await next.click();
        await browser.pause(2000);

        // Password
        await $('#i0118').setValue(pswOutlook);
        await browser.pause(5000);
        await $(`#idSIButton9`).click();
        await browser.pause(3000);
    });

    // Here should be test when user login to Outlook Email;
    it('Should select option yes/No for Stay signed in', async () => {
        await $(`#idBtn_Back`).click();
        // Next Click on Inbox and select email from libreview
        await browser.newWindow('https://outlook.live.com/mail/0/inbox')
        const handles = await browser.getWindowHandles();
        console.log('HANDLESTITLE --=-=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=', handles);
        await browser.pause(5000);
        let latest = $("span._2hJ6aXqUdsgXw2vXjJfAzj");
        await latest.click();
        let yourCodeIs = $(`//*[@id="x_backgroundTable"]/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/table[2]/tbody/tr/td/table[2]/tbody/tr[2]/td`);
        code = await yourCodeIs.getText();
        code = code.slice(code.length - 6);
        await console.log("CODE =============================", code);
        await browser.pause(5000);
        // switch back via title match
        // Switch to Verification page and set code libreview window;
        await browser.switchWindow('LibreView');
        await browser.pause(5000);
        let codeInput = $('#twoFactor-step2-code-input');
        await browser.pause(5000);
        await codeInput.setValue(code);
        let verifyAndLogin = $('#twoFactor-step2-next-button');
        await browser.pause(3000);
        verifyAndLogin.click();
        await browser.pause(3000);
    });

    it('Verifying page contains a button “Press to Begin Upload”', async () => {
        await browser.switchWindow('LibreView');
        let downloadBtn = $('#meterUpload-linkedUpload-pat-button');
        console.log(await downloadBtn.isDisplayed());
    });

});


