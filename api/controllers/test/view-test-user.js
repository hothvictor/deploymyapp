module.exports = {


  friendlyName: 'View test user',


  description: 'Display "Test user" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/test/test-user'
    }

  },


  fn: async function () {

    // Respond with view.
    return {};

  }


};
