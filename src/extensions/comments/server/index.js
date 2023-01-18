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

  plugin.controllers.admin.updateAvatar = async function(ctx) {
    const { params = {}, request } = ctx;
    const { body } = request;
    const { id } = parseParams(params);
    
    const updateComment = await strapi.db
      .query(getModelUid("comment"))
      .update({
        where: { id },
        data: {
          authorAvatar: body.avatar
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
    path: "/moderate/single/:id/updateAvatar",
    handler: "admin.updateAvatar",
    config: {
      policies: [],
    }
  });

  return plugin;
};



 

 