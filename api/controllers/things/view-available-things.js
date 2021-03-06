module.exports = {


  friendlyName: 'View available things',


  description: 'Display "Available things" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/things/available-things'
    }

  },


  fn: async function (inputs, exits) {

    // var things =[
    //   { id: 1, label: 'bike'},
    //   { id: 2, label: 'people'},

    // ]

    //view all the things
    // var things = await Event.find();


    //view the things only between friends
    var me = await User.findOne({
      id: this.req.me.id
    }).populate('friends');

    var friendIds = _.pluck(me.friends, 'id');

    var things = await Thing.find({
      or: [{
          owner: this.req.me.id
        },
        {
          owner: {
            in: friendIds
          }
        }
      ]
    }).populate('owner'); //get owner information

    _.each(things, (thing)=>{
      thing.imageSrc = url.resolve(sails.config.custom.baseUrl, '/api/v1/things/'+thing.id);
      delete thing.imageUploadFd;
      delete thing.imageUploadMine;
    })


    // Respond with view.
    return exits.success({
      // things: things
      things,
      currentSection: 'thing',
    });

  }


};
