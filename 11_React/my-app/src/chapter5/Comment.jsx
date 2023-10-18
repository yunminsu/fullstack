// CSS 스타일 작성(인라인 스타일로 넣어줄 객체 형태)
const styles = {
  wrapper: {
    margin: 8,
    padding: 8,
    display: "flex",
    flexDirection: "row",
    border: "1px solid gray",
    borderRadius: 16,
  },
  imageContainer: {},
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  contentContainer: {
    marginLeft: 8,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  nameText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
  contentText: {
    color: "black",
    fontSize: 16,
  },
};
// 사용할 이미지 경로
// https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png

// 댓글들은 반복되므로 재사용 가능한 컴포넌트를 만듦
function Comment(props) {
  return (
    <div style={styles.wrapper}>
      {/* 사람모양의 프로필 이미지 */}
      <div style={styles.imageContainer}>
        <img 
        src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png" 
        alt="아바타 이미지" 
        style={styles.image}
        />
      </div>

      {/* 댓글 작성자와 내용 */}
      <div style={styles.contentContainer}>
        {/* <span style={styles.nameText}>윤민수</span>
        <span style={styles.contentText}>제가 만든 컴포넌트입니다.</span> */}
        {/* Quiz: 작성자와 내용을 props로 받아서 출력하기 */}
        <span style={styles.nameText}>{props.name}</span>
        <span style={styles.contentText}>{props.content}</span>
      </div>

    </div>
  );
}

export default Comment;
