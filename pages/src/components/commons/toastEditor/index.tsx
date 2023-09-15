import "@toast-ui/editor/dist/toastui-editor.css"
import "tui-color-picker/dist/tui-color-picker.css"
import "@toast-ui/editor/dist/i18n/ko-kr"
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css"
import colorSyntax from "@toast-ui/editor-plugin-color-syntax"
import { Editor } from "@toast-ui/react-editor"
import { Dispatch, RefObject, SetStateAction, useEffect } from "react"

interface IProps {
  contents: RefObject<any>
  contentError: RefObject<HTMLDivElement>
  setContent: Dispatch<
    SetStateAction<{
      contentHtml: string
      contentMark: string
    }>
  >
  htmlString: string
}

export default function ToastEditor(props: IProps) {
  const toolbaritems = [
    ["heading", "bold", "italic", "strike"],
    ["hr", "quote"]
  ]

  const onChangeContent = () => {
    /* const regex = /<p>+<br>+</p>/g */
    const contentIns = props.contents.current.getInstance()
    const contentHtml = contentIns.getHTML()
    const contentMark = contentIns.getMarkdown()

    if (contentMark && props.contentError.current) {
      props.setContent({ contentHtml, contentMark })
      props.contentError.current.innerText = ""
    } else if (!contentMark && props.contentError.current) {
      props.setContent({ contentHtml: "", contentMark: "" })
      props.contentError.current.innerText = "※내용을 입력해주세요."
    }
  }

  useEffect(() => {
    if (props.htmlString) {
      const htmlString = props.htmlString
      props.contents.current.getInstance().setHTML(htmlString)
    }
  }, [props.htmlString])

  return (
    <Editor
      ref={props.contents}
      previewStyle="vertical"
      height="220px"
      initialEditType="wysiwyg"
      initialValue={""}
      onChange={onChangeContent}
      toolbarItems={toolbaritems}
      useCommandShortcut={false}
      usageStatistics={false}
      hideModeSwitch={true}
      plugins={[colorSyntax]}
      language="ko-KR"
    ></Editor>
  )
}
