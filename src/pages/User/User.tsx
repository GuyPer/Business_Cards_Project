import { useContext, useEffect, useState } from "react"
import "./User.css"
import { AuthContext } from "../../context/AuthContext"
import AppButton from "../../components/AppButton/AppButton"
import { Link, useNavigate } from "react-router-dom"
import { ThemeContext } from "../../context/ThemeContext"
import { LikedCardsContext } from "../../context/LikedCardsContext"
import { ToastsContext } from '../../context/ToastsContext';
import { doDeleteUser, doGetUserById } from "../../Services/UsersService"

export default function User() {
    const toast = useContext(ToastsContext)
    const theme = useContext(ThemeContext)
    const auth = useContext(AuthContext)
    const liked = useContext(LikedCardsContext)
    const navigate = useNavigate()
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isUserToDelete, setIsUserToDelete] = useState(false)

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (auth && auth.isSignedIn) {
            setIsLoggedIn(true);
        }
    }, [auth]);

    const handleLogOut = () => {
        window.scrollTo(0, 0);
        setIsLoggedIn(!isLoggedIn)
        localStorage.removeItem("likedCardsArray");
        localStorage.removeItem("userId");
        localStorage.removeItem("null");
        localStorage.removeItem("cardIdToEdit");
        localStorage.removeItem("userIdToEdit");
        localStorage.removeItem("cardIdToRender");
        liked?.resetLikedArr();
        if (auth) {
            auth.signOut();
        }
    }

    const handleEditProfile = () => {
        localStorage.setItem(`userIdToEdit`, `${localStorage.getItem("userId")}`)
        navigate("edituser")
    }

    const handledeleteUser = async () => {
        localStorage.setItem("userIdToDelete", `${localStorage.getItem("userId")}`)
        const userIdToDelete = localStorage.getItem("userIdToDelete")
        if (userIdToDelete) {
            await getUserInfoFromServer(userIdToDelete)
            await deleteUser();
            handleLogOut()
        }
    }

    const getUserInfoFromServer = async (userIdToDelete: string) => {
        let { error } = await doGetUserById(userIdToDelete)
        if (error) { alert(error) }
    }
    const deleteUser = async () => {
        let { result, error } = await doDeleteUser();
        if (result) {
            toast?.addToast("User Deleted ! ");
            setIsUserToDelete(true);
            localStorage.removeItem("userIdToDelete")
            window.scrollTo(0, 0);
        }
        if (error) {
            return error;
        }
    };

    return (
        <>
            <div className={`User ${theme?.isLightMode ? `light` : `dark`} ${auth?.isSignedIn ? `loggedIn` : `loggedOut`}`}>
                {auth?.isSignedIn && (<div className="userDetailsDiv">
                    <h3 className="title">User Details:</h3>
                    <div className="userImageDiv">
                        {auth.userDetails &&
                            <img className={`userImage ${theme?.isLightMode ? "userImageLight" : "userImageDark"}`} src={auth.userDetails.image.url} alt={auth.userDetails.image.alt} />}
                    </div>
                    <div className="userDetails">{auth.userDetails ?
                        <div>
                            <div className="name">
                                Name: {auth.userDetails.name.first} {auth.userDetails.name.middle} {auth.userDetails.name.last}
                            </div>
                            <div className="phone">
                                Phone: {auth.userDetails.phone}
                            </div>
                            <div className="email">
                                Email: {auth.userDetails.email}
                            </div>
                            <div>
                                <div className="userAddress">
                                    Address:<br></br>
                                    state: {auth.userDetails.address.state}<br></br>
                                    Country: {auth.userDetails.address.country}<br></br>
                                    City: {auth.userDetails.address.city}<br></br>
                                    Street: {auth.userDetails.address.street}<br></br>
                                    House Number:{auth.userDetails.address.houseNumber}<br></br>
                                    ZIP: {auth.userDetails.address.zip}
                                </div>
                            </div>
                        </div>
                        : "Waiting"}</div>
                    {auth.isAdmin ?
                        <div className="adminAcount">Admin account</div> : auth.isBusiness && !auth.isAdmin ? <div className="businessAcount">Business account</div> : ""}
                    <div className="editBtn">
                        <AppButton className="profileBtn" bootstarpButton='btn btn-primary' fnHandleButton={handleEditProfile} context={'Edit Profile'} />
                    </div>
                    <div className="logOutBtnDiv">
                        <AppButton className="logOutBtn" bootstarpButton='btn btn-secondary' fnHandleButton={handleLogOut} context={'Logout'} />
                    </div>
                    <div className="logOutBtnDiv">
                        <AppButton className="deletUserButton" bootstarpButton='btn btn-danger' fnHandleButton={handledeleteUser} context={'Delete Account'} />
                    </div>
                </div>)}
                {isUserToDelete && !isLoggedIn &&
                    (<div className="loggedOutDiv">
                        <h3 className="loggedOutHeader">You Delete your Account. Create new account! </h3>
                        <div className="btn">
                            <Link style={{ textDecoration: 'none' }} to="../signup"><AppButton bootstarpButton='btn btn-success' context='Signup' /></Link>
                        </div>
                    </div>)}
                {!isLoggedIn && !isUserToDelete &&
                    (<div className="loggedOutDiv">
                        <h3 className="loggedOutHeader">You logged Out, you have to be sign in to view this page</h3>
                        <div className="btn">
                            <Link style={{ textDecoration: 'none' }} to="../login"><AppButton bootstarpButton='btn btn-success' context='LOGIN' /></Link>
                        </div>
                    </div>)}
            </div>
        </>
    )
}