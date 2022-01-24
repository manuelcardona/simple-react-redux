import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { makeSelectUsers } from "./selectors";
import styled from "styled-components";

const UsersContainers = styled.div`
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

const stateSelector = createSelector(makeSelectUsers, (users) => ({
  users,
}));

export function UsersList(props) {
  const { users } = useSelector(stateSelector);
  const isEmptyUsers = !users || users.length === 0;

  const navigate = useNavigate();

  if (isEmptyUsers) return null;

  const goToUserPage = (id) => {
  
    navigate(`/user/${id}`);
  }

  return (
    <UsersContainers>
      {users.map((user, idx) => (
        <UserWrapper key={idx} onClick={()=>goToUserPage(user.id)}>
          <UserImage>
            <img src={user.avatar} alt="profile" />
          </UserImage>
          <UserName>
            {user.first_name}
            {user.last_name}
          </UserName>
        </UserWrapper>
      ))}
    </UsersContainers>
  );
}
