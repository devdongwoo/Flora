import styled from "@emotion/styled"
import SkeletonItem from "./BoardList.skeleton"

export const Wrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  opacity: 0.98;
  padding-top: 50px;
`

export const WrapContent = styled.div`
  width: 1600px;
  /* padding: 100px 0; */
`

export const ListBox = styled.div`
  width: 100%;
  height: 700px;
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

export const Content = styled.div``

export const BestBoards = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  margin-top: 10px;
  padding: 10px 50px;
`

export const SkeletonContents = styled(SkeletonItem)`
  gap: 20px;
  cursor: default;
`

export const Contents = styled.div`
  width: 320px;
  height: 100%;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  margin-right: 60px;
  padding: 10px;

  :hover {
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.2);
  }
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
  height: 70px;
  color: #5a5a5a;
  font-weight: 500;
  font-family: Suit;
  margin: 10px 0 10px 0;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
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

export const WriteBtn = styled.button`
  width: 120px;
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
