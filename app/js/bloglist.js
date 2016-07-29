/**
 * Created by lisaxu on 7/29/16.
 */

(function(){
    "use strict";

    var blogListSpace = document.getElementById("blog-list");

    var client = contentful.createClient({
        // This is the space ID. A space is like a project folder in Contentful terms
        space: 'g0vx54cwozm8',
        // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
        accessToken: '35801d84c3a13531e8cfca2d4f644f2d624066a0d59318fbeae5069af335eb01'
    });

    client.getEntries({content_type: 'blogPost'})
        .then(function(entries){
            var items = entries.items;
            items.forEach(function(item){
                var author = item.fields.author.fields.authorName;
                var title  = item.fields.title;
                var description = item.fields.description;
                var time = item.fields.dateAndTime;
                var id = item.sys.id;
                var imgUrl = "http://"+item.fields.featureimage.fields.file.url;
                addToBlogList(author,title,time,description,imgUrl,id);
            });
        });



    function addToBlogList(author,title,date,description,imgUrl,entryId){
        var card = document.createElement("div");
        card.setAttribute("class","blog-card");

        var form = document.createElement("form");
        form.setAttribute("method","GET");
        form.setAttribute("action","blog.html");

        var idField = document.createElement("input");
        idField.setAttribute("type","hidden");
        idField.setAttribute("name","id");
        idField.setAttribute("value",entryId);

        var imgField = document.createElement("div");
        var image = document.createElement("img");
        image.src = imgUrl;
        imgField.appendChild(image);
        imgField.setAttribute("class","blog-featureimg");

        var contentWrapper = createTextDiv("content-wrapper",null);

        var createWrapper  = createTextDiv("create-wrapper",null);

        var authorField = createTextDiv("blog-author",author);

        var dateField = createTextDiv("blog-date",date);

        var descField = createTextDiv("blog-desc",description);

        var titleField = document.createElement("input"); //input element, Submit button
        titleField.setAttribute("type","submit");
        titleField.setAttribute("value",title);
        titleField.setAttribute("class","blog-title");

        form.appendChild(idField);
        form.appendChild(imgField);
        contentWrapper.appendChild(titleField);
        createWrapper.appendChild(authorField);
        createWrapper.appendChild(dateField);
        contentWrapper.appendChild(createWrapper);
        contentWrapper.appendChild(descField);
        form.appendChild(contentWrapper);
        card.appendChild(form);
        blogListSpace.appendChild(card);
    }

    function createTextDiv (divClass, html){
        var newDiv = document.createElement("div");
        if(html) newDiv.innerHTML = html;
        newDiv.setAttribute("class",divClass);
        return newDiv;
    }



})();