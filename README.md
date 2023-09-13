# 📊 Region Time Chart

<br />

> 원티드 프리온보딩 인턴십 4주차 개인 과제 <br>
> 주어진 데이터를 기반으로 시계열 차트를 보여주는 사이트입니다.

<br />

![ezgif com-video-to-gif (8)](https://github.com/mihyunLee/region-time-chart/assets/51310674/1b16e7ac-f155-4d8a-9168-15380d6ea236)

<br />
<br />

# 🚀 Getting Started

## 배포 링크

https://time-series-charts-by-region.vercel.app/

> 배포 링크가 되지 않는다면 아래의 순서대로 프로젝트를 실행시켜 주세요.

## 설치

```
$ git clone https://github.com/mihyunLee/region-time-chart.git
$ npm install
```

## 실행

```
$ npm start
```

<br />

# ✅ 과제 요구사항

1. 시계열 차트 만들기
   - 주어진 JSON 데이터의 `key`값(시간)을 기반으로 시계열 차트 구현
   - 하나의 차트 안에 Area 형태의 그래프와 Bar 형태의 그래프가 모두 존재하는 복합 그래프로 구현
   - Area 그래프의 기준값은 `value_area` 값을 이용
   - Bar 그래프의 기준값은 `value_bar` 값을 이용
   - 차트의 Y축에 대략적인 수치 표현
2. 호버 기능 구현
   - 특정 데이터 구역에 마우스 호버시 `id, value_area, value_bar` 데이터를 툴팁 형태로 제공
3. 필터링 기능 구현
   - 필터링 기능을 구현, 필터링은 특정 데이터 구역을 하이라이트 하는 방식
   - 필터링 기능은 버튼 형태로 ID값(지역이름)을 이용
   - 필터링 시 버튼에서 선택한 ID값과 동일한 ID값을 가진 데이터 구역만 하이라이트 처리
   - 특정 데이터 구역을 클릭 시에도 필터링 기능과 동일한 형태로 동일한 ID값을 가진 데이터 구역을 하이라이트

<br>

## 1. 시계열 차트 만들기

### Assignment 1. 주어진 JSON 데이터의 key값(시간)을 기반으로 시계열 차트 구현

- [x] 하나의 차트안에 Area 형태의 그래프와 Bar 형태의 그래프가 모두 존재하는 복합 그래프
- [x] Area 그래프의 기준값은 `value_area` 값을 이용
- [x] Bar 그래프의 기준값은 `value_bar` 값을 이용

<b>💠 차트 라이브러리 선정</b>

> Chart.js + react-chartjs-2

Chart.js는 무료로 제공되는 라이브러리이며, 타 라이브러리 대비 간편하게 사용할 수 있습니다. 또한 `<canvas>`를 베이스로 빠른 렌더링이 가능하며 라이브러리 용량 자체가 작기 때문에 요구사항에 있는 Area, Bar 그래프만을 구현하기에 적합하다고 판단하였습니다.

또한 D3.js를 사용하기 쉽게 만든 C3.js와 비교했을 경우 Chart.js의 star 수가 높고, 지속적인 업데이트가 이뤄지고 있고 공식 문서가 참고하기 편하게 되어 차트 라이브러리로 선정하였습니다.

<b>💠 데이터 가공하기</b>

주어진 db.json의 형태는 아래와 같습니다.

Chart.js에 데이터를 props로 편하기 전달하기 위해서 response의 데이터들을 배열 형태로의 변환이 필요해 보였습니다.

```typescript
{
  "type": "Mock data",
  "version": 1,
  "response": {
    "2023-02-01 14:32:00": {
      "id": "성북구",
      "value_area": 46,
      "value_bar": 13111
    },
    "2023-02-01 14:32:05": {
      "id": "강남구",
      "value_area": 9,
      "value_bar": 19143
    },
    "2023-02-01 14:32:10": {
      "id": "노원구",
      "value_area": 79,
      "value_bar": 14798
    },

	//...
}
```

따라서 response의 형식을 변경해주는 `formatResponseData()` 유틸 함수를 만들어 각각의 객체를 배열로 저장할 수 있는 로직을 구현하였습니다.
https://github.com/mihyunLee/region-time-chart/blob/5673838c58a0ac24c63760bdb77731b8a1ea39ab/src/utils/chartData/index.ts#L10-L22

```typescript
// ✅ 사용하기
const data = {
  '2023-02-01 14:32:00': {
    id: '성북구',
    value_area: 46,
    value_bar: 13111,
  },
  '2023-02-01 14:32:05': {
    id: '강남구',
    value_area: 9,
    value_bar: 19143,
  },
};

formatResponseData(data);
/*
[
  {
    '2023-02-01 14:32:00':
    { 
      id: '성북구',
      value_area: 46,
      value_bar: 13111
    }
  },
  {
    '2023-02-01 14:32:05':
      { 
        id: '강남구',
        value_area: 9,
        value_bar: 19143
      }
  }
]
*/
```

<b>💠 Chart datasets에 적용하기</b>

Chart.js는 데이터를 [사용자 정의 객체 타입으로 정의](https://www.chartjs.org/docs/latest/general/data-structures.html#object-using-custom-properties)해서 사용할 수 있기 때문에 직접 필요한 데이터 형태로 변환하는 `formatChartData()` 유틸 함수를 만들어 데이터를 변환 후 사용하였습니다.

차트에는 표시되지 않지만, 추후 필터링 기능과 툴팁에 데이터의 `id` 프로퍼티 값을 표시해야 하므로 차트가 해당 값을 가지고 있어야 합니다. 따라서 `id`의 값도 저장하여 반환하였습니다.

- formatChartData()
  https://github.com/mihyunLee/region-time-chart/blob/5673838c58a0ac24c63760bdb77731b8a1ea39ab/src/utils/chartData/index.ts#L24-L43

- Chart datasets의 데이터에 할당
  https://github.com/mihyunLee/region-time-chart/blob/5673838c58a0ac24c63760bdb77731b8a1ea39ab/src/hooks/useChartData.ts#L14-L26

### Assignment 2. 차트의 Y축에 대략적인 수치 표현

> 차트의 Y축에 대한 수치는 `scales` 옵션을 사용하여 구현하였습니다.

https://github.com/mihyunLee/region-time-chart/blob/5673838c58a0ac24c63760bdb77731b8a1ea39ab/src/constants/index.ts#L61-L88

<br>

## 2. 호버 기능 구현

### Assignment 3. 특정 데이터 구역에 마우스 호버시 `id, value_area, value_bar` 데이터를 툴팁 형태로 제공

<b>✨ 구현 방식</b>

> 현재 차트는 `value_area`, `value_bar` 수치를 기반으로 그려졌기 때문에 기본적으로 툴팁에는 `id`가 포함되지 않습니다. <br> 따라서 tooltip의 `callback` 옵션을 활용하여 호버되는 context의 id 값을 가져와 툴팁에 표시해주었습니다.

https://github.com/mihyunLee/region-time-chart/blob/5673838c58a0ac24c63760bdb77731b8a1ea39ab/src/constants/index.ts#L46-L59

<br>

## 3. 필터링 기능 구현

### Assignment 4. 특정 데이터 구역을 하이라이트하는 방식으로 필터링 구현

- [x] 필터링 기능은 버튼 형태로 ID값(지역이름)을 이용
- [x] 필터링 시 버튼에서 선택한 ID값과 동일한 ID값을 가진 데이터 구역만 하이라이트 처리
- [x] 특정 데이터 구역을 클릭 시에도 필터링 기능과 동일한 형태로 동일한 ID값을 가진 데이터 구역을 하이라이트

<b>💠 버튼 형태로 ID값(지역이름) 이용하기</b>

> props로 전달되는 chartDataList의 id 값을 뽑아보면 중복된 id 값을 가진 배열이 반환되기 때문에 필터링 조건인 지역을 버튼의 텍스트 값으로 사용하기 위해서는 중복을 제거할 필요가 있었습니다. <br>
> 중복을 제거하는 방식은 여러 가지가 있지만 간단한 배열의 중복을 제거하는 것으로 `Set` 자료구조를 사용하였습니다. <br>
> 중복을 제거한 id를 담은 `Set` 객체에 배열 메서드인 `map` 을 사용해야하므로 스프레드 연산자를 사용해주었습니다.

```typescript
export default function FilterTabs({ chartDataList, setSelectedId }: IProps) {
  const { ids } = formatChartData(chartDataList);

  console.log(ids);

  /*
    Array(100)['성북구', '강남구', '노원구', '중랑구', '노원구', '성북구', '중랑구', 
    '강남구', '성북구', '노원구', '강남구', '강남구', '중랑구', '중랑구',
    '강남구', '강남구', ... ]
  */
}
```

https://github.com/mihyunLee/region-time-chart/blob/5673838c58a0ac24c63760bdb77731b8a1ea39ab/src/components/FilterTabs.tsx#L13C1-L27C12

<b>💠 선택한 id에 따라 Bar Chart 배경색 변경하기</b>

> 버튼을 클릭하게 되면 버튼의 텍스트(id)가 `selectedId` 상태값으로 저장됩니다.
> 선택한 id 값과, 선택되었을 때의 색상, 기본 색상을 매개변수로 받아 배경색을 설정하는 `setBackgroundForBar()` 유틸 함수를 만들었습니다. <br> 클릭한 `ctx`의 id 값과 선택한 id 값에 따라 배경색을 반환해주는 로직을 가지고 있습니다.
> `ctx`의 타입은 Chart.js에서 제공하는 [ScriptableContext](https://www.chartjs.org/docs/latest/api/interfaces/ScriptableContext.html) 타입을 정의하고, 타입스크립트가 `raw` 프로퍼티의 타입 추론하지 못하여 타입 단언을 하게 되었습니다.

https://github.com/mihyunLee/region-time-chart/blob/5673838c58a0ac24c63760bdb77731b8a1ea39ab/src/utils/setBackgroundForBar.ts#L11C1-L25

<b>💠 특정 데이터 구역 클릭시 필터링 기능 구현</b>

> Chart.js에서 제공하는 `getElementAtEvent()` 함수를 통해 마우스 이벤트가 발생한 요소의 dataset을 가져와 해당 id 값을 `selectedId` 상태 값으로 저장하면 `setBackgounrdForBar()`에 의해 배경색이 변경됩니다.

<br>

<b>🤔 트러블 슈팅</b>

> 문제 사항.
> 주어진 db.json에서 가져온 객체 데이터를 각각 배열에 저장하고자 했을 때 hasOwnProPerty 메서드 사용시 에러가 발생하였습니다.

![image](https://github.com/mihyunLee/region-time-chart/assets/51310674/dedbd060-482c-4d41-9338-764ce1651eb5)

```typescript
// ❌ 기존 코드

for (const key in response) {
  if (response.hasOwnProperty(key)) {
    // ...
  }
}

// ✅ 해결 코드
for (const key in response) {
  if (Object.prototype.hasOwnProperty.call(response, key)) {
    // ...
  }
}
```

eslint룰인 `no-prototype-builtins`는 Object.prototype 메소드를 사용하는 것을 금지합니다.

이는 변수 a가 Object.create(null)로 생성이 되었을 경우 Object.prototype 메소드를 사용할 수 없기 때문에 에러를 발생시키는 것이었습니다.

객체 속성 선언을 통해 객체 프로토타입 체이닝을 이용하지 못하는 현상을 쉐도잉(shadowing)이라고 하는데, 쉐도잉이 일어나게 되면 `if(객체.hasOwnProperty())`가 항상 `true`가 되어 코드가 제대로 동작하지 않기 때문에 주의해서 사용해야 한다는 것을 알게되었습니다.

이처럼 객체 생성 근원지를 알 수 없을 때에는 `call` 메서드를 사용하여 메소드를 직접 참조하지 않고, 재할당된 메소드를 참조하여 에러를 해결하였습니다.

ref. https://velog.io/@jay/be-carefule-use-hasownproperty

<br>

# 🤝 커밋 컨벤션

| 태그           | 설명 (한국어로만 작성하기)                                     |
| -------------- | -------------------------------------------------------------- |
| `✨ FEAT:`     | 새로운 기능 추가 (변수명 변경 포함)                            |
| `🐛 FIX:`      | 버그 해결                                                      |
| `💄 DESIGN:`   | CSS 등 사용자 UI 디자인 변경                                   |
| `🎨 STYLE:`    | 코드 포맷 변경, 세미 콜론 누락, 코드 수정이 없는 경우          |
| `♻️ REFACTOR:` | 프로덕션 코드 리팩토링                                         |
| `💬 COMMENT:`  | 필요한 주석 추가 및 변경                                       |
| `📝 DOCS:`     | 문서를 수정한 경우                                             |
| `⚙️ CHORE:`    | 빌드 테스크 업데이트, 패키지 매니저 설정(프로덕션 코드 변경 X) |
| `🔄️ RENAME:`  | 파일 혹은 폴더명을 수정하거나 옮기는 작업                      |
| `🚚 REMOVE:`   | 파일을 삭제하는 작업만 수행한 경우                             |
| `🎉 INIT:`     | 초기 커밋을 진행한 경우                                        |

<br>

# ⚙️ 기술 스택

<div style='display: flex'>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=square&logo=TypeScript&logoColor=black"/>
  <img src="https://img.shields.io/badge/React-61DAFB?style=square&logo=React&logoColor=black"/>
  <img src="https://img.shields.io/badge/Chart.js-FF6384?style=square&logo=Chart.js&logoColor=white"/>
  <img src="https://img.shields.io/badge/Styled_Components-DB7093?style=square&logo=styled-components&logoColor=white"/>
  <img src="https://img.shields.io/badge/vercel-000000?style=square&logo=vercel&logoColor=white"/>
  <img src="https://img.shields.io/badge/eslint-4B32C3?style=square&logo=eslint&logoColor=white"/>
  <img src="https://img.shields.io/badge/prettier-F7B93E?style=square&logo=prettier&logoColor=black"/>
  <img src="https://img.shields.io/badge/husky-000e2f?style=square&logo=Husky&logoColor=white"/>
  <img src="https://img.shields.io/badge/GitHub-181717?style=square&logo=GitHub&logoColor=white"/>
  <img src="https://img.shields.io/badge/git-F05032?style=square&logo=git&logoColor=white">
</div>
