:rules="[
  {required: true, message: '必填项', trigger: 'change'},
  {type: 'number', message: '必须为数字值', trigger: 'blur'},
  {pattern: /^1[34578]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur'}
]