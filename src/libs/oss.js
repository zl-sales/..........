import plupload from 'plupload'
import '@/assets/crypto1/crypto/crypto.js'
import '@/assets/crypto1/hmac/hmac.js'
import '@/assets/crypto1/sha1/sha1.js'
const Base64 = require('base-64')

const OSSConfig = {
  ossParams: {
    key: '', // key后面有用，先默认设空字符串
    success_action_status: '200', // 默认200
    accessKeyId: 'LTAIYq05R25bsPAg',
    accessKeySecret: 'xvVTxdEMrvH4CIWpD6taFCT6YpwIhb',
    bucket: 'http://hahazixun.oss-cn-qingdao.aliyuncs.com',
    host: 'http://hahazixun.oss-cn-qingdao.aliyuncs.com'
  }

  // ossParams: {
  //     key: '', // key后面有用，先默认设空字符串
  //     success_action_status: '200', // 默认200
  //     accessKeyId: 'LTAID8qM41cPsxBn',
  //     accessKeySecret: 'jIuV5FRTBoxX1zLVzWQAIAerM2PqFG',
  //     bucket: 'zixunapp',
  //     host: 'http://oss-cn-qingdao.aliyuncs.com'
  //   }

  // ossParams: {
  // key: '', // key后面有用，先默认设空字符串
  // success_action_status: '200', // 默认200
  // accessKeyId: 'LTAID8qM41cPsxBn',
  // accessKeySecret: 'jIuV5FRTBoxX1zLVzWQAIAerM2PqFG',
  // bucket: 'http://qingniao-pc.oss-cn-zhangjiakou.aliyuncs.com',
  // host: 'http://qingniao-pc.oss-cn-zhangjiakou.aliyuncs.com'
  //   }

}

var g_object_name, new_multipart_params, suffix

// ==========================================================这一串是为了文件的名字👇====================================================//
function random_string (len) {
  len = len || 32
  var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
  var maxPos = chars.length
  var pwd = ''
  for (let i = 0; i < len; i++) {
    pwd += chars.charAt(Math.floor(Math.random() * maxPos))
  }
  return pwd
}

function get_suffix (filename) {
  let pos = filename.lastIndexOf('.')
  let fname = ''
  if (pos != -1) {
    fname = filename.substring(pos)
  }
  return fname
}

function calculate_object_name (filename) {
  suffix = get_suffix(filename)
  g_object_name = OSSConfig.ossParams.key + random_string(20) + suffix
  return ''
}

function set_upload_param (up, filename, ret) {
  g_object_name = OSSConfig.ossParams.key
  if (filename != '') {
    suffix = get_suffix(filename)
    calculate_object_name(filename)
  }
  var policyText = {
    expiration: '2020-01-01T12:00:00.000Z', // 设置该Policy的失效时间，超过这个失效时间之后，就没有办法通过这个policy上传文件了
    conditions: [
      ['content-length-range', 0, 1048576000] // 设置上传文件的大小限制
    ]
  }
  var policyBase64 = Base64.encode(JSON.stringify(policyText))
  let message = policyBase64
  var bytes = Crypto.HMAC(Crypto.SHA1, message, OSSConfig.ossParams.accessKeySecret, {
    asBytes: true
  })
  var signature = Crypto.util.bytesToBase64(bytes)
  new_multipart_params = {
    key: g_object_name,
    policy: policyBase64,
    OSSAccessKeyId: OSSConfig.ossParams.accessKeyId,
    success_action_status: 200, // 让服务端返回200,不然，默认会返回204
    bucket: OSSConfig.ossParams.bucket,
    signature: signature
  }

  up.setOption({
    url: OSSConfig.ossParams.host,
    multipart_params: new_multipart_params
  })

  up.start()
}
// ==========================================================这一串是为了文件的名字👆====================================================//

var UPLOADER = editor => {
  let uploader = new plupload.Uploader({
    runtimes: 'html5,flash,silverlight,html4',
    browse_button: editor.imgMenuId,
    multi_selection: true,
    auto_start: true,
    // 我也不知道这是干啥的 以后慢慢研究，注释掉倒是没啥影响
    // flash_swf_url: '../../public/lib/plupload-2.1.2/js/Moxie.swf',
    // silverlight_xap_url: '../../public/lib/plupload-2.1.2/js/Moxie.xap',
    url: OSSConfig.ossParams.host,

    filters: {
      mime_types: [
        // 只允许上传图片和zip,rar文件
        {
          title: 'Image files',
          extensions: 'jpg,jpeg,gif,png,bmp'
        },
        {
          title: 'video files',
          extensions: 'mp4,3gp'
        }
      ],
      max_file_size: '10mb', // 最大只能上传10mb的文件
      prevent_duplicates: false // 不允许选取重复文件
    },

    init: {
      PostInit: function () {
        set_upload_param(uploader, '', false)
        return false
      },

      BeforeUpload: function (up, file) {
        set_upload_param(up, file.name, true)
      },

      FilesAdded: function (up) {
        up.start() // 选择完后直接上传
      },

      FileUploaded: function (up, file, info) {
        if (info.status == 200) {
          var file_type = file.type
          var is_image = file_type.indexOf('image')
          var is_video = file_type.indexOf('video')
          if (is_image > -1) {
            editor.cmd.do(
              'insertHtml',
              '<img src="' +
                            OSSConfig.ossParams.host +
                            '/' +
                            g_object_name +
                            '" style="width: auto; max-width:100%;"/>'
            )
          }
          // if (is_video > -1) {
          // 	editor.cmd.do(
          // 		'insertHtml',
          // 		'<video controls src="' +
          // 			_this.ossParams.host +
          // 			_this.g_object_name +
          // 			'" style="width: auto; max-width:100%;"></video>',
          // 	)
          // }
        } else {
          console.log(info.response)
        }
      },

      Error: function (up, err) {
        if (err.code == -600) {
          console.log('\n选择的文件太大了,可以根据应用情况，在upload.js 设置一下上传的最大大小')
        } else if (err.code == -601) {
          console.log('\n选择的文件后缀不对,可以根据应用情况，在upload.js进行设置可允许的上传文件类型')
        } else if (err.code == -602) {
          console.log('\n这个文件已经上传过一遍了')
        } else {
          console.log('\nError xml:' + err.response)
        }
      }
    }
  })
  return uploader
}

export {
  UPLOADER
}
