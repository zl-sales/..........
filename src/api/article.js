import axios from "@/libs/api.request";

export const getShareNews = ({
  shareCode
}) => {
  const data = {
    shareCode: shareCode
  };
  return axios.request({
    url: "api/v1/info/getShareNews",
    data: data,
    method: "post"
  });
};

export const getNewsDetail = ({
  infoId
}) => {
  const data = {
    infoId: infoId
  };
  return axios.request({
    url: "api/v1/web/info/getNewsDetail",
    data: data,
    method: "post"
  });
};

export const getContentList = ({
  endDate,
  pageNo,
  pageSize,
  requestDate,
  startDate,
  status,
  title,
  userId
}) => {
  const data = {
    endDate,
    pageNo,
    pageSize,
    requestDate,
    startDate,
    status,
    title,
    userId
  };
  return axios.request({
    url: "/api/v1/web/info/getContentList",
    data: data,
    method: "post"
  });
};

export const getWxConfig = ({
  url
}) => {
  const data = {
    url
  };
  return axios.request({
    url: "/api/v2/web/wx/getWxConfig",
    data: data,
    method: "post"
  });
};

export const issueVideo = ({
  content,
  coverImage,
  latitude,
  longitude,
  nodeId,
  size,
  time,
  title,
  type,
  url
}) => {
  const data = {
    content,
    coverImage,
    latitude,
    longitude,
    nodeId,
    size,
    time,
    title,
    type,
    url
  };
  return axios.request({
    url: "/api/v1/web/info/issueVideo",
    data: data,
    method: "post"
  });
};

export const getcomment = ({
  infoId,
  pageNo,
  pageSize,
}) => {
  const data = {
    infoId,
    pageNo,
    pageSize
  };
  return axios.request({
    url: "/api/v1/comment/list",
    data: data,
    headers: {
      qingniaopc: "1",
      token: 'd5399f03d8e34fd2bb32dd3eafb57a27'
    },
    method: "post"
  });
};
