

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

    changeHandler: function(e) {
        if (typeof this.props.change === 'function') {
            console.log(e.target.file);
            this.props.change(e.target.file);
        }
    },
    render: function(){

        var postNodes = this.state.data.map(function(post){
              return  (
                <div className="Post">
                  <a href={this.changeHandler} file={post.file}> {post.file}</a>
                </div>
                )});

        return (
            <div className="postsList">
                <h1>Posts</h1>
                {postNodes}
            </div>
            )

    }

});

var PostMain = React.createClass({
    getInitialState: function() {
      return {data: null};
    },
    componentDidMount: function() {
      $.ajax({
        url: this.props.url,
        dataType: "text",
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
      return  (
        <div className="Post">
          {this.state.data}
        </div>
        )
    },


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
        inner = <PostMain file={this.state.currentFile} />
    };
    return (
        <div className="modelBox">
          {inner}
        </div>
        )

  }
});


React.render(<Main />, document.getElementById('content'));
