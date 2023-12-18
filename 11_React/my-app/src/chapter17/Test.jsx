import React, { useState } from 'react';

const CommentList = () => {
  const [comments, setComments] = useState([
    { id: 1, text: '첫 번째 댓글' },
    { id: 2, text: '두 번째 댓글' },
    // 다른 댓글들도 추가할 수 있습니다.
  ]);

  const [editingCommentId, setEditingCommentId] = useState(null);

  const handleEditClick = (commentId) => {
    setEditingCommentId(commentId);
  };

  const handleSaveClick = (commentId, newText) => {
    // 댓글을 수정한 후 상태 업데이트
    const updatedComments = comments.map((comment) =>
      comment.id === commentId ? { ...comment, text: newText } : comment
    );
    setComments(updatedComments);

    // 수정 중인 댓글을 초기화
    setEditingCommentId(null);
  };

  return (
    <div>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            {editingCommentId === comment.id ? (
              <CommentEdit
                comment={comment}
                onSave={(newText) => handleSaveClick(comment.id, newText)}
              />
            ) : (
              <div>
                <p>{comment.text}</p>
                <button onClick={() => handleEditClick(comment.id)}>수정</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

const CommentEdit = ({ comment, onSave }) => {
  const [newText, setNewText] = useState(comment.text);

  const handleInputChange = (e) => {
    setNewText(e.target.value);
  };

  const handleSaveClick = () => {
    onSave(newText);
  };

  return (
    <div>
      <input type="text" value={newText} onChange={handleInputChange} />
      <button onClick={handleSaveClick}>저장</button>
    </div>
  );
};

export default CommentList;