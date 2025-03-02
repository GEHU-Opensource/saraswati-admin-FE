import Button from "./Button";

const TestCard = ({ title, date, onUpdate, onDelete }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow flex justify-between items-center">
      <div>
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="font-semibold text-gray-600">{date}</p>
      </div>
      <div className="space-x-2">
        {/* Debugging Logs */}
        <Button label="Update" onClick={() => {
          console.log("Update Clicked!");
          if (onUpdate) {
            onUpdate();
          } else {
            console.warn("onUpdate function is missing!");
          }
        }} variant="primary" />

        <Button label="Delete" onClick={() => {
          console.log("Delete Clicked!");
          if (onDelete) {
            onDelete();
          } else {
            console.warn("onDelete function is missing!");
          }
        }} variant="danger" />
      </div>
    </div>
  );
};

export default TestCard;
