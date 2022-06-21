const router = require('express').Router();
const { Post, Comment, User } = require('../Develop/models');

// get all posts for homepage
router.get('/', async (req, res) => {
  try {
    const dbPostData = await Post.findAll({
      include: [{
          model: User,
          attributes: ['username']
        }]
    });
    const posts = dbPostData.map(post => post.get({ plain: true }));
    res.render('all-posts', {
      posts,
      loggedIn: req.session.loggedIn
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});
// router.get('/', async (req, res) => {
//   Post.findOne({
//     include: {
//       model: User,
//       attributes: ['username']
//     }
//   })
//   .then((blogInfo) => {
//     const blogs = blogInfo.map((Post) => blogInfo.get({plain: true}));
//     res.render('home', {blogs, loggedIn: req.session.loggedIn})
//   })
// });

// get single post
router.get('/post/:id', async (req, res) => {
  Blog.findOne({
    where: {
      id: req.params.id
    },
    include: [{
      model: User,
      attributes: ['username']
    },
  {
    model: Comment,
    attributes: ['id','content','blog_id','user_id','createdAt'],
    include: {
      model: User,
      attributes: ['username']
    }
  }]
  })
  .then((results)=>{
    const blogs = results.get({plain: true});
    res.render('viewBlog', {blogs, loggedIn: req.session.loggedIn})
  })
  .catch((err) => res.json(err))
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});

module.exports = router;
