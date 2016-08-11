/**
 * Created by lisaxu on 7/29/16.
 */

(function(){
    "use strict";
    var client = contentful.createClient({
        // This is the space ID. A space is like a project folder in Contentful terms
        space: 'g0vx54cwozm8',
        // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
        accessToken: '35801d84c3a13531e8cfca2d4f644f2d624066a0d59318fbeae5069af335eb01'
    });

    var params = window.location.search;
    var paramSplit = params.split("=");
    var entryId = (paramSplit.length > 1)?paramSplit[1]:null;
    if(entryId){
        client.getEntry(entryId)
            .then(function(entry){

                var title = entry.fields.title;
                var desc = entry.fields.description;
                var time = entry.fields.dateAndTime; //format later?
                var content = entry.fields.content;

                var authorId = entry.fields.author.sys.id;
                var imgId = entry.fields.featureimage.sys.id;

                client.getEntry(authorId).then(function(authorData){
                    var name = authorData.fields.authorName;
                    var authorDiv = document.getElementById("author");
                    authorDiv.innerHTML = name;
                });

                client.getAsset(imgId).then(function(imgData){
                    console.log(imgData);
                    var image = document.createElement("IMG");
                    image.src = "http:"+imgData.fields.file.url;
                    var imgDiv = document.getElementById("image");
                    imgDiv.appendChild(image);

                });

                var titleDiv = document.getElementById("title");
                var descDiv = document.getElementById("desc");
                var timeDiv = document.getElementById("time");
                var contentDiv = document.getElementById("post");

                titleDiv.innerHTML = title;
                descDiv.innerHTML = desc;
                timeDiv.innerHTML = time;
                contentDiv.innerHTML = content;

            });
    }

    /*



    */



})();