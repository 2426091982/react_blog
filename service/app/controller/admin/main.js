const Controller = require("egg").Controller;

class MainController extends Controller {
  // 首页
  async index() {
    const { ctx } = this;
    ctx.body = "admin";
  }
  // 登录接口
  async checkLogin() {
    let userName = this.ctx.request.body.userName;
    let password = this.ctx.request.body.password;
    const sql = `SELECT userName FROM admin_user WHERE userName = "${userName}" AND password = "${password}"`;

    const { ctx } = this;
    ctx.body = "admin";

    const res = await this.app.mysql.query(sql);

    if (res.length > 0) {
      // 登录成功
      let openID = new Date().getTime();
      ctx.session.openId = { openId: openID };
      ctx.body = { data: "登录成功", openId: openID };
    } else {
      // 登录失败
      ctx.body = { data: "登录失败" };
    }
  }
  // 获取文章类别接口
  async getTypeInfo() {
    const resType = await this.app.mysql.select("type");
    this.ctx.body = { data: resType };
  }
  // 添加文章
  async addArticle() {
    let tmpArticle = this.ctx.request.body;

    // tmpArticle
    const result = await this.app.mysql.insert("article", tmpArticle);
    const insertSuccess = result.affectedRows === 1;
    const insertId = result.insertId;

    this.ctx.body = {
      isSuccess: insertSuccess,
      insertId: insertId,
    };
  }
  // 修改文章
  async updateArticle() {
    let tmpArticle = this.ctx.request.body;
    let result = await this.app.mysql.update("article", tmpArticle);
    let isUpdateSuccess = result.affectedRows === 1;
    this.ctx.body = {
      isUpdateSuccess,
    };
  }
  // 获取文章列表
  async getArticleList() {
    let sql =
      "SELECT article.id as id," +
      "article.title as title," +
      "article.view_count as view_count," +
      "article.type_id as type_id," +
      "article.introduce as introduce," +
      "FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime," +
      "type.typeName as typeName " +
      "FROM article LEFT JOIN type ON article.type_id = type.Id " +
      "ORDER BY article.id DESC ";

    let resultList = await this.app.mysql.query(sql);
    this.ctx.body = { list: resultList };
  }

  // 删除文章
  async deleteArticle(context) {
    const id = this.ctx.params.id;
    console.log(id);
    let result = await this.app.mysql.delete("article", { id: id });
    this.ctx.body = { data: result };
  }

  // 根据文章id得到文章详情 用于修改文章
  async getArticleById() {
    let id = this.ctx.params.id;
    let sql =
      "SELECT article.id as id," +
      "article.title as title," +
      "article.introduce as introduce," +
      "article.article_content as article_content," +
      "FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime," +
      "article.view_count as view_count ," +
      "type.typeName as typeName ," +
      "type.id as typeId " +
      "FROM article LEFT JOIN type ON article.type_id = type.Id " +
      "WHERE article.id=" +
      id;
    let result = await this.app.mysql.query(sql);
    this.ctx.body = { data: result };
  }
}

module.exports = MainController;
