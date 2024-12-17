/**
 * window 이벤트들 ===================================================
 */

// 브라우저의 뒤로가기, 앞으로가기 이벤트 처리
window.addEventListener("popstate", (event) => {
  const page = event.state?.page || "home";
  loadPage(page);
});

/** 초기 페이지 로드 */
const initialPage = window.location.pathname.replace("/", "") || "home";
loadPage(initialPage);

//===================================================================

/** 라우팅 초기화 및 메뉴 클릭 이벤트 등록 */
export const initRouter = () => {
  const contnet = document.getElementById("content");

  contnet.querySelectorAll("nav a").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const page = e.target.getAttribute("href");
      navigateTo(page);
    });
  });
};

/** 페이지 이동 */
const navigateTo = (page) => {
  history.pushState({ page }, "", `/${page}`);
  loadPage(page);
};

/** 동적 페이지 로드 */
const loadPage = (page) => {
  const content = document.getElementById("content");
  fetch(page)
    .then((response) => response.text())
    .then((html) => {
      content.innerHTML = html;
      console.log(`page : ${page}`);
      loadScript(`/js/${page}.js`);
    })
    .catch((error) => {
      console.error("페이지 로딩 오류 : ", error);
    });
};

/** 등록 스크립트 로드 */
const loadScript = (src) => {
  const pageScript = document.querySelector(`script[src="${src}"]`);
  if (pageScript) pageScript.remove();

  const script = document.createElement("script");
  script.src = src;
  document.body.appendChild(script);
};
