/* 
settings.js collects all constants such as texts in a central js file. 
This means that the actual code does not become confusing. 
Typ: Constant from settings 
*/

// Styling: Tailwind rendering as a constant because we use it more then one.
const header = 'text-yellow font-bold text-l'

const text = 'mb-4 text-white text-l'

// texts for the settings
export const AGB = 
`Welcome to our drinking game app! Please read the following terms and conditions carefully before using our app.
\nTerms of use: By using our drinking game app, you agree to these Terms and Conditions. You are responsible for complying with local laws and regulations while using the app.
\nResponsible Drinking: We encourage responsible drinking. Please only use our app if you are of legal drinking age in your country. Drink responsibly and know your limits.
\nDisclaimer: The use of our drinking game app is at your own risk. We assume no responsibility for the actions of our users while drinking or other activities associated with the use of the app.
\Intellectual property: All content, including text, graphics, logos and software contained in our app are protected by copyright. You may not reproduce, modify or distribute this content without our express permission.
\nChanges to the GTC: We reserve the right to change or update these Terms and Conditions at any time. Please check our Terms and Conditions regularly to stay up to date.
\nContact us:If you have any questions or concerns about our drinking game app or these terms and conditions, please contact us at info@SipsterButton.de\n\nThank you for using our drinking game app! Have fun and drink responsibly`;

export const impressum = 
`sipster is a company of the
sipster UG 
Nobelstraße 10 
70569 Stuttgart 
\nRepresented by Lorenz Bauscher, Julia Ebert, Lars Gerigk, Maike König, Joel Starkov`;

export const datenschutz = 
`This Privacy Policy describes how we collect, use and protect personal data when you use our drinking game app.
\nData collection: We collect personal data that you provide to us when you use our drinking game app, including your username, email address and other information that you voluntarily provide to us.
\nUse of data: We use your personal data to improve your experience with our drinking game app and to inform you about updates or other relevant information. We do not share your data with third parties unless required by law or necessary for the fulfilment of our services.
\nPrivacy: We use appropriate security measures to protect your personal data and prevent unauthorised access, use or disclosure.
\nCookies and analytics: We may use cookies and similar tracking technologies to collect information about how our drinking game app is used in order to improve the user experience and perform analytics.
\nChanges to the privacy policy: We reserve the right to change or update this privacy policy at any time. Please check our privacy policy regularly to stay informed about changes.
\nContact us:If you have any questions or concerns about our Privacy Policy or the use of your personal information, please contact us at info@sipster.de.
\nBy using our drinking game app, you agree to this privacy policy. Thank you for using our app!`;

export const questions1 = "To log in, navigate to the login page and enter your login credentials (username and password). Then, click on the 'let's party' button to access your account.";
export const questions2 = "Each time you participate in games or events, you can earn Sips. Each event or game indicates how many Sips you will receive for successfully completing it."
export const questions3 = "If you need help or support, you can read the frequently asked questions (FAQs) or contact our support team directly by sending an email to info@sipster.com."

// bundled export of the individual string variables
export const settings = { header, text, questions1, questions2, questions3, impressum, datenschutz, AGB }