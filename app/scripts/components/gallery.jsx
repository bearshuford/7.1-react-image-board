
var $ = require('jquery');
var React = require('react');
var Backbone = require('backbone');

var Card        = require('material-ui').Card;
var CardActions = require('material-ui/Card').CardActions;
var CardTitle    = require('material-ui/Card').CardTitle;
var CardMedia    = require('material-ui/Card').CardMedia;


var FlatButton = require('material-ui').FlatButton;

require('backbone-react-component');


const styles = {
  root: {
    paddingTop: '70px',
    display: 'flex',
    flexFlow: 'column-reverse nowrap',
    alignItems: 'center'
  },
  card: {
    width: 500,
    maxWidth: '80%',
    overflowY: 'auto',
    marginBottom: '18px',
    paddingBottom: '0'
  }

};



var Tile = React.createClass({

  handleEdit: function(){
    this.props.handleEdit(this.props.img);
  },

  handleDelete: function(){
    this.props.handleDelete(this.props.img);
  },

  render: function(){
    var img  = this.props.img;
    var self = this;
    return (
      <Card style={styles.card}>
        <CardMedia>
          <img src={img.get('url')} />
        </CardMedia>
         <CardTitle
           title={img.get('caption')}
           showExpandableButton={true}
           actAsExpander={true}/>
        <CardActions expandable={true}>
          <FlatButton onTouchTap={self.handleEdit}
            label={'Edit'}
          />
          <FlatButton onTouchTap={self.handleDelete}
            label={'Delete'}
            secondary={true}
          />
        </CardActions>
      </Card>
    );
  }
});



var GalleryContainer = React.createClass({
  mixins: [Backbone.React.Component.mixin],

  render: function(){
    var coll = this.getCollection();
    var self = this;

    var tiles = coll.map(function(img) {
      return (
              <Tile
                img={img}
                key={img.get('_id') || img.cid}
                handleEdit={self.props.handleEdit}
                handleDelete={self.props.handleDelete}/>);
    });

    return (
      <div style={styles.root}>
        {tiles}
      </div>
    );
  }
});



module.exports = {
  Gallery: GalleryContainer
};
