# Flora (project)

- 개발기간<br/>
  2023.04.10 ~ 2023.07.20

- before dark mode
  ![image](/public/readmeImg/main.png)

- after dark mode
  ![image](/public/readmeImg/main_black_version.png)

- api(Docs) 제공
  인프런 코드캠프

# 프로젝트 소개

기능, 디자인을 생각을 하여 만들어봤습니다. 컨셉은 꽃의 여신 Flora에서 따온것으로 <br/>
디자인, 폰트등 우아함을 강조하였으며, 사이트를 사용하는 유저들이<br/>
세련됨을 가지고 있으면서 누구든지 참여할 수 있다는 공통체 느낌을
주도록 만들어봤습니다.

# 시작 가이드

- ### frontend

```
  $ npm install -g yarn
  $ yarn --version
  $ yarn install
```

# Stacks

### **Environment**<br/>

<img src="https://img.shields.io/badge/visual studio code-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white">&nbsp;
<img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">
&nbsp;<img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">

### **Config**<br/>

<img src="https://img.shields.io/badge/yarn-2C8EBB?style=for-the-badge&logo=yarn&logoColor=white"><br/>

### **Development**<br/>

<img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">&nbsp;
<img src="https://img.shields.io/badge/react-20232a?style=for-the-badge&logo=react&logoColor=5dcfee">&nbsp;
<img src="https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=next.js&logoColor=white">&nbsp;
<img src="https://img.shields.io/badge/recoil-3578E5?style=for-the-badge&logo=recoil&logoColor=white">&nbsp;
<img src="https://img.shields.io/badge/emotion-DB7093?style=for-the-badge&logo=styled-components&logoColor=white">&nbsp;
<img src="https://img.shields.io/badge/apollo Graph Ql-311C87?style=for-the-badge&logo=apolloGraphQl&logoColor=white">&nbsp;
<img src="https://img.shields.io/badge/font awesome-528DD7?style=for-the-badge&logo=font awesome&logoColor=white">&nbsp;
<img src="https://img.shields.io/badge/sweet alert-528DD7?style=for-the-badge&logo=circle&logoColor=white">&nbsp;
<img src="https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white"><br/>

# 화면구성

- 🐣메인페이지(랜딩)<br/>

- ✨ 아래 해, 달 버튼은 뒷 배경 어둡게 하거나 밝게하는 기능

- ✨ 여름이라서 시원한 느낌을 줄 수 있도록 만듬, 폰트는 (appleSD, Suit 사용)

| 메인 페이지(랜딩 페이지)             |
| ------------------------------------ |
| ![image](/public/readmeImg/main.png) |

| 메인 페이지(뒷배경 어둡게 할때)                    |
| -------------------------------------------------- |
| ![image](/public/readmeImg/main_black_version.png) |

- 🐣자유게시판<br/>
  비로그인, 로그인 유저 둘다 가능하며<br/>
  댓글 작성 같은 경우는 로그인을 하여도 비로그인 유저기능만
  가능합니다(제공api 구성이 비로그인 유저만 있습니다.)<br/>

- ✨pagination 10개씩, 검색 디바운싱 적용

- ✨Best 게시글은 (api에서 좋아요가 많은수가 기준이 됨)

- ✨ 그외에 작성된 페이지에 위에 하트숫자 증가, 삭제 등등

| 자유게시판 첫화면                                                       | 자유게시판 작성하기 버튼 누를때                        |
| ----------------------------------------------------------------------- | ------------------------------------------------------ |
| ![image](/public/readmeImg/freeboard/freeboard.png)                     | ![image](/public/readmeImg/freeboard/writepage.png)    |
| 작성하기버튼 (validation 체크)                                          | 데이터 다 넣을때                                       |
| ![image](/public/readmeImg/freeboard/required_validation_freeboard.png) | ![image](/public/readmeImg/freeboard/write_detail.png) |

| 작성 완료 후 해당 정보페이지로 이동                      | 댓글 작성                                                     |
| -------------------------------------------------------- | ------------------------------------------------------------- |
| ![image](/public/readmeImg/freeboard/write_complete.png) | ![image](/public/readmeImg/freeboard/comment.png)             |
| 수정하기 버튼 누르고 수정할때                            | 수정완료                                                      |
| ![image](/public/readmeImg/freeboard/write_edit.png)     | ![image](/public/readmeImg/freeboard/write_edit_complete.png) |

| 댓글 작성 완료                                                  | 댓글수정 작성                                            |
| --------------------------------------------------------------- | -------------------------------------------------------- |
| ![image](/public/readmeImg/freeboard/comment_complete.png)      | ![image](/public/readmeImg/freeboard/comment_edit.png)   |
| 댓글수정 완료                                                   | 댓글삭제                                                 |
| ![image](/public/readmeImg/freeboard/comment_edit_complete.png) | ![image](/public/readmeImg/freeboard/comment_delete.png) |

- 🐣중고게시판<br/>
  로그인 유저만 가능하며<br/>
  판매중 / 판매완료 태그로 구분지음<br/>
  판매중 --> 베스트 & 판매중인 상품<br/>
  본인이 판매하는상품은 구매하기 버튼활성화 안됨, 작성할 경우에만 수정, 삭제 가능<br/>
  댓글기능은 댓글, 대댓글, 수정, 삭제 가능<br/>
  다른사람 물품을 볼때 구매가능 버튼 활성화<br/>
  구매버튼 누르면 판매완료 버튼으로 이동<br/>

- ✨수정, 등록 카카오맵 api사용 (npm에서 주소 다운)

- ✨구매버튼 누르면 구매한 물품 판매완료로 이동

- ✨infinite carousel 구현, infinite scroll (npm 다운)

- ✨등록할때 이미지를 하나라도 안넣으면 썸네일 없게 제작

- ✨작성하기, 수정하기 TextArea는 Toast를 사용함

```
pages/src/components/commons/carousel

  let total = props.images?.filter((el) => {
    return el
  })

  if (total && total.length >= 2) {
    const start = total[0]
    const end = total[total.length - 1]
    const result = [end, ...total, start]
    total = result
  }

  const [cur, setCur] = useState(1)
  const [leftCur, setLeftCur] = useState(1)

  const [carouselTransition, setCarouselTransition] = useState(
    "transform 300ms ease-in-out"
  )
  const [tags, setTags] = useState<JSX.Element[]>([<></>, <></>])

  const onClickNext = () => {
    setCur((prev) => prev + 1)
    setCarouselTransition("transform 300ms ease-in-out")
  }

  const onClickPrev = () => {
    setCur((prev) => prev - 1)
    setCarouselTransition("transform 300ms ease-in-out")
  }

  const moveToNthSlide = (n: number) => {
    setTimeout(() => {
      setCur(n)
      setCarouselTransition("")
    }, 300)
  }

  const moveToNonTimeSlide = (n: number) => {
    setCur(n)
    setCarouselTransition("")
  }

  useLayoutEffect(() => {
    setLeftCur(cur)

    if (total && cur === total.length - 1) {
      moveToNthSlide(1)
      setLeftCur(1)
    } else if (total && cur === 0) {
      moveToNthSlide(total.length - 2)
      setLeftCur(total.length - 2)
    }
  }, [total && total.length, total && total.length - 1, cur])

  useLayoutEffect(() => {
    if (total)
      total.length >= 2
        ? setTags([
            <>
              <FontAwesomeIcon icon={faChevronLeft}></FontAwesomeIcon>
            </>,
            <>
              <FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon>
            </>
          ])
        : setTags([...tags])
  }, [props.images])


```

- ✨대댓글 조건부 랜더링 재귀호출로 구현

```
pages/src/components/commons/comment/comment.presenterItem.tsx

{data?.fetchUseditemQuestionAnswers.map((el) => {
            return (
              <Comment
                key={el._id}
                id={el._id}
                questionAnswer={el}
                question={true}
              />
            )
          })}

```

| 중고게시판 첫화면                                            | 판매중인 상품 디테일 페이지                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| ![image](/public/readmeImg/secondmarket/second_market.png)   | ![image](/public/readmeImg/secondmarket/second_market_2.png) |
| 수정하기 버튼(클릭한 페이지)                                 | 수정완료화면                                                 |
| ![image](/public/readmeImg/secondmarket/second_market_3.png) | ![image](/public/readmeImg/secondmarket/second_market_4.png) |

| 댓글 작성                                                    | 댓글 작성 완료                                               |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| ![image](/public/readmeImg/secondmarket/second_market_5.png) | ![image](/public/readmeImg/secondmarket/second_market_6.png) |
| 수정하기 버튼 누르고 수정할때                                | 수정완료                                                     |
| ![image](/public/readmeImg/secondmarket/second_market_7.png) | ![image](/public/readmeImg/secondmarket/second_market_8.png) |

| 삭제했을때                                                    | 구매버튼 누를때                                               |
| ------------------------------------------------------------- | ------------------------------------------------------------- |
| ![image](/public/readmeImg/secondmarket/second_market_9.png)  | ![image](/public/readmeImg/secondmarket/second_market_10.png) |
| 구매완료                                                      | 구매완료 확인                                                 |
| ![image](/public/readmeImg/secondmarket/second_market_11.png) | ![image](/public/readmeImg/secondmarket/second_market_12.png) |

- 🐣로그인 유저<br/>
  로그인 유저의 프로필사진, 충전금액, 로그아웃을 할 수 있다.<br/>

- ✨정보수정에서는 닉네임, 프로필 사진 변경

- ✨충전하기는 카카오페이로 충전(개발자용)

- ✨로그아웃기능

| 프로필 클릭시                             |
| ----------------------------------------- |
| ![image](/public/readmeImg/user/user.png) |

| 정보수정 클릭시                            |
| ------------------------------------------ |
| ![image](/public/readmeImg/user/user2.png) |

| 충전하기 클릭시                            |
| ------------------------------------------ |
| ![image](/public/readmeImg/user/user3.png) |

| 로그아웃 클릭시                            |
| ------------------------------------------ |
| ![image](/public/readmeImg/user/user4.png) |

# 아키텍쳐

- 디렉토리 구조

```
📦Flora
┣ 📂pages
 ┃ ┣ 📂boards --> 자유게시판
 ┃ ┃ ┣ 📂new --> 자유게시판 작성하기 버튼 누를때
 ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┃ ┣ 📂[boardId] --> 자유게시판 수정버튼 누를때
 ┃ ┃ ┃ ┣ 📂edit
 ┃ ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂join --> 회원가입
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂login --> 로그인
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂main --> 메인페이지 (랜딩페이지)
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂src
 ┃ ┃ ┣ 📂commons
 ┃ ┃ ┃ ┣ 📂hocs --> token 로그인 유무 판단
 ┃ ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┃ ┃ ┣ 📂libraries --> token 가져오는 로직
 ┃ ┃ ┃ ┃ ┗ 📜getAccessToken.ts
 ┃ ┃ ┃ ┣ 📂stores --> recoil 사용파일
 ┃ ┃ ┃ ┃ ┗ 📜index.ts
 ┃ ┃ ┃ ┣ 📂styles
 ┃ ┃ ┃ ┃ ┗ 📜globalStyles.ts
 ┃ ┃ ┃ ┣ 📂types
 ┃ ┃ ┃ ┃ ┗ 📂generated
 ┃ ┃ ┃ ┃ ┃ ┗ 📜types.ts
 ┃ ┃ ┃ ┗ 📂utilities
 ┃ ┃ ┃ ┃ ┣ 📜utility.module.css
 ┃ ┃ ┃ ┃ ┗ 📜utility.ts --> 공통으로 사용할 utility 기능 파일(date, kakaoMap...등)
 ┃ ┃ ┗ 📂components
 ┃ ┃ ┃ ┣ 📂commons
 ┃ ┃ ┃ ┃ ┣ 📂apollo --> apollo 세팅
 ┃ ┃ ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┃ ┃ ┃ ┣ 📂carousel --> infinite carousel
 ┃ ┃ ┃ ┃ ┃ ┣ 📜Carousel.container.tsx
 ┃ ┃ ┃ ┃ ┃ ┣ 📜Carousel.presenter.tsx
 ┃ ┃ ┃ ┃ ┃ ┣ 📜Carousel.styled.ts
 ┃ ┃ ┃ ┃ ┃ ┗ 📜Carousel.types.ts
 ┃ ┃ ┃ ┃ ┣ 📂comment --> 댓글
 ┃ ┃ ┃ ┃ ┃ ┣ 📜comment.presenterItem.tsx
 ┃ ┃ ┃ ┃ ┃ ┣ 📜comment.queries.ts
 ┃ ┃ ┃ ┃ ┃ ┣ 📜comment.style.ts
 ┃ ┃ ┃ ┃ ┃ ┗ 📜comment.types.ts
 ┃ ┃ ┃ ┃ ┣ 📂custom --> dark 모드
 ┃ ┃ ┃ ┃ ┃ ┣ 📜globals.ts
 ┃ ┃ ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┃ ┃ ┗ 📜theme.ts
 ┃ ┃ ┃ ┃ ┣ 📂detail
 ┃ ┃ ┃ ┃ ┃ ┣ 📂commentList --> 댓글 목록
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜commentList.container.tsx
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜commentList.presenter.tsx
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜commentList.queries.ts
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜commentList.style.ts
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜commentList.types.ts
 ┃ ┃ ┃ ┃ ┃ ┣ 📂commentWrite --> 댓글 작성
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜commentWrite.container.tsx
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜commentWrite.presenter.tsx
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜commentWrite.queries.ts
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜commentWrite.style.ts
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜commentWrite.types.ts
 ┃ ┃ ┃ ┃ ┃ ┣ 📜Detail.container.tsx --> 상품, 게시글 디테일 페이지 기능
 ┃ ┃ ┃ ┃ ┃ ┣ 📜Detail.presenter.tsx --> 상품, 게시글 디테일 페이지 컴포넌트만
 ┃ ┃ ┃ ┃ ┃ ┣ 📜Detail.queries.ts
 ┃ ┃ ┃ ┃ ┃ ┣ 📜Detail.style.ts
 ┃ ┃ ┃ ┃ ┃ ┗ 📜Detail.types.ts
 ┃ ┃ ┃ ┃ ┣ 📂header
 ┃ ┃ ┃ ┃ ┃ ┣ 📂ChildrenCommonStyle
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜style.module.css
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜style.ts
 ┃ ┃ ┃ ┃ ┃ ┣ 📂dropdown  --> 로그인 유저 드롭다운
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┃ ┃ ┃ ┃ ┣ 📂profile --> 로그인 유저 사진정보 있을때 없을때 조건부 렌더링
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┃ ┃ ┃ ┃ ┣ 📂userInfo --> 로그인 유저 기능
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┃ ┃ ┃ ┃ ┣ 📜header.queries.ts
 ┃ ┃ ┃ ┃ ┃ ┣ 📜headerStyle.ts
 ┃ ┃ ┃ ┃ ┃ ┗ 📜index.tsx --> 로그인, 회원가입 이동
 ┃ ┃ ┃ ┃ ┣ 📂modal --> 로그인 유저 modal(충전하기, 프로필 사진등..)
 ┃ ┃ ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┃ ┃ ┣ 📜modal.queries.ts
 ┃ ┃ ┃ ┃ ┃ ┗ 📜style.ts
 ┃ ┃ ┃ ┃ ┣ 📂nav --> 로고, 자유게시판, 중고게시판, 로그인, 회원가입 텍스트 있는 헤더 네비
 ┃ ┃ ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┃ ┃ ┗ 📜navMenuStyle.ts
 ┃ ┃ ┃ ┃ ┣ 📂pagination --> 자유게시판 페이지네이션 목록수 api를 받아와서 밑에
 숫자버튼 생성
 ┃ ┃ ┃ ┃ ┃ ┣ 📜pagination.container.tsx
 ┃ ┃ ┃ ┃ ┃ ┣ 📜pagination.presenter.tsx
 ┃ ┃ ┃ ┃ ┃ ┣ 📜pagination.styles.ts
 ┃ ┃ ┃ ┃ ┃ ┗ 📜pagination.types.ts
 ┃ ┃ ┃ ┃ ┣ 📂toastEditor
 ┃ ┃ ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┃ ┃ ┗ 📂units
 ┃ ┃ ┃ ┃ ┣ 📂board --> 자유게시판
 ┃ ┃ ┃ ┃ ┃ ┣ 📂list --> 자유게시판 목록
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜BoardList.container.tsx
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜BoardList.presenter.tsx
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜BoardList.queries.ts
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜BoardList.skeleton.ts
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜BoardList.style.ts
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜BoardList.types.ts
 ┃ ┃ ┃ ┃ ┃ ┗ 📂write --> 자유게시판 작성
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜BoardWrite.container.tsx
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜BoardWrite.presenter.tsx
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜BoardWrite.queries.ts
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜BoardWrite.style.ts
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜BoardWrite.types.ts
 ┃ ┃ ┃ ┃ ┣ 📂join --> 회원가입
 ┃ ┃ ┃ ┃ ┃ ┣ 📜Join.container.tsx
 ┃ ┃ ┃ ┃ ┃ ┣ 📜Join.presenter.tsx
 ┃ ┃ ┃ ┃ ┃ ┣ 📜Join.queries.ts
 ┃ ┃ ┃ ┃ ┃ ┣ 📜Join.styles.ts
 ┃ ┃ ┃ ┃ ┃ ┗ 📜Join.types.ts
 ┃ ┃ ┃ ┃ ┣ 📂login --> 로그인
 ┃ ┃ ┃ ┃ ┃ ┣ 📜Login.container.tsx
 ┃ ┃ ┃ ┃ ┃ ┣ 📜Login.presenter.tsx
 ┃ ┃ ┃ ┃ ┃ ┣ 📜Login.queries.ts
 ┃ ┃ ┃ ┃ ┃ ┣ 📜Login.styles.ts
 ┃ ┃ ┃ ┃ ┃ ┗ 📜Login.types.ts
 ┃ ┃ ┃ ┃ ┣ 📂main --> 메인
 ┃ ┃ ┃ ┃ ┃ ┣ 📜Main.container.tsx
 ┃ ┃ ┃ ┃ ┃ ┣ 📜Main.Presenter.tsx
 ┃ ┃ ┃ ┃ ┃ ┣ 📜Main.queries.ts
 ┃ ┃ ┃ ┃ ┃ ┣ 📜Main.style.ts
 ┃ ┃ ┃ ┃ ┃ ┗ 📜Main.types.ts
 ┃ ┃ ┃ ┃ ┗ 📂useditem --> 중고마켓
 ┃ ┃ ┃ ┃ ┃ ┣ 📂nonPicture --> 썸네일이 없을때
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜style.ts
 ┃ ┃ ┃ ┃ ┃ ┣ 📂wirte --> 중고마켓 작성
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜UsedWrite.container.tsx
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜UsedWrite.presenter.tsx
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜UsedWrite.queries.ts
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜UsedWrite.style.ts
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜UsedWrite.types.ts
 ┃ ┃ ┃ ┃ ┃ ┣ 📜UsedItem.container.tsx
 ┃ ┃ ┃ ┃ ┃ ┣ 📜UsedItem.presenter.tsx
 ┃ ┃ ┃ ┃ ┃ ┣ 📜UsedItem.queries.ts
 ┃ ┃ ┃ ┃ ┃ ┣ 📜UsedItem.styles.ts
 ┃ ┃ ┃ ┃ ┃ ┗ 📜UsedItem.types.ts
 ┃ ┣ 📂useditem
 ┃ ┃ ┣ 📂new
 ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┃ ┣ 📂[usedItemId]
 ┃ ┃ ┃ ┣ 📂edit
 ┃ ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📜index.tsx
 ┃ ┗ 📜_app.tsx
 ┣ 📂public
 ┃ ┣ 📂font
 ┃ ┃ ┣ 📜AppleSDGothicNeoB.woff
 ┃ ┃ ┣ 📜AppleSDGothicNeoEB.ttf
 ┃ ┃ ┣ 📜AppleSDGothicNeoH.ttf
 ┃ ┃ ┣ 📜AppleSDGothicNeoL.ttf
 ┃ ┃ ┣ 📜AppleSDGothicNeoM.ttf
 ┃ ┃ ┣ 📜AppleSDGothicNeoR.woff
 ┃ ┃ ┣ 📜AppleSDGothicNeoSB.ttf
 ┃ ┃ ┣ 📜AppleSDGothicNeoT.ttf
 ┃ ┃ ┣ 📜AppleSDGothicNeoUL.ttf
 ┃ ┃ ┣ 📜Hahmlet-Black.ttf
 ┃ ┃ ┣ 📜Hahmlet-Bold.ttf
 ┃ ┃ ┣ 📜Hahmlet-ExtraBold.ttf
 ┃ ┃ ┣ 📜Hahmlet-ExtraLight.ttf
 ┃ ┃ ┣ 📜Hahmlet-Light.ttf
 ┃ ┃ ┣ 📜Hahmlet-Medium.ttf
 ┃ ┃ ┣ 📜Hahmlet-Regular.ttf
 ┃ ┃ ┣ 📜Hahmlet-SemiBold.ttf
 ┃ ┃ ┣ 📜Hahmlet-Thin.ttf
 ┃ ┃ ┣ 📜NanumSquareB.ttf
 ┃ ┃ ┣ 📜NanumSquareEB.ttf
 ┃ ┃ ┣ 📜NanumSquareL.ttf
 ┃ ┃ ┣ 📜NanumSquareR.ttf
 ┃ ┃ ┣ 📜NanumSquare_acB.ttf
 ┃ ┃ ┣ 📜NanumSquare_acEB.ttf
 ┃ ┃ ┣ 📜NanumSquare_acL.ttf
 ┃ ┃ ┣ 📜NanumSquare_acR.ttf
 ┃ ┃ ┣ 📜SUITE-Bold.woff2
 ┃ ┃ ┣ 📜SUITE-ExtraBold.woff2
 ┃ ┃ ┣ 📜SUITE-Heavy.woff2
 ┃ ┃ ┣ 📜SUITE-Light.woff2
 ┃ ┃ ┣ 📜SUITE-Medium.woff2
 ┃ ┃ ┣ 📜SUITE-Regular.woff2
 ┃ ┃ ┗ 📜SUITE-SemiBold.woff2
 ┃ ┣ 📂readmeImg
 ┃ ┃ ┣ 📂freeboard
 ┃ ┃ ┃ ┣ 📜comment.png
 ┃ ┃ ┃ ┣ 📜comment_complete.png
 ┃ ┃ ┃ ┣ 📜comment_delete.png
 ┃ ┃ ┃ ┣ 📜comment_edit.png
 ┃ ┃ ┃ ┣ 📜comment_edit_complete.png
 ┃ ┃ ┃ ┣ 📜freeboard.png
 ┃ ┃ ┃ ┣ 📜required_validation_freeboard.png
 ┃ ┃ ┃ ┣ 📜writepage.png
 ┃ ┃ ┃ ┣ 📜write_complete.png
 ┃ ┃ ┃ ┣ 📜write_detail.png
 ┃ ┃ ┃ ┣ 📜write_edit.png
 ┃ ┃ ┃ ┗ 📜write_edit_complete.png
 ┃ ┃ ┣ 📂secondmarket
 ┃ ┃ ┃ ┣ 📜second_market.png
 ┃ ┃ ┃ ┣ 📜second_market_10.png
 ┃ ┃ ┃ ┣ 📜second_market_11.png
 ┃ ┃ ┃ ┣ 📜second_market_12.png
 ┃ ┃ ┃ ┣ 📜second_market_2.png
 ┃ ┃ ┃ ┣ 📜second_market_3.png
 ┃ ┃ ┃ ┣ 📜second_market_4.png
 ┃ ┃ ┃ ┣ 📜second_market_5.png
 ┃ ┃ ┃ ┣ 📜second_market_6.png
 ┃ ┃ ┃ ┣ 📜second_market_7.png
 ┃ ┃ ┃ ┣ 📜second_market_8.png
 ┃ ┃ ┃ ┗ 📜second_market_9.png
 ┃ ┃ ┣ 📂user
 ┃ ┃ ┃ ┣ 📜user.png
 ┃ ┃ ┃ ┣ 📜user2.png
 ┃ ┃ ┃ ┣ 📜user3.png
 ┃ ┃ ┃ ┗ 📜user4.png
 ┃ ┃ ┣ 📜main.png
 ┃ ┃ ┗ 📜main_black_version.png
 ┃ ┣ 📜banner1.png
 ┃ ┣ 📜banner2.png
 ┃ ┣ 📜banner3.png
 ┃ ┣ 📜favicon.ico
 ┃ ┣ 📜image.png
 ┃ ┣ 📜list_img1.png
 ┃ ┣ 📜list_img2.png
 ┃ ┣ 📜list_img3.png
 ┃ ┣ 📜list_img4.png
 ┃ ┣ 📜modifyingBlack.png
 ┃ ┣ 📜modifyingGray.png
 ┃ ┣ 📜new.png
 ┃ ┣ 📜new2.png
 ┃ ┣ 📜next.svg
 ┃ ┣ 📜search.png
 ┃ ┣ 📜vercel.svg
 ┃ ┗ 📜video.png
 ┣ 📂styles
 ┃ ┣ 📜globals.css
 ┃ ┗ 📜Home.module.css
 ┣ 📜.babelrc
 ┣ 📜.eslintrc.js
 ┣ 📜.eslintrc.json
 ┣ 📜.gitignore
 ┣ 📜codegen.yaml
 ┣ 📜jsconfig.json
 ┣ 📜next-env.d.ts
 ┣ 📜next.config.js
 ┣ 📜package-lock.json
 ┣ 📜package.json
 ┣ 📜prettierrc.json
 ┣ 📜README.md
 ┣ 📜tsconfig.json
 ┣ 📜yarn-error.log
 ┗ 📜yarn.lock
```
