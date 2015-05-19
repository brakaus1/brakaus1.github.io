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
              if (post.file === "posts/about.md") {
                return;
              };
              return  (
                <div className="text-center">
                <Post change={temp} file={post.file} />
                </div>
                )});

        return (
            <div className="postsList">
                <div className="centerTitle">Posts</div>
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
    var name = this.props.file.split("-")[3].replace(".md", "").replace("_", " ");
    var date = this.props.file.substring(6, 10);
    return (
        <div className="postitem" onClick={this.handleClick}> {name} - {date}</div>
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
        url: this.props.file,
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
      <div className="Row">
        <div className="col-md-8 col-centered">
            <span dangerouslySetInnerHTML={{__html: rawMarkup}} />
        </div>
      </div>
        )
    },


});

var NavBar = React.createClass({
  handleClick: function(){
    this.props.change('posts')
  },
  render: function(){
    return (
      <div class="col-md-12 text-center">
        <ul className="nav nav-pills center-pills">
          <li onClick={this.handleClick} role="presentation" className="active"><a href="#">Main</a></li>
          <li role="presentation"><a href="about.html">About</a></li>
        </ul>
      </div>
      )
  }
  });
var Main = React.createClass({
  getInitialState: function() {
    return {currentPage: 'posts', currentFile: null};
  },

  handleChange: function(file){

    if (file === 'posts'){
          this.setState({currentPage: 'posts'});
          this.setState({currentPage: 'posts'});
    } else {
          this.setState({currentPage: 'post'});
          this.setState({currentFile: file});
    }
  },
  render: function() {
    var inner;
    if (this.state.currentPage === 'posts'){
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
