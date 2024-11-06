

document.addEventListener('DOMContentLoaded', () => {
  initRouter();
})

/** 라우팅 초기화 및 메뉴 클릭 이벤트 등록 */
const initRouter = () => {
  const contnet = document.getElementById('content');

  contnet.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', e => {
      // 쿨릭이벤트의 실제적인 동작은 막기용
      e.preventDefault();
      const page = e.target.getAttribute('href');
      navigateTo(page);
      console.log('initRouter =====> ', initRouter);
    });
  })
}

/** 페이지 이동 */
const navigateTo = (page) => {
  // pushState로 페이지 강제이동
  history.pushState({ page }, '', `/${page}`);
  const pathName = `/src/pages/${page}`;
  console.log('[loadPage] pathName =====> ', pathName)
  loadPage(pathName);
}

/** 동적 페이지 로드 */
const loadPage = (page) => {
  const fullPagePath = getFullPagePath(page);
  const content = document.getElementById('content');
  
  if(content === null) {
    alert('content is null');
    return;
  }

  fetch(fullPagePath)
    .then(response => {
      console.log(`response : ${JSON.stringify(response)}`)
      return response.text()
    })
    .then(html => {
      content.innerHTML = html;
      return loadScript(`/src/js/${page}.js`);
    })
    .catch(error => {
      console.error('페이지 로딩 오류 : ', error);
    });
}

/** 등록 스크립트 로드 */
const loadScript = (src) => {
  // const pageScript = document.querySelector(`script[src="${src}"]`);
  // if(pageScript) pageScript.remove();

  const script = document.createElement('script');
  script.src = src;
  document.body.appendChild(script);
}

const getFullPagePath = (page) => {
  return `/src/pages/${page}.html`;
}

// 브라우저의 뒤로가기, 앞으로가기 이벤트 처리
window.addEventListener('popstate', (event) => {
  const page = event.state?.page || 'home';
  loadPage(page);
});

/** 초기 페이지 로드 */
console.log('window.location.pathname =====> ', window.location.pathname)
const initialPage = window.location.pathname.replace('/', '') || 'home';
loadPage(initialPage);
