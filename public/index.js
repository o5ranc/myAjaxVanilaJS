// 라우트 정의
const routes = {
  "/home": "/pages/home.html",
  "/tabcomp": "/pages/tabcomp.html",
  "/tablecomp": "/pages/tablecomp.html",
  "/cardcomp": "/pages/cardcomp.html",
  "/formcomp": "/pages/formcomp.html",
};

document.addEventListener("DOMContentLoaded", () => {
  initRouter();
  console.log("@@@ DOMContentLoaded!! 여기 타는지 부터 체크!!!");
});

/** 라우팅 초기화 및 메뉴 클릭 이벤트 등록 */
const initRouter = () => {
  // 초기 페이지 로드
  const path = window.location.pathname;
  if (routes[path]) {
    loadContent(path);
  }

  document.querySelectorAll("nav a").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault(); // 기본 링크 동작 방지
      const path = link.getAttribute("href");
      history.pushState(null, "", path); // URL 업데이트
      loadContent(path);
    });
  });
};

// 컨텐츠를 로드하는 함수
async function loadContent(path) {
  try {
    const response = await fetch(routes[path]);
    const content = await response.text();
    document.getElementById("content").innerHTML = content;
  } catch (error) {
    console.error("Error loading content:", error);
    document.getElementById("content").innerHTML =
      "<p>Error loading content</p>";
  }
}

// /** 페이지 이동 */
// const navigateTo = (page) => {
//   // pushState로 페이지 강제이동
//   history.pushState({ page }, "", `/${page}`);
//   const pathName = `/src/pages/${page}`;
//   console.log("[loadPage] pathName =====> ", pathName);
//   loadPage(pathName);
// };

// /** 동적 페이지 로드 */
// const loadPage = (page) => {
//   const fullPagePath = getFullPagePath(page);
//   const content = document.getElementById("content");

//   if (content === null) {
//     alert("content is null");
//     return;
//   }

//   fetch(fullPagePath)
//     .then((response) => {
//       console.log(`response : ${JSON.stringify(response)}`);
//       return response.text();
//     })
//     .then((html) => {
//       content.innerHTML = html;
//       return loadScript(`/public/js/${page}.js`);
//     })
//     .catch((error) => {
//       console.error("페이지 로딩 오류 : ", error);
//     });
// };

// /** 등록 스크립트 로드 */
// const loadScript = (src) => {
//   // const pageScript = document.querySelector(`script[src="${src}"]`);
//   // if(pageScript) pageScript.remove();

//   const script = document.createElement("script");
//   script.src = src;
//   document.body.appendChild(script);
// };

// const getFullPagePath = (page) => {
//   return `/src/pages/${page}.html`;
// };

// // 브라우저의 뒤로가기, 앞으로가기 이벤트 처리
// window.addEventListener("popstate", (event) => {
//   const page = event.state?.page || "home";
//   loadPage(page);
// });

// /** 초기 페이지 로드 */
// console.log("window.location.pathname =====> ", window.location.pathname);
// const initialPage = window.location.pathname.replace("/", "") || "home";
// loadPage(initialPage);
