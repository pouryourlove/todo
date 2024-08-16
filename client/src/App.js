import { useEffect, useMemo, useState } from "react";
import Todo from "./components/Todo";
import AddTodo from "./components/AddTodo";
import "./styles/App.scss";
import axios from "axios";

function App() {
  const [todoItems, setTodoItems] = useState([]);

  //[백엔드, 프론트 api 연결]
  // - read api
  useEffect(() => {
    console.log("첫 렌더링 완료");
    //[env 버전]
    console.log(process.env.REACT_APP_DB_HOST);

    //[app-config.js 버전]
    // console.log(`${API_BASE_URL}`);

    const getTodos = async () => {
      // [env 버전]
      let res = await axios.get(`${process.env.REACT_APP_DB_HOST}/api/todos`);

      //[app-config.js 버전]
      // let res = await axios.get(`${API_BASE_URL}/api/todos`);
      setTodoItems(res.data);
    };
    getTodos();
  }, []);

  // AddToDo 컴포넌트는 상위 컴포넌트 items에 접근 불가능
  //상위 컴포넌트인 App은 AddTodo에 접근 가능.
  //App 컴포넌트에 add() 함수를 추가하고 해당 함수를 AddTodo 프로퍼티로 넘겨 AddTodo 이용

  //create api

  //버튼 누르면 이 함수 실행됨.
  const addItem = async (newItem) => {
    // newItem.id = todoItems.length + 1; // key를 위한 id 추가
    // newItem.done = false; // done 초기화
    let res = await axios.post(
      `${process.env.REACT_APP_DB_HOST}/api/todos`,
      newItem
    );
    //현재 api 호출 후 응답을 기다리지 않고 바로 상태 업데이트를 진행하면,
    // 네트워크 지연 등으로 인해 예상치 못한 문제가 발생할 수 있습니다.
    // 따라서 비동기 작업 처리를 제대로 해주는 것이 좋습니다.
    if (res.status === 200) {
      setTodoItems([...todoItems, res.data]);
    } else {
      console.error("failed to delete item");
    }
  };
  //todoItems에 추가해주는거임

  //delete api
  const deleteItem = async (targetItem) => {
    let res = await axios.delete(
      `${process.env.REACT_APP_DB_HOST}/api/todos/${targetItem.id}`
    );
    const newTodoItems = todoItems.filter((e) => e.id !== targetItem.id);
    setTodoItems(newTodoItems);
  };

  //즉, update()함수를 app.js에서 만들지 않았어도 됐음.(프론트단)
  //하지만 api dldydgo update 하려면
  // (1) server api 이용해 서버 데이터를 업데이트 한 후
  // (2) 변경된 내용을 화면에 다시 출력하는 두 가지 작업이 필요

  const updateItem = async (targetItem) => {
    console.log("targetitems >>>,", targetItem);
    await axios.patch(
      `${process.env.REACT_APP_DB_HOST}/api/todos/${targetItem.id}`,
      targetItem
    );
  };

  return (
    <div className="App">
      {/* <Todo/>
      <Todo/>
      <Todo/> */}
      <AddTodo addItem={addItem} />
      {todoItems.map((item) => {
        console.log("item >>>>", item);
        return (
          <Todo
            key={item.id}
            item={item}
            deleteItem={deleteItem}
            updateItem={updateItem}
          />
        );
      })}
    </div>
  );
}

export default App;
