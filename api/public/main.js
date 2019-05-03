$(document).ready(function(){
	$('#searchUser').on('keyup', function(e){
		let username = e.target.value;
		// make request to github

		$.ajax({
			url:'https://api.github.com/users/' + username,
			data:{
				client_id:'7d3224d9004777326986',
				client_secret:'2e0e7851c197102a5a9dbfe3ab6876d3042e3099'
			}
		}).done(function(user){

			$.ajax({
				url:'https://api.github.com/users/' + username + '/repos',
				data:{
					client_id:'7d3224d9004777326986',
					client_secret:'2e0e7851c197102a5a9dbfe3ab6876d3042e3099',
					sort: 'created: asc',
					per_page: 5
				}
			}).done(function(repos){
				$.each(repos, function(index, repo){
					$('#repos').append(`
						<div class="well">
							<div class="row">

								<div class="col-md-7">
									<strong>${repo.name}</strong>: ${repo.description}
								</div>

								<div class="col-md-3">
									<span class="label label-default">Forks: ${repo.forks_count}</span>
									<span class="label label-primary">Watchers: ${repo.watchers_count}</span>
									<span class="label label-success">Stars: ${repo.stargazers_count}</span>
								</div>


								<div class="col-md-2">
									<a href="${repo.html_url}" target="_blank" class="btn btn-default">Repo Page</a>
								</div>

							</div>
						</div>
					`);
				});
			});





			$('#profile').html(`

				<div class="panel panel-default">
					<div class="panel-heading">
						<h3 class="panel-title">${user.name}</h3>
					</div>

					<div class="panel-body">
						<div class="row">
							<div class="col-md-3">
							 	<img class="thumbnail avatar" src="${user.avatar_url}">
							 	<a target="_blank" class="btn btn-primary btn-block" href="${user.html_url}">View Profile</a>
							</div>

							<div class="col-md-9">
								<span class="label label-default">Public Repos: ${user.public_repos}</span>
								<span class="label label-primary">Public Gists: ${user.public_gists}</span>
								<span class="label label-success">Followers: ${user.followers}</span>
								<span class="label label-info">Following: ${user.following}</span>
								<br><br>
								<ul class="list-group">
									<li class="list-group-item">Company: ${user.company}</li>
									<li class="list-group-item">Website/blog: ${user.blog}</li>
									<li class="list-group-item">Location: ${user.location}</li>
									<li class="list-group-item">Member Since: ${user.created_at}</li>
								</ul>
							</div>
						</div>
					</div>
				</div>

				<h3 class="page-header">Latest Repos</h3>
				<div id="repos"></div>
			`);
		});
	});
});


$(document).ready(function() {
  
  //Store given consumer key
  var client =  'f92smiWRexvzEL6eIYgC3SMJ4szSCZEvpqiwP9LD5OISyE8eH8';
  
    
  // click function 
   $('#search_button').click(function(){
     
     // get value from textbox
     var urlTumblrRaw = $('#search_bar').val();
     // getting rid of http protocol sintax 
     var urlTumblr = urlTumblrRaw.replace(/.*?:\/\//g, "");

  
     //run ajax call and pass parameter from search
     $.ajax({
    
       url: 'http://api.tumblr.com/v2/blog/' + urlTumblr.replace('/', '') + '/posts',
       method: 'get',
       // make sure to use jsonp. It is a requirement to consume the Tumblr api
       dataType: "jsonp",
       data: ({ api_key: client}),
       // upon sucess exceute the following code
       success: function(data){
           console.log(data);
           
           // check if  input is returning object with data
           if((data.response).length === 0){
             $('#tumblr_search').html('no data returned, make sure you entered a Tumblr url');
             } 

             else {
          //check if seach has been already excuted and clean the div for the next search
          if($('#tumblr_search').not(':empty')){
            $('#tumblr_search').empty();
          }
          
          // variables to access the object returned
          var objectBlog = data.response.blog;

          var objectPosts = data.response.posts;

          // getting title of the tumblr
          //$('#title_tumblr').html(objectBlog.title + ' recent blog posts');
          
          $('#tumblr_title').html(objectBlog.title);
          $('#tumblr_name').html(objectBlog.name);
          $('#tumblr_posts').html(objectBlog.posts);
          $('#tumblr_desc').html(objectBlog.description);
          
          
          // each loop to go through all the post
          $.each(objectPosts, function(key, value){
            //just retrieving post that have photos
            if(value.type === "photo"){
              // inner each loop to go through all the photos for each post
              $.each(value.photos, function(k, v){
                  //append image
                  $('#tumblr_search').append(
                    '<img src="' + v.original_size.url + '" width="250" height="259" />'
                  );
                });// end inner each
              
              // caption for each post
              $('#tumblr_search').append(value.caption + '<hr />');
            }
            });// end each 
            

         } // end success function
       }
       }); // end ajax call
     
     }); // end click function
  
}); // end of document.ready
