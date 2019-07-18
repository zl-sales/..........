import axios from "@/libs/api.request";

// 反馈列表的获取
export const getfeedbackList = ({ pageNo, pageSize, token }) => {
  const data = {
    pageNo,
    pageSize
  };
  return axios.request({
    url: "/api/v2/user/feedbackList",
    data: data,
    headers: {
      qingniaopc: "1",
      token: token
    },
    method: "post"
  });
};

// 反馈列表详情
export const getfeedbackDetail = ({ guestbookId ,token}) => {
  const data = {
    guestbookId: guestbookId
  };
  return axios.request({
    url: "/api/v2/user/feedbackDetail",
    data: data,
    headers: {
      qingniaopc: "1",
      token: token
    },
    method: "post"
  });
};
