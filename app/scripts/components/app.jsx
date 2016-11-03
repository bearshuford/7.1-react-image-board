var $ = require('jquery');
var React = require('react');
var Backbone = require('backbone');

require('backbone-react-component');

var MuiThemeProvider = require('material-ui/styles/MuiThemeProvider').default;
var AppBar = require('material-ui').AppBar;
var Paper = require('material-ui').Paper;

var Dialog = require('material-ui').Dialog;
var FlatButton = require('material-ui').FlatButton;
var RaisedButton = require('material-ui').RaisedButton;
var FloatingActionButton = require('material-ui').FloatingActionButton;


var TextField = require('material-ui').TextField;


var Image = require('./../models/image').Image;
var ImageCollection = require('./../models/image').ImageCollection;

var Gallery = require('./gallery.jsx').Gallery;



const styles = {
  dialog: {
    width: '320px'
  },
  addButton: {
    position: 'fixed',
    zIndex: '1200',
    top: 36,
    right: 60
  },
  appBar: {
    position: 'fixed',
    top: 0,
    right:0,
    left:0
  }
};





var ImageDialog = React.createClass({

  getInitialState: function() {
    return {
      submitLabel: 'Add',
      caption: '',
      url: '',
   };
  },

  componentWillReceiveProps: function(nextProps){

    if(nextProps.model){
      this.setState({
        submitLabel: 'Save',
        url: nextProps.model.get('url'),
        caption: nextProps.model.get('caption')
      });
    }
  },

  handleUrlChange: function(e) {
    console.log(e.target.value);
    this.setState({url: e.target.value,})
  },

  handleCaptionChange: function(e) {
    this.setState({caption: e.target.value,})
  },

  handleSubmit: function(){
    this.props.handleSubmit({
      url:      this.state.url,
      caption:  this.state.caption
    });

    this.setState({
      url: '',
      caption: ''
    });
  },

  handleClose: function(){
    this.props.handleClose();
    this.setState({
      submitLabel: 'Add',
      caption: '',
      url: '',
   });
  },

  render: function() {
    var actions = [
      <FlatButton   onTouchTap={this.handleClose}
         key="cancel-button"
         label="Cancel"
         tabIndex={-1}
         secondary={true}/>,
      <FlatButton   onTouchTap={this.handleSubmit}
         key="submit-button"
         label={this.state.submitLabel}
         primary={true}
         keyboardFocused={true}/>
    ];

    return (
      <Dialog
        actions={actions}
        modal={true}
        actionFocus={this.state.submitLabel}
        open={this.props.open}
        onRequestClose={this.handleClose}
        contentStyle={styles.dialog}>
        <TextField
          hintText="https://placecage.com/700/500"
          floatingLabelText="url"
          key="url-field"
          value={this.state.url}
          onChange={this.handleUrlChange}/>
        <br key="br"/>
        <TextField
           hintText="this is a great pic 💙"
           floatingLabelText="caption"
           key ="caption-field"
           value={this.state.caption}
           onChange={this.handleCaptionChange}
           multiLine={true}
           rows={1}
           rowsMax={6} />
      </Dialog>
     );
   }

});


var App = React.createClass({

  render: function() {
    return (	<MuiThemeProvider>
								<div>
									<AppBar
  									title="image board"
  									showMenuIconButton={false}
  									style={styles.appBar}
									/>
									{this.props.children}
								</div>
							</MuiThemeProvider>
    );
  }
});



var AppContainer = React.createClass({

  mixins: [Backbone.React.Component.mixin],

  getInitialState: function() {
    return {
      open: false,
      model: false,
      handleSubmit: this.handleSubmit
   };
  },

  getDefaultProps: function(){
    var collection = new ImageCollection();
    collection.fetch();
    return {'collection': collection}
  },

  handleOpen: function() {
    this.setState({
      open: true,
      handleSubmit: this.handleSubmit
    });
  },
  handleClose: function() {
    this.setState({open: false});
  },

  handleSubmit: function(item){
    this.getCollection().create(item);
    this.setState({open: false});
  },


  handleSave: function(item) {
    this.state.model.set(item);
    this.state.model.save();
    this.setState({
      open: false,
      model: false
    });
  },

  handleEdit: function(item){
    this.setState({
      open: true,
      model: item,
      handleSubmit: this.handleSave
    });
  },

  handleDelete: function(item){
    console.log('handleDelete');
    this.getCollection().get(item).destroy();
    this.handleClose();
  },

  render: function() {
    return (
      <App>
        <FloatingActionButton onTouchTap={this.handleOpen}
          secondary={true}
          style={styles.addButton}>
          <i className="material-icons">add</i>
        </FloatingActionButton>

        <ImageDialog open={this.state.open}
          handleClose={this.handleClose}
          handleSubmit={this.state.handleSubmit}
          caption={this.state.caption}
          model={this.state.model}
        />

      <Gallery
        collection={this.getCollection()}
        handleEdit={this.handleEdit}
        handleDelete={this.handleDelete}/>
      </App>
    );
  }
});




module.exports = {
   App: AppContainer
};
