# farsifrenzy

Farsi variation of the famous word game 'Wordle', developed with React and words generated with GPT-4.

Available at: [(https://farsifrenzy.com](https://farsifrenzy.netlify.app/))

![farsifrenzy](https://github.com/ali-qasimi/farsifrenzy/assets/43767565/beffe678-345d-4994-8b11-29ec11ed8fbe)

## Run Locally
`npm run build` <br>
`npm run start`

## Features
- 4-letter daily words to guess, renewing midnight based on the client device's local time zone.
- At the end of the game, the word is provided with the pronunciation, translations and examples, all pre-generated with GPT-4.
- Client Local Storage used to track player stats including current streak, highest streak record, total plays, win-loss counts.
- GitHub Webhooks integrated to auto-deploy onto Netlify.
- Integrated with Google Analytics.

## To Do
- Currently there are ~365 words pre-generated with GPT-4. More supply for words required. (or make GPT API calls on demand? Key challenge here is that the generated words along with the translations, pronunciations and examples tend to go off track from the initial instructed JSON format, and the pronunciations are often in the heavy Iranian accent. Hence some intervention is often required to filter out any format discrepencies and convert the accent into formal Farsi.)
- Create easy mode with 3 letters, and hard mode with 5 letters.
- Adopt TDD, use jest for unit testing.
