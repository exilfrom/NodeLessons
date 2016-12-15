/**
 * Created by Odin on 15.12.2016.
 */
var my_news = [
    {
        author: 'Саша Печкин',
        text: 'В четверг, четвертого числа...'
    },
    {
        author: 'Просто Вася',
        text: 'Считаю, что $ должен стоить 35 рублей!'
    },
    {
        author: 'Гость',
        text: 'Бесплатно. Скачать. Лучший сайт - http://localhost:3000'
    }
];

/*var Comments = React.createClass({
    render: function(){
        return(
            <div className="comments">No news - nothing to comment.</div>
        );
    }
});*/

//my_news = [];

var Article = React.createClass({
    render: function(){
        var news = this.props.news;
        return(
            <div className="article">
                <p className="news_author">{news.author}:</p>
                <p className="news_text">{news.text}</p>
            </div>
        )
    }
});

var News = React.createClass({
    propTypes: {
        data: React.PropTypes.array.isRequired
    },
    render: function(){
        var data = this.props.data;
        var newTemplate = data.length > 0
            ? data.map(function(item, id){
                return(
                    <div key={id}>
                        <Article news={item}/>
                    </div>
                );
            })
            : <p>Unfortunately, no news.</p>
        return(
            <div className="news">
                {newTemplate}
                <strong className={'news_count ' + (data.length > 0 ? '' : 'none')}>Total news: {data.length}</strong>
            </div>
        );
    }
});

var App = React.createClass({
    render: function(){
        return(
          <div className="app">
              <h3>News</h3>
              <News data={my_news}/>
          {/*<Comments/>*/}
          </div>
        );
    }
});

ReactDOM.render(
    //React.createElement('h1', null, 'Hello World'),
    //<h1>Hello World!</h1>,
    <App/>,
    document.getElementById('root')
);
