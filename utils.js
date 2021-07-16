export const trimText = (text, limit) =>
  text.length > limit ? `${text.slice(0, limit)}...` : text;

export const formatDate = date => {
  const theDate = new Date(date);
  return theDate.toLocaleDateString("ko", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
  //날짜를 표시해줄건데 toLocaleDateString()을 사용
  // July, 16, 2021 이런식으로 컴파일된다. 또는 2021년 7월 16일
};