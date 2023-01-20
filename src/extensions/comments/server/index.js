const parseParams = (params) =>
  Object.keys(params).reduce((prev, curr) => {
    const value = params[curr];
    const parsedValue = Number(value);
    return {
      ...prev,
      [curr]: isNaN(parsedValue) ? value : parsedValue,
    };
  }, {});

const getModelUid = (name) => {
    return strapi.plugin("comments").contentTypes[name]?.uid;
};

module.exports = (plugin) => {
  plugin.controllers.admin.updateAdminStatus = async function(ctx) {
    const { params = {}, request } = ctx;
    const { body } = request;
    const { id } = parseParams(params);
    
    const updateComment = await strapi.db
      .query(getModelUid("comment"))
      .update({
        where: { id },
        data: {
          isAdminComment: body.isAdminComment == true ? true : null
        }
      });
    return updateComment
  }

  plugin.controllers.admin.updateAuthor = async function(ctx) {
    const { params = {}, request } = ctx;
    const { body } = request;
    const { id } = parseParams(params);
    const currentComment = await strapi.db
    .query(getModelUid("comment")).findOne({
      where: { id }
    })
    const name = body.authorName != undefined ? body.authorName : currentComment.authorName 
    const avatar = body.authorAvatar != undefined ? body.authorAvatar : currentComment.authorAvatar
    const email = body.authorEmail != undefined ? body.authorEmail : currentComment.authorEmail
    const updateComment = await strapi.db
      .query(getModelUid("comment"))
      .update({
        where: { id },
        data: {
          authorAvatar: avatar,
          authorName: name,
          authorEmail: email,
        }
      });
    return updateComment
  }
    
  plugin.routes['admin'].routes.push({
    method: "PUT",
    path: "/moderate/single/:id/updateAdminStatus",
    handler: "admin.updateAdminStatus",
    config: {
      policies: [],
    }
  });
  plugin.routes['admin'].routes.push({
    method: "PUT",
    path: "/moderate/single/:id/updateAuthor",
    handler: "admin.updateAuthor",
    config: {
      policies: [],
    }
  });

  return plugin;
};



 

 