import Vue from 'vue';
import Router from 'vue-router';
import store from './store';

Vue.use(Router);

/*
Perhaps support multiple guards?
https://github.com/vuejs/vue-router/issues/721#issuecomment-252181948
*/
function hasPermission(permission) {
    if (store.getters.permissions === null || store.getters.permissions === undefined) {
        return false;
    }

    for (let i = 0; i < store.getters.permissions.length; i++) {
        if (store.getters.permissions[i].name === permission) {
            return true;
        }
    }

    return false;
}

function checkPermission(to, from, next) {
    let permissionRequired = to.meta.permissionRequired;

    function proceed() {
        if (hasPermission(permissionRequired)) {
            next(true);
        } else {
            next({
                path: '/',
                query: {
                    redirect: to.fullPath
                }
            })
        }
    }

    // we must wait for the store to be initialized
    if (!store.state.initiated) {
        console.debug('[router] waiting for store to be initialized...')
        store.watch(
            (state) => state.initiated,
            (value) => {
            console.debug('[router] ok store initialization state changed', value)
            if (value === true)
                proceed();
            }
        )
    } else {
        proceed();
    }
}

export default new Router({
    mode: "history",
    base: process.env.BASE_URL,
    scrollBehavior(to, from, savedPosition) {
        return { x: 0, y: 0 };
    },
    routes: [
        {
            path: "/",
            name: "home",
            component: () => import("./views/HomeView.vue")
        },
        {
            path: "/blog-post/edit/:id?",
            name: "editBlogPost",
            component: () => import("./views/EditBlogPostView.vue"),
            props: true
        },
        {
            path: "/blog-post/:id",
            name: "blogPost",
            component: () => import("./views/BlogPostView.vue"),
            props: true
        },
        {
            path: "/blog-posts",
            name: "blogPosts",
            component: () => import("./views/BlogPostsView.vue")
        },
        {
            path: "/config/edit/:id?",
            name: "editConfig",
            component: () => import("./views/EditConfigView.vue"),
            props: true
        },
        {
            path: "/config/:id",
            name: "config",
            component: () => import("./views/ConfigView.vue"),
            props: true
        },
        {
            path: "/configs",
            name: "configs",
            component: () => import("./views/ConfigsView.vue")
        },
        {
            path: "/about",
            name: "about",
            component: () => import("./views/AboutView.vue")
        },
        {
            path: "/register",
            name: "register",
            component: () => import("./views/RegisterView.vue")
        },
        {
            path: "/forgot-password",
            name: "forgotPassword",
            component: () => import("./views/ForgotPasswordView.vue")
        },
        {
            path: "/password-reset",
            name: "passwordReset",
            component: () => import("./views/PasswordResetView.vue")
        },
        {
            path: "/articles/:id",
            name: "article",
            component: () => import("./views/ArticleView.vue"),
            props: true
        },
        {
            path: "/forums",
            name: "forums",
            component: () => import("./views/ForumsView.vue")
        },
        {
            path: "/forums/:id",
            name: "forum",
            component: () => import("./views/ForumView.vue"),
            props: true
        },
        {
            path: "/forums/:id/new-topic",
            name: "forumTopicCreate",
            component: () => import("./views/ForumTopicCreateView.vue"),
            props: true
        },
        {
            path: "/forum-topics/:id",
            name: "forumTopic",
            component: () => import("./views/ForumTopicView.vue"),
            props: true
        },
        {
            path: "/maps",
            name: "maps",
            component: () => import("./views/MapsView.vue")
        },
        {
            path: "/maps/:id",
            name: "map",
            component: () => import("./views/MapView.vue"),
            props: true
        },
        {
            path: "/users",
            name: "users",
            component: () => import("./views/UsersView.vue")
        },
        {
            path: "/users/:id",
            name: "user",
            component: () => import("./views/UserView.vue"),
            props: true
        },
        {
            path: "/users/activate/:email/:token",
            name: "user-activation",
            component: () => import("./views/UserActivationView.vue"),
            props: true
        },
        {
            path: "/admin/article",
            name: "adminCreateArticle",
            component: () => import("./views/AdminArticleView.vue"),
            meta: { permissionRequired: "create_article" },
            beforeEnter: checkPermission
        },
        {
            path: "/admin/article/:id",
            name: "adminEditArticle",
            component: () => import("./views/AdminArticleView.vue"),
            props: true,
            meta: { permissionRequired: "edit_article" },
            beforeEnter: checkPermission
        },
        {
            path: "/profile/edit",
            name: "editProfile",
            component: () => import("./views/EditProfileView.vue"),
            meta: { permissionRequired: "edit_user_profile" },
            beforeEnter: checkPermission
        },
        {
            path: "/admin/articles",
            name: "adminArticles",
            component: () => import("./views/AdminArticlesView.vue"),
            meta: { permissionRequired: "list_articles" },
            beforeEnter: checkPermission
        },
        {
            path: "/admin/users",
            name: "adminUsers",
            component: () => import("./views/AdminUsersView.vue"),
            meta: { permissionRequired: "list_users" },
            beforeEnter: checkPermission
        },
        {
            path: "/admin/user",
            name: "adminCreateUser",
            component: () => import("./views/AdminUserView.vue"),
            meta: { permissionRequired: "create_user" },
            beforeEnter: checkPermission
        },
        {
            path: "/admin/user/:id",
            name: "adminEditUser",
            component: () => import("./views/AdminUserView.vue"),
            props: true,
            meta: { permissionRequired: "edit_user" },
            beforeEnter: checkPermission
        },
        {
            path: "/admin/comments",
            name: "adminComments",
            component: () => import("./views/AdminCommentsView.vue"),
            meta: { permissionRequired: "list_comments" },
            beforeEnter: checkPermission
        },
        {
            path: "/admin/comment/:id",
            name: "adminEditComment",
            component: () => import("./views/AdminCommentView.vue"),
            props: true,
            meta: { permissionRequired: "edit_comment" },
            beforeEnter: checkPermission
        },
        {
            path: "/admin/forum-categories",
            name: "adminForumCategories",
            component: () => import("./views/AdminForumCategoriesView.vue"),
            meta: { permissionRequired: "list_forum_categories" },
            beforeEnter: checkPermission
        },
        {
            path: "/admin/forum-category",
            name: "adminCreateForumCategory",
            component: () => import("./views/AdminForumCategoryView.vue"),
            meta: { permissionRequired: "create_forum_category" },
            beforeEnter: checkPermission
        },
        {
            path: "/admin/forum-category/:id",
            name: "adminEditForumCategory",
            component: () => import("./views/AdminForumCategoryView.vue"),
            props: true,
            meta: { permissionRequired: "edit_forum_category" },
            beforeEnter: checkPermission
        },
        {
            path: "/admin/forums",
            name: "adminForums",
            component: () => import("./views/AdminForumsView.vue"),
            meta: { permissionRequired: "list_forums" },
            beforeEnter: checkPermission
        },
        {
            path: "/admin/forum",
            name: "adminCreateForum",
            component: () => import("./views/AdminForumView.vue"),
            meta: { permissionRequired: "create_forum" },
            beforeEnter: checkPermission
        },
        {
            path: "/admin/forum/:id",
            name: "adminEditForum",
            component: () => import("./views/AdminForumView.vue"),
            props: true,
            meta: { permissionRequired: "edit_forum" },
            beforeEnter: checkPermission
        },
        {
            path: "/admin/roles",
            name: "adminRoles",
            component: () => import("./views/AdminRolesView.vue"),
            meta: { permissionRequired: "list_roles" },
            beforeEnter: checkPermission
        },
        {
            path: "/admin/role",
            name: "adminCreateRole",
            component: () => import("./views/AdminRoleView.vue"),
            meta: { permissionRequired: "create_role" },
            beforeEnter: checkPermission
        },
        {
            path: "/admin/role/:id",
            name: "adminEditRole",
            component: () => import("./views/AdminRoleView.vue"),
            props: true,
            meta: { permissionRequired: "edit_role" },
            beforeEnter: checkPermission
        }
    ]
});
