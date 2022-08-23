import "./App.css";
import React, { createContext, useEffect, useReducer, useRef } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import New from "./pages/New";
import Edit from "./pages/Edit";
import Diary from "./pages/Diary";

//components
//import MyButton from "./components/MyButton";
//import MyHeader from "./components/MyHeader";
//import RouteTest from "./components/RouteTest";

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      newState = [action.data, ...state];
      break;
    }
    case "REMOVE": {
      newState = state.filter((it) => it.id != action.targetId);
      break;
    }
    case "EDIT": {
      newState = state.map((it) =>
        it.id === action.data.id ? { ...action.data } : it
      );
      break;
    }
    default:
      return state;
  }
  localStorage.setItem("diary", JSON.stringify(newState));
  return newState;
};

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();
const dummyData = [
  {
    id: 1,
    emotion: 1,
    content: "오늘의일기 1번",
    // date의 값은 ms로 넣어야 함
    date: 1648633885549,
  },
  {
    id: 2,
    emotion: 2,
    content: "오늘의일기 2번",
    // date의 값은 ms로 넣어야 함
    date: 1648633885550,
  },
  {
    id: 3,
    emotion: 3,
    content: "오늘의일기 2번",
    // date의 값은 ms로 넣어야 함
    date: 1648633885551,
  },
  {
    id: 4,
    emotion: 4,
    content: "오늘의일기 4번",
    // date의 값은 ms로 넣어야 함
    date: 1648633885552,
  },
  {
    // 가장 최신의 일기글
    id: 5,
    emotion: 5,
    content: "오늘의일기 5번",
    // date의 값은 ms로 넣어야 함
    date: 1648633885553,
  },
];
function App() {
  //const [data, dispatch] = useReducer(reducer, dummyData);
  const [data, dispatch] = useReducer(reducer, []);
  useEffect(() => {
    const localData = localStorage.getItem("diary");
    if (localData) {
      const diaryList = JSON.parse(localData).sort(
        (a, b) => parseInt(b.id) - parseInt(a.id)
      );

      if (diaryList.length >= 1) {
        dataId.current = parseInt(diaryList[0].id) + 1;
      }
      // 초기값을 설정해주는 액션
      dispatch({ type: "INIT", data: diaryList });
    }
  }, []);

  // key 초기값 변경
  const dataId = useRef(0);

  //console.log(new Date().getTime());
  //create
  const onCreate = (date, content, emotion) => {
    dispatch({
      type: "CREATE",
      data: {
        id: dataId.current,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
    dataId.current += 1;
  };
  //remove
  const onRemove = (targetId) => {
    dispatch({
      type: "REMOVE",
      targetId,
    });
  };
  //edit
  const onEdit = (targetId, date, content, emotion) => {
    dispatch({
      type: "EDIT",
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
  };
  const env = process.env;
  env.PUBLIC_URL = env.PUBLIC_URL || "";
  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider
        value={{
          onCreate,
          onEdit,
          onRemove,
        }}
      >
        <BrowserRouter>
          <div className="App">
            {/* <MyHeader
        headText={"App"}
        leftChild={
          <MyButton text={"왼쪽버튼"} onClick={() => alert("왼쪽클릭")} />
        }
        rightChild={
          <MyButton
            text={"오른쪽버튼"}
            onClick={() => alert("오른쪽 클릭")}
          />
        }
      />
      <h2>App.js</h2>
      <MyButton
        text={"버튼"}
        onClick={() => alert("버튼 클릭")}
        type={"positive"}
      />
      <MyButton
        text={"버튼"}
        onClick={() => alert("버튼 클릭")}
        type={"negative"}
      />
      <MyButton text={"버튼"} onClick={() => alert("버튼 클릭")} /> */}
            {/* <img src={process.env.PUBLIC_URL + `/assets/emotion1.png`} /> */}
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/new" element={<New />}></Route>
              <Route path="/edit/:id" element={<Edit />}></Route>
              <Route path="/diary/:id" element={<Diary />}></Route>
              <Route path="/diary" element={<Diary />}></Route>
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
