// 글 등록 시
document.querySelector('#write-form').addEventListener('submit', async (e) => {
  e.preventDefault(); // { 여기서는 동기식 역할 막아줌, 동기식은 새로고침 발생O 비동기는 새로고침 발생X }
  const title = e.target.title.value; 
  const content = e.target.content.value;
  
  // { 프론트단에서의 유효성 검사 }
  if (!title) {
    return alert('제목을 입력하세요');
  }
  
  try {
    // { 비동기일 때, React는 비동기 방식이므로 밑에 방식으로 사용 }
    const formData = new FormData() // multipart/form-data 타입으로 보냄
    formData.append('title', title);
    formData.append('content', content);
    formData.append('img', e.target.img.files[0]); // { 첫번째 인자값('img')을 /routes/post.js의 upload.single('img') <- 값이랑 일치시켜야 함 }

    // await axios.post('/post/write', { title, content }); // { axios 라이브러리가 알아서 josn 타입으로 서버에 보내줌 }
    // { 비동기일 때 페이지 이동 }
    // const result = await axios.post('/post/write', { title, content });
    const result = await axios.post('/post/write', formData);
    console.log(result.data); // { post.js 에서 서버로 보낸 { flag: true, message: '등록 성공'} 담겨있음 }

    if (!result.data.flag) {
      return alert(result.data.message);
    }
    location.href = '/post';

  } catch (err) {
    console.error(err);
  }

  e.target.title.value = '';
  e.target.content.value = '';
})