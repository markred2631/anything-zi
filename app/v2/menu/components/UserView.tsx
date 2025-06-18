import Placeholder from "@/app/v2/common/components/Placeholder";
import { User } from "../types";

type Props = {
    user: User
}

const toInitials = (user: User) => {
  return `${user.name[0]}${user.surname[0]}`
}

export default function UserView({user}: Props) {
    return (
        <div className="pt-0 py-4 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <Placeholder text={toInitials(user)} />
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">{user.name} {user.surname}</h3>
          </div>
        </div>
      </div>
    )
}