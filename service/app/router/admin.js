module.exports = (app) => {
  const { router, controller } = app;
  var adminauth = app.middleware.adminauth();
  router.get("/admin/index", controller.admin.main.index);
  router.post("/admin/checkLogin", controller.admin.main.checkLogin);
  router.get(
    "/admin/getTypeInfo",
    adminauth,
    controller.admin.main.getTypeInfo
  );
  // 添加文章
  router.post("/admin/addArticle", adminauth, controller.admin.main.addArticle);
  // 更新文章
  router.post(
    "/admin/updateArticle",
    adminauth,
    controller.admin.main.updateArticle
  );
  // 获取文章列表
  router.get(
    "/admin/getArticleList",
    adminauth,
    controller.admin.main.getArticleList
  );
  // 获取删除列表
  router.get(
    "/admin/deleteArticle/:id",
    adminauth,
    controller.admin.main.deleteArticle
  );
  // 获取根据id获取文章详情
  router.get(
    "/admin/getArticleById/:id",
    adminauth,
    controller.admin.main.getArticleById
  );
};
