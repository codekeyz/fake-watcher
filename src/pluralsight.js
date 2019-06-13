async function login(page, course) {
  console.log('logining in');
  course = course.split('/').join('%2F');
  await page.goto(`https://app.pluralsight.com/id?redirectTo=${course}`, {
    timeout: 0
  });
  await page.type('#Username', process.env.EMAIL);
  await page.type('#Password', process.env.PASSWORD);
  await page.screenshot({ path: 'screenshot/login.png' });
  await page.click('[id="login"]');
  await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 0 });
}

async function openCourse(page) {
  console.log('opening course');
  await page.click('[class = "button button--medium course-hero__button"]');
  await page.screenshot({ path: 'screenshot/open_course.png' });
  await sleep(10000);
}

async function watchCourse(page, wait = 3000) {
  await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 0 });
  console.log('watching course');
  await page.screenshot({ path: 'screenshot/watch_course.png' });
  await sleep(wait);
}

function sleep(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

module.exports = { login, watchCourse, openCourse };
