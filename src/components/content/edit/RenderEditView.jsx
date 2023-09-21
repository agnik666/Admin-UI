import React, { useState } from "react";
import { useSnackbar } from "notistack";
import "./EditView.css";

const RenderEditView = ({
  editFieldId,
  usersList,
  handleEditView,
  handleUsersList,
  handleUpdatedUsersList,
}) => {
  const [userDetail, setUserDetail] = useState({
    id: editFieldId,
    name: null,
    email: null,
    role: null,
  });

  const { enqueueSnackbar } = useSnackbar();

  const editFields = [
    {
      id: 1,
      field: "Name",
    },

    {
      id: 2,
      field: "Email",
    },

    {
      id: 3,
      field: "Role",
    },
  ];

  const validateInput = (user) => {
    const { name, email, role } = user;

    if (!name) {
      enqueueSnackbar("Name is a required field", { variant: "warning" });
      return false;
    }
    if (!email) {
      enqueueSnackbar("Email is a required field", { variant: "warning" });
      return false;
    }
    if (!role) {
      enqueueSnackbar("Role is a required field", { variant: "warning" });
      return false;
    }

    const emailPattern = /^[A-Z0-9._-]+@[A-Z0-9.-]+[.]{1}[A-Z]{2,}$/i;

    if (!emailPattern.test(email)) {
      enqueueSnackbar("Enter a valid email", { variant: "warning" });
      return false;
    }

    return true;
  };

  const onClickSave = () => {
    if (validateInput(userDetail)) {
      // replace the existing user with updated user details
      const updatedUsersList = usersList.map((item) => {
        if (item.id === userDetail.id) {
          // console.log(userDetail);
          return userDetail;
        }
        return item;
      });

      handleUsersList(updatedUsersList);
      handleUpdatedUsersList(updatedUsersList);
      enqueueSnackbar(`User id ${editFieldId} details updated!`, {
        variant: "success",
      });
      handleEditView((prevState) => !prevState);
    }
  };

  const onClickCancel = () => {
    handleEditView((prevState) => !prevState);
  };

  return (
    <div className="bg-edit">
      <div className="edit-view">
        {editFields.map((item) => {
          return (
            <div key={item.id} className="edit-field">
              <label>{item.field}:</label>
              <input
                type="text"
                className="edit-input"
                placeholder={`Enter ${item.field} here`}
                onChange={(event) => {
                  setUserDetail({
                    ...userDetail,
                    [`${item.field.toLowerCase()}`]: event.target.value,
                  });
                  console.log(userDetail, editFieldId);
                }}
              />
            </div>
          );
        })}

        <div className="edit-buttons">
          <button className="save-button" onClick={onClickSave}>
            Save
          </button>
          <button className="cancel-button" onClick={onClickCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default RenderEditView;
