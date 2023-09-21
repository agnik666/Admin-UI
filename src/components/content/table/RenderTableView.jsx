import { Edit, Trash } from "react-feather";
import "./TableView.css";

const RenderTableView = ({
  users,
  selectedCheckbox,
  handleDelete,
  handleSelectCheckbox,
  handleEditView,
  handleEditFieldId,
}) => {
  return users.map((item) => {
    return (
      <tr
        key={item.id}
        className={selectedCheckbox.includes(item.id) ? "row-active" : ""}
      >
        <td className="table-rows">
          <input
            type="checkbox"
            checked={selectedCheckbox.includes(item.id)}
            onClick={() => {
              handleSelectCheckbox(item.id);
            }}
          />
        </td>
        <td className="table-rows">{item.name}</td>
        <td className="table-rows">{item.email}</td>
        <td className="table-rows">{item.role}</td>
        <td className="table-rows">
          <Edit
            className="row-icons"
            onClick={() => {
              handleEditView((prevState) => !prevState);
              handleEditFieldId(item.id);
            }}
          />

          <Trash
            className="row-icons"
            onClick={() => {
              handleDelete(item.id);
            }}
          />
        </td>
      </tr>
    );
  });
};

export default RenderTableView;
