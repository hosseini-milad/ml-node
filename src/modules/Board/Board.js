import { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import Column from './Column';
import Cookies from 'universal-cookie';
import { useEffect } from 'react';
import env from '../../env';
import UpdateTaskStatus from './UpdateTaskStatus';
const cookies = new Cookies();
const initalDataStatic = {
        tasks:{
            'task-1':{id:'task-1',content:"1.User Register"},
            'task-2':{id:'task-2',content:"2.User Confirm"},
            'task-3':{id:'task-3',content:"3.User Active"},
            'task-4':{id:'task-4',content:"4.Data Uploaded"},
            'task-5':{id:'task-5',content:"5.Sent to Bank"},
            'task-6':{id:'task-6',content:"6.Recieve Bank Acount"}
        },
        columns:{
            'lead':{
                id:"lead", title:"Lead",
                taskIds:['task-1','task-2','task-3','task-4']
            },
            'informations':{
                id:"informations", title:"Informações",
                taskIds:[]
            },
            'fiin':{
                id:"fiin", title:"FINE's",
                taskIds:['task-5','task-6']
            }
        },
        columnOrder:env.columnOrder
    }

function Board(props){
    const [taskState,setTaskState] = useState()
    //const initalData = 
    const [boardArray,setBoardArray] = useState()
    const token=cookies.get('fiin-login')
    useEffect(()=>{
        setTaskState()
        const postOptions={
            method:'get',
            headers: { 'Content-Type': 'application/json' ,
            "x-access-token": token&&token.token,
            "userId":token&&token.userId}
          }
        fetch(env.siteApi + "/task/currentState",postOptions)
        .then(res => res.json())
        .then(
            (result) => {
                setTaskState(result);
                setBoardArray(()=>UpdateTaskStatus({result:result,token:token}))
            },
            (error) => {
                //cookies.remove('fiin-login',{ path: '/' });
                //setTimeout(()=>(document.location.reload(),500))
                console.log(error)
            })
    },[])
    const updateState=(id,state,prior)=>{
        console.log(id,state,prior)
        const postOptions={
            method:'post',
            headers: { 'Content-Type': 'application/json' ,
            "x-access-token": token&&token.token,
            "userId":token&&token.userId},
            body:JSON.stringify({id:id,
                state:state,prior:prior})
          }
        fetch(env.siteApi + "/task/changeState",postOptions)
        .then(res => res.json())
        .then(
            (result) => {
                console.log(result);
            },
            (error) => {
                console.log(error)
            })
    }
    const changeOrder=(tasks)=>{
        const postOptions={
            method:'post',
            headers: { 'Content-Type': 'application/json' ,
            "x-access-token": token&&token.token,
            "userId":token&&token.userId},
            body:JSON.stringify({tasks:tasks})
          }
        fetch(env.siteApi + "/task/changeOrder",postOptions)
        .then(res => res.json())
        .then(
            (result) => {
                console.log(result);
            },
            (error) => {
                console.log(error)
            })
    }
    //console.log(taskState)
    const DragEnd=(result)=>{
        document.body.style.color="inherit"
        document.body.style.backgroundColor="inherit"
        const {destination,source,draggableId} = result
        if(!destination){
            return
        }
        if(destination.droppableId===source.droppableId&&
            destination.index === source.index)
            return;
        const start = boardArray.columns[source.droppableId]
        const finish = boardArray.columns[destination.droppableId]
        if(start === finish){
            const newTaskIds=Array.from(start.taskIds)
            newTaskIds.splice(source.index,1);
            newTaskIds.splice(destination.index,0,draggableId);
            
            changeOrder(newTaskIds)
            const newColumn = {
                ...start, taskIds:newTaskIds,
            }

            const newBoard = {
                ...boardArray,
                columns:{
                    ...boardArray.columns,
                    [newColumn.id]:newColumn
                }
            }
            setBoardArray(newBoard)
            return;
        }
        else{
            const startTaskIds=Array.from(start.taskIds)
            startTaskIds.splice(source.index,1);
            
            updateState(draggableId,destination.droppableId,destination.index)
            const newStart = {
                ...start, taskIds:startTaskIds,
            }
            const finishTaskIds=Array.from(finish.taskIds)
            finishTaskIds.splice(destination.index,0,draggableId);

            const newFinish = {
                ...finish, taskIds:finishTaskIds,
            }

            const newBoard = {
                ...boardArray,
                columns:{
                    ...boardArray.columns,
                    [newStart.id]:newStart,
                    [newFinish.id]:newFinish
                }
            }
            setBoardArray(newBoard)
            return;
        }
    }
    const DragStart=(result)=>{
        document.body.style.color="var(--blue)";
        document.body.style.transition='background-color 0.2s ease'
    }
    const DragUpdate=(update)=>{
        /*const {destination} = update;
        const opacity = destination?
            destination.index/Object.keys(boardArray.tasks).length:0
        document.body.style.backgroundColor=`rgba(153,141,217,${opacity})`*/
    }
    return(
        <div className='board-list'>
            {boardArray?<DragDropContext
            onDragStart={DragStart}
            onDragUpdate={DragUpdate}
            onDragEnd={DragEnd}>
                {boardArray.columnOrder.map((columnId)=>{
                    const column = boardArray.columns[columnId];
                    const tasks = column.taskIds.map(taskId=>boardArray.tasks[taskId]);
                    return(<Column key={column.id} column={column} tasks={tasks}/>)
                })}
            </DragDropContext>:<div>Updating</div>}
        </div>
    )
}
export default Board