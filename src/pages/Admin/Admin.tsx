import "./Admin.css";
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import AppButton from '../../components/AppButton/AppButton';
import { SearchContext } from "../../context/SearchContext";
import { ThemeContext } from "../../context/ThemeContext";
import { IUsers } from "../../interfaces/UserInterfaces";
import { doDeleteUser, doFetchAllUsersFromServer, doGetUserById } from "../../Services/UsersService";
import { ToastsContext } from "../../context/ToastsContext";

export default function Admin() {
  const toast = useContext(ToastsContext)
  const theme = useContext(ThemeContext)
  const auth = useContext(AuthContext);
  const search = useContext(SearchContext);
  const [error, setError] = useState<string | null>(null);
  const [users, setUsers] = useState<IUsers[]>([]);
  const navigate = useNavigate();
  const [isUserToDelete, setIsUserToDelete] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0);

    const getAllUsersFromServer = async () => {
      let { error, result } = await doFetchAllUsersFromServer()
      if (result) {
        const filteredData = result.map(user => ({
          _id: user._id,
          name: {
            first: user.name.first,
            middle: user.name.middle,
            last: user.name.last,
          },
          phone: user.phone,
          email: user.email,
          image: {
            url: user.image.url,
            alt: user.image.alt,
          },
          address: {
            state: user.address.state,
            country: user.address.country,
            city: user.address.city,
            street: user.address.street,
            houseNumber: user.address.houseNumber,
            zip: user.address.zip,
          },
          isAdmin: user.isAdmin,
          isBusiness: user.isBusiness,
          createdAt: user.createdAt
        }));
        setUsers(filteredData);
      }
      if (error) { setError(error) }
    }
    getAllUsersFromServer();
    setIsUserToDelete(false)
  }, [isUserToDelete === true]);


  const handleEditUser = (userIdToEdit: string) => {
    localStorage.setItem(`userIdToEdit`, `${userIdToEdit}`)
    navigate("/user/edituser")
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

  const handledeleteUser = async (userId: string) => {
    localStorage.setItem(`userIdToDelete`, `${userId}`)
    const userIdToDelete = localStorage.getItem("userIdToDelete")
    if (userIdToDelete) {
      await getUserInfoFromServer(userIdToDelete)
      await deleteUser();
    }
  }

  return (
    <div className="Admin Page">
      <h1 className="title">Admin Page</h1>
      <br></br>
      {auth?.isAdmin ? (
        <div className="usersDiv">
          <h3 className="subtitle">All Users:</h3>
          <ul className="usersTitles">
            <li className="userNameTitle">
              <b>Name</b>
            </li>
            <li>
              <b className="isUserBusinesstitle">Business</b>
            </li>
            <li>
              <b className="isUserAdminTitle">Admin</b>
            </li>
          </ul>
          {users.length > 0 ? (
            users.filter((user) =>
              user.name.first.toLocaleLowerCase().includes((search?.searchVal || '').toLocaleLowerCase()) ||
              user.email.toLocaleLowerCase().includes((search?.searchVal || '').toLocaleLowerCase())
            )
              .map((user) => (
                <ul className={`users ${theme?.isLightMode ? "usersLight" : "usersDark"}`} key={user._id}>
                  <li className="userName">
                    {user.name.first} {user.name.last}
                  </li>
                  <li className="isUserBusiness">{user.isBusiness ? <div>Yes</div> : <div>No</div>}</li>
                  <li className="isUserAdmin">{user.isAdmin ? <div>Yes</div> : <div>No</div>}</li>
                  <li>
                    <div className="editDeleteBtns">
                      <AppButton fnHandleButton={() => handleEditUser(user._id)} bootstarpButton="btn btn-secondary" context={"Edit"} />
                      <AppButton fnHandleButton={() => handledeleteUser(user._id)} bootstarpButton="btn btn-danger" context={"Delete"} />
                    </div>
                  </li>
                </ul>
              ))
          ) : (
            <div className="noUsersDiv" style={{ color: "red" }}>
              It looks like there are no users.
            </div>
          )}
        </div>
      ) : (!error) && (
        <div className="userLoggedOutDiv">
          <p>You have to be sign in as an Admin</p>
          <p>You logged Out, you have to be sign in to view this page </p>
          <div className="btn">
            <Link style={{ textDecoration: "none" }} to="../login">
              <AppButton
                bootstarpButton="btn btn-success"
                context="LOGIN"
              />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}