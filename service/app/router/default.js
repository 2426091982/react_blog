module.exports = (app) => {
  const { router, controller } = app;
  // 首页
  router.get("/default/index", controller.default.home.index);
  // 获取文章列表
  router.get("/default/getArticleList", controller.default.home.getArticleList);
  // 根据文章id获取文章详情
  router.get("/default/getArticleById/:id", controller.default.home.getArticleById);
  // 获取类型和编号
  router.get("/default/getTypeInfo", controller.default.home.getTypeInfo);
  // 根据分类ID获取列表
  router.get("/default/getListById/:id", controller.default.home.getListById);
};
