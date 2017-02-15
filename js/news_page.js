

    var SOURCES = [

        {
            displayName: "NYT",
            url: "https://newsapi.org/v1/articles?source=the-wall-street-journal&sortBy=top&apiKey=4bd32ab2c31346d8ae711b9c0b14f6b7",
            formatResponse: function (response) {
                var articles = response.articles;
                return _.map(articles, function (article) {
                    return {

                        description: article.description,
                        author: article.author,
                        link: article.url,
                        title: article.title,
                        tag: article.publishedAt,
                        thumbnail: article.urlToImage
                    }
                });
            }
        }


    ];




    var UTILS = {
        getArticlesMarkup: function(articles) {
            var articleMarkupArray = _.map(articles, function(article) {
                return UTILS.getSingleArticleMarkup(article);
            });

            return articleMarkupArray.join('');
        },
        getSingleArticleMarkup: function(article) {
            return UTILS.articleTemplate(article);
        },
        articleTemplate: _.template(
            '<article class="article clearfix">' +
                    '<section class="featuredImage">' +
                        '<img src = "<%= thumbnail %>">' +
                    '</section>' +
                    '<section class="articleContent">' +
                        '<a target = "_blank" href="<%= link %>"> <h3><%= title %></h3></a>' +
                        '<h6><%= tag %></h6>' +
                    '</section>' +
                    '<section class="impressions">by <%=author %></section>' +
            '</article>'
        )




    };


    var showNews = {


        bindEvents: function() {
                var currentFeed = _.findWhere(SOURCES, {displayName: "NYT"});
              showNews.showFeed(currentFeed);


        },
        currentArticles: [],

        showFeed: function(feed) {
            var request = showNews.requestFeed(feed);
            request.done(function(response) {
                var currentArticles = feed.formatResponse(response);
                showNews.currentArticles = currentArticles;
                showNews.renderFeed(currentArticles);
            });
        },
        requestFeed: function(feed) {
            // return jqXHR object for request

            var url = feed.url;

            return $.ajax(url, {
                dataType: 'json'
            });
        },
        renderFeed: function(articles) {
            var articlesMarkup = UTILS.getArticlesMarkup(articles);
           $("#news_div").html(articlesMarkup);

        }

    };


