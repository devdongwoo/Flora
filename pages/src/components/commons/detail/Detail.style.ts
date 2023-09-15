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
  height: 700px;
  background-color: #fff;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.4);
  border-radius: 20px;
  display: flex;
  justify-content: space-between;
  position: relative;
`

export const LeftContentBox = styled.div`
  width: 70%;
  padding-left: 3%;
  padding-right: 3%;
  padding-top: 20px;
  border-right: 2px solid #a19c9c;
`

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 10px;
`

export const User = styled.div`
  display: flex;
`

export const UserPicture = styled.div`
  font-size: 34px;
`
export const UserData = styled.div`
  margin-left: 8px;
  font-weight: 700;
  padding-top: 4px;
`

export const UserName = styled.div`
  &::selection {
    background: none;
  }
`

export const UserCreatedAt = styled.div`
  color: #828282;
  font-size: 14px;
  font-weight: 200;
`
export const Price = styled.div`
  font-size: 24px;
  font-family: suit;
  font-weight: bold;
`

export const Local = styled.div`
  color: #ff6a00;
  font-size: 24px;
`

export const ToolTip = styled.div`
  color: #fff;
  font-size: 14px;
  font-weight: 200;
  background-color: #c4c4c4;
  display: none;
  justify-content: flex-start;
  align-items: flex-end;
  position: absolute;
  top: 0px;
  margin-top: -90%;
  & > span {
    width: max-content;
  }
  & > span:first-of-type {
    position: absolute;
    display: block;
    width: 0px;
    height: 0px;
    right: 0;
    bottom: -8px;
    border-left: 12px solid #000000;
    border-top: 8px solid transparent;
    transform: rotate(180deg);
  }
`

export const LikeOrUnLikeBox = styled.div`
  display: flex;
`

export const Like = styled.div`
  width: 80px;
  height: 30px;
  border: 1px solid rgb(239, 109, 109);
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
  cursor: pointer;
  font-weight: bold;
  ::selection {
    background-color: transparent;
    color: #000;
  }
`

export const UnLike = styled(Like)`
  margin-right: 0;
  border: 1px solid rgb(66, 37, 37);
`

export const HeaderBottom = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
  margin-bottom: 10px;
`

export const Title = styled.div`
  font-size: 24px;
  font-family: suit;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 600px;
`

export const ItemText = styled.div`
  width: 640px;
  word-break: keep-all;
`

export const Other = styled(LikeOrUnLikeBox)``

export const GoList = styled.div`
  width: 80px;
  height: 32px;
  cursor: pointer;
  margin-right: 10px;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
  display: inline-flex;
  flex: 1;
  font-family: suit;
  font-size: 12px;
  background-color: #2d98fd;

  ::selection {
    background-color: transparent;
    color: #000;
  }
`

export const GoEdit = styled(GoList)`
  background-color: rgb(65, 185, 121);
`
export const GoBuy = styled(GoEdit)`
  background-color: #fd6e10;
`

export const GoDelete = styled(GoEdit)`
  margin-right: 0;
  background-color: rgb(239, 98, 83);
`

export const Contents = styled.div`
  height: 500px;
  overflow: hidden;
  overflow-y: auto !important;
`

export const Text = styled.div`
  margin-top: 20px;
`

export const MapBox = styled.div`
  border-top: 1px solid #ededed;
  border-bottom: 1px solid #ededed;
  padding: 20px 0;
  margin: 20px 0;
`

export const Map = styled.div`
  width: 100%;
  height: 320px;
`

export const addressDetailText = styled.span`
  font-weight: bold;
  font-size: 14px;
`

export const addressDetail = styled.div`
  margin-top: 20px;
`

export const Img = styled.img`
  width: 100%;
  height: auto;
`

export const RightContentBox = styled.div`
  width: 30%;
  padding-left: 1.1%;
  padding-right: 1.1%;
`

export const CommentListBox = styled(Contents)`
  height: 400px;
`
