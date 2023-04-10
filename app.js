const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');
const Blog = require('./models/blog');

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = "mongodb+srv://new-user:test12345@nodejs1.ymmir2j.mongodb.net/node-auth";
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

  mongoose.connection.on('connected', () =>
  console.log('Connected to mongo instance')
);

mongoose.connection.on('error', err =>
  console.log('Error connecting to mongo', err)
);

// routes
app.get('*', checkUser)
app.get('/', (req, res) => res.render('home'));
app.get('/data', requireAuth, (req, res) => {
  Blog.find().sort({ createdAt: -1 })
  .then(result => {
  res.render('data', { blogs: result, title: 'All blogs' });
  })
  .catch(err => {
  console.log(err);
  });
});


//About Page
app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

//Ajax Post test Page

//Mine Put Edit test
app.get('/edit', (req,res) => {
  res.render('edit')
});
// app.get('/update', (req, res) => {
//   res.render('update', { title: 'Update' });
// });

app.use(authRoutes);

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});



