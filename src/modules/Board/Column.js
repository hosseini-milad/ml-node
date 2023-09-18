import Task from "./Task"
import {Droppable} from 'react-beautiful-dnd';
function Column(props){
    return(
        <div className="board-item columnHolder">
            <h2 className="board-title">
                {props.column.title}
            
            <span className="count-lead">({props.tasks.length})</span>
            </h2>
            
            <Droppable droppableId={props.column.id}>
                {(provided,snapshot)=>(
                <ul className={snapshot.isDraggingOver?"board-list-item dragCol":"board-list-item"}
                    ref={provided.innerRef}
                    data-draggingover={snapshot.isDraggingOver}
                    {...provided.droppableProps}>
                    {props.tasks.map((task,i)=>(
                        <Task key={task.id} 
                            taskList={task}
                            index={i}/>
                    ))}
                {provided.placeholder}
                </ul>
                )}
            </Droppable>
        </div>
    )
}
export default Column