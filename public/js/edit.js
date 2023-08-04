//  edit function
document.addEventListener('DOMContentLoaded', function() {
    const postForm = document.querySelector('#postForm');
  
    postForm.addEventListener('submit', function(event) {
      event.preventDefault();
      
      const title = document.querySelector('#title').value;
      const content = document.querySelector('#content').value;
      const postId = document.querySelector('#postId').value;
  
      let method;
      let url;
      if (postId) {
        method = 'PUT';
        url = `/edit/${postId}`;
      } else {
        method = 'POST';
        url = '/edit';
      }
  
      fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, content })
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        window.location.href = '/dashboard';
      })
      .catch(error => {
        console.error('Error:', error);
      });
    });
  });
  