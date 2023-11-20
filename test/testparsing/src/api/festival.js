import axios from "axios";


export const getFestival = async () => {
  try {
    const response = await axios.get('http://api.data.go.kr/openapi/tn_pubr_public_cltur_fstvl_api');

    if (response.status === 200) { // 요청에 대한 응답의 상태가 200 OK 일때만 결과를 리턴
      return response.data; 
    } else {
      throw new Error(`api error: ${response.status} ${response.statusText}`);
    }
  } catch (error) { // 서버가 죽었거나, 인터넷이 끊겼거나, URL이 잘못됐을 때 뜸
     console.error(error);
   }
};