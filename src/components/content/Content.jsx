import React, { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import RenderSearchView from "./search/RenderSearchView";
import RenderTableView from "./table/RenderTableView";
import RenderPaginationButtons from "./pagination/RenderPaginationView";
import RenderEditView from "./edit/RenderEditView";
import "./Content.css";

const Content = () => {
  const [usersList, setUsersList] = useState([]);
  const [filteredUsersList, setFilteredUsersList] = useState([]);
  const [updatedUsersList, setUpdatedUsersList] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [parentCheckboxes, setParentCheckboxes] = useState([]);
  const [isEditView, setIsEditView] = useState(false);
  const [editFieldId, setEditFieldId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of items per page
  const { enqueueSnackbar } = useSnackbar();

  const fetchApiData = async () => {
    const url =
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";

    try {
      const response = await fetch(url);
      const data = await response.json();

      enqueueSnackbar("Successfully fetched data!", { variant: "success" });
      console.log(data);
      return data;
    } catch (err) {
      enqueueSnackbar(err.message, { variant: "error" });
    }
  };

  const setApiData = async () => {
    const data = await fetchApiData();
    setUsersList(data);
    setFilteredUsersList(data);
    setUpdatedUsersList(data);
  };

  const searchUser = (searchParam) => {
    setUsersList(updatedUsersList);
    setQuery(searchParam.toLowerCase());
    const filteredData = usersList.filter((user) => {
      return (
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.role.toLowerCase().includes(query)
      );
    });

    setFilteredUsersList(filteredData);
  };

  const deleteUserButton = (userId) => {
    const updatedFilteredUsersList = filteredUsersList.filter(
      (user) => user.id !== userId
    );
    const updatedList = updatedUsersList.filter((user) => user.id !== userId);

    setFilteredUsersList(updatedFilteredUsersList);
    setUpdatedUsersList(updatedList);
    setSelectedCheckboxes(selectedCheckboxes.filter((id) => id !== userId));
    enqueueSnackbar(`User with id ${userId} deleted`, { variant: "success" });
  };

  const onClickDeleteButton = (selected) => {
    console.log(selectedCheckboxes);
    if (!selected.length) {
      enqueueSnackbar("Please select a user first", { variant: "warning" });
      return;
    }

    const updatedFilteredUsersList = filteredUsersList.filter(
      (user) => !selected.includes(user.id)
    );
    const updatedList = updatedUsersList.filter(
      (user) => !selected.includes(user.id)
    );

    setFilteredUsersList(updatedFilteredUsersList);
    setUpdatedUsersList(updatedList);
    setSelectedCheckboxes([]);
    enqueueSnackbar(`${selected.length} users deleted!`, {
      variant: "success",
    });
  };

  const onSelectCheckbox = (selectedId) => {
    if (selectedCheckboxes.includes(selectedId)) {
      setSelectedCheckboxes(
        selectedCheckboxes.filter((id) => id !== selectedId)
      );
    } else {
      setSelectedCheckboxes([...selectedCheckboxes, selectedId]);
    }
  };

  const onSelectParentCheckbox = (currentPage) => {
    const selectedUsers = implementPagination().map((item) => item.id);
    if (parentCheckboxes.includes(currentPage)) {
      setSelectedCheckboxes(
        selectedCheckboxes.filter((item) => !selectedUsers.includes(item))
      );
      setParentCheckboxes((prevState) =>
        prevState.filter((item) => item !== currentPage)
      );
    } else {
      setSelectedCheckboxes((prevState) => [...prevState, ...selectedUsers]);
      setParentCheckboxes((prevState) => [...prevState, currentPage]);
    }
  };

  const getTotalPages = (usersList) => {
    return Math.ceil(usersList.length / itemsPerPage);
  };

  const implementPagination = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = filteredUsersList.slice(startIndex, endIndex);

    return paginatedData;
  };

  useEffect(() => {
    setApiData();
  }, []);

  useEffect(() => {
    searchUser(query);
  }, [query]);

  useEffect(() => {
    setFilteredUsersList(usersList);
  }, [usersList]);

  // console.log(usersList, filteredUsersList, updatedUsersList);
  return (
    <>
      {isEditView ? (
        <RenderEditView
          editFieldId={editFieldId}
          usersList={usersList}
          handleEditView={setIsEditView}
          handleUsersList={setUsersList}
          handleUpdatedUsersList={setUpdatedUsersList}
        />
      ) : (
        <>
          <div className="input-view">
            <RenderSearchView handleSearch={searchUser} />
          </div>

          <div className="container">
            <table>
              <thead>
                <tr>
                  <th>
                    <input
                      type="checkbox"
                      checked={parentCheckboxes.includes(currentPage)}
                      onClick={() => {
                        onSelectParentCheckbox(currentPage);
                      }}
                    />
                  </th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <RenderTableView
                  users={implementPagination()}
                  selectedCheckbox={selectedCheckboxes}
                  handleDelete={deleteUserButton}
                  handleSelectCheckbox={onSelectCheckbox}
                  handleEditView={setIsEditView}
                  handleEditFieldId={setEditFieldId}
                />
              </tbody>
            </table>
          </div>
          <div className="pagination-delete-view">
            <div className="delete-container">
              <button
                className="delete-button"
                onClick={() => {
                  onClickDeleteButton(selectedCheckboxes);
                }}
              >
                DELETE SELECTED
              </button>
            </div>
            <RenderPaginationButtons
              totalPages={getTotalPages(filteredUsersList)}
              currentPage={currentPage}
              handlePageChange={setCurrentPage}
            />
          </div>
        </>
      )}
    </>
  );
};

export default Content;
