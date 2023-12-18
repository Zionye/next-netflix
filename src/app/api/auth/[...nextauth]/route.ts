import NextAuth from "next-auth";
import { authOptions } from "~/lib/auth";

const handler = NextAuth(authOptions);

/**
 *  GET 方法表示在 HTTP GET 请求下执行的操作。在这里，它将渲染一个名为 auth 的页面。
    POST 方法表示在 HTTP POST 请求下执行的操作。在这里，它将使用提供的电子邮件和密码进行身份验证。如果验证成功，它将返回用户对象。如果验证失败，它将抛出一个错误。
 */
export { handler as GET, handler as POST };

