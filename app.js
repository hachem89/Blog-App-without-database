import express from "express";
import bodyParser from "body-parser";
import _ from "lodash";

const app = express();
const port = 3000;

app.use(express.static("public")); //for css or js
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

let blogs = [
  {
    title: "What is Web Developement ?:",
    date: "01/20/2024",
    text: "Lorem ipsum dolor sit consectetur . At temporibus, recusandae ferendis earum aut doloribus aliquam! Accusantium eum quidemperferendis fugiat illo! Tempore ipsa reprehenderit, minus quibusdam fugitsequi. Laboriosam voluptatum, quis itaque in ratione ducimus sapiente quaerat voluptates corrupti, voluptate Lorem ipsum dolor sit, amet consectetur adipisicing elit. At temporibus, recusandae ferendis earum aut doloribus aliquam! Accusantium eum quidemperferendis fugiat illo! Tempore ipsa reprehenderit, minus quibusdam fugitsequi. Laboriosam voluptatum, quis itaque in ratione ducimus sapiente quaerat voluptates corrupti, voluptate Lorem ipsum dolor sit, amet consectetur adipisicing elit. At temporibus, recusandae ferendis earum aut doloribus aliquam! Accusantium eum quidemperferendis fugiat illo! Tempore ipsa reprehenderit, minus quibusdam fugitsequi. Laboriosam voluptatum, quis itaque in ratione ducimus sapiente quaerat voluptates corrupti, voluptate Lorem ipsum dolor sit, amet consectetur adipisicing elit. At temporibus, recusandae ferendis earum aut doloribus aliquam! Accusantium eum quidemperferendis fugiat illo! Tempore ipsa reprehenderit, minus quibusdam fugitsequi. Laboriosam voluptatum, quis itaque in ratione ducimus sapiente quaerat voluptates corrupti, voluptate Lorem ipsum dolor sit, amet consectetur adipisicing elit. At temporibus, recusandae ferendis earum aut doloribus aliquam! Accusantium eum quidemperferendis fugiat illo! Tempore ipsa reprehenderit, minus quibusdam fugitsequi. Laboriosam voluptatum, quis itaque in ratione ducimus sapiente quaerat voluptates corrupti, voluptate Lorem ipsum dolor sit, amet consectetur adipisicing elit. At temporibus, recusandae ferendis earum aut doloribus aliquam! Accusantium eum quidemperferendis fugiat illo! Tempore ipsa reprehenderit, minus quibusdam fugitsequi. Laboriosam voluptatum, quis itaque in ratione ducimus sapiente quaerat voluptates corrupti, voluptate Lorem ipsum dolor sit, amet consectetur adipisicing elit. At temporibus, recusandae ferendis earum aut doloribus aliquam! Accusantium eum quidemperferendis fugiat illo! Tempore ipsa reprehenderit, minus quibusdam fugitsequi. Laboriosam voluptatum, quis itaque in ratione ducimus sapiente quaerat voluptates corrupti, voluptate  corrupti, voluptate corrupti, voluptate corrupti, voluptate corrupti, voluptate corrupti, voluptate corrupti, voluptate  optio commodi. Odio incidunt consectetur aspernatur tenetur labore ad ssdss ahchem?",
    readTime: "",
    ID: 1,
  },
  {
    title: "What is HTML5 ?:",
    date: "02/20/2024",
    text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. At temporibus, recusandae ferendis earum aut doloribus aliquam! Accusantium eum quidemperferendis fugiat illo! Tempore ipsa reprehenderit, minus quibusdam fugitsequi. Laboriosam voluptatum, quis itaque in ratione ducimus sapiente quaerat voluptates corrupti, voluptate optio commodi. Odio incidunt consectetur aspernatur tenetur labore ad?",
    readTime: "",
    ID: 2,
  },
  {
    title: "The magic of CSS: cascade style sheet:",
    date: "12/20/2024",
    text: "Lorem ipsum, recusandae ferendis earum aut doloribus aliquam! Accusantium eum quidemperferendis fugiat illo! Tempore ipsa reprehenderit, minus quibusdam fugitsequi. Laboriosam voluptatum, quis itaque in ratione ducimus sapiente quaerat voluptates corrupti, voluptate optio commodi. Odio incidunt consectetur aspernatur tenetur labore ad?",
    readTime: "",
    ID: 3,
  },
  {
    title: "FullStack web developer roadmap:",
    date: "28/20/2024",
    text: "Lorem ipsum dolor sit, Accusantium eum \nquidemperferendis fugiat illo! Tempore ipsa reprehenderit, minus quibusdam fugitsequi. Laboriosam voluptatum, quis itaque in ratione ducimus sapiente quaerat voluptates corrupti, voluptate optio commodi. Odio incidunt consectetur aspernatur tenetur labore ad?",
    readTime: "",
    ID: 4,
  },
];

function countWords(str) {
  // Remove leading and trailing whitespace and split the string into an array of words
  const wordsArray = str.trim().split(/\s+/);
  // Return the length of the array, which represents the number of words
  return wordsArray.length;
}

//home page
app.get("/", (req, res) => {
  res.render("home.ejs", {
    blogs: blogs.map((blog) => ({
      ...blog,
      text: _.truncate(blog.text, { length: 150, separator: " " }),
      readTime: Math.ceil(countWords(blog.text) / 238) + " min",
    })),
  });
});

//blog page
app.get("/blog/:id", (req, res) => {
  const blogId = parseInt(req.params.id);
  const blog = blogs.find((blog) => blog.ID === blogId);
  if (blog) {
    res.render("blog.ejs", { blog: blog });
  } else {
    res.status(404).send("Blog post not found");
  }
});

//update the blog
app.get("/update/:id", (req, res) => {
  res.render("update.ejs", {
    blog: blogs.find((blog) => blog.ID === parseInt(req.params.id)),
  });
});

app.post("/blog/:id", (req, res) => {
  let updatedBlog = blogs.find((blog) => blog.ID === parseInt(req.params.id));
  updatedBlog.title = req.body.title;
  updatedBlog.text = req.body.text;
  res.render("blog.ejs", { blog: updatedBlog });
});

//create a blog
app.get("/create", (req, res) => {
  res.render("create.ejs");
});

app.post("/", (req, res) => {
  const date = new Date();
  const day = date.getDate().toString().padStart(2, "0"); // Ensure two digits, padding with '0' if necessary
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month starts from 0, so add 1
  const year = date.getFullYear();
  const formattedDate = `${day}/${month}/${year}`;

  const newBlog = {
    title: req.body.title,
    date: formattedDate,
    text: req.body.text,
    readTime: "",
    ID: blogs.length + 1,
  };
  blogs.push(newBlog);
  res.redirect("/");
});

//delete blog:
app.get("/delete/:id", (req, res) => {
  const blogId = parseInt(req.params.id);
  blogs.splice(blogId - 1, 1);
  blogs.forEach((blog, idx) => {
    blog.ID = idx + 1;
  });
  res.redirect("/");
});

//about page
app.get("/about", (req, res) => {
  res.render("about.ejs");
});

app.listen(port, () => {
  console.log(`server runnig on port ${port}`);
});
