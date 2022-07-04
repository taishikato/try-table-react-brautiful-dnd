import { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import draggable from "./draggable.svg";

const tableDataRaw = [
  {
    id: "temp-above",
    name: "Temperature - Above Canopy",
    values: ["85.5°F", "85.5°F", "85.5°F", "85.5°F", "85.5°F"],
  },
  {
    id: "temp-in",
    name: "Temperature - In Canopy",
    values: ["86.3°F", "85.5°F", "86.2°F", "87.5°F", "83.2°F"],
  },
  {
    id: "temp-below",
    name: "Temperature - Below Canopy",
    values: ["88.3°F", "89.5°F", "87.2°F", "87.5°F", "84.2°F"],
  },
];

function App() {
  const [tableData, setTableData] = useState(tableDataRaw);

  const handleOnDragEnd = (result: DropResult) => {
    if (!result || !result.destination) return;

    const items = [...tableData];
    const [draggedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, draggedItem);

    setTableData(items);
  };

  return (
    <div className="App">
      <main>
        <table className="my-14 mx-auto">
          <thead className="border-b border-[#0B1424]">
            <tr>
              <th className="w-[300px]"></th>
              <th className="text-center p-2 font-light">Jun 12th</th>
              <th className="text-center p-2 font-light">Jun 13th</th>
              <th className="text-center p-2 font-light">Current</th>
              <th className="text-center p-2 font-light">Jun 15th</th>
              <th className="text-center p-2 font-light">Jun 16th</th>
            </tr>
          </thead>
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="characters">
              {(provided) => (
                <tbody
                  className="tbody-ele"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {tableData.map(({ id, name, values }, index) => {
                    return (
                      <Draggable key={id} draggableId={id} index={index}>
                        {(provided) => (
                          <tr
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <td className="p-2 w-[300px] border-b border-[#E2E2E2] text-center">
                              {/* <td
                              className="p-2 border-b border-[#E2E2E2] text-center"
                              style={{
                                display: "grid",
                                gridTemplateColumns: "10px 1fr",
                              }}
                            > */}
                              {/* <td className="w-[300px]"> */}
                              <img src={draggable} />
                              {name}
                            </td>
                            {values.map((value, index) => (
                              <td
                                key={index}
                                className={`p-2 border-x border-b border-[#E2E2E2] text-center font-semibold flex-1 ${
                                  index === 2 ? "bg-[#e4f6fa]" : ""
                                } ${
                                  index === 3 || index === 4
                                    ? "bg-[#f3f3f3]"
                                    : ""
                                }`}
                              >
                                {value}
                              </td>
                            ))}
                          </tr>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </tbody>
              )}
            </Droppable>
          </DragDropContext>
        </table>
      </main>
    </div>
  );
}

export default App;
