
var AboutMain = React.createClass({
    getInitialState: function() {
      return {data: ""};
    },
    componentDidMount: function() {
      console.log("link: " + "posts/" + this.props.file);
      $.ajax({
        url: "posts/about.md" ,
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
          <li onClick={this.handleClick} role="presentation"><a href="index.html">Main</a></li>
          <li role="presentation" className="active"><a href="#">About</a></li>
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
        inner = <AboutMain file={this.state.currentFile} />
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
