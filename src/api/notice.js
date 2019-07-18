import axios from '@/libs/api.request'
export const getNotice = () => {
  return axios.request({
    url: 'https://www.easy-mock.com/mock/5c7dd0639a73e31352e8802c/example/https:/www.easy-mock.com/mock/5c7dd0639a73e31352e8802c/example_copy_1551850488061#!method=get',
    methods: 'get'
  })
}
