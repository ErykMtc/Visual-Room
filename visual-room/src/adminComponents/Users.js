import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';


const Users = () => {
    const [users, setUsers] = useState();
    const [changeUser, setChangeUser] = useState();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getUsers = async () => {
            try {
                const response = await axiosPrivate.get('/users', {
                    signal: controller.signal
                });
                isMounted && setUsers(response.data);
            } catch (err) {
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true });
            }
        }

        getUsers();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, []);

    const deleteUser = async (selUser) => {
        const userid = selUser._id;
        var tempost = users.filter(item => item._id != userid);

        const controller = new AbortController();
        const res = axiosPrivate.delete('/users' , {
            data: {"id": userid },
            signal: controller.signal
          }).then((response) => {
            setUsers(tempost);
          });
        
    }

    const confirmDelete = async (delid) => {
        await confirmAlert({
          title: 'Ostrzeżenie',
          message: 'Czy napewno chcesz usunąć?',
          buttons: [
            {
              label: 'Yes',
              onClick: () => {deleteUser(delid)}
            },
            {
              label: 'No',
              onClick: () => {return;}
            }
          ]
        });
      }

    const userChange = async (e, selectUser) => {
        const temp = e.target.value;
        var numb;
        if(temp === "User") numb = 2001;
        if(temp === "Worker") numb = 2000;
        if(temp === "Editor") numb = 2002;
        if(temp === "Admin") numb = 9999;
        
        var roles = {
            "id": selectUser._id,
            "roles":{
                [temp]: numb
            }
        }
      
        const controller = new AbortController();
        const res = axiosPrivate.put('/users/update' , roles , {
          signal: controller.signal
        }).then((response) => {
        });
    
      }

    return (
        <article>
            <h2 class="decorated"><span>Użytkownicy</span></h2>
            {users?.length
                ? (
                    <ul className="admin-user-list">
                        {users.map((user, i) => <li key={i}>
                            <div className="admin-user-numeration">{i + 1}.</div>
                            <div className="admin-user-name">{user?.username}</div>
                            <select className="admin-user-role" name="ffff" id="ddd" onChange={(e) => userChange(e, user)} value={changeUser}>
                                {(user.roles.Worker != null) ? <>
                                <option value="Worker">Worker</option>
                                <option value="User">User</option>
                                <option value="Admin">Admin</option>
                                <option value="Editor">Editor</option>
                                </> : (user.roles.Admin != null) ? <>
                                <option value="Admin">Admin</option>
                                <option value="Editor">Editor</option>
                                <option value="User">User</option>
                                <option value="Worker">Worker</option>
                                </> : (user.roles.Editor != null) ? <>
                                <option value="Editor">Editor</option>
                                <option value="User">User</option>
                                <option value="Worker">Worker</option>
                                <option value="Admin">Admin</option>
                                </> : <>
                                <option value="User">User</option>
                                <option value="Worker">Worker</option>
                                <option value="Editor">Editor</option>
                                <option value="Admin">Admin</option>
                                </>
                                }
                                
                            </select>
                            <div className="admin-user-delete">
                                <span onClick={(e) => {
                                    confirmDelete(user);
                                }}>
                                    <FontAwesomeIcon icon={faTrash} size='1x' />
                                </span>
                            </div>
                        </li>)
                        }
                    </ul>
                ) : <p>No users to display</p>
            }
        </article>
    );
};

export default Users;