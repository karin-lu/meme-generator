const localserv = "http:/localhost:27017"

async function like_post(post_id,user_id,genre) {
    try {
    
      const res = await fetch(localserv+"/like/create", {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      query: {
        user_id:user_id,
        post_id:post_id,
        genre: genre
        
      }
    });
  
    }
    catch(error){
      console.error(error);
    }
  }

  module.exports = {like_post};