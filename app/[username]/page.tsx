import { PublicProfile } from "@/components/profile/public-profile"
import {getSessionUser} from "@/lib/actions";
import {redirect} from "next/navigation";

export default async function  ProfilePage(props: { params:Promise<{username: string}>}) {
    const user =await getSessionUser();
    if(!user){
        redirect("/login")
    }
    const {username} = await props.params
    console.log(username)
    return <PublicProfile username={user.username}/>
}