module.exports = {


  friendlyName: 'Admin destroy shop',


  description: '',


  inputs: {
    id: {
      type: 'number',
      required: true
    }
  },


  exits: {

  },


  fn: async function (inputs, exits) {

    var shop = await Shop.findOne({

      id: inputs.id
    });

    // if (shop.owner !== this.req.me.id) {
    //   throw 'forbidden';
    // }

    await User.update({
      id: shop.owner
    }).set({
      shopNo: 0,
    }).fetch()


    await Shop.destroy({
      id: inputs.id
    });

    return exits.success();

  }


};
