module.exports = (req, res, next) => {
  if (req.method === 'POST' && req.path === '/login') {
    if (req.body.username === 'jj' && req.body.password === '123123') {
      return res.status(200).json({
        user: {
          token: '123',
          name: '蒋静',
          identity: 0,  //普通用户
          email: 'xx@qq.com',
          avatar_url: 'string'
        }
      })
    } else if (req.body.username === 'zwh' && req.body.password === '123123') {
      return res.status(200).json({
        user: {
          token: '123',
          name: '张文瀚',
          identity: 1,  // 管理员
          email: 'xx@qq.com',
          avatar_url: 'string'
        }
      })
    } else {
      return res.status(400).json({ message: '用户名或密码错误' })
    }
  }
  next();
}

// module.exports = (req, res, next) => {
//   if (req.method === 'GET' && req.path === '/me') {
//     if (req.query.token === '123') {
//       return res.status(200).json({
//         user: {
//           token: '123',
//           name: 'JJ',
//           identity: 0,  //普通用户
//           email: 'xx@qq.com',
//           avatar_url: 'string'
//         }
//       })
//     } else {
//       return res.status(400).json({ message: '用户名或密码错误' })
//     }
//   }
//   next();
// }