  var Signup = React.createClass({

    handleSignup: function(data) {
      $.ajax({
        url: this.props.url,
        dataType: 'json',
        type: 'POST',
        data: data,
        success: function(data) {
          console.log(data);
        },
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    },

    render: function() {
      return (
        <div>
          <SignupForm handleSignup={this.handleSignup} />
        </div>
      );
    }
  });

  var SignupForm = React.createClass({
    handleSubmit: function(e) {
    e.preventDefault();
    var author = React.findDOMNode(this.refs.author).value.trim();
        var email = React.findDOMNode(this.refs.email).value.trim();
        if (!email || !author) {
            return;
          }
        this.props.handleSignup({
          author: author,
          email: email
        });
        React.findDOMNode(this.refs.author).value = '';
        React.findDOMNode(this.refs.email).value = '';
        return;
      },

      render: function() {
        return (
          <form className="signupForm" onSubmit={this.handleSubmit}>
            <input type="text" placeholder="enter your name" ref="author" />
            <input type="text" placeholder="enter your email" ref="email" />
            <input type="submit" value="sign up" />
          </form>
          );
      }
  });

  React.render(<Signup url="/api/register" />, document.getElementById("content"));