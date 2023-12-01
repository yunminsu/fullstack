// 글 삭제 시
document.querySelectorAll('.delete').forEach((deleteBtn, index) => {
  deleteBtn.addEventListener('click', async (e) => {
    try {
      const result = await axios.delete(`/post/${e.target.dataset.id}`); 
      console.log(result.data);

      // { status로 응답 관리 }
      if (result.status === 200) {
        // 왜 새로고침을 해야 삭제된 결과가 반영되는지?
        // => 삭제 성공 시 HTML도 제거 하는 코드 작성(CSR방식)
        e.target.parentElement.parentElement.remove();
  
        // => 아니면 '/post'로 요청을 보내서 새롭게 글 목록을 받아옴(SSR방식, 새로고침 발생)
        // location.href = '/post'
  
        // 리액트에서는? state를 변경하면 됨  
      } else {
        alert(result.response.data.message);
      }
    } catch (err) {
      console.error(err);
    }
  });
});

// (참고) HTML 보여주는 법(2가지)
// 1) 서버에서 다 만들어서 보내기(SSR)
// 2) 서버는 데이터만 보내고 브라우에서 완성하기(CSR)
// Ajax를 쓰면 서버가 보낸 데이터만 받아 JS로 HTML을 동적으로 만들어서 현재 페이지에 CSR 구현 가능
