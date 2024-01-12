export async function GET(req, { params }) {
// export async function GET(req, obj) { // { obj에 url 파라미터 값 받아옴 }
  // console.log(obj);

  // Dynamic Route
  console.log(params.id);

  const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${params.id}`);
  const todo = await res.json();

  return Response.json({ todo });
}

// { 한번 해보기! }
// /todos/[id]/[name] 폴더를 만들고
// http://localhost:3000/todos/4/1 로 GET 요청을 하면
// [id] 폴더의 router.js도 동작하고 [name] 폴더 router.js도 동작함