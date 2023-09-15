import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleUser } from "@fortawesome/free-solid-svg-icons"
import * as U from "../ChildrenCommonStyle/style"
export function Profile(props: any) {
  return (
    <U.Profile>
      {props && props.user?.picture ? (
        <img
          src={props.user?.picture}
          width="48px"
          height="48px"
          style={{
            borderRadius: "50%",
            cursor: "pointer"
          }}
          onClick={props.onClick}
        />
      ) : (
        <U.UnUser>
          <FontAwesomeIcon
            icon={faCircleUser}
            style={{
              marginTop: "10px",
              cursor: "pointer"
            }}
            onClick={props.onClick}
          />
        </U.UnUser>
      )}
    </U.Profile>
  )
}
