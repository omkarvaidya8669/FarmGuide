import { useDispatch } from "react-redux";
import { logout } from "./Slice";
import FarmGuideHomePage from "./FarmGuideHome";

export default function LogoutComponent(){

    const dispatch = useDispatch();
    localStorage.clear();

    dispatch(logout());
    return(
        <div>
            <FarmGuideHomePage />
        </div>
    )

}