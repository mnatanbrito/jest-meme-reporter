const terminal = require('terminal-image');
const jestValidate = require('jest-validate');

const GiphyService = require('./giphy-service');

class JestMemeReporter {
  constructor(globalConfig, options = {}) {
    if (!options.apiKey || typeof options.apiKey !== 'string') {
      this.shouldFail = true;
      this.errorMsg =
        "Provide an Giphy api key in the 'apiKey' option property.";
      return;
    }

    this.globalConfig = globalConfig;
    this.options = options;
    this.service = new GiphyService(this.options.apiKey);
    this.translationTerms = {
      fail: [
        'You have failed!',
        'My bad!',
        "I'm sorry four you!",
        'Not this time!'
      ],
      success: [
        'Congratulations, buddy!',
        'Well done!',
        'Good job!',
        'You rock!'
      ]
    };

    /**
     * If the first parameter has a property named 'testResults',
     * the script is being run as a 'testResultsProcessor'.
     * We then need to return the test results as they were received from Jest
     * https://facebook.github.io/jest/docs/en/configuration.html#testresultsprocessor-string
     */
    if (Object.prototype.hasOwnProperty.call(globalConfig, 'testResults')) {
      return this.generateMeme(
        globalConfig.testResults,
        this.options.apiKey
      ).then(meme => {
        // show depreaction message
        jestValidate.logValidationWarning(
          'Deprecation warning',
          'testResultsProcessor support is deprecated. Please use jest reporter. See https://github.com/jest-community/jest-junit#usage'
        );

        // return the globalObject as required by Jest
        return globalConfig;
      });
    }
  }

  onRunComplete(contexts, testResult) {
    if (process.env.NODE_ENV !== 'development') {
      console.warn(
        'This reporter is not intended to run in CI [NODE_ENV=test] environments!'
      );
      return Promise.resolve();
    }

    return this.generateMeme(testResult, this.options.apiKey).then(
      memeBuffer => {
        console.log(memeBuffer);
        return memeBuffer;
      }
    );
  }

  getLastError() {
    if (this.shouldFail) {
      return new Error(this.errorMsg);
    }
  }

  generateMeme(testResult) {
    console.log(`Finding the right meme for your test results 😁\n`);

    const success = testResult.numPassedTests === testResult.numTotalTests;
    const term = this.chooseTranslationTerm(success);

    return this.service.translateIntoMeme(term).then(response => {
      return terminal.buffer(response);
    });
  }

  chooseTranslationTerm(isSuccess) {
    const index = Math.floor(
      Math.random() * this.translationTerms.success.length
    );
    return isSuccess
      ? this.translationTerms.success[index]
      : this.translationTerms.fail[index];
  }
}

module.exports = JestMemeReporter;
