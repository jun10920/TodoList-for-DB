// import { setPersonalInfo } from '../components/Storage.js';
import Header from './Header.js';
import Mainpage from './MainPage.js';
import LoginPage from './LoginPage.js';
import SignupPage from './SignupPage.js';
// import NotFoundPage from './NotFound.js';

class App {
  constructor($body) {
    this.$body = $body;
    this.$body.setAttribute('class', 'bodycon');
    this.render();
  }
  render() {
    // header
    const header = new Header(this.$body);
    header.render();

    // main
    const main = document.createElement('main');
    main.setAttribute('class', 'page_content');
    this.$body.appendChild(main);

    // render page
    const mainpage = new Mainpage(main);
    mainpage.render();

    const loginPage = new LoginPage(main);
    loginPage.render();

    const signupPage = new SignupPage(main);
    // const notFoundPage = new NotFoundPage(main);

    const renderPage = (pathname) => {
      // // init main

      while (main.firstChild) {
        main.firstChild?.remove();
      }

      // switch page rendering
      switch (pathname) {
        case '/':
          mainpage.render();
          break;
        case '/login':
          loginPage.render();
          break;
        case '/signup':
          signupPage.render();
          break;
        default:
          mainpage.render();
      }
    };

    // init rendering
    renderPage(location.pathname);

    // handling header menu click event
    document.addEventListener('urlchange', (e) => {
      let pathname = e.detail.href;
      renderPage(pathname);
    });

    // handling browser popstate event
    window.addEventListener('popstate', (e) => {
      renderPage(location.pathname);
    });
  }
}
export default App;
