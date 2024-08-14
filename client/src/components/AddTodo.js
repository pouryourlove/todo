import React,{useState} from 'react'

export default function AddTodo({addItem}) {
    const [todoItem, setTodoItem] = useState({
        title: "",
    }) //사용자 입력을 저장할 객체 (id, title, done에 대한 정보를 저장해야하므로 객체. App.js에 있는 addItem 함수에 이미 id랑 done 지정해줬으므로 title만 필요함. 

    const onButtonClick = () => {
        addItem(todoItem); //add 함수 사용
        setTodoItem({
            title: '', //상태 초기화
        })
    }

  return (
    <div className=''>
        <input type="text" placeholder='add your new todo' value={todoItem.title} onChange={(e) => setTodoItem({title: e.target.value})}/>
        <button onClick={onButtonClick}>ADD</button>
    </div>
  )
}
