import { useLogin } from "../hooks/useLogin"

const ProfilePage = () => {

    const username = useLogin()

    return (
        <div>
            Profile
            Username : {username}
        </div>
    )
}

export default ProfilePage