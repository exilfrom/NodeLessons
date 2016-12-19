/**
 * Created by Odin on 15.12.2016.
 */

window.ee = new EventEmitter();
var my_news = [
    {
        author: 'Саша Печкин',
        text: 'В четверг, четвертого числа...',
        bigText: 'В четыре с четвертью часа четыре чёрненьких чумазеньких чертёнка чертили чёрными чернилами чертёж.'
    },
    {
        author: 'Просто Вася',
        text: 'Считаю, что $ должен стоить 35 рублей!',
        bigText: 'А евро 42!'
    },
    {
        author: 'Гость',
        text: 'Бесплатно. Скачать. Лучший сайт - http://localhost:3000',
        bigText: 'На самом деле платно, просто нужно прочитать очень длинное лицензионное соглашение'
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
    propTypes: {
        data: React.PropTypes.shape({
            author: React.PropTypes.string.isRequired,
            text: React.PropTypes.string.isRequired,
            bigText: React.PropTypes.string.isRequired
        })
    },
    getInitialState: function(){
        return{
            visible:false
        };
    },
    readMoreClick: function(ev){
        ev.preventDefault();
        this.setState({visible: true});
    },
    render: function(){
        var news = this.props.news;
        var visible = this.state.visible;
        return(
            <div className="article">
                <p className="news_author">{news.author}:</p>
                <p className="news_text">{news.text}</p>
                <a href="#" onClick={this.readMoreClick} className={"news_read_more " + (visible ? 'none': '')}>Read more...</a>
                <p className={'news_big-text ' + (visible ? '': 'none')}>{news.bigText}</p>
            </div>
        )
    }
});

var News = React.createClass({
    propTypes: {
        data: React.PropTypes.array.isRequired
    },
    getInitialState: function(){
        return{
            counter: 0
        };
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

var Add = React.createClass({
    getInitialState: function() { //устанавливаем начальное состояние (state)
        return {
            agreeNotChecked: true,
            authorIsEmpty: true,
            textIsEmpty: true
        };
    },
    addNews: function(ev){
        ev.preventDefault();
        var author = ReactDOM.findDOMNode(this.refs.author).value;
        var textNewsEl = ReactDOM.findDOMNode(this.refs.newsText);
        var textNews = textNewsEl.value;
        //alert('Author: ' + author + '\nText: ' + textNews);
        var item = [{
            author: author,
            text: textNews,
            bigText: '...'
        }];
        window.ee.emit('News.add', item);
        textNewsEl.value = '';
        this.setState({textIsEmpty: true});
    },
    onCheckRuleClick: function(ev){
        this.setState({agreeNotChecked: !this.state.agreeNotChecked});
    },
    onFieldChange: function(fieldName, ev){
        var result = ev.target.value.trim().length > 0 ? false : true;
        this.setState({[''+fieldName]: result});
    },
    componentDidMount: function(){
        ReactDOM.findDOMNode(this.refs.author).focus();
    },
    render: function(){
        return(
            <form className='add cf'>
                <input onChange={this.onFieldChange.bind(this, 'authorIsEmpty')} type="text" className='add_author' dafaultValue='' ref='author' placeholder='Author'/>
                <textarea onChange={this.onFieldChange.bind(this, 'textIsEmpty')} className='add_text' defaultValue='' ref='newsText' placeholder="News text...."></textarea>
                <label className="add_checkrule">
                    <input type='checkbox' onChange={this.onCheckRuleClick} ref='agree'/>I agree with rules
                </label>
                <button disabled={this.state.agreeNotChecked || this.state.authorIsEmpty || this.state.textIsEmpty} ref='btn' onClick={this.addNews}>Add news</button>
            </form>
        );
    }
});

var App = React.createClass({
    getInitialState: function(){
        return{
            news: my_news
        }
    },
    componentDidMount: function() {
        var self = this;
        window.ee.addListener('News.add', function(item) {
            var nextNews = item.concat(self.state.news);
            self.setState({news: nextNews});
        });
    },
    componentWillUnmount: function() {
        window.ee.removeListener('News.add');
    },
    render: function(){
        return(
          <div className="app">
              <Add/>
              <h3>News</h3>

              <News data={this.state.news}/>
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
