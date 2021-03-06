import Header from './Components/Header';
import Nav from './Components/Nav';
import Footer from './Components/Footer';
import Home from './Components/Home';
import NewPost from './Components/NewPost';
import PostPage from './Components/PostPage';
import About from './Components/About';
import Missing from './Components/Missing';
import { Route, Switch, useHistory } from 'react-router-dom';
import {useState, useEffect} from 'react';
import {format} from 'date-fns';
import api from './api/posts';

function App() {

  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editBody, setEditBody] = useState('');
  const history = useHistory();

  useEffect( () => {
    const fetchPosts = async () => {
      try{
        const response = await api.get('/posts');
        setPosts(response.data);
      } catch (err) {
        if (err.response) {
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else {
          console.log(`Error: ${err.message}`);
        }
      }
    }

    fetchPosts();
  }, [])


  useEffect( () => {
    const filteredResults = posts.filter( post => (
      (post.body).toLowerCase()).includes(search.toLowerCase())
    || ( (post.title).toLowerCase()).includes(search.toLowerCase())
    );

    setSearchResults(filteredResults.reverse());
  }, [posts, search])

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), 'MMMM dd, yyyy pp'); 
    const newPost = {id, title: postTitle, datetime, body: postBody};
    const allPost = [...posts, newPost];
    setPosts(allPost);
    setPostTitle('');
    setPostBody('');
    history.push('/');
  }

const handleEdit = async (id) => {
  const datetime = format(new Date(), 'MMMM dd, yyyy pp'); 
    const updatedPost = {id, title: editTitle, datetime, body: editBody};
  try {
    const response = await api.put(`/posts/${id}`, updatedPost)
    setPost(posts.map( post => post.id === id ? { ...response.data} : post))
    setEditBody("");
    setEditTitle("");
    history.push("/");
  } 
  catch (err) {
    console.log(`Error: ${err.message}`);
  }
}



  const handleDelete = async (id) => {
    try {
      await api.delete(`/posts/${id}`);
      const postList = posts.filter(post => post.id !== id);
      setPosts(postList);
      history.push('/');
    } catch (err){
      console.log(`Error: ${err.message}`);
    }
    
  }

  return (
    <div className="App">
      <Header 
        title="React JS Blog"
      />
      <Nav 
        search = {search}
        setSearch = {setSearch}
      />      
      <Switch>

          <Route exact path='/'>
              <Home
                // posts = {posts}  
                posts = {searchResults} 
              />          
          </Route>

          <Route exact path='/post'>
            <NewPost 
              handleSubmit = {handleSubmit}
              postTitle = {postTitle}
              setPostTitle = {setPostTitle}
              postBody = {postBody}
              setPostBody = {setPostBody}
            />
          </Route>
          
          <Route exact path='/post/:id'>
              <PostPage 
                posts={posts}
                handleDelete = {handleDelete}
              /> 
          </Route>
          
          <Route exact path='/about'>
              <About/>
          </Route>
          
          <Route path='*'>
              <Missing />
          </Route>
       
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
