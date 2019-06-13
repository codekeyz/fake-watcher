const puppeteer = require('puppeteer');
const pluralsight = require('./pluralsight');

async function bootstrap(course = process.env.WATCHURL) {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  let pages = await browser.pages();

  await pluralsight.login(pages[0], course);

  await pluralsight.openCourse(pages[0]);

  pages = await browser.pages();

  await pluralsight.watchCourse(pages[1], 3600000);

  await browser.close();

  return true;
}

bootstrap()
  .then(result =>
    console.log(
      result
        ? 'Video Watched successfully'
        : 'An error occurred while processing'
    )
  )
  .catch(err => console.log(err));
