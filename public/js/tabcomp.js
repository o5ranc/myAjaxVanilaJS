console.log('탭 연습 페이지의 JS');

let activeTabName = '';

/** 탭 활성화 */
const setActiveTab = (tabName) => {
  console.log('타입 확인 >> ', typeof tabName, tabName);
  activeTabName = tabName;

  // 탭 이름으로 해당 탭 위치를 찾아서 내용 부분도 같이 활성화
  const tabButtons = document.querySelectorAll('.tab-buttons > .tab-item');
  const tabContents = document.querySelectorAll('.tab-contents > .tab-item');
  tabButtons.forEach((tabButton, index) => { 
    console.log('개별 탭 버튼 >> ', tabButton, tabName);
    if(tabButton.innerText === tabName) {
      tabButtons[index].classList.add('t-on');
      tabContents[index].classList.add('t-on');
    } else {
      tabButtons[index].classList.add('t-on');
      tabContents[index].classList.remove('t-on');
    }
  });
}

setActiveTab('탭메뉴1');

/** 탭버튼 클릭이벤트 달기 */ 
const tabButtons = document.querySelectorAll('.tab-buttons > .tab-item');
tabButtons.forEach(tabButton => {
  tabButton.addEventListener('click', e => {
    setActiveTab(e.target.innerText);
  });
});

