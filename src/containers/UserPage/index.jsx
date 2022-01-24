import React,{useEffect} from 'react';
import { useParams } from 'react-router-dom';
import Axios from "axios";
import {setUser} from './actions';
import {useDispatch} from 'react-redux';
import {createSelector} from 'reselect';
import {makeSelectUser} from './selectors';
import { useSelector } from 'react-redux';
import styled from "styled-components";

const UserContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
`;

const UserWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserImage = styled.div`
  width: 7em;
  height: 7em;
  img {
    width: 100%;
    height: 100%;
  }
`;
const UserName = styled.h3`
  font-size: 20px;
  color: #000;
`;
const UserEmail = styled.h3`
  font-size: 18px;
  color: #000;
`;

const stateSelector = createSelector(makeSelectUser, (user)=>({
    user
}));

const actionDispatch = (dispatch)=>({
    setUser:(user)=>dispatch(setUser(user))
})

export function UserPage(props){
    const {user} = useSelector(stateSelector);
    const {setUser} = actionDispatch(useDispatch());
    const {userId} = useParams();

    const  fetchUser = async(id) =>{
           const response =await Axios.get(`https://reqres.in/api/users/${id}`).catch((err) => {
               console.log("Err:",err); 
            });

          if(response.data){
            console.log(response.data.data);
            setUser(response.data.data);
          }  
    }

    useEffect(()=>{
        if(userId && userId !=="")
            fetchUser(userId);
    },[userId]);

    if(!user){
       return <div>User loading...</div> 
    }
console.log(user);
    return <UserContainer>
        <UserWrapper>
            <UserImage>
                <img src={user.avatar} alt="text"/>
            </UserImage>
            <UserName>{user.first_name}{user.last_name}</UserName>
            <UserEmail>{user.email}</UserEmail>
        </UserWrapper>
    </UserContainer>
}

