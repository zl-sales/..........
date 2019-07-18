import axios from '@/libs/api.request'

export const getNodeList = () => {
  return axios.request({
    url: 'api/v1/web/info/getNodeList',
    method: 'post'
  })
}

export const getTagList = ({ nodeId }) => {
  const data = {
    nodeId: nodeId
  }
  return axios.request({
    url: 'api/v1/web/info/getTagList',
    data,
    method: 'post'
  })
}

export const issue = ({ content, images, nodeId, tagIds, tagNames, title, type }) => {
  const data = {
    content: content,
    images: images,
    nodeId: nodeId,
    tagIds: tagIds,
    tagNames: tagNames,
    title: title,
    type: type
  }
  return axios.request({
    url: 'api/v1/web/info/issue',
    data,
    method: 'post'
  })
}

export const draft = ({ content, images, nodeId, tagIds, tagNames, title, type, status }) => {
  const data = {
    content: content,
    images: images,
    nodeId: nodeId,
    tagIds: tagIds,
    tagNames: tagNames,
    title: title,
    type: type,
    status: status
  }
  return axios.request({
    url: 'api/v1/web/info/issue',
    data,
    method: 'post'
  })
}

export const updata = ({ content, images, nodeId, infoId, tagIds, tagNames, title, type, status }) => {
  const data = {
    content: content,
    images: images,
    nodeId: nodeId,
    infoId: infoId,
    tagIds: tagIds,
    tagNames: tagNames,
    title: title,
    type: type,
    status: status
  }
  return axios.request({
    url: 'api/v1/web/info/updateInfo',
    data,
    method: 'post'
  })
}
