const roleData = [
  {
    id: parseInt(Math.random() * 1000000000000),
    roleString: '管理员',
    text: '系统管理员，拥有所有权限',
    key: 'admin',
    role: 'admin',
    roleIds: '1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36'
  },
  {
    id: parseInt(Math.random() * 1000000000000),
    roleString: '普通用户',
    text: '普通用户，拥有大部分权限',
    key: 'test',
    role: 'test',
    roleIds: '1,2,4,5,6,7,11,12,13,17,18,19,35,36,23,24,25,26,27,28,29,30,31,32,33'
  },
  {
    id: parseInt(Math.random() * 1000000000000),
    roleString: '编辑者',
    text: '文档管理人员，只能看富文本页面',
    key: 'editor',
    role: 'editor',
    roleIds: '36,24,25,3,11,12,13'
  },
  {
    id: parseInt(Math.random() * 1000000000000),
    roleString: '其他',
    text: '其他角色权限',
    key: 'custom',
    role: 'custom',
    roleIds: '1,2,4,5,6,7,8,9'
  }
];

const userData = [
  {
    id: parseInt(Math.random() * 1000000000000),
    username: 'admin',
    password: '123456',
    role: 'admin',
    date: '2020-10-13',
    text: '系统管理员，拥有所有权限',
    key: 'admin',
    location: 'Hefei',
    position: 'Admin',
    label: 'admin',
    skill: 'admin'
  },
  {
    id: parseInt(Math.random() * 1000000000000),
    username: 'test',
    password: '123456',
    role: 'test',
    date: '2020-10-13',
    text: 'test',
    key: 'test',
    location: 'Hefei',
    position: 'test',
    label: 'test',
    skill: 'test'
  },
  {
    id: parseInt(Math.random() * 1000000000000),
    username: 'editor',
    password: '123456',
    role: 'editor',
    date: '2020-10-13',
    text: 'editor',
    key: 'editor',
    location: 'Hefei',
    position: 'editor',
    label: '暂无',
    skill: '暂无'
  }
];

module.exports = {
  roleData,
  userData
};
