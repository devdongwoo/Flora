import styled from "@emotion/styled"
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
`

export const ListBox = styled.div`
  width: 100%;
  height: 748px;
  background-color: #fff;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.4);
  border-radius: 20px;
  position: relative;
  padding: 20px 40px 0 40px;
`

export const Header = styled.div`
  width: 100%;
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

export const Contents = styled.div`
  padding-top: 20px;
`

export const First = styled.div`
  display: flex;
`

export const WriterBox = styled.div`
  padding-left: 10px;
  margin-right: 80px;
`

export const Title = styled.div`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
`

export const Text = styled.span`
  margin-right: 10px;
`

export const Point = styled.span`
  color: #f55c13;
`

export const Input = styled.input`
  width: 240px;
  height: 32px;
  line-height: 32px;
  padding: 0 5px;
  border: none;
  border-bottom: 2px solid #ccc;
  outline: none;
  font-size: 16px;

  :focus {
    border-bottom: 2px solid #000;
  }
`

export const Error = styled.div`
  height: 24px;
  line-height: 24px;
  color: red;
  font-size: 14px;
`

export const PwdBox = styled.div`
  margin-right: 80px;
`

export const TitleInput = styled(Input)`
  width: 1470px;
`

export const Second = styled(First)`
  margin-top: 10px;
`

export const WriteContentBox = styled(WriterBox)``

export const ToastBox = styled.div`
  width: 1470px;
`

export const Third = styled(Second)``

export const AddressBox = styled(WriteContentBox)`
  margin-right: 10px;
  :first-of-type {
    overflow: hidden;
    height: 220px;
  }
  :last-of-type {
    width: 320px;
  }
`

export const AddressBoxFirst = styled.div`
  display: flex;
`

export const Map = styled.div`
  width: 520px;
  height: 220px;
  border: 1px solid #bdbdbd;
`

export const AddressBoxSecond = styled(AddressBoxFirst)``

export const AddressBoxThird = styled(AddressBoxSecond)``

export const AddressInput = styled(Input)`
  border: 1px solid #bdbdbd;
  width: 80px;
  margin-right: 10px;
`
export const AddressSubInput = styled(AddressInput)`
  width: 260px;
  margin-top: 10px;

  :focus {
    border-bottom: 1px solid #ccc;
  }
`

export const Sell = styled(AddressBox)`
  margin-right: 10px;
  width: 340px;
`

export const SellBox = styled(AddressBoxFirst)``

export const SellInput = styled(AddressSubInput)`
  text-align: right;
  width: 260px;
`

export const Tags = styled(Sell)`
  width: 280px !important;
`

export const TagBox = styled(SellBox)``

export const TagInput = styled(SellInput)`
  width: 80px;
`

export const MainBox = styled.div`
  margin-top: 14px;
`

export const SelectBox = styled.div``

export const Radio = styled.input`
  margin-right: 4px;
  :nth-of-type(2) {
    margin-left: 18px;
  }
`

export const PictureBox = styled(MainBox)``

export const WriterBtn = styled.button`
  width: 120px;
  height: 40px;
  background-color: transparent;
  border: 1px solid #bdbdbd;
  cursor: pointer;
  position: absolute;
  right: 70px;
  bottom: 40px;

  :hover {
    background-color: #000;
    color: #fff;
  }
`

export const EditBtn = styled(WriterBtn)`
  :hover {
    background-color: #efa918;
    color: #000;
    font-weight: bold;
  }
`

export const Cancel = styled.button`
  width: 120px;
  height: 40px;
  background-color: #bdbdbd;
  border: 1px solid #bdbdbd;
  cursor: pointer;
  position: absolute;
  right: 200px;
  bottom: 40px;
`
