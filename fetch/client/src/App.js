import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

function App() {
  const [diaryList, setDiaryList] = useState(null);
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const nowDate = `${year}-${month}-${day}`;

  useEffect(() => {
    fetchDiary();
  }, []);

  const fetchDiary = async () => {
    const res = await axios.get("http://localhost:4000/api/diary");
    setDiaryList(res.data);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const content = e.target.content.value;
    axios.post("http://localhost:4000/api/diary", {
      title,
      content,
      date: nowDate,
    });
    fetchDiary();
  };

  const DeleteHandler = async (id) => {
    await axios.delete(`http://localhost:4000/api/diary/${id}`);
    fetchDiary();
  };
  return (
    <>
      <Container>
        <Title>일기를 써봅시다!</Title>
        <Form onSubmit={onSubmitHandler}>
          <Input name="title" placeholder="제목" />
          <TextArea name="content" placeholder="내용" />
          <SubmitButton type="submit">추가</SubmitButton>
        </Form>
        {diaryList && (
          <DiaryList>
            {diaryList.map((diary) => (
              <DiaryItem key={diary.id}>
                <div>
                  <DiaryTitle> {diary.title}</DiaryTitle>
                  <DiaryContent>{diary.content}</DiaryContent>
                  <DiaryDate>{diary.date}</DiaryDate>
                </div>
                <DeleteBtn onClick={() => DeleteHandler(diary.id)}>
                  삭제
                </DeleteBtn>
              </DiaryItem>
            ))}
          </DiaryList>
        )}
        <Alert>그만 줄여요!</Alert>
      </Container>
    </>
  );
}

export default App;

const Container = styled.div`
  display: flex;
  width: 100vw;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 30px;
`;

const Title = styled.p`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  @media only screen and (max-width: 350px) {
    color: pink;
  }
`;

const Form = styled.form`
  width: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  font-size: 16px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  font-size: 16px;
`;

const SubmitButton = styled.button`
  padding: 10px;
  width: 50%;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

const DiaryList = styled.ul`
  list-style: none;
  width: 60%;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.25);
`;

const DiaryItem = styled.li`
  border-bottom: 1px solid #eee;
  padding: 20px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DiaryTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 10px;
`;

const DiaryContent = styled.p`
  font-size: 16px;
  color: #555;
`;

const Alert = styled.p`
  font-size: 40px;
  font-weight: bold;
  color: red;
  display: none;
  @media only screen and (max-width: 350px) {
    display: flex;
  }
`;
const DiaryDate = styled.span`
  font-size: 14px;
  color: #888;
`;

const DeleteBtn = styled.button`
  font-size: 14px;
  font-weight: bold;
  color: white;
  background-color: gray;
  padding: 10px;
  margin-right: 10px;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: red;
  }
`;
