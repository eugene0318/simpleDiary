import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";
import DiaryEditor from "../components/DiaryEditor";
const Edit = () => {
  const [originData, setOriginData] = useState();
  const navigate = useNavigate(); //경로를 이동시킬 수 있는 함수를 navigate로 반환
  // const [searchParams, setSearchParams] = useSearchParams();
  // //setSearchParams라는 상태변화 함수로 쿼리를 변경해줄수 있다.
  // const id = searchParams.get("id");
  // const mode = searchParams.get("mode");

  // console.log(id + " " + mode);
  const { id } = useParams();
  const diaryList = useContext(DiaryStateContext);
  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = `감정 일기장 - ${id}번째 일기 수정`;
  }, []);
  useEffect(() => {
    if (diaryList.length >= 1) {
      const targetDiary = diaryList.find(
        (it) => parseInt(it.id) === parseInt(id)
      );
      //console.log(targetDiary);
      if (targetDiary) {
        setOriginData(targetDiary);
      } else {
        navigate("/", { replace: true });
      }
    }
  }, [id, diaryList]);
  return (
    <div>
      {originData && <DiaryEditor isEdit={true} originData={originData} />}
    </div>
  );
};

export default Edit;
