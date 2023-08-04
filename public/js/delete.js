// delete function 
document.addEventListener('DOMContentLoaded', function() {
    var deleteButtons = document.querySelectorAll('.deletePostButton');
    deleteButtons.forEach(function(button) {
      button.addEventListener('click', function() {
        var postId = this.getAttribute('data-id');
        fetch('/dashboard/' + postId, {
          method: 'DELETE',
        })
        .then(function(response) {
          if (!response.ok) {
            throw new Error('Error: ' + response.statusText);
          }
          return response.json();
        })
        .then(function(responseData) {
          location.reload();
        })
        .catch(function(error) {
          console.error('Error deleting post: ', error);
        });
      });
    });
  });
  