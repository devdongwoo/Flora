import styled from "@emotion/styled"

export const Wrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  opacity: 0.98;
`

export const WrapContent = styled.div`
  width: 1600px;
  padding-top: 50px;
`

export const ListBox = styled.div`
  width: 100%;
  height: 740px;
  background-color: #fff;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.4);
  border-radius: 20px;
  position: relative;
`

export const Header = styled.div`
  width: 100%;
  padding: 20px 40px 0 40px;
  padding-top: 20px;
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  line-height: 1.4;

  :nth-of-type(2) {
    border-bottom: 1px solid #ededed;
  }
`

export const Choice = styled(Header)`
  padding-top: 10px;
  padding-left: 50px;
  display: block;
`

interface IButton {
  underline: string
}

export const Selling = styled.button`
  border: none;
  background: #fff;
  font-size: 16px;
  margin-right: 20px;
  padding-bottom: 4px;
  color: ${(props: IButton) => {
    return props.underline === "selling" ? "#000" : "#ccc"
  }};
  cursor: ${(props: IButton) => {
    return props.underline === "selling" ? "default" : "pointer"
  }};
  border-bottom: ${(props: IButton) => {
    return props.underline === "selling" ? "3px solid #ff00a4" : ""
  }};
`

export const Selled = styled.button`
  border: none;
  background: #fff;
  font-size: 16px;
  color: ${(props: IButton) => {
    return props.underline === "selled" ? "#000" : "#ccc"
  }};
  padding-bottom: 4px;
  cursor: ${(props: IButton) => {
    return props.underline === "selled" ? "default" : "pointer"
  }};
  border-bottom: ${(props: IButton) => {
    return props.underline === "selled" ? "3px solid #ff00a4" : ""
  }};
`

export const TextIcon = styled.span`
  margin-right: 10px;
`

export const MainText = styled.div`
  font-size: 24px;
  padding: 10px;
  &::selection {
    background: none;
  }
`

export const SearchBox = styled.div`
  position: relative;
`

export const SearchIcon = styled.span`
  position: absolute;
  left: 15px;
  bottom: 21px;
`

export const Input = styled.input`
  width: 1200px;
  height: 42px;
  background-color: #f2f2f2;
  border-radius: 10px;
  border: none;
  padding: 0 40px;
  margin-right: 70px;
`

export const Content = styled.div`
  height: 520px;
  overflow: auto;
  margin-top: 10px;
  position: relative;
`

export const BestItems = styled.div`
  width: 1600px;
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
  padding: 10px 50px;
  position: relative;
`

export const BestTag = styled.span`
  position: absolute;
  width: 80px;
  height: 30px;
  background-color: #ff0038;
  color: #fff;
  font-size: 14px;
  font-weight: 400;
  font-family: "AppleSDGothicNeo";
  padding: 5px 0 0 8px;
  clip-path: polygon(0% 0%, 100% 0%, 85% 50%, 100% 100%, 0% 100%);
`
export const BestSellTag = styled(BestTag)`
  position: absolute;
  top: 60px;
  width: 70px;
  background-color: #565151;
`

export const Items = styled(BestItems)``

export const Contents = styled.div`
  width: 320px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  display: inline-block;
  margin-right: 60px;
  margin-bottom: 20px;
  padding: 10px;

  :nth-of-type(4n) {
    margin-right: 0px;
  }

  :hover {
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.2);
  }
`
interface IProps {
  imgUrl: string
}

export const Img = styled.img`
  width: 100%;
  height: 280px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  content: url(${(props: IProps) => {
    if (!props.imgUrl) return
    return `https://storage.googleapis.com/${props.imgUrl.replaceAll(
      " ",
      "%20"
    )}`
  }});
`
export const SelTitle = styled.div`
  margin-top: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 16px;
  font-family: suit;
`

export const SubTitle = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  text-align: right;
  height: 57px;
`

export const SelTags = styled(SelTitle)`
  display: inline-block;
  font-size: 12px;
  color: #919191;
`

export const Price = styled.span`
  font-size: 24px;
  font-weight: bold;
`

export const TitleBox = styled.div`
  display: flex;
  font-size: 18px;
  font-weight: bold;
  justify-content: space-between;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const Title = styled.span``

export const Best = styled.span`
  border-radius: 7px;
  background-color: #ffb51e;
  color: #fff;
  font-size: 14px;
  padding: 3px;
`

export const Body = styled.div`
  height: 180px;
  color: #5a5a5a;
  font-weight: 500;
  font-family: Suit;
  margin: 10px 0 10px 0;
  overflow: hidden;
  text-align: center;
  text-overflow: ellipsis;
`

export const Bottom = styled.div`
  text-align: center;
  /* display: flex;
  justify-content: space-between; */
`

export const LeftBox = styled.div`
  display: flex;
`

export const UserPicture = styled.span`
  width: 28px;
  height: 28px;
  padding-top: 2px;
`

export const Unknown = styled.span`
  color: gray;
  font-size: 28px;
  margin-right: 10px;
  padding-top: 2px;
`

export const UserName = styled.span`
  display: flex;
  color: #5a5a5a;
  flex-direction: column;
`

export const UserDate = styled.span`
  font-size: 14px;
`

export const Up = styled.span`
  color: gray;
  font-size: 18px;
  padding: 5px;
`

export const LikeIcon = styled.span`
  color: #ef6d6d;
  margin-right: 4px;
`

export const UpCount = styled.span``

export const Boards = styled.div`
  width: 1460px;
  height: 310px;
  margin-top: 20px;
  margin-left: 40px;
  padding: 10px;
  text-align: center;
`

export const RowHeader = styled.div`
  display: flex;
  border-top: 1px solid #ededed;
  border-bottom: 1px solid #ededed;
  justify-content: space-between;
  padding: 3px 0;
`

export const ColTitle = styled.span`
  :first-of-type {
    width: 700px;
  }
  :nth-of-type(2) {
    width: 100px;
  }
  :nth-of-type(3) {
    width: 100px;
  }
  :last-of-type {
    width: 160px;
  }
  font-size: 16px;
  font-weight: 700;
`

export const Row = styled.div`
  display: flex;
  border-bottom: 1px solid #ededed;
  justify-content: space-between;
  padding: 2px 0;

  :hover {
    background-color: #f9f9f9;
  }
`

export const Col = styled.div`
  :first-of-type {
    width: 700px;
    :hover {
      color: #3493ff;
      cursor: pointer;
    }
  }
  :nth-of-type(2) {
    width: 100px;
    overflow: hidden;
  }
  :nth-of-type(3) {
    width: 100px;
  }
  :last-of-type {
    width: 160px;
  }
  font-size: 16px;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-break: break-all;
`
export const BoardsBottom = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left: 40px;
`

export const Contentbottom = styled.div`
  border-top: 1px solid #ededed;
  display: flex;
  padding-top: 20px;
  justify-content: end;
`

export const WriteBtn = styled.button`
  width: 120px;
  height: 40px;
  background-color: #fff;
  border: 1px solid #c9c9c9;
  cursor: pointer;
  margin-right: 106px;
  :hover {
    background-color: #000;
    color: #fff;
  }
`

export const WriteIcon = styled.span`
  margin-right: 4px;
`

export const Circle = styled.span`
  display: inline-block;
  width: 9px;
  height: 9px;
  border-radius: 100%;
  border: 1px solid rgb(163, 151, 198);
  margin-right: 8px;
`
