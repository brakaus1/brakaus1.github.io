var ddd = function(){console.log('worked')};

var PostsList = React.createClass({

    getInitialState: function() {
      return {data: [], currFile: null};
    },
    componentDidMount: function() {
      $.ajax({
        url: this.props.url,
        dataType: "json",
        success: function(data) {
          console.log(data);
          this.setState({data: data});
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    },

    changeHandler: function(child, file) {
        if (typeof this.props.change === 'function') {
            console.log(file);
            this.props.change(file);
        } else {
          console.log("not a function");
        }
    },
    render: function(){
        var temp = this.changeHandler.bind(null, this);
        var postNodes = this.state.data.map(function(post){
              console.log("postfile");
              console.log(post.file);
              return  (
                <Post change={temp} file={post.file} />
                )});

        return (
            <div className="postsList">
                <h1>Posts</h1>
                {postNodes}
            </div>
            )

    }

});


var Post = React.createClass({

  handleClick: function(){
    console.log(this.props.file);
    this.props.change(this.props.file);
  },
  render: function(){
    return (
        <div onClick={this.handleClick}> {this.props.file} </div>
      )
  }

});

var PostMain = React.createClass({
    getInitialState: function() {
      return {data: ""};
    },
    componentDidMount: function() {
      console.log("link: " + "posts/" + this.props.file);
      $.ajax({
        url: "posts/" + this.props.file,
        dataType: "text",
        type: 'get',
        success: function(data) {
          console.log(data);
          this.setState({data: data});
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    },
    render: function() {
      var rawMarkup = marked(this.state.data, {sanitize: true});
      return  (
        <div className="Post">
          <span dangerouslySetInnerHTML={{__html: rawMarkup}} />
        </div>
        )
    },


});

var NavBar = React.createClass({
  handleClick: function(){
    this.props.change('main')
  },
  render: function(){
    return (
        <div onClick={this.handleClick}> Home </div>
      )
  }
  });
var Main = React.createClass({
  getInitialState: function() {
    return {currentPage: 'main', currentFile: null};
  },

  handleChange: function(file){

    if (file === 'main'){
          this.setState({currentPage: 'main'});
    } else {
          this.setState({currentPage: 'post'});
          this.setState({currentFile: file});
    }
  },
  render: function() {
    var inner;
    if (this.state.currentPage === 'main'){
      inner = <PostsList url='posts.json' change={this.handleChange}/>
    } else if (this.state.currentPage === 'post'){
      console.log("file: " + this.state.currentFile);
        inner = <PostMain file={this.state.currentFile} />
    };
    return (
        <div>
        <NavBar change={this.handleChange} />
        <div className="modelBox">
          {inner}
        </div>
        </div>
        )

  }
});


React.render(<Main />, document.getElementById('content'));
