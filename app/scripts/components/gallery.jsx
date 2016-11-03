
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
    flexFlow: 'column nowrap',
    alignItems: 'center'
  },
  card: {
    width: 500,
    overflowY: 'auto',
    marginBottom: '18px'
  }
};



var Tile = React.createClass({

  handleEdit: function(){
    this.props.handleEdit(this.props.img);
  },

  render: function(){
    var img  = this.props.img;
    var self = this;
    return (
      <Card style={styles.card}>
        <CardMedia>
          <img src={img.get('url')} />
        </CardMedia>
         <CardTitle title={img.get('caption')}/>
        <CardActions>
          <FlatButton onTouchTap={self.handleEdit}
            label={'Edit'}
          />
          <FlatButton
            label={'Delete'}
            secondary={true}/>
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
                handleEdit={self.props.handleEdit}/>);
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
