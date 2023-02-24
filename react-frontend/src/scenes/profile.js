import React, { useState, useEffect, useRef } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Post from "../components/post";
import Button from "../components/button";
import getPosts from "../callback/callback_post";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
const localserver = "http://localhost:3001";

const style = {
  border: "3px solid green",
  margin: 20,
  padding: 20,
  height: "100%",
  backgroundColor: "white",
  whiteSpace: "pre-line",
};


const Profile = () => {
  const isMounted = useRef(false);

  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [counter, setCounter] = useState(0);
  const [showOverlay, setShowOverlay] = useState(false);
  const [currentPostIndex, setCurrentPostIndex] = useState(0);

  const handleNext = () => {
    setCurrentPostIndex((prevIndex) => {
      if (prevIndex === posts.length - 1) {
        return 0;
      } else {
        return prevIndex + 1;
      }
    });
  };

  const handlePrev = () => {
    setCurrentPostIndex((prevIndex) => {
      if (prevIndex === 0) {
        return posts.length - 1;
      } else {
        return prevIndex - 1;
      }
    });
  };

  const currentPost = posts[currentPostIndex];

    const fetchData = async () => {
      console.log("Fetching more data...");
      await setIsLoading(true);
      //console.log("counter"+counter);
      await fetch(`${localserver}/posts/gethistory` + "?userId="+localStorage.getItem("userId"))
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not OK');
          }
          //console.log("the response is "+response.json());
          return response.json();
        })
        .then( (data) => {
          
            
          
          
          if(data.length !==0){
            console.log("the data length indiscover is :"+data.length);
            
            
            setPosts(precedent => [...precedent,...data]);
           setIsLoading(false);
         
            }else{
                setHasMore(false);
            }
          
        })
        .catch((error) => console.log(error));
    };

    

  useEffect(() => {
    if (isMounted.current == false) {
      console.log("welcome to discover!");
      fetchData();
      isMounted.current = true;
    } else {
      console.log("discover already mounted");
    }
    return;
  }, []);

  const sortPosts = (criteria) => {
    switch (criteria) {
      case "newest":
        setPosts((previousPosts) =>
          previousPosts.slice().sort((a, b) => {
            const dateA = new Date(a.date_created);
            const dateB = new Date(b.date_created);
            return dateB - dateA;
          })
        );
        break;
      case "oldest":
        setPosts((prevPosts) =>
          prevPosts
            .slice()
            .sort(
              (a, b) =>
                new Date(a.createdAt) - new Date(b.createdAt)
            )
        );
        break;
      case "most-likes":
        setPosts((previousPosts) =>
          previousPosts.slice().sort((a, b) => b.n_likes - a.n_likes)
        );
        break;
      case "most-dislikes":
        setPosts((previousPosts) =>
          previousPosts.slice().sort((a, b) => b.n_dislikes - a.n_dislikes)
        );
        break;
      default:
        break;
    }
  };

  const toggleOverlay = () => {
    setShowOverlay(!showOverlay);
  };

  return (
    <>
      <p>Wow look at these memes :o</p>
      <Button onClick={toggleOverlay}>Single Meme View</Button>
      
      {showOverlay && <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.8)", zIndex: 999 }}>
      <div style={{padding: '2rem'}}>
        <Button onClick={toggleOverlay}>Exit Single view</Button>
        <div style={{padding: '0.1rem', color: 'white'}}>Sort by...</div>
      <div>
        <Button variant={"like"} onClick={() => sortPosts("most-likes")}>Most Likes</Button>
        <Button variant={"dislike"} onClick={() => sortPosts("most-dislikes")}>Most Dislikes</Button>
      </div>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <button style={{height:50, width: 50, backgroundColor: '#EBFBDB', color: '#4A8D3E'}} onClick={handlePrev}>
        <FaChevronLeft />
        </button>
        <div style={{ width: "130vh", height: "80vh", overflow: "scroll" }}>
          <Post
            key={currentPost._id}
            likes={currentPost.n_likes}
            dislikes={currentPost.n_dislikes}
            image={currentPost.image}
            id={currentPost._id}
            comments={currentPost.comments}
            user_id={currentPost.user_id}
          >
            This is post #{currentPostIndex + 1} inside the post slider
          </Post>
        </div>
        <button style={{height:50, width: 50, backgroundColor: '#EBFBDB', color: '#4A8D3E'}} onClick={handleNext}>
        <FaChevronRight />
        </button>
      </div>
        </div>
        
        </div>}
      
      
      
      
      <br></br>
      <div style={{padding: '1rem', color: 'white'}}>Sort by...</div>
      <div>
        <Button variant={"like"} onClick={() => sortPosts("most-likes")}>Most Likes</Button>
        <Button variant={"dislike"} onClick={() => sortPosts("most-dislikes")}>Most Dislikes</Button>
      </div>


      {
        <InfiniteScroll
          dataLength={posts.length}
          next={fetchData}
          hasMore={hasMore}
          loader={<p>Fetching more memes...</p>}
          endMessage={
            <p>
              That's all there is to discover! Go make your own meme now :p
            </p>
          }
        >
          {posts.map((item, index) => {
            return (
              <Post
                key={item._id} 
                likes= {item.n_likes} 
                dislikes = {item.n_dislikes} 
                image={item.image} id={item._id} 
                comments={item.comments} 
                user_id={item.user_id}>
                This is post #{index+1} inside the infinite scroll
            </Post>
            );
        })}

    </InfiniteScroll>
      }
    </>)
}

export default Profile;
